<template>
    <div :style="getStyle" :id="'warp' + componentId">
        <div style="width: 100%; height: 100%" :id="componentId"></div>
        <slot name="mask"></slot>
        <slot name="comment"></slot>
        <slot name="commentPop"></slot>
        <slot name="comment_min"></slot>
    </div>
</template>

<script>
import '@/api/api..query-open-play-sign.js';
import '@/api/api..query-quest-play-token.js';
var api;
// 各浏览器全屏接口
var apis = [
    {
        enabled: 'fullscreenEnabled',
        element: 'fullscreenElement',
        request: 'requestFullscreen',
        exit: 'exitFullscreen',
        events: {
            change: 'fullscreenchange',
            error: 'fullscreenerror',
        },
    },
    {
        enabled: 'webkitFullscreenEnabled',
        element: 'webkitCurrentFullScreenElement',
        request: 'webkitRequestFullscreen',
        exit: 'webkitExitFullscreen',
        events: {
            change: 'webkitfullscreenchange',
            error: 'webkitfullscreenerror',
        },
    },
    {
        enabled: 'mozFullScreenEnabled',
        element: 'mozFullScreenElement',
        request: 'mozRequestFullScreen',
        exit: 'mozCancelFullScreen',
        events: {
            change: 'mozfullscreenchange',
            error: 'mozfullscreenerror',
        },
    },
    {
        enabled: 'msFullscreenEnabled',
        element: 'msFullscreenElement',
        request: 'msRequestFullscreen',
        exit: 'msExitFullscreen',
        events: {
            change: 'MSFullscreenChange',
            error: 'MSFullscreenError',
        },
    },
];
//获取具体浏览器全屏api，如果没有找到对应api代表浏览器不支持fullscreen api
if (typeof window !== 'undefined')
    for (var i in apis) {
        if (apis[i].enabled in document) {
            api = apis[i];
            break;
        }
    }

var request = function (el) {
    // 支持全屏就进入系统全屏，不支持则页面全屏
    if (api) {
        (el || document)[api.request]();
    } else {
        wrap.classList.add('full');
    }
};
// 需要全屏的元素
var wrap = null;

var exit = function () {
    // 支持全屏就退出系统全屏，不支持则退出页面全屏
    if (api) {
        document[api.exit]();
    } else {
        wrap.classList.remove('full');
    }
};

export default {
    name: 'polyv-video',
    props: {
        isOverflow: {
            type: Boolean,
            default: false,
        },
        resourceId: {
            type: String,
            default: '',
        },
        questionId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            componentId: '',
            isTokenError: false, // 获取token是否有错
            tokenError: null, // 错误对象
        };
    },
    instance: null,
    computed: {
        getStyle() {
            let style = {
                width: '100%',
                height: '100%',
                position: 'relative',
            };
            if (this.isOverflow) {
                style.overflow = 'hidden';
            }
            return style;
        },
    },
    mounted() {
        let vm = this;
        vm.componentId = 'vb-video-' + this.$DateUtil.getUUID();
        var changeRateCb = function (instance, currentRate) {
            instance.realPlayVideoRateTime = (PlayReturn.realPlayVideoTime() - instance.recordPrevDate) * instance.prevRate + instance.realPlayVideoRateTime;
            instance.recordPrevDate = PlayReturn.realPlayVideoTime();
            vm.instance.firstRcord = false;
            instance.prevRate = currentRate;
        };
        let PlayReturn = {
            changeVid(param, isErrCatch = true) {
                return new Promise((resolve, reject) => {
                    if (!param.videoId) {
                        reject('缺少参数vid');
                        return;
                    }
                    if (!param.type) {
                        reject('缺少参数type');
                        return;
                    }
                    const option = {
                        vid: param.videoId,
                        autoplay: true,
                        playsafe(vid, next) {},
                        ...param,
                    };
                    resolve(
                        vm.getOption(option, isErrCatch).then((option) => {
                            vm.instance.changeVid(option);
                        })
                    );
                });
            },
            isPlaying() {
                return vm.instance && vm.instance.isPlaying;
            },
            setVolume(num) {
                vm.instance && vm.instance.j2s_setVolume(num);
            },
            start(cb) {
                // eslint-disable-next-line nuxt/no-globals-in-created
                window.s2j_onPlayStart = function () {
                    vm.instance.isPlaying = true;
                    //开始播放事件
                    vm.instance.firstRcord = true;
                    vm.instance.realPlayVideoRateTime = 0;
                    vm.instance.recordPrevDate = PlayReturn.realPlayVideoTime();
                    vm.instance.prevRate = vm.instance.prevRate || 1;
                    // alert(1+vm.instance.flash);
                    // alert(2+vm.instance.HTML5);
                    let HTML5 = vm.instance.HTML5 || vm.instance.flash;
                    HTML5.on('changeRate', (rate, currentRate) => {
                        changeRateCb(vm.instance, currentRate);
                    });
                    HTML5.on('videoPause', () => {
                        vm.instance.isPlaying = false;
                    });
                    HTML5.on('videoPlay', () => {
                        vm.instance.isPlaying = true;
                    });
                    changeRateCb(vm.instance, vm.instance.prevRate);
                    cb();
                };
                window.s2j_onPlayerError = function (err, b) {
                    console.log('errr', err, b);
                };
                return PlayReturn;
            },
            over(cb) {
                //播放完成
                // eslint-disable-next-line nuxt/no-globals-in-created
                window.s2j_onPlayOver = cb;
                return PlayReturn;
            },
            getCurrentTime() {
                //获当前已播放的时间 秒，可循环访问
                return vm.instance.j2s_getCurrentTime();
            },
            getVideoLength() {
                //获取视频长度 秒数
                return vm.instance.j2s_getDuration();
            },
            realPlayVideoTime() {
                //获取视频正常播放总时长 秒数
                return vm.instance.j2s_realPlayVideoTime();
            },
            realPlayVideoRateTime() {
                //获取视频正常播放+倍速总时长 秒数
                let second = (PlayReturn.realPlayVideoTime() - vm.instance.recordPrevDate) * vm.instance.prevRate + vm.instance.realPlayVideoRateTime;
                return parseInt(second);
            },
            getUserPlayVidTime() {
                return (vm.historyUserPlayVidTime || 0) + vm.instance.j2s_realPlayVideoTime();
            },
            pauseVideo() {
                vm.instance.isPlaying = false;
                changeRateCb(vm.instance, vm.instance.prevRate);
                //暂停播放当前视频
                return vm.instance.j2s_pauseVideo();
            },
            resumeVideo() {
                vm.instance.isPlaying = true;
                vm.instance.recordPrevDate = PlayReturn.realPlayVideoTime();
                //恢复播放当前视频
                return vm.instance.j2s_resumeVideo();
            },
            stopVideo() {
                //停止播放当前视频，并显示结束画面
                return vm.instance.j2s_stopVideo();
            },
            seekVideo(second) {
                //JS控制播放器SEEK功能 ，函数名:j2s_seekVideo(_second)其中参数_second 为秒数
                return vm.instance.j2s_seekVideo(second);
            },
            getInstance() {
                return vm.instance;
            },
            getPlayerId() {
                return vm.componentId;
            },
            destroy() {
                return vm.instance && vm.instance.destroy();
            },
        };
        this.PlayReturn = PlayReturn;
        vm.ready();
        window.VideoManager = window.VideoManager || {
            pauseVideoAll: () => {
                //暂停页面内所有正在播放的视频
                this.PlayReturn.pauseVideo();
            },
            resumeVideoAll() {
                //恢复页面内需要播放的视频
            },
        };
        this.$nextTick(() => {
            wrap = document.getElementById('warp' + vm.componentId);
        });
        // 支持系统储全屏则监听全屏改变时间做样式处理
        if (api) {
            document.addEventListener(api.events.change, function () {
                if (document[api.element]) {
                    wrap.classList.add('full');
                } else {
                    wrap.classList.remove('full');
                    vm.$emit('isFullScreen', false);
                }
            });
        }

        // 点击全屏按钮的回调
        window.onFullscreenProxy = function (vid, fullScreen) {
            if (wrap.classList.contains('full')) {
                vm.$emit('isFullScreen', false);
                exit();
            } else {
                vm.$emit('isFullScreen', true);
                request(wrap);
            }
        };
    },
    beforeDestroy() {
        if (this.getUserPlayVidTimeTimer) {
            clearInterval(this.getUserPlayVidTimeTimer);
            this.getUserPlayVidTimeTimer = null;
        }
    },
    destroyed() {
        this.PlayReturn.destroy();
        this.$emit('afterDestory');
    },
    methods: {
        ready() {
            return new Promise((resolve, reject) => {
                this.$ResUtils.loadJs('//player.polyv.net/resp/vod-player-drm/canary/player.js', resolve, reject);
                // this.$ResUtils.loadJs('//demo.polyv.net/vincent/static/player-0619.js', resolve, reject);
            });
        },
        async playVid(vidObj = {}, option = {}, isErrCatch = true) {
            const vm = this;
            let user = await vm.$User.getUser();
            return Promise.resolve()
                .then(() => {
                    if (!vidObj.videoId) {
                        return Promise.reject('缺少参数vid');
                    }
                    $('#' + this.componentId).html('');
                    return this.ready();
                })
                .then(() => {
                    const userInfo = this.$storage.get('loginStatus') || {};
                    let tokenParams = {
                        vid: vidObj.videoId,
                        userYouLuNum: userInfo.userYoulunum,
                        userId: userInfo.userId,
                    };
                    // if (vm.questionId) {
                    //     tokenParams.type = 'Q';
                    //     tokenParams.bizId = vm.questionId;
                    // }
                    // if (vm.resourceId) {
                    //     tokenParams.type = 'R';
                    //     tokenParams.bizId = vm.resourceId;
                    // }

                    let option_ = {
                        wrap: `#${this.componentId}`,
                        width: '100%',
                        height: '100%',
                        vid: vidObj.videoId,
                        fullscreenProxy: false, //true添加该参数后点击全屏按钮播放器将不进入全屏，需要自行处理全屏
                        autoPlay: false,
                        ban_history_time: 'on',
                        hideSwitchPlayer: true, //隐藏H5和Flash播放器的切换按钮
                        code: user.userYoulunum, // 跑马灯键值
                        pbg: false,
                        playsafe(vid = '', next) {
                            console.log(vid, '@@');
                            vm.getPlaySign(vidObj.videoId).then((signRes) => {
                                tokenParams = {
                                    ...tokenParams,
                                    ...signRes,
                                };
                                vm.$callApi('cc/query-quest-play-token', {
                                    ...tokenParams,
                                    onsuccess: (res) => {
                                        next(res.token);
                                    },
                                    onerror: vm.$niceloo.api.handleFailure,
                                    oncomplete: () => {},
                                });
                            });
                        },
                        ...option,
                    };
                    return option_;
                })

                .then((res) => {
                    this.instance = polyvPlayer(res);
                    return this.PlayReturn;
                });
        },
        getPlaySign(vid) {
            const data = {
                url: 'cc/query-open-play-sign',
                params: {
                    vid,
                },
                isCustom: false,
            };
            return this.$httpClient(data).then((res) => {
                return res;
            });
        },
        getInstance() {
            return this.instance;
        },
    },
};
</script>
<style lang="less" scoped>
.mask {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background: rgba(0, 0, 0, 0.5);
}
</style>
