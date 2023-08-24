<template>
    <div>
        <!-- 公共头部 -->
        <global-header :is-fixed="false" />
        <template v-if="onLine">
            <template v-if="liveCourse && isClassOnLine">
                <play-section @error="handleError"></play-section>
                <live-info @error="handleError"></live-info>
                <teacher-introduced></teacher-introduced>
            </template>
            <off-line v-if="!isClassOnLine"></off-line>
            <similar-good></similar-good>
            <hot-courses-card v-if="isShowHotCoursesCard" :project-id="projectId" class="hot-courses"></hot-courses-card>
        </template>
        <no-net v-else></no-net>
        <!-- 公共底部 -->
        <global-footer />
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import utilNiceloo from '@youlu/niceloo/libs/@xlib.01/lib/util/util._niceloo';
import GlobalHeader from '@/layouts/components/global-header/index.vue';
import GlobalFooter from '@/layouts/components/global-footer/index.vue';

import OffLine from '@/www/components/course/free-course/detail/off-line/index.vue';
import NoNet from '@/www/components/course/free-course/detail/no-net/index.vue';
import LiveInfo from '@/www/components/course/free-course/detail/open-info/index.vue';
import PlaySection from '@/www/components/course/free-course/detail/play-section/index.vue';
import TeacherIntroduced from '@/www/components/course/free-course/detail/teacher-introduced/index.vue';
import SimilarGood from '@/www/components/course/free-course/detail/open-similar/index.vue';
import HotCoursesCard from '@/www/components/components/hot-courses-card/index.vue';
import '@/api/mcp/api..query-liveCourse-web-detail.js';
import '@/api/ta/api.TA1027.applet-url.js';
import '@/api/ctc/api..query-project-detail.js';
import track from '@/www/components/course/free-course/js/track.js';

export default {
    name: 'OpenDetail',
    components: {
        GlobalHeader,
        GlobalFooter,
        LiveInfo,
        PlaySection,
        TeacherIntroduced,
        SimilarGood,
        HotCoursesCard,
        OffLine,
        NoNet,
    },
    mixins: [track],
    layout: 'nullLayout',
    data() {
        return {
            onLine: true,
            goodsId: this.$route.params.liveId,
            liveCourse: null,
            isClassOnLine: true,
            projectId: '',
            isShowHotCoursesCard: false,
            cLueInfo: {
                url: '',
                pageName: '',
                projectId: '',
                projectCode: '',
                projectSeocode: '',
                originCode: this.$nuxt.context.env.config.env === 'prod' ? 'ylgwzbk' : 'ylgwylgwzbk',
                clueWaycode: 'zbyl',
            },
        };
    },
    fetch() {
        this.evokeMp();
        return this.liveCourseDetail().catch(() => {});
    },
    head() {
        return this.$head({
            title: `${this.liveCourse ? this.liveCourse.goodsName + '_' : ''}优路教育`,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: `${this.liveCourse ? this.liveCourse.projectName + ',' : ''}${
                        this.liveCourse ? this.liveCourse.projectShortName + ',' : ''
                    }公开课,直播课,视频教程,培训课程,免费试听,优路,优路教育,优路教育网,在线教育,在线培训,职业教育,素质提升,技能提升`,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '',
                },
            ],
        });
    },
    mounted() {
        this.online = navigator.onLine;
        // 网络由异常到正常时触发
        window.addEventListener('onilne', this.updateOnlineStatus);
        // 网络由正常常到异常时触发
        window.addEventListener('offline', this.updateOnlineStatus);
    },
    beforeDestroy() {
        window.removeEventListener('online', this.updateOnlineStatus);
        window.removeEventListener('offline', this.updateOnlineStatus);
    },
    methods: {
        updateOnlineStatus(e) {
            const { type } = e;
            this.onLine = type === 'online';
        },
        ...mapMutations('open', ['setliveCourse', 'setProjectSeoCode', 'setProjectCode']),
        ...mapMutations('onlineService', { setOnlineServiceProjectCode: 'setProjectCode' }),
        evokeMp() {
            if (process.server) {
                return;
            }
            if (utilNiceloo.checkIfIsInsideYlApp() || this.$platform.isPC) {
                return;
            }
            // const url = `app/pages/weike/sub-pages/studio-pages/studio-detail/studio-detail?goodsId=${this.$route.params.liveId}`;
            // location.href = `${this.$nuxt.context.env.config.INVOKE_MP_URL}${encodeURIComponent(url)}`;
            location.href = `https://m.youlu.com/app/official/pages/course/public-detail/public-detail?goodsId=${this.$route.params.liveId}`;
        },
        liveCourseDetail() {
            return new Promise((resolve, reject) => {
                //直播课-详情
                this.$callApi('mcp/query-liveCourse-web-detail', {
                    goodsId: this.goodsId,
                    onsuccess: (res) => {
                        this.liveCourse = res;
                        this.projectId = res.projectId;
                        this.isShowHotCoursesCard = true;
                        this.setliveCourse(res);
                        this.isClassOnLine = true;
                        //线索
                        if (process.client) {
                            this.cLueInfo.url = window.location.href;
                            this.cLueInfo.projectId = res.projectId;
                            this.cLueInfo.pageName = res.goodsName + '_优路教育';
                            console.log('线索信息', this.cLueInfo);
                            this.$Promotion.setCLueInfo(this.cLueInfo);
                            this.trackPages();
                        }
                        resolve();
                    },
                    onerror: (err) => {
                        if (err.getAttachedData().getData().code === '4999') {
                            this.isClassOnLine = false;
                        }
                        this.isShowHotCoursesCard = true;
                        reject();
                    },
                });
            }).then(() => {
                return this.getProjectWebInfo();
            });
        },
        getProjectWebInfo() {
            return new Promise((resolve, reject) => {
                this.$callApi('ctc/query-project-detail', {
                    projectId: this.liveCourse.projectId,
                    onsuccess: (res) => {
                        this.setProjectSeoCode(res.projectSeoCode);
                        this.setProjectCode(res.projectCode);
                        this.setOnlineServiceProjectCode(res.projectSeoCode);
                        resolve();
                    },
                    onerror: () => {},
                });
            });
        },
        handleError(err) {
            if (err.code === '4999') {
                this.isClassOnLine = false;
            }
        },
        trackPages() {
            // this.t-rackWebYouluClickAllPages({
            //     page_type: '公开课详情页',
            //     page_name: this.liveCourse.goodsName + '优路教育',
            //     course_name: this.liveCourse.goodsName,
            //     course_type: '公开课',
            //     college_name: this.liveCourse.currentCollege,
            //     project_position: this.liveCourse.projectId,
            //     subject_name: '公开课',
            //     sort_name: '-',
            //     is_pay: false,
            //     course_price: 0,
            // });

            this.$yiguan.track('youlu_click_all_pages', {
                page_name: document.title, // 页面名称
                page_url: location.href,
                page_type: '资源详情页',
                course_type: '公开课',
                sort_name: '-',
                channel_name: '-',
                project_id: this.liveCourse.projectId ?? '-',
                subject_id: '-',
            });
        },
    },
};
</script>

<style scoped lang="less">
.hot-courses {
    margin-top: 32px;
}
</style>
