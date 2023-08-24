<template>
    <div class="dialog-wrapper" v-show="show">
        <div class="dialog-container">
            <img v-if="type === 'alert'" src="./asset/images/alert.png" alt="提醒图标" class="icon" />
            <img v-else-if="type === 'auto'" src="./asset/images/ask.png" alt="提醒图标" class="icon" />
            <img v-else-if="type === 'success'" src="./asset/images/success.png" alt="提醒图标" class="icon" />

            <p v-if="type === 'alert'" class="content">是否确定提交考试试卷！</p>
            <p v-else-if="type === 'auto'" class="content">考试时间结束，系统已自动交卷！</p>
            <p v-else-if="type === 'success'" class="content">
                交卷成功，得分
                <span class="score">{{ scoreResult.objAnswerScore }}</span>
                ，成绩{{ scoreLevel }}
                <br />
                考试结束，请安静离场！
            </p>
            <p class="alert-time" v-if="type === 'alert'">{{ alertTime }}S</p>
            <button @click="handleClick" class="save think" v-if="type === 'alert'">我再想想</button>
            <button @click="handleClick" class="save success" v-else-if="type === 'success'">退出</button>
            <button @click="handleClick" class="save confirm" v-else-if="type === 'auto'">确定({{ autoTime }}s)</button>

            <!-- <button @click="handleCloseClick" class="close"></button> -->
        </div>
    </div>
</template>
<script>
// 自动交卷 auto
// 交卷提醒 alert
// 交卷成功 success
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'alert',
        },
        timeStamp: {
            type: Number,
            default: 0,
        },
        scoreResult: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            alertTime: 5,
            autoTime: 3,
        };
    },
    computed: {
        scoreLevel() {
            const rate = parseInt((this.scoreResult.objAnswerScore * 100) / this.scoreResult.objQuestionScoreCalculate);
            console.warn(this.scoreResult.objAnswerScore, this.scoreResult.objQuestionScoreCalculate, rate);
            if (rate >= 80) {
                return '优秀';
            } else if (rate >= 60) {
                return '良好';
            }
            return '一般';
        },
    },
    watch: {
        show(newV) {
            clearInterval(this.timer);
            if (newV) {
                this.alertTime = 5;
                this.timer = setInterval(() => {
                    if (this.alertTime <= 0) {
                        clearInterval(this.timer);
                        this.$emit('submit', 'M'); //A auto M man
                        return;
                    }
                    --this.alertTime;
                }, 1000);
            }
        },
        type(newV) {
            clearInterval(this.autoTimer);
            if (newV === 'auto') {
                this.autoTime = 3;
                this.autoTimer = setInterval(() => {
                    if (this.autoTime <= 0) {
                        clearInterval(this.autoTimer);
                        this.$emit('jump');
                        return;
                    }
                    --this.autoTime;
                }, 1000);
            }
        },
    },
    beforeDestroy() {
        clearInterval(this.timer);
        clearInterval(this.autoTimer);
    },
    methods: {
        handleClick() {
            clearInterval(this.timer);
            this.$emit('update:show', false);
            if (this.type === 'success') {
                this.$emit('jump');
            } else if (this.type === 'auto') {
                this.$emit('jump');
            }
        },
        handleCloseClick() {
            clearInterval(this.timer);
            this.$emit('update:show', false);
        },
    },
};
</script>
<style scoped lang="less">
.dialog-wrapper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(47, 79, 79, 0.7);
    top: 0;
    left: 0;

    .dialog-container {
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: white;
        border-radius: 12px;
        transform: translate(-50%, -50%);
        padding: 32px 20px;
        width: 400px;
        .icon {
            width: 54px;
            height: 54px;
            display: block;
            margin: 0 auto;
        }
        .content {
            margin-top: 20px;
            margin-bottom: 16px;
            color: #3a3d4b;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            .score {
                color: #00bc59;
            }
        }
        .alert-time {
            font-size: 18px;
            color: #53586c;
            text-align: center;
        }
        .save {
            border-radius: 4px;
            font-size: 18px;
            display: block;
            margin: 27px auto 0;
            width: 140px;
            height: 40px;
            border-radius: 4px;
            color: white;
            background: linear-gradient(135deg, #5c8edc, #3260a8);
        }
    }
}
</style>
