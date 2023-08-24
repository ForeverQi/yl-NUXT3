<template>
    <div class="course-wrap">
        <div class="wring shake shake-horizontal shake-constant" :class="{ stop: tipShake }" v-if="curStage.lockedStatus === 'Y'">
            <span class="info el-icon-warning"></span>
            {{ curStage.lockedTip }}
        </div>
        <slot name="top"></slot>
        <div class="course-list">
            <div v-if="courseList.length">
                <course-item
                    v-for="item in courseList"
                    :locked-status="curStage && curStage.lockedStatus === 'Y'"
                    :key="item.courseId"
                    :course-info="item"
                    :show-course-id="showCourseId"
                    @tipShake="doTipShake"
                />
            </div>
            <div v-else>
                <div class="empty-wrap">
                    <ai-empty tip="暂无课程" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import courseItem from '../courseItem/index.vue';
import aiEmpty from '@/www/components/learningCenter/course/aiEmpty/index.vue';
export default {
    name: 'CourseList',
    components: {
        courseItem,
        aiEmpty,
    },
    props: {
        courseList: {
            type: Array,
            default() {
                return [];
            },
        },
        curStage: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            tipShake: true,
            showCourseId: '',
        };
    },
    mounted() {
        setTimeout(() => {
            this.isShake = true;
        }, 500);
    },
    methods: {
        init() {
            if (!this.courseList || this.courseList.length == 0) {
                return;
            }
            // 判断是否有展开的课程项，如果没有就把第一项作为默认展开项
            let iCheck = this.courseList.some((item) => {
                return item.keepstudyStatus == 'Y';
            });
            if (!iCheck) {
                this.showCourseId = this.courseList[0].courseId;
            }
            // 判断是否有课程ID
            if (this.$route.query.coursewareId) {
                this.courseList.some((r) => {
                    return r.catalogs.some((r1) => {
                        return r1.coursewares.some((r2) => {
                            if (r2.coursewareId == this.$route.query.coursewareId) {
                                this.showCourseId = r.courseId;
                                return true;
                            }

                            return false;
                        });
                    });
                });
            }
        },
        doTipShake() {
            this.tipShake = false;
            setTimeout(() => {
                this.tipShake = true;
            }, 500);
        },
    },
};
</script>
<style lang="less" scoped>
@import url(./css/shake.css);
.course-wrap {
    overflow-x: hidden;
}
.course-list {
}
.empty-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
}
.wring {
    width: 100%;
    margin: 0 auto;
    padding-left: 12px;
    padding-right: 12px;
    min-height: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    color: #5a5952;
    line-height: 20px;
    background: #ffece8;
    box-sizing: border-box;
    word-break: break-all;

    &.shake {
        display: block;
        // transform-origin: none;
    }

    .info {
        color: #e44645;
    }
}
</style>
