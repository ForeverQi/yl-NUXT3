<template>
    <div>
        <payment-tips :close-show="true" />
        <div class="nod_con">
            <!-- 班级信息 -->
            <class-detail
                :order-number="orderNo"
                :class-list="classList"
                :order-detail="paidDetails"
                @open-arguments="argumentsOpen"
                @remove-class="removeClass"
            />
            <!-- 收件信息 -->
            <consignee-detail
                :post-status="postStatus"
                :user-address="userAddress"
                :order-detail="paidDetails"
                @chose-address="choseAddress"
                @add-address="addAddress"
            />

            <div class="coupon-title">
                <span>使用优惠券/码</span>
            </div>

            <div class="nod_order">
                <div class="nod_lf">
                    <div id="UseConpon" v-show="!couponBinded" v-if="!orderNo">
                        <div class="nyhq_tt" :class="{ zk: useCoupon }" @click="useCoupon = !useCoupon">
                            <i></i>
                            输入优惠码
                        </div>
                        <div class="nyhq_con" :class="{ show: useCoupon }">
                            <div class="nyhq_box">
                                <input type="text" class="nyhq_inp" id="textYouHuiMa" maxlength="20" v-model="couponCode" />
                                <input type="button" class="nyhq_btn" id="bondUse" @click="bindOrderCoupon()" value="立即使用" />
                            </div>
                            <div class="nyhq_tip">
                                <span>注：</span>
                                <div class="nyhq_p">
                                    <p>优惠码只能使用于线上支付部分，且促销活动和优惠码不能同时使用。</p>
                                    <p>每个订单仅能使用一张优惠码，一旦提交订单，优惠码与该订单绑定，不可解绑。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="NoUseConpon" v-show="couponBinded && couponList.length === 0">
                        <div class="nyhq_ysy">已使用优惠码</div>
                    </div>

                    <div class="coupon-wrapper" v-if="!couponBinded && couponList.length > 0 && orderNo">
                        <div class="title">
                            <span>
                                已选中优惠券
                                <label>{{ couponList.length }}</label>
                                张，可抵用
                                <label>¥&nbsp;{{ (paidDetails.orderDiscountamount || orderDiscountamount) | veMoneyCent }}</label>
                            </span>
                        </div>
                        <div class="wrapper">
                            <div class="com-wrap">
                                <CouponItemCombinationView
                                    v-for="(item, index) in combinationList"
                                    :key="index"
                                    :coupon-detail="item"
                                    :is-show-operation="false"
                                    :is-order-show="true"
                                    ref="CouponItemViewItem1"
                                    @change-explain="changeExplain"
                                />
                            </div>
                            <CouponItemViewItem
                                ref="CouponItemViewItem2"
                                v-for="(item, index) in ordinaryList"
                                :key="index"
                                :coupon-detail="item"
                                :is-show-operation="false"
                                :is-order-show="true"
                                @change-explain="changeExplain"
                            />
                        </div>
                    </div>
                </div>
                <div class="nod_rt" :style="{ 'margin-top': couponList.length > 0 && orderNo ? '30px' : 0 }">
                    <div style="overflow: hidden">
                        <div class="nod_pribox">
                            <p class="nodp_p">
                                <span class="nod_sp1">已选班级：</span>
                                <span class="nod_pri1 black">{{ orderNo ? paidDetails.orderItems && paidDetails.orderItems.length : classList.length }}个</span>
                            </p>
                            <p class="nodp_p">
                                <span class="nod_sp1">总金额：</span>
                                <span class="nod_pri1 black">¥&nbsp;{{ (paidDetails.orderTotalamount || orderMoney) | veMoneyCent }}</span>
                            </p>

                            <p class="nodp_p">
                                <span class="nod_sp1">优惠金额：</span>
                                <span class="nod_pri1" id="fanxian">
                                    {{ (paidDetails.orderDiscountamount || orderDiscountamount) > 0 ? '- ' : '' }}¥&nbsp;{{
                                        (paidDetails.orderDiscountamount || orderDiscountamount) | veMoneyCent
                                    }}
                                </span>
                            </p>
                            <p class="nodp_p" v-if="paidDetails.orderSubtype == 'CHA' || paidDetails.orderSubtype == 'TRA'">
                                <span class="nod_sp1">转入金额：</span>
                                <span class="nod_pri1" id="fanxian">¥&nbsp;{{ paidDetails.coIntoamount | veMoneyCent }}</span>
                            </p>
                            <p class="nodp_p" v-if="paidDetails.orderPaystatus == 'P'">
                                <span class="nod_sp1">已付定金：</span>
                                <span class="nod_pri1" id="fanxian">¥&nbsp;{{ paidDetails.orderPayamount | veMoneyCent }}</span>
                            </p>

                            <p class="nodp_p" v-if="paidDetails.orderPaystatus == 'P'">
                                <span class="nod_sp2">待支付金额：</span>
                                <span class="nod_pri2" data-class="orderpaymoney">¥&nbsp;{{ paidDetails.remainPayamount | veMoneyCent }}</span>
                            </p>
                            <p class="nodp_p" v-else>
                                <span class="nod_sp2">实付金额：</span>
                                <span class="nod_pri2" data-class="orderpaymoney">
                                    ¥&nbsp;{{ (paidDetails.remainPayamount || orderMoney - orderDiscountamount) | veMoneyCent }}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="nod_table" v-show="hasAgreement">
                        <table>
                            <tr>
                                <td width="250px">
                                    <p class="label" :class="{ check: agreed }" @click="readedProtocol()">
                                        <i></i>
                                        我已阅读并同意全部班级
                                    </p>
                                </td>
                                <td width="100">
                                    <a>产品购买协议</a>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="nod_btnbox">
                        <input type="button" :value="orderNo ? '立即支付' : '提交订单'" class="nod_submit" :class="{ red: agreed }" @click="orderApply()" />
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>

        <!-- 优惠码提示 -->
        <div class="hideTip" :class="{ showTip }">
            <div class="nxy_zz">
                <div class="py_tipBox">
                    <div class="pytp_cloBox"></div>
                    <div class="pytp_con">
                        <p class="pytp_tit" ref="tipTitle"></p>
                        <p class="pytp_cc" ref="tipContent"></p>
                        <p class="pytp_bb" ref="pytp_bb">
                            <span class="pytp_confirm" @click="showTip = false">确定</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加收货地址弹框 -->
        <edit-address ref="editAddress" @saveAddress="saveAddress" @editAddress="editAddress" />

        <agreement-purchase
            :show="isShow"
            :is-show-footer="showFooter"
            :deal-lists="dealList"
            ref="agreementPurchase"
            :download-show="false"
            @confirm-fn="confirmFn"
            @close-fn="closeFn"
        />
        <logoutAuditTips />
        <vb-mask :show="zhutiWindow">
            <div class="zhutilog-wrap">
                <div class="zhuti-close" @click="zhutiWindow = false">
                    <img src="./asset/images/close_circular.png" alt="" />
                </div>
                <div class="warning-img">
                    <img src="./asset/images/warning.png" alt="" />
                </div>
                <p class="zhuti-title">该课程暂时无法加入购物车</p>
                <p class="zhuti-content">您的购物车太丰富了，您可以先清空购物车，然后再购买本课程哦~</p>
                <div class="zhuti-submit" @click="zhutiWindow = false">朕知道了</div>
            </div>
        </vb-mask>
        <pop-up :show="isShowPop" :title="popUpTitle" :des="popUpDes" @close="closePopUp" @confirmFn="confirmPopUp" />
    </div>
</template>

<script>
import ClassDetail from './components/class-detail.vue';
import ConsigneeDetail from './components/consignee-detail.vue';
import index from './js/index.js';
import editAddress from '@/www/components/personalCenter/editAddress/edit-address';
import agreementPurchase from '@/www/components/uc/manager/order/agreementPurchase'; //购买协议
import logoutAuditTips from '@/www/components/uc/manager/logout/logoutAuditTips';
import vbMask from '@/www/components/vbMask';
import PopUp from '@/www/components/uc/manager/order/popUp';
import track from '@/www/components/course/free-course/js/track.js';
import CouponItemViewItem from '@/www/components/userCenter/coupon/coupon-item-view/index.vue';
import CouponItemCombinationView from '@/www/components/userCenter/coupon/coupon-item-combination-view/index.vue';

import '@/api/uc/api.BD3205.query-classids-list';
import '@/api/uc/api.BD1002.bd-recvaddr-add';
import '@/api/uc/api.BD1003.bd-recvaddr-edit';
import '@/api/uc/api.BD1005.bd-recvaddr-list';
import '@/api/uc/api.OC2002.query-order-detail';
import '@/api/uc/api.OC2008.update-address';
import '@/api/uc/api.OC2006.create-payment-address';
import '@/api/uc/api.OC2007.apply-pay-order';
import '@/api/uc/api.OC2023.verify-order-coupon';
import '@/api/etc/api..query-readingAgr-find-man-reading';
import '@/api/mp/api..query-order-used-coupon-list.js';

export default {
    name: 'checkOrder',
    components: { editAddress, agreementPurchase, logoutAuditTips, vbMask, PopUp, ClassDetail, ConsigneeDetail, CouponItemViewItem, CouponItemCombinationView },
    mixins: [track],
    layout: 'ucLayout',
    data() {
        return {
            zhutiWindow: false,
            // 接口请求中
            isLoadData: false,
            // 订单来源标识
            orderSourceid: '',
            // 客户端类型
            // [枚举]A:Android;I:IOS,P:PC网站;C:PC客户端;W:wap;H:H5;S:小程序
            clientType: 'P',

            // 是否使用优惠码
            useCoupon: true,
            // 优惠码绑定状态
            couponBinded: false,
            // 优惠码号
            couponCode: '',
            // 显示提示信息弹框
            showTip: false,
            // 是否同意购买协议
            agreed: false,
            // 用户收货地址列表
            userAddress: [],

            // 取消订单弹框
            showCancelOrderPopup: false,
            // 班级协议详情
            showClassProtocol: false,
            classId: null,
            orderId: null,
            // 产品购买协议弹框
            showProtocolPopup: false,
            protocolContent: '',
            protocolTemplateUrl: '',
            // fail message
            errorTip: true,
            errorMsg: '',

            classList: [], //班级列表
            postStatus: false, //是否展示地址信息
            orderPayMoney: 0, //实付金额

            orderNo: '', //订单号
            paidDetails: { orderAddress: {} }, //订单信息 由订单号的就有订单信息
            hasAgreement: false, //是否有协议
            Config: this.$nuxt.context.env.config,
            isShow: false, //是否显示强制阅读协议
            isShowPop: false,
            popUpTitle: '哦欧～结算失败了！',
            popUpDes: '您的购物车中存在不同项目的班级，每次只能结算同一项目的班级哦～',
            dealList: [],
            showFooter: false,
            couponList: [], // 优惠券列表
        };
    },
    computed: {
        /**
         * 组合券列表
         *
         * @returns {Array} 组合券列表
         */
        combinationList() {
            return this.couponList.filter((r) => {
                return r.couponType === 'G';
            });
        },
        /**
         * 普通券列表
         *
         * @returns {Array} 普通券列表
         */
        ordinaryList() {
            return this.couponList.filter((r) => {
                return r.couponType !== 'G';
            });
        },
        orderMoney() {
            //合计金额
            let num = 0;
            this.classList.forEach((val) => {
                num += val.classStdprice;
            });
            return num;
        },
        orderDiscountamount() {
            //计算优惠金额
            let num = 0;
            this.classList.forEach((val) => {
                if (val.hasDiscount && val.classPrice) {
                    //有折扣价按折扣价展示
                    num += val.classStdprice - val.classPrice;
                }
            });
            return num;
        },
        classSalestatus() {
            //订单中有一个是售卖类型就可以使用优惠券
            let status = false;
            if (this.classList.length > 0) {
                for (let i = 0; i < this.classList.length; i++) {
                    if (this.classList[i].classSalestatus == 'Y') {
                        status = true;
                        break;
                    }
                }
            }
            return status;
        },
    },
    watch: {
        hasAgreement: {
            //没有需要签订的
            immediate: true,
            handler() {
                if (!this.hasAgreement) {
                    this.agreed = true;
                } else {
                    this.agreed = false;
                }
            },
        },
    },
    mounted() {
        //从未付款订单列表跳过来的有订单号
        this.orderNo = this.$route.query.orderId;

        if (this.orderNo) {
            //有订单的查下订单信息
            this.getOrderPaidDetails();
        } else {
            this.listClassids();
        }
    },
    methods: {
        //获取订单详情信息
        getOrderPaidDetails() {
            this.postStatus = false;
            this.$niceloo.api.call('uc/query-order-detail', {
                orderNo: this.orderNo, //订单编号
                onsuccess: (data) => {
                    this.paidDetails = data || {};
                    this.paidDetails.orderAddress = this.paidDetails.orderAddress || {};
                    if (this.paidDetails.orderAddress.oaName) {
                        this.paidDetails.orderAddress = {
                            ...this.paidDetails.orderAddress,
                            recvaddrName: this.paidDetails.orderAddress.oaName,
                            recvaddrPhone: this.paidDetails.orderAddress.oaPhone,
                            recvaddrAddress: this.paidDetails.orderAddress.oaAddress,
                            recvaddrRegion: this.paidDetails.orderAddress.oaDistrict,
                            recvaddrCity: this.paidDetails.orderAddress.oaCity,
                            recvaddrProvince: this.paidDetails.orderAddress.oaProvince,
                        };
                        this.$set(this.paidDetails.orderAddress, 'active', true);
                    }
                    if (this.paidDetails.orderAddressneedcompletestatus == 'Y') {
                        this.postStatus = true;
                    }
                    if (this.paidDetails.allPromotionPrice > 0) {
                        //促销金额大于0 展示已使用优惠码字段
                        this.couponBinded = true;
                    }
                    let midArr = [];
                    let userCouponIds = [];
                    this.paidDetails.orderItems.forEach((val) => {
                        if (val.specs && val.specs.length > 0) {
                            if (val.orderitemStatus != 'CHAD') {
                                //剔除转出班级
                                midArr.push(val);
                                userCouponIds = userCouponIds.concat(val.coupons);
                            }
                        }
                        //只要一个班级有协议，就有协议
                        if (
                            this.paidDetails.orderSubtype != 'REP' &&
                            val.orderitemService.orderitemAgreementtype == 'E' &&
                            val.orderitemService.orderitemServicetype != 'B'
                        ) {
                            this.hasAgreement = true;
                        }
                    });
                    this.paidDetails.orderItems = midArr;
                    if (userCouponIds.length > 0) {
                        this.queryOrderUsedCouponList(userCouponIds);
                    }

                    this.judgeDeal(this.paidDetails.orderItems);
                    if (this.postStatus) {
                        this.getUserAddress();
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //选择地址
        choseAddress(item) {
            this.paidDetails.orderAddress.active = false;
            this.userAddress.forEach((val) => {
                val.active = false;
            });
            item.active = true;
        },

        //购买协议
        argumentsOpen(item) {
            this.isShow = true;
            this.dealList.push(item);
            this.$refs.agreementPurchase.open(item);
        },
        ...index,
    },
};
</script>

<style lang="less" scoped>
table {
    border-collapse: collapse;
    border-spacing: 0;
}
table,
tbody,
thead,
th,
td {
    border: 0;
    font-weight: normal;
}
.zhutilog-wrap {
    width: 400px;
    height: 292px;
    background: #fff;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .warning-img {
        margin: 40px auto 14px;
    }
    .zhuti-close {
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
    }
    .zhuti-title {
        font-size: 18px;
        font-weight: bold;
        color: #3a3d4b;
    }
    .zhuti-content {
        width: 300px;
        font-size: 14px;
        margin-top: 14px;
        color: #53586c;
        line-height: 24px;
        text-align: center;
    }
    .zhuti-submit {
        width: 140px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #fff;
        margin-top: 30px;
        cursor: pointer;
        background: linear-gradient(90deg, #ff6870, #f8323c);
    }
}
#NoUseConpon {
    padding: 30px 50px;
}

.red {
    color: #f8323c;
}

@import url('./css/index.less');
</style>
