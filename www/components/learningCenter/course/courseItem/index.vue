<template>
    <div class="wrap">
        <div class="subject-item">
            <div class="courseName" @click="toggle = !toggle">
                <div class="title">
                    <span class="title-wrap">{{ courseInfo.courseName }}</span>
                    <span class="elective-status" v-if="courseInfo.courseElectiveStatus === 'Y'">选修</span>
                    <img class="lock" v-if="lockedStatus" src="./asset/images/clock.png" />
                </div>
                <div class="right">
                    <img class="img" src="./asset/images/l1.png" v-if="courseInfo.courseLearnedstatus == 'S'" />
                    <img class="img" src="./asset/images/5_c.png" v-if="courseInfo.courseLearnedstatus == 'N'" />
                    <img class="img" src="./asset/images/13_c.png" v-if="courseInfo.courseLearnedstatus == 'Y'" />

                    <span class="tip">
                        已学完{{ courseInfo.courseLearnedcount }}/{{ courseInfo.courseTotalcount }}个任务，已耗时{{ courseInfo.courseLearnedduration }} 小时
                    </span>
                    <div class="status" :class="{ up: toggle, donw: !toggle }"></div>
                </div>
            </div>
        </div>
        <template v-if="toggle">
            <chapter-item
                v-for="chapter in courseInfo.catalogs"
                :key="chapter.catalogId"
                :locked-status="lockedStatus"
                :chapter-info1="chapter"
                :show-chapter-id="showChapterId"
                @tipShake="doTipShake"
            />
        </template>
    </div>
</template>
<script>
import chapterItem from '../courseChapter/index.vue';
export default {
    name: 'CourseItem',
    components: {
        chapterItem,
    },
    props: {
        courseInfo: {
            type: Object,
            default() {
                return {};
            },
        },
        showCourseId: {
            type: String,
            default: '',
        },
        lockedStatus: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            toggle: false,
            showChapterId: '',
        };
    },
    watch: {
        showCourseId: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    this.init();
                });
            },
        },
    },
    methods: {
        init() {
            if (this.showCourseId) {
                this.toggle = this.showCourseId == this.courseInfo.courseId;
                if (this.toggle) {
                    this.showChapterId = this.courseInfo.catalogs[0] ? this.courseInfo.catalogs[0].catalogId : '';

                    if (this.$route.query.coursewareId) {
                        this.courseInfo.catalogs.some((r1) => {
                            return r1.coursewares.some((r2) => {
                                if (r2.coursewareId == this.$route.query.coursewareId) {
                                    this.showChapterId = r1.catalogId;
                                    return true;
                                }

                                return false;
                            });
                        });
                    }
                }
            } else {
                // 判断
                this.toggle = this.courseInfo.keepstudyStatus == 'Y';
            }
        },
        doTipShake() {
            this.$emit('tipShake');
        },
    },
};
</script>
<style lang="less" scoped>
.subject-item {
    padding: 0 30px;
    cursor: pointer;
    border-bottom: 1px solid #f1f3f5;
}

.lock {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-top: -2px;
    vertical-align: middle;
}

.courseName {
    min-height: 70px;
    overflow: auto;
    padding: 27px 0;
    box-sizing: border-box;
    .title {
        float: left;
        width: 450px;
        .img {
            width: 16px;
            height: 16px;
            vertical-align: middle;
        }
        .title-wrap {
            font-size: 16px;
            font-weight: 700;
            color: #3a3d4b;
        }
        .elective-status {
            margin-left: 3px;
            border: 1px solid #f8323c;
            border-radius: 3px;
            color: #f8323c;
            font-size: 12px;
            padding: 0 4px;
        }
    }

    .right {
        float: right;

        .img {
            width: 16px;
            height: 16px;
            vertical-align: middle;
        }

        .tip {
            color: #8d90aa;
            font-size: 12px;
        }
    }
}

.subject-title {
    height: 70px;
    line-height: 70px;

    .title {
        float: left;
        .img {
            width: 16px;
            height: 16px;
            vertical-align: middle;
        }
        .title-wrap {
            font-size: 16px;
            font-weight: 700;
            color: #3a3d4b;
        }
    }

    .right {
        float: right;

        .img {
            width: 16px;
            height: 16px;
            vertical-align: middle;
        }

        .tip {
            color: #8d90aa;
            font-size: 12px;
        }
    }
}

.right {
    .status {
        display: inline-block;
        vertical-align: middle;
        width: 12px;
        height: 12px;
        margin-left: 14px;
        background-repeat: no-repeat;
        background-size: contain;

        &.donw {
            background-image: url(./asset/images/down.png);
        }

        &.up {
            background-image: url(./asset/images/up.png);
        }
    }
}
</style>
