<template>
    <div class="classroom-report" ref="report">
        <div class="back" @click="close">
            <img class="back_img" src="./asset/images/left-arrow.png" />
            返回
        </div>
        <div class="title">AI随堂练成绩单</div>
        <div class="report-wrap" :style="styleCustom">
            <div class="box-wrap">
                <div
                    class="item"
                    :key="item.papersubjectId"
                    v-for="(item, index) in transcriptInfo.uasList"
                    :class="[
                        transcriptInfo.uasList.length === 1 ? 'npb' : '',
                        transcriptInfo.uasList.length === 2 ? 'npb' : '',
                        transcriptInfo.uasList.length === 3 && index === 2 ? 'npb' : '',
                        transcriptInfo.uasList.length === 4 && (index === 2 || index === 3) ? 'npb' : '',
                    ]"
                >
                    <div class="item-content">
                        <div class="box">{{ item.papersubjectName }}（{{ item.uasQuestiontotal }}题）</div>
                        <div class="line">
                            <span class="right">答对{{ item.uasRightquestiontotal }}题</span>
                            <span class="wrong">答错{{ item.uasQuestiontotal - item.uasRightquestiontotal }}题</span>
                        </div>
                    </div>
                </div>
                <template v-if="transcriptInfo.uasList.length > 2">
                    <div class="item" v-for="i in 4 - transcriptInfo.uasList.length" :key="i" style="width: 336px; height: 0; padding: 0"></div>
                </template>
            </div>
        </div>
        <div class="btn-wrap">
            <div class="lx" @click="replayExam">重新练习</div>
            <button class="start" @click="startInteraction" v-if="showInteraction">开始AI互动</button>
        </div>
    </div>
</template>
<script>
import '@/api/qb/api.QB1007.query-answersheet-common-transcript.js'; // 通用成绩单
import '@/api/api..query-interaction-content.js'; // 用户互动内容

export default {
    props: {
        answersheetId: {
            type: String,
            default: '',
        },
        curCourse: {
            // 正在播放的课件信息
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            w: 1284, // 初始化宽度
            h: 546, // 初始化高度
            transcriptInfo: {
                uasList: [],
            }, // 成绩单信息
            showInteraction: false,
        };
    },
    computed: {
        styleCustom() {
            return {
                width: this.w + 'px',
                height: this.h + 'px',
            };
        },
    },
    mounted() {
        // 交卷后的报告页面
        this.$bus.$emit('SET_INTERACTION_STEP', 'report');
        this.init();
        this.resizeWidth();
        window.addEventListener('resize', this.resizeWidth);
    },
    destroyed() {
        window.removeEventListener('resize', this.resizeWidth);
    },
    methods: {
        init() {
            this.getData();
        },
        getData() {
            Promise.all([this.getInteractionList(), this.getTranscriptInfo()]);
        },
        getInteractionList() {
            // 获取交互内容， 交互内容返回0条数据的时候，不显示AI交互按钮
            let data = {
                url: 'cc/query-interaction-content',
                params: {
                    classId: this.$route.params.classId,
                    coursewareId: this.curCourse.coursewareId,
                    answersheetId: this.answersheetId,
                },
            };
            return this.httpClient(data).then((res) => {
                this.showInteraction = res.count > 0;
            });
        },
        getTranscriptInfo() {
            // 获取通用成绩单
            let data = {
                url: 'qb/query-answersheet-common-transcript',
                params: {
                    answersheetId: this.answersheetId,
                    sourceType: this.$nuxt.context.env.config.sourceType,
                },
            };
            return this.httpClient(data).then((res) => {
                this.transcriptInfo = res;
            });
        },
        resizeWidth() {
            let w = this.$refs.report.offsetWidth;
            let h = 0;
            if (w <= 1284) {
                if (w < 898) {
                    w = 890;
                }
                h = (w / 1284) * 546;
                this.w = w;
                this.h = h;
            } else {
                this.w = 1284;
                this.h = 546;
            }
        },
        startInteraction() {
            this.$emit('startInteraction', true);
        },
        replayExam() {
            this.$emit('replayPractice', true);
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
.classroom-report {
    width: 100%;
    height: 100%;
    overflow: auto;
    background: url('./asset/images/q-bg.png');
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    position: relative;

    .back {
        position: absolute;
        right: 35px;
        top: 30px;
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

    .title {
        font-size: 40px;
        color: #fff;
        font-weight: bold;
        margin-top: 45px;
        margin-bottom: 32px;
    }

    .btn-wrap {
        padding-top: 50px;
        .lx {
            display: inline-block;
            width: 200px;
            height: 60px;
            font-size: 24px;
            line-height: 60px;
            text-align: center;
            color: #f8323c;
            border: 4px solid #f8323c;
            border-radius: 34px;
            cursor: pointer;
        }
        .start {
            display: inline-block;
            width: 200px;
            height: 60px;
            font-size: 24px;
            color: #fff;
            margin-left: 90px;
            background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
            border-radius: 30px;
            cursor: pointer;
        }
    }

    .report-wrap {
        width: 1284px;
        height: 546px;
        background-image: url(./asset/images/report.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        .box-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            width: 800px;
        }
        .item {
            padding: 0 30px;
            padding-bottom: 50px;

            &.npb2,
            &.npb {
                padding-bottom: 0;
            }
            .item-content {
                .box {
                    width: 276px;
                    height: 48px;
                    line-height: 48px;
                    text-align: center;
                    font-size: 20px;
                    color: #ffffff;
                    background-image: url(./asset/images/item.png);
                    background-size: 100% 100%;
                }

                .line {
                    padding-top: 24px;
                    .right,
                    .wrong {
                        font-size: 16px;
                        color: #fff;
                        text-align: right;
                        display: inline-block;
                        text-align: right;
                        height: 24px;
                        line-height: 24px;
                        padding-left: 50px;
                        background-size: 24px 24px;
                        background-position-y: 0;
                        background-position-x: 15px;
                        background-repeat: no-repeat;
                    }

                    .right {
                        background-image: url(./asset/images/right.png);
                    }
                    .wrong {
                        background-image: url(./asset/images/wrong.png);
                    }
                }
            }
        }
    }
}
</style>
