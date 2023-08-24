<template>
    <div class="detailsTitle">
        <div class="contentTitle">
            <span class="titleNumber">订单编号：{{ paidDetails.orderNo }}</span>
            <div class="orderLine"></div>
            <span class="orderTyoe">{{ orderTypeText }}</span>
        </div>
        <span class="titleDate">订单日期：{{ paidDetails.orderCreateddate }}</span>
    </div>
</template>

<script>
export default {
    props: {
        paidDetails: {
            type: Object,
            default: () => ({}),
        },
        orderTypeText: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="less" scoped>
.detailsTitle {
    line-height: 54px;
    padding: 0 24px;
    background: #fff;
    font-size: 16px;
    color: #333;
    box-shadow: 0px 4px 8px 0px rgba(115, 30, 30, 0.04);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .orderTyoe {
        font-size: 14px;
        color: #999;
    }
}
.contentTitle {
    display: flex;
    align-items: center;
    .orderLine {
        width: 1px;
        height: 14px;
        background: #999;
        margin: 0 16px;
    }
}
</style>
