<template>
    <!-- 已付款 定金转班 订单详情 -->
    <div class="ucIndex">
        <div class="indexCont clearfix">
            <div class="contentWrap">
                <order-details-title :order-type-text="'定金订单'" :paid-details="paidDetails" />
                <div class="detailsWrap">
                    <div class="classTitle">转出班级</div>
                    <div class="lassLists">
                        <div v-for="item in paidDetails.orderItems" :key="item.a" class="listWrap" v-show="item.orderitemOperation == 'CHAO'">
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
                    <div class="classTitle">转入班级</div>
                    <div class="lassLists">
                        <div v-for="item in paidDetails.orderItems" :key="item.a" class="listWrap" v-show="item.orderitemOperation == 'CHAI'">
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

                <div class="addressWrap">
                    <div class="receiveTitle">支付信息</div>
                    <div class="receiveInformation receiveInformationPay">
                        <span class="infoName">原价：¥{{ paidDetails.orderTotalamount | veMoneyCent }}</span>
                        <span class="infoName">优惠金额：¥{{ paidDetails.orderDiscountamount | veMoneyCent }}</span>
                        <span class="infoName">转入金额：¥{{ paidDetails.coIntoamount | veMoneyCent }}</span>
                        <span class="infoName">
                            {{ paidDetails.orderPayamount >= 0 ? '实付' : '退款' }}金额：
                            <span class="red">¥{{ Math.abs(paidDetails.orderPayamount) | veMoneyCent }}</span>
                        </span>
                        <span class="infoName">
                            待支付金额：
                            <span class="red">¥{{ paidDetails.remainPayamount | veMoneyCent }}</span>
                        </span>
                        <span class="infoName" v-show="paidDetails.orderPayamount > 0">付款时间：{{ paidDetails.orderPaytime | dayTime }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import orderDetailsTitle from '@/www/components/uc/manager/order/orderDetailsTitle';
import '@/api/uc/api.OC2002.query-order-detail';

export default {
    name: 'order',
    components: {
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
    },
    data() {
        return {
            defaultImg: require('./asset/images/default-course-pic.png'),
            paidDetails: {},
        };
    },
    computed: {
        smallWrite() {
            let m = this.paidDetails.moneyInfo ? this.paidDetails.moneyInfo[2].showMoney : '';
            return m.replace(/^(.*)(\(.*\))/, '$1<span class="smallWrite">$2</span>');
        },
    },
    mounted() {
        this.getOrderPaidDetails();
    },

    methods: {
        getOrderPaidDetails() {
            //获取订单详情信息

            this.$niceloo.api.call('uc/query-order-detail', {
                orderNo: this.$route.query.orderNo,
                onsuccess: (data) => {
                    this.paidDetails = data || {};
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
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
    .listWrap {
        border-bottom: 1px solid rgba(241, 241, 241, 1);
        &:last-child {
            border-bottom: none;
        }
    }
    .classTitle {
        line-height: 40px;
        background: rgba(248, 248, 248, 1);
        font-size: 14px;
        color: #333;
        text-align: center;
        line-height: 40px;
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
    cursor: pointer;
}
.red {
    color: rgba(231, 57, 40, 1);
}
</style>
