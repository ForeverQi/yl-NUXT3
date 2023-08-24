<template>
    <base-popup ref="basePopup">
        <div class="content">
            <h4 class="content-title">支付宝支付</h4>
            <img src="./asset/images/close.png" alt="" class="close-img" @click="handleClosePopup" />
            <p class="pay-tips">请在新打开的页面上完成支付</p>
            <p class="pay-tips-1">付款完毕前，请不要关闭此弹窗</p>
            <div class="pay-btn-wrapper">
                <button class="pay-btn pay-btn-over" @click="handleOverClick">已完成付款</button>
                <button class="pay-btn pay-btn-change" @click="handleChangeClick">更换支付方式</button>
            </div>
        </div>
    </base-popup>
</template>
<script>
import BasePopup from '@/www/components/course/trial-course/base-popup/index.vue';
import PayMix from '@/www/components/userCenter/order/wx-pay-qr-code/js/mixin.js';
import '@/api/order/api..query-other-order-detail.js';

export default {
    components: {
        BasePopup,
    },
    mixins: [PayMix],
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        orderNo: {
            type: String,
            default: '',
        },
    },
    watch: {
        show: {
            immediate: true,
            /**
             *  显示回调
             *
             *@param {boolean} val 最新值
             */
            handler(val) {
                setTimeout(() => {
                    if (this.$refs.basePopup) {
                        this.$refs.basePopup.show = val;
                    }
                });
            },
        },
    },
    methods: {
        /**
         * 关闭弹框
         */
        handleClosePopup() {
            this.$refs.basePopup.show = false;
            this.$emit('update:show', false);
        },
        /**
         * 完成回调
         */
        handleOverClick() {
            this.getDetail();
        },
        /**
         * 更换支付回调
         */
        handleChangeClick() {
            this.$emit('change');
        },
        /**
         * 获取详情
         */
        getDetail() {
            this.requestWrapper('order/query-other-order-detail', {
                orderNo: this.orderNo,
            })
                .then((res) => {
                    console.warn(res);
                    if (res.orderStatus === 'PAI') {
                        this.$emit('success');
                    } else {
                        this.handleClosePopup();
                    }
                })
                .catch(this.$niceloo.api.handleFailure);
        },
    },
};
</script>
<style lang="less" scoped>
.content {
    width: 384px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    overflow: hidden;

    .content-title {
        width: 100%;
        height: 64px;
        line-height: 64px;
        color: #333333;
        font-size: 20px;
        text-align: center;
        font-weight: bold;
        background: #f6f7f9;
    }

    .close-img {
        width: 20px;
        height: 20px;
        display: block;
        position: absolute;
        right: 24px;
        top: 24px;
        cursor: pointer;
    }

    .pay-tips {
        margin-top: 32px;
        text-align: center;
        font-size: 16px;
        color: #3a3d4b;
        line-height: 21px;
        font-weight: bold;
    }

    .pay-tips-1 {
        font-size: 12px;
        color: #3a3d4b;
        margin-bottom: 32px;
        font-weight: bold;
        margin-top: 12px;
        text-align: center;
        line-height: 16px;
    }

    .pay-btn-wrapper {
        margin-bottom: 40px;
        margin-top: 32px;
        text-align: center;
    }

    .pay-btn {
        outline: none;
        border: none;
        cursor: pointer;
        width: 120px;
        height: 38px;
        border-radius: 8px;
        font-size: 14px;
    }
    .pay-btn-over {
        color: white;
        background: linear-gradient(90deg, #ff6870, #f8323c);
    }
    .pay-btn-change {
        margin-left: 24px;
        color: #f8323c;
        background: #ffffff;
        border: 1px solid #f8323c;
    }
}
</style>
