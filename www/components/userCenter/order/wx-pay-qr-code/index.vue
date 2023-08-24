<template>
    <base-popup ref="basePopup">
        <div class="content">
            <h4 class="content-title">微信支付</h4>
            <img src="./asset/images/close.png" alt="" class="close-img" @click="handleClosePopup" />
            <div class="pay-amount">
                实付金额：
                <span class="pay-amount-value">￥{{ parseFloat(order.orderTotalamount / 100) }}</span>
            </div>
            <div class="pay-title-timer-value-wrapper" v-if="isNeedTimer">
                <template v-if="hour > 0 || minute > 0 || second > 0">
                    <span class="pay-title-timer">剩余支付时间</span>
                    <template v-if="hour > 0">
                        <span class="pay-title-timer-value">{{ hour }}</span>
                        :
                    </template>
                    <span class="pay-title-timer-value">{{ minute }}</span>
                    :
                    <span class="pay-title-timer-value">{{ second }}</span>
                </template>
            </div>
            <div class="content-body">
                <p v-if="isPreparing" style="text-align: center">发起支付中...</p>
                <vb-jrcode :option="option" class="qr-weixin" v-else></vb-jrcode>
                <div class="timeout-wrapper" v-if="isNeedTimer && isPreparing === false && timerSeconds <= 0">
                    <span class="timeout-tips">订单已超时</span>
                    <span class="timeout-tips">请重新下单</span>
                </div>
            </div>
            <!-- <button @click="handleBuyClick" class="re-buy" v-if="isNeedTimer && timerSeconds <= 0">重新下单</button> -->
            <p class="tips" v-if="(isNeedTimer && timerSeconds > 0) || isNeedTimer === false">使用微信扫一扫，进行支付</p>
        </div>
    </base-popup>
</template>
<script>
import mix from './js/mixin.js';
import BasePopup from '@/www/components/course/trial-course/base-popup/index.vue';
import vbJrcode from '@/www/components/uc/manager/order/vbJrcode/index.vue';
import '@/api/order/api..query-other-order-detail.js';
import TimerMix from '@/www/components/userCenter/order/wx-pay-qr-code/js/timer.js';

export default {
    components: {
        BasePopup,
        vbJrcode,
    },
    mixins: [mix, TimerMix],
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
    /**
     * 数据模型
     *
     * @returns {object} ret 数据模型
     */
    data() {
        return {
            isPreparing: false,
            order: {
                orderId: '',
                orderType: '',
                orderNo: '',
                orderTotalamount: 0,
                orderItems: [],
                orderTimeexpire: '',
            },
            option: {
                width: 195,
                hegiht: 195,
                text: ' ',
            },
            timerCardType: ['ATI', 'WK', 'CARD', 'TC', 'DRA'],
            orderNoReal: '',
        };
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
                clearInterval(this.timerHandler);
                clearInterval(this.timeHandler);

                setTimeout(() => {
                    if (this.$refs.basePopup) {
                        this.$refs.basePopup.show = val;
                    }
                });
                if (!this.orderNo) {
                    return;
                } else if (!val) {
                    return;
                }
                this.getDetail();
                this.handlePay();
            },
        },
        orderNo: {
            immediate: true,
            /**
             *  显示回调
             *
             *@param {string} val 单号
             */
            handler(val) {
                this.orderNoReal = val;
            },
        },
    },
    /**
     * 获取详情
     */
    mounted() {
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
    },
    /**
     * 销毁
     */
    beforeDestroy() {
        clearInterval(this.timerHandler);
        clearInterval(this.timeHandler);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    },
    methods: {
        /**
         * 显隐回调,刷新定时器信息
         */
        handleVisibilityChange() {
            console.warn('handleVisibilityChange', document.visibilityState);
            if (document.visibilityState === 'hidden') {
                return;
            } else if (!this.orderNo) {
                return;
            } else if (!this.show) {
                return;
            }

            clearInterval(this.timerHandler);
            this.getDetail();
        },
        /**
         *支付逻辑
         */
        handlePay() {
            this.isPreparing = true;
            this.orderingReceiptsPayprecreate('', this.orderNoReal)
                .then(() => {
                    return this.pcTradePay();
                })
                .then(() => {
                    this.isPreparing = false;
                    return this.queryCashierInfo();
                })
                .then(() => {
                    this.queryPayStatus();
                })
                .catch(niceloo.api.handleFailure);
        },
        /**
         * 跳转地址
         *
         * @param  {string} url 跳转地址
         * @returns {string}  跳转地址
         */
        combinationUrl(url) {
            if (url.indexOf('?') > -1) {
                return `${url}&isPay`;
            } else {
                return `${url}?isPay`;
            }
        },
        /**
         * 订单状态
         */
        queryPayStatus() {
            clearInterval(this.timeHandler);
            this.timeHandler = setInterval(() => {
                this.queryPaySts()
                    .then(({ result }) => {
                        this.isPaid = result === 'SUCCESS';
                    })
                    .finally(() => {
                        if (this.isPaid) {
                            clearInterval(this.timeHandler);
                            this.handleClosePopup();
                            this.$emit('success');
                        }
                    });
            }, 1e3);
        },
        /**
         * 关闭弹框
         */
        handleClosePopup() {
            this.$refs.basePopup.show = false;
            this.$emit('update:show', false);
        },
        /**
         * 获取详情
         */
        getDetail() {
            this.requestWrapper('order/query-other-order-detail', {
                orderNo: this.orderNoReal || this.orderNo,
            })
                .then((res) => {
                    // const d = new Date();
                    // res.orderTimeexpire = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds() + 10}`;
                    // console.warn(res.orderTimeexpire);

                    Object.assign(this.order, res);
                    if (res.orderStatus === 'PAI') {
                        this.$router.push({
                            path: this.createRedirectUrl(res),
                        });
                    } else if (this.isNeedTimer && this.isTimerEnable) {
                        this.timerSeconds = parseInt((Date.parse(res.orderTimeexpire) - Date.now()) / 1000);
                        this.startTimer();
                    }
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        /**
         * 重新下单
         */
        handleBuyClick() {
            this.approvalApply().then((orderNo) => {
                this.orderNoReal = orderNo;

                this.getDetail();
                this.handlePay();

                this.$emit('re-buy', orderNo);
            });
        },
        /**
         * 定时器结束回调
         */
        timerStopCb() {
            console.warn('定时器结束回调');
            clearInterval(this.timeHandler);
            this.getDetail();
        },
    },
};
</script>
<style lang="less" scoped>
.content {
    width: 440px;
    border-radius: 16px;
    // background-color: #fff;
    position: relative;
    overflow: hidden;
    padding-bottom: 70px;
    background-image: url(./asset/images/m-bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;

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

    .pay-amount {
        margin-top: 29px;
        text-align: center;
        font-size: 14px;
        color: #3a3d4b;
        .pay-amount-value {
            color: #f8323c;
            font-size: 16px;
            font-weight: 700;
        }
    }
    .content-body {
        margin-top: 28px;
        height: 180px;
        // background-color: #f6f7f9;
        display: flex;
        justify-content: center;
        align-items: center;
        // background-color: white;
        position: relative;
        .qr-weixin {
            width: 180px;
            height: 180px;
        }
        .timeout-wrapper {
            border: 1px solid #e2e2e2;
            position: absolute;
            top: 0;
            left: 50%;
            width: 180px;
            height: 180px;
            transform: translateX(-50%);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            background-color: white;

            .timeout-tips {
                text-align: center;
                font-size: 14px;
                color: #3a3d4b;
                line-height: 21px;
            }
        }
    }
    .tips {
        font-size: 12px;
        color: #3a3d4b;
        font-weight: bold;
        margin-top: 12px;
        text-align: center;
    }
}

.pay-title-timer {
    color: #9698a2;
    line-height: 19px;
    margin-right: 14px;
    font-size: 12px;
}
.pay-title-timer-value {
    background: #f4f4f4;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    padding: 4px;
    display: inline-block;
    color: #333;
}
.pay-title-timer-value-wrapper {
    color: #333;
    text-align: center;
    margin-top: 12px;
    font-size: 12px;
}
.re-buy {
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 20px;
    font-size: 14px;
    color: white;
    line-height: 27px;
    background-image: url(./asset/images/bg.png);
    width: 180px;
    height: 40px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: block;
    margin: 0 auto;
    margin-top: 12px;
}
</style>
