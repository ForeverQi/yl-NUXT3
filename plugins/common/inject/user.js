import UrlUtil from './urlUtils';
import PageUtil from './PageUtil';
import CookieUtil from '~/plugins/common/inject/cookieUtil.js';
import storage from '~/plugins/common/inject/storage';

const suffix = 'com.niceloo3.0.h5';
const keyLoginStatus = 'loginStatus';
const keyLoginStatusWithSuffix = keyLoginStatus + suffix;
const keyUserName = 'userName';
const keyO = 'o';
const keyOWithSuffix = keyO + suffix;
const keyUKey = 'uKey';
const keyUKeyWithSuffix = keyUKey + suffix;
const keyToken = 'TOKEN';
const keyTokenWithSuffix = keyToken + suffix;
const keyWatermarkInfo = 'watermarkInfo';

const loginBindStatus = 'login-bind-status';
/**
 * 登录结果的存储时长。单位：毫秒
 */
const loginResultLifeTimeInMinutes = 5 * 24 * 60 * 60 * 1000; /* 5天 */

/**
 * TODO
 * 1. 出于向过去兼容的考虑, 正式环境上暂不与内部的 开发/测试/仿真 环境保持一致
 * 2. 正式环境上, 需要在 cookie 中保留 userName, TOKENcom.niceloo3.0.h5, 以实现对 活动页 的兼容
 * 3. 将于 2022-05-18 调整正式环境中的 cookie, 使其与内部的 开发/测试/仿真 环境保持一致, 以相同的策略处理登录结果 (已通知各个事业部的前端同事)
 * 4. 期望的登录结果处理策略:
 *    a) 只存储名为 TOKEN 的 cookie 在 .niceloo.com 上, 以实现跨多个二级域名共享登录结果的需要
 *    b) 所有用户信息的获取, 均通过 User.getUser() 或 登录/注册组件(王长鹏 负责)的 API 以异步的方式获得
 *    c) User.getUser() 等异步方法将使用 Cookie 中的 TOKEN 自动获取并存储用户信息 (至所在域名的 localStorage 中)
 */

export default (config) => ({
    /**
     * 判断是否有登录凭证
     * @returns {boolean}
     * @private
     */
    _hasToken() {
        let env = config.env;
        if (env != 'prod') {
            return CookieUtil.has(`TOKEN_${env}`);
        } else {
            return CookieUtil.has(keyToken) || CookieUtil.has(keyTokenWithSuffix);
        }
    },

    /**
     * 根据给定的运行环境获取登录凭证
     * @private
     */
    _getToken() {
        const env = config.env;
        if (env != 'prod') {
            return CookieUtil.get(`TOKEN_${env}`);
        } else {
            return CookieUtil.get(keyToken) || CookieUtil.get(keyTokenWithSuffix);
        }
    },

    /**
     * 根据环境设置登录凭证
     * @param {String} token 登录凭证
     * @private
     */
    _setToken(token) {
        const env = config.env;
        if (env != 'prod') {
            CookieUtil.set(`TOKEN_${env}`, token, loginResultLifeTimeInMinutes);
        } else {
            CookieUtil.set(keyToken, token, loginResultLifeTimeInMinutes);
            CookieUtil.set(keyTokenWithSuffix, token, loginResultLifeTimeInMinutes);
        }
    },

    /**
     * 删除登录凭证
     * @private
     */
    _delToken() {
        let env = config.env;
        if (env != 'prod') {
            CookieUtil.del(`TOKEN_${env}`);
        } else {
            CookieUtil.del(keyToken);
            CookieUtil.del(keyTokenWithSuffix);
        }
    },

    /**
     * 获取存储在浏览器本地的用户登录结果
     * @returns {Object|null}
     * @private
     */
    getLoginStatus() {
        var loginStatusFromStorage = storage(config).get(keyLoginStatus);

        const env = config.env;
        if (env != 'prod') {
            /* 内部环境只需从 localStorage 中获取 */
            return loginStatusFromStorage;
        } else {
            /* 线上环境优先从 localStorage 中获取，如果不存在，则尝试从 cookie 中获取。待线上登录结果的存储全部转向 localStorage 后，可以不区分环境，统一只从 localStorage 中获取即可 */
            if (loginStatusFromStorage) return loginStatusFromStorage;

            var loginStatusStrFromCookie = CookieUtil.get(keyLoginStatus) || CookieUtil.get(keyLoginStatusWithSuffix);
            if (null == loginStatusStrFromCookie) {
                return null;
            }

            try {
                return JSON.parse(loginStatusStrFromCookie);
            } catch (e) {
                return null;
            }
        }
    },

    /**
     * 设置用户登录结果
     * @returns {Object|null}
     */
    setLoginStauts(loginStatus) {
        if (loginStatus == null) {
            storage(config).delete(keyLoginStatus);
        } else {
            storage(config).set(keyLoginStatus, loginStatus);
            CookieUtil.set('userName', loginStatus.userLoginname);
        }
    },
    /**
     * 设置登录凭证
     * @param {String} token 登录凭证
     */
    setToken(token) {
        this._setToken(token);
    },

    /**
     * 获取登录凭证
     * @returns {String}
     */
    getToken() {
        return this._getToken();
    },

    /**
     * 设置登录结果
     * @param {Object} loginStatus 登录结果( uc/user/profile/view 接口的返回内容)
     */
    setUser(loginStatus) {
        this.setLoginStauts(loginStatus);
        if (null != loginStatus) CookieUtil.set(keyUserName, loginStatus.userLoginname, loginResultLifeTimeInMinutes);
        else CookieUtil.del(keyUserName);
    },

    /**
     * 获取存储的用户登录结果。
     * 如果存在既有的登录结果，则直接返回；如果不存在，但有登录凭证，则自动执行登录动作并将登录结果存储起来。
     * @returns {Promise<Object> | Promise<null>}
     */
    getUser() {
        var loginStatus = this.getLoginStatus();
        if (loginStatus) {
            return Promise.resolve(loginStatus);
        }

        if (!this._hasToken()) {
            this.setUser(null);
            return Promise.resolve(null);
        }

        // 有token，无用户信息，尝试获取用户信息
        return this.updateUserInfo();
    },

    /**
     * 判断用户是否已登录
     * @returns {boolean}
     */
    async isLogined() {
        return this._hasToken() && (await this.getUser()) != null;
    },
    /**
     * 移除登录相关的信息,包含TOKEN和UserInfo
     */
    removeLoginInfo() {
        this._delToken();

        CookieUtil.del(keyO);
        CookieUtil.del(keyOWithSuffix);

        CookieUtil.del(keyUKey);
        CookieUtil.del(keyUKeyWithSuffix);

        CookieUtil.del(keyLoginStatus);
        storage(config).delete(keyLoginStatus);
        CookieUtil.del(keyLoginStatusWithSuffix);
        storage(config).delete(keyLoginStatusWithSuffix);

        // 删除绑定状态
        storage(config).delete(loginBindStatus);

        storage(config).delete(keyWatermarkInfo);

        this.setUser(null);
    },
    async updateUserInfo() {
        return await ylPlugin.login
            .getUser()
            .then((user) => {
                if (user) {
                    this.setUser(user);
                } else {
                    this.removeLoginInfo();
                }

                return user;
            })
            .catch(() => {
                return null;
            });
    },

    /**
     * 部分页面不做url的token处理
     */
    tokenWhiteList(url = global.location && global.location.href) {
        let stats = false;
        let whiteList = [
            '/inside/user/livePage', //直播
        ];

        for (let i = 0; i <= whiteList.length; i++) {
            if (url.indexOf(whiteList[i]) > -1) {
                stats = true;
                break;
            }
        }

        return stats;
    },
    /**
     * 系统在当前行为下登录完成事件
     * @param successCallBack 登录成功回调
     * @param failCallBack 登录失败回调
     */
    loginedo(successCallBack, failCallBack = () => {}) {
        if (!this.loginedoInit && !this.tokenWhiteList()) {
            let tok = UrlUtil.getUrlParam('TOKEN');
            if (tok) {
                this.removeLoginInfo();
                this.setToken(tok);
            }
        }
        this.loginedoInit = true;

        this.isLogined().then((check) => {
            if (check) {
                successCallBack();
            } else {
                failCallBack();
            }
        });
    },

    /**
     * 删除用户信息并进入登录页面
     */
    toLogin() {
        this.logout();
        PageUtil(config.env).toLogin();
    },

    /**
     * 与后台同步退出登录状态
     */
    logout() {
        this.removeLoginInfo();
    },
});
