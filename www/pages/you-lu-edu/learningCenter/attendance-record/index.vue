<template>
    <div class="attendance-record-box">
        <span class="back-my-course" @click="toMyCourse">返回我的课程</span>
        <div class="class-name" v-if="className">{{ className }}</div>
        <template v-if="!noAttendRecord && attendRecordData">
            <ul>
                <li v-for="(item, index) in attendRecordData" :key="index" @click="toStudy(item)">
                    <div class="knob">
                        <span class="knob-decorate"></span>
                        {{ item.coursewareName }}
                    </div>
                    <!--基础精讲-2022《法律法规》基础精讲-陈国鑫老师【高清版】-二建法规基础精讲课程陈老师（高清版）-->
                    <div class="knob-describe">{{ item.playrdMcc }}</div>
                    <button class="continue-learning">继续学习</button>
                    <div class="watch-time-detail">
                        <span class="watch-time">观看时长：{{ $DateUtil.getTimeString(item.playrdDuration || 0) }}</span>
                        <span>观看时间：{{ item.playrdStarttime }}</span>
                    </div>
                </li>
            </ul>
            <!-- studyrdStatus Y:有历史记录 N:无历史记录;控制最后一页是否显示查看更多 -->
            <div class="text-center getmore-box" v-if="showMore()">
                <span class="getmore pointer" @click="toAttendanceRecords">查看更多>></span>
            </div>
            <div class="pt20">
                <vb-pagination :get-page="getPage" :page.sync="page"></vb-pagination>
            </div>
        </template>
        <!--<div class="record-box white" v-if="!noAttendRecord && attendRecordData">
            <ul class="recordlist">
                <li v-for="(item, index) in attendRecordData" :key="index" class="flex jc-between" @click="toStudy(item)">
                    <div class="record-l">
                        <p class="flex name ai-center">
                            <img src="../asset/images/attendace_record/4.png" alt="" class="mr10" />
                            {{ item.coursewareName }}
                        </p>
                        <div class="flex des ai-start" v-if="item.playrdMcc">
                            <div class="flex">
                                <img src="../asset/images/attendace_record/bkmark.png" alt="" />
                            </div>
                            <div>
                                {{ item.playrdMcc }}
                            </div>
                        </div>
                    </div>
                    <div class="text-right record-r">
                        <p>
                            &lt;!&ndash;<span class="overdue-tip" v-if="item.classExpirestatus=='Y'">课件所在班级已过期</span>&ndash;&gt;
                            <span class="study">继续学习</span>
                        </p>
                        <p class="flex study-time ai-center">
                            <img src="../asset/images/attendace_record/sj.png" alt="" class="mr10" />
                            观看时长：{{ $DateUtil.getTimeString(item.playrdDuration || 0) }}
                            <span class="line">|</span>
                            观看时间：{{ item.playrdStarttime }}
                        </p>
                    </div>
                </li>
            </ul>
            &lt;!&ndash; studyrdStatus Y:有历史记录 N:无历史记录;控制最后一页是否显示查看更多 &ndash;&gt;
            <div class="text-center getmore-box" v-if="showMore()">
                <span class="getmore pointer" @click="toAttendanceRecords">查看更多>></span>
            </div>
            <div class="pt20">
                <vb-pagination :get-page="getPage" :page.sync="page"></vb-pagination>
            </div>
        </div>-->

        <div v-if="noAttendRecord" class="blank_tip">
            <img src="../asset/images/attendace_record/attendR_blank_tip.png" alt="" />
            <div>暂无听课记录</div>
        </div>

        <span class="overdue_tip" v-show="overdueTipFlag">
            课件所在班级已过期，无法继续观看
            <span class="overdue_tip_close" @click="tipClose()">X</span>
        </span>
    </div>
</template>

<script>
import '@/api/cc/api.CC3001.cc-playrd-list.js';
import '@/api/cc/api.CC1003.cc-courseware-check.js';
import '@/api/bd/api.BD4915.bd-studentclass-profile-info.js';
import '@/api/cc/api.CC8001.cc-class-pypconfig-wisdomstatus.js';
import '@/api/cc/api.CC3105.cc-courseware-video-auth.js';
import '@/api/cc/api.CC3034.cc-playrd-batch-add.js';
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import VbPagination from '@/www/components/pagination/vbPagination';

export default {
    components: {
        VbPagination,
    },
    data() {
        return {
            overdueTipFlag: false, //过期提示
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
                pages: 0,
            },
            classId: this.$route.params.classId,
            className: this.$route.query.className,
            attendRecordData: null, //返回的听课记录
            studyrdStatus: '',
            noAttendRecord: false, //无听课记录
        };
    },
    mounted() {
        this.upCourseRecord();
        this.getPage();
    },
    methods: {
        toMyCourse() {
            //跳转我的课程
            /*this.$PageUtil.href*/
            this.$PageUtil.href('/learningCenter/index/myCourse');
        },
        async upCourseRecord() {
            let user = await this.$User.getUser();
            if (!user || !user.userId) {
                return;
            }
            let params = this.$storage.get(user.userId + 'cc/playrd/batch/add');
            if (params) {
                await this.addPlayBatch(params);
            }
            this.$storage.set(user.userId + 'cc/playrd/batch/add', null);
        },
        addPlayBatch(params) {
            this.$callApi('cc/cc-playrd-batch-add', {
                ...params,
            })
                .then(() => {
                    return Promise.resolve();
                })
                .catch(() => {
                    return Promise.resolve();
                });
        },
        getPage() {
            niceloo.api.call('cc/cc-playrd-list', {
                pageIndex: this.$PageUtil.getStartIndex(this.page),
                pageSize: this.page.pageSize,
                classId: this.classId ? this.classId : '',
                onsuccess: (data) => {
                    console.log(data);
                    if (data) {
                        this.page.pageCount = data.count;
                        this.attendRecordData = data.data;
                        this.studyrdStatus = data.studyrdStatus;
                        this.noAttendRecord = data.count < 1;
                    } else {
                        this.noAttendRecord = true;
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        assignPage(page) {
            this.page = Object.assign({}, this.page, page);
            this.getPage();
        },
        // 继续学习
        toStudy(item) {
            // 判断登录来源
            if (window.location.host.indexOf('jiaoyu361.com') > -1) {
                /**
                 * 域名为：
                 * previewdev.jiaoyu361.com
                 * previewtest.jiaoyu361.com
                 * previewuat.jiaoyu361.com
                 * preview.jiaoyu361.com
                 * 判定为预览模式（预览模式不进入埋点易观系统）
                 */
                this.$baseUI.alert('该功能在仿真环境下不支持预览！');
                return;
            }
            this.checkCourseware(item);
        },
        coursewareVideoAuth(params) {
            niceloo.api.call('cc/cc-courseware-video-auth', {
                ...params,
                onsuccess: (data) => {
                    this.PageUtil.openNewPage(data.videoAddress);
                },

                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        checkCourseware(item) {
            console.log(item);
            niceloo.api.call('cc/cc-courseware-check', {
                coursewareId: item.coursewareId,
                classId: item.classId,
                onsuccess: (data) => {
                    console.log(data);
                    this.coursewareurl(data, item);
                },

                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        async coursewareurl(coursewareurl, item) {
            var userData = await this.$User.getUser();
            let params = {
                classId: item.classId,
                coursewareId: item.coursewareId,
                playrdNeed: 'Y',
            };
            if (coursewareurl.coursewareVid) {
                // 录播课
                if (coursewareurl.coursewareVideoprividers == 'SP') {
                    let params = {
                        classId: item.classId,
                        userId: userData.userId,
                    };
                    niceloo.api.call('bd/bd-studentclass-profile-info', {
                        ...params,
                        onsuccess: (data) => {
                            console.log(data);
                            this.$PageUtil.openNewPage(`/pro-course-learn/${item.classId}/${item.coursewareId}?source=attendanceRecord&ctapId=${data.ctapId}`);
                        },
                        onerror: niceloo.api.handleFailure,
                        oncomplete: () => {},
                    });
                } else if (coursewareurl.coursewareVideoprividers == 'SC') {
                    params.coursewareOnlineurl = coursewareurl.coursewareVid;
                    this.coursewareVideoAuth(params);
                }
            } else {
                // 直播课
                this.$PageUtil.openNewPage(`${coursewareurl.coursewareLiveurl}&form=attendanceRecord`);
            }
        },
        //关闭提示
        tipClose() {
            this.overdueTipFlag = false;
        },
        // 跳转到查看更多页面
        toAttendanceRecords() {
            this.$PageUtil.navigateTo('/learningCenter/index/attendanceRecords');
        },
        showMore() {
            if (this.studyrdStatus == 'N') {
                return false;
            }
            if (this.page.pageCount <= this.page.pageSize) {
                return true;
            } else {
                return this.page.pageCount <= this.page.pageIndex * this.page.pageSize;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.pt20 {
    padding-top: 20px;
}

.attendance-record-box {
    margin-bottom: 50px;
    min-height: 700px;

    .record-header {
        padding-top: 10px;
    }

    .record-box {
        padding-bottom: 50px;
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.07);

        .recordlist {
            padding-top: 30px;

            li {
                box-sizing: border-box;
                width: 1060px;
                min-height: 100px;
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.07);
                border-radius: 2px;
                margin: 0 auto 20px;
                padding: 22px 0px 22px 0px;
                cursor: pointer;

                .record-l {
                    flex: 1;

                    .name {
                        padding-left: 23px;
                        color: #333333;
                        font-size: 18px;
                        border-left: 3px solid #ff5959;
                        // height: 22px;
                        line-height: 22px;
                        margin-bottom: 15px;
                    }

                    .des {
                        padding-left: 27px;
                        color: #999999;
                        font-size: 14px;

                        img {
                            margin-right: 10px;
                            margin-top: 3px;
                        }
                    }
                }

                .record-r {
                    width: 410px;
                    margin-right: 30px;

                    .overdue-tip {
                        color: #999999;
                        font-size: 14px;
                        margin-right: 15px;
                    }

                    .study {
                        font-size: 16px;
                        color: #ffffff;
                        width: 105px;
                        height: 33px;
                        cursor: pointer;
                        background: linear-gradient(90deg, rgba(255, 68, 54, 1) 0%, rgba(249, 107, 84, 1) 100%);
                        border-radius: 2px;
                        text-align: center;
                        line-height: 33px;
                        display: inline-block;
                        margin-top: -5px;
                    }

                    .study-time {
                        margin-top: 10px;
                        font-size: 14px;
                        color: #666666;
                        justify-content: flex-end;

                        .line {
                            margin: 0px 15px;
                            color: #f45d60;
                        }
                    }
                }
            }
        }

        .getmore-box {
            padding-top: 15px;

            .getmore {
                display: inline-block;
                width: 114px;
                height: 32px;
                border: 1px solid rgba(255, 89, 89, 1);
                border-radius: 16px;
                font-size: 16px;
                color: #ff5959;
                text-align: center;
                line-height: 32px;
            }
        }
    }
}

.overdue_tip {
    padding: 35px 30px;
    background-color: #fff;
    box-shadow: 0px 4px 16px 0px rgba(190, 190, 190, 0.22);
    border-radius: 2px;
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    display: inline-flex;
    overflow: hidden;

    position: fixed;
    top: 30%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 30;

    .overdue_tip_close {
        cursor: pointer;
        width: 70px;
        height: 40px;
        display: inline-block;
        background: #e1e1e1;
        border-radius: 56%;
        margin-right: -65px;
        margin-top: -55px;
        color: #000;
        padding-top: 22px;
        padding-left: 17px;
        font-size: 12px;
        color: #fff;
        box-sizing: border-box;
        cursor: pointer;
    }
}

.blank_tip {
    text-align: center;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.07);
    background: #ffffff;

    img {
        margin-top: 162px;
        margin-bottom: 25px;
    }

    div {
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
        padding-bottom: 328px;
    }
}
.back-my-course {
    background: url('../asset/images/attendace_record/toback.png') no-repeat;
    background-size: 10px 11px;
    background-position-x: left;
    background-position-y: 4px;
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: #77798d;
    margin-left: 18px;
    padding-left: 12px;
    cursor: pointer;
}
.class-name {
    font-size: 20px;
    font-weight: 700;
    color: #333333;
    margin-top: 16px;
    margin-bottom: 24px;
    margin-left: 16px;
}

ul {
    li {
        width: 1200px;
        background: #ffffff;
        border-radius: 4px;
        padding-top: 32px;
        margin-bottom: 16px;
        position: relative;
        box-sizing: border-box;
        .knob {
            margin-left: 40px;
            font-size: 18px;
            font-weight: 700;
            color: #333333;
            width: 980px;
            .knob-decorate {
                display: inline-block;
                width: 3px;
                height: 16px;
                background: #ff2e30;
                border-radius: 1px;
                position: absolute;
                left: 19px;
                top: 36px;
            }
        }
        .knob-describe {
            font-size: 14px;
            color: #3a3d4b;
            margin: 16px 0 24px 40px;
            width: 980px;
        }
        .continue-learning {
            width: 100px;
            height: 40px;
            background: linear-gradient(90deg, #ff6870, #f8323c);
            border-radius: 8px;
            font-size: 14px;
            text-align: center;
            color: #ffffff;
            line-height: 40px;
            position: absolute;
            right: 38px;
            top: 40px;
            cursor: pointer;
        }
        .watch-time-detail {
            border-top: 1px solid #ecedf1;
            padding-left: 40px;
            padding-top: 16px;
            font-size: 14px;
            color: #8d90aa;
            padding-bottom: 30px;
        }
        .watch-time {
            margin-right: 80px;
        }
    }
}
</style>
