<template>
    <div class="question_box">
        <div class="header">
            <div class="header_l">
                <img src="./asset/images/h_logo.png" class="img" />
                做道题检验一下刚才学习的知识点吧：
            </div>
            <div class="header_r">
                <img class="count_img" src="./asset/images/time-icon.png" />
                计时：{{ durationTime }}
                <div class="back" @click="close">
                    <img class="back_img" src="./asset/images/left-arrow.png" />
                    返回
                </div>
            </div>
        </div>
        <div class="question">
            <component
                :key="curQuestion.questionId"
                v-if="componentName"
                :is="componentName"
                :show-parse-btn="true"
                :question-data="curQuestion"
                @value="changeValue"
                @parseToggle="parseToggle"
            />
        </div>

        <!-- all-parse -->
        <div class="pages-box">
            <div class="pages">
                <pagination v-if="questions.length > 0" :current-page="paper_seq" :pager-count="8" :page-data="questions" @change="changePage" />
            </div>
            <div class="handle" v-if="questions.length > 0">
                <div class="collect" @click="doCollect" v-if="curQuestion && curQuestion.collectStatus == 'Y'">
                    <img src="./asset/images/star.png" class="collect-img" />
                    取消收藏
                </div>
                <div class="collect" @click="doCollect" v-else>
                    <img src="./asset/images/no_star.png" class="collect-img" />
                    收藏试题
                </div>

                <div class="btn-wrap">
                    <div class="prev" @click="prev">上一题</div>
                    <div class="next" @click="submitPaper" v-if="paper_seq == questions.length - 1">提交答案</div>
                    <div class="next" @click="next" v-else>下一题</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/api/qb/api.QB0005.query-paper-detail.js'; // 获取试卷详情
import '@/api/qb/api.QB2007.saves-answersheet.js'; // 交卷
import '@/api/qb/api.QB0006.query-paper-question-type-list.js'; // 试卷概要
import '@/api/qb/api.QB0007.query-paper-question-list.js'; // 查询试卷主题题目明细列表
import '@/api/qb/api.QB9001.query-question-profile-list.js'; // 题目答案解析列表
import '@/api/qb/api.QB6002.cancel-collect.js'; // 用户取消收藏
import '@/api/qb/api.QB6001.add-colllect.js'; // 用户添加收藏
import '@/api/qb/api.QB6007.batch-query-collect-status.js'; // 获取用户收藏状态

import singleChoice from './questionTypes/singleChoice.vue'; // 单选题
import multipleChoice from './questionTypes/multipleChoice.vue'; // 多选题
import shortAnswer from './questionTypes/shortAnswer.vue'; // 简答题
import judge from './questionTypes/judge.vue'; // 判断题
import gapFilling from './questionTypes/gapFilling.vue'; // 填空
import analyze from './questionTypes/analyze.vue'; // 材料分析

import pagination from './interaction/pagination.vue'; // 分页显示

const questionComponentMap = {
    O: 'shortAnswer',
    S: 'singleChoice',
    M: 'multipleChoice',
    J: 'judge',
    F: 'gapFilling',
    A: 'analyze',
    I: 'multipleChoice',
    C: 'analyze',
};
export default {
    components: {
        singleChoice,
        multipleChoice,
        shortAnswer,
        judge,
        gapFilling,
        analyze,
        pagination,
    },
    props: {
        curCourse: {
            // 正在播放的课件信息
            type: Object,
            default() {
                return {};
            },
        },
        paperId: {
            // 试卷ID
            type: String,
            default: '',
        },
    },
    data() {
        return {
            paperInfo: {},
            page: {
                pageCount: 10000,
                pageSize: 10,
            },
            leftArrowClass: 'el-icon-more',
            rightArrowClass: 'el-icon-more',

            classId: this.$route.params.classId,
            answerIds: [], // 试题类型ID
            questionsMap: {}, // 试题map
            questions: [], // 试题列表

            questionsParse: [], // 试题解析
            questionsParseMap: {}, // 试题map

            paper_seq: 0,
            initTime: 0, // 起始时间
            isPause: false, // 是否暂停计时器

            answersheetId: '', // 答题卡标识
        };
    },
    computed: {
        durationTime() {
            // 时间倒计时
            let initTime = this.initTime;
            if (initTime < 0) {
                initTime = 0;
            }

            var hour = Math.floor(initTime / 3600);
            var minute = Math.floor((initTime - 3600 * hour) / 60);
            var second = Math.floor((initTime - 3600 * hour - 60 * minute) % 60);
            return (hour > 9 ? hour : `0${hour}`) + ':' + (minute > 9 ? minute : `0${minute}`) + ':' + (second > 9 ? second : `0${second}`);
        },
        componentName() {
            if (!this.curQuestion) {
                return false;
            }

            return questionComponentMap[this.curQuestion.paperQuestionType];
        },
        curQuestion() {
            if (this.questions.length == 0) {
                return null;
            }

            return this.questions[this.paper_seq];
        },
    },
    mounted() {
        // 考试页面
        this.$bus.$emit('SET_INTERACTION_STEP', 'exam');
        this.init();
    },
    methods: {
        init() {
            this.getData();
        },
        getData() {
            // 获取试卷信息
            this.getPaperInfo().then(() => {
                // 获取试卷概要
                this.getPaperSubjectTypes();
            });
        },
        getPaperInfo() {
            let data = {
                url: 'qb/query-paper-detail',
                params: {
                    paperId: this.paperId,
                    paperGainStatus: 'Y',
                },
            };
            return this.httpClient(data)
                .then((res) => {
                    this.paperInfo = res;
                })
                .catch((err) => {
                    this.$baseUI.alert(err);
                });
        },
        getPaperSubjectTypes() {
            // 获取试卷试题题型
            let data = {
                url: 'qb/query-paper-question-type-list',
                params: { paperId: this.paperInfo.paperId },
            };
            return this.httpClient(data)
                .then((data) => {
                    if (!Array.isArray(data.list) || data.list.length == 0) {
                        return Promise.reject();
                    }
                    data.list.forEach((r) => {
                        this.answerIds.push({ papersubjectId: r.paperSubjectId });
                    });
                    // 获取试题详情
                    return this.getSubjectInfo();
                })
                .then(() => {
                    // 获取试题解析
                    return this.getPaperParse().then(() => {
                        return this.getCollectStatus();
                    });
                })
                .catch(() => {
                    this.$baseUI.alert('试卷正在制作中哦~').then(() => {
                        this.close();
                    });
                });
        },
        getSubjectInfo() {
            // 获取题目详情
            return Promise.all(
                this.answerIds.map((item) => {
                    let data = {
                        url: 'qb/query-paper-question-list',
                        params: {
                            classUniquecode: this.paperInfo.classUniqueCode,
                            projectCode: this.paperInfo.projectCode,
                            paperId: this.paperInfo.paperId,
                            sourceType: this.$nuxt.context.env.config.sourceType,
                            paperSubjectId: item.papersubjectId,
                        },
                    };
                    return this.httpClient(data);
                })
            )
                .then((data) => {
                    this.questions = [];
                    let j = 0;
                    data.forEach((r) => {
                        r.list.forEach((r1, i) => {
                            let content = JSON.parse(r1.content);
                            let tmp = {
                                paper_sub_seq: j,
                                answer: null,
                                showParse: null,
                                hideError: true,
                                isZNLX: true,
                                collectStatus: '',
                                questionAnswerparse: '',
                                questionAnswer: '',
                                answersheetdetailUseranswer: '',
                                projectId: this.paperInfo.projectId, // 项目ID
                                projectCode: this.paperInfo.classUniqueCode,
                                subjectId: this.paperInfo.subjectId,
                                remark: ``,
                                ...r1,
                                ...content,
                            };
                            this.questionsMap[r1.questionId] = j++;
                            this.questions.push(tmp);
                        });
                    });

                    if (this.questions.length > 0) {
                        this.$nextTick(() => {
                            this.timeChange();
                        });
                    }
                })
                .catch(() => {
                    return Promise.reject();
                });
        },
        changePage(ev) {
            this.paper_seq = ev;
        },
        getCollectStatus() {
            // 获取收藏记录
            // 获取试题收藏状态
            let list = [];
            this.questions.forEach((item) => {
                list.push(item.questionId);
            });
            if (list.length == 0) {
                //没数据,不请求该接口,会报错
                return;
            }

            let data = {
                url: 'qb/batch-query-collect-status',
                params: {
                    collectContentType: 'Q',
                    collectContents: list.toString(),
                    sourceType: this.$nuxt.context.env.config.sourceType,
                    classUniqueCode: this.paperInfo.classUniqueCode,
                },
            };
            return this.httpClient(data).then((rs) => {
                rs.list.forEach((r) => {
                    let index = this.questionsMap[r.collectContent];
                    this.questions[index].collectId = r.collectId;
                    this.$set(this.questions[index], 'collectStatus', r.collectStatus === 'collect' ? 'Y' : 'N');
                });
            });
        },
        getPaperParse() {
            // 获取试题解析
            let ids = [];
            this.questions.forEach((r) => {
                ids.push(r.questionId);
            });
            let data = {
                url: 'qb/query-question-profile-list',
                params: {
                    ids: ids.toString(),
                },
            };
            return this.httpClient(data).then((res) => {
                this.questionsParse = res;
                res.forEach((r, i) => {
                    this.questionsParseMap[r.questionId] = i;
                });
            });
        },
        changeValue(item) {
            if (
                this.questions[this.paper_seq].questionType == 'M' ||
                this.questions[this.paper_seq].questionType == 'I' ||
                this.questions[this.paper_seq].questionType == 'O'
            ) {
                // 多选题 不定项选择 填空
                this.$set(this.questions[this.paper_seq], 'answer', item);
                this.$set(this.questions[this.paper_seq], 'styleClass', 'wrong');
            } else if (this.questions[this.paper_seq].questionType == 'F') {
                // 简答题
                this.$set(this.questions[this.paper_seq], 'answer', item);
                this.$set(this.questions[this.paper_seq], 'styleClass', 'wrong');
            } else {
                // 单选题 判断题
                this.$set(this.questions[this.paper_seq], 'answer', item.type);
                this.$set(this.questions[this.paper_seq], 'styleClass', 'wrong');
            }
        },
        timeChange() {
            // 时间累加
            this.initTime += 1;

            this.timer = setTimeout(() => {
                if (this.isPause) {
                    return;
                }
                this.timeChange();
            }, 1000);
        },
        doCollect() {
            let userInfo = this.$storage.get('loginStatus');
            let sendData = {
                collectContenttype: 'Q',
                collectContent: this.questions[this.paper_seq].questionId,
                collectId: this.questions[this.paper_seq].collectId,
                subjectId: this.questions[this.paper_seq].subjectId,
                userId: userInfo.userId,
                sourceType: this.$nuxt.context.env.config.sourceType,
                classUniqueCode: this.paperInfo.classUniqueCode,
                projectCode: this.paperInfo.classUniqueCode,
                collectRemark: this.questions[this.paper_seq].remark,
            };
            let that = this;
            let collectStatus = that.questions[that.paper_seq].collectStatus == 'N' ? 'Y' : 'N';
            let data = {
                url: '',
                params: sendData,
            };

            if (collectStatus == 'N') {
                data.url = 'qb/cancel-collect';
            } else {
                data.url = 'qb/add-colllect';
            }
            // 收藏试题
            this.httpClient(data).then((res) => {
                this.$set(this.questions[this.paper_seq], 'collectId', res && res.collectId ? res.collectId : '');
                this.$set(this.questions[this.paper_seq], 'collectStatus', collectStatus);
            });
        },
        prev() {
            // 上一题
            if (this.paper_seq == 0) {
                return;
            }
            this.paper_seq -= 1;
        },
        next() {
            // 下一题
            if (this.paper_seq == this.questions.length - 1) {
                return;
            }
            this.paper_seq += 1;
        },
        selectPage(i) {
            // 点击分页
            this.paper_seq = i - 1;
        },
        parseToggle() {
            // 解析是展示隐藏切换
            this.$set(this.questions[this.paper_seq], 'showParse', !this.questions[this.paper_seq].showParse);
            if (this.questions[this.paper_seq].showParse) {
                let index = this.questionsParseMap[this.questions[this.paper_seq].questionId];
                let answerright = this.questionsParse[index].questionAnswer == this.questions[this.paper_seq].answer;

                this.$set(this.questions[this.paper_seq], 'questionAnswerparse', this.questionsParse[index].questionAnswerparse);
                this.$set(this.questions[this.paper_seq], 'questionAnswer', this.questionsParse[index].questionAnswer);
                this.$set(this.questions[this.paper_seq], 'answerright', answerright);
            }
        },
        submitPaper() {
            this.isPause = true; // 暂停时间
            let nodolength = 0;
            for (let i = 0; i < this.questions.length; i++) {
                let item = this.questions[i];
                if (!item.answer) {
                    nodolength++;
                }
            }

            this.$baseUI
                .confirm({
                    title: '确认信息',
                    content: (nodolength > 0 ? '您还有' + nodolength + '道题未做，' : '') + '确定要提交试卷吗？',
                    hasImg: true,
                })
                .then(() => {
                    let answersArr = [];
                    this.questions.forEach((item) => {
                        if (!item.answer) {
                            return;
                        }
                        answersArr.push({
                            paperquestiondetailId: item.paperQuestionDetailId,
                            answersheetdetailUseranswer: item.answer,
                            papersubjectid: item.papersubjectId,
                            paperquestiondetailSeq: item.paperquestionstemSeq,
                        });
                    });

                    const loading = this.$baseUI.loading();
                    return this.$PromotionUtil
                        .getExtension({
                            source: '441', //00：登录 01：注册 09：资料下载 42：模考 55：视频公开课 50：直播公开课  06：免费反馈
                            projectSourceid: null,
                            projectCode: this.paperInfo.classUniqueCode,
                            pageName: this.paperInfo.paperName,
                            classId: this.$route.params.classId,
                            coursewareId: this.curCourse.coursewareId,
                        })
                        .then((extension) => {
                            let data = {
                                url: 'qb/saves-answersheet',
                                params: {
                                    userAnswers: answersArr,
                                    answersheetId: null,
                                    paperId: this.paperId,
                                    answersheetStatus: 'A',
                                    answersheetDurationtime: this.initTime,
                                    classUniquecode: this.paperInfo.classUniqueCode,
                                    answersheetSourcetype: 'YOULU',
                                    projectCode: this.paperInfo.classUniqueCode,
                                    extension,
                                    answersheetWay: 'M',
                                },
                            };

                            return this.httpClient(data)
                                .then((res) => {
                                    loading.close();
                                    this.answersheetId = res.answersheetId;
                                    // 应 乔红利 老师要求延迟400ms后再跳转至成绩显示页面
                                    setTimeout(() => {
                                        this.$emit('submit', false); // 处理 重新练习的问题
                                        this.$bus.$emit('SET_ANSWERSHEET_ID', res.answersheetId);
                                    }, 400);
                                })
                                .catch((err) => {
                                    loading.close();
                                    this.$baseUI.alert(err).then(() => {
                                        // 确定之后继续计时
                                        this.isPause = false; // 开始时间
                                        this.timeChange();
                                    });
                                });
                        });
                })
                .catch(() => {
                    // 如果没有问题就不在倒计时
                    if (this.questions.length > 0) {
                        this.isPause = false; // 开始时间
                        this.timeChange();
                    }
                });
        },
        close() {
            this.$emit('close');
        },
        httpClient({ url, params = {}, isCustom = false }) {
            return this.$callApi(url, {
                ...params,
            }).then(
                (res) => {
                    return res.getData();
                },
                (err) => {
                    if (!isCustom) this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                }
            );
        },
    },
};
</script>
<style lang="less" scoped>
.textinp {
    width: 90%;
    height: 180px;
    padding: 8px 12px;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    outline: none;
}

.question_box {
    width: 100%;
    height: 100%;
    min-width: 1040px;
    background: url('./asset/images/q-bg.png');
    background-size: 100% 100%;
    padding: 0px 30px 10px 30px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .header {
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 90px;
        flex-shrink: 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        .header_l {
            display: flex;
            align-items: center;
            font-size: 30px;

            .img {
                width: 63px;
                height: 64px;
                margin-right: 15px;
            }
        }

        .header_r {
            display: flex;
            align-items: center;
            font-size: 22px;
            .count_img {
                width: 21px;
                height: 21px;
                margin-right: 10px;
                vertical-align: middle;
            }

            .back {
                display: inline-block;
                width: 86px;
                height: 32px;
                margin-left: 50px;
                vertical-align: middle;
                background: #090b35;
                border-radius: 20px;
                color: #ffffff;
                font-size: 18px;
                text-align: center;
                line-height: 32px;
                cursor: pointer;

                .back_img {
                    width: 10px;
                    vertical-align: middle;
                    margin-right: 10px;
                }
            }
        }
    }

    .question {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;

        .show-parse {
            flex-shrink: 0;
        }
    }

    /*分页样式*/
    .pages-box {
        display: flex;
        flex-shrink: 0;
        justify-content: space-between;
        align-items: center;
        padding: 0 0 0px 10px;
        padding-bottom: 40px;

        &.all-parse {
            padding-top: 50px;
        }

        .pages {
            display: flex;
            flex-direction: row;

            .page {
                border: 1px solid #8e93ff;
                width: 40px;
                height: 32px;
                text-align: center;
                line-height: 32px;
                color: #8e93ff;
                font-size: 16px;
                margin-right: 10px;
                border-radius: 4px;
                cursor: pointer;

                &.right {
                    border: none;
                    background: linear-gradient(123deg, #11d7cc 0%, #06b588 94%);
                    color: #ffffff;
                }

                &.wrong {
                    border: none;
                    background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
                    color: #ffffff;
                }
                &.cur1 {
                    border: 1px solid #f89300;
                }
                &.cur {
                    border: 1px solid #f8323c;
                }
            }
        }

        .handle {
            display: flex;
            align-items: center;
            .collect {
                width: 150px;
                height: 54px;
                font-size: 18px;
                background: rgba(9, 11, 53, 0.6);
                border-radius: 27px;
                color: #fff;
                text-align: center;
                line-height: 54px;
                cursor: pointer;
                .collect-img {
                    width: 22px;
                    height: 22px;
                    margin-right: 6px;
                    vertical-align: top;
                    margin-top: 15px;
                }
            }

            .btn-wrap {
                display: flex;
                margin-left: 50px;
                .prev,
                .next {
                    text-align: center;
                    width: 200px;
                    font-size: 28px;
                    line-height: 54px;
                    font-weight: bold;
                    box-sizing: border-box;
                }
                .prev {
                    line-height: 46px;
                    border: 4px solid #f8323c;
                    border-radius: 30px 0px 0px 30px;
                    border-right-width: 0;
                    color: #f8323c;
                    cursor: pointer;
                }
                .next {
                    background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
                    border-radius: 0px 30px 30px 0px;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
