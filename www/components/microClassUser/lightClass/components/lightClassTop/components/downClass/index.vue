<template>
    <div class="class-empty-div">
        <img src="./asset/images/class-empty.png" alt="" class="class-empty" />
        <div class="empty-text">该课程已下架，去看看其他课程吧~</div>
    </div>
</template>
<script>
export default {
    name: 'classEmptyModel',
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>
<style lang="less" scoped>
.class-empty-div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #1c1d30;

    .class-empty {
        display: block;
        width: 260px;
        height: 180px;
    }
    .empty-text {
        color: #3a3d4b;
        font-size: 14px;
        line-height: 16px;
        margin-top: 15px;
        color: #ffffff;
    }
}
</style>
