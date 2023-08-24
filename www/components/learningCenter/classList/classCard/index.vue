<!-- 班级card-->
<template>
    <div class="my-class-card" :class="transferInfo && transferInfo.displayStatus === 'Y' ? '' : 'pad-btm32'">
        <div class="ask-study-report" @click="toLearningReport()">
            我的学习报告
            <span class="asr-icon"></span>
        </div>
        <span class="hidden-course" @click="handleUpdateIsShowStatusCourse()" :class="classData.isShow === 'N' ? 'isShow' : ''">
            {{ classData.isShow === 'Y' ? '隐藏课程' : '取消隐藏' }}
        </span>
        <div class="clearfix class-List-box">
            <div class="class-List-box-left">
                <div class="class-Img" @click="toAllTask()">
                    <img class="img" :src="$urlUtils.getViewUrl(classData.classCoverpic)" @error="errorFn" v-if="classData.classCoverpic" />
                    <img class="img" src="../imgs/icon-default-class.png" v-else />
                    <div class="continue-study" v-if="classData.keepStudystatus == 'Y'">继续学习</div>
                    <div
                        v-if="classData.studentclassBizsrctype == 'O' && classData.classtypePypcount && classData.classtypePypcount != '一'"
                        class="common-period"
                    >
                        共{{ classData.classtypePypcount }}考期
                    </div>
                    <div class="pop" v-if="classData.studentclassCertificationstatus != 'Y'"></div>
                    <dl class="popCon" v-if="classData.studentclassCertificationstatus != 'Y'">
                        <dt><img src="./asset/images/icon-compile.png" /></dt>
                        <dd>确认个人信息</dd>
                    </dl>
                </div>
                <div class="validity-date">
                    <div class="termvalidity">
                        <span>
                            <span v-if="classData.studentclassBizsrctype == 'O' && classData.pypSeq && classData.classtypePypcount != '一'">
                                第{{ classData.pypSeq }}考期
                            </span>
                            有效期至：{{ classData.studentclassExpiredate }}
                        </span>
                    </div>
                    <div class="underline"></div>
                </div>
            </div>
            <div class="class-List-box-right">
                <div class="class-List-box-right-top">
                    <div class="title">
                        <h3 @click="toAllTask()">
                            <span v-if="classData.studentclassGift == 'Y'">赠</span>
                            <span v-if="classData.studentclassGift != 'Y' && classData.ctapName" class="periods-num">{{ classData.ctapName }}</span>
                            {{ classData.className }}
                        </h3>
                        <div>
                            <div class="last-study" v-if="classData.coursewareType" @click="toStudy()">
                                <span>上一次学习：</span>
                                <p class="text-overflow-one">{{ classData.coursewareName }}</p>
                                >>
                            </div>
                        </div>
                    </div>
                    <div class="start-hear" @click="toAllTask()">
                        <img src="./asset/images/icon-start.png" />
                        开始学习
                    </div>
                </div>
                <div class="class-List-box-right-bottom">
                    <div class="class-Info">
                        <div class="icon"><img src="./asset/images/icon-attendance-rate.png" /></div>
                        <div class="num">
                            <h3 v-if="classStatistics">
                                {{ classStatistics.ucsCompulsoryRate }}
                                <span class="txt">%</span>
                            </h3>

                            <h3 v-else>'-'</h3>
                            <el-popover trigger="hover" content="听课率=已学必修网课总数/班级必修网课总数" popper-class="el-popover1">
                                <p slot="reference">听课率</p>
                            </el-popover>
                        </div>
                    </div>
                    <div class="class-Info">
                        <div class="icon"><img src="./asset/images/icon-learned.png" /></div>
                        <div class="num">
                            <h3>
                                {{ classStatistics && typeof classStatistics.ucarLearnedcount !== 'undefined' ? classStatistics.ucarLearnedcount : '-' }}
                                <span class="txt">/{{ classStatistics ? classStatistics.ucarCwcount : '-' }}</span>
                            </h3>
                            <p>已学课时</p>
                        </div>
                    </div>
                    <!--<div class="class-Info">
                        <div class="icon"><img src="../imgs/icon-study-progress.png" /></div>
                        <div class="num">
                            <h3>{{ classStatistics ? classStatistics.ucarRate : '-' }}</h3>
                            <el-popover trigger="hover" content="学习进度=已学网课总数（含选修和必修课）/班级网课总数">
                                <p slot="reference">学习进度</p>
                            </el-popover>
                        </div>
                    </div>-->
                    <div class="class-Info">
                        <div class="icon"><img src="./asset/images/icon-hear-time.png" /></div>
                        <div class="num">
                            <h3>
                                <template v-if="classStatistics">
                                    <template v-if="getTimeHour(classStatistics.ucarDurationcount) > 0">
                                        {{ getTimeHour(classStatistics.ucarDurationcount) }}
                                    </template>
                                    <span class="txt1" v-if="getTimeHour(classStatistics.ucarDurationcount) > 0">小时</span>
                                    {{ getTimeMinute(classStatistics.ucarDurationcount) }}
                                    <span class="txt1" v-if="getTimeMinute(classStatistics.ucarDurationcount) > 0">分钟</span>
                                </template>
                                <template v-else>-</template>
                            </h3>
                            <p>听课时长</p>
                        </div>
                    </div>
                    <div class="class-Info cursor" @click="toAttendanceRecord()">
                        <div class="icon"><img src="./asset/images/icon-learned-time.png" /></div>
                        <div class="num">
                            <h3>
                                {{ classStatistics && typeof classStatistics.ucarLasttime !== 'undefined' ? classStatistics.ucarLasttime : '-' }}
                            </h3>
                            <el-popover trigger="hover" content="点击可查看班级下所有听课记录" popper-class="el-popover1">
                                <p slot="reference">听课记录</p>
                            </el-popover>
                        </div>
                    </div>
                    <div
                        class="class-Info cursor class-Info-updates"
                        v-if="classStatistics && classStatistics.coursewareUpdateTime && classStatistics.coursewareUpdateTime != '--'"
                        @mouseenter="handleLookCourseUpdates()"
                        @mouseleave="isShowCourseUpdatesList = false"
                    >
                        <div class="icon"><img src="./asset/images/icon-course-update.png" /></div>
                        <div class="num">
                            <h3>
                                {{ classStatistics ? classStatistics.coursewareUpdateTime : '-' }}
                            </h3>
                            <p>课程更新</p>
                        </div>
                        <transition name="fade">
                            <div class="course-updates" v-if="isShowCourseUpdatesList && dataList.length > 0">
                                <div v-for="item in dataList" :key="item.moduleId">
                                    <div class="module-title">
                                        {{ item.moduleName }}
                                    </div>
                                    <div v-for="item1 in item.courseCatalogList" :key="item1.courseId">
                                        <div class="course-title">{{ item1.courseName }}</div>
                                        <template v-if="item1.catalogShowStatus === 'Y'">
                                            <div v-for="item2 in item1.catalogCoursewareList" :key="item2.catalogId" style="padding-left: 20px">
                                                <div class="chapter-title">{{ item2.catalogName }}</div>
                                                <ul class="courseware-ul">
                                                    <li v-for="(item3, index) in item2.coursewareInfoList" :key="item3.coursewareId">
                                                        <span class="divider" v-if="index !== item2.coursewareInfoList.length - 1"></span>
                                                        <span class="dot"></span>
                                                        <img class="file-type" v-if="item3.coursewareType === 'S'" src="./asset/images/video.png" alt="" />
                                                        <img class="file-type" v-else-if="item3.coursewareType === 'L'" src="./asset/images/live.png" alt="" />
                                                        <img class="file-type" v-else-if="item3.coursewareType === 'H'" src="./asset/images/note.png" alt="" />
                                                        <img
                                                            class="file-type"
                                                            v-else-if="item3.coursewareType === 'P'"
                                                            src="./asset/images/document.png"
                                                            alt=""
                                                        />
                                                        <img class="file-type" v-else src="./asset/images/video.png" alt="" />
                                                        <div class="coursewareName">{{ item3.coursewareName }}</div>
                                                        <!--课件类型(S:保利威视;L:直播;P:试卷;E:exe文件;H:讲义;F:面授;O:其他)-->
                                                        <div class="file-size" v-if="item3.coursewareType === 'S'">
                                                            {{ item3.coursewareDuration | toMin }}
                                                            <span class="star-level" :style="{ width: item3.coursewareStar * 24 + 'px' }"></span>
                                                        </div>
                                                        <div class="file-size" v-else-if="item3.coursewareType === 'L'">{{ item3.liveTime || '' }}</div>
                                                        <div class="file-size" v-else-if="item3.coursewareType === 'P'">
                                                            {{ item3.paperQuestionTotal ? item3.paperQuestionTotal + '题' : '' }}
                                                        </div>
                                                        <div class="file-size" v-else>{{ item3.coursewareSize ? item3.coursewareSize + 'kb' : '' }}</div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <ul class="courseware-ul">
                                                <li v-for="(item3, index) in item1.coursewareInfoList" :key="item3.coursewareId">
                                                    <span class="divider" v-if="index !== item1.coursewareInfoList.length - 1"></span>
                                                    <span class="dot"></span>
                                                    <img class="file-type" v-if="item3.coursewareType === 'S'" src="./asset/images/video.png" alt="" />
                                                    <img class="file-type" v-else-if="item3.coursewareType === 'L'" src="./asset/images/live.png" alt="" />
                                                    <img class="file-type" v-else-if="item3.coursewareType === 'H'" src="./asset/images/note.png" alt="" />
                                                    <img class="file-type" v-else-if="item3.coursewareType === 'P'" src="./asset/images/document.png" alt="" />
                                                    <img class="file-type" v-else src="./asset/images/video.png" alt="" />
                                                    <div class="coursewareName">{{ item3.coursewareName }}</div>
                                                    <!--课件类型(S:保利威视;L:直播;P:试卷;E:exe文件;H:讲义;F:面授;O:其他)-->
                                                    <div class="file-size" v-if="item3.coursewareType === 'S'">
                                                        {{ item3.coursewareDuration | toMin }}
                                                        <span class="star-level" :style="{ width: item3.coursewareStar * 24 + 'px' }"></span>
                                                    </div>
                                                    <div class="file-size" v-else-if="item3.coursewareType === 'L'">{{ item3.liveTime || '' }}</div>
                                                    <div class="file-size" v-else-if="item3.coursewareType === 'P'">
                                                        {{ item3.paperQuestionTotal ? item3.paperQuestionTotal + '题' : '' }}
                                                    </div>
                                                    <div class="file-size" v-else>{{ item3.coursewareSize ? item3.coursewareSize + 'KB' : '' }}</div>
                                                </li>
                                            </ul>
                                        </template>
                                    </div>
                                </div>

                                <div class="look-more-course" @click="toAllTask()">
                                    查看更多课程
                                    <img src="./asset/images/look_more.png" alt="" />
                                </div>
                                <div class="course-updates-popper-arrow"></div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
        <div class="transfer-calss-tip" v-if="transferInfo && transferInfo.displayStatus === 'Y'">
            温馨提示：此班级通过转班开课，为了保障您的学习进度，会将您之前与此班级相同课件学习情况带入这个班级中
            <a :href="'/learningCenter/data-transfer-info/' + transferInfo.classId" class="look-detail">查看详情</a>
        </div>
    </div>
</template>
<script>
import { popover } from 'element-ui';
import Vue from 'vue';
import imgUrl from '../imgs/icon-default-class.png';
import orderTrueOrder from '@/www/components/uc/manager/order/orderTrueOrder/index.vue'; // 确认订单信息
import '@/api/cc/api..studentclass-isShowStatus-update.js'; //更新显示隐藏接口
import '@/api/cc/api..query-courseware-change-record-list.js'; //课程更新列表接口
Vue.use(popover);
export default {
    components: {
        orderTrueOrder,
    },
    filters: {
        toMin(value) {
            if (value === 0) return '';
            let m = Math.floor(value / 60);
            if (m == 0) {
                return '';
            }
            return m + '分钟';
        },
    },
    props: {
        classData: {
            type: Object,
            required: true,
        },
        classStatistics: {
            type: Object,
            default: null,
        },
        transferInfo: {
            type: Object,
            default: null,
        },
        projectMap: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            imgUrl,
            isShowCourseUpdatesList: false,
            dataList: [],
        };
    },
    mounted() {},
    methods: {
        toAttendanceRecord() {
            this.$yiguan.learningCenter('web_learning_center_attendance_record', {
                college_name: '',
                page_name: '学习中心-系统课列表',
                project_name: this.classData.projectName,
            });
            this.$emit('attendance-record', this.classData);
        },
        toLearningReport() {
            this.$yiguan.learningCenter('web_learning_center_learning_report', {
                college_name: '',
                page_name: '学习中心-系统课列表',
                project_name: this.classData.projectName,
            });
            this.$emit('learning-report', this.classData);
        },
        toAllTask() {
            this.$yiguan.learningCenter('web_learning_center_more_course', {
                college_name: '',
                page_name: '学习中心-系统课列表',
                project_name: this.classData.projectName,
            });
            this.$emit('all-task', this.classData);
        },
        toStudy() {
            this.$emit('to-study', this.classData);
        },
        getTimeString(time) {
            if (!time || time == 0) {
                return 0;
            }
            var hour = Math.floor(time / 3600);
            //var minute = this.formatNumber(Math.floor((time - 3600 * hour) / 60));
            //var second = this.formatNumber(Math.floor((time - 3600 * hour - 60 * minute) % 60));
            var minute = Math.ceil((time - 3600 * hour) / 60);
            if (hour > 0) {
                if (minute > 0) {
                    return hour + '小时' + minute + '分钟';
                } else {
                    return hour + '小时';
                }
            } else if (minute > 0) {
                return minute + '分钟';
            } else {
                return 0;
            }
        },
        getTimeHour(time) {
            if (!time || time == 0) {
                return 0;
            }
            var hour = Math.floor(time / 3600);
            return hour;
        },
        getTimeMinute(time) {
            if (!time || time == 0) {
                return 0;
            }
            var hour = Math.floor(time / 3600);
            var minute = Math.ceil((time - 3600 * hour) / 60);
            return minute;
        },
        errorFn(e) {
            var img = e.srcElement;
            img.src = this.imgUrl;
            img.onerror = null;
        },
        //隐藏、取消 课程隐藏cc/user/studentclass/isShowStatus/update
        async handleUpdateIsShowStatusCourse() {
            if (this.classData.isShow === 'Y') {
                this.$yiguan.learningCenter('web_learning_center_hidden', {
                    college_name: '',
                    page_name: '学习中心-系统课列表',
                    project_name: this.classData.projectName,
                });
            }
            let userInfo = await this.$User.getUser();
            this.$callApi('cc/studentclass-isShowStatus-update', {
                userId: userInfo.userId,
                classId: this.classData.classId,
                isShow: this.classData.isShow === 'Y' ? 'N' : 'Y',
                onsuccess: (res) => {
                    if (res.operationStatus === 'Y') {
                        this.$emit('delete-item', this.classData);
                    }
                },
                onerror: () => {},
                oncomplete: () => {},
            });
        },
        //课程更新列表cc/user/courseware/change/record/list
        handleLookCourseUpdates() {
            if (this.classStatistics && this.classStatistics.coursewareUpdateTime != '--' && this.dataList.length === 0) {
                this.$callApi('cc/query-courseware-change-record-list', {
                    classId: this.classData.classId,
                    onsuccess: (res) => {
                        this.isShowCourseUpdatesList = true;
                        this.dataList = res.moduleCourseList;
                    },
                    onerror: () => {},
                    oncomplete: () => {},
                });
            } else {
                this.isShowCourseUpdatesList = true;
            }
        },
    },
};
</script>
<style lang="less" scoped>
.my-class-card {
    background: #fff;
    padding: 32px 24px 16px 24px;
    position: relative;
    margin-bottom: 18px;
    /*width: 1200px;
    height: 265px;*/
    border-radius: 4px;
    dl,
    dd,
    dt {
        border: 0;
        font-weight: normal;
    }
    .ask-study-report {
        position: absolute;
        right: 0;
        bottom: 20px;
        width: 144px;
        height: 36px;
        background: rgba(251, 135, 21, 0.1);
        border-radius: 18px 0px 0px 18px;
        font-size: 14px;
        cursor: pointer;
        padding-left: 16px;
        line-height: 36px;
        color: #fa6400;
        box-sizing: border-box;
        .asr-icon {
            box-sizing: border-box;
            background: url('./asset/images/icon-asr.png') no-repeat;
            background-size: 100%;
            display: inline-block;
            width: 16px;
            height: 16px;
            display: inline-block;
            margin-left: 8px;
            position: relative;
            top: 4px;
        }
    }
    .hidden-course {
        font-size: 14px;
        color: #99a1af;
        position: absolute;
        top: 16px;
        right: 40px;
        display: none;
    }
    .isShow {
        display: inline-block;
    }
    .clearfix:after {
        content: '';
        clear: both;
        display: block;
    }
    .class-List-box {
        box-sizing: border-box;
        .class-List-box-left {
            float: left;
            /*border-right: 1px dashed rgba(0, 0, 0, 0.05);*/
            /*padding-right: 30px;*/
            /* margin: 5px 0 0 0px;*/
            .class-Img {
                box-sizing: border-box;
                /*width: 272px;
                height: 176px;*/
                border-radius: 8px;
                display: block;
                /*padding: 8px;*/
                /*box-shadow: 0px 4px 9px 1px rgba(26, 39, 90, 0.1);*/
                position: relative;
                cursor: pointer;

                .continue-study {
                    width: 76px;
                    height: 24px;
                    background: linear-gradient(135deg, #ffa8ad, #f8323c);
                    border-radius: 6px 0px 6px 0px;
                    position: absolute;
                    left: 0;
                    top: 0;
                    line-height: 24px;
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                    float: left;
                    margin-right: 10px;
                }

                .common-period {
                    box-sizing: border-box;
                    width: 256px;
                    height: 30px;
                    line-height: 30px;
                    opacity: 0.7;
                    background: #000000;
                    border-radius: 0px 0px 6px 6px;
                    position: absolute;
                    bottom: 8px;
                    color: #ffffff;
                    text-align: center;
                }
            }

            .class-Img .img {
                width: 260px;
                height: 169px;
                border-radius: 6px;
                object-fit: cover;
                display: block;
            }

            .class-Img .pop {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 1);
                opacity: 0.6;
                border-radius: 8px;
                z-index: 0;
            }

            .class-Img .popCon {
                position: absolute;
                z-index: 1;
                text-align: center;
                width: 260px;
                height: 169px;
                top: 0;
                left: 0;
                cursor: pointer;
            }

            .class-Img .popCon dt {
                margin: 60px 0 5px;
                img {
                    width: 16px;
                    height: 20px;
                }
            }

            .class-Img .popCon dd {
                font-size: 14px;
                color: #fff;
            }

            .validity-date {
                margin-top: 10px;
                position: relative;
                text-align: center;
                height: 20px;
            }

            .validity-date .termvalidity {
                position: absolute;
                z-index: 1;
                left: -5px;
                width: 272px;
                text-align: center;
            }

            .validity-date .termvalidity > span {
                display: inline-block;
                color: #99a1af;
                font-size: 14px;
                background: #fff;
                padding: 0 10px;
            }
            .underline {
                position: absolute;
                top: 10px;
                left: 0;
                background: rgba(0, 0, 0, 0.1);
                height: 1px;
                width: 100%;
                z-index: 0;
            }
        }
        .class-List-box-right {
            float: left;
            margin-left: 24px;
            width: 852px;
        }

        .class-List-box-right-top {
            /*border-bottom: 1px dashed rgba(0, 0, 0, 0.05);*/
            overflow: hidden;
            min-height: 93px;
        }

        .class-List-box-right-top .title {
            float: left;
            width: 90%;
            margin-top: 12px;
        }

        .class-List-box-right-top .title h3 {
            font-weight: normal;
            font-size: 18px;
            cursor: pointer;
            display: -webkit-box;
            max-height: 48px;
            overflow: hidden;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        .class-List-box-right-top .title h3 span {
            width: 20px;
            height: 20px;
            background: linear-gradient(0deg, rgba(255, 109, 88, 1) 0%, rgba(253, 28, 18, 1) 100%);
            border-radius: 2px;
            color: #fff;
            font-size: 16px;
            text-align: center;
            line-height: 20px;
            display: inline-block;
            margin-right: 10px;
        }

        .class-List-box-right-top .title h3 .periods-num {
            width: 60px;
            height: 20px;
            background: linear-gradient(#ff4436 0%, #f96b54 100%);
            border-radius: 2px;
            color: #fff;
            font-size: 16px;
            text-align: center;
        }

        .class-List-box-right-top .title .last-study {
            display: inline-block;
            font-size: 14px;
            color: #3a3d4b;
            background: #fff2f2;
            border-radius: 14px;
            height: 28px;
            line-height: 28px;
            margin-top: 16px;
            cursor: pointer;
            overflow: hidden;
            padding-right: 20px;
        }

        .class-List-box-right-top .title div span {
            display: inline-block;
            background: url('./asset/images/icon-last-record.png') no-repeat left 10px center;
            background-size: 16px;
            padding-left: 35px;
            float: left;
        }

        .class-List-box-right-top .title div p {
            float: left;
            font-size: 14px;
            max-width: 430px;
            height: 32px;
            display: inline-block;
        }

        .class-List-box-right-top .start-hear {
            float: right;
            color: #ff4537;
            font-size: 14px;
            text-align: center;
            cursor: pointer;
            position: absolute;
            right: 40px;
            top: 60px;
        }

        .class-List-box-right-top .start-hear img {
            width: 56px;
            height: 56px;
            display: block;
            margin-bottom: 6px;
        }

        .class-List-box-right-bottom {
            /*overflow: hidden;*/
        }
        .class-Info {
            float: left;
            margin: 35px 32px 0 0;
            &:last-child {
                margin-right: 0;
            }
        }
        .cursor {
            cursor: pointer;
        }
        .class-Info .icon {
            img {
                width: 40px;
                height: 40px;
            }
            float: left;
            margin-right: 15px;
        }

        .class-Info .num {
            float: left;
        }

        .class-Info .num h3 {
            font-size: 18px;
            color: #3a3d4b;
            font-weight: 700;
        }

        .class-Info .num h3 .txt {
            font-size: 12px;
            font-weight: bold;
        }
        .class-Info .num h3 .txt1 {
            font-size: 12px;
        }

        .class-Info .num p,
        .class-Info.num .popover {
            color: #99a1af;
            font-size: 12px;
        }
        .class-Info-updates {
            position: relative;
        }
    }
    &:hover {
        .hidden-course {
            display: block;
            &:hover {
                color: #3a3d4b;
                cursor: pointer;
            }
        }
    }
}
.pad-btm32 {
    padding-bottom: 32px;
}
.transfer-calss-tip {
    font-size: 13px;
    font-weight: 400;
    color: #53586c;
    line-height: 20px;
    margin-top: 14px;
    .look-detail {
        font-size: 13px;
        font-weight: 400;
        text-decoration: underline;
        color: #3a3d4b;
        line-height: 20px;
        margin-left: 12px;
    }
}
.course-updates {
    width: 360px;
    max-height: 530px;
    background: #ffffff;
    box-shadow: 0px 8px 32px 0px #edeff5;
    position: absolute;
    right: -125px;
    top: 59px;
    z-index: 35;
    cursor: default;
    transition: all 0.3s;
    overflow: auto;
    .module-title {
        height: 48px;
        background: #f5f6fa;
        border-radius: 6px;
        font-size: 18px;
        color: #3b3d4b;
        line-height: 48px;
        padding-left: 16px;
        padding-right: 16px;
        margin: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        -o-text-overflow: ellipsis;
    }
    .course-title {
        font-size: 14px;
        font-weight: bold;
        color: #3a3d4b;
        padding: 8px 15px 8px 24px;
    }
    .chapter-title {
        font-size: 14px;
        font-weight: bold;
        color: #3a3d4b;
        padding: 8px 15px 8px 24px;
    }
    .courseware-ul {
        margin-left: 24px;
        margin-right: 20px;
        position: relative;
        li {
            padding: 12px 0;
            font-size: 14px;
            color: #3a3d4b;
            line-height: 25px;
            .divider {
                width: 1px;
                display: inline-block;
                left: 0;
                float: left;
                top: 28px;
                bottom: 28px;
                background: #f5f6fa;
                position: absolute;
                z-index: -1;
            }
            .dot {
                width: 6px;
                height: 6px;
                background: #d6dde8;
                border-radius: 50%;
                display: inline-block;
                position: relative;
                float: left;
                margin-left: -3px;
                top: 9px;
            }
            .file-size {
                font-size: 12px;
                color: #8d90aa;
                line-height: 17px;
                margin-left: 50px;
                margin-top: 6px;
            }
            .file-type {
                width: 20px;
                height: 20px;
                margin-left: 19px;
                margin-right: 10px;
                float: left;
                position: relative;
                top: 2px;
            }
            .coursewareName {
                padding-left: 49px;
                word-wrap: break-word;
            }
            .star-level {
                height: 16px;
                background: url('./asset/images/star.png');
                background-size: 24px 16px;
                display: inline-block;
                float: right;
            }
            &:last-child {
                border-left: 0;
            }
        }
    }
    .look-more-course {
        color: #77798d;
        text-align: center;
        font-size: 14px;
        margin-top: 16px;
        margin-bottom: 28px;
        cursor: pointer;
        img {
            width: 10px;
            height: 11px;
            margin-left: 4px;
        }
    }
    .course-updates-popper-arrow {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        border-width: 6px;
        filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
        top: -6px;
        left: 150px;
        margin-right: 3px;
        border-top-width: 0;
        border-bottom-color: #ffffff;
    }
    .course-updates-popper-arrow::after {
        content: ' ';
        border-width: 6px;
        top: 1px;
        margin-left: -6px;
        border-top-width: 0;
        border-bottom-color: #fff;
    }
}
</style>
<style lang="less">
.el-popover1 {
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    min-width: 150px;
    border-radius: 8px;
    border: 1px solid #ebeef5;
    padding: 14px 24px;
    z-index: 2000;
    line-height: 1.4;
    text-align: justify;
    font-size: 12px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    word-break: break-all;
    color: #ffffff;

    .popper__arrow,
    .popper__arrow::after {
        border-bottom-color: #666666 !important;
    }
}
</style>
