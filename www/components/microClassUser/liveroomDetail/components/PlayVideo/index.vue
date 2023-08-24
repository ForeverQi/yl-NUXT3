<template>
    <div class="paly-back">
        <div
            class="goods-cover"
            :style="{ 'background-image': 'url(' + $urlUtils.getViewUrl(liveCourse.goodsCover) + ')' }"
            v-if="currentWareDto && currentWareDto.auditionStatus === 'N' && !isLogin"
        >
            <div class="status-wrap" @click="toLogin"></div>
        </div>
        <vb-video ref="vbVideo" v-else-if="showVideo" @ready="courseReady" @isFullScreen="doFullScreen" @afterDestory="videoRest" :is-overflow="true">
            <div
                class="tip"
                slot="mask"
                v-if="isShowTip && !isLogin && currentWareDto && (currentWareDto.auditionStatus === 'L' || currentWareDto.auditionStatus === 'F')"
            >
                <!--播放结束-->
                <template v-if="isEndAudition">试看已结束，登录后观看完整视频</template>
                <!--  L:限时试听;N:不允许试听;F:整节试听-->
                <!--未结束-->
                <template v-else-if="currentWareDto.auditionStatus === 'F'">试看本小节，登录后观看完整视频</template>
                <template v-else-if="currentWareDto.auditionStatus === 'L'">试看{{ currentWareDto.auditionDuration }}分钟，登录后观看完整视频</template>
                <span class="toLogin" @click="toLogin">去登录</span>
                <img src="./asset/images/liveroomDetail_25.png" class="close" @click="isShowTip = false" />
            </div>
        </vb-video>
    </div>
</template>

<script>
import vbVideo from '@/www/components/business/vbVideo/index.vue';
export default {
    name: 'PlayVideo',
    components: {
        vbVideo,
    },
    inject: ['copyliveCourse'],
    props: {
        showVideo: {
            type: Boolean,
            default: true,
        },
        currentWareDto: {
            type: Object,
            default() {
                return {
                    auditionStatus: 'N',
                };
            },
        },
        wareDtoList: {
            type: Array,
            default: () => [],
        },
        isLogin: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        let vm = this;
        return {
            isShowTip: true,
            isEndAudition: false, //试听是否结束  false未结束，true试听结束
            liveCourse: vm.copyliveCourse(),

            playPromise: null,
            playResolve: null,
            playReject: null,
            PlayReturn: null,

            isFirst: true,
        };
    },
    watch: {
        currentWareDto: {
            handler(newval, oldval) {
                if (newval) {
                    this.changeVid();
                }
            },
            immediate: true,
            deep: true,
        },
    },
    mounted() {
        this.videoRest();
        this.isShowTip = true;
    },
    methods: {
        videoRest() {
            // 视频组件销毁后重置
            this.isFirst = true;
            this.PlayReturn = null;
            this.playPromise = new Promise((resolve, reject) => {
                this.playResolve = resolve;
                this.playReject = reject;
            });
        },
        toLogin() {
            this.$emit('to-login');
        },
        courseReady() {
            // 点播课组件初始化成功autoplay
            this.playResolve();
        },
        changeVid() {
            this.playPromise.then(() => {
                this.doChangeVid();
            });
        },
        doChangeVid() {
            this.isShowTip = true;
            this.isEndAudition = false;
            if (this.PlayReturn) {
                this.PlayReturn.changeVid({
                    videoId: this.currentWareDto.coursewarePath,
                    type: 'C',
                    goodsId: this.$route.params.liveId,
                    coursewareId: this.currentWareDto.coursewareId,
                    autoplay: true,
                    volume: 0,
                    watchEndTime: !this.isLogin && this.currentWareDto.auditionStatus == 'L' ? this.currentWareDto.auditionDuration * 60 : null,
                });
            } else {
                console.log('初始化');
                console.log(this.currentWareDto);
                this.trackCoursePlay();
                if (!(this.currentWareDto && this.currentWareDto.auditionStatus === 'N' && !this.isLogin)) {
                    this.$nextTick(() => {
                        this.$refs.vbVideo
                            .playVid(
                                {
                                    videoId: this.currentWareDto.coursewarePath,
                                    type: 'P',
                                    bizId: '',
                                    autoplay: true,
                                    volume: 0,
                                },
                                {
                                    autoplay: true,
                                    goodsId: this.$route.params.liveId,
                                    coursewareId: this.currentWareDto.coursewareId,
                                    watchEndTime:
                                        !this.isLogin && this.currentWareDto.auditionStatus === 'L' ? this.currentWareDto.auditionDuration * 60 : null,
                                }
                            )
                            .then((instance) => {
                                (this.PlayReturn = instance).start(() => {
                                    if (this.isFirst) {
                                        this.isFirst = false;
                                        instance.setVolume(0);
                                    }
                                });
                                this.PlayReturn.over(() => {
                                    //播放完触发
                                    this.isEndAudition = true;
                                    this.isShowTip = true;
                                    /*if (this.auditionList[this.auditionList.length - 1].coursewareId === this.currentWareDto.coursewareId) {
                                    this.isEndAudition = true; //试听是否结束  false未结束，true试听结束
                                }*/
                                });
                            })
                            .catch((err) => {
                                this.$baseUI.alert(err?.getDescription?.() || err || '请刷新重试');
                            });
                    });
                }
            }
        },
        trackCoursePlay(track = {}) {
            this.$yiguan.mcuTrack('wk_course_play', {
                course_name: this.liveCourse.goodsName,
                mycourse_subject_name: this.liveCourse.subjectName,
                web_is_order: this.liveCourse.appointmentStatus === 'Y',
                course_type: '直播间课程',
                paly_type: '看回放',
                ail_page_source: location.href,
                ...track,
            });
        },
        doFullScreen(type) {
            this.isFullScreen = type;
            if (this.isFullScreen) {
                // window.onFullscreenProxy();
            }
        },
    },
};
</script>

<style lang="less" scoped>
.paly-back {
    width: 884px;
    float: left;
    background-color: #fff0f0;
    height: calc(100% - 50px);
    position: relative;
    /*提示*/
    .tip {
        position: absolute;
        color: #ffffff;
        font-size: 13px;
        z-index: 20;
        bottom: 51px;
        left: 0;
        height: 40px;
        line-height: 40px;
        padding-left: 16px;
        padding-right: 23px;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 0px 100px 100px 0px;

        .toLogin {
            color: #1791ff;
            margin-left: 10px;
            cursor: pointer;
        }

        .close {
            width: 18px;
            height: 18px;
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
        }
    }

    .goods-cover {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        cursor: pointer;
        /*background: url('./asset/images/liveroomDetail_28.png') no-repeat;*/
        background-size: cover;
        background-repeat: no-repeat;
        /*   background-position: center;*/
    }
}
.status-wrap {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.6) url('./asset/images/liveroomDetail_27.png') no-repeat;
    background-size: 80px 80px;
    background-position: center;
}
</style>
