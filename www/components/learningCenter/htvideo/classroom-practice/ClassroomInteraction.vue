<template>
    <div class="classroom-interaction">
        <div class="back" @click="close">
            <img class="back_img" src="./asset/images/left-arrow.png" />
            返回
        </div>
        <div class="interaction">
            <div class="title">
                <img class="img" src="./asset/images/interaction.png" />
            </div>
            <template v-if="pageStatus === 'Loading'">
                <div class="interaction-content loading">
                    <i class="el-icon-loading"></i>
                    加载中...
                </div>
            </template>
            <template v-else-if="pageStatus === 'Ready'">
                <transition-group name="fade" class="interaction-content" tag="div" ref="interaction">
                    <component
                        v-for="(item, index) in interactionList"
                        :key="`${index}_${item.interactionId}`"
                        :is="getComponent(item, index)"
                        :item-data="item"
                        :role="item.role"
                        :index="index"
                        :cur-index="nextShowIndex"
                        @audioPlay="audioPlay"
                        @doNext="doNextHandle"
                    />
                </transition-group>
            </template>
            <template v-else>
                <div class="interaction-content error">
                    <img class="error-img" src="./asset/images/error.png" />
                    <span class="txt">数据还没准备好在</span>
                    <span class="try" @click="replayRequest">试一次</span>
                </div>
            </template>
        </div>
        <template v-if="pageStatus === 'Ready'">
            <el-popover placement="top" v-model="showPopover" trigger="manual" :content="popoverText">
                <template slot="reference">
                    <div class="btn" @click="doNext" v-if="list.length - 1 !== nextShowIndex || (curItem.type === 'question' && curItem.answer === null)">
                        <img src="./asset/images/interaction-h.png" class="img" />
                        继续互动
                    </div>
                    <div class="btn" @click="doReplay" v-else>再学一次</div>
                </template>
            </el-popover>
        </template>
    </div>
</template>
<script>
import '@/api/api..query-interaction-content.js'; // 用户互动内容
import '@/api/api..do-interaction-submit.js'; // 提交交互记录

import PracticeResult from './interaction/PracticeResult.vue';
import WrongQuestion from './interaction/WrongQuestion.vue';
import QuestionWrap from './interaction/QuestionWrap.vue';
import ImageText from './interaction/ImageText.vue';
import TextView from './interaction/TextView.vue';
import ImageView from './interaction/ImageView.vue';
import VideoView from './interaction/VideoView.vue';
import AudioView from './interaction/AudioView.vue';
export default {
    components: {
        PracticeResult,
        WrongQuestion,
        QuestionWrap,
        ImageText,
        ImageView,
        VideoView,
        AudioView,
        TextView,
    },
    props: {
        curCourse: {
            // 正在播放的课件信息
            type: Object,
            default() {
                return {};
            },
        },
        answersheetId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            list: [],
            popoverText: '',
            showPopover: false,
            nextShowIndex: 0, // 下一个要展示的交互编号
            interactionList: [], // 交互列表
            curItem: {}, // 当前交互的内容
            pageStatus: 'Loading', // Loading, Ready, Error 默认Loading
            audioPlayIntance: null, // 当前播放的组件
        };
    },
    mounted() {
        // 交互页面
        this.$bus.$emit('SET_INTERACTION_STEP', 'interaction');
        this.init();
    },
    methods: {
        init() {
            this.pageStatus = 'Loading';
            // 应 乔红利 老师要求延迟400ms后再跳转至成绩显示页面
            setTimeout(() => {
                this.init2();
            }, 400);
        },
        init2() {
            this.pageStatus = 'Loading';
            this.getData()
                .then(() => {
                    // 执行成功
                    this.pageStatus = 'Ready';
                })
                .catch(() => {
                    this.pageStatus = 'Error';
                });
        },
        replayRequest() {
            this.init();
        },
        getData() {
            let data = {
                url: 'cc/query-interaction-content',
                params: {
                    classId: this.$route.params.classId,
                    coursewareId: this.curCourse.coursewareId,
                    answersheetId: this.answersheetId,
                },
            };
            return this.httpClient(data).then((res) => {
                this.list = [...res.data];
                this.interactionList.push(this.list[this.nextShowIndex]);
                setTimeout(() => {
                    this.doNextHandle();
                }, 400);
            });
        },
        getComponent(item, index) {
            if (index === 0) {
                return PracticeResult;
            }
            switch (item.type) {
                case 'image':
                    return ImageView;
                case 'char':
                    return TextView;
                case 'video':
                    return VideoView;
                case 'audio':
                    return AudioView;
                case 'text':
                    return ImageText;
                case 'question':
                    return QuestionWrap;
                case 'errorQuestion':
                    return WrongQuestion;
            }
        },
        doNext() {
            this.doNextHandle();
        },
        doNextHandle(answer = null) {
            if (answer !== null) {
                this.curItem.answer = answer;
            }
            if (this.curItem.type === 'question' && this.curItem.answer === null) {
                this.showPopover = true;
                if (this.curItem.questionType === 'S') {
                    this.popoverText = '请先完成试题方可继续互动哦~';
                } else {
                    this.popoverText = '请先完成试题并提交后方可继续互动哦~';
                }

                setTimeout(() => {
                    this.showPopover = false;
                }, 2000);
                return;
            }

            if (this.nextShowIndex === this.list.length - 1) {
                return;
            }

            this.showPopover = false;
            this.nextShowIndex++;
            this.curItem = {
                ...this.list[this.nextShowIndex],
                answer: null,
            };

            this.interactionList.push(this.curItem);
            this.$nextTick(() => {
                this.$refs.interaction.$el.scrollTop = this.$refs.interaction.$el.scrollHeight;
            });
        },
        doUpData() {
            // 上报交互数据

            // 获取交互的信息
            let interactionIds = [];
            this.interactionList.forEach((r) => {
                interactionIds.push(r.interactionId);
            });

            let data = {
                url: 'cc/do-interaction-submit',
                params: {
                    classId: this.$route.params.classId,
                    coursewareId: this.curCourse.coursewareId,
                    answersheetId: this.answersheetId,
                    interactionIds: interactionIds.toString(),
                },
            };
            // 异步提交数据不管成功失败，继续下一个操作
            this.httpClient(data);
        },
        audioPlay(intance) {
            // 音频播放时的回调
            console.log(this.audioPlayIntance, '===');
            if (this.audioPlayIntance === intance) {
                this.audioPlayIntance = null;
                return;
            }

            this.audioPlayIntance && this.audioPlayIntance.doHandle();
            this.audioPlayIntance = intance;
        },
        doReplay() {
            this.doUpData();
            this.$emit('replayPractice', true);
        },
        close() {
            this.doUpData();
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
.fade-enter {
    opacity: 0;
    transform: translateY(-40px);
}
.fade-enter-active {
    transition: all 0.4s ease;
}
.classroom-interaction {
    width: 100%;
    height: 100%;
    min-width: 864px;
    background: url('./asset/images/q-bg.png');
    background-size: 100% 100%;
    padding: 0px 30px 10px 30px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
    overflow: auto;

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

    .interaction {
        width: 800px;
        height: calc(100% - 196px);
        margin: 0 auto;
        margin-top: 70px;
        padding-bottom: 33px;
        background-color: #434596;
        border-radius: 0px 8px 8px 8px;

        .title {
            margin-top: -38px;
            height: 69px;
            .img {
                width: 271px;
                height: 69px;
            }
        }

        .interaction-content {
            height: 95%;
            padding: 0 64px;
            padding-top: 33px;
            text-align: center;
            overflow: auto;
            box-sizing: border-box;

            &.loading {
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;

                .el-icon-loading {
                    margin-right: 6px;
                }
            }
            &.error {
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                flex-direction: column;

                .error-img {
                    width: 222px;
                    height: 156px;
                    margin-bottom: 20px;
                }

                .txt {
                    font-size: 16px;
                    margin-bottom: 32px;
                }

                .try {
                    width: 128px;
                    height: 45px;
                    font-size: 16px;
                    line-height: 45px;
                    background: linear-gradient(100deg, #ff2e30 8%, #ff957a 100%);
                    border-radius: 30px;
                    cursor: pointer;
                }
            }
        }
    }

    .btn {
        width: 260px;
        height: 56px;
        margin: 0 auto;
        margin-top: 30px;
        font-size: 20px;
        color: #ffffff;
        line-height: 56px;
        text-align: center;
        background: linear-gradient(100deg, #ff2e30 8%, #ff957a 100%);
        border-radius: 28px;
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.13);
        cursor: pointer;

        .img {
            width: 20px;
            height: 20px;
            vertical-align: baseline;
            margin-right: 8px;
        }
    }
}
</style>
