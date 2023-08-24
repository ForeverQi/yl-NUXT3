<template>
    <div class="my-micro-class">
        <tab-box :tab="4"></tab-box>
        <div class="flex jc-between">
            <div class="content-left">
                <!-- 我的订单 -->
                <order-model></order-model>
            </div>
            <div class="content-right">
                <div class="right-top flex ai-center">
                    <img src="../components/asset/images/sameClass.png" />
                </div>
                <list-box></list-box>
            </div>
        </div>
    </div>
</template>

<script>
import tabBox from '../components/tabBox/index.vue';
import listBox from '../components/listBox/index.vue';
import projectTab from '../components/projectTab/index';
import orderModel from '../components/orderModel/index.vue';

export default {
    name: 'index',
    components: {
        tabBox,
        projectTab,
        listBox,
        orderModel,
    },
    data() {
        return {
            emptyText: '您还没有订单哦',
        };
    },
    mounted() {
        this.isCareServiceNumber();
    },
    methods: {
        isCareServiceNumber() {
            this.$mcuLogin
                .checkLogin('myMicroClass')
                .then(({ isFirst }) => {
                    isFirst && this.$PageUtil.reflush();
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.my-micro-class {
    width: 1200px;
    margin: 0 auto 40px;
    .content-left {
        width: 860px;
        background-color: #fff;
        border-radius: 6px;
        padding: 7px 0 100px;
    }
    .content-right {
        width: 324px;
        background-color: #fff;
        border-radius: 6px;
        .right-top {
            height: 60px;
            padding-left: 18px;
            background: #f8fbff;
            img {
                width: auto;
                height: 20px;
            }
        }
    }
}
</style>
