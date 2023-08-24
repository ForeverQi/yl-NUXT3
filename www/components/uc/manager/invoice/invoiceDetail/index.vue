<template>
    <ul class="payContent">
        <li class="payLi" v-for="item in invoiceList" :key="item.a">
            <div class="liTtitle">
                <span>订单编号：{{ item.orderNo }}</span>
                <span class="date">订单日期：{{ item.orderCreateddate }}</span>
            </div>
            <div class="liCont">
                <div class="contTop" v-for="it in item.orderItems" :key="it.oiId">
                    <p class="contTopLeft">{{ it.skuName }}</p>
                    <span class="contTopRight">原价:￥{{ it.skuAmount | veMoneyCent }}</span>
                </div>
                <div class="liBot">
                    <span class="totalMoney">
                        订单金额：
                        <span class="totalNumber">{{ item.orderPayamount | veMoneyCent }}</span>
                    </span>
                    <span v-if="item.orderValidstatus == 'N'" class="detailButton disable">
                        <img src="./asset/images/dis.png" alt="" class="icon" />
                        失效订单无法申请电子发票已申请发票会作废
                    </span>
                    <input class="apply" v-else-if="item.orderInvoiceapplystatus == 'N'" @click="applyInvoice(item)" type="button" value="申请电子发票" />

                    <span v-else class="detailButton disable">
                        {{ item.orderInvoicestatusinfo }}
                    </span>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        invoiceList: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        applyInvoice(item) {
            this.$emit('applyInvoice', item);
        },
    },
};
</script>

<style lang="less" scoped>
.payContent {
    padding: 10px 20px 30px;
    font-size: 16px;
    color: #333;
}
.payLi {
    border: 1px solid #ecedf6;
    margin-bottom: 15px;
    background: white;
    .liTtitle {
        background-color: #f4f5f8;
        border-bottom: 1px solid rgba(242, 242, 242, 1);
        padding: 8px 21px;
        color: #99a1af;
        font-size: 14px;
        .date {
            margin-left: 64px;
        }
    }
    .cancelButton {
        margin-left: 20px;
        cursor: pointer;
    }
    .liCont {
        padding: 35px 24px 28px 40px;
        .contTop {
            display: flex;
            .contTopLeft {
                color: #3a3d4b;
                font-size: 16px;
                font-weight: bold;
                flex: 1;
            }
            .contTopRight {
                color: #9698a2;
                font-size: 12px;
            }
        }

        .contTop + .contTop {
            margin-top: 12px;
        }
    }
    .liBot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 32px;

        .botIcon {
            position: absolute;
            left: 21px;
            bottom: 35px;
            width: 104px;
            height: 42px;
            background: url('./asset/images/earnest@2x.png') no-repeat 0 0 / cover;
        }
        .promit {
            position: absolute;
            height: 16px;
            line-height: 16px;
            left: 471px;
            top: 68px;
            color: #f02e00;
            font-size: 14px;
            padding-left: 24px;
            background: url('./asset/images/mark@2x.png') no-repeat 0 0;
            background-size: 16px 16px;
        }
        .totalMoney {
            color: #3a3d4b;
            font-size: 14px;
        }
        .totalNumber {
            color: #f8323c;
            font-size: 20px;
            font-weight: bold;
        }
        .totalNumber::before {
            content: '￥';
            font-size: 14px;
        }
        .detailButton {
            color: #9698a2;
            font-size: 12px;
            .icon {
                width: 12px;
                height: 12px;
                margin-right: 8px;
                display: inline-block;
                vertical-align: -2px;
            }
        }
        .apply {
            color: white;
            font-size: 14px;
            padding: 10.5px 22px;
            border-radius: 3px;
            background-image: url('./asset/images/bg.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            cursor: pointer;
            border: none;
        }
    }
}
</style>
