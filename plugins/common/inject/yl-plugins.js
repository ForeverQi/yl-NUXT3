import track from '@/plugins/yiguan/login-register-track.js';
export default (context, client, ylYiguan) => {
    const config = context.env.config;
    if (client && window.ylPlugin) {
        ylPlugin.login.config({
            /* 调用 生产环境 的接口 */
            apiTarget: config.env,
            wx1AppID: config.MCU_WX_APPID,
            wx2AppID: document.domain.includes('youlu.com') ? config.YOULU_WX_APPID : config.WX_APPID,
            wx3AppID: config.MINI_PROGRAM_APPID,
            isActivityPage: false,
            ifHideOnClickMask: false,
            ifEncryptApi: 'smart',
            i18n_zhCN: {
                '0003': '手机号登录',
            },
            enabledLoginMethods: 'wx3,sms,pwd',
            globleCallback: () => {
                context.store.commit('common/userLogin/setPopUpLogin');
                // 阿里云前端ARMS监控，更新用户信息
                const userString = localStorage.getItem('loginStatus') || '{}';
                const user = JSON.parse(userString);
                // 更改用户信息
                if (user?.userYoulunum) {
                    window.__bl.setConfig({
                        /**
                         * 登录后及时更新用户信息，从而准确识别用户
                         */
                        uid: user.userYoulunum,
                    });
                }
            }, // 需要登陆注册组件再完成登录以后更新store
        });
        ylPlugin.login.on('loginmethodchange', (data) => {
            const loginMethodsMap = new Map([
                ['wx1ScanCode', ''],
                ['wx2ScanCode', ''],
                ['wx1', '微信扫码登录'],
                ['wx2', '微信扫码登录'],
                ['wx3', '微信扫码登录'],
                ['pwd', '账号登录'],
                ['sms', '短信登录'],
                ['register', '注册'],
            ]);
            ylYiguan.track('youlu_web_click_login_method', {
                login_method: loginMethodsMap.get(data.newLoginMethod),
                login_type: data.isRenderInContainerDom === true ? '登录界面' : '登录弹窗',
            });
            // track.trackChangeLoginMethods(data.newLoginMethod, data.isRenderInContainerDom, ylYiguan);
        });
    }

    return {
        showLoginModal(opt, { pageName = '', entranceResource = '', courseType = '', pageType = '' }) {
            const params = {
                onstatechange: (state) => {
                    if (state.isQRCodeScanned) {
                        track.trackScanWx3Login.call(window.$nuxt, '登录弹窗', {
                            login_type: '登录弹窗',
                            page_name: this.$route.query.pageName || document.title,
                            is_success: true,
                        });
                    }
                },
                ...opt,
            };
            window.$nuxt.trackUser = track.trackUser;
            window.$nuxt.trackUpload = track.trackUpload;
            // 方法相对应中文的Map
            const loginMethodsMap = new Map([
                ['wx1ScanCode', ''],
                ['wx2ScanCode', ''],
                ['wx3ScanCode', ''],
                ['wx1', '微信扫码登录'],
                ['wx2', '微信扫码登录'],
                ['wx3', '微信扫码登录'],
                ['pwd', '账号登录'],
                ['sms', '短信登录'],
                ['register', '注册'],
            ]);
            return new Promise((resolve) => {
                ylPlugin.login.showLogin_verifyByWx3(params).then(
                    (res) => {
                        resolve(res);
                    },
                    (error) => {
                        this.$yiguan.track('youlu_login_in', {
                            login_method: loginMethodsMap.get(error.loginMethod),
                            is_success: false,
                            fail_reason: error.msg,
                            login_type: '弹窗登录',
                            page_name: pageName || '-',
                            entrance_resource: entranceResource || '-',
                            course_type: courseType || '-',
                            page_type: pageType || '-',
                        });
                        track.trackLoginOrRegister.call(window.$nuxt, false, error.msg, error.loginMethod, pageName, entranceResource, '登录弹窗');
                    }
                );
            }).then((res) => {
                ylYiguan.track('youlu_login_in', {
                    login_method: loginMethodsMap.get(res.loginMethod),
                    is_success: true,
                    fail_reason: '-',
                    login_type: '弹窗登录',
                    page_name: pageName || '-',
                    entrance_resource: entranceResource || '-',
                    course_type: courseType || '-',
                    page_type: pageType || '-',
                });
                track.trackLoginOrRegister.call(window.$nuxt, true, '', res.loginMethod, pageName, entranceResource, '登录弹窗');
                return res;
            });
        },
    };
};
