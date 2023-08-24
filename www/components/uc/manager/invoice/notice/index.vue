<template>
    <div class="invoiceTipWrapper" v-show="show">
        <img src="./asset/images/horn.png" />
        <p>{{ msg }}</p>
        <slot name="close"><input type="button" class="btn" @click="handleClose" /></slot>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        msg: {
            type: String,
            default: '电子发票一般会在提交申请后的7个工作日内开具，请留意您的邮箱',
        },
    },
    methods: {
        handleClose() {
            this.$emit('update:show', false);
        },
    },
};
</script>

<style scoped lang="less">
.invoiceTipWrapper {
    background-color: #fff3f3;
    padding: 10px 20px;
    display: flex;
    img {
        width: 20px;
        height: 20px;
    }
    p {
        font-size: 15px;
        color: #f8323c;
        flex: 1;
        margin-left: 11px;
    }
    .btn {
        width: 20px;
        height: 20px;
        background-image: url('./asset/images/close.png');
        background-repeat: no-repeat;
        background-size: contain;
        border-radius: 50%;
        border: none;
    }
}
</style>
