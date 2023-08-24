<!-- eslint-disable jsdoc/check-param-names -->
<!--
 * @Author       : zhouqi
 * @description  : 我的题库
 * @Date         : 2023-06-21 10:22:57
 * @LastEditors  : zhouqi
 * @LastEditTime : 2023-07-17 15:09:19
 * @FilePath     : \nuxt\www\pages\you-lu-edu\special-question-brushing\index.vue
-->
<script lang="jsx">
import { mapState, mapMutations } from 'vuex';
import '@/api/cc/api.CC3101.query-my-class-stat.js';
import '@/api/cc/api..query-class-modules.js';
import '@/api/cc/api..query-class-paper-moduls.js';
import '@/api/cc/api..query-class-extend-status.js';
import '@/api/cc/api..query-class-paper-subjects.js';
import '@/api/cc/api.CC3034.cc-playrd-batch-add.js';
import SubjectView from '@/www/components/learningCenter/course-list/subject-view';
import CourseTabView from '@/www/components/learningCenter/course-list/course-tab-view';
import ModuleView from '@/www/components/learningCenter/course-list/module-view';
import SideToolsView from '@/www/components/learningCenter/course-list/side-tools-view';
import EmptyView from '@/www/components/learningCenter/course-list/empty-view';
import SideFixedSection from '@/www/components/components/side-fixed-section';

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
            jurisdiction: false,
            // 0：加载中，1：加载成功，2：加载成功无数据，3：接口报错
            pageStatus: 0, // 加载状态
            crumbs: [
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
            ],
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
    },
    /**
     *
     */
    mounted() {
        this.setClassInfo({ classId: this.$route.params.classId, ctapId: this.$route.query.ctapId, showType: 'practice' });
        document.title = '全部学习任务-我的课程-学习中心-优路教育';
        this.electivePromise = new Promise((resolve, reject) => {
            this.electiveResolve = resolve;
        });
        this.upListenRecord();
        this.init();
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
         *  @returns {Promise} 执行请求
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
            });
        },
        /**
         *  @returns {Promise} 执行请求
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
                    if (Array.isArray(res.data) && res.data.length > 0) {
                        const classInfo = res.data[0];
                        this.crumbs.push({
                            name: classInfo.className,
                            href: '',
                        });
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
                    console.log(err);
                    if (err !== false) {
                        this.pageStatus = 3;
                    }
                    return Promise.reject();
                });
        },
        /**
         *
         */
        changeSubject() {
            this.pageStatus = 0;
            // 科目变动 获取模块ID
            this.electivePromise.then(() => {
                this.getModulesList()
                    .then(() => {
                        if (this.modulesList.length === 0) {
                            this.pageStatus = 2;
                        } else {
                            this.pageStatus = 1;
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        this.pageStatus = 3;
                    });
            });
        },
        /**
         * @returns {Promise} 执行请求
         */
        getModulesList() {
            const params = {
                url: 'cc/query-class-paper-moduls',
                params: {
                    classId: this.classId,
                    subjectId: this.subjectId,
                },
                isCustom: false,
            };
            return this.httpClient(params).then((res) => {
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
            });
        },
        /**
         *
         * @param {string} url  接口地址
         * @param {object} params 接口请求参数
         * @param {boolean}  isCustom false、true
         * @returns {Promise} 执行请求
         */
        httpClient({ url, params = {}, isCustom = false }) {
            return new Promise((resolve, reject) => {
                this.$callApi(url, {
                    ...params,
                    /**
                     *
                     * @param {object} data 数据
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
     *  @returns {object} 数据模型
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
                    <div class="wrap power" v-loading={this.pageStatus === 0} loading-background="transparent">
                        {this.pageStatus === 2 && <EmptyView type="auth" txt="暂无权限" height="500px" />}
                        {this.pageStatus === 3 && <EmptyView type="error" txt="内容加载失败，请刷新页面" height="500px" />}
                    </div>
                )}
                {this.jurisdiction === true && (
                    <div class="wrap" v-loading={this.pageStatus === 0}>
                        <div class="breadcumb-section">
                            <YlBreadcumb items={this.crumbs} />
                        </div>
                        <div class="main-section">
                            <div class="course-section">
                                <div class="subject-section">
                                    <SubjectView
                                        classId={this.classId}
                                        onSubjectError={() => {
                                            this.loadingIntance.close();
                                        }}
                                        onChangeItem={this.changeSubject}
                                    />
                                </div>
                                <div class="course-list">
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
.breadcumb-section {
    padding-bottom: 16px;
}
.power {
    margin-top: 30px;
    min-height: 500px;
}
.main-section {
    display: flex;
    .course-section {
        width: 100%;
        overflow: hidden;
    }
    .side-section {
        flex-shrink: 0;
        margin-left: 24px;
        width: 324px;
    }

    .subject-section {
        height: 62px;
        background: #ffffff;
        border-radius: 8px;
    }

    .course-list {
        padding-top: 16px;
    }

    .course-content {
        border-radius: 8px 8px 0px 0px;
        overflow: hidden;
    }
}
.all-task {
    margin-bottom: 30px;
}
</style>
