<template>
    <div class="question-wrap" :class="{ student: role === 'student' }">
        <div class="logo">
            <img src="../asset/images/teacher.png" v-if="role === 'teacher'" class="img" />
            <img src="../asset/images/zj.png" v-else-if="role === 'assistent'" class="img" />
            <img src="../asset/images/student.png" v-else-if="role === 'student'" class="img" />
        </div>
        <div class="content">
            <div class="name">
                {{ role === 'student' ? '' : itemData.roleName }}
            </div>
            <div class="wrap">
                <div class="audio">
                    <div class="handle" @click="doHandle">
                        <img v-if="isLoading" class="img" src="../asset/images/audio-loading.png" />
                        <img v-else-if="isSuspend" class="img" src="../asset/images/audio-suspend.png" />
                        <img v-else-if="isPlay" class="img" src="../asset/images/audio-playing.png" />
                    </div>
                    <div class="time-wrap">
                        <span class="time1">{{ showStartSecond }}</span>
                        <div class="process" ref="process" @click="selectProgress">
                            <div class="rate" :style="{ width: `${left}%` }"></div>
                            <span class="cur" :style="{ left: `${timeLeft}px` }" @mousedown="doMoveStart"></span>
                        </div>
                        <span class="time2">{{ showTotalSecond }}</span>
                    </div>
                </div>

                <audio ref="audio" @error="errorHandle" @timeupdate="timeChange" @canplay="audioLoad" @ended="listenerEnd" :src="audioSrc"></audio>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        index: {
            // 当前组件显示位置
            type: Number,
            default: -1,
        },
        curIndex: {
            // 当前交互到第几个组件了
            type: Number,
            default: -1,
        },
        role: {
            type: String,
            default: 'teacher',
        },
        itemData: {
            type: Object,
            default() {
                return {
                    filePath: '',
                    roleName: '',
                    mediaDuration: 0,
                };
            },
        },
    },
    data() {
        return {
            audioSrc: '',
            totalTime: this.itemData.mediaDuration,
            startTime: 0,
            left: 0,
            timeWidth: 0,
            timeLeft: 0,

            disX: 0,

            isDrag: false,
            isLoading: true, // 是否加载
            isSuspend: false, // 暂停中等待播放
            isPlay: false, // 播放中
            isError: false, // 当前状态是资源错误时为 true
        };
    },
    computed: {
        showStartSecond() {
            let one = parseInt(this.startTime / 60);
            let two = this.startTime % 60;

            return `${one < 10 ? `0${one}` : `${one}`}:${two < 10 ? `0${two}` : `${two}`}`;
        },
        showTotalSecond() {
            let one = parseInt(this.totalTime / 60);
            let two = this.totalTime % 60;

            return `${one < 10 ? `0${one}` : `${one}`}:${two < 10 ? `0${two}` : `${two}`}`;
        },
    },
    watch: {
        curIndex(val, oldVal) {
            if (val > oldVal) {
                if (this.isPlay) {
                    this.doHandle();
                }
            }
        },
    },
    mounted() {
        this.timeWidth = this.$refs.process.offsetWidth - 8;
        this.audioSrc = this.$urlUtils.getViewUrl(this.itemData.filePath);
    },
    methods: {
        errorHandle() {
            this.isError = true;
            if (this.isLoading) {
                this.isSuspend = true;
            }
            this.isLoading = false;
        },
        audioLoad() {
            // this.totalTime = parseInt(this.$refs.audio.duration);
            this.isError = false;
            if (this.isLoading) {
                this.isSuspend = true;
            }
            this.isLoading = false;
        },
        listenerEnd() {
            // 监听是否播放结束
            this.left = 100;
            this.isPlay = false;
            this.isSuspend = true;
            this.$refs.audio.currentTime = 0;
            this.$refs.audio.pause();
        },
        timeChange(ev) {
            this.left = (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100;
            this.timeLeft = (this.left * this.timeWidth) / 100;
            this.startTime = parseInt(this.$refs.audio.currentTime);
        },
        selectProgress(ev) {
            if (this.isDrag) {
                return;
            }
            let realW = ev.clientX - this.getEleLeft(ev.target);
            this.$refs.audio.currentTime = (realW / this.timeWidth) * this.$refs.audio.duration;
        },
        doMoveStart(ev) {
            console.log('moveProgress');
            this.disX = ev.clientX - this.getEleLeft(ev.target);
            // this.disX = this.getEleLeft(ev.target);

            window.addEventListener('mousemove', this.doMoveing);
            window.addEventListener('mouseup', this.doMoveEnd);
        },
        doMoveEnd() {
            if (this.isDrag) {
                window.removeEventListener('mousemove', this.doMoveing);
                window.removeEventListener('mouseup', this.doMoveEnd);
                setTimeout(() => {
                    this.isDrag = false;
                }, 0);
            }
        },
        doMoveing(ev) {
            ev.preventDefault();
            this.isDrag = true;
            let realW = ev.clientX - this.disX - this.getEleLeft(this.$refs.process);
            this.$refs.audio.currentTime = (realW / this.timeWidth) * this.$refs.audio.duration;
        },
        getEleTop(obj) {
            let t = obj.offsetLeft;
            while ((obj = obj.offsetParent)) {
                t += obj.offsetLeft;
            }
            return t;
        },
        getEleLeft(obj) {
            let l = obj.offsetLeft;
            while ((obj = obj.offsetParent)) {
                l += obj.offsetLeft;
            }
            return l;
        },
        doHandle() {
            if (this.isSuspend === true) {
                // 当前时暂停状态，被点击后变成播放状态
                if (this.isError) {
                    this.$baseUI.alert('媒体播放错误，清稍后重试！').then(() => {
                        let url = this.$urlUtils.getViewUrl(this.itemData.filePath);
                        if (url.indexOf('?') > -1) {
                            url += '&' + Math.random();
                        } else {
                            url += '?' + Math.random();
                        }
                        this.audioSrc = url;
                    });
                } else {
                    this.$refs.audio.play();
                    this.isSuspend = false;
                    this.isPlay = true;
                    this.$emit('audioPlay', this);
                }
            } else if (this.isPlay === true) {
                // 当前时播放状态，被点击后变为暂停状态
                this.isPlay = false;
                this.isSuspend = true;
                this.$refs.audio.pause();
                this.$emit('audioPlay', this);
            }
        },
    },
};
</script>
<style lang="less" scoped>
audio {
    border: 0;
    font-weight: normal;
}
.question-wrap {
    padding-top: 24px;
    display: flex;

    &.student {
        flex-direction: row-reverse;

        .logo {
            margin-right: 0;
            margin-left: 12px;
        }
        .content {
            .name {
                text-align: right;
                height: 1px;
            }
            .wrap {
                color: #3a3d4b;
                background-color: #cdd9ef;
                &::before {
                    left: auto;
                    right: -5px;
                    background-color: #cdd9ef;
                }
            }
        }
    }

    .logo {
        width: 36px;
        height: 36px;
        margin-right: 12px;
        .img {
            width: 100%;
            height: 100%;
        }
    }

    .content {
        .name {
            font-size: 12px;
            color: #fff;
            text-align: left;
            line-height: 16px;
            margin-bottom: 5px;
            margin-top: 5px;
            padding-left: 3px;
        }
    }
    .wrap {
        position: relative;
        width: 249px;
        padding: 10px 20px;
        font-size: 14px;
        text-align: left;
        color: #3a3d4b;
        line-height: 22px;
        border-radius: 4px;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 0px 2px 4px 1px rgba(11, 42, 113, 0.05);

        &::before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #fff;
            position: absolute;
            top: 6px;
            left: -4px;
            transform: rotate(45deg);
        }

        .audio {
            display: flex;
            align-items: center;
            .handle {
                flex-shrink: 0;
                width: 24px;
                height: 24px;
                margin-right: 8px;
                cursor: pointer;

                .img {
                    width: 100%;
                    height: 100%;
                }
            }

            .time-wrap {
                display: flex;
                align-items: center;
                width: 100%;

                .time1,
                .time2 {
                    font-size: 12px;
                }

                .process {
                    position: relative;
                    flex: 1;
                    margin: 0 6px;
                    height: 4px;
                    border-radius: 2px;
                    background-color: #ebebeb;
                    cursor: pointer;

                    .rate {
                        width: 0%;
                        height: 100%;
                        border-radius: 2px;
                        background: linear-gradient(100deg, #ff2e30 8%, #ff957a 100%);
                        // transition: all linear 0.2s;
                        cursor: pointer;
                    }
                    .cur {
                        position: absolute;
                        display: block;
                        width: 8px;
                        height: 8px;
                        background: #ffffff;
                        border: 1px solid #ff2e30;
                        border-radius: 50%;
                        top: -3px;
                        right: 0;
                        cursor: pointer;
                        // transition: all linear 0.2s;
                    }
                }
            }
        }
    }
}
</style>
