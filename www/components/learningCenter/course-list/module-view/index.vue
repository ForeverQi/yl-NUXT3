<script>
import { parse } from 'html5parser';
import { mapState, mapActions, mapMutations } from 'vuex';
import '@/api/cc/api..query-class-courses.js';
import '@/api/cc/api..query-class-course-extend.js';
import '@/api/cc/api..query-class-paper-courses.js';
import CourseView from './components/course-view/index.vue';
export default {
    name: 'ModuleView',
    components: {
        vFragment: {
            functional: true,
            render(h, context) {
                const slots = context.slots();
                return Object.keys(slots).map((k) => {
                    return slots[k];
                });
            },
        },
    },
    props: {
        moduleData: {
            type: Object,
            default() {
                return {
                    moduleStudyAdvice: '',
                };
            },
        },
    },
    data() {
        return {
            dataReady: false, // 课程是否已加载，默认未加载
            dataExtendReady: false, // 课程扩展信息是否已加载，默认未加载
            isShow: false,
            isIntroShow: true,
            courseList: [],
            courseExtendsMap: {},
            wisdomStatus: 'N',
            interactionStatus: 'N',
        };
    },
    computed: {
        ...mapState('class-info/subject', {
            subjectId: 'currentSubjectId',
        }),
        ...mapState('class-info/info', {
            classId: 'classId', // 班级ID
            classTypeId: 'classTypeId', // 班型ID
            projectId: 'projectId', // 项目ID
            projectName: 'projectName',
            ctapId: 'ctapId', // 期次
            pypId: 'pypId',
            electiveShowStatus: 'electiveShowStatus',
            showStatus: 'showStatus', // 显示状态，0：全部，1：未学完，2：已学完
            showType: 'showType',
            show_module_proposal: 'show_module_proposal',
        }),
        learnedCoursewareCount() {
            let num = Number(this.moduleData.learnedCoursewareCount);
            if (isNaN(num)) {
                return 0;
            }

            return num;
        },
        totalCoursewareCount() {
            let num = Number(this.moduleData.totalCoursewareCount);
            if (isNaN(num)) {
                return 0;
            }

            return num;
        },
        learnedHour() {
            if (!this.moduleData.learnedTime || this.moduleData.learnedTime <= 0) {
                return `0小时`;
            }
            let second = this.moduleData.learnedTime % 60;
            let minute = 0;
            let hour = 0;
            if (this.moduleData.learnedTime > 3600) {
                minute = Math.floor((this.moduleData.learnedTime / 60) % 60);
                hour = Math.floor(this.moduleData.learnedTime / 3600);
                return `${hour}小时${minute}分${second}秒`;
            } else {
                minute = Math.floor(this.moduleData.learnedTime / 60);
                return `${minute}分${second}秒`;
            }
        },
    },
    watch: {
        electiveShowStatus() {
            if (this.dataExtendReady === true) {
                this.dataExtendReady = false;
                this.getCourseExtends();
            }
        },
        show_module_proposal: {
            immediate: true,
            handler() {
                this.isIntroShow = this.show_module_proposal;
            },
        },
        showStatus() {
            if (this.showType === 'practice') {
                this.paperCourseList({ moduleId: this.moduleData.moduleId, showType: this.showStatus }).then((list) => {
                    this.courseList = list;
                });
            }
        },
        [`moduleData.lockedStatus`]() {
            this.courseList = this.courseList.map((r) => {
                r.lockedStatus = this.moduleData.lockedStatus;
                r.lockedTip = this.moduleData.lockedTip;

                return r;
            });
        },
    },
    mounted() {
        if (this.moduleData.studyStatus === 'Y') {
            this.changeStatus();
        }
    },
    methods: {
        ...mapActions('class-info/practice-muster', {
            paperCourseList: 'getCourse',
        }),
        ...mapMutations('class-info/practice-muster', {
            setCourseTree: 'setCourseTree',
        }),
        changePaperStatus() {
            this.getPaperCourseData();
        },
        changeStatus() {
            this.isShow = !this.isShow;
            if (this.showType === 'practice') {
                this.changePaperStatus();
                return;
            }
            if (this.dataReady === false || this.dataExtendReady === false) {
                this.getClassExtend().then(() => {
                    this.getCourseData();
                });
            }
        },
        getPaperCourseData() {
            const params = {
                url: 'cc/query-class-paper-courses',
                params: {
                    classId: this.classId,
                    subjectId: this.subjectId,
                    moduleId: this.moduleData.moduleId,
                    coursewareIds: this.moduleData.coursewareIds,
                },
                isCustom: false,
            };
            return this.httpClient(params).then((res) => {
                this.setCourseTree({
                    list: res,
                    moduleId: this.moduleData.moduleId,
                });

                this.paperCourseList({ moduleId: this.moduleData.moduleId, showType: this.showStatus }).then((list) => {
                    this.courseList = list;
                });
            });
        },
        getClassExtend() {
            const params = {
                url: 'cc/query-class-extend-status',
                params: {
                    pypId: this.pypId,
                    subjectId: this.subjectId,
                    moduleId: this.moduleData.moduleId,
                },
                isCustom: false,
            };
            return this.httpClient(params)
                .then((rs) => {
                    this.wisdomStatus = rs.wisdomStatus;
                    this.interactionStatus = rs.interactionStatus;
                })
                .catch(() => {
                    return Promise.resolve();
                });
        },
        getCourseData() {
            this.getCourseList().then(() => {
                this.dataReady = true;
                return this.getCourseExtends();
            });
        },
        getCourseList() {
            if (this.dataReady === true) {
                // 防止扩展接口请求报错，再次点开的时候仍然处理会请求扩展接口
                return Promise.resolve();
            }
            // 获取课程列表
            const data = {
                url: 'cc/query-class-courses',
                params: {
                    classId: this.classId,
                    classTypeId: this.classTypeId,
                    ctapId: this.ctapId,
                    subjectId: this.subjectId,
                    electiveShowStatus: this.electiveShowStatus,
                    moduleId: this.moduleData.moduleId,
                },
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                res.forEach((r) => {
                    r.moduleId = this.moduleData.moduleId;

                    r.wisdomStatus = this.wisdomStatus;
                    r.interactionStatus = this.interactionStatus;

                    r.lockedStatus = this.moduleData.lockedStatus;
                    r.lockedTip = this.moduleData.lockedTip;
                });
                this.courseList = res;
            });
        },
        getCourseExtends() {
            if (this.dataExtendReady) {
                // 防止异步情况重复请求接口
                return Promise.resolve();
            }
            // 和获取课程扩展接口
            const data = {
                url: 'cc/query-class-course-extend',
                params: {
                    classId: this.classId,
                    classTypeId: this.classTypeId,
                    ctapId: this.ctapId,
                    subjectId: this.subjectId,
                    electiveShowStatus: this.electiveShowStatus,
                    moduleId: this.moduleData.moduleId,
                    pypId: this.pypId,
                },
                isCustom: false,
            };
            return this.httpClient(data)
                .then((res) => {
                    this.courseExtendsMap = [];
                    if (!Array.isArray(res)) {
                        res = [];
                    }
                    res.forEach((r) => {
                        this.courseExtendsMap[r.courseId] = r;
                    });
                })
                .then(() => {
                    this.courseList.forEach((r) => {
                        let item = this.courseExtendsMap[r.courseId];
                        if (!item) {
                            this.$set(r, 'learnedTime', null);
                            this.$set(r, 'totalCoursewareCount', null);
                            this.$set(r, 'learnedCoursewareCount', null);
                            return;
                        }
                        Object.keys(item).forEach((k) => {
                            this.$set(r, k, item[k]);
                        });
                    });
                    this.dataExtendReady = true;
                });
        },
        httpClient({ url, params = {}, isCustom = false }) {
            return this.$callApi(url, {
                ...params,
            }).then(
                (res) => {
                    return res.getData();
                },
                (err) => {
                    if (!isCustom) this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                }
            );
        },
    },
    render() {
        let html = '';
        if (this.moduleData.moduleStudyAdvice) {
            let nodeArr = parse(this.moduleData.moduleStudyAdvice);
            html = this.$html5parserUtil.rewriteHTML(nodeArr);
        }
        let showLearnedCoursewareCount = this.learnedCoursewareCount;
        if (showLearnedCoursewareCount > this.totalCoursewareCount) {
            showLearnedCoursewareCount = this.totalCoursewareCount;
        }
        const showRightHtml = () => {
            if (this.totalCoursewareCount === 0 && this.moduleData.moduleUpdateTimeDesc) {
                // 任务为0 ，并且有提示时展示
                return this.moduleData.moduleUpdateTimeDesc;
            } else if (this.totalCoursewareCount === 0 && !this.moduleData.moduleUpdateTimeDesc) {
                return '';
            }
            return (
                <vFragment>
                    <div class="progress">
                        {this.learnedCoursewareCount === 0 && <img class="img" src={require('./asset/images/5.png')} />}
                        {this.learnedCoursewareCount > 0 && this.learnedCoursewareCount !== this.totalCoursewareCount && (
                            <img class="img" src={require('./asset/images/11.png')} />
                        )}
                        {this.learnedCoursewareCount === this.totalCoursewareCount && this.totalCoursewareCount > 0 && (
                            <img class="img" src={require('./asset/images/13.png')} />
                        )}
                    </div>
                    已学完{showLearnedCoursewareCount}/{this.totalCoursewareCount}个任务，已学习{this.learnedHour}
                </vFragment>
            );
        };
        return (
            <div class="module-wrap">
                <div class="title-wrap">
                    <div class="title" onClick={this.changeStatus}>
                        <div class="title-content">
                            <div class="left">
                                <div class="name">
                                    <span class="txt">{this.moduleData.moduleName}</span>
                                    <img
                                        style={{ display: this.moduleData.lockedStatus === 'Y' ? '' : 'none' }}
                                        src={require('./asset/images/lock.png')}
                                        class="lock"
                                    />
                                </div>
                            </div>
                            <div class="right">
                                {this.showType === 'class' && showRightHtml()}

                                <div class="status-img">
                                    {this.isShow ? (
                                        <img class="img" src={require('./asset/images/up.png')} />
                                    ) : (
                                        <img class="img" src={require('./asset/images/down.png')} />
                                    )}
                                </div>
                            </div>
                        </div>
                        {this.moduleData.lockedStatus === 'Y' && <div class="tip">{this.moduleData.lockedTip}</div>}
                    </div>
                    {html && (
                        <div class="intro" style={!this.isShow ? 'display: none' : ''}>
                            <div
                                class={{ 'status-txt': true, hidden: !this.isIntroShow }}
                                onClick={() => {
                                    const data = {
                                        college_name: '',
                                        page_name: '学习中心-课程详情',
                                        project_name: this.projectName ? this.projectName : this.projectId,
                                    };
                                    this.$yiguan.learningCenter('web_learning_center_hide_suggest', data);
                                    this.isIntroShow = !this.isIntroShow;
                                }}
                            >
                                {this.isIntroShow === true ? `隐藏学习建议` : `显示学习建议`}
                            </div>
                            {this.isIntroShow && <div class="more-txt" domPropsInnerHTML={html}></div>}
                        </div>
                    )}
                </div>
                <div class="content" style={!this.isShow ? 'display: none' : ''}>
                    {this.courseList.map((item) => {
                        let style = { display: 'none' };
                        if (this.showStatus === 1 && item.totalCoursewareCount !== item.learnedCoursewareCount && item.totalCoursewareCount > 0) {
                            style = {};
                        } else if (this.showStatus === 2 && item.learnedCoursewareCount > 0 && item.totalCoursewareCount > 0) {
                            style = {};
                        } else if (this.showStatus === 0) {
                            style = {};
                        }
                        if (this.showType === 'practice') {
                            style = {};
                        }
                        if (this.electiveShowStatus === 'N' && item.courseElectiveStatus === 'Y') {
                            style = { display: 'none' };
                        }
                        return <CourseView courseData={item} style={style} />;
                    })}
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.more-txt {
    padding-top: 30px;
    /deep/ img {
        width: 100%;
        max-height: 500px;
    }
}
.module-wrap {
    background-color: #fff;
    .title-wrap {
        cursor: pointer;
        padding: 0 30px;
        border-bottom: 1px solid #f1f3f5;
    }
    .intro {
        min-height: 44px;
        position: relative;
        padding: 12px 16px;
        box-sizing: border-box;
        background: #fbfbfc;
        border-radius: 4px;
        font-size: 12px;
        line-height: 20px;
        color: #8d90aa;
        margin-bottom: 10px;

        .status-txt {
            position: absolute;
            top: 16px;
            right: 16px;
            color: #8d90aa;
            font-size: 12px;
            cursor: pointer;

            &.hidden {
                color: #ff2e30;
            }
        }
    }
    .title {
        padding: 24px 0;
    }
    .tip {
        padding-top: 4px;
        font-size: 12px;
        color: #8d90aa;
    }
    .title-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
            display: flex;
            align-items: center;
            .name {
                display: flex;
                align-items: center;
                flex-shrink: 0;
                font-size: 16px;
                color: #3a3d4b;
                line-height: 1;
                margin-right: 8px;
                .txt {
                    font-weight: bold;
                    display: inline-block;
                    max-width: 250px;
                    word-break: break-all;
                }

                .lock {
                    width: 24px;
                    height: 24px;
                    display: inline-block;
                }
            }
        }

        .right {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            color: #8d90aa;
            font-size: 12px;
            line-height: 12px;

            .progress {
                margin-right: 8px;
                width: 16px;
                height: 16px;

                .img {
                    width: 100%;
                    height: 100%;
                    vertical-align: top;
                }
            }
            .status-img {
                display: inline-block;
                vertical-align: middle;
                width: 12px;
                height: 12px;
                margin-left: 10px;

                .img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>
