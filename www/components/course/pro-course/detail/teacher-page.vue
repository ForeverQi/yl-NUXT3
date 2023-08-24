<template>
    <div>
        <div v-for="(item, index) in teacherList" :key="index" class="teacher-item">
            <img v-if="item.teacherImage" :src="item.teacherImage | fileParse" :alt="item.userName" class="teacher-img" />
            <p class="teacher-name">{{ item.userName }}</p>
            <p v-if="item.course" class="teacher-identity">{{ item.course }}</p>
            <p v-if="item.teacherBrief" class="teacher-desc">
                {{ item.teacherBrief }}
            </p>
        </div>
    </div>
</template>

<script>
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';

export default {
    filters: {
        fileParse(url) {
            return niceloo.path.getServerFileViewPath(url);
        },
    },
    props: {
        teacherList: {
            type: Array,
            default: () => [],
        },
    },
    /*fetch() {
        return Promise.resolve();
    },*/
};
</script>

<style lang="less" scoped>
.teacher-item {
    padding-left: 370px;
    height: 300px;
    margin-bottom: 24px;
    background: url('./asset/images/bg2.png') no-repeat 0 0 #fff;
    border-radius: 16px;
    position: relative;
}

.teacher-img {
    max-width: 300px;
    max-height: 300px;
    position: absolute;
    left: 0;
    bottom: 0;
}

.teacher-name {
    padding-top: 46px;
    font-size: 26px;
    font-weight: bold;
    color: #242f3e;
    line-height: 35px;
}
.teacher-identity {
    margin-top: 13px;
    font-size: 16px;
    font-weight: bold;
    color: #3a3d4b;
    line-height: 25px;
}

.teacher-desc {
    width: 686px;
    height: 110px;
    overflow: hidden;
    padding-top: 46px;
    font-size: 14px;
    color: #77798d;
    line-height: 22px;
    position: relative;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;

    &::after {
        content: '';
        width: 32px;
        height: 4px;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 3px;
        position: absolute;
        left: 0;
        top: 36px;
    }
}
</style>
