//错题本收藏夹公共方法
import FeedbackModel from '@/www/components/components/question/feedback-model';
// 鉴权失败或试卷加载失败
import EmptyPage from '@/www/components/learningCenter/do-question/empty-page/index.vue';
export default {
    data() {
        return {
            feedDialog: {
                //反馈弹窗信息
                show: false, //是否显示反馈
                questionId: '',
                paperDetail: {},
            },
            errorMsg: '',
        };
    },
    components: {
        FeedbackModel,
        EmptyPage,
    },
    methods: {
        /**
         * 获取题目数据
         */
        getQuestionData() {
            return this.$refs.questions ? this.$refs.questions.getData() : this.questionList[this.current];
        },

        /**
         * 设置题目数据
         * @param {Object} data
         * @param {String} target 针对解析时考点列表按需加载添加的入参，非必传，可以理解为所操作数据在questionList中的index
         */
        setQuestionData(data, target) {
            if (target) {
                this.$refs.questions ? this.$refs.questions.setData(data, target) : Object.assign(this.questionList[Number(target)], data);
            } else {
                this.$refs.questions ? this.$refs.questions.setData(data) : Object.assign(this.questionList[this.current], data);
            }
            // 设置完题目数据之后，设置答题卡上的数据
            this.answerList = this.$refs.questions ? this.$refs.questions.getList() : this.questionList;
        },

        /**
         * 切换上一题
         */
        onPrev() {
            this.debounce(() => {
                if (this.current === 0) return;
                this.current--;
            });
        },

        /**
         * 切换下一题
         */
        onNext() {
            this.debounce(() => {
                if (this.current + 1 >= this.questionList.length) return;
                this.current++;
            });
        },

        /**
         * 防抖
         * @param {Object} callback
         */
        debounce(callback) {
            clearTimeout(this.timer);
            this.timer = setTimeout(callback, 200);
        },

        /**
         * 点击收藏
         */
        onFavorite(e) {
            const question = this.getQuestionData();
            // 取消收藏
            if (question.collectId) {
                this.testPaper.cancelCollect({
                    collectId: question.collectId,
                    success: (res) => {
                        this.setQuestionData({
                            collectId: '',
                        });
                        this.$Message.success(`该试题已取消收藏，从收藏夹移除`);
                    },
                });
            } else {
                // 添加收藏
                this.testPaper.addCollect({
                    questionId: question.questionId,
                    projectUniCode: this.projectUniCode,
                    success: (res) => {
                        this.setQuestionData({
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
                    paperName: this.paperDetail.paperName,
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
