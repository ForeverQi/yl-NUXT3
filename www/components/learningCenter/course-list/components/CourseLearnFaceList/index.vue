<template>
    <ul class="sm-subject-ul" v-show="faceList.length > 0 && !noFaceTask">
        <li class="subject-item" v-for="course in faceList" :key="course.subjectSourceid">
            <div class="flex subject ai-center jc-between" @click="switchFaceCourse(course)">
                <div class="subject-name">{{ course.subjectName }}</div>
                <div class="flex subject-jd ai-center" v-if="course.coursewares">
                    共有 {{ course.coursewares.length || 0 }} 个任务
                    <img src="./asset/images/15.png" alt="" class="ml10" v-if="course.isShow" />
                    <img src="./asset/images/14.png" alt="" class="ml10" v-else />
                </div>
            </div>
            <ul class="section-ul" v-show="course.coursewares.length > 0 && course.isShow">
                <li class="section-item" v-for="(courseware, j) in course.coursewares" :key="j" @click="toFaceTaskDetailPage(courseware)">
                    <div class="flex section ai-center jc-between">
                        <img src="./asset/images/ms-wks.png" alt class="right-icon" v-if="courseware.remindStatusname == '面授未开始'" />
                        <img src="./asset/images/ms-jr.png" alt class="right-icon" v-if="courseware.remindStatusname == '今日面授'" />
                        <img src="./asset/images/ms-wq.png" alt class="right-icon" v-if="courseware.remindStatusname == '往期面授'" />
                        <div class="section-l">
                            <p class="flex ai-center section-name">
                                <img src="./asset/images/17.png" alt="" class="mr10" />
                                {{ courseware.coursewareName }}
                            </p>
                            <p class="section-des">
                                <img src="./asset/images/1.png" alt class="mr10" />
                                <span>{{ curStartTime(courseware.coursewareStarttime) }} - {{ curEndTime(courseware.coursewareEndtime) }}</span>
                                <span class="tag end" v-if="courseware.coursewareBeginstate == 'Y'">已结束</span>
                                <span class="tag doing" v-if="courseware.coursewareBeginstate == 'S'">已开始</span>
                                <span class="tag nobegin" v-if="courseware.coursewareBeginstate == 'N'">未开始</span>
                            </p>
                        </div>
                        <div class="flex section-r ai-center">
                            <img src="./asset/images/7.png" alt="" class="more" />
                        </div>
                    </div>
                </li>
            </ul>
        </li>
        <live-popup :cur-task="curTask" @closeTipPoup="hidPopup" v-if="showFace" />
    </ul>
</template>
<script>
import livePopup from '../../../livePopup/index.vue';
export default {
    components: {
        livePopup,
    },
    props: {
        faceList: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            noFaceTask: false,
            showFace: false,
        };
    },
    methods: {
        //切换面授课程
        switchFaceCourse(item) {
            item.isShow = !item.isShow;
        },
        //面授任务列表跳转
        toFaceTaskDetailPage(item) {
            let vm = this;
            vm.curTask = item;
            vm.curTask.coursewareType = 'F';
            //跳转页面
            this.showFace = true;
        },
        hidPopup(check) {
            this.showFace = check;
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
.sm-subject-ul {
    background: #ffffff;

    .subject-item {
        .subject {
            box-sizing: border-box;
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
                            position: relative;
                            z-index: 9;
                            font-size: 14px;
                            color: #666666;
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
</style>
