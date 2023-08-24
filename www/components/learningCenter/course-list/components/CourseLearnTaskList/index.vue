<template>
    <ul class="subject-ul">
        <li class="subject-item" v-for="course in listData" :key="course.courseId">
            <div class="flex subject ai-center jc-between" @click="switchCourse(course)">
                <div class="subject-name">
                    {{ course.courseName }}
                    <span class="elective-status" v-if="course.courseElectiveStatus === 'Y'">选修</span>
                    <img src="./asset/images/clock.png" class="lock" v-if="lockedStatus" />
                </div>
                <div class="flex subject-jd ai-center">
                    <img src="./asset/images/13.png" alt="" class="mr10" v-if="course.courseLearnedstatus == 'Y'" />
                    <img src="./asset/images/11.png" alt="" class="mr10" v-else-if="course.courseLearnedstatus == 'S'" />
                    <img src="./asset/images/5.png" alt="" class="mr10" v-else-if="course.courseLearnedstatus == 'N'" />
                    已学完 {{ course.courseLearnedcount }}/{{ course.courseTotalcount }}个任务，已耗时 {{ course.courseLearnedduration }} 小时
                    <img src="./asset/images/15.png" alt="" class="ml10" v-if="course.isShow" />
                    <img src="./asset/images/14.png" alt="" class="ml10" v-else />
                </div>
            </div>
            <ul class="chapter-ul" v-show="course.catalogs.length > 0 && course.isShow">
                <li class="chapter-item" v-for="catalog in course.catalogs" :key="catalog.catalogId">
                    <div class="flex chapter ai-center jc-between" @click="switchCatalog(catalog)">
                        <div class="flex chapter-name ai-center">
                            <img src="./asset/images/8.png" alt="" class="mr10" />
                            {{ catalog.catalogName }}
                            <span class="elective ml15" v-if="catalog.cwCoursepreviousstatus == 'Y'">往期</span>
                            <span class="elective ml15" v-if="catalog.catalogElectivestatus == 'Y'">选修</span>

                            <img src="./asset/images/clock.png" class="lock" v-if="lockedStatus" />
                        </div>
                        <div class="chapter-jd">
                            <img src="./asset/images/6.png" alt="" v-if="catalog.isShow && catalog.coursewares.length > 0" />
                            <img src="./asset/images/16.png" alt="" v-if="!catalog.isShow && catalog.coursewares.length > 0" />
                        </div>
                    </div>
                    <ul class="section-ul" v-if="catalog.coursewares.length > 0 && catalog.isShow">
                        <li class="section-item" v-for="(courseware, k) in catalog.coursewares" :key="k" @click="toTaskDetailPage(courseware)">
                            <div class="flex section ai-center jc-between">
                                <template v-if="courseware.coursewareType == 'L'">
                                    <img src="./asset/images/zb-wks.png" alt class="right-icon" v-if="courseware.remindStatusname == '直播暂未开始'" />
                                    <img src="./asset/images/zb-jr.png" alt class="right-icon" v-if="courseware.remindStatusname == '今日直播'" />
                                    <img src="./asset/images/zb-hf.png" alt class="right-icon" v-if="courseware.remindStatusname == '直播回放'" />
                                </template>
                                <template v-if="courseware.coursewareType == 'F'">
                                    <img src="./asset/images/ms-wks.png" alt class="right-icon" v-if="courseware.remindStatusname == '面授未开始'" />
                                    <img src="./asset/images/ms-jr.png" alt class="right-icon" v-if="courseware.remindStatusname == '今日面授'" />
                                    <img src="./asset/images/ms-wq.png" alt class="right-icon" v-if="courseware.remindStatusname == '往期面授'" />
                                </template>
                                <div class="section-l">
                                    <div class="flex ai-center section-name">
                                        <!--S:保利威视;L:直播;P:试卷;E:exe文件;H:讲义;F面授 全部学习任务-->
                                        <img src="./asset/images/10.png" alt="" class="mr10" v-if="courseware.coursewareType == 'F'" />
                                        <img src="./asset/images/9.png" alt="" class="mr10" v-if="courseware.coursewareType == 'L'" />
                                        <img src="./asset/images/4.png" alt="" class="mr10" v-if="courseware.coursewareType == 'S'" />
                                        <img src="./asset/images/3.png" alt="" class="mr10" v-if="courseware.coursewareType == 'P'" />
                                        <img
                                            src="./asset/images/12.png"
                                            alt=""
                                            class="mr10"
                                            v-if="courseware.coursewareType == 'E' || courseware.coursewareType == 'H'"
                                        />
                                        <div>
                                            {{ courseware.coursewareName }}
                                            <p class="questionTime" v-if="courseware.coursewareType == 'P'">
                                                <span
                                                    :class="[
                                                        'time',
                                                        { isShowLint: !(courseware.coursewarePaper && courseware.coursewarePaper.answerNumLeft > -1) },
                                                    ]"
                                                    v-show="
                                                        courseware.coursewarePaper &&
                                                        courseware.coursewarePaper.answerTimeType === 'LIMITED' &&
                                                        courseware.coursewarePaper.answerBeginTime &&
                                                        courseware.coursewarePaper.answerEndTime
                                                    "
                                                >
                                                    做题时间：{{ courseware.coursewarePaper && courseware.coursewarePaper.answerBeginTime }} -
                                                    {{ courseware.coursewarePaper && courseware.coursewarePaper.answerEndTime }}
                                                </span>
                                                <span v-show="courseware.coursewarePaper && courseware.coursewarePaper.answerNumLeft > -1">
                                                    剩余做题次数：{{ courseware.coursewarePaper && courseware.coursewarePaper.answerNumLeft }}
                                                </span>
                                            </p>
                                        </div>
                                        <span class="elective ml15" v-if="courseware.cwCoursepreviousstatus == 'Y'">往期</span>
                                        <span class="elective ml15" v-if="courseware.coursewareElectivestatus == 'Y'">选修</span>

                                        <img src="./asset/images/clock.png" class="lock" v-if="lockedStatus" />
                                    </div>
                                    <p class="section-des" v-if="courseware.coursewareGroupname">{{ courseware.coursewareGroupname }}</p>
                                    <p class="flex section-des ai-center" v-if="courseware.coursewareType == 'L' || courseware.coursewareType == 'F'">
                                        <img src="./asset/images/1.png" alt class="time" />
                                        <span>{{ curStartTime(courseware.coursewareStarttime) }} - {{ curEndTime(courseware.coursewareEndtime) }}</span>
                                        <span class="tag end" v-if="courseware.coursewareBeginstate == 'Y'">已结束</span>
                                        <span class="tag doing" v-if="courseware.coursewareBeginstate == 'S' && courseware.coursewareType == 'L'">直播中</span>
                                        <span class="tag doing" v-if="courseware.coursewareBeginstate == 'S' && courseware.coursewareType == 'F'">已开始</span>
                                        <span class="tag nobegin" v-if="courseware.coursewareBeginstate == 'N'">未开始</span>
                                    </p>
                                </div>
                                <div class="flex section-r ai-center">
                                    <template v-if="courseware.coursewareType == 'L'">
                                        <template v-if="courseware.coursewareBeginstate == 'Y'">
                                            <template v-if="courseware.studyrdDurationcount > 0">
                                                <template v-if="percentage(courseware) >= 90">
                                                    <span class="complete">已学完</span>
                                                </template>
                                                <template v-else>
                                                    <span class="exam btn" v-if="courseware.coursewareOnlineurl && courseware.keepstudyStatus == 'Y'">
                                                        继续学习
                                                    </span>
                                                    <vb-transverse-progress
                                                        :canvas-style="{ width: '125px', height: '3px' }"
                                                        bg-color="#eeeeee"
                                                        top-color="#EA7C66"
                                                        :percentage="percentage(courseware)"
                                                    ></vb-transverse-progress>
                                                </template>
                                            </template>
                                        </template>
                                        <template v-if="courseware.coursewareBeginstate == 'S' && courseware.studyrdDurationcount > 0">
                                            <vb-transverse-progress
                                                :canvas-style="{ width: '125px', height: '3px' }"
                                                bg-color="#eeeeee"
                                                top-color="#EA7C66"
                                                :percentage="percentage(courseware)"
                                            ></vb-transverse-progress>
                                        </template>
                                    </template>
                                    <template v-if="courseware.coursewareType == 'S' || courseware.coursewareType == 'P'">
                                        <template v-if="courseware.studyStatus == 'Y'">
                                            <span class="complete">已学完</span>
                                        </template>
                                        <template v-if="courseware.coursewareType == 'P'">
                                            <span
                                                class="exam btn"
                                                v-if="
                                                    courseware.coursewarePaper &&
                                                    (courseware.coursewarePaper.answerStyle === 'FZJK1' ||
                                                        courseware.coursewarePaper.answerStyle === 'FZJK2' ||
                                                        courseware.coursewarePaper.answerStyle === 'FZJK3') &&
                                                    courseware.stageAnswersheetId &&
                                                    courseware.stageAswersheetStatus === 'G'
                                                "
                                                @click.stop="toTaskDetailPage(courseware, 'new')"
                                            >
                                                去机考
                                            </span>
                                            <span
                                                class="exam btn"
                                                v-else-if="courseware.stageAnswersheetId && courseware.stageAswersheetStatus === 'G'"
                                                @click.stop="toTaskDetailPage(courseware, 'goon')"
                                            >
                                                继续做题
                                            </span>
                                            <template v-else-if="courseware.stageAnswersheetId && courseware.stageAswersheetStatus === 'A'">
                                                <span class="continue btn" @click.stop="toTaskDetailPage(courseware, 'viewReport')">查看报告</span>
                                                <!-- 有练习 -->
                                                <span class="exam btn" @click.stop="toTaskDetailPage(courseware, 'new')">{{ answerBtnText(courseware) }}</span>
                                            </template>
                                            <span class="exam btn" v-else @click.stop="toTaskDetailPage(courseware, 'new')">
                                                {{ answerBtnText(courseware) }}
                                            </span>
                                        </template>
                                        <template v-if="courseware.studyStatus == 'S'">
                                            <span class="exam btn" v-if="courseware.keepstudyStatus == 'Y' && courseware.coursewareType !== 'P'">继续学习</span>
                                            <vb-transverse-progress
                                                :canvas-style="{ width: '125px', height: '3px' }"
                                                bg-color="#eeeeee"
                                                top-color="#EA7C66"
                                                :percentage="percentage(courseware)"
                                            ></vb-transverse-progress>
                                        </template>
                                    </template>
                                    <template v-if="courseware.coursewareType == 'H'">
                                        <span class="download">下载</span>
                                    </template>
                                    <img src="./asset/images/7.png" alt="" class="more" v-if="courseware.coursewareType != 'H'" />
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
        <live-popup :cur-task="curTask" @closeTipPoup="hidPopup" v-if="showTip" />
    </ul>
</template>
<script>
import livePopup from '../../../livePopup/index.vue';

export default {
    components: {
        livePopup,
    },
    props: {
        listData: {
            type: Array,
            default() {
                return [];
            },
        },
        showTip: {
            // 是否显示直播弹窗
            type: Boolean,
            default: false,
        },
        lockedStatus: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            curTask: {},
        };
    },
    computed: {
        answerBtnText() {
            return (data) => {
                if (
                    data?.coursewarePaper?.answerStyle === 'FZJK1' ||
                    data?.coursewarePaper?.answerStyle === 'FZJK2' ||
                    data?.coursewarePaper?.answerStyle === 'FZJK3'
                ) {
                    return '去机考';
                } else if (data?.coursewarePaper?.answerStyle === 'NORMAL') {
                    return '去做题';
                }
            };
        },
    },
    methods: {
        //切换课程
        switchCourse(item) {
            item.isShow = !item.isShow;
        },
        //切换目录
        switchCatalog(item) {
            item.isShow = !item.isShow;
            if (item.isShow && !item.isReady) {
                this.$emit('getExtendData', item);
            }
        },
        // 学习任务列表跳转
        toTaskDetailPage(item, status) {
            if (this.lockedStatus === true) {
                this.$emit('tipShake');
                return;
            }
            this.curTask = item;
            this.$emit('toPage', item, status);
        },
        hidPopup(check) {
            this.$emit('update:showTip', check);
        },
        //进度条
        percentage(item) {
            if (!item.studyrdDurationcount || !item.coursewareDuration) {
                return 0;
            } else {
                return Math.round((item.studyrdDurationcount / item.coursewareDuration) * 100);
            }
        },

        curStartTime(coursewareStarttime) {
            let time = coursewareStarttime.split(' ')[1];
            let index = time.lastIndexOf(':');
            return time.substring(0, index);
        },
        curEndTime(coursewareEndtime) {
            let time = coursewareEndtime.split(' ')[1];
            let index = time.lastIndexOf(':');
            return time.substring(0, index);
        },
    },
};
</script>
<style lang="less" scoped>
.questionTime {
    color: #8d90aa;
    font-size: 14px;
    margin-top: 5px;
    .time {
        &::after {
            display: inline-block;
            content: '';
            width: 1px;
            height: 10px;
            background: #8d90aa;
            display: inline-block;
            margin: 0 13px;
        }
        &.isShowLint {
            &::after {
                display: none;
            }
        }
    }
}
.mr10 {
    margin-right: 10px;
}
.ml10 {
    margin-left: 10px;
}
.flex {
    display: flex;
}
.ai-center {
    align-items: center;
}
.jc-between {
    justify-content: space-between;
}
.subject-ul {
    background: #ffffff;
    cursor: pointer;
}
.lock {
    width: 24px;
    height: 24px;
    vertical-align: middle;
}
.subject-item:last-child {
    .chapter-ul .chapter-item:last-child {
        .section-ul .section-item:last-child {
            padding-bottom: 20px;
        }
    }
}
.subject-ul {
    /*padding: 0px 15px 0px 20px;*/
    background: #ffffff;
    cursor: pointer;

    .subject-item:last-child {
        .chapter-ul .chapter-item:last-child {
            .section-ul .section-item:last-child {
                padding-bottom: 20px;
            }
        }
    }

    .subject-item {
        .subject {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
            width: 100%;
            height: 64px;
            padding: 0px 30px 0px 20px;
            box-sizing: border-box;

            .subject-name {
                font-size: 16px;
                color: #666666;
                font-weight: bold;
            }

            .subject-jd {
                color: #999999;
                font-size: 14px;
                display: flex;
                align-items: center;
            }

            .elective-status {
                color: #db3837;
                font-size: 14px;
                border: 1px solid #db3837;
                width: 47px;
                display: inline-block;
                border-radius: 4px;
                margin-left: 10px;
                text-align: center;
                padding-top: 2px;
                padding-bottom: 2px;
            }
        }

        .chapter-ul {
            padding: 0px 15px 0px 29px;

            .chapter-item {
                .chapter {
                    border-bottom: 1px dashed rgba(0, 0, 0, 0.08);
                    height: 55px;
                    padding-right: 17px;

                    .chapter-name {
                        font-size: 16px;
                        color: #666666;
                    }

                    .chapter-jd {
                    }
                }
            }

            .section-ul {
                padding: 0px 0px 0px 10px;
                position: relative;
                z-index: 1;
                border-bottom: 1px dashed rgba(0, 0, 0, 0.08);

                .section-item:first-child {
                    &::after {
                        top: 28px;
                    }
                }

                .section-item:last-child {
                    &::after {
                        height: 17px;
                    }
                }

                .section-item {
                    position: relative;
                    z-index: 1;

                    &::after {
                        content: '';
                        position: absolute;
                        z-index: 2;
                        pointer-events: none;
                        width: 1px;
                        top: 0px;
                        left: 28px;
                        bottom: 0px;
                        border-left: 1px dashed rgba(0, 0, 0, 0.1);
                    }

                    .section {
                        padding: 20px 17px 20px 20px;
                        position: relative;
                        cursor: pointer;

                        &:hover {
                            background: #fff5f5;

                            .section-name {
                                background: #fff5f5 !important;
                            }
                        }

                        .right-icon {
                            position: absolute;
                            right: 43px;
                            top: 12px;
                            z-index: 11;
                        }

                        .section-l {
                            font-size: 14px;
                            color: #555555;
                            flex: 1;

                            .section-name {
                                background: #ffffff;
                                // background: #ffffff;
                                position: relative;
                                z-index: 9;
                                font-size: 16px;
                                color: #666666;
                                img {
                                    background: #ffffff;
                                }
                            }

                            .section-des {
                                color: #999999;
                                font-size: 12px;
                                margin-top: 10px;
                                margin-left: 26px;

                                .time {
                                    margin-right: 6px;
                                }
                            }
                        }

                        .section-r {
                            .download {
                                width: 60px;
                                height: 28px;
                                border: 1px solid rgba(255, 68, 54, 1);
                                box-shadow: 0px 2px 8px 0px rgba(247, 38, 38, 0.2);
                                border-radius: 2px;
                                font-size: 14px;
                                font-weight: 400;
                                color: rgba(255, 68, 54, 1);
                                line-height: 28px;
                                text-align: center;
                            }
                        }

                        .sm-subject-ul {
                            /*padding: 0px 15px 0px 20px;*/
                            background: #ffffff;

                            .subject-item {
                                .subject {
                                    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
                                    width: 100%;
                                    height: 64px;
                                    padding: 0px 30px 0px 20px;
                                    cursor: pointer;

                                    .subject-name {
                                        font-size: 16px;
                                        color: #333333;
                                        font-weight: bold;
                                    }

                                    .subject-jd {
                                        color: #999999;
                                        font-size: 14px;
                                    }

                                    .elective-status {
                                        color: #db3837;
                                        font-size: 14px;
                                        border: 1px solid #db3837;
                                        width: 47px;
                                        display: inline-block;
                                        border-radius: 4px;
                                        margin-left: 10px;
                                        text-align: center;
                                        padding-top: 2px;
                                        padding-bottom: 2px;
                                    }
                                }

                                .section-ul {
                                    padding: 0px 18px 0px 20px;
                                    position: relative;
                                    z-index: 1;
                                    border-bottom: 1px solid rgba(0, 0, 0, 0.08);

                                    .section-item {
                                        border-bottom: 1px dashed rgba(0, 0, 0, 0.08);

                                        &:last-child {
                                            border-bottom: none;
                                        }

                                        .section {
                                            padding: 20px 17px 20px 10px;
                                            position: relative;
                                            cursor: pointer;

                                            &:hover {
                                                background: #fff5f5;

                                                .section-name {
                                                    background: #fff5f5 !important;
                                                }
                                            }

                                            .right-icon {
                                                position: absolute;
                                                right: 43px;
                                                top: 6px;
                                            }

                                            .section-l {
                                                font-size: 14px;
                                                color: #555555;

                                                .section-name {
                                                    background: #ffffff;
                                                    // background: #ffffff;
                                                    position: relative;
                                                    z-index: 9;
                                                    font-size: 14px;
                                                    color: #666666;
                                                    img {
                                                        background: #ffffff;
                                                    }
                                                }

                                                .section-des {
                                                    color: #999999;
                                                    font-size: 12px;
                                                    margin-top: 10px;
                                                    margin-left: 26px;
                                                }
                                            }

                                            .section-r {
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        .nosignin {
                            font-size: 16px;
                            font-weight: 400;
                            color: #999999;
                        }

                        .complete {
                            font-size: 14px;
                            font-weight: 400;
                            color: #3dce44;
                            // color: #f8323c;
                            margin: 0 20px;
                        }

                        .nostart {
                            font-size: 12px;
                            font-weight: 400;
                            color: #999999;
                            line-height: 14px;
                        }

                        .ing {
                            width: 80px;
                            height: 25px;
                            background: linear-gradient(90deg, rgba(255, 68, 54, 1) 0%, rgba(249, 107, 84, 1) 100%);
                            box-shadow: 1px 2px 8px 0px rgba(247, 38, 38, 0.35);
                            border-radius: 2px;
                            font-size: 12px;
                            font-weight: 400;
                            color: #ffffff;
                            display: inline-block;
                            text-align: center;
                            line-height: 25px;
                            margin-right: 29px;
                        }
                        .btn {
                            display: inline-block;
                            width: 70px;
                            height: 26px;
                            line-height: 26px;
                            border-radius: 5px;
                            text-align: center;
                            font-size: 12px;
                            margin-right: 29px;
                        }
                        .exam {
                            background: linear-gradient(301deg, #f8323c 0%, #ff737a 100%);
                            border: 1px solid #f8323c;
                            color: #fff;
                        }
                        .continue {
                            color: #f8323c;
                            background: #fff7f5;
                            border: 1px solid #f8323c;
                            cursor: pointer;
                        }

                        /deep/ .canvasWrap {
                            font-size: 14px;
                            border-radius: 5px;
                        }

                        .more {
                            margin-left: 20px;
                        }

                        .elective {
                            color: #db3837;
                            font-size: 14px;
                            border: 1px solid #db3837;
                            width: 47px;
                            height: 25px;
                            display: inline-block;
                            border-radius: 4px;
                            text-align: center;
                            line-height: 25px;
                        }

                        .tag {
                            display: inline-block;
                            width: 60px;
                            height: 22px;
                            border-radius: 11px;
                            text-align: center;
                            line-height: 22px;
                            font-size: 14px;
                            margin-left: 12px;
                        }

                        .doing {
                            border: 1px solid #ff4436;
                            color: #ff4436;
                        }

                        .end {
                            background: rgba(245, 245, 245, 1);
                            color: #999999;
                        }

                        .nobegin {
                            background: rgba(255, 68, 54, 0.1);
                            color: #ff4436;
                        }
                    }
                    .notask-tip {
                        text-align: center;
                        padding: 210px 0px 500px;
                        background: #ffffff;

                        .txt {
                            color: #666666;
                            font-size: 16px;
                            margin-top: 26px;
                        }
                    }
                }
            }
        }
    }
}
</style>
