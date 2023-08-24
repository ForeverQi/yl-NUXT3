<template>
    <div class="open-container">
        <banner-carousel-section class="open-swiper" :lyt-code="'YLWEB_OLB01'" @item-click="handleAdClick"></banner-carousel-section>
        <!-- <live-calendar></live-calendar> -->
        <div class="open-title">全部公开课</div>
        <select-project-section
            :college-seo-code="defCollegeSeoCode"
            :project-seo-code="defProjectSeoCode"
            :ptag-id="defPtagId"
            @college-change="handleChangeCollege"
            @project-change="handleChangeProject"
        ></select-project-section>
        <experience-subject
            class="experience-subject"
            :project="currentProject"
            :subject-seocode="defSubjectSeocode"
            :opt-id="defOptId"
            @handle-click-city="HandleClickCity"
            @tag-change="handleSaleTagClick"
            @subject-change="handleSubjectClick"
            @doing-change="handleDoingClick"
            @start-change="handleStartClick"
            @play-change="handlePlayClick"
        ></experience-subject>
        <!--<open-list v-if="currentCollege && currentCollege" :current-college="currentCollege" :current-project="currentProject"></open-list>-->
        <div>
            <ul class="openList" v-if="liveList.length > 0">
                <open-list-item v-for="(item, index) in liveList" :key="index" :item="item" :sale-tag="saleTag"></open-list-item>
            </ul>
            <div class="empty-tip" v-else-if="failLoad && !isLoading">
                <div>
                    <img class="empty-tip-img" src="./asset/images/fail_load.png" alt="" />
                    <div class="empty-tip-text">内容加载失败，请刷新页面</div>
                </div>
            </div>
            <div class="empty-tip" v-else-if="liveList.length == 0 && !failLoad && !isLoading">
                <div>
                    <img class="empty-tip-img" src="./asset/images/empty_tip.png" alt="" />
                    <div class="empty-tip-text">暂无课程，去看看其他考试的课程吧</div>
                </div>
            </div>
            <div class="open-list-load" v-else-if="isLoading"><loading class="loading"></loading></div>
            <pagination
                :page-size="page.pageSize"
                :total="page.pageCount"
                @current-change="handleChangePage"
                class="pagination"
                :current-page.sync="page.pageIndex"
                :page-path-name="pagePathName"
            ></pagination>
            <div class="paging" v-if="page.pageCount < 21"></div>
        </div>
    </div>
</template>

<script>
import utilNiceloo from '@youlu/niceloo/libs/@xlib.01/lib/util/util._niceloo';
import Loading from '@/plugins/loading/index.vue';
import OpenListItem from '@/www/components/course/free-course/components/open-list-item/index.vue';
// import LiveCalendar from '@/www/components/course/free-course/index/live-calendar/index.vue';
import BannerCarouselSection from '@/www/components/components/banner-carousel-section/index.vue';
import SelectProjectSection from '@/www/components/components/select-project-section/index.vue';
import ExperienceSubject from '@/www/components/course/free-course/subject/index.vue';
import Pagination from '@/www/components/components/pagination/index.vue';
import '@/api/mcp/api..query-liveCourse-web-list.js';
import '@/api/ta/api.TA1027.applet-url.js';
import '@/api/ctc/api..query-project-detail.js';
import track from '@/www/components/course/free-course/js/track.js';
import pagePathName from '@/www/components/course/trial-course/js/pagePathName.js';

export default {
    name: 'open',
    components: {
        BannerCarouselSection, //轮播图
        // LiveCalendar,
        SelectProjectSection,
        OpenListItem,
        Pagination,
        Loading,
        ExperienceSubject,
    },
    mixins: [track, pagePathName],
    layout: 'new-default',
    data() {
        return {
            defCollegeSeoCode: '',
            defProjectSeoCode: '',
            defPtagId: '',
            defOptId: '',
            subjectId: '',
            subjectSeocode: '',
            saleTagId: '',
            saleTag: {},
            areaCode: '',
            isPlay: null,
            isStart: null,
            isDoing: null,

            currentCollege: null,
            currentProject: null,
            defSubjectSeocode: '',
            page: {
                pageIndex: 1,
                pageSize: 20,
                pageCount: 0,
            },
            liveList: [],
            failLoad: false,
            isLoading: true,
            pageTitleName: '全部课程',
            cLueInfo: {
                url: '',
                pageName: '优路教育公开课_全部课程',
                projectId: '',
                projectCode: '',
                projectSeocode: '',
                originCode: this.$nuxt.context.env.config.env === 'prod' ? 'ylgwzbk' : 'ylgwylgwzbk',
                clueWaycode: 'zhuce',
            },
        };
    },
    async fetch() {
        const c = this.$route.params.collegeSeoCode || this.$route.query.collegeSeoCode || '';
        const p = this.$route.params.projectSeoCode || this.$route.query.projectSeoCode || '';
        const t = this.$route.params.ptagId || this.$route.query.ptagId || '';
        const s = this.$route.params.subjectSeocode || this.$route.query.subjectSeocode || '';
        const o = this.$route.params.optId || this.$route.query.optId || '';

        this.defProjectSeoCode = p === 'all' ? '' : p;
        this.defCollegeSeoCode = c === 'all' ? '' : c;
        this.defPtagId = t === 'all' ? '' : t;
        this.defSubjectSeocode = s === 'all' ? '' : s;
        this.defOptId = o === 'all' ? '' : o;
        this.page.pageIndex = parseInt(this.$route.params.page || this.$route.query.page || 1);

        if (!this.$platform.isPC) {
            if (this.defProjectSeoCode) {
                this.getProjectWebInfo(this.defProjectSeoCode).then(({ projectId }) => {
                    this.evokeMp(projectId);
                    return Promise.resolve();
                });
            } else {
                this.evokeMp();
                return Promise.resolve();
            }
        } else {
            if (this.defCollegeSeoCode) {
                const { collegeId, collegeName } = await this.getCollageInfo(this.defCollegeSeoCode);
                this.pageTitleName = collegeName;
                /*this.cLueInfo.pageName = '优路教育公开课_' + this.pageTitleName;*/
                this.cLueInfo.pageName = this.pageTitle;
                this.currentCollege = { collegeId, collegeName, collegeSeoCode: this.defCollegeSeoCode };
            }
            if (this.defProjectSeoCode) {
                const { projectId, projectName } = await this.getProjectWebInfo(this.defProjectSeoCode);
                this.pageTitleName = projectName;
                /*this.cLueInfo.pageName = '优路教育公开课_' + this.pageTitleName;*/
                this.cLueInfo.pageName = this.pageTitle;
                this.projectId = projectId;
                this.currentProject = { projectId, projectType: 'parent', projectName, projectSeoCode: this.defProjectSeoCode };
            }
            // if (this.defPtagId) {
            //     this.ptagId = this.defaultPtagId; // 子项目标识
            //     this.currentProject.projectType = 'child';
            //     this.currentProject.ptagId = this.defPtagId;
            // }
            return this.getList().then(this.ssrInValidPage);
        }
    },
    head() {
        return this.$head({
            title: this.pageTitle,
            /*title: `优路教育公开课_${this.pageTitleName}`,*/
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '公开课,直播课,视频教程,培训课程,免费试听,优路,优路教育,优路教育网,国家职业资格考试,在线教育,在线培训,职业教育,素质提升,技能提升,建筑工程考试,消防考试,一级建造师,二级建造师,一级消防工程师,四级英语,六级英语,大学生,公务员,考公考编,心理咨询,初级会计师,财税金融,医卫康养,教师,法律,学历,学历提升',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育 | 直播课程汇集，老师实时互动，在线答疑解惑。',
                },
            ],
        });
    },
    computed: {
        pageTitle() {
            return `优路教育公开课_${this.pageTitleName}`;
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
        //projectSeoCode转为projectId
        getProjectWebInfo(projectSeoCode) {
            return new Promise((resolve) => {
                this.$callApi('ctc/query-project-detail', {
                    projectSeoCode,
                    onsuccess: (res) => {
                        console.log('选择的项目', projectSeoCode, res);
                        resolve(res);
                    },
                    onerror: () => {},
                });
            });
        },
        getCollageInfo(collegeSeoCode) {
            return new Promise((resolve) => {
                this.$callApi('ctc/query-ctc-project-tree', {
                    onsuccess: (res) => {
                        resolve(res.treeData.find((item) => item.collegeSeoCode === collegeSeoCode));
                    },
                    onerror: niceloo.api.handleFailure,
                });
            });
        },
        //链接地址被手机打开页面后，实现自动识别打开小程序对应课程界面
        evokeMp(projectId) {
            if (utilNiceloo.checkIfIsInsideYlApp()) {
                return;
            }
            const url = `app/pages/weike/sub-pages/studio-pages/studio-list/studio-list?projectId=${projectId || ''}`;
            location.href = `${this.$nuxt.context.env.config.INVOKE_MP_URL}${encodeURIComponent(url)}`;
        },
        handleChangeCollege(e, $e) {
            this.currentCollege = e;
            this.currentProject = null;
            // this.saleTagId = '';
            // this.subjectId = '';
            // this.defOptId = '';
            // this.defSubjectSeocode = '';
            this.subjectSeocode = '';
            if ($e && $e.isTrusted) {
                this.page.pageIndex = 1;
            }
            this.pageTitleName = e.collegeName === '全部' ? '全部课程' : e.collegeName;
            process.client && history.replaceState(null, null, e.collegeSeoCode ? `/free-course/${e.collegeSeoCode}` : '/free-course');
        },
        // 	促销类型(N:无促销;F:限时免费;L:限时特价;S特价)
        handleSubjectFreeLimitClick(e) {
            this.handlePromotiontype('F', e);
        },
        handleSubjectSpecialLimitClick(e) {
            this.handlePromotiontype('L', e);
        },
        handlePlayClick(e) {
            console.warn('handlePromotiontype', e);
            this.page.pageIndex = 1;
            this.isPlay = e ? 3 : null;
            this.getList();
        },
        handleDoingClick(e) {
            // 直播中的状态
            this.page.pageIndex = 1;
            this.isDoing = e ? 2 : null;
            this.getList();
        },
        handleStartClick(e) {
            // 即将开始的状态
            this.page.pageIndex = 1;
            this.isSart = e ? 1 : null;
            this.getList();
        },
        HandleClickCity(city, e) {
            console.log(city, e, 'city');
            if (this.areaCode === city.areaCode) {
                return;
            }
            this.areaCode = city.areaCode;
            this.getList();
        },
        handleSubjectClick(e, $e) {
            // console.warn('handleSubjectClick-切换科目', e, $e);
            if (this.subjectId === e.subjectId) {
                return;
            }
            if ($e && $e.isTrusted) {
                this.page.pageIndex = 1;
            }
            this.subject = e;
            this.subjectId = e.subjectId;
            this.subjectSeocode = e.subjectSeocode;
            this.getList();
            this.subjectTrack();
            let u = `/free-course/${this.currentCollege.collegeSeoCode || 'all'}/${this.currentProject?.projectSeoCode ?? 'all'}/${
                this.currentProject?.projectType === 'child' ? this.currentProject.ptagId : this.currentProject.projectSeoCode
            }`;
            if (this.saleTagId) {
                u += `/${e.subjectSeocode || 'all'}/${this.saleTagId}`;
            } else if (e.subjectSeocode) {
                u += `/${e.subjectSeocode || 'all'}`;
            }
            if (this.$platform.isClient()) {
                console.log('histo--ry-2222', u);
                history.replaceState(null, null, u);
            }
            if (e.isAll) {
                return;
            }
            console.log(e, $e);
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
            this.getList();

            let u = `/free-course/${this.currentCollege.collegeSeoCode || 'all'}/${this.currentProject?.projectSeoCode ?? 'all'}/${
                this.currentProject?.projectType === 'child' ? this.currentProject.ptagId : this.currentProject.projectSeoCode
            }`;
            if (this.saleTagId) {
                u += `/${this.subjectSeocode || 'all'}/${this.saleTagId}`;
            } else if (this.subjectSeocode) {
                u += `/${this.subjectSeocode}`;
            }
            if (this.$platform.isClient()) {
                console.log('histo--ry-3333', u);
                history.replaceState(null, null, u);
            }
            console.log(e, $e);
        },
        handleChangeProject(e, e2, $e) {
            this.currentCollege = e2;
            this.currentProject = e;
            // this.defOptId = '';
            this.saleTagId = '';
            this.subjectId = '';
            this.subjectSeocode = '';
            // this.defSubjectSeocode = '';
            if ($e && $e.isTrusted) {
                this.page.pageIndex = 1;
            }
            this.pageTitleName = e.projectName === '全部' ? (e2.collegeName === '全部' ? '全部课程' : e2.collegeName) : e.projectName;
            this.getList();
            this.$platform.isClient() && this.collegeProjectTrack();
            if (!this.currentProject?.projectSeoCode && !e2.collegeId) {
                return;
            }
            let u = `/free-course/${e2.collegeSeoCode || 'all'}`;

            if (this.currentProject?.isAll) {
                console.log('histo--ry-4444');
                process.client && history.replaceState(null, null, u);
                return;
            }
            if (this.currentProject?.projectSeoCode) {
                u += `/${this.currentProject?.projectSeoCode}`;
            }
            console.log(u, '000---');
            if (this.currentProject?.projectType === 'child') {
                u += `/${this.currentProject?.ptagId}`;
            }
            console.log('histo--ry-5555', '000---', u);
            process.client && history.replaceState(null, null, u);

            this.$platform.isClient() && (this.cLueInfo.url = window.location.href);
            /*this.cLueInfo.pageName = '优路教育公开课_' + this.pageTitleName;*/
            this.cLueInfo.pageName = this.pageTitle;
            this.cLueInfo.projectSeocode = this.currentProject.projectSeoCode;
            this.$platform.isClient() && this.$Promotion.setCLueInfo(this.cLueInfo);
        },
        /**
         * 科目切换
         */
        subjectTrack() {
            this.trackWebYouluClickCourse({
                page_type: '资源列表页',
                page_name: this.pageTitle,
                course_type: '公开课',
                project_id: this.currentProject?.projectId ?? '-',
                subject_id: this.subjectId || '-',
            });
        },
        getList() {
            if (!this.areaCode) {
                return;
            }
            this.failLoad = false;
            this.isLoading = true;
            this.$nextTick(this.updateUrlPageNumber);
            let playStatus = '';
            if (this.isSart) {
                playStatus += ',' + this.isSart;
            }
            if (this.isDoing) {
                playStatus += ',' + this.isDoing;
            }
            if (this.isPlay) {
                playStatus += ',' + this.isPlay;
            }
            playStatus = playStatus.substring(1);
            return new Promise((resolve, reject) => {
                this.$callApi('mcp/query-liveCourse-web-list', {
                    pageIndex: this.page.pageIndex,
                    pageSize: this.page.pageSize,
                    showClient: 'W',
                    projectId: !this.currentProject
                        ? ''
                        : this.currentProject.projectType === 'parent'
                        ? this.currentProject.projectId
                        : this.currentProject.ptagId, // 项目唯一标识
                    projectType: !this.currentProject ? '' : this.currentProject.projectType === 'parent' ? 'P' : 'T', //	项目类型 P项目 T子项目
                    collegeId: this.currentCollege ? this.currentCollege.collegeId : '',
                    indexFlag: false,
                    subjectId: this.subjectId,
                    saleTagId: this.saleTagId,
                    areaCode: this.areaCode,
                    hasAppointStatus: false,
                    courseStatus: playStatus,
                    onsuccess: (res) => {
                        this.liveList = res.data;
                        this.page.pageCount = res.count;
                        process.client && !this.isPageTrack && this.trackPages();
                        resolve();
                    },
                    onerror: () => {
                        this.liveList = [];
                        this.failLoad = true;
                        this.page.pageCount = 0;
                    },
                    oncomplete: () => {
                        this.isLoading = false;
                    },
                });
            });
        },
        handleChangePage(currentPage) {
            this.page.pageIndex = currentPage;
            this.getList();
            this.$nextTick(() => {
                const dm = document.querySelector('.open-title');
                dm &&
                    dm.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
            });
        },
        collegeProjectTrack() {
            this.trackWebYouluProjectSwitch({
                college_belong: this.currentCollege?.collegeId ?? '-',
                project_belong: this.currentProject.projectId ? this.currentProject.projectId : '-',
                course_type: '公开课',
                page_name: this.pageTitle,
            });
        },
        handleAdClick(item, index) {
            // this.trackWebYouluAdSpace({
            //     ad_type: '轮播广告',
            //     ad_position: '公开课轮播图',
            //     page_position: '-',
            //     ad_number: index,
            //     ad_name: item.adName,
            //     ad_url: item.adLink,
            //     page_name: this.pageTitle,
            //     project_position: this.currentProject?.projectId ?? '-',
            // });

            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: item.adName,
                jump_type: item.adLinkType === 1 ? 'URL链接' : item.adLinkType === 2 ? '小程序' : '无跳转',
                ad_url: item.adLinkType === 1 || item.adLinkType === 2 ? item.adLink : '',
                ad_position_name: '公开课列表页-顶部Banner',
                page_name: document.title,
            });
        },
        trackPages() {
            if (this.isPageTrack) {
                return;
            }
            this.isPageTrack = true;
            // this.t-rackWebYouluClickAllPages({
            //     page_type: '公开课列表页',
            //     page_name: this.pageTitle,
            //     course_type: '公开课',
            //     college_name: this.currentCollege?.collegeId ?? '-',
            //     project_position: this.currentProject?.projectId ?? '-',
            //     subject_name: '-',
            //     sort_name: '-',
            //     is_pay: false,
            //     course_price: 0,
            // });
            this.$yiguan.track('youlu_click_all_pages', {
                page_name: document.title, // 页面名称
                page_url: location.href,
                page_type: '资源列表页',
                course_type: '公开课',
                sort_name: this.saleTag.optName ? this.saleTag.optName : '-',
                channel_name: '-',
                project_id: this.currentProject?.projectId ?? '-',
                subject_id: '-',
            });
        },
    },
};
</script>

<style scoped lang="less">
.open-container {
    width: 1200px;
    margin: 0 auto;
}
.experience-subject {
    margin-top: 24px;
}
.open-swiper {
    margin-top: 32px;
    margin-bottom: 32px;
}
.open-title {
    font-size: 20px;
    font-weight: bold;
    color: #3a3d4b;
    margin-bottom: 20px;
    margin-top: 32px;
}
ul {
    display: inline-block;
    margin-top: 25px;
}
.pagination {
    margin-bottom: 120px;
}
.paging {
    margin-bottom: 90px;
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
.open-list-load {
    margin-top: 24px;
    margin-bottom: 30px;
    min-height: 400px;
    position: relative;
}

.loading /deep/.circular {
    stroke: #ff0705;
    fill: transparent;
}
</style>
