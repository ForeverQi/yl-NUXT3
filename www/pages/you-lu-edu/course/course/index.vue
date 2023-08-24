<template>
    <div class="course-list-wrap" v-if="!isInvalid && !isLoading && !isError">
        <div class="top-seletc-box">
            <div class="select-tab-content">
                <div class="top-title-box">
                    <div class="column-name">{{ collegeName }}</div>
                    <div class="change-box" @click="openSlectProject" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                        <img class="change-icon" src="./asset/images/change-project-icon.png" alt="" />
                        <span class="change-text">切换考试</span>
                        <div class="list-select-project" v-show="isOpenSlect">
                            <SelectProjectClassify
                                :college-name.sync="collegeName"
                                :college-id.sync="collegeId"
                                :category-code.sync="categoryCode"
                                @close="handleMouseLeave"
                            ></SelectProjectClassify>
                        </div>
                    </div>
                </div>
                <SelcetProject
                    @project-change="changeProject"
                    :is-invalid-college.sync="isInvalidCollege"
                    :project-seo-code="projectSeoCode"
                    :college-id="collegeId"
                    :category-project-list.sync="projectList"
                ></SelcetProject>
                <div class="course-wrapper">
                    <h4 class="course-title">课程类型：</h4>
                    <ul class="course-list">
                        <li
                            v-for="(item, index) in courseTabList"
                            :class="['course-item', item.isChecked ? 'course-item-checked' : '']"
                            :key="index"
                            @click.prevent="selectCourseType(index, item)"
                        >
                            {{ item.courseName }}
                        </li>
                    </ul>
                </div>
            </div>
            <img class="ploceholder-icon" src="./asset/images/ploceholder-icon.png" alt="" />
        </div>
        <div class="course-content-container">
            <div class="course-title-box">
                <div class="course-title">{{ selectCourseData.titleName }}</div>
                <!-- 地区科目选择器 -->
                <SelectAreaSection
                    v-if="isCityReady"
                    v-show="['系统课'].includes(selectCourseData.titleName)"
                    :left="-412"
                    :selece-area="areaName"
                    @handle-click-city="changeCity"
                />
            </div>
            <div class="course-list-box" ref="vueRefCourseList">
                <div v-if="isCourseError" class="empty-state">
                    <img src="./asset/images/error.png" alt="暂无数据" />
                    <p class="hint-txt">您的网络开小差了，刷新页面再试一次～</p>
                    <button class="reload-btn" @click="$emit('click-reload')">刷新试试</button>
                </div>
                <div v-else-if="courseList.length" class="course-list-content">
                    <div class="course-list-item" v-for="(item, index) in courseList" :key="index" :class="[(index + 1) % 4 === 0 ? 'no-margin' : '']">
                        <ProCourse
                            :course-data="item"
                            v-if="item.polymerizeCourseType === 'XT' || selectCourseData.courseType === 'pro'"
                            :area-name="areaName"
                            :is-show-type="selectCourseData.courseType === 'all'"
                            :college-name="collegeName"
                            :college-id="collegeId"
                            page-type="课程集合页"
                            entrance-resource="系统课-免费试听"
                        ></ProCourse>
                        <FreeCourse
                            :width="'280px'"
                            :img-heght="'175px'"
                            :course-data="item"
                            :is-show-type="selectCourseData.courseType === 'all'"
                            v-if="item.polymerizeCourseType === 'ZB' || selectCourseData.courseType === 'free'"
                        ></FreeCourse>
                        <TrialCourse
                            :width="'280px'"
                            :img-heght="'175px'"
                            :course-data="item"
                            :is-show-type="selectCourseData.courseType === 'all'"
                            v-if="item.polymerizeCourseType === 'TY' || selectCourseData.courseType === 'trial'"
                        ></TrialCourse>
                    </div>
                </div>
                <div v-else class="empty-state">
                    <div v-loading="isCourseLoading" loading-background="transparent">
                        <img src="./asset/images/empty.png" alt="暂无数据" />
                        <p class="hint-txt">暂无课程</p>
                        <p class="bottom-hint-txt">切换其他考试项目，查看更多课程</p>
                    </div>
                </div>
                <!-- 分页器 -->
                <div class="pagination-box">
                    <user-pagination
                        :page-size="page.pageSize"
                        :total="page.pageCount"
                        :current-page.sync="page.pageIndex"
                        @current-change="changePageIndex"
                        :page-path-name="pagePathName"
                    />
                </div>
            </div>
        </div>
    </div>
    <div class="empty-invalid-wrap" v-else>
        <Empty :status="errorStatus"></Empty>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { courseListData, courseTypeEnum, courseTypeToTitleMap, pageKeyWordEnd } from './js/data.js';
import track from './js/track.js';
import SelectProjectClassify from '@/www/components/course/course/course-list/select-project-classify.vue';
import SelcetProject from '@/www/components/course/course/course-list/select-project.vue';
import SelectAreaSection from '@/www/components/components/select-area-section';
import FreeCourse from '@/www/components/components/free-course';
import TrialCourse from '@/www/components/components/trial-course';
import ProCourse from '@/www/components/components/pro-course';
import UserPagination from '@/www/components/components/pagination';
import Empty from '@/www/components/components/empty';
import '@/api/ctc/api..query-class-list.js';
import '@/api/cl/api..query-all-course-list';
import '@/api/mcp/api..query-liveCourse-web-list.js';
import '@/api/mcp/api.MCP0001.query-trial-list.js';
import '@/api/channel/api..query-info-by-seoCode.js';
import pagePathName from '@/www/components/course/trial-course/js/pagePathName.js';

export default {
    components: {
        SelectProjectClassify,
        SelcetProject,
        SelectAreaSection,
        Empty,
        ProCourse,
        FreeCourse,
        TrialCourse,
        UserPagination,
    },
    mixins: [track, pagePathName],
    layout: 'new-default',
    data() {
        return {
            isOpenSlect: false, // 是否开启选择
            courseTabList: courseListData, // 课程类型集合
            isCourseLoading: false, // 是否加载数据
            isLoading: true,
            selectCourseData: {
                courseName: '全部',
                isChecked: true,
                titleName: '全部课程',
                courseType: 'all',
            }, // 选中的课程
            areaCode: '', // 地域编码
            project: {}, // 选中的项目信息
            isError: false, // 是否请求异常
            isCourseError: false, // 是否课程异常
            isInvalid: false,
            isInvalidCollege: false, // 是否无效学院
            isNotHaveCourse: false,
            page: {
                pageSize: 20,
                pageIndex: 1,
                pageCount: 0,
            }, // 分页
            areaName: '', // 地域名称
            courseList: [], // 课程列表
            collegeId: '', // 学院id
            categoryCode: '', // 学院编码
            currentProject: {}, // 当前选中的项目
            isCityReady: false,
            collegeName: '',
            projectSeoCode: '',
            projectList: [], // 项目列表

            isFirst: true, // 是否第一次
        };
    },
    async fetch() {
        const { categoryCode, projectSeoCode } = this.$route.params;
        this.categoryCode = categoryCode;
        this.projectSeoCode = projectSeoCode;
        await this.init();
        const { courseType } = this.$route.params;
        const type = courseType || 'all';

        this.page.pageIndex = parseInt(this.$route.params.page || this.$route.query.page || 1);
        await this.selectCourseType(courseTypeEnum[type], this.courseTabList[courseTypeEnum[type]], false);
    },
    head() {
        return this.$head({
            title: `${this.titleName || ''}`,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        this.pageKeyWord || '优路,优路教育,优路教育网,建筑工程考试,国家职业资格考试,在线教育,在线培训,素质提升,技能提升,四六级,大学生,公务员',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育|精选好课，紧扣考纲把握核心，结合阶段备考规划，助力学员学习提升。',
                },
            ],
        });
    },
    computed: {
        errorStatus() {
            let status = 'empty';
            if (this.isLoading) {
                status = 'load';
            }
            if (this.isInvalid) {
                status = 'invalid';
            }
            if (this.isError) {
                status = 'error';
            }
            return status;
        },
        titleName() {
            let projectName = this.currentProject.projectName;
            let project = '';
            if (projectName === '全部') {
                project = this.collegeName;
            } else {
                project = projectName;
            }
            let projectListNameList = [];
            for (let index = 0; index < this.projectList.length; index++) {
                const element = this.projectList[index];
                if (index < 6) {
                    projectListNameList.push(element.projectShortname || element.projectName);
                }
            }
            return `${project || ''}${courseTypeToTitleMap.get(this.selectCourseData.courseType)}${projectListNameList.join('|')}_优路教育`;
        },
        pageKeyWord() {
            let projectListNameList = [];
            for (let index = 0; index < this.projectList.length; index++) {
                const element = this.projectList[index];
                if (index < 6) {
                    projectListNameList.push(element.projectShortname || element.projectName);
                }
            }
            return `${projectListNameList.join(',')}${pageKeyWordEnd}`;
        },
    },
    watch: {
        projectList: {
            handler(value) {
                console.log(value);
            },
            deep: true,
        },
    },
    methods: {
        ...mapActions('common/city', {
            getArea: 'getArea',
        }),
        // init 数据
        init() {
            return this.getArea()
                .then((res) => {
                    this.isCityReady = true;
                    this.areaCode = res.cityCode;
                    this.areaName = res.cityName;
                    return this.queryProjectChannelInfo();
                })
                .catch((err) => {
                    console.log(err);
                    this.isError = true;
                    this.isLoading = false;
                });
        },
        // 点击选择项目区域
        openSlectProject() {
            this.isOpenSlect = true;
        },
        // 鼠标移入选择项目区域
        handleMouseEnter() {
            this.isOpenSlect = true;
        },
        // 鼠标移出选择项目区域
        handleMouseLeave() {
            this.isOpenSlect = false;
        },
        // 查询项目频道页信息
        queryProjectChannelInfo() {
            return new Promise((resolve) => {
                this.$callApi('channel/query-info-by-seoCode', {
                    // 频道编码
                    columnSeoNo: this.categoryCode,
                    onsuccess: (data) => {
                        if (data && !data.columnId && !data.projectIds) {
                            this.isInvalid = true;
                        }
                        if (data && data.projectIds) {
                            this.collegeName = data.columnName;
                            this.collegeId = data.projectIds;
                        }
                        resolve();
                    },
                    onerror: () => {
                        this.isError = true;
                    },
                    oncomplete: () => {
                        this.isLoading = false;
                    },
                });
            });
        },
        // 改变项目
        changeProject(project, c, e) {
            this.isProjectReady = true;
            const isResetPage = Boolean(e && e.isTrusted);
            if (isResetPage) {
                this.page.pageIndex = 1;
            }
            console.warn('changeProject', project, c, e, isResetPage, this.page.pageIndex);
            if (project.projectId) {
                if (project.projectType === 'parent') {
                    // 选中的是普通项目
                    this.projectId = project.projectId;
                    this.ptagId = '';
                } else {
                    // 选中的是子项目
                    this.ptagId = project.ptagId;
                    this.projectId = '';
                }
                this.projectSeoCode = project.projectSeoCode;
            } else {
                // 选中的项目不存在(选的全部)
                this.projectId = '';
                this.ptagId = '';
                this.projectSeoCode = 'all';
            }
            this.currentProject = project;
            const { courseType } = this.$route.params;
            let type = courseType || 'all';

            // 易观埋点
            // this.trackWebYouluProjectSwitch({
            //     college_belong: this.collegeName,
            //     project_belong: project.projectName,
            //     course_type: '课程集合页',
            //     page_name: this.titleName,
            // });
            if (this.isFirst === true) {
                const data = {
                    page_name: this.titleName, // 页面名称
                    page_url: location.href,
                    page_type: '课程集合页',
                    course_type: '-',
                    sort_name: '-',
                    channel_name: '-',
                    project_id: project.projectId ? project.projectId : '-',
                    subject_id: '-',
                };
                this.$yiguan.track('youlu_click_all_pages', data);
            }
            this.isFirst = false;

            return this.selectCourseType(courseTypeEnum[type], this.courseTabList[courseTypeEnum[type]], isResetPage);
        },
        // 选择课程类型
        selectCourseType(index, item, isResetPage = true) {
            this.courseTabList.forEach((item) => {
                item.isChecked = false;
            });
            this.courseTabList[index].isChecked = true;
            this.selectCourseData = item;
            isResetPage && (this.page.pageIndex = 1);
            console.warn('selectCourseType', isResetPage, this.page.pageIndex);
            return this.queryCourseData(this.selectCourseData.courseType);
        },
        // 修改地区
        changeCity({ areaName, areaCode }) {
            this.isCityReady = true;
            this.page.pageIndex = 1;
            this.areaName = areaName;
            this.areaCode = areaCode;
            console.warn('changeCity', this.page.pageIndex);
            return this.queryCourseData(this.selectCourseData.courseType);
        },
        // 切换分页
        changePageIndex() {
            this.queryCourseData(this.selectCourseData.courseType);
            window.scrollTo(0, 0);
        },
        // 根据当前筛选条件查询列表数据
        async queryCourseData(type) {
            // 学院无效
            if (this.isInvalidCollege) {
                return;
            }
            const queryCourseMap = new Map([
                ['all', this.queryAllCourse],
                ['free', this.getLiveCourse],
                ['trial', this.quertTairlCourse],
                ['pro', this.queryProCourse],
            ]);
            this.isCourseError = false;
            if (this.$platform.isClient()) {
                if (this.projectSeoCode === 'all' && type === 'all') {
                    window.history.replaceState(null, null, `/course/${this.categoryCode}`);
                } else if (this.projectSeoCode === undefined && type === 'all') {
                    window.history.replaceState(null, null, `/course/${this.categoryCode}`);
                } else if (this.projectSeoCode !== 'all' && type === 'all') {
                    window.history.replaceState(null, null, `/course/${this.categoryCode}/${this.projectSeoCode}`);
                } else {
                    window.history.replaceState(null, null, `/course/${this.categoryCode}/${this.projectSeoCode || 'all'}/${type}`);
                }
            }
            await queryCourseMap.get(type)().then(this.ssrInValidPage);
        },
        // 查询全部课程
        queryAllCourse() {
            if (!this.isCityReady) {
                return;
            }
            this.updateUrlPageNumber();
            this.isCourseLoading = true;
            let projectId = this.currentProject.projectType === 'parent' ? this.currentProject.projectId : this.currentProject.ptagId;
            let projectType = this.currentProject.projectType === 'parent' ? 'P' : 'T';
            if (this.currentProject.isAll) {
                projectId = '';
                projectType = '';
            }
            return new Promise((resolve) => {
                this.$callApi('cl/query-all-course-list', {
                    // 分页起始
                    pageIndex: this.page.pageIndex,
                    // 分页数量
                    pageSize: this.page.pageSize,
                    // 学院标识
                    collegeId: this.collegeId,
                    projectId,
                    projectType,
                    // 班型显示端
                    showClient: 'W',
                    // 地区编码
                    areacode: this.areaCode,
                    onsuccess: (res) => {
                        this.courseList = res.data;
                        this.page.pageCount = Number(res.count);
                    },
                    onerror: () => {
                        this.isCourseError = true;
                        this.page = {
                            pageSize: 20,
                            pageIndex: 1,
                            pageCount: 0,
                        };
                    },
                    oncomplete: () => {
                        this.isCourseLoading = false;
                        resolve();
                    },
                });
            });
        },
        // 查询系统课
        queryProCourse() {
            this.updateUrlPageNumber();
            this.isCourseLoading = true;
            return new Promise((resolve) => {
                this.$callApi('ctc/query-class-list', {
                    // 分页起始
                    pageIndex: (this.page.pageIndex - 1) * this.page.pageSize,
                    // 分页数量
                    pageSize: this.page.pageSize,
                    // 学院标识
                    collegeId: this.collegeId,
                    // 项目标识
                    projectId: this.projectId,
                    // 子项目标识
                    ptagId: this.ptagId,
                    // 科目标识
                    subjectId: this.subjectId,
                    // 地区编码
                    areacode: this.areaCode,
                    // 班型显示端
                    classtypeShowitem: 'WEB',
                    onsuccess: ({ count, data }) => {
                        this.courseList = data;
                        this.page.pageCount = Number(count);
                    },
                    onerror: () => {
                        this.isCourseError = true;
                        this.page = {
                            pageSize: 20,
                            pageIndex: 1,
                            pageCount: 0,
                        };
                    },
                    oncomplete: () => {
                        this.isCourseLoading = false;
                        resolve();
                    },
                });
            });
        },
        // 查询公开课
        getLiveCourse() {
            this.updateUrlPageNumber();
            this.isCourseLoading = true;
            return new Promise((resolve) => {
                this.$callApi('mcp/query-liveCourse-web-list', {
                    pageIndex: this.page.pageIndex,
                    pageSize: this.page.pageSize,
                    showClient: 'W',
                    projectId: this.currentProject.projectType === 'parent' ? this.currentProject.projectId : this.currentProject.ptagId, // 项目唯一标识
                    projectType: this.currentProject.projectType === 'parent' ? 'P' : 'T', //	项目类型 P项目 T子项目
                    collegeId: this.collegeId,
                    indexFlag: false,
                    hasAppointStatus: false,
                    onsuccess: (res) => {
                        this.courseList = res.data;
                        this.page.pageCount = Number(res.count);
                    },
                    onerror: () => {
                        this.isCourseError = true;
                        this.page = {
                            pageSize: 20,
                            pageIndex: 1,
                            pageCount: 0,
                        };
                    },
                    oncomplete: () => {
                        this.isCourseLoading = false;
                        resolve();
                    },
                });
            });
        },
        // 查询体验课
        quertTairlCourse() {
            this.updateUrlPageNumber();
            this.isCourseLoading = true;
            return new Promise((resolve) => {
                this.$callApi('mcp/query-trial-list', {
                    projectId: this.currentProject.projectType === 'parent' ? this.currentProject.projectId : this.currentProject.ptagId,
                    projectType: this.currentProject.projectType === 'parent' ? 'P' : 'T',
                    collegeId: this.collegeId,
                    clientType: 'W',
                    pageIndex: this.page.pageIndex,
                    pageSize: this.page.pageSize,
                    onsuccess: (res) => {
                        this.courseList = res.data;
                        this.page.pageCount = res.count;
                    },
                    onerror: () => {
                        this.isCourseError = true;
                        this.page = {
                            pageSize: 20,
                            pageIndex: 1,
                            pageCount: 0,
                        };
                    },
                    oncomplete: () => {
                        this.isCourseLoading = false;
                        resolve();
                    },
                });
            });
        },
    },
};
</script>
<style lang="less" scoped>
.course-list-wrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    background: #f5f6f9;
    h4 {
        border: 0;
        font-weight: normal;
    }
    .top-seletc-box {
        position: relative;
        padding: 58px 0px 60px;
        box-sizing: border-box;
        width: 100%;
        // height: 264px;
        background-image: url('./asset/images/top-bac.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        display: flex;
        justify-content: center;
        .select-tab-content {
            width: 1200px;
        }
        .ploceholder-icon {
            position: absolute;
            bottom: 0px;
            right: 3%;
            width: 647px;
            height: 264px;
        }
    }
}

.top-title-box {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    .column-name {
        font-size: 28px;
        font-weight: 700;
        color: #3a3d4b;
        line-height: 28px;
        height: 28px;
    }
    .change-box {
        margin-left: 24px;
        position: relative;
        cursor: pointer;
        .change-icon {
            width: 12px;
            height: 11px;
        }
        .change-text {
            font-size: 14px;
            font-weight: 400;
            color: #99a1af;
            line-height: 16px;
            letter-spacing: 1px;
        }
        .list-select-project {
            position: absolute;
            left: 0px;
            z-index: 999;
        }
    }
}

.course-wrapper {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    min-height: 48px;
    .course-title {
        color: #3a3d4b;
        font-size: 16px;
        margin-top: 13.5px;
        align-self: flex-start;
    }
    .course-list {
        flex: 1;
        font-size: 14px;
        margin-left: 20px;
    }
    .course-item {
        padding: 6.5px 16px;
        display: inline-block;
        margin: 8px 0;
        cursor: pointer;
        color: #3a3d4b;
    }
    .course-item + .course-item {
        margin-left: 8px;
    }

    .course-item:hover {
        color: #ff2e30;
        border-radius: 4px;
    }
    .course-item-checked {
        background-color: #ffece8;
        color: #ff2e30;
        border-radius: 4px;
    }
}
.course-content-container {
    width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.course-title-box {
    margin: 24px 0 12px;
    width: 1200px;
    height: 62px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .course-title {
        font-size: 24px;
        font-weight: 400;
        color: #3a3d4b;
        line-height: 31px;
    }
    /deep/ .bar-wrap {
        background: #f5f6f9;
    }
}
.course-list-content {
    width: 1200px;
    min-height: 500px;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    .course-list-item {
        width: 280px;
        margin-right: 26px;
        margin-bottom: 32px;
    }
    .no-margin {
        margin-right: 0px;
    }
}
.empty-state {
    box-sizing: border-box;
    padding-top: 50px;
    height: 500px;
    text-align: center;

    .hint-txt {
        margin-top: 16px;
        font-size: 14px;
        color: #3a3d4b;
    }
    .bottom-hint-txt {
        margin-top: 8px;
        font-size: 14px;
        color: #3a3d4b;
    }

    .reload-btn {
        display: block;
        width: 136px;
        height: 38px;
        margin: 40px auto 0;
        line-height: 38px;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 29px;
        font-size: 14px;
        color: #ffffff;
        line-height: 14px;
        cursor: pointer;
    }
}
/deep/ .bar-wrap {
    padding: 0;
}
/deep/ .select-area-section {
    justify-content: flex-end;
}

.pagination-box {
    margin: 8px auto 126px;
}
.empty-invalid-wrap {
    height: 700px;
    width: 100%;
}
</style>
