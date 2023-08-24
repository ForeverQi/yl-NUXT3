<template>
    <!-- 微课订单 -->
    <div>
        <div class="tabDetails">
            <orderNull v-show="orderCourseList.length == 0 && loading == false" words="您还没有订单哦"></orderNull>
            <orderCard :order-list="orderCourseList" />
            <div class="pagination" v-show="orderCourseList.length > 100">
                <!-- <vb-pagination :get-page="getPage" :page.sync="page" /> -->
                <pagination :total="page.pageCount" :page-size="page.pageSize" @current-change="getPage" :current-page.sync="page.pageIndex" />
            </div>
        </div>
    </div>
</template>

<script>
import '@/api/uc/api.FO2005.query-user-order-list-detail';
import '@/api/uc/api.OC0008.query-paid-course-order-list';
import orderNull from '@/www/components/uc/manager/myCourse/orderNull';
// import vbPagination from '@/www/components/pagination/vbPagination/index.vue';
import Pagination from '@/www/components/components/pagination';
import orderCard from '@/www/components/uc/manager/order/orderCourseCard';

export default {
    name: 'orderUnpaid',
    components: {
        orderNull,
        Pagination,
        orderCard,
    },
    data() {
        return {
            page: {
                pageIndex: 0,
                pageSize: 100,
                pageCount: 0,
                pages: 0,
            },
            orderCourseList: [],
            loading: true,
        };
    },
    mounted() {
        this.getPage();
    },
    methods: {
        getOrderCourseList() {
            //获取微课订单列表
            this.loading = true;
            this.$niceloo.api.call('uc/query-user-order-list-detail', {
                pageIndex: this.$PageUtil.getStartIndex(this.page),
                pageSize: this.page.pageSize,
                activityId: '', //活动ID 	希望查询某个活动的未支付订单时使用
                status: 'Y', //	Y:已付款,N:未付款,A:查询所有
                orderBelongto: 'OS,AT,MP', //	订单所属  	AT:活动中心、OS:公开课
                onsuccess: (data) => {
                    this.orderCourseList = this.orderCourseList.concat(data.data || []);
                    this.page.pageCount += data.count;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
        cancelOrder() {},
        gotoPath(url) {
            PageUtil.href(url);
        },
        getPage() {
            this.getOrderCourseList();
        },
    },
};
</script>

<style scoped lang="less">
.tabDetails {
    background: #fff;
    min-height: 662px;
}
</style>
