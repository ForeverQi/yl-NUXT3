<!-- 没有班级card-->
<template>
    <div class="noData">
        <img src="./asset/images/icon-empty.png" class="img" />
        <p class="txt">{{ msg }}</p>
        <span class="flex btn jc-center ai-center" @click="toClass" v-if="isShowBtn">{{ btn }}</span>
    </div>
</template>
<script>
export default {
    name: 'paper-empty',
    props: {
        msg: {
            type: String,
            default: '暂无试卷',
        },
        btn: {
            type: String,
            default: '返回课程列表',
        },
        isShowBtn: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        toClass() {
            this.$emit('to-class');
        },
    },
};
</script>
<style lang="less" scoped>
.noData {
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
    }

    .btn {
        width: 136px;
        height: 38px;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 29px;
        line-height: 38px;
        margin: 40px auto 0px auto;
        color: #ffffff;
        cursor: pointer;
        font-size: 14px;
        text-align: center;
    }
}
</style>
