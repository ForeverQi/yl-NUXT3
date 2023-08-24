<template>
    <iframe
        :src="coursewareLivePath"
        allowfullscreen="true"
        frameborder="0"
        scrolling="auto"
        class="liveiframe"
        allow="microphone *;camera *;midi *;encrypted-media *;autoplay *;fullscreen *;"
    ></iframe>
</template>
<script>
export default {
    props: {
        // 直播播放
        coursewareLivePath: {
            type: String,
            default: '',
        },
        // 直播播放环境 web，app，小程序。M:移动端;P:PC客户端;W:Web端;H:H5;A:小程序， 客户端跟web端相同，h5，以app端为准
        clientType: {
            type: String,
            default: 'W',
        },
        enterlocalTime2: {
            // 直播页面打开的时间（本地时间时间戳）
            type: String,
            default: '',
        },
        enterlocalTime: {
            // 进入直播的时间（本地时间）
            type: Number,
            default: 0,
        },
        localStartTime: {
            // 直播开始时间
            type: Number,
            default: 0,
        },
        localEndTime: {
            // 直播结束时间
            type: Number,
            default: 0,
        },
    },
    mounted() {
        let vm = this;
        window.addEventListener('beforeunload', function (event) {
            if (vm.clientType === 'W' || vm.clientType === 'P') {
                vm.addBatchPlayRecord(function () {});
            }
        });
    },
    methods: {
        addBatchPlayRecord() {
            this.gooutlocalTime = Date.parse(new Date());
            let time = 0;
            if (this.enterlocalTime < this.localStartTime) {
                /*if (this.gooutlocalTime < this.localStartTime) {} */
                if (this.gooutlocalTime > this.localStartTime && this.gooutlocalTime < this.localEndTime) {
                    time = this.gooutlocalTime - this.localStartTime;
                } else if (this.gooutlocalTime > this.localEndTime) {
                    time = this.localEndTime - this.localStartTime;
                }
            } else if (this.enterlocalTime > this.localStartTime && this.enterlocalTime < this.localEndTime) {
                //直播中进入
                if (this.gooutlocalTime < this.localEndTime) {
                    time = this.gooutlocalTime - this.enterlocalTime;
                } else {
                    time = this.localEndTime - this.enterlocalTime;
                }
            } else if (this.coursewareLivePath.includes('&livePlaybackStatus=Y')) {
                time = this.gooutlocalTime - this.enterlocalTime;
            }
            if (time / 1000 > 0) {
                // let playTime = DateUtil.dateFmt("YYYY-MM-DD hh:mm:ss");
                let params = {
                    playrds: [
                        {
                            classId: this.$parent.classId, //班级标识
                            coursewareId: this.$parent.coursewareId, //课件标识
                            playrdIP: '', //播放记录IP
                            playrdStarttime: this.enterlocalTime2, //播放记录开始时间
                            playrdDevice: 'W', //播放记录播放设备
                            playrdDevicename: this.$platform.OS, //播放记录播放设备名称
                            playrdDeviceos: 'W', //播放记录播放设备操作系统
                            playrdDeviceversion: this.$platform.version, //播放记录设备版本号
                            playrdMcc: this.playrdMcc, //模块课程目录名称
                            playrdDuration: time / 1000, //播放记录播放时长
                            playrdOfflinestatus: 'L', //L:在线播放;O:离线播放
                        },
                    ],
                };
                ylPlugin.login.getUser().then(
                    (user) => {
                        /* 获取登录信息的过程中没有失败 */
                        if (null == user) {
                            return;
                        }
                        this.$storage.set(user.userId + 'cc/playrd/batch/add', params);
                    },
                    (err) => {
                        /* 获取登录信息的过程中有失败 */
                        console.error(err);
                    }
                );
            }
        },
    },
};
</script>
<style lang="less" scoped>
.liveiframe {
    height: 100%;
    width: 100%;
}
</style>
