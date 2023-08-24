<template>
    <div class="orderPayWX">
        <div class="ContentWrap">
            <div class="contentdetail">
                <div class="minshenglogo"></div>
                <div class="contentright">
                    <div class="smk" id="qrcode">
                        <vb-jrcode :option="option"></vb-jrcode>
                    </div>
                    <div class="zfxx">
                        <div class="ddbh">
                            <div class="xxtb">订单编号:</div>
                            <div class="xxnr">
                                <p>{{ orderId }}</p>
                            </div>
                        </div>
                        <div class="ddbh">
                            <div class="xxtb">商品名称:</div>
                            <div class="xxnr">
                                <p>{{ getTitle(paymentGoodsmemo.title) }}</p>
                            </div>
                        </div>
                        <div class="ddbh">
                            <div class="xxtb">用&nbsp;&nbsp;&nbsp;&nbsp;户:</div>
                            <div class="xxnr">
                                <p>{{ orderUserName }}</p>
                            </div>
                        </div>
                        <div class="ddbh">
                            <div class="xxtb">金&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额:</div>
                            <div class="xxnr">
                                <p>￥{{ traderecordAmount / 100 }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="{ errorTip }">
            <div class="py_zz"></div>
            <div data-v-3c71cdd2 class="mk_tipbox" style="margin-left: -191px; margin-top: -122px; width: 382px; height: 245px">
                <div data-v-3c71cdd2 class="mkp_top">
                    <div data-v-3c71cdd2 class="mkp_tit">提示</div>
                    <div data-v-3c71cdd2 class="mkp_con">
                        <p data-v-3c71cdd2 style="text-align: center">业务访问失败:{{ errorMsg }}</p>
                    </div>
                </div>
                <div data-v-3c71cdd2 class="mkp_bm" ref="mkp_bm">
                    <span data-v-3c71cdd2 class="btn mkp_cancel" style="display: none">取消</span>
                    <span data-v-3c71cdd2 class="btn mkp_confirm" @click="errorTip = true">确定</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@/api/uc/api.PC0000.query-cashier-info';
import '@/api/uc/api.PC0013.query-pay-status';
import vbJrcode from '@/www/components/uc/manager/order/vbJrcode';
export default {
    name: 'orderPayWX',
    components: {
        vbJrcode,
    },
    layout: 'payLayout',
    data() {
        return {
            errorMsg: '',
            isLogined: false,
            qrCode: '',
            orderId: '',
            traderecordAmount: '',
            platformCode: '',
            traderecordOrdertradeno: '',
            interval: null,
            orderUserName: '',
            paymentGoodsmemo: {},
            // 隐藏接口访问错误提示
            errorTip: true,
            tradeclientCode: '',
            showContent: false,
            option: {
                width: 214,
                hegiht: 214,
                text: '',
            },
            startTime: new Date().getTime(),
        };
    },
    mounted() {
        this.traderecordId = this.$route.params.traderecordId;
        var qrCode = /code=(.*)/.exec(location.search)[1];
        this.qrCode = decodeURIComponent(qrCode);
        // 3.根据交易记录标识,获取收银台交易信息
        this.$niceloo.api.call('uc/query-cashier-info', {
            traderecordId: this.traderecordId,
            onsuccess: (data) => {
                this.traderecordOrdertradeno = data.traderecordOrdertradeno;
                this.orderId = data.orderId;
                this.traderecordAmount = data.traderecordAmount;
                this.platformCode = data.platformCode;
                this.orderUserName = data.orderUserName;
                this.paymentGoodsmemo = data.paymentGoodsmemo;
                this.tradeclientCode = data.tradeclientCode;
                // 轮询, 查看是否支付成功;
                this.getPayStatus();
            },
            onerror: this.$niceloo.api.handleFailure,
            oncomplete: () => {},
        });
        this.option.text = encodeURI(this.qrCode);
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    methods: {
        getTitle(title) {
            let s = title || '';
            if (s.length > 56) {
                return s.substring(0, 56) + '...';
            }
            return s;
        },
        getPayStatus() {
            // 轮询, 查看是否支付成功;
            this.interval = setInterval(() => {
                // 10分钟自动关闭
                if (new Date().getTime() - this.startTime > 10 * 60 * 1000) {
                    clearInterval(this.interval);
                }
                this.$niceloo.api.call('uc/query-pay-status', {
                    platformCode: this.platformCode,
                    traderecordOrdertradeno: this.traderecordOrdertradeno,
                    onsuccess: (data) => {
                        // 支付成功,当前页面关闭,收银台页面自动跳转
                        if (data.result == 'SUCCESS') {
                            window.close();
                        }
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            }, 2000);
        },
    },
};
</script>
<style lang="less" scoped>
.orderPayWX {
    background: #fff;

    .ContentWrap {
        width: 100%;
        overflow: hidden;
        background: #eeeeee;
        padding: 30px 0;
    }
    .contentdetail {
        width: 1200px;
        margin: 0 auto;
        background: url('./asset/images/minshengbg.png') no-repeat;
        background-size: auto 100%;
        background-position: right top;
        height: 780px;
        background-color: #fff;
        position: relative;
        .minshenglogo {
            position: absolute;
            left: 80px;
            top: 74px;
            height: 50px;
            width: 50%;
            background: url('./asset/images/minshenglogo.png') no-repeat 0 0;
            background-size: auto 100%;
        }
    }
    .contentright {
        width: 334px;
        background: #fff;
        position: absolute;
        left: 80px;
        top: 198px;
    }
    .smtop {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 24px;
        letter-spacing: 1px;
        margin-bottom: 15px;
        float: left;
    }
    .smtop img {
        float: left;
        margin-right: 10px;
    }

    .smk {
        width: 214px;
        height: 214px;
        background: #fff;
        box-shadow: 0px 3px 20px 4px rgba(11, 42, 113, 0.06);
        padding: 30px;
        margin-bottom: 15px;
    }
    .zfxx {
        margin-top: 40px;
        width: 100%;
    }
    .ddbh {
        font-size: 16px;
        line-height: 22px;
        margin-bottom: 20px;
        display: flex;
    }
    .xxtb {
        width: 80px;
        letter-spacing: 1px;
        color: #666;
        line-height: 20px;
    }
    .xxnr {
        padding-left: 5px;
        color: #333;
        width: 235px;
        word-break: break-all;
    }
    .xxnr span {
        color: #b60000;
        font-size: 16px;
        font-weight: bold;
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

    .errorTip {
        display: none;
        .mk_tipbox[data-v-3c71cdd2] {
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 3001;
            text-align: center;
            background: #ffffff;
            box-shadow: 3px 7px 27px 0px rgba(128, 128, 128, 0.33);
            border-radius: 4px;
        }
    }
}
</style>
