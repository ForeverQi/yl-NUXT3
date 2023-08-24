<template>
    <!-- 打款提示 -->
    <div class="wrap" :class="{ height0 }">
        <div class="prop" :style="{ width, padding }">
            <img src="./asset/images/horn.png" alt="" />
            <p>声明：优路教育从未授权任何形式（包括不限于微信、支付宝、银行转账等）的个人代收费行为，有奖举报电话：010-51653988</p>
            <div class="btn" @click="close" v-show="closeShow">我知道了</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'paymentTips',
    props: {
        closeShow: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: '1095px',
        },
        padding: {
            type: String,
            default: '0',
        },
    },
    data() {
        return {
            height0: false,
        };
    },
    methods: {
        close() {
            this.height0 = true;
        },
    },
};
</script>

<style lang="less" scoped>
.wrap {
    min-width: 1200px;
    height: 40px;
    transition: all 0.1s linear;
    &.height0 {
        height: 0;
        overflow: hidden;
    }
    background: #fff3f0;
    line-height: 40px;
    .prop {
        box-sizing: border-box;
        margin: 0 auto;
        display: flex;
        font-size: 15px;
        color: #e73928;
        align-items: center;
        justify-content: space-between;
        img {
            height: 18px;
            width: 18px;
            margin-right: 11px;
        }
        p {
            flex-grow: 1;
        }
        .btn {
            cursor: pointer;
            width: 110px;
            height: 27px;
            border-radius: 14px;
            text-align: center;
            line-height: 27px;
            color: #e73928;
            border: 1px solid #ffd4ca;
        }
    }
}
</style>
