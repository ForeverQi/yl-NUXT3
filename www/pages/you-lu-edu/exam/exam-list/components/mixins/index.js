import '@/api/mcu/api.mcu-001.public-extensioncenter-receive.js'; //线索推送
import loginApi from '@/api/login.js';
import loginRegisterTrack from '@/plugins/yiguan/login-register-track.js';

export default {
    data() {
        return {
            clueWaycode: 'yindao',
            originCode: 'ylgwtiku',
            originCodeMoKao: 'mokao',
        };
    },
    methods: {
        ...loginRegisterTrack,

        requestWrapper(url, params = {}) {
            return this.$callApi(url, params).then((res) => res.getData());
        },
        eaSetClueInfo({ pageTitle, clueWaycode, isForce, originCode }) {
            const project = this.$storage.get('examProject') || this.$storage.get('indexSelectProject') || {};
            const { projectId, projectCode, projectSeoCode: projectSeocode } = project;
            const info = {
                projectId: projectCode ? '' : projectId,
                projectCode,
                projectSeocode: projectCode ? '' : projectSeocode,
                originCode: originCode || this.originCode,
                clueWaycode: clueWaycode || this.clueWaycode,
                pageName: pageTitle,
                isForce,
            };
            console.warn('exam-eaSetClueInfo', info);
            this.$Promotion.setCLueInfo(info);
        },
        eaCluePush(originCode) {
            return this.$Promotion
                .getClueExtensionInfo({
                    clueWaycode: this.clueWaycode,
                    originCode: originCode || this.originCode,
                })
                .then((ce) => {
                    return this.requestWrapper('public/public-extensioncenter-receive', ce);
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
        loginAndClue(opts = {}, entranceResource) {
            return Promise.all([
                this.$Promotion.getClueExtensionInfo(
                    {
                        clueWaycode: this.clueWaycode,
                        originCode: this.originCode,
                        ...opts,
                    },
                    'login'
                ),
                this.$Promotion.getClueExtensionInfo(
                    {
                        clueWaycode: this.clueWaycode,
                        originCode: this.originCode,
                        ...opts,
                    },
                    'reg'
                ),
            ]).then(([extension, regExtension]) => {
                console.warn('登录线索', extension, regExtension, opts);
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
                    { pageName: document.title, entranceResource, courseType: '题库', pageType: '题库-项目首页' }
                );
                // new Promise((resolve) => {
                //     ylPlugin.login.showLogin_verifyByWx3(params).then(resolve, (error) => {
                //         console.log(error);
                //         // 易观上报
                //         this.trackLoginOrRegister(false, error.msg, error.loginMethod, document.title || '题库', '做题', '登录弹窗');
                //     });
                // }).then((res) => {
                //     console.warn('登录成功', res);
                //     if (res && ['wx1', 'wx2'].includes(res.loginMethod) && res.isUserNewlyRegistered) {
                //         // 登陆方式为微信需要推送线索参数
                //         // this.$Promotion
                //         //     .getClueExtensionInfo({
                //         //         clueWaycode: this.clueWaycode,
                //         //         originCode: originCode || this.originCode,
                //         //     })
                //         //     .then((clueExt) => {
                //         //         console.warn(originCode || this.originCode, clueExt);
                //         //         this.pushWxClue(clueExt);
                //         //     });
                //     }
                //     // 易观上报
                //     this.trackLoginOrRegister(true, '', res.loginMethod, document.title || '题库', '做题', '登录弹窗');
                // });
            });
        },
    },
};
