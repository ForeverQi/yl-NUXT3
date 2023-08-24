<template>
    <ul class="payContent">
        <li class="payLi" v-for="itemData in orderList" :key="itemData.a">
            <div class="liTtitle">
                <span>订单编号：</span>
                <span class="content">{{ itemData.orderNo }}</span>
                <span class="titleLeft">下单时间：</span>
                <span class="content">{{ itemData.orderCreateddate }}</span>
            </div>
            <ul class="contTop">
                <li class="contLi" v-for="it in itemData.orderItems" :key="it.a">
                    <p class="contTopLeft">
                        {{ it.skuName }}
                    </p>
                    <span class="contTopRight">原价:￥{{ it.skuAmount | veMoneyCent }}</span>
                </li>
            </ul>

            <img v-if="itemData.orderValidstatus == 'N'" src="./asset/images/Invalid.png" alt="" class="botIcon" />
            <img v-else-if="itemData.orderPaystatus == 'P'" src="./asset/images/earnest.png" alt="" class="botIcon" />
            <img v-else-if="itemData.orderSubtype == 'GEN'" src="./asset/images/earnest.png" alt="" class="botIcon" />
            <img v-else-if="itemData.orderSubtype == 'CHA'" src="./asset/images/shift.png" alt="" class="botIcon" />
            <img v-else-if="itemData.orderSubtype == 'REP'" src="./asset/images/stress.png" alt="" class="botIcon" />
            <img v-else-if="itemData.orderSubtype == '4'" src="./asset/images/Invalid.png" alt="" class="botIcon" />

            <!-- 已付款订单 -->
            <div class="liBot">
                <div class="totalMoney" v-if="itemData.orderPaystatus != 'P'">
                    {{ itemData.orderPayamount >= 0 ? '实付金额' : '退款金额' }}:
                    <span class="totalNumber">{{ Math.abs(itemData.orderPayamount) | veMoneyCent }}</span>
                </div>
                <template v-else>
                    <div class="totalMoney totalMoney-inline has-pay">
                        已付定金:
                        <span class="totalNumber">{{ itemData.orderPayamount | veMoneyCent }}</span>
                    </div>
                    <div class="totalMoney totalMoney-inline">
                        待支付金额:
                        <span class="totalNumber">{{ itemData.remainPayamount | veMoneyCent }}</span>
                    </div>
                </template>
                <p class="stench"></p>
                <span
                    class="promit"
                    v-show="
                        itemData.orderValidstatus == 'Y' &&
                        itemData.orderAddressneedcompletestatus == 'Y' &&
                        itemData.orderAddresscompletedstatus == 'N' &&
                        itemData.orderPaystatus != 'P'
                    "
                    :class="{ active: itemData.orderPaystatus == 'P' }"
                >
                    不完善将收不到资料哦～
                </span>

                <div class="buttonWrap" v-if="itemData.orderCreateddate && milepost(itemData.orderCreateddate)">
                    <input type="button" class="detailButton" v-if="itemData.operationMark == 1" @click="toDetais(itemData)" value="查看详情" />
                    <input type="button" class="detailButton" v-else @click="toDetais(itemData)" value="立即确认" />
                    <input
                        type="button"
                        class="detailButton topay"
                        @click="toPay(itemData)"
                        v-show="itemData.orderPaystatus == 'P' && itemData.orderValidstatus == 'Y'"
                        value="立即支付"
                    />
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        orderList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            botIcon: {
                //1:正常订单;2:转班订单;3:重读订单;4:失效订单  	班级订单子类型(GEN:正常;REP:重读;TRA:转让;CHA:转班;REF:退费DEF:顺延;GIV:赠课)
                GEN: 'normal',
                CHA: 'shiftWork',
                REP: 'stress',
                4: 'invalid',
            },
        };
    },
    methods: {
        // 未付款订单取消
        cancelOrder(item) {
            this.$emit('cancelOrder', item);
        },
        gotoPath(item) {
            this.$emit('gotoPath', item);
        },
        toDetais(item) {
            // 判断登录来源 -1时不可点击
            if (!this.$baseUI.clickStop()) {
                console.log('判断不能点击页面');
                return;
            }
            this.$emit('toDetais', item);
        },
        toPay(item) {
            this.$emit('toPay', item);
        },
        milepost(orderCreateddate) {
            //19年3yue1号的不展示按钮 这么写是应为360兼容模式不支持 new Date('年月日 时分秒')的写法，会返回null。
            if (!orderCreateddate) {
                return '';
            }
            const fu = new Date('2019-03-01').getTime();
            const tim = orderCreateddate.replace(/\s.*/, '');
            return new Date(tim).getTime() > fu;
        },
    },
};
</script>

<style scoped lang="less">
.payContent {
    padding: 25px 20px;
    font-size: 16px;
    color: #333;
}
.payLi + .payLi {
    margin-top: 27px;
}
.payLi {
    border: 1px solid #ecedf6;
    position: relative;

    .liTtitle {
        background-color: #f8f8f8;
        padding: 8.5px 24px;
        color: #77798d;
        font-size: 14px;
        display: flex;
        align-items: center;
        .titleLeft {
            margin-left: 64px;
        }
        .content {
            color: #99a1af;
        }
    }

    .contTop {
        padding: 35px 24px 0 40px;
        .contLi {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .contLi + .contLi {
            margin-top: 12px;
        }

        .contTopLeft {
            color: #3a3d4b;
            font-size: 16px;
            flex: 1;
            font-weight: bold;
        }

        .contTopRight {
            color: #9698a2;
            font-size: 12px;
        }
    }

    .promit {
        color: #fa6400;
        font-size: 12px;
        padding: 4px 8px;
        background-color: #fef2e7;
        border-radius: 4px 4px 1px 1px;
        display: inline-block;
        position: relative;
    }

    .promit::after {
        content: ' ';
        display: inline-block;
        position: absolute;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid #fef2e7;
        top: 50%;
        transform: translateY(-50%);
        right: -5px;
    }

    .botIcon {
        width: 48px;
        height: 48px;
        position: absolute;
        top: 36px;
        left: 0;
    }

    .liBot {
        padding: 32px 24px 20px 40px;
        display: flex;
        align-items: center;
        .stench {
            flex: 1;
        }
        .has-pay {
            margin-right: 40px;
        }
        .totalWrap {
            display: flex;
            justify-content: space-between;
            flex: 1;
            align-items: flex-end;
        }
        .totalMoney {
            color: #3a3d4b;
            font-size: 14px;
        }
        .totalMoney-inline {
            display: inline-block;
        }
        .totalNumber {
            color: #f8323c;
            font-weight: bold;
            font-size: 20px;
        }
        .totalNumber::before {
            content: '￥';
            font-size: 14px;
        }
        .buttonWrap {
            position: relative;
            display: inline-block;
        }
        .detailButton {
            display: inline-block;
            color: #f8323c;
            font-size: 14px;
            padding: 10.5px 20px;
            border-radius: 3px;
            background: #fff3f3;
            margin-left: 16px;
            cursor: pointer;
            border-radius: 8px;
            border: none;
            &.topay {
                background: url('./asset/images/bg.png');
                color: white;
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        }
    }
}
</style>
