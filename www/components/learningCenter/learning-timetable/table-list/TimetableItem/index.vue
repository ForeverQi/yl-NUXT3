<template>
    <li
        :id="ids"
        :class="[
            'item',
            (courseInfo.coursewareType === 'L' && courseInfo.coursewareBeginState === 'E' && courseInfo.livePlaybackStatus === 'N') ||
            (courseInfo.coursewareType === 'F' && /P|D/i.test(courseInfo.scheduleStatus))
                ? 'item-gray'
                : 'item-bright',
        ]"
    >
        <div class="data">
            <span class="mark"></span>
            {{ courseInfo.date }}
        </div>
        <div class="boxCon">
            <h3 class="name">
                {{ courseInfo.coursewareName }}
                <span v-if="courseInfo.coursewareType === 'L'" class="tagLive">直播</span>
                <span v-if="courseInfo.coursewareType === 'F'" class="tagLive tagFace">面授</span>
            </h3>
            <div class="learn_time" v-if="courseInfo.coursewareType === 'L'">
                <span class="time">开始上课时间：{{ courseInfo.dateString.slice(11, 16) }}</span>
                <span class="lecturer">
                    <img v-if="courseInfo.teacherImage" class="teacher-img" :src="$nuxt.$niceloo.path.getServerFileViewPath(courseInfo.teacherImage)" alt />
                    主讲老师： {{ courseInfo.teacherName }}
                </span>
            </div>
            <div class="learn_time" v-if="courseInfo.coursewareType === 'F'">
                <div class="time block" v-for="(item, index) in courseInfo.lessontimes" :key="index">
                    <span class="time_start">{{ timeNameMap[item.lessontimeValue] }}开始时间：{{ item.scheduleCoursestartdate }}</span>
                    <span class="time_end">{{ timeNameMap[item.lessontimeValue] }}结束时间：{{ item.scheduleCourseenddate }}</span>
                </div>
            </div>
            <div class="block_line">
                <div class="lecturer" v-if="courseInfo.coursewareType === 'F'">
                    <img v-if="courseInfo.teacherImage" class="teacher-img" :src="$nuxt.$niceloo.path.getServerFileViewPath(courseInfo.teacherImage)" alt />
                    主讲老师： {{ courseInfo.teacherName }}
                </div>
                <div class="address-content" v-if="courseInfo.schoolAddress">
                    <p class="left">地址：</p>
                    <p class="right">
                        <span class="title">{{ courseInfo.schoolAddress }}</span>
                    </p>
                </div>
            </div>
            <div class="course-content" v-if="courseInfo.scheduleCoursecontent">
                <p class="left">内容：</p>
                <p class="right">
                    <span class="title">{{ courseInfo.scheduleCoursecontent }}</span>
                </p>
            </div>

            <div class="boxInfo" v-if="courseInfo.coursewareType === 'L'">
                <div class="source">
                    <p class="left">课程来源：</p>
                    <p class="right">
                        <span class="title">{{ courseInfo.className }}</span>
                        <span class="title tit-course">{{ courseInfo.coursewareMcc }}</span>
                    </p>
                </div>
                <!-- 讲义 -->
                <div class="jy" v-if="courseInfo.handouts && courseInfo.handouts.length > 0">
                    <p class="jy-left">讲义：</p>
                    <ul class="jy-ul">
                        <li v-for="(itemjy, index) in courseInfo.handouts" :key="index">
                            <p>{{ itemjy.cowresourceName }}</p>
                            <span @click="doDownload(itemjy, courseInfo)">下载</span>
                        </li>
                    </ul>
                </div>
            </div>

            <template v-if="courseInfo.coursewareType === 'F' && courseInfo.scheduleStatus === 'F'">
                <div class="class-will-content">
                    <div class="will-info" v-if="!courseInfo.editWillShow && courseInfo.atdlistIntentstatus">
                        您的上课意向：
                        <template v-if="courseInfo.atdlistIntentstatus === 'FLY'">
                            <span>去上课</span>
                            请您安排好时间，按时上课！
                        </template>
                        <template v-if="courseInfo.atdlistIntentstatus === 'FLN'">
                            <span>来不了</span>
                            请根据您的工作工作情况，合理安排时间进行学习备考
                        </template>
                        <template v-if="courseInfo.atdlistIntentstatus === 'NTS'">
                            <span>暂不确定</span>
                            若您明确可以上课后，请及时反馈给您的班主任老师
                        </template>
                        <div class="edit-will-btn" v-if="courseInfo.scheduleStatus === 'F'" @click="editWill(courseInfo)">去修改</div>
                    </div>
                    <div class="edit-will" v-if="courseInfo.editWillShow || !courseInfo.atdlistIntentstatus">
                        <span>请确认您是否前来上课，便于班主任为您预留座位和纸质讲义！</span>
                        <ul class="edit-box">
                            <li
                                :value="opt.value"
                                :key="`${willIndex}_opt`"
                                :class="{ active: opt.value === courseInfo.atdlistIntentstatus }"
                                @click="willEvent(opt, index, courseInfo)"
                                v-for="(opt, willIndex) in willOptions"
                            >
                                {{ opt.label }}
                            </li>
                        </ul>
                    </div>
                </div>
            </template>
            <template v-if="courseInfo.coursewareType === 'F' && courseInfo.scheduleStatus !== 'F' && courseInfo.atdlistIntentstatus">
                <div class="class-will-content">
                    <div class="will-info">
                        您的上课意向：
                        <template v-if="courseInfo.atdlistIntentstatus === 'FLY'">
                            <span>去上课</span>
                            请您安排好时间，按时上课！
                        </template>
                        <template v-if="courseInfo.atdlistIntentstatus === 'FLN'">
                            <span>来不了</span>
                            请根据您的工作工作情况，合理安排时间进行学习备考
                        </template>
                        <template v-if="courseInfo.atdlistIntentstatus === 'NTS'">
                            <span>暂不确定</span>
                            若您明确可以上课后，请及时反馈给您的班主任老师
                        </template>
                    </div>
                </div>
            </template>
            <div>
                <!-- 直播课 -->
                <template v-if="courseInfo.coursewareType === 'L'">
                    <!-- 未开始 -->
                    <div class="beginTips tips" v-if="courseInfo.coursewareBeginState === 'B'">
                        <!-- <img src="./asset/images/live_begin.png" /> -->
                        <span class="live_begin">即将开始</span>
                    </div>
                    <!-- 已结束 -->
                    <div class="beginTips tips" v-if="courseInfo.coursewareBeginState === 'E'">
                        <!-- <img src="./asset/images/live_end.png" /> -->
                        <span class="live_end">已结束</span>
                    </div>
                    <!-- 直播已开始即进行中 -->
                    <div class="beginTips tips" v-if="courseInfo.coursewareBeginState === 'S'">
                        <span class="live_begin">
                            <img style="margin-right: 4px" src="./asset/images/zhibo_icon.png" />
                            直播中
                        </span>
                    </div>
                    <!-- 课件列表、我的课表 直播课件结束1小时内不展示任何状态，coursewareBeginState新增枚举值H -->
                    <div class="beginTips tips" v-if="courseInfo.coursewareBeginState === 'H'"></div>
                    <!-- 百家云回放 -->
                    <div class="beginTips tips" v-if="courseInfo.livePlaybackStatus === 'Y'">
                        <span class="live_begin">查看回放</span>
                    </div>
                </template>
                <!-- 面授课 -->
                <template v-if="courseInfo.coursewareType === 'F'">
                    <!-- 未上课/未开始 -->
                    <div class="beginTips tips" v-if="courseInfo.scheduleStatus === 'F'">
                        <span class="live_begin">未开始</span>
                    </div>
                    <!-- 已上课/已结束 -->
                    <div class="beginTips tips" v-if="courseInfo.scheduleStatus === 'D'">
                        <span class="live_end">已结束</span>
                    </div>
                    <!-- 已取消 -->
                    <div class="beginTips tips" v-if="courseInfo.scheduleStatus === 'P'">
                        <span class="live_cancel">已取消</span>
                    </div>
                    <!-- 面授已开始即进行中 -->
                    <div class="beginTips tips" v-if="courseInfo.scheduleStatus === 'L'">
                        <span class="live_ing">
                            <img src="./asset/images/mianshou_icon.png" />
                            上课中
                        </span>
                    </div>
                </template>
            </div>
            <!-- 直播课显示可点击箭头 -->
            <div class="enter" v-if="courseInfo.coursewareType == 'L'">
                <a href="javascript:void(0)" @click="goVideo(courseInfo)">
                    <img v-if="courseInfo.coursewareBeginState === 'E' && courseInfo.livePlaybackStatus === 'N'" src="./asset/images/livend_bg.png" alt="" />
                    <img
                        v-else-if="courseInfo.coursewareBeginState === 'E' && courseInfo.livePlaybackStatus === 'Y'"
                        src="./asset/images/living_bg.png"
                        alt=""
                    />
                    <img v-else src="./asset/images/living_bg.png" alt />
                </a>
            </div>
            <!-- F:未开始 S:开始10分钟内 B:开始十分钟内到当前24点内 E:已结束 -->
            <div class="comment-btn" v-if="courseInfo.liveEvaluateState == 'S' || courseInfo.liveEvaluateState == 'B' || courseInfo.evaluateStatus == 'Y'">
                <span @click="openCommentPop(courseInfo)" v-if="courseInfo.evaluateStatus == 'Y'">我的评价</span>
                <span @click="openCommentPop(courseInfo)" v-else>评价</span>
            </div>
            <!-- 信息确认遮罩 -->
            <div class="info-mask" @click.stop v-if="courseInfo.isShowMark">
                <div class="wrap"></div>
                <div class="exclamation">!</div>
                <div class="unconfirmed">您还未进行信息确认</div>
                <div class="unconfirmed-tips">为保障您的权益和账户安全，请确认课程班级信息后再学习哦～</div>
                <div class="unconfirmed-button" @click="confirmFn(courseInfo)">立即确认</div>
            </div>
        </div>
    </li>
</template>
<script>
import '@/api/api..query-attachment-real-path.js';
export default {
    props: {
        itemData: {
            type: Object,
            default() {
                return {};
            },
        },
        ids: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            timeNameMap: {
                NT: '晚上',
                AM: '上午',
                PM: '下午',
            },
            courseInfo: {},
            curTask: {},
            commentInfo: {},
            willOptions: [
                {
                    label: '来不了',
                    value: 'FLN',
                },
                {
                    label: '暂不确定',
                    value: 'NTS',
                },
                {
                    label: '去上课',
                    value: 'FLY',
                },
            ],
        };
    },
    watch: {
        itemData: {
            handler(val) {
                this.courseInfo = val;
            },
            deep: true,
            immediate: true,
        },
    },
    mounted() {
        this.courseInfo = this.itemData;
    },
    methods: {
        async goVideo(item) {
            let vm = this;
            this.curTask = item;
            await this.getCourseDetail();
            vm.toPage();
        },
        doDownload(item, courseItem) {
            this.$httpClient({
                url: 'cc/query-attachment-real-path',
                params: {
                    modulId: '',
                    courseId: '',
                    catalogId: '',
                    coursewareId: courseItem.coursewareId,
                    classId: courseItem.classId,
                    cowresourceId: item.cowresourceId,
                    downloadIp: '',
                    downloadDevice: 'W',
                    downloadDeviceName: this.$platform.OS,
                    downloadDeviceSystem: '',
                    downloadDeviceVersion: this.$platform.version,
                },
            }).then((res) => {
                this.$PageUtil.download(res.coursewareDownloadUrl);
            });
        },
        //跳转页面
        toPage() {
            let vm = this;
            let item = vm.curTask;
            let params = {
                classId: item.classId,
                coursewareId: item.coursewareId,
                playrdNeed: 'Y',
            };
            if (item.coursewareBeginState == 'E' && item.coursewareOnlineUrl) {
                //coursewareOnlineUrl即视频的vid
                if (item.coursewareVideoprividers == 'SP' || vm.curTask.coursewareVideoprividers == 'LV') {
                    // 判断是否开启了智能学习
                    vm.$PageUtil.navigateTo(`/pro-course-learn/${item.classId}/${item.coursewareId}?source=learningTimetable`);
                }
                //广电圆点视频
                else if (vm.curTask.coursewareVideoprividers == 'SC' || vm.curTask.coursewareVideoprividers == 'LC') {
                    params.coursewareOnlineurl = item.coursewareOnlineUrl;
                    vm.coursewareVideoAuth(params);
                }
            } else {
                this.$PageUtil.openNewPage(`${item.coursewareLiveUrl}&form=learningTimetable`);
            }
        },
        coursewareVideoAuth(params) {
            this.$callRawApi({
                api: 'cc/courseware/video/auth',
                params,
            })
                .then((_response) => {
                    let res = _response.getData();
                    console.log('返回的数据', res);

                    this.$PageUtil.openNewPage(res.videoAddress);
                })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                });
        },
        // 获取当前课件详情
        getCourseDetail() {
            let vm = this;
            let params = {};
            params.classId = this.courseInfo.classId;
            params.coursewareId = this.courseInfo.coursewareId;

            return new Promise((resolve) => {
                this.$callRawApi({
                    api: 'cc/courseware/live/status',
                    params,
                })
                    .then((_response) => {
                        let res = _response.getData();
                        console.log('返回的数据', res);

                        if (res.coursewareBeginState === 'Y') {
                            res.coursewareBeginState = 'E';
                        } else if (res.coursewareBeginState === 'N') {
                            res.coursewareBeginState = 'B';
                        }
                        vm.courseInfo = {
                            ...vm.courseInfo,
                            ...res,
                        };
                        resolve();
                        // vm.jugeCmtStatus()
                    })
                    .catch((err) => {
                        this.$niceloo.api.handleFailure(err);
                        return Promise.reject(err);
                    });
            });
        },
        openCommentPop() {
            // 触发评价弹窗

            // 获取最新的课件信息
            this.getCourseDetail()
                .then(() => {
                    if (this.courseInfo.liveEvaluateState == 'S') {
                        this.$baseUI.alert(this.courseInfo.liveTips);
                        return Promise.reject();
                    }
                })
                .then(() => {
                    // 判断是否评价过
                    return this.jugeCmtStatus();
                })
                .then(() => {
                    this.$bus.$emit('SHOW_COMMENT_ALERT', this.courseInfo, this.commentInfo);
                });
        },
        //判断是否评价过
        jugeCmtStatus() {
            let param = { commentBizid: this.courseInfo.scheduleId };
            let vm = this;
            vm.commentInfo = {};
            return new Promise((resolve) => {
                this.$callRawApi({
                    api: 'cmt/comment/exist',
                    params: param,
                })
                    .then((_response) => {
                        let res = _response.getData();
                        console.log('返回的数据', res);

                        if (res.exist) {
                            // 已评价获取评价内容
                            return resolve(vm.getCommentDetail());
                        } else {
                            resolve();
                        }
                    })
                    .catch((err) => {
                        this.$niceloo.api.handleFailure(err);
                        return Promise.reject(err);
                    });
            });
        },
        //获取评价详情
        getCommentDetail() {
            //如果评价获取评价内容
            let data = { commentBizid: this.courseInfo.scheduleId };
            let vm = this;
            return new Promise((resolve) => {
                this.$callRawApi({
                    api: 'cmt/comment/detail',
                    params: data,
                })
                    .then((_response) => {
                        let res = _response.getData();
                        console.log('返回的数据', res);

                        vm.commentInfo = res;
                        resolve();
                    })
                    .catch((err) => {
                        this.$niceloo.api.handleFailure(err);
                        return Promise.reject(err);
                    });
            });
        },
        //上课意愿选择
        willEvent(opt, index, item) {
            this.$callRawApi({
                api: 'ss/atdlist/classintention',
                params: {
                    atdlistId: item.atdlistId,
                    atdlistIntentstatus: opt.value,
                },
            })
                .then(() => {
                    this.$set(item, 'atdlistIntentstatus', opt.value);
                    this.$set(item, 'editWillShow', false);
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
                    this.subjectList[index] = this.curCourseInfo;
                });
        },
        // 编辑上课意愿
        editWill(item) {
            // 判断登录来源 -1时不可点击
            if (!this.$baseUI.clickStop()) {
                return;
            }
            this.curCourseInfo = item;
            this.$set(item, 'editWillShow', true);
        },
        //确认信息
        confirmFn(item) {
            this.$emit('confirmFn', item, () => {
                this.goVideo(this.courseInfo);
            });
        },
    },
};
</script>
<style lang="less" scoped>
li.item {
    position: relative;
    z-index: 2;

    .data {
        position: relative;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        padding: 20px 0 15px 25px;
        &::after {
            content: '';
            background-color: #e7e7e7;
            border-radius: 50%;
            width: 2px;
            position: absolute;
            top: 0;
            left: 32px;
            bottom: 0;
        }
        .mark {
            display: inline-block;
            z-index: 2;
            position: relative;
            width: 16px;
            height: 16px;
            margin-right: 15px;
            background: url(./asset/images/ad_icon1.png) no-repeat;
        }
    }

    .block_line {
        padding-top: 10px;
        .lecturer {
            margin-left: 10px;
            margin-right: 10px;

            .teacher-img {
                top: 1px;
            }
        }
    }

    .lecturer {
        position: relative;
        display: inline-block;
        font-size: 14px;
        display: inline-block;
        margin-left: 28px;
        padding-left: 22px;
        color: #666666;
        background: url('./asset/images/user.png') left center no-repeat;

        .teacher-img {
            position: absolute;
            width: 16px;
            height: 16px;
            left: 0;
            top: 8px;
            border-radius: 50%;
        }
    }

    .learn_time {
        min-height: 32px;
        display: inline-block;
        line-height: 32px;
        padding: 0 12px;
        border-radius: 16px;
        background: #fff7f7;

        .time {
            font-size: 14px;
            display: inline-block;
            padding-left: 22px;
            color: #ff705b;
            background: url('./asset/images/data.png') left center no-repeat;

            &.block {
                display: block;
            }

            .time_end {
                margin-left: 32px;
            }
        }
    }

    .boxCon {
        position: relative;
        padding: 0 0 23px 57px;
        box-shadow: 0 4px 11px 1px rgba(26, 39, 90, 0.08);
        border-radius: 4px;
        z-index: 0;
        background: #ffffff;

        h3.name {
            font-size: 20px;
            color: rgba(51, 51, 51, 1);
            padding-top: 27px;
            padding-bottom: 13px;
            .tagLive {
                vertical-align: middle;
                text-align: center;
                margin-top: -3px;
                cursor: pointer;
                display: inline-block;
                font-size: 12px;
                color: rgba(255, 255, 255, 1);
                margin-left: 11px;
                width: 38px;
                height: 22px;
                line-height: 22px;
                background: linear-gradient(268deg, rgba(255, 96, 0, 1) 0%, rgba(255, 142, 76, 1) 100%);
                border-radius: 8px 0 8px 0;
            }
            .tagFace {
                background: linear-gradient(268deg, rgba(94, 108, 251, 1) 0%, rgba(134, 146, 255, 1) 100%);
            }
        }

        .timeInfo {
            margin: 0 124px 5px 0;
            display: inline-block;
            font-size: 14px;
            color: #666666;
            padding: 8px 10px;
            background: #fff7f7;
            border-radius: 16px;
            line-height: 20px;
            span {
                display: inline-block;
                line-height: 20px;
                height: 20px;
                float: left;
                background: url('./asset/images/data.png') left center no-repeat;
                padding-left: 22px;
            }
            .span-teacher {
                background: url('./asset/images/user.png') left center no-repeat;
                position: relative;
                .teacher-img {
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    left: 0;
                    top: 2px;
                    border-radius: 50%;
                }
            }
            .span-time {
                color: #ff705b;
                margin-right: 18px;
            }
            .span-long {
                margin-right: 18px;
            }
            .time {
                color: #ff5454;
                margin-right: 18px;
            }
            .teacher {
                color: #333333;
            }
        }

        .address-content {
            display: inline-block;
            padding: 5px 0 5px 70px;
            margin: 0 124px 10px 0;
            font-size: 14px;
            line-height: 20px;
            color: #666;
            position: relative;
            .left {
                height: 20px;
                line-height: 20px;
                background: url('./asset/images/address.png') left center no-repeat;
                padding-left: 20px;
                width: 62px;
                position: absolute;
                left: 10px;
                top: 5px;
            }
        }

        .course-content {
            padding: 8px 10px 8px 70px;
            margin: 0 124px 10px 0;
            background: #fcfcfc;
            font-size: 14px;
            line-height: 20px;
            color: #666;
            position: relative;
            display: inline-block;
            .left {
                height: 20px;
                line-height: 20px;
                background: url('./asset/images/source.png') left center no-repeat;
                padding-left: 20px;
                width: 62px;
                position: absolute;
                left: 10px;
                top: 8px;
            }
        }

        .class-will-content {
            background: #fff9f9 url('./asset/images/image-people.png') 12px center no-repeat;
            border: 1px dashed #ffc2ba;
            height: 76px;
            margin: 10px 35px 0 0;
            padding: 20px 20px 20px 55px;
            font-size: 12px;
            color: #666;
            line-height: 32px;
            box-sizing: border-box;
            .will-info {
                position: relative;
                span {
                    font-size: 14px;
                    color: #fd5140;
                    padding-right: 20px;
                }
                .edit-will-btn {
                    position: absolute;
                    top: 50%;
                    right: 0;
                    width: 64px;
                    height: 26px;
                    line-height: 25px;
                    text-align: center;
                    color: #fff;
                    background: linear-gradient(0deg, #ff4436 0%, #f96b54 100%);
                    border-radius: 23px;
                    margin-top: -13px;
                    cursor: pointer;
                }
            }
            .edit-will {
                ul {
                    display: inline-block;
                    margin-left: 100px;
                    li {
                        display: inline-block;
                        margin-left: 20px;
                        width: 84px;
                        height: 26px;
                        line-height: 24px;
                        background: #fff;
                        border-radius: 13px;
                        text-align: center;
                        color: #e73928;
                        cursor: pointer;
                    }
                    li:hover,
                    li.active {
                        background: linear-gradient(0deg, #ff4436 0%, #f96b54 100%);
                        color: #fff;
                    }
                }
            }
        }

        div.boxInfo {
            margin-right: 124px;
            .source {
                display: inline-block;
                padding: 8px 10px;
                background: #fafafa;
                .left {
                    padding-left: 21px;
                    font-size: 14px;
                    color: #666666;
                    background: url(./asset/images/source.png) no-repeat left center;
                    height: 22px;
                    line-height: 22px;
                }
                .right {
                    flex: 1;
                    height: 22px;
                    line-height: 22px;
                    span {
                        display: inline-block;
                    }
                    span.title {
                        font-size: 14px;
                        color: #666;
                    }
                    span.tit-course {
                        color: #999;
                        padding-left: 10px;
                    }
                    span.dec {
                        font-size: 12px;
                        color: #999999;
                        line-height: 24px;
                    }
                }
            }
            // 讲义
            .jy {
                display: flex;
                margin-top: 5px;
                padding: 0 10px;
                .jy-left {
                    margin-top: 10px;
                    padding-left: 21px;
                    font-size: 14px;
                    color: #666;
                    background: url(./asset/images/iconjy.png) no-repeat left center;
                    height: 24px;
                    line-height: 24px;
                }
                .jy-ul {
                    flex: 1;
                    font-size: 12px;
                    color: #666;
                    cursor: pointer;
                    li {
                        margin-top: 10px;
                        float: left;
                        margin-right: 25px;
                        p {
                            border: 1px dashed #cfcfcf;
                            line-height: 22px;
                            font-size: 12px;
                            color: #666;
                            padding: 0 8px;
                            display: inline-block;
                        }
                        span {
                            display: inline-block;
                            font-size: 12px;
                            color: #fff;
                            width: 41px;
                            height: 24px;
                            line-height: 24px;
                            background: url(./asset/images/btn-down-bg.png) no-repeat center;
                            text-align: left;
                            padding-left: 6px;
                            margin-left: 2px;
                        }
                    }
                }
            }
            div.more {
                width: 95px;
                height: 43px;
                background: url(./asset/images/more.png) no-repeat;
                text-align: center;
                margin-top: 10px;
                a {
                    display: block;
                    color: #ffffff;
                    font-size: 12px;
                    line-height: 38px;
                }
            }
        }
        .tips {
            position: absolute;
            top: 0;
            right: 0;
            .live_begin,
            .live_ing,
            .live_cancel,
            .live_end {
                font-size: 20px;
                color: #fff;
                width: 99px;
                height: 37px;
                line-height: 37px;
                text-align: center;
                display: inline-block;
                background: linear-gradient(268deg, rgba(255, 68, 54, 1) 0%, rgba(249, 107, 84, 1) 100%);
                box-shadow: 0px 2px 3px 0px rgba(254, 73, 58, 0.22);
                border-radius: 0px 8px 0px 8px;
            }
            .live_end,
            .live_cancel {
                background: #dedede;
                box-shadow: 0px 2px 6px 0px rgba(53, 53, 53, 0.08);
            }
            .mianshouIcon {
                display: inline-block;
                width: 23px;
                height: 23px;
                background: url(./asset/images/mianshou_icon01.gif) no-repeat;
                background-size: 100% 100%;
                position: absolute;
                left: 62px;
                top: 5px;
                -moz-transform: rotate(30deg); /* Firefox 旋转属性，参数表示角度(deg表示角度)，负数逆时针，正数顺时针 */
                -webkit-transform: rotate(30deg); /* Safari和Chrome */
                -ms-transform: rotate(30deg); /* IE 9 */
                -o-transform: rotate(30deg); /* Opera */
            }
            .zhiboIcon {
                display: inline-block;
                width: 20px;
                height: 20px;
                background: url(./asset/images/zhibo_icon01.gif) no-repeat;
                background-size: 100% 100%;
                position: absolute;
                left: 64px;
                top: 6px;
                -moz-transform: rotate(40deg); /* Firefox 旋转属性，参数表示角度(deg表示角度)，负数逆时针，正数顺时针 */
                -webkit-transform: rotate(40deg); /* Safari和Chrome */
                -ms-transform: rotate(40deg); /* IE 9 */
                -o-transform: rotate(40deg); /* Opera */
            }
        }

        .enter {
            position: absolute;
            top: 50%;
            right: 35px;
            cursor: pointer;
            width: 48px;
            height: 44px;
            margin-top: -8px;
        }
        .comment-btn {
            height: 30px;
            font-size: 14px;
            margin: 33px 35px 0;
            text-align: right;
            vertical-align: middle;
            cursor: pointer;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            span {
                float: right;
                padding: 4px 40px;
                border: 1px solid lightgray;
                border-radius: 20px;
            }
        }
    }
}

li.item-gray {
    .boxCon {
        h3.name {
            color: #999;
            .tagLive,
            .tagFace {
                background: #dadada;
            }
        }

        .learn_time {
            .time {
                background: url('./asset/images/data-light.png') left center no-repeat;
            }
        }

        .lecturer {
            color: #999;
            background: url('./asset/images/user-light.png') left center no-repeat;
        }

        .timeInfo {
            color: #999;
            span {
                background: url('./asset/images/data-light.png') left center no-repeat;
            }
            .span-teacher {
                background: url('./asset/images/user-light.png') left center no-repeat;
                .teacher-img {
                    opacity: 0.5;
                }
            }
            .span-time {
                color: #ffc0b4;
            }
        }

        .address-content {
            color: #999;
            .left {
                background: url('./asset/images/address-light.png') left center no-repeat;
            }
        }

        .course-content {
            color: #999;
            .left {
                background: url('./asset/images/source-light.png') left center no-repeat;
            }
        }

        div.boxInfo {
            .source {
                .left {
                    color: #999;
                    background: url(./asset/images/source-light.png) no-repeat left center;
                }
                .right {
                    span.title {
                        color: #999;
                    }
                }
            }
            .jy {
                .jy-left {
                    background: url(./asset/images/iconjy-light.png) no-repeat left center;
                }
                .jy-ul {
                    li {
                        span {
                            background: url(./asset/images/btn-down-bg-light.png) no-repeat center;
                        }
                    }
                }
            }
        }
    }
}
.info-mask {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .wrap {
        position: absolute;
        height: 100%;
        width: 100%;
        opacity: 0.6;
        background: #000000;
        border-radius: 6px;
    }
    .exclamation {
        width: 20px;
        height: 20px;
        background: #ffffff;
        border-radius: 50%;
        margin-top: 32px;
        text-align: center;
        line-height: 20px;
        font-weight: 700px;
        z-index: 66;
    }
    .unconfirmed {
        margin-top: 10px;
        height: 14px;
        font-size: 14px;
        font-weight: 700;
        text-align: center;
        color: #ffffff;
        line-height: 14px;
        z-index: 66;
    }
    .unconfirmed-tips {
        margin-top: 8px;
        height: 12px;
        font-size: 12px;
        text-align: center;
        color: #ffffff;
        line-height: 12px;
        z-index: 66;
    }
    .unconfirmed-button {
        margin-top: 24px;
        width: 140px;
        height: 40px;
        background: linear-gradient(135deg, #ff0000, #ff4c3d 98%);
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
        line-height: 40px;
        z-index: 66;
        color: #fff;
    }
}
</style>
