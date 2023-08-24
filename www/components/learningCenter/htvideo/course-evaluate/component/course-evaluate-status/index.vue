<template>
    <div class="evaluate-status">
        <div class="status-pic" :class="evaluateStatus === 'success' ? 'success' : 'error'"></div>
        <div class="status-msg">
            {{ evaluateStatus === 'success' ? '提交成功，感谢您的评价！' : '提交失败！' }}
        </div>
        <button class="status-btn" @click="handleEvaluate">
            {{ evaluateStatus === 'success' ? '查看评价' : '继续评价' }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'index',
    props: {
        evaluateStatus: {
            type: String,
            default: '',
        },
    },
    methods: {
        handleEvaluate() {
            let evaluateStatus = this.evaluateStatus === 'success' ? 'evaluated' : 'notEvaluated';
            this.$emit('handleEvaluate', evaluateStatus);
        },
    },
};
</script>

<style lang="less" scoped>
.evaluate-status {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    .status-pic {
        width: 260px;
        height: 180px;
        margin-top: 63px;
        &.success {
            background: url('../../assets/images/statusSuccess.svg') 100% 100%;
        }
        &.error {
            background: url('../../assets/images/statusError.svg') 100% 100%;
        }
    }
    .status-msg {
        height: 43px;
        line-height: 43px;
        margin-top: 5px;
    }
    .status-btn {
        width: 130px;
        height: 40px;
        margin-top: 14px;
        border: 1px solid #bbbbbb;
        border-radius: 20px;
        color: #fff;
        background: rgba(0, 0, 0, 0);
        cursor: pointer;
    }
}
</style>
