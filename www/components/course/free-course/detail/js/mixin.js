import loginApi from '@/api/login.js';
import loginRegisterTrack from '@/plugins/yiguan/login-register-track.js';
export default {
    methods: {
        ...loginRegisterTrack,

        timeForm(v) {
            let getH = () => {
                let h = Math.floor(v / 3600);
                return h > 9 ? h : `0${h}`;
            };
            let getM = () => {
                let m = Math.floor((v % 3600) / 60);
                return m > 9 ? m : `0${m}`;
            };
            let getS = () => {
                let s = v % 60;
                return s > 9 ? s : `0${s}`;
            };
            return `${getH()}:${getM()}:${getS()}`;
        },
        getIsOffline(goodsId) {
            return new Promise((resolve, reject) => {
                //判断是否下线，是弹出下线提示；未下线，判断是否登录关注服务号，然后预约成功
                this.$callApi('mcp/query-liveCourse-web-detail', {
                    goodsId,
                    onsuccess: (res) => {
                        console.log('没有下线');
                        this.isClassOnLine = true;
                        resolve();
                    },
                    onerror: (err) => {
                        console.log('下线了');
                        if (err.getAttachedData().getData().code === '4999') {
                            this.isClassOnLine = false;
                            this.offlinePopup(err);
                        }
                    },
                });
            });
        },
        //下线提示
        offlinePopup(err) {
            this.$baseUI.confirm({
                title: '提示',
                content: '该直播课已下线',
                showCancel: false,
                confirmText: '返回公开课',
                confirm: () => {
                    this.$router.push(`/free-course/all/${this.projectSeoCode}`);
                    /*window.open(`/publicClass/all/${this.liveCourse.projectSeoCode}`, '_self');*/
                },
                cancel: () => {
                    /*this.$PageUtil.reflush();*/
                    this.$emit('error', err.getAttachedData().getData());
                },
            });
        },
        getBindStatus() {
            let promiseGetUser = ylPlugin.login.getUser();
            return promiseGetUser
                .then((user) => {
                    if (null === user) {
                        this.isLogin = false;
                        throw new Error('登录失败');
                    }
                    this.isLogin = true;
                    return ylPlugin.login.isWx1PublicAccountSubscribedByUser({ userId: user.userId });
                })
                .then((isSubscribed) => {
                    if (isSubscribed) {
                        this.isConcernServiceNumber = true;
                        console.log('处于 已关注 状态');
                    } else {
                        this.isConcernServiceNumber = false;
                        console.log('处于 未关注 状态');
                    }
                })
                .catch((err, err1, err2) => {
                    console.log(err, err1, err2);
                });
        },
        async ylLoginByPwd(entranceResource) {
            let clueExtension = await this.$Promotion.getClueExtensionInfo({
                clueWaycode: 'zbyl',
                originCode: this.$nuxt.context.env.config.env === 'prod' ? 'ylgwzbk' : 'ylgwylgwzbk',
            });
            // let params = {
            //     clue: { clueExtension },
            //     onstatechange: (state) => {
            //         if (state.isQRCodeScanned) {
            //             console.log(state);
            //             this.trackScanWx3Login('登录弹窗', this.$route.query.pageName || document.title);
            //         }
            //     },
            // };
            // ylPlugin.login.showLogin_verifyByWx3(params)
            this.$ylPlugin
                .showLoginModal({ clue: { clueExtension } }, { pageName: document.title, entranceResource, courseType: '公开课', pageType: '资源详情页' })
                .then(() => {
                    setTimeout(() => {
                        this.$PageUtil.reflush();
                    }, 50);
                });
            // .then(
            //     (res) => {
            //         if (res && ['wx1', 'wx2'].includes(res.loginMethod) && res.isUserNewlyRegistered) {
            //             // 登陆方式为微信需要推送线索参数
            //             /*this.pushWxClue(clueExtension);*/
            //         }

            //         // 易观上报
            //         this.trackLoginOrRegister(true, '', res.loginMethod, document.title || '公开课详情', entranceResource, '登录弹窗');

            //         setTimeout(() => {
            //             this.$PageUtil.reflush();
            //         }, 50);
            //     },
            //     (error) => {
            //         console.log(error);
            //         // 易观上报
            //         this.trackLoginOrRegister(false, error.msg, error.loginMethod, document.title || '公开课详情', entranceResource, '登录弹窗');
            //     }
            // );
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
