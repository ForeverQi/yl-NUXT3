import { mapMutations } from 'vuex';
import '@/api/mcu/api.MCU0001.mcp_trial_web_detail.js';
import '@/api/mcu/api.mcu-001.public-extensioncenter-receive.js'; //线索推送
import loginApi from '@/api/login.js';
import loginRegisterTrack from '@/plugins/yiguan/login-register-track.js';

export default {
    computed: {
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
        promotion() {
            let coursePromotionstarttime = this.experienceClass.coursePromotionstarttime;
            if (coursePromotionstarttime) {
                coursePromotionstarttime = coursePromotionstarttime.replaceAll('-', '/');
            }
            let coursePromotionendtime = this.experienceClass.coursePromotionendtime;
            if (coursePromotionendtime) {
                coursePromotionendtime = coursePromotionendtime.replaceAll('-', '/');
            }
            if (
                this.experienceClass.coursePromotiontype === 'F' &&
                Date.now() < Date.parse(coursePromotionendtime) &&
                Date.now() > Date.parse(coursePromotionstarttime)
            ) {
                return '限时免费';
            } else if (
                this.experienceClass.coursePromotiontype === 'L' &&
                Date.now() < Date.parse(coursePromotionendtime) &&
                Date.now() > Date.parse(coursePromotionstarttime)
            ) {
                return '限时特价';
            } else if (this.experienceClass.coursePromotiontype === 'S') {
                return '特价';
            }
            return '';
        },
        price() {
            let price = 0;
            if (this.promotion === '免费') {
                price = 0;
            } else if (this.promotion === '限时免费') {
                price = 0;
            } else if (this.promotion === '限时特价') {
                price = this.experienceClass.coursePromotionprice / 100;
            } else if (this.promotion === '特价') {
                price = this.experienceClass.coursePromotionprice / 100;
            } else {
                price = this.experienceClass.coursePrice / 100;
            }
            return parseFloat(price);
        },
    },
    data() {
        return {
            priceTimeRefVal: 1,
            courseExpiredtimeCache: '',
            ecClueWaycode: 'xsylk',
            ecOriginCodeGet: 'ylgwtiyanke',
            ecOriginCodeCommon: 'ylgwtiyanke',
        };
    },
    destroyed() {
        clearInterval(this.priceRefreshTimer);
    },
    methods: {
        ...mapMutations('mcuStore', ['setWaycode']),
        ...mapMutations('trial-course/course', { updateCourse: 'updateCourse' }),
        ...loginRegisterTrack,
        playVideo(item, options = {}, location = '') {
            //判断有效性
            //判断是否登录
            //判断是否领取
            return this.ecValid()
                .then(() => {
                    return ylPlugin.login.isLogined();
                })
                .then((isLogin) => {
                    // (L:限时试听;N:不允许试听;F:整节试听)
                    // 通知视频播放器
                    let isNoticePlay = false;
                    if (isLogin === false && options.notSwitchVideoBeforeLogin === true) {
                        console.log('未登录不切换到播放页');
                    } else if (this.experienceClass.drawStatus === 0 && options.notSwitchVideoBeforeDraw === true) {
                        console.log('未领取不切换到播放页');
                    } else {
                        isNoticePlay = true;
                        this.$emit('play', item);
                    }
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

                    if (isLogin) {
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
                            } else if (item.coursewareType === '2' && options.playOverLive === true && !item.coursewareOnlineplaypath) {
                                // 正在直播中...
                                console.warn('playVideo-120');
                                window.open(`/inside/user/mcpLivePage?goodsId=${this.experienceClass.goodsId}&coursewareId=${item.coursewareId}`, '_blank');
                                return '直播中';
                            }
                        } else {
                            // 未领取
                            console.warn('playVideo-106');
                            return this.getCourse(item, isNoticePlay, options, location);
                        }
                    } else {
                        console.warn('playVideo-107');
                        return this.ylLoginByPwd('', '体验课-课程目录')
                            .then(() => {
                                console.warn('登录成功');
                                return this.getCourseDetail().then((res) => {
                                    console.warn('登录成功-获取领取状态', res.drawStatus);
                                    this.updateCourse({
                                        drawStatus: res.drawStatus,
                                    });
                                    if (this.experienceClass.drawStatus) {
                                        this.$emit('freePopupShow', false);
                                    } else if (options.getCourseAfterLogin) {
                                        return this.getCourse(item, isNoticePlay, options, location);
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
                    if (err === '该课程有新变化，刷新页面获取最新信息') {
                        this.ecPriceTypeUpdateTip(err);
                    } else if (err && err?.endsWith('去学习吧！')) {
                        this.ecHasDrawTip(err);
                    } else {
                        this.ecErrorTip(err);
                    }
                });
        },
        getCourse(item, isNoticePlay = true, options, location = '') {
            return new Promise((resolve, reject) => {
                this.$baseUI.confirm({
                    title: '提示',
                    content: `${this.isFree ? '领取' : '购买'}课程后，可学习全部课程`,
                    showCancel: true,
                    confirmText: `立即${this.isFree ? '领取' : '购买'}`,
                    confirm: resolve,
                    cancel: reject,
                });
            })
                .then(() => {
                    return this.isFree
                        ? this.$refs.payModel.mcpTrialWebFree({
                              entrance_resource: location,
                          })
                        : this.$refs.payModel.orderingOrderapprovalApplyPost({
                              location,
                          });
                })
                .then(() => {
                    if (isNoticePlay === false) {
                        if (options.notSwitchVideoAfterDraw !== true) {
                            this.$emit('play', item);
                        } else {
                            scroll({
                                top: 0,
                                behavior: 'smooth',
                            });
                        }
                    }

                    if (
                        this.experienceClass.drawStatus &&
                        options.openLiveAfterDraw === true &&
                        item.coursewareType === '2' &&
                        item.coursewareEndtime &&
                        Date.parse(item.coursewareEndtime) > Date.now()
                    ) {
                        window.open(`/inside/user/mcpLivePage?goodsId=${this.experienceClass.goodsId}&coursewareId=${item.coursewareId}`, '_blank');
                    }
                })
                .catch(console.warn);
        },
        requestWrapper(url, params = {}) {
            return this.$callApi(url, params).then((res) => res.getData());
        },
        getCourseDetail() {
            return this.requestWrapper('experience/mcp_trial_web_detail', {
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
                } else if (res.coursePrice != this.experienceClass.coursePrice) {
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
            new Promise((resolve, reject) => {
                this.$baseUI.confirm({
                    title: '提示',
                    content: er,
                    showCancel: false,
                    confirmText: '返回【体验课】',
                    confirm: resolve,
                    cancel: reject,
                });
            })
                .then(() => {
                    window.open(`/trial-course/all/${this.experienceClass.projectSeoCode || 'all'}`, '_self');
                })
                .catch((e) => {
                    console.error(e);
                    if (er === '该课程已下架') {
                        this.updateCourse({
                            avlStatus: 'N',
                        });
                    } else if (er === '课程不存在') {
                        this.updateCourse({
                            avlStatus: 'N',
                        });
                    } else if (er === '该课程已下架') {
                        this.updateCourse({
                            courseExpiredtime: this.courseExpiredtimeCache,
                        });
                    }
                });
        },
        ecPriceTypeUpdateTip(err) {
            new Promise((resolve, reject) => {
                this.$baseUI.confirm({
                    title: '提示',
                    content: err,
                    showCancel: false,
                    confirmText: '刷新页面',
                    confirm: resolve,
                    cancel: reject,
                });
            })
                .then(() => {
                    location.reload();
                })
                .catch(() => {
                    location.reload();
                });
        },
        ecHasDrawTip(err) {
            new Promise((resolve, reject) => {
                this.$baseUI.confirm({
                    title: '提示',
                    content: err,
                    confirm: resolve,
                    cancel: reject,
                    showCancel: false,
                });
            })
                .then(() => {
                    this.updateCourse({
                        drawStatus: 1,
                    });
                    console.warn('点击确认事件');
                    this.$emit('update:show', false);
                    this.$emit('payPopupShow', false);
                })
                .catch(() => {
                    this.updateCourse({
                        drawStatus: 1,
                    });
                    console.warn('点击取消事件');
                    this.$emit('update:show', false);
                    this.$emit('payPopupShow', false);
                });
        },
        ecSetClueInfo(originCode) {
            const { projectId, projectCode, projectSeoCode: projectSeocode } = this.experienceClass;
            console.warn(projectId, projectCode, projectSeocode);
            this.$Promotion.setCLueInfo({
                projectId: projectCode ? '' : projectId,
                projectCode,
                projectSeocode: projectCode ? '' : projectSeocode,
                originCode,
                clueWaycode: this.clueWaycode,
            });
        },
        freeCluePush() {
            this.cluePush(this.ecOriginCodeGet);
        },
        buyCluePush() {
            this.cluePush(this.ecOriginCodeGet);
        },
        listenCluePush() {
            this.cluePush(this.ecOriginCodeCommon);
        },
        cluePush(originCode) {
            return this.$Promotion
                .getClueExtensionInfo({
                    clueWaycode: this.ecClueWaycode,
                    originCode,
                })
                .then((ce) => {
                    console.warn(ce);
                    return this.requestWrapper('public/public-extensioncenter-receive', ce);
                });
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
        ylLoginByPwd(originCode, entranceResource = '-') {
            return Promise.all([
                this.$Promotion.getClueExtensionInfo(
                    {
                        clueWaycode: this.ecClueWaycode,
                        originCode: originCode || this.ecOriginCodeCommon,
                    },
                    'reg'
                ),
                this.$Promotion.getClueExtensionInfo(
                    {
                        clueWaycode: this.ecClueWaycode,
                        originCode: originCode || this.ecOriginCodeCommon,
                    },
                    'login'
                ),
            ]).then(([regExtension, extension]) => {
                console.warn('登录线索', regExtension, extension);
                // let params = {
                //     clue: { regExtension, clueExtension: extension },
                //     onstatechange: (state) => {
                //         if (state.isQRCodeScanned) {
                //             console.log(state);
                //             this.trackScanWx3Login('登录弹窗', this.$route.query.pageName || document.title);
                //         }
                //     },
                // };
                return this.$ylPlugin.showLoginModal(
                    { clue: { clueExtension: extension } },
                    { pageName: document.title, entranceResource, courseType: '体验课', pageType: '资源详情页' }
                );
                // new Promise((resolve) => {
                //     this.$ylPlugin.showLoginModal({ clue: { extension } }, document.title, entranceResource).then(resolve);
                //     // ylPlugin.login.showLogin_verifyByWx3(params).then(resolve, (error) => {
                //     //     console.log(error);
                //     //     // 易观上报
                //     //     this.trackLoginOrRegister(false, error.msg, error.loginMethod, document.title || '体验课详情', '购买或者领取', '登录弹窗');
                //     // });
                // });
                // .then((res) => {
                //     // 登陆方式为微信需要推送线索参数
                //     console.warn('登录成功', res);
                //     if (['wx1', 'wx2'].includes(res.loginMethod) && res.isUserNewlyRegistered) {
                //         // this.$Promotion
                //         //     .getClueExtensionInfo({
                //         //         clueWaycode: this.ecClueWaycode,
                //         //         originCode: originCode || this.ecOriginCodeCommon,
                //         //     })
                //         //     .then((clueExtension) => {
                //         //         this.pushWxClue(clueExtension);
                //         //     });
                //     }
                //     // 易观上报
                //     // this.trackLoginOrRegister(true, '', res.loginMethod, document.title || '体验课详情', '购买或者领取', '登录弹窗');
                // });
            });
        },
        // 推送微信线索
        pushWxClue(clueExtension) {
            return new Promise((resolve, reject) => {
                loginApi.taAppletCluePushNew({
                    params: {
                        clueExtension,
                    },
                    success: (data) => {
                        resolve(data);
                    },
                    fail: (data, msg) => {
                        reject(msg);
                    },
                    error: (data, msg) => {
                        reject(msg);
                    },
                });
            }).catch((err) => {
                console.error(err);
            });
        },
    },
};
