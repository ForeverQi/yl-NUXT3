<template>
    <div class="live-calendar" :class="{ bm20: isIndex }" v-if="liveCalendarList.length > 0">
        <div class="live-calendar-content">
            <div class="live-calendar-title">
                <span class="live-calendar-title-text">直播日历</span>
                <span class="paging" v-if="page.pageCount > 1">
                    <span class="arrow-left" @click="prePage" :class="page.pageIndex > 1 ? 'arrow-left-check' : ''"></span>
                    &nbsp;&nbsp;
                    <span class="active">{{ page.pageIndex }}</span>
                    /{{ page.pageCount }}&nbsp;&nbsp;
                    <span class="arrow-right" :class="page.pageIndex < page.pageCount ? 'arrow-right-check' : ''" @click="nextPage"></span>
                </span>
            </div>
            <ul class="calendar-list">
                <li v-for="item in liveCalendarList" :key="item.goodsId">
                    <div>
                        <span class="week">{{ item.liveTimeWeek }} {{ item.liveTimeWeek == '今天' ? item.liveTimeTime : '' }}</span>
                        {{ item.liveTimeDate }}
                    </div>
                    <div class="horizontal-line"></div>
                    <span class="live-status-ongoing" v-if="item.courseStatus === 2"></span>
                    <span class="live-status-notstart" v-if="item.courseStatus === 1"></span>
                    <span class="live-status-playback" v-if="item.courseStatus === 3"></span>
                    <span class="live-status-playend" v-if="item.courseStatus === 4"></span>
                </li>
            </ul>
            <ul class="live-list">
                <li @click="toLiveDetail(item.goodsId)" v-for="item in liveList" :key="item.goodsId">
                    <img :src="$urlUtils.getViewUrl(item.goodsCover)" alt="" :onerror="errorimg" />
                    <div class="live-name">{{ item.goodsName }}</div>
                    <span class="live-date">直播时间：{{ item.courseStartTime | dayFormat }}</span>
                    <div class="live-bottom">
                        <img :src="$urlUtils.getViewUrl(item.teacherImage)" :onerror="errorimg1" alt="" />
                        <span class="live-teacher">{{ item.teacherName }}</span>
                        <span class="live-operation" v-if="item.courseStatus === 3">完整回放</span>
                        <span class="live-operation width-auto" v-if="item.courseStatus === 2">进入直播间</span>
                        <span class="live-operation" v-if="item.courseStatus === 1 && item.appointmentStatus === 'Y'">已预约</span>
                        <span class="live-operation" v-if="item.courseStatus === 1 && item.appointmentStatus === 'N'" @click.stop="toOrder(item)">
                            上课提醒
                        </span>
                    </div>
                </li>
            </ul>
            <div class="clear-both"></div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import dayjs from 'dayjs';
import '@/api/mcu/api.MCU1001.liveCourse-web-list.js';
import '@/api/mcu/api.mcu01.mcp-home-top-live-subscribe.js';
import '@/api/mcu/api.mcu-001.public-extensioncenter-receive.js';
import '@/api/mcu/api.MCU1002.liveCourse-web-detail.js';

export default {
    name: 'LiveCalendar',
    filters: {
        dayFormat(value) {
            return dayjs(value).format('YYYY-MM-DD HH:mm');
        },
    },
    props: {
        projectId: {
            type: String,
            default: '',
        },
        isIndex: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            errorimg: 'this.src="' + require('./asset/images/errorimg.png') + '"',
            errorimg1: 'this.src="' + require('./asset/images/teacher_avatar.png') + '"',
            // isLogin: false,
            liveList: [],
            liveCalendarList: [],
            page: {
                pageIndex: 1,
                pageSize: 4,
                pageCount: 0,
            },
            isClassOnLine: false,
            currentItem: null,
            liveCourse: {},
        };
    },
    computed: {
        ...mapState('logout', ['islogin']),
        ...mapState('mcuStore', ['liveUpdate']),
    },
    watch: {
        liveUpdate(val) {
            if (val) {
                // 直播预约成功更新列表
                this.getList();
            }
        },
        islogin(val) {
            if (val) {
                // 从未登录到登录更新列表
                this.getList();
            }
        },
        projectId(val, oldVal) {
            if (val !== oldVal) {
                this.page.pageIndex = 1;
                this.getList();
            }
        },
    },
    mounted() {
        this.getList();
    },
    methods: {
        ...mapMutations('mcuStore', ['setLiveCalendar', 'setRemark', 'setPageName', 'setProjectId', 'setProjectName', 'setLiveUpdate']),
        getList() {
            return this.liveCourseWebList()
                .then((res) => {
                    this.liveCalendarList = [];
                    this.liveList = res.data;
                    this.liveList.forEach((item) => {
                        if (item.courseStatus == '1' || item.courseStatus == '2' || item.courseStatus == '3' || item.courseStatus == '4') {
                            item.liveTimeDate = dayjs(item.courseStartTime).format('MM月DD日');
                            item.liveTimeTime = dayjs(item.courseStartTime).format('HH:mm');
                            if (dayjs(item.courseStartTime).format('MM月DD日') === dayjs(new Date()).format('MM月DD日')) {
                                item.liveTimeWeek = '今天';
                            } else {
                                switch (dayjs(item.courseStartTime).day()) {
                                    case 0:
                                        item.liveTimeWeek = '星期日';
                                        break;
                                    case 1:
                                        item.liveTimeWeek = '星期一';
                                        break;
                                    case 2:
                                        item.liveTimeWeek = '星期二';
                                        break;
                                    case 3:
                                        item.liveTimeWeek = '星期三';
                                        break;
                                    case 4:
                                        item.liveTimeWeek = '星期四';
                                        break;
                                    case 5:
                                        item.liveTimeWeek = '星期五';
                                        break;
                                    case 6:
                                        item.liveTimeWeek = '星期六';
                                        break;
                                }
                            }
                            this.liveCalendarList.push(item);
                        }
                    });
                    this.page.pageCount = Math.max(1, Math.ceil(res.count / this.page.pageSize));
                    if (res.count == 0) {
                        this.$emit('empty-handle', 'liveList');
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        toLiveDetail(goodsId) {
            const { href } = this.$router.resolve({
                name: 'liveroomDetail',
                params: { liveId: goodsId },
            });
            this.$PageUtil.openNewPage(href);
        },
        prePage() {
            if (this.page.pageIndex > 1) {
                this.page.pageIndex = this.page.pageIndex - 1;
                this.getList();
            }
        },
        nextPage() {
            if (this.page.pageIndex < this.page.pageCount) {
                this.page.pageIndex = this.page.pageIndex + 1;
                this.getList();
            }
        },
        /*上课预约*/
        async toOrder(item) {
            this.currentItem = item;
            await this.getIsOffline(item);
            if (this.isClassOnLine) {
                if (this.isIndex) {
                    this.setRemark(`【直播预约】${item.goodsName}`);
                    this.setPageName(`优路微课-首页`);
                    this.setProjectId(item.projectId);
                    this.setProjectName(item.projectName);
                }

                let clueExtension = await this.$PromotionUtil.mcuClueOrBeHavior({
                    clueWaycode: 'yindao',
                    projectId: this.projectId,
                    pageName: this.isIndex ? '优路微课-首页' : `[直播预约]${item.goodsName}`,
                    projectName: item.projectName,
                    remark: `【直播预约】${item.goodsName}`,
                });
                this.$mcuLogin.checkLogin('appointment').then((res) => {
                    if (res.isFirst === true) {
                        // 第一次登录 获取当前课程详情判断是否已登录
                        this.getIsOffline(item).then(() => {
                            if (this.liveCourse.appointmentStatus === 'Y') {
                                // 已预约
                                return Promise.resolve();
                            } else {
                                // 未预约
                                return this.doSubsribe(item).then(() => {
                                    this.setLiveCalendar(item.goodsId);
                                });
                            }
                        });
                    } else {
                        return this.doSubsribe(item).then(() => {
                            this.publicExtensioncenterReceive(clueExtension);
                            this.setLiveCalendar(item.goodsId);
                        });
                    }
                });
            }
        },
        getIsOffline(item) {
            //判断是否下线，是弹出下线提示；未下线，判断是否登录关注服务号，然后预约成功
            let data = {
                url: 'zhibomokuai/liveCourse-web-detail',
                params: {
                    goodsId: item.goodsId,
                },
                isCustom: true,
            };
            return this.httpClient(data)
                .then((res) => {
                    this.isClassOnLine = true;
                    this.liveCourse = res;
                })
                .catch((err) => {
                    if (err.getAttachedData().getData().code === '4999') {
                        this.isClassOnLine = false;
                        this.offlinePopup();
                    }
                });
        },
        //下线提示
        offlinePopup() {
            this.$baseUI
                .alert('该直播课已下线', '提示', { confirmText: '返回【微课首页】' })
                .then(() => {
                    this.$router.push(`/agile-course/${this.projectId}`);
                })
                .catch(() => {
                    this.$PageUtil.reflush();
                });
        },
        doSubsribe(item) {
            return this.doAppointment(item)
                .then((res) => {
                    this.$Message.success('预约成功！');
                    item.appointmentStatus = 'Y';
                    console.warn(res);

                    this.setLiveUpdate(item.goodsId);
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
                course_name: this.currentItem.goodsName,
                web_belong_subject: this.currentItem.subjectName,
                is_success: true,
                fail_reason: '',
                ...track,
            });
        },
        doAppointment(item) {
            let data = {
                url: 'topLive/mcp-home-top-live-subscribe',
                params: {
                    liveId: item.goodsId,
                },
                isCustom: false,
            };
            return this.httpClient(data);
        },
        liveCourseWebList() {
            let data = {
                url: 'zhibomokuai/liveCourse-web-list',
                params: {
                    projectId: this.projectId,
                    showClient: 'W',
                    pageIndex: this.page.pageIndex,
                    pageSize: this.page.pageSize,
                    indexFlag: true,
                },
                isCustom: false,
            };
            return this.httpClient(data);
        },
        publicExtensioncenterReceive(value) {
            let clueExtension = JSON.parse(value);
            console.log(typeof clueExtension);
            let data = {
                url: 'public/public-extensioncenter-receive',
                params: {
                    ...clueExtension,
                },
                isCustom: true,
            };
            return this.httpClient(data);
        },
        httpClient({ url, params = {}, isCustom = false }) {
            return new Promise((resolve, reject) => {
                this.$callApi(url, {
                    ...params,
                    onsuccess: (data) => {
                        resolve(data);
                    },
                    onerror: (err) => {
                        if (!isCustom) {
                            this.$niceloo.api.handleFailure(err);
                        }
                        return reject(err);
                    },
                });
            });
        },
    },
};
</script>

<style lang="less" scoped>
.clear-both {
    clear: both;
}
.live-calendar {
    background-color: #f6f7f9;
    padding-top: 20px;
    padding-bottom: 62px;

    &.bm20 {
        padding-bottom: 50px;
        padding-top: 0;
        .live-calendar-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .live-calendar-title-text {
            line-height: 1;
            padding-bottom: 18px;
        }

        .paging {
            margin: 0;
            padding-bottom: 18px;
            line-height: 1;
        }
    }
    .live-calendar-content {
        width: 1200px;
        margin: 0 auto;
    }
}
.live-calendar-title {
    .live-calendar-title-text {
        font-size: 20px;
        font-weight: 700;
        color: #3a3d4b;
        line-height: 62px;
    }
    .paging {
        line-height: 20px;
        float: right;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #414452;
        margin-top: 20px;
        .arrow-left,
        .arrow-right {
            width: 18px;
            height: 18px;
            display: inline-block;
            background: url('./asset/images/liveroomDetail_13.png');
            background-size: 100%;
            align-items: center;
            cursor: pointer;
        }
        .arrow-right {
            background: url('./asset/images/liveroomDetail_16.png');
            background-size: 100%;
        }
        .arrow-left-check {
            background: url('./asset/images/liveroomDetail_14.png');
            background-size: 100%;
        }
        .arrow-right-check {
            background: url('./asset/images/liveroomDetail_15.png');
            background-size: 100%;
        }
        .active {
            font-size: 16px;
            color: #025eff;
        }
    }
}
.calendar-list {
    text-align: center;
    display: flex;
    li {
        width: 25%;
        font-size: 14px;
        color: #333333;
        position: relative;
        height: 72px;
        padding-top: 15px;
        box-sizing: border-box;
        float: left;
        .week {
            font-weight: 700;
            padding-right: 12px;
            margin-right: 12px;
            position: relative;
        }

        .week:after {
            content: '';
            position: absolute;
            bottom: 3px;
            right: 0;
            width: 1px;
            height: 12px;
            opacity: 0.3;
            background: #333333;
            border-radius: 1px;
        }

        .live-status-ongoing,
        .live-status-notstart,
        .live-status-playback,
        .live-status-playend {
            width: 28px;
            height: 28px;
            display: inline-block;
            background: url('./asset/images/liveroomDetail_11.png');
            background-size: 100%;
            margin-top: 10px;
            position: absolute;
        }
        .live-status-notstart {
            background: url('./asset/images/liveroomDetail_12.png');
            background-size: 100%;
        }
        .live-status-playback {
            background: url('./asset/images/liveroomDetail_10.png');
            background-size: 100%;
        }
        .live-status-playend {
            background: url('./asset/images/liveroomDetail_17.png');
            background-size: 100%;
        }
        .horizontal-line {
            height: 2px;
            background: #e6e6e6;
            position: absolute;
            bottom: 13px;
            left: 0;
            right: 0;
        }
    }
}
.live-list {
    margin-top: 24px;
    clear: both;
    li {
        width: 280px;
        height: 348px;
        background: #ffffff;
        border: 1px solid #ededf2;
        margin-right: 26px;
        float: left;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 8px;
        box-sizing: border-box;
        overflow: hidden;
        transition: all 0.2s linear;

        &:hover {
            transform: translate3d(0, -5px, 0);
            box-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);
        }

        img {
            width: 280px;
            height: 175px;
            display: block;
            border-radius: 8px 8px 0px 0px;
        }
        .live-name {
            margin: 12px 18px 4px;
            font-size: 14px;
            text-align: justify;
            color: #3a3d4b;
            line-height: 22px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            height: 44px;
            font-weight: bold;
        }
        .live-date {
            font-size: 12px;
            text-align: justify;
            color: #53586c;
            margin-left: 18px;
        }
        .live-bottom {
            margin: auto 18px;
            margin-top: 16px;
            border-top: 1px solid #e9ebf4;
            padding-top: 15px;
            img {
                width: 38px;
                height: 38px;
                margin-right: 12px;
                border-radius: 50%;
                float: left;
            }
            .live-teacher {
                font-size: 14px;
                color: #53586c;
                line-height: 38px;
                height: 40px;
                width: 72px;
                overflow: hidden;
            }
            .live-operation {
                min-width: 104px;
                height: 38px;
                display: inline-block;
                background: linear-gradient(93deg, #3a85fe 3%, #025eff 97%);
                border-radius: 19px;
                border: 1px solid #ffffff;
                font-size: 14px;
                text-align: center;
                color: #ffffff;
                line-height: 38px;
                float: right;
            }
            .width-auto {
                width: auto;
                min-width: auto;
                padding-left: 24px;
                padding-right: 24px;
            }
        }
        &:last-child {
            margin-right: 0px;
        }
    }
}
</style>
