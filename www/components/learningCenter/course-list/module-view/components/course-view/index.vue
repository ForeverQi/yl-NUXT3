<script lang="jsx">
import { mapState, mapActions } from 'vuex';
import '@/api/cc/api..query-class-catalogs.js';
import '@/api/cc/api..query-class-catalog-extends.js';
import ChapterView from '../chapter-view/index.vue';
export default {
    name: 'CourseView',
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
        courseData: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            isShow: false,
            dataReady: false, // 课件是否已加载，默认未加载
            chapterList: [], // 篇章列表
            chapterExtends: {}, // 篇章扩展接口
        };
    },
    computed: {
        ...mapState('class-info/subject', {
            currentSubject: 'currentSubject',
        }),
        ...mapState('class-info/info', {
            classId: 'classId', // 班级ID
            classTypeId: 'classTypeId', // 班型ID
            projectId: 'projectId', // 项目ID
            ctapId: 'ctapId', // 期次
            pypId: 'pypId',
            electiveShowStatus: 'electiveShowStatus',
            showStatus: 'showStatus', // 显示状态，0：全部，1：未学完，2：已学完
            showType: 'showType',
        }),
        learnedCoursewareCount() {
            let num = Number(this.courseData.learnedCoursewareCount);
            if (isNaN(num)) {
                return 0;
            }

            return num;
        },
        totalCoursewareCount() {
            let num = Number(this.courseData.totalCoursewareCount);
            if (isNaN(num)) {
                return 0;
            }

            return num;
        },
        learnedHour() {
            if (!this.courseData.learnedTime || this.courseData.learnedTime <= 0) {
                return `0小时`;
            }

            let second = this.courseData.learnedTime % 60;
            let minute = 0;
            let hour = 0;
            if (this.courseData.learnedTime > 3600) {
                minute = Math.floor((this.courseData.learnedTime / 60) % 60);
                hour = Math.floor(this.courseData.learnedTime / 3600);
                return `${hour}小时${minute}分${second}秒`;
            } else {
                minute = Math.floor(this.courseData.learnedTime / 60);
                return `${minute}分${second}秒`;
            }
        },
    },
    watch: {
        electiveShowStatus() {
            if (this.isShow === true) {
                this.getChapterExtends();
            }
        },
        showStatus() {
            if (this.showType === 'practice') {
                this.changePaperStatus();
            }
        },
        [`courseData.lockedStatus`]() {
            this.chapterList = this.chapterList.map((r) => {
                r.lockedStatus = this.courseData.lockedStatus;
                r.lockedTip = this.courseData.lockedTip;

                return r;
            });
        },
    },
    mounted() {
        if (this.courseData.studyStatus === 'Y') {
            this.changeStatus();
        }
    },
    methods: {
        ...mapActions('class-info/practice-muster', {
            paperGetChapter: 'getChapter',
        }),
        changePaperStatus() {
            this.paperGetChapter({
                moduleId: this.courseData.moduleId,
                courseId: this.courseData.courseId,
                showType: this.showStatus,
            }).then((list) => {
                this.chapterList = list;
            });
        },
        changeStatus() {
            this.isShow = !this.isShow;
            if (this.showType === 'practice') {
                this.changePaperStatus();
                return;
            }
            if (this.dataReady === false) {
                this.getChapterList().then(() => {
                    return this.getChapterExtends();
                });
            }
        },
        getChapterExtends() {
            // 获取篇章扩展列表
            const data = {
                url: 'cc/query-class-catalog-extends',
                params: {
                    classTypeId: this.classTypeId,
                    pypId: this.pypId,
                    classId: this.classId,
                    ctapId: this.ctapId,
                    subjectId: this.currentSubject.subjectId,
                    electiveShowStatus: this.electiveShowStatus,
                    moduleId: this.courseData.moduleId,
                    courseModulId: this.courseData.courseModulId,
                    courseId: this.courseData.courseId,
                },
                isCustom: false,
            };
            return this.httpClient(data)
                .then((res) => {
                    this.chapterExtends = [];
                    res.forEach((r) => {
                        this.chapterExtends[r.catalogId] = r;
                    });
                })
                .then(() => {
                    this.chapterList.forEach((r) => {
                        const item = this.chapterExtends[r.catalogId];
                        if (!item) {
                            return;
                        }
                        Object.keys(item).forEach((k) => {
                            this.$set(r, k, item[k]);
                        });
                    });
                });
        },
        getChapterList() {
            // 获取篇章列表
            const data = {
                url: 'cc/query-class-catalogs',
                params: {
                    classId: this.classId,
                    classTypeId: this.classTypeId,
                    ctapId: this.ctapId,
                    subjectId: this.currentSubject.subjectId,
                    electiveShowStatus: this.electiveShowStatus,
                    moduleId: this.courseData.moduleId,
                    courseModulId: this.courseData.courseModulId,
                    courseId: this.courseData.courseId,
                    courseElectiveStatus: this.courseData.courseElectiveStatus,
                },
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                this.chapterList = res.map((r) => {
                    r.moduleId = this.courseData.moduleId;
                    r.courseModulId = this.courseData.courseModulId;
                    r.courseId = this.courseData.courseId;
                    r.courseElectiveStatus = this.courseData.courseElectiveStatus;
                    r.wisdomStatus = this.courseData.wisdomStatus;
                    r.interactionStatus = this.courseData.interactionStatus;
                    r.catalogShowStatus = this.courseData.catalogShowStatus;
                    r.lockedStatus = this.courseData.lockedStatus;
                    r.lockedTip = this.courseData.lockedTip;
                    r.courseScheduleStatus = this.courseData.courseScheduleStatus;
                    return r;
                });
                this.dataReady = true;
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
        let showLearnedCoursewareCount = this.learnedCoursewareCount;
        if (showLearnedCoursewareCount > this.totalCoursewareCount) {
            showLearnedCoursewareCount = this.totalCoursewareCount;
        }
        return (
            <div class="course-wrap">
                <div class="title-wrap" onClick={this.changeStatus}>
                    <div class="title">
                        {this.courseData.courseName}
                        <img style={{ display: this.courseData.lockedStatus === 'Y' ? '' : 'none' }} src={require('./asset/images/lock.png')} class="lock" />
                    </div>
                    <div class="right">
                        {this.showType === 'class' && (
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
                        )}
                        <div class="status-img">
                            {this.isShow ? (
                                <img class="img" src={require('./asset/images/up.png')} />
                            ) : (
                                <img class="img" src={require('./asset/images/down.png')} />
                            )}
                        </div>
                    </div>
                </div>
                <div class="content" style={!this.isShow ? 'display: none' : ''}>
                    {this.chapterList.map((rs) => {
                        let style = { display: 'none' };
                        if (this.showStatus === 1 && rs.totalCoursewareCount !== rs.learnedCoursewareCount && rs.totalCoursewareCount > 0) {
                            style = {};
                        } else if (this.showStatus === 2 && rs.learnedCoursewareCount > 0) {
                            style = {};
                        } else if (this.showStatus === 0) {
                            style = {};
                        }
                        if (this.showType === 'practice') {
                            style = {};
                        }
                        // 是否隐藏选修课 并且当前就是选修状态
                        if (this.electiveShowStatus === 'N' && rs.catalogElectiveStatus === 'Y') {
                            style = { display: 'none' };
                        }
                        return <ChapterView key={rs.catalogId} chapterData={rs} style={style} />;
                    })}
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.course-wrap {
    .title-wrap {
        display: flex;
        justify-content: space-between;
        padding: 0 30px;
        padding-left: 46px;
        cursor: pointer;
        border-bottom: 1px solid #f1f3f5;
        .title {
            padding: 18px 0;
            font-size: 16px;
            font-weight: 700;
            color: #3a3d4b;
            line-height: 24px;

            .lock {
                width: 24px;
                height: 24px;
                vertical-align: bottom;
                display: inline-block;
            }
        }

        .right {
            display: flex;
            align-items: center;
            color: #8d90aa;
            font-size: 12px;
            line-height: 12px;
            flex-shrink: 0;

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

    .content {
        padding-bottom: 10px;
    }
}
</style>
