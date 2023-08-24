<template>
    <div class="class-order-wrapper">
        <div class="nav-wrapper">
            <ul class="navList">
                <li v-for="(item, index) in navList" :key="index" :class="['nav-item', item.isActive ? 'nav-item-active' : '']" @click="handleClick(item)">
                    {{ item.title }}
                </li>
            </ul>
        </div>
        <order-paid v-if="isShowPaid" />
        <order-unpaid v-else-if="isShowUnPaid" />
    </div>
</template>

<script>
import OrderPaid from '@/www/pages/you-lu-edu/uc/manager/order/orderPaid';
import OrderUnpaid from '@/www/pages/you-lu-edu/uc/manager/order/orderUnpaid';

export default {
    components: {
        OrderPaid,
        OrderUnpaid,
    },
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
</style>
