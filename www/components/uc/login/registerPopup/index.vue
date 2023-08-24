<template>
    <div>
        <div class="nlf_tit">
            <ul>
                <li class="all">注册账号</li>
            </ul>
        </div>
        <div class="nlf_con">
            <!-- <p class="nlf_errtip" id="errMsg">{{ registerForm.errorTip }}</p> -->
            <p class="nlf_errtip" id="errMsg"></p>
            <div class="nlf_lab">
                <i class="tel"></i>
                <input type="text" name="txtMobile" style="display: none" autoComplete="new-text" />
                <input
                    name="txtMobile"
                    type="text"
                    id="txtMobile"
                    class="nlf_inp"
                    placeholder="请输入手机号码"
                    autoComplete="new-text"
                    v-model="registerForm.mobile"
                />
            </div>
            <div id="upnlBase">
                <div class="nlf_lab txyzm" v-if="registerForm.isCaptchaToken">
                    <i class="picYzm"></i>
                    <input name="txtSMSCode_q" type="text" placeholder="请输入图形验证码" class="nlf_yzminp input1" v-model="registerForm.captchaValue" />
                    <img :src="registerForm.imgSrc" class="img-captcha" @click="getCaptchaToken('ms_sms_verifyCode_send')" />
                </div>
                <div class="nlf_lab dxyzm">
                    <i class="messYzm"></i>
                    <input
                        name="txtSMSCode"
                        type="text"
                        id="txtSMSCode"
                        class="nlf_yzminp input1"
                        placeholder="请输入短信验证码"
                        v-model="registerForm.verifyValue"
                    />
                    <input
                        type="submit"
                        name="btnMobileCode"
                        :value="messageTxt"
                        id="btnMobileCode"
                        class="yzm_btn vmiddle"
                        :class="isDisabled ? 'gray' : ''"
                        :disabled="isDisabled"
                        @click="sendMessage"
                    />
                    <input type="hidden" name="HiddenField1" id="HiddenField1" />
                    <input name="textNone" type="text" id="textNone" style="display: none" value="0" />
                </div>
                <div class="nlf_lab">
                    <i class="password"></i>
                    <input type="text" name="txtPwd" style="display: none" autoComplete="new-password" />
                    <input
                        name="txtPwd"
                        :type="types[0].pwdType"
                        id="txtPwd"
                        class="nlf_inp nlf_pwd"
                        placeholder="8-20位，数字、字母、特殊字符任意两种"
                        autoComplete="new-password"
                        v-model="registerForm.pwd"
                    />
                    <i class="eye" :class="types[0].pwdType == 'password' ? '' : 'open'" @click="switchPwdStatus(0)"></i>
                </div>
                <div class="nlf_tip">
                    <span class="nlf_rt">
                        已有账号？
                        <a href="javascript:void(0);" @click="jumpToLogin" class="link">立即登录</a>
                    </span>
                </div>
                <div class="nlf_btnbox">
                    <input
                        type="submit"
                        :value="disabledReg ? '正在注册...' : '立即注册'"
                        :disabled="disabledReg ? true : false"
                        class="nlf_btn"
                        @click="registerBtn"
                    />
                </div>
                <div>
                    <span class="nlf_sp" @click="agree = !agree">
                        <input name="cbProtocol" id="cbProtocol" type="checkbox" value="复选框" class="cbox" v-model="agree" />
                        同意《
                        <router-link to="/inside/information/agreement" target="_blank" class="link">隐私政策</router-link>
                        》和《
                        <router-link to="/uc/registerProtocol" target="_blank" class="link">优路用户注册协议</router-link>
                        》
                    </span>
                </div>
            </div>
        </div>
        <div class="error" v-if="showError">{{ registerForm.errorTip }}</div>
        <!-- 报错提示弹框 -->
        <error-dialog v-if="showPCError" :message="errorMsg" @errorTipClose="closePCErrorDialog" />
    </div>
</template>

<script>
/* eslint-disable */
import errorDialog from '../errorDialog/index.vue';

import yiguan from './js/yiguan.js';

export default {
    name: 'register2',
    components: {
        errorDialog,
    },
    data() {
        return {
            agree: false,
            showError: false,
            showPCError: false, // PC 错误提示框
            errorMsg: '', // 错误提示信息
            registerForm: {
                errorTip: '', //错误提示
                mobile: '',
                verifyValue: '',
                pwd: '',
                isCaptchaToken: false, //是否展示图形验证码
                captchaValue: '', //图形验证码
                captchaToken: {}, //图形验证码凭证
                imgSrc: '', //图形验证码地址
            },
            captcha: {}, //验证码凭证
            //倒计时
            count: 60, //60s倒计时
            messageTxt: '获取短信验证码',
            isDisabled: false, //按钮置灰
            disabledReg: false, //注册按钮置灰
            is_resend: false,
            yiguan,
            types: [{ pwdType: 'password' }],
            config: this.$nuxt.context.env.config,
        };
    },
    mounted() {
        var vm = this;
        //监听回车事件 去登录
        document.onkeydown = function (e) {
            var key = window.event.keyCode;
            if (key == 13) {
                vm.registerBtn();
            }
        };
        // this.registerForm.mobile = '';
        // this.registerForm.pwd = '';
        // this.registerForm.mobile = '';
    },
    methods: {
        //切换密码显示隐藏
        switchPwdStatus(number) {
            if (this.types[number].pwdType == 'password') {
                this.types[number].pwdType = 'text';
            } else {
                this.types[number].pwdType = 'password';
            }
        },
        closePCErrorDialog() {
            // 关闭PC端的错误弹窗
            this.showPCError = false;
        },
        //发送短信
        sendMessage() {
            let vm = this;
            if (!vm.registerForm.mobile.trim().match(/^1[3|4|5|8|7|6|9][0-9]\d{8}$/)) {
                vm.registerForm.errorTip = '手机号不正确';
                vm.showErrorHandle(vm.registerForm.errorTip);
                return false;
            }
            if (vm.registerForm.isCaptchaToken && vm.registerForm.captchaValue == '') {
                vm.registerForm.errorTip = '图形验证码不能为空';
                vm.showErrorHandle(vm.registerForm.errorTip);
                return false;
            }
            vm.registerForm.errorTip = '';
            vm.isDisabled = true;
            //简单验证
            if (!vm.registerForm.isCaptchaToken) {
                //获取 简单验证码
                vm.getCaptcha('ms_sms_verifyCode_send', function (err,data) {
                    if(err){
                        var response = err.getAttachedData();
                        if(response && response.getData() && response.getData().type == 'easyCaptcha'){
                            //展示图形验证码
                            vm.registerForm.isCaptchaToken = true;
                            //获取 图形验证码
                            vm.getCaptchaToken('ms_sms_verifyCode_send');
                        }
                    }else {
                        vm.captcha = data;
                        //发送短信
                        vm.sendMess();
                    }
                });
            }
            //图形验证
            if (vm.registerForm.isCaptchaToken) {
                vm.captcha = {
                    captchaToken: vm.registerForm.captchaToken,
                    captchaValue: vm.registerForm.captchaValue,
                };
                //发送短信
                vm.sendMess();
            }
        },
        //发送短信
        sendMess() {
            let vm = this;
            let params = {
                smsPhone: vm.registerForm.mobile.trim(),
                smstplNo: '010001',
                captcha: vm.captcha,
                scene: 'uc_regist',
            };
             this.$callRawApi({
            api:  'mc/msg/sms/verifycode/send',
            params: params
        }).then( (_response) => {
            let data = _response.getData();console.log('返回的数据', data);
            
                    //console.log("发送短信：", data);
                    //倒计时
                    vm.countDown();
                
        }).catch((err) => {
                this.$niceloo.api.handleFailure(err);
                return Promise.reject(err);
            }).catch((data) => {
            
            
                    // vm.registerForm.errorTip = msg;
                    vm.isDisabled = false;
                    if (data.getCode().split('-')[1] == '1002' && vm.registerForm.isCaptchaToken) {
                        vm.registerForm.captchaValue = '';
                        //获取 图形验证码
                        vm.getCaptchaToken('ms_sms_verifyCode_send');
                    } else {
                        // vm.showErrorHandle(vm.registerForm.errorTip);
                    }
                
        });
        },
        //获取 简单验证码 凭证
        getCaptcha(scene, callback) {
            let vm = this;
            let params = {
                scene: scene,
            };
             this.$callRawApi({
            api:  'sc/captcha/captcha',
            params: params
        }).then( (_response) => {
            let data = _response.getData();console.log('返回的数据', data);
            
                    callback(null,data);
                
        }).catch((err) => {
                this.$niceloo.api.handleFailure(err);
                return Promise.reject(err);
            }).catch((err) => {
            
            
                    vm.isDisabled = false;
                    callback(err);
                
        });
        },
        //获取 图形验证码 凭证
        getCaptchaToken(scene, callback) {
            let vm = this;
            let params = {
                captchaScene: scene,
                captchaType: '',
            };
             this.$callRawApi({
            api:  'sc/captcha/token',
            params: params
        }).then( (_response) => {
            let data = _response.getData();console.log('返回的数据', data);
            
                    vm.registerForm.captchaToken = data.captchaToken;
                    vm.registerForm.imgSrc = vm.$niceloo.path.getServerCaptchaPath(data.captchaToken);
                
        }).catch((err) => {
                this.$niceloo.api.handleFailure(err);
                return Promise.reject(err);
            }).catch((_err) => {
            let msg = _err.getDescription();console.warn(msg);
            
                    vm.registerForm.errorTip = msg;

                    vm.showErrorHandle(vm.registerForm.errorTip);
                    vm.isDisabled = false;
                
        });
            this.$yiguan.track('get_code', {
                is_resend: this.is_resend,
                get_code_position: '注册',
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
        //注册
        // async
        async registerBtn() {
            debugger;
            var register_resource = /endPageName=(.*)&?/.exec(decodeURIComponent(location.search));
            register_resource = register_resource && register_resource[1] ? register_resource[1] : '首页';
            let vm = this;
            if (!vm.registerForm.mobile.trim().match(/^1[3|4|5|8|7|6|9][0-9]\d{8}$/)) {
                vm.registerForm.errorTip = '手机号不正确';
                vm.showErrorHandle('手机号不正确');
                return false;
            }
            if (vm.registerForm.isCaptchaToken && vm.registerForm.captchaValue == '') {
                vm.registerForm.errorTip = '图形验证码不能为空';
                vm.showErrorHandle('图形验证码不能为空');
                return;
            }
            if (vm.registerForm.verifyValue == '') {
                vm.registerForm.errorTip = '短信验证码不能为空';
                vm.showErrorHandle('短信验证码不能为空');
                return;
            }
            if (vm.registerForm.pwd == '') {
                vm.registerForm.errorTip = '密码不能为空';
                vm.showErrorHandle('密码不能为空');
                return;
            }
            if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/.test(vm.registerForm.pwd)) {
                vm.registerForm.errorTip = '密码格式为8-20位，包含字母、数字、特殊符号的两种及以上组合 ';
                vm.showErrorHandle('密码格式为8-20位，包含字母、数字、特殊符号的两种及以上组合');
                return;
            }
            if (vm.registerForm.pwd.includes("'") || vm.registerForm.pwd.includes('<')) {
                vm.registerForm.errorTip = '密码格式为8-20位，包含字母、数字、特殊符号的两种及以上组合 ';
                vm.showErrorHandle('密码格式为8-20位，包含字母、数字、特殊符号的两种及以上组合');
                return;
            }
            if (!vm.agree) {
                if (this.$platform.isPC) {
                    // vm.registerForm.errorTip = "同意《用户注册协议》才能注册哦";
                    vm.showErrorHandle(
                        '<span style="display: inline-block;">请勾选同意《<a href="/inside/information/agreement" style="color: red;" target="_blank">隐私政策</a>》和《<a href="/uc/registerProtocol" style="color: red;" target="_blank">优路用户注册协议</a>》</span>'
                    );
                } else {
                    vm.registerForm.errorTip = '请勾选同意后再注册';
                    vm.showErrorHandle('请勾选同意后再注册');
                }

                return;
            }
            vm.registerForm.errorTip = '';

            vm.disabledReg = true;
            let params = {
                userName: '',
                userLoginname: '',
                userLoginpwd: vm.registerForm.pwd,
                userMobile: vm.registerForm.mobile.trim(),
                userEmail: '',
                userFlag: 'S',
                userIdcard: '',
                verify: { verifyValue: vm.registerForm.verifyValue },
                ext: {},
            };
            let extensions = await vm.$PromotionUtil.getOptExtension();
            if (extensions) {
                params = { ...params, clueExtension: extensions };
            } else {
                params = { ...params, extension: await vm.$PromotionUtilNew.getRegExtension() };
            }
            // if(window.nlulib){
            //     await window.nlulib.loadPCIntergration();
            //     if(nlulib.PCIntergration.hasExtension()){//获取插件线索信息
            //         delete params.extension;
            //         params.clueExtension = JSON.stringify(nlulib.PCIntergration.getClueExtension());
            //     }
            // }
             this.$callRawApi({
            api:  'uc/regist',
            params: params
        }).then( (_response) => {
            let data = _response.getData();console.log('返回的数据', data);
            
                    //console.log("注册成功：", data);
                    this.$yiguan.track('register_new', {
                        register_success: true,
                        fail_reason: '',
                        register_resource,
                        superProperty: vm.yiguan(),
                    });

                    vm.disabledReg = false;
                    debugger;
                    vm.$emit('jumpToLogin');
                
        }).catch((data) => {
            
            
                    this.$yiguan.track('register_new', {
                        register_success: false,
                        fail_reason: data.getAttachedData().getMsg(),
                        register_resource,
                        superProperty: vm.yiguan(),
                    });
                    vm.disabledReg = false;
                    vm.registerForm.errorTip = data.getAttachedData().getMsg();
                    vm.showErrorHandle(data.getAttachedData().getMsg());
                
        });
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
        //跳转到登录页面
        jumpToLogin() {
            this.$emit('jumpToLogin');
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
.nlf_tip {
    margin-bottom: 15px;
}
.nlf_sp {
    cursor: pointer;
}
.cbox {
    margin-right: 5px;
}
</style>
