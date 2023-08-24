<!--
 * @Author: Li
 * @Date: 2022-03-08 09:22:28
 * @LastEditors: Li
 * @LastEditTime: 2022-03-18 16:07:21
 * @Description: 
-->
<template>
    <div class="class-catalog" id="chapterDiv">
        <div class="calss-title">
            <img src="./asset/images/chapters.png" alt="" class="chapters-img" />
            <div class="chapters-num">（共{{ experienceClass.coursewareCount }}节）</div>
        </div>
        <!-- 单章 课程层级(1:单级别;2:多级别) -->
        <only-chapters v-if="experienceClass.courseLevel === '1'" @play="play"></only-chapters>
        <!-- 多章 -->
        <more-chapters v-else @play="play"></more-chapters>
    </div>
</template>
<script>
import onlyChapters from '../onlyChapters/index.vue';
import moreChapters from '../moreChapters/index.vue';
export default {
    name: 'leftClassCatalogModel',
    components: {
        onlyChapters,
        moreChapters,
    },
    inject: ['experienceClass'],
    methods: {
        play(item) {
            console.log('leftClassCatalog', item);
            this.$emit('play', item);
        },
    },
};
</script>
<style lang="less" scoped>
.calss-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    .chapters-img {
        width: auto;
        height: 38px;
    }
    .chapters-num {
        font-size: 14px;
        line-height: 19px;
        color: #999;
        margin-top: 9px;
    }
}
</style>
