<template>
    <div class="class-order-wrapper">
        <div class="nav-wrapper">
            <ul class="navList">
                <li v-for="(item, index) in navList" :key="index" :class="['nav-item', item.isActive ? 'nav-item-active' : '']" @click="handleClick(item)">
                    {{ item.title }}
                </li>
            </ul>
        </div>
        <div v-if="isShowPaid">
            <ul class="payContent">
                <li class="payLi" v-for="order in orderPaidList" :key="order.id">
                    <education-order-item :order="order" @refresh="getPaidOrdersList"></education-order-item>
                </li>
            </ul>
            <order-null v-show="orderPaidList.length === 0 && loading == false" words="您还没有订单哦" style="width: auto"></order-null>
            <div class="pagination" v-show="page.pageCount > 10">
                <pagination :total="page.pageCount" :page-size="page.pageSize" @current-change="getPaidOrdersList" :current-page.sync="page.pageIndex" />
            </div>
        </div>
        <div v-if="isShowUnPaid">
            <ul class="payContent">
                <li class="payLi" v-for="order in orderUnpaidList" :key="order.id">
                    <education-order-item :order="order" @refresh="getUnPaidOrdersList" :type="'unpaid'"></education-order-item>
                </li>
            </ul>
            <order-null v-show="orderUnpaidList.length === 0 && unpaidLoading == false" words="您还没有订单哦" style="width: auto"></order-null>
            <div class="pagination" v-show="unpaidPage.pageCount > 10">
                <pagination
                    :total="unpaidPage.pageCount"
                    :page-size="unpaidPage.pageSize"
                    @current-change="getUnPaidOrdersList"
                    :current-page.sync="unpaidPage.pageIndex"
                />
            </div>
        </div>
    </div>
</template>

<script>
import 'core-js/features/array/at';
import 'core-js/actual/structured-clone';
import '@/api/edu/api..query-eduordering-paidorders-list.js'; // 获取项目区域
import '@/api/edu/api..query-eduordering-unpayorders-list.js'; // 获取下一期信息
import EducationOrderItem from '@/www/components/userCenter/order/education-order-item/index.vue';
import Pagination from '@/www/components/components/pagination';
import OrderNull from '@/www/components/uc/manager/myCourse/orderNull/index.vue';

export default {
    components: { EducationOrderItem, Pagination, OrderNull },
    data() {
        return {
            navList: [
                {
                    title: '已支付订单',
                    isActive: true,
                },
                {
                    title: '待支付订单',
                    isActive: false,
                },
            ],
            orderPaidList: [],
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
            },
            loading: false,
            orderUnpaidList: [],
            unpaidPage: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
            },
            unpaidLoading: false,
        };
    },
    computed: {
        isShowPaid() {
            return this.getIsActive('已支付订单');
        },
        isShowUnPaid() {
            return this.getIsActive('待支付订单');
        },
    },
    watch: {
        isShowPaid(newV) {
            if (newV) {
                this.getPaidOrdersList();
            }
        },
        isShowUnPaid(newV) {
            if (newV) {
                this.getUnPaidOrdersList();
            }
        },
    },
    mounted() {
        console.warn('mounted---at', Array.prototype);
        this.getPaidOrdersList();
    },
    methods: {
        getIsActive(title) {
            const item = this.navList.find((item) => item.title === title);
            return item ? item.isActive : false;
        },
        handleClick(item) {
            this.navList.forEach((nitem) => {
                nitem.isActive = nitem.title === item.title;
            });
        },
        getPageParams(page = {}) {
            return {
                pageIndex: page.pageIndex === 1 ? 1 : page.pageIndex,
                pageSize: page.pageSize,
            };
        },
        getPaidOrdersList() {
            this.loading = true;
            return this.$callApi('edu/query-eduordering-paidorders-list', {
                ...this.getPageParams(this.page),
            })
                .then((res) => res.getData())
                .then(({ items = [], totalCount = 0 }) => {
                    this.page.pageCount = +totalCount;
                    this.orderPaidList.splice(0, this.orderPaidList.length, ...items);
                })
                .catch(this.$niceloo.api.handleFailure)
                .finally(() => {
                    this.loading = false;
                });
        },
        getUnPaidOrdersList() {
            this.unpaidLoading = true;
            return this.$callApi('edu/query-eduordering-unpayorders-list', {
                ...this.getPageParams(this.unpaidPage),
            })
                .then((res) => res.getData())
                .then(({ items = [], totalCount = 0 }) => {
                    items.forEach((item) => {
                        item.factualAmount = 0;
                        item.amountInArrears = item.receivableAmount;
                        item.isValid = true;
                        item.orderType = 'ZC';
                    });
                    this.unpaidPage.pageCount = +totalCount;
                    this.orderUnpaidList.splice(0, this.orderUnpaidList.length, ...items);
                })
                .catch(this.$niceloo.api.handleFailure)
                .finally(() => {
                    this.unpaidLoading = false;
                });
        },
    },
};
</script>

<style scoped lang="less">
.class-order-wrapper {
    background-color: white;
    padding-top: 20px;
}
.nav-wrapper {
    text-align: center;
}
.navList {
    background-color: #f5f6f9;
    display: inline-block;
    border-radius: 8px;
    margin: 0 auto;
    .nav-item {
        font-size: 16px;
        color: #3a3d4b;
        font-weight: normal;
        padding: 10px 32px 11px;
        display: inline-block;
        cursor: pointer;
    }

    .nav-item-active {
        border-radius: 8px;
        color: #ff2e30;
        background-color: #ffeaea;
        font-weight: bold;
    }
}

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
}
</style>
