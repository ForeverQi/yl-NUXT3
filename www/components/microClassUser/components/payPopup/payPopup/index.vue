<template>
    <base-popup ref="basePopup">
        <div class="content">
            <div class="content-title">支付流程</div>
            <img src="./asset/images/close.png" alt="" class="close-img" @click="handleClosePopup" />
            <div class="tab-box flex ai-center">
                <div :class="['tab-item flex jc-center ai-center', paymodeCode == 'WX' ? 'active' : '']" @click="handleChosePay('WX')">
                    <img src="./asset/images/weixin.png" alt="" class="img-init" />
                    <img src="./asset/images/weixin-active.png" alt="" class="img-active" />
                    <div>微信支付</div>
                </div>
                <div :class="['tab-item flex jc-center ai-center', paymodeCode == 'ALIPAY' ? 'active' : '']" @click="handleChosePay('ALIPAY')">
                    <img src="./asset/images/alipay.png" alt="" class="img-init" />
                    <img src="./asset/images/alipay-active.png" alt="" class="img-active" />
                    <div>支付宝支付</div>
                </div>
            </div>
            <div class="content-body">
                <p v-if="isPrepareing">发起支付中...</p>
                <vb-jrcode v-else-if="paymodeCode == 'WX'" :option="option" class="qr-weixin"></vb-jrcode>
                <div class="" v-else-if="paymodeCode == 'ALIPAY'">
                    <div class="tips1">请在新打开的页面上完成付款</div>
                    <div class="tips2">付款完毕前，请不要关闭此弹窗</div>
                    <div class="btn" @click="handlePayRes('pay_success')">已完成付款</div>
                </div>
            </div>
            <div class="content-footer">
                <div class="flex mb12">
                    <div class="title">实付金额：</div>
                    <div class="text">¥ {{ order.orderTotalamount | priceFormate }}</div>
                </div>
                <div class="flex mb12">
                    <div class="title">订单编号：</div>
                    <div class="text">{{ order.orderNo }}</div>
                </div>
                <div class="flex mb12">
                    <div class="title">课程名称：</div>
                    <div class="text">{{ skuName }}</div>
                </div>
            </div>
        </div>
    </base-popup>
</template>
<script>
import basePopup from '../../basePopup/basePopup/index.vue';
import {
    orderingReceiptsPayprecreate,
    pcTradePay,
    queryCashierInfo,
    orderingStudentorderMicroclassOrderdetaiPost,
    queryPayStatus,
    mcpTrialWebDetail,
} from '../../../experienceClass/apis/index.js';
import vbJrcode from '@/www/components/uc/manager/order/vbJrcode/index.vue';

export default {
    name: 'sharePopupModel',
    components: {
        basePopup,
        vbJrcode,
    },
    filters: {
        priceFormate(value) {
            return parseFloat((value / 100).toFixed(2));
        },
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        orderNo: {
            type: String,
            default: '',
        },
        ailPageSource: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            paymodeCode: 'WX', // WX , ALIPAY
            isPrepareing: false,
            order: {
                orderNo: '',
                orderTotalamount: 0,
                orderItems: [],
            },
            option: {
                width: 195,
                hegiht: 195,
                text: ' ',
            },
            traderecordId: '',
            tradeclientCode: 'YL_WK_PC',
            platformCode: '',
            traderecordOrdertradeno: '',
            isPaid: false,
            course: null,
        };
    },
    computed: {
        skuName() {
            return this.order.orderItems.map((item) => item.skuName).join();
        },
    },
    watch: {
        show(val) {
            console.debug('watch-show', val);
            this.$refs.basePopup.show = val;
            if (this.show === false) {
                clearTimeout(this.timeHandler);
                clearInterval(this.timeoutHandler);
                return;
            } else if (!this.orderNo) {
                return;
            }
            this.handlePay();
            this.orderingOrderDetail();
        },
    },
    destroyed() {
        clearTimeout(this.timeHandler);
        clearInterval(this.timeoutHandler);
    },
    methods: {
        orderingReceiptsPayprecreate() {
            return orderingReceiptsPayprecreate(this, {
                tradeClientCode: this.tradeclientCode,
                orderNo: this.orderNo,
                brandId: 'YOULU',
                sceneCode: 'PC',
                tradeRecordFrontUrl: this.combinationUrl(window.location.href),
            });
        },
        handlePay() {
            this.isPrepareing = true;
            this.orderingReceiptsPayprecreate()
                .then(({ traderecordId }) => {
                    this.traderecordId = traderecordId;
                    return this.pcTradePay();
                })
                .then(() => {
                    return this.queryCashierInfo();
                })
                .then(() => {
                    this.queryPayStatus();
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    this.isPrepareing = false;
                });
        },
        combinationUrl(url) {
            if (url.indexOf('?') > -1) {
                return `${url}&isPay`;
            } else {
                return `${url}?isPay`;
            }
        },
        pcTradePay() {
            // F:form表单跳转网关；
            // Q:二维码地址；
            // U:跳转URL地址打开支付；
            // D:支付参数调起支付控件；
            // R:重复发起;
            return pcTradePay(this, {
                traderecordId: this.traderecordId,
                paymodeCode: this.paymodeCode,
                sceneCode: 'PC',
                traderecordNonceno: this.createRandomCode(),
            }).then(({ bizType, bizContent }) => {
                if (bizType === 'F') {
                    const blank = window.open('', '_blank');
                    setTimeout(
                        () => {
                            blank.document.body.innerHTML = bizContent;
                            blank.document.forms[0].acceptCharset = 'utf-8';
                            blank.document.forms[0].submit();
                        },
                        navigator.userAgent.includes('Firefox') ? 5e2 : 0
                    );
                } else if (bizType === 'Q') {
                    this.option.text = bizContent;
                }
            });
        },
        queryPayStatus() {
            return queryPayStatus(this, {
                platformCode: this.platformCode,
                traderecordOrdertradeno: this.traderecordOrdertradeno,
            })
                .then(({ result }) => {
                    this.isPaid = result === 'SUCCESS';
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    if (this.isPaid) {
                        this.mcuTrack({
                            is_success: true,
                        });
                        this.handleClosePopup();
                        this.$emit('success');
                        return;
                    }
                    this.show && (this.timeHandler = setTimeout(this.queryPayStatus, 1e3));
                });
        },
        queryCashierInfo() {
            return queryCashierInfo(this, {
                traderecordId: this.traderecordId,
            }).then(({ platformCode, traderecordOrdertradeno }) => {
                this.platformCode = platformCode;
                this.traderecordOrdertradeno = traderecordOrdertradeno;
            });
        },
        orderingOrderDetail() {
            return orderingStudentorderMicroclassOrderdetaiPost(this, {
                orderNo: this.orderNo,
            })
                .then((res) => {
                    Object.assign(this.order, res);
                    return this.mcpTrialWebDetail();
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    this.timer();
                });
        },
        createRandomCode() {
            return Date.now();
        },
        handleClosePopup() {
            this.$refs.basePopup.show = false;
            this.$emit('update:show', false);
        },
        handleChosePay(type) {
            this.paymodeCode = type;
            return this.pcTradePay();
        },
        handlePayRes(val) {
            this.handleClosePopup();
            this.$emit('pay_result', val);
        },
        timer() {
            if (this.timeoutHandler) {
                clearInterval(this.timeoutHandler);
            }
            this.timeoutHandler = 0;
            this.timeoutVal = Math.floor((Date.parse(this.order.orderTimeexpire) - Date.now()) / 1000);
            this.timeoutHandler = setInterval(() => {
                this.timeoutVal -= 1;
                if (this.timeoutVal <= 0) {
                    clearInterval(this.timeoutHandler);
                    if (!this.isPaid) {
                        this.mcuTrack({
                            is_success: false,
                            fail_reason: '订单超时...',
                        });
                        this.$emit('timeout');
                        this.handleClosePopup();
                    }
                } else if (this.isPaid) {
                    clearInterval(this.timeoutHandler);
                }
            }, 1e3);
        },
        mcpTrialWebDetail() {
            return mcpTrialWebDetail(this, {
                goodsId: this.order.orderItems[0].skuId,
            })
                .then((res) => {
                    this.course = res;
                })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    console.error(err);
                });
        },
        mcuTrack(track) {
            console.info('支付埋点上报');
            this.$yiguan.mcuTrack('wk_pay', {
                course_name: this.course?.courseName ?? '未获取课程信息',
                mycourse_subject_name: this.course?.subjectName ?? '未获取科目信息',
                pay_type: (this.paymodeCode === 'WX' && '微信支付') || (this.paymodeCode === 'ALIPAY' && '支付宝支付') || '未知类型',
                is_success: true,
                fail_reason: '',
                ail_page_source: this.ailPageSource,
                ...track,
            });
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
    .content-title {
        width: 100%;
        height: 92px;
        line-height: 92px;
        color: #333333;
        font-size: 20px;
        padding-left: 32px;
        font-weight: bold;
    }
    .close-img {
        width: 19px;
        height: 19px;
        display: block;
        position: absolute;
        right: 28px;
        top: 28px;
        cursor: pointer;
    }
    .tab-box {
        .tab-item {
            width: 50%;
            height: 48px;
            cursor: pointer;
            img {
                width: 24px;
                height: 24px;
                margin-right: 8px;
            }
            div {
                font-size: 18px;
                color: #999;
            }
            .img-active {
                display: none;
            }
            .img-init {
                display: block;
            }
        }
        .active {
            .img-active {
                display: block;
            }
            .img-init {
                display: none;
            }
            div {
                color: #3a3d4b;
                font-weight: bold;
            }
        }
    }
    .content-body {
        width: 100%;
        height: 244px;
        background-color: #f6f7f9;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        .qr-weixin {
            width: 180px;
            height: 180px;
        }
        .tips1 {
            font-size: 18px;
            line-height: 24px;
            color: #3a3d4b;
            margin-bottom: 8px;
            font-weight: bold;
        }
        .tips2 {
            font-size: 14px;
            line-height: 19px;
            color: #666;
            margin-bottom: 8px;
            margin-bottom: 40px;
        }
        .btn {
            width: 160px;
            height: 46px;
            line-height: 46px;
            font-size: 16px;
            color: #999;
            border: 1px solid #d6d6d6;
            border-radius: 8px;
            margin: 0 auto;
            cursor: pointer;
        }
    }
    .content-footer {
        padding: 40px 32px;
        font-size: 12px;
        p {
            font-size: 12px;
            line-height: 14px;
            margin-bottom: 12px;
        }
        .title {
            color: #999999;
            width: 80px;
        }
        .text {
            flex: 1;
            color: #3a3d4b;
            word-break: break-all;
        }
        .mb12 {
            margin-bottom: 12px;
        }
    }
}
</style>
