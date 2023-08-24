<template>
    <div class="class-catalog" id="chapterDiv">
        <div class="calss-title">
            <img src="./asset/images/chapters.png" alt="" class="chapters-img" />
            <div class="chapters-num">（共{{ experienceClass.coursewareCount }}节）</div>
        </div>
        <!-- 单章 课程层级(1:单级别;2:多级别) -->
        <only-chapters
            v-if="experienceClass.courseLevel === '1'"
            @play="play"
            @freePopupShow="handleFreePopupShow"
            @payPopupShow="handlePayPopupShow"
        ></only-chapters>
        <!-- 多章 -->
        <more-chapters v-else @play="play" @freePopupShow="handleFreePopupShow" @payPopupShow="handlePayPopupShow"></more-chapters>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import onlyChapters from '../only-chapters';
import moreChapters from '../more-chapters';
export default {
    name: 'leftClassCatalogModel',
    components: {
        onlyChapters,
        moreChapters,
    },
    fetch() {
        return Promise.resolve();
    },
    computed: {
        ...mapState('trial-course/course', { experienceClass: 'experienceClass' }),
    },
    methods: {
        play(item) {
            console.log('leftClassCatalog', item);
            this.$emit('play', item);
        },
        handleFreePopupShow(val) {
            console.info('handleFreePopupShow', val);
            this.$emit('freePopupShow', val);
        },
        handlePayPopupShow(val) {
            console.info('handlePayPopupShow', val);
            this.$emit('payPopupShow', val);
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

.class-catalog {
    background-color: white;
    border-radius: 16px;
    padding: 42px 32px;
}
</style>
