<template>
    <div class="notask-tip">
        <img src="./asset/images/notasktip.png" />
        <p class="txt">{{ tipText }}</p>
    </div>
</template>
<script>
export default {
    props: {
        tipText: {
            type: String,
            default: '',
        },
    },
};
</script>
<style lang="less" scoped>
.notask-tip {
    text-align: center;
    padding: 210px 0px 500px;
    background: #ffffff;

    .txt {
        color: #666666;
        font-size: 16px;
        margin-top: 26px;
    }
}
</style>
