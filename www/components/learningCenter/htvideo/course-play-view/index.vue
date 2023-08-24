<script lang="jsx">
import { mapState, mapMutations } from 'vuex';
import dayjs from 'dayjs';
import '@/api/api..query-play-token-new.js';
import '@/api/api..query-video-info.js';
import VideoView from '@/www/components/components/video-view/index.vue';
import CourseChange from '@/www/components/learningCenter/htvideo/course-change/index.vue';
export default {
    name: 'CoursePlayView',
    components: {
        vFragment: {
            functional: true,
            render(h, context) {
                const slots = context.slots();
                return Object.keys(slots).map((k) => {
                    return slots[k];
                });
            },
        },
    },
    data() {
        return {
            videoPromise: null,
            videoPromiseResolve: () => {},
            playIntance: null, // 播放实例

            playPlaysafe: {},
            showQuickTip: false,

            isJumpQuestion: true,

            loading: null,

            isMouseMove: false,
            timer: null,

            vHeight: 0,
            vWidth: 0,
            sceenStatus: false, // 是否已经计算过视频高度
        };
    },
    computed: {
        ...mapState('course/division', {
            divisionType: 'type',
            aiParctice: 'aiParctice',
        }),
        ...mapState('course/info', {
            vid: 'vid',
            coursewareId: 'coursewareId',
            userName: 'userName',
            fistCourseId: 'fistCourseId', // 播放目录第一个视频课件
            lastCourseId: 'lastCourseId', // 播放目录最后一个视频课件
            showHandoutMax: 'showHandoutMax',

            enableStatus: 'enableStatus', // 智能学习
            interactionStatus: 'interactionStatus', // AI随堂练

            resumeStatus: 'resumeStatus', // 继续播放状态
            pauseStatus: 'pauseStatus', // 暂停播放状态

            lockStatus: 'lockStatus', // 模块解锁

            showMaxVideo: 'showMaxVideo',
            classId: 'classId',
        }),
    },
    watch: {
        vid: {
            handler(val, oldVal) {
                if (val && val !== oldVal) {
                    this.getPlayToken();
                }
            },
            immediate: true,
        },
        resumeStatus(val, oldVal) {
            if (val !== oldVal) {
                this.playIntance && this.playIntance.resumeVideo();
            }
        },
        pauseStatus(val, oldVal) {
            if (val !== oldVal) {
                this.playIntance && this.playIntance.pauseVideo();
            }
        },
        divisionType(val, oldVal) {
            if (val !== oldVal && (val === 0 || oldVal === 0)) {
                this.sceenStatus = false;
                this.$nextTick(() => {
                    this.computedVideoWrap();
                });
            }
        },
    },
    mounted() {
        window.addEventListener('resize', this.resizeWidth, true);
        this.videoPromise = new Promise((resolve) => {
            this.videoPromiseResolve = resolve;
        });
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeWidth, true);
    },
    methods: {
        ...mapMutations('course/info', {
            setCourseInfo: 'setCourseInfo',
            doPrev: 'doPrev',
            doNext: 'doNext',
        }),
        ...mapMutations('course/videoSize', {
            setPlayerSection: 'setPlayerSection',
        }),
        resizeWidth() {
            this.sceenStatus = false;
            this.computedVideoWrap();
        },
        realPlayVideoRateTime() {
            if (!this.playIntance) {
                return 0;
            } else {
                return this.playIntance.realPlayVideoRateTime();
            }
        },
        realPlayStatus() {
            if (!this.playIntance) {
                return null;
            } else {
                return this.playIntance.realPlayStatus();
            }
        },
        getPlayToken() {
            let data = {
                url: 'cc/query-play-token-new',
                params: {
                    videoId: this.vid,
                    classId: this.classId,
                    coursewareId: this.coursewareId,
                    iswxa: 0,
                },
                isCustom: false,
            };
            this.httpClient(data)
                .then((res) => {
                    this.playPlaysafe = res;
                })
                .finally(() => {
                    this.playCourse();
                });
            if (!this.sceenStatus) {
                this.getVideoInfo(); // 获取课件信息
            }
        },
        getVideoInfo() {
            // 获取播放器课件信息
            let data = {
                url: 'cc/query-video-info',
                params: {
                    videoId: this.vid,
                },
                isCustom: true,
            };
            this.httpClient(data).then((res) => {
                if (Array.isArray(res)) {
                    let obj = res[0];
                    if (obj.metaData) {
                        this.vHeight = obj.metaData.height ? obj.metaData.height : 0; // 视频高度
                        this.vWidth = obj.metaData.width ? obj.metaData.width : 0; // 视频宽度

                        this.$nextTick(() => {
                            this.computedVideoWrap();
                        });
                    }
                }
            });
        },
        computedVideoWrap() {
            if (this.vHeight <= 0 || this.sceenStatus) {
                this.sceenStatus = true;
                return;
            }

            this.sceenStatus = true;
            let horizontalOutterPadding = 2 * 40; // 水平外边距
            let horizontalInnerPaddingPlusBarWidth = 60 + 2 * 20; // 水平内边距 + 功能菜单
            let verticalOutterPadding = 2 * 25;
            let verticalPadding = 2 * 50;

            let catalogueWidth = 360; // 目录宽度
            if (this.divisionType === 0) {
                catalogueWidth = 0;
            }
            let height = document.querySelector('body').offsetHeight;
            let width = document.querySelector('body').offsetWidth;
            let videoMaxWidth = width - horizontalOutterPadding - horizontalInnerPaddingPlusBarWidth - catalogueWidth; // 显示区域宽度
            let videoMaxHeight = height - verticalPadding - verticalOutterPadding; // 显示区域高度

            let videoWidthHeightRatio = this.vWidth / this.vHeight;
            if (videoWidthHeightRatio > 1.8) {
                videoWidthHeightRatio = 1.8;
            } else if (videoWidthHeightRatio < 1.5) {
                videoWidthHeightRatio = 1.5;
            }

            let videoHeightKeepingRatio = videoMaxWidth / videoWidthHeightRatio;
            let videoFinalHeight = Math.min(videoHeightKeepingRatio, videoMaxHeight);
            let videoFinalWidth = videoFinalHeight * videoWidthHeightRatio;
            // let videoSectionObj = this.$el.parentElement.parentElement.parentElement.parentElement;
            // let videoSectionObj = this.$el.querySelector('.video-section');

            // videoSectionObj.style.width = videoFinalWidth + horizontalInnerPaddingPlusBarWidth + catalogueWidth + horizontalOutterPadding + 'px';
            // videoSectionObj.style.height = videoFinalHeight + verticalPadding + verticalOutterPadding + 'px';
            this.setPlayerSection({
                mainWidth: videoFinalWidth + horizontalInnerPaddingPlusBarWidth + catalogueWidth + horizontalOutterPadding,
                mainHeight: videoFinalHeight + verticalPadding + verticalOutterPadding,
            });
        },
        videoReady() {
            // 播放器组件初始化
            console.log('视频组件初始化');
            var vm = this;
            this.$ResUtils.loadJss(
                ['/_nuxt/coursePopSupport/ResizeSensor.js', '/_nuxt/coursePopSupport/PlayTimerUtil.js', '/_nuxt/coursePopSupport/CoursePopSupport.js'],
                function () {
                    CoursePopSupport.frameUrl = {
                        keyExamUrl: '/ccInteract/question', //打点做题地址
                        classReportUrl: '/ccInteract/practiceRecord', //随堂练习地址
                    };
                    //TODO  加载数据 初始化播放
                    vm.$emit('init');
                    vm.videoPromiseResolve();
                }
            );
        },
        playCourse() {
            this.videoPromise.then(() => {
                const playParams = {
                    showHd: true,
                    vid: this.vid,
                    playsafe: this.playPlaysafe.token,
                    code: this.userName,
                    pbg: false,
                    viewerInfo: {
                        viewerId: this.userName, // 观众ID
                        viewerName: this.userName, // 观众昵称
                    },
                    speed: [2.5, 2, 1.5, 1.2, 0.8],
                };
                if (this.playIntance === null) {
                    this.$refs.videoView &&
                        this.$refs.videoView.playVid &&
                        this.$refs.videoView
                            .playVid(playParams)
                            .then((intance) => {
                                intance.changePlayingStatus = (check) => {
                                    this.setCourseInfo({
                                        isPlaying: check,
                                    });
                                };
                                this.playIntance = intance;
                            })
                            .then(() => {
                                this.setCourseInfo({
                                    isReady: true,
                                    ifShowPlayer: true,
                                });
                                this.playIntance.start(() => {
                                    this.setCourseInfo({ playStartTime: dayjs().format('YYYY-MM-DD HH:mm:ss') });
                                    this.initCoursePopSupport();
                                    if (this.lockStatus === true) {
                                        this.playIntance.pauseVideo();
                                    }
                                    this.setCourseInfo({
                                        playStartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                    });
                                });
                                this.listenerOver();
                            });
                } else {
                    this.playIntance.changeVid(playParams);
                    this.playIntance.start(() => {
                        this.initCoursePopSupport();
                        if (this.lockStatus === true) {
                            this.playIntance.pauseVideo();
                        }

                        this.setCourseInfo({
                            playStartTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                        });
                    });
                    this.setCourseInfo({
                        ifShowPlayer: true,
                    });
                    this.listenerOver();
                }
            });
        },
        listenerOver() {
            this.playIntance.over((vid) => {
                if (vid !== this.vid) {
                    return;
                }
                // 开启了智能学习或者AI随堂练，主屏展示讲义，正在AI随堂练,不自动播放下一节
                if ((this.enableStatus === 'Y' || this.interactionStatus === 'Y') && this.showHandoutMax === true && this.aiParctice === true) {
                    this.playIntance.seekVideo(this.playIntance.getCurrentTime() - 1);
                    this.playIntance.pauseVideo();
                } else {
                    this.doNext();
                }
            });
        },
        initCoursePopSupport() {
            CoursePopSupport.init({
                coursewareId: this.coursewareId, //课程id;
                coursewareSourceid: null, //旧课件标识  如果init里只传了旧课件id 需要先转换新课件id
                player: this.playIntance,
                playerId: this.$refs.videoView.componentId,
                maxPlayerId: 'pr_video',
                isJumpQuestion: this.enableStatus === 'N' && this.interactionStatus === 'N',
                // videoId: playerId,
                changeStatus(status) {
                    this.$emit('changePopupQuestionStatus', status);
                },
            });
        },
        mouseMove(ev) {
            this.isMouseMove = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.isMouseMove = false;
            }, 4000);
        },
        toggleQuickPlay(ev) {
            this.isMouseMove = true;
            window.addEventListener('mousemove', this.mouseMove, false);
            this.showQuickTip = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.isMouseMove = false;
            }, 4000);
        },
        toggleQuickPlayout() {
            clearTimeout(this.timer);
            this.showQuickTip = false;
            window.removeEventListener('mousemove', this.mouseMove, false);
        },
        httpClient({ url, params = {}, isCustom = false }) {
            return this.$callApi(url, {
                ...params,
            }).then(
                (res) => {
                    return res.getData();
                },
                (err) => {
                    if (!isCustom) this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                }
            );
        },
    },
    render() {
        return (
            <div class="course-play-view" onMouseenter={this.toggleQuickPlay} onMouseleave={this.toggleQuickPlayout} ref="CoursePlayView">
                <VideoView
                    ref="videoView"
                    onReady={this.videoReady}
                    onIsFullScreen={(type) => {
                        this.setCourseInfo({
                            showMaxVideo: type,
                        });
                        CoursePopSupport.changeSection(type);
                    }}
                >
                    <vFragment slot="mask">
                        {this.divisionType === 2 && this.showMaxVideo === false && this.showHandoutMax === false && (
                            <div class="course-change-wrap">
                                <CourseChange />
                            </div>
                        )}
                        {this.showQuickTip &&
                            this.isMouseMove &&
                            this.fistCourseId &&
                            this.showHandoutMax === true &&
                            this.fistCourseId !== this.coursewareId && (
                                <div
                                    class="prev max"
                                    onClick={() => {
                                        this.doPrev();
                                    }}
                                ></div>
                            )}
                        {this.showQuickTip &&
                            this.isMouseMove &&
                            this.lastCourseId &&
                            this.showHandoutMax === true &&
                            this.lastCourseId !== this.coursewareId && (
                                <div
                                    class="next max"
                                    onClick={() => {
                                        this.doNext();
                                    }}
                                ></div>
                            )}
                        {this.showQuickTip &&
                            this.isMouseMove &&
                            this.fistCourseId &&
                            this.showHandoutMax === false &&
                            this.fistCourseId !== this.coursewareId && (
                                <div
                                    class="prev"
                                    onClick={() => {
                                        this.doPrev();
                                    }}
                                >
                                    上一节
                                </div>
                            )}
                        {this.showQuickTip &&
                            this.isMouseMove &&
                            this.lastCourseId &&
                            this.showHandoutMax === false &&
                            this.lastCourseId !== this.coursewareId && (
                                <div
                                    class="next"
                                    onClick={() => {
                                        this.doNext();
                                    }}
                                >
                                    下一节
                                </div>
                            )}
                    </vFragment>
                </VideoView>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.course-change-wrap {
    position: absolute;
    top: 36px;
    right: 20px;
    width: 76px;
    height: 76px;
    z-index: 10;
}
.course-play-view {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;

    /deep/ .pv-progress-bg {
        background-color: rgb(44 44 44 / 35%);
    }

    /deep/ .pv-progress-buffer {
        background-color: rgb(64 64 64 / 35%);
    }
}
.prev {
    position: absolute;
    width: 60px;
    height: 92px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    color: #77798d;
    line-height: 21px;
    letter-spacing: -0.1px;
    top: 50%;
    left: 19px;
    transform: translateY(-50%);
    z-index: 30;
    box-sizing: border-box;
    padding-left: 22px;
    padding-right: 8px;
    background-image: url(./asset/images/left.png);
    background-repeat: no-repeat;
    background-size: 20px 20px;
    background-position: 0 center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &.max {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        padding-left: 0;
        left: 10px;
        background-image: url(./asset/images/min-left.png);
    }

    &:hover {
        color: #d2d4d5;
        background-image: url(./asset/images/left-y.png);

        &.max {
            background-image: url(./asset/images/min-left.png);
        }
    }
}
.next {
    position: absolute;
    width: 60px;
    height: 92px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    color: #77798d;
    line-height: 21px;
    letter-spacing: -0.1px;
    top: 50%;
    right: 19px;
    transform: translateY(-50%);
    z-index: 30;
    box-sizing: border-box;
    padding-right: 14px;
    padding-left: 15px;
    background-image: url(./asset/images/right.png);
    background-repeat: no-repeat;
    background-size: 20px 20px;
    background-position: 35px center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &.max {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        padding: 0;
        right: 10px;
        background-size: 100% 100%;
        background-position: center center;
        background-image: url(./asset/images/min-right.png);
    }

    &:hover {
        color: #d2d4d5;
        background-image: url(./asset/images/right-y.png);

        &.max {
            background-image: url(./asset/images/min-right.png);
        }
    }
}
</style>
