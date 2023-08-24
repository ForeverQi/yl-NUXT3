<template>
    <div class="empty" :style="{ height: height + 'px' }">
        <div class="empty-c">
            <img class="empty-img" src="../../../assets/img/empty.png" alt="" />
            <p class="text">{{ text }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: '暂无试卷，去其他栏目看看吧！',
        },
        height: {
            type: Number,
            default: 500,
        },
    },
};
</script>

<style lang="less" scoped>
.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    .empty-img {
        display: block;
        width: 260px;
        height: 180px;
    }
    .text {
        margin-top: 26px;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        color: #99a1af;
        line-height: 20px;
    }
}
</style>
