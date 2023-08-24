<script lang="jsx">
import { mapState, mapActions } from 'vuex';
import '@/api/cc/api..query-class-coursewares.js';
import '@/api/cc/api..query-courseware-extends.js';
import '@/api/cc/api..query-class-intelligent-info.js';

import AttachmentItemView from '../courseware-view/attachment-item-view/index.vue';
import VideoItemView from '../courseware-view/video-item-view/index.vue';
import LiveItemView from '../courseware-view/live-item-view/index.vue';
import PaperItemView from '../courseware-view/paper-item-view/index.vue';
export default {
    name: 'ChapterView',
    props: {
        chapterData: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            isShow: false,
            dataReady: false,
            list: [],
            extendMap: {},
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
    },
    watch: {
        showStatus() {
            if (this.showType === 'practice') {
                this.changePaperStatus();
            }
        },
        [`chapterData.lockedStatus`]() {
            this.list = this.list.map((r) => {
                r.lockedStatus = this.chapterData.lockedStatus;
                r.lockedTip = this.chapterData.lockedTip;

                return r;
            });
        },
    },
    mounted() {
        this.dataReady = false;
        if (this.chapterData.studyStatus === 'Y' || this.chapterData.catalogShowStatus === 'N') {
            this.doShowCourseware();
        }
    },
    methods: {
        ...mapActions('class-info/practice-muster', {
            getCourseware: 'getCourseware',
        }),
        changePaperStatus() {
            this.getCourseware({
                moduleId: this.chapterData.moduleId,
                courseId: this.chapterData.courseId,
                catalogId: this.chapterData.catalogId,
                showType: this.showStatus,
            }).then((list) => {
                this.list = list;
            });
        },
        doShowCourseware() {
            this.isShow = !this.isShow;
            if (this.showType === 'practice') {
                this.changePaperStatus();
                return;
            }
            if (this.dataReady === false) {
                this.getCoursewareList();
            }
        },
        getCoursewareList() {
            const params = {
                url: 'cc/query-class-coursewares',
                params: {
                    classId: this.classId,
                    classTypeId: this.classTypeId,
                    ctapId: this.ctapId,
                    subjectId: this.currentSubject.subjectId,
                    electiveShowStatus: this.electiveShowStatus,
                    moduleId: this.chapterData.moduleId,
                    courseModulId: this.chapterData.courseModulId,
                    courseId: this.chapterData.courseId,
                    courseElectiveStatus: this.chapterData.courseElectiveStatus,
                    catalogId: this.chapterData.catalogId,
                    catalogElectiveStatus: this.chapterData.catalogElectiveStatus,
                },
                isCustom: false,
            };
            this.httpClient(params)
                .then((res) => {
                    console.log('@@@#####', res);
                    this.list = res.map((r) => {
                        r.lockedStatus = this.chapterData.lockedStatus;
                        r.lockedTip = this.chapterData.lockedTip;
                        r.moduleId = this.chapterData.moduleId;
                        r.courseId = this.chapterData.courseId;
                        r.catalogId = this.chapterData.catalogId;
                        r.courseScheduleStatus = this.chapterData.courseScheduleStatus;
                        return r;
                    });
                    this.dataReady = true;
                    if (this.list.length === 0) {
                        return;
                    }
                    return this.getCoursewraeExtends();
                })
                .then(() => {
                    this.list.forEach((r) => {
                        let item = this.extendMap[r.coursewareId];
                        if (!item) {
                            return;
                        }
                        Object.keys(item).forEach((k) => {
                            this.$set(r, k, item[k]);
                        });
                    });
                });
        },
        getCoursewraeExtends() {
            let list = [];
            this.list.forEach((r) => {
                list.push({
                    coursewareId: r.coursewareId,
                    coursewareType: r.coursewareType,
                    paperId: r.paperId,
                });
            });
            const params = {
                url: 'cc/query-courseware-extends',
                params: {
                    classTypeId: this.classTypeId,
                    pypId: this.pypId,
                    classId: this.classId,
                    ctapId: this.ctapId,
                    subjectId: this.currentSubject.subjectId,
                    electiveShowStatus: this.electiveShowStatus,
                    moduleId: this.chapterData.moduleId,
                    courseId: this.chapterData.courseId,
                    coursewareInfos: list,
                },
                isCustom: false,
            };
            return this.httpClient(params).then((res) => {
                let coursewareIds = [];
                this.extendMap = [];
                res.forEach((r) => {
                    this.extendMap[r.coursewareId] = r;
                    if (r.knowledgeStarLevel > 0) {
                        coursewareIds.push(r.coursewareId);
                    }
                });
                if (this.chapterData.wisdomStatus === 'Y' && coursewareIds.length > 0) {
                    this.getCoursewareAIExtends(coursewareIds);
                }
            });
        },
        getCoursewareAIExtends(coursewareIds) {
            const params = {
                url: 'cc/query-class-intelligent-info',
                params: {
                    classId: this.classId,
                    coursewareIds: JSON.stringify(coursewareIds),
                },
                isCustom: false,
            };
            return this.httpClient(params).then((res) => {
                let map = {};
                res.forEach((r) => {
                    map[r.coursewareId] = r;
                });
                this.list.forEach((r) => {
                    let item = map[r.coursewareId];
                    if (!item) {
                        return;
                    }
                    Object.keys(item).forEach((k) => {
                        this.$set(r, k, item[k]);
                    });
                });
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
        return (
            <div class="chapter-view" style={this.chapterData.catalogShowStatus === 'Y' ? '' : 'border: none;'}>
                <div class="title-wrap" onClick={this.doShowCourseware} style={{ display: this.chapterData.catalogShowStatus === 'Y' ? '' : 'none' }}>
                    <div class="title">
                        <img class="img" src={require('./asset/images/chapter.png')} />
                        {this.chapterData.catalogName}
                        <img style={{ display: this.chapterData.lockedStatus === 'Y' ? '' : 'none' }} src={require('./asset/images/lock.png')} class="lock" />
                    </div>
                    <div class="right">
                        <div class="status-img">
                            {this.isShow ? (
                                <img class="img" src={require('./asset/images/up.png')} />
                            ) : (
                                <img class="img" src={require('./asset/images/down.png')} />
                            )}
                        </div>
                    </div>
                </div>
                <div class="content" style={{ display: `${this.isShow ? '' : 'none'}`, paddingBottom: '0' }}>
                    {this.list.map((r) => {
                        let style = { display: 'none' };
                        if (this.showStatus === 1 && r.studyStatus !== 'Y' && !(r.coursewareType === 'H' || r.coursewareType === 'E')) {
                            style = {};
                        } else if (this.showStatus === 2 && r.studyStatus === 'Y') {
                            style = {};
                        } else if (this.showStatus === 0) {
                            style = {};
                        }
                        if (this.showType === 'practice') {
                            style = {};
                        }
                        // 是否隐藏选修课 并且当前就是选修状态
                        if (this.electiveShowStatus === 'N' && r.coursewareElectiveStatus === 'Y') {
                            style = { display: 'none' };
                        }
                        if (this.chapterData.catalogShowStatus === 'Y') {
                            style.marginBottom = '8px';
                        } else {
                            style.marginTop = '8px';
                        }
                        return (
                            <div class="courseware-view" style={style}>
                                {r.coursewareType === 'L' && <LiveItemView itemData={r} />}
                                {(r.coursewareType === 'H' || r.coursewareType === 'E') && <AttachmentItemView itemData={r} />}
                                {r.coursewareType === 'S' && <VideoItemView itemData={r} />}
                                {r.coursewareType === 'P' && <PaperItemView itemData={r} />}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.courseware-view {
    padding: 0 30px;
    padding-left: 46px;
}
.chapter-view {
    border-bottom: 1px solid #f1f3f5;
    background: #ffffff;

    .title-wrap {
        display: flex;
        justify-content: space-between;
        padding: 0 24px;
        padding-left: 46px;
        cursor: pointer;
        .title {
            padding: 20px 0;
            font-size: 16px;
            color: #333333;
            line-height: 24px;
            display: flex;
            align-items: center;

            .img {
                width: 16px;
                height: 16px;
                margin-right: 9px;
                vertical-align: bottom;
            }
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
        padding-bottom: 12px;
    }
}
</style>
