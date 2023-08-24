<template>
    <div class="timer-wrap">
        <div class="txt-box">
            {{ reverse ? '剩余' : '用时' }}：
            <span class="time">{{ timeStr }}</span>
        </div>
        <button v-if="showButton" class="pause-btn" @click="changeStatus">{{ timer === null ? '开始' : '暂停' }}</button>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import dayjsDuration from 'dayjs/plugin/duration';
dayjs.extend(dayjsDuration);

export default {
    props: {
        // 是否展示开始暂停按钮
        showButton: {
            type: Boolean,
            default: true,
        },
        // 默认开始时的秒数
        startSeconds: {
            type: Number,
            default: 0,
        },
        // 结束时的秒数，到达时会自动暂停计时器，并触发end事件
        endSeconds: {
            type: Number,
            default: 0,
        },
        // 是否为倒计时
        reverse: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            seconds: 0, //当前的计时秒数
            timer: null, // 如果为null表示暂停中
        };
    },
    computed: {
        timeStr() {
            return dayjs.duration(this.seconds, 'seconds').format('HH:mm:ss');
        },
    },
    watch: {
        startSeconds: {
            handler(val) {
                this.seconds = val;
            },
            immediate: true,
        },
        seconds(val) {
            this.$emit('change', val, this.timeStr);
        },
    },
    destroyed() {
        this.timer && clearInterval(this.timer);
    },
    methods: {
        api_start() {
            this.timer && clearInterval(this.timer);
            this.timer = setInterval(() => {
                this._timer();
            }, 1000);
            this._timer();
        },
        _timer() {
            // 倒计时
            if (this.reverse) {
                if (this.seconds <= 0) {
                    this.$emit('end');
                    return this.api_pause();
                }
                this.seconds -= 1;
            }
            if (!this.reverse) this.seconds += 1;
        },
        api_pause() {
            clearInterval(this.timer);
            this.timer = null;
        },
        api_reset() {
            this.api_pause();
            this.seconds = this.reverse ? 0 : this.startSeconds;
        },
        api_getTime() {
            return {
                seconds: this.seconds,
                time: this.timeStr,
            };
        },
        changeStatus() {
            if (this.reverse && this.seconds <= 0) return;
            if (this.timer === null) {
                this.api_start();
            } else {
                this.api_pause();
            }
            this.$emit('change-status', this.timer === null ? 'pause' : 'start');
        },
    },
};
</script>

<style lang="less" scoped>
.timer-wrap {
    padding: 11px 24px;
    background-color: #fff;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .txt-box {
        font-size: 16px;
        color: #3a3d4b;
    }

    .time {
        color: #ff0705;
    }

    .pause-btn {
        height: 32px;
        line-height: 32px;
        padding: 0 16px;
        background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
        border-radius: 16px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
    }
}
</style>
