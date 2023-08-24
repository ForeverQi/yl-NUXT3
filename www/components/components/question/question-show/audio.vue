<template>
    <div class="main-wrap" :class="play ? '' : 'resolve-audio'">
        <div v-if="play">
            <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->
            <audio
                ref="audio"
                style="display: none"
                :src="url"
                :preload="audio.preload"
                @play="onPlay"
                @error="onError"
                @waiting="onWaiting"
                @pause="onPause"
                @timeupdate="onTimeupdate"
                @loadedmetadata="onLoadedmetadata"
            ></audio>
            <div>
                <div class="play-or-pause" @click="startPlayOrPause" :class="audio.playing ? 'is-playing' : 'is-pause'"></div>
                <el-button v-show="controlList.speed" type="text" @click="changeSpeed">{{ audio.speed | transSpeed }}</el-button>
                <el-slider
                    v-show="controlList.progress"
                    v-model="sliderTime"
                    :format-tooltip="formatProcessToolTip"
                    @change="changeCurrentTime"
                    class="slider"
                    :disabled="type && type === 'MKDS' ? true : false"
                ></el-slider>
                <el-tag type="info" class="info">{{ audio.currentTime | formatSecond }}</el-tag>
                <span style="color: #909399">/</span>
                <el-tag type="info" class="info">{{ audio.maxTime | formatSecond }}</el-tag>

                <el-button v-show="controlList.muted" type="text" @click="startMutedOrNot">{{ audio.muted | transMutedOrNot }}</el-button>
                <el-slider v-show="controlList.Volume" v-model="volume" :format-tooltip="formatVolumeToolTip" @change="changeVolume" class="slider"></el-slider>
                <a :href="url" v-show="controlList.download" target="_blank" class="download" download>下载</a>
            </div>
        </div>
        <div v-else>
            <i class="el-icon-caret-right"></i>
            <span class="time">0:00/0:00</span>
            <span class="line"></span>
            <img src="./asset/img/resolve-play.png" alt="" />
        </div>
    </div>
</template>

<script>
function realFormatSecond(second) {
    let secondType = typeof second;
    if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second);
        let minute = Math.floor(second / 60);
        second = second - minute * 60;
        return (minute + '').padStart(2, '0') + ':' + (second + '').padStart(2, '0');
    } else {
        return '00:00';
    }
}

export default {
    name: 'VueAudio',
    filters: {
        formatSecond(second = 0) {
            return realFormatSecond(second);
        },
        transMutedOrNot(value) {
            return value ? '放音' : '静音';
        },
        transSpeed(value) {
            return '快进: x' + value;
        },
    },
    props: {
        url: {
            type: String,
            default: '',
        },
        speedPeriod: {
            type: Array,
            default() {
                return [1, 1.5, 2];
            },
        },
        control: {
            type: String,
            default: '',
        },
        play: {
            type: Boolean,
            default: true,
        },
        type: {
            type: String,
            default: '', // 模拟考试  MKDS
        },
        isRecord: {
            type: Boolean,
            default: false,
        },
        resolve: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            audio: {
                currentTime: 0,
                maxTime: 0,
                playing: false,
                muted: false,
                speed: 1,
                waiting: true,
                preload: 'auto',
                hasPlay: false,
            },

            sliderTime: 0,
            volume: 100,
            speeds: this.speedPeriod,

            controlList: {
                // 不显示下载
                download: false,
                // 不显示静音
                muted: false,
                // 不显示音量条
                Volume: false,
                // 不显示进度条
                progress: true,
                // 只能播放一个
                onlyOnePlaying: false,
                // 不要快进按钮
                speed: false,
            },
        };
    },
    mounted() {
        this.setControlList();
    },
    methods: {
        setControlList() {
            if (!this.control) {
                return;
            }
            let controlList = this.control.split(' ');
            controlList.forEach((item) => {
                if (Object.keys(this.controlList).indexOf(item) >= 0) {
                    this.controlList[item] = true;
                }
            });
        },
        changeSpeed() {
            let index = this.speeds.indexOf(this.audio.speed) + 1;
            this.audio.speed = this.speeds[index % this.speeds.length];
            this.$refs.audio.playbackRate = this.audio.speed;
        },
        startMutedOrNot() {
            this.$refs.audio.muted = !this.$refs.audio.muted;
            this.audio.muted = this.$refs.audio.muted;
        },
        // 音量条toolTip
        formatVolumeToolTip(index) {
            return '音量条: ' + index;
        },
        // 进度条toolTip
        formatProcessToolTip(index = 0) {
            index = parseInt((this.audio.maxTime / 100) * index);
            return '进度条: ' + realFormatSecond(index);
        },
        // 音量改变
        changeVolume(index = 0) {
            this.$refs.audio.volume = index / 100;
            this.volume = index;
        },
        // 播放跳转
        changeCurrentTime(index) {
            this.$refs.audio.currentTime = parseInt((index / 100) * this.audio.maxTime);
        },
        startPlayOrPause() {
            // todo 兼容模拟考试逻辑,1.第一次进来,点击播放后不能再点击2. 第一次播放后在缓存记录下,再次刷新进来不能播放
            if (this.type && this.type === 'MKDS' && !this.resolve) {
                if (this.hasPlay || this.isRecord) {
                    return;
                }
                this.$emit('firstPlay');
                this.hasPlay = true;
            }
            return this.audio.playing ? this.pausePlay() : this.startPlay();
        },
        // 开始播放
        startPlay() {
            const audios = [].slice.call(document.getElementsByTagName('audio'));
            audios.forEach((item) => {
                item.pause();
            });
            this.$refs.audio.play();
        },
        // 暂停
        pausePlay() {
            this.$refs.audio.pause();
        },
        // 当音频暂停
        onPause() {
            this.audio.playing = false;
        },
        // 当发生错误, 就出现loading状态
        onError() {
            this.audio.waiting = true;
        },
        // 当音频开始等待
        onWaiting(res) {
            // console.log(res);
        },
        // 当音频开始播放
        onPlay(res) {
            // console.log(res);
            this.audio.playing = true;
            this.audio.loading = false;

            if (!this.controlList.onlyOnePlaying) {
                return;
            }

            let target = res.target;

            let audios = document.getElementsByTagName('audio');

            [...audios].forEach((item) => {
                if (item !== target) {
                    item.pause();
                }
            });
        },
        // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
        onTimeupdate(res) {
            // console.log('timeupdate')
            // console.log(res)
            this.audio.currentTime = res.target.currentTime;
            this.sliderTime = parseInt((this.audio.currentTime / this.audio.maxTime) * 100);
        },
        // 当加载语音流元数据完成后，会触发该事件的回调函数
        // 语音元数据主要是语音的长度之类的数据
        onLoadedmetadata(res) {
            // console.log('loadedmetadata');
            // console.log(res);
            this.audio.waiting = false;
            this.audio.maxTime = parseInt(res.target.duration);
        },
    },
};
</script>

<style scoped lang="less">
audio {
    border: 0;
    font-weight: normal;
}
.main-wrap {
    width: 335px;
    height: 48px;
    opacity: 1;
    background: #ffe2dd;
    border-radius: 24px;
    padding-left: 12px;
    display: inline-block;
    &.resolve-audio {
        background: #f1f3f4;
        vertical-align: middle;
        line-height: 48px;
        i {
            color: #a9abab;
            font-size: 18px;
            margin-right: 15px;
            line-height: 48px;
        }
        .time {
            color: #757677;
            font-size: 16px;
            margin-right: 15px;
            line-height: 48px;
        }
        .line {
            display: inline-block;
            width: 150px;
            height: 4px;
            background-color: #c1c2c3;
            margin-right: 15px;
            vertical-align: middle;
        }
        img {
            vertical-align: middle;
        }
    }
    div {
        height: 48px;
        vertical-align: middle;

        .play-or-pause {
            display: inline-block;
            height: 32px;
            width: 60px;
            cursor: pointer;

            &.is-playing {
                background: url('./asset/img/play.png') no-repeat center;
            }

            &.is-pause {
                background: url('./asset/img/pause.png') no-repeat center;
            }
        }

        /deep/ .el-slider__runway {
            height: 3px;
        }

        /deep/ .el-slider__button-wrapper {
            top: -16px;
            z-index: 20;
        }

        /deep/ .el-slider__button {
            border: 2px solid #ff3736 !important;
            width: 8px;
            height: 8px;
        }

        /deep/ .el-slider__bar {
            height: 3px;
            background-color: #ff3736 !important;
        }

        &.resolve-auio {
            background-color: #f1f3f4;
        }
    }

    .slider {
        display: inline-block;
        width: 130px;
        position: relative;
        top: 4px;
        margin: 0 15px;
    }

    .download {
        color: #409eff;
        margin-left: 15px;
    }

    .info {
        border: none;
        background: #ffe2dd;
        padding: 0;
    }

    .el-button > i {
        font-size: 32px;
    }
}
</style>
