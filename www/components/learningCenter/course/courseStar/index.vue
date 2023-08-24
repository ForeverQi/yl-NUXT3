<template>
    <div class="star-wrap">
        <span class="star" v-for="i in count" :key="i" :class="{ bright: i <= value }"></span>
        <!-- <span class="star"></span>
    <span class="star bright"></span>
    <span class="star"></span>
    <span class="star"></span> -->
    </div>
</template>
<script>
export default {
    name: 'CourseStar',
    props: {
        value: {
            type: Number,
            default: 0,
        },
        count: {
            type: Number,
            default: 5,
        },
    },
};
</script>
<style lang="less" scoped>
.star-wrap {
    .star {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-image: url(./asset/images/no_star.png);
        background-size: contain;
        margin-right: 4px;

        &.bright {
            background-image: url(./asset/images/star.png);
        }
    }
}
</style>
