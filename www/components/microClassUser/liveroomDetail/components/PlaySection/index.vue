<template>
    <div class="class-top-box">
        <img src="./asset/images/liveroomDetail_01.png" alt="" class="left-img" />
        <img src="./asset/images/liveroomDetail_02.png" alt="" class="right-img" />
        <div class="play-live-content">
            <!--面包屑-->
            <div class="bread-crumb">
                <span v-for="(item, index) in breadCrumbList" :key="index">
                    <span v-if="index == 0" @click="toIndex" class="toindex">{{ item.name }}</span>
                    <span v-else :class="index == breadCrumbList.length - 1 ? 'bread-crumb-name-active' : ''">{{ item.name }}</span>
                    <img src="./asset/images/liveroomDetail_03.png" v-show="index != breadCrumbList.length - 1" alt="" class="bread-crumb-img" />
                </span>
            </div>
            <!--回放区-->
            <div class="play-video-section" v-if="liveCourse.courseStatus === 3">
                <play-video
                    ref="playVideo"
                    :show-video="showVideo"
                    :current-ware-dto="currentWareDto"
                    :ware-dto-list="liveCourse.wareDtoList"
                    :is-login="islogin"
                    @to-login="toLogin"
                ></play-video>
                <div class="paly-back-list">
                    <div class="course-catalogue">
                        <span class="course-catalogue-left"></span>
                        课程目录
                        <span class="course-total">共{{ liveCourse.wareDtoList.length }}节</span>
                    </div>
                    <ul class="course-list">
                        <li
                            v-for="item in liveCourse.wareDtoList"
                            :key="item.coursewareId"
                            :class="currentWareDto && liveCourse.wareDtoList.length !== 0 && currentWareDto.coursewareId === item.coursewareId ? 'active' : ''"
                            @click="switchPlayback(item)"
                        >
                            <div class="course-item-name">{{ item.coursewareName }}</div>
                            <div>
                                <span class="course-item-time">总时长{{ timeForm(item.coursewareDuration) }}</span>
                                <span class="audition" v-if="!islogin && (item.auditionStatus === 'L' || item.auditionStatus === 'F')">试听</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="course-play-name">{{ liveCourse.goodsName }}</div>
            </div>
            <!--直播区-->
            <play-live v-else @to-login="toLogin" :is-login="islogin"></play-live>
        </div>
        <!--已登录，不失效 未关注服务号-->
        <div class="attention-service-tip" @click="attentionService" v-if="isShowService">
            <img src="./asset/images/service_no.jpg" alt="" />
            <span>关注服务号，开启上课提醒</span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import PlayLive from '../../components/PlayLive/index.vue';
import PlayVideo from '../../components/PlayVideo/index.vue';
import mixin from '../../js/mixin.js';

export default {
    name: 'PlaySection',
    components: {
        PlayLive,
        PlayVideo,
    },
    mixins: [mixin],
    inject: ['copyliveCourse'],
    data() {
        let vm = this;
        return {
            breadCrumbList: [{ name: '微课首页' }, { name: '直播间' }, { name: '' }],
            currentWareDto: null, //当前播放的视频
            // isLogin: true, //true已登录，false未登录
            isShowService: false, //关注服务号浮窗
            liveCourse: vm.copyliveCourse(),
            isClassOnLine: false,
            showVideo: true,
        };
    },
    computed: {
        ...mapState('logout', ['islogin']),
    },
    watch: {
        currentWareDto() {
            this.currentWareDto &&
                window.history.replaceState(
                    null,
                    null,
                    `/agile-course/live-broadcast/${this.$route.params.liveId}?coursewareId=${this.currentWareDto.coursewareId}`
                );
        },
    },
    mounted() {
        this.$mcuLogin
            .checkLogin('login')
            .then((res) => {
                //判断是否登录,是否关注服务号，未关注，显示关注服务号提示
                this.isShowService = !res.bindWechat;
                if (this.liveCourse.courseStatus === 3) {
                    //登录播放第一个课程
                    this.selectCourse();
                }
            })
            .catch((err) => {
                console.error(err);
                //回放-未登录，播放试听列表，判断是否有原来的播放，没有第一个试听课程
                if (this.liveCourse.courseStatus === 3) {
                    this.selectCourse();
                }
            });
        this.breadCrumbList[2].name = this.liveCourse.goodsName;
    },
    methods: {
        selectCourse() {
            if (this.$route.query.coursewareId) {
                this.liveCourse.wareDtoList.forEach((item) => {
                    if (this.$route.query.coursewareId && item.coursewareId === this.$route.query.coursewareId) {
                        this.currentWareDto = item;
                    }
                });
            } else {
                this.currentWareDto = this.liveCourse.wareDtoList[0];
            }
        },
        //面包屑跳转微课首页
        toIndex() {
            this.$router.push('/agile-course');
        },
        async toLogin() {
            await this.getIsOffline(this.$route.params.liveId);
            this.isClassOnLine &&
                this.$mcuLogin
                    .checkLogin()
                    .then((res) => {
                        //登录播放第一个课程
                        this.showVideo = false;
                        this.$nextTick(() => {
                            this.showVideo = true;
                            this.$nextTick(() => {
                                this.currentWareDto.isUpdate += 1;
                            });
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                    });
        },
        async switchPlayback(item) {
            await this.getIsOffline(this.$route.params.liveId);
            // this.isClassOnLine 为false是直播失效，不做处理
            if (this.isClassOnLine) {
                if (item.coursewareId === this.currentWareDto.coursewareId) {
                    return;
                }
                window.history.replaceState(
                    null,
                    null,
                    `/agile-course/live-broadcast/${this.$route.params.liveId}?coursewareId=${this.currentWareDto.coursewareId}`
                );
                if (item.auditionStatus === 'N') {
                    // 不能试听
                    this.showVideo = false;
                    this.$nextTick(() => {
                        this.currentWareDto = item;
                    });
                    this.$mcuLogin
                        .checkLogin()
                        .then((res) => {
                            this.$nextTick(() => {
                                this.showVideo = true;
                                this.$nextTick(() => {
                                    // // 触发 PlayVideo.vue组件的watch方法
                                    // this.currentWareDto.isUpdate += 1;
                                });
                            });
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                } else {
                    this.showVideo = false;
                    this.$nextTick(() => {
                        this.currentWareDto = item;
                        this.showVideo = true;
                        this.$nextTick(() => {
                            // 触发 PlayVideo.vue组件的watch方法
                            // this.currentWareDto.isUpdate += 1;
                        });
                    });
                }
            }
        },
        attentionService() {
            this.$mcuLogin
                .checkLogin('appointment')
                .then((res) => {
                    this.isShowService = false;
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.class-top-box {
    height: 695px;
    background-color: #0f0f1e;
    position: relative;

    .left-img {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 413px;
        height: 292px;
        z-index: 2;
    }

    .right-img {
        position: absolute;
        right: 0;
        top: 0;
        width: 459px;
        height: 354px;
        z-index: 2;
    }

    .play-live-content {
        width: 1200px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -600px;
        z-index: 3;
    }

    /*面包屑*/

    .bread-crumb {
        font-size: 14px;
        color: #808080;
        height: 65px;
        line-height: 65px;
        padding-left: 8px;

        .toindex {
            cursor: pointer;
        }

        .bread-crumb-name-active {
            color: #ffffff;
        }

        .bread-crumb-img {
            width: 6px;
            height: 11px;
            margin-left: 8px;
            margin-right: 16px;
            vertical-align: middle;
            display: inline-block;
        }
    }
    /*回放区*/
    .play-video-section {
        background: #1c1d30;
        left: 0;
        right: 0;
        top: 65px;
        position: absolute;
        bottom: 18px;
        .paly-back-list {
            width: 316px;
            float: right;
            padding-left: 18px;
            padding-right: 16px;
            height: calc(100% - 50px);

            .course-catalogue {
                font-size: 16px;
                font-weight: 700;
                color: #ffffff;
                line-height: 57px;

                .course-catalogue-left {
                    width: 3px;
                    height: 16px;
                    background: #025eff;
                    border-radius: 1px;
                    vertical-align: middle;
                    display: inline-block;
                    position: relative;
                    top: -2px;
                }

                .course-total {
                    font-size: 14px;
                    text-align: left;
                    color: #9698a2;
                    float: right;
                }
            }

            .course-list {
                height: calc(100% - 57px);
                overflow: auto;

                li {
                    background: #282943;
                    border-radius: 2px;
                    padding-left: 15px;
                    padding-right: 15px;
                    padding-top: 12px;
                    margin-bottom: 16px;
                    height: 93px;
                    cursor: pointer;

                    .course-item-name {
                        font-size: 14px;
                        font-weight: 400;
                        color: #ffffff;
                        line-height: 20px;
                        margin-bottom: 12px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }

                    .course-item-time {
                        font-size: 13px;
                        color: #858898;
                        float: left;
                    }

                    .audition {
                        width: 44px;
                        height: 16px;
                        background: #025eff;
                        border-radius: 2px;
                        display: inline-block;
                        font-size: 12px;
                        text-align: center;
                        color: #ffffff;
                        line-height: 16px;
                        float: right;
                    }
                }

                .active {
                    background: #3f4060 url('./asset/images/liveroomDetail_23.png') right bottom no-repeat;
                    background-size: 56px 65px;
                }
            }
        }

        .course-play-name {
            font-size: 16px;
            color: #fcfbfb;
            line-height: 50px;
            padding-left: 16px;
        }
    }
}

.attention-service-tip {
    position: fixed;
    right: 24px;
    top: 150px;
    z-index: 99;
    width: 168px;
    height: 199px;
    background-image: url('./asset/images/liveroomDetail_26.png');
    background-size: 149px 169px;
    background-repeat: no-repeat;
    background-position-x: right;
    cursor: pointer;

    img {
        position: absolute;
        width: 88px;
        height: 88px;
        float: right;
        top: 71px;
        right: 46px;
        box-sizing: border-box;
    }
    span {
        width: 168px;
        box-sizing: border-box;
        height: 30px;
        background: linear-gradient(90deg, #3a85fe, #025eff);
        border: 1px solid #f1f6ff;
        border-radius: 16px;
        font-size: 12px;
        text-align: center;
        color: #ffffff;
        line-height: 30px;
        display: inline-block;
        position: absolute;
        bottom: 0;
    }
}
</style>
