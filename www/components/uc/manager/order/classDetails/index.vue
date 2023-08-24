<!--
 * @Author: Li
 * @Date: 2021-09-13 16:58:09
 * @LastEditors: Li
 * @LastEditTime: 2021-09-14 18:19:55
 * @Description:
-->
<template>
    <div v-show="show" class="classWrap">
        <div class="close" @click="close()"></div>
        <buyreceiptsnapshot :class-id="info.skuId" :order-id="orderId" />
    </div>
</template>

<script>
import buyreceiptsnapshot from '@/www/components/outside/open/treaty/buyreceiptsnapshot/index.vue';

export default {
    name: 'agreementPurchase',
    components: {
        buyreceiptsnapshot,
    },
    props: {},
    data() {
        return {
            show: false,
            info: {},
            orderId: '',
        };
    },

    methods: {
        open(item, orderId) {
            this.orderId = orderId;
            this.info = item || {};
            this.show = true;
        },
        close() {
            this.show = false;
        },
    },
};
</script>

<style scoped lang="less">
.classWrap {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 4000;
    background: white;
    width: 100%;
    .contentWrap {
        max-height: 80vh;
        overflow: auto;
        padding: 30px;
    }
    .close {
        width: 28px;
        height: 28px;
        background: url('./asset/images/close2.png') no-repeat center center;
        position: absolute;
        top: 20px;
        right: 50px;
        cursor: pointer;
        z-index: 1001;
    }
    .classTitle {
        line-height: 70px;
        color: #222222;
        font-size: 18px;
    }
    .infoItem {
        border: 2px solid #dddddd;
    }
    .itemTop {
        border-bottom: 2px solid #dddddd;
    }
    .itemTop,
    .itemBot {
        display: flex;
    }
    .itemName {
        background: #f2f2f2;
        line-height: 60px;
        color: #333;
        font-size: 16px;
        width: 130px;
        text-align: center;
    }
    .itemCont {
        line-height: 60px;
        color: #333;
        font-size: 16px;
        padding-left: 10px;
        width: 290px;
    }
    .content {
        margin-top: 20px;
        color: #666;
        line-height: 28px;
        font-size: 16px;
    }
}
</style>
