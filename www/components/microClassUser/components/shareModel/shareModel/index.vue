<template>
    <div class="content">
        <img :src="shareImg" alt="" class="share-img" />
        <div class="content-footer">微信扫一扫，进入小程序 更多好课等你体验</div>
        <img src="./asset/images/close.png" alt="" class="close-img" @click="handleClosePopup" />
    </div>
</template>
<script>
export default {
    name: 'sharePopupModel',
    components: {},
    props: {
        shareImg: {
            type: String,
            default: '',
        },
    },
    data() {
        return {};
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {
        handleClosePopup() {
            this.$emit('close', false);
        },
    },
};
</script>
<style lang="less" scoped>
.content {
    width: 384px;
    height: 480px;
    background-image: url('./asset/images/shareBg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 16px;
    position: relative;
    .content-title {
        width: 100%;
        height: 92px;
        line-height: 92px;
        color: #333333;
        font-size: 20px;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;
        border-radius: 16px;
        padding-left: 32px;
    }

    .share-img {
        position: absolute;
        top: 101px;
        left: 103px;
        width: 180px;
        height: 180px;
        display: block;
    }
    .content-footer {
        position: absolute;
        top: 341px;
        left: 50%;
        width: 198px;
        text-align: center;
        font-size: 16px;
        line-height: 18px;
        color: #333333;
        margin-left: -99px;
    }
    .close-img {
        width: 16px;
        height: 16px;
        display: block;
        position: absolute;
        right: 37px;
        top: 30px;
        cursor: pointer;
    }
}
.content:after {
    content: '';
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid #fff;
    border-radius: 4px;
    position: absolute;
    top: -11px;
    right: 85px;
    z-index: 3;
}
</style>
