<template>
    <div class="live-content">
        <live-polyv
            v-if="coursewareVideoprividers === 'LP'"
            :courseware-live-path="coursewareLivePath"
            :class-id="classId"
            :courseware-id="coursewareId"
            :client-type="clientType"
        />
        <live-vhall
            v-else-if="coursewareVideoprividers === 'LV'"
            :courseware-live-path="coursewareLivePath"
            :client-type="clientType"
            :enterlocal-time2="enterlocalTime2"
            :enterlocal-time="enterlocalTime"
            :local-start-time="localStartTime"
            :local-end-time="localEndTime"
        />
        <live-bai-jia-yun
            v-else-if="coursewareVideoprividers === 'HC'"
            :courseware-live-path="coursewareLivePath"
            :client-type="clientType"
            :enterlocal-time2="enterlocalTime2"
            :enterlocal-time="enterlocalTime"
            :local-start-time="localStartTime"
            :local-end-time="localEndTime"
        />
    </div>
</template>
<script>
import LivePolyv from '../live-polyv/index.vue';
import LiveVhall from '../live-vhall/index.vue';
import LiveBaiJiaYun from '../live-baiJia-yun/index.vue';

export default {
    components: {
        LivePolyv,
        LiveVhall,
        LiveBaiJiaYun,
    },
    props: {
        // 直播班级ID
        classId: {
            type: String,
            default: '',
        },
        // 课件ID
        coursewareId: {
            type: String,
            default: '',
        },
        // 直播类型
        coursewareVideoprividers: {
            type: String,
            default: '',
        },
        // 直播播放
        coursewareLivePath: {
            type: String,
            default: '',
        },
        // 直播播放环境 web，app，小程序。M:移动端;P:PC客户端;W:Web端;H:H5;A:小程序， 客户端跟web端相同，h5，以app端为准
        clientType: {
            type: String,
            default: 'W',
        },
        enterlocalTime2: {
            type: String,
            default: '',
        },
        enterlocalTime: {
            type: Number,
            default: 0,
        },
        localStartTime: {
            type: Number,
            default: 0,
        },
        localEndTime: {
            type: Number,
            default: 0,
        },
    },
};
</script>
<style lang="less" scoped>
.live-content {
    width: 100%;
    height: 100%;
}
</style>
