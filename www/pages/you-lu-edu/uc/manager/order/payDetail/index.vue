<template>
    <div class="payDetail">
        <div class="py_ordercont">
            <div class="py_odcrm">
                <div class="pyod_rt">
                    <div class="pyodrt_jj">
                        <p>
                            <span class="pyjj_tt">
                                <img src="./asset/images/01.svg" />
                                订单提交成功，去付款喽～
                            </span>
                            <span class="pyjj_tot">
                                实付金额：
                                <span id="lblPayMoney" class="pyjj_pri">¥{{ traderecordAmount / 100 }}</span>
                            </span>
                        </p>
                        <p style="height: 40px">
                            <span class="pyjj_ddxq" :class="toggleDetail ? 'active' : ''" @click="toggleDetail = !toggleDetail">订单详情</span>
                        </p>
                    </div>
                    <div class="pyodrt_xq" :class="toggleDetail ? 'show' : 'hide'">
                        <div class="pyxq_item" style="overflow: hidden">
                            <div style="float: left">
                                <span class="pyxq_tt">订单号：</span>
                                <span class="red pyxq_td paddr40" id="lblOrderId">{{ orderId }}</span>
                                <span class="pyxq_tt paddl40">商品名称:</span>
                            </div>
                            <span class="pyxq_td" style="float: left; width: 50%; line-height: 22px; padding: 7px 3px" v-html="paymentGoodsmemo.title"></span>
                        </div>
                        <div class="pyxq_item" v-show="paymentGoodsmemo.detail">
                            <span class="pyxq_tt">商品描述：</span>
                            <p>{{ paymentGoodsmemo.detail }}&nbsp;&nbsp;</p>
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
            <div class="py_way">
                <p class="pywa_tit">请选择以下支付方式付款</p>
                <paymentTips :padding="'0 43px'"></paymentTips>
                <div class="pywa_fs">
                    <ul class="pyfs_tit">
                        <li :class="payway == 0 ? 'active' : ''" @click="(payway = 0), (paymodeMethod = payModes.noStages[0])" v-if="payModes.noStages.length">
                            <span class="outcircle"><span class="incircle"></span></span>
                            在线支付
                        </li>
                        <li
                            v-if="payModes.stages.length"
                            :class="payway == 1 ? 'active' : ''"
                            @click="(payway = 1), (paymodeMethod = payModes.stages[0]), (stagePlan = paymodeMethod.paymodeStagetemplate[0])"
                        >
                            <span class="outcircle"><span class="incircle"></span></span>
                            分期支付
                        </li>
                        <li v-if="type !== 'selfLearn'" :class="payway == 2 ? 'active' : ''" @click="payway = 2">
                            <span class="outcircle"><span class="incircle"></span></span>
                            银行邮局汇款
                        </li>
                    </ul>
                    <!--1.在线支付-->
                    <div class="pyfs_con" v-if="payway == 0">
                        <div v-for="paymode in payModes.noStages" :key="paymode.paymodeCode">
                            <div class="pyfs_zffs" :class="{ active: paymodeMethod.paymodeCode == paymode.paymodeCode }" @click="paymodeMethod = paymode">
                                <img :src="$nuxt.$niceloo.path.getServerFileViewPath(paymode.paymodeIconpath)" style="height: 35px; vertical-align: middle" />
                            </div>
                        </div>
                        <input name="txt_wxclient" type="hidden" id="txt_wxclient" value="N" />
                        <div class="clear"></div>
                    </div>
                    <!--2.分期支付-->
                    <div class="pyfs_con" v-if="payway == 1">
                        <ul class="pyfs_stages">
                            <li
                                :class="paymodeMethod.paymodeCode == k.paymodeCode ? 'active' : ''"
                                v-for="(k, i) in payModes.stages"
                                :key="i"
                                @click="(paymodeMethod = k), (stagePlan = paymodeMethod.paymodeStagetemplate[0])"
                            >
                                <img
                                    :src="$nuxt.$niceloo.path.getServerFileViewPath(k.paymodeIconpath)"
                                    alt=""
                                    style="height: 35px; width: auto; max-width: 178px"
                                />
                            </li>
                        </ul>
                        <div class="pyfs_stages_tt">请选择分期</div>
                        <ul class="pyfs_stages_num">
                            <li
                                v-for="(template, index) in paymodeMethod.paymodeStagetemplate"
                                :key="index"
                                :class="stagePlan.stageName == template.stageName ? 'active' : ''"
                                @click="stagePlan = template"
                            >
                                <span class="num">{{ template.stageName }}</span>
                                <span class="repay">每期￥{{ template.stageAmount / 100 }}X{{ template.stageNum }}期</span>
                                <span class="charge" :class="template.stagePercentRule == '1' ? 'none' : ''">手续费：￥{{ template.StageFee / 100 }}/期</span>
                                <span class="free_tag" v-show="template.stagePercentRule == 0">商家补贴手续费</span>
                            </li>
                        </ul>

                        <input name="txt_wxclient" type="hidden" id="txt_wxclient" value="N" />
                        <div class="clear"></div>
                    </div>
                    <!--3.银行邮局汇款-->
                    <div class="pyfs_con" v-if="payway == 2">
                        <div class="remit">
                            <span>开户行：</span>
                            中国工商银行股份有限公司中关村南路支行
                        </div>
                        <div class="remit">
                            <span>户 名：</span>
                            北京环球优路教育科技股份有限公司
                        </div>
                        <div class="remit">
                            <span>帐 号：</span>
                            0200254519200067516
                        </div>
                        <div class="confirm">汇款后请将汇款凭证传真至010-68937352确认！</div>
                    </div>

                    <!-- <input
                                v-show="payway==2"
                                type="button"
                                class="pyfs_sjbtn"
                                value="点击发送至手机"
                                @click.stop="handlePay"
                            /> -->
                    <input v-show="payway != 2" type="button" class="pyfs_ljbtn" value="立即支付" @click.stop="handlePay" />
                    <div class="clear"></div>
                </div>
            </div>
        </div>
        <div class="payTip" :class="{ hide }">
            <div class="py_zz"></div>
            <div class="py_tipBox">
                <div class="pytp_cloBox"></div>
                <div class="pytp_con">
                    <p class="pytp_tit">支付结果确认！</p>
                    <p class="pytp_cc">
                        <span v-if="isShowPayFinishTip">请在新打开的页面中完成支付,</span>
                        <br v-if="isShowPayFinishTip" />
                        支付完成后，请根据支付结果点击下方按钮
                    </p>
                    <p class="pytp_bb">
                        <span class="pytp_confirm" @click="paySuccess">支付成功</span>
                        <span class="pytp_cancel" @click="payFail">支付遇到问题</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="redirect" ref="redirect"></div>
        <div :class="{ errorTip: errorTip }">
            <div class="py_zz"></div>
            <div class="mk_tipbox">
                <div class="mkp_top">
                    <div class="mkp_tit">提示</div>
                    <div class="mkp_con">
                        <p style="text-align: center">{{ errorMsg }}</p>
                    </div>
                </div>
                <div class="mkp_bm" ref="mkp_bm">
                    <span class="btn mkp_cancel" style="display: none">取消</span>
                    <span class="btn mkp_confirm" @click="errorTip = true">确定</span>
                </div>
            </div>
        </div>
        <order-pay-wx :show.sync="isShowWXPay" :trade-pay="tradePay" @close="handlepayWxClose"></order-pay-wx>
    </div>
</template>

<script>
import '@/api/uc/api.PC0010.get-cashier-info.js';
import '@/api/uc/api.PC0002.query-pay-method';
import '@/api/uc/api.PC0003.initiate-pay';
import '@/api/uc/api.PC0013.query-pay-status';
import orderPayWx from '@/www/components/uc/manager/order/orderPayWX';

export default {
    name: 'payDetail',
    components: {
        orderPayWx,
    },
    layout: 'payLayout',
    data() {
        return {
            isLogined: false,
            //支付方式:noStage不分期(在线支付),stage:分期
            payModes: { noStages: [], stages: [] },
            //选择的支付方法(在线/分期下的第一种支付方式)
            paymodeMethod: {},
            // 分期下的某种分期方案
            stagePlan: {},
            // 交易凭证
            traderecordId: '',
            // 订单唯一交易号
            traderecordOrdertradeno: '',
            // 支付单对应订单号
            orderId: '',
            // 支付单商品信息
            paymentGoodsmemo: {},
            // 交易支付金额
            traderecordAmount: '',
            // 平台编码
            platformCode: '',
            // 支付接入端编码
            tradeclientCode: '',
            // 隐藏支付结果提示
            hide: true,
            // 隐藏接口访问错误提示
            errorTip: true,
            errorMsg: '',
            // 轮询事件标识
            interval: null,
            // 订单支付状态,UNPAID/SUCCESS
            payResult: 'UNPAID',
            // 用户支付成功后的跳转地址
            paySuccessUrl: '',
            // 订单详情展开/缩放
            toggleDetail: true,
            // 分期标记,默认不分期
            traderecordStagetype: '0',
            startTime: new Date().getTime(),
            loadingFlag: null,
            isLoadData: false,
            payway: 2, //支付方式
            isShowWXPay: false,
            tradePay: {},
            isShowPayFinishTip: true,
            type: '', // 如果type 111是url上携带的参数，如果为selfLearn（自助续学）隐藏线上转账
        };
    },

    mounted() {
        // 页面进入3秒后,如果没有数据则出现加载动画
        this.loadingFlag = setTimeout(() => {
            // this.$baseUI.loading();
        }, 3000);
        this.type = this.$route.query.type;
        this.traderecordId = this.$route.params.traderecordId;
        this.$niceloo.api.call('pc/get-cashier-info', {
            traderecordId: this.traderecordId,
            ...this.getSignAndR(),
            onsuccess: (data) => {
                this.traderecordOrdertradeno = data.traderecordOrdertradeno;
                this.orderId = data.orderId;
                this.paymentGoodsmemo = data.paymentGoodsmemo;
                if (this.paymentGoodsmemo.title) {
                    this.paymentGoodsmemo.title = this.paymentGoodsmemo.title.replace(/;/g, ';</br>');
                }
                this.traderecordAmount = data.traderecordAmount;
                this.platformCode = data.platformCode;
                this.tradeclientCode = data.tradeclientCode;
                this.traderecordStagetype = data.traderecordStagetype;
                // 不分期支付方式列表
                this.getPayMethods('0');
                // 分期支付方式列表
                if (this.traderecordStagetype == '1') {
                    this.getPayMethods('1');
                }
                // 获取用户配置的支付成功跳转页面
                this.paySuccessUrl = data.traderecordFronturl;
            },
            onerror: this.$niceloo.api.handleFailure,
        });
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    methods: {
        createRandomCode() {
            // return User.getUser().userLoginname + "" + new Date().getTime();
            return new Date().getTime();
        },
        // 获取支付方式列表
        // traderecordStagetype="0",不需要分期
        // traderecordStagetype="1",需要分期
        getPayMethods(traderecordStagetype = '0') {
            var params = {
                tradeclientCode: this.tradeclientCode,
                payScene: 'PC',
                traderecordId: this.traderecordId,
            };
            // 需要分期
            if (traderecordStagetype) {
                params = { ...params, paymodeType: traderecordStagetype };
            }
            this.$niceloo.api.call('uc/query-pay-method', {
                ...params,
                onsuccess: (result) => {
                    result = result.data;
                    result.sort((f, s) => {
                        return f.paymodeSeq - s.paymodeSeq;
                    });
                    for (var i = 0; i < result.length; i++) {
                        if (traderecordStagetype == '0') {
                            // 不分期
                            this.payModes.noStages.push(result[i]);
                        } else if (traderecordStagetype == '1') {
                            // 分期
                            this.payModes.stages.push(result[i]);
                        }
                    }
                    // 默认选中某种支付方式下的第一个支付方法(如果是分期,默认选中第一个分期方案)
                    this.payway = 2;
                    this.paymodeMethod = {};
                    if (this.payModes.stages[0]) {
                        this.payway = 1;
                        // 分期支付有数据-->分期支付
                        this.paymodeMethod = this.payModes.stages[0];
                        // 分期方案有数据-->第一个分期方案
                        this.stagePlan = this.payModes.stages[0].paymodeStagetemplate[0];
                    }
                    if (this.payModes.noStages[0]) {
                        //在线支付有数据-->在线支付
                        this.payway = 0;
                        // 在线支付-->第一个支付方法
                        this.paymodeMethod = this.payModes.noStages[0];
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //当前订单是否已经成功支付过了
        isPayedSuccess() {
            this.$niceloo.api.call('uc/query-pay-status', {
                platformCode: this.platformCode,
                traderecordOrdertradeno: this.traderecordOrdertradeno,
                onsuccess: (data) => {
                    this.payResult = data.result;
                    // 如果用户已经支付成功了,自动跳转
                    if (this.payResult == 'SUCCESS') {
                        if (this.paySuccessUrl) {
                            // 用户配置了跳转页面
                            let url =
                                this.paySuccessUrl.indexOf('uc/order') >= 0 ? this.paySuccessUrl.replace('uc/order', 'uc/manager/order') : this.paySuccessUrl;
                            this.$PageUtil.href(url);
                        } else {
                            // 用户没有配置跳转页面
                            this.$router.push(`/uc/manager/order/paySuccess`);
                        }
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        // 4.发起支付
        handlePay() {
            if (this.isLoadData) {
                return;
            }
            var data = {
                traderecordId: this.traderecordId,
                paymodeCode: this.paymodeMethod.paymodeCode,
                sceneCode: 'PC',
                traderecordNonceno: this.createRandomCode(),
                openId: '',
            };
            if (this.paymodeMethod.paymodeCode != 'WX') {
                var blank = window.open('/uc/manager/order/payMiddle');
            }
            // 如果是分期支付,增加分期参数
            if (this.payway == 1) {
                data = {
                    ...data,
                    traderecordStagenum: this.stagePlan.stageNum,
                };
            }
            //如果是库分期
            if (this.paymodeMethod.paymodeCode == 'KFQ') {
                blank.location.href = `${this.$PageUtil.getOriginUrl()}/uc/manager/order/payKFQ/${this.traderecordId}?code=${data.paymodeCode}&Stagenum=${
                    data.traderecordStagenum
                }`; //?code=${data.bizContent}

                // 显示支付结果提示(支付成功/失败)
                this.hide = false;
                // 轮询,查看是否支付成功
                this.interval = setInterval(() => {
                    // 10分钟自动关闭A
                    if (new Date().getTime() - this.startTime > 10 * 60 * 1000) {
                        clearInterval(this.interval);
                    }
                    this.isPayedSuccess();
                }, 2000);
                return;
            }
            console.log(this.paymodeMethod, '@@@');
            this.$yiguan.track('youlu_wk_pay', {
                course_name: '-',
                class_name: this.paymentGoodsmemo.title,
                project_id: '-',
                subject_id: '-',
                course_type: '-',
                order_type: /^\d+/.test(this.orderId) ? '流量订单' : '正价课订单',
                payable_price: this.traderecordAmount / 100 + '',
                pay_type: this.paymodeMethod.paymodeName,
                page_type: '-',
                page_name: '-',
            });
            this.$niceloo.api.call('uc/initiate-pay', {
                ...data,
                onsuccess: (data) => {
                    //返回信息
                    if (data.bizType == 'F') {
                        //console.log(this.paymodeMethod.paymodeStagetemplate)
                        setTimeout(() => {
                            //火狐浏览器需要延时一下
                            blank.document.body.innerHTML = data.bizContent;
                            blank.document.forms[0].acceptCharset = 'utf-8';
                            blank.document.forms[0].submit();
                        }, 200);
                    } else if (data.bizType == 'Q') {
                        // 二维码地址
                        if (this.paymodeMethod.paymodeCode == 'WX') {
                            //微信
                            // blank.location.href = `/uc/manager/order/payWX/${this.traderecordId}?code=${data.bizContent}`;
                            this.isShowWXPay = true;
                            this.tradePay = {
                                traderecordId: this.traderecordId,
                                bizContent: data.bizContent,
                            };
                        } else {
                            //民生
                            blank.location.href = `/uc/manager/order/payMinsheng/${this.traderecordId}?code=${data.bizContent}`;
                        }
                    } else if (data.bizType == 'U') {
                        // 跳转URL发起支付
                        blank.location.href = data.bizContent;
                    } else if (data.bizType == 'D') {
                        blank.close();
                    } else if (data.bizType == 'R') {
                        blank.close();
                    }
                    // 显示支付结果提示(支付成功/失败)
                    this.hide = data.bizType === 'Q' && this.paymodeMethod.paymodeCode === 'WX';
                    this.isShowPayFinishTip = !this.hide;
                    // 轮询,查看是否支付成功
                    this.interval = setInterval(() => {
                        // 10分钟自动关闭
                        if (new Date().getTime() - this.startTime > 10 * 60 * 1000) {
                            clearInterval(this.interval);
                        }
                        this.isPayedSuccess();
                    }, 2000);
                },
                onerror: (fail) => {
                    this.isLoadData = false;
                    this.errorMsg = fail.getAttachedData().getMsg();
                    this.errorTip = true;
                    this.$baseUI.alert(this.errorMsg);
                    blank.close();
                },
                oncomplete: () => {},
            });
        },
        // 用户点击支付成功
        paySuccess() {
            if (this.payResult == 'SUCCESS') {
                if (this.paySuccessUrl) {
                    // 用户配置了跳转页面
                    console.log('用户配置了跳转地址', this.paySuccessUrl);
                    this.$PageUtil.href(this.paySuccessUrl);
                } else {
                    // 用户没有配置跳转页面
                    console.log('用户没有配置跳转页面');
                    this.$router.push(`/uc/manager/order/paySuccess`);
                }
            }
            this.hide = true;
            clearInterval(this.interval);
        },
        // 用户点击支付遇到问题
        payFail() {
            clearInterval(this.interval);
            this.hide = true;
        },
        getSignAndR() {
            let sign;
            let r;
            new URL(location.href).search
                .replace('?', '')
                .split('&')
                .forEach((item) => {
                    const iar = item.split('=');
                    const k = iar.shift();
                    if (k === 'sign') {
                        sign = iar.shift();
                    } else if (k === 'r') {
                        r = iar.shift();
                    }
                });
            return { sign, r };
        },
        handlepayWxClose() {
            this.hide = false;
            clearInterval(this.interval);
        },
    },
};
</script>

<style lang="less" scoped>
.payDetail {
    width: 1200px;
    margin: 0 auto;
    div {
        box-sizing: content-box;
    }

    a {
        text-decoration: none;
        color: #999;
    }

    body {
        background: #fff;
    }

    .clear {
        clear: both;
    }

    .red {
        color: #ff8a00;
    }

    .py_ordercont {
        padding: 30px 0 40px;
        background: #f4f4f4;
    }

    .py_odcrm {
        background: #fff;
        padding: 40px 40px 25px;
    }

    .pyod_lf {
        width: 80px;
        padding-right: 30px;
        float: left;
    }

    .pyodrt_jj {
        padding-bottom: 10px;
    }

    .pyodrt_jj p {
        position: relative;
        line-height: 40px;
        margin-bottom: 5px;
    }

    .pyodrt_jj p .pyjj_tt {
        color: #333333;
        font-size: 24px;

        img {
            width: 36px;
            height: 36px;
            position: relative;
            top: 8px;
            margin-right: 10px;
        }
    }

    .pyodrt_jj p .pyjj_tot {
        font-size: 14px;
        color: #666666;
        position: absolute;
        top: 0;
        right: 0;
    }

    .pyodrt_jj p .pyjj_tot .pyjj_pri {
        color: #e73928;
        font-size: 28px;
    }

    .pyodrt_jj p .pyjj_dd {
        color: #888888;
        font-size: 14px;
        margin-right: 20px;
    }

    .pyodrt_jj p .pyjj_ddxq {
        font-size: 16px;
        color: #333333;
        position: absolute;
        top: 0;
        right: 0;
        background: url('./asset/images/py_up.png') no-repeat right center;
        padding-right: 20px;
        cursor: pointer;
    }

    .pyodrt_jj p .pyjj_ddxq.active {
        background: url('./asset/images/py_dn.png') no-repeat right center;
    }

    .pyodrt_xq {
        padding: 25px 0 0;
        border-top: 1px solid rgba(0, 0, 0, 0.06);
    }

    .pyxq_item .pyxq_tt {
        /*width: 110px;*/
        font-size: 16px;
        color: #666666;
        line-height: 35px;
        /*float: left;*/
    }

    .pyxq_item .pyxq_td {
        font-size: 16px;
        color: #333333;
    }

    .paddr40 {
        padding-right: 40px;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
    }

    .paddl40 {
        padding-left: 40px;
    }

    .pyxq_item p {
        font-size: 14px;
        color: #444444;
        line-height: 35px;
        /*padding-left: 90px;*/
    }

    .pyxq_item .red {
        color: #e73928;
    }

    .py_way {
        background: #fff;
        /*padding: 0 42px 20px;*/
        margin-top: 14px;
    }

    .pywa_tit {
        line-height: 60px;
        font-size: 18px;
        color: #333333;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        padding: 0 43px;
    }

    .pywa_fs {
        /*padding-top: 10px;*/
        padding: 10px 42px 54px;
    }

    .pyfs_tit {
        display: inline-block;
        margin-top: 30px;
        margin-bottom: 20px;
        /*margin-left: 42px;*/

        li {
            float: left;
            margin-right: 50px;
            font-size: 16px;
            color: #666666;
            display: inline-block;
            cursor: pointer;

            .outcircle {
                display: inline-block;
                text-align: center;
                width: 16px;
                height: 16px;
                background: #cccccc;
                border-radius: 50%;
                position: relative;
                top: 3px;
                margin-right: 10px;

                .incircle {
                    position: relative;
                    top: -6px;
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #ffffff;
                }
            }
        }

        &:last-child {
            margin-right: 0;
        }

        .active {
            color: #e73928;

            .outcircle {
                background: #e73928;
            }
        }
    }

    .pyfs_con {
        position: relative;
        /*padding: 0 0 0 40px;*/
        display: block;
        width: 1016px;
        padding: 26px;
        padding-bottom: 6px;
        box-sizing: border-box;
        background: rgba(249, 249, 249, 1);
        border-radius: 4px;
    }

    /*在线支付*/

    .pyfs_con .pyfs_zffs {
        width: 200px;
        height: 56px;
        line-height: 56px;
        text-align: center;
        float: left;
        border-radius: 4px;
        border: 1px solid #dddddd;
        margin-right: 15px;
        /*padding-left: 30px;*/
        position: relative;
        cursor: pointer;
        background: #ffffff;
        /*background: url("./asset/images/uncheck.png") no-repeat 10px center;*/
        img {
            /*width: 140px;*/
            height: 35px;
            vertical-align: middle;
        }
    }

    .pyfs_con .pyfs_zffs.active {
        border: 1px solid #e73928;
        background: #ffffff url('./asset/images/03.svg') no-repeat right top;
        background-size: 29px 25px;
    }

    .pyfs_con .pyfs_zffs .payradio {
        position: absolute;
        filter: alpha(opacity=0);
        -moz-opacity: 0;
        -khtml-opacity: 0;
        opacity: 0;
    }

    /*分期支付*/

    .pyfs_stages {
        display: inline-block;

        li {
            width: 200px;
            height: 56px;
            line-height: 56px;
            text-align: center;
            float: left;
            border-radius: 4px;
            border: 1px solid #dddddd;
            margin-right: 15px;
            position: relative;
            cursor: pointer;
            background: #ffffff;
            /*background: url("./asset/images/uncheck.png") no-repeat 10px center;*/

            img {
                vertical-align: middle;
            }
        }

        .active {
            border: 1px solid #e73928;
            background: #ffffff url('./asset/images/03.svg') no-repeat right top;
            background-size: 29px 25px;
        }
    }

    .pyfs_stages_tt {
        font-size: 14px;
        color: #666666;
        margin-top: 30px;
        margin-bottom: 14px;
    }

    .pyfs_stages_num {
        li {
            width: 295px;
            height: 70px;
            background: rgba(255, 255, 255, 1);
            border-radius: 4px;
            border: 1px solid rgba(221, 221, 221, 1);
            float: left;
            margin-right: 20px;
            padding: 12px 8px;
            box-sizing: border-box;
            cursor: pointer;
            margin-bottom: 20px;

            .num {
                width: 44px;
                height: 44px;
                background: #f1f1f1;
                font-size: 16px;
                color: #333333;
                border-radius: 50%;
                display: inline-block;
                text-align: center;
                line-height: 44px;
                position: absolute;
            }

            .repay {
                display: block;
                font-size: 14px;
                color: #333333;
                margin-left: 54px;
            }

            .charge {
                font-size: 12px;
                color: #9f9f9f;
                margin-left: 54px;
                text-decoration: line-through;
            }
            .charge.none {
                text-decoration: none;
            }
            .free_tag {
                /*width: 52px;*/
                padding: 0 5px;
                height: 16px;
                font-size: 10px;
                line-height: 16px;
                color: #e73928;
                background: #ffece8;
                border-radius: 8px;
                text-align: center;
                display: inline-block;
            }
        }

        .active {
            border: 1px solid #e73928;
            background: #ffffff url('asset/images/03.svg') no-repeat right top;
            background-size: 29px 25px;

            .num {
                color: #e73928;
            }

            .repay {
                color: #e73928;
            }

            .free_tag {
                color: #ffffff;
                background: linear-gradient(90deg, rgba(231, 57, 40, 1) 0%, rgba(240, 121, 99, 1) 100%);
            }
        }
    }

    /*银行邮局汇款*/

    .remit {
        margin-bottom: 14px;
        font-size: 14px;
        color: #333333;

        span {
            width: 56px;
            display: inline-block;
            color: #666666;
            text-align: justify;
            text-align-last: justify;
        }
    }

    .confirm {
        font-size: 14px;
        color: #e73928;
        margin-top: 16px;
    }

    .pyfs_con p {
        line-height: 30px;
        font-size: 14px;
        color: #444444;
    }

    .pyfs_con p.pyfs_tip {
        color: #bbbbbb;
        font-size: 12px;
    }

    .pyfs_con p .pyfs_pri {
        font-size: 24px;
        color: #ff8a00;
    }

    .pyfs_con p .pyfs_click {
        color: #4385fe;
        text-decoration: underline;
    }

    .pyfs_ljbtn {
        width: 140px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        outline: none;
        background: linear-gradient(90deg, rgba(240, 121, 99, 1) 0%, rgba(231, 57, 40, 1) 100%);
        border-radius: 4px;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        cursor: pointer;
        margin-top: 90px;
        float: right;
        border: none;
    }

    .payTip {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
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

    .py_tipBox {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        background: #fff;
        border-radius: 10px;
    }

    .pytp_cloBox {
        text-align: right;
        line-height: 30px;
        padding: 10px;
    }

    .pytp_cloBox .pytp_close {
        color: #bdbdbd;
        font-size: 40px;
        cursor: pointer;
    }

    .pytp_con {
        padding: 10px 0 30px;
        text-align: center;
    }

    .pytp_tit {
        font-size: 30px;
        font-weight: bold;
        color: #bdbdbd;
        padding-bottom: 25px;
    }

    .pytp_cc {
        font-size: 16px;
        color: #444444;
        line-height: 30px;
        padding-bottom: 20px;
    }

    .pytp_bb {
        padding-top: 30px;
    }

    .pytp_bb .pytp_confirm {
        width: 160px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        background: #eb6100;
        color: #fff;
        font-size: 16px;
        display: inline-block;
        border-radius: 5px;
        cursor: pointer;
        margin: 0 25px;
    }

    .pytp_bb .pytp_cancel {
        width: 160px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        background: #bdbdbd;
        color: #fff;
        font-size: 16px;
        display: inline-block;
        border-radius: 5px;
        cursor: pointer;
        margin: 0 25px;
    }

    .mfnum {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
    }

    .hide {
        display: none;
    }

    .show {
        display: block;
    }

    .errorTip {
        display: none;

        .mk_tipbox {
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 3001;
            text-align: center;
            margin: -150px -250px;
            width: 382px;
            height: 245px;
            background: #ffffff;
            box-shadow: 3px 7px 27px 0px rgba(128, 128, 128, 0.33);
            border-radius: 4px;
        }
    }
}
</style>
