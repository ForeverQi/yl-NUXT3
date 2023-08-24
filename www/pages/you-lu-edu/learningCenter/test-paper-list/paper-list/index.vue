<script lang="jsx">
import { mapState, mapMutations } from 'vuex';
import '@/api/cc/api.CC3101.query-my-class-stat.js';
import '@/api/cc/api..query-class-modules.js';
import '@/api/cc/api..query-class-paper-moduls.js';
import '@/api/cc/api..query-class-extend-status.js';
import '@/api/cc/api..query-class-paper-subjects.js';
import '@/api/cc/api.CC3034.cc-playrd-batch-add.js';
// import QuestionLabel from './components/question-label';
import SpecialQuestionBrush from '@/www/pages/you-lu-edu/exam/exam-list/components/special-question-brush';
import wronglyAnsweredList from '@/www/pages/you-lu-edu/learningCenter/wrongly-answered-list/index.vue';
import collectedList from '@/www/pages/you-lu-edu/learningCenter/collected-list/index.vue';
import SubjectView from '@/www/components/learningCenter/course-list/subject-view';
import CourseTabView from '@/www/components/learningCenter/course-list/course-tab-view';
import ModuleView from '@/www/components/learningCenter/course-list/module-view';
import SideToolsView from '@/www/components/learningCenter/course-list/side-tools-view';
import EmptyView from '@/www/components/learningCenter/course-list/empty-view';
import SideFixedSection from '@/www/components/components/side-fixed-section';
import SpecialHeader from '@/www/pages/you-lu-edu/learningCenter/test-paper-list/components/special-header.vue';
export default {
    name: 'PracticeMuster',
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            classId: this.$route.params.classId,
            ctapId: this.$route.query.ctapId,
            tabIndex: 0,
            modulesList: [],
            moduleStatistics: {},

            electivePromise: null,
            electiveResolve: null,

            loadingIntance: null,
            jurisdiction: true,
            // 0：加载中，1：加载成功，2：加载成功无数据，3：接口报错
            pageStatus: 0, // 加载状态
            crumbs: [],
            activeStatus: 0,
            loading: false,
            showSubject: false,
        };
    },
    computed: {
        ...mapState('class-info/subject', {
            subjectId: 'currentSubjectId',
        }),
        ...mapState('class-info/info', {
            classTypeId: 'classTypeId', // 班型ID
            projectId: 'projectId', // 项目ID
            pypId: 'pypId', // 考期
            electiveShowStatus: 'electiveShowStatus',
            showStatus: 'showStatus', // 显示状态，0：全部，1：未学完，2：已学完
        }),
        ...mapState('class-info/practice-muster', {
            subjectList: 'subjectList', // 班级ID
        }),
    },
    watch: {
        /**
         *
         * @param {string} value questionUniquecode
         */
        '$route.params.questionUniquecode'(value) {
            this.$nextTick(() => {
                const specialQuestionCrumbs = sessionStorage.getItem('specialQuestionCrumbs');
                if (specialQuestionCrumbs) {
                    this.crumbs = JSON.parse(specialQuestionCrumbs);
                }
                this.showSubject = true;
                this.getAuthority();
                this.setActiveStatus(value);
                if (value === 'KNCS') {
                    this.classTesting();
                }
            });
        },
        /**
         *
         * @param {string} value baseSubjectId 项目id
         */
        '$route.query.baseSubjectId'(value) {
            this.$nextTick(() => {
                const specialQuestionCrumbs = sessionStorage.getItem('specialQuestionCrumbs');
                if (specialQuestionCrumbs) {
                    this.crumbs = JSON.parse(specialQuestionCrumbs);
                }
                this.showSubject = true;
                this.getAuthority();
                this.setActiveStatus(this.$route.params.questionUniquecode);
            });
        },
    },
    /**
     *
     */
    mounted() {
        this.setClassInfo({ classId: this.$route.params.classId, ctapId: this.$route.query.ctapId, showType: 'practice' });
        document.title = '全部学习任务-我的课程-学习中心-优路教育';
        sessionStorage.removeItem('specialQuestionCrumbs');
        this.setElectivePromise();
        this.upListenRecord();
        this.init();
        this.classTesting();
    },
    methods: {
        ...mapMutations('class-info/info', {
            setClassInfo: 'setClassInfo',
        }),
        ...mapMutations('class-info/practice-muster', {
            setSubjectList: 'setSubjectList',
        }),
        /**
         *
         * @param {string} value KNCS:课内测试；ZXTK:专属题库；AICTB:AI错题本;CTSCJ:试题收藏夹
         */
        setActiveStatus(value) {
            switch (value) {
                case 'KNCS':
                    this.showSubject = true;
                    this.activeStatus = 1;
                    break;
                case 'ZXTK':
                    this.activeStatus = 2;
                    break;
                case 'AICTB':
                    this.activeStatus = 3;
                    break;
                case 'CTSCJ':
                    this.activeStatus = 4;
                    break;
            }
        },
        /**
         *
         */
        upListenRecord() {
            try {
                ylPlugin.login.getUser().then((userInfo) => {
                    if (!userInfo || !userInfo.userId) {
                        return;
                    }
                    let params = this.$storage.get(userInfo.userId + 'cc/playrd/batch/add');
                    if (params) {
                        return this.$callApi('cc/cc-playrd-batch-add', {
                            ...params,
                        }).catch((err) => {
                            this.$niceloo.api.handleFailure(err);
                            return Promise.reject(err);
                        });
                    }
                    this.$storage.set(userInfo.userId + 'cc/playrd/batch/add', null);
                });
            } catch (e) {}
        },
        /**
         *
         */
        init() {
            this.getClassInfo().then(() => {
                // 获取科目列表
                this.getSubjectList();
            });
        },
        /**
         * 初始化面包屑导航基础数据
         *
         * @returns {Array} 初始数据
         */
        initCrumbs() {
            let crumbs = [
                {
                    name: '学习中心',
                    href: '/learningCenter/index/myCourse',
                },
                {
                    name: '我的课程',
                    href: '/learningCenter/index/myCourse',
                },
                {
                    name: '系统课',
                    href: '/learningCenter/index/myCourse',
                },
            ];
            return crumbs;
        },
        /**
         * @returns {Promise} promise
         */
        getSubjectList() {
            const params = {
                url: 'cc/query-class-paper-subjects',
                params: {
                    classId: this.classId,
                },
                isCustom: false,
            };
            return this.httpClient(params).then((rs) => {
                this.setSubjectList(rs);
                this.showSubject = true;
                this.setActiveStatus(this.$route.params.questionUniquecode);
            });
        },
        /**
         * @returns {Promise} promise
         */
        getClassInfo() {
            const params = {
                url: 'cc/query-my-class-stat',
                params: {
                    classIds: this.classId,
                },
                isCustom: false,
            };
            return this.httpClient(params)
                .then((res) => {
                    // this.initCrumbs();
                    if (Array.isArray(res.data) && res.data.length > 0) {
                        const classInfo = res.data[0];
                        let originCrumbs = this.initCrumbs();
                        const newCrumbs = [
                            {
                                name: classInfo.className,
                                href: `/learningCenter/allTask/${this.classId}?ctapId=${this.$route.query.ctapId}`,
                            },
                            {
                                name: '我的题库',
                                href: '#',
                            },
                        ];
                        originCrumbs = originCrumbs.concat(newCrumbs);
                        sessionStorage.setItem('specialQuestionCrumbs', JSON.stringify(originCrumbs));
                        this.crumbs = originCrumbs;
                        this.setClassInfo({
                            ucsCompulsoryRate: classInfo.ucsCompulsoryRate,
                            projectId: classInfo.projectId,
                            className: classInfo.className,
                            pypId: classInfo.pypId,
                        });
                        this.jurisdiction = true;
                    } else {
                        this.jurisdiction = false;
                        // 没有权限关闭加载遮罩
                        this.pageStatus = 2;
                        return Promise.reject(false);
                    }
                })
                .catch((err) => {
                    if (err !== false) {
                        this.pageStatus = 3;
                    }
                    return Promise.reject();
                });
        },
        /**
         * 获取查看权限
         */
        getAuthority() {
            const params = {
                url: 'cc/query-my-class-stat',
                params: {
                    classIds: this.classId,
                },
                isCustom: false,
            };
            this.httpClient(params)
                .then((res) => {
                    if (Array.isArray(res.data) && res.data.length > 0) {
                        this.jurisdiction = true;
                    } else {
                        this.jurisdiction = false;
                        // 没有权限关闭加载遮罩
                        this.pageStatus = 2;
                    }
                })
                .catch((err) => {
                    if (err !== false) {
                        this.pageStatus = 3;
                    }
                });
        },
        /**
         * 切换科目的回调函数
         *
         * @param {string} type 区分是初始化加载调用还是点击科目调用，点击科目调用值为'click'
         * @returns {boolean} false 中断程序运行
         */
        changeSubject(type) {
            this.pageStatus = 0;
            let url = '';
            const urlLeft = `/learningCenter/test-paper-list/questionBank`;
            const urlRight = `?baseSubjectId=${this.subjectId}&ctapId=${this.$route.query.ctapId}&projectCode=${this.$route.query.projectCode}&questionBankStatus=special`;
            const studyStatus = this.subjectList.find((item) => item.studyStatus === 'Y');
            const studyStatus2 = this.$route.query.baseSubjectId;
            // 禁止重复点击科目
            if (studyStatus.subjectId === studyStatus2) return false;
            switch (this.activeStatus) {
                case 1:
                    if (type === 'click') {
                        this.activeStatus = 0;
                        url = `${urlLeft}/KNCS/${this.classId}${urlRight}`;
                        this.$router.replace(url);
                    }
                    this.$nextTick(() => {
                        this.classTesting();
                    });
                    break;
                case 2:
                    if (type === 'click') {
                        this.activeStatus = 0;
                        url = `${urlLeft}/ZXTK/${this.classId}${urlRight}`;
                        this.$router.replace(url);
                    }
                    break;
                case 3:
                    if (type === 'click') {
                        this.activeStatus = 0;
                        url = `${urlLeft}/AICTB/${this.classId}${urlRight}`;
                        this.$router.replace(url);
                    }
                    break;
                case 4:
                    if (type === 'click') {
                        this.activeStatus = 0;
                        url = `${urlLeft}/CTSCJ/${this.classId}${urlRight}`;
                        this.$router.replace(url);
                    }
                    break;
            }
        },
        /**
         * 课内测试数据获取
         */
        classTesting() {
            if (!this.electivePromise) {
                this.setElectivePromise();
            }
            // 科目变动 获取模块ID
            this.electivePromise
                .then(() => {
                    this.getModulesList()
                        .then(() => {
                            this.loading = false;
                            if (this.modulesList.length === 0) {
                                this.pageStatus = 2;
                            } else {
                                this.pageStatus = 1;
                            }
                        })
                        .catch(() => {
                            this.pageStatus = 3;
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /**
         * 将模块数据返回一个promise
         */
        setElectivePromise() {
            this.electivePromise = new Promise((resolve, reject) => {
                this.electiveResolve = resolve;
            });
        },
        /**
         * 获取课内测试列表数据
         *
         * @returns {Promise} promise
         */
        getModulesList() {
            this.loading = true;
            const params = {
                url: 'cc/query-class-paper-moduls',
                params: {
                    classId: this.classId,
                    subjectId: this.subjectId,
                },
                isCustom: false,
            };
            return this.httpClient(params)
                .then((res) => {
                    this.loading = false;
                    this.modulesList = [];
                    this.$nextTick(() => {
                        this.modulesList = res.map((r, index) => {
                            if (index === 0) {
                                r.studyStatus = 'Y';
                            } else {
                                r.studyStatus = 'N';
                            }
                            return r;
                        });
                    });
                })
                .catch(() => {
                    this.loading = false;
                });
        },
        /**
         *
         * @param {object} root0 参数
         * @param {string} root0.url url
         * @param {object} root0.params params
         * @param {boolean} root0.isCustom isCustom
         * @returns {Promise} promise
         */
        httpClient({ url, params = {}, isCustom = false }) {
            return new Promise((resolve, reject) => {
                this.$callApi(url, {
                    ...params,
                    /**
                     *
                     * @param {object} data data
                     */
                    onsuccess(data) {
                        resolve(data);
                    },
                    onerror: (err) => {
                        if (!isCustom) {
                            this.$niceloo.api.handleFailure(err);
                        }

                        return reject(err);
                    },
                });
            });
        },
    },
    /**
     *  @returns {function()} render
     */
    render() {
        return (
            <div class="all-task">
                <SideFixedSection page-show={true} project-id={this.projectId} />
                {/*
                    没有权限时显示空白
                    1、判断有没有权限
                    1.1、权限判断接口报错
                    1.2、没有权限
                    2、获取模块
                    2.1、获取模块接口报错
                    2.2、获取模块接口返回空
                */}
                {this.jurisdiction === false && (
                    <div class="wrap power">
                        {this.pageStatus === 2 && <EmptyView type="auth" txt="暂无权限" height="500px" />}
                        {this.pageStatus === 3 && <EmptyView type="error" txt="内容加载失败，请刷新页面" height="500px" />}
                    </div>
                )}
                {this.jurisdiction === true && (
                    <div class="wrap">
                        <div class="breadcumb-section">
                            {/* 面包屑导航 */}
                            <YlBreadcumb items={this.crumbs} />
                        </div>
                        <div class="main-section">
                            <div class="course-section">
                                <div class="subject-section">
                                    {this.showSubject === true && <SubjectView classId={this.classId} onChangeItem={this.changeSubject} />}
                                </div>
                                <div class="course-list">
                                    {/* 课内测试、专属题库、AI错题本、试题收藏夹 tab切换 */}
                                    <SpecialHeader
                                        classId={this.classId}
                                        activeStatus={this.activeStatus}
                                        onChangeHeader={(e) => {
                                            this.activeStatus = e;
                                        }}
                                    />
                                    {/* 课内测试 */}
                                    {this.activeStatus === 1 && (
                                        <div class="course-list-box" v-loading={this.loading}>
                                            <div class="tab-list" style="display: none;">
                                                <CourseTabView
                                                    selectIndex={this.tabIndex}
                                                    onChangeIndex={(res) => {
                                                        this.setClassInfo({ showStatus: res.index });
                                                        this.tabIndex = res.index;
                                                    }}
                                                    onReady={() => {
                                                        this.electiveResolve();
                                                    }}
                                                    classId={this.classId}
                                                />
                                            </div>
                                            {this.pageStatus === 2 && <EmptyView type="empty" txt="暂无课程" height="400px" />}
                                            {this.pageStatus === 3 && <EmptyView type="empty" txt="内容加载失败，请刷新页面" height="400px" />}
                                            {this.modulesList.length > 0 && (
                                                <div class="course-content">
                                                    {this.modulesList.map((r) => {
                                                        return <ModuleView key={r.moduleId} moduleData={r} />;
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {/* 专属题库 */}
                                    {this.activeStatus === 2 && (
                                        <div class="exclusive-question_bank">
                                            <SpecialQuestionBrush
                                                crumbs={this.crumbs}
                                                questionBankNum={2}
                                                classId={this.classId}
                                                ref="questionBankRef"
                                                onApiCallBack={() => {
                                                    this.pageStatus = 1;
                                                }}
                                            />
                                        </div>
                                    )}
                                    {/* AI错题本 */}
                                    {this.activeStatus === 3 && (
                                        <div class="wrong-answer">
                                            <wronglyAnsweredList
                                                ref="questionAICTB"
                                                onApiCallBack={() => {
                                                    this.pageStatus = 1;
                                                }}
                                            />
                                        </div>
                                    )}
                                    {/* 试题收藏夹 */}
                                    {this.activeStatus === 4 && (
                                        <div class="collected-list">
                                            <collectedList
                                                ref="questionCTSCJ"
                                                onApiCallBack={() => {
                                                    this.pageStatus = 1;
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div class="side-section">
                                <SideToolsView />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
@import '../asset/css/index.less';
</style>
