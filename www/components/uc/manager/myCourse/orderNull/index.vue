<template>
    <div class="nullWrap">
        <div class="nullImg"></div>
        <div class="words">{{ words }}</div>
    </div>
</template>

<script>
export default {
    name: 'orderNull',
    props: {
        words: {
            type: String,
            default: '',
        },
    },
};
</script>

<style scoped lang="less">
.nullWrap {
    height: 662px;
    padding-top: 146px;
    box-sizing: border-box;
    .nullImg {
        width: 260px;
        height: 180px;
        background: url('./asset/images/nullorder.png') no-repeat 0 0 / cover;
        margin: 0 auto;
    }
    .words {
        line-height: 19px;
        font-size: 14px;
        color: #3a3d4b;
        white-space: nowrap;
        text-align: center;
        margin-top: 15px;
    }
}
</style>
