import AdSection from '@/www/components/components/ad-section/index.vue'; // 广告
import BannerCarouselSection from '@/www/components/components/banner-carousel-section/index.vue'; // 轮播
import Card from '@/www/components/ziliao/card/index.vue'; //资料卡片
import ChooseType from '@/www/components/ziliao/choose-type/index.vue'; //选择类型
import HotCoursesList from '@/www/components/components/hot-courses-list/index.vue'; //热推好课
import InformationEmpty from '@/www/components/ziliao/empty/index.vue'; //资料为空
import Mixin from '@/www/components/ziliao/mixin/index';
import pagePathName from '@/www/components/course/trial-course/js/pagePathName.js';
import Pagination from '@/www/components/components/pagination/index.vue'; // 分页
import SelectProjectSection from '@/www/components/components/select-project-section/index.vue'; // 方向和考试
import SelectSubjectSection from '@/www/components/components/select-subject-section/index.vue'; // 科目

import '@/api/dc/api.DC2028.query-completeinfo-list';
import '@/api/dc/api.DC2019.query-information-catalog-list';
import '@/api/dc/api.DC2007.query-my-completeinfo-list';

export default {
    name: 'information-index',
    components: {
        ChooseType,
        HotCoursesList,
        Pagination,
        Card,
        AdSection,
        BannerCarouselSection,
        SelectProjectSection,
        SelectSubjectSection,
        InformationEmpty,
    },
    layout: 'new-default',
    mixins: [Mixin, pagePathName],
    data() {
        return {
            listType: 'all', // all资料列表 my我的资料列表
            isCheckedMy: false, //是否点击了我的资料按钮
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
                pages: 0,
            },
            projectInfo: {},
            //列表筛选项
            search: {
                projectId: '', //主项目标识
                projectSeoCode: '',
                subjectId: '', //科目
                subjectName: '全部科目', //科目名称
                subjectSeoCode: '',
                catalogId: '', //资料分类
                catalogCode: '', //资料code
                collegeId: '', //学院标识
                collegeSeoCode: '', //学院seoCode
                ptagId: '', //子项目标识
                docPackstatus: '', // 是否是资料包
            },
            informationList: [], //资料列表
            catalogList: [], //资料分类列表
            isLogin: false, //是否登录
            isFinished: false, //查询结束
            isLoading: false, //加载中
            init: {
                project: false,
                subject: false,
                catalog: false,
            },
            projectSeoCode: 'all',
            acCode: {
                banner: 'YLWEB_ZLLB01',
                right: 'YLWEB_ZLTD',
            },
            params: {
                subjectSeoCode: '',
            }, //初始参数
            emptyType: '',
            isEnterSubject: false, //鼠标是否划入科目
            isSearchActive: false,
            keywords: '',
            pageTitleName: '',
        };
    },
    async mounted() {
        this.isLogin = await this.userLogin();
    },
    head() {
        return this.$head({
            title: this.pageTitle,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '资料,备考资料,下载资料,真题,真题解析,知识点,记忆口诀,优路,优路教育,优路教育网,国家职业资格考试,在线教育,在线培训,职业教育,素质提升,技能提升,建筑工程考试,消防考试,一级建造师,二级建造师,一级消防工程师,四级英语,六级英语,大学生,公务员,考公考编,心理咨询,初级会计师,财税金融,医卫康养,教师,法律,学历,学历提升',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育 | 备考干货资料，免费下载学习。',
                },
            ],
        });
    },
    fetch() {
        //created 之后， beformounted之前执行
        this.initPage();
        if (this.$platform.isClient()) {
            this.ziliaoSetClueInfo();
        } else {
            return this.getCollageInfo()
                .then(this.getProjectWebInfo)
                .then(this.getSubjectInfo)
                .then(this.queryCatalogList)
                .then(this.queryInformationList)
                .finally(() => {
                    this.init.project = true;
                    this.init.catalog = true;
                    this.init.subject = true;
                });
        }
    },
    watch: {
        isInitFinished(val) {
            if (val) {
                // this.page = {
                //     pageIndex: 1,
                //     pageSize: 10,
                //     pageCount: 0,
                //     pages: 0,
                // };
                this.queryInformationList();
            }
        },
    },
    computed: {
        //是否显示搜索栏
        isShowSearchBar() {
            return this.isLogin || this.catalogList.length || this.search.projectId || this.search.subjectId;
        },
        isInitFinished() {
            return this.init.project && this.init.catalog && this.init.subject;
        },
        isCatalogCheck() {
            return this.catalogList.some((item) => item.catalogCode === this.search.catalogCode);
        },
        pageTitle() {
            return `优路教育资料_${this.pageTitleName}`;
        },
    },
    methods: {
        requestWrapper(url, params = {}) {
            return new Promise((resolve, reject) => {
                this.$callApi(url, {
                    ...params,
                    onsuccess: resolve,
                    onerror: reject,
                });
            });
        },
        getProjectWebInfo() {
            const projectSeoCode = this.search.projectSeoCode;
            if (projectSeoCode) {
                return this.requestWrapper('ctc/query-project-detail', {
                    projectSeoCode,
                }).then((res) => {
                    this.projectInfo = res;
                    this.search.projectId = res.projectId;
                });
            }
            return Promise.resolve();
        },
        getCollageInfo() {
            const collegeSeoCode = this.search.collegeSeoCode;
            if (collegeSeoCode) {
                return this.requestWrapper('ctc/query-ctc-project-tree').then(({ treeData = [] }) => {
                    const item = treeData.find((item) => item.collegeSeoCode === collegeSeoCode);
                    if (item) {
                        this.search.collegeId = item.collegeId;
                    }
                });
            }
            return Promise.resolve();
        },
        getSubjectInfo() {
            const { projectId, subjectSeoCode } = this.search;
            if (projectId && subjectSeoCode) {
                return this.requestWrapper('bd/query-subject-list', {
                    projectId,
                }).then(({ data = [] }) => {
                    const item = data.find((item) => item.subjectId === subjectSeoCode || item.subjectSeocode === subjectSeoCode);
                    if (item) {
                        this.search.subjectId = item.subjectId;
                        this.search.subjectName = item.subjectName;
                    }
                });
            }
            return Promise.resolve();
        },
        initPage() {
            const { args } = this.$route.params;
            const listType = 'all';
            let collegeSeoCode, projectSeoCode, subjectSeoCode, ptagId, catalogCode, docPackstatus;
            if (args) {
                args.split('/').forEach((item) => {
                    if (item.startsWith('fx')) {
                        collegeSeoCode = item.split('-').pop();
                    } else if (item.startsWith('xm')) {
                        projectSeoCode = item.split('-').pop();
                    } else if (item.startsWith('zxm')) {
                        ptagId = item.split('-').pop();
                    } else if (item.startsWith('km')) {
                        subjectSeoCode = item.split('-').pop();
                    } else if (item.startsWith('lx')) {
                        const t = item.split('-').pop();
                        if (t === 'pack') {
                            docPackstatus = 'Y';
                        } else if (t === 'doc') {
                            docPackstatus = 'N';
                        } else {
                            docPackstatus = '';
                        }
                    } else if (item.startsWith('bq')) {
                        catalogCode = item.split('-').pop();
                    }
                });
            }

            this.listType = !this.isLogin ? 'all' : listType || 'all';
            this.params = {
                collegeSeoCode: this.handleParams(collegeSeoCode),
                projectSeoCode: this.handleParams(projectSeoCode),
                catalogCode: this.handleParams(catalogCode),
                docPackstatus: this.handleParams(docPackstatus),
                subjectSeoCode: this.handleParams(subjectSeoCode),
                ptagId: this.handleParams(ptagId),
            };
            this.search = {
                ...this.search,
                collegeSeoCode: this.handleParams(collegeSeoCode),
                projectSeoCode: this.handleParams(projectSeoCode),
                catalogCode: this.handleParams(catalogCode),
                docPackstatus: this.handleParams(docPackstatus),
                subjectSeoCode: this.handleParams(subjectSeoCode),
                ptagId: this.handleParams(ptagId),
            };
            this.isCheckedMy = listType === 'my';
            //如果传入参数为空或是all,则设置初始化完成，可以查询接口数据
            if (!subjectSeoCode || subjectSeoCode === 'all') {
                this.init.subject = true;
            }
            if ((!collegeSeoCode || collegeSeoCode === 'all') && (!projectSeoCode || projectSeoCode === 'all') && (!ptagId || ptagId === 'all')) {
                this.init.project = true;
            }
            if (!catalogCode || catalogCode === 'all') {
                this.init.catalog = true;
            }
            this.page.pageIndex = parseInt(this.$route.params.page || this.$route.query.page || 1);
        },
        handleParams(val) {
            return val === 'all' || !val ? '' : val;
        },
        updateLogin(isLogin) {
            this.isLogin = isLogin;
            this.queryInformationList();
        },
        //替换路由
        changeRouter($e) {
            if (!this.isInitFinished) {
                return;
            }
            const { collegeSeoCode, projectSeoCode, catalogCode, ptagId, docPackstatus, subjectSeoCode, projectCode } = this.search;
            // let listType = this.listType;
            // listType = !this.isLogin ? 'all' : listType;
            let url = '/ziliao';
            // https://youlu.yuque.com/h5/project/sohwdwc3pmq6pnxr
            if (collegeSeoCode) {
                url += `/fx-${collegeSeoCode}`;
            }
            if (ptagId && projectCode) {
                url += `/xm-${projectCode}/zxm-${ptagId}`;
            } else if (ptagId) {
                url += `/zxm-${ptagId}`;
            } else if (projectSeoCode) {
                url += `/xm-${projectSeoCode}`;
            }
            if (subjectSeoCode) {
                url += `/km-${subjectSeoCode}`;
            }
            if (docPackstatus) {
                url += `/lx-${docPackstatus === 'Y' ? 'pack' : 'doc'}`;
            }
            if (catalogCode) {
                url += `/bq-${catalogCode}`;
            }

            if ($e && $e.isTrusted) {
                this.page = {
                    pageIndex: 1,
                    pageSize: 10,
                    pageCount: 0,
                    pages: 0,
                };
            }
            if (this.$platform.isClient()) {
                history.pushState({ key: Date.now().toFixed(3) }, '', url);
            }
            this.queryInformationList();
        },
        /**
         * 切换查询列表的类型
         * @param {*} type all资料列表 my我的资料列表
         */
        onChangeListType(type, $e) {
            const oldType = this.listType;
            this.listType = type || 'all';
            this.isCheckedMy = oldType === 'all';
            this.changeRouter($e);
        },
        /**
         * 切换学院和项目（选择方向和选择考试）
         */
        onProjectChange(currentProject, currentCollege, $e) {
            let collegeId = currentCollege.collegeId;
            let collegeSeoCode = currentCollege.collegeSeoCode;
            this.college = currentCollege;
            let projectId = '';
            let projectSeoCode = '';
            let ptagId = '';
            let projectCode = '';
            this.projectInfo = currentProject;

            this.pageTitleName =
                currentProject.projectName === '全部'
                    ? currentCollege.collegeName === '全部'
                        ? '全部资料'
                        : currentCollege.collegeName
                    : currentProject.projectName;

            if (currentProject.projectId) {
                projectId = currentProject.projectId;
                projectSeoCode = currentProject.projectSeoCode;
                ptagId = currentProject.ptagId;
                projectCode = currentProject.projectCode;
            }
            if (this.$platform.isClient()) {
                this.ziliaoSetClueInfo(false);
            }
            if ($e && $e.isTrusted) {
                this.collegeProjectTrack();
            }
            this.init.project = true;
            this.search = {
                ...this.search,
                collegeSeoCode,
                projectId, //主项目标识
                projectSeoCode,
                collegeId, //学院标识
                ptagId, //子项目标识
                projectCode,
                docPackstatus: this.search.docPackstatus,
            };
            this.queryCatalogList();
            if (!this.isInitFinished) {
                return;
            }
            this.search = {
                ...this.search,
                subjectId: '', //科目
                subjectSeoCode: '',
                subjectName: projectId ? '全部科目' : '', //科目
                catalogId: '',
                catalogCode: '',
            };
            this.changeRouter($e);
        },
        onCollegeChange(e, $e) {
            if ($e && $e.isTrusted) {
                this.collegeProjectTrack();
            }
        },
        //切换资料包类型
        onPackStatusChange(docPackstatus, $e) {
            this.search.docPackstatus = docPackstatus;
            this.changeRouter($e);
        },
        //切换资料分类
        onChangeCatalog(catalog = {}, $e) {
            this.init.catalog = true;
            this.search.catalogId = catalog.catalogId || '';
            this.search.catalogCode = catalog.catalogCode || '';
            this.changeRouter($e);
        },
        onChangeSubject(subject, $e) {
            this.search.subjectId = subject.subjectId;
            this.search.subjectSeoCode = subject.subjectSeocode;
            this.search.subjectName = subject.subjectId ? subject.subjectName : '全部科目';
            this.init.subject = true;
            this.subject = subject;
            this.changeRouter($e);
            if ($e && $e.isTrusted) {
                this.subjectTrack();
            }
        },
        /**
         * 根据项目查询资料分类列表
         * 1.没有选中项目时，直接返回空数组
         * 2.选中子项目时传递主项目id
         * 3.查询结果最多取六个
         * @returns catalogList[]
         */
        queryCatalogList() {
            const { projectId, ptagId } = this.search;
            //没有选中项目直接返回空数组
            if (!projectId && !ptagId) {
                this.catalogList = [];
                this.initPage.catalog = true;
                return Promise.resolve();
            } else {
                const params = {
                    projectId: projectId || ptagId,
                    catalogAvlstatus: 'Y',
                };
                return this.requestWrapper('dc/query-information-catalog-list', params)
                    .then((data) => {
                        data = data || [];
                        //最多取六个
                        this.catalogList = data.filter((course, index) => index <= 5);
                        const catalog = this.catalogList.find((catalog) => catalog.catalogCode === this.search.catalogCode);
                        this.search.catalogId = catalog ? catalog.catalogId : '';
                        this.init.catalog = true;
                    })
                    .catch(this.$niceloo.api.handleFailure)
                    .finally(() => {
                        this.initPage.catalog = true;
                    });
            }
        },
        pageChange(num) {
            this.page.pageIndex = num;
            this.queryInformationList();
            this.$nextTick(() => {
                const dm = document.querySelector('.title');
                dm &&
                    dm.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
            });
        },
        refreshPage() {
            this.page = {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
                pages: 0,
            };
            this.queryInformationList();
        },
        queryInformationList() {
            this.emptyType = '';
            this.informationList = [];
            if (this.listType === 'my') {
                return this.queryMyCompleteList();
            } else {
                return this.queryCompleteList();
            }
        },
        /**
         * 资料列表
         * 项目为子项目时-传递科目
         */
        queryCompleteList() {
            this.isLoading = true;
            this.isFinished = false;
            const { projectId, ptagId, catalogId, subjectId, collegeId, docPackstatus } = this.search;
            let params = {
                pageIndex: this.$PageUtil.getStartIndex(this.page),
                pageSize: this.page.pageSize,
                catalogId,
                subjectId,
                collegeId,
                docPackstatus,
            };
            if (ptagId) {
                params.ptagId = ptagId;
            } else {
                params.projectId = projectId;
            }
            this.updateUrlPageNumber();
            return this.requestWrapper('dc/query-completeinfo-list', {
                listType: 'my',
                clientType: 'web',
                ...params,
            })
                .then((data) => {
                    data = data || [];
                    this.page.pageCount = data.count;
                    this.informationList = data.list.map((item) => {
                        item.systemTime = data.systemTime;
                        item.projectSeoCode = this.search.projectSeoCode || this.projectSeoCode;
                        return item;
                    });
                    if (this.$platform.isClient()) {
                        this.trackPages();
                    }
                })
                .then(this.ssrInValidPage)
                .catch(() => {
                    this.emptyType = 'fail';
                })
                .finally(() => {
                    this.isFinished = true;
                    this.isLoading = false;
                });
        },
        /**
         * 查询我的资料
         * 项目为子项目时-传递科目
         */
        queryMyCompleteList() {
            this.isLoading = true;
            this.isFinished = false;
            const { projectId, ptagId, catalogId, subjectId, collegeId, docPackstatus } = this.search;
            let params = {
                pageIndex: this.$PageUtil.getStartIndex(this.page),
                pageSize: this.page.pageSize,
                catalogId,
                subjectIds: subjectId,
                collegeId,
                docPackstatus,
            };
            if (ptagId) {
                params.ptagId = ptagId;
            } else {
                params.projectId = projectId;
            }
            this.updateUrlPageNumber();
            return this.requestWrapper('dc/query-my-completeinfo-list', {
                ...params,
            })
                .then((data) => {
                    data = data || [];
                    this.page.pageCount = data.count;
                    this.informationList = data.list.map((item) => {
                        item.systemTime = data.systemTime;
                        item.projectSeoCode = this.search.projectSeoCode || this.projectSeoCode;
                        return item;
                    });
                    if (this.$platform.isClient()) {
                        this.trackPages();
                    }
                })
                .catch(() => {
                    this.emptyType = 'fail';
                })
                .finally(() => {
                    this.isFinished = true;
                    this.isLoading = false;
                });
        },
        enterSubject() {
            if (this.$refs.subjectRef.$el.offsetWidth > 800) {
                this.$refs.subjectRef.$el.style.whiteSpace = 'normal';
                this.$refs.subjectRef.$el.style.width = '800px';
            }
            this.$refs.subjectRef.$el.style.display = 'block';
        },
        leaveSubject() {
            setTimeout(() => {
                if (!this.isEnterSubject) {
                    this.$refs.subjectRef.$el.style.display = 'none';
                }
            }, 300);
        },
        enterSection() {
            this.isEnterSubject = true;
            this.$refs.subjectRef.$el.style.display = 'block';
        },
        leaveSection() {
            this.isEnterSubject = false;
            this.$refs.subjectRef.$el.style.display = 'none';
        },
        handleEnterClick() {
            if (!this.keywords) {
                return;
            }
            this.$refs.searchRef.click();
        },
        ziliaoSetClueInfo(isUpdateProject = true) {
            const { projectId, projectCode, projectSeoCode } =
                (this.projectInfo && this.projectInfo.projectId && this.projectInfo) || this.$storage.get('indexSelectProject') || {};
            if (isUpdateProject) {
                this.$Promotion.setCLueInfo({
                    projectId: projectCode ? '' : projectId,
                    projectCode,
                    projectSeocode: projectCode ? '' : projectSeoCode,
                    originCode: 'ziliaoxiazai',
                    clueWaycode: 'zhuce',
                    pageName: this.pageTitle,
                });
            } else {
                const { projectCode } = this.$storage.get('indexSelectProject') || {};
                this.$Promotion.setCLueInfo({
                    projectCode,
                    originCode: 'ziliaoxiazai',
                    clueWaycode: 'zhuce',
                    pageName: this.pageTitle,
                });
            }
        },
        collegeProjectTrack() {
            this.trackWebYouluProjectSwitch({
                college_belong: this.college?.collegeId ?? '',
                project_belong: this.projectInfo?.projectId ?? '',
                course_type: '资料',
                page_name: this.pageTitle,
            });
        },
        subjectTrack() {
            this.trackWebYouluClickCourse({
                page_type: '资料列表页',
                page_name: this.pageTitle,
                project_position: this.projectInfo.projectId,
                subject_name: this.subject.subjectId,
                course_type: '资料',
            });
        },
        handleAdClick(item, index) {
            // this.trackWebYouluAdSpace({
            //     ad_type: '轮播广告',
            //     ad_position: '资料列表页轮播图',
            //     page_position: '',
            //     ad_number: index,
            //     ad_name: item.adName,
            //     ad_url: item.adLink,
            //     page_name: this.pageTitle,
            //     project_position: this.projectInfo?.projectId ?? '',
            // });

            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: item.adName,
                jump_type: item.adLinkType === 1 ? 'URL链接' : item.adLinkType === 2 ? '小程序' : '无跳转',
                ad_url: item.adLinkType === 1 || item.adLinkType === 2 ? item.adLink : '',
                ad_position_name: '图书列表页-顶部Banner',
                page_name: document.title,
            });
        },
        handleAdItemClick(item) {
            this.trackWebYouluAdSpace({
                ad_type: '单张广告',
                ad_position: '项目资料列表页_右侧通用',
                ad_name: item.adName,
                ad_url: item.adLink,
                jump_type: item.adLinkType === 1 ? 'URL链接' : item.adLinkType === 2 ? '小程序' : '无跳转',
                page_name: this.pageTitle,
                project_position: this.search.projectId,
            });
        },
        trackPages() {
            if (this.isPageTrack) {
                return;
            }
            this.isPageTrack = true;
            const catalog = this.catalogList.find((item) => item.catalogId === this.search.catalogId);
            // this.t-rackWebYouluClickAllPages({
            //     page_type: '资料列表页',
            //     page_name: this.pageTitle,
            //     course_type: '资料',
            //     college_name: this.college?.projectId ?? '',
            //     project_position: this.projectInfo?.projectId ?? '',
            //     subject_name: this.subject?.subjectId ?? '',
            //     sort_name: catalog?.catalogId ?? '',
            //     is_pay: false,
            //     course_price: 0,
            // });
            this.$yiguan.track('youlu_click_all_pages', {
                page_name: document.title, // 页面名称
                page_url: location.href,
                page_type: '资源列表页',
                course_type: '资料',
                sort_name: catalog?.catalogName ?? '-',
                channel_name: '-',
                project_id: this.projectInfo?.projectId ?? '-',
                subject_id: this.subject?.subjectId ?? '-',
            });
        },
        handleSearchClick() {},
    },
};
