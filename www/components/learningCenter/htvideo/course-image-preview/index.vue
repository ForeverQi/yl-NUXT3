<template>
    <div class="image-preview">
        <span class="btn close" @click="doClose">
            <i class="el-icon-close"></i>
        </span>
        <div class="btn actions" :class="{ noDownload: fileInfo.pic }" v-if="showTools && !isloading">
            <div class="actions-inner">
                <i class="el-icon-zoom-out" @click="handleActions('zoomOut')"></i>
                <i class="el-icon-zoom-in" @click="handleActions('zoomIn')"></i>
                <i class="actions_divider" v-if="fileInfo.pic"></i>
                <i class="el-icon-download" @click="downloadFile" v-if="fileInfo.pic"></i>
                <i class="actions_divider" v-if="fileInfo.pic"></i>
                <i class="el-icon-refresh-left" @click="handleActions('anticlocelise')"></i>
                <i class="el-icon-refresh-right" @click="handleActions('clocelise')"></i>
            </div>
        </div>
        <div class="preview-content">
            <div class="image-wrap" v-if="type === 'image'">
                <i class="el-icon-loading loading" v-if="isloading"></i>
                <img v-if="type === 'image' && !isloading" :style="imgStyle" class="image-view__img" :src="showPic" @mousedown="handleMouseDown" />
            </div>

            <div class="video-wrap" v-if="type === 'video'">
                <video
                    ref="video"
                    class="image-view__video"
                    width="800px"
                    height="600px"
                    :src="showPic"
                    v-if="!isError"
                    volume="0.5"
                    controls
                    autoplay
                    controlslist="nodownload noremoteplayback"
                    x5-playsinline
                    disablePictureInPicture
                    @error="videoError"
                ></video>
                <div class="err-empty" v-else>
                    <div class="err-icon"></div>
                    <div class="err-msg">视频暂时无法播放，请稍后刷新重试</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
function isFirefox() {
    if (typeof window === 'undefined') {
        return false;
    }
    return !!window.navigator.userAgent.match(/firefox/i);
}
const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel';
export default {
    props: {
        type: {
            type: String,
            default: 'image',
        },
        showTools: {
            type: Boolean,
            default: true,
        },
        pic: {
            type: String,
            default: '',
        },
        fileInfo: {
            type: Object,
            default() {
                return {
                    pic: '', // 文件路径
                    downloadFilePath: '', // 下载路径
                    fileName: '', // 文件下载文件名
                };
            },
        },
    },
    data() {
        return {
            transform: {
                scale: 1,
                deg: 0,
                offsetX: 0,
                offsetY: 0,
                enableTransition: false,
            },
            isloading: true, // 加载中
            isError: false,
        };
    },
    computed: {
        showPic() {
            if (this.fileInfo.pic) {
                return this.fileInfo.pic;
            }

            return this.pic;
        },
        imgStyle() {
            const { scale, deg, offsetX, offsetY, enableTransition } = this.transform;
            const style = {
                transform: `scale(${scale}) rotate(${deg}deg)`,
                transition: enableTransition ? 'transform .3s' : '',
                left: `${offsetX}px`,
                top: `${offsetY}px`,
            };

            return style;
        },
    },
    mounted() {
        this.deviceSupportInstall();
        this.init();
        this.$nextTick(() => {
            if (this.$refs.video) {
                this.$refs.video.volume = 0.5;
            }
        });
    },
    methods: {
        init() {
            const oImg = new Image();
            oImg.src = this.showPic;
            oImg.onload = () => {
                this.isloading = false;
            };
            oImg.onload = () => {
                this.isloading = false;
            };
        },
        doClose() {
            this.$emit('close');
        },
        deviceSupportInstall() {
            document.addEventListener(mousewheelEventName, this._mouseWheelHandler);
        },
        _mouseWheelHandler(e) {
            const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
            if (delta > 0) {
                this.handleActions('zoomIn', {
                    zoomRate: 0.015,
                    enableTransition: false,
                });
            } else {
                this.handleActions('zoomOut', {
                    zoomRate: 0.015,
                    enableTransition: false,
                });
            }
        },
        handleMouseDown(e) {
            e.preventDefault();
            const { offsetX, offsetY } = this.transform;

            const startX = e.pageX;
            const startY = e.pageY;
            this._dragHandler = (ev) => {
                this.transform.offsetX = offsetX + ev.pageX - startX;
                this.transform.offsetY = offsetY + ev.pageY - startY;
            };

            document.addEventListener('mousemove', this._dragHandler);
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', this._dragHandler);
            });
        },
        reset() {
            this.transform = {
                scale: 1,
                deg: 0,
                offsetX: 0,
                offsetY: 0,
                enableTransition: false,
            };
        },
        handleActions(action, options = {}) {
            const { transform } = this;
            const { zoomRate, rotateDeg, enableTransition } = {
                zoomRate: 0.2,
                rotateDeg: 90,
                enableTransition: true,
                ...options,
            };
            switch (action) {
                case 'zoomOut':
                    if (transform.scale > 0.2) {
                        transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3));
                    }
                    break;
                case 'zoomIn':
                    transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
                    break;
                case 'clocelise':
                    transform.deg += rotateDeg;
                    break;
                case 'anticlocelise':
                    transform.deg -= rotateDeg;
                    break;
            }

            transform.enableTransition = enableTransition;
        },
        videoError() {
            this.isError = true;
            console.log('video, ===');
        },
        downloadFile() {
            // 下载文件
            window.open(this.fileInfo.downloadFilePath);
        },
    },
};
</script>
<style lang="less" scoped>
video {
    border: 0;
    font-weight: normal;
}
.image-preview {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.8);
}
.btn {
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    opacity: 0.8;
    cursor: pointer;
    box-sizing: border-box;
    user-select: none;

    &.close {
        top: 40px;
        right: 40px;
        width: 40px;
        height: 40px;
        font-size: 24px;
        color: #fff;
        cursor: pointer;
        background-color: #606266;
    }

    &.prev {
        top: 50%;
        transform: translateY(-50%);
        width: 44px;
        height: 44px;
        font-size: 24px;
        color: #fff;
        background-color: #606266;
        border-color: #fff;
    }

    &.next {
        right: 40px;
        text-indent: 2px;
        top: 50%;
        transform: translateY(-50%);
        width: 44px;
        height: 44px;
        font-size: 24px;
        color: #fff;
        background-color: #606266;
        border-color: #fff;
    }

    &.actions {
        left: 50%;
        bottom: 30px;
        transform: translateX(-50%);
        width: 282px;
        height: 44px;
        padding: 0 23px;
        background-color: #606266;
        border-color: #fff;
        border-radius: 22px;

        &.noDownload {
            width: 220px;
        }

        .actions-inner {
            width: 100%;
            height: 100%;
            text-align: justify;
            cursor: default;
            font-size: 23px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-around;

            i {
                cursor: pointer;
            }

            .actions_divider {
            }
        }
    }
}

.preview-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .image-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .loading {
            font-size: 36px;
            color: #fff;
        }
    }

    .image-view__img {
        position: relative;
        max-height: 100%;
        max-width: 100%;
    }

    .image-view__video {
        width: 800px;
        height: 600px;
        outline: none;
        background-color: #000;
    }

    .video-wrap {
        width: 800px;
        height: 600px;
        .err-empty {
            background-color: #000;
            height: 100%;

            .err-icon {
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -23px;
                margin-top: -55px;
                width: 47px;
                height: 31px;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAfCAYAAAB3XZQBAAAByUlEQVRYhe2XPUscURSGHyViECGxsDBaWym4ESyClaVYB/KBqWz9A2lT5C+kzF+wSLBSbNQUYpekCRhSJMSFQESEoI/FzuJ6M6N3dnZmEPaF08w9595nDufcD9RRdUPdU+dUAptTdxOf0ZTxXlouFtSnXulYbXQ4N5JvbT0rGT4XC+qU2kwJCp2biW+Z8LlY2kGPU4JC584slGnRLDcF1QGeiyUMepUSsFoxeDRLp3Mj42/DxqnColiynJumN04d4Jks+H+Ht+sqrXGq3m1uZMHre2vYnGEWqtznb2XBq1Nt3+xTbd9qT9golgGVu6rBugGKqA9fl/rwdakPX5f68HXpTsPfKxg/CMwCT4AZYBqYAMaBYeAB8A84AZrAN+ALsAtsAb8Krd7lBWpBfef1t2Venatb6kt1qBuOvAGz6scCwFn6buvZN1AW/Lp6VgJ4p7bVyVim2CvxG+B1xtgFcJjU8SHwFfgB/EnsPjAGPAQe0eqNRWAp+R7qN7ACfOpFzT/PyNKOuqaOx2YqsCF12dbD4iKY+6+tp1/hsjkIJv6gzncJnGXz6mawzttewL9PJvucZKqX0KG9UH+qRzEJiq35EeA0xrFKXQKoplpFM3MPLwAAAABJRU5ErkJggg==)
                    no-repeat;
            }
            .err-msg {
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                padding-top: 25px;
                text-align: center;
                color: #fff;
            }
        }
    }
}
</style>
