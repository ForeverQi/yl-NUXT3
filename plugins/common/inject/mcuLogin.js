import Vue from 'vue';
import PageUtil from './PageUtil.js';
import storage from './storage.js';
import login from '@/www/components/microClassUser/login/Index';

export default (context) => {
    const handleMap = {
        login(obj) {
            // type === login
            let { instance, resolve, reject, isLogin } = obj;
            if (isLogin) {
                // 已登录
                instance.getBindStatus().then((bindStatus) => {
                    let ret = {
                        ...bindStatus,
                        isFirst: false,
                    };
                    resolve(ret);
                });
            } else {
                // 未登录
                reject();
            }
        },
        appointment(obj) {
            // 预约
            // type === appointment
            let { instance, resolve, reject, isLogin, _this } = obj;
            if (isLogin) {
                // 已登录
                instance.getBindStatus().then((bindStatus) => {
                    if (bindStatus.bindWechat === false) {
                        // 未绑定微信
                        return _this
                            .doLogin('qrcode')
                            .then(function () {
                                instance.getBindStatus().then((res) => {
                                    let ret = {
                                        ...res,
                                        isFirst: false,
                                    };
                                    resolve(ret);
                                });
                            })
                            .catch(reject);
                    } else {
                        let ret = {
                            ...bindStatus,
                            isFirst: false,
                        };
                        resolve(ret);
                    }
                });
            } else {
                // 未登录
                _this.doLogin('login').then(() => {
                    // 判断是否绑定过微信
                    instance.getBindStatus().then((bindStatus) => {
                        if (bindStatus.bindWechat === false) {
                            // 未绑定微信
                            return _this
                                .doLogin('qrcode')
                                .then(function () {
                                    instance.getBindStatus().then((res) => {
                                        let ret = {
                                            ...res,
                                            isFirst: true,
                                        };
                                        resolve(ret);
                                    });
                                })
                                .catch(reject);
                        } else {
                            let ret = {
                                ...bindStatus,
                                isFirst: true,
                            };
                            resolve(ret);
                        }
                    });
                });
            }
        },
        myMicroClass(obj) {
            // 我的微课
            let { instance, resolve, reject, isLogin, _this } = obj;
            if (isLogin) {
                // 已登录
                let bindStatus = storage(context.env.config).get('login-bind-status');
                if (!bindStatus) {
                    bindStatus = {
                        bindWechat: false,
                    };
                }
                if (bindStatus.bindWechat === false) {
                    // 未绑定微信
                    return _this
                        .doLogin('userCenter')
                        .then(() => {
                            instance.getBindStatus().then((res) => {
                                let ret = {
                                    ...res,
                                    isFirst: false,
                                };
                                resolve(ret);
                            });
                        })
                        .catch(reject);
                } else {
                    let ret = {
                        ...bindStatus,
                        isFirst: false,
                    };
                    resolve(ret);
                }
            } else {
                reject();
                // 我的微课页面退出或者登录状态失效时跳转至微课首页
                PageUtil(context.env.config).replaceUrl('/agile-course');
            }
        },
        default(obj) {
            let { instance, isLogin, resolve, reject, _this } = obj;
            if (isLogin) {
                // 已登录
                instance.getBindStatus().then((bindStatus) => {
                    let ret = {
                        ...bindStatus,
                        isFirst: false,
                    };
                    resolve(ret);
                });
            } else {
                // 未登录
                return _this
                    .doLogin()
                    .then(() => {
                        instance.getBindStatus().then((bindStatus) => {
                            let ret = {
                                ...bindStatus,
                                isFirst: true,
                            };
                            resolve(ret);
                        });
                    })
                    .catch(reject);
            }
        },
    };
    return {
        createLogin() {
            const LoginConstructor = Vue.extend({
                ...login,
                ...context,
            });
            const instance = new LoginConstructor({
                el: document.createElement('div'),
            });

            instance.context = context;
            return instance;
        },
        doLogin(type = 'login') {
            return new Promise((resolve, reject) => {
                const instance = this.createLogin();
                instance.type = type;
                instance.doSuccess = resolve;
                instance.doError = reject;
                instance.context = context;
                instance.doShow();
                document.body.appendChild(instance.$el);
            });
        },
        checkLogin(type) {
            /**
             * 账号登录在promise的then，没有登录默认会调用登录弹窗，登录报错在catch中
             * type: login: 返回账号是否绑定过微信
             */
            return new Promise((resolve, reject) => {
                const instance = this.createLogin();

                instance.checkLogin().then((isLogin) => {
                    const obj = {
                        resolve,
                        reject,
                        instance,
                        isLogin,
                        _this: this,
                    };
                    if (typeof handleMap[type] === 'undefined') {
                        type = 'default';
                    }

                    handleMap[type](obj);
                });
            });
        },
    };
};
