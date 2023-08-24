<template>
    <div class="top" :style="showMax ? 'height: 685px' : 'height: 73px'" v-if="liveList.length > 0">
        <template v-if="showMax">
            <div class="section">
                <div class="live-play">
                    <template v-if="liveInfo.liveStatus === 3">
                        <vb-video
                            v-if="(isLogin === true || curCourseInfo.auditionStatus !== 'N') && showVideo"
                            ref="vbVideo"
                            @ready="courseReady"
                            @isFullScreen="doFullScreen"
                            @afterDestory="videoRest"
                            :is-overflow="true"
                        >
                            <div class="tip" slot="mask" v-if="showVideoTip">
                                <!-- 限时试听 -->
                                <template v-if="curCourseInfo.auditionStatus === 'L'">
                                    试看{{ !tryViewEnd ? `${curCourseInfo.auditionDuration}分钟` : '已结束' }}，登录后观看完整视频
                                </template>
                                <!-- 整节试听 -->
                                <template v-if="curCourseInfo.auditionStatus === 'F'">试看{{ !tryViewEnd ? `本小节` : '已结束' }}，登录后观看完整视频</template>
                                <span class="toLogin" @click="toLogin">去登录</span>
                                <img @click="showTip = false" src="./asset/images/close.png" class="close" />
                            </div>
                        </vb-video>
                        <div v-else class="live-cover">
                            <!-- 未登录或者不允许试听 -->
                            <img :src="compPicPath(liveInfo.liveCover)" />
                        </div>
                        <div class="course-btn" @click="toLiveDetail" @mouseenter="btnHover = true" @mouseleave="btnHover = false">
                            <img src="./asset/images/ltime.png" v-if="btnHover" />
                            <img src="./asset/images/ltime1.png" v-else />
                            完整回放
                        </div>
                    </template>
                    <template v-else>
                        <iframe allow="*" allowfullscreen="true" v-if="liveInfo.liveStatus === 2" class="live-wrap" :src="liveInfo.livePath"></iframe>
                        <div v-else-if="liveInfo.liveStatus === 1" class="live-cover">
                            <img :src="compPicPath(liveInfo.liveCover)" />
                        </div>
                        <div class="status-wrap course"></div>
                        <!-- 直播中 -->
                        <div
                            class="btn2"
                            @click="toLiveDetail"
                            v-if="liveInfo.liveStatus === 2 || liveInfo.liveStatus === 4"
                            @mouseenter="btnHover = true"
                            @mouseleave="btnHover = false"
                        >
                            <img src="./asset/images/liveInfo.gif" v-if="btnHover" />
                            <img src="./asset/images/liveInfo-1.gif" v-else />
                            进入直播间
                        </div>
                        <!-- 直播即将开始 - 未预约 -->
                        <div
                            class="btn3"
                            v-if="liveInfo.liveStatus === 1 && liveInfo.appointmentStatus === 'N'"
                            @click="doAppointment"
                            @mouseenter="btnHover = true"
                            @mouseleave="btnHover = false"
                        >
                            <img src="./asset/images/livehua2.png" v-if="btnHover" />
                            <img src="./asset/images/livehua.png" v-else />
                            上课提醒
                        </div>
                        <div
                            class="btn3"
                            v-if="liveInfo.liveStatus === 1 && liveInfo.appointmentStatus === 'Y'"
                            @click="toLiveDetail"
                            @mouseenter="btnHover = true"
                            @mouseleave="btnHover = false"
                        >
                            <img src="./asset/images/y-order2.png" v-if="btnHover" />
                            <img src="./asset/images/y-order.png" v-else />
                            已预约
                        </div>
                        <div class="time" v-if="liveInfo.liveStatus === 1">
                            距直播开始还剩：
                            <template v-if="countDownObj && countDownObj.day">
                                <span class="num">{{ countDownObj.day }}</span>
                                天
                            </template>
                            <span class="num">{{ countDownObj.hour }}</span>
                            :
                            <span class="num">{{ countDownObj.minutes }}</span>
                            :
                            <span class="num">{{ countDownObj.seconds }}</span>
                        </div>
                    </template>
                </div>
                <div class="live-list">
                    <div class="item" v-for="(item, index) in liveList" :key="item.liveId">
                        <img src="./asset/images/left.png" class="left" v-if="selectIndex === index" />
                        <div class="item-wrap" :class="{ this: selectIndex === index }" @click="cheangeIndex(index)">
                            <div class="mask" v-if="selectIndex !== index"></div>
                            <img :src="compPicPath(item.liveCover)" />
                            <div class="tag">
                                <div class="live-status-wrap" v-if="item.liveStatus === 2">
                                    <img class="status" src="./asset/images/liveInfo.gif" />
                                </div>
                                {{ item.shortType ? item.shortType : item.type }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="live-info">
                <div class="wrap">
                    <div class="left">
                        <div class="name">
                            {{ liveInfo.name }}
                        </div>
                        <div class="tag-txt" v-if="liveInfo.liveStatus === 1">即将开始</div>
                        <div class="tag-txt" v-else-if="liveInfo.liveStatus === 2">正在直播</div>
                        <div class="tag-txt" v-else-if="liveInfo.liveStatus === 4">已结束</div>
                        <div class="course-list" v-else-if="liveInfo.liveStatus === 3 && liveInfo.wareDtoList.length > 1" @click="changeCourse">
                            {{ `第${curCourseIndex + 1}节` }}
                        </div>
                    </div>
                    <div class="more" @click="toLiveDetail2">
                        查看详情
                        <img src="./asset/images/right.png" />
                    </div>
                </div>
            </div>
            <div class="handle" @click="changeType">
                <img src="./asset/images/up.png" />
                收起直播间
            </div>
        </template>
        <template v-else>
            <div class="live-name">
                {{ liveInfo.name }}
            </div>
            <div class="handle" @click="changeType">
                <img src="./asset/images/dw.png" />
                展开直播间
            </div>
        </template>
        <div class="courselist" v-if="showCourseList" ref="courseList">
            <div class="course-wrap">
                <div
                    class="item"
                    :class="{ this: curCourseIndex === index }"
                    v-for="(item, index) in liveInfo.wareDtoList"
                    :key="item.coursewareId"
                    @click="changeCourseItem(item, index)"
                >
                    <div class="tag">第{{ index + 1 }}节</div>
                    {{ item.coursewareName }}
                </div>
            </div>
        </div>
        <img src="./asset/images/left-down.png" class="left-down" />
        <img src="./asset/images/right-up.png" class="right-up" />
    </div>
</template>
<script>
/**
 * 直播状态
 * 直播中         ---- 1
 * 直播即将开始    --- 1
 * 直播结束        --- 0
 * 直播结束录播课   --- 直播结束并且已经上传了录播课程
 */
// 首页直播列表
import { mapState, mapMutations } from 'vuex';
import '@/api/api.mcu.mcp-home-top-live-list.js'; // 直播列表
import '@/api/api.mcu.mcp-home-top-live-info.js'; // 直播详情
import '@/api/api.mcu01.mcp-home-top-live-subscribe.js'; // 直播订阅
import '@/api/mcu/api.mcu-001.public-extensioncenter-receive.js'; // 行为推送

import dayjs from 'dayjs';
import vbVideo from '@/www/components/business/vbVideo/index.vue';
export default {
    components: {
        vbVideo,
    },
    props: {
        projectOrgId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isLogin: false, // 是否登录

            selectIndex: 0,
            showMax: true,
            showCourseList: false,
            isFullScreen: false,
            tryViewEnd: false, // 试看是否结束
            showTip: true, // 默认显示视频提示

            btnHover: false, // 按钮是否被鼠标划过

            liveList: [], // 直播列表
            liveInfo: {
                // 直播详情
                liveId: '',
            },

            curCourseInfo: {
                // 当前播放课件信息
                coursewarePath: '',
                coursewareId: '',
                coursewareName: '',
                auditionStatus: '', // 试听状态
                auditionDuration: 0,
            },
            curCourseIndex: 0,

            countDownObj: {}, // 倒计时显示对象

            playPromise: null,
            playResolve: null,
            playReject: null,
            PlayReturn: null,

            apisMap: {
                // 接口映射
                'mcp/liveCourse/web/list': 'topLive/mcp-home-top-live-list',
                'mcp/liveCourse/web/detail': 'topLive/mcp-home-top-live-info',
                'mcp/liveCourse/web/appointment': 'topLive/mcp-home-top-live-subscribe', // 直播订阅
                'es/clue/common/receive': 'public/public-extensioncenter-receive',
            },
            timer: null,

            showVideo: true,
            isFirst: true,
        };
    },
    computed: {
        compPicPath() {
            return (path) => {
                return this.$urlUtils.getViewUrl(path);
            };
        },
        showVideoTip() {
            return this.showTip && !this.isLogin && (this.curCourseInfo.auditionStatus === 'F' || this.curCourseInfo.auditionStatus === 'L');
        },
        getCurrentLiveInfo() {
            return this.liveList[this.selectIndex] ? this.liveList[this.selectIndex] : null;
        },
        ...mapState('mcuStore', ['projectId', 'pageName', 'remark', 'liveUpdate']),
        ...mapState('logout', ['islogin']),
    },
    watch: {
        liveUpdate(val) {
            console.warn('liveCalendarUpdate', val, this.liveInfo.liveId);
            val && val === this.liveInfo.liveId && this.getLiveInfo();
        },
        islogin(val) {
            // 原先已经是登录状态不做处理
            if (!this.isLogin && val) {
                this.isLogin = true;
                this.showVideo = false;
                this.getLiveList();
            }
        },
    },
    mounted() {
        this.init();
        window.addEventListener('click', this.closeCourseList);
    },
    destroyed() {
        window.removeEventListener('click', this.closeCourseList);
    },
    methods: {
        ...mapMutations('mcuStore', ['setRemark', 'setLiveUpdate', 'setProjectId']),
        init() {
            this.showVideo = false;
            this.videoRest();
            return Promise.all([this.doGetLogin(), this.getLiveList()]);
        },
        doGetLogin() {
            return this.$mcuLogin
                .checkLogin('login')
                .then(() => {
                    this.isLogin = true;
                })
                .catch(() => {
                    this.isLogin = false;
                });
        },
        videoRest() {
            // 视频组件销毁后重置
            this.PlayReturn = null;
            this.playPromise = new Promise((resolve, reject) => {
                this.playResolve = resolve;
                this.playReject = reject;
            });
        },
        getLiveList() {
            // 获取直播列表
            let data = {
                url: 'mcp/liveCourse/web/list',
                params: {
                    showClient: 'W',
                    // projectId: this.projectOrgId,
                    indexFlag: true,
                    pageIndex: 1,
                    pageSize: 8,
                },
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                this.liveList = res.data;
                this.cheangeIndex(this.selectIndex);
                return res;
            });
        },
        cheangeIndex(index) {
            this.selectIndex = index;
            this.getLiveInfo();
        },
        getLiveInfo() {
            if (!this.getCurrentLiveInfo) {
                // 当前直播信息为空时，不在获取直播详情
                return;
            }
            // 获取直播详情
            let data = {
                url: 'mcp/liveCourse/web/detail',
                params: {
                    liveId: this.getCurrentLiveInfo.liveId,
                },
                isCustom: true,
            };
            this.showVideo = false;
            return this.httpClient(data)
                .then((res) => {
                    this.liveInfo = res;
                    this.curCourseIndex = 0;
                    if (res.liveStatus === 3) {
                        this.curCourseInfo = this.liveInfo.wareDtoList[this.curCourseIndex];
                        if (!this.isLogin && this.curCourseInfo.auditionStatus === 'N') {
                            // 不允许试听
                            return;
                        }
                        this.showVideo = true;
                        this.playPromise.then(() => {
                            this.playCourse();
                        });
                    } else if (res.liveStatus === 1) {
                        this.videoRest();
                        // 即将开始
                        let startTime = dayjs(res.liveStartTime).unix(); // 直播开始时间
                        let curTime = res.currentTime; // 当前时间
                        if (this.timer) {
                            this.timer.stopTime();
                        }
                        this.timer = this.$countDown.runTime(startTime, curTime, (obj) => {
                            if (typeof obj === 'undefined') {
                                // 倒计时技术重新获取详情
                                this.getLiveInfo();
                            } else {
                                this.countDownObj = obj;
                            }
                        });
                    }
                })
                .catch((err) => {
                    let _this = this;
                    if (typeof err.getCategory !== 'function' || err.getCategory() === 'NETWORK') {
                        // 网络错误不在处理
                        return Promise.reject();
                    }
                    this.$baseUI
                        .alert(err.getDescription(), ' 提示', {
                            success(res) {
                                if (res.confirm) {
                                    _this.$PageUtil.reflush();
                                }
                            },
                        })
                        .catch(() => {
                            if (err.getAttachedData().getData().code === '4999') {
                                location.reload();
                            }
                        });

                    return Promise.reject();
                });
        },
        changeType() {
            this.showMax = !this.showMax;
            this.$yiguan.mcuTrack('wk_homepage_button', {
                ail_button_name: this.showMax ? '收起直播间' : '展开直播',
            });
        },
        changeCourse(ev) {
            this.showCourseList = !this.showCourseList;
            this.$nextTick(() => {
                if (this.$refs.courseList) {
                    this.$refs.courseList.style.left = `${ev.clientX - 179}px`;
                }
            });
        },
        changeCourseItem(item, index) {
            if (index === this.curCourseIndex) {
                // 切换前和切换后的课件是同一个
                return;
            }
            this.curCourseIndex = index;
            this.curCourseInfo = item;
            if (!this.isLogin && this.curCourseInfo.auditionStatus === 'N') {
                // 不允许试听
                return;
            }
            if (item.coursewarePath === this.curCourseInfo.coursewarePath) {
                // 切换前和切换后的课件VID是同一个的情况
                this.showVideo = false;
                this.$nextTick(() => {
                    this.doChangeCourseItem();
                });
            } else {
                // 正常情况
                this.doChangeCourseItem();
            }
        },
        doChangeCourseItem() {
            this.showVideo = true;
            this.playPromise.then(() => {
                this.playCourse();
            });
        },
        closeCourseList(ev) {
            ev.stopPropagation();
            let className = ev.target.className;
            if (className !== 'course-list' && className !== 'course-wrap') {
                this.showCourseList = false;
            }
        },
        doAppointment() {
            this.getLiveInfo().then(() => {
                this.doAppointment2();
            });
        },
        doAppointment2() {
            // 预约
            let tmpProjectId = this.projectId;
            if (tmpProjectId === this.liveInfo.projectId) {
                this.setProjectId(this.liveInfo.projectId);
            }
            this.setRemark(`【直播间】${this.liveInfo.name}`);
            this.$mcuLogin
                .checkLogin('appointment')
                .then((res) => {
                    // 已经登录的直接执行调用预约接口
                    if (res.isFirst === true) {
                        return this.getLiveInfo()
                            .then(() => {
                                if (this.liveInfo.appointmentStatus === 'Y') {
                                    return Promise.resolve();
                                } else {
                                    return this.doSubsribe();
                                }
                            })
                            .then(() => {
                                this.init();
                                this.setLiveUpdate(this.liveInfo.liveId);
                            });
                    } else {
                        return this.doSubsribe().then(() => {
                            this.publicExtensioncenterReceive();
                            this.init();
                            this.setLiveUpdate(this.liveInfo.liveId);
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    if (err.type && err.type === 'close') {
                        if (tmpProjectId === this.liveInfo.projectId) {
                            this.setProjectId(tmpProjectId);
                        }
                    }
                });
        },
        async publicExtensioncenterReceive() {
            let letclueExtension = await this.$PromotionUtil.mcuClueOrBeHavior({
                clueWaycode: 'yindao',
                projectId: this.projectId,
                pageName: this.pageName,
                remark: `【直播预约】${this.liveInfo.name}`,
            });
            let param = JSON.parse(letclueExtension);
            let data = {
                url: 'es/clue/common/receive',
                params: {
                    ...param,
                },
                isCustom: true,
            };
            this.httpClient(data);
        },
        doSubsribe() {
            let data = {
                url: 'mcp/liveCourse/web/appointment',
                params: {
                    liveId: this.getCurrentLiveInfo.liveId,
                },
                isCustom: false,
            };
            return this.httpClient(data)
                .then(() => {
                    this.$Message.success('预约成功！');
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        playCourse() {
            this.showTip = true;
            if (!this.isLogin && this.curCourseInfo.auditionStatus === 'N') {
                // 不允许试听
                return;
            }
            // 视频播放
            let param = {
                videoId: this.curCourseInfo.coursewarePath,
                type: 'P',
                // bizId: this.curCourseInfo.coursewareId,
                goodsId: this.liveInfo.liveId,
                autoplay: true,
                coursewareId: this.curCourseInfo.coursewareId,
                volume: 0,
            };
            // 默认试看未结束
            this.tryViewEnd = false;
            let options = {
                volume: 0,
                goodsId: this.liveInfo.liveId,
                coursewareId: this.curCourseInfo.coursewareId,
                watchEndTime: null,
            };
            if (!this.isLogin && this.curCourseInfo.auditionStatus === 'L') {
                options.watchEndTime = this.curCourseInfo.auditionDuration * 60;
            }

            if (this.PlayReturn) {
                param.watchEndTime = options.watchEndTime;
                this.PlayReturn.changeVid(param);
            } else {
                this.$refs.vbVideo
                    .playVid(param, options)
                    .then((instance) => {
                        (this.PlayReturn = instance).start(() => {
                            if (this.isFirst) {
                                this.isFirst = false;
                                instance.setVolume(0);
                            }
                            this.$yiguan.mcuTrack('wk_course_play', {
                                course_name: this.curCourseInfo.coursewareName,
                                mycourse_subject_name: this.curCourseInfo.subjectId,
                                web_is_order: this.curCourseInfo.appointmentStatus === 'Y',
                                course_type: '直播间课程', // 来源
                                paly_type: '看回放', // 来源
                                ail_page_source: window.location.href, // 来源
                            });
                        });
                        // this.PlayReturn.setVolume(0);
                        this.PlayReturn.over(() => {
                            // 播放完触发
                            this.tryViewEnd = true;
                            this.showTip = true;
                        });
                    })
                    .catch((err) => {
                        this.$baseUI.alert(err);
                    });
            }
        },
        courseReady() {
            // 点播课组件初始化成功
            this.playResolve && this.playResolve();
        },
        doFullScreen(type) {
            this.isFullScreen = type;
        },
        toLogin() {
            if (this.isFullScreen) {
                window.onFullscreenProxy();
            }
            this.$mcuLogin.checkLogin().then((res) => {
                this.isLogin = true;
                this.showVideo = false;
                this.getLiveList();
            });
        },
        toLiveDetail2() {
            this.$PageUtil.openNewPage(`/agile-course/live-broadcast/${this.liveInfo.liveId}`);
        },
        toLiveDetail() {
            // 去直播页面
            this.$mcuLogin.checkLogin().then((res) => {
                if (this.curCourseInfo.coursewareId) {
                    this.$PageUtil.openNewPage(`/agile-course/live-broadcast/${this.liveInfo.liveId}?coursewareId=${this.curCourseInfo.coursewareId}`);
                } else {
                    this.$PageUtil.openNewPage(`/agile-course/live-broadcast/${this.liveInfo.liveId}`);
                }
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
};
</script>
<style lang="less" scoped>
.live-cover {
    height: 100%;
    width: 100%;

    img {
        width: 100%;
        height: 100%;
    }
}
.left-down {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 413px;
    height: 292px;
    z-index: -1;
}
.right-up {
    position: absolute;
    top: 0;
    right: 0;
    width: 413px;
    height: 292px;
    z-index: -1;
}
.tip {
    position: absolute;
    color: #ffffff;
    font-size: 13px;
    z-index: 20;
    bottom: 51px;
    left: 0;
    height: 40px;
    line-height: 40px;
    padding-left: 16px;
    padding-right: 23px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 0px 100px 100px 0px;

    .toLogin {
        color: #1791ff;
        margin-left: 10px;
        cursor: pointer;
    }

    .close {
        width: 18px;
        height: 18px;
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
    }
}
.course-btn {
    position: absolute;
    top: 50%;
    width: 182px;
    height: 58px;
    line-height: 58px;
    text-align: center;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 6px;
    font-size: 18px;
    color: #7ab1ff;
    left: 50%;
    margin-left: -91px;
    margin-top: -29px;
    cursor: pointer;
    border: 2px solid #4492ff;
    box-sizing: border-box;

    &:hover {
        border: none;
        padding: 2px;
        color: #ffffff;
        background: linear-gradient(93deg, #3a85fe 3%, #025eff 97%);
    }
    img {
        width: 20px;
        height: 20px;
        margin-right: 2px;
        margin-bottom: 3px;
        vertical-align: middle;
    }
}
.status-wrap {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);

    &.course {
        pointer-events: none;
    }
}
.btn,
.btn2,
.btn3 {
    width: 182px;
    height: 58px;
    line-height: 58px;
    text-align: center;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 6px;
    font-size: 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 12;
    margin-left: -91px;
    margin-top: -29px;
}
.btn {
    color: #ffffff;
    &:hover {
        border: none;
        // padding: 2px;
        color: #ffffff;
        background: linear-gradient(93deg, #3a85fe 3%, #025eff 97%);
    }
    img {
        width: 20px;
        height: 20px;
        margin-right: 2px;
        margin-bottom: 3px;
        vertical-align: middle;
    }
}

.btn2 {
    width: 182px;
    height: 58px;
    line-height: 58px;
    text-align: center;
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid #4492ff;
    border-radius: 6px;
    color: #7ab1ff;
    box-sizing: border-box;

    &:hover {
        border: none;
        padding: 2px;
        color: #ffffff;
        background: linear-gradient(93deg, #3a85fe 3%, #025eff 97%);
    }
    img {
        width: 20px;
        height: 20px;
        margin-right: 2px;
        margin-bottom: 3px;
        vertical-align: middle;
    }
}

.btn3 {
    width: 182px;
    height: 58px;
    line-height: 58px;
    text-align: center;
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid #4492ff;
    border-radius: 6px;
    color: #7ab1ff;
    cursor: pointer;

    &:hover {
        border: none;
        padding: 2px;
        color: #ffffff;
        background: linear-gradient(93deg, #3a85fe 3%, #025eff 97%);
    }

    img {
        width: 20px;
        height: 20px;
        margin-right: 2px;
        margin-bottom: 3px;
        vertical-align: middle;
    }
}

.time {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 12;
    transform: translateX(-50%);
    // padding-top: 16px;
    color: #ffffff;
    margin-top: 40px;

    .num {
        display: inline-block;
        width: 34px;
        height: 36px;
        font-size: 22px;
        font-weight: 700;
        color: #3c6aef;
        text-align: center;
        line-height: 36px;
        background: #ffffff;
        border-radius: 8px;
    }
}

.courselist {
    position: absolute;
    width: 358px;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 8px;
    bottom: 86px;
    left: 800px;
    z-index: 100;

    .course-wrap {
        padding: 20px;
        max-height: 325px;
        overflow-y: auto;

        .item {
            width: 100%;
            font-size: 14px;
            color: #ececec;
            line-height: 20px;
            margin-bottom: 20px;
            cursor: pointer;

            &.this {
                color: #7ab1ff;
            }

            .tag {
                display: inline-block;
                height: 18px;
                line-height: 18px;
                padding: 0 8px;
                font-size: 12px;
                color: #fff;
                background: linear-gradient(90deg, #9ec2ff, #5895ff);
                border-radius: 2px;
            }
        }
    }
}
.top {
    position: relative;
    height: 685px;
    padding-top: 12px;
    box-sizing: border-box;
    background: #0f0f1e;
    overflow: hidden;

    .section {
        width: 1200px;
        margin: 0 auto;
        background-color: #1c1d30;
        display: flex;
        justify-content: space-between;

        .live-play {
            position: relative;
            width: 940px;
            height: 587px;

            .live-wrap {
                width: 100%;
                height: 100%;
            }
        }

        .live-list {
            width: 260px;
            padding-right: 8px;
            height: 587px;
            overflow: hidden;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            align-items: center;

            .item {
                position: relative;
                width: 236px;
                height: 141px;
                margin-bottom: 8px;
                background: rgba(42, 43, 46, 0.3);
                border-radius: 4px;
                display: flex;
                justify-content: flex-end;

                img.left {
                    width: 9px;
                    height: 20px;
                    position: absolute;
                    left: 2px;
                    top: 50%;
                    margin-top: -10px;
                }

                .item-wrap {
                    position: relative;
                    width: 226px;
                    height: 141px;
                    border-radius: 4px;
                    overflow: hidden;
                    cursor: pointer;
                    &:hover {
                        .mask {
                            display: none;
                        }
                    }
                    &.this {
                        border: 3px solid #4492ff;
                        border-radius: 4px;
                    }

                    .mask {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: 2;
                        cursor: pointer;
                        background-color: rgba(0, 0, 0, 0.5);
                    }
                }

                .tag {
                    position: absolute;
                    top: 8px;
                    left: 18px;
                    height: 20px;
                    padding: 0 10px;
                    color: #ffffff;
                    line-height: 20px;
                    font-size: 12px;
                    border-radius: 16px;
                    z-index: 1;
                    background-color: rgba(14, 15, 15, 0.7);
                    .live-status-wrap {
                        width: 16px;
                        height: 16px;
                        margin-top: 2px;
                        margin-left: -7px;
                        padding: 4px;
                        display: inline-block;
                        vertical-align: top;
                        box-sizing: border-box;
                        background-color: #025eff;
                        border-radius: 50%;
                    }
                    .status {
                        width: 100%;
                        height: 100%;
                        vertical-align: top;
                    }
                }

                img {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    z-index: 1;
                }
            }
        }
    }

    .live-info {
        width: 1200px;
        margin: 0 auto;
        background-color: #1c1d30;

        .wrap {
            width: 940px;
            height: 50px;
            padding-right: 16px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
        }
        .left {
            display: flex;
            align-items: center;
            padding-left: 16px;
        }
        .name {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 560px;
            font-size: 16px;
            color: #fcfbfb;
            line-height: 21px;
            font-weight: 400;
            margin-right: 16px;
        }
        .tag-txt {
            color: #5593ff;
            font-size: 12px;
            line-height: 16px;
        }

        .course-list {
            width: 90px;
            height: 28px;
            background: #57586e;
            border: 1px solid rgba(255, 255, 255, 0.37);
            border-radius: 4px;
            font-size: 12px;
            color: #ffffff;
            line-height: 28px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
            box-sizing: border-box;
            cursor: pointer;
        }

        .more {
            width: 73px;
            line-height: 50px;
            font-size: 14px;
            color: #77798d;
            line-height: 19px;
            display: flex;
            align-items: center;
            box-sizing: content-box;
            cursor: pointer;

            img {
                width: 12px;
                height: 12px;
                margin-top: 2px;
                margin-left: 5px;
                vertical-align: middle;
            }
        }
    }

    .live-name {
        margin: 0 auto;
        max-width: 1200px;
        height: 21px;
        font-size: 16px;
        color: #fcfbfb;
        line-height: 21px;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
    }

    .handle {
        width: 126px;
        height: 24px;
        background-image: url(./asset/images/u-bg.png);
        background-size: 100%;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -63px;
        color: #ffffff;
        font-size: 12px;
        line-height: 24px;
        text-align: center;
        cursor: pointer;

        img {
            height: 12px;
            width: 12px;
            margin-top: 7px;
            vertical-align: top;
            margin-right: 2px;
        }
    }
}
</style>
