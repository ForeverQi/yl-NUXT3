<template>
    <div>
        <div class="top" v-if="clientType === 'W' || clientType === 'P'">
            <div class="kc">
                <img class="logo" src="./asset/images/logo-live.png" alt="" />
                本节主讲课程：
                <span id="spCourseName">{{ title }}</span>
            </div>
            <div class="kr">
                <span @click="handleEva">
                    <img src="./asset/images/ev.png" alt="" />
                    评价
                </span>
            </div>
        </div>
        <comment-pop
            ref="CommentPop"
            v-show="cmtPop"
            @click="openCommentPop"
            @closeCmtPop="closeCmtPop"
            @submitComment="submitComment"
            :lable-type="labelType"
            :comment-info="commentInfo"
            :is-show-toast="cmtSuccess"
        ></comment-pop>
        <div class="live-wrap" :class="{ full: clientType !== 'W' && clientType !== 'P' }">
            <live-wrap
                v-if="showLivePlay"
                :class-id="classId"
                :courseware-id="coursewareId"
                :courseware-videoprividers="coursewareVideoprividers"
                :courseware-live-path="coursewareLivepath"
                :client-type="clientType"
                :enterlocal-time2="enterlocalTime2"
                :enterlocal-time="enterlocalTime"
                :local-start-time="localStartTime"
                :local-end-time="localEndTime"
            />
        </div>
        <div class="agree-dialog-window" v-if="isShowPopup">
            <vb-window :show="isShowPopup" class="agree-dialog-wrap">
                <div class="agree-wrap bounceInDown">
                    <div class="title">温馨提示</div>
                    <div class="content">
                        为了保障您集训课程的观看体验，
                        <span v-if="allowClient.indexOf('PC') !== -1 && !isPcClient">
                            请下载pc客户端进行学习，
                            <a href="javascript:;" @click="openPCClient">点击下载PC客户端</a>
                        </span>
                        <span v-else-if="allowClient.indexOf('WEB') !== -1 && isPcClient">
                            <vb-copy-text ref="vbCopyText" text="https://www.niceloo.com" @success="copySuccess" v-show="false"></vb-copy-text>
                            前往优路官网进行观看课程，
                            <a href="javascript:;" @click="copyLine">点击复制优路官网地址</a>
                        </span>
                        <span v-else-if="allowClient.indexOf('APP') !== -1 && isPcClient">
                            <vb-copy-text
                                ref="vbCopyText"
                                text="https://www.niceloo.com/zt1/huizong/ydkt/?e_id=S-12514"
                                @success="copySuccess"
                                v-show="false"
                            ></vb-copy-text>
                            前往优路APP进行观看课程，
                            <a href="javascript:;" @click="copyLine" style="color: #ff5644">点击复制优路APP下载地址</a>
                        </span>
                        <span v-else>
                            前往优路APP进行观看课程，
                            <a href="https://www.niceloo.com/zt1/huizong/ydkt/?e_id=S-12514" target="_blank">点击下载优路APP</a>
                        </span>
                    </div>
                    <div class="bottom-wrap">
                        <span class="btn" @click="backPage">确定</span>
                    </div>
                </div>
            </vb-window>
        </div>
    </div>
</template>
<script>
// 系统课直播中间页
import utilNiceloo from '@youlu/niceloo/libs/@xlib.01/lib/util/util._niceloo';
import VbCopyText from '@/www/components/inside/VbCopyText/index.vue';
import VbWindow from '@/www/components/inside/VbWindow/index.vue';
import LiveWrap from '@/www/components/inside/live-wrap/index.vue';
import commentPop from '@/www/components/learningCenter/commentModel/index.vue';
import '@/api/cc/api.CC1005.user-courseware-liveInfo.js';
import '@/api/cc/api.CMT1004.comment-exist.js';
import '@/api/cc/api.CC3041.courseware-live-status.js';
import '@/api/cc/api.OS4010.os-course-live-path.js';
import '@/api/cc/api.CMT1001.cmt-comment-add.js';
import '@/api/cc/api.CMT1002.cmt-comment-detail.js';
// 播放记录

export default {
    name: 'DoLivePage',
    components: {
        commentPop,
        LiveWrap,
        VbWindow,
        VbCopyText,
    },
    layout: 'nullLayout',
    data() {
        return {
            coursewareLivepath: 'about:blank',
            title: '',
            // 学习中心
            source: this.$route.query.source, //来自学习中心
            classId: this.$route.query.classId,
            coursewareId: this.$route.query.coursewareId,
            playrdMcc: '',
            scheduleId: '',
            coursewareBeginstate: '', //直播状态
            timeInterval: '', //定时器
            timenum: 0,
            _gap_time: 0,
            // 直播相关时间
            localStartTime: 0, //视频开始时间
            localEndTime: 0, //视频结束时间
            enterlocalTime: 0, //打开页面的时间
            gooutlocalTime: 0, //关闭页面的时间
            enterlocalTime2: 0, //进入页面时间    yyyy-MM-dd HH:mm:ss
            cmtPop: false,
            comment: false,
            commentInfo: {},
            courseInfo: {},
            lastOpenTime: 0,
            lastWatchTime: -1,
            cmtSuccess: false,
            labelType: 'LC',
            showLivePlay: false,
            coursewareVideoprividers: '', // 直播类型

            clientType: 'W', // M:移动端;P:PC客户端;W:Web端;H:H5;A:小程序
            playrdDevice: {
                playrdDevicename: '',
                playrdDeviceos: '',
                playrdDeviceversion: '',
            },
            allowClient: [], // 允许观看端的数组; PC:PC客户端;WEB:网页;APP:移动客户端
            isShowPopup: false, // 是否显示弹框
            isPcClient: false, // 是否是PC客户端嵌套的网页直播页
        };
    },
    created() {
        this.isPcClient = this.$route.query.isPcClient;
    },
    mounted() {
        if (this.$route.query.isJointLogin) {
            utilNiceloo.callApp('getToken', {}, (res) => {
                this.$User.setToken(res.data.token);
                this.$User.loginedo(() => {
                    this.init();
                });
            });
        } else {
            this.init();
        }
    },
    methods: {
        async init() {
            // 上报听课记录
            let user = await this.$User.getUser();
            let params = this.$storage.get((user || {}).userId + 'cc/playrd/batch/add');
            if (params)
                await this.$callRawApi({
                    api: 'cc/playrd/batch/add',
                    params,
                })
                    .catch((err) => {
                        this.$niceloo.api.handleFailure(err);
                        return Promise.reject(err);
                    })
                    .then((res) => {
                        console.log('通过getData返回数据');
                        return res.getData();
                    });
            this.$storage.set((user || {}).userId + 'cc/playrd/batch/add', null);
            // 上报听课记录结束

            this.clientType = 'W';
            Object.assign(this.playrdDevice, {
                playrdDevicename: this.$platform.browser,
                playrdDeviceos: this.$platform.OS,
                playrdDeviceversion: this.$platform.version,
            });

            // 获取直播信息
            return this.getSystemCourse().then(() => {
                // 系统课直播课
                this.liveStatus(() => {
                    this.showLivePlay = true;
                });
            });
        },
        getSystemCourse() {
            return new Promise((resolve, reject) => {
                this.$callApi('cc/user-courseware-liveInfo', {
                    coursewareId: this.coursewareId, // 课件ID
                    classId: this.classId, // 班级ID
                    referer: location.href,
                    ...this.playrdDevice,
                    onsuccess: (res) => {
                        this.allowClient = res.lookClient ? res.lookClient.split(',') : [];

                        // 如果网站端不允许观看时显示提示信息，并且不是客户端嵌套的网站端
                        if (this.allowClient.indexOf('WEB') === -1 && !this.isPcClient) {
                            this.isShowPopup = true;
                            return;
                        }

                        // 由于PC客户端嵌套的是网站的直播页面，所以当只允许网站和APP播放时显示提示信息
                        if (this.allowClient.indexOf('PC') === -1 && this.isPcClient) {
                            this.isShowPopup = true;
                            return;
                        }

                        this.title = res.title;
                        this.coursewareLivepath = res.coursewareLiveurl;
                        this.playrdMcc = res.playrdMcc;
                        this.coursewareBeginstate = res.coursewareBeginstate;
                        this.source = res.source;
                        this.scheduleId = res.scheduleId;
                        this.coursewareVideoprividers = res.coursewareVideoprividers;

                        // 2021-11-09 为了让app端不发版适配 百家云，跟丰新强老师沟通前端根据直播地址判断直播类型
                        if (res.coursewareVideoprividers === 'LV' && this.coursewareLivepath.indexOf('.baijiayun.com/') > -1) {
                            this.coursewareVideoprividers = 'HC';
                        }
                        resolve();
                    },
                    onerror: (err) => {
                        this.$baseUI.alert(err.getAttachedData().getMsg()).then((res) => {
                            this.backPage();
                        });
                        reject();
                    },
                    oncomplete: () => {},
                });
            });
        },
        backPage() {
            // 如果是PC客户端嵌套的该页面，点击确定只关闭弹框即可
            if (this.isPcClient) {
                this.isShowPopup = false;
                return;
            }

            let source = this.$route.query.form;
            if (source === 'allTask') {
                this.$PageUtil.href(`/learningCenter/index/learningTimetable`);
            } else if (source === 'myCourse') {
                // 我的班级
                this.$PageUtil.href(`/learningCenter/index/myCourse`);
            } else if (source === 'learningTimetable') {
                // 我的课表
                this.$PageUtil.href(`/learningCenter/index/learningTimetable`);
            } else if (source == 'attendanceRecord') {
                // 听课记录
                this.$PageUtil.href(`/learningCenter/index/attendanceRecord`);
            } else if (source == 'attendanceRecords') {
                // 历史听课记录
                this.$PageUtil.href(`/learningCenter/index/attendanceRecords`);
            } else {
                // 默认返回我的课表
                this.$PageUtil.href(`/learningCenter/index/learningTimetable`);
            }
        },
        handleEva() {
            this.checkEva();
        },
        checkEva() {
            let vm = this;
            this.liveStatus(() => {
                vm.$callApi('cc/comment-exist', {
                    commentBizid: vm.scheduleId,
                    onsuccess: (res) => {
                        if (!res.exist && vm.courseInfo.liveEvaluateState != 'B') {
                            this.$baseUI.alert(vm.courseInfo.liveTips);
                            return;
                        }
                        vm.openCommentPop();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            });
        },
        liveStatus(fn) {
            this.$callApi('cc/courseware-live-status', {
                coursewareId: this.coursewareId,
                classId: this.classId,
                onsuccess: (res) => {
                    this.enterlocalTime2 = this.$DateUtil.dateFmt('YYYY-MM-DD hh:mm:ss'); //yyyy-MM-dd HH:mm:ss
                    this.enterlocalTime = Date.parse(new Date()); //时间戳
                    var _time = this.enterlocalTime - Date.parse(new Date(res.currentTime)); //时间差
                    this.localStartTime = Date.parse(new Date(res.coursewareStarttime)) + _time;
                    this.localEndTime = Date.parse(new Date(res.coursewareEndtime)) + _time;
                    this.courseInfo = res;
                    // 20210719 处理直播排课标识为空的情况
                    this.scheduleId = this.scheduleId ? this.scheduleId : res.scheduleId;

                    this.coursewareBeginstate = res.coursewareBeginstate;
                    fn && fn();
                    if (this.coursewareBeginstate == 'S' || this.coursewareBeginstate == 'N') {
                        //播放10分钟 vm.comment = true;
                        this.watchTenMinutes(this.localStartTime);
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        osliveStatus() {
            this.$callApi('cc/os-course-live-path', {
                courseId: this.$route.query.courseId,
                onsuccess: (res) => {
                    this.courseInfo = res;
                    this.coursewareBeginstate = res.coursewareStatus > 2 ? 'Y' : 'S';

                    if (res.coursewareStatus == 1) this.comment = true;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //观看10分钟
        watchTenMinutes(time) {
            let vm = this;
            let lackTime = +time + 600000 - Date.parse(new Date());
            if (lackTime > 0) {
                setTimeout(() => {
                    vm.comment = true;
                }, lackTime);
            } else {
                this.comment = true;
            }
        },
        openCommentPop() {
            if (this.$route.query.catalogName && !this.comment && this.coursewareBeginstate != 'Y') {
                this.osliveStatus();
            }
            this.getCommentDetail();
        },
        //提交评价
        submitComment(data) {
            this.cmtPop = false;
            data.commentBizid = this.scheduleId ? this.scheduleId : this.coursewareId;
            data.commentBizname = this.playrdMcc
                ? `${this.playrdMcc}/${this.title}/${this.title}/${this.title}`
                : `${this.$route.query.courseName}/${this.$route.query.catalogName}/${this.title}`;
            data.projectId = this.courseInfo.projectId;
            data.subjectId = this.courseInfo.subjectId;
            data.commentBiztype = !this.playrdMcc ? 'PL' : 'SL';
            if (this.courseInfo.teacherUserid) {
                data.serveruserId = this.courseInfo.teacherUserid;
            }
            data.classId = this.classId;
            this.$callApi('cc/cmt-comment-add', {
                ...data,
                onsuccess: () => {
                    this.cmtPop = true;
                    this.$refs.CommentPop.commentSuccess();
                    this.cmtSuccess = true;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //获取评价详情
        getCommentDetail() {
            //如果评价获取评价内容
            this.$callApi('cc/cmt-comment-detail', {
                commentBizid: this.scheduleId ? this.scheduleId : this.coursewareId,
                onsuccess: (res) => {
                    this.commentInfo = res;
                    this.cmtPop = true;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //关闭评价弹窗
        closeCmtPop() {
            this.cmtPop = false;
        },

        // 点击负责官网链接
        copyLine() {
            this.$refs.vbCopyText.copyText();
        },

        // 复制成功
        copySuccess() {
            this.$baseUI.alert('复制成功');
        },

        //下载pc客户端
        openPCClient() {
            this.$clientUtil.openPcClient('niceloo://@isPclinetLive@true');
        },
    },
};
</script>
<style lang="less" scoped>
.top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    z-index: 20;
    background: #141518;
    // border-bottom: 2px solid #948787;
    width: 100%;
    display: flex;

    .kc {
        flex: 1;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        color: #fff;
        padding-left: 55px;
        font-family: '微软雅黑';
        margin-left: 5px;
    }

    .logo {
        vertical-align: middle;
        margin-right: 8px;
    }

    .kr {
        position: fixed;
        top: 0;
        right: 0;
        width: 500px;
        height: 50px;
        z-index: 99;
        text-align: right;
        vertical-align: middle;
        line-height: 55px;

        .user {
            font-size: 16px;
            line-height: 50px;
            color: #fff;
            font-family: '微软雅黑';
        }

        .MyBtn {
            float: right;
            padding: 7.5px 10px 7.5px 30px;
            cursor: pointer;
        }

        span {
            font-size: 16px;
            color: #fff;
            margin: 15px 38px 0;
            cursor: pointer;

            img {
                width: 22px;
                height: 24px;
                position: relative;
                top: 7px;
                margin-right: 2px;
            }
        }
    }
}

.live-wrap {
    position: absolute;
    top: 50px;
    left: 0px;
    width: 100%;
    height: calc(100% - 50px);
    // width：calc(100% - 10px);

    &.full {
        top: 0;
        height: 100%;
    }
}

.min-tip {
    position: fixed;
    bottom: 60px;
    left: 40px;
    z-index: 99;
}

.agree-dialog-window {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2010;
    background-color: rgba(0, 0, 0, 0.6);
}

.agree-dialog-wrap {
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
}

.agree-wrap {
    width: 430px;
    background: #ffffff;
    border-radius: 12px;

    .title {
        padding: 30px;
        text-align: center;
        color: #000;
        font-size: 20px;
        font-weight: 900;
        line-height: 22px;
    }

    .bar {
        width: 629px;
        height: 1px;
        background: #d8d8d8;
    }

    .content {
        padding: 0 30px 30px;
        font-size: 14px;
        font-weight: 400;
        color: #000000;
        line-height: 22px;
        text-align: center;

        a {
            color: #f66256;
        }
    }

    .bottom-wrap {
        text-align: center;
        padding-bottom: 18px;

        .btn {
            display: inline-block;
            width: 205px;
            height: 44px;
            background: linear-gradient(180deg, #ff5644 0%, #e73228 100%);
            border-radius: 12px;
            font-size: 16px;
            color: #fff;
            line-height: 44px;
            cursor: pointer;
        }
    }
}
</style>
