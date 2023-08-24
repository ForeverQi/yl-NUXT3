<template>
    <div>
        <template v-if="onLine">
            <template v-if="liveCourse && isClassOnLine">
                <play-section :live-course="liveCourse"></play-section>
                <live-info @error="handleError"></live-info>
            </template>
            <template v-if="!isClassOnLine">
                <off-line></off-line>
            </template>
            <live-calendar :project-id="liveCourse ? liveCourse.projectId : ''"></live-calendar>
        </template>
        <no-net v-else></no-net>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import OffLine from '../components/OffLine/index.vue';
import LiveInfo from '../components/LiveInfo/index.vue';
import PlaySection from '../components/PlaySection/index.vue';
import { liveCourseWebDetail } from '../apis/index.js';
import NoNet from '@/www/components/microClassUser/components/NoNet/index.vue';
import LiveCalendar from '@/www/components/microClassUser/components/LiveCalendar/index.vue';

export default {
    name: 'Index',
    components: {
        PlaySection,
        LiveInfo,
        LiveCalendar,
        NoNet,
        OffLine,
    },
    provide() {
        return {
            copyliveCourse: () => this.liveCourse, //方法一：提供祖先组件的实例
        };
    },
    data() {
        return {
            onLine: true,
            goodsId: this.$route.params.liveId,
            liveCourse: null,
            isClassOnLine: true,
        };
    },
    computed: {
        ...mapState('mcuStore', ['liveUpdate']),
    },
    watch: {
        liveUpdate(val) {
            val && val === this.goodsId && this.liveCourseDetail();
        },
    },
    mounted() {
        this.online = navigator.onLine;
        this.$bus.$on('count-down', () => {
            this.liveCourse.courseStatus = 2;
        });
        this.liveCourseDetail();
        // 网络由异常到正常时触发
        window.addEventListener('online', this.updateOnlineStatus);
        // 网络由正常常到异常时触发
        window.addEventListener('offline', this.updateOnlineStatus);
    },
    beforeDestroy() {
        window.removeEventListener('online', this.updateOnlineStatus);
        window.removeEventListener('offline', this.updateOnlineStatus);
    },
    methods: {
        ...mapMutations('mcuStore', ['setProjectId', 'setPageName', 'setProjectName', 'setRemark']),
        updateOnlineStatus(e) {
            const { type } = e;
            this.onLine = type === 'online';
        },
        liveCourseDetail() {
            //直播课-详情
            return liveCourseWebDetail(this, {
                goodsId: this.goodsId,
            })
                .then((res) => {
                    this.setProjectId(res.projectId);
                    this.setProjectName(res.projectName);
                    this.setPageName(`[直播间]${res.goodsName}`);
                    this.setRemark(`【直播间】${res.goodsName}`);
                    res.wareDtoList = res.wareDtoList.map((r) => {
                        r.isUpdate = 1;
                        return r;
                    });
                    this.liveCourse = res;
                    this.isClassOnLine = true;
                })
                .catch((err) => {
                    if (err.getAttachedData().getData().code === '4999') {
                        this.isClassOnLine = false;
                    }
                });
        },
        handleError(err) {
            if (err.code === '4999') {
                this.isClassOnLine = false;
            }
        },
    },
};
</script>

<style scoped></style>
