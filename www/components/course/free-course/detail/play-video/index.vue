<template>
    <div class="play-video-section">
        <div class="paly-back">
            <!--未登录,不可试听 显示封面图-->
            <div
                class="goods-cover"
                :style="{ 'background-image': 'url(' + $urlUtils.getViewUrl(liveCourse.goodsCover) + ')' }"
                v-if="currentWareDto && currentWareDto.auditionStatus === 'N' && !isLogin"
            >
                <div class="status-wrap" @click="toLogin"></div>
            </div>
            <vb-video ref="vbVideo" v-else-if="showVideo" @ready="courseReady" @isFullScreen="doFullScreen" @afterDestory="videoRest" :is-overflow="true">
                <div
                    class="tip"
                    slot="mask"
                    v-if="isShowTip && !isLogin && currentWareDto && (currentWareDto.auditionStatus === 'L' || currentWareDto.auditionStatus === 'F')"
                >
                    <!--播放结束-->
                    <template v-if="isEndAudition">试看已结束，登录后观看完整视频</template>
                    <!--  L:限时试听;N:不允许试听;F:整节试听-->
                    <!--未结束-->
                    <template v-else-if="currentWareDto.auditionStatus === 'F'">试看本小节，登录后观看完整视频</template>
                    <template v-else-if="currentWareDto.auditionStatus === 'L'">试看{{ currentWareDto.auditionDuration }}分钟，登录后观看完整视频</template>
                    <span class="toLogin" @click="toLogin2">去登录</span>
                    <img src="./asset/images/close_tologin_tip.png" class="close" @click="isShowTip = false" />
                </div>
            </vb-video>
        </div>
        <div class="paly-back-list">
            <div class="course-catalogue">
                <span class="course-catalogue-left"></span>
                课程目录
                <span class="course-total">共{{ liveCourse.wareDtoList.length }}节</span>
            </div>
            <ul class="course-list">
                <li
                    v-for="item in liveCourse.wareDtoList"
                    :key="item.coursewareId"
                    :class="currentWareDto && liveCourse.wareDtoList.length !== 0 && currentWareDto.coursewareId === item.coursewareId ? 'active' : ''"
                    @click="switchPlayback(item)"
                >
                    <div class="course-item-name">{{ item.coursewareName }}</div>
                    <div>
                        <span class="course-item-time">总时长{{ timeForm(item.coursewareDuration) }}</span>
                        <span class="audition" v-if="!isLogin && (item.auditionStatus === 'L' || item.auditionStatus === 'F')">试听</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="course-play-name">{{ liveCourse.goodsName }}</div>
    </div>
</template>

<script>
import mixin from '../js/mixin.js';
import track from '@/www/components/course/free-course/js/track.js';
import vbVideo from '@/www/components/business/vbVideo/index.vue';
export default {
    name: 'PlayVideo',
    components: {
        vbVideo,
    },
    mixins: [mixin, track],
    props: {
        liveCourse: {
            type: Object,
            default: () => {},
        },
        isLogin: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isShowTip: true,
            isEndAudition: false, //试听是否结束  false未结束，true试听结束
            playPromise: null,
            playResolve: null,
            playReject: null,
            PlayReturn: null,
            showVideo: true,
            isFirst: true,
            currentWareDto: null, //当前播放的视频
        };
    },
    fetch() {
        if (this.$platform.isIE === true) {
            let str = '您的浏览器因版本较低或兼容问题无法播放视频，为了您的看课体验，请尝试切换其他浏览器 (谷歌、360、火狐) 或';
            str += '<a href="/compatibility" style="color: #f8323c">点击此处下载浏览器</a>';
            this.$baseUI
                .alert(str, '看课出错了!', {
                    isHtml: true,
                })
                .then(() => {
                    this.$PageUtil.href('/compatibility');
                });
        }
        //登录播放第一个课程
        return this.selectCourse();
    },
    watch: {
        currentWareDto() {
            console.log('初始话');
            if (process.client) {
                this.videoRest();
                this.changeVid();
                if (location.search.indexOf('coursewareId') !== -1) {
                    return;
                }
                this.currentWareDto &&
                    window.history.replaceState(
                        null,
                        null,
                        `/free-course/detail/${this.$route.params.liveId}?coursewareId=${this.currentWareDto.coursewareId}`
                    );
            }
        },
    },
    methods: {
        async selectCourse() {
            if (this.$route.query.coursewareId) {
                this.liveCourse.wareDtoList.forEach((item) => {
                    if (this.$route.query.coursewareId && item.coursewareId === this.$route.query.coursewareId) {
                        this.currentWareDto = item;
                    }
                });
            } else {
                this.currentWareDto = this.liveCourse.wareDtoList[0];
            }

            if (process.client) {
                await this.changeVid();
                this.currentWareDto &&
                    window.history.replaceState(
                        null,
                        null,
                        `/free-course/detail/${this.$route.params.liveId}?coursewareId=${this.currentWareDto.coursewareId}`
                    );
            }
        },
        videoRest() {
            // 视频组件销毁后重置
            this.isFirst = true;
            this.PlayReturn = null;
            this.playPromise = new Promise((resolve, reject) => {
                this.playResolve = resolve;
                this.playReject = reject;
            });
        },
        toLogin() {
            this.$emit('to-login');
        },
        toLogin2() {
            // 试听中的视频播放
            this.$emit('to-login2', '直播课-试听引导');
        },
        courseReady() {
            // 点播课组件初始化成功autoplay
            this.playResolve();
        },
        changeVid() {
            /*return new Promise((resolve, reject) => {});*/
            return this.playPromise.then(() => {
                this.doChangeVid();
            });
        },
        doChangeVid() {
            return new Promise((resolve, reject) => {
                this.isShowTip = true;
                this.isEndAudition = false;
                if (this.PlayReturn) {
                    this.trackCoursePlay();
                    this.PlayReturn.changeVid({
                        videoId: this.currentWareDto.coursewarePath,
                        type: 'C',
                        goodsId: this.$route.params.liveId,
                        coursewareId: this.currentWareDto.coursewareId,
                        autoplay: true,
                        volume: 0,
                        watchEndTime: !this.isLogin && this.currentWareDto.auditionStatus == 'L' ? this.currentWareDto.auditionDuration * 60 : null,
                    });
                } else if (this.isLogin || (this.currentWareDto && this.currentWareDto.auditionStatus !== 'N')) {
                    this.trackCoursePlay();
                    this.$nextTick(() => {
                        this.$refs.vbVideo
                            .playVid(
                                {
                                    videoId: this.currentWareDto.coursewarePath,
                                    type: 'P',
                                    bizId: '',
                                    autoplay: true,
                                    volume: 50,
                                },
                                {
                                    autoplay: true,
                                    goodsId: this.$route.params.liveId,
                                    coursewareId: this.currentWareDto.coursewareId,
                                    watchEndTime:
                                        !this.isLogin && this.currentWareDto.auditionStatus === 'L' ? this.currentWareDto.auditionDuration * 60 : null,
                                }
                            )
                            .then((instance) => {
                                (this.PlayReturn = instance).start(() => {
                                    if (this.isFirst) {
                                        this.isFirst = false;
                                        // instance.setVolume(0);
                                    }
                                });
                                this.PlayReturn.over(() => {
                                    //播放完触发
                                    this.isEndAudition = true;
                                    this.isShowTip = true;
                                });
                            })
                            .catch((err) => {
                                this.$baseUI.alert(err?.getDescription?.() || err || '请刷新重试');
                            });
                    });
                }
                resolve();
            });
        },
        doFullScreen(type) {
            this.isFullScreen = type;
            if (this.isFullScreen) {
                // window.onFullscreenProxy();
            }
        },
        async switchPlayback(item) {
            await this.getIsOffline(this.$route.params.liveId);
            // this.isClassOnLine 为false是直播失效，不做处理
            if (this.isClassOnLine) {
                let otherParams = '';
                if (location.search.indexOf('&') !== -1) {
                    const index = location.search.indexOf('&');
                    otherParams = location.search.substring(index, location.search.length);
                }
                let url = `/free-course/detail/${this.$route.params.liveId}?coursewareId=${this.currentWareDto.coursewareId}`;
                window.history.replaceState(null, null, otherParams ? `${url}${otherParams}` : url);

                if (item.auditionStatus === 'N') {
                    // 不能试听
                    if (this.isLogin) {
                        if (item.coursewareId === this.currentWareDto.coursewareId) {
                            return;
                        }
                        this.showVideo = false;
                        this.$nextTick(() => {
                            this.showVideo = true;
                            this.currentWareDto = item;
                        });
                    } else {
                        this.currentWareDto = item;
                        this.$emit('to-login2', '直播课-回放目录');
                    }
                } else {
                    if (item.coursewareId === this.currentWareDto.coursewareId) {
                        return;
                    }
                    this.showVideo = false;
                    this.$nextTick(() => {
                        this.currentWareDto = item;
                        this.showVideo = true;
                    });
                }
            }
        },
        toHMS(s) {
            if (!s || s <= 0) {
                return '0:0:0';
            }
            let second = s % 60;
            let minute = 0;
            let hour = 0;
            if (s > 3600) {
                minute = Math.floor((s / 60) % 60);
                hour = Math.floor(s / 3600);
                return `${hour}:${minute}:${second}`;
            } else {
                minute = Math.floor(s / 60);
                return `0:${minute}:${second}`;
            }
        },
        trackCoursePlay() {
            // let coursewareDuration = this.toHMS(this.currentWareDto.coursewareDuration);
            this.$yiguan.track('youlu_course_playing', {
                course_name: this.liveCourse.goodsName,
                project_id: this.liveCourse.projectId,
                course_type: '公开课',
                play_type: this.isLogin ? '播放' : '试听',
                courseware_module_name: '-',
                section_name: this.currentWareDto.coursewareName,
            });
            // this.trackWebYouluCoursePlaying({
            //     course_name: this.liveCourse.goodsName,
            //     project_position: this.liveCourse.projectId,
            //     subject_name: this.liveCourse.subjectId,
            //     course_type: '公开课',
            //     play_type: this.isLogin || this.currentWareDto.auditionStatus !== 'N' ? '播放' : '试听',
            //     section_name: this.currentWareDto.coursewareName,
            //     section_duration: coursewareDuration,
            // });
        },
    },
};
</script>

<style lang="less" scoped>
/*回放区*/
.play-video-section {
    background: #1c1d30;
    left: 0;
    right: 0;
    top: 65px;
    position: absolute;
    bottom: 18px;
    .paly-back-list {
        width: 316px;
        float: right;
        padding-left: 18px;
        padding-right: 16px;
        height: calc(100% - 50px);
        box-sizing: border-box;

        .course-catalogue {
            font-size: 16px;
            font-weight: 700;
            color: #ffffff;
            line-height: 57px;

            .course-catalogue-left {
                width: 3px;
                height: 16px;
                background: #ff2e30;
                border-radius: 1px;
                vertical-align: middle;
                display: inline-block;
                position: relative;
                top: -2px;
            }

            .course-total {
                font-size: 14px;
                text-align: left;
                color: #9698a2;
                float: right;
            }
        }

        .course-list {
            height: calc(100% - 57px);
            overflow: auto;

            li {
                background: #282943;
                border-radius: 2px;
                padding-left: 15px;
                padding-right: 15px;
                padding-top: 12px;
                margin-bottom: 16px;
                height: 93px;
                cursor: pointer;

                .course-item-name {
                    font-size: 14px;
                    font-weight: 400;
                    color: #ffffff;
                    line-height: 20px;
                    margin-bottom: 12px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }

                .course-item-time {
                    font-size: 13px;
                    color: #858898;
                    float: left;
                }

                .audition {
                    width: 44px;
                    height: 16px;
                    background: #ff2e30;
                    border-radius: 2px;
                    display: inline-block;
                    font-size: 12px;
                    text-align: center;
                    color: #ffffff;
                    line-height: 16px;
                    float: right;
                }
            }

            .active {
                background: #3f4060 url('./asset/images/course_play_checked.png') right bottom no-repeat;
                background-size: 56px 65px;
            }
        }
    }

    .course-play-name {
        font-size: 16px;
        color: #fcfbfb;
        line-height: 50px;
        padding-left: 16px;
    }
}
.paly-back {
    width: 884px;
    float: left;
    background-color: #fff0f0;
    height: calc(100% - 50px);
    position: relative;
    /*提示*/
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
        }

        .close {
            width: 18px;
            height: 18px;
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
        }
    }

    .goods-cover {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        cursor: pointer;
        background-size: cover;
        background-repeat: no-repeat;
    }
}
.status-wrap {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.6) url('./asset/images/play_video.png') no-repeat;
    background-size: 80px 80px;
    background-position: center;
}
</style>
