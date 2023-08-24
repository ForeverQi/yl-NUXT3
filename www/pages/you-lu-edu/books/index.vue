<template>
    <div>
        <div class="bg-white">
            <div class="books-top">
                <banner-carousel-section :lyt-code="'YLWEB_BLB01'" @item-click="handleAdClick"></banner-carousel-section>
                <div class="books-title">全部图书</div>
                <select-project-section
                    :college-seo-code="defCollegeSeoCode"
                    :project-seo-code="defProjectSeoCode"
                    :ptag-id="defPtagId"
                    @college-change="handleChangeCollege"
                    @project-change="handleChangeProject"
                ></select-project-section>
            </div>
        </div>
        <div class="width1200">
            <ul v-if="booksList.length > 0">
                <li v-for="(item, index) in booksList" :key="index">
                    <books-list-item :item="item" :college="currentCollege"></books-list-item>
                </li>
            </ul>
            <div class="empty-tip" v-else-if="failLoad && !isLoading">
                <div>
                    <img class="empty-tip-img" src="./asset/images/fail_load.png" alt="" />
                    <div class="empty-tip-text">内容加载失败，请刷新页面</div>
                </div>
            </div>
            <div class="empty-tip" v-else-if="booksList.length == 0 && !failLoad && !isLoading">
                <div>
                    <img class="empty-tip-img" src="./asset/images/empty_tip.png" alt="" />
                    <div class="empty-tip-text">
                        暂无图书
                        <br />
                        切换其他考试项目，查看更多图书
                    </div>
                </div>
            </div>
            <div class="books-list-load" v-else-if="isLoading"><loading class="loading"></loading></div>
            <pagination
                :page-size="page.pageSize"
                :total="page.pageCount"
                @current-change="handleChangePage"
                class="pagination"
                :current-page.sync="page.pageIndex"
            ></pagination>
            <div class="paging" v-if="page.pageCount < 21"></div>
        </div>
    </div>
</template>

<script>
import Loading from '@/plugins/loading/index.vue';
import BooksListItem from '@/www/components/books/books-list-item/index.vue';
import BannerCarouselSection from '@/www/components/components/banner-carousel-section/index.vue';
import SelectProjectSection from '@/www/components/components/select-project-section/index.vue';
import Pagination from '@/www/components/components/pagination/index.vue';
import '@/api/mcp/api..bookPageList.js';
import track from '@/www/components/course/free-course/js/track.js';
export default {
    name: 'index',
    components: {
        BannerCarouselSection, //轮播图
        SelectProjectSection,
        BooksListItem,
        Pagination,
        Loading,
    },
    mixins: [track],
    layout: 'new-default',
    data() {
        return {
            defCollegeSeoCode: '',
            defProjectSeoCode: '',
            defPtagId: '',
            currentCollege: null,
            currentProject: null,
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
            },
            booksList: [],
            failLoad: false,
            isLoading: true,
            pageTitleName: '全部图书',
            cLueInfo: {
                url: '',
                pageName: '优路教育图书_全部图书',
                projectId: '',
                projectCode: '',
                projectSeocode: '',
                originCode: 'ylgwtushu',
                clueWaycode: 'zhuce',
            },
        };
    },
    head() {
        return this.$head({
            title: this.pageTitle,
            /*title: `优路教育图书_${this.pageTitleName}`,*/
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '图书,教辅,教材,教材教辅,优路,优路教育,优路教育网,国家职业资格考试,在线教育,在线培训,职业教育,素质提升,技能提升,建筑工程考试,消防考试,一级建造师,二级建造师,一级消防工程师,四级英语,六级英语,大学生,公务员,考公考编,心理咨询,初级会计师,财税金融,医卫康养,教师,法律,学历,学历提升',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育深入开展相关培训教辅的研发工作，出版多品类职业培训图书，构筑多方位、立体化培训教辅体系。',
                },
            ],
        });
    },
    computed: {
        pageTitle() {
            return `优路教育图书_${this.pageTitleName}`;
        },
    },
    async mounted() {
        const c = this.$route.params.collegeSeoCode || this.$route.query.collegeSeoCode || '';
        const p = this.$route.params.projectSeoCode || this.$route.query.projectSeoCode || '';
        const t = this.$route.params.ptagId || this.$route.query.ptagId || '';
        this.defProjectSeoCode = p === 'all' ? '' : p;
        this.defCollegeSeoCode = c === 'all' ? '' : c;
        this.defPtagId = t === 'all' ? '' : t;

        if (this.defCollegeSeoCode) {
            const { collegeId, collegeName } = await this.getCollageInfo(this.defCollegeSeoCode);
            this.pageTitleName = collegeName;
            this.cLueInfo.pageName = '优路教育图书_' + this.pageTitleName;
            this.currentCollege = { collegeId, collegeName };
        }
        if (this.defProjectSeoCode) {
            const { projectId, projectName } = await this.getProjectWebInfo(this.defProjectSeoCode);
            this.pageTitleName = projectName;
            this.cLueInfo.pageName = '优路教育图书_' + this.pageTitleName;
            this.projectId = projectId;
            this.currentProject = { projectId, projectType: 'parent', projectName };
        }
        if (this.defPtagId) {
            this.ptagId = this.defaultPtagId; // 子项目标识
            this.currentProject.projectType = 'child';
            this.currentProject.ptagId = this.defPtagId;
        }
        this.getList();
        /*if (process.client) {}*/
        //线索信息
        /*this.cLueInfo.url = window.location.href;
        let recommendProject = localStorage.getItem('indexSelectProject');
        if (recommendProject) {
            this.cLueInfo.projectSeocode = JSON.parse(recommendProject).projectSeoCode;
        }
        this.$Promotion.setCLueInfo(this.cLueInfo);*/
    },
    methods: {
        //projectSeoCode转为projectId
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
        handleChangeCollege(e) {
            this.currentCollege = e;
            this.currentProject = null;
            this.page.pageIndex = 1;
            if (process.client === true) {
                history.replaceState(null, null, e.collegeSeoCode ? `/books/${e.collegeSeoCode}` : '/books');
            }
        },
        handleChangeProject(e, e2) {
            this.currentCollege = e2;
            this.currentProject = e;
            this.page.pageIndex = 1;
            this.getList();
            this.pageTitleName = e.projectName === '全部' ? (e2.collegeName === '全部' ? '全部图书' : e2.collegeName) : e.projectName;
            process.client && this.collegeProjectTrack();
            if (!this.currentProject?.projectSeoCode && !e2.collegeId) {
                return;
            }
            let u = `/books/${e2.collegeSeoCode || 'all'}`;
            if (this.currentProject?.isAll) {
                process.client && history.replaceState(null, null, u);
                return;
            }

            if (this.currentProject?.projectSeoCode) {
                u += `/${this.currentProject?.projectSeoCode}`;
            }
            if (this.currentProject?.projectType === 'child') {
                u += `/${this.currentProject?.ptagId}`;
            }
            if (process.client) {
                history.replaceState(null, null, u);
                this.cLueInfo.url = window.location.href;
                this.cLueInfo.pageName = '优路教育图书_' + this.pageTitleName;
                this.$Promotion.setCLueInfo(this.cLueInfo);
            }
        },
        getList() {
            this.failLoad = false;
            this.isLoading = true;
            //mcp/booksWeb/web/bookPageList
            this.$callApi('books/bookPageList', {
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
                onsuccess: (res) => {
                    this.booksList.splice(0, this.booksList.length, ...res.data);
                    this.page.pageCount = res.count;
                    process.client && !this.isPageTrack && this.trackPages();
                },
                onerror: (err) => {
                    this.failLoad = true;
                    this.page.pageCount = 0;
                    this.booksList.splice(0, this.booksList.length);
                    this.$niceloo.api.handleFailure(err);
                },
                oncomplete: () => {
                    this.isLoading = false;
                },
            });
        },
        handleChangePage(currentPage) {
            this.page.pageIndex = currentPage;
            this.getList();
            this.$nextTick(() => {
                const dm = document.querySelector('.books-title');
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
                project_belong: this.currentProject?.projectId ?? '-',
                course_type: '图书',
                page_name: this.pageTitle,
            });
        },
        handleAdClick(item, index) {
            // this.trackWebYouluAdSpace({
            //     ad_type: '轮播广告',
            //     ad_position: '图书轮播图',
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
                ad_position_name: '图书列表页-顶部Banner',
                page_name: document.title,
            });
        },
        trackPages() {
            if (this.isPageTrack) {
                return;
            }
            this.isPageTrack = true;
            // this.t-rackWebYouluClickAllPages({
            //     page_type: '图书列表页',
            //     page_name: this.pageTitle,
            //     course_name: '图书',
            //     course_type: '图书',
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
                course_type: '图书',
                sort_name: '-',
                channel_name: '-',
                project_id: this.currentProject.projectId ?? '-',
                subject_id: '-',
            });
        },
    },
};
</script>

<style scoped lang="less">
.bg-white {
    background: #ffffff;
}
.books-top {
    width: 1200px;
    margin: 0 auto;
    padding-top: 32px;
    padding-bottom: 20px;
}
.books-title {
    font-size: 20px;
    font-weight: bold;
    color: #3a3d4b;
    margin: 52px auto 20px;
}
.width1200 {
    width: 1200px;
    margin: 0 auto;
}
ul {
    display: inline-block;
    margin-top: 47px;
    margin-right: -20px;
    li {
        width: 590px;
        height: 232px;
        background: #ffffff;
        border-radius: 8px;
        float: left;
        margin-right: 20px;
        margin-bottom: 56px;
        position: relative;
        transition: all 0.5s;
        &:hover {
            transform: translate3d(0, -5px, 0);
            box-shadow: 0px 2px 12px 4px rgba(11, 42, 113, 0.05);
            .img {
                will-change: transform;
                transform: scale(1.08) translateZ(0);
            }
        }
    }
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
.books-list-load {
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
