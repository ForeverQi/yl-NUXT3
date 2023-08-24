<template>
    <article class="exam-container">
        <header class="header-container">
            <img src="./asset/images/icon.png" class="logo" alt="国徽" />
            <h1 class="exam-title">全国消防行业职业技能鉴定在线考试（理论场）模拟系统</h1>
        </header>
        <div class="content" v-loading="loading" v-if="isPaperEnable">
            <answer-sheet :question-list="questionList" @location="handleLocation"></answer-sheet>
            <questions-view
                class="question-detail"
                :question-list="questionList"
                :refresh="isLoadingDetail"
                :location="locationItem"
                :paper-info="paperInfo"
            ></questions-view>
            <exam-info
                :paper-info="paperInfo"
                :question-list="questionList"
                ref="examInfo"
                @submit="handleSubmit"
                @jump="jump"
                :paper-enable="isPaperEnable"
            ></exam-info>
        </div>
        <empty :tip="emptyTip" v-else></empty>
    </article>
</template>

<script>
import AnswerSheet from '@/www/components/learningCenter/simulated-exam/fire-exam/answer-sheet.vue';
import QuestionsView from '@/www/components/learningCenter/simulated-exam/fire-exam/questions-view.vue';
import ExamInfo from '@/www/components/learningCenter/simulated-exam/fire-exam/exam-info.vue';
import Empty from '@/www/components/learningCenter/simulated-exam/fire-exam/empty.vue';

import '@/api/qb/api..courseware-paper-authentication'; // 接口-视频鉴权
import '@/api/qb/api.QB0003.query-paper-profile-list.js';
import '@/api/qb/api.QB2004.query-answersheet-record2.js';
import '@/api/qb/api..support-transcript.js';

export default {
    components: {
        AnswerSheet,
        QuestionsView,
        ExamInfo,
        Empty,
    },
    layout: 'nullLayout',
    data() {
        return {
            loading: false,
            answersheetId: '',
            ccClassInfo: null,
            classInfo: null,
            paperInfo: null,
            isPaperEnable: true,
            emptyTip: '',
            questionList: [],
            isLoadingDetail: false,
            locationItem: null,
            userInfo: null,
        };
    },
    mounted() {
        this.classUniquecode = this.$route.query.classUniquecode || 'YIJIAN';
        this.ctapId = this.$route.query.ctapId || 'CTAP20220614260000000001';
        this.subjectId = this.$route.query.subjectId || this.$route.params.subjectId || 'SUBJECT20191126010000000393';
        this.coursewareId = this.$route.query.coursewareId || 'COURSEWARE20220707830000000009';
        this.paperId = this.$route.query.paperId || 'PAPER20210121010000000201';
        this.classId = this.$route.query.classId || 'CLASS20220614260000000039';
        this.loading = true;
        if (this.$User.getToken()) {
            this.$User.getUser().then((res) => {
                this.userInfo = res;
            });
        }

        window.addEventListener('beforeunload', () => {
            this.saveAnswers();
            sessionStorage.removeItem(`${this.paperInfo.paperId}_time`);
        });

        this.paperAuthentication()
            .then(() => {
                return this.getPaperInfo();
            })
            .then(() => {
                return this.getAnswersheetId();
            })
            .then(() => {
                return this.getAnswerSheetList();
            })
            .then(() => {
                return this.getClassInfo();
            })
            .then(() => {
                return this.getCcClassInfo();
            })
            .catch((err) => {
                console.warn(err);
                err.showDialog !== false && this.$baseUI.alert(err?.getDescription());
            })
            .finally(() => {
                this.loading = false;
            });
    },
    methods: {
        paperAuthentication() {
            return this.$callApi('qb/courseware-paper-authentication', {
                coursewareId: this.coursewareId,
                paperId: this.paperId,
                classId: this.classId,
            })
                .then(({ getData }) => {
                    return getData();
                })
                .then((res) => {
                    console.log(res);
                    this.subjectiveQuestionGradingMethod = res.subjectiveQuestionGradingMethod;
                })
                .catch((err) => {
                    this.isPaperEnable = false;
                    this.emptyTip = err instanceof Object ? err.getAttachedData().getMsg() : err;
                    err.showDialog = false;
                    return Promise.reject(err);
                });
        },
        getPaperInfo() {
            return this.$callRawApi({
                api: 'qb/paper/profile/info',
                params: {
                    paperId: this.paperId,
                },
            })
                .then(({ getData }) => {
                    return getData();
                })
                .then((res) => {
                    this.paperInfo = res;
                    sessionStorage.removeItem(`${this.paperInfo.paperId}_time`);
                });
        },
        getAnswersheetId() {
            return this.$callApi('qb/query-paper-profile-list', {
                sourceType: 'YOULU.MNJK',
                paperIds: this.paperId,
                papertypeCode: this.paperInfo?.papertypeCode,
            })
                .then(({ getData }) => {
                    return getData();
                })
                .then((res) => {
                    if (res.data.length > 0) {
                        this.answersheetId = res.data[0].answersheetId;
                    } else {
                        console.warn(res);
                    }
                });
        },
        getAnswerSheetList() {
            return this.$callRawApi({
                api: 'qb/papersubject/profile/list',
                params: {
                    paperId: this.paperId,
                },
            })
                .then(({ getData }) => {
                    return getData();
                })
                .then(({ data = [] }) => {
                    const dataList = data.filter((item) => {
                        return item.questionType === 'S' || item.questionType === 'M' || item.questionType === 'J' || item.questionType === 'I';
                    });
                    dataList.forEach((item) => {
                        item.questionList = [];
                    });
                    this.questionList.splice(0, this.questionList.length, ...dataList);
                    console.warn('getAnswerSheetList', this.questionList);
                    // 兼容问题
                    this.isLoadingDetail = false;
                    Promise.all(
                        dataList.map((item) => {
                            return this.getQuestionDetail(item);
                        })
                    )
                        .then((res) => {
                            res.forEach((item, index) => {
                                item.forEach((qitem) => {
                                    const content = JSON.parse(qitem.questionContent);
                                    qitem.isTwoColumn = false;
                                    qitem.isOneColumn = false;
                                    qitem.flexRate = 'auto';
                                    qitem.title = content.title;
                                    qitem.option = content.option;
                                    qitem.answer = qitem.questionType === 'M' || qitem.questionType === 'I' ? [] : '';
                                });
                                this.questionList[index].questionList.splice(0, this.questionList[index].questionList.length, ...item);
                            });
                        })
                        .catch((err) => {
                            console.warn(err);
                        })
                        .finally(() => {
                            this.isLoadingDetail = true;
                        });
                });
        },
        getClassInfo() {
            return this.$callRawApi({
                api: 'qb/class/info',
                params: {
                    classUniquecode: this.classUniquecode,
                },
            }).then(({ getData }) => {
                this.classInfo = getData();
            });
        },
        getCcClassInfo() {
            return this.$callRawApi({
                api: 'cc/user/class/info/byid',
                params: {
                    classId: this.classId,
                },
            }).then(({ getData }) => {
                this.ccClassInfo = getData();
            });
        },
        getQuestionDetail(params) {
            return this.$callRawApi({
                api: 'qb/paperquestiondetail/question/list',
                params: {
                    sourceType: 'YOULU.MNJK',
                    paperId: this.paperId,
                    papersubjectId: params.papersubjectId,
                },
            }).then(({ getData }) => {
                const { data = [] } = getData();
                return data;
            });
        },
        saveAnswers() {
            const obj = this.getAnswerList();
            localStorage.setItem(`${this.paperInfo.paperId}_answer`, JSON.stringify(obj));
        },
        getAnswerList() {
            const answers = [];
            for (const item of this.questionList) {
                for (const qitem of item.questionList) {
                    switch (qitem.questionType) {
                        default:
                            answers.push(this.getAnswer(qitem));
                            break;
                    }
                }
            }
            return answers;
        },
        getAnswer(item) {
            const snw = {
                paperSubjectId: item.papersubjectId, //试卷主题标识
                paperQuestionDetailId: item.paperquestiondetailId, //试卷试题标识
                paperQuestionDetailSeq: item.paperquestiondetailSeq, //试卷试题序号
                answerTime: 0,
            };
            if (item.questionType === 'S' || item.questionType === 'J') {
                snw.userAnswer = item.answer;
            } else if (item.questionType === 'M' || item.questionType === 'I') {
                snw.userAnswer = item.answer.sort().join();
            }
            return snw;
        },
        async handExaminationPaper(answerWay = 'M', answerSheetId = '', userAnswers) {
            if (!this.paperInfo) {
                console.log('数据非法');
                return Promise.reject('数据非法');
            }

            const answers = this.getAnswerList();
            const extension = {
                classId: this.classId,
                courseWareId: this.coursewareId,
                callBackStatus: true,
                callType: 'Q',
                callbackSource: 'intelligent',
                callUrl: `${this.$nuxt.context.env.config.umsuApiUrl}/igt/callback/qbAnswerSheet`,
            };
            const saveParams = {
                paperId: this.paperInfo.paperId,
                answerStatus: 'A',
                answerDurationTime: this.$refs.examInfo.getRemainingTime(),
                answerWay,
                answerScene: 'B',
                sourceType: 'YOULU.STUDY',
                userAnswers: userAnswers || answers,
                ctype: 'YOULU.WEB',
                extension: await this.$PromotionUtil.getExtension(extension),
                intelligentMarking: this.subjectiveQuestionGradingMethod === 'AUTO',
                answerSheetId,
            };

            if (this.subjectId) {
                const extension = JSON.parse(saveParams.extension);
                extension.subjectId = this.subjectId;
                saveParams.extension = JSON.stringify(extension);
            }
            return this.$callRawApi({
                api: 'qb/compute/paper/answer',
                params: saveParams,
            })
                .then(({ getData }) => {
                    return getData();
                })
                .then((res) => {
                    if (answerSheetId || userAnswers) {
                        return;
                    }
                    this.retAnswerSheetId = res.answerSheetId || res.answersheetId;
                    localStorage.removeItem(`${this.paperInfo.paperId}_answer`);
                    return this.queryScore(this.retAnswerSheetId);
                })
                .then((res) => {
                    if (answerSheetId || userAnswers) {
                        return;
                    }
                    res.objQuestionScoreCalculate = this.questionList
                        .map((item) => item.papersubjectTotalscore)
                        .concat(0)
                        .reduce((cur, next) => cur + next);
                    this.$refs.examInfo.submitSuccess(answerWay, res);
                });
        },
        queryScore(answersheetId) {
            return this.$callApi('qb/support-transcript', {
                answersheetId,
            }).then(({ getData }) => {
                return getData();
            });
        },
        jump() {
            const routeData = this.$router.resolve({
                path: `/learningCenter/paper-test-result/${this.paperId}/${this.retAnswerSheetId}/${this.subjectId}/${this.paperInfo.papertypeCode}/${this.coursewareId}/${this.classId}?ctapId=${this.ctapId}&className=${this.ccClassInfo?.className}`,
            });
            window.open(routeData.href, '_self');
        },
        handleSubmit(answerWay) {
            this.handExaminationPaper(answerWay).catch((err) => {
                console.warn(err);
                const er = err.getAttachedData().getData();
                if (er.code === '40005') {
                    this.handExaminationPaper(answerWay, er.msg, [])
                        .then(() => {
                            return this.handExaminationPaper(answerWay);
                        })
                        .catch((er) => {
                            this.$refs.examInfo.submitError();
                            this.$baseUI.alert(er.getDescription());
                        });
                } else {
                    this.$refs.examInfo.submitError();
                    this.$baseUI.alert(err.getDescription());
                }
            });
        },
        handleLocation(item) {
            this.locationItem = item;
        },
    },
};
</script>

<style scoped lang="less">
article,
header {
    border: 0;
    font-weight: normal;
    display: block;
}
.exam-container {
    display: flex;
    flex-direction: column;
    height: 100vh;

    .header-container {
        background-color: #3260a8;
        color: white;
        line-height: 57px;
        display: flex;
        align-items: center;

        h1 {
            font-size: 18px;
            font-weight: bold;
        }
        .logo {
            width: 40px;
            height: 41px;
            margin-right: 16px;
            margin-left: 80px;
        }
    }
    .content {
        flex: 1;
        padding: 12px 35px;
        display: flex;
        align-items: flex-start;
        overflow: auto;
        .question-detail {
            flex: 1;
        }
    }
}
</style>
