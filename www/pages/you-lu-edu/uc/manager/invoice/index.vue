<template>
    <div class="invoice">
        <div class="invoice-title">
            <input type="button" value="我的收据" class="receipt" @click="handleReceiptClick" />
            <h3 class="invoice-h">
                我的电子发票
                <span class="invoice-tip" v-show="prot.billOverdue">（{{ prot.billOverdue }}）</span>
            </h3>
        </div>
        <!-- 电子发票 -->
        <notice :show.sync="isShowTip"></notice>
        <p class="invoice-company">
            自2022年5月24日起，“河南环球优路教育科技有限公司”开票信息变更为：1、名称：河南环球优路教育科技有限公司；2、纳税人识别号：91410100MA47KLQ88J；3、地址、电话：河南省郑州市高新技术产业开发区枫香街173号8号楼9层901号，13683536583
        </p>
        <div class="invoice-detail">
            <orderNull v-show="invoiceList.length === 0" words="您还没有需要开电子发票的订单" style="width: auto"></orderNull>
            <!-- <p class="promot" v-show="eInvoicepromptinfo">{{ eInvoicepromptinfo }}</p> -->
            <invoice-detail :invoice-list="invoiceList" @applyInvoice="applyInvoice" />
        </div>
        <div class="pagination" v-show="page.pageCount > 10">
            <vb-pagination :get-page="getInvoiceList" :page.sync="page" />
        </div>
    </div>
</template>

<script>
import orderNull from '@/www/components/uc/manager/myCourse/orderNull/index.vue';
import invoiceDetail from '@/www/components/uc/manager/invoice/invoiceDetail/index.vue';
import Notice from '@/www/components/uc/manager/invoice/notice/index.vue';
import vbPagination from '@/www/components/pagination/vbPagination/index.vue';
// import PageUtil from '@/utils/PageUtil.js';
// import User from '@/utils/user';
import '@/api/uc/api.OC2016.query-invoice-list';
import '@/api/uc/api.OC1023.quert-effective-info';
export default {
    name: 'invoice',
    components: {
        orderNull,
        invoiceDetail,
        vbPagination,
        Notice,
    },
    data() {
        return {
            invoiceList: [],
            eInvoicepromptinfo: [],
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
                pages: 10,
            },
            prot: {},
            isShowTip: true,
        };
    },
    head() {
        return this.$head({
            title: '个人中心_我的电子发票_点亮职业人生_优路教育',
            meta: [],
        });
    },
    mounted() {
        this.getInvoiceList();
        this.agingInfo();
    },
    methods: {
        getInvoiceList() {
            //获取电子发票列表
            this.$niceloo.api.call('uc/query-invoice-list', {
                pageIndex: this.$PageUtil.getStartIndex(this.page),
                pageSize: this.page.pageSize,
                onsuccess: ({ data, total }) => {
                    this.invoiceList = data || [];
                    // this.invoiceList.push(
                    //     {
                    //         orderNo: '41v5dfvdfvfdvfdvfd',
                    //         orderCreateddate: '2020-09-09 12:12:12',
                    //         eInvoicepromptinfo:
                    //             '项目管理认证VIP尊享班【6月考期】续考班全项目管理认证VIP尊享班【6月考期】续考班全项目管理认证VIP尊享班【6月考期】续考班全项目管理认证VIP尊享班【6月考期】续考班全',
                    //         orderValidstatus: 'N',
                    //         orderPayamount: 3980,
                    //         orderItems: [
                    //             {
                    //                 oiId: 'sss',
                    //                 skuName: '2022年PMP&#174项目管理认证VIP尊享班【6月考期】续考班全科',
                    //                 skuNaskuAmountme: '2980.00',
                    //                 orderPayamount: 100,
                    //                 skuAmount: 2980,
                    //             },
                    //             {
                    //                 oiId: 'ss1s',
                    //                 skuName: '2022年PMP&#174项目管理认证VIP尊享班【6月考期】续考班全科',
                    //                 skuNaskuAmountme: '2980.00',
                    //                 orderPayamount: 100,
                    //                 skuAmount: 2980,
                    //             },
                    //             {
                    //                 oiId: 's2ss',
                    //                 skuName: '2022年PMP&#174项目管理认证VIP尊享班【6月考期】续考班全科',
                    //                 skuNaskuAmountme: '2980.00',
                    //                 orderPayamount: 100,
                    //                 skuAmount: 2980,
                    //             },
                    //         ],
                    //     },
                    //     {
                    //         orderNo: '41v5dfvdfvfdvfdvfd',
                    //         orderCreateddate: '2020-09-09 12:12:12',
                    //         eInvoicepromptinfo: {},
                    //         orderValidstatus: 'Y',
                    //         orderPayamount: 3980,
                    //         orderItems: [
                    //             {
                    //                 oiId: 'sss',
                    //                 skuName: '2022年PMP&#174项目管理认证VIP尊享班【6月考期】续考班全科',
                    //                 skuNaskuAmountme: '2980.00',
                    //                 orderPayamount: 100,
                    //                 skuAmount: 2980,
                    //             },
                    //             {
                    //                 oiId: 'ss1s',
                    //                 skuName: '2022年PMP&#174项目管理认证VIP尊享班【6月考期】续考班全科',
                    //                 skuNaskuAmountme: '2980.00',
                    //                 orderPayamount: 100,
                    //                 skuAmount: 2980,
                    //             },
                    //             {
                    //                 oiId: 's2ss',
                    //                 skuName: '2022年PMP&#174项目管理认证VIP尊享班【6月考期】续考班全科',
                    //                 skuNaskuAmountme: '2980.00',
                    //                 orderPayamount: 100,
                    //                 skuAmount: 2980,
                    //             },
                    //         ],
                    //         eInvoicepromptinfo: {},
                    //         orderInvoiceapplystatus: 'N',
                    //     }
                    // );
                    if (this.invoiceList[0]) {
                        this.eInvoicepromptinfo = this.invoiceList[0].eInvoicepromptinfo;
                    }

                    this.page.pageCount = total;
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        agingInfo() {
            this.$niceloo.api.call('uc/quert-effective-info', {
                clientType: 'P',
                onsuccess: (data) => {
                    this.prot = data || {};
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        applyInvoice(item) {
            if (item.applyInvoicestatus == '1') {
                return;
            }

            this.$router.push({
                path: '/invoiceExplain',
                query: {
                    orderId: item.orderNo,
                    TOKEN: this.$User.getToken(),
                },
            });
        },
        handleReceiptClick() {
            this.$router.push({ path: '/uc/manager/receipt' });
        },
    },
};
</script>

<style scoped lang="less">
.invoice {
    background-color: white;
    .invoice-title {
        padding: 19px 22px 28px;
        font-size: 16px;
        color: #333;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        .invoice-tip {
            font-size: 14px;
            color: #99a1af;
            font-weight: normal;
            margin-left: 22px;
        }
        .invoice-h {
            font-weight: bold;
        }
    }
    .invoice-detail {
        background: #fff;
        margin-top: 15px;
        min-height: 662px;
        .promot {
            font-size: 14px;
            padding: 10px 30px 0px;
            line-height: 25px;
            color: #999;
        }
    }
}
.receipt {
    font-size: 16px;
    color: #ff2e30;
    background-color: transparent;
    float: right;
    margin-top: 3px;
    border: none;
}
.invoice-company {
    background-color: #f5f6fa;
    border-radius: 0px 4px 4px 0px;
    color: #77798d;
    font-size: 13px;
    padding: 12px 34px;
    margin: 12px 20px 5px;
    background-image: url('./asset/images/company.png');
    background-repeat: no-repeat;
    background-size: 5px 64px;
}
</style>
