<template>
    <!-- 已付款 重读 订单详情 -->
    <div class="ucIndex">
        <div class="indexCont clearfix">
            <div class="navigationWrap">
                <!-- <vb-navigation action="我的订单"></vb-navigation> -->
            </div>
            <div class="contentWrap">
                <order-details-title :order-type-text="paidDetails.classOrderSubType === 'YAN' ? '延考续学' : '续学订单'" :paid-details="paidDetails" />
                <div class="detailsWrap">
                    <div class="lassLists">
                        <div v-for="item in paidDetails.orderItems" :key="item.a" class="listWrap">
                            <div class="classNames">
                                <div class="leftW">
                                    <div class="classImg">
                                        <img
                                            :src="item.orderitemPictureurl ? $urlUtils.getViewUrl(item.orderitemPictureurl) : defaultImg"
                                            onerror="this.src=Config.defaultImg"
                                            alt=""
                                        />
                                    </div>
                                    <div class="classCont">
                                        <div class="className">{{ item.skuName }}</div>
                                        <div class="classPrice">
                                            <span class="price">原价：¥{{ item.skuAmount | veMoneyCent }}</span>
                                            <span class="price">
                                                实付：
                                                <span class="red">¥{{ item.oiAmount | veMoneyCent }}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="showDetailsWrap"></div>

                                <div class="contRight">
                                    <div class="payAgreementW">
                                        <div class="payAgreementW">
                                            <span
                                                class="payAgreement"
                                                @click="argumentsOpen(item)"
                                                v-if="
                                                    item.orderitemService &&
                                                    paidDetails.orderAgreement.agreementNeedconfirmstatus === 'Y' &&
                                                    paidDetails.classOrderSubType === 'YAN' &&
                                                    paidDetails.orderSubtype === 'REP'
                                                "
                                                v-show="
                                                    item.orderitemService.orderitemAgreementtype == 'E' && item.orderitemService.orderitemServicetype != 'B'
                                                "
                                            >
                                                《延考续学补充协议》
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            class="payType"
                                            v-if="
                                                item.orderitemStatus == 'CHAD' ||
                                                item.orderitemStatus == 'TRAD' ||
                                                item.orderitemStatus == 'CREF' ||
                                                item.orderitemStatus == 'DEFC' ||
                                                item.orderitemStatus == 'DEFO' ||
                                                item.orderitemStatus == 'REPD'
                                            "
                                            :class="{
                                                zhuanban: item.orderitemStatus == 'CHAD',
                                                yanqi: item.orderitemStatus == 'DEFC' || item.orderitemStatus == 'DEFO',
                                                zhuanrang: item.orderitemStatus == 'TRAD' || item.orderitemStatus == 'REPD',
                                            }"
                                        >
                                            {{ item.orderitemStatus | orderitemStatus }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul class="addGoods" v-show="item.giftItems && item.giftItems.length > 0">
                                <li class="addTit">赠送：</li>
                                <li class="addLi" v-for="it in item.giftItems" :key="it.a">{{ it.skuName }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- 新需求  隐藏收货信息 -->
                <div class="addressWrap" v-if="postStatus && false">
                    <div class="receiveTitle">收货信息</div>
                    <div class="receiveInformation">
                        <span class="infoName">{{ paidDetails.orderAddress.oaName }}</span>
                        <span class="infoName">{{ paidDetails.orderAddress.oaPhone }}</span>
                        <span class="infoName">
                            {{
                                paidDetails.orderAddress.oaProvincename +
                                paidDetails.orderAddress.oaCityname +
                                paidDetails.orderAddress.oaDistrictname +
                                paidDetails.orderAddress.oaAddress
                            }}
                        </span>
                    </div>
                </div>

                <div class="addressWrap">
                    <div class="receiveTitle">支付信息</div>
                    <div class="receiveInformation receiveInformationPay">
                        <span class="infoName">
                            实付金额：
                            <span class="red">¥{{ paidDetails.orderPayamount | veMoneyCent }}</span>
                        </span>
                        <span class="infoName" v-show="paidDetails.orderPayamount > 0">付款时间：{{ paidDetails.orderPaytime | dayTime }}</span>
                    </div>
                </div>
                <div
                    class="invoce"
                    v-show="
                        paidDetails.orderValidstatus == 'Y' && paidDetails.orderInvoicecouldapplystatus == 'Y' && paidDetails.orderInvoiceapplystatus == 'N'
                    "
                    @click="applyInvoice()"
                >
                    申请电子发票
                </div>
                <div
                    class="invoceDone"
                    v-show="
                        paidDetails.orderValidstatus == 'Y' && paidDetails.orderInvoicecouldapplystatus == 'N' && paidDetails.orderInvoiceapplystatus == 'Y'
                    "
                >
                    已申请电子发票
                </div>
            </div>
        </div>
        <!-- 购买协议 -->
        <agreement-purchase
            ref="agreementPurchase"
            :is-show-footer="false"
            :download-show="!(paidDetails.classOrderSubType === 'YAN' && paidDetails.orderSubtype === 'REP')"
            :show="isShow"
            :deal-lists="dealLists"
            @close-fn="closeFn"
            @confirm-fn="closeFn"
        />
        <!-- 班级详情 -->
        <class-details ref="classDetails" />
    </div>
</template>

<script>
// import User from '@/utils/user';
import orderDetailsTitle from '@/www/components/uc/manager/order/orderDetailsTitle';
import agreementPurchase from '@/www/components/uc/manager/order/agreementPurchase'; // 购买协议
import classDetails from '@/www/components/uc/manager/order/classDetails'; // 课程详情
import orderPaidDetailsServe from '@/www/components/uc/manager/order/orderPaidDetailsServe'; // 售后服务

import '@/api/uc/api.OC2002.query-order-detail';
export default {
    name: 'order',
    components: {
        // vbNavigation,
        agreementPurchase,
        classDetails,
        orderPaidDetailsServe,
        orderDetailsTitle,
    },
    filters: {
        star(val) {
            if (val) {
                return val.replace(/^(.{2})(.*)(.{2})$/, function (val, $1, $2, $3) {
                    return $1 + $2.replace(/./g, '*') + $3;
                });
            }
            return val;
        },
        orderitemStatus(val) {
            //订单项状态(ORIG:原班级;GEND:常规;REPD:已重读;CHAD:已转班;TRAD:已转让;DEFO:已顺开;DEFC:已顺关;CREF:已退费;OREF:已开退)
            let obj = {
                CHAD: '已转班',
                REPD: '已续学',
                TRAD: '已转班',
                CREF: '已退费',
                DEFC: '已休学',
                DEFO: '已休学',
            };
            return obj[val] || '';
        },
    },
    data() {
        return {
            isShow: false,
            dealLists: [],
            defaultImg: require('./asset/images/default-course-pic.png'),
            paidDetails: {
                classList: [],
            },
            postStatus: false, //邮寄资料状态
        };
    },
    computed: {
        smallWrite() {
            let m = this.paidDetails.moneyInfo ? this.paidDetails.moneyInfo[2].showMoney : '';
            if (m.match(/\.00/)) {
                m = m.replace(/\.00/, '');
            }
            if (m.match(/\.[1-9]0+/)) {
                m = m.replace(/(\.[1-9])0+/, '$1');
            }
            return m.replace(/^(.*)(\(.*\))/, '$1<span class="smallWrite">$2</span>');
        },
    },
    mounted() {
        this.getOrderPaidDetails();
    },
    methods: {
        closeFn() {
            this.isShow = false;
            this.dealLists = [];
        },
        applyInvoice() {
            //申请电子发票
            this.$router.push({
                path: '/invoiceExplain',
                query: {
                    orderId: this.paidDetails.orderNo,
                    TOKEN: this.$User.getToken(),
                },
            });
        },
        openNewPage(url) {
            setTimeout(() => {
                let a = document.createElement('a');
                a.href = url;
                a.target = '_blank';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }, 100);
        },
        getOrderPaidDetails() {
            //获取订单详情信息
            this.$niceloo.api.call('uc/query-order-detail', {
                orderNo: this.$route.query.orderNo,
                onsuccess: (data) => {
                    this.paidDetails = data || {};
                    if (this.paidDetails.orderAddressneedcompletestatus == 'Y') {
                        this.postStatus = true;
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        detailsOpen(item) {
            this.$refs.classDetails.open(item, this.$route.query.orderNo);
        },
        argumentsOpen(item) {
            this.isShow = true;
            this.dealLists.push(item);
            this.$refs.agreementPurchase.open(item, this.$route.query.orderNo);
        },
    },
};
</script>

<style scoped lang="less">
.ucIndex {
    background: #f5f5f5;
    .indexCont {
        margin: 0 auto;
        // width: 1200px;
        position: relative;
    }
}
.navigationWrap {
    float: left;
}
.contentWrap {
    // width: 866px;
    // box-shadow: 0px 1px 8px 4px rgba(0, 0, 0, 0.06);
    background: #fff;
    padding-bottom: 150px;
    position: relative;
}
.detailsWrap {
    background: #fff;
    border: 1px solid rgba(241, 241, 241, 1);
    border-radius: 2px;
    margin: 24px;
    .showDetailsWrap {
        width: 136px;
        text-align: right;
    }
    .listWrap {
        border-bottom: 1px solid rgba(241, 241, 241, 1);
        &:last-child {
            border-bottom: none;
        }
    }
    .lassLists {
        border-bottom: 1px solid rgba(241, 241, 241, 1);
        padding: 0 20px;
    }
    .contTable {
        border: 2px solid #f2f2f2;
        border-radius: 2px;
        .tableTitle,
        .receiveTitle {
            line-height: 58px;
            text-align: center;
            background: #f8f8f8;
            border-bottom: 2px solid #f2f2f2;
        }
    }
    .classNames {
        margin: 20px 0;
        line-height: 22px;
        min-height: 70px;
        display: flex;
        .leftW {
            display: flex;
        }
        .classImg {
            height: 70px;
            width: 112px;
            background: #ccc;
            margin-right: 20px;
            border-radius: 4px;
            overflow: hidden;
            img {
                height: 100%;
                width: 100%;
            }
        }
        .classCont {
            width: 350px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 14px;
            color: #333;
            .classPrice {
                font-size: 12px;
                color: rgba(153, 153, 153, 1);
            }
            .price {
                margin-right: 20px;
            }
        }

        .showDetails {
            margin-left: 80px;
            color: rgba(153, 153, 153, 1);
            font-size: 14px;
            cursor: pointer;
        }
        .payAgreementW {
            flex-grow: 1;
        }
        .payAgreement {
            cursor: pointer;
        }
        .contRight {
            color: rgba(153, 153, 153, 1);
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 40px;
            align-items: flex-end;
            min-width: 112px;
        }
        .payType {
            width: 60px;
            height: 20px;
            background: rgba(245, 245, 245, 1);
            border-radius: 2px;
            color: #999;
            font-size: 12px;
            line-height: 20px;
            text-align: center;
        }
    }
    .addGoods {
        padding: 20px 0;
        border-top: 1px solid #eee;
        .addTit {
            height: 18px;
            width: 42px;
            background: linear-gradient(137deg, rgba(240, 121, 99, 1) 0%, rgba(231, 57, 40, 1) 100%);
            border-radius: 2px;
            text-align: center;
            line-height: 18px;
            font-size: 12px;
            color: #fff;
        }
        .addLi {
            font-size: 14px;
            color: #666;
            line-height: 24px;
        }
    }
}
.addressWrap {
    border: 1px solid #f1f1f1;
    border-radius: 2px;
    margin: 24px;
    .receiveTitle {
        line-height: 35px;
        background: rgba(248, 248, 248, 1);
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        font-size: 14px;
        padding-left: 28px;
        font-weight: bold;
    }
    .receiveInformation {
        display: flex;
        flex-wrap: wrap;
        padding: 15px 28px;
    }
    .receiveInformationPay {
        justify-content: space-between;
    }
    .infoName {
        font-size: 14px;
        color: #666;
        line-height: 24px;
        margin-right: 40px;
    }
    .infoName:first-child {
        white-space: nowrap;
    }
    .infoName:last-child {
        margin-right: 0;
    }
}
.invoce {
    font-size: 16px;
    color: #666;
    position: absolute;
    bottom: 30px;
    right: 24px;
    padding-right: 24px;
    cursor: pointer;
    background: url('asset/images/invoce-point.png') no-repeat;
    background-size: 16px 16px;
    background-position: right center;
    &:hover {
        opacity: 0.8;
    }
}
.invoceDone {
    font-size: 16px;
    color: #666;
    position: absolute;
    bottom: 30px;
    right: 24px;
}
.red {
    color: rgba(231, 57, 40, 1);
}
</style>
