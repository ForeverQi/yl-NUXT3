<template>
    <div class="learinint-timetable" ref="showBox" :style="{ paddingTop: `${scheduleboxHeight}px` }">
        <div class="white margin-auto timetable-box" :class="{ is_fixed: isFixed }" :style="{ left: `${scheduleboxTopL}px`, height: `${scheduleboxHeight}px` }">
            <timetable-calendar ref="calendar" :calendar-data="calendarData" @initData="getClassSchedule()" @checkDate="toScroll" @datafold="datafold" />
        </div>
        <div class="list-box" ref="listBox">
            <div class="empty" v-if="list.length === 0">
                <img src="./asset/images/subject-null.png" />
                <p>
                    <span v-if="noClass == true">未报班，暂无面授课和直播课</span>
                    <span v-if="noClass == false">所选月份下暂无面授或直播课</span>
                </p>
            </div>
            <timetable-list v-else :list-data="timetableList" :month-days-list="monthDaysList" @confirmFn="confirmFn" />
        </div>

        <comment-pop
            ref="CommentPop"
            v-show="cmtPop"
            @closeCmtPop="closeCmtPop"
            @submitComment="submitComment"
            :lable-type="labelType"
            :comment-info="commentInfo"
            :is-show-toast="cmtSuccess"
        />

        <div class="right-positon-wrap right-concat-wrap">
            <div class="item backtop-wrap" v-if="isShowBackTopIcon" @click="backtoTop">
                <span class="text-arrow"></span>
                <span class="text-top">顶部</span>
            </div>
        </div>

        <!-- 确认订单信息 确认订单信息(转班) -->
        <order-true-order ref="orderTrueOrder" @success="getOrderPaidList" @bindSuccess="getClassSchedule" />
        <!-- 完善个人信息（重读） 确认个人信息(重读)) -->
        <improve-info ref="improveInfo" @bindSuccess="getOrderPaidList" @learncenter-mycourse="toOrderList"></improve-info>
        <!-- 完善地址信息 -->
        <improve-address ref="improveAddress" @addAddressSuccess="addAddressSuccess" @learncenter-mycourse="toOrderList"></improve-address>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import TimetableList from '@/www/components/learningCenter/learning-timetable/table-list';
import commentPop from '@/www/components/learningCenter/learning-timetable/comment-pop';
import TimetableCalendar from '@/www/components/learningCenter/learning-timetable/calendar';

import '@/api/oc/api.OC2018.get-order-padiskus-status';
import OrderTrueOrder from '@/www/components/uc/manager/order/orderTrueOrder'; // 确认订单信息
import ImproveInfo from '@/www/components/uc/manager/order/improveInfo'; // 完善个人信息 确认个人信息
import ImproveAddress from '@/www/components/uc/manager/order/improveAddress'; //完善地址信息
import '@/api/oc/api.OC2014.query-class-signstatus.js'; // 接口-已付款班级协议签收信息
import '@/api/cc/api.CC3034.cc-playrd-batch-add.js';

export default {
    name: 'learning-timetable',
    components: {
        TimetableCalendar,
        TimetableList,
        commentPop,
        OrderTrueOrder,
        ImproveInfo,
        ImproveAddress,
    },
    data() {
        return {
            showMonth: dayjs().format('YYYY-MM-01'),
            calendarData: {},
            timetableList: [],
            monthStartDate: '',
            monthEndDate: '',
            monthDaysList: [],
            list: [],
            noClass: '',
            isShowBackTopIcon: false,

            cmtPop: false,
            commentInfo: {},
            cmtSuccess: false,
            labelType: 'LC',

            isFixed: false,
            scheduleboxTopH: 0, //日历距顶部高度
            scheduleboxTopL: 0, // 左侧宽度
            scheduleboxHeight: '345', // 默认高度

            lazyScroll: false, // 是否开启延迟滚动
            lazyDate: '', // 延迟滚动的日期
            choseItem: {}, //组装协议认证相关参数
        };
    },
    head() {
        return this.$head({
            title: '我的课表_用学习创造美好人生_优路教育',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: '',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '',
                },
            ],
        });
    },
    created() {},
    mounted() {
        if (document) {
            document.title = '我的课表-学习中心-优路教育';
        }
        this.upCourseRecord();
        //我的班级列表
        this.getMyClass();
        this.$bus.$on('SHOW_COMMENT_ALERT', (item, commentInfo) => {
            // 设置显示评价弹窗
            this.openCommentPop(item, commentInfo);
        });

        this.$nextTick(() => {
            this.scheduleboxTopH = this.$refs.showBox.offsetTop - 108;
        });
        window.addEventListener('resize', this.handleScroll);
        window.addEventListener('scroll', this.handleScroll); // 监听滚动事件
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleScroll);
    },
    methods: {
        toOrderList() {
            this.$PageUtil.href('/uc/manager/order/orderClass');
        },
        async upCourseRecord() {
            let user = await this.$User.getUser();
            if (!user || !user.userId) {
                return;
            }
            let params = this.$storage.get(user.userId + 'cc/playrd/batch/add');
            if (params) {
                await this.$callApi('cc/cc-playrd-batch-add', {
                    ...params,
                })
                    .catch((err) => {
                        this.$niceloo.api.handleFailure(err);
                        return Promise.reject(err);
                    })
                    .then((res) => {
                        console.log('通过getData返回数据');
                        return res.getData();
                    });
            }
            this.$storage.set(user.userId + 'cc/playrd/batch/add', null);
        },
        getClassSchedule() {
            let params = {
                startDate: this.$refs.calendar.getStartDate(),
                endDate: this.$refs.calendar.getEndDate(),
            };

            // 获取当月的时间
            let monthStartDate = dayjs(this.$refs.calendar.getMonthStartDate());
            let monthEndDate = dayjs(this.$refs.calendar.getMonthEndDate());
            let vm = this;
            this.$callRawApi({
                api: 'cc/user/schedule/my/list',
                params,
            })
                .then(
                    async (_response) => {
                        let res = _response.getData();
                        console.log('返回的数据', res);

                        if (!Array.isArray(res)) {
                            res.data = [];
                        }
                        vm.list = [];
                        let timetableList = {};
                        let calendarData = {};
                        res.forEach((r) => {
                            let oDate = dayjs(r.dateString);
                            let key = oDate.format('YYYY-MM-DD');
                            if (!calendarData[key]) {
                                calendarData[key] = {
                                    live: false,
                                    face: false,
                                };
                            }
                            if (r.coursewareType === 'L') {
                                calendarData[key].live = true;
                            }
                            if (r.coursewareType === 'F') {
                                calendarData[key].face = true;
                            }

                            if (oDate < monthStartDate || oDate > monthEndDate) {
                                return;
                            }

                            vm.list.push(r);
                            if (!timetableList[key]) {
                                timetableList[key] = [];
                            }

                            timetableList[key].push(r);
                        });
                        vm.monthDaysList = vm.$refs.calendar ? vm.$refs.calendar.getMonthDayList() : [];
                        vm.calendarData = calendarData;

                        let lastDate = '';
                        let jumpDate = vm.lazyDate;
                        let keys = Object.keys(timetableList);
                        for (let i = 0, len = keys.length; i < len; i++) {
                            lastDate = keys[i];
                            if (jumpDate < keys[i]) {
                                break;
                            }
                        }
                        //判断课程信息是否要确认
                        vm.timetableList = timetableList;
                        await vm.getOrderStatus(vm.timetableList);
                        if (vm.lazyScroll) {
                            setTimeout(() => {
                                vm.lazyScroll = false;
                                if (vm.lazyDate && typeof vm.timetableList[vm.lazyDate] === 'undefined') {
                                    vm.lazyDate = lastDate;
                                }
                                vm.toScroll(vm.lazyDate);
                                vm.lazyDate = '';
                            }, 200);
                        }
                    },
                    (err) => {
                        this.$niceloo.api.handleFailure(err);
                        return 'apiError';
                    }
                )
                .catch((err) => {
                    return Promise.reject(err);
                });
        },
        init() {
            this.$nextTick(() => {
                this.getData();
            });
        },
        datafold(check) {
            if (check) {
                this.scheduleboxHeight = 199;
            } else {
                this.scheduleboxHeight = 345;
            }
        },
        backtoTop() {
            $('body,html').animate({ scrollTop: 0 }, 500);
            return false;
        },
        //打开评价窗口
        openCommentPop(data, commentInfo) {
            if (data.liveEvaluateState == 'S') {
                this.$baseUI.alert(data.liveTips);
                return;
            }
            this.courseInfo = data;
            this.commentInfo = commentInfo;
            this.cmtPop = true;
            this.labelType = data.coursewareType == 'F' ? 'FC' : 'LC';
        },
        //提交评价
        submitComment(data) {
            let vm = this;
            this.cmtPop = false;
            data.commentBizid = this.courseInfo.scheduleId;

            let coursewareMcc = this.courseInfo.coursewareMcc ? this.courseInfo.coursewareMcc : '';

            data.commentBizname = `${coursewareMcc}${this.courseInfo.className}/${this.courseInfo.coursewareName}`;
            data.commentBiztype = this.courseInfo.coursewareType == 'L' ? 'SL' : 'FF';
            data.classId = this.courseInfo.classId;
            data.projectId = this.courseInfo.projectId;
            data.subjectId = this.courseInfo.subjectId;
            if (this.courseInfo.teacherUserid) data.serveruserId = this.courseInfo.teacherUserid;
            this.$callRawApi({
                api: 'cmt/comment/add',
                params: data,
            })
                .then(() => {
                    vm.cmtPop = true;
                    vm.$refs.CommentPop.commentSuccess();
                    vm.cmtSuccess = true;
                })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .catch((_err) => {
                    let res = _err.getAttachedData?.()?.getData() ?? {};
                    console.warn(res);
                    res.msg = _err.getDescription();

                    this.$baseUI.alert(res.msg);
                });
        },
        //关闭评价弹窗
        closeCmtPop() {
            this.cmtPop = false;
        },
        handleScroll() {
            // 滚动事件
            var scroH = $(document).scrollTop();
            if (!this.$refs.showBox) {
                return;
            }

            //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
            if (scroH >= this.scheduleboxTopH) {
                this.scheduleboxTopL = this.$refs.showBox.getBoundingClientRect().left;
                this.isFixed = true;
            } else if (scroH < this.scheduleboxTopH) {
                this.isFixed = false;
                this.scheduleboxTopL = 0;
            }

            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop > 100) {
                this.isShowBackTopIcon = true;
            } else {
                this.isShowBackTopIcon = false;
            }
        },
        toScroll(ev, lazyScroll = false) {
            if (lazyScroll) {
                // 切换月时要等到数据加载完在切换滚动位置
                this.lazyDate = ev;
                this.lazyScroll = lazyScroll;
                return;
            }

            let key = ev;
            if (typeof this.timetableList[ev] === 'undefined') {
                key += '_0';
            } else {
                key += '_0';
            }

            if (this.list.length === 0) {
                // 数据不存在的时候保证空图片一直展示出来
                if ($(document).scrollTop() > this.$refs.listBox.offsetTop) {
                    $(document).scrollTop(this.$refs.listBox.offsetTop - 140);
                }
            } else if (document.getElementById(key)) {
                let toTopH = $('#' + key).offset().top;
                $(document).scrollTop(toTopH - 425);
            }
        },
        async getMyClass() {
            let vm = this;
            let user = await this.$User.getUser();
            let params = {
                userId: (user || {}).userId,
            };
            this.$callRawApi({
                api: 'bd/studentclass/profile/list',
                params,
            })
                .then((_response) => {
                    let result = _response.getData();
                    console.log('返回的数据', result);

                    if (result && result.data) {
                        vm.noClass = !(result.data.length >= 1);
                    } else {
                        vm.noClass = true;
                    }
                })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                });
        },
        /**
         * 判断当前课程是否需要确认信息
         */
        getOrderStatus(obj) {
            let classIdArr = [];
            Object.values(obj).forEach((item) => {
                item.forEach((element) => {
                    classIdArr.push(element.classId);
                });
            });
            if (classIdArr.length) {
                new Promise((resolve) => {
                    this.$callApi('xieyiqueren/get-order-padiskus-status', {
                        classIds: classIdArr,
                        onsuccess: (data) => {
                            resolve(data);
                        },
                        onerror: niceloo.api.handleFailure,
                        oncomplete: () => {},
                    });
                }).then((res) => {
                    Object.values(obj).forEach((item) => {
                        item.forEach((element) => {
                            res.forEach((child) => {
                                if (element.classId == child.classId) {
                                    if (element.isShowMark === true) {
                                        return;
                                    }
                                    if (child.classSignstatus == 'Y') {
                                        this.$set(element, 'isShowMark', false);
                                    } else if (child.classSignstatus == 'N') {
                                        this.$set(element, 'isShowMark', true);
                                    }
                                }
                            });
                        });
                    });
                });
            }
        },
        getClassSignstatusByCRM(item, cb) {
            this.$callApi('oc/query-class-signstatus', {
                skuId: item.classId,
                onsuccess: async (item) => {
                    if (!item) {
                        return;
                    }
                    let userInfo = await this.$User.getUser();
                    this.choseItem = item;
                    if (
                        item.orderAgreement &&
                        item.orderAgreement.agreementNeedconfirmstatus == 'Y' &&
                        item.orderAgreement.agreementStatus == 'N' &&
                        item.orderSubtype != 'REP'
                    ) {
                        //协议确认页面
                        this.$refs.orderTrueOrder.open(item);
                        return;
                    }
                    if (item.orderAddressneedcompletestatus == 'Y' && item.orderAddresscompletedstatus == 'N') {
                        //完善收货地址
                        if (item.orderSource == 'OP' && item.orderSubtype != 'REP') {
                            //运营平台录单要求弹确认协议那个大弹窗
                            this.$refs.orderTrueOrder.open(item);
                        } else {
                            this.$refs.improveAddress.open(item);
                        }
                        return;
                    }
                    if (item.orderAgreement && item.orderAgreement.userinfoNeedconfirmstatus == 'Y' && userInfo.userIdcardstatus != 'S') {
                        //看当前用户是否实名认证 S标识已实名
                        if (item.orderSource == 'OP' && item.orderSubtype != 'REP') {
                            //运营平台录单要求弹确认协议那个大弹窗
                            this.$refs.orderTrueOrder.open(item);
                        } else {
                            this.$refs.improveInfo.open(item);
                        }
                        return;
                    }
                    if (
                        item.orderAgreement &&
                        item.orderAgreement.userinfoNeedconfirmstatus == 'Y' &&
                        item.orderAgreement.agreementUserinfoconfirmstatus == 'N'
                    ) {
                        //确认个人信息
                        if (item.orderSource == 'OP' && item.orderSubtype != 'REP') {
                            //运营平台录单要求弹确认协议那个大弹窗
                            this.$refs.orderTrueOrder.open(item);
                        } else {
                            this.$refs.improveInfo.open(item);
                        }

                        return;
                    }

                    cb && cb();
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //完善地址成功后
        async addAddressSuccess() {
            //完善地址成功后
            let item = this.choseItem;
            let userInfo = await this.$User.getUser();
            if (item.orderAgreement.userinfoNeedconfirmstatus == 'Y' && userInfo.userIdcardstatus != 'S') {
                //看当前用户是否实名认证 S标识已实名
                this.$refs.improveInfo.open(item);
            } else if (item.orderAgreement.userinfoNeedconfirmstatus == 'Y' && item.orderAgreement.agreementUserinfoconfirmstatus == 'N') {
                //确认个人信息
                this.$refs.improveInfo.open(item);
            } else {
                this.getOrderPaidList();
            }
        },
        getOrderPaidList(isperfect) {
            //获取已付款订单列表
            if (isperfect) {
                //重新查询
                // this.getClassSchedule();
            }
            // 首次确认信息会请求两次
            this.getClassSchedule();
        },
        confirmFn(item, cb) {
            // 易观埋点
            let sendLog = {
                mycourse_class_name: item.className, // 班级名称
                mycourse_project_name: item.projectName, // 项目名称
            };
            this.$yiguan.aiLearning('click_mycourse_listen', sendLog, this.projectMap, item.projectId);
            if (item.isShowMark === true) {
                //班级认证状态获取(CRM)
                this.getClassSignstatusByCRM(item, cb);
            }
        },
    },
};
</script>
<style lang="less" scoped>
.learinint-timetable {
    position: relative;
    padding-top: 345px;
    .timetable-box {
        width: 1200px;
        position: absolute;
        top: 0;
        left: 0;
        padding: 20px 17px;
        height: 345px;
        box-sizing: border-box;

        &.is_fixed {
            position: fixed;
            top: 80px;
            z-index: 30;
            background: #ffffff;
        }
    }
    .empty {
        text-align: center;
        padding: 106px 0;
        img {
            width: 260px;
            height: 180px;
        }
        p {
            margin-top: 16px;
            font-size: 14px;
            color: #3a3d4b;
        }
        /*.txt {
            font-size: 14px;
            color: #3a3d4b;
        }*/
    }
}
.right-positon-wrap {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-30%);
    .item {
        width: 100%;
        height: 58px;
        background: #fff no-repeat center center/58px 58px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        margin-top: -1px;
    }
    .item:hover {
        background-image: none;
        background-color: #dd2012;
    }
}
.right-concat-wrap {
    width: 58px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    img {
        width: 20px;
        height: 20px;
    }
}
.backtop-wrap {
    .text-arrow {
        display: inline-block;
        width: 100%;
        height: 10px;
        background: #fff url('./asset/images/backtop_b.png') no-repeat center center/100% 100%;
    }
    .text-top {
        margin-top: 2px;
        color: #666666;
        font-size: 14px;
    }
}

.backtop-wrap:hover {
    .text-arrow {
        background: url('./asset/images/backtop_w.png') no-repeat center center/100% 100%;
    }

    .text-top {
        color: #fff;
    }
}
</style>
