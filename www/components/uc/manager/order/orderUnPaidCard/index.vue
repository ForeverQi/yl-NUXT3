<template>
    <ul class="payContent">
        <li class="payLi" v-for="itemData in orderList" :key="itemData.a">
            <div class="liTtitle">
                <span>订单编号：</span>
                <span class="content">{{ itemData.orderNo }}</span>
                <span class="titleLeft">订单日期：</span>
                <span class="content stretch">{{ itemData.orderCreateddate }}</span>
                <input
                    class="cancelButton"
                    type="button"
                    @click="cancelOrder(itemData)"
                    v-show="itemData.orderSource != 'OP' && itemData.orderSource != 'OA' && itemData.orderSource !== 'SH'"
                    value="取消"
                />
            </div>
            <ul class="contTop">
                <li class="contLi" v-for="it in itemData.orderItems" :key="it.a">
                    <p class="contTopLeft">
                        {{ it.skuName }}
                    </p>
                    <span class="contTopRight">原价：￥{{ it.skuAmount | veMoneyCent }}</span>
                </li>
            </ul>

            <img v-if="itemData.orderValidstatus == 'N'" src="./asset/images/Invalid.png" alt="" class="botIcon" />

            <div class="liBot">
                <div>
                    <span class="totalMoney">应付金额:</span>
                    <span class="totalNumber">{{ itemData.orderTotalamount | veMoneyCent }}</span>
                    <template v-if="itemData.orderDiscountamount > 0">
                        <span class="totalMoney preferential-price">优惠金额:</span>
                        <span class="totalNumber">{{ itemData.orderDiscountamount | veMoneyCent }}</span>
                    </template>
                </div>
                <input v-if="itemData.orderValidstatus == 'N'" type="button" class="detailButton" @click="gotoPath(itemData)" value="选择课程" />
                <input v-else type="button" class="detailButton topay" @click="gotoPath(itemData)" value="立即支付" />
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
            .content {
                color: #99a1af;
            }
        }
        .cancelButton {
            margin-left: 20px;
            cursor: pointer;
            background-color: transparent;
            color: #ff2e30;
            border: 0;
        }
        .stretch {
            flex: 1;
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
        justify-content: space-between;

        .stretch {
            flex: 1;
        }

        .preferential-price {
            margin-left: 40px;
        }

        .totalMoney {
            color: #3a3d4b;
            font-size: 14px;
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
            border: 0;
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
