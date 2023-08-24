<script lang="jsx">
import { mapState, mapMutations } from 'vuex';
import AuditionStationMapView from '../audition-station-map-view/index.vue';
import VideoView from '@/www/components/components/video-view/index.vue';
import '@/api/fs/api.FS2001.query-polyv-token.js';
import '@/api/api..query-video-info.js';
export default {
    name: 'AuditionVideoView',
    components: {
        vFragment: {
            functional: true,
            /**
             *
             * @param {Function} h 虚拟dom方法
             * @param {object} context 上下文对象
             * @returns {object} 虚拟dom对象
             */
            render(h, context) {
                const slots = context.slots();
                return Object.keys(slots).map((k) => {
                    return slots[k];
                });
            },
        },
    },
    /**
     * @returns {object} 默认值
     */
    data() {
        return {
            videoPromise: null,
            videoPromiseResolve: () => {},

            token: '',
            playIntance: null,

            vHeight: 0,
            vWidth: 0,
            sceenStatus: false, // 是否已经计算过视频高度

            showQuickTip: false,
            isMouseMove: false,
            timer: null,

            first: false,
        };
    },
    computed: {
        ...mapState('audition/info', {
            coursewareOnlineurl: 'coursewareOnlineurl',
            coursewareId: 'coursewareId',
            isLogin: 'isLogin',
            userName: 'userName',
            classtypeId: 'classtypeId',
            isLoading: 'isLoading',
            courseName: 'courseName',
            fistCourseId: 'fistCourseId',
            lastCourseId: 'lastCourseId',
            projectId: 'projectId',
            division: 'division',
            coursewareName: 'coursewareName',
            playModuleName: 'playModuleName',

            pauseStatus: 'pauseStatus',
            resumeStatus: 'resumeStatus',
        }),
    },
    watch: {
        /**
         *
         * @param {boolean} val 是否登录
         * @param {boolean} oldVal 是否登录
         */
        isLogin(val, oldVal) {
            if (val === true && oldVal === false && this.coursewareOnlineurl) {
                this.getPlayToken();
            }
        },
        /**
         *
         * @param {number} val 菜单标识
         */
        division(val) {
            this.sceenStatus = false;
            this.computedVideoWrap();
        },
        /**
         *
         *  @param {number} val 是否开始播放标识
         *  @param {number} oldVal 是否开始播放标识
         */
        resumeStatus(val, oldVal) {
            if (val !== oldVal) {
                this.playIntance && this.playIntance.resumeVideo();
            }
        },
        /**
         *
         *  @param {number} val 是否开始播放标识
         *  @param {number} oldVal 是否开始播放标识
         */
        pauseStatus(val, oldVal) {
            if (val !== oldVal) {
                this.playIntance && this.playIntance.pauseVideo();
            }
        },
        coursewareOnlineurl: {
            /**
             * 监控视频播放id是否变化
             *
             * @param {string} val 当前播放vid
             * @param {string} oldVal 上次播放vid
             */
            handler(val, oldVal) {
                if (!val) {
                    return;
                }
                if (val !== oldVal && !oldVal) {
                    this[oldVal] = null;
                }
                if (this.sceenStatus === false) {
                    this.getVideoInfo();
                }
                if (this.isLogin === false) {
                    return;
                }
                this.getPlayToken();
            },
            immediate: true,
        },
    },
    /**
     *
     */
    beforeDestory() {
        this.playIntance && this.playIntance.destroy();

        this.playIntance = null;

        window.removeEventListener('resize', this.resizeWidth, true);
    },
    /**
     * 初始化内容
     */
    mounted() {
        window.addEventListener('resize', this.resizeWidth, true);
        this.resetPromise();
    },
    methods: {
        ...mapMutations('audition/info', {
            setCourseInfo: 'setCourseInfo',
            doPrev: 'doPrev',
            doNext: 'doNext',
        }),
        /**
         * 重置初始化内容
         */
        resetPromise() {
            this.videoPromise = new Promise((resolve) => {
                this.videoPromiseResolve = resolve;
            });
        },
        /**
         *
         */
        getPlayToken() {
            this.$callApi('fs/query-polyv-token', {
                videoId: this.coursewareOnlineurl,
                type: 'C',
                bizId: this.coursewareId,
            })
                .then((APIResponse) => {
                    const res = APIResponse.getData();
                    this[this.coursewareOnlineurl] = res.token;
                    this.videoPromise.then(this.playCourse);
                })
                .catch((err) => {
                    // this[this.coursewareOnlineurl] = '';
                    // this.videoPromise.then(this.playCourse);

                    // this.$niceloo.api.handleFailure(err);
                    console.log(err, '@@');
                });
        },
        /**
         * 视频初始化
         */
        videoReady() {
            this.videoPromiseResolve();
        },
        /**
         * 播放视频
         */
        playCourse() {
            if (!this[this.coursewareOnlineurl]) {
                return;
            }
            const playParams = {
                showHd: true,
                vid: this.coursewareOnlineurl,
                playsafe: this[this.coursewareOnlineurl],
                code: this.userName,
                speed: [2.5, 2, 1.5, 1.2, 0.8],
                fullscreenProxy: false,
            };
            if (this.playIntance === null) {
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
                        this.playIntance.start(() => {
                            this.setCourseInfo({
                                isPlaying: true,
                            });
                            this.trackData();
                        });
                    });
            } else {
                this.playIntance.changeVid(playParams);
                this.playIntance.start(() => {});
            }

            this.$yiguan.track('youlu_course_playing', {
                course_name: this.courseName,
                project_id: this.projectId,
                course_type: '系统课',
                play_type: '试听',
                courseware_module_name: this.playModuleName,
                section_name: this.coursewareName,
            });
        },
        /**
         *
         */
        trackData() {
            if (this.first === true) {
                return;
            }
            this.first = true;
            const track = {
                course_name: this.courseName, // 课程名称
                project_id: this.projectId, // 项目名称
                is_success: true,
                fail_reason: '',
            };
            this.$yiguan.track('youlu_course_listen', track);
        },
        /**
         *
         */
        getVideoInfo() {
            // 获取播放器课件信息
            this.$callApi('cc/query-video-info', {
                videoId: this.coursewareOnlineurl,
            })
                .then((APIResponse) => {
                    const res = APIResponse.getData();
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
                })
                .finally(() => {
                    setTimeout(() => {
                        this.setCourseInfo({
                            ifShowPlayer: true,
                        });
                    }, 60);
                });
        },
        /**
         *
         */
        resizeWidth() {
            this.sceenStatus = false;
            this.computedVideoWrap();
        },
        /**
         *
         */
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
            if (this.division === 1) {
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

            this.setCourseInfo({
                mainWidth: videoFinalWidth + horizontalInnerPaddingPlusBarWidth + catalogueWidth + horizontalOutterPadding,
                mainHeight: videoFinalHeight + verticalPadding + verticalOutterPadding,
            });
        },

        /**
         *
         */
        mouseMove() {
            this.isMouseMove = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.isMouseMove = false;
            }, 4000);
        },
        /**
         *
         */
        toggleQuickPlay() {
            this.isMouseMove = true;
            window.addEventListener('mousemove', this.mouseMove, false);
            this.showQuickTip = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.isMouseMove = false;
            }, 4000);
        },
        /**
         *
         */
        toggleQuickPlayout() {
            clearTimeout(this.timer);
            this.showQuickTip = false;
            window.removeEventListener('mousemove', this.mouseMove, false);
        },
    },
    /**
     * @returns {object} vue虚拟dom
     */
    render() {
        return (
            <div class="video-view" onMouseenter={this.toggleQuickPlay} onMouseleave={this.toggleQuickPlayout}>
                {this.isLogin === true && this.isLoading === true && <AuditionStationMapView type="loading-play" />}
                {this.isLogin === true && this.coursewareOnlineurl !== '' && this.isLoading === false && (
                    <VideoView ref="videoView" onReady={this.videoReady}>
                        <vFragment slot="mask">
                            {this.fistCourseId !== this.coursewareId && this.showQuickTip && (
                                <div
                                    class="prev"
                                    onClick={() => {
                                        this.doPrev();
                                    }}
                                >
                                    上一节
                                </div>
                            )}
                            {this.lastCourseId !== this.coursewareId && this.showQuickTip && (
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
                )}
                {this.isLoading === false && this.coursewareOnlineurl === '' && this.isLogin === true && (
                    <AuditionStationMapView
                        type="no-play"
                        btnHandle={{
                            fn: () => {
                                this.$PageUtil.href(`/pro-course/detail/${this.classtypeId}`);
                            },
                        }}
                    />
                )}
                {this.isLogin === false && this.isLoading === false && (
                    <AuditionStationMapView
                        type="login"
                        btnHandle={{
                            fn: () => {
                                this.$Promotion.setCLueInfo({
                                    url: location.href,
                                    pageName: document.title,
                                    projectId: this.projectId,
                                    originCode: 'xitongke',
                                    clueWaycode: 'yindao',
                                });
                                const regExtension = this.$Promotion.getClueExtensionInfo({
                                    clueWaycode: 'yindao',
                                    originCode: 'xitongke',
                                    pageName: this.courseName,
                                });

                                regExtension.clueFormdata = [
                                    {
                                        key: 'clueRemarks',
                                        value: '进入官网',
                                        desc: '该用户通过【系统课试听】',
                                    },
                                ];
                                this.$ylPlugin
                                    .showLoginModal(
                                        { clue: { regExtension, clueExtension: regExtension } },

                                        { pageName: document.title, entranceResource: '系统课-登录引导', courseType: '系统课', pageType: '试听专区页' }
                                    )
                                    .then((res) => {
                                        this.setCourseInfo({
                                            isLogin: true,
                                            userName: res.userDetail.userYoulunum,
                                            userAvatar: res.userDetail.userAvatar,
                                        });
                                    });
                            },
                        }}
                    />
                )}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.video-view {
    height: 100%;
    width: 100%;
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
