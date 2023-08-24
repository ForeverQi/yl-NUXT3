<template>
    <div class="feature-model">
        <ul class="feature-list flex">
            <li class="feature-item" v-for="(item, index) in lights" :key="index">
                <p class="tips1">{{ item.title }}</p>
                <p class="tips2">{{ item.content }}</p>
            </li>
        </ul>
        <!-- 按钮区 -->
        <feature-right @play="play" :location="'宣传头图下方【免费领取/立即购买】按钮'"></feature-right>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import featureRight from '../top/feature-right';
export default {
    name: 'classFeatureModel',
    components: {
        featureRight,
    },
    fetch() {
        return Promise.resolve();
    },
    computed: {
        ...mapState('trial-course/course', { experienceClass: 'experienceClass' }),
        lights() {
            return this.experienceClass.lights.filter((item) => item.type === '1');
        },
    },
    methods: {
        play(e) {
            this.$emit('play', e);
        },
    },
};
</script>
<style lang="less" scoped>
.feature-model {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 40px;
    padding-top: 38px;
    padding-bottom: 38px;
    .feature-list {
        display: flex;
        align-items: center;
    }
    .feature-item {
        display: flex;
        flex-direction: column;
        padding-left: 25px;
        padding-right: 25px;
        position: relative;
        .tips1 {
            font-size: 22px;
            line-height: 24px;
            font-weight: bold;
            color: #333;
            margin-bottom: 12px;
        }
        .tips2 {
            font-size: 14px;
            line-height: 16px;
            color: #999;
        }
    }
    .feature-item:not(:last-child)::after {
        display: inline-block;
        position: absolute;
        content: ' ';
        width: 1px;
        height: 40px;
        background-color: #ddd;
        right: 0;
        top: 6px;
    }
}
</style>
