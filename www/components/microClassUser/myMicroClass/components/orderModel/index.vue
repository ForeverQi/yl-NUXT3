<template>
    <div class="order-box">
        <div class="tab-box flex ai-center">
            <div v-for="(item, index) in tabList" :key="index" :class="['tab-btn', tabVal === item.val ? 'active' : '']" @click="handleChangeTab(item.val)">
                {{ item.name }}
            </div>
        </div>
        <div class="pay-tips-box flex jc-between ai-center" v-if="showTips" :class="{ isFixed: isFixedTop }" id="payTips">
            <div class="flex ai-center">
                <img class="img-bell" src="./assets/images/bell.png" alt="" />
                <div>优路教育从未授权任何形式的个人代收费行为，有奖举报电话：010-51653988</div>
            </div>
            <img class="close-btn" src="./assets/images/close.png" alt="" @click="handleCloseTips" />
        </div>
        <!-- 空列表 -->
        <empty-model :empty-text="emptyText" :tab="4" v-if="isEmpty"></empty-model>
        <!-- 订单 -->
        <order-list :tab-val="tabVal" v-else :is-empty.sync="isEmpty"></order-list>
    </div>
</template>
<script>
import emptyModel from '../emptyModel/index';
import orderList from './components/orderList/index.vue';
export default {
    name: 'myOrderModel',
    components: {
        orderList,
        emptyModel,
    },
    data() {
        return {
            tabList: [
                { name: '已付款', val: 1 },
                { name: '待付款', val: 2 },
            ],
            tabVal: 1,
            showTips: true,
            emptyText: '您还没有订单哦',
            isEmpty: false,
            isFixedTop: false,
            topDistance: 0,
        };
    },
    watch: {},
    created() {},
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.topDistance = document.getElementById('payTips').offsetTop;
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleChangeTab(val) {
            this.tabVal = val;
            this.isEmpty = false;
        },
        handleCloseTips() {
            this.showTips = false;
        },
        handleScroll() {
            //s滚动的距离，offset默认为元素距离顶部的距离
            var s = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            var dom = document.getElementById('payTips');
            var offset = dom.offsetTop || this.topDistance;
            this.isFixedTop = s > offset;
        },
    },
};
</script>
<style lang="less" scoped>
.isFixed {
    position: fixed;
    top: 0;
    z-index: 1000;
}
.order-box {
    background-color: #fff;
    width: 100%;
    .tab-box {
        width: 100%;
        height: 52px;
        .tab-btn {
            font-size: 14px;
            color: #3a3d4b;
            position: relative;
            font-weight: bold;
            cursor: pointer;
            padding: 0 24px;
            height: 30px;
            line-height: 30px;
        }
        .active {
            color: #025eff;
        }
        .active:after {
            content: '';
            width: 22px;
            height: 4px;
            background-color: #025eff;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 2px;
        }
    }
    .pay-tips-box {
        width: 860px;
        height: 40px;
        padding: 0 16px;
        background-color: #fff3f3;
        color: #f8323c;
        font-size: 15px;
        .img-bell {
            display: block;
            width: 18px;
            height: 18px;
            margin-right: 12px;
        }
        .close-btn {
            display: block;
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
    }
}
</style>
