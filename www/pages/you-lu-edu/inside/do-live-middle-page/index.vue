<template>
    <div>
        <div class="live-wrap" :class="{ full: clientType !== 'W' && clientType !== 'P' }" v-if="showLivePlay">
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
        <dialog-mobile v-if="showErrorMsg" title="提示" :content="errMsg" @success="miniCallback">
            <template #default v-if="clientType === 'M'" class="popup-content">
                为了保障您集训课程的观看体验，
                <span v-if="allowClient.indexOf('PC') !== -1">
                    <vb-copy-text ref="vbCopyText" text="https://apiclient.niceloo.com/down/index.html" @success="copySuccess" v-show="false"></vb-copy-text>
                    请下载pc客户端进行学习，
                    <a href="javascript:;" @click="copyLine" style="color: #ff5644">点击复制PC客户端下载链接</a>
                </span>
                <span v-else>
                    <vb-copy-text ref="vbCopyText" text="https://www.niceloo.com" @success="copySuccess" v-show="false"></vb-copy-text>
                    前往优路官网进行观看课程，
                    <a href="javascript:;" @click="copyLine" style="color: #ff5644">点击复制优路官网地址</a>
                </span>
            </template>
        </dialog-mobile>

        <!-- 轻提示 -->
        <div v-if="isShowToast" class="toast">复制成功</div>
    </div>
</template>
<script>
// 系统课直播中间页,本页主要为了处理app中的url没有token的问题
import utilNiceloo from '@youlu/niceloo/libs/@xlib.01/lib/util/util._niceloo';
import LiveWrap from '@/www/components/inside/live-wrap';
import DialogMobile from '@/www/components/inside/dialog-mobile';

import '@/api/cc/api.CC1005.user-courseware-liveInfo.js';
import '@/api/cc/api.SC0101.sc-heartbeat.js';
import '@/api/cc/api.CMT1004.comment-exist.js';
import '@/api/cc/api.CC3041.courseware-live-status.js';
import '@/api/cc/api.OS4010.os-course-live-path.js';
import '@/api/cc/api.CMT1001.cmt-comment-add.js';
import '@/api/cc/api.CMT1002.cmt-comment-detail.js';

export default {
    name: 'DoLivePage',
    components: {
        DialogMobile,
        LiveWrap,
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
            errMsg: '', // 错误提示
            showErrorMsg: false, // 是否显示错误提示
            isLogin: true, // 默认时已登录
            allowClient: [], // 允许观看端的数组;PC:PC客户端;WEB:网页;APP:移动客户端
            isShowToast: false, // 是否显示轻提示
        };
    },
    mounted() {
        if (utilNiceloo.checkIfIsInsideYlApp() || window.__wxjs_environment === 'miniprogram') {
            // 添加head头
            let oMeta = document.createElement('meta');
            oMeta.name = 'viewport';
            oMeta.content = 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0';
            document.querySelector('head').append(oMeta);
        }
        if (!this.$route.query.isPcClient && utilNiceloo.checkIfIsInsideYlApp()) {
            // APP
            // 判断是否再app中
            this.clientType = 'M';
            this.appHandle();
        } else if (window.__wxjs_environment === 'miniprogram') {
            // 小程序
            // 判断是否再小程序中
            this.clientType = 'A';
            // 添加微信jssdk
            let oScript = document.createElement('script');
            oScript.src = 'https://res2.wx.qq.com/open/js/jweixin-1.6.0.js';
            oScript.onload = () => {
                // 调用微信处理逻辑
                this.miniprogramHandle();
            };
            document.querySelector('head').append(oScript);
        } else {
            this.goDoLivePage();
        }
    },
    beforeDestroy() {},
    methods: {
        init() {
            // 获取直播信息
            return this.getSystemCourse().then(() => {
                this.showLivePlay = true;
            });
        },
        getSystemCourse() {
            let that = this;
            return new Promise((resolve, reject) => {
                this.$callApi('cc/user-courseware-liveInfo', {
                    coursewareId: this.coursewareId, // 课件ID
                    classId: this.classId, // 班级ID
                    referer: location.href,
                    ...this.playrdDevice,
                    onsuccess: (res) => {
                        this.allowClient = res.lookClient ? res.lookClient.split(',') : [];
                        if (this.clientType === 'M' && this.allowClient.indexOf('APP') === -1) {
                            this.showErrorMsg = true;
                            return;
                        }

                        document.title = res.title;
                        that.title = res.title;
                        that.coursewareLivepath = res.coursewareLiveurl;

                        that.coursewareVideoprividers = res.coursewareVideoprividers;
                        // 2021-11-09 为了让app端不发版适配 百家云，跟丰新强老师沟通前端根据直播地址判断直播类型
                        if (res.coursewareVideoprividers === 'LV' && that.coursewareLivepath.indexOf('.baijiayun.com/') > -1) {
                            that.coursewareVideoprividers = 'HC';
                        }
                        that.playrdMcc = res.playrdMcc;
                        that.coursewareBeginstate = res.coursewareBeginstate;
                        that.source = res.source;
                        that.scheduleId = res.scheduleId;
                    },
                    onerror: (err) => {
                        that.errorDialog(err.getAttachedData().getMsg());
                        /*this.$niceloo.api.handleFailure(err);*/
                    },
                    oncomplete: () => {},
                });
            });
        },
        appHandle() {
            new Promise((resolve) => {
                utilNiceloo.callApp('getCType', {}, (result) => {
                    Config.ctype = result.ctype;
                    utilNiceloo.callApp('getLoginStatus', {}, (result) => {
                        if (result.isLogin) {
                            resolve();
                        } else {
                            utilNiceloo.callApp('handlerMSException', {
                                code: 'GB2006',
                                msg: '登录已过期',
                            });
                        }
                    });
                });
            })
                .then(() => {
                    return new Promise((resolve) => {
                        /*let that = this;*/
                        utilNiceloo.callApp('getToken', {}, (result) => {
                            //APP版本号
                            this.$User.setToken(result.token);
                            this.$User.loginedo(() => {
                                resolve();
                            });
                        });
                    });
                })
                .then(() => {
                    return new Promise((resolve) => {
                        utilNiceloo.callApp('getAppVersion', {}, (result) => {
                            // APP版本号
                            resolve(result.version);
                        });
                    });
                })
                .then((version) => {
                    utilNiceloo.callApp('getOsType', {}, (result) => {
                        // APP版本号
                        Object.assign(this.playrdDevice, {
                            playrdDevicename: this.$platform.browser || '',
                            playrdDeviceos: result.osType || result.version,
                            playrdDeviceversion: version,
                        });

                        this.init().then(() => {
                            utilNiceloo.callApp('setTitle', {
                                title: this.title,
                                size: 16,
                                color: '#ff333333',
                            });
                        });
                    });
                });
        },
        miniprogramHandle() {
            // 小程序处理逻辑
            //1、判断token是否有效
            this.$User.setToken(this.$urlUtils.getUrlParam('TOKEN'));
            let cType = this.$urlUtils.getUrlParam('ctype');
            if (cType) {
                Config.ctype = this.$urlUtils.getUrlParam('ctype');
            }
            this.$callApi('cc/sc-heartbeat', {
                onsuccess: () => {
                    if (res.token) {
                        Object.assign(this.playrdDevice, {
                            playrdDevicename: this.$urlUtils.getUrlParam('system'),
                            playrdDeviceos: this.$urlUtils.getUrlParam('platform'),
                            playrdDeviceversion: this.$urlUtils.getUrlParam('version'),
                        });

                        this.init();
                    } else {
                        // res.token 不存在的时候 是token无效
                        this.isLogin = false;
                        this.showErrorMsg = true;
                        this.errMsg = '您还没有登录！';
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        miniCallback() {
            this.showErrorMsg = false;

            // 如果是APP
            if (this.clientType === 'M') {
                utilNiceloo.callApp('closePage', {}, () => {});
                return;
            }

            if (this.isLogin) {
                wx.miniProgram.navigateBack({});
            } else {
                wx.miniProgram.reLaunch({
                    url: UrlUtil.getUrlParam('path'),
                });
            }
        },
        errorDialog(err) {
            if (this.clientType === 'M') {
                utilNiceloo.callApp(
                    'alert',
                    {
                        title: '提示',
                        message: err,
                        okButton: '是',
                        cancelButton: '否',
                    },
                    () => {
                        this.backPage();
                    }
                );
            } else if (this.clientType === 'A') {
                this.showErrorMsg = true;
                this.errMsg = err;
            } else {
                this.$baseUI.alert(err).then((res) => {
                    this.backPage();
                });
            }
        },
        backPage() {
            if (this.clientType === 'M') {
                utilNiceloo.callApp('closePage', {}, () => {});
                return;
            }
            let source = this.$route.query.form;

            if (source === 'allTask') {
                // 学习任务列表
                this.$PageUtil.href(`/learningCenter/allTask/${this.classId}?ctapId=${this.ctapId}`);
            } else if (source === 'myCourse') {
                // 我的班级
                this.$PageUtil.href(`/learningCenter/index/myCourse`);
            } else if (source === 'learningTimetable') {
                // 我的课表
                this.$PageUtil.href(`/learningCenter/index/learningTimetable`);
            } else if (source == 'attendanceRecord') {
                // 听课记录
                this.$PageUtil.href(`/learningCenter/index/learningTimetable`);
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
                    var _time = vm.enterlocalTime - Date.parse(new Date(res.currentTime)); //时间差
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

        // 跳转到直播页面
        goDoLivePage() {
            this.$router.replace({
                path: '/inside/user/dotLivePage',
                query: this.$route.query,
            });
        },

        // 点击负责官网链接
        copyLine() {
            this.$refs.vbCopyText.copyText();
        },

        // 复制成功
        copySuccess() {
            this.isShowToast = true;
            setTimeout(() => {
                this.isShowToast = false;
            }, 2500);
        },
    },
};
</script>
<style lang="less" scoped>
.live-wrap {
    position: absolute;
    top: 55px;
    left: 0px;
    width: 100%;
    height: calc(100% - 55px);
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

.toast {
    padding: 10px 20px;
    color: #fff;
    position: fixed;
    left: 50%;
    bottom: 10%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    border-radius: 10px;
}
</style>
