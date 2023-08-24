<template>
    <div>
        <div v-show="loginMode !== 'wx'">
            <div class="nlf_tit">
                <ul>
                    <li :class="loginMode == 'message' ? 'active' : ''" @click="switchLogin('message')">短信登录</li>
                    <li :class="loginMode == 'account' ? 'active' : ''" @click="switchLogin('account')">账号登录</li>
                </ul>
            </div>
            <div class="nlf_con">
                <!-- 账号 登录信息 -->
                <div id="divLoginDel" class="nlf_item block" v-show="loginMode == 'account'">
                    <p class="nlf_errtip" id="errMsg"></p>
                    <!-- <p class="nlf_errtip" id="errMsg" >{{ accountLogin.errorTip }}</p> -->
                    <div class="nlf_lab">
                        <i class="user"></i>
                        <input
                            name="txtUserName"
                            type="text"
                            id="txtUserName"
                            placeholder="手机号/用户名"
                            class="nlf_inp input1"
                            v-model="accountLogin.username"
                        />
                    </div>
                    <div class="nlf_lab">
                        <i class="password"></i>
                        <input
                            name="txtUserPwd"
                            :type="accountLogin.pwdType"
                            id="txtUserPwd"
                            placeholder="密码"
                            class="nlf_inp nlf_pwd input1"
                            v-model="accountLogin.password"
                        />
                        <i class="eye" :class="accountLogin.pwdType == 'password' ? '' : 'open'" @click="switchPwdStatus"></i>
                    </div>
                    <div class="nlf_lab txyzm" v-if="accountLogin.isCaptchaToken">
                        <i class="picYzm"></i>
                        <input name="txtSMSCode_q" type="text" placeholder="请输入图形验证码" class="nlf_yzminp input1" v-model="accountLogin.captchaValue" />
                        <img :src="accountLogin.imgSrc" class="img-captcha" @click="getCaptchaToken('uc_login')" />
                    </div>
                    <div class="nlf_tip">
                        <span class="nlf_sp">
                            还没有账号？
                            <a href="javascript:void(0);" @click="jumpToRegister" class="link">注册</a>
                        </span>
                        <span class="nlf_rt"><router-link to="/uc/findPwd" target="_blank" class="link">忘记密码？</router-link></span>
                        <div class="login-agree login-agree-account" @click="agree = !agree" style="white-space: nowrap">
                            <input name="cbProtocol" id="cbProtocol" type="checkbox" value="复选框" class="cbox" v-model="agree" />
                            <!-- eslint-disable-next-line -->
                            我已阅读并同意
                            <nuxt-link to="/inside/information/agreement" target="_blank" class="link" style="font-size: 0">
                                <span style="font-size: 14px; color: #333">《</span>
                                <span style="font-size: 14px">隐私政策</span>
                                <span style="font-size: 14px; color: #333">》</span>
                            </nuxt-link>
                            和
                            <nuxt-link to="/uc/registerProtocol" target="_blank" class="link" style="font-size: 0">
                                <span style="font-size: 14px; color: #333">《</span>
                                <span style="font-size: 14px">优路用户注册协议</span>
                                <span style="font-size: 14px; color: #333">》</span>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="nlf_btnbox">
                        <input
                            type="submit"
                            :value="disabledAccountLogin ? '正在登录...' : '立即登录'"
                            :disabled="disabledAccountLogin ? true : false"
                            class="nlf_btn"
                            @click="loginBtn"
                        />
                    </div>
                    <div class="nlf_other" id="oauth" style="display: none">
                        <span>
                            其他方式登录：
                            <i class="wx" onclick="WeixinLogin()" id="wechatPc"></i>
                        </span>
                    </div>
                    <div class="nlf_other_login" @click="wxLogin">
                        <img class="icon" src="./asset/images/weixin.png" />
                        <span class="title">微信扫码登录</span>
                    </div>
                </div>

                <!-- 短信 登录信息 -->
                <div id="divLogin_qDel" class="nlf_item" v-show="loginMode == 'message'">
                    <!-- <p class="nlf_errtip" id="errMsg_q">{{ messageLogin.errorTip }}</p> -->
                    <div class="nlf_lab">
                        <i class="tel"></i>
                        <input
                            name="txtUserName_q"
                            type="text"
                            id="txtUserName_q"
                            placeholder="请输入手机号码"
                            class="nlf_inp input1"
                            v-model="messageLogin.mobile"
                        />
                    </div>
                    <div id="upnlBase">
                        <div class="nlf_lab txyzm" v-if="messageLogin.isCaptchaToken">
                            <i class="picYzm"></i>
                            <input
                                name="txtSMSCode_q"
                                type="text"
                                placeholder="请输入图形验证码"
                                class="nlf_yzminp input1"
                                v-model="messageLogin.captchaValue"
                            />
                            <img :src="messageLogin.imgSrc" class="img-captcha" @click="getCaptchaToken('ms_sms_verifyCode_send')" />
                        </div>
                        <div class="nlf_lab dxyzm">
                            <i class="messYzm"></i>
                            <input
                                name="txtSMSCode_q"
                                type="text"
                                id="txtSMSCode_q"
                                placeholder="请输入短信验证码"
                                class="nlf_yzminp input1"
                                v-model="messageLogin.verifyValue"
                            />
                            <input
                                type="submit"
                                name="btnSMSCode"
                                :value="messageTxt"
                                id="btnSMSCode"
                                class="yzm_btn"
                                :class="isDisabled ? 'gray' : ''"
                                :disabled="isDisabled"
                                @click="sendMessage"
                            />
                        </div>
                        <div class="nlf_tip">
                            <p class="nlf_p" @click="agree = !agree" style="white-space: nowrap">
                                <input name="cbProtocol" type="checkbox" value="复选框" class="cbox" v-model="agree" />
                                我已阅读并同意
                                <nuxt-link to="/inside/information/agreement" target="_blank" class="link" style="font-size: 0">
                                    <span style="font-size: 14px; color: #333">《</span>
                                    <span style="font-size: 14px">隐私政策</span>
                                    <span style="font-size: 14px; color: #333">》</span>
                                </nuxt-link>
                                和
                                <nuxt-link to="/uc/registerProtocol" target="_blank" class="link" style="font-size: 0">
                                    <span style="font-size: 14px; color: #333">《</span>
                                    <span style="font-size: 14px">优路用户注册协议</span>
                                    <span style="font-size: 14px; color: #333">》</span>
                                </nuxt-link>

                                <span class="line">（未注册优路产品的手机号，登录将自动注册）</span>
                            </p>
                        </div>
                        <div class="nlf_btnbox">
                            <input
                                type="submit"
                                :value="disabledMessageLogin ? '正在登录...' : '立即登录'"
                                :disabled="disabledMessageLogin ? true : false"
                                class="nlf_btn"
                                @click="loginBtn"
                            />
                        </div>
                    </div>

                    <div class="nlf_other" style="display: none">
                        <span>
                            其他方式登录：
                            <i class="wx"></i>
                        </span>
                    </div>
                    <div class="nlf_other_login" @click="wxLogin">
                        <img class="icon" src="./asset/images/weixin.png" />
                        <span class="title">微信扫码登录</span>
                    </div>
                </div>
                <div class="nlf_item block" v-show="loginMode == 'wx'"></div>
            </div>
            <div class="error" v-if="showError">{{ errorMsg }}</div>
            <!-- 报错提示弹框 -->
            <error-dialog v-if="showPCError" :message="errorMsg" @errorTipClose="closePCErrorDialog" />
        </div>

        <div v-show="loginMode === 'wx'">
            <div class="nlf_login_qr_header">
                <button @click="wxBack" class="back">返回</button>
                <div class="nlf_other_login">
                    <img class="icon" src="./asset/images/weixin.png" />
                    <span class="title qr_title">微信扫码登录</span>
                </div>
            </div>
            <div class="nlf_login_qr_con">
                <div ref="qrcode" id="nlf_login_qr_container" class="nlf_login_qr_container"></div>
                <div class="nlf_login_qr_disabled" v-show="isQrInvalid">
                    <span class="title">二维码已失效</span>
                    <button @click="wxQrRefresh" class="refresh">点击刷新</button>
                </div>
            </div>
        </div>
        <bind-phone-popup v-if="isUnBindPhone" @bind-success="bindPhoneSuccess" @close="bindPhoneClose" :wxuser-id="wxuserId" />
    </div>
</template>

<script>
/* eslint-disable*/
import { mapMutations } from 'vuex';
import bindPhonePopup from '../bindPhonePopup/index.vue';
import yiguan from './js/yiguan.js';
import errorDialog from '@/www/components/uc/login/errorDialog/index.vue';
import loginApi from '@/api/login.js';

export default {
    name: 'loginPopup',
    components: {
        errorDialog,
        bindPhonePopup,
    },
    data() {
        return {
            loginMode: 'account', //account账号登录   message短信登录
            agree: false,
            showError: false,
            showPCError: false, // PC 错误提示框
            errorMsg: '', // 错误提示信息
            //账号登录
            accountLogin: {
                errorTip: '', //错误提示
                username: '',
                password: '',
                pwdType: 'password',
                isCaptchaToken: false, //是否展示图形验证码
                captchaValue: '', //输入图形验证码
                captchaToken: '', //图形验证码凭证
                imgSrc: '', //图形验证码地址
            },
            //短信登录
            messageLogin: {
                errorTip: '', //错误提示
                mobile: '', //手机
                verifyValue: '', //短信验证码
                isCaptchaToken: false, //是否展示图形验证码
                captchaValue: '', //输入图形验证码
                captchaToken: '', //图形验证码凭证
                imgSrc: '', //图形验证码地址
            },
            //
            captcha: {}, //验证码凭证
            //倒计时
            isDisabled: false,
            count: 60, //60s倒计时
            messageTxt: '获取短信验证码',
            //
            disabledAccountLogin: false,
            disabledMessageLogin: false,
            is_resend: false,
            yiguan,
            qrTimer: 0,
            preLoginMode: '',
            isQrInvalid: false,
            isUnBindPhone: false,
            wxuserId: '',
            config: this.$nuxt.context.env.config,
        };
    },
    mounted() {
        if (this.$route.query.code && this.$route.query.state) {
            this.loginMode = 'wx';
            this.getQrScanResult(this.$route.query.code, this.$route.query.state);
            this.setWxQr();
        } else if (this.IsPC()) {
            this.loginMode = 'message';
        }
        var vm = this;
        //监听回车事件 去登录
        document.onkeydown = function (e) {
            var key = window.event.keyCode;
            if (key == 13) {
                vm.loginBtn();
            }
        };
    },
    methods: {
        ...mapMutations('logout', ['setUserInfo']),
        IsPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        closePCErrorDialog() {
            // 关闭PC端的错误弹窗
            this.showPCError = false;
        },
        //切换登录方式
        switchLogin(mode) {
            if (this.loginMode !== mode) {
                this.agree = false;
            }

            this.loginMode = mode;
        },
        //切换密码显示隐藏
        switchPwdStatus() {
            if (this.accountLogin.pwdType == 'password') {
                this.accountLogin.pwdType = 'text';
            } else {
                this.accountLogin.pwdType = 'password';
            }
        },
        //发送短信
        sendMessage() {
            debugger;
            let vm = this;
            if (!vm.messageLogin.mobile.trim().match(/^1[3|4|5|8|7|6|9][0-9]\d{8}$/)) {
                vm.messageLogin.errorTip = '手机号不正确';
                vm.showErrorHandle('手机号不正确');
                return false;
            }
            if (vm.messageLogin.isCaptchaToken && vm.messageLogin.captchaValue == '') {
                vm.messageLogin.errorTip = '图形验证码不能为空';
                vm.showErrorHandle('手机号不正确');
                return false;
            }
            vm.messageLogin.errorTip = '';
            vm.isDisabled = true;
            //简单验证
            if (!vm.messageLogin.isCaptchaToken) {
                //获取 简单验证码
                vm.getCaptcha('ms_sms_verifyCode_send', function (err, data) {
                    if (err) {
                        var response = err.getAttachedData();
                        if (response && response.getData() && response.getData().type == 'easyCaptcha') {
                            //展示图形验证码
                            vm.messageLogin.isCaptchaToken = true;
                            //获取 图形验证码
                            vm.getCaptchaToken('ms_sms_verifyCode_send');
                        }
                    } else {
                        vm.captcha = data;
                        //发送短信
                        vm.sendMess();
                    }
                });
            }
            //图形验证
            if (vm.messageLogin.isCaptchaToken) {
                vm.captcha = {
                    captchaToken: vm.messageLogin.captchaToken,
                    captchaValue: vm.messageLogin.captchaValue,
                };
                //发送短信
                vm.sendMess();
            }
        },
        //发送短信
        sendMess(callback) {
            let vm = this;
            let params = {
                smsPhone: vm.messageLogin.mobile.trim(),
                smstplNo: '010001',
                captcha: vm.captcha,
                scene: 'uc_login',
            };
            loginApi.sendMess({
                params,
                success: (data) => {
                    //倒计时
                    vm.countDown();
                },
                fail: (data) => {
                    debugger;
                    if (vm.loginMode == 'message' && vm.messageLogin.isCaptchaToken && data.getCode().split('-')[1] == '1002') {
                        vm.messageLogin.captchaValue = '';
                        //获取 图形验证码 凭证
                        vm.getCaptchaToken('ms_sms_verifyCode_send');
                    }
                    // vm.messageLogin.errorTip = msg;
                    // vm.showErrorHandle(msg);
                    vm.isDisabled = false;
                },
            });
        },
        //获取 简单验证码
        getCaptcha(scene, callback) {
            debugger;
            let vm = this;
            loginApi.getCaptcha({
                params: {
                    scene,
                },
                success: (data) => {
                    callback(null, data);
                },
                fail: (_failure) => {
                    //账号登录
                    if (vm.loginMode == 'account') {
                        vm.disabledAccountLogin = false;
                    }
                    //短信登录
                    if (vm.loginMode == 'message') {
                        vm.isDisabled = false;
                    }

                    callback(_failure);
                },
            });
        },
        //获取 图形验证码
        getCaptchaToken(scene) {
            let vm = this;
            let params = {
                captchaScene: scene,
                captchaType: '',
            };
            loginApi.getCaptchaToken({
                params,
                success: (data) => {
                    if (vm.loginMode == 'account') {
                        vm.accountLogin.captchaToken = data.captchaToken;
                        vm.accountLogin.imgSrc = this.$niceloo.path.getServerCaptchaPath(data.captchaToken);
                        vm.disabledAccountLogin = false;
                    }
                    if (vm.loginMode == 'message') {
                        vm.messageLogin.captchaToken = data.captchaToken;
                        vm.messageLogin.imgSrc = vm.$niceloo.path.getServerCaptchaPath(data.captchaToken);
                        vm.isDisabled = false;
                    }
                },
                fail: (data) => {
                    //账号登录
                    if (vm.loginMode == 'account') {
                        // vm.accountLogin.errorTip = msg;
                        vm.disabledAccountLogin = false;
                        // vm.showErrorHandle(vm.accountLogin.errorTip);
                    }
                    //短信登录
                    if (vm.loginMode == 'message') {
                        vm.isDisabled = false;
                        // vm.messageLogin.errorTip = msg;
                        // vm.showErrorHandle(vm.messageLogin.errorTip);
                    }
                },
            });

            this.$yiguan.track('get_code', {
                is_resend: this.is_resend,
                get_code_position: '登录',
                superProperty: vm.yiguan(),
            });
            this.is_resend = true;
        },
        //倒计时
        countDown() {
            let vm = this;
            vm.isDisabled = true;
            vm.count = vm.count - 1;
            vm.messageTxt = vm.count + '秒后重新发送';
            if (vm.count == 0) {
                vm.messageTxt = '重新发送';
                vm.count = 60;
                vm.isDisabled = false;
                return;
            }
            setTimeout(vm.countDown, 1000);
        },
        //登录
        loginBtn() {
            debugger;
            let vm = this;
            let param = {
                userLoginname: '',
                userLoginpwd: '',
                userMobile: '',
                userEmail: '',
                verify: '',
                captcha: '',
                userFlag: 'S',
            };
            //账号登录
            if (vm.loginMode == 'account') {
                if (vm.accountLogin.username.trim() == '') {
                    vm.accountLogin.errorTip = '手机号/用户名不能为空';
                    vm.showErrorHandle('手机号/用户名不能为空');
                    return;
                }
                if (vm.accountLogin.password == '') {
                    vm.accountLogin.errorTip = '密码不能为空';
                    vm.showErrorHandle('密码不能为空');
                    return;
                }
                if (vm.accountLogin.isCaptchaToken && vm.accountLogin.captchaValue == '') {
                    vm.accountLogin.errorTip = '图形验证码不能为空';
                    vm.showErrorHandle('图形验证码不能为空');
                    return;
                }

                if (!vm.agree) {
                    vm.accountLogin.errorTip = '请勾选同意后再登录';
                    if (this.$platform.isPC) {
                        // this.MsgBox.alert('请勾选同意《<a>隐私政策</a>》和《优路用户注册协议》');
                        vm.showErrorHandle(
                            '<span style="display: inline-block;">请勾选同意《<a href="/inside/information/agreement" style="color: red;" target="_blank">隐私政策</a>》和《<a href="/uc/registerProtocol" style="color: red;" target="_blank">优路用户注册协议</a>》</span>'
                        );
                    } else {
                        vm.showErrorHandle('请勾选同意后再登录');
                    }
                    return;
                }
                vm.accountLogin.errorTip = '';
                if (vm.accountLogin.username.trim().match(/^1[3|4|5|8|7|6|9][0-9]\d{8}$/)) {
                    param.userMobile = vm.accountLogin.username.trim();
                } else {
                    param.userLoginname = vm.accountLogin.username.trim();
                }
                param.userLoginpwd = vm.accountLogin.password;

                vm.disabledAccountLogin = true;
                //简单验证
                if (!vm.accountLogin.isCaptchaToken) {
                    //获取 简单验证码 凭证
                    vm.getCaptcha('uc_login', function (err, data) {
                        if (err) {
                            var response = err.getAttachedData();
                            if (response && response.getData() && response.getData().type == 'easyCaptcha') {
                                //展示图形验证码
                                vm.accountLogin.isCaptchaToken = true;
                                //获取 图形验证码 凭证
                                vm.getCaptchaToken('uc_login');
                            }
                        } else {
                            vm.captcha = data;
                            param.captcha = vm.captcha;

                            //登录
                            vm.login(param);
                        }
                    });
                }
                debugger;

                //图形验证
                if (vm.accountLogin.isCaptchaToken) {
                    vm.captcha = {
                        captchaToken: vm.accountLogin.captchaToken,
                        captchaValue: vm.accountLogin.captchaValue,
                    };
                    param.captcha = vm.captcha;
                    //登录
                    vm.login(param, 'account');
                }
            }
            //短信登录
            if (vm.loginMode == 'message') {
                if (!vm.messageLogin.mobile.trim().match(/^1[3|4|5|8|7|6|9][0-9]\d{8}$/)) {
                    vm.messageLogin.errorTip = '手机号不正确';
                    vm.showErrorHandle('手机号不正确');
                    return false;
                }
                if (vm.messageLogin.isCaptchaToken && vm.messageLogin.captchaValue == '') {
                    vm.messageLogin.errorTip = '图形验证码不能为空';
                    vm.showErrorHandle('图形验证码不能为空');
                    return;
                }
                if (vm.messageLogin.verifyValue == '') {
                    vm.messageLogin.errorTip = '短信验证码不能为空';
                    vm.showErrorHandle('短信验证码不能为空');
                    return;
                }
                if (!vm.agree) {
                    vm.messageLogin.errorTip = '请勾选同意后再登录';
                    if (this.$platform.isPC) {
                        // this.MsgBox.alert('请勾选同意《<a>隐私政策</a>》和《优路用户注册协议》');
                        vm.showErrorHandle(
                            '<span style="display: inline-block;">请勾选同意《<a href="/inside/information/agreement" style="color: red;" target="_blank">隐私政策</a>》和《<a href="/uc/registerProtocol" style="color: red;" target="_blank">优路用户注册协议</a>》</span>'
                        );
                    } else {
                        vm.showErrorHandle('请勾选同意后再登录');
                    }
                    return;
                }
                vm.messageLogin.errorTip = '';
                param.userMobile = vm.messageLogin.mobile.trim();
                param.verify = { verifyValue: vm.messageLogin.verifyValue };

                vm.disabledMessageLogin = true;
                //登录
                vm.login(param, 'message');
            }
        },
        showErrorHandle(msg) {
            this.errorMsg = msg;
            if (this.$platform.isPC) {
                this.showPCError = true;
                return;
            }
            this.showError = true;
            setTimeout(() => {
                this.showError = false;
            }, 2000);
        },
        //登录
        // async
        async login(infos, method) {
            var login_resource = /endPageName=(.*)&?/.exec(decodeURIComponent(location.search));
            login_resource = login_resource && login_resource[1] ? login_resource[1] : '首页';
            var login_method = method == 'account' ? '账号密码登录' : '短信登录';
            let vm = this;
            let type = 'P';
            let fail = function (data, msg) {
                vm.$User.removeLoginInfo();
                if (vm.loginMode == 'account' && vm.accountLogin.isCaptchaToken) {
                    vm.accountLogin.captchaValue = '';
                    //获取 图形验证码 凭证
                    vm.getCaptchaToken('uc_login');
                }
                vm.disabledAccountLogin = false;
                vm.disabledMessageLogin = false;
                // //账号登录
                // if (vm.loginMode == 'account') {
                //     vm.accountLogin.errorTip = msg;
                //     // vm.showErrorHandle(msg);
                // }
                // //短信登录
                // if (vm.loginMode == 'message') {
                //     vm.messageLogin.errorTip = msg;
                //     vm.showErrorHandle(msg);
                // }
            };

            if (method == 'account') {
                infos.extension = await vm.$PromotionUtilNew.getLoginExtension();
            } else {
                infos.clueExtension = await vm.$PromotionUtil.getOptExtension();
            }
            // if(window.nlulib){
            //     await window.nlulib.loadPCIntergration();
            //     if(nlulib.PCIntergration.hasExtension()){//获取插件线索信息
            //         delete infos.extension;
            //         infos.behaviorExtension = JSON.stringify(nlulib.PCIntergration.getBehaviorExtension());
            //         if (method !== "account") {
            //             infos.clueExtension = JSON.stringify(nlulib.PCIntergration.getClueExtension());
            //         }
            //     }
            // }
            loginApi.login({
                params: infos,
                success: (data) => {
                    vm.loginSuccessCallback({
                        data,
                        type,
                        login_resource,
                        login_method,
                        fail,
                    });
                },
                fail: (data) => {
                    this.$yiguan.track('login_in_new', {
                        login_success: false,
                        fail_reason: data.getDescription(),
                        login_resource,
                        login_method,
                        superProperty: vm.yiguan(),
                    });
                    fail();
                },
            });
        },
        loginSuccessCallback({ data, type, login_resource, login_method, fail, success }) {
            const vm = this;
            this.$User.setToken(data.token);

            loginApi.getUserProfile({
              params: {},
              success: (data3) => {
                this.$yiguan.track('login_in_new', {
                  login_success: true,
                  fail_reason: '',
                  login_resource,
                  login_method,
                  superProperty: vm.yiguan(),
                });
                this.$User.setUser(data3);
                this.setUserInfo(data3);
                setTimeout(function () {
                  vm.disabledAccountLogin = false;
                  vm.disabledMessageLogin = false;
                }, 1000);
                if (success) {
                  success();
                }
                debugger;
                vm.$emit('loginSuccess', { pwd: vm.accountLogin.password, loginInfo: data });
              },
              fail: (data3, msg3) => {
                this.$yiguan.track('login_in_new', {
                  login_success: false,
                  fail_reason: msg3,
                  login_resource,
                  login_method,
                  superProperty: vm.yiguan(),
                });
                fail(data3, '系统开小差啦，待会再试试！' || msg3);
              },
              error: (data3, msg3) => {
                this.$yiguan.track('login_in_new', {
                  login_success: false,
                  fail_reason: msg3,
                  login_resource,
                  login_method,
                  superProperty: vm.yiguan(),
                });
                fail(data3, '系统开小差啦，待会再试试！' || msg3);
              },
            });
            debugger;
        },
        //跳转到注册页面
        jumpToRegister() {
            this.$emit('jumpToRegister');
        },
        wxLogin() {
            if (this.agree === false) {
                this.messageLogin.errorTip = '请勾选同意后再登录';
                if (this.$platform.isPC) {
                    this.showErrorHandle(
                        '<span style="display: inline-block;">请勾选同意《<a href="/inside/information/agreement" style="color: red;" target="_blank">隐私政策</a>》和《<a href="/uc/registerProtocol" style="color: red;" target="_blank">优路用户注册协议</a>》</span>'
                    );
                } else {
                    this.showErrorHandle('请勾选同意后再登录');
                }
                return;
            }
            this.preLoginMode = this.loginMode;
            this.loginMode = 'wx';
            this.setWxQr();
            this.$yiguan.track('click_wx_QRcode', {
                login_resource: '优路教育web网站',
            });
        },
        wxBack() {
            this.loginMode = this.preLoginMode || 'account';
        },
        wxQrRefresh() {
            this.setWxQr();
        },
        setWxQr() {
            let vm = this;
            return new Promise((resolve, reject) => {
                loginApi.getTaMpUnifyOauthUrlInfo({
                    success: (data) => {
                        resolve(data);
                    },
                    fail: (data, msg) => {
                        reject(msg);
                    },
                });
            })
                .then((data) => {
                    new WxLogin({
                        self_redirect: true,
                        id: 'nlf_login_qr_container',
                        appid: document.domain.includes('youlu.com') ? this.config.YOULU_WX_APPID : this.config.WX_APPID,
                        scope: 'snsapi_login',
                        redirect_uri: encodeURIComponent(this.$PageUtil.getOriginUrl() + '/_nuxt/loginEmpty.html'),
                        state: document.domain.includes('youlu.com') ? this.config.YOULU_WX_APPID : this.config.WX_APPID,
                        style: '',
                        href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAyMDBweDt9Ci5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZTt9Ci5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjtwYWRkaW5nOiA3cHggMDt9IAouaW1wb3dlckJveCAuaWNvbjM4X21zZyB7ZGlzcGxheTogbm9uZTt9',
                    });
                    let iframe = document.getElementById('nlf_login_qr_container').children[0];

                    function isObjectFn(o) {
                        return Object.prototype.toString.call(o) === '[object Object]';
                    }

                    iframe.onload = function () {
                        iframe.contentWindow.postMessage('emit', vm.$PageUtil.getOriginUrl() + '/_nuxt/loginEmpty.html');
                        window.onmessage = function (e) {
                            if (isObjectFn(e.data)) {
                                vm.getQrScanResult(e.data.code, e.data.state);
                            }
                        };
                    };
                    clearTimeout(this.qrTimer);
                    this.isQrInvalid = false;
                    this.qrTimer = setTimeout(() => {
                        // this.intervalTimer && clearInterval(this.intervalTimer);
                        this.isQrInvalid = true;
                        console.error('失效');
                    }, 1000 * 60 * 5);
                })
                .catch((err) => {
                    console.warn(err);
                });
        },
        getQrScanResult(code, state) {
            return new Promise((resolve, reject) => {
                loginApi.getTaMpUnifyOauthCodeInfo({
                    params: { code, state },
                    success: (data) => {
                        resolve(data);
                    },
                    fail: (data, msg) => {
                        reject(msg);
                    },
                });
            })
                .then((data) => {
                    this.isUnBindPhone = data.bindPhone === 'N';
                    this.wxuserId = data.wxuserId;
                    if (this.isUnBindPhone === false) {
                        debugger;
                        this.bindPhoneSuccess(data);
                    } else {
                        this.$yiguan.track('login_in_sucess', {
                            login_success: true,
                            fail_reason: '',
                            login_resource: '优路教育web网站',
                        });
                    }
                })
                .catch((err) => {
                    console.warn(err);
                    this.$yiguan.track('login_in_sucess', {
                        login_success: false,
                        fail_reason: String(err),
                        login_resource: '优路教育web网站',
                    });
                })
                .finally(() => {
                    const query = { ...this.$route.query };
                    delete query.code;
                    delete query.state;
                    this.$router.replace({ query: query, replace: true }).catch(() => {});
                });
        },
        bindPhoneSuccess(data) {
            debugger;
            let login_resource = /endPageName=(.*)&?/.exec(decodeURIComponent(location.search));
            login_resource = login_resource && login_resource[1] ? login_resource[1] : '首页';
            const login_method = '微信扫码登录';
            const type = 'P';
            const fail = (data, msg) => {
                this.$User.removeLoginInfo();
                this.disabledAccountLogin = false;
                this.disabledMessageLogin = false;
            };
            this.loginSuccessCallback({
                data,
                type,
                login_resource,
                login_method,
                fail,
            });
        },
        bindPhoneClose() {
            this.isUnBindPhone = false;
            this.setWxQr();
        },
    },
    // beforeDestroy() {
    //     if(window.nlulib){nlulib.PCIntergration.clearExtension()};//清除插件线索信息
    // }
};
</script>

<style scoped lang="less">
.error {
    position: fixed;
    color: #fff;
    top: 50%;
    left: 50%;
    line-height: 1.5;
    left: 20px;
    right: 20px;
    text-align: center;
    padding: 8px 10px;
    font-size: 14px;
    transform: translateY(-50%);
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.6);
}

.login-agree {
    // text-align: center;
    cursor: pointer;
    text-align: left;
    margin-top: 15px;
    font-size: 14px;
    color: #333;
}

.login-agree-account {
    margin-top: 10px;
}

.line {
    display: block;
}

.cbox {
    margin-right: 5px;
}

.nlf_tip {
    margin-top: 20px;
    cursor: pointer;
}

.nlf_other_login {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.nlf_other_login .title {
    margin-left: 10px;
}

.nlf_other_login .icon {
    width: 30px;
    height: 30px;
}

.nlf_login_qr_header {
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    padding-top: 10px;
    padding-bottom: 10px;
}

.nlf_login_qr_header .back {
    background-color: transparent;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    font-size: 15px;
    border: none;
    outline: none;
}

.nlf_login_qr_header .back::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 3px;
    background-image: url('./asset/images/back.png');
    background-size: 100% 100%;
    vertical-align: bottom;
}

.nlf_login_qr_header .qr_title {
    font-weight: bold;
}

.nlf_login_qr_con {
    position: relative;
    padding-top: 30px;
    padding-bottom: 35px;
}

.nlf_login_qr_container {
    text-align: center;
    height: 260px;
}

.nlf_login_qr_container .title {
    display: none;
}

.nlf_login_qr_disabled {
    background-color: rgba(0, 0, 0, 0.65);
    height: 200px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 46px;
    left: 50%;
    transform: translateX(-50%);
}

.nlf_login_qr_disabled .title {
    color: white;
}

.nlf_login_qr_disabled .refresh {
    border-radius: 15px;
    padding: 5px 10px;
    margin-top: 15px;
}

.nlf_login_qr_disabled .refresh::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    background-image: url('./asset/images/refresh.png');
    background-size: 100% 100%;
    vertical-align: sub;
}
</style>
