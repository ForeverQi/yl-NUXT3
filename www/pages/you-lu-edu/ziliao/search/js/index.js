import Card from '@/www/components/ziliao/card/index.vue'; //资料卡片
import InformationEmpty from '@/www/components/ziliao/empty/index.vue'; //资料为空
import HotCoursesList from '@/www/components/components/hot-courses-list/index.vue'; //热推好课
import Pagination from '@/www/components/components/pagination/index.vue'; // 分页
import ZiLiaoSubject from '@/www/components/ziliao/subject/index.vue'; //选择类型
import SelectProjectSection from '@/www/components/components/select-project-section/index.vue';

import '@/api/dc/api.DC2007.query-my-completeinfo-list';
import '@/api/dc/api.DC2028.query-completeinfo-list';
import '@/api/dc/api.DC2019.query-information-catalog-list';
import '@/api/dc/api.DC2029.search-doc-list.js';
import '@/api/ctc/api..query-project-detail.js';
import Mixin from '@/www/components/ziliao/mixin/index';

export default {
    components: {
        HotCoursesList,
        Pagination,
        Card,
        InformationEmpty,
        ZiLiaoSubject,
        SelectProjectSection,
    },
    layout: 'new-default',
    mixins: [Mixin],
    data() {
        return {
            listType: 'all', // all资料列表 my我的资料列表
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
                pages: 0,
            },
            informationList: [], //资料列表
            isLoading: false,
            isFinished: true,
            keywords: '',
            projectInfo: {
                projectId: '',
                projectSeoCode: '',
            },
            catalogList: [],
            acCode: {
                banner: 'YLWEB_ZLLB01',
                right: 'YLWEB_ZLTD',
            },
            isSearchActive: true,
            emptyType: 'search',
            informationType: '',
            searchCollege: null,
            searchProject: null,
            searchSubject: null,
            defCollegeId: '',
            defProjectId: '',
            defPtagId: '',
            defSubjectId: '',
            defCollegeSeoCode: '',
            defProjectSeoCode: '',
            defSubjectSeoCode: '',
        };
    },
    computed: {
        isShowSubject() {
            return this.searchProject && this.searchProject.projectId;
        },
    },
    watch: {
        informationType() {
            this.refreshPage();
        },
        keywords() {
            this.replaceUrl();
        },
    },
    mounted() {
        const keywords = this.$route.params.keywords || this.$route.query.keywords || '';
        const projectSeoCode = this.$route.query.projectSeoCode || this.$route.params.projectSeoCode || '';
        const collegeId = this.$route.query.collegeId || this.$route.params.collegeId || '';
        const projectId = this.$route.query.projectId || this.$route.params.projectId || '';
        const ptagId = this.$route.query.ptagId || this.$route.params.ptagId || '';
        const subjectId = this.$route.query.subjectId || this.$route.params.subjectId || '';
        const collegeSeoCode = this.$route.query.collegeSeoCode || this.$route.params.collegeSeoCode || '';
        const subjectSeoCode = this.$route.query.subjectSeoCode || this.$route.params.subjectSeoCode || '';

        if (this.searchCollege?.collegeSeoCode) {
            u += `&collegeSeoCode=${this.searchCollege.collegeSeoCode}`;
        }
        if (this.project?.projectType === 'child') {
            u += `&ptagId=${this.searchProject.ptagId}`;
        } else if (this.searchProject?.projectSeoCode) {
            u += `&projectSeoCode=${this.searchProject.projectSeoCode}`;
        }
        if (this.searchSubject?.subjectSeocode) {
            u += `&subjectSeocode=${this.searchSubject.projectSeoCode}`;
        }

        this.keywords = keywords;
        this.projectInfo.projectSeoCode = projectSeoCode;
        this.defCollegeId = collegeId;
        this.defProjectId = projectId;
        this.defPtagId = ptagId;
        this.defSubjectId = subjectId;
        this.defCollegeSeoCode = collegeSeoCode;
        this.defProjectSeoCode = projectSeoCode;
        this.defSubjectSeoCode = subjectSeoCode;

        this.getProjectWebInfo().then(() => {
            this.refreshPage();
        });
    },
    head() {
        return this.$head({
            title: `${this.keywords ? this.keywords + '_' : ''}优路教育资料`,
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
    methods: {
        refreshPage() {
            this.page = {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
                pages: 0,
            };
            this.searchDocList();
        },
        handleSearch() {
            this.refreshPage();
        },
        searchDocList() {
            if (this.keywords.length <= 0) {
                return this.$baseUI.alert('请输入搜索关键词');
            }
            this.isLoading = true;
            this.emptyType = 'searchLoading';
            const params = {
                searchKey: this.keywords,
                clientType: 'W',
                pageIndex: (this.page.pageIndex - 1) * this.page.pageSize,
                pageSize: this.page.pageSize,
                docPackstatus: this.informationType,
            };
            if (this.searchCollege) {
                params.collegeId = this.searchCollege.collegeId;
            } else if (this.defCollegeId) {
                params.collegeId = this.defCollegeId;
            }

            if (this.searchProject) {
                if (this.searchProject.projectType === 'child') {
                    params.ptagId = this.searchProject.ptagId;
                } else {
                    params.projectId = this.searchProject.projectId;
                }
            } else if (this.defProjectId) {
                params.projectId = this.defProjectId;
            } else if (this.defPtagId) {
                params.ptagId = this.defPtagId;
            }

            if (this.searchSubject) {
                params.subjectId = this.searchSubject.subjectId;
            } else if (this.defSubjectId) {
                params.subjectId = this.defSubjectId;
            }
            this.$callApi('dc/search-doc-list', params)
                .then((res) => res.getData())
                .then(({ data = [], count = 0, systemTime = Date.now() }) => {
                    this.page.pageCount = count;
                    data.forEach((item) => {
                        item.docName = item.docName.replaceAll('<em>', `<em style='color: #FF2E30;font-style: normal;font-weight: bold;'>`);
                        item.systemTime = systemTime;
                        item.projectSeoCode = this.projectInfo.projectSeoCode || 'all';
                        item.docAvlstatus = 'Y';
                    });
                    this.informationList.splice(0, this.informationList.length, ...data);
                    this.trackWebYouluInformationToSearch({
                        keyword_name: this.keywords,
                        search_result: count,
                    });
                })
                .catch((err) => {
                    console.warn(err);
                    this.$niceloo.api.handleFailure(err);
                    this.informationList.splice(0, this.informationList.length);
                    this.page.pageCount = 0;
                })
                .finally(() => {
                    this.isLoading = false;
                    this.emptyType = 'search';
                });
        },
        getProjectWebInfo() {
            if (!this.projectInfo.projectSeoCode) {
                return Promise.resolve();
            }
            return this.$callApi('ctc/query-project-detail', {
                projectSeoCode: this.projectInfo.projectSeoCode,
            })
                .then((res) => {
                    Object.assign(this.projectInfo, res.getData());
                })
                .catch((err) => {
                    console.warn(err);
                    this.$niceloo.api.handleFailure(err);
                });
        },
        pageChange(num) {
            this.page.pageIndex = num;
            this.searchDocList();
        },
        onCollegeChange(college) {
            this.searchCollege = college;
            this.replaceUrl();
        },
        onProjectChange(project) {
            console.warn('onProjectChange');
            this.searchProject = project;
            this.searchSubject = {
                subjectId: '',
            };
            if (!this.searchProject.projectId) {
                this.refreshPage();
            }
            this.replaceUrl();
        },
        onZiLiaoSubjectChange(subject) {
            console.warn('onZiLiaoSubjectChange');
            this.searchSubject = subject;
            this.refreshPage();
            this.replaceUrl();
        },
        replaceUrl() {
            let u = `${location.pathname}?keywords=${this.keywords}`;
            if (this.searchCollege?.collegeSeoCode) {
                u += `&collegeSeoCode=${this.searchCollege.collegeSeoCode}`;
            }
            if (this.project?.projectType === 'child') {
                u += `&ptagId=${this.searchProject.ptagId}`;
            } else if (this.searchProject?.projectSeoCode) {
                u += `&projectSeoCode=${this.searchProject.projectSeoCode}`;
            }
            if (this.searchSubject?.subjectSeocode) {
                u += `&subjectSeoCode=${this.searchSubject.subjectSeocode}`;
            }
            window.history.replaceState(null, null, u);
        },
    },
};
