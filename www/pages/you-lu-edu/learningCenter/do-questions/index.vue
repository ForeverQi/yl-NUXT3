<template>
    <div class="wrap">
        <!-- 公共头部 -->
        <global-header :is-fixed="false" />
        <div class="do-questions not-select" id="questionHeader">
            <!-- 面包屑 -->
            <div class="fix-header">
                <yl-breadcumb :items="crumbs" />
                <div class="height-24" />
                <question-header
                    v-if="!errorMsg"
                    need-fixed
                    :current="current + 1"
                    :total="paperDetail.questionTotalCount"
                    :do-type="doType"
                    :paper-name="pageName"
                    :btn-name="'返回' + pageName + '列表'"
                    @back="backList"
                />
                <div class="height-16" v-if="!errorMsg" />
            </div>
            <div class="do-question" v-if="!errorMsg" v-loading="loading">
                <test-exam
                    v-show="!loading && testPaper"
                    ref="questions"
                    class="test-exam"
                    :list="questionList"
                    :paper-question-type-list="paperQuestionTypeList"
                    :current.sync="current"
                    :paper-source-type="paperSourceType"
                    set-type
                    @onPrev="onPrev"
                    @onNext="onNext"
                    @onFavorite="debounce(onFavorite)"
                    @click-opinion="clickOpinion"
                    @onConfirmAnswer="onConfirmAnswer"
                    @changeAnswerMode="changeAnswerMode"
                    @handle-save="onSubmit"
                    @click-remove-errquestion="removeQuestion"
                    @click-answer-questions="clickAnswerQuestions"
                ></test-exam>
                <div class="init-slot-btn" v-if="isAllQuestion">
                    <div class="submit-btn" @click="onSubmit({ answerWay: 'manual' })">提交</div>
                </div>
                <!-- 答题卡 -->
                <question-card-bottom v-if="!loading && testPaper" :list="answerList" :paper-type="paperSourceType" @item-click="clickAnswersheet" />
            </div>
            <!-- 鉴权失败 -->
            <empty-page v-show="!loading && errorMsg && !authStatus" :msg="errorMsg" btn1="去看课" btn2="去做题" @btn1="goToClass" @btn2="goToQuestion" />

            <!-- 其他错误信息 -->
            <empty-page v-show="!loading && errorMsg && authStatus" :msg="errorMsg" :btn1="'返回' + pageName" @btn1="goList" />

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
import QuestionHeader from '@/www/components/learningCenter/do-question/header'; //头部名称展示
import QuestionCardBottom from '@/www/components/learningCenter/do-question/question-card-bottom'; //底部答题卡
import QuestionTool from '@/www/components/components/question/question-tool.vue';
import TestExam from '@/www/components/components/question/question-init.vue';
import Paper from '@/www/components/components/question/js/paper.js';
import AnswerQuestionsModel from '@/www/components/components/question/answer-questions-model.vue'; // 学习答疑弹窗
import '@/api/qb/api..delete-error-question-by-questionId';
import '@/api/qb/api..qb-auth-paper';

import MiXins from '@/www/components/learningCenter/do-question/mixins';

export default {
    components: {
        GlobalHeader,
        GlobalFooter,
        QuestionHeader,
        QuestionTool,
        QuestionCardBottom,
        TestExam,
        AnswerQuestionsModel,
    },
    mixins: [MiXins],
    /**
     * @returns {object} 当前实例
     */
    provide: {
        componentContainer: this,
    },
    layout: 'nullLayout',
    data() {
        return {
            loading: true, // 页面是否刷新中
            doType: '',
            pageName: '',
            crumbs: [{ name: '学习中心', href: '/learningCenter/index' }],
            paperId: '', //试卷标识
            projectUniCode: '', //项目SeoCode
            projectId: '',
            subjectId: '', //科目标识
            testPaper: null, // 试卷实例
            questionList: [], // 所有小题列表
            paperQuestionTypeList: [], // 所有大题题型列表
            paperDetail: {},
            current: 0, // 当前试题index
            isAutomaticJump: false, // 是否自动跳转下一题
            isAllQuestion: false, // 是否展开全部试题
            useTime: 0, // 答题总时间
            smartReviewStatus: false, // 是否智能阅卷
            answerList: [], //答题卡试题列表
            answersheetId: '', //答题卡标识
            authStatus: true, //鉴权,
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
    mounted() {
        const { projectUniCode, doType, subjectId, paperId } = this.$route.params;
        const { projectName, subjectName } = this.$route.query;
        this.projectId = this.$route.query.projectId;
        this.projectUniCode = projectUniCode;
        this.subjectId = subjectId;
        this.paperId = paperId;
        this.doType = doType;
        this.projectName = projectName || this.projectUniCode;
        this.subjectName = subjectName || '';
        this.initData();
        this.pageName = this.doType === 'CTB' ? '错题本' : '收藏夹';

        const doTypeObj = {
            CTB: `/learningCenter/test-question/wrongly-answered-list?projectCode=${this.projectUniCode}&subjectId=${this.subjectId}`,
            SCLX: `/learningCenter/test-question/collected-list?projectCode=${this.projectUniCode}&subjectId=${this.subjectId}`,
        };
        this.crumbs.push({ name: this.pageName, href: doTypeObj[this.doType] });
        this.crumbs.push({ name: this.pageName + '做题页' });
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
                        this.errorMsg = '学员专属题库,您暂无权限,去别的地方看看吧~';
                        this.loading = false;
                    }
                },
                onerror: (err) => {
                    this.authStatus = false;
                    niceloo.api.handleFailure(err);
                    const description = err.getDescription();
                    if (description === 'DATA_NOT_FOUND') {
                        this.errorMsg = '试卷不存在,去别的地方看看吧~';
                    } else {
                        this.errorMsg = description;
                    }
                    this.loading = false;
                },
            });
        },
        /**
         * 试卷初始化
         */
        initPaper() {
            if (this.testPaper) return;
            this.loading = true;
            this.testPaper = new Paper({
                paperId: this.paperId,
                sourceType: $nuxt.context.env.config.learningCenterSourceType,
                autoQueryLastAnswerSheetId: true,
            });

            // 监听试卷初始化成功
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
                // getQuestionList方法支持自定义格式化
                this.questionList = this.testPaper.getQuestionList((item, index) => {
                    item.hasConfirmAnswer = !!item.userAnswer;
                    item.parseonly = !!item.userAnswer;
                    item.answerQuestionsPermissions = answerQuestionsPermissions;
                    item.showParseImmediately = index <= 1 || !!item.userAnswer;
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
                this.examCountdown = this.paperDetail.examDurationTime;
                this.useTime = this.testPaper.useTime;
                this.answersheetId = this.testPaper.answersheetId;

                this.$nextTick(() => {
                    this.answerList = this.$refs.questions ? this.$refs.questions.getList() : this.questionList;
                });
                // 有答题卡时自动跳转到上次答题位置
                if (this.answersheetId) {
                    this.current = this.testPaper.getLastAnswerQuestionIndex((item) => {
                        return !item.userAnswer;
                    });
                } else {
                    this.current = 0; // 设置默认索引，第一题为复合题型也能watch到
                }
                console.log(this.testPaper, '#############试卷组装完成#############');
                // 为保证显示试卷时试卷组件已渲染完成而延迟300毫秒
                setTimeout(() => {
                    this.loading = false;
                }, 200);
            });

            // 监听试卷初始化失败
            this.testPaper.onError((errMsg) => {
                this.loading = false;
                this.errorMsg = errMsg || '加载失败,请重试';
            });
        },
        /**
         * 确定答案（指用户点击了确认答案按钮）
         * @param {Object} answer
         */
        onConfirmAnswer(answer) {
            // 错题本和收藏夹试题，答题后立即显示答案解析
            if (['CTB', 'SCLX'].includes(this.doType)) {
                this.setQuestionData({
                    hasConfirmAnswer: !!answer,
                    parseonly: true,
                    showParseButton: true,
                    showParseImmediately: true,
                });
                // 调用保存接口进行保存
                this.debounce(() => {
                    this.onSave();
                });
            }
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
         * 保存已做进度
         */
        onSave() {
            const questions = this.$refs.questions.getList();
            questions.filter((item) => item.userAnswer);

            this.testPaper.saveOrSubmitAnswer({
                answerStatus: 'temporary', // 作答状态
                answerWay: 'manual', // 交卷方式:automatic自动、manual手动
                answerScene: 'brush', // 作答场景:brush刷题
                intelligentMarking: this.smartReviewStatus, // 是否智能阅卷（本期没有智能阅卷，默认false）
                useTime: this.useTime,
                extension: JSON.stringify({
                    callBackStatus: false,
                    callbackSource: 'intelligent',
                }),
                questions: questions.filter((item) => item.userAnswer),
                success: (res) => {
                    this.answersheetId = res.answerSheetId;
                },
                fail: (err) => {
                    this.$niceloo.api.handleFailure(err);
                },
            });
        },

        /**
         * 提交答案
         * @param {Object} obj 其实就是用来控制是手动还是自动交卷的
         * @param {String} obj.answerWay 交卷方式，枚举值：automatic自动、manual手动
         */
        onSubmit(obj) {
            const questions = this.$refs.questions.getList();

            // 计算未做题数
            let notDoneNum = 0;
            for (let item of questions) {
                if (!(item.userAnswer && item.userAnswer.length)) {
                    notDoneNum++;
                }
            }
            let answerWay = 'manual';

            // 定义提交答案
            const submitPaper = () => {
                this.loading = true;
                this.testPaper.saveOrSubmitAnswer({
                    answerStatus: 'finished', // 作答状态
                    answerWay, // 交卷方式:automatic自动、manual手动
                    answerScene: 'brush', // 作答场景
                    intelligentMarking: this.smartReviewStatus, // 是否智能阅卷，本期不做智能阅卷，默认false
                    useTime: this.useTime,
                    extension: JSON.stringify({
                        callBackStatus: false,
                        callbackSource: 'intelligent',
                    }),
                    questions: questions.filter((item) => item.userAnswer),
                    success: (res) => {
                        this.answersheetId = res.answerSheetId;
                        // 无论什么交卷方式，均跳转到解析页
                        this.loading = false;
                        // 记得问问保存后的回调都啥
                        this.$router.push(
                            `/learningCenter/question-test-result/${this.doType}/${this.projectUniCode}/${this.subjectId}/${this.answersheetId}/${this.paperId}?projectName=${this.projectName}&subjectName=${this.subjectName}&projectId=${this.projectId}`
                        );
                    },
                    fail: (err) => {
                        this.$niceloo.api.handleFailure(err);
                        this.loading = false;
                    },
                });
            };
            if (notDoneNum > 0) {
                // 这里应该有个询问弹窗，在弹窗的确认按钮回调中进行提交
                this.$baseUI.confirm({
                    title: '确认提示',
                    content: `您还有${notDoneNum}道题未做,确定要提交试卷吗`,
                    showCancel: true,
                    confirm: () => {
                        this.debounce(submitPaper);
                    },
                });
            } else {
                this.debounce(submitPaper);
            }
        },
        /**
         * 点击答题卡上小题按钮
         */
        clickAnswersheet(question) {
            this.current = (this.questionList || []).findIndex((item) => item.questionId === question.questionId);
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
        //返回错题本/收藏夹列表
        goList() {
            const doTypeObj = {
                CTB: `/learningCenter/test-question/wrongly-answered-list?projectCode=${this.projectUniCode}&subjectId=${this.subjectId}`,
                SCLX: `/learningCenter/test-question/collected-list?projectCode=${this.projectUniCode}&subjectId=${this.subjectId}`,
            };
            this.$router.push(doTypeObj[this.doType] || '/learningCenter/index');
        },
        backList() {
            this.$baseUI.confirm({
                title: '确认信息',
                content: `您还没有提交试卷,确定要返回${this.pageName}列表吗`,
                showCancel: true,
                confirm: () => {
                    this.goList();
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
.do-questions {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 30px;
    min-height: 600px;
    user-select: none;
    /deep/ .test-exam {
        min-height: 262px;
    }
    .do-question {
        background-color: #fff;
        min-height: 500px;
    }

    .height-24 {
        height: 24px;
    }

    .height-16 {
        height: 16px;
    }
    .init-slot-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        height: 50px;
        padding: 30px 0;
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
