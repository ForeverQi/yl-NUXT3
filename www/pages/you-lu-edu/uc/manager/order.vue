<template>
    <div>
        <order-tabs :tabs="tabs" :active-index="activeIndex" />
        <notice :show.sync="isShowNotice" :msg="'声明：优路教育从未授权任何形式的个人代收费行为，有奖举报电话：010-51653988'"></notice>
        <nuxt-child />
    </div>
</template>

<script>
import OrderTabs from '@/www/components/uc/manager/order/OrderTabs/index.vue';
import Notice from '@/www/components/uc/manager/invoice/notice/index.vue';
import loginRegisterTrack from '@/plugins/yiguan/login-register-track.js';

export default {
    name: 'order',
    components: {
        OrderTabs,
        Notice,
    },
    middleware({ route, redirect }) {
        if (route.path === '/uc/manager/order' || route.path === '/uc/manager/order/' || route.path === '/uc/manager/order/orderPaid') {
            return redirect('/uc/manager/order/orderClass');
        }
    },
    data() {
        return {
            tabs: [
                {
                    name: '系统课订单',
                },
                {
                    name: '成人升学服务订单',
                },
                {
                    name: '其他订单',
                },
            ],
            activeIndex: 0,
            isShowNotice: true,
        };
    },
    head() {
        return this.$head({
            title: '个人中心_我的订单_点亮职业人生_优路教育',
            meta: [],
        });
    },
    mounted() {
        this.showWxBindDialog();
    },
    methods: {
        ...loginRegisterTrack,
        async showWxBindDialog() {
            const storageDate = this.$storage.get('wx3MiniprogramBind') || {};
            let currtDate = `${new Date().getMonth()}-${new Date().getDate()}`;
            if (storageDate && storageDate === currtDate) {
                return;
            }
            let isBind = await ylPlugin.login.isWx3MiniprogramBoundByCurrentUser();
            if (!isBind) {
                this.$storage.set('wx3MiniprogramBind', currtDate);
            }
            ylPlugin.login.tipBindWx3MiniprogramIfNeeded({
                onstatechange: (state) => {
                    if (state.isBound) {
                        this.$Message.success('绑定成功');
                        this.trackWxMiniprogrameBind('个人中心-我的订单页面');
                    }
                    if (state.isQRCodeScanned) {
                        this.trackMiniprogrameBindScan('个人中心-我的订单页面');
                    }
                    if (state.isBound === 'fail') {
                        this.trackWxMiniprogrameBind('个人中心-我的订单页面', false);
                    }
                },
            });
        },
    },
};
</script>

<style scoped></style>
