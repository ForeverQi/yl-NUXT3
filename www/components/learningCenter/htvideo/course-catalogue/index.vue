<script>
import { mapState, mapMutations } from 'vuex';
import dayjs from 'dayjs';
import '@/api/api..query-learn-course-info.js';
import '@/api/api..query-courseware-extend-info.js';
import '@/api/api..query-play-record-info.js';
import '@/api/cc/api..query-class-catalogs.js';
import '@/api/cc/api..query-courseware-extends.js';
import '@/api/cc/api..query-class-coursewares.js';
import '@/api/qb/api..courseware-paper-authentication.js';
import '@/api/igt/api..courseware-answer-info.js';
import '@/api/cc/api.CC8001.cc-class-pypconfig-wisdomstatus.js';
import '@/api/cc/api.CC3034.cc-playrd-batch-add.js';
export default {
    name: 'CourseCatalogue',
    data() {
        return {
            curPlayInfo: {},
            chapterList: [],
            list: [],
            playList: [],

            answerStyle: '',
            currentCourseInfo: {},

            playIndex: 0, // 当前播放顺序

            fistCourseId: '', // 第一个课件ID
            lastCourseId: '', // 最后一个课件ID

            lockStatus: false, // 当前课程是否有模块锁
            courseExtendInfo: {}, // 课件扩展信息
            showAIParctice: false, // 是否有智能学习课后练习

            switching: false, // 是否在切换中
        };
    },
    computed: {
        ...mapState('course/info', {
            coursewareId: 'coursewareId',
            classId: 'classId',
            ctapId: 'ctapId',
            courseId: 'courseId',
            coursewareName: 'coursewareName',
            prev: 'prev', // 上一节
            next: 'next', // 下一节
            subjectId: 'subjectId',
            moduleName: 'moduleName',
            courseName: 'courseName',
            showHandoutMax: 'showHandoutMax',
        }),
        ...mapState('course/division', {
            divisionType: 'type',
        }),
    },
    watch: {
        prev(val, oldVal) {
            if (val !== oldVal) {
                this.doPrev();
            }
        },
        next(val, oldVal) {
            if (val !== oldVal) {
                this.doNext();
            }
        },
        coursewareId: {
            handler(val, oldVal) {
                if (val && val !== oldVal) {
                    this.init();
                }
            },
            immediate: true,
        },
    },
    methods: {
        ...mapMutations('course/division', {
            setType: 'setType',
        }),
        ...mapMutations('course/info', {
            setCourseInfo: 'setCourseInfo',
            doVideoPause: 'doVideoPause',
            doVideoResume: 'doVideoResume',
        }),
        init() {
            // 获取当前课程信息
            this.getClassStatus()
                .then(() => {
                    return this.getCurCourseInfo();
                })
                .then(() => {
                    // 获取课程下的篇章
                    return this.getChapterList();
                })
                .then(() => {
                    return Promise.all(
                        this.chapterList.map((item) => {
                            return this.getCourseList(item);
                        })
                    ).then((res) => {
                        let map = {};
                        res.forEach((r) => {
                            map = {
                                ...map,
                                ...r,
                            };
                        });
                        this.playList = [];
                        // 判断课程下面是否有课件
                        let checkHandout = false;
                        this.list = this.chapterList.map((r) => {
                            r.children = map[r.catalogId] || [];
                            r.children.forEach((r2) => {
                                if (r2.coursewareType === 'S') {
                                    this.playList.push({
                                        ...r2,
                                        catalogName: r.catalogName,
                                    });
                                    if (r2.coursewareHandoutOnlineUrl) {
                                        // 视频类课件下有讲义
                                        checkHandout = true;
                                    }
                                } else if (r2.coursewareType === 'H') {
                                    // 讲义类课件
                                    checkHandout = true;
                                }
                            });

                            return r;
                        });
                        this.setCourseInfo({
                            ifHandoutHave: checkHandout,
                        });
                        if (this.playList.length > 0) {
                            this.fistCourseId = this.playList[0].coursewareId;
                            this.lastCourseId = this.playList[this.playList.length - 1].coursewareId;

                            this.setCourseInfo({
                                fistCourseId: this.fistCourseId,
                                lastCourseId: this.lastCourseId,
                            });
                        }
                    });
                })
                .then(() => {
                    let curCourse = {};
                    this.playList.some((r, index) => {
                        if (r.coursewareId === this.coursewareId) {
                            curCourse = r;
                            this.playIndex = index;
                            return true;
                        } else {
                            return false;
                        }
                    });
                    curCourse = this.playList[this.playIndex];
                    this.list.forEach((r) => {
                        if (r.catalogId === curCourse.catalogId) {
                            this.$set(r, 'open', true);
                        }
                    });

                    // 获取讲师用户ID
                    this.getTeacherUserInfo().then((teacherUserid) => {
                        this.setCourseInfo({
                            coursewareName: curCourse.coursewareName, // 课程名称
                            catalogId: curCourse.catalogId, // 篇章ID
                            vid: curCourse.vid, // 课件ID
                            moduleName: this.curPlayInfo.modulName, // 模块ID
                            courseName: this.curPlayInfo.courseName, // 课程名称
                            catalogName: curCourse.catalogName, // 篇章名称
                            courseId: this.curPlayInfo.courseId, // 课程ID
                            projectId: this.curPlayInfo.projectId, // 项目ID
                            teacherId: teacherUserid,
                            coursewareHandoutOnlineUrl: curCourse.coursewareHandoutOnlineUrl, // 课件配套的讲义
                            studyDuration: curCourse.studyDuration, // 已学时长
                        });
                    });
                    setTimeout(() => {
                        this.switching = false;
                    }, 300);
                });
        },
        getTeacherUserInfo() {
            return this.$callApi('cc/query-play-record-info', {
                classId: this.classId,
                coursewareId: this.coursewareId,
                auditionStatus: 'N',
                classtypeId: '',
            })
                .then((APIResponse) => {
                    let res = APIResponse.getData();
                    return res.teacherUserid;
                })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return '';
                });
        },
        getClassStatus() {
            // 获取班级状态
            const params = {
                url: 'cc/cc-class-pypconfig-wisdomstatus',
                params: {
                    classId: this.classId,
                },
            };
            return this.httpClient(params)
                .then((res) => {
                    this.setCourseInfo(res);
                })
                .catch(() => {
                    this.$baseUI.loading.closeAll();
                    return Promise.resolve();
                });
        },
        doNext() {
            // 下一个视频
            if (this.playIndex === this.playList.length - 1 || this.switching === true) {
                return;
            }
            const tmp = this.playList[this.playIndex + 1];
            this.changeCourse(tmp, tmp.catalogName);
        },
        doPrev() {
            // 上一个视频
            if (this.playIndex === 0 || this.switching === true) {
                return;
            }
            const tmp = this.playList[this.playIndex - 1];
            this.changeCourse(tmp, tmp.catalogName);
        },
        getCourseList(item) {
            const params = {
                url: 'cc/query-class-coursewares',
                params: {
                    classId: this.classId,
                    classTypeId: this.curPlayInfo.classTypeId,
                    ctapId: this.ctapId,
                    subjectId: this.subjectId,
                    electiveShowStatus: this.curPlayInfo.electiveShowStatus,
                    moduleId: this.curPlayInfo.modulId,
                    courseModulId: this.curPlayInfo.courseModulId,
                    courseId: this.curPlayInfo.courseId,
                    courseElectiveStatus: this.curPlayInfo.courseElectiveStatus,
                    catalogId: item.catalogId,
                    catalogElectiveStatus: item.catalogElectiveStatus,
                },
                isCustom: false,
            };
            return this.httpClient(params)
                .then((res) => {
                    return this.getCourseExtend(res, item);
                })
                .then((list) => {
                    let ret = {};
                    ret[item.catalogId] = list;
                    return ret;
                });
        },
        getCourseExtend(courseList, catalogInfo) {
            let list = [];
            courseList.forEach((r) => {
                if (r.coursewareType === 'S' || r.coursewareType === 'P') {
                    list.push({
                        coursewareId: r.coursewareId,
                        coursewareType: r.coursewareType,
                        paperId: r.paperId,
                    });
                }
            });
            if (list.length === 0) {
                return Promise.resolve([]);
            }
            const params = {
                url: 'cc/query-courseware-extends',
                params: {
                    classTypeId: this.curPlayInfo.classTypeId,
                    pypId: this.curPlayInfo.pypId,
                    classId: this.classId,
                    ctapId: this.ctapId,
                    subjectId: this.subjectId,
                    electiveShowStatus: this.curPlayInfo.electiveShowStatus,
                    moduleId: this.curPlayInfo.modulId,
                    courseId: this.curPlayInfo.courseId,
                    coursewareInfos: list,
                },
                isCustom: false,
            };
            return this.httpClient(params).then((res) => {
                let map = {};
                res.forEach((r) => {
                    map[r.coursewareId] = r;
                });
                courseList = courseList.filter((r) => r.coursewareType === 'S' || r.coursewareType === 'P');
                return courseList.map((r1) => {
                    let tmp = map[r1.coursewareId] || {};
                    return {
                        ...r1,
                        ...tmp,
                        catalogId: catalogInfo.catalogId,
                        catalogName: catalogInfo.catalogName,
                    };
                });
            });
        },
        getChapterList() {
            // 获取篇章列表
            const data = {
                url: 'cc/query-class-catalogs',
                params: {
                    classId: this.classId,
                    classTypeId: this.curPlayInfo.classTypeId,
                    ctapId: this.ctapId,
                    subjectId: this.subjectId,
                    electiveShowStatus: this.curPlayInfo.electiveShowStatus,
                    moduleId: this.curPlayInfo.modulId,
                    courseModulId: this.curPlayInfo.courseModulId,
                    courseId: this.curPlayInfo.courseId,
                    courseElectiveStatus: this.curPlayInfo.courseElectiveStatus,
                },
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                this.chapterList = res;
                const list = [];
                res.forEach((r) => {
                    list.push({
                        catalogId: r.catalogId,
                    });
                });

                this.setCourseInfo({ chapterList: list });
            });
        },
        getCurCourseInfo() {
            const data = {
                url: 'cc/query-learn-course-info',
                params: {
                    classId: this.classId,
                    ctapId: this.ctapId,
                    coursewareId: this.coursewareId,
                },
                isCustom: true,
            };
            return this.httpClient(data)
                .then((res) => {
                    this.curPlayInfo = res;
                    let info = {
                        catalogShowStatus: res.catalogShowStatus,
                        electiveShowStatus: res.electiveShowStatus,
                        modulId: res.modulId,
                    };
                    if (!this.subjectId) {
                        info.subjectId = this.curPlayInfo.subjectId;
                    }
                    this.setCourseInfo(info);
                })
                .catch((err) => {
                    this.$baseUI.alert(err.getDescription()).then(() => {
                        this.$PageUtil.href('/learningCenter/index/myCourse');
                    });
                    this.$baseUI.loading.closeAll();
                    return Promise.reject();
                });
        },
        changeCourse(item, catalogName = '') {
            this.switching = true;
            // 切换课件
            if (item.coursewareType === 'P') {
                this.currentCourseInfo = {
                    ...item,
                    catalogName,
                };
                this.doVideoPause();
                this.checkPaperAuthentication().then(() => {
                    return this.haveAuthority();
                });
            } else if (item.coursewareType === 'S') {
                if (this.$nuxt.isOnline === false) {
                    this.$baseUI.alert('您已经断网了，请联网后在继续操作');
                    return;
                }
                this.$emit('up-record', item.coursewareId, () => {
                    this.setCourseInfo({
                        coursewareId: item.coursewareId,
                        catalogName,
                    });

                    if (this.divisionType === 7) {
                        this.setType(1);
                    }

                    history.replaceState(
                        null,
                        null,
                        `/pro-course-learn/${this.classId}/${item.coursewareId}?source=${this.$route.query.source}&ctapId=${this.ctapId}`
                    );
                });
            }
        },
        haveAuthority() {
            return this.addPaperRecord().then(() => {
                return this.getCoursewareAnswersheetInfo().then((res) => {
                    let answersheetInfo = res;
                    if (!answersheetInfo) {
                        return this.$baseUI.alert('试卷不正确，请联系客服');
                    }
                    this.doJump(answersheetInfo);
                });
            });
        },
        doJump(answersheetInfo) {
            const queryObj = this.$route.query;
            let strArr = [];
            Object.keys(queryObj).forEach((k) => {
                strArr.push(`${k}=${queryObj[k]}`);
            });
            const fullPath = encodeURIComponent(`/pro-course-learn/${this.classId}/${answersheetInfo.coursewareId}?${strArr.join('&')}`);
            let url = '';
            if (this.answerStyle === 'NORMAL') {
                this.problemSolvingMode();
                url = `/learningCenter/do-paper-test/${this.subjectId}/${this.currentCourseInfo.paperId}/${this.currentCourseInfo.coursewareId}/${answersheetInfo.paperTypeCode}/${this.classId}`;
                url += `?className=${encodeURIComponent(this.curPlayInfo.className)}&ctapId=${this.ctapId}&solvingMode=do-exercise`;
            } else if (this.answerStyle === 'FZJK1') {
                url = `/exam/examinfo/${answersheetInfo.classUniquecode}/${this.subjectId}/${answersheetInfo.paperId}?url=${fullPath}&ctapId=${this.ctapId}&enableStatus=Y`;
            } else if (this.answerStyle === 'FZJK2') {
                url = `/exam/examinfo/${answersheetInfo.classUniquecode}/${this.subjectId}/${answersheetInfo.paperId}?url=${fullPath}&ctapId=${this.ctapId}&enableStatus=Y`;
            } else if (this.answerStyle === 'FZJK3') {
                url = `/emulation/fire-exam/login?classUniquecode=${answersheetInfo.classUniquecode}&subjectId=${this.subjectId}&paperId=${answersheetInfo.paperId}&classId=${this.classId}&coursewareId=${answersheetInfo.coursewareId}&ctapId=${this.ctapId}`;
            }

            setTimeout(() => {
                this.$PageUtil.openNewPage(url);
            }, 100);
        },
        getCoursewareAnswersheetInfo() {
            // 获取试卷信息
            const params = {
                url: 'zhinengxuexi/courseware-answer-info',
                params: {
                    paperId: this.currentCourseInfo.paperId,
                    classId: this.classId,
                    coursewareId: this.currentCourseInfo.coursewareId,
                },
                isCustom: false,
            };
            return this.httpClient(params).then((res) => {
                return res;
            });
        },
        addPaperRecord() {
            // 播放记录添加
            let data = {
                playrds: [
                    {
                        classId: this.classId, //班级标识
                        coursewareId: this.currentCourseInfo.coursewareId, //课件标识
                        coursewareName: this.currentCourseInfo.coursewareName,
                        playRdIP: '', //播放记录IP
                        playRdStarttime: dayjs().format('YYYY-MM-DD hh:mm:ss'), //播放记录开始时间
                        playRdEndTime: dayjs().format('YYYY-MM-DD hh:mm:ss'), //播放记录开始时间
                        playRdDevice: 'W', //播放记录播放设备
                        playRdDevicename: '', //播放记录播放设备名称
                        playRdDeviceos: 'W', //播放记录播放设备操作系统
                        playRdDeviceversion: this.$platform.version, //播放记录设备版本号
                        playRdMcc: `${this.moduleName}-${this.courseName}-${this.currentCourseInfo.catalogName}`, //模块课程目录名称
                        playRdDuration: 0, //播放记录播放时长
                        playRdOffLineStatus: 'P', //L:在线播放;O:离线播放
                        subjectId: this.subjectId, // 科目ID
                        courseId: this.courseId, // 课程ID
                    },
                ],
            };

            return this.httpClient({
                url: 'cc/cc-playrd-batch-add',
                params: data,
            }).catch((err) => {
                this.$niceloo.api.handleFailure(err);
                return Promise.reject();
            });
        },
        checkPaperAuthentication() {
            let data = {
                url: 'qb/courseware-paper-authentication',
                params: {
                    classId: this.classId,
                    paperId: this.currentCourseInfo.paperId,
                    coursewareId: this.currentCourseInfo.coursewareId,
                },
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                this.answerStyle = res.answerStyle;
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
        /**
         * 做题模式数据的存储
         */
        problemSolvingMode() {
            const userInfo = this.$storage.get('loginStatus') || {};
            const modeObj = this.$storage.get('problemSolvingMode') || {};
            const str = `${userInfo.userId}-${this.currentCourseInfo.paperId}`;
            modeObj[str] = 'do-exercise';
            this.$storage.set('problemSolvingMode', modeObj);
        },
    },
    render() {
        const showStar = (num) => {
            let html = [];
            for (let i = 0; i < num; i++) {
                html.push(
                    <div class="star-item">
                        <img src={require('./asset/images/star.png')} class="img" />
                    </div>
                );
            }
            return html;
        };
        const showTime = (num) => {
            if (isNaN(num)) {
                num = 0;
            }
            num = Number(num);
            let arr = [];
            if (num >= 3600) {
                let _num = Math.floor(num / 3600);
                arr.push(_num > 9 ? _num : `0${_num}`);
                num -= _num * 3600;
            } else {
                arr.push('00');
            }
            if (num >= 60) {
                const _num = Math.floor(num / 60);
                arr.push(_num > 9 ? _num : `0${_num}`);
                num -= _num * 60;
            } else {
                arr.push('00');
            }
            arr.push(num > 9 ? num : `0${num}`);

            return arr.join(':');
        };
        const showQuestNum = (item) => {
            let num = 0;
            if (item?.coursewarePaper?.questionTotal) {
                num = item.coursewarePaper.questionTotal;
            }

            return `共${num}题`;
        };
        return (
            <div class="course-catalogue">
                <div class="course-name" style={this.showHandoutMax === true ? 'display: none' : ''}>
                    {this.curPlayInfo.courseName}
                </div>
                <div class="scroll">
                    {this.list.map((item, index) => {
                        const list = item.children.filter((r) => {
                            if (this.curPlayInfo.electiveShowStatus === 'Y') {
                                // 显示选课
                                return true;
                            } else {
                                // 显示非选修课
                                return r.coursewareElectiveStatus === 'N';
                            }
                        });
                        return (
                            <div class="tree" key={item.catalogId} style={list.length === 0 ? 'display: none;' : ''}>
                                <div
                                    class="name"
                                    onClick={() => {
                                        if (!item.open) {
                                            this.$set(item, 'open', true);
                                        } else {
                                            item.open = !item.open;
                                        }
                                    }}
                                    style={this.curPlayInfo.catalogShowStatus === 'Y' ? '' : 'display: none'}
                                >
                                    {item.catalogName}
                                    <div class={['label', item.open ? 'up' : '']}>{item.open ? '收起' : '展开'}</div>
                                </div>
                                {list.map((item2) => {
                                    return (
                                        <div
                                            style={item.open || this.curPlayInfo.catalogShowStatus === 'N' ? '' : 'display: none'}
                                            class={{
                                                item: true,
                                                show: this.curPlayInfo.catalogShowStatus === 'N' && index < this.list.length - 1,
                                                this: item2.coursewareId === this.coursewareId,
                                            }}
                                            onClick={() => {
                                                this.changeCourse(item2, item.catalogName);
                                            }}
                                        >
                                            {item2.coursewareId !== this.coursewareId && (
                                                <div class="type">
                                                    {item2.studyStatus === 'N' && <img src={require('./asset/images/no.png')} class="img" />}
                                                    {item2.studyStatus === 'S' && <img src={require('./asset/images/no-done.png')} class="img" />}
                                                    {item2.studyStatus === 'Y' && <img src={require('./asset/images/done.png')} class="img" />}
                                                </div>
                                            )}
                                            {item2.coursewareId === this.coursewareId && (
                                                <div class="type">
                                                    {item2.studyStatus === 'N' && <img src={require('./asset/images/noing.png')} class="img" />}
                                                    {item2.studyStatus === 'S' && <img src={require('./asset/images/doing.png')} class="img" />}
                                                    {item2.studyStatus === 'Y' && <img src={require('./asset/images/doneing.png')} class="img" />}
                                                </div>
                                            )}
                                            <div class="content">
                                                <div class="icon">
                                                    <img
                                                        style={item2.coursewareId !== this.coursewareId && item2.coursewareType === 'S' ? '' : 'display: none;'}
                                                        src={require('./asset/images/video.png')}
                                                        class="img"
                                                    />
                                                    <img
                                                        style={item2.coursewareId !== this.coursewareId && item2.coursewareType === 'P' ? '' : 'display: none;'}
                                                        src={require('./asset/images/handout.png')}
                                                        class="img"
                                                    />
                                                    <img
                                                        style={item2.coursewareId === this.coursewareId ? '' : 'display: none;'}
                                                        src={require('./asset/images/playing.gif')}
                                                        class="img"
                                                    />
                                                </div>
                                                {item2.coursewareElectiveStatus === 'Y' && <div class="mask"></div>}
                                                <div class={['item-name', item2.coursewareElectiveStatus === 'Y' ? 'mask-indent' : '']}>
                                                    {item2.coursewareName}
                                                </div>
                                                <div class="info">
                                                    <div class="time">
                                                        {item2.coursewareType === 'P' ? showQuestNum(item2) : showTime(item2.coursewareDuration)}
                                                    </div>
                                                    <div class="star">{showStar(item2.knowledgeStarLevel)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped src="./asset/index.less"></style>
