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
                        <span class="live-date">倒计时</span>
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
                <span class="class-reminder" v-else @click="toOrder">立即预约</span>
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
        <popup-share :show.sync="showSharePopup" :share-img="$urlUtils.getViewUrl(shareImg)" title="扫码分享">
            <template #footer>
                <div class="share-popup-footer">微信扫一扫，分享给好友</div>
            </template>
        </popup-share>

        <sweep-yards-attention
            :show.sync="isShowSweepYardsAttention"
            position-type="预约直播课时"
            :user="user"
            @change-attention-status="handleAttentionStatus"
        ></sweep-yards-attention>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import dayjs from 'dayjs';
import '@/api/mcp/api..query-liveCourse-web-detail.js';
import '@/api/mcu/api.mcu01.mcp-home-top-live-subscribe.js';
import '@/api/mcu/api.mcu-001.public-extensioncenter-receive.js'; //线索推送
import '@/api/mcu/api.mcu-003.mcp-web-poster.js'; //分享-海报生成
import '@/api/cl/api..user-audition-log-add.js';
import mixin from '../js/mixin.js';
import SweepYardsAttention from '../../detail/sweep-yards-attention/index.vue';
import PopupShare from '@/www/components/components/popup-share/index.vue';
import track from '@/www/components/course/free-course/js/track.js';

export default {
    name: 'LiveInfo',
    components: {
        PopupShare,
        SweepYardsAttention,
    },
    filters: {
        dayFormat(value) {
            return dayjs(value).format('YYYY-MM-DD HH:mm');
        },
    },
    mixins: [mixin, track],
    data() {
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
            isClassOnLine: false,
            isShowSweepYardsAttention: false,
            isConcernServiceNumber: false, //未关注
            user: null,
        };
    },
    computed: {
        ...mapState('open', ['liveCourse', 'projectSeoCode', 'projectCode']),
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
                            vm.liveCourse.courseStatus = 2;
                            vm.setliveCourse(vm.liveCourse);
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
        ...mapMutations('open', ['setliveCourse', 'setAppointmentStatus']),
        //点击分享
        async share() {
            await this.getIsOffline(this.liveCourse.goodsId);
            if (this.isClassOnLine) {
                this.showSharePopup = true;
                this.trackShare();
            }
        },
        webPoster() {
            return new Promise((resolve, reject) => {
                this.$callApi('public/mcp-web-poster', {
                    goodsId: this.liveCourse.goodsId,
                    shareType: 'W',
                    resourceType: 'ZB',
                    onsuccess: (res) => {
                        this.shareImg = res.posterImg;
                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                });
            });
        },
        //上课预约
        async toOrder() {
            this.addLog();
            await this.getIsOffline(this.liveCourse.goodsId);
            if (this.isClassOnLine) {
                //待修改，判断是否登录，登录然后判断是否关注，1关注进行预约2.未关注进行扫码登录
                await this.getBindStatus();
                if (this.isConcernServiceNumber) {
                    /*let clueExtension = await this.$Promotion.getClueExtensionInfo({ clueWaycode: 'zbyl', originCode: 'ylgwylgwyyzbk' });*/
                    this.doSubsribe()
                        .then(() => {
                            /*this.publicExtensioncenterReceive(clueExtension);*/
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    ylPlugin.login.getUser().then(
                        (user) => {
                            if (null == user) {
                                this.ylLoginByPwd('直播课-立即预约');
                                return;
                            }
                            this.user = user;
                            this.isShowSweepYardsAttention = true;
                            this.doSubsribe()
                                .then(() => {
                                    /*this.$PromotionUtil
                                        .getOptExtension_new({
                                            originCode: 'ylgwylgwyyzbk',
                                            clueWaycode: 'zbyl',
                                            project: {
                                                projectId: this.liveCourse.projectId,
                                                projectCode: this.projectCode,
                                                projectSeocode: this.projectSeoCode,
                                            },
                                            pageName: this.liveCourse.goodsName,
                                        })
                                        .then((clueExtension) => {
                                            this.publicExtensioncenterReceive(clueExtension);
                                        });*/
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        },
                        (err) => {
                            /* 实例ID获取失败 */
                            console.error('实例ID获取失败：' + err);
                        }
                    );
                }
            }
        },
        addLog() {
            ylPlugin.login.getUser().then((user) => {
                return this.$callApi('cl/user-audition-log-add', {
                    classId: this.liveCourse.goodsId,
                    userId: user ? user.userId : '',
                });
            });
        },
        handleAttentionStatus(value) {
            this.isConcernServiceNumber = value;
            if (value) {
                /*let clueExtension = await this.$Promotion.getClueExtensionInfo({ clueWaycode: 'zbyl', originCode: 'ylgwylgwyyzbk' });
                console.log('预约成功------推送线索参数', clueExtension);*/
                this.doSubsribe()
                    .then(() => {
                        /*this.publicExtensioncenterReceive(clueExtension);*/
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            this.followUpServiceNumberTrack({ is_success: value });
        },
        /*publicExtensioncenterReceive(value) {
            let clueExtension = JSON.parse(value);
            console.log(typeof clueExtension);
            this.$callApi('public/public-extensioncenter-receive', {
                ...clueExtension,
                onsuccess: () => {},
                onerror: (err) => {
                    console.error(err);
                },
            });
        },*/
        // 预约
        doSubsribe() {
            return new Promise((resolve, reject) => {
                this.$callApi('topLive/mcp-home-top-live-subscribe', {
                    liveId: this.liveCourse.goodsId,
                    onsuccess: (res) => {
                        this.$Message.success('预约成功！');
                        this.setAppointmentStatus('Y');
                        this.trackLiveOrder();
                        resolve();
                    },
                    onerror: (err) => {
                        this.trackLiveOrder({
                            is_success: false,
                        });
                        reject(err);
                    },
                });
            });
        },
        /*trackLiveOrder(track = {}) {
            this.$yiguan.mcuTrack('wk_live_order', {
                course_name: this.liveCourse.goodsName,
                web_belong_subject: this.liveCourse.subjectName,
                is_success: true,
                fail_reason: '',
                fail_reason: String(err),
                ...track,
            });
        },*/
        trackShare(track = {}) {
            this.$yiguan.mcuTrack('wk_share', {
                course_type: '直播间课程',
                course_name: this.liveCourse.goodsName,
                mycourse_subject_name: this.liveCourse.subjectName,
                web_share_category: '微信',
                ...track,
            });
        },
        trackLiveOrder(track = {}) {
            this.trackWebYouluLiveAppointment({
                course_name: this.liveCourse.goodsName,
                project_id: this.liveCourse.projectId,
                subject_id: this.liveCourse.subjectId,
            });
        },
        followUpServiceNumberTrack(track = {}) {
            this.trackWebYouluFollowUpServiceNumber({
                is_success: true,
                page_name: this.liveCourse.goodsName + '_优路教育',
                course_type: '公开课',
                project_id: this.liveCourse.projectId,
                // subject_name: this.liveCourse.subjectId,
                follow_timing: '预约直播课时',
                ...track,
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
    padding-bottom: 24px;
}

.live-info-content {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .live-info-fl {
        float: left;
        width: 805px;
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
        width: 690px;
        line-height: 29px;
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
        background: linear-gradient(90deg, #ff6870, #f8323c);
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
