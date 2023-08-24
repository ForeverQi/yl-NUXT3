import niceloo from '@youlu/niceloo/libs/@xlib.01/index';

/**
 * @typedef {Object} ApiCtrl 接口调用控制选项
 * @property {Object} [params] 接口入参
 * @property {(data: Object, resp: APIResponse) => void} [success] 接口调用成功后要执行的方法
 * @property {(Failure) => void} [fail] 接口调用失败时要执行的方法
 */

export default {
    /**
     * 获取 简单验证码
     * @param {ApiCtrl} ops 接口调用控制选项
     */
    getCaptcha(ops) {
        niceloo.api.callRaw({
            api: 'sc/captcha/captcha',
            params: ops.params,
            onsuccess: ops.success,
            onerror(_failure) {
                niceloo.api.handleFailure(_failure);
                if (typeof ops.fail === 'function') ops.fail(_failure);
            },
        });
    },
    /**
     * 获取 图形验证码
     * @param {ApiCtrl} ops 接口调用控制选项
     */
    getCaptchaToken(ops) {
        niceloo.api.callRaw({
            api: 'sc/captcha/token',
            params: ops.params,
            onsuccess: ops.success,
            onerror(_failure) {
                niceloo.api.handleFailure(_failure);
                if (typeof ops.fail === 'function') ops.fail(_failure);
            },
        });
    },
    /**
     * 发送短信
     * @param {ApiCtrl} ops 接口调用控制选项
     */
    sendMess(ops) {
        niceloo.api.callRaw({
            api: 'mc/msg/sms/verifycode/send',
            params: ops.params,
            onsuccess: ops.success,
            onerror(_failure) {
                niceloo.api.handleFailure(_failure);
                if (typeof ops.fail === 'function') ops.fail(_failure);
            },
        });
    },
    /**
     * 登录
     * @param {ApiCtrl} ops 接口调用控制选项
     */
    login(ops) {
        niceloo.api.callRaw({
            api: 'uc/login',
            params: ops.params,
            onsuccess: ops.success,
            onerror(_failure) {
                niceloo.api.handleFailure(_failure);
                if (typeof ops.fail === 'function') ops.fail(_failure);
            },
        });
    },
    /**
     * 获取用户信息
     * @param {ApiCtrl} ops 接口调用控制选项
     */
    getUserProfile(ops) {
        let p1 = new Promise(function (resolve, reject) {
            niceloo.api.callRaw({
                api: 'uc/user/profile/view/vx',
                onsuccess: resolve,
                onerror: reject,
            });
        });
        let p2 = new Promise(function (resolve, reject) {
            niceloo.api.callRaw({
                api: 'bd/student/deposittype',
                onsuccess: resolve,
                onerror: reject,
            });
        });

        return Promise.all([p1, p2])
            .then((data) => {
                let res1 = data[0];
                let res2 = data[1];
                res1.studentDeposittype || (res1.studentDeposittype = res2.studentDeposittype || 'T'); //C:会员；T:学员
                ops.success && ops.success(res1);
            })
            .catch((data, msg) => {
                ops.fail && ops.fail(data, msg);
            });
    },
    /**
     * 获取网站唯一ID
     * @param {ApiCtrl} ops 接口调用控制选项
     */
    getTaMpUnifyOauthUrlInfo(ops) {
        niceloo.api.callRaw({
            api: 'ta/mp/unify/oauth/url/info',
            params: ops.params,
            onsuccess: ops.success,
            onerror(_failure) {
                niceloo.api.handleFailure(_failure);
                if (typeof ops.fail === 'function') ops.fail(_failure);
            },
        });
    },
    /**
     * 扫码登录查询结果
     * @param {ApiCtrl} ops 接口调用控制选项
     */
    getTaMpUnifyOauthCodeInfo(ops) {
        niceloo.api.callRaw({
            api: 'ta/mp/unify/oauth/code/info',
            params: ops.params,
            onsuccess: ops.success,
            onerror(_failure) {
                niceloo.api.handleFailure(_failure);
                if (typeof ops.fail === 'function') ops.fail(_failure);
            },
        });
    },
    /**
     * 绑定手机号
     * @param {ApiCtrl} ops 接口调用控制选项
     */
    wxUserBindPhone(ops) {
        niceloo.api.callRaw({
            api: 'ta/wxuser/bind/phone',
            params: ops.params,
            onsuccess: ops.success,
            onerror(_failure) {
                niceloo.api.handleFailure(_failure);
                if (typeof ops.fail === 'function') ops.fail(_failure);
            },
        });
    },
    /**
     * 推送线索(新)
     * @param {ApiCtrl} ops 接口调用控制选项
     */
    taAppletCluePushNew(ops) {
        niceloo.api.callRaw({
            api: 'ta/applet/clue/push/new',
            params: ops.params,
            onsuccess: ops.success,
            onerror(_failure) {
                niceloo.api.handleFailure(_failure);
                if (typeof ops.fail === 'function') ops.fail(_failure);
            },
        });
    },
};
