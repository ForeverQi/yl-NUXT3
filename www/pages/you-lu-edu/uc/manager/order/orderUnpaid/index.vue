<template>
    <!-- 未付款订单 -->
    <div class="tabDetails">
        <orderNull v-show="orderUnpaidList.length == 0 && loading == false" words="您还没有订单哦"></orderNull>
        <orderCard :order-list="orderUnpaidList" @cancelOrder="cancelOrder" @gotoPath="gotoPath" />
        <div class="pagination" v-show="page.pageCount > 10">
            <!-- <vb-pagination :get-page="getPage" :page.sync="page" /> -->
            <pagination :total="page.pageCount" :page-size="page.pageSize" @current-change="getPage" :current-page.sync="page.pageIndex" />
        </div>
    </div>
</template>

<script>
import Pagination from '@/www/components/components/pagination';
import orderNull from '@/www/components/uc/manager/myCourse/orderNull';
import orderCard from '@/www/components/uc/manager/order/orderUnPaidCard';
import '@/api/ctc/api..query-project-detail.js';
import '@/api/uc/api.OC2005.query-unpaid-order-list';
import '@/api/uc/api.OC2011.cancel-unpaid-order';

export default {
    name: 'orderUnpaid',
    components: {
        Pagination,
        orderNull,
        orderCard,
    },
    data() {
        return {
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
                pages: 1,
            },
            NICELOO_URLS: this.$nuxt.context.env.config,
            orderUnpaidList: [],
            loading: true,
        };
    },
    mounted() {
        this.getOrderUnpaidList();
    },
    methods: {
        getOrderUnpaidList() {
            //获取未付款订单列表
            this.loading = true;
            this.$niceloo.api.call('uc/query-unpaid-order-list', {
                pageIndex: this.$PageUtil.getStartIndex(this.page),
                pageSize: this.page.pageSize,
                onsuccess: (data) => {
                    this.orderUnpaidList = data.data || [];
                    this.page.pageCount = data.total;
                    // this.orderUnpaidList.push(
                    //     {
                    //         orderNo: 'ssssss',
                    //         orderCreateddate: '2022-02-02 12:12:12',
                    //         orderSource: 'ss',
                    //         orderItems: [
                    //             {
                    //                 skuName: '讲练结合 2022年二级建造师【建筑三科】预考先知课预考先知课讲练',
                    //                 skuAmount: 2980,
                    //                 orderPayamount: 2000,
                    //                 orderSubtype: 'GEN',
                    //             },
                    //             { skuName: '讲练结合 2022年二级建造师【建筑三科】预考先知课预考先知课讲练', skuAmount: 3980 },
                    //             { skuName: '讲练结合 2022年二级建造师【建筑三科】预考先知课预考先知课讲练', skuAmount: 7980 },
                    //         ],
                    //         orderPaystatus: 'P',
                    //         orderValidstatus: 'Y',
                    //         orderSubtype: 'GEN',
                    //     },
                    //     { orderSubtype: 'CHA', orderValidstatus: 'N', orderValidstatus: 'N' },
                    //     { orderSubtype: 'REP' },
                    //     { orderSubtype: '4' }
                    // );
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },

        cancelOrder(item) {
            //取消订单
            this.$baseUI.confirm({
                title: '提示',
                content: '确认要取消订单吗',
                showCancel: true,
                cancelText: '取消',
                confirmText: '确定',
                confirm: () => {
                    this.$niceloo.api.call('uc/cancel-unpaid-order', {
                        aiId: item.aiId, //审核信息标识	String	是
                        onsuccess: (data) => {
                            this.getOrderUnpaidList(); //重新获取列表
                        },
                    });
                    // this.$baseUI.alert(msg);
                },
            });
        },
        getProjectWebInfo(projectId) {
            return new Promise((resolve, reject) => {
                this.$callApi('ctc/query-project-detail', {
                    projectId,
                    onsuccess: resolve,
                    onerror: reject,
                });
            }).catch((err) => {
                console.warn(err);
            });
        },
        async gotoPath(item) {
            console.warn('gotoPath');
            if (item.orderValidstatus == 'N') {
                const project = item.orderItems
                    .map((oitem) => oitem.specs)
                    .flat(Number.POSITIVE_INFINITY)
                    .find((sitem) => {
                        return sitem.specType === 'PROJECT';
                    });
                let projectSeoCode = '';
                if (project && project.specValue) {
                    const res = await this.getProjectWebInfo(project.specValue);
                    if (res) {
                        projectSeoCode = `/all/${res.projectSeoCode}`;
                    }
                }
                if (item.orderType == 'CLASS') {
                    //(CLASS:班型;EM:电子资料;OC:公开课;EP:试卷;AT:活动)
                    // this.$router.push(`/cc/`);
                    this.$router.push(`/pro-course${projectSeoCode}`);
                } else {
                    // this.$router.push(`/os/`);
                    this.$router.push(`/pro-course${projectSeoCode}`);
                }
                return;
            }
            // 支付去订单确认页 需要存班级号。
            let classIds = [];
            item.orderItems.forEach((val) => {
                classIds.push(val.skuId);
            });
            let user = await this.$User.getUser();
            this.$cookieUtil.set(user.userId + this.$nuxt.context.env.config.env + 'orderClass', classIds.toString());
            this.$router.push(`/uc/manager/order/check?orderId=${item.orderNo}`);
            // PageUtil.navigateTo('/uc/order/check?orderId=' + item.orderNo);
        },
        getPage() {
            this.getOrderUnpaidList();
        },
    },
};
</script>

<style scoped lang="less">
.tabDetails {
    background: #fff;
    min-height: 662px;
    padding-bottom: 30px;
}
</style>
