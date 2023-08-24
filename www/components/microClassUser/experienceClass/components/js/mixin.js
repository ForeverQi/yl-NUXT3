import { mapState, mapMutations } from 'vuex';
import { mcpTrialWebDetail } from '../../apis/index.js';
export default {
    computed: {
        ...mapState('logout', ['islogin', 'userInfo']),
        isFree() {
            if (this.experienceClass.courseOpenstatus === '2') {
                return true;
            } else if (this.experienceClass.coursePromotiontype === 'F') {
                // N:无促销;F:限时免费;L:限时特价;S特价
                return (
                    Date.parse(this.experienceClass.coursePromotionendtime) > Date.now() &&
                    Date.parse(this.experienceClass.coursePromotionstarttime) < Date.now()
                );
            }
            return false;
        },
    },
    data() {
        return {
            priceTimeRefVal: 1,
            courseExpiredtimeCache: '',
        };
    },
    destroyed() {
        clearInterval(this.priceRefreshTimer);
    },
    methods: {
        ...mapMutations('mcuStore', ['setWaycode']),
        playVideo(item) {
            // 判断有效性
            //判断是否登录
            //判断是否领取
            return this.ecValid()
                .then(() => {
                    // (L:限时试听;N:不允许试听;F:整节试听)
                    // 通知视频播放器
                    this.$emit('play', item);
                    console.warn('playVideo-100');
                    //  || (item.coursewareType === '2' && (!item.coursewareEndtime || Date.parse(item.coursewareEndtime) < Date.now())))
                    if (item.coursewareType !== '2' && item.coursewareAuditionstatus === 'L') {
                        console.warn('playVideo-101');
                        return;
                    } else if (item.coursewareType !== '2' && item.coursewareAuditionstatus === 'F') {
                        console.warn('playVideo-102');
                        return;
                    } else if (item.coursewareType === '2' && item.coursewareEndtime && Date.parse(item.coursewareEndtime) < Date.now()) {
                        console.warn('playVideo-111-直播已结束回放');
                        if (item.coursewareAuditionstatus === 'L') {
                            return;
                        } else if (item.coursewareAuditionstatus === 'F') {
                            return;
                        }
                    } else if (item.coursewareType === '2' && !item.coursewareEndtime) {
                        console.warn('playVideo-110-直播直接回放');
                        if (item.coursewareAuditionstatus === 'L') {
                            return;
                        } else if (item.coursewareAuditionstatus === 'F') {
                            return;
                        }
                    }

                    if (this.islogin) {
                        console.warn('playVideo-103');
                        if (this.experienceClass.drawStatus === 1) {
                            // 已领取
                            // 直播课特殊处理
                            console.warn('playVideo-104');
                            if (item.coursewareType === '2' && Date.parse(item.coursewareEndtime) > Date.now()) {
                                // 正在直播中...
                                console.warn('playVideo-105');
                                window.open(`/inside/user/mcpLivePage?goodsId=${this.experienceClass.goodsId}&coursewareId=${item.coursewareId}`, '_blank');
                                return '直播中';
                            }
                        } else {
                            // 未领取
                            console.warn('playVideo-106');
                            return this.$baseUI.mcumsg
                                .confirm({
                                    title: '提示',
                                    content: `${this.isFree ? '领取' : '购买'}课程后，可学习全部课程`,
                                    confirmText: `立即${this.isFree ? '领取' : '购买'}`,
                                })
                                .then(() => {
                                    return this.isFree ? this.$refs.payModel.mcpTrialWebFree(false) : this.$refs.payModel.orderingOrderapprovalApplyPost(false);
                                })
                                .catch((err) => {
                                    console.warn(err);
                                });
                        }
                    } else {
                        console.warn('playVideo-107');
                        return this.$mcuLogin
                            .checkLogin()
                            .then(() => {
                                console.warn('登录成功');
                                return this.getCourseDetail().then((res) => {
                                    console.warn('登录成功-获取领取状态', res.drawStatus);
                                    this.experienceClass.drawStatus = res.drawStatus;
                                    if (this.experienceClass.drawStatus) {
                                        this.$emit('freePopupShow', false);
                                    }
                                });
                            })
                            .catch((err) => {
                                console.warn(err);
                            });
                    }
                })
                .catch((err) => {
                    console.warn(err);
                    err = err.getDescription();
                    if (err === '该课程有新变化，刷新页面获取最新信息') {
                        this.ecPriceTypeUpdateTip(err);
                    } else if (err && err.endsWith('去学习吧！')) {
                        this.ecHasDrawTip(err);
                    } else {
                        this.ecErrorTip(err);
                    }
                });
        },
        getCourseDetail() {
            return mcpTrialWebDetail(this, {
                goodsId: this.experienceClass.goodsId,
            });
        },
        ecValid() {
            return this.getCourseDetail().then((res) => {
                if (res.avlStatus === 'N') {
                    this.courseExpiredtimeCache = res.courseExpiredtime;
                    return Promise.reject('该课程已下架');
                } else if (
                    res.courseExpiredtime &&
                    res.courseExpiredtime &&
                    res.courseExpiredtime !== 'null' &&
                    Date.now() > Date.parse(res.courseExpiredtime)
                ) {
                    this.courseExpiredtimeCache = res.courseExpiredtime;
                    return Promise.reject('该课程已下架');
                } else if (res.courseOpenstatus !== this.experienceClass.courseOpenstatus) {
                    return Promise.reject('该课程有新变化，刷新页面获取最新信息');
                } else if (res.coursePrice !== this.experienceClass.coursePrice) {
                    return Promise.reject('该课程有新变化，刷新页面获取最新信息');
                } else if (res.coursePromotionprice !== this.experienceClass.coursePromotionprice) {
                    return Promise.reject('该课程有新变化，刷新页面获取最新信息');
                } else if (res.coursePromotiontype !== this.experienceClass.coursePromotiontype) {
                    return Promise.reject('该课程有新变化，刷新页面获取最新信息');
                } else if (res.drawStatus !== this.experienceClass.drawStatus && this.experienceClass.drawStatus === 0) {
                    return Promise.reject(`该课程已${res.courseOpenstatus === '2' ? '领取' : '购买'}，去学习吧！`);
                }
            });
        },
        ecErrorTip(err) {
            const er = err === '课程不存在' ? '该课程已下架' : err;
            this.$baseUI.mcumsg
                .confirm({
                    title: '提示',
                    content: er,
                    showCancel: false,
                    confirmText: '返回【微课首页】',
                })
                .then(() => {
                    window.open(`/agile-course/${this.experienceClass.projectId}`, '_self');
                })
                .catch((e) => {
                    console.error(e);
                    if (er === '该课程已下架') {
                        this.experienceClass.avlStatus = 'N';
                    } else if (er === '课程不存在') {
                        this.experienceClass.avlStatus = 'N';
                    } else if (er === '该课程已下架') {
                        this.experienceClass.courseExpiredtime = this.courseExpiredtimeCache;
                    }
                });
        },
        ecPriceTypeUpdateTip(err) {
            this.$baseUI.mcumsg
                .confirm({
                    title: '提示',
                    content: err,
                    showCancel: false,
                    confirmText: '刷新页面',
                })
                .then(() => {
                    location.reload();
                })
                .catch(() => {
                    location.reload();
                });
        },
        ecHasDrawTip(err) {
            this.$baseUI.mcumsg
                .confirm({
                    title: '提示',
                    content: err,
                    showCancel: false,
                })
                .then(() => {
                    this.experienceClass.drawStatus = 1;
                    console.warn('点击确认事件');
                    this.$emit('update:show', false);
                    this.$emit('payPopupShow', false);
                })
                .catch(() => {
                    this.experienceClass.drawStatus = 1;
                    console.warn('点击取消事件');
                    this.$emit('update:show', false);
                    this.$emit('payPopupShow', false);
                });
        },
        freeCluePush() {
            this.cluePush({
                ...this.ecClueCommon(),
                clueWaycode: 'yindao',
            });
        },
        buyCluePush() {
            this.setWaycode('dingdan');
            this.cluePush({
                ...this.ecClueCommon(),
                clueWaycode: 'dingdan',
            });
        },
        listenCluePush() {
            this.cluePush({
                ...this.ecClueCommon(),
                clueWaycode: 'yindao',
            });
        },
        ecClueCommon() {
            return {
                clueWaycode: 'yindao',
                projectId: this.experienceClass.projectId,
                pageName: `[体验课]${this.experienceClass.courseName}`,
                projectName: this.experienceClass.projectName,
                remark: `【领取体验课】${this.experienceClass.courseName}`,
            };
        },
        async cluePush(content) {
            try {
                const ce = await this.$PromotionUtil.mcuClueOrBeHavior(content);
                const clueExtension = JSON.parse(ce);
                const res = await this.request({
                    url: 'public/public-extensioncenter-receive',
                    params: {
                        ...clueExtension,
                    },
                    isCustom: true,
                });
                return res;
            } catch (error) {
                console.error(error);
            }
        },
        request({ url, params = {}, isCustom = false }) {
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
        priceTimerRefresh() {
            clearInterval(this.priceRefreshTimer);
            this.priceRefreshTimer = setInterval(() => {
                this.priceTimeRefVal += 1;
            }, 1e3);
        },
        clearPriceTimerRefresh() {
            clearInterval(this.priceRefreshTimer);
        },
    },
};
