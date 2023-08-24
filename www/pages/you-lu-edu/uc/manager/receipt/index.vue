<template>
    <div class="receipt">
        <div class="receipt-title">
            <h3 class="receipt-header">
                我的收据
                <span class="receipt-tip" v-show="prot.receiptAging">（{{ prot.receiptAging }}）</span>
            </h3>
            <input type="button" value="我的发票" class="invoice-my" @click="handleInvoiceClick" />
        </div>
        <div class="receipt-detail">
            <orderNull v-show="receiptList.length == 0" words="如果您有已付款订单，可以去我的订单-订单详情中查看协议和服务！" style="width: auto"></orderNull>
            <receipt-detail :receipt-list="receiptList" @dowmload="dowmload" />
        </div>
    </div>
</template>

<script>
import orderNull from '@/www/components/uc/manager/myCourse/orderNull';
import receiptDetail from '@/www/components/uc/manager/receipt/receiptDetail';
// import User from '@/utils/user';
// import PageUtil from '@/utils/PageUtil.js';
// import '@/api/uc/api.OC1008.query-receipt-list';
import '@/api/uc/api.OC1023.quert-effective-info';
export default {
    name: 'receipt',
    components: {
        orderNull,
        receiptDetail,
    },
    data() {
        return {
            receiptList: [],
            prot: {},
        };
    },
    mounted() {
        this.getReceiptList();
        this.agingInfo();
    },
    methods: {
        getReceiptList() {
            this.$callRawApi({
                api: 'ordering/my/receipt/list',
                onsuccess: (data) => {
                    this.receiptList = data.data;
                    // this.receiptList.push({
                    //     orderId: 'ZC2022040115045236664543',
                    //     content: [
                    //         { gradeName: '讲练结合 2022年二级建造师【建筑三科】预考先知课预考先知课讲练', price: 1298 },
                    //         { gradeName: '讲练结合 2022年二级建造师【建筑三科】预考先知课预考先知课讲练', price: 1298 },
                    //     ],
                    // });
                    // this.receiptList.push({ orderId: 'ZC2022040115045236664543' });
                    // this.receiptList.push({ orderId: 'ZC2022040115045236664543' });
                },
                onError: this.$niceloo.api.handleFailure,
            });
        },
        agingInfo() {
            //获取收据状态
            this.$niceloo.api.call('uc/quert-effective-info', {
                clientType: 'P',
                onsuccess: (data) => {
                    this.prot = data || {};
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        dowmload(item) {
            //收据下载
            let url =
                this.$niceloo.api.getProperty('fileServer.contextUrl') +
                `/file/download/order/sing?params=` +
                encodeURIComponent(
                    JSON.stringify({
                        orderNumber: item.orderId,
                        token: this.$User.getToken(),
                        loginType: 'U', //用户端是U管理端是A
                        fileName: '',
                    })
                );
            this.$PageUtil.openNewPage(url);
        },
        handleInvoiceClick() {
            this.$router.push({ path: '/uc/manager/invoice' });
        },
    },
};
</script>

<style scoped lang="less">
.receipt {
    background-color: white;
    .receipt-title {
        padding: 19px 22px 28px;
        font-size: 16px;
        color: #333;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        font-weight: bold;
        .receipt-header {
            display: inline-block;
            font-weight: bold;
        }
        .receipt-tip {
            font-size: 14px;
            color: #99a1af;
        }
        .invoice-my {
            background-color: transparent;
            color: #ff2e30;
            font-size: 16px;
            float: right;
            border: none;
        }
    }
    .receipt-detail {
        min-height: 662px;
    }
}
</style>
