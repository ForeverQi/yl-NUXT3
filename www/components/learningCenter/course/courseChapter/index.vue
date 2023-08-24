<template>
    <div class="chapter">
        <div class="top" @click="handleChapter">
            <div class="chapter-title">
                <img class="img" src="./asset/images/subject_title.png" />
                <span class="title-wrap">{{ chapterInfo.catalogName }}</span>
                <span class="history" v-if="chapterInfo.cwCoursepreviousstatus == 'Y'">往期</span>
                <span class="mask" v-if="chapterInfo.catalogElectivestatus == 'Y'">选修</span>
                <img class="lock" v-if="lockedStatus" src="./asset/images/clock.png" />
            </div>
            <div class="right">
                <div class="status" :class="{ up: toggle, down: !toggle }"></div>
            </div>
        </div>
        <template v-if="toggle">
            <div class="course-wrap" v-for="courseInfo in chapterInfo.coursewares" :key="courseInfo.coursewareId" :ref="courseInfo.coursewareId">
                <!-- {{ courseInfo }} -->
                <!-- 课程 -->
                <div
                    class="course"
                    v-if="courseInfo.coursewareType == 'S' || courseInfo.coursewareType == 'P'"
                    @click="toTaskDetailPage(courseInfo, 'wholeLine')"
                >
                    <img class="paper" src="./asset/images/shijuan.png" v-if="courseInfo.coursewareType == 'P'" />
                    <img class="play" src="./asset/images/play.png" v-else />
                    <div class="left" :class="{ twoBtn: courseInfo.keepstudyStatus == 'Y' }">
                        <div class="title">
                            <div class="txt">
                                {{ courseInfo.coursewareName }}{{ courseInfo.coursewareGroupname ? `(${courseInfo.coursewareGroupname})` : '' }}
                                <span class="history" v-if="courseInfo.cwCoursepreviousstatus == 'Y'">往期</span>
                                <span class="mask" v-if="courseInfo.coursewareElectivestatus == 'Y'">选修</span>
                                <img class="lock" v-if="lockedStatus" src="./asset/images/clock.png" />
                                <p class="questionTime" v-if="courseInfo.coursewareType == 'P'">
                                    <span
                                        :class="[
                                            'time',
                                            'span-text',
                                            { isShowLint: !(courseInfo.coursewarePaper && courseInfo.coursewarePaper.answerNumLeft > -1) },
                                        ]"
                                        v-show="
                                            courseInfo.coursewarePaper &&
                                            courseInfo.coursewarePaper.answerTimeType === 'LIMITED' &&
                                            courseInfo.coursewarePaper.answerBeginTime &&
                                            courseInfo.coursewarePaper.answerEndTime
                                        "
                                    >
                                        做题时间：{{ courseInfo.coursewarePaper && courseInfo.coursewarePaper.answerBeginTime }} -
                                        {{ courseInfo.coursewarePaper && courseInfo.coursewarePaper.answerEndTime }}
                                    </span>
                                    <span class="span-text" v-show="courseInfo.coursewarePaper && courseInfo.coursewarePaper.answerNumLeft > -1">
                                        剩余做题次数：{{ courseInfo.coursewarePaper && courseInfo.coursewarePaper.answerNumLeft }}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="stars">
                                <!-- count: 显示星星数量，value: 加亮数量 -->
                                <course-star
                                    v-if="courseInfo.knowledgeStarLevel"
                                    :value="courseInfo.knowledgeStarLevel"
                                    :count="courseInfo.knowledgeStarLevel"
                                />
                            </div>

                            <div class="progress" v-if="courseInfo.studyStatus == 'S'">
                                <div class="rate" :style="{ width: `${percentage(courseInfo)}%` }"></div>
                            </div>
                            <div class="funish" v-if="courseInfo.studyStatus == 'Y'">已学完</div>
                            <div class="peope" v-if="false">
                                已有
                                <span class="num">{{ courseInfo.coursewareStudycount }}</span>
                                人学完
                            </div>
                        </div>
                    </div>
                    <div class="btn-wrap" v-if="courseInfo.coursewareType == 'P'">
                        <!-- 继续练习 -->
                        <div
                            class="exam btn"
                            v-if="
                                courseInfo.coursewarePaper &&
                                (courseInfo.coursewarePaper.answerStyle === 'FZJK1' ||
                                    courseInfo.coursewarePaper.answerStyle === 'FZJK2' ||
                                    courseInfo.coursewarePaper.answerStyle === 'FZJK3') &&
                                courseInfo.stageAnswersheetId &&
                                courseInfo.stageAswersheetStatus === 'G'
                            "
                            @click.stop="toTaskDetailPage(courseInfo, 'new')"
                        >
                            去机考
                        </div>
                        <div
                            class="exam btn"
                            v-else-if="courseInfo.stageAnswersheetId && courseInfo.stageAswersheetStatus === 'G'"
                            @click.stop="toTaskDetailPage(courseInfo, 'goon')"
                        >
                            继续做题
                        </div>
                        <!-- 查看报告 -->
                        <template v-else-if="courseInfo.stageAnswersheetId && courseInfo.stageAswersheetStatus === 'A'">
                            <div class="continue btn" @click.stop="toTaskDetailPage(courseInfo, 'viewReport')">查看报告</div>
                            <!-- 有练习 -->
                            <div class="exam btn" @click.stop="toTaskDetailPage(courseInfo, 'new')">{{ answerBtnText(courseInfo) }}</div>
                        </template>

                        <!-- 有练习 -->
                        <div class="exam btn" v-else @click.stop="toTaskDetailPage(courseInfo, 'new')">{{ answerBtnText(courseInfo) }}</div>
                    </div>
                    <div class="btn-wrap" v-else>
                        <!-- 继续练习 -->
                        <div class="continue btn" v-if="courseInfo.keepstudyStatus == 'Y'">继续学习</div>
                        <!-- 有练习 -->
                        <div class="exam btn" v-if="courseInfo.paperStatus == 'Y'" @click.stop="toExam(courseInfo)">课后练习</div>
                        <!-- 无练习 -->
                        <!-- <div class="no-exam btn" v-else @click.stop="showPopoper">课后练习</div> -->
                    </div>
                </div>
                <div class="course" v-if="courseInfo.coursewareType == 'L'" @click="toTaskDetailPage(courseInfo)">
                    <img class="play" src="./asset/images/live.png" />
                    <div class="left">
                        <div class="title">
                            {{ courseInfo.coursewareName }}{{ courseInfo.coursewareGroupname ? `(${courseInfo.coursewareGroupname})` : '' }}
                            <img class="lock" v-if="lockedStatus" src="./asset/images/clock.png" />
                        </div>
                        <div class="bottom">
                            <div class="start" v-if="courseInfo.coursewareBeginstate == 'S' && courseInfo.coursewareType == 'L'">直播中</div>
                            <div class="no-start" v-if="courseInfo.coursewareBeginstate == 'N'">未开始</div>
                            <div class="end-live" v-if="courseInfo.coursewareBeginstate == 'Y'">已结束</div>
                            <div class="live-time">{{ showLiveTime(courseInfo.coursewareStarttime) }}-{{ showLiveTime(courseInfo.coursewareEndtime) }}</div>
                            <!-- <div class="live-time">09:00-10:00</div> -->
                            <!-- <div class="status">—— 未开始</div> -->
                            <div class="status">—— {{ statusMap[courseInfo.coursewareBeginstate] }}</div>
                        </div>
                    </div>

                    <div class="btn-wrap np">
                        <img src="./asset/images/tlive.png" class="tlive" v-if="courseInfo.remindStatusname == '今日直播'" />
                        <img src="./asset/images/slive.png" class="slive" v-if="courseInfo.remindStatusname == '直播暂未开始'" />
                        <img src="./asset/images/flive.png" class="flive" v-if="courseInfo.remindStatusname == '直播回放'" />
                        <!-- 继续练习 -->
                        <!-- <div class="continue btn" v-if="false && courseInfo.coursewareOnlineurl && courseInfo.keepstudyStatus == 'Y'">继续学习</div> -->
                    </div>
                </div>

                <!-- 附件 -->
                <div class="courseware" v-if="['E', 'H'].includes(courseInfo.coursewareType)">
                    <img class="paper" src="./asset/images/shijuan.png" v-if="courseInfo.coursewareType == 'P'" />
                    <img class="paper" src="./asset/images/jiangyi.png" v-if="courseInfo.coursewareType == 'H' || courseInfo.coursewareType == 'E'" />
                    <div class="title">
                        {{ courseInfo.coursewareName }}
                        <img class="lock" v-if="lockedStatus" src="./asset/images/clock.png" />
                    </div>
                    <div class="btn-wrap" v-if="courseInfo.coursewareType == 'P'">
                        <div class="btn continue" @click.stop="toTaskDetailPage(courseInfo)" v-if="courseInfo.coursewareType == 'P'">去做题</div>
                        <div class="btn" @click.stop="toTaskDetailPage(courseInfo)">去做题</div>
                    </div>
                    <div class="btn" @click.stop="toTaskDetailPage(courseInfo)" v-else>
                        <img class="img" src="./asset/images/dw.png" />
                        下载
                    </div>
                </div>

                <div class="course-popover" ref="popover" v-if="false">
                    <div class="pcontent">暂无配套练习，去题库练</div>
                </div>
            </div>
        </template>

        <livePopup v-if="showLiveCourse" :cur-task="curTask" @closeTipPoup="closeTipPoup" />
    </div>
</template>
<script>
// studyStatus Y("已完成", "Y"), N("未学", "N"), S("学习中", "S")
import dayjs from 'dayjs';
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';

import livePopup from '../../livePopup/index.vue';

import courseStar from '../courseStar/index.vue';
export default {
    name: 'CourseChapter',
    components: {
        courseStar,
        livePopup,
    },
    props: {
        chapterInfo1: {
            type: Object,
            default() {
                return {};
            },
        },
        showChapterId: {
            type: String,
            default: '',
        },
        lockedStatus: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showLiveCourse: false,
            toggle: false,
            curTask: {},
            ctapId: this.$route.query.ctapId || '',
            statusMap: {
                Y: '已结束',
                S: '进行中',
                N: '未开始',
            },
            isPopover: false,
            chapterInfo: this.chapterInfo1,
            coursewareIds: [],
        };
    },
    computed: {
        answerBtnText() {
            return (data) => {
                if (
                    data?.coursewarePaper?.answerStyle === 'FZJK1' ||
                    data?.coursewarePaper?.answerStyle === 'FZJK2' ||
                    data?.coursewarePaper?.answerStyle === 'FZJK3'
                ) {
                    return '去机考';
                } else if (data?.coursewarePaper?.answerStyle === 'NORMAL') {
                    return '去做题';
                }
            };
        },
    },
    watch: {
        showChapterId: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    this.init();
                });
            },
        },
    },
    methods: {
        init() {
            if (this.showChapterId) {
                this.toggle = this.showChapterId == this.chapterInfo.catalogId;
            } else {
                // 判断
                this.toggle = this.chapterInfo.coursewares.some((res) => {
                    return res.keepstudyStatus == 'Y';
                });
            }

            if (this.$route.query.coursewareId) {
                this.$nextTick(() => {
                    let aEle = this.$refs[this.$route.query.coursewareId];
                    if (!aEle || aEle.length == 0) {
                        return;
                    }
                    let oEle = aEle[0];
                    let iSH = document.documentElement.clientHeight;

                    document.documentElement.scrollTop = this.getOffsetTop(oEle) - iSH / 2 + oEle.offsetHeight / 2;
                    document.body.scrollTop = this.getOffsetTop(oEle) - iSH / 2 + oEle.offsetHeight / 2;

                    history.pushState(null, null, `?ctapId=${this.$route.query.ctapId}`);
                });
            }
            if (this.toggle) {
                this.handleCoursewareIds();
            }
        },
        handleCoursewareIds() {
            this.chapterInfo.coursewares.forEach((item) => {
                this.coursewareIds.push(item.coursewareId);
            });
            this.getCoursewareData();
        },
        handleChapter() {
            this.toggle = !this.toggle;
            if (this.coursewareIds.length === 0) {
                this.handleCoursewareIds();
            }
        },
        getCoursewareData() {
            // 获取课程列表
            let data = {
                modulId: this.chapterInfo.coursewares[0].modulId,
                classId: this.$route.params.classId,
                coursewareIds: this.coursewareIds.toString(),
            };
            return this.$callRawApi({
                api: 'cc/user/usercw/display/module/courseware/extend/list',
                params: data,
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    let res = _reponse.getData();
                    this.chapterInfo.coursewares = this.chapterInfo.coursewares.map((r2) => {
                        res.data.forEach((item) => {
                            if (item.coursewareId === r2.coursewareId) {
                                r2 = {
                                    ...r2,
                                    ...item,
                                };
                            }
                        });
                        return r2;
                    });
                });
        },
        closeTipPoup() {
            this.showLiveCourse = false;
            this.curTask = {};
        },
        showLiveTime(t) {
            let time = t.split(' ')[1];
            let index = time.lastIndexOf(':');
            return time.substring(0, index);
        },
        //进度条
        percentage(item) {
            if (!item.studyrdDurationcount || !item.coursewareDuration) {
                return 0;
            } else {
                let rate = Math.round((item.studyrdDurationcount / item.coursewareDuration) * 100);
                if (rate > 100) {
                    rate = 100;
                }
                return rate;
            }
        },
        toTaskDetailPage(item, status) {
            if (this.lockedStatus) {
                this.$emit('tipShake');
                return;
            }
            // 学习任务列表跳转
            let params = {
                classId: item.classId,
                coursewareId: item.coursewareId,
                playrdNeed: 'Y',
            };

            if (item.coursewareType == 'L') {
                // 直播判断
                if (item.coursewareBeginstate == 'Y' && item.coursewareOnlineurl) {
                    //	[枚举]Y:已结束S:进行中N:未开始；针对直播和面授
                    if (item.coursewareVideoprividers == 'LV') {
                        window.open(`/pro-course-learn/${item.classId}/${item.coursewareId}?source=allTask&ctapId=${vm.ctapId}`);
                    }
                    // 广电圆点视频
                    else if (item.coursewareVideoprividers == 'LC') {
                        params.coursewareOnlineurl = item.coursewareOnlineurl;
                        this.coursewareVideoAuth(params);
                    }
                    //保利威;
                    else if (item.coursewareVideoprividers == 'LP') {
                        // window.open(`/inside/user/dotLivePage?coursewareId=${item.coursewareId}&classId=${item.classId}&source=learningCenter`);
                        window.open(`/pro-course-learn/${item.classId}/${item.coursewareId}?source=allTask&ctapId=${vm.ctapId}`);
                    }
                } else if (item.coursewareBeginstate == 'Y' && !item.coursewareOnlineurl) {
                    if (item.coursewareVideoprividers == 'LC') {
                        params.coursewareOnlineurl = item.coursewareLiveurl;
                        this.coursewareVideoAuth(params);
                    }
                } else {
                    this.curTask = item;
                    this.showLiveCourse = true;
                }
            } else if (item.coursewareType == 'S') {
                // 录播课
                if (item.coursewareVideoprividers == 'SP') {
                    window.open(`/pro-course-learn/${item.classId}/${item.coursewareId}?source=allTask&ctapId=${this.ctapId}`);
                } else if (item.coursewareVideoprividers == 'SC') {
                    // 广电圆点视频
                    params.coursewareOnlineurl = item.coursewareOnlineurl;
                    this.coursewareVideoAuth(params);
                }
            } else if (item.coursewareType == 'E' || item.coursewareType == 'H') {
                // 课件处理
                // 判断登录来源 -1时不可点击
                if (!this.$baseUI.clickStop()) {
                    return;
                }
                const __downloadParams = item.coursewareDownloadurl;
                let __url = __downloadParams;
                if (!(/^\/\//.test(__downloadParams) || /^http/.test(__downloadParams))) {
                    __url = niceloo.path.getServerFileDownloadPath(__downloadParams);
                }
                window.open(__url);
            } else if (item.coursewareType == 'P') {
                let that = this;
                let sendLogData = this.$parent.$parent.$parent.handleSendLogData();
                sendLogData.mycourse_class_name = item.className;
                sendLogData.mycourse_course_firstname = item.courseName;
                sendLogData.mycourse_course_secondname = this.chapterInfo.catalogName;
                sendLogData.mycourse_course_thirdname = item.coursewareName;
                sendLogData.mycourse_stage_name = item.modulName;

                this.paperAuthentication(item).then((res) => {
                    _haveAuthority(res.answerStyle);
                });
                function _haveAuthority(answerStyle) {
                    // 试卷处理 暂不处理
                    that.addPaperRecord(item).then(() => {
                        // 获取试卷信息
                        that.getCoursewareAnswersheetInfo(item).then((res) => {
                            let answersheetInfo = res;
                            if (!answersheetInfo) {
                                that.$baseUI.alert('试卷不正确，请联系客服');
                                return '';
                            }
                            /* eslint-disable */
                            const fullPath = encodeURIComponent(
                                `${that.$PageUtil.getOriginUrl()}${that.$route.fullPath}&classId=${item.classId}&coursewareId=${answersheetInfo.coursewareId}`
                            );
                            // 去做题按钮点击
                            if (
                                status === 'new' ||
                                (answersheetInfo.answerSheetStatus == 'A' && status === 'wholeLine') ||
                                (answersheetInfo.answerSheetStatus == 'A' && status === 'goon')
                            ) {
                                _jump(answerStyle, fullPath, answersheetInfo, that);
                                sendLogData.button_name = '去做题';
                            } else if (status === 'viewReport' && answersheetInfo.answerSheetStatus == 'A') {
                                sendLogData.button_name = '查看报告';
                                location.href = `/learningCenter/practicereport/${item.classId}?ctapId=${that.$route.query.ctapId}&paperId=${answersheetInfo.paperId}&answersheetId=${answersheetInfo.answerSheetId}&classUniquecode=${answersheetInfo.classUniquecode}&subjectId=${answersheetInfo.subjectId}&coursewareId=${answersheetInfo.coursewareId}`;
                            } else {
                                _jump(answerStyle, fullPath, answersheetInfo, that);
                            }
                        });
                        that.$yiguan.track('AIL_classitem_button', sendLogData);
                    });
                }
                function _jump(answerStyle, fullPath, answersheetInfo, that) {
                    if (answerStyle === 'NORMAL') {
                        //answerSheetId	答卷标识	String	否	空:没有做过
                        //answerSheetStatus	答卷状态	String	否	A:已完成;G:待继续;空:没有做过
                        if (answersheetInfo.answerSheetStatus == 'G' && answersheetInfo.answerSheetId) {
                            sendLogData.button_name = '继续做题';
                            location.href = `/exam/ks/goon/${answersheetInfo.classUniquecode}/${answersheetInfo.subjectId}/${answersheetInfo.paperId}/${answersheetInfo.answerSheetId}?url=${fullPath}&enableStatus=Y`;
                        } else {
                            sendLogData.button_name = '去做题';
                            location.href = `/exam/examinfo/${answersheetInfo.classUniquecode}/${answersheetInfo.subjectId}/${answersheetInfo.paperId}?url=${fullPath}&enableStatus=Y`;
                        }
                    } else if (answerStyle === 'FZJK1') {
                        location.href = `/exam/examinfo/${answersheetInfo.classUniquecode}/${answersheetInfo.subjectId}/${answersheetInfo.paperId}?url=${fullPath}&ctapId=${that.$route.query.ctapId}&enableStatus=Y`;
                        // location.href = `/exam/emulation/login?classUniquecode=${answersheetInfo.classUniquecode}&subjectId=${answersheetInfo.subjectId}&paperId=${answersheetInfo.paperId}&classId=${item.classId}&coursewareId=${answersheetInfo.coursewareId}&ctapId=${that.$route.query.ctapId}`;
                    } else if (answerStyle === 'FZJK2') {
                        location.href = `/exam/examinfo/${answersheetInfo.classUniquecode}/${answersheetInfo.subjectId}/${answersheetInfo.paperId}?url=${fullPath}&ctapId=${that.$route.query.ctapId}&enableStatus=Y`;
                        // location.href = `/exam/simulate?classUniquecode=${answersheetInfo.classUniquecode}&subjectId=${answersheetInfo.subjectId}&paperId=${answersheetInfo.paperId}&classId=${item.classId}&coursewareId=${answersheetInfo.coursewareId}&ctapId=${that.$route.query.ctapId}`;
                    } else if (answerStyle === 'FZJK3') {
                        // 试卷类课件打开消防类试卷不在经过中间页，直接进入登录页面
                        // PageUtil.href(`/emulation/fire-exam/login?classUniquecode=${this.classUniquecode}&subjectId=${this.subjectId}&paperId=${this.paperId}&classId=${classId}&coursewareId=${coursewareId}&ctapId=${this.$route.query.ctapId}`);
                        location.href = `/emulation/fire-exam/login?classUniquecode=${answersheetInfo.classUniquecode}&subjectId=${answersheetInfo.subjectId}&paperId=${answersheetInfo.paperId}&classId=${item.classId}&coursewareId=${item.coursewareId}&ctapId=${this.$route.query.ctapId}`;
                        // location.href = `/emulation/fire-exam/login?classUniquecode=${answersheetInfo.classUniquecode}&subjectId=${answersheetInfo.subjectId}/${answersheetInfo.paperId}?url=${fullPath}&ctapId=${that.$route.query.ctapId}&enableStatus=Y`;
                    }
                }
            }
        },
        // 试卷鉴权
        paperAuthentication(item) {
            let params = {
                paperId: item.paperId,
                classId: item.classId,
                coursewareId: item.coursewareId,
            };
            return  this.$callRawApi({
            api:  'igt/courseware_paper/authentication',
            params: params
        }).catch((err) => {
                this.$niceloo.api.handleFailure(err);
                return Promise.reject(err);
            }).then((res) => {
                console.log('通过getData返回数据');
                return res.getData();
            });
        },
        getCoursewareAnswersheetInfo(item) {
            let data = {
                paperId: item.paperId,
                classId: item.classId,
                coursewareId: item.coursewareId,
            };
            return  this.$callRawApi({
            api:  'igt/courseware/answer/info',
            params: data
        }).catch((err) => {
                this.$niceloo.api.handleFailure(err);
                return Promise.reject(err);
            }).then((res) => {
                console.log('通过getData返回数据');
                return res.getData();
            });
        },
        addPaperRecord(item) {
            // 播放记录添加
            let data = {
                playrds: [
                    {
                        classId: item.classId, //班级标识
                        coursewareId: item.coursewareId, //课件标识
                        coursewareName: item.coursewareName,
                        playRdIP: '', //播放记录IP
                        playRdStartTime: dayjs().format('YYYY-MM-DD hh:mm:ss'), //播放记录开始时间
                        playRdEndTime: dayjs().format('YYYY-MM-DD hh:mm:ss'), // 播放记录产生的时间
                        playRdDevice: 'W', //播放记录播放设备
                        playRdDeviceName: this.$platform.OS, //播放记录播放设备名称
                        playRdDeviceOS: 'W', //播放记录播放设备操作系统
                        playRdDeviceVersion: this.$platform.version, //播放记录设备版本号
                        playRdMcc: item.modulName + '-' + item.courseName + '-' + this.chapterInfo.catalogName, //模块课程目录名称
                        playRdDuration: 0, //播放记录播放时长
                        playRdOffLineStatus: 'P', //L:在线播放;O:离线播放
                        subjectId: this.subjectId, // 科目ID
                        courseId: this.courseId, // 课程IDS
                    },
                ],
            };

            return  this.$callRawApi({
            api:  'cc/playrd/batch/add',
            params: data
        }).catch((err) => {
                this.$niceloo.api.handleFailure(err);
                return Promise.reject(err);
            }).then((res) => {
                console.log('通过getData返回数据');
                return res.getData();
            });
        },
        coursewareVideoAuth(params) {
            // 视频鉴权
             this.$callRawApi({
            api:  'cc/courseware/video/auth',
            params: params
        }).catch((err) => {
                this.$niceloo.api.handleFailure(err);
                return Promise.reject(err);
            }).then((_reponse) => { let res = _reponse.getData();
                window.open(res.videoAddress);
            });
        },
        getOffsetTop(obj) {
            let t = obj.offsetTop;
            while ((obj = obj.offsetParent)) {
                t += obj.offsetTop;
            }
            return t;
        },
        getOffsetLeft(obj) {
            let t = obj.offsetLeft;
            while ((obj = obj.offsetParent)) {
                t += obj.offsetLeft;
            }
            return t;
        },
        showPopoper(ev) {
            // 显示没有课后练习的提示
            let oDiv = document.createElement('div');
            oDiv.classList.add('course-popover');
            oDiv.innerHTML = '<div class="pcontent">暂无配套练习，去题库练</div>';

            document.querySelector('body').appendChild(oDiv);

            let target = ev.target;
            let l = this.getOffsetLeft(target) + target.offsetWidth / 2 - oDiv.offsetWidth / 2;
            let t = this.getOffsetTop(target) + target.offsetHeight + 10;

            oDiv.style.left = `${l}px`;
            oDiv.style.top = `${t}px`;

            setTimeout(() => {
                document.querySelector('body').removeChild(oDiv);
            }, 1000);
        },
        toExam(item) {
            if (this.lockedStatus) {
                this.$emit('tipShake');
                return;
            }
            // 判断登录来源 -1时不可点击
            if (!this.$baseUI.clickStop()) {
                return;
            }
            let sendLogData = {
                department_name: '', // 部门名称
                project_position: item.projectName, // 项目名称
                college_name: item.collegeName, // 学院名称
                mycourse_course_firstname: item.courseName, // 课程一级目录
                mycourse_course_secondname: this.chapterInfo.catalogName, // 课程二级目录
                mycourse_course_thirdname: item.coursewareName, // 课程三级目录
                mycourse_class_name: item.className, // 班级名称
                mycourse_project_name: item.projectName, // 项目名称
                mycourse_stage_name: item.modulName, // 阶段名称
                mycourse_period_star: item.knowledgeStarLevel, // 课时星级
            };

            this.$yiguan.track('click_courselist_coursetest', sendLogData);
            // 去课后练习
            this.createPaper(item);
        },
        createPaper(item) {
            let data = {
                coursewareId: item.coursewareId,
                classId: item.classId,
            };

             this.$callRawApi({
            api:  'cc/coursewarepaper/generate',
            params: data
        }).catch((err) => {
                this.$niceloo.api.handleFailure(err);
                return Promise.reject(err);
            }).then((_reponse) => { let res = _reponse.getData();
                    window.open(`/learningCenter/homeworkpractice/${item.classId}/${item.modulId}/${item.coursewareId}/${res.paperId}?ctapId=${this.ctapId}`);
                })
                .catch((err) => {
                    this.$baseUI.alert(err.msg);
                });
        },
    },
};
</script>
<style lang="less">
.course-popover {
    position: absolute;
    &::after {
        content: '';
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 12px solid #fff;
        top: -6px;
        left: 50%;
    }
    .pcontent {
        background-color: #fff;
        font-size: 14px;
        color: #606266;
        padding: 18px 20px;
        line-height: 1.4;
        text-align: justify;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        background: #fff;
        min-width: 150px;
        border-radius: 4px;
        border: 1px solid #ebeef5;
    }
}
</style>
<style lang="less" scoped>
.lock {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-top: -2px;
    vertical-align: middle;
}
.chapter {
    line-height: 64px;
    margin-left: 55px;
    margin-right: 30px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f1f3f5;

    .history {
        padding: 1px 3px;
        background: #f8f9fa;
        border: 1px solid #d9dae2;
        border-radius: 3px;
        color: #8d90aa;
        font-size: 12px;
    }

    .mask {
        width: 32px;
        height: 16px;
        border: 1px solid #f8323c;
        border-radius: 3px;
        color: #f8323c;
        font-size: 12px;
        padding: 0 4px;
    }

    .top {
        overflow: auto;
        .chapter-title {
            float: left;
            line-height: 1;
            width: 96%;
            margin-top: 15px;
            .img {
                width: 16px;
                height: 16px;
                vertical-align: middle;
            }

            .title-wrap {
                font-size: 16px;
                color: #333;
                line-height: 1.5;
            }
        }

        .right {
            float: right;
        }
        .right {
            .status {
                display: inline-block;
                vertical-align: middle;
                width: 12px;
                height: 12px;
                margin-left: 14px;
                background-repeat: no-repeat;
                background-size: contain;

                &.down {
                    background-image: url(./asset/images/down.png);
                }

                &.up {
                    background-image: url(./asset/images/up.png);
                }
            }
        }
    }

    .courseware {
        height: 56px;
        line-height: 56px;
        padding-left: 25px;
        margin-bottom: 8px;
        background-color: #f4f5f7;

        &:hover {
            background-color: #fff8f6;
        }

        .paper {
            float: left;
            width: 16px;
            height: 16px;
            margin-top: 20px;
            margin-right: 8px;
        }

        .title {
            float: left;
            color: #53586c;
            font-size: 14px;
        }

        .btn {
            float: right;
            width: 70px;
            height: 26px;
            line-height: 26px;
            text-align: center;
            margin-top: 15px;
            margin-right: 25px;
            background: linear-gradient(301deg, #f8323c 0%, #ff737a 100%);
            border-radius: 13px;
            font-size: 12px;
            color: #fff;
            cursor: pointer;

            .img {
                width: 16px;
                height: 16px;
                vertical-align: middle;
                margin-right: 4px;
                margin-top: -3px;
            }
        }
    }

    .course {
        margin-bottom: 8px;
        padding: 15px 25px;
        overflow: auto;
        background-color: #f4f5f7;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        overflow-y: hidden;

        &:hover {
            background-color: #fff8f6;
        }

        .play {
            width: 16px;
            height: 16px;
            margin-top: 1px;
            float: left;
            vertical-align: middle;
            margin-right: 7px;
            position: absolute;
            top: 18px;
            left: 25px;
        }
        .paper {
            float: left;
            width: 16px;
            height: 16px;
            // margin-top: 20px;
            margin-right: 8px;
            position: absolute;
            top: 15px;
            left: 25px;
            position: absolute;
            top: 18px;
            left: 25px;
        }

        .left {
            float: left;
            margin-top: 2px;
            overflow: hidden;
            width: 100%;
            padding-left: 25px;
            padding-right: 85px;
            box-sizing: border-box;

            &.twoBtn {
                padding-right: 150px;
            }
        }
        .btn-wrap {
            float: right;
            line-height: 1;
            padding-top: 8px;
            position: absolute;
            right: 25px;
            top: 50%;
            transform: translateY(-50%);

            &.np {
                padding: 0;
                margin-top: -15px;
            }

            .tlive,
            .flive {
                width: 88px;
                height: 26px;
            }

            .slive {
                width: 100px;
                height: 26px;
            }

            .btn {
                display: inline-block;
                width: 70px;
                height: 26px;
                line-height: 26px;
                border-radius: 13px;
                text-align: center;
                font-size: 12px;
            }
            .continue {
                color: #f8323c;
                background: #fff7f5;
                border: 1px solid #f8323c;
                cursor: pointer;
            }
            .no-exam {
                color: #8d90aa;
                background: #ecedef;
                cursor: pointer;
            }
            .exam {
                background: linear-gradient(301deg, #f8323c 0%, #ff737a 100%);
                border: 1px solid #f8323c;
                color: #fff;
            }
        }
        .title {
            font-size: 14px;
            color: #53586c;
            line-height: 1.3;
            width: 100%;
            overflow: hidden;

            .txt {
                display: inline-block;
                //width: 100%;
                line-height: 1.3;
                vertical-align: middle;
                padding-bottom: 1px;
                .questionTime {
                    color: #8d90aa;
                    font-size: 14px;
                    margin-top: 5px;
                    .time {
                        &::after {
                            display: inline-block;
                            content: '';
                            width: 1px;
                            height: 10px;
                            background: #8d90aa;
                            display: inline-block;
                            margin: 0 13px;
                        }
                        &.isShowLint {
                            &::after {
                                display: none;
                            }
                        }
                    }
                    .span-text {
                        font-size: 12px;
                    }
                }
            }
        }

        .bottom {
            line-height: 1;
            margin-top: 10px;

            .funish {
                display: inline-block;
                color: #f8323c;
                font-size: 14px;
                font-weight: 400;

                &::before {
                    content: '';
                    width: 14px;
                    height: 14px;
                    display: inline-block;
                    background-image: url(./asset/images/funish.png);
                    background-size: 100% 100%;
                    vertical-align: middle;
                    margin-right: 5px;
                }
            }

            .start {
                display: inline-block;
                width: 50px;
                height: 20px;
                border: 1px solid #f8323c;
                border-radius: 11px;
                font-size: 12px;
                color: #f8323c;
                text-align: center;
                line-height: 20px;
            }

            .no-start {
                display: inline-block;
                width: 50px;
                height: 20px;
                background: #ffebd9;
                border-radius: 10px;
                color: #fb8715;
                font-size: 12px;
                text-align: center;
                line-height: 20px;
            }

            .end-live {
                display: inline-block;
                width: 50px;
                height: 20px;
                background: #ebedf0;
                border: 1px solid #d9dae2;
                border-radius: 11px;
                color: #53586c;
                font-size: 12px;
                text-align: center;
                line-height: 20px;
            }

            .live-time {
                display: inline-block;
                font-size: 12px;
                color: #8d90aa;
            }

            .status {
                display: inline-block;
                font-size: 12px;
                color: #8d90aa;
            }

            .stars {
                width: 100px;
                display: inline-block;
                padding-right: 65px;
            }

            .progress {
                display: inline-block;
                width: 70px;
                height: 4px;
                vertical-align: middle;
                background: #ebedf0;
                border-radius: 2px;

                .rate {
                    width: 30%;
                    height: 100%;
                    border-radius: 2px;
                    background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
                }
            }

            .peope {
                padding-left: 12px;
                display: inline-block;
                color: #8d90aa;
                font-size: 12px;

                .num {
                    color: #f8323c;
                }
            }
        }
    }
}
</style>
