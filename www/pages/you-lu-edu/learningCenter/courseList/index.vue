<script lang="jsx">
import { mapState, mapMutations, mapActions } from 'vuex';
import '@/api/cc/api.CC3101.query-my-class-stat.js';
import '@/api/cc/api..query-class-modules.js';
import '@/api/cc/api..query-class-module-extend.js';
import '@/api/cc/api..query-class-extend-status.js';
import '@/api/cc/api..query-module-lock-status.js';
import '@/api/api..check-rural-planner-course.js';
import '@/api/api..query-learn-class-info.js';
import SubjectView from '@/www/components/learningCenter/course-list/subject-view/index.vue';
import CourseTabView from '@/www/components/learningCenter/course-list/course-tab-view/index.vue';
import ModuleView from '@/www/components/learningCenter/course-list/module-view/index.vue';
import SideToolsView from '@/www/components/learningCenter/course-list/side-tools-view/index.vue';
import SideFixedSection from '@/www/components/components/side-fixed-section/index.vue';
import EmptyView from '@/www/components/learningCenter/course-list/empty-view/index.vue';
import '@/api/cc/api.CC3034.cc-playrd-batch-add.js';
export default {
    name: 'CourseList',
    layout: 'new-default',
    data() {
        return {
            classId: this.$route.params.classId,
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
            currentSubject: 'currentSubject',
            subjectId: 'currentSubjectId',
        }),
        ...mapState('class-info/info', {
            classTypeId: 'classTypeId', // 班型ID
            projectId: 'projectId', // 项目ID
            projectName: 'projectName',
            pypId: 'pypId', // 考期
            className: 'className', // 班级名称
            electiveShowStatus: 'electiveShowStatus',
            showStatus: 'showStatus', // 显示状态，0：全部，1：未学完，2：已学完
            ctapId: 'ctapId',
        }),
    },
    watch: {
        electiveShowStatus() {
            if (this.pageStatus !== 0) {
                this.getModulesList().then(() => {
                    this.getModulesExtends();
                    this.getModuleLockExtends();
                });
            }
        },
        projectId: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.getProjectInfo(val).then((res) => {
                        this.setClassInfo({
                            projectName: res.projectName,
                        });
                    });
                }
            },
        },
    },
    beforeDestroy() {
        this.electivePromise = new Promise((resolve, reject) => {
            this.electiveResolve = resolve;
        });
    },
    mounted() {
        let ctapId = this.$route.query.ctapId;
        if (!/^ctap/i.test(ctapId)) {
            ctapId = '';
        }
        this.setClassInfo({ classId: this.$route.params.classId, ctapId });
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
        ...mapActions('class-info/learn-tool', {
            getProjectInfo: 'getProjectInfo',
        }),
        upListenRecord() {
            try {
                ylPlugin.login.getUser().then((userInfo) => {
                    if (!userInfo) {
                        return;
                    }
                    let params = this.$storage.get(userInfo.userId + 'cc/playrd/batch/add');
                    // 判断当前班级是否是第一次进入
                    let key = `${userInfo.userId}${this.$route.params.classId}_module_proposal`;
                    let status = this.$storage.get(key);
                    if (!status) {
                        this.$storage.set(key, 1);
                        this.setClassInfo({ show_module_proposal: true });
                    } else {
                        this.setClassInfo({ show_module_proposal: false });
                    }
                    if (params) {
                        return this.$callApi('cc/cc-playrd-batch-add', {
                            ...params,
                        })
                            .catch(() => {
                                return Promise.resolve();
                            })
                            .then((res) => {
                                console.log('通过getData返回数据');
                                return Promise.resolve();
                            });
                    }
                    this.$storage.set(userInfo.userId + 'cc/playrd/batch/add', null);
                });
            } catch (e) {}
        },
        init() {
            this.getOriginClassInfo();
            this.getClassInfo();
        },
        getOriginClassInfo() {
            const params = {
                url: 'cc/query-learn-class-info',
                params: {
                    classId: this.classId,
                },
                isCustom: true,
            };
            this.$httpClient(params).then((res) => {
                this.crumbs.push({
                    name: res.className,
                    href: '',
                });
                this.setClassInfo({
                    className: res.className,
                });
            });
        },
        getClassInfo() {
            const params = {
                url: 'cc/query-my-class-stat',
                params: {
                    classIds: this.classId,
                },
                isCustom: false,
            };
            return this.$httpClient(params)
                .then((res) => {
                    if (Array.isArray(res.data) && res.data.length > 0) {
                        const classInfo = res.data[0];
                        this.checkRuralPlannerCourse(classInfo.projectId);
                        this.setClassInfo({
                            ucsCompulsoryRate: classInfo.ucsCompulsoryRate ?? '0%',
                            projectId: classInfo.projectId,
                            className: classInfo.className,
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
        checkRuralPlannerCourse(projectId) {
            const data = {
                url: 'cc/check-rural-planner-course',
                params: {
                    projectId, // 项目ID
                },
            };
            return this.$httpClient(data).then((res) => {
                this.setClassInfo({
                    ruralPlanner: res.isUrl, // true：第三方课程进行跳转 false：不进行跳转
                });
            });
        },
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

                        return Promise.all([this.getModuleLockExtends(), this.getModulesExtends()]);
                    })
                    .catch((err) => {
                        console.log('@@#', err);
                        this.pageStatus = 3;
                    });
            });
        },
        getModuleLockExtends() {
            if (this.modulesList.length === 0) {
                return;
            }
            let list = [];
            this.modulesList.forEach((r) => {
                list.push({
                    modulId: r.moduleId,
                    modulName: r.moduleName,
                });
            });
            const params = {
                url: 'cc/query-module-lock-status',
                params: {
                    classId: this.classId,
                    classTypeId: this.classTypeId,
                    moduleInfoList: JSON.stringify(list),
                },
                isCustom: false,
            };
            return this.$httpClient(params).then((res) => {
                if (!Array.isArray(res)) {
                    res = [];
                }
                let map = {};
                res.forEach((r) => {
                    map[r.moduleId] = r;
                });

                this.modulesList.forEach((r) => {
                    let item = map[r.moduleId];
                    if (!item) {
                        return;
                    }
                    Object.keys(item).forEach((k) => {
                        this.$set(r, k, item[k]);
                    });
                });
            });
        },
        getModulesExtends() {
            const params = {
                url: 'cc/query-class-module-extend',
                params: {
                    classId: this.classId,
                    classTypeId: this.classTypeId,
                    ctapId: this.ctapId,
                    pypId: this.pypId,
                    subjectId: this.subjectId,
                    electiveShowStatus: this.electiveShowStatus,
                },
                isCustom: false,
            };
            return this.$httpClient(params)
                .then((res) => {
                    this.moduleStatistics = {};
                    if (!Array.isArray(res)) {
                        res = [];
                    }
                    res.forEach((r) => {
                        this.moduleStatistics[r.moduleId] = r;
                    });
                })
                .then(() => {
                    this.modulesList.forEach((r) => {
                        let item = this.moduleStatistics[r.moduleId];
                        if (!item) {
                            return;
                        }
                        Object.keys(item).forEach((k) => {
                            this.$set(r, k, item[k]);
                        });
                    });
                });
        },
        getModulesList() {
            const params = {
                url: 'cc/query-class-modules',
                params: {
                    classId: this.classId,
                    classTypeId: this.classTypeId,
                    ctapId: this.ctapId,
                    subjectId: this.currentSubject.subjectId,
                    electiveShowStatus: this.electiveShowStatus,
                },
                isCustom: false,
            };
            return this.$httpClient(params).then((res) => {
                this.modulesList.length = 0;
                this.$nextTick(() => {
                    if (!Array.isArray(res)) {
                        res = [];
                    }
                    this.modulesList = res;
                });
            });
        },
    },
    render() {
        return (
            <div class="all-task">
                <SideFixedSection page-show={true} project-id={this.projectId} />
                {/* 没有权限时显示空白 */}
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
                                            this.pageStatus = 3;
                                        }}
                                        onChangeItem={this.changeSubject}
                                    />
                                </div>
                                {this.pageStatus === 2 && <EmptyView type="empty" txt="暂无课程" height="400px" />}
                                {this.pageStatus === 3 && <EmptyView type="error" txt="内容加载失败，请刷新页面" height="400px" />}
                                <div class="course-list" style={{ visibility: this.modulesList.length > 0 ? '' : 'hidden' }}>
                                    <div class="tab-list">
                                        <CourseTabView
                                            selectIndex={this.tabIndex}
                                            onChangeIndex={(res) => {
                                                this.setClassInfo({ showStatus: res.index });
                                                this.tabIndex = res.index;
                                                const data = {
                                                    college_name: '',
                                                    page_name: '学习中心-课程详情',
                                                    class_name: this.className,
                                                    subject_name: this.currentSubject.subjectName,
                                                    button_name: res.name,
                                                    project_name: this.projectName ? this.projectName : this.projectId,
                                                };
                                                this.$yiguan.learningCenter('web_learning_center_courselist_switch', data);
                                            }}
                                            onReady={() => {
                                                this.electiveResolve();
                                            }}
                                            classId={this.classId}
                                        />
                                    </div>
                                    {this.modulesList.length > 0 && (
                                        <div class="course-content">
                                            {this.modulesList.map((r) => {
                                                return <ModuleView key={`${this.subjectId}${r.moduleId}`} moduleData={r} />;
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
    }
}
.all-task {
    margin: 0 auto;
    width: 1200px;
    margin-bottom: 30px;
}
</style>
