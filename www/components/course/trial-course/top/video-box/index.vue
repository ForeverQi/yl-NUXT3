<template>
    <div class="class-top-box">
        <img src="./asset/images/left.png" alt="" class="left-img" />
        <img src="./asset/images/right.png" alt="" class="right-img" />
        <div class="content">
            <div class="content-top flex jc-between ai-center">
                <p class="video-title">{{ courseware.coursewareName }}</p>
                <div class="back-box flex ai-center" @click="goback">
                    <img src="./asset/images/back.png" class="back-img" />
                    <button class="back-text">返回课程介绍</button>
                </div>
            </div>
            <div class="content-body">
                <div class="body-left">
                    <vb-video ref="vbVideo" v-if="showVideo" @ready="courseReady('player')" @isFullScreen="doFullScreen" :is-overflow="true">
                        <!--如果可以试听直接播放-->
                        <!--不可以试听的必须登录并且领取-->
                        <!-- 试听提示------ L:限时试听;N:不允许试听;F:整节试听-->
                        <div class="tip" slot="mask" v-if="isShowAuditionTip" :style="loginTipStyle">
                            <!--  L:限时试听;N:不允许试听;F:整节试听-->
                            <!--未结束-->
                            <template v-if="isEndAudition">试看已结束，领取后观看完整视频</template>
                            <template v-else-if="isShowAudition">试看本小节，领取后观看完整视频</template>
                            <template v-else-if="isShowAuditionPart">试看{{ courseware.coursewareAuditiontime }}分钟，领取后观看完整视频</template>
                            <!--播放结束-->
                            <button class="toLogin" @click="handleReceive">去{{ isFree ? '领取' : '领取' }}</button>
                            <button class="close" @click="handleClose"></button>
                        </div>
                        <div class="course-pic-wrapper" slot="mask" v-else-if="isShowPlaceholder">
                            <img class="course-pic" :src="coursePicpath" />
                            <p
                                class="course-play-norecord"
                                v-if="courseware.coursewareType === '2' && !courseware.coursewareOnlineplaypath && isEnd && islogin && drawStatus === 1"
                            >
                                <img class="course-play-icon" src="./asset/images/video_over.png" />
                                回放上传中，请等候...
                            </p>
                            <template v-else>
                                <button class="course-play course-playing live-room" @click="handleLivePlay" v-if="isLiving && isToday && drawStatus === 1">
                                    <img class="course-playing-icon" src="./asset/images/icon_living.gif" />
                                    <img class="course-playing-icon-hover" src="./asset/images/icon_living_hover.gif" />
                                    进入直播间
                                </button>
                                <button
                                    class="course-play course-playing live-start"
                                    @click="handleLivePlay"
                                    v-else-if="isLivingSoon && isToday && drawStatus === 1"
                                >
                                    <img class="course-playing-icon" src="./asset/images/icon_live.png" />
                                    <img class="course-playing-icon-hover" src="./asset/images/icon_live_hover.png" />
                                    即将开始
                                </button>
                                <button class="course-play" @click="handleLivePlay" v-else>
                                    <img class="course-play-icon course-play-icon-p" src="./asset/images/video_play.png" />
                                </button>
                            </template>
                        </div>
                    </vb-video>
                </div>
                <div :class="['body-right', isShowRelated ? 'body-right-flex' : '']">
                    <!-- 课程目录 -->
                    <menu-box
                        :list="courseLevel === '1' ? menuList : menuList2"
                        :type="courseLevel"
                        @play="handlePlay"
                        @freePopupShow="handleFreePopupShow"
                        @payPopupShow="handlePayPopupShow"
                    ></menu-box>
                    <!-- 免费单节 相关课程-->
                    <related-box v-if="isShowRelated" class="relate-wrapper"></related-box>
                </div>
            </div>
            <div class="content-footer flex ai-center jc-between">
                <p class="footer-title">{{ courseName }}</p>
                <video-feature-right :show.sync="isShowFeatureRight" ref="videoFeatureRight"></video-feature-right>
                <p class="attention-service-wrapper" v-if="drawStatus === 1 && hasAttention === false">
                    <!-- <span>关注服务号，开启上课提醒</span> -->
                    <button class="attention" @click="attentionService">关注服务号</button>
                </p>
            </div>
        </div>
        <pay-model ref="payModel" @freePopupShow="handleFreePopupShow" @payPopupShow="handlePayPopupShow"></pay-model>
        <sweep-yards-attention
            :show.sync="isShowSweepYardsAttention"
            position-type="点击体验课详情页-关注服务号浮窗"
            :user="user"
            @change-attention-status="handleAttentionStatus"
        ></sweep-yards-attention>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import { mapState } from 'vuex';
import videoFeatureRight from '../video-feature-right';
import menuBox from '../menu/menu-box';
import relatedBox from '../related-class';
import eccm from '../../js/mixin.js';
import payModel from '../../pay-model';
import vbVideo from '@/www/components/business/vbVideo/index.vue';
import SweepYardsAttention from '@/www/components/course/free-course/detail/sweep-yards-attention/index.vue';
import track from '@/www/components/course/trial-course/js/track.js';

export default {
    name: 'videoBoxModel',
    components: {
        menuBox,
        relatedBox,
        videoFeatureRight,
        vbVideo,
        payModel,
        SweepYardsAttention,
    },
    mixins: [eccm, track],
    props: {
        courseware: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            showVideo: true,
            isEndAudition: false,
            isShowService: false,
            shareImg: require('./asset/images/public_service.jpg'),
            hasAttention: false,
            isShowLoginTip: true,
            loginTipStyle: {
                bottom: '57px',
            },
            isShowFeatureRight: false,
            isShowPlaceholder: false,
            isShowSweepYardsAttention: false,
            user: {},
            islogin: false,
        };
    },
    fetch() {
        // 未登录和已登录未领取
        this.isShowPlaceholder = this.getIsShowPlaceHolder();
        this.isBind();
        this.isShowFeatureRight = this.drawStatus === 0;
        return this.getIsLogin().finally(() => {
            this.isShowFeatureRight = this.drawStatus === 0;
            this.isShowPlaceholder = this.getIsShowPlaceHolder();
            this.coursewareChange(this.courseware, {});
        });
    },
    computed: {
        ...mapState('trial-course/course', { experienceClass: 'experienceClass' }),
        drawStatus() {
            return this.experienceClass.drawStatus;
        },
        goodsId() {
            return this.experienceClass.goodsId;
        },
        courseName() {
            return this.experienceClass.courseName;
        },
        courseLevel() {
            return this.experienceClass.courseLevel;
        },
        menuList() {
            return this.experienceClass.catalogList.map((item) => item.coursewareList).flat(Number.POSITIVE_INFINITY);
        },
        menuList2() {
            return this.experienceClass.catalogList;
        },
        isShowAuditionTip() {
            // 如果是直播课或即将直播课
            if (this.courseware.coursewareType === '2' && (this.isLiving || this.isLivingSoon)) {
                console.error('isShowAuditionTip1');
                return false;
            }
            console.error('isShowAuditionTip2', this.isShowLoginTip, this.courseware.coursewareAuditionstatus);
            return this.isShowLoginTip && this.courseware.coursewareAuditionstatus !== 'N' && this.drawStatus === 0;
        },
        isShowAudition() {
            return this.courseware.coursewareAuditionstatus === 'F';
        },
        isShowAuditionPart() {
            return this.courseware.coursewareAuditionstatus === 'L';
        },
        isShowRelated() {
            return this.experienceClass.catalogList.map((item) => item.coursewareList).flat(Number.POSITIVE_INFINITY).length === 1;
        },
        coursewarePlayType() {
            // 课件类型(1:录播;2:直播;4:资料)
            if (this.courseware.coursewareType === '2') {
                // 直播中...
                if (Date.parse(this.courseware.coursewareEndtime) > Date.now()) {
                    return 'living';
                } else if (Date.parse(this.courseware.coursewareEndtime) <= Date.now() && this.courseware.coursewareOnlineplaypath) {
                    return 'living-record';
                } else if (Date.parse(this.courseware.coursewareEndtime) <= Date.now() && !this.courseware.coursewareOnlineplaypath) {
                    return 'living-norecord';
                } else if (this.courseware.coursewareOnlineplaypath) {
                    return 'living-record';
                }
            } else if (this.courseware.coursewareType === '1') {
                return 'record';
            } else if (this.courseware.coursewareType === '4') {
                return 'material';
            }
            console.error('coursewarePlayType');
            return '';
        },
        coursePicpath() {
            return this.experienceClass.coursePicpath;
        },
        isEnd() {
            return Date.parse(this.courseware.coursewareEndtime) < Date.now();
        },
        isLiving() {
            return Date.parse(this.courseware.coursewareStarttime) < Date.now() && Date.parse(this.courseware.coursewareEndtime) > Date.now();
        },
        isLivingSoon() {
            return Date.parse(this.courseware.coursewareStarttime) > Date.now();
        },
        isToday() {
            return (
                this.courseware.coursewareEndtime.substring(0, 10) === dayjs().format('YYYY-MM-DD') ||
                this.courseware.coursewareStarttime.substring(0, 10) === dayjs().format('YYYY-MM-DD')
            );
        },
    },
    watch: {
        courseware(newV, oldV) {
            if (!newV) {
                return;
            }
            this.isEndAudition = false;
            this.isChangeing = true;
            this.getIsLogin().finally(() => {
                this.coursewareChange(newV, oldV);
            });
        },
        drawStatus() {
            this.isBind();
            this.isShowLoginTip = !!this.drawStatus;
            if (this.drawStatus === 1 && this.courseware.coursewareAuditionstatus === 'L') {
                // 如果领取，试听状态下，调整试听的时间
                if (this.videoInstance) {
                    this.videoInstance.stopVideo();
                    this.videoInstance.destroy();
                    this.videoInstance = null;
                }
                this.courseReady();
            }
        },
    },
    methods: {
        coursewareChange(newV, oldV) {
            console.warn('courseware', newV, oldV);
            this.isShowPlaceholder = this.getIsShowPlaceHolder();
            this.isShowLoginTip = this.drawStatus === 0;

            // courseware.coursewareType === '2' && isEnd && islogin && drawStatus === 1
            if (this.validCanPlay() === false) {
                console.warn('不符合播放条件');
                if (oldV.coursewareAuditionstatus !== 'N' && this.videoInstance && this.drawStatus === 0) {
                    // this.videoInstance.stopVideo();
                    // this.videoInstance.destroy();
                    // this.videoInstance = null;
                    console.warn('销毁视频控件1');
                }
                this.videoScrollToIntoview();
                return;
            }

            // 如果2个视频ID是同一个，上一个播放结束，点击下一个是必须重新处理
            if (this.coursewarePrev && this.courseware.coursewareOnlineplaypath === this.coursewarePrev.coursewareOnlineplaypath && this.videoInstance) {
                this.videoInstance.stopVideo();
                this.videoInstance.destroy();
                this.videoInstance = null;
                console.warn('销毁视频控件2');
            }
            // 如果2个视频ID是同一个，上一个播放结束，点击下一个是必须重新处理

            if (this.videoInstance) {
                console.warn('切换视频');
                this.changeVideo();
            } else {
                console.warn('从新开始播放视频');
                this.courseReady();
            }
        },
        getIsLogin() {
            return ylPlugin.login.isLogined().then((isLogin) => {
                console.warn('getIsLogin', isLogin);
                this.islogin = isLogin;
            });
        },
        getIsShowPlaceHolder() {
            if (this.courseware.coursewareType === '2' && this.isLiving) {
                console.warn('getIsShowPlaceHolder-100');
                return true;
            } else if (this.courseware.coursewareType === '2' && this.isLivingSoon) {
                console.warn('getIsShowPlaceHolder-101');
                return true;
            } else if (this.courseware.coursewareAuditionstatus === 'N') {
                if (this.islogin === false) {
                    console.warn('getIsShowPlaceHolder-102');
                    return true;
                } else if (this.drawStatus === 0) {
                    console.warn('getIsShowPlaceHolder-103');
                    return true;
                } else if (this.isEnd && !this.courseware.coursewareOnlineplaypath) {
                    console.warn('getIsShowPlaceHolder-104');
                    return true;
                } else {
                    console.warn('getIsShowPlaceHolder-105');
                    return false;
                }
            } else if (this.courseware.coursewareAuditionstatus === 'L') {
                console.warn('getIsShowPlaceHolder-106');
                return false;
            } else if (this.courseware.coursewareAuditionstatus === 'F') {
                console.warn('getIsShowPlaceHolder-107');
                return false;
            } else {
                console.warn('getIsShowPlaceHolder-108');
                return false;
            }
        },
        isBind() {
            ylPlugin.login.getUser().then((user) => {
                if (!user) {
                    this.user = user;
                    return;
                }
                Promise.resolve(ylPlugin.login.isWx1PublicAccountSubscribedByUser(user))
                    .then((attention) => {
                        this.hasAttention = attention;
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            });
        },
        goback() {
            this.$parent.showVideoBox = false;
        },
        validCanPlay() {
            if (this.coursewarePlayType === 'living') {
                console.info('直播中');
                return false;
            } else if (this.coursewarePlayType === 'living-norecord') {
                console.info('直播结束没有回放');
                return false;
            } else if (this.coursewarePlayType === 'material') {
                console.info('资料');
                return false;
            } else if (this.islogin === false && this.courseware.coursewareAuditionstatus === 'N') {
                console.info('未登录不允许试听课件');
                return false;
            } else if (this.drawStatus === 0 && this.courseware.coursewareAuditionstatus === 'N') {
                console.info('未领取不允许试听课件');
                return false;
            }
            return true;
        },
        courseReady(from) {
            if (this.validCanPlay() === false) {
                return;
            }
            if (from === 'player') {
                console.warn('courseReady-player');
                return;
            }
            console.warn('courseReady', this.courseware.autoPlay);
            const vparam = { videoId: this.courseware.coursewareOnlineplaypath, type: 'C', bizId: this.courseware.coursewareId };
            const voption = {
                goodsId: this.goodsId,
                coursewareId: this.courseware.coursewareId,
                autoplay: this.courseware.autoPlay,
            };
            if (this.courseware.coursewareAuditionstatus === 'L' && this.drawStatus === 0) {
                voption.watchEndTime = this.courseware.coursewareAuditiontime * 60;
            }
            this.coursewarePrev = this.courseware;
            this.$refs.vbVideo
                .playVid(vparam, voption, false)
                .then((instance) => {
                    console.warn('播放视频');
                    (this.videoInstance = instance).start(() => {
                        this.isEndAudition = false;
                        console.log('start');
                    });
                    this.videoInstance.over((e) => {
                        !this.isChangeing && (this.isEndAudition = true);
                        this.isChangeing = false;
                        console.log('over', e, this.isChangeing);
                    });
                    this.videoScrollToIntoview();
                })
                .catch((err) => {
                    console.warn(err);
                    const er = err?.getDescription?.() || err;
                    if (er.indexOf('该课程已下架') >= 0) {
                        return new Promise((resolve, reject) => {
                            this.$baseUI.confirm({
                                title: '提示',
                                content: er,
                                confirmText: '返回【体验课】',
                                confirm: resolve,
                                cancel: reject,
                            });
                        }).then(() => {
                            window.open(`/trial-course/all/${this.experienceClass.projectSeoCode || 'all'}`, '_self');
                        });
                    } else {
                        this.$baseUI.alert(er);
                    }
                });
            this.$yiguan.track('youlu_course_playing', {
                course_name: this.experienceClass.courseName,
                project_id: this.experienceClass.projectId,
                course_type: '体验课',
                play_type: this.isShowAudition || this.isShowAuditionPart ? '试听' : '播放',
                courseware_module_name: this.courseware.parent ? this.courseware.parent.catalogName : '-',
                section_name: this.courseware.coursewareName,
            });
            // this.trackWebYouluCoursePlaying({
            //     course_name: this.experienceClass?.courseName ?? '',
            //     project_position: this.experienceClass?.projectId ?? '',
            //     subject_name: this.experienceClass?.subjectId ?? '',
            //     course_type: '体验课',
            //     paly_type: this.isShowAudition || this.isShowAuditionPart ? '试听' : '播放',
            //     section_name: this.courseware.coursewareName,
            //     section_duration: `${Math.floor(this.courseware.diffDateMinute / 0xe10)
            //         .toString()
            //         .padStart(2, '0')}:${Math.floor((this.courseware.diffDateMinute % 0xe10) / 0x3c)
            //         .toString()
            //         .padStart(2, '0')}:${((this.courseware.diffDateMinute % 0xe10) % 0x3c).toString().padStart(2, '0')}`,
            // });
        },
        videoScrollToIntoview() {
            console.warn('滚动到可视区域');
            const selector = this.videoInstance ? `#${this.videoInstance.getPlayerId()}` : '.course-pic-wrapper';
            const vdom = document.querySelector(selector);
            vdom && vdom.scrollIntoView({ behavior: 'smooth', block: 'end' });
        },
        doFullScreen(type) {
            this.isFullScreen = type;
        },
        handlePlay(item) {
            console.log('videoBox', item);
            this.videoInstance && this.videoInstance.stopVideo();
            this.$emit('coursewareChange', item);
        },
        handleLogin() {
            this.ylLoginByPwd().catch((err) => {
                console.error(err);
            });
        },
        attentionService() {
            this.isShowSweepYardsAttention = true;
            this.trackWebYouluFollowUpServiceNumber({
                is_success: false,
                page_name: document.title,
                course_type: '体验课',
                project_id: this.experienceClass.projectId,
                // subject_name: this.experienceClass.subjectId,
                follow_timing: '点击体验课详情页-关注服务号浮窗',
            });
        },
        handleClose() {
            this.isShowLoginTip = false;
        },
        handleReceive() {
            if (this.isFree) {
                this.$refs.videoFeatureRight.handleGetFree('播放器试听引导【去领取】按钮', '体验课-试听引导');
            } else {
                this.$refs.videoFeatureRight.handleBuy('播放器试听引导【去领取】按钮', '体验课-试听引导');
            }
        },
        handleLivePlay() {
            console.warn('handleLivePlay');
            this.playVideo(this.courseware);
        },
        handleFreePopupShow(val) {
            console.warn('handleFreePopupShow', val);
            this.isShowFeatureRight = val;
        },
        handlePayPopupShow(val) {
            console.warn('handlePayPopupShow', val);
            this.isShowFeatureRight = val;
        },
        changeVideo() {
            this.isEndAudition = false;
            this.isChangeing = true;
            const voption = {
                videoId: this.courseware.coursewareOnlineplaypath,
                type: 'C',
                bizId: this.courseware.coursewareId,
                goodsId: this.goodsId,
                coursewareId: this.courseware.coursewareId,
            };
            if (this.courseware.coursewareAuditionstatus === 'L' && this.drawStatus === 0) {
                voption.watchEndTime = this.courseware.coursewareAuditiontime * 60;
            }
            this.coursewarePrev = this.courseware;
            console.warn('changeVideo', voption);
            this.videoInstance.changeVid(voption);
            this.videoScrollToIntoview();
        },
        refreshPlaceholder() {
            console.warn('refreshPlaceholder');
            return this.getIsLogin().finally(() => {
                this.isShowPlaceholder = this.getIsShowPlaceHolder();
            });
        },
        play() {
            console.warn('playplayplayplay');
            console.warn('this.isShowPlaceholder', this.isShowPlaceholder);
            console.warn('this.courseware', this.courseware);
            this.isShowPlaceholder = this.getIsShowPlaceHolder();
            if (this.isShowPlaceholder) {
                console.warn('playplayp1111', this.courseware);
                this.videoScrollToIntoview();
            } else if (this.videoInstance) {
                console.warn('this.videoInstance');
                if (this.coursewarePrev && this.coursewarePrev.coursewareOnlineplaypath !== this.courseware.coursewareOnlineplaypath) {
                    console.log('play--3333');
                    this.changeVideo();
                } else if (this.videoInstance.isPlaying()) {
                    console.log('play--正在播放中');
                    this.videoInstance.seekVideo(1);
                    this.videoInstance.resumeVideo();
                    this.videoScrollToIntoview();
                } else {
                    console.log('play--11111');
                    this.videoInstance.seekVideo(1);
                    this.videoInstance.resumeVideo();
                }
            } else {
                this.courseReady();
            }
        },
        handleAttentionStatus() {
            this.isBind();
        },
    },
};
</script>
<style lang="less" scoped>
.class-top-box {
    // width: 100vw;
    min-height: 650px;
    background-color: #0f0f1e;
    position: relative;
    display: flex;
    justify-content: center;
    .left-img {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 413px;
        height: 292px;
        z-index: 1;
    }
    .right-img {
        position: absolute;
        right: 0;
        top: 0;
        width: 459px;
        height: 354px;
        z-index: 1;
    }
    .content {
        width: 1200px;
        padding-bottom: 18px;
        z-index: 3;
        .content-top {
            width: 100%;
            height: 65px;
            padding-right: 12px;
            .video-title {
                font-size: 14px;
                line-height: 14px;
                color: #99a1af;
            }
            .back-box {
                cursor: pointer;
                .back-img {
                    display: block;
                    width: 16px;
                    height: 16px;
                    margin-right: 8px;
                }
                .back-text {
                    font-size: 14px;
                    line-height: 14px;
                    color: #99a1af;
                    background-color: transparent;
                }
            }
        }

        .content-body {
            width: 100%;
            height: 552px;
            background-color: #1c1d30;
            display: flex;
            .body-left {
                width: 884px;
                height: 100%;
                background-color: #eee;
                .tip {
                    position: absolute;
                    color: #ffffff;
                    font-size: 13px;
                    z-index: 20;
                    bottom: 51px;
                    left: 0;
                    height: 40px;
                    line-height: 40px;
                    padding-left: 16px;
                    padding-right: 23px;
                    background: rgba(0, 0, 0, 0.8);
                    border-radius: 0px 100px 100px 0px;

                    .toLogin {
                        color: #ff2e30;
                        margin-left: 10px;
                        cursor: pointer;
                        outline: none;
                        background-color: transparent;
                        font-size: 13px;
                    }

                    .close {
                        width: 18px;
                        height: 18px;
                        margin-left: 10px;
                        vertical-align: middle;
                        background-image: url('./asset/images/liveroomDetail_25.png');
                        background-size: contain;
                        background-color: transparent;
                    }
                }
                .course-pic-wrapper {
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 10;
                    .course-pic {
                        height: 100%;
                        width: 100%;
                    }
                    .course-play {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        border: none;
                        outline: none;
                        background-color: transparent;
                    }
                    .course-play-icon {
                        width: 60px;
                        height: 60px;
                    }

                    .course-play-icon-p {
                        width: 80px;
                        height: 80px;
                    }

                    .course-play-norecord {
                        background-color: rgba(0, 0, 0, 0.8);
                        color: white;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        .course-play-icon {
                            margin-bottom: 10px;
                        }
                    }
                    .course-playing {
                        border: 2px #ff2e30 solid;
                        border-radius: 5px;
                        color: #ff2e30;
                        background-color: rgba(42, 43, 46, 0.7);
                        display: flex;
                        align-items: center;
                        font-weight: bold;
                        padding: 16px 40px;
                        font-size: 16px;
                        cursor: pointer;
                    }

                    .course-playing:hover {
                        background-color: #ff2e30;
                        color: white;
                    }

                    .course-playing-icon,
                    .course-playing-icon-hover {
                        height: 20px;
                        margin-right: 15px;
                    }
                    .live-room .course-playing-icon-hover {
                        display: none;
                    }
                    .live-room .course-playing-icon {
                        display: inline;
                    }

                    .live-room:hover .course-playing-icon {
                        display: none;
                    }
                    .live-room:hover .course-playing-icon-hover {
                        display: inline;
                    }
                    .live-start .course-playing-icon-hover {
                        display: none;
                    }
                    .live-start .course-playing-icon {
                        display: inline;
                    }

                    .live-start:hover .course-playing-icon {
                        display: none;
                    }
                    .live-start:hover .course-playing-icon-hover {
                        display: inline;
                    }
                }
            }
            .body-right {
                width: calc(100% - 884px);
                height: 100%;
                overflow-y: auto;
            }
        }
        .content-footer {
            padding: 17px 16px;
            background-color: #1c1d30;
            min-height: 80px;
            box-sizing: border-box;
            .footer-title {
                height: 20px;
                line-height: 20px;
                font-size: 16px;
                color: #fcfbfb;
            }

            .attention-service-wrapper {
                background-image: url('./asset/images/public_service_bg.png');
                border-radius: 5px;
                color: #b8741a;
                padding: 11.5px 14px;
                font-size: 15px;
                background-size: 284px 56px;
                width: 256px;
                text-align: right;
                .attention {
                    color: #2c67d0;
                    font-size: 14px;
                    background: linear-gradient(to right, #ffffff, #bdcfef);
                    border-radius: 2px;
                    padding: 5px 10px;
                    margin-left: 15px;
                    outline: none;
                    border: none;
                }
            }
        }
    }
    .share-popup-footer {
        text-align: center;
        margin-top: 20px;
        font-size: 18px;
        font-weight: 500;
    }
    .share-popup-footer-desc {
        text-align: center;
        margin-top: 10px;
        font-size: 12px;
    }
}

.body-right-flex {
    display: flex;
    flex-direction: column;
}
.relate-wrapper {
    flex: 1;
    height: 0;
    /deep/.relate-class-list {
        height: calc(100% - 44px);
        overflow: auto;
    }
}
</style>
