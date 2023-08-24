<!-- 没有班级card-->
<template>
    <div class="no-data">
        <img src="./asset/images/icon-empty.png" class="img" />
        <p class="txt">{{ msg }}</p>
        <div class="btn-box">
            <span class="btn btn1" v-if="btn1" @click="onClickBtn(1)">{{ btn1 }}</span>
            <span class="btn btn2" v-if="btn2" @click="onClickBtn(2)">{{ btn2 }}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'paper-empty',
    props: {
        msg: {
            type: String,
            default: '加载失败，请重试',
        },
        btn1: {
            type: String,
            default: '',
        },
        btn2: {
            type: String,
            default: '',
        },
    },
    methods: {
        onClickBtn(type) {
            this.$emit(`btn${type}`);
        },
    },
};
</script>
<style lang="less" scoped>
.no-data {
    text-align: center;
    width: 100%;
    height: 550px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 9px 1px rgba(26, 39, 90, 0.06);
    border-radius: 6px;
    margin-bottom: 20px;

    .img {
        margin-top: 100px;
        width: 260px;
        height: 180px;
    }

    .txt {
        padding-top: 15px;
        font-size: 14px;
        color: #3a3d4b;
        margin-bottom: 20px;
    }
    .btn-box {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn {
        flex-shrink: 0;
        width: 136px;
        height: 38px;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 29px;
        line-height: 38px;
        color: #ffffff;
        cursor: pointer;
        font-size: 14px;
        text-align: center;
    }
    .btn2 {
        margin-left: 30px;
    }
}
</style>
