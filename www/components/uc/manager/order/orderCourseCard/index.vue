<template>
    <ul class="payContent">
        <li class="payLi" v-for="itemData in orderList" :key="itemData.a">
            <div class="liTtitle">
                <span>订单编号：</span>
                <span class="content">{{ itemData.orderNo }}</span>
                <span class="titleLeft">订单日期：</span>
                <span class="content">{{ itemData.orderCreateddate }}</span>
            </div>
            <ul class="contTop">
                <li class="contLi" v-for="it in itemData.items" :key="it.a">
                    <span v-if="it.skuType && it.skuType == 'OCL'" class="coursetag">课单</span>
                    {{ it.skuName }}
                </li>
            </ul>

            <div class="liBot">
                <span class="totalMoney">实付金额：</span>
                <span class="totalNumber">{{ (itemData.orderPayamount || itemData.payMoney) | veMoneyCent }}</span>
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
        }
        .content {
            color: #99a1af;
        }
    }

    .contTop {
        padding: 32px 24px 0 40px;
        .contLi {
            color: #3a3d4b;
            font-size: 16px;
            font-weight: bold;
        }
        .contLi + .contLi {
            margin-top: 12px;
        }
    }

    .liBot {
        padding: 24px 24px 32px 40px;
        display: flex;
        align-items: center;

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
    }
}
</style>
