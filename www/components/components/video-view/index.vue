<script lang="jsx">
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
        // this.wrap.classList.add('full');
        this.classObj.full = true;
    }
};

var exit = function () {
    if (!document.fullscreenElement && !document.msFullscreenElement) {
        return;
    }
    // 支持全屏就退出系统全屏，不支持则退出页面全屏
    if (api) {
        document[api.exit]();
    } else {
        // this.wrap.classList.remove('full');
        this.classObj.full = false;
    }
};
export default {
    name: 'VideoView',
    data() {
        return {
            componentId: '',
            // instance: null,
            isTokenError: false, // 获取token是否有错
            tokenError: null, // 错误对象
            linkPromise: null,

            doVideoPause: () => {}, // 暂停事件
            doVideoStart: () => {}, // 开始事件
            PlayReturn: null,
            wrap: null,
            vid: '',
            playOptions: {
                fullscreenProxy: true,
            },
            classObj: { 'video-view': true, full: false },
        };
    },
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
        this.init();
    },
    destroyed() {
        this.PlayReturn.destroy();
    },
    // instance: null,
    methods: {
        init() {
            this.componentId = 'video_' + Math.ceil(Math.random() * 100000);
            this.initVideo();
        },
        initVideo() {
            var changeRateCb = (instance, currentRate) => {
                instance.realPlayVideoRateTime =
                    (PlayReturn.realPlayVideoTime() - instance.recordPrevDate) * instance.prevRate + instance.realPlayVideoRateTime;
                instance.recordPrevDate = PlayReturn.realPlayVideoTime();
                this[`${this.componentId}`].firstRcord = false;
                instance.prevRate = currentRate;
            };
            let PlayReturn = {
                changeVid: (param) => {
                    return new Promise((resolve, reject) => {
                        if (!param.vid) {
                            reject('缺少参数vid');
                            return;
                        }
                        // delete this.classObj[this.vid];
                        this.classObj[this.vid] = false;
                        this.vid = `v${param.vid}`;
                        this.$set(this.classObj, this.vid, true);
                        const option = {
                            vid: '',
                            autoplay: true,
                            ...param,
                        };
                        this.playOptions = param;
                        resolve(this[`${this.componentId}`].changeVid(option));
                    });
                },
                isPlaying: () => {
                    return this[`${this.componentId}`] && this[`${this.componentId}`].isPlaying;
                },
                setVolume: (num) => {
                    this[`${this.componentId}`] && this[`${this.componentId}`].j2s_setVolume(num);
                },
                start: (cb) => {
                    window.s2j_onVideoPause = () => {
                        // 监听视频暂停
                        this[`${this.componentId}`].isPlaying = false;
                        PlayReturn.changePlayingStatus && PlayReturn.changePlayingStatus(false);
                    };
                    // 视频初次播放和从暂停到播放
                    window.s2j_onVideoPlay = () => {
                        PlayReturn.changePlayingStatus && PlayReturn.changePlayingStatus(true);
                    };
                    // 监听视频开始播放 初次播放
                    this[`${this.componentId}`].on('s2j_onPlayStart', () => {
                        this[`${this.componentId}`].isPlaying = true;

                        //开始播放事件
                        this[`${this.componentId}`].firstRcord = true;
                        this[`${this.componentId}`].realPlayVideoRateTime = 0;
                        this[`${this.componentId}`].recordPrevDate = PlayReturn.realPlayVideoTime();
                        this[`${this.componentId}`].prevRate = this[`${this.componentId}`].prevRate || 1;
                        let HTML5 = this[`${this.componentId}`].HTML5 || this[`${this.componentId}`].flash;
                        HTML5.on('changeRate', (rate, currentRate) => {
                            changeRateCb(this[`${this.componentId}`], currentRate);
                        });
                        HTML5.on('videoPause', () => {
                            this[`${this.componentId}`].isPlaying = false;
                        });
                        HTML5.on('videoPlay', () => {
                            this[`${this.componentId}`].isPlaying = true;
                        });
                        changeRateCb(this[`${this.componentId}`], this[`${this.componentId}`].prevRate);
                        cb && cb();
                    });
                    window.s2j_onPlayerError = (err, b) => {
                        console.log('err', err, b);
                    };
                    return PlayReturn;
                },
                over(cb) {
                    //播放完成
                    window.s2j_onPlayOver = cb;
                    return PlayReturn;
                },
                getCurrentTime: () => {
                    //获当前已播放的时间 秒，可循环访问
                    return this[`${this.componentId}`].j2s_getCurrentTime();
                },
                getVideoLength: () => {
                    //获取视频长度 秒数
                    return this[`${this.componentId}`].j2s_getDuration();
                },
                realPlayVideoTime: () => {
                    //获取视频正常播放总时长 秒数
                    return this[`${this.componentId}`].j2s_realPlayVideoTime();
                },
                realPlayVideoRateTime: () => {
                    //获取视频正常播放+倍速总时长 秒数
                    let second =
                        (PlayReturn.realPlayVideoTime() - this[`${this.componentId}`].recordPrevDate) * this[`${this.componentId}`].prevRate +
                        this[`${this.componentId}`].realPlayVideoRateTime;
                    return parseInt(second);
                },
                getUserPlayVidTime: () => {
                    return (this.historyUserPlayVidTime || 0) + this[`${this.componentId}`].j2s_realPlayVideoTime();
                },
                pauseVideo: () => {
                    this[`${this.componentId}`].isPlaying = false;
                    changeRateCb(this[`${this.componentId}`], this[`${this.componentId}`].prevRate);
                    //暂停播放当前视频
                    return this[`${this.componentId}`].j2s_pauseVideo();
                },
                resumeVideo: () => {
                    this[`${this.componentId}`].isPlaying = true;
                    this[`${this.componentId}`].recordPrevDate = PlayReturn.realPlayVideoTime();
                    //恢复播放当前视频
                    return this[`${this.componentId}`].j2s_resumeVideo();
                },
                stopVideo: () => {
                    //停止播放当前视频，并显示结束画面
                    return this[`${this.componentId}`].j2s_stopVideo();
                },
                seekVideo: (second) => {
                    //JS控制播放器SEEK功能 ，函数名:j2s_seekVideo(_second)其中参数_second 为秒数
                    return this[`${this.componentId}`].j2s_seekVideo(second);
                },
                getInstance: () => {
                    return this[`${this.componentId}`];
                },
                getPlayerId: () => {
                    return this.componentId;
                },
                destroy: () => {
                    return this[`${this.componentId}`] && this[`${this.componentId}`].destroy();
                },
                realPlayStatus: () => {
                    const instance = PlayReturn.getInstance();
                    if (instance) {
                        return instance.j2s_realPlayStatus();
                    } else {
                        return null;
                    }
                },
            };
            this.PlayReturn = PlayReturn;

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
                this.wrap = this.$refs.videoWrap;
            });
            // 支持系统储全屏则监听全屏改变时间做样式处理
            if (api) {
                document.addEventListener(api.events.change, () => {
                    if (document[api.element]) {
                        // this.wrap.classList.add('full');
                        this.classObj.full = true;
                    } else {
                        // this.wrap.classList.remove('full');
                        this.classObj.full = false;
                        // eslint-disable-next-line vue/custom-event-name-casing
                        this.$emit('isFullScreen', false);
                    }
                });
            }

            // 点击全屏按钮的回调
            window.onFullscreenProxy = (vid) => {
                console.log('@@#', vid, this.playOptions, this.classObj);
                this.wrap = document.querySelector(`.v${vid}`);
                if (this.classObj.full === true) {
                    // eslint-disable-next-line vue/custom-event-name-casing
                    this.$emit('isFullScreen', false);
                    exit.call(this);
                } else {
                    if (!this.wrap) {
                        return;
                    }
                    // eslint-disable-next-line vue/custom-event-name-casing
                    this.$emit('isFullScreen', true);
                    request.call(this, this.wrap);
                }
            };

            this.ready().then(() => {
                this.$emit('ready');
            });
        },
        ready() {
            if (this.linkPromise === null) {
                this.linkPromise = new Promise((resolve, reject) => {
                    const oScript = document.createElement('script');
                    oScript.src = '//player.polyv.net/resp/vod-player-drm/canary/player.js';
                    // oScript.src = 'https://demo.polyv.net/vincent/static/player-0329.js';
                    oScript.onload = function () {
                        resolve();
                    };
                    oScript.onerror = function () {
                        reject();
                    };
                    document.querySelector('head').appendChild(oScript);
                });
            }
            return this.linkPromise;
        },
        playVid(vidObj = {}) {
            if (typeof vidObj.fullscreenProxy !== 'undefined') {
                this.playOptions.fullscreenProxy = vidObj.fullscreenProxy;
            }
            return Promise.resolve()
                .then(() => {
                    if (!vidObj.vid) {
                        return Promise.reject('缺少参数vid');
                    }
                    return this.ready();
                })
                .then(() => {
                    // delete this.classObj[this.vid];
                    this.classObj[this.vid] = false;
                    this.vid = `v${vidObj.vid}`;
                    // this.classObj[this.vid] = true;
                    this.$set(this.classObj, this.vid, true);
                    return {
                        wrap: `#${this.componentId}`,
                        // vid: '', // 视频播放ID
                        width: '100%',
                        height: '100%',
                        autoplay: true, // 是否自动播放
                        loop: false, // 是否循环播放
                        // forceH5: '', // 是否强制H5
                        flash: false, // 是否默认使用Flash播放器。
                        hideSwitchPlayer: true, // 是否隐藏H5和Flash播放器的切换按钮
                        playsafe: '', // PC端播放加密视频所需的授权凭证
                        // playsafeUrl: '', // 视频播放凭证获取url 与 playsafe二选一
                        // sign: '', // 移动端播放加密视频所需的签名
                        // ts: '', // 移动播放加密视频需传入的时间戳
                        video_align: '', // 默认居中展示 播放器内视频画面的对齐方式，默认是居中显示，但可通过该参数来控制。取值：{top,bottom,left,right}，分别对应顶部对齐，底部对齐，左对齐和右对齐。
                        fullscreenProxy: true, //添加该参数后点击全屏按钮播放器将不进入全屏，需要自行处理全屏
                        ban_history_time: 'off', // 是否禁用续播功能
                        history_video_duration: 1, // 视频超过1分钟的视频会议续播功能
                        showHd: true, // 是否显示清晰度选择按钮。
                        code: '', // 跑马灯键值
                        cachePlaybackRate: false, // 是否保存视频倍数 默认不保存
                        pbg: false,
                        playModeQuery: true,
                        ...vidObj,
                    };
                })
                .then((res) => {
                    this[`${this.componentId}`] = polyvPlayer(res);
                    return this.PlayReturn;
                });
        },
    },
    render() {
        return (
            <div style={this.getStyle} id={`warp${this.componentId}`} class={this.classObj}>
                <div style="width: 100%; height: 100%" id={this.componentId}></div>
                {this.$slots.mask}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.video-view {
    width: 100%;
    height: 100%;
}
</style>
