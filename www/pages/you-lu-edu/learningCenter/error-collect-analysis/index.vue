<template>
    <div class="wrap">
        <!-- 公共头部 -->
        <global-header :is-fixed="false" />
        <div class="error-collect-analysis not-select">
            <!-- 面包屑 -->
            <div class="fix-header">
                <yl-breadcumb :items="crumbs" />
                <div class="height-24" />
                <report-header
                    v-if="!errorMsg"
                    need-fixed
                    :show-again-btn="false"
                    :btn-name="'返回' + pageName"
                    :title="pageName + '全部答案解析'"
                    @goBack="backList"
                />
                <div class="height-16" v-if="!errorMsg" />
            </div>
            <div class="do-question" v-if="!errorMsg" v-loading="loading">
                <!--
                    show-user-answer analysis解析组件是否展示用户答案
                -->
                <!--{{ questionList }}-->
                <test-exam
                    v-show="!loading && testPaper"
                    ref="questions"
                    class="question-list"
                    paper-parsing
                    :set-type="true"
                    :show-user-answer="doType === 'CTB'"
                    paper-parsing-source="parsing"
                    :list="questionList"
                    :current.sync="current"
                    :total="page.pageCount"
                    :page-index="page.pageIndex"
                    :paper-source-type="paperSourceType"
                    @on-favorite="debounce(onFavorite)"
                    @click-opinion="clickOpinion"
                    @click-remove-errquestion="removeQuestion"
                    @click-answer-questions="clickAnswerQuestions"
                ></test-exam>
            </div>
            <div class="paging" v-if="!errorMsg && !loading && testPaper">
                <pagination
                    :total="page.pageCount"
                    :page-size="page.pageSize"
                    @current-change="pageChange"
                    :current-page="page.pageIndex"
                    :hide-on-single-page="!1"
                />
            </div>
            <!-- 没有权限或加载失败报错 -->
            <empty-page v-show="!loading && errorMsg" :msg="errorMsg" :btn1="'返回' + pageName" @btn1="backList" />
            <!-- 反馈建议弹窗 -->
            <FeedbackModel v-if="feedDialog.show" :is-show.sync="feedDialog.show" :paper-detail="feedDialog.paperDetail" :question-id="feedDialog.questionId" />
            <AnswerQuestionsModel
                :is-show.sync="showAnswerQuestions"
                :subject-id="subjectId"
                :project-id="projectId"
                :answer-questions-stem-id="answerQuestionsStemId"
                :questions-id="answerQuestionsId"
            />
        </div>
        <!-- 公共底部 -->
        <global-footer />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import TestExam from './components/question-show.vue';
import Pagination from '@/www/components/components/pagination'; // 分页
import GlobalHeader from '~/layouts/components/global-header';
import GlobalFooter from '~/layouts/components/global-footer';
import ReportHeader from '@/www/components/learningCenter/evaluation-report/header';
import QuestionHeader from '@/www/components/learningCenter/do-question/header'; //头部名称展示
import AnswerQuestionsModel from '@/www/components/components/question/answer-questions-model.vue'; // 学习答疑弹窗
//错题本收藏夹公共方法
import FeedbackModel from '@/www/components/components/question/feedback-model';
// 鉴权失败或试卷加载失败
import EmptyPage from '@/www/components/learningCenter/do-question/empty-page';
import Paper from '@/www/components/components/question/js/paper.js';
import '@/api/qb/api.QB3004.errorquestion-delete-logic';

import MiXins from '@/www/components/learningCenter/do-question/mixins';

export default {
    components: {
        GlobalHeader,
        GlobalFooter,
        ReportHeader,
        QuestionHeader,
        AnswerQuestionsModel,
        TestExam,
        Pagination,
        FeedbackModel,
        EmptyPage,
    },
    mixins: [MiXins],
    layout: 'nullLayout',
    data() {
        return {
            loading: true, // 页面是否刷新中
            doType: '',
            pageName: '',
            crumbs: [{ name: '学习中心', href: '/learningCenter/index' }],
            classId: '',
            questionType: '', //试题类型
            projectUniCode: '', //项目Code
            projectId: '', // 项目标识
            subjectId: '', //科目标识
            testPaper: null, // 试卷实例
            questionList: [], // 所有小题列表
            current: 0, // 当前试题index
            isFixed: false,
            page: {
                pageIndex: 1,
                pageSize: 5,
                pageCount: 0,
                pages: 0,
            },
            feedDialog: {
                //反馈弹窗信息
                show: false, //是否显示反馈
                questionId: '',
                paperDetail: {},
            },
            errorMsg: '',
            projectName: '',
            subjectName: '',
            showAnswerQuestions: false, // 学习答疑弹窗
            answerQuestionsId: '', // 学习答疑弹窗试题id
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
        const { projectUniCode, doType, subjectId, questionType } = this.$route.params;
        const { projectName, subjectName } = this.$route.query;
        this.projectId = this.$route.query.projectId;
        this.projectUniCode = projectUniCode;
        this.subjectId = subjectId;
        this.questionType = questionType;
        this.doType = doType;
        this.initPaper();
        this.pageName = this.doType === 'CTB' ? '错题本' : '收藏夹';
        this.projectName = projectName || this.projectUniCode;
        this.subjectName = subjectName || '';
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
            this.answerQuestionsId = questionData.questionId;
            this.answerQuestionsStemId = questionData.stemId;
            this.showAnswerQuestions = true;
        },
        pageChange(num) {
            this.page.pageIndex = num;
            this.queryWrongOrFavoriteQuestions();
            this.$nextTick(() => {
                const dm = document.querySelector('.fix-header');
                dm &&
                    dm.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
            });
        },
        initPaper() {
            if (this.testPaper) return;
            this.loading = true;
            this.queryWrongOrFavoriteQuestions();
        },
        /**
         * 查询错题/收藏列表
         */
        queryWrongOrFavoriteQuestions() {
            let options = {
                subjectId: this.subjectId, // 科目标识
                questionType: this.questionType, // 试题类型
            };
            // 从错题本进入查看解析，查询错题列表
            if (this.doType === 'CTB') {
                options.scene = 'wrong';
            }

            // 从收藏本进入查看解析，查询收藏列表
            if (this.doType === 'SCLX') {
                options.scene = 'collect';
            }
            this.loading = true;
            this.testPaper = new Paper({
                scene: options.scene,
                subjectId: options.subjectId,
                pageIndex: this.$PageUtil.getStartIndex(this.page),
                pageSize: this.page.pageSize, // 分页数量
                questionType: options.questionType, // 试题类型
                sourceType: $nuxt.context.env.config.learningCenterSourceType,
                projectUniCode: this.projectUniCode, // 项目唯一编码
            });
            this.testPaper.onInitPaper(async () => {
                this.questionList = this.testPaper.getQuestionList();
                if (!this.questionList.length) {
                    this.errorMsg = `暂无试题`;
                    this.loading = false;
                    return;
                }
                var answerQuestionsPermissions = false;
                await this.getAnswerQuestionsPermissions({ subjectId: this.subjectId, projectId: this.projectId })
                    .then((res) => {
                        answerQuestionsPermissions = res;
                    })
                    .catch((err) => {
                        this.$baseUI.alert(err.getDescription());
                    });
                this.page.pageCount = this.testPaper.getQuestionListCount();
                this.questionList = this.questionList.map((question) => {
                    question.parseonly = true;
                    question.showParseImmediately = true;
                    question.answerQuestionsPermissions = answerQuestionsPermissions;
                    question.notShowUserAnswer = this.doType === 'SCLX';
                    //analysisYiGuanData 试题解析组件埋点上报数据
                    question.analysisYiGuanData = {
                        page_name: this.pageName,
                        project_name: this.projectName,
                        subject_name: this.subjectName,
                    };
                    return question;
                });
                this.current = 0; // 设置默认索引，第一题为复合题型也能watch到
                this.loading = false;
            });

            this.testPaper.onError((err) => {
                const description = typeof err === 'string' ? err : err.getDescription();
                this.loading = false;
                this.errorMsg = description || '加载失败,请重试';
            });
        },
        /**
         * 移除错题
         */
        removeQuestion({ errorQuestionId, questionId }) {
            this.$baseUI.confirm({
                title: '确认提示',
                content: `确定从错题本移除此题目吗`,
                showCancel: true,
                confirm: () => {
                    this.$callApi('qb/errorquestion-delete-logic', {
                        errorquestionIds: errorQuestionId || questionId,
                        onsuccess: (data) => {
                            //错题已移除
                            this.$Message.success('错题已移除');

                            this.refreshQuestionList();
                        },
                        onerror: this.$niceloo.api.handleFailure,
                        oncomplete: () => {},
                    });
                },
            });
        },
        refreshQuestionList() {
            if (this.page.pageCount - 1 === 0) {
                this.backList();
            } else if ((this.page.pageCount - 1) % this.page.pageSize === 0) {
                if ((this.page.pageCount - 1) / this.page.pageIndex === this.page.pageSize) {
                    //剩余当前页-不切换页码
                } else {
                    //当前页无试题-切换页码
                    this.page.pageIndex--;
                }
                this.testPaper = null;
                this.current = 0; // 当前试题index
                this.initPaper();
            } else {
                //当前页还有试题不切换页码
                this.testPaper = null;
                this.current = 0; // 当前试题index
                this.initPaper();
            }
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
         * 设置题目数据
         * @param {Object} data
         */
        setQuestionData(data) {
            this.$refs.questions ? this.$refs.questions.setData(data) : Object.assign(this.questionList[this.current], data);
        },
        /**
         * 防止重复执行
         * @param {Object} callback
         */
        debounce(callback) {
            clearTimeout(this.timer);
            this.timer = setTimeout(callback, 200);
        },

        /**
         * 点击收藏
         */
        onFavorite() {
            const question = this.questionList[this.current];
            // 取消收藏
            if (question.collectId) {
                this.testPaper.cancelCollect({
                    collectId: question.collectId,
                    success: (res) => {
                        Object.assign(question, {
                            collectId: '',
                        });
                        this.$Message.success(`该试题已取消收藏，从收藏夹移除`);
                        if (this.doType === 'SCLX') {
                            this.refreshQuestionList();
                        }
                    },
                });
            } else {
                // 添加收藏
                this.testPaper.addCollect({
                    questionId: question.questionId,
                    projectUniCode: this.projectUniCode,
                    success: (res) => {
                        Object.assign(question, {
                            collectId: res.collectId,
                        });
                        this.$Message.success(`+1 收藏成功，可在课程列表收藏夹中查看`);
                    },
                    fail: (err) => {
                        console.error(err);
                    },
                });
            }
        },
        /**
         * 点击查看解析按钮(一旦点击过查看解析按钮，当前题目就不可做题)
         */
        onClickParseButton() {
            this.setQuestionData({
                parseonly: true,
                showParseImmediately: true,
            });
        },
        // 开启意见反馈弹窗
        clickOpinion(data) {
            this.feedDialog = {
                show: true,
                questionId: data.questionId,
                paperDetail: {
                    paperTypeCode: this.doType,
                    paperName: this.pageName,
                },
            };
        },
        goToClass() {
            this.$router.push('/pro-course');
        },
        goToQuestion() {
            this.$router.push('/exam/index/choose');
        },
    },
};
</script>

<style lang="less" scoped>
.error-collect-analysis {
    width: 1200px;
    margin: 0 auto;
    min-height: 500px;
    padding-bottom: 30px;
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
    .question-list {
        width: 1200px;
        position: relative;
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
    .paging {
        padding: 20px;
        text-align: center;
    }
}
</style>
