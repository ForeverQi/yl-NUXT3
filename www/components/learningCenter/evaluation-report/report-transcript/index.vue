<template>
    <div class="report-wrap" :class="{ open: showTips }">
        <div class="tips-box">
            <div class="tips">{{ showTips ? toggleText.show : toggleText.notShow }}</div>
            <div class="hover-tips">
                <img src="./asset/images/query.png" />
                <p class="hover-summary">已禁用或已删除的试题不在统计范围内</p>
            </div>
            <div class="counter" v-if="showTips">
                <span class="timer">{{ count }}s</span>
                <span>后自动隐藏</span>
            </div>
        </div>
        <div class="handle-toggle" v-show="!showTips" @click="toggleHandle">
            <img class="toggle-img" src="./asset/images/toggle-btn.png" />
            <span>展开做题统计</span>
        </div>
        <div class="list-content" :class="{ 'is-center': !showBeatRate }" :style="{ opacity: showTips ? '1' : '0', 'z-index': showTips ? 2 : -1 }">
            <div class="progress-box">
                <rate-progress name="正确率" :props-rate="transcript.rightRate" />
                <rate-progress
                    name="得分"
                    circle-type="score"
                    :props-rate="transcript.answerScore"
                    :progress-length="transcript.questionScore"
                    v-if="showScoreProgress"
                />
            </div>
            <ul class="default">
                <li class="item">
                    <div class="item-title">总题数</div>
                    <div class="item-content">{{ transcript.questionTotal || '--' }}</div>
                </li>
                <li class="item">
                    <div class="item-title">做题数</div>
                    <div class="item-content">{{ transcript.answerQuestionTotal || '--' }}</div>
                </li>
                <li class="item">
                    <div class="item-title">做对</div>
                    <div class="item-content">{{ transcript.rightQuestionTotal || '--' }}</div>
                </li>
                <li class="item">
                    <div class="item-title">做错</div>
                    <div class="item-content">{{ transcript.errorQuestionTotal || '--' }}</div>
                </li>
                <li class="item" v-if="showBeatRate">
                    <div class="item-title">击败考生</div>
                    <div class="item-content">
                        {{ transcript.beatRate ? Math.round(transcript.beatRate).toString() : '--' }}
                        <span>%</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import RateProgress from '../progress/index.vue';

export default {
    name: 'report-transcript',
    components: { RateProgress },
    props: {
        transcript: {
            type: Object,
            default: () => ({}),
        },
        loading: {
            type: Boolean,
            default: true,
        },
        showBeatRate: {
            type: Boolean,
            default: false,
        }, // 是否展示击败考生
        showScoreProgress: {
            type: Boolean,
            default: true,
        }, // 是否展示得分圆环
    },
    data() {
        return {
            showTips: true, // 是否展示整个成绩单
            toggleText: {
                notShow: '查看做题正确率和得分',
                show: '正确率和得分仅统计客观题',
            },
            count: 30, // 初始倒计时
            timer: null, // 倒计时
        };
    },
    watch: {
        loading(val) {
            if (!val) this.countDown();
        },
    },
    destroyed() {
        this.timer = this.timer ? clearTimeout(this.timer) : null;
    },
    methods: {
        // 切换自展开与收起
        toggleHandle() {
            this.showTips = !this.showTips;
            this.countDown();
        },
        // 倒计时
        countDown() {
            this.showTips = true;
            --this.count;
            if (this.count <= 0) {
                this.count = 30;
                this.showTips = false;
                return;
            }
            this.timer = setTimeout(this.countDown, 1000);
        },
    },
};
</script>

<style lang="less" scoped>
.report-wrap {
    width: 100%;
    height: 46px;
    background: #fff8ef;
    border-radius: 6px;
    position: relative;
    transition: height 0.3s;

    &.open {
        height: 124px;
        background-image: url(./asset/images/report-tips-bk.png);
        background-repeat: no-repeat;
        background-size: contain;
    }

    .handle-toggle {
        width: 125px;
        height: 22px;
        font-size: 12px;
        color: #4f2808;
        line-height: 12px;
        letter-spacing: 0.4px;
        background: url(./asset/images/toggle-btn-bk.png) no-repeat;
        background-size: contain;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-62.5px);
        cursor: pointer;
        z-index: 2;

        .toggle-img {
            width: 12px;
            height: 12px;
            padding-right: 6px;
        }
    }
}

.tips-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: fit-content;
    position: absolute;
    right: 0;
    top: 10px;

    .tips {
        font-size: 12px;
        color: #3a3d4b;
        line-height: 24px;
        margin-right: 6px;
    }

    .hover-tips {
        position: relative;
        z-index: 3;
        top: 1px;
        margin-right: 13px;
        img {
            width: 14px;
            height: 14px;
            cursor: pointer;
        }

        .hover-summary {
            position: absolute;
            right: -21px;
            top: 30px;
            z-index: 10;
            width: 228px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 12px;
            color: #ffffff;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 6px;
            display: none;
        }
        .hover-summary::before {
            content: '';
            height: 0;
            border-style: solid;
            border-width: 7px;
            border-color: transparent transparent rgba(0, 0, 0, 0.6) transparent;
            position: absolute;
            right: 22px;
            top: -14px;
            width: 0;
            z-index: 1;
        }
        &:hover {
            .hover-summary {
                display: block;
            }
        }
    }

    .counter {
        width: 114px;
        height: 24px;
        background: rgba(79, 40, 8, 0.1);
        border-radius: 12px 0px 0px 12px;
        font-size: 0;
        text-align: center;
        line-height: 24px;

        span {
            font-size: 12px;
            letter-spacing: 0.4px;

            &.timer {
                color: #f8323c;
            }
        }
    }
}

.list-content {
    display: flex;
    justify-content: center;
    align-content: center;
    position: absolute;
    right: 0;
    top: 32px;
    z-index: 2;
    transition: all 0.3s;

    &.is-center {
        position: static;
        padding: 22px 0;
    }

    .default {
        display: flex;
        align-items: center;

        .item {
            width: 85px;
            display: flex;
            flex-direction: column;

            .item-title {
                font-size: 12px;
                font-weight: 400;
                text-align: left;
                color: #916c4d;
                line-height: 12px;
                letter-spacing: 0.4px;
            }

            .item-content {
                font-size: 22px;
                font-weight: 700;
                text-align: left;
                color: #4f2808;
                line-height: 20px;
                margin-top: 10px;
                & > span {
                    font-size: 12px;
                    font-weight: 600;
                    text-align: left;
                    color: #725135;
                    line-height: 17px;
                }
            }
        }
    }
}

.progress-box {
    display: flex;
    height: 80px;
}
</style>
