<template>
    <div class="content-wrap">
        <!-- 轮播图 -->
        <banner-carousel-section :lyt-code="'YLWEB_CLB01'" @item-click="handleAdClick" />
        <div class="module-title">全部系统课</div>
        <!-- 选中方向 -->
        <select-project-section
            :college-seo-code="defaultCollegeSeoCode"
            :project-seo-code="defaultProjectSeoCode"
            :ptag-id="defaultPtagId"
            @project-change="changeProject"
        />
        <!-- 地区科目选择器 -->
        <city-subject-bar
            :project="project"
            :default-subject-seo-code="defaultSubjectSeoCode"
            :default-subject-name="defaultSubjectName"
            @change-city="changeCity"
            @change-subject="changeSubject"
        />
        <!-- 课程列表 -->
        <course-list
            v-loading="isLoading && !courseData.length"
            :is-loading="isLoading"
            :is-error="isError"
            :area-name="areaName"
            :data="courseData"
            :college-name="collegeName"
            :college-id="collegeId"
            @click-reload="queryCourseData"
        />
        <!-- 分页器 -->
        <user-pagination
            :page-size="page.pageSize"
            :total="page.pageCount"
            :current-page.sync="page.pageIndex"
            @current-change="changePageIndex"
            :page-path-name="pagePathName"
        />
    </div>
</template>

<script>
import 'core-js/features/array/flat';
import 'core-js/features/array/flat-map';
import { mapActions } from 'vuex';
import '@/api/ctc/api..query-class-list.js';
import '@/api/ctc/api..query-project-detail.js';
import '@/api/ctc/api..query-ctc-project-tree.js';
import '@/api/bd/api.BD4606.query-subject-list.js';
import '@/api/bd/api.BD4928.query-subject-ptag-list.js';
import UserPagination from '@/www/components/components/pagination/index.vue';
import SelectProjectSection from '@/www/components/components/select-project-section/index.vue';
import BannerCarouselSection from '@/www/components/components/banner-carousel-section/index.vue';
import CitySubjectBar from '@/www/components/course/pro-course/city-subject-bar.vue';
import CourseList from '@/www/components/course/pro-course/course-list.vue';
import track from '@/www/components/course/free-course/js/track.js';
import pagePathName from '@/www/components/course/trial-course/js/pagePathName.js';

export default {
    components: {
        UserPagination,
        SelectProjectSection,
        BannerCarouselSection,
        CitySubjectBar,
        CourseList,
    },
    mixins: [track, pagePathName],
    layout: 'new-default',
    data() {
        return {
            isLoading: true,
            isError: false,
            page: {
                pageSize: 20,
                pageIndex: 1,
                pageCount: 0,
            },
            courseData: [], // 列表数据
            defaultCollegeId: '',
            defaultCollegeSeoCode: '',
            defaultProjectSeoCode: '',
            defaultPtagId: '',
            defaultSubjectSeoCode: '',
            defaultSubjectName: '', //默认科目名称
            project: {}, // 选中的项目信息
            areaName: '', // 选中的地区名称
            areaCode: '', // 选中的地区编码
            collegeName: '', // 选中的学院id
            collegeId: '', // 选中的学院id
            collegeSeoCode: '', // 选中的学院id,
            projectId: '', // 选中的项目id
            projectName: '', // 选中的项目id
            ptagId: '', // 选中的子项目id
            subjectId: '', // 选中的科目id
            projectSeoCode: '',
            subjectSeoCode: '',
            isCityReady: false,
            isProjectReady: false,
            isSubjectReady: false,
            pageTitleName: '全部课程',
            cLueInfo: {
                url: '',
                pageName: '优路教育系统课_全部课程',
                projectId: '',
                projectCode: '',
                projectSeocode: '',
                originCode: 'xitongke',
                clueWaycode: 'zhuce',
            },
        };
    },
    async fetch() {
        const { collegeSeoCode = 'all', projectId, ptagId, subjectId } = this.$route.params;
        this.defaultCollegeSeoCode = collegeSeoCode && collegeSeoCode !== 'all' ? collegeSeoCode : '';
        this.defaultProjectSeoCode = projectId && projectId !== 'all' ? projectId : '';
        this.defaultPtagId = ptagId && ptagId !== 'all' ? ptagId : '';
        this.defaultSubjectSeoCode = subjectId && subjectId !== 'all' ? subjectId : '';
        this.page.pageIndex = parseInt(this.$route.params.page || this.$route.query.page || 1);

        if (collegeSeoCode && collegeSeoCode !== 'all') {
            const college = await this.getCollageInfo(collegeSeoCode);
            if (college) {
                this.pageTitleName = college.collegeName;
                this.collegeId = college.collegeId;
                this.collegeSeoCode = college.collegeSeoCode;
            } else {
                history.replaceState('', '', this.$urlUtils.joinParamsUrl(['all', this.projectSeoCode, this.ptagId, this.subjectSeoCode], '/pro-course'));
            }
            this.cLueInfo.pageName = this.pageTitle;
        }
        if (projectId && projectId !== 'all') {
            this.projectSeoCode = projectId;
            const project1 = await this.getProjectWebInfo(projectId);
            this.pageTitleName = project1.projectName;
            this.projectName = project1.projectName;
            /*this.cLueInfo.pageName = '优路教育系统课_' + this.pageTitleName;*/
            this.cLueInfo.pageName = this.pageTitle;
            this.projectId = project1.projectId;
            /*this.project = { projectId: project1.projectId, projectType: 'parent' };*/
            this.project = await this.getProjectInfo(projectId);
        }
        if (ptagId && ptagId !== 'all') {
            this.ptagId = this.defaultPtagId; // 子项目标识
            this.projectId = '';
            /*this.project.projectType = 'child';*/
        }
        if ((!collegeSeoCode || collegeSeoCode === 'all') && (!projectId || projectId === 'all') && (!ptagId || ptagId === 'all')) {
            this.isProjectReady = true;
        }
        if (subjectId && subjectId !== 'all') {
            this.defaultSubjectSeoCode = subjectId;
            /*this.subjectId = this.defaultSubjectSeoCode; // 科目标识*/
            if (this.project?.projectType === 'child') {
                const { subjectId, subjectName, projectSeoCode } = await this.getPtagSubjectInfo(this.project.projectId, this.defaultSubjectSeoCode);
                this.subjectId = subjectId;
                this.defaultSubjectName = subjectName;
                this.projectSeoCode = projectSeoCode;
            } else {
                const { subjectId, subjectName, projectSeoCode } = await this.getSubjectInfo(this.project.projectId, this.defaultSubjectSeoCode);
                this.subjectId = subjectId;
                this.defaultSubjectName = subjectName;
                this.projectSeoCode = projectSeoCode;
            }
        } else {
            this.isSubjectReady = true;
        }
        await this.getAreaMsg(); // 地区编码
        this.isCityReady = true;
        this.isProjectReady = true;
        this.isSubjectReady = true;
        return this.queryCourseData();
    },
    head() {
        return this.$head({
            /*title: `优路教育系统课_${this.pageTitleName}`,*/
            title: this.pageTitle,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '课程,视频,学习,系统学习,培训,职业培训,融合式教学,OMO,在线答疑,优路,优路教育,优路教育网,国家职业资格考试,在线教育,在线培训,职业教育,素质提升,技能提升,建筑工程考试,消防考试,一级建造师,二级建造师,一级消防工程师,四级英语,六级英语,大学生,公务员,考公考编,心理咨询,初级会计师,财税金融,医卫康养,教师,法律,学历,学历提升',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content:
                        '优路教育采用线上和线下结合的融合式教学模式，利用OMO大数据教学、3D动画交互仿真教学、实景模型、智能题库、移动课堂等智能教学产品等创新技术，开展职业考试培训和职业技能提升培训，积极探索未来职业教育发展新模式。',
                },
            ],
        });
    },
    computed: {
        pageTitle() {
            return `优路教育系统课_${this.pageTitleName}`;
        },
    },
    mounted() {
        //线索信息
        if (this.$platform.isClient()) {
            this.cLueInfo.url = window.location.href;
            let recommendProject = localStorage.getItem('indexSelectProject');
            if (recommendProject) {
                this.cLueInfo.projectSeocode = JSON.parse(recommendProject).projectSeoCode;
            }
            this.$Promotion.setCLueInfo(this.cLueInfo);
            /*this.trackPages();*/
        }
    },
    methods: {
        ...mapActions('common/city', {
            getArea: 'getArea',
        }),
        getAreaMsg() {
            return new Promise((resolve, reject) => {
                this.getArea()
                    .then((res) => {
                        this.areaCode = res.cityCode;
                        this.areaName = res.cityName;
                        resolve();
                    })
                    .catch((err) => {
                        reject();
                        console.log(err);
                    });
            });
        },
        getProjectWebInfo(projectSeoCode) {
            return new Promise((resolve) => {
                this.$callApi('ctc/query-project-detail', {
                    projectSeoCode,
                    onsuccess: (res) => {
                        resolve(res);
                    },
                    onerror: () => {},
                });
            });
        },
        getProjectInfo(projectSeoCode) {
            return new Promise((resolve) => {
                this.$callApi('ctc/query-ctc-project-tree', {
                    onsuccess: (res) => {
                        resolve(res.treeData.flatMap((item) => item.children).find((item) => item.projectSeoCode === projectSeoCode));
                    },
                    onerror: niceloo.api.handleFailure,
                });
            });
        },
        getCollageInfo(collegeSeoCode) {
            return new Promise((resolve) => {
                this.$callApi('ctc/query-ctc-project-tree', {
                    onsuccess: (res) => {
                        let activeItem = res.treeData.find((item) => item.collegeSeoCode === collegeSeoCode);
                        resolve(activeItem || '');
                    },
                    onerror: niceloo.api.handleFailure,
                });
            });
        },
        getSubjectInfo(projectId, param) {
            return new Promise((resolve) => {
                this.$callApi('bd/query-subject-list', {
                    projectId,
                    onsuccess: (res) => {
                        console.log(
                            '科目信息',
                            res.data.find((item) => item.subjectId === param || item.subjectSeocode === param)
                        );
                        resolve(res.data.find((item) => item.subjectId === param || item.subjectSeocode === param));
                    },
                    onerror: niceloo.api.handleFailure,
                });
            });
        },
        getPtagSubjectInfo(projectId, param) {
            return new Promise((resolve) => {
                this.$callApi('bd/query-subject-ptag-list', {
                    projectId,
                    onsuccess: (res) => {
                        console.log(
                            '科目信息',
                            res.data.find((item) => item.subjectId === param || item.subjectSeocode === param)
                        );
                        resolve(res.data.find((item) => item.subjectId === param || item.subjectSeocode === param));
                    },
                    onerror: niceloo.api.handleFailure,
                });
            });
        },
        // 根据当前筛选条件查询列表数据
        queryCourseData() {
            if (!this.isCityReady || !this.isProjectReady || !this.isSubjectReady) {
                return;
            }
            // 替换url的路径
            if (process.client) {
                history.replaceState(
                    '',
                    '',
                    this.$urlUtils.joinParamsUrl([this.collegeSeoCode, this.projectSeoCode, this.ptagId, this.subjectSeoCode], '/pro-course')
                );
                this.cLueInfo.url = window.location.href;
                /*this.cLueInfo.pageName = '优路教育系统课_' + this.pageTitleName;*/
                this.cLueInfo.pageName = this.pageTitle;
                this.$Promotion.setCLueInfo(this.cLueInfo);
            }
            this.updateUrlPageNumber();
            this.isLoading = true;
            return new Promise((resolve, reject) => {
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
                        this.isError = false;
                        this.courseData = data.map((i) => ({
                            ...i,
                            classtypeHighlights: i.classtypeHighlights.split(','),
                            asertype: i.asertype.split(','),
                        }));
                        this.page.pageCount = count;
                        this.isLoading = false;
                        process.client && !this.isPageTrack && this.trackPages();
                        resolve();
                    },
                    onerror: () => {
                        this.isLoading = false;
                        this.isError = true;
                    },
                    oncomplete: () => {},
                });
            }).then(this.ssrInValidPage);
        },
        // 修改地区
        changeCity({ areaName, areaCode }, e) {
            this.isCityReady = true;
            if (e && e.isTrusted) {
                this.page.pageIndex = 1;
            }
            this.areaName = areaName;
            this.areaCode = areaCode;
            this.queryCourseData();
        },
        // 修改项目
        changeProject(project, college, $e) {
            console.log('修改项目~~~~~~~~');
            this.isProjectReady = true;
            if ($e && $e.isTrusted) {
                this.page.pageIndex = 1;
            }
            // 选中的学院
            this.collegeId = college.collegeId;
            this.collegeSeoCode = college.collegeSeoCode;
            this.collegeName = college.collegeName;
            if (project.projectId) {
                if (project.projectType === 'parent') {
                    // 选中的是普通项目
                    this.projectId = project.projectId;
                    this.ptagId = '';
                    this.projectName = project.projectName;
                } else {
                    // 选中的是子项目
                    this.ptagId = project.ptagId;
                    this.projectId = '';
                    this.projectName = project.projectName;
                }
                this.projectSeoCode = project.projectSeoCode;
            } else {
                // 选中的项目不存在(选的全部)
                this.projectId = '';
                this.ptagId = '';
                this.projectSeoCode = '';
                this.projectName = '';
            }
            this.pageTitleName = this.projectName ? this.projectName : this.collegeName === '全部' ? '全部课程' : this.collegeName;
            this.subjectId = '';
            this.subjectSeoCode = '';
            this.project = project;
            process.client && this.collegeProjectTrack();
            this.queryCourseData();
        },
        // 修改科目
        changeSubject(subject) {
            this.isSubjectReady = true;
            this.subjectSeoCode = subject.subjectSeocode;
            this.subjectId = subject.subjectId;
            process.client && this.subjectTrack();
            this.queryCourseData();
        },
        changePageIndex() {
            this.queryCourseData();
            this.$nextTick(() => {
                const dm = document.querySelector('.module-title');
                dm &&
                    dm.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
            });
        },
        collegeProjectTrack() {
            this.trackWebYouluProjectSwitch({
                college_belong: this.collegeId || '-',
                project_belong: this.projectId || '-',
                course_type: '系统课',
                page_name: this.pageTitle,
            });
        },
        subjectTrack() {
            this.trackWebYouluClickCourse({
                page_type: '资源列表页',
                page_name: this.pageTitle,
                course_type: '系统课',
                project_id: this.projectId || '-',
                subject_id: this.subjectId || '-',
            });
        },
        handleAdClick(item, index) {
            // this.trackWebYouluAdSpace({
            //     ad_type: '轮播广告',
            //     ad_position: '系统课轮播图',
            //     page_position: '-',
            //     ad_number: index,
            //     ad_name: item.adName,
            //     ad_url: item.adLink,
            //     page_name: this.pageTitle,
            //     project_position: this.projectId || '-',
            // });

            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: item.adName,
                jump_type: item.adLinkType === 1 ? 'URL链接' : item.adLinkType === 2 ? '小程序' : '无跳转',
                ad_url: item.adLinkType === 1 || item.adLinkType === 2 ? item.adLink : '',
                ad_position_name: '系统课列表页-顶部Banner',
                page_name: document.title,
            });
        },
        trackPages() {
            // this.t-rackWebYouluClickAllPages({
            //     page_type: '系统课列表页',
            //     page_name: this.pageTitle,
            //     course_name: '系统课',
            //     course_type: '系统课',
            //     college_name: this.collegeId || '-',
            //     project_position: this.projectId || '-',
            //     subject_name: this.subjectId || '-',
            //     sort_name: '-',
            //     is_pay: false,
            //     course_price: 0,
            // });
            this.$yiguan.track('youlu_click_all_pages', {
                page_name: document.title, // 页面名称
                page_url: location.href,
                page_type: '资源列表页',
                course_type: '系统课',
                ad_position_name: '系统课列表页-顶部Banner',
                sort_name: '-',
                channel_name: '-',
                project_id: this.projectId || '-',
                subject_id: this.subjectId || '-',
            });
        },
    },
};
</script>

<style lang="less" scoped>
.content-wrap {
    padding: 32px 0 120px;
    width: 1200px;
    margin: 0 auto;
}

.module-title {
    padding: 40px 0 26px;
    font-size: 22px;
    font-weight: bold;
    color: #3a3d4b;
    line-height: 29px;
}
</style>
