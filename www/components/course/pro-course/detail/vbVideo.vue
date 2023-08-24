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
/*
 * @description 保利威视视频播放组件
 * @url https://dev.polyv.net/category/videoproduct/v-playerapi/
 * @prop {String} vid 保利威视视频id
 * @prop {String} option 播放器配置项
 * @emit 所有保利威视官方api文档中事件
 *     "s2j_onPlayerInitOver" 注册完毕
 *     "s2j_onReadyPlay" 初始化完毕
 *     "s2j_onPlayStart" 视频缓冲完毕开始播放
 *     "s2j_onPlayOver" 视频播放完毕
 *     "s2j_onVideoPlay" 视频启动
 *     "s2j_onVideoPause" 视频停止
 *     "s2j_onVideoSeek" 视频播放进度变化
 *     "s2j_onInteractionData" 触发弹题
 *     "s2j_onFullScreen" 全屏
 *     "s2j_onNormalScreen" 普屏
 *     "s2j_onPlayerError" error
 * @refs getInstance() 返回播放器实例
 * @refs init(vid, cb) 初始化播放器,传入vid,初始化完毕后调用回调函数
 * @refs 所有保利威视官方api文档中方法,调用方式为this.refs.vbVideo.getInstance().j2s_getCurrentTime()
 *     返回当前播放头的时间，例如视频时长120秒，播放头时间在20.5秒，则返回20.5；页面javascript可不断轮询此播放时间，配合后面暂停/播放/停止等函数，对播放过程实现高级的控制。
 *     j2s_getCurrentTime 参数 无 返回 秒数
 *     暂停播放当前视频
 *     j2s_pauseVideo 参数 无 返回 无
 *     恢复播放当前视频
 *     j2s_resumeVideo 参数 无 返回 无
 *     停止播放当前视频，并显示结束画面
 *     j2s_stopVideo 参数 无 返回 无
 *     JS控制播放器SEEK功能 ，函数名:j2s_seekVideo(_second)其中参数_second 为秒数
 *     j2s_seekVideo 参数 _second 返回 无
 *     JS控制播放器音量功能 ，函数名:j2s_setVolume(_rate)其中参数_rate 为0~1
 *     j2s_setVolume 参数 _rate 返回 无
 *     在不刷新页面和播放器的情况下，切换到下一个视频，可应用于自定义播放列表。参数说明：vid：切换视频vid(String)，watchStartTime：开始播放时间(Number)，autoPlay:是否自动播放("on"/"off")，ts: web授权用(String)，sign: web授权用(String)
 *     changeVid 参数 vid,watchStartTime,autoPlay,ts,sign 返回 无
 *     获取当前流量(单位:字节)的接口供JS调用
 *     j2s_getFlowCount() 参数 无 返回 字节数
 *     获取当前视频的总时长（播放器初始化完毕才可以调用，默认为0，播放器初始化完毕事件为s2j_onPlayerInitOver）
 *     j2s_getDuration() 参数 无 返回 秒数
 *     正常播放过程中的观看时间，不包括广告、片头、暂停、片尾等时间。
 *     j2s_realPlayVideoTime() 参数 无 返回 秒数
 *     控制问答播放器显示问答
 *     j2s_showInterAction() 参数 无 返回 无
 *     控制问答播放器隐藏问答
 *     j2s_hideInterAction() 参数 无 返回 无"
 */
import '@/api/fs/api.FS2001.query-polyv-token.js';
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
    name: 'vbVideo',
    props: {
        option: {
            type: Object,
            default() {
                return {};
            },
        },
        isOverflow: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            componentId: '',
            // instance: null,
            isTokenError: false, // 获取token是否有错
            tokenError: null, // 错误对象
            // // 保利威视播放器事件列表
            // polyvEventList:[
            //     // 注册完毕
            //     "s2j_onPlayerInitOver",
            //     // 初始化完毕
            //     "s2j_onReadyPlay",
            //     // 视频缓冲完毕开始播放'
            //     "s2j_onPlayStart",
            //     // 视频播放完毕
            //     "s2j_onPlayOver",
            //     // 视频启动
            //     "s2j_onVideoPlay",
            //     // 视频停止
            //     "s2j_onVideoPause",
            //     // 视频播放进度变化
            //     "s2j_onVideoSeek",
            //     // 触发弹题
            //     "s2j_onInteractionData",
            //     // 全屏
            //     "s2j_onFullScreen",
            //     // 普屏
            //     "s2j_onNormalScreen",
            //     // error
            //     "s2j_onPlayerError"
            // ]
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
            // console.log(instance.realPlayVideoRateTime)
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
                        vm.getOption(option, isErrCatch, param).then((option) => {
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

        vm.ready()
            .then(() => {
                this.$emit('ready');
            })
            .catch((err) => {
                console.error(err);
            });

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
            // ResUtil.loadJs('//player.polyv.net/script/polyvplayer.min.js', cb);
            // html5
            return new Promise((resolve, reject) => {
                this.$ResUtils.loadJs('//player.polyv.net/resp/vod-player-drm/canary/player.js', resolve, reject);
            });
        },
        playVid(vidObj = {}, option = {}, isErrCatch = true) {
            return Promise.resolve()
                .then(() => {
                    if (!vidObj.videoId) {
                        return Promise.reject('缺少参数vid');
                    } else if (!vidObj.type) {
                        return Promise.reject('缺少参数type');
                    }
                    $('#' + this.componentId).html('');
                    return this.ready();
                })
                .then(() => {
                    const option_ = {
                        hideSwitchPlayer: true,
                        wrap: `#${this.componentId}`,
                        width: '100%',
                        height: '100%',
                        vid: vidObj.videoId,
                        // code: '123456', // 跑马灯键值
                        // code: (User.getUser() || {}).userLoginname, // 跑马灯键值
                        // verificationcode:(User.getUser()||{}).userLoginname,
                        fullscreenProxy: true, //添加该参数后点击全屏按钮播放器将不进入全屏，需要自行处理全屏
                        flashvars: {
                            fullscreenProxy: true,
                        },
                        ban_history_time: 'on',
                        playsafe(vid, next) {},
                        autoplay: true,
                        pbg: false,
                        ...this.option,
                        ...option,
                    };
                    return this.getOption(option_, isErrCatch, vidObj);
                })
                .then((res) => {
                    this.instance = polyvPlayer(res);
                    return this.PlayReturn;
                });
        },
        getOption(option, isErrCatch = true, vidObj) {
            /**
             * 保利威视加密视频播放令牌获取 FS2001
             * @param opt {
             *      param {
             *          videoId,    保利威视视频表示	String
             *          type,    保利威视视频表示	C:系统课；P:公开课 Q:题库
             *          bizId,    课程id 视频归属业务标识  type=C、P时，必传，课件标识（coursewareId）
             *      }
             * }
             */
            const { videoId, type, bizId } = vidObj;
            return this.mcpVideoWebToken(
                {
                    videoId,
                    type,
                    bizId,
                },
                isErrCatch
            ).then(({ sign, token, ts }) => {
                // 'e200804c-bf53-45e2-917b-5f1e381fe489-lUSER20210924700000000016'
                Object.assign(option, {
                    playsafe(vid, next) {
                        next(token);
                    },
                });
                const mergeParam = {};
                if (this.$platform.isPC) {
                    mergeParam.history_video_duration = 0.5;
                } else {
                    mergeParam.speed = false;
                    mergeParam.ts = ts;
                    mergeParam.sign = sign;
                }
                return Object.assign(option, mergeParam);
            });
        },
        getInstance() {
            return this.instance;
        },
        mcpVideoWebToken(opt, isErrCatch = true) {
            this.isTokenError = false;
            // let data = {
            //     url: 'fs/query-polyv-token',
            //     params: {
            //         ...opt,
            //     },
            //     isCustom: true,
            // };

            const pros = this.getPlaySign(opt.videoId).then((res) => {
                return res;
            });
            if (isErrCatch) {
                return pros.catch((err) => {
                    this.isTokenError = true;
                    this.tokenError = err;
                    // this.$baseUI.alert(err.getDescription());
                    return {};
                });
            }
            return pros;
        },
        getPlayToken(tokenParams) {
            return this.$callApi('cc/query-quest-play-token', {
                ...tokenParams,
            }).then(
                (res) => {
                    return res.getData();
                },
                (err) => {
                    this.$niceloo.api.handleFailure(err);

                    return Promise.reject();
                }
            );
        },
        getPlaySign(vid) {
            return this.$callApi('cc/query-open-play-sign', {
                vid,
            }).then((signRes) => {
                const tokenParams = {
                    vid,
                    ...signRes.getData(),
                };
                return this.getPlayToken(tokenParams);
            });
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
