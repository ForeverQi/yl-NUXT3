<!-- 做题页 -->
<template>
    <div class="wrap">
        <!-- 公共头部 -->
        <global-header :is-fixed="false" />
        <div class="do-questions-analysis not-select">
            <!-- 面包屑 -->
            <div class="fix-header">
                <yl-breadcumb :items="crumbs" />
                <div class="height-24" />
                <template v-if="!errorMsg">
                    <report-header need-fixed :show-again-btn="false" :btn-name="'返回' + pageName" :title="pageName + '解析'" @goBack="backList" />
                    <div class="height-16" />
                    <div class="report-transcript-box">
                        <!-- 成绩单 -->
                        <report-transcript :show-score-progress="false" :transcript="transcript" :loading="loading" />
                    </div>
                </template>
            </div>
            <div class="do-question" v-if="!errorMsg" v-loading="loading">
                <test-exam
                    ref="questions"
                    paper-parsing
                    set-type
                    v-show="!loading && testPaper"
                    :list="questionList"
                    :paper-question-type-list="paperQuestionTypeList"
                    :current.sync="current"
                    paper-parsing-source="parsing"
                    :paper-source-type="paperSourceType"
                    @changeAnswerMode="changeAnswerMode"
                    @onPrev="onPrev"
                    @onNext="onNext"
                    @onFavorite="debounce(onFavorite)"
                    @click-opinion="clickOpinion"
                    @click-remove-errquestion="removeQuestion"
                    @click-answer-questions="clickAnswerQuestions"
                />
                <!-- 答题卡 -->
                <question-card-bottom v-if="!loading && testPaper" :list="answerList" :paper-type="paperSourceType" @item-click="clickAnswersheet" />
            </div>
            <!-- 没有权限 -->
            <empty-page v-show="!loading && errorMsg && !authStatus" :msg="errorMsg" btn1="去看课" btn2="去做题" @btn1="goToClass" @btn2="goToQuestion" />

            <!-- 其他错误信息 -->
            <empty-page v-show="!loading && errorMsg && authStatus" :msg="errorMsg" :btn1="'返回' + pageName" @btn1="backList" />

            <!-- 反馈建议弹窗 -->
            <FeedbackModel v-if="feedDialog.show" :is-show.sync="feedDialog.show" :paper-detail="feedDialog.paperDetail" :question-id="feedDialog.questionId" />
            <AnswerQuestionsModel
                :is-show.sync="showAnswerQuestions"
                :subject-id="answerQuestionsSubjectId"
                :project-id="projectId"
                :questions-id="answerQuestionsId"
                :paper-id="paperId"
                :answer-questions-stem-id="answerQuestionsStemId"
                :answer-sheet-id="answersheetId"
            />
        </div>
        <!-- 公共底部 -->
        <global-footer />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import GlobalHeader from '~/layouts/components/global-header';
import GlobalFooter from '~/layouts/components/global-footer';
import ReportHeader from '@/www/components/learningCenter/evaluation-report/header'; //头部名称展示
import QuestionCardBottom from '@/www/components/learningCenter/do-question/question-card-bottom'; //底部答题卡
import TestExam from '@/www/components/components/question/question-init.vue';
import ReportTranscript from '@/www/components/learningCenter/evaluation-report/report-transcript';
import EmptyPage from '@/www/components/learningCenter/do-question/empty-page';
import AnswerQuestionsModel from '@/www/components/components/question/answer-questions-model.vue'; // 学习答疑弹窗
import Paper from '@/www/components/components/question/js/paper.js';
import '@/api/qb/api..delete-error-question-by-questionId';
import '@/api/qb/api..support-transcript.js'; // 接口-查询学习中心成绩单
import '@/api/qb/api..qb-auth-paper';
import MiXins from '@/www/components/learningCenter/do-question/mixins';
import QuestionMiXins from '@/www/components/components/question/mixins';
export default {
    components: {
        GlobalHeader,
        GlobalFooter,
        ReportHeader,
        TestExam,
        ReportTranscript,
        EmptyPage,
        AnswerQuestionsModel,
        QuestionCardBottom,
    },
    mixins: [MiXins, QuestionMiXins],
    layout: 'nullLayout',
    data() {
        return {
            loading: true, // 页面是否刷新中
            doType: '',
            pageName: '',
            crumbs: [{ name: '学习中心', href: '/learningCenter/index' }],
            paperId: '',
            answersheetId: '',
            classId: '',
            projectUniCode: '', //项目Code
            projectId: '',
            subjectId: '', //科目标识
            questionTotal: '', //科目标识
            testPaper: null, // 试卷实例
            questionList: [], // 所有小题列表
            paperQuestionTypeList: [], // 所有大题题型列表
            paperDetail: {},
            current: 0, // 当前试题index
            isAutomaticJump: false, // 是否自动跳转下一题
            isAllQuestion: false, // 是否展开全部试题
            smartReviewStatus: false, // 是否智能阅卷
            submitLoading: false,
            answerList: [], //答题卡试题列表
            answerCardOpen: true,
            transcript: {}, // 成绩单数据
            authStatus: true,
            projectName: '',
            subjectName: '',
            showAnswerQuestions: false, // 学习答疑弹窗
            answerQuestionsId: '', // 学习答疑弹窗试题id
            answerQuestionsSubjectId: '', // 答疑弹窗使用 subjectId
            answerQuestionsStemId: '', // 学习答题大题id
        };
    },
    computed: {
        paperSourceType() {
            let result = '';
            result = this.doType === 'CTB' ? 'errorBook' : result;
            result = this.doType === 'SCLX' ? 'collectBook' : result;
            return result;
        },
    },
    watch: {
        isAllQuestion(val) {
            this.$nextTick(() => {
                this.scrollObserver();
            });
        },
    },
    mounted() {
        const { projectUniCode, doType, subjectId, answersheetId, paperId } = this.$route.params;
        const { projectName, subjectName } = this.$route.query;
        this.projectId = this.$route.query.projectId;
        this.projectUniCode = projectUniCode;
        this.subjectId = subjectId;
        this.doType = doType;
        this.projectName = projectName || this.projectUniCode;
        this.subjectName = subjectName || '';
        this.answersheetId = answersheetId;
        this.paperId = paperId;
        this.queryTranscript();
        this.initData();
        this.pageName = this.doType === 'CTB' ? '错题本' : '收藏夹';
        const doTypeObj = {
            CTB: `/learningCenter/test-question/wrongly-answered-list?projectCode=${this.projectUniCode}&subjectId=${this.subjectId}`,
            SCLX: `/learningCenter/test-question/collected-list?projectCode=${this.projectUniCode}&subjectId=${this.subjectId}`,
        };
        this.crumbs.push({ name: this.pageName, href: doTypeObj[this.doType] });
        this.crumbs.push({ name: this.pageName + '解析页' });
    },
    methods: {
        ...mapActions('common/answer-questions-permissions', {
            getAnswerQuestionsPermissions: 'getAnswerQuestionsPermissions',
        }),
        // 学习答疑
        clickAnswerQuestions(questionData) {
            this.answerQuestionsStemId = questionData.stemId;
            this.answerQuestionsId = questionData.questionId;
            this.showAnswerQuestions = true;
        },
        /**
         * 页面初始化
         * 鉴权后，进行初始化试卷
         */
        initData() {
            this.paperAuthentication();
        },
        /**
         * 试卷鉴权
         */
        paperAuthentication() {
            this.$callApi('qb/qb-auth-paper', {
                paperId: this.paperId,
                onsuccess: (res) => {
                    this.authStatus = res.authStatus;
                    if (res.authStatus) {
                        this.initPaper();
                    } else {
                        this.loading = false;
                        this.errorMsg = '学员专属题库,您暂无权限,去别的地方看看吧~';
                    }
                },
                onerror: (err) => {
                    this.authStatus = false;
                    niceloo.api.handleFailure(err);
                    const description = err.getDescription();
                    if (description === 'DATA_NOT_FOUND') {
                        this.errorMsg = '加载失败,请重试';
                    } else {
                        this.errorMsg = description;
                    }
                    this.loading = false;
                },
            });
        },
        initPaper() {
            if (this.testPaper) return;
            this.loading = true;
            //错题本或收藏夹做题页交卷，进入解析
            return this.queryPaperQuestionsParse();
        },
        /**
         * 查询试卷全部解析或试卷错题解析
         * @param {Object} isWrong
         */
        queryPaperQuestionsParse() {
            this.loading = true;
            this.testPaper = new Paper({
                paperId: this.paperId,
                sourceType: $nuxt.context.env.config.learningCenterSourceType,
                answersheetId: this.answersheetId,
            });

            // 试卷初始化完成
            this.testPaper.onInitPaper(async () => {
                this.answerQuestionsSubjectId = this.testPaper.getPaperDetail().subjectId;
                var answerQuestionsPermissions = false;
                await this.getAnswerQuestionsPermissions({ subjectId: this.answerQuestionsSubjectId, projectId: this.projectId })
                    .then((res) => {
                        answerQuestionsPermissions = res;
                    })
                    .catch((err) => {
                        this.$baseUI.alert(err.getDescription());
                    });
                this.questionList = this.testPaper.getQuestionList((item, index) => {
                    item.parseonly = true;
                    item.showParseImmediately = this.isSupport ? index < 1 : true;
                    item.answerQuestionsPermissions = answerQuestionsPermissions;
                    //analysisYiGuanData 试题解析组件埋点上报数据
                    item.analysisYiGuanData = {
                        page_name: this.pageName,
                        project_name: this.projectName,
                        subject_name: this.subjectName,
                    };
                    return item;
                });
                this.paperQuestionTypeList = this.testPaper.getPaperQuestionTypeList();
                this.paperDetail = this.testPaper.getPaperDetail();
                console.log(`########testPaper############`, this.testPaper);
                this.answersheetId = this.testPaper.answersheetId;

                this.$nextTick(() => {
                    this.answerList = this.$refs.questions ? this.$refs.questions.getList() : this.questionList;
                });
                this.current = 0; // 设置默认索引，第一题为复合题型也能watch到
                // 为保证显示试卷时试卷组件已渲染完成而延迟300毫秒
                setTimeout(() => {
                    this.loading = false;
                }, 200);
            });

            this.testPaper.onError((errMsg) => {
                this.loading = false;
                this.errorMsg = errMsg === '暂无试题' ? errMsg + '解析' : '加载失败,请重试';
            });
        },

        /**
         * 移除错题
         */
        removeQuestion({ questionId }) {
            this.$baseUI.confirm({
                title: '确认提示',
                content: `确定从错题本移除此题目吗`,
                showCancel: true,
                confirm: () => {
                    this.$callApi('qb/delete-error-question-by-questionId', {
                        questionId,
                        sourceType: $nuxt.context.env.config.learningCenterSourceType,
                        onsuccess: (data) => {
                            //错题已移除
                            this.$Message.success('错题已移除');
                        },
                        onerror: this.$niceloo.api.handleFailure,
                        oncomplete: () => {},
                    });
                },
            });
        },
        /**
         * 点击答题卡上小题按钮
         */
        clickAnswersheet(question) {
            this.current = (this.questionList || []).findIndex((item) => item.questionId === question.questionId);
            console.log('current', this.current);
            // 全部试题模式切换到当前试题
            this.$nextTick(() => {
                let targetOffsetTop = 0;
                targetOffsetTop = document.getElementById(question.questionId).offsetTop;
                window.scrollTo({
                    top: targetOffsetTop,
                    behavior: 'smooth',
                });
            });
        },
        backList() {
            const doTypeObj = {
                CTB: `/learningCenter/test-question/wrongly-answered-list?projectCode=${this.projectUniCode}&subjectId=${this.subjectId}`,
                SCLX: `/learningCenter/test-question/collected-list?projectCode=${this.projectUniCode}&subjectId=${this.subjectId}`,
            };
            this.$router.push(doTypeObj[this.doType] || '/learningCenter/index');
        },
        /**
         * 查询学习中心成绩单
         */
        queryTranscript() {
            this.$callApi('qb/support-transcript', {
                answersheetId: this.answersheetId,
                isRank: 'Y',
                onsuccess: (res) => {
                    console.log(res);
                    this.transcript = res;
                },
                onerror: (err) => {
                    err.getDescription();
                },
            });
        },
        /**
         * 切换答题模式
         */
        changeAnswerMode(type) {
            if (!type) {
                this.$yiguan.learningCenter('web_learning_center_all_quetions', {
                    college_name: '',
                    page_name: this.pageName,
                    project_name: this.paperDetail.projectName,
                });
            }
            this.isAllQuestion = !type;
        },
    },
};
</script>

<style lang="less" scoped>
.do-questions-analysis {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 30px;
    min-height: 500px;
    user-select: none;

    .height-24 {
        height: 24px;
    }

    .height-16 {
        height: 16px;
    }
    .do-question {
        background-color: #fff;
        min-height: 500px;
    }
    /deep/ .report-wrap {
        width: 100%;
        .progress {
            margin-right: 80px;
        }
    }
    .report-transcript-box {
        padding: 16px;
        background-color: #fff;
    }
    .init-slot-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        height: 50px;
        .submit-btn {
            width: 240px;
            height: 40px;
            font-size: 16px;
            font-weight: 400;
            text-align: center;
            color: #ffffff;
            line-height: 40px;
            background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
            border-radius: 20px;
            cursor: pointer;
        }
    }
}
</style>
