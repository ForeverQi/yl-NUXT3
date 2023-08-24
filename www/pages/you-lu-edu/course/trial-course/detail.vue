<template>
    <div class="experience-wrap">
        <!-- 公共头部 -->
        <global-header :is-fixed="false" />
        <div :class="['experience-class-box', isOnline ? '' : 'outLine']">
            <!-- 面包屑 -->
            <div class="bread-box" v-if="!showVideoBox && isOnline">
                <bread-crumb :list="navList" @click="handleBreadClick"></bread-crumb>
            </div>

            <no-net v-if="isNetErr"></no-net>
            <template v-else>
                <div class="banner-box" v-if="!showVideoBox && isOnline">
                    <!-- 课程宣传图 -->
                    <image-view :src="experienceClass.coverImg" type="banner" placeholder-width="30%" class="banner-img" v-if="experienceClass.coverImg" />
                    <div v-else class="banner-empty-img-wrapper"><img src="./asset/images/empty.png" class="banner-empty-img" /></div>
                </div>
                <!--课程特色、 按钮 -->
                <div class="feature-box" v-if="!showVideoBox && isOnline">
                    <class-feature @play="playVideo" :location="'吸顶横条【免费领取/立即购买】按钮'"></class-feature>
                    <div class="feature-top-arc"></div>
                    <div class="feature-bottom-arc"></div>
                </div>

                <!-- 吸顶 -->
                <!--<div class="copy-fix-div" v-if="showXiDingDiv && isOnline"></div>-->
                <div class="fix-top" v-if="showXiDingDiv && isOnline">
                    <div class="top-inner-box flex ai-center jc-between">
                        <!-- tab 切换 -->
                        <nav-box :tab-val.sync="tabVal" @item-click="handleNavClick"></nav-box>
                        <feature-right
                            :location="'吸顶横条【免费领取/立即购买】按钮'"
                            @play="playVideo"
                            @freePopupShow="handleFreePopupShowFeature"
                            @payPopupShow="handlePayPopupShowFeature"
                        ></feature-right>
                    </div>
                </div>

                <!-- 视频 -->
                <video-box
                    v-if="showVideoBox && isOnline"
                    :courseware="coursewarePlaying"
                    @coursewareChange="playVideo"
                    ref="videoBox"
                    @play="playVideo"
                    @freePopupShow="handleFreePopupShow"
                    @payPopupShow="handlePayPopupShow"
                ></video-box>

                <div class="content">
                    <!-- 课程介绍  -->
                    <content-left
                        @play="playVideo"
                        :online="isOnline"
                        :tab-val.sync="tabVal"
                        @freePopupShow="handleFreePopupShow"
                        @payPopupShow="handlePayPopupShow"
                    ></content-left>
                    <!-- 敲黑板、 教师、 同类好课 -->
                    <content-right :online="isOnline"></content-right>
                </div>
                <!-- 右侧浮窗 -->
                <!-- <fixed-right>
                <div v-if="isShowQrAttention" class="qr-wrapper" @click="handleShowQrClick">
                    <div class="qr-img-wrapper">
                        <img :src="course.qrcodeImage" class="qr-img" />
                    </div>
                    <p class="qr-tips" v-if="dialogContent1">{{ dialogContent1 }}</p>
                </div>
            </fixed-right> -->
                <free-get-class-popup
                    :show.sync="showQrPopup"
                    :share-img="qrcodeImage"
                    :title="dialogContent1"
                    :description="dialogContent2"
                ></free-get-class-popup>
            </template>
        </div>
        <!-- 公共底部 -->
        <global-footer />
        <side-fixed-section :page-show="true">
            <div v-if="isShowQrAttention" class="qr-wrapper" @click="handleShowQrClick">
                <div class="qr-img-wrapper">
                    <!-- <img :src="course.qrcodeImage" class="qr-img" /> -->
                    <image-view :src="experienceClass.qrcodeImage" type="banner" placeholder-width="30%" class="qr-img" />
                </div>
                <p class="qr-tips" v-if="dialogContent1">{{ dialogContent1 }}</p>
            </div>
        </side-fixed-section>
    </div>
</template>
<script>
import 'core-js/features/array/flat';
import { mapMutations, mapState } from 'vuex';
import utilNiceloo from '@youlu/niceloo/libs/@xlib.01/lib/util/util._niceloo';
import classFeature from '@/www/components/course/trial-course/class-feature';
import contentLeft from '@/www/components/course/trial-course/content-left';
import contentRight from '@/www/components/course/trial-course/content-right';
import navBox from '@/www/components/course/trial-course/left/nav-box';
import videoBox from '@/www/components/course/trial-course/top/video-box';
import featureRight from '@/www/components/course/trial-course/top/feature-right';
import freeGetClassPopup from '@/www/components/course/trial-course/free-get-class-popup';
import breadCrumb from '@/www/components/course/trial-course/bread-crumb';
import noNet from '@/www/components/course/trial-course/no-net';
import fixedRight from '@/www/components/course/trial-course/fixed-right';
import '@/api/mcu/api.MCU0001.mcp_trial_web_detail.js';
import '@/api/ctc/api..query-project-detail.js';
import '@/api/ta/api.TA1027.applet-url.js';
import SideFixedSection from '@/www/components/components/side-fixed-section/index.vue';
import GlobalHeader from '@/layouts/components/global-header/index.vue';
import GlobalFooter from '@/layouts/components/global-footer/index.vue';
import track from '@/www/components/course/trial-course/js/track.js';
import mixin from '@/www/components/course/trial-course/js/mixin.js';

export default {
    name: 'experienceClassModel',
    components: {
        breadCrumb,
        classFeature,
        contentLeft,
        contentRight,
        navBox,
        featureRight,
        videoBox,
        fixedRight,
        noNet,
        freeGetClassPopup,
        SideFixedSection,
        GlobalHeader,
        GlobalFooter,
    },
    mixins: [track, mixin],
    // provide() {
    //     return {
    //         experienceClass: this.course,
    //     };
    // },
    layout: 'nullLayout',
    data() {
        return {
            navList: [
                { name: '优路首页', url: '/', isRedirect: true },
                { name: '体验课', url: '/trial-course', isRedirect: true },
            ], //面包屑
            showVideoBox: false, //是否显示 视频组件
            showXiDingDiv: false, //是否吸顶
            tabVal: 1, // 课程介绍 课程目录
            coursewarePlaying: {},
            isNetErr: false,
            showQrPopup: false,
            online: true,
            bannerImgStyle: {
                backgroundImage: '',
            },
        };
    },
    fetch() {
        this.$platform.isClient() && this.ecCourseSetClueInfo();
        this.$platform.isClient() && window.addEventListener('online', this.watchOnlineStatus);
        this.$platform.isClient() && window.addEventListener('offline', this.watchOnlineStatus);
        this.$platform.isClient() && window.addEventListener('scroll', this.handleScroll);

        this.updateCourse({
            goodsId: this.$route.params.id,
        });
        this.scrollObserver();
        if (this.$platform?.isPC ?? true) {
            return this.mcpTrialWebDetail().then(() => {
                this.checkPayForm(); // 检查是否是从支付宝过来的
            });
        } else {
            this.evokeMp();
        }
        return Promise.resolve();
    },
    head() {
        return this.$head({
            title: this.pageTitle,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: `${this.experienceClass.projectName},${this.experienceClass.projectShortname},公开课,体验课,免费试听,课程,视频,视频教程,优路,优路教育,优路教育网,在线教育,在线培训,职业教育,素质提升,技能提升`,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '',
                },
            ],
        });
    },
    computed: {
        ...mapState('trial-course/course', { experienceClass: 'experienceClass' }),
        isOnline() {
            if (this.experienceClass.avlStatus === 'N') {
                return false;
            } else if (this.experienceClass.courseExpiredtime && Date.parse(this.experienceClass.courseExpiredtime) < Date.now()) {
                return false;
            }
            return this.online;
        },
        isShowQrAttention() {
            return this.experienceClass.flowAvlstatus === 'Y' && this.experienceClass.drawStatus === 1;
        },
        dialogContent1() {
            return this.experienceClass.dialogContent1;
        },
        dialogContent2() {
            return this.experienceClass.dialogContent2;
        },
        qrcodeImage() {
            return this.experienceClass.qrcodeImage;
        },
        pageTitle() {
            return `${this.experienceClass.courseName}${this.experienceClass.courseName ? '_' : ''}优路教育`;
        },
    },
    watch: {
        showVideoBox(newV) {
            if (newV === false) {
                this.$platform.isClient() &&
                    ylPlugin.login.getUser().then((user) => {
                        sessionStorage.removeItem(`${user?.userId}_playVideoId`);
                    });
            }
        },
    },
    destroyed() {
        this.$platform.isClient() && window.removeEventListener('online', this.watchOnlineStatus);
        this.$platform.isClient() && window.removeEventListener('offline', this.watchOnlineStatus);
        this.$platform.isClient() && window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        ...mapMutations('mcuStore', ['setProjectId', 'setPageName', 'setProjectName', 'setRemark']),
        ...mapMutations('onlineService', { setProjectCode: 'setProjectCode' }),
        ...mapMutations('trial-course/course', { updateCourseWare: 'updateCourseWare', updateCourse: 'updateCourse' }),
        requestWrapper(url, params = {}) {
            return this.$callApi(url, params).then((res) => res.getData());
        },
        handleScroll() {
            const dm = document.querySelector('.feature-model') || document.querySelector('.content-left .tab-box');
            if (dm) {
                const rect = dm.getBoundingClientRect();
                this.showXiDingDiv = rect.top < -60;
            }
        },
        checkPayForm() {
            if (typeof this.$route.query.isPay !== 'undefined') {
                this.showQrPopup = !!this.qrcodeImage && this.isShowQrAttention;
                history.pushState({ key: Date.now().toFixed(3) }, '', `?`);
            }
        },
        watchOnlineStatus(ev) {
            this.isNetErr = ev.type === 'offline';
        },
        scrollObserver() {
            // const intersectionObserver = new IntersectionObserver(
            //     (entries) => {
            //         if (entries.length < 1) {
            //             return;
            //         }
            //         if (entries[0].boundingClientRect.y < 0) {
            //             this.showXiDingDiv = entries[0].isIntersecting === false;
            //         } else {
            //             this.showXiDingDiv = false;
            //         }
            //     },
            //     { threshold: 1 }
            // );
            // intersectionObserver.observe(document.querySelector('.tab-box'));
        },
        playVideo(item) {
            console.log(item, '播放的视频');
            this.showVideoBox = true;
            if (this.coursewarePlaying === item && this.$refs.videoBox) {
                this.$refs.videoBox.refreshPlaceholder().then(() => {
                    this.$refs.videoBox.play();
                });
            }
            this.coursewarePlaying = item;
            this.$platform.isClient() &&
                ylPlugin.login.getUser().then((user) => {
                    sessionStorage.setItem(`${user?.userId}_playVideoId`, item.coursewareId);
                });
        },
        mcpTrialWebDetail() {
            return this.requestWrapper('experience/mcp_trial_web_detail', {
                goodsId: this.experienceClass.goodsId,
            })
                .then(async (res) => {
                    this.isNetErr = false;
                    this.setProjectId(res.projectId);
                    this.setProjectName(res.projectName);
                    this.setPageName(`[体验课]${res.courseName}`);
                    this.setRemark(`【体验课】${res.courseName}`);

                    res.qrcodeImage = this.$urlUtils.getViewUrl(res.qrcodeImage);
                    res.coverImg = this.$urlUtils.getViewUrl(res.coverImg);
                    res.posterImg = this.$urlUtils.getViewUrl(res.posterImg);
                    res.coursePicpath = this.$urlUtils.getViewUrl(res.coursePicpath);

                    const user = this.$platform.isClient() ? await ylPlugin.login.getUser() : undefined;
                    const coursewareId = this.$platform.isClient() ? sessionStorage.getItem(`${user?.userId}_playVideoId`) : undefined;
                    let previousVideo;

                    res.catalogList = res.catalogList.filter((item) => item.catalogShowstatus === 'Y');
                    res.catalogList.forEach((item, index) => {
                        item.isExpand = index === 0;
                        item.coursewareList = item.coursewareList.filter((citem) => citem.coursewareShowstatus === 'Y');
                        item.coursewareList.forEach((citem) => {
                            citem.isPlaying = false;
                            citem.autoPlay = true;
                            previousVideo === undefined && res.drawStatus === 1 && (previousVideo = citem);
                            if (!previousVideo && coursewareId === citem.coursewareId) {
                                citem.parent = item;
                                previousVideo = citem;
                            }
                        });
                        item.isVideoExpand = item.coursewareList.some((citem) => citem === previousVideo);
                    });

                    res.teacherList.forEach((item) => {
                        if (item.teacherImage) {
                            item.teacherImage = this.$urlUtils.getViewUrl(item.teacherImage);
                        }
                    });
                    res.localCurrentTime = Date.now();
                    this.updateCourse(res);
                    this.bannerImgStyle.backgroundImage = `url(${this.experienceClass.coverImg})`;

                    this.navList.splice(2, 1, {
                        name: this.experienceClass.courseName,
                        url: '',
                    });

                    if ((coursewareId || res.drawStatus === 1) && previousVideo) {
                        this.updateCourseWare({
                            coursewareId: previousVideo.coursewareId,
                            isPlaying: true,
                        });
                        this.playVideo(previousVideo);
                    }
                    return this.getProjectWebInfo(this.experienceClass.projectId);
                })
                .catch((err) => {
                    console.warn(err);
                    if (err.getAttachedData().getData().code === '4999') {
                        console.warn(err, 101);
                        this.online = false;
                    } else if (err.getAttachedData().getData().code === '1003') {
                        console.warn(err, 101);
                        this.online = false;
                    } else {
                        console.warn(err, 102);
                        this.isNetErr = true;
                    }
                });
        },
        getProjectWebInfo(projectId) {
            return this.requestWrapper('ctc/query-project-detail', {
                projectId,
            })
                .then(({ projectSeoCode, projectCode, projectName, projectShortname }) => {
                    this.navList.forEach((item) => {
                        if (item.name === '体验课') {
                            item.url = `/trial-course/all/${projectSeoCode}`;
                        }
                    });
                    this.updateCourse({
                        projectSeoCode,
                        projectCode,
                        projectName,
                        projectShortname,
                    });
                    this.$platform.isClient() && this.ecCourseSetClueInfo();
                    this.trackPages();
                })
                .catch((err) => {
                    console.warn(err);
                });
        },
        ecCourseSetClueInfo() {
            const { projectId, projectCode, projectSeoCode } = this.experienceClass;
            this.$Promotion.setCLueInfo({
                projectId: projectCode ? '' : projectId,
                projectCode,
                projectSeocode: projectCode ? '' : projectSeoCode,
                originCode: 'ylgwtiyanke',
                clueWaycode: 'xsylk',
                pageName: this.pageTitle,
                url: location.href,
            });
        },
        handleBreadClick(item) {
            this.$platform.isClient() && item.isRedirect && window.open(item.url, '_self');
        },
        handleShowQrClick() {
            this.showQrPopup = true;
        },
        handleFreePopupShow(val) {
            this.$refs.videoBox && this.$refs.videoBox.handleFreePopupShow(val);
        },
        handlePayPopupShow(val) {
            this.$refs.videoBox && this.$refs.videoBox.handlePayPopupShow(val);
        },
        evokeMp() {
            if (utilNiceloo.checkIfIsInsideYlApp()) {
                return;
            }
            // const url = `app/pages/weike/sub-pages/experience-course-pages/experience-course-detail/experience-course-detail?goodsId=${this.course.goodsId}`;
            // location.href = `${this.$nuxt.context.env.config.INVOKE_MP_URL}${encodeURIComponent(url)}`;
            location.href = `https://m.youlu.com/app/official/pages/course/experience-detail/experience-detail?goodsId=${this.experienceClass.goodsId}`;
        },
        handleFreePopupShowFeature(val) {
            this.handleFreePopupShow(val);
            this.$refs.videoBox && this.$refs.videoBox.videoScrollToIntoview(val);
        },
        handlePayPopupShowFeature(val) {
            this.handlePayPopupShow(val);
            this.$refs.videoBox && this.$refs.videoBox.videoScrollToIntoview(val);
        },
        scrollToView(val) {
            if (val === 2) {
                scroll({
                    top: document.querySelector('#chapterDiv').offsetTop - 100,
                    behavior: 'smooth',
                });
            } else if (val === 1) {
                scroll({
                    top: 300,
                    behavior: 'smooth',
                });
            }
        },
        handleNavClick(val) {
            console.warn('handleNavClick--detail', val);
            this.scrollToView(val);
        },
        trackPages() {
            if (this.isPageTrack) {
                return;
            }
            this.isPageTrack = true;
            // this.t-rackWebYouluClickAllPages({
            //     page_type: '体验课详情页',
            //     page_name: this.pageTitle,
            //     course_name: this.experienceClass.courseName,
            //     course_type: '体验课',
            //     project_position: this.experienceClass?.projectId ?? '',
            //     subject_name: this.experienceClass?.subjectId ?? '',
            //     is_pay: this.isFree,
            //     course_price: this.price,
            // });

            this.$yiguan.track('youlu_click_all_pages', {
                page_name: document.title, // 页面名称
                page_url: location.href,
                page_type: '资源详情页',
                course_type: '体验课',
                sort_name: '-',
                channel_name: '-',
                project_id: this.experienceClass?.projectId ?? '-',
                subject_id: this.experienceClass?.subjectId ?? '-',
            });
        },
    },
};
</script>
<style lang="less" scoped>
.experience-wrap {
    // overflow-x: hidden;
}
.experience-class-box {
    // width: 100vw;
    position: relative;
    background-color: #f6f7f9;
    z-index: 20;
    .bread-box {
        width: 1200px;
        height: 43px;
        display: flex;
        align-items: center;
        z-index: 2;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -600px;
    }
    .banner-box {
        // width: 100vw;
        height: 440px;
        background-color: #bbb;
        margin-bottom: 64px;
        position: relative;
        overflow: hidden;
        .banner-img {
            display: block;
            height: 100%;
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
        }
    }
    .feature-box {
        width: 1200px;
        height: 128px;
        position: absolute;
        top: 376px;
        left: 50%;
        margin-left: -600px;
        background-color: #fff;
        border-radius: 16px;
        z-index: 5;
    }
    .feature-top-arc {
        position: absolute;
        top: 0;
        right: 400px;
        height: 45px;
        width: 200px;
        overflow: hidden;
        z-index: -1;
    }
    .feature-top-arc::after {
        content: ' ';
        display: inline-block;
        height: 200px;
        width: 200px;
        background-image: linear-gradient(to bottom, white, #f8f8f8);
        border-radius: 50%;
        position: absolute;
        top: -155px;
    }
    .feature-bottom-arc {
        position: absolute;
        bottom: 0;
        right: 300px;
        height: 45px;
        width: 200px;
        overflow: hidden;
        z-index: -1;
    }
    .feature-bottom-arc::after {
        content: ' ';
        display: inline-block;
        height: 200px;
        width: 200px;
        background-image: linear-gradient(266deg, #f8f8f8, white);
        // background-color: red;
        border-radius: 50%;
        position: absolute;
        top: 0;
    }
    .video-box {
        width: 100vw;
        height: 713px;
    }
    .content {
        width: 1200px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin: 0 auto;
    }
    .fix-top {
        width: 100vw;
        height: 80px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        background-color: white;
        box-shadow: rgb(68 68 68 / 5%) 0px 4px 10px 0px;
        .top-inner-box {
            width: 1200px;
            height: 80px;
            margin: 0 auto 0;
        }
    }
    .copy-fix-div {
        width: 100vw;
        height: 200px;
    }
}
.outLine {
    /deep/ .content-right {
        padding-top: 15px;
    }
    /deep/ .bread-box {
        top: 15px !important;
    }
    /deep/ .bread-crumb-box {
        color: #a5acb7 !important;
        padding-left: 16px;
    }
    /deep/ .bread-item:last-child {
        color: #3a3d4b !important;
    }
}
.banner-empty-img {
    width: 30%;
}
.banner-empty-img-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ededee;
    height: 100%;
}

/deep/.qr-wrapper {
    text-align: center;
    position: fixed;
    z-index: 99;
    right: 0;
    top: -140px;
    z-index: 99;
    .qr-img-wrapper {
        background-image: url('./asset/images/qr_bg.png');
        width: 157px;
        height: 101.6px;
        background-size: contain;
        text-align: initial;
        padding-top: 2px;
    }
    .qr-img {
        width: 88px;
        height: 88px;
        margin: 1px 1px 10px 38px;
    }
    .qr-tips {
        background-image: linear-gradient(90deg, #ff6870, #f8323c);
        color: white;
        padding: 4px 15px;
        border-radius: 15px;
        border: 1px solid white;
        text-align: center;
        display: inline-block;
        margin: 0 auto;
        width: 172px;
        word-break: break-all;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
    }
}
</style>
