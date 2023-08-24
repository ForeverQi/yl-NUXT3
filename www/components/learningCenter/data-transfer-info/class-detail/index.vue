<template>
    <div>
        <!--模块、课程、章节、课件-->
        <ul class="module-ul">
            <li v-for="(moduleItem, index) in modulList" :key="index + 'module'">
                <div class="module-title" @click="handleClickModule(moduleItem)">
                    {{ moduleItem.modulName }}
                    <span class="icon-folder" :class="moduleItem.active && moduleItem.children ? 'close' : ''"></span>
                </div>
                <ul class="chapters-ul" v-if="moduleItem.active && moduleItem.children && moduleItem.children.length">
                    <li v-for="(courseItem, index1) in moduleItem.children" :key="index1 + 'course'">
                        <div class="chapters-title" @click="handleClickCourse(moduleItem, courseItem)">
                            {{ courseItem.courseName }}
                            <span class="icon-folder" :class="courseItem.active && courseItem.children ? 'close' : ''"></span>
                        </div>
                        <ul class="node-ul" v-if="courseItem.active && courseItem.children && courseItem.children.length">
                            <li v-for="(catalogItem, index2) in courseItem.children" :key="index2 + 'catalog'">
                                <div class="node-title" @click="handleClickCatalog(moduleItem, courseItem, catalogItem)">
                                    <span class="icon-node"></span>
                                    <span class="node-title-text">{{ catalogItem.catalogName }}</span>
                                    <span class="icon-folder" :class="catalogItem.active && catalogItem.children ? 'close' : ''"></span>
                                </div>
                                <ul class="courseware-ul" v-if="catalogItem.active && catalogItem.children && catalogItem.children.length">
                                    <li v-for="(coursewareItem, index3) in catalogItem.children" :key="index3 + 'courseware'">
                                        <span v-if="coursewareItem.coursewareType === 'S'" class="courseware-type icon-video"></span>
                                        <span v-else-if="coursewareItem.coursewareType === 'L'" class="courseware-type icon-live"></span>
                                        <span v-else-if="coursewareItem.coursewareType === 'P'" class="courseware-type icon-paper"></span>
                                        <span v-else-if="coursewareItem.coursewareType === 'H'" class="courseware-type icon-handout"></span>
                                        <div class="courseware-title">{{ coursewareItem.coursewareName }}</div>
                                        <div class="courseware-info">
                                            <template v-if="coursewareItem.coursewareType === 'S'">
                                                课程时长：{{ coursewareItem.coursewareDuration | toMin }}
                                            </template>
                                            <template v-if="coursewareItem.coursewareType === 'P'">
                                                习题数量：{{ coursewareItem.questionTotal }}{{ coursewareItem.studyStatus === 'N' ? '未开始' : '' }}
                                            </template>
                                            <!--习题数量：50｜未开始-->
                                            <!--已学完状态-->
                                            <span
                                                class="study-status-end"
                                                v-if="
                                                    (coursewareItem.coursewareType === 'S' ||
                                                        coursewareItem.coursewareType === 'L' ||
                                                        coursewareItem.coursewareType === 'P') &&
                                                    coursewareItem.studyStatus === 'Y'
                                                "
                                            >
                                                <img src="./asset/images/icon-study-end.png" alt="" />
                                                已学完
                                            </span>
                                            <!--coursewareType:S保利威视；L直播；P：试卷；E：exe文件，H讲义；F：面授-->
                                            <!--学习中   学习状态(Y:已学;N:未学;S:学习中) -->
                                            <template
                                                v-if="
                                                    (coursewareItem.coursewareType === 'L' || coursewareItem.coursewareType === 'S') &&
                                                    coursewareItem.studyStatus === 'S'
                                                "
                                            >
                                                <span
                                                    class="study-status-press"
                                                    :class="coursewareItem.coursewareType === 'L' ? 'study-status-press-live' : ''"
                                                >
                                                    <span class="study-status-going" :style="{ width: coursewareItem.press * 70 + 'px' }"></span>
                                                </span>
                                                <span class="study-text">已学{{ coursewareItem.press | toRound }}</span>
                                            </template>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import '@/api/cc/api..query-class-transfer-course-list.js'; //【接口-转班听课率平移】 课程列表
import '@/api/cc/api..query-class-transfer-modul-list.js'; //【接口-转班听课率平移】 模块列表
import '@/api/cc/api..query-class-transfer-catalog-list.js'; //【接口-转班听课率平移】 章节列表
import '@/api/cc/api..query-class-transfer-courseware-list.js'; //【接口-转班听课率平移】 课件列表
export default {
    name: 'index',
    filters: {
        toRound(val) {
            return Math.round(val * 10000) / 100 + '%';
        },
        toMin(val) {
            if (val < 60) {
                return `${val}秒`;
            }
            let second = val % 60;
            let minute = 0;
            let hour = 0;
            if (val > 3600) {
                minute = Math.floor((val / 60) % 60);
                hour = Math.floor(val / 3600);

                return `${hour}小时${minute}分${second}秒`;
            } else {
                minute = Math.floor(val / 60);
                return `${minute}分${second}秒`;
            }
        },
    },
    props: {
        sourceClassId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            classId: '',
            currentModul: null, //当前模块
            currentCourse: null, //当前课程
            currentCatalog: null, //当前章
            modulList: [],
        };
    },
    watch: {
        sourceClassId: {
            handler(newVal, oldVal) {
                this.classId = this.$route.params.classId;
                this.currentModul = null; //当前模块
                this.currentCourse = null; //当前课程
                this.currentCatalog = null; //当前章
                newVal && newVal !== oldVal && this.getModulList();
            },
            deep: false,
            immediate: true,
        },
        currentModul(val) {
            val && this.getCourseList();
        },
        currentCourse(val) {
            val && this.getCatalogList();
        },
        currentCatalog(val) {
            val && this.getCoursewareList();
        },
    },
    mounted() {
        this.classId = this.$route.params.classId;
    },
    methods: {
        handleClickModule(val) {
            if (!val.active) {
                this.currentModul = val;
            }
            let index = this.modulList.indexOf(val);
            this.modulList[index].active = !this.modulList[index].active;
        },
        handleClickCourse(moduleVal, courseVal) {
            if (!courseVal.active) {
                this.currentModul = moduleVal;
                this.currentCourse = courseVal;
            }
            let index = this.modulList.indexOf(moduleVal);
            let courseIndex = this.modulList[index].children.indexOf(courseVal);
            this.modulList[index].children[courseIndex].active = !this.modulList[index].children[courseIndex].active;
        },
        handleClickCatalog(moduleVal, courseVal, catalogVal) {
            if (!catalogVal.active) {
                this.currentModul = moduleVal;
                this.currentCourse = courseVal;
                this.currentCatalog = catalogVal;
            }
            let index = this.modulList.indexOf(moduleVal);
            let courseIndex = this.modulList[index].children.indexOf(courseVal);
            let catalogIndex = this.modulList[index].children[courseIndex].children.indexOf(catalogVal);
            this.modulList[index].children[courseIndex].children[catalogIndex].active =
                !this.modulList[index].children[courseIndex].children[catalogIndex].active;
        },
        //cc/user/class/transfer/modul/list
        getModulList() {
            this.$callApi('cc/query-class-transfer-modul-list', {
                classId: this.classId,
                sourceClassId: this.sourceClassId,
                onsuccess: (res) => {
                    if (!res.length) {
                        this.currentModul = null;
                        this.modulList = [];
                        return;
                    }
                    res.forEach((item) => {
                        item.active = false;
                    });
                    if (!this.currentModul) {
                        res[0].active = true;
                        this.currentModul = res[0];
                    }
                    this.modulList.splice(0, this.modulList.length, ...res);
                },
                onerror: (error) => {
                    this.currentModul = null;
                    this.modulList = [];
                    this.$niceloo.api.handleFailure(error);
                },
            });
        },
        //cc/user/class/transfer/course/list
        getCourseList() {
            if (typeof this.currentModul.children !== 'undefined') {
                return;
            }
            this.$callApi('cc/query-class-transfer-course-list', {
                classId: this.classId,
                modulId: this.currentModul.modulId,
                sourceClassId: this.sourceClassId,
                onsuccess: (res) => {
                    if (!res.length) {
                        this.currentCourse = null;
                        return;
                    }
                    res.forEach((item) => {
                        item.active = false;
                    });
                    if (!this.currentCourse) {
                        res[0].active = true;
                        this.currentCourse = res[0];
                    }
                    this.modulList.forEach((item) => {
                        if (item.modulId === this.currentModul.modulId) {
                            this.$set(item, 'children', res);
                        }
                    });
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        //cc/user/class/transfer/catalog/list
        getCatalogList() {
            if (typeof this.currentCourse.children !== 'undefined') {
                return;
            }
            this.$callApi('cc/query-class-transfer-catalog-list', {
                classId: this.classId,
                modulId: this.currentModul.modulId,
                sourceClassId: this.sourceClassId,
                courseId: this.currentCourse.courseId,
                onsuccess: (res) => {
                    if (!res.length) {
                        this.currentCatalog = null;
                        return;
                    }
                    res.forEach((item) => {
                        item.active = false;
                    });
                    if (!this.currentCatalog) {
                        res[0].active = true;
                        this.currentCatalog = res[0];
                    }
                    this.modulList.forEach((modulItem) => {
                        if (modulItem.modulId === this.currentModul.modulId) {
                            modulItem.children.forEach((courseItem) => {
                                if (courseItem.courseId === this.currentCourse.courseId) {
                                    this.$set(courseItem, 'children', res);
                                }
                            });
                        }
                    });
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        //cc/user/class/transfer/courseware/list
        getCoursewareList() {
            if (typeof this.currentCatalog.children !== 'undefined') {
                return;
            }
            this.$callApi('cc/query-class-transfer-courseware-list', {
                classId: this.classId,
                modulId: this.currentModul.modulId,
                sourceClassId: this.sourceClassId,
                courseId: this.currentCourse.courseId,
                catalogId: this.currentCatalog.catalogId,
                onsuccess: (res) => {
                    res.length &&
                        res.forEach((item) => {
                            if ((item.coursewareType === 'L' || item.coursewareType === 'S') && item.studyStatus === 'S') {
                                item.press = item.studyDuration / item.coursewareDuration;
                                item.press = item.press > 1 ? 1 : item.press;
                            }
                        });
                    this.modulList.forEach((modulItem) => {
                        if (modulItem.modulId === this.currentModul.modulId) {
                            modulItem.children.forEach((courseItem) => {
                                if (courseItem.courseId === this.currentCourse.courseId) {
                                    courseItem.children.forEach((catalogItem) => {
                                        if (catalogItem.catalogId === this.currentCatalog.catalogId) {
                                            this.$set(catalogItem, 'children', res);
                                        }
                                    });
                                }
                            });
                        }
                    });
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
    },
};
</script>

<style scoped lang="less">
.icon-folder {
    width: 12px;
    height: 12px;
    display: inline-block;
    background: url('./asset/images/icon-folder.png') no-repeat;
    background-size: 12px 12px;
    margin-right: 30px;
}
.close {
    transform: rotate(180deg);
}
.module-ul {
    margin-top: 16px;
    background: #ffffff;
    border-radius: 0px 0px 8px 8px;
    padding-bottom: 60px;
    li {
        .module-title {
            font-size: 16px;
            font-weight: bold;
            color: #3a3d4b;
            line-height: 70px;
            display: flex;
            border-bottom: 1px solid #f1f3f5;
            padding-left: 30px;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
        }
    }
}
.chapters-ul {
    .chapters-title {
        font-size: 16px;
        font-weight: bold;
        color: #3a3d4b;
        line-height: 70px;
        padding-left: 46px;
        border-bottom: 1px solid #f1f3f5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }
}

.node-ul {
    > li {
        border-bottom: 1px solid #f1f3f5;
        .node-title {
            font-size: 16px;
            color: #333333;
            line-height: 64px;
            padding-left: 46px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            .node-title-text {
                flex: 1;
            }
        }
        .icon-node {
            width: 16px;
            height: 16px;
            display: inline-block;
            background: url('./asset/images/icon-node.png') no-repeat;
            background-size: 16px 16px;
            margin-right: 10px;
        }
    }
}
.courseware-ul {
    li {
        background: #fbfbfc;
        border-radius: 4px;
        margin-right: 46px;
        margin-bottom: 8px;
        margin-left: 46px;
        padding: 17px 0 15px 25px;

        .courseware-type {
            width: 16px;
            height: 16px;
            display: inline-block;
            float: left;
            position: relative;
            margin-right: 6px;
            top: 3px;
        }
        .icon-video {
            background: url('./asset/images/icon-video.png') no-repeat;
            background-size: 16px 16px;
        }
        .icon-live {
            background: url('./asset/images/icon-live.png') no-repeat;
            background-size: 16px 16px;
        }
        .icon-paper {
            background: url('./asset/images/icon-paper.png') no-repeat;
            background-size: 16px 16px;
        }
        .icon-handout {
            background: url('./asset/images/icon-handout.png') no-repeat;
            background-size: 16px 16px;
        }
        .courseware-title {
            font-size: 14px;
            color: #53586c;
            line-height: 21px;
            display: inline-block;
        }
        .courseware-info {
            margin-left: 22px;
            margin-top: 10px;
            font-size: 12px;
            color: #8d90aa;
            line-height: 16px;
        }
        .study-status-end {
            font-size: 12px;
            color: #f8323c;
            line-height: 18px;
        }
        .study-status-end {
            font-size: 12px;
            color: #f8323c;
            line-height: 18px;
            margin-left: 32px;
            img {
                width: 13px;
                height: 13px;
                margin-right: 4px;
                position: relative;
                top: 2px;
            }
        }
        .study-status-press {
            width: 70px;
            height: 4px;
            background: #ebedf0;
            border-radius: 4px;
            position: relative;
            display: inline-block;
            margin-left: 32px;
            .study-status-going {
                position: absolute;
                left: 0;
                top: 0;
                height: 4px;
                background: #fc555e;
                border-radius: 4px;
            }
        }
        .study-status-press-live {
            margin-left: 0;
        }
        .study-text {
            font-size: 12px;
            color: #f8323c;
            line-height: 18px;
            margin-left: 12px;
        }
    }
}
</style>
