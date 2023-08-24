<template>
    <div class="question-model-box">
        <Question-init
            class="question-init"
            v-loading="loading"
            loading-background="#fff"
            ref="testPaper"
            paper-source-type="questionModel"
            :show-close-all="false"
            :current.sync="current"
            :list="questionList"
            :show-knowledge="false"
            show-type="origin"
            @onFavorite="onFavorite"
            @onPrev="onPrev"
            @onNext="onNext"
            @onConfirmAnswer="onConfirmAnswer"
            @handle-save="onSave"
            @click-opinion="clickOpinion"
            @click-answer-questions="clickAnswerQuestions"
        />
        <FeedbackModel :is-show.sync="showFeedback" :paper-detail="paperDetail" :question-id="questionId" />
        <AnswerQuestionsModel
            :is-show.sync="showAnswerQuestions"
            :subject-id="answerQuestionsSubjectId"
            :project-id="projectId"
            :questions-id="questionId"
            :paper-id="paperId"
            :answer-questions-stem-id="answerQuestionsStemId"
            :answer-sheet-id="answersheetId"
        />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import FeedbackModel from './feedback-model';
import AnswerQuestionsModel from '@/www/components/components/question/answer-questions-model.vue'; // 学习答疑弹窗
import QuestionInit from '@/www/components/components/question/question-init.vue';
import Paper from '@/www/components/components/question/js/paper.js';
export default {
    name: 'question-model',
    components: {
        QuestionInit,
        FeedbackModel,
        AnswerQuestionsModel,
    },
    props: {
        subjectId: {
            type: String,
            default: '',
        },
        classId: {
            type: String,
            default: '',
        },
        paperId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            projectId: '',
            answersheetId: '',
            loading: false,
            papertypeCode: '',
            current: 0,
            testPaper: null,
            paperDetail: {},
            questionList: [],
            showFeedback: false,
            questionId: '',
            showAnswerQuestions: false, // 学习答疑弹窗
            answerQuestionsSubjectId: '', // 答疑弹窗使用 subjectId
            answerQuestionsStemId: '', // 学习答题大题id
        };
    },
    mounted() {
        this.initPaper();
    },
    methods: {
        ...mapActions('common/answer-questions-permissions', {
            getAnswerQuestionsPermissions: 'getAnswerQuestionsPermissions',
        }),
        // 学习答疑
        clickAnswerQuestions(questionData) {
            this.questionId = questionData.questionId;
            this.answerQuestionsStemId = questionData.stemId;
            this.showAnswerQuestions = true;
        },
        // 开启意见反馈弹窗
        clickOpinion(data) {
            this.questionId = data.questionId;
            this.showFeedback = true;
        },
        // 试卷初始化
        initPaper() {
            if (this.testPaper) return;
            this.loading = true;
            this.testPaper = new Paper({
                paperId: this.paperId,
                sourceType: $nuxt.context.env.config.learningCenterSourceType,
                autoQueryLastAnswerSheetId: true,
                showType: 'practice',
            });
            // 监听试卷初始化成功
            this.testPaper.onInitPaper(async () => {
                this.projectId = this.testPaper.getPaperDetail().projectId;
                this.answerQuestionsSubjectId = this.testPaper.getPaperDetail().subjectId;
                var answerQuestionsPermissions = false;
                await this.getAnswerQuestionsPermissions({ subjectId: this.answerQuestionsSubjectId, projectId: this.projectId })
                    .then((res) => {
                        answerQuestionsPermissions = res;
                    })
                    .catch((err) => {
                        this.$baseUI.alert(err.getDescription());
                    });
                this.questionList = this.testPaper.getQuestionList((item) => {
                    item.answerQuestionsPermissions = answerQuestionsPermissions;
                    return item;
                }); // 全部试题列表
                this.$emit('set-question-all-count', this.questionList.length);
                this.paperDetail = this.testPaper.getPaperDetail();
                // this.answersheetId = this.testPaper.answersheetId;
                // 有答题卡时自动跳转到上次答题位置
                // if (this.answersheetId) {
                //     this.current = this.testPaper.getLastAnswerQuestionIndex((item) => {
                //         return !item.userAnswer;
                //     });
                // } else {
                //     this.current = 0; // 设置默认索引，第一题为复合题型也能watch到
                // }
                // console.log(this.testPaper, '#############试卷组装完成 <=====>#############');
                this.loading = false;
            });
            // 监听试卷初始化失败
            this.testPaper.onError((errMsg) => {
                this.loading = false;
                console.error(errMsg);
            });
        },
        // 收藏事件
        onFavorite(e) {
            const question = this.getQuestionData();
            // 取消收藏
            if (question.collectId) {
                this.testPaper.cancelCollect({
                    collectId: question.collectId,
                });
                this.setQuestionData({
                    collectId: '',
                });
            } else {
                // 添加收藏
                this.testPaper.addCollect({
                    questionId: question.questionId,
                    success: (res) => {
                        this.setQuestionData({
                            collectId: res.collectId,
                        });
                    },
                    fail: (err) => {
                        console.error(err);
                    },
                });
            }
        },
        // 上一题
        onPrev() {
            this.debounce(() => {
                if (this.current === 0) return;
                this.current--;
                this.$emit('set-current', this.current);
            });
        },
        // 下一题
        onNext() {
            this.debounce(() => {
                if (this.current + 1 >= this.questionList.length) return;
                this.current++;
                this.$emit('set-current', this.current);
            });
        },
        // 确认答案
        onConfirmAnswer(answer) {
            this.setQuestionData({
                userAnswer: answer,
                hasConfirmAnswer: !!answer,
                parseonly: true,
                showParseButton: true,
                showParseImmediately: true,
            });
            // 调用保存接口进行保存
            // this.onSave();
        },
        // 获取题目数据
        getQuestionData() {
            return this.$refs.testPaper ? this.$refs.testPaper.getData() : this.questionList[this.current];
        },
        /**
         * 设置题目数据
         * @param {Object} data
         */
        setQuestionData(data) {
            this.$refs.testPaper ? this.$refs.testPaper.setData(data) : Object.assign(this.questionList[this.current], data);
            // 设置完题目数据之后，设置答题卡上的数据
            this.answerList = this.$refs.testPaper ? this.$refs.testPaper.getList() : this.questionList;
        },
        // 防抖
        debounce(callback) {
            clearTimeout(this.timer);
            this.timer = setTimeout(callback, 200);
        },
        // 调用保存接口
        onSave(setContent = false) {
            const questions = this.$refs.testPaper.getList();
            let notDoneNum = 0;
            for (let item of questions) {
                if (!(item.userAnswer && item.userAnswer.length)) {
                    notDoneNum++;
                }
            }
            if (setContent && notDoneNum === questions.length) {
                this.$emit('close-paper');
                return;
            }
            if (notDoneNum === 0) {
                return this.saveQuestion(setContent);
            }
            this.$baseUI.confirm({
                title: '确认信息',
                content: `您还有${notDoneNum}道题未做，${setContent ? '确定要退出吗' : '确定要提交试卷吗'}？`,
                showCancel: true,
                confirm: () => {
                    this.saveQuestion(setContent);
                },
            });
        },
        // 提交试卷
        saveQuestion(setContent) {
            const questions = this.$refs.testPaper.getList();
            const extension = JSON.stringify({
                callBackStatus: !!(this.classId && this.subjectId),
                classId: this.classId,
                subjectId: this.subjectId,
                callbackSource: 'intelligent',
            });
            questions.filter((item) => item.userAnswer);

            this.testPaper.saveOrSubmitAnswer({
                answerStatus: 'A', // 作答状态
                answerWay: 'manual', // 交卷方式:automatic自动、manual手动
                answerScene: 'brush', // 作答场景:brush刷题
                intelligentMarking: false, // 是否智能阅卷（本期没有智能阅卷，默认false）
                useTime: 0,
                extension,
                questions: questions.filter((item) => item.userAnswer),
                success: (res) => {
                    this.answersheetId = res.answerSheetId;
                    if (setContent) {
                        this.$emit('close-paper', this.answersheetId);
                    } else {
                        this.$emit('post-paper', this.answersheetId);
                    }
                },
                fail: (err) => {
                    // console.log('err===>', err);
                    this.$baseUI.alert(err.getDescription(), '提示', {
                        success: () => {
                            this.$emit('post-paper-err');
                        },
                    });
                },
            });
        },
    },
};
</script>
<style lang="less" scoped>
.question-init {
    min-height: 500px;
}
</style>
