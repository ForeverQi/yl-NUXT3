<template>
    <div :class="['experience-class-box', isOnline ? '' : 'outLine']">
        <!-- 面包屑 -->
        <div class="bread-box" v-if="!showVideoBox && isOnline">
            <bread-crumb :list="navList" @click="handleBreadClick"></bread-crumb>
        </div>

        <no-net v-if="isNetErr"></no-net>
        <template v-else>
            <div class="banner-box" v-if="!showVideoBox && isOnline">
                <!-- 课程宣传图 -->
                <div :style="bannerImgStyle" class="banner-img" />
                <!--课程特色、 按钮 -->
                <div class="feature-box">
                    <class-feature @play="playVideo"></class-feature>
                    <div class="feature-top-arc"></div>
                    <div class="feature-bottom-arc"></div>
                </div>
            </div>

            <!-- 吸顶 -->
            <!--<div class="copy-fix-div" v-if="showXiDingDiv && isOnline"></div>-->
            <div class="fix-top" v-if="showXiDingDiv && isOnline">
                <div class="top-inner-box flex ai-center jc-between">
                    <!-- tab 切换 -->
                    <nav-box :tab-val.sync="tabVal"></nav-box>
                    <feature-right @play="playVideo"></feature-right>
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
                <content-left @play="playVideo" :online="isOnline" :tab-val.sync="tabVal"></content-left>
                <!-- 敲黑板、 教师、 同类好课 -->
                <content-right :online="isOnline"></content-right>
            </div>
            <!-- 右侧浮窗 -->
            <fixed-right>
                <div v-if="isShowQrAttention" class="qr-wrapper" @click="handleShowQrClick">
                    <div class="qr-img-wrapper">
                        <img :src="course.qrcodeImage" class="qr-img" />
                    </div>
                    <p class="qr-tips" v-if="dialogContent1">{{ dialogContent1 }}</p>
                </div>
            </fixed-right>
        </template>
        <free-get-class-popup :show.sync="showQrPopup" :share-img="qrcodeImage" :title="dialogContent1" :description="dialogContent2"></free-get-class-popup>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import breadCrumb from '../components/breadCrumb/breadCrumb/index.vue';
import freeGetClassPopup from '../components/freeGetClassPopup/freeGetClassPopup/index.vue';
import classFeature from './components/classFeature/index.vue';
import contentLeft from './components/contentLeft/index.vue';
import contentRight from './components/contentRight/index.vue';
import navBox from './components/left/navBox/index.vue';
import videoBox from './components/top/videoBox/index.vue';
import featureRight from './components/top/featureRight/index.vue';
import { mcpTrialWebDetail } from './apis/index.js';
import noNet from '@/www/components/microClassUser/components/NoNet/index.vue';
import fixedRight from '@/www/components/microClassUser/components/fixedRight/index.vue';

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
    },
    provide() {
        return {
            experienceClass: this.course,
        };
    },
    data() {
        return {
            navList: [
                { name: '微课首页', url: '/agile-course', isRedirect: true },
                { name: '体验课', url: '/agile-course', isRedirect: false },
                { name: '体验课', url: '', isRedirect: false },
            ], //面包屑
            showVideoBox: false, //是否显示 视频组件
            showXiDingDiv: false, //是否吸顶
            tabVal: 1, // 课程介绍 课程目录
            course: {
                goodsId: '',
                catalogList: [],
                collectStatus: 0,
                courseName: '',
                coursePicpath: '',
                coursePrice: 0,
                coursePromotionprice: 0,
                coursePromotionendtime: '',
                coursePromotiontype: '',
                courseintroduceDetail: '',
                coursewareCount: 0,
                coverImg: '',
                dialogContent1: '',
                dialogContent2: '',
                dialogTitle: '',
                flowAvlstatus: '',
                lights: [],
                mailStatus: '',
                posterImg: '',
                projectName: '',
                qrcodeImage: '',
                qrcodeTitle: '',
                teacherList: [],
                courseLevel: 2,
                courseOpenstatus: '',
                courseType: '',
                drawStatus: '',
                courseExpiredtime: '',
                projectId: '',
                subjectId: '',
                avlStatus: 'Y',
                currentTime: 0,
                localCurrentTime: 0,
            },
            coursewarePlaying: {},
            isNetErr: false,
            showQrPopup: false,
            online: true,
            bannerImgStyle: {
                backgroundImage: '',
            },
        };
    },
    computed: {
        ...mapState('logout', ['islogin', 'userInfo']),
        isOnline() {
            console.log('isOnline');
            if (this.course.avlStatus === 'N') {
                return false;
            } else if (this.course.courseExpiredtime && Date.parse(this.course.courseExpiredtime) < Date.now()) {
                return false;
            }
            return this.online;
        },
        isShowQrAttention() {
            return this.course.flowAvlstatus === 'Y' && this.course.drawStatus === 1;
        },
        dialogContent1() {
            return this.course.dialogContent1;
        },
        dialogContent2() {
            return this.course.dialogContent2;
        },
        qrcodeImage() {
            return this.course.qrcodeImage;
        },
    },
    watch: {
        showVideoBox(newV) {
            if (newV === false) {
                sessionStorage.removeItem(`${this.userInfo?.userId}_playVideoId`);
            }
        },
    },
    created() {
        this.course.goodsId = this.$route.params.courseId || this.$route.query.goodsId;
    },
    mounted() {
        this.scrollObserver();
        this.mcpTrialWebDetail().then(() => {
            this.checkPayForm(); // 检查是否是从支付宝过来的
        });
        window.addEventListener('online', this.watchOnlineStatus);
        window.addEventListener('offline', this.watchOnlineStatus);
    },
    destroyed() {
        window.removeEventListener('online', this.watchOnlineStatus);
        window.removeEventListener('offline', this.watchOnlineStatus);
    },
    methods: {
        ...mapMutations('mcuStore', ['setProjectId', 'setPageName', 'setProjectName', 'setRemark']),
        checkPayForm() {
            if (typeof this.$route.query.isPay !== 'undefined') {
                this.showQrPopup = true;
                history.pushState({ key: Date.now().toFixed(3) }, '', `?`);
            }
        },
        watchOnlineStatus(ev) {
            console.warn('watchOnlineStatus', ev);
            this.isNetErr = ev.type === 'offline';
        },
        scrollObserver() {
            const intersectionObserver = new IntersectionObserver(
                (entries) => {
                    if (entries.length < 1) {
                        return;
                    }
                    console.log(entries[0]);
                    if (entries[0].boundingClientRect.y < 0) {
                        this.showXiDingDiv = entries[0].isIntersecting === false;
                    } else {
                        this.showXiDingDiv = false;
                    }
                },
                { threshold: 1 }
            );
            intersectionObserver.observe(document.querySelector('.tab-box'));
        },
        playVideo(item) {
            console.log(item, '播放的视频');
            this.showVideoBox = true;
            if (this.coursewarePlaying === item) {
                this.$refs.videoBox && this.$refs.videoBox.refreshPlaceholder();
                this.$refs.videoBox && this.$refs.videoBox.play();
            }
            this.coursewarePlaying = item;
            sessionStorage.setItem(`${this.userInfo?.userId}_playVideoId`, item.coursewareId);
        },
        mcpTrialWebDetail() {
            return mcpTrialWebDetail(
                this,
                {
                    goodsId: this.course.goodsId,
                },
                false
            )
                .then((res) => {
                    console.warn(res);
                    this.isNetErr = false;
                    this.setProjectId(res.projectId);
                    this.setProjectName(res.projectName);
                    this.setPageName(`[体验课]${res.courseName}`);
                    this.setRemark(`【体验课】${res.courseName}`);

                    res.qrcodeImage = this.$urlUtils.getViewUrl(res.qrcodeImage);
                    res.coverImg = this.$urlUtils.getViewUrl(res.coverImg);
                    res.posterImg = this.$urlUtils.getViewUrl(res.posterImg);
                    res.coursePicpath = this.$urlUtils.getViewUrl(res.coursePicpath);

                    const coursewareId = sessionStorage.getItem(`${this.userInfo?.userId}_playVideoId`);
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
                    // res.drawStatus = 0;
                    // console.warn('res.drawStatus', res);
                    res.localCurrentTime = Date.now();
                    Object.assign(this.course, res);
                    this.bannerImgStyle.backgroundImage = `url(${this.course.coverImg})`;

                    this.navList.pop();
                    this.navList.push({
                        name: this.course.courseName,
                        url: '',
                    });

                    if ((coursewareId || res.drawStatus === 1) && previousVideo) {
                        previousVideo.isPlaying = true;
                        this.playVideo(previousVideo);
                    }
                    console.log('this.course', this.course);
                })
                .catch((err) => {
                    err = err.getDescription();
                    console.warn(err);
                    if (err === '课程不存在') {
                        console.warn(err, 101);
                        this.online = false;
                    } else if (err && err.includes('未查询到商品信息')) {
                        console.warn(err, 101);
                        this.online = false;
                    } else {
                        console.warn(err, 102);
                        this.isNetErr = true;
                    }
                });
        },
        handleBreadClick(item) {
            item.isRedirect && window.open(item.url, '_self');
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
    },
};
</script>
<style lang="less" scoped>
.experience-class-box {
    // width: 100vw;
    position: relative;
    background-color: #f6f7f9;
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
        .banner-img {
            width: 100%;
            height: 100%;
            // background-repeat: no-repeat;
            background-size: auto 440px;
            background-position: center center;
        }
        .feature-box {
            width: 1200px;
            height: 128px;
            position: absolute;
            bottom: -64px;
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
        background-color: #fff;
        box-shadow: rgb(68 68 68 / 5%) 0px 4px 10px 0px;
        // box-shadow: rgb(146 157 154 / 30%) 0px 4px 10px 0px;
        .top-inner-box {
            width: 1200px;
            height: 80px;
            margin: 0 auto;
        }
    }
    .copy-fix-div {
        width: 100vw;
        height: 200px;
    }

    .qr-wrapper {
        text-align: center;
    }
    .qr-img-wrapper {
        background-image: url('./asset/images/qr_bg.png');
        width: 156px;
        height: 102.6px;
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
        background-image: linear-gradient(to right, #3a85fe, #025eff);
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
</style>
