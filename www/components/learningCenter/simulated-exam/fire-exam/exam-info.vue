<template>
    <aside class="exam-info-container">
        <img src="./asset/images/avatar.png" alt="" class="avatar" />
        <p class="name">考生姓名：{{ userInfo && userInfo.userYoulunum }}</p>
        <p class="id-card">身份证号：876343199603021235</p>
        <p class="time">
            <strong>{{ time }}</strong>
        </p>
        <p class="time-leave">剩余时间</p>
        <p class="status">当前进度</p>
        <div class="status-val">
            <div class="progress-wrapper"><div class="progress-val" :style="progressStyle"></div></div>
            <span>{{ questionAnswerTotal }}/{{ questionTotal }}</span>
        </div>
        <p class="warn"><strong>注意：时间结束后，若还没答完考题，系统自动交卷</strong></p>
        <button class="submit" @click="handleSubmit" :disabled="paperEnable === false">交卷</button>
        <message-dialog
            :show.sync="isShowDialog"
            :type="dialogType"
            :time-stamp="timeStamp"
            @submit="handleDialogSubmit"
            @jump="$emit('jump')"
            :score-result="scoreResult"
        ></message-dialog>
    </aside>
</template>

<script>
import MessageDialog from '../components/fire-exam/dialog.vue';

export default {
    components: { MessageDialog },
    props: {
        paperInfo: {
            type: Object,
            default: () => ({}),
        },
        questionList: {
            type: Array,
            default: () => [],
        },
        paperEnable: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            userInfo: null,
            timeStamp: 0,
            isShowDialog: false,
            dialogType: 'alert',
            progressStyle: {
                width: 0,
            },
            scoreResult: {},
        };
    },
    computed: {
        time() {
            return this.getTimeString(this.timeStamp);
        },
        questionTotal() {
            return this.questionList.map((item) => item.questionList).flat(Number.POSITIVE_INFINITY).length;
        },
        questionAnswerTotal() {
            return this.questionList
                .map((item) => item.questionList)
                .flat(Number.POSITIVE_INFINITY)
                .filter((item) => item.answer.length > 0).length;
        },
        progress() {
            if (!this.questionTotal) {
                return 0;
            }
            return Math.ceil((this.questionAnswerTotal * 100) / this.questionTotal);
        },
    },
    watch: {
        paperInfo(newV) {
            if (!newV) {
                return;
            }
            this.timer();
        },
        questionTotal(newV) {
            if (newV === 0 || this.questionAnswerTotal === 0) {
                this.progressStyle.width = 0;
            } else {
                this.progressStyle.width = `${(newV * 100) / this.questionAnswerTotal}%`;
            }
        },
        questionAnswerTotal(newV) {
            if (newV === 0 || this.questionTotal === 0) {
                this.progressStyle.width = 0;
            } else {
                this.progressStyle.width = `${(newV * 100) / this.questionTotal}%`;
            }
        },
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    mounted() {
        if (this.$User.getToken()) {
            this.$User.getUser().then((res) => {
                this.userInfo = res;
            });
        }
    },
    methods: {
        timer() {
            clearInterval(this.timer);
            const time = sessionStorage.getItem(`${this.paperInfo.paperId}_time`);
            if (time) {
                this.timeStamp = +time;
            } else {
                this.timeStamp = (this.paperInfo.examDuration || 90) * 60;
            }
            this.timer = setInterval(() => {
                if (this.timeStamp <= 0) {
                    clearInterval(this.timer);
                    sessionStorage.removeItem(`${this.paperInfo.paperId}_time`);
                    this.handleDialogSubmit('A');
                    return;
                }
                --this.timeStamp;
                sessionStorage.setItem(`${this.paperInfo.paperId}_time`, this.timeStamp);
            }, 1000);
        },
        getTimeString(time) {
            const hour = parseInt(time / 3600);
            const t = time % 3600;
            const minute = parseInt(t / 60);
            const second = t % 60;
            return this.formatNumber(hour) + ':' + this.formatNumber(minute) + ':' + this.formatNumber(second);
        },
        formatNumber(n) {
            return n.toString().padStart(2, '0');
        },
        getRemainingTime() {
            return (this.paperInfo.examDuration || 90) * 60 - this.timeStamp;
        },
        handleSubmit() {
            this.isShowDialog = true;
            this.dialogType = 'alert';
        },
        handleDialogSubmit(answerWay) {
            this.$emit('submit', answerWay);
        },
        submitSuccess(way, score) {
            if (way === 'A') {
                this.dialogType = 'auto';
                this.isShowDialog = true;
            } else if (way === 'M') {
                this.dialogType = 'success';
                this.scoreResult = score;
            }
            clearInterval(this.timer);
        },
        submitError() {
            this.isShowDialog = false;
        },
    },
};
</script>

<style scoped lang="less">
aside,
strong {
    border: 0;
    font-weight: normal;
    display: block;
}
.exam-info-container {
    width: 313px;
    background-color: white;
    padding: 64px 24px;
    box-sizing: border-box;
    max-height: 100%;
    overflow: auto;
    .avatar {
        width: 120px;
        height: 168px;
        display: block;
        margin: 0 auto 0;
    }
    .name {
        margin: 24px 0 0;
        font-size: 14px;
        color: black;
    }
    .id-card {
        margin: 8px 0 0;
        font-size: 14px;
        color: black;
    }
    .time-leave {
        margin: 12px 0 0;
        text-align: center;
        color: #8d90aa;
        font-size: 14px;
    }
    .time {
        margin: 64px 0 0;
        text-align: center;
        font-size: 34px;
        line-height: 1;
        color: black;
        strong {
            line-height: 1;
        }
    }
    .line {
        background-color: transparent;
        border-color: rgba(242, 242, 242, 1);
        margin-top: 30px;
    }
    .status {
        margin-top: 64px;
        margin-bottom: 19px;
        font-size: 14px;
        color: black;
    }
    .status-val {
        display: flex;
        align-items: center;
        margin-top: 16px;
        progress {
            margin-right: 23px;
            flex: 1;
        }
        span {
            color: #8d90aa;
            font-size: 14px;
        }
        .progress-wrapper {
            height: 8px;
            width: 130px;
            background: #f4f5f9;
            border-radius: 4px;
            margin-right: 23px;
            flex: 1;

            .progress-val {
                height: 8px;
                width: 0;
                background: #3260a8;
                border-radius: 4px;
            }
        }
    }
    .warn {
        margin-top: 30px;
        font-size: 12px;
        color: #ff2e30;
    }
    .submit {
        display: block;
        margin: 40px auto;
        font-size: 16px;
        font-weight: bold;
        color: white;
        width: 144px;
        height: 44px;
        background: linear-gradient(135deg, #5c8edc, #3260a8);
        border-radius: 6px;
        border: none;
        outline: none;
        cursor: pointer;
    }
}
</style>
