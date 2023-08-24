<template>
    <div class="remind-wrap">
        <h2 class="title">取消提醒</h2>
        <p class="content">您确定要取消注销吗？</p>
        <div class="btn-wrap">
            <button class="continue" @click="proceed">继续注销</button>
            <button class="cancel" @click="confirm">确定取消</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        proceed() {
            this.$emit('proceed');
        },
        confirm() {
            this.$emit('confirm');
        },
    },
};
</script>

<style lang="less" scoped>
.remind-wrap {
    width: 340px;
    height: 244px;
    background: #fff;
    border-radius: 6px;
    text-align: center;
    overflow: hidden;
    padding: 0 30px;
    .title {
        font-size: 20px;
        color: #3a3d4b;
        margin: 32px 0 24px;
        font-weight: bold;
    }
    .content {
        font-size: 16px;
        color: #3a3d4b;
        text-align: center;
    }
    .btn-wrap {
        overflow: hidden;
        margin-top: 40px;
        button {
            width: 160px;
            height: 48px;
            border: none;
            font-size: 18px;
            border-radius: 24px;
            color: #3a3d4b;
            cursor: pointer;
            &.continue {
                float: left;
            }
            &.cancel {
                float: right;
                background: linear-gradient(90deg, #f8323c, #ff737a 100%);
                color: #fff;
            }
        }
    }
}
</style>
