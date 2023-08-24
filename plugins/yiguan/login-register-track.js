export default {
    trackUser() {
        if (process.server) {
            return Promise.reject();
        }
        return new Promise((resolve) => {
            const userInfo = this.$storage.get('loginStatus') || null;
            resolve(userInfo);
        })
            .then((user) => {
                if (!user) {
                    return { is_student: false };
                }
                const { studentDeposittype } = user;
                return { is_student: studentDeposittype === 'T' };
            })
            .catch(() => {
                return { is_student: false };
            });
    },
    trackUpload(eventID = '', params = {}) {
        this.trackUser().then((res) => {
            const track = {
                ...res,
                ...params,
            };
            console.warn('trackUpload', track);
            this.$yiguan.track(eventID, track);
        });
    },

    /**
     * @description 上报
     * @param status 上报状态 true 成功  false 失败
     * @param message 上报的错误消息
     * @param loginMethod 方法
     * @param pageName 页面名称
     * @param entranceResource 点击位置
     */
    trackLoginOrRegister(status = true, message = '', loginMethod, pageName, entranceResource, loginType) {
        // 方法相对应中文的Map
        // const loginMethodsMap = new Map([
        //     ['wx1ScanCode', ''],
        //     ['wx2ScanCode', ''],
        //     ['wx1', '微信扫码登录'],
        //     ['wx2', '微信扫码登录'],
        //     ['wx3', '微信扫码登录'],
        //     ['pwd', '账号登录'],
        //     ['sms', '短信登录'],
        //     ['register', '注册'],
        // ]);
        // 方法相对应事件名称的Map
        const loginEventName = new Map([
            ['wx1', 'web_youlu_weixinsaomadenglu'],
            ['wx2', 'web_youlu_weixinsaomadenglu'],
            ['wx3', 'web_youlu_weixinsaomadenglu'],
            ['pwd', 'web_youlu_mimadenglu'],
            ['sms', 'web_youlu_shoujihaodenglu'],
        ]);

        if (loginMethod === 'register') {
            // 新加入的注册埋点事件
            this.$yiguan.track('web_youlu_register', {
                is_success: status,
                fail_reason: message,
                page_name: pageName,
            });
        } else {
            // 新加入的登录埋点事件
            // this.trackUpload('web_youlu_login_in', {
            //     is_success: status,
            //     fail_reason: message,
            //     page_name: pageName,
            //     entrance_resource: entranceResource || '我的课程',
            //     login_method: loginMethodsMap.get(loginMethod),
            // });

            this.$yiguan.track(loginEventName.get(loginMethod), {
                is_success: status,
                fail_reason: message,
                login_type: loginType,
                page_name: pageName,
            });
        }
    },
    /**
     * 微信绑定成功埋点
     * @param {String} resource 扫码位置
     * @param {String} status 是否绑定成功
     * @param {String} failReason 失败原因
     */
    trackWxMiniprogrameBind(resource, status = true, failReason = '-') {
        this.$yiguan.track('youlu_mine_saomabangding', {
            is_success: status,
            entrance_resource: resource,
            fail_reason: failReason,
        });
    },
    /**
     * 绑定微信扫码埋点
     * @param {String} resource 扫码位置
     * @param {String} status 是否绑定成功
     * @param {String} failReason 失败原因
     */
    trackMiniprogrameBindScan(resource, status = true, failReason = '-') {
        this.$yiguan.track('youlu_mine_weixinsaoma', {
            is_success: status,
            entrance_resource: resource,
            fail_reason: failReason,
        });
    },
    // 点击绑定
    trackUserClickBindWxMiniprograme() {
        this.$yiguan.track('youlu_click_weixinbangding', {});
    },
    // 点击解绑
    trackUserClickCancelBindWxMiniprograme() {
        this.$yiguan.track('youlu_click_weixinjiebang', {});
    },
    // 用户解绑成功
    trackUserCancelBindWxMiniprogrameSuccess(status = true, failReason) {
        this.$yiguan.track('youlu_mine_weixinjiebang', {
            is_success: status,
            fail_reason: failReason,
        });
    },
    /**
     * 微信小程序扫码成功
     * @param { String } loginType // 登陆类型
     * @param { String } pageName // 页面名称
     */
    trackScanWx3Login(loginType, pageName) {
        this.$yiguan.track('web_youlu_weixinsaoma', {
            login_type: loginType,
            page_name: pageName,
            is_success: true,
        });
    },
    /**
     * @param { String } loginType 登录类型
     * @param { Object } ylYiguan 易观
     */
    trackChangeLoginMethods(loginType, isRenderInContainerDom, ylYiguan) {
        // 方法相对应事件名称的Map
        const loginEventName = new Map([
            ['wx1', 'web_youlu_click_weixinsaomadenglu'],
            ['wx2', 'web_youlu_click_weixinsaomadenglu'],
            ['wx3', 'web_youlu_click_weixinsaomadenglu'],
            ['pwd', 'web_youlu_click_mimadenglu'],
            ['sms', 'web_youlu_click_shoujihaodenglu'],
        ]);
        // 新加入的切换登录方式埋点事件
        ylYiguan.track(loginEventName.get(loginType), {
            login_type: isRenderInContainerDom ? '登录界面' : '登录弹窗',
            page_name: document.title,
        });
    },
};
