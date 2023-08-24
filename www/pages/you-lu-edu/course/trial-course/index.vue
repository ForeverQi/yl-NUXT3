<template>
    <!-- 体验课-->
    <div class="experience">
        <banner-carousel-section class="experience-swiper" :lyt-code="'YLWEB_ELB01'" @item-click="handleAdClick"></banner-carousel-section>
        <h2 class="experience-tip">全部体验课</h2>
        <select-project-section
            class="choose-section"
            :college-seo-code="defCollegeSeoCode"
            @project-change="handleProjectClick"
            @college-change="handleCollegeClick"
            :project-seo-code="defProjectSeoCode"
            :ptag-id="defPtagId"
        ></select-project-section>
        <experience-subject
            class="experience-subject"
            :project="project"
            :subject-seocode="defSubjectSeocode"
            :opt-id="defOptId"
            @tag-change="handleSaleTagClick"
            @subject-change="handleSubjectClick"
            @free-change="handleSubjectFreeClick"
            @free-limit-change="handleSubjectFreeLimitClick"
            @special-limit-change="handleSubjectSpecialLimitClick"
        ></experience-subject>
        <ul v-if="dataList.length > 0" class="experience-list">
            <li class="experience-item" v-for="item in dataList" :key="item.goodsId">
                <experience-item :item="item" :sale-tag-id="saleTagId"></experience-item>
            </li>
        </ul>
        <div class="empty-tip" v-else-if="isLoadFail">
            <div>
                <img class="empty-tip-img" src="./asset/images/fail_load.png" alt="" />
                <div class="empty-tip-text">内容加载失败，请刷新页面</div>
            </div>
        </div>
        <div v-else-if="dataList.length <= 0 && !isLoading" class="empty-tip">
            <div>
                <img class="empty-tip-img" src="./asset/images/empty-tip.png" alt="" />
                <div class="empty-tip-text">暂无课程，去看看其他考试的课程吧</div>
            </div>
        </div>
        <div v-else-if="isLoading" class="experience-list"><loading class="loading"></loading></div>
        <div class="paging">
            <pagination
                :total="page.pageCount"
                :page-size="page.pageSize"
                @current-change="pageChange"
                :current-page.sync="page.pageIndex"
                :page-path-name="pagePathName"
            />
        </div>
    </div>
</template>

<script>
import utilNiceloo from '@youlu/niceloo/libs/@xlib.01/lib/util/util._niceloo';
import experienceItem from '@/www/components/course/trial-course/item/index.vue';
import experienceSubject from '@/www/components/course/trial-course/subject';
import selectProjectSection from '@/www/components/components/select-project-section';
import bannerCarouselSection from '@/www/components/components/banner-carousel-section';
import Pagination from '@/www/components/components/pagination'; // 分页
import Loading from '@/plugins/loading/index.vue';
import track from '@/www/components/course/trial-course/js/track.js';
import pagePathName from '@/www/components/course/trial-course/js/pagePathName.js';

import '@/api/mcp/api.MCP0001.query-trial-list.js';
import '@/api/uc/api.FD0009.apply-invoice';
import '@/api/ta/api.TA1027.applet-url.js';
import '@/api/ctc/api..query-project-detail.js';
import '@/api/ctc/api..query-ctc-project-tree';
import '@/api/bd/api.BD4606.query-subject-list.js';
import '@/api/bd/api.BD4928.query-subject-ptag-list.js';

export default {
    name: 'experience',
    components: {
        experienceSubject,
        bannerCarouselSection,
        selectProjectSection,
        experienceItem,
        Pagination,
        Loading,
    },
    mixins: [track, pagePathName],
    layout: 'new-default',
    data() {
        return {
            dataList: [],
            page: {
                pageIndex: 1,
                pageSize: 20,
                pageCount: 0,
            },
            saleTag: {},
            saleTagId: '',
            collegeId: '',
            project: null,
            subjectId: '',
            subjectSeocode: '',
            courseOpenstatus: 3,
            discountType: '',
            defCollegeId: '',
            defCollegeSeoCode: '',
            defProjectSeoCode: '',
            defPtagId: '',
            defSubjectSeocode: '',
            isLoading: true,
            mpProjectId: '',
            isLoadFail: false,
            defOptId: '',
            pageTitleName: '全部课程',
        };
    },
    fetch() {
        const c1 = this.$route.params.collegeSeoCode || this.$route.query.collegeSeoCode || '';
        const p = this.$route.query.projectSeoCode || this.$route.params.projectSeoCode || '';
        const t = this.$route.params.ptagId || this.$route.query.ptagId || '';
        const s = this.$route.params.subjectSeocode || this.$route.query.subjectSeocode || '';
        const o = this.$route.params.optId || this.$route.query.optId || '';
        this.page.pageIndex = parseInt(this.$route.params.page || this.$route.query.page || 1);

        this.defProjectSeoCode = p === 'all' ? '' : p;
        this.defCollegeSeoCode = c1 === 'all' ? '' : c1;
        this.defPtagId = t === 'all' ? '' : t;
        this.defSubjectSeocode = s === 'all' ? '' : s;
        this.defOptId = o === 'all' ? '' : o;

        if (this.$platform.isClient()) {
            this.ecCourseSetClueInfo();
            if (!this.$platform.isPC) {
                if (this.defProjectSeoCode) {
                    return this.getProjectWebInfo().then(({ projectId }) => {
                        this.evokeMp(projectId);
                    });
                } else {
                    this.evokeMp();
                    return Promise.resolve();
                }
            }
        } else if (this.defProjectSeoCode) {
            return this.getProjectInfo(this.defProjectSeoCode).then(this.handleSeoProject).then(this.getCourseList);
        } else if (this.defCollegeSeoCode) {
            return this.getCollageInfo(this.defCollegeSeoCode).then(this.handleSeoCollege).then(this.getCourseList);
        } else {
            return this.getCourseList();
        }
    },
    head() {
        return this.$head({
            title: this.pageTitle,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '公开课,体验课,免费试听,课程,视频,视频教程,优路,优路教育,优路教育网,国家职业资格考试,在线教育,在线培训,职业教育,素质提升,技能提升,建筑工程考试,消防考试,一级建造师,二级建造师,一级消防工程师,四级英语,六级英语,大学生,公务员,考公考编,心理咨询,初级会计师,财税金融,医卫康养,教师,法律,学历,学历提升',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育 | 精选热门好课，紧扣考纲把握核心，结合阶段备考规划，助力学员学习提升。',
                },
            ],
        });
    },
    computed: {
        pageTitle() {
            return `优路教育体验课_${this.pageTitleName}`;
        },
    },
    methods: {
        requestWrapper(url, params = {}) {
            return this.$callApi(url, params).then((res) => res.getData());
        },
        getProjectWebInfo() {
            return this.requestWrapper('ctc/query-project-detail', {
                projectSeoCode: this.defProjectSeoCode,
            });
        },
        getProjectInfo(projectSeoCode) {
            return this.requestWrapper('ctc/query-ctc-project-tree').then(({ treeData = [] }) => {
                return treeData.flatMap((item) => item.projects).find((item) => item.projectSeoCode === projectSeoCode);
            });
        },
        getCollageInfo(collegeSeoCode) {
            return this.requestWrapper('ctc/query-ctc-project-tree').then(({ treeData = [] }) =>
                treeData.find((item) => item.collegeSeoCode === collegeSeoCode)
            );
        },
        pageChange() {
            this.isPageTrigger = true;
            this.getCourseDebounce();
        },
        handleCollegeClick(e, $e) {
            this.college = e;
            this.collegeId = e.collegeId;
            this.collegeSeoCode = e.collegeSeoCode;
            this.project = null;
            this.subjectId = '';
            this.subjectSeocode = '';
            this.saleTagId = '';
            if ($e && $e.isTrusted) {
                this.page.pageIndex = 1;
            }
            this.pageTitleName = e.collegeName === '全部' ? '全部课程' : e.collegeName;
            this.$platform.isClient() && history.replaceState(null, null, e.collegeSeoCode ? `/trial-course/${e.collegeSeoCode}` : '/trial-course');
            if ($e && $e.isTrusted) {
                this.collegeProjectTrack();
            }
        },
        handleProjectClick(e, e2, $e) {
            this.project = e;
            this.subjectId = '';
            this.subjectSeocode = '';
            this.saleTagId = '';
            if ($e && $e.isTrusted) {
                this.page.pageIndex = 1;
            }
            process.client && this.ecCourseSetClueInfo(false);
            this.pageTitleName = e.projectName === '全部' ? (e2.collegeName === '全部' ? '全部课程' : e2.collegeName) : e.projectName;
            this.getCourseDebounce();
            if ($e && $e.isTrusted) {
                this.collegeProjectTrack();
            }
            if (!this.project?.projectSeoCode && !e2.collegeId) {
                return this.$platform.isClient() && history.replaceState(null, null, '/trial-course');
            } else if (this.project?.isAll && e2.collegeId) {
                return this.$platform.isClient() && history.replaceState(null, null, `/trial-course/${this.collegeSeoCode || e2.collegeSeoCode}`);
            }

            let u = `/trial-course/${this.collegeSeoCode || e2.collegeSeoCode || 'all'}`;
            if (this.project?.projectSeoCode) {
                u += `/${this.project?.projectSeoCode}`;
            }
            if (this.project?.projectType === 'child') {
                u += `/${this.project?.ptagId}`;
            }
            if (this.$platform.isClient()) {
                history.replaceState(null, null, u);
            }
        },
        handleSubjectClick(e, $e) {
            console.warn('handleSubjectClick-切换科目', e, $e);
            if (this.subjectId === e.subjectId) {
                return;
            }
            if ($e && $e.isTrusted) {
                this.page.pageIndex = 1;
            }
            this.subject = e;
            this.subjectId = e.subjectId;
            this.subjectSeocode = e.subjectSeocode;
            this.getCourseDebounce();
            let u = `/trial-course/${this.collegeSeoCode || 'all'}/${this.project?.projectSeoCode ?? 'all'}/${
                this.project?.projectType === 'child' ? this.project.ptagId : this.project.projectSeoCode
            }`;
            if (this.saleTagId) {
                u += `/${e.subjectSeocode || 'all'}/${this.saleTagId}`;
            } else if (e.subjectSeocode) {
                u += `/${e.subjectSeocode || 'all'}`;
            }
            if (this.$platform.isClient()) {
                history.replaceState(null, null, u);
            }
            if (e.isAll) {
                return;
            }
            if ($e && $e.isTrusted) {
                this.subjectTrack();
            }
        },
        handleSaleTagClick(e, $e) {
            console.warn('handleSubjectClick-营销标签', e, $e);
            if (this.saleTagId === e.optId) {
                return;
            }
            this.saleTag = e;
            if ($e && $e.isTrusted) {
                this.page.pageIndex = 1;
            }
            this.saleTagId = e.optId;
            this.getCourseDebounce();

            let u = `/trial-course/${this.collegeSeoCode || 'all'}/${this.project?.projectSeoCode ?? 'all'}/${
                this.project?.projectType === 'child' ? this.project.ptagId : this.project.projectSeoCode
            }`;
            if (this.saleTagId) {
                u += `/${this.subjectSeocode || 'all'}/${this.saleTagId}`;
            } else if (this.subjectSeocode) {
                u += `/${this.subjectSeocode}`;
            }
            if (this.$platform.isClient()) {
                history.replaceState(null, null, u);
            }
        },
        getCourseDebounce() {
            if (this.$platform.isClient() === false) {
                return;
            }
            clearTimeout(this.timerDebounce);
            this.timerDebounce = setTimeout(this.getCourseList, 50);
        },
        getCourseList() {
            this.updateUrlPageNumber();
            this.isLoading = true;
            const p = {};
            if (this.courseOpenstatus !== 3) {
                p.courseOpenstatus = this.courseOpenstatus;
            }
            if (this.discountType) {
                p.discountType = this.discountType;
            }
            return this.requestWrapper('mcp/query-trial-list', {
                projectId: this.project?.projectType === 'child' ? this.project?.ptagId || '' : this.project?.projectId || '',
                projectType: this.project?.projectType ?? '',
                ...p,
                saleTagId: this.saleTagId,
                subjectId: this.subjectId,
                collegeId: this.collegeId,
                clientType: 'W',
                pageIndex: this.page.pageIndex,
                pageSize: this.page.pageSize,
            })
                .then(({ data, count }) => {
                    this.isLoadFail = false;
                    data.forEach((item) => {
                        item.coursePicpath = this.$urlUtils.getViewUrl(item.coursePicpath);
                    });
                    this.page.pageCount = count;
                    this.dataList.splice(0, this.dataList.length, ...data);
                    if (this.isPageTrigger === true) {
                        this.isPageTrigger = false;
                        this.$nextTick(() => {
                            const dm = document.querySelector('.experience-swiper');
                            dm &&
                                dm.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                });
                        });
                    }
                    this.trackPages();
                })
                .then(this.ssrInValidPage)
                .catch((err) => {
                    console.warn(err);
                    this.isLoadFail = true;
                    this.page.pageCount = 0;
                    this.dataList.splice(0, this.dataList.length);
                    this.$niceloo.api.handleFailure(err);
                })
                .finally(() => {
                    this.isLoading = false;
                    console.warn(this.isLoading);
                });
        },
        handleSubjectFreeClick(e) {
            this.page.pageIndex = 1;
            this.courseOpenstatus = e ? 2 : 3;
            this.getCourseList();
        },
        // 	促销类型(N:无促销;F:限时免费;L:限时特价;S特价)
        handleSubjectFreeLimitClick(e) {
            this.handlePromotiontype('F', e);
        },
        handleSubjectSpecialLimitClick(e) {
            this.handlePromotiontype('L', e);
        },
        handlePromotiontype(key, isCheck) {
            console.warn('handlePromotiontype', key, isCheck);
            this.page.pageIndex = 1;
            const ar = this.discountType.split(',').filter((item) => {
                return item !== key && item.length > 0;
            });
            isCheck && ar.push(key);
            this.discountType = ar.join(',');
            this.getCourseList();
        },
        evokeMp(projectId) {
            if (utilNiceloo.checkIfIsInsideYlApp()) {
                return;
            }
            const url = `app/pages/weike/sub-pages/experience-course-pages/experience-course-list/experience-course-list?projectId=${projectId || ''}`;
            location.href = `${this.$nuxt.context.env.config.INVOKE_MP_URL}${encodeURIComponent(url)}`;
        },
        ecCourseSetClueInfo(isUpdateProject = true) {
            const { projectId, projectCode, projectSeoCode } =
                (this.project && this.project.projectId && this.project) || this.$storage.get('indexSelectProject') || {};

            if (isUpdateProject) {
                this.$Promotion.setCLueInfo({
                    projectId: projectCode ? '' : projectId,
                    projectCode,
                    projectSeocode: projectCode ? '' : projectSeoCode,
                    originCode: 'ylgwtiyanke',
                    clueWaycode: 'zhuce',
                    pageName: this.pageTitle,
                });
            } else {
                const { projectCode } = this.$storage.get('indexSelectProject') || {};
                this.$Promotion.setCLueInfo({
                    projectCode,
                    originCode: 'ylgwtiyanke',
                    clueWaycode: 'zhuce',
                    pageName: this.pageTitle,
                });
            }
        },
        getSubjectInfo(projectId, param) {
            return this.requestWrapper('bd/query-subject-list', {
                projectId,
            }).then(({ data = [] }) => {
                return data.find((item) => item.subjectId === param || item.subjectSeocode === param);
            });
        },
        getPtagSubjectInfo(projectId, param) {
            return this.requestWrapper('bd/query-subject-ptag-list', {
                projectId,
            }).then(({ data = [] }) => {
                return data.find((item) => item.subjectId === param || item.subjectSeocode === param);
            });
        },
        handleSeoProject(res) {
            const { projectName } = res;
            this.pageTitleName = projectName;
            this.project = res;
            if (this.defOptId) {
                this.saleTagId = this.defOptId;
            }
            if (this.defSubjectSeocode) {
                if (this.project?.projectType === 'child') {
                    return this.getPtagSubjectInfo(this.project.projectId, this.defSubjectSeocode).then(({ subjectId }) => {
                        this.subjectId = subjectId;
                    });
                } else {
                    return this.getSubjectInfo(res.projectId, this.defSubjectSeocode).then(({ subjectId }) => {
                        this.subjectId = subjectId;
                    });
                }
            }
        },
        handleSeoCollege({ collegeName, collegeId, collegeSeoCode }) {
            this.collegeId = collegeId;
            this.collegeSeoCode = collegeSeoCode;
            this.pageTitleName = collegeName;
        },
        collegeProjectTrack() {
            this.trackWebYouluProjectSwitch({
                college_belong: this.college?.collegeId ?? '',
                project_belong: this.project?.projectId ?? '',
                course_type: '体验课',
                page_name: this.pageTitle,
            });
        },
        subjectTrack() {
            this.trackWebYouluClickCourse({
                page_type: '资源列表页',
                page_name: this.pageTitle,
                project_id: this.project.projectId,
                subject_id: this.subject.subjectId,
                course_type: '体验课',
            });
        },
        handleAdClick(item, index) {
            // this.trackWebYouluAdSpace({
            //     ad_type: '轮播广告',
            //     ad_position: '体验课轮播图',
            //     page_position: '',
            //     ad_number: index,
            //     ad_name: item.adName,
            //     ad_url: item.adLink,
            //     page_name: this.pageTitle,
            //     project_position: this.project?.projectId ?? '',
            // });
            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: item.adName,
                jump_type: item.adLinkType === 1 ? 'URL链接' : item.adLinkType === 2 ? '小程序' : '无跳转',
                ad_url: item.adLinkType === 1 || item.adLinkType === 2 ? item.adLink : '',
                ad_position_name: '体验课列表页-顶部Banner',
                page_name: document.title,
            });
        },
        trackPages() {
            if (this.isPageTrack) {
                return;
            }
            this.isPageTrack = true;
            // this.t-rackWebYouluClickAllPages({
            //     page_type: '体验课列表页',
            //     page_name: this.pageTitle,
            //     course_type: '体验课',
            //     college_name: this.college?.collegeId ?? '',
            //     project_position: this.project?.projectId ?? '',
            //     subject_name: this.subject?.subjectId ?? '',
            //     sort_name: this.saleTag?.optId ?? '',
            //     is_pay: this.courseOpenstatus === 2,
            // });
            this.$yiguan.track('youlu_click_all_pages', {
                page_name: document.title, // 页面名称
                page_url: location.href,
                page_type: '资源列表页',
                course_type: '体验课',
                sort_name: this.saleTag?.optName ?? '-',
                channel_name: '-',
                project_id: this.project?.projectId ?? '-',
                subject_id: this.subject?.subjectId ?? '-',
            });
        },
    },
};
</script>

<style scoped lang="less">
.experience {
    margin: 0 auto;
    margin-top: 22px;
    width: 1200px;
}
.experience-swiper {
    min-height: 300px;
}
.experience-tip {
    font-size: 20px;
    font-weight: bold;
    margin-top: 42px;
}
.choose-section {
    margin-top: 24px;
}
.experience-list {
    margin-top: 24px;
    margin-bottom: 30px;
    min-height: 326px;
    position: relative;
}
.experience-item {
    float: left;
    margin-right: 26px;
    transition: all 0.2s linear;
    overflow: hidden;
}

.experience-item:hover {
    transform: translate3d(0, -5px, 0);
    box-shadow: 0 0 10px 0 rgba(58, 61, 75, 0.1);
    /deep/.publicity {
        will-change: transform;
        transform: scale(1.08) translateZ(0);
    }
}

.experience-item:nth-child(4n) {
    margin-right: 0;
}
.experience-item:nth-child(n + 5) {
    margin-top: 32px;
}
.experience-list::after {
    clear: both;
    display: block;
    content: ' ';
}
.slide-item {
    width: 1200px;
    height: 300px;
    background-size: contain;
}
.experience-subject {
    margin-top: 24px;
}
.paging {
    margin-bottom: 120px;
}
.loading /deep/.circular {
    stroke: #ff0705;
    fill: transparent;
}
.empty-tip {
    height: 500px;
    justify-content: center; //左右居中
    align-items: center; //上下居中
    display: flex;
    .empty-tip-img {
        width: 260px;
        height: 180px;
    }
    .empty-tip-text {
        color: #3a3d4b;
        text-align: center;
        margin-top: 15px;
        font-size: 14px;
    }
}
</style>
