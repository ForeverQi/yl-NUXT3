<template>
    <popup-base ref="popupBase">
        <div class="content">
            <div class="content-title">微信二维码</div>
            <div class="share-img">
                <vb-jrcode class="qr-image" :option="option"></vb-jrcode>
            </div>
            <div class="content-footer">微信手机扫码分享</div>
            <img src="./asset/images/close.png" alt="" class="close-img" @click="handleClosePopup" />
        </div>
    </popup-base>
</template>
<script>
import PopupBase from '@/www/components/components/popup-base/index.vue';
import vbJrcode from '@/www/components/uc/manager/order/vbJrcode/index.vue';
export default {
    name: 'shareModel',
    components: {
        vbJrcode,
        PopupBase,
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: '',
        },
        detail: {
            type: Object,
            default: () => {},
        },
        option: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            title: '',
            shareUrl: '',
        };
    },
    fetch() {
        return Promise.resolve();
    },
    watch: {
        show(val) {
            console.log(val, 123);
            this.$refs.popupBase.show = val;
            let body = document.getElementsByTagName('body');
            if (val) {
                body[0].style.height = '100vh';
                body[0].style.overflow = 'hidden';
            } else {
                body[0].style.height = 'auto';
                body[0].style.overflow = 'visible';
            }
        },
    },
    methods: {
        handleClosePopup() {
            this.$refs.popupBase.show = false;
            this.$emit('update:show', false);
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
    overflow: hidden;
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
        border-radius: 16px;
        padding-left: 32px;
        font-weight: bold;
    }

    .share-img {
        position: absolute;
        top: 143px;
        left: 109px;
        display: block;
        border-radius: 16px;
    }
    .qr-image {
        width: 160px;
        height: 160px;
    }
    .content-footer {
        position: absolute;
        top: 341px;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 18px;
        color: #333333;
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
</style>
