<template>
    <div class="question-analysis" :class="{ collapse: collapse }">
        <!-- 学员答案 简答题 填空题 选词填空-->
        <div
            class="study-answer-opinion gray-bg"
            v-if="(isShowStudyAnswerOpinion || isShowStudyAnswerFill || isShowStudyAnswerBlankChoose) && !newQuestion.notShowUserAnswer"
        >
            <span class="block-title">【学员答案】</span>
            <!-- 简答题 -->
            <template v-if="isShowStudyAnswerOpinion">
                <span class="red" v-if="isNotUserAnswer">未答</span>
                <span class="parse" v-else>
                    {{ newQuestion.userAnswer }}
                </span>
            </template>
            <!-- 填空题 -->
            <template v-if="isShowStudyAnswerFill">
                <div class="answer-list red" v-if="isNotUserAnswer">未答</div>
                <div class="answer-list" v-else>
                    <div class="answer-item" v-for="(answer, index) in getAnswerList(newQuestion.userAnswer)" :key="index">
                        {{ index + 1 + '、' }}{{ answer }}
                    </div>
                </div>
            </template>
            <!-- 选词填空 -->
            <template v-if="isShowStudyAnswerBlankChoose">
                <div class="answer-list red" v-if="isNotUserAnswer">未答</div>
                <span class="answer-list" v-else>
                    <span
                        class="answer-item"
                        :class="getRight(index) ? 'green' : 'red'"
                        v-for="(answer, index) in getAnswerList(newQuestion.userAnswer)"
                        :key="index"
                    >
                        （{{ index + 1 }}）{{ answer }} {{ index !== getAnswerList(newQuestion.userAnswer).length - 1 ? '、' : '' }}
                    </span>
                </span>
            </template>
        </div>
        <!-- 答案 /填空 -->
        <div class="answer-fill gray-bg" v-if="isShowAnswerFill">
            <span class="block-title">【答案】</span>
            <div class="answer-list">
                <div class="answer-item" v-for="(answer, index) in getAnswerList(newQuestion.correctAnswer)" :key="index">
                    {{ index + 1 + '、' }}{{ answer }}
                </div>
            </div>
        </div>
        <!-- 答案 简答 -->
        <div class="answer-opinion gray-bg" v-if="isShowAnswerOpinion">
            <span class="block-title">【答案】</span>
            <span class="parse">
                <html-parse :article="newQuestion.correctAnswer" />
            </span>
        </div>
        <!-- 答案 选词填空 -->
        <div class="answer-blank-choose gray-bg" v-if="isShowAnswerBlankChoose">
            <span class="block-title">【答案】</span>
            <span class="answer-list">
                <span class="answer-item green" v-for="(answer, index) in getAnswerList(newQuestion.correctAnswer)" :key="index">
                    （{{ index + 1 }}）{{ answer }}{{ index !== getAnswerList(newQuestion.correctAnswer).length - 1 ? '、' : '' }}
                </span>
            </span>
        </div>
        <!-- 答案与学员答案 （单选/多选/不定项选择）-->
        <div class="answer-basic gray-bg" v-if="isShowStudyAnswer">
            <span class="block-title">【答案】</span>
            <span class="answer-right">
                正确答案:
                <span class="green weight">{{ newQuestion.correctAnswer }}</span>
            </span>
            <span class="answer-student" v-if="!newQuestion.notShowUserAnswer">
                你的答案：
                <span class="weight red" v-if="isNotUserAnswer">未答</span>
                <span class="weight" :class="newQuestion.correctAnswer === newQuestion.userAnswer ? 'green' : 'red'">{{ newQuestion.userAnswer }}</span>
            </span>
        </div>
        <!-- 答案与学员答案（判断） -->
        <div class="answer-basic gray-bg" v-if="isShowStudyAnswerJudge">
            <span class="block-title">【答案】</span>
            <span class="answer-right">
                正确答案:
                <span class="green weight">{{ newQuestion.correctAnswer === '1' ? '正确' : '错误' }}</span>
            </span>
            <span class="answer-student" v-if="!newQuestion.notShowUserAnswer">
                你的答案：
                <span class="weight red" v-if="isNotUserAnswer">未答</span>
                <span class="weight" v-else :class="newQuestion.correctAnswer === newQuestion.userAnswer ? 'green' : 'red'">
                    {{ newQuestion.userAnswer === '1' ? '正确' : '错误' }}
                </span>
            </span>
        </div>

        <!-- 答案解析 单选/多选/不定项选择/判断/填空题/简答题/选词填空-->
        <div class="answer-parse">
            <span class="block-title">【答案解析】</span>
            <span class="parse">
                <html-parse :article="newQuestion.answerParse" />
            </span>
        </div>
        <!-- 答题统计 单选/多选/不定项选择/判断/填空题/简答题/选词填空-->
        <div class="answer-statistics">
            <span class="block-title">【答题统计】</span>
            <span class="statistics">
                此题作答次数
                <span class="weight">{{ newQuestion.answerAccount }}</span>
                次
                <!-- 简答题不展示正确率 -->
                <template v-if="!isShowAnswerCorrectRate">
                    ，正确率
                    <span class="weight">{{ newQuestion.answerCorrectRate }}%</span>
                </template>
            </span>
        </div>
        <!-- 视频解析 单选/多选/不定项选择/判断/填空题/简答题/选词填空-->
        <div class="answer-video" v-if="hasAnswerVideo">
            <span class="block-title">【视频解析】</span>
            <div class="video-box">
                <!-- 专项小题库逻辑：学员才能查看视频，非学员不能查看 -->
                <template v-if="questionBankStatus === 'special' && !newQuestion.authorStatus">
                    <div class="special-check_video">
                        <img src="./asset/img/vipImg.png" />
                        <span>学员专享，观看解析视频请开通本项目系统课</span>
                        <div class="special-btn" @click="checkCourses">查看系统课</div>
                    </div>
                </template>
                <polyv-video
                    ref="polyvVideoRef"
                    v-else-if="questionBankStatus !== 'special' || (questionBankStatus === 'special' && newQuestion.authorStatus)"
                    :question-id="newQuestion.questionId"
                    :resource-id="videoResourceId"
                >
                    <div class="agin-box" slot="mask" v-if="isFinished">
                        <img src="./asset/img/finished.png" alt="" />
                        <span class="text-1">恭喜你，已学完该知识内容</span>
                        <div class="test" @click="playAgin">重学一遍</div>
                    </div>
                </polyv-video>
            </div>
        </div>
        <!-- 考察考点 单选/多选/不定项选择/判断/填空题/简答题/选词填空-->
        <div class="test-center" v-if="showKnowledge">
            <span class="block-title">【{{ InspectionText }}】</span>
            <knowledge-table
                size="big"
                :question-id="newQuestion.questionId"
                :show-parse-immediately="newQuestion.showParseImmediately"
                :author-status="newQuestion.authorStatus"
                :paper-parsing="newQuestion.paperParsing"
                @click-knowledge-video="clickKnowledgeVideo"
                @click-knowledge-question="clickKnowledgeQuestion"
            />
        </div>
        <slot name="questionTool" />
    </div>
</template>
<script>
import KnowledgeTable from '../knowledge-table.vue';
import HtmlParse from '../html-parse.vue';
import PolyvVideo from '../polyv-video.vue';
import '@/api/qb/api..query-resourcevideo-dot-status'; //获取知识点或试题ids下考点讲解状态（视频）
import '@/api/qb/api..query-resourcevideo-associated-dot'; //获取视频解析vid信息
export default {
    components: {
        KnowledgeTable,
        HtmlParse,
        PolyvVideo,
    },
    props: {
        //当前试题信息
        question: {
            type: Object,
            default: () => ({}),
        },
        //展开折叠
        collapse: {
            type: Boolean,
            default: false,
        },
        //是否展示考点考察 ----若考察考点查询没有数据也会不显示考察考点
        showKnowledge: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            opinionTypes: ['opinion', 'analysis-opinion', 'listening-opinion', 'compatibility-opinion'], //简答题类型
            judgeTypes: ['judge', 'analysis-judge', 'listening-judge', 'compatibility-judge'], //判断题类型
            singleTypes: ['single', 'analysis-single', 'listening-single', 'compatibility-single', 'cloze-fill'], // 单选类型
            multipleTypes: ['multiple', 'analysis-multiple', 'listening-multiple', 'compatibility-multiple'], //多选题类型
            indefiniteTypes: ['indefinite', 'analysis-indefinite', 'listening-indefinite', 'compatibility-indefinite'], //不定项选择题I
            fillTypes: ['fill', 'analysis-fill', 'listening-fill'], //填空题
            blankChooseTypes: ['blank-choose'], //选词填空BC
            hasAnswerVideo: false,
            // 视频解析信息
            vidOption: [],
            videoResourceId: '',
            isFinished: false,
            PlayReturn: null,
            newQuestion: {},
        };
    },
    computed: {
        /**
         * @returns {string} special: 从专项小题库进入
         */
        questionBankStatus() {
            return this.$route.query.questionBankStatus;
        },
        /**
         * @returns {string} 考察考点 文案在专项小题库中显示为考查考点
         */
        InspectionText() {
            if (this.questionBankStatus === 'special') {
                return '考查考点';
            }
            return '考察考点';
        },
        //用户未作答
        isNotUserAnswer() {
            return !(this.newQuestion.userAnswer && this.newQuestion.userAnswer.length);
        },
        //是否展示学员答案-简答题
        isShowStudyAnswerOpinion() {
            return this.opinionTypes.includes(this.newQuestion.type);
        },
        //是否展示学员答案-填空
        isShowStudyAnswerFill() {
            return this.fillTypes.includes(this.newQuestion.type);
        },
        //是否展示学员答案-选词填空
        isShowStudyAnswerBlankChoose() {
            return this.blankChooseTypes.includes(this.newQuestion.type);
        },
        //是否展示答案与学员答案（单选/多选/不定项选择）
        isShowStudyAnswer() {
            const single = this.singleTypes.includes(this.newQuestion.type);
            const multiple = this.multipleTypes.includes(this.newQuestion.type);
            const indefinite = this.indefiniteTypes.includes(this.newQuestion.type);
            return single || multiple || indefinite;
        },
        //是否展示答案与学员答案（判断）
        isShowStudyAnswerJudge() {
            return this.judgeTypes.includes(this.newQuestion.type);
        },
        //是否展示答案(简答题)
        isShowAnswerOpinion() {
            return this.opinionTypes.includes(this.newQuestion.type);
        },
        //是否展示答案(填空)
        isShowAnswerFill() {
            return this.fillTypes.includes(this.newQuestion.type);
        },
        //是否展示答案-选词填空
        isShowAnswerBlankChoose() {
            return this.blankChooseTypes.includes(this.newQuestion.type);
        },
        // 同时监听questionId和showParseImmediately
        listenQuestionChange() {
            const { questionId, showParseImmediately, paperParsing } = this.newQuestion;
            return { questionId, showParseImmediately, paperParsing };
        },
        //是否展示正确率
        isShowAnswerCorrectRate() {
            return this.opinionTypes.includes(this.newQuestion.type);
        },
    },
    watch: {
        listenQuestionChange: {
            handler(val) {
                const pathname = location.pathname;
                // 判断是试卷做题页和解析页，通过 paperParsing（是否展开解析）的参数来加载考察考点的内容
                const pageStatus = pathname.indexOf('/learningCenter/paper-test-result') != -1 || pathname.indexOf('/learningCenter/do-paper-test') != -1;
                if (val.questionId) {
                    if (this.questionBankStatus === 'special') {
                        // 专项小题库获取视频规则
                        if (val.paperParsing) this.queryResourceVideoDotStatusSpecial();
                    } else if (pageStatus) {
                        if (val.paperParsing) this.queryResourceVideoDotStatus();
                    } else if (val.showParseImmediately) {
                        this.queryResourceVideoDotStatus();
                    }
                }
            },
            immediate: true,
        },
        question: {
            handler(newValue) {
                this.newQuestion = newValue;
            },
            deep: true,
            immediate: true,
        },
        hasAnswerVideo(val) {
            if (val === true) {
                // 暂时删除
                // if (this.$platform.isIE === true) {
                //     let str = '您的浏览器因版本较低或兼容问题无法播放视频，为了您的看课体验，请尝试切换其他浏览器 (谷歌、360、火狐) 或';
                //     str += '<a href="/compatibility" style="color: #f8323c">点击此处下载浏览器</a>';
                //     this.$baseUI
                //         .alert(str, '看课出错了!', {
                //             isHtml: true,
                //         })
                //         .then(() => {
                //             this.$PageUtil.href('/compatibility');
                //         });
                // }
            }
        },
    },
    mounted() {
        this.$bus.$on('knowledge-play-video-pause', () => {
            this.PlayReturn?.pauseVideo();
        });
    },
    methods: {
        getAnswerList(answer) {
            return answer ? answer.split('※') : [];
        },
        getRight(index) {
            const userList = this.getAnswerList(this.newQuestion.userAnswer);
            const correctAnswer = this.getAnswerList(this.newQuestion.correctAnswer);
            return userList.length >= index + 1 ? correctAnswer[index] === userList[index] : false;
        },
        // 专项小题库视频获取规则：若该题既有资源中心的打点视频，又有题库添加的视频解析，则优先展示资源中心的打点视频
        queryResourceVideoDotStatusSpecial() {
            this.$callApi('qb/query-resourcevideo-dot-status', {
                associatedContentIds: [this.newQuestion.questionId],
                associatedContentType: 'Q',
                onsuccess: (res) => {
                    if (res && res.length) {
                        this.hasAnswerVideo = res[0].state === 'Y';
                        if (this.hasAnswerVideo) {
                            this.queryResourceVideoDot();
                            return false;
                        }
                    }
                    // 没有打点视频则使用题库添加的视频
                    if (this.newQuestion.questionVpath && this.newQuestion.questionVpath.length) {
                        this.questionVideoOperate();
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //根据知识点下是否有考点讲解
        queryResourceVideoDotStatus() {
            if (this.newQuestion.questionVpath && this.newQuestion.questionVpath.length) {
                this.questionVideoOperate();
            } else {
                this.$callApi('qb/query-resourcevideo-dot-status', {
                    associatedContentIds: [this.newQuestion.questionId],
                    associatedContentType: 'Q',
                    onsuccess: (res) => {
                        if (res && res.length) {
                            this.hasAnswerVideo = res[0].state === 'Y';
                            if (this.hasAnswerVideo) {
                                this.queryResourceVideoDot();
                            }
                        }
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            }
        },
        //根据知识点下考点讲解
        queryResourceVideoDot() {
            this.$callApi('qb/query-resourcevideo-associated-dot', {
                associatedContentIds: [this.newQuestion.questionId],
                associatedContentType: 'Q',
                onsuccess: (res) => {
                    if (res && res[0]) {
                        this.videoResourceId = res[0].resourceId;
                        this.vidOption = {
                            videoId: res[0].vid,
                            start: res[0].startTime,
                            end: res[0].endTime,
                        };
                        this.playVid();
                        return false;
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        /**
         * 题库视频逻辑处理
         */
        questionVideoOperate() {
            let videoId = '';
            if (this.questionBankStatus === 'special') {
                // 只支持视频解析，不支持音频解析
                const videoObj = this.newQuestion.questionVpath.find((item) => item.mediaType === 'V');
                videoId = videoObj?.mediaPath;
            } else {
                videoId = this.newQuestion.questionVpath[this.newQuestion.questionVpath.length - 1];
            }
            if (videoId) {
                this.hasAnswerVideo = true;
                this.vidOption = {
                    videoId,
                };
                this.playVid();
            }
        },
        playVid(playOption = {}) {
            const option = {
                autoplay: false,
                ...playOption,
            };

            if (this.vidOption.end) {
                option.start = this.vidOption.start;
                option.end = this.vidOption.end;
            }
            this.$nextTick(() => {
                this.$refs.polyvVideoRef &&
                    this.$refs.polyvVideoRef
                        .playVid(this.vidOption, option)
                        .then((instance) => {
                            this.PlayReturn = instance;
                            this.PlayReturn.over(() => {
                                this.isFinished = true;
                            });
                            // 视频播放埋点
                            this.PlayReturn.start(() => {
                                if (!this.newQuestion.analysisYiGuanData || !this.newQuestion.analysisYiGuanData.page_name) {
                                    return;
                                }
                                const data = {
                                    college_name: '',
                                    page_name: this.newQuestion.analysisYiGuanData.page_name || '',
                                    project_name: this.newQuestion.analysisYiGuanData.project_name || '',
                                    subject_name: this.newQuestion.analysisYiGuanData.subject_name || '',
                                };
                                if (this.newQuestion.analysisYiGuanData.paper_name) {
                                    data.paper_name = this.newQuestion.analysisYiGuanData.paper_name;
                                }

                                this.$yiguan.learningCenter('web_learning_center_parse_video', data);
                            });
                        })
                        .catch((err) => {
                            this.$baseUI.alert(err?.getDescription?.() || err || '请刷新重试');
                        });
            });
        },
        playAgin() {
            this.isFinished = false;
            this.playVid({
                autoplay: true,
            });
        },
        // 点击考察考点里的考点讲解-埋点上报
        clickKnowledgeVideo(knowledge) {
            if (!this.newQuestion.analysisYiGuanData || !this.newQuestion.analysisYiGuanData.page_name) {
                return;
            }
            const data = {
                college_name: '',
                page_name: this.newQuestion.analysisYiGuanData.page_name || '',
                project_name: this.newQuestion.analysisYiGuanData.project_name || '',
                subject_name: this.newQuestion.analysisYiGuanData.subject_name || '',
            };
            this.$yiguan.learningCenter('web_learning_center_knowledge_parse', {
                ...data,
                knowledge_name: knowledge.knowledgeTitle,
            });
        },
        // 点击考察考点里的做题练习-埋点上报
        clickKnowledgeQuestion(knowledge) {
            if (!this.newQuestion.analysisYiGuanData || !this.newQuestion.analysisYiGuanData.page_name) {
                return;
            }
            const data = {
                college_name: '',
                page_name: this.newQuestion.analysisYiGuanData.page_name || '',
                project_name: this.newQuestion.analysisYiGuanData.project_name || '',
                subject_name: this.newQuestion.analysisYiGuanData.subject_name || '',
            };
            this.$yiguan.learningCenter('web_learning_center_knowledge_exercises', {
                ...data,
                knowledge_name: knowledge.knowledgeTitle,
            });
        },
        /**
         * 跳转系统课
         */
        checkCourses() {
            this.$PageUtil.openNewPage('/pro-course');
        },
    },
};
</script>
<style lang="less" scoped>
.question-analysis {
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    font-size: 14px;
    &.collapse {
        overflow: hidden;
        max-height: 0;
    }
    .block-title {
        font-weight: 700;
        color: #3a3d4b;
        margin-right: 10px;
        flex-shrink: 0;
    }
    .green {
        color: #29bd1b !important;
        margin-left: 5px;
    }
    .red {
        color: #f8323c !important;
        margin-left: 5px;
    }
    .gray {
        color: #9698a2;
        line-height: 20px;
    }
    .weight {
        font-weight: 700;
    }
    .gray-bg {
        background: #f5f6f9;
        border-radius: 4px;
        padding: 20px 16px;
        box-sizing: border-box;
    }

    .answer-statistics,
    .answer-video,
    .test-center,
    .study-answer-opinion,
    .answer-opinion,
    .answer-fill,
    .answer-blank-choose {
        display: flex;
        align-items: flex-start;
        line-height: 19px;
        margin-bottom: 24px;
    }
    // 答案和用户答案
    .answer-basic {
        margin-bottom: 24px;
        .answer-right,
        .answer-student {
            font-weight: 400;
            color: #3a3d4b;
        }
        .answer-right {
            margin-right: 36px;
        }
    }
    .answer-parse {
        padding: 0 16px;
        margin-bottom: 24px;
        display: flex;
        align-items: flex-start;
    }
    .parse {
        color: #3a3d4b;
        line-height: 22px;
        word-break: break-all;
    }
    .answer-statistics {
        padding: 0 16px;
        display: flex;
        align-items: flex-start;
        line-height: 19px;
        margin-bottom: 24px;
        .statistics {
            color: #3a3d4b;
            line-height: 22px;
        }
    }

    .answer-fill,
    .study-answer-opinion {
        .answer-list {
            .answer-item {
                color: #3a3d4b;
                line-height: 20px;
                margin-bottom: 16px;
                margin-right: 5px;
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
    .answer-video,
    .test-center {
        padding: 0 16px;
    }
    .answer-video {
        .video-box {
            width: 500px;
            height: 280px;
            overflow: hidden;
            position: relative;
        }
        .special-check_video {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 90;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            img {
                width: 100px;
                height: 100px;
            }
            span {
                margin-bottom: 24px;
                font-size: 14px;
                color: #fff;
            }
            .special-btn {
                padding: 0 32px;
                height: 36px;
                line-height: 36px;
                background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
                border-radius: 27px;
                font-size: 15px;
                color: #fff;
                cursor: pointer;
            }
        }
    }
    .agin-box {
        position: absolute;
        color: #ffffff;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        font-size: 13px;
        z-index: 20;
        top: 0;
        left: 0;
        background: #060a16;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-top: 4%;
        img {
            width: 200px;
            height: 138px;
            margin-bottom: 12px;
        }
        .text-1 {
            margin-bottom: 10px;
            font-size: 16px;
            color: #ffffff;
        }
        .text-2 {
            font-size: 14px;
            color: #bbbbbb;
        }
        .test {
            margin-top: 20px;
            width: 128px;
            height: 32px;
            background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
            border-radius: 16px;
            text-align: center;
            line-height: 32px;
            color: #fff;
            margin: 0 auto;
            cursor: pointer;
        }
    }
}
</style>
