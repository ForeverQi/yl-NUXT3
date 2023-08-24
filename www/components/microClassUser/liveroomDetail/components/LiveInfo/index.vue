<template>
    <div class="live-info-section">
        <div class="live-info-content">
            <span class="live-info-fl">
                <img src="./asset/images/liveroomDetail_04.png" alt="" class="live" />
                <span class="share" @click="share">
                    <img src="./asset/images/liveroomDetail_05.png" alt="" class="share-img" />
                    分享
                </span>
                <div style="clear: both"></div>
                <div class="live-name">{{ liveCourse.goodsName }}</div>
            </span>
            <!--上课提醒-->
            <span class="live-status" v-if="liveCourse.courseStatus === 1">
                <span class="fl">
                    <span class="count-down" v-if="msTime && msTime.show">
                        <template v-if="msTime.day > 0">
                            <span class="daynum">{{ msTime.day }}</span>
                            <span class="day">天</span>
                        </template>
                        <span class="time">{{ msTime.hour }}</span>
                        <span>:</span>
                        <span class="time">{{ msTime.minutes }}</span>
                        <span>:</span>
                        <span class="time">{{ msTime.seconds }}</span>
                    </span>
                    <div class="live-date">直播时间 {{ liveCourse.courseStartTime | dayFormat }}</div>
                </span>
                <span class="class-reminder" v-if="liveCourse.appointmentStatus == 'Y'">已预约</span>
                <span class="class-reminder" v-else @click="toOrder">上课提醒</span>
            </span>
            <!--直播中-->
            <span class="live-status-other" v-if="liveCourse.courseStatus === 2">
                <span class="live-status-text">
                    <img src="./asset/images/liveroomDetail_06.png" class="live-status-img" alt="" />
                    <span class="live-status-ongoing">直播进行中</span>
                </span>
                <div class="live-date">直播时间 {{ liveCourse.courseStartTime | dayFormat }}</div>
            </span>
            <!--直播回放-->
            <span class="live-status-other" v-if="liveCourse.courseStatus === 3">
                <span class="live-status-text">
                    <img src="./asset/images/liveroomDetail_07.png" class="live-status-img playback-toleft" alt="" />
                    <span class="live-status-playback">完整回放</span>
                </span>
                <div class="live-date">总时长 {{ timeForm(liveCourse.allWareDuration) }}</div>
            </span>
            <!--已结束-->
            <span class="live-status-other" v-if="liveCourse.courseStatus === 4">
                <span class="live-status-text">
                    <img src="./asset/images/liveroomDetail_08.png" class="live-status-img playend-toleft" alt="" />
                    <span class="live-status-playend">直播已结束，回放生成中</span>
                </span>
                <div class="live-date">直播时间 {{ liveCourse.courseStartTime | dayFormat }}</div>
            </span>
        </div>

        <!--分享弹窗-->
        <!--小程序地址生成二维码-->
        <share-popup :show.sync="showSharePopup" :share-img="$urlUtils.getViewUrl(shareImg)" title="扫码分享">
            <template #footer>
                <div class="share-popup-footer">微信扫一扫，分享给好友</div>
            </template>
        </share-popup>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import { liveCourseWebAppointment, publicExtensioncenterReceive, webPoster, liveCourseWebDetail } from '../../apis/index.js';
import mixin from '../../js/mixin.js';
import sharePopup from '@/www/components/microClassUser/components/sharePopup/sharePopup/index.vue';
import LightPrompt from '@/www/components/microClassUser/components/lightPrompt/index.vue';

export default {
    name: 'LiveInfo',
    components: {
        sharePopup,
        LightPrompt,
    },
    filters: {
        dayFormat(value) {
            return dayjs(value).format('YYYY-MM-DD HH:mm');
        },
    },
    mixins: [mixin],
    inject: ['copyliveCourse'],
    data() {
        let vm = this;
        return {
            /*分享弹框*/
            showSharePopup: false, //全屏弹窗
            shareImg: '',
            timer: '',
            msTime: {
                //倒计时数值
                show: false, //倒计时状态
                day: '', //天
                hour: '', //小时
                minutes: '', //分钟
                seconds: '', //秒
            },
            countDowntimer: null,
            liveCourse: vm.copyliveCourse(),
            isClassOnLine: false,
        };
    },
    mounted() {
        if (this.liveCourse.courseStatus === 1) {
            let vm = this;
            this.countDowntimer = this.$countDown.runTime(
                new Date(this.liveCourse.courseStartTime).getTime(),
                new Date(this.liveCourse.currentTime).getTime(),
                function (val) {
                    if (val != '') {
                        vm.msTime = val;
                        if (typeof val == 'undefined') {
                            console.log('倒计时结束');
                            vm.$bus.$emit('count-down');
                        }
                    } else {
                        this.$baseUI.alert('倒计时结束');
                    }
                }
            );
        }
        this.webPoster();
    },
    beforeDestroy() {
        clearTimeout(this.timer);
        clearTimeout(this.countDowntimer);
    },
    methods: {
        //点击分享
        share() {
            this.validCourse()
                .then(() => {
                    this.showSharePopup = true;
                    this.trackShare();
                })
                .catch((err) => {
                    this.$baseUI.mcumsg
                        .confirm({
                            title: '提示',
                            content: err?.getDescription() || err,
                            showCancel: false,
                            confirmText: '返回【微课首页】',
                        })
                        .then(() => {
                            window.open(`/agile-course/${this.liveCourse.projectId}`, '_self');
                        })
                        .catch((e) => {
                            console.warn(e);
                            this.$emit('error', err.getAttachedData().getData());
                        });
                });
        },
        webPoster() {
            return webPoster(this, {
                goodsId: this.liveCourse.goodsId,
                shareType: 'W',
                resourceType: 'ZB',
            })
                .then((res) => {
                    this.shareImg = res.posterImg;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        //上课预约
        async toOrder() {
            await this.getIsOffline(this.liveCourse.goodsId);
            if (this.isClassOnLine) {
                let clueExtension = await this.$PromotionUtil.mcuClueOrBeHavior({
                    clueWaycode: 'yindao',
                    projectId: this.liveCourse.projectId,
                    pageName: `[直播间]-${this.liveCourse.goodsName}`,
                    projectName: this.liveCourse.projectName,
                    remark: `【直播预约】-${this.liveCourse.goodsName}`,
                });
                this.$mcuLogin
                    .checkLogin('appointment')
                    .then(({ isFirst }) => {
                        // res.isFirst && this.$PageUtil.reflush();
                        // 已经登录的直接执行调用预约接口
                        this.doSubsribe().then(() => {
                            !isFirst && this.publicExtensioncenterReceive(clueExtension);
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },

        publicExtensioncenterReceive(value) {
            let clueExtension = JSON.parse(value);
            console.log(typeof clueExtension);
            return publicExtensioncenterReceive(this, clueExtension)
                .then((res) => {})
                .catch((err) => {
                    console.error(err);
                });
        },
        // 预约
        doSubsribe() {
            return liveCourseWebAppointment(this, {
                liveId: this.liveCourse.goodsId,
            })
                .then((res) => {
                    this.$Message.success('预约成功！');
                    this.liveCourse.appointmentStatus = 'Y';
                    this.trackLiveOrder();
                })
                .catch((err) => {
                    console.error(err);
                    this.trackLiveOrder({
                        is_success: false,
                        fail_reason: String(err),
                    });
                    return Promise.reject();
                });
        },
        trackLiveOrder(track = {}) {
            this.$yiguan.mcuTrack('wk_live_order', {
                course_name: this.liveCourse.goodsName,
                web_belong_subject: this.liveCourse.subjectName,
                is_success: true,
                fail_reason: '',
                ...track,
            });
        },
        trackShare(track = {}) {
            this.$yiguan.mcuTrack('wk_share', {
                course_type: '直播间课程',
                course_name: this.liveCourse.goodsName,
                mycourse_subject_name: this.liveCourse.subjectName,
                web_share_category: '微信',
                ...track,
            });
        },
        validCourse() {
            return liveCourseWebDetail(this, {
                goodsId: this.liveCourse.goodsId,
            });
        },
    },
};
</script>

<style lang="less" scoped>
.fl {
    float: left;
}
.live-info-section {
    background-color: #ffffff;
    // height: 114px;
    padding-bottom: 20px;
}

.live-info-content {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .live-info-fl {
        float: left;
        width: 840px;
        margin-top: 24px;
    }
    .live {
        width: 102px;
        height: 19px;
        margin-right: 38px;
        float: left;
    }

    .share {
        font-size: 14px;
        text-align: left;
        color: #77798d;
        float: left;
        display: flex;
        align-items: center;
        cursor: pointer;
        .share-img {
            width: 14px;
            height: 14px;
            align-items: center;
            margin-right: 8px;
        }
    }

    .live-name {
        font-size: 20px;
        color: #333333;
        margin-top: 24px;
        font-weight: bold;
    }

    .live-status {
        float: right;
        margin-top: 30px;
    }
    .live-date {
        font-size: 14px;
        color: #999999;
        clear: both;
        text-align: right;
    }

    .class-reminder {
        width: 104px;
        height: 38px;
        display: inline-block;
        background: linear-gradient(90deg, #3a85fe, #025eff);
        border-radius: 19px;
        font-size: 14px;
        text-align: center;
        color: #ffffff;
        line-height: 38px;
        margin-left: 40px;
        float: right;
        margin-top: 10px;
        cursor: pointer;
        font-weight: bold;
    }

    /*直播中*/
    .live-status-other {
        float: right;
        margin-top: 40px;
        text-align: right;
        .live-status-text {
            position: relative;
            margin-bottom: 8px;
            .live-status-img {
                position: absolute;
                top: 50%;
                margin-top: -11px;
                right: 98px;
                width: 22px;
                height: 22px;
            }

            .playback-toleft {
                right: 80px;
            }
            .playend-toleft {
                right: 206px;
            }
            .live-status-ongoing,
            .live-status-playback,
            .live-status-playend {
                font-size: 18px;
                color: #333333;
                height: 24px;
                margin-left: auto;
                display: inline-block;
                background: url('./asset/images/liveroomDetail_17.png') center bottom no-repeat;
                background-size: 100% 6px;
                font-weight: bold;
            }
            .live-status-playback {
                background: url('./asset/images/liveroomDetail_18.png') center bottom no-repeat;
                background-size: 100% 6px;
            }
            .live-status-playend {
                background: url('./asset/images/liveroomDetail_20.png') center bottom no-repeat;
                background-size: 100% 6px;
            }
        }
        .live-date {
            margin-top: 8px;
        }
    }
}

/*分享弹框*/
.share-popup-footer {
    color: #333333;
    font-size: 18px;
    text-align: center;
}

/*倒计时*/
.count-down {
    font-size: 14px;
    color: #333333;
    float: left;
    margin-bottom: 6px;
    width: 100%;
    text-align: right;
    .daynum {
        font-size: 24px;
        font-weight: 700;
        color: #f8323c;
    }

    .day {
        margin-left: 4px;
        margin-right: 8px;
    }

    .time {
        width: 34px;
        height: 36px;
        background: #fff3f3;
        border-radius: 8px;
        font-size: 22px;
        font-weight: 700;
        text-align: center;
        color: #f8323c;
        line-height: 36px;
        display: inline-block;
    }

    /*.colon {
        margin-left: 4px;
        margin-right: 4px;
    }*/
}
</style>
