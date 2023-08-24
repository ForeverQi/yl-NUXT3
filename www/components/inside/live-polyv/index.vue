<template>
    <div class="polyv">
        <div class="camera" ref="camera" @mousedown="clickDrag" v-if="cameraStatus === 'Y' && (clientType === 'W' || clientType === 'P')">
            <video src="" v-if="isStartMonitor"></video>
            <div class="move"></div>
            <!--摄像头正常 end-->

            <!--摄像头失败--start-->
            <div class="c_l_camera fail" v-if="!isStartMonitor">
                <div class="background">
                    <img src="./asset/images/camera1.png" />
                    <div class="tip">调取失败</div>
                </div>
            </div>

            <!--摄像头异常提示-->
            <span class="hasquestion">
                <img src="./asset/images/warn.png" />
                <span>若摄像头异常，请点击这里解决</span>
            </span>
        </div>

        <iframe :src="coursewareLivePath" allowfullscreen="true" frameborder="0" scrolling="auto" class="liveiframe" allow="microphone; camera"></iframe>
        <argee-content :argee-content="argeeContent" v-if="isShowAgree" @returnBack="submitUserLiveAgree" />
    </div>
</template>
<script>
// 保利威直播
import io from '@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/io';
import ArgeeContent from '../agree-content/index.vue';
import '@/api/cc/api.CC9001.agreement-rule-info.js';
import '@/api/cc/api.CC9002.agreement-sign-submit.js';
import '@/api/cc/api.CC9003.facelive-classmonitor-upload.js';

var videoWidth = 115;
var videoHeight = 100;
export default {
    components: {
        ArgeeContent,
    },
    props: {
        // 直播播放
        coursewareLivePath: {
            type: String,
            default: '',
        },
        // 直播班级ID
        classId: {
            type: String,
            default: '',
        },
        // 直播课件ID
        coursewareId: {
            type: String,
            default: '',
        },
        // 直播播放环境 web，app，小程序。M:移动端;P:PC客户端;W:Web端;H:H5;A:小程序， 客户端跟web端相同，h5，以app端为准
        clientType: {
            type: String,
            default: 'W',
        },
    },
    data() {
        return {
            // 摄像头窗口拖拽
            drag: {
                disY: 0,
                disX: 0,
            },
            // 协议变量
            argeeContent: {
                content: '',
                title: '',
            },
            isStartMonitor: true,
            isShowAgree: false, // 是否显示协议
            cameraStatus: '', // 摄像头状态，Y:开启；N:关闭
            courseAgreementRuleId: '', // 看课协议规则标识
            liveSettingInfo: {}, // 直播控制配置
        };
    },
    mounted() {
        if (this.clientType === 'W' || this.clientType === 'P') {
            this.init();
        }
    },
    methods: {
        init() {
            // 获取协议
            this.$callApi('cc/agreement-rule-info', {
                classId: this.classId,
                onsuccess: (data) => {
                    this.liveSettingInfo = data;
                    this.courseAgreementRuleId = data.courseAgreementRuleId;

                    // 是否需要同意看课协议，agreeStatus（Y:是；N:否）
                    if (data.agreeStatus === 'Y') {
                        if (data.agreementContent) {
                            this.argeeContent = JSON.parse(data.agreementContent);
                        }

                        // 是否签署过协议
                        if (data.isSignStatus !== 'Y') {
                            this.isShowAgree = true;
                        } else {
                            this.initCamera();
                        }
                    } else {
                        this.initCamera();
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },

        // 提交同意协议
        submitUserLiveAgree() {
            this.$callApi('cc/agreement-sign-submit', {
                courseAgreementRuleId: this.courseAgreementRuleId,
                classId: this.classId,
                coursewareId: this.coursewareId,
                onsuccess: () => {
                    // 关闭协议
                    this.isShowAgree = false;

                    this.initCamera();
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },

        // 关于摄像头的初始化
        initCamera() {
            this.cameraStatus = this.liveSettingInfo.cameraStatus;

            // 如果是客户端嵌套的直播页面，停止初始化摄像头
            if (this.$route.query.isPcClient) {
                this.cameraStatus = 'N';
                return;
            }

            // 是否开启摄像头：Y: 开启；N: 关闭
            if (this.cameraStatus === 'Y') {
                // 初始化摄像头
                this.initCamMonitor();
            }
        },

        dragUp() {
            window.onmousemove = null;
            window.onmouseup = null;
        },
        clickDrag(ev) {
            if (ev.target.tagName.toLowerCase() === 'span') {
                this.toLiveErrorNotice();
                return false;
            }
            let oDiv = document.createElement('div');
            oDiv.style.position = 'absolute';
            oDiv.style.top = 0;
            oDiv.style.bottom = 0;
            oDiv.style.left = 0;
            oDiv.style.right = 0;
            oDiv.style.zIndex = 70;
            oDiv.style.background = 'transparent';
            document.querySelector('body').appendChild(oDiv);
            this.drag.disX = ev.clientX - this.$refs.camera.offsetLeft;
            this.drag.disY = ev.clientY - this.$refs.camera.offsetTop;

            window.onmousemove = (ev) => {
                ev.stopPropagation();
                this.dragMove(ev);
                return false;
            };
            window.onmouseup = () => {
                this.dragUp();
                this.$nextTick(() => {
                    document.querySelector('body').removeChild(oDiv);
                });

                return false;
            };
        },
        dragMove(ev) {
            ev.preventDefault();
            let left = ev.clientX - this.drag.disX;
            let top = ev.clientY - this.drag.disY;
            let cameraOffsetWidth = this.$refs.camera.offsetWidth;
            if (left < -(cameraOffsetWidth / 2)) {
                left = -(cameraOffsetWidth / 2);
            }
            if (top < -(cameraOffsetWidth / 2)) {
                top = -(cameraOffsetWidth / 2);
            }
            if (window.innerWidth - this.$refs.camera.offsetWidth - 10 < left) {
                left = window.innerWidth - this.$refs.camera.offsetWidth - 10;
            }
            if (window.innerHeight - this.$refs.camera.offsetHeight - cameraOffsetWidth / 2 < top) {
                top = window.innerHeight - this.$refs.camera.offsetHeight - cameraOffsetWidth / 2;
            }
            this.$refs.camera.style.top = `${top}px`;
            this.$refs.camera.style.left = `${left}px`;
        },
        // 初始化视频监控
        initCamMonitor() {
            var ua = navigator.userAgent;
            var isIE = /\bMSIE\b/i.test(ua) || /\bTrident\b/i.test(ua);
            let vm = this;
            // 现代浏览器的摄像头参数
            var cameraOptionsModern = {
                audio: false,
                video: {
                    width: videoWidth,
                    height: videoHeight,
                },
            };

            var isEdge = /\bEdge\b/i.test(ua);
            var isChrome = /\bChrome\b/i.test(ua);
            var isFirefox = /\bFirefox\b/i.test(ua);
            var isSafari = !isChrome && /\bSafari\b/i.test(ua);
            var isOpera = isChrome && /\bOPR\b/i.test(ua);

            // 提示用户当前浏览器并不支持摄像头调用，引导用户下载支持的浏览器
            var tipUserBrowserNotSupported = function () {
                vm.isStartMonitor = false;
            };

            //检查浏览器是否支持调用摄像头
            var checkIfBrowserSupports = function () {
                if (isIE) {
                    return false;
                } else if (isEdge) {
                    var version = getBrowserMajorVersion('Edge/');
                    return !(version < 12);
                } else if (isChrome) {
                    var version1 = getBrowserMajorVersion('Chrome/');
                    return !(version1 < 21);
                } else if (isFirefox) {
                    var version2 = getBrowserMajorVersion('Firefox/');
                    return !(version2 < 36);
                } else if (isSafari) {
                    var version3 = getBrowserMajorVersion('Safari/');
                    return !(version3 < 11);
                } else if (isOpera) {
                    var version4 = getBrowserMajorVersion('OPR/');
                    return !(version4 < 40);
                } else return undefined; /* undefined 代表：可以试一试 */
            };

            /**
             * 获取当前浏览器的主版本
             * @returns {Number}
             */
            var getBrowserMajorVersion = function (prefix) {
                var ua = navigator.userAgent;
                var tmp = ua.match(new RegExp(prefix + '(\\d+(?:\\.\\d+)*)'), 'i');
                if (null == tmp) return null;

                var version = tmp[1];
                version = Number(version.split('.')[0]);
                return version;
            };

            /* 检查浏览器是否支持调用摄像头 */
            if (false === checkIfBrowserSupports()) {
                tipUserBrowserNotSupported();
                return;
            }
            try {
                /* 获取视频流 */
                var mediaStreamPromise = navigator.mediaDevices.getUserMedia(cameraOptionsModern);

                /**
                 * 出于安全控制，浏览器仅在以下场景会返回 Promise
                 * 1. 页面域名为 localhost
                 * 2. 页面协议为 https://
                 * 3. 页面协议为 file://
                 *
                 * 其它场景，返回 undefined
                 */
                if (undefined === mediaStreamPromise) {
                    // alert("系统错误，请联系网站管理员");
                    tipUserBrowserNotSupported();
                    return;
                }
            } catch (e) {
                console.error(e);
                tipUserBrowserNotSupported();
                return;
            }

            //alert(p);
            mediaStreamPromise.then(
                function (stream) {
                    /**
                     * Firefox 36 获取到的 stream 为 LocalMediaStream。
                     * 虽然可以获取到视频流，但因为 Chromium 387740 故障的缘故，无法播放
                     */
                    if ('LocalMediaStream' === stream.constructor.name && typeof stream.stop === 'function') {
                        stream.stop();
                        tipUserBrowserNotSupported();
                        return;
                    }

                    /* 在Video中展现捕捉到的视频流 */
                    let videoObj = vm.$refs.camera.firstChild;
                    videoObj.style.width = videoWidth + 'px';
                    videoObj.style.height = videoHeight + 'px';
                    videoObj.onloadedmetadata = function () {
                        try {
                            this.play();
                            vm.isStartMonitor = true;
                            // 定时器拍照
                            setInterval(() => {
                                vm.snapshot();
                            }, 1000 * 5 * 60);
                        } catch (e) {
                            vm.isStartMonitor = false;
                            // showTipToUser("程序错误，请联系网站管理员[ERR1]");
                        }
                    };
                    if ('srcObject' in videoObj) videoObj.srcObject = stream;
                    else videoObj.src = URL.createObjectURL(stream); /* 新版浏览器已不再支持这种写法 */
                },
                function (err) {
                    console.error('Error!', err);
                    vm.isStartMonitor = false;
                }
            );
        },
        // 拍取监控截图
        snapshot() {
            var ua = navigator.userAgent;
            var isIE = /\bMSIE\b/i.test(ua) || /\bTrident\b/i.test(ua);

            if (isIE) {
                Webcam.snap(function (url) {
                    this.postData(url);
                });
            } else {
                var videoObj = document.querySelector('.camera video');
                var canvasObj = document.createElement('canvas');
                canvasObj.width = videoWidth;
                canvasObj.height = videoHeight;

                var ctx = canvasObj.getContext('2d');
                ctx.drawImage(videoObj, 0, 0, videoWidth, videoHeight);
                this.postData(canvasObj.toDataURL('image/jpg'));
            }
        },
        // 截取的视频截图传给后台
        postData(base64Data) {
            let that = this;
            let file = this.convertBase64UrlToBlob(base64Data);
            let formData = new FormData();
            formData.append('file', file, 'file_' + Date.parse(new Date()) + '.jpg');
            this.$callRawApi({
                api: 'fs/file/upload/token/live',
                onerror(_failure) {
                    console.log(_failure);
                    /*reject(_failure);*/
                },
                onsuccess(data) {
                    var uploadToken = data.uploadToken;
                    let xhr;
                    xhr = io.listenXMLHttpRequestStateChange({
                        apiResponseConverterId: 'file-service',
                        onsuccess(res) {
                            /*resolve(data);*/
                            let picPath = res.filePath;
                            that.$callApi('cc/facelive-classmonitor-upload', {
                                classId: that.classId,
                                coursewareId: that.coursewareId,
                                monitorimageUrl: picPath,
                                livewebUrl: that.coursewareLivePath,
                                onsuccess: (res) => {
                                    console.log(res);
                                },
                                onerror: () => {},
                                oncomplete: () => {},
                            });
                        },
                        onerror(_failure) {
                            reject(_failure.getDescription());
                        },
                    });
                    // var uploadPath = this.$niceloo.path.getServerFileUploadPath({
                    //     uploadToken, // 上传凭证
                    //     //fileTtl: 'temporary', // 文件生命周期。permanent - 永久有效；temporary - 临时有效；disposable - 一次性有效；
                    //     fileType: 'image', // 文件类型。image - 图片；html - HTML页面；
                    //     bkUrl: 'fs-live.oss-cn-hangzhou.aliyuncs.com',
                    //     fileStoreLocation: 'alioss', // 上传到的目标位置。niceloo - 优路服务；baidu - 百度；baidudoc - 百度文档；
                    // });
                    var uploadPath =
                        that.$nuxt.context.env.config.FILE_LIVE_UPLOAD +
                        '?params=' +
                        encodeURIComponent(
                            JSON.stringify({
                                fileType: 'A',
                                fileStoretype: 'A',
                                uploadToken,
                                bkUrl: 'fs-live.oss-cn-hangzhou.aliyuncs.com',
                            })
                        );
                    // uploadPath = this.action || uploadPath;
                    xhr.open('POST', uploadPath);
                    xhr.send(formData);
                },
            });
        },
        convertBase64UrlToBlob(urlData) {
            var arr = urlData.split(',');
            var mime = arr[0].match(/:(.*?);/)[1];
            var bstr = atob(arr[1]);
            var n = bstr.length;
            var u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        },
        toLiveErrorNotice(e) {
            /*this.$PageUtil.openNewPage(Config.detectionCameraUrl);*/
            this.$PageUtil.openNewPage('https://www.niceloo.com/zt4ird/@qdyfb/@qd-yf2/detection-camera/');
        },
    },
};
</script>
<style lang="less" scoped>
video {
    border: 0;
    font-weight: normal;
}
.polyv {
    height: 100%;
    width: 100%;
}

.liveiframe {
    width: 100%;
    height: 100%;
}

.camera {
    position: absolute;
    width: 115px;
    height: 137px;
    bottom: 20px;
    left: 0;
    top: 200px;
    z-index: 20;
    cursor: move;
    padding: 12px 12px;
    border-radius: 8px;
    background: #555555;

    .move {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        cursor: move;
        z-index: 10;
        background-color: rgba(0, 0, 0, 0);
    }

    video {
        width: 115px;
        height: 100px;
        border-radius: 8px;
        background: #000;
    }

    .background {
        width: 115px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: #070707;
        border-radius: 8px;
        margin-bottom: 8px;

        img {
            width: 30px;
            height: 30px;
        }

        .tip {
            opacity: 0.6;
            font-size: 12px;
            font-weight: 400;
            color: #ffffff;
        }
    }
}

.hasquestion {
    position: relative;
    z-index: 30;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    text-decoration: underline;
    text-align: left;
    color: #ffffff;
    cursor: pointer;

    img {
        width: 14px;
        height: 14px;
        margin-right: 4px;
    }
}
</style>
