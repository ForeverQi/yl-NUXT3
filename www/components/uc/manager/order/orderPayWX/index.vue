<template>
    <div class="orderPayWX" v-if="show">
        <div class="contentright">
            <img src="./asset/images/close.png" @click="handleClose" class="close" />
            <div class="smtop">
                <img src="./asset/images/wxzf.png" />
                微信支付
            </div>
            <div class="smk" id="qrcode">
                <div class="qr-wrapper">
                    <vb-jrcode :option="option"></vb-jrcode>
                </div>
            </div>
            <div class="zfxx">
                <p class="order-pay-tip">请使用微信扫一扫</p>
                <p class="order-pay-tip">扫描二维码完成支付</p>
            </div>
        </div>
    </div>
</template>

<script>
import vbJrcode from '@/www/components/uc/manager/order/vbJrcode/index.vue';
export default {
    name: 'orderPayWX',
    components: {
        vbJrcode,
    },
    layout: 'payLayout',
    props: {
        tradePay: {
            type: Object,
            default: () => {},
        },
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            qrCode: '',
            option: {
                width: 180,
                hegiht: 180,
                text: ' ',
            },
        };
    },
    watch: {
        tradePay() {
            this.getCashierInfo();
        },
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    methods: {
        getCashierInfo() {
            this.qrCode = decodeURIComponent(this.tradePay.bizContent);
            this.option.text = this.qrCode;
        },
        handleClose() {
            this.$emit('close');
            this.$emit('update:show', false);
        },
    },
};
</script>
<style lang="less" scoped>
.orderPayWX {
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .contentright {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 16px;
        border: #eaeaea 1px solid;
        padding: 48px 0 34px;
        box-sizing: content-box;
    }
    .smtop {
        width: 100%;
        font-size: 22px;
        letter-spacing: 1px;
        margin-bottom: 20px;
        font-weight: bold;
        text-align: center;
        padding-top: 5.5px;
        padding-bottom: 5.5px;
    }
    .smtop img {
        margin-right: 10px;
        vertical-align: middle;
        width: 40px;
        height: 36.67px;
    }

    .smk {
        box-sizing: content-box;
        margin: 0 auto;
        margin-bottom: 20.5px;
        background-color: #f6f7f9;
        padding: 16px 86px;
    }
    .qr-wrapper {
        background-color: white;
        border-radius: 12px;
        padding: 16px;
    }
    .order-pay-tip {
        font-size: 16px;
        color: #000;
        text-align: center;
        font-weight: bold;
        padding-top: 3.5px;
        padding-bottom: 3.5px;
    }
    .py_zz {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #000;
        filter: alpha(opacity=30);
        -moz-opacity: 0.3;
        -khtml-opacity: 0.3;
        opacity: 0.3;
    }
    .close {
        width: 45px;
        height: 45px;
        position: absolute;
        top: 0;
        right: 0;
        padding: 15px;
        box-sizing: border-box;
    }
}
</style>
