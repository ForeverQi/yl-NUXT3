<template>
    <div class="course-side-title" :style="showHandoutMax === true ? 'background-color: transparent' : ''">
        <div class="icon"></div>
        <p class="title">{{ title }}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'course-side-title',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapState('course/info', {
            showHandoutMax: 'showHandoutMax',
        }),
    },
};
</script>

<style lang="less" scoped>
.course-side-title {
    height: 60px;
    box-sizing: border-box;
    border-bottom: 1px solid #39414b;
    display: flex;
    align-items: center;
    margin-left: 18px;
    margin-right: 18px;
    .icon {
        width: 4px;
        height: 14px;
        background: #ff2e30;
        border-radius: 2px;
        margin-right: 6px;
    }
    .title {
        height: 35px;
        font-size: 16px;
        font-family: MicrosoftYaHei, MicrosoftYaHei-Bold;
        font-weight: 700;
        color: #ffffff;
        line-height: 35px;
    }
}
</style>
