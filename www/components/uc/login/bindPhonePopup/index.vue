<template>
    <div class="bind_phone_bg">
        <div class="bind_phone_wrapper">
            <div class="bind_phone_tip">
                应
                <span class="bind_phone_law">《中华人民共和国网络安全法》</span>
                要求，我们将加强实名认证机制，为了更好的保障您的账号安全，方便全面体验优路教育产品服务，请绑定您的手机号。
            </div>
            <div id="divLogin_qDel" class="nlf_item">
                <div class="nlf_lab">
                    <i class="tel"></i>
                    <input
                        name="txtUserName_q"
                        type="text"
                        id="txtUserName_q"
                        placeholder="请输入手机号码"
                        class="nlf_inp input1"
                        v-model.trim="messageLogin.mobile"
                    />
                </div>
                <div id="upnlBase">
                    <div class="nlf_lab txyzm" v-if="messageLogin.isCaptchaToken">
                        <i class="picYzm"></i>
                        <input name="txtSMSCode_q" type="text" placeholder="请输入图形验证码" class="nlf_yzminp input1" v-model="messageLogin.captchaValue" />
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
                            v-model.trim="messageLogin.verifyValue"
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
                    <div class="nlf_btnbox">
                        <input type="submit" :value="isBinding ? '正在绑定...' : '立即绑定'" :disabled="isBinding" class="nlf_btn" @click="onBindClick" />
                    </div>
                </div>
            </div>
            <button class="bind_phone_close" @click="onCloseClick"></button>
        </div>
        <div class="error" v-if="showError">{{ errorMsg }}</div>
        <!-- 报错提示弹框 -->
        <error-dialog v-if="showPCError" :message="errorMsg" @errorTipClose="closePCErrorDialog" />
    </div>
</template>

<script>
import errorDialog from '@/www/components/uc/login/errorDialog/index.vue';
import loginApi from '@/api/login.js';

export default {
    name: 'bindPhonePopup',
    components: {
        errorDialog,
    },
    props: {
        wxuserId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            showError: false,
            showPCError: false, // PC 错误提示框
            errorMsg: '', // 错误提示信息
            // 短信登录
            messageLogin: {
                errorTip: '', //错误提示
                mobile: '', //手机
                verifyValue: '', //短信验证码
                isCaptchaToken: false, //是否展示图形验证码
                captchaValue: '', //输入图形验证码
                captchaToken: '', //图形验证码凭证
                imgSrc: '', //图形验证码地址
            },
            captcha: {}, //验证码凭证
            isDisabled: false,
            count: 60, // 60s倒计时
            messageTxt: '获取短信验证码',
            isBinding: false,
            bindSuccessData: null,
        };
    },
    created() {},
    methods: {
        IsPC() {
            const userAgentInfo = navigator.userAgent;
            const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
            let flag = true;
            for (let i = 0; i < Agents.length; i++) {
                if (userAgentInfo.indexOf(Agents[i]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        closePCErrorDialog() {
            this.showPCError = false;
        },
        // 发送短信
        sendMessage() {
            if (/^1[3|4|5|8|7|6|9][0-9]\d{8}$/.test(this.messageLogin.mobile) === false) {
                this.messageLogin.errorTip = '手机号不正确';
                this.showErrorHandle('手机号不正确');
                return false;
            }
            if (this.messageLogin.isCaptchaToken && this.messageLogin.captchaValue === '') {
                this.messageLogin.errorTip = '图形验证码不能为空';
                this.showErrorHandle('手机号不正确');
                return false;
            }
            this.messageLogin.errorTip = '';
            this.isDisabled = true;
            // 简单验证
            if (!this.messageLogin.isCaptchaToken) {
                //获取 简单验证码
                this.getCaptcha('ms_sms_verifyCode_send')
                    .then((data) => {
                        if (data.type === 'easyCaptcha') {
                            // 展示图形验证码
                            this.messageLogin.isCaptchaToken = true;
                            // 获取 图形验证码
                            return this.getCaptchaToken('ms_sms_verifyCode_send');
                        } else {
                            this.captcha = data;
                            // 发送短信
                            return this.sendMess();
                        }
                    })
                    .catch((err) => {
                        this.isDisabled = false;
                        this.messageLogin.errorTip = err;
                        this.showErrorHandle(this.messageLogin.errorTip);
                    });
            }
            // 图形验证
            if (this.messageLogin.isCaptchaToken) {
                this.captcha = {
                    captchaToken: this.messageLogin.captchaToken,
                    captchaValue: this.messageLogin.captchaValue,
                };
                // 发送短信
                this.sendMess();
            }
        },
        // 发送短信
        sendMess() {
            return new Promise((resolve, reject) => {
                loginApi.sendMess({
                    params: {
                        smsPhone: this.messageLogin.mobile,
                        smstplNo: '010001',
                        captcha: this.captcha,
                        scene: 'uc_bindphone',
                    },
                    success: (data) => {
                        resolve(data);
                    },
                    fail: (data, msg) => {
                        reject({ type: 'fail', msg, data });
                    },
                    error: (data, msg) => {
                        reject({ type: 'error', msg: '系统开小差啦，待会再试试！', data });
                    },
                });
            })
                .then(() => {
                    this.countDown();
                })
                .catch((err) => {
                    if (err.type === 'fail') {
                        this.isDisabled = false;
                        this.showErrorHandle(msg);
                        this.messageLogin.errorTip = msg;
                        if (this.messageLogin.isCaptchaToken && err.data.code == '1002') {
                            this.messageLogin.captchaValue = '';
                            // 获取 图形验证码 凭证
                            this.getCaptchaToken('ms_sms_verifyCode_send');
                        }
                    } else if (err.type === 'error') {
                        this.isDisabled = false;
                        this.messageLogin.errorTip = err.msg;
                        this.showErrorHandle(this.messageLogin.errorTip);
                    }
                });
        },
        // 获取 简单验证码
        getCaptcha(scene) {
            return new Promise((resolve, reject) => {
                loginApi.getCaptcha({
                    params: {
                        scene,
                    },
                    success: (data) => {
                        resolve(data);
                    },
                    fail: (data, msg) => {
                        reject(msg);
                    },
                    error: () => {
                        reject('系统开小差啦，待会再试试！');
                    },
                });
            });
        },
        // 获取 图形验证码
        getCaptchaToken(scene) {
            return new Promise((resolve, reject) => {
                loginApi.getCaptchaToken({
                    params: {
                        captchaScene: scene,
                        captchaType: '',
                    },
                    success: (data) => {
                        resolve(data);
                    },
                    fail: (data, msg) => {
                        reject(msg);
                    },
                    error: (data, msg) => {
                        reject('系统开小差啦，待会再试试！');
                    },
                });
            })
                .then((data) => {
                    this.messageLogin.captchaToken = data.captchaToken;
                    this.messageLogin.imgSrc = this.$niceloo.path.getServerCaptchaPath(data.captchaToken);
                    this.isDisabled = false;
                })
                .catch((err) => {
                    this.isDisabled = false;
                    this.messageLogin.errorTip = err;
                    this.showErrorHandle(this.messageLogin.errorTip);
                });
        },
        // 倒计时
        countDown() {
            this.isDisabled = true;
            --this.count;
            if (this.count <= 0) {
                this.messageTxt = '重新发送';
                this.count = 60;
                this.isDisabled = false;
                return;
            } else {
                this.messageTxt = this.count + '秒后重新发送';
            }
            setTimeout(this.countDown, 1000);
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
        bindPhone() {
            this.isBinding = true;
            this.bindSuccessData = null;
            return new Promise((resolve, reject) => {
                loginApi.wxUserBindPhone({
                    params: {
                        wxuserId: this.wxuserId,
                        userMobile: this.messageLogin.mobile,
                        verifyValue: this.messageLogin.verifyValue,
                        unbindPrevUser: 'N',
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
            })
                .then((data) => {
                    this.$yiguan.track('login_in_sucess', {
                        login_success: true,
                        fail_reason: '',
                        login_resource: '优路教育web网站',
                    });
                    console.warn(data);
                    this.$User.setToken(data.token);
                    this.bindSuccessData = data;
                    return this.cluePush();
                })
                .then((data) => {
                    this.$emit('bind-success', this.bindSuccessData);
                })
                .catch((err) => {
                    console.warn(err);
                    this.$yiguan.track('login_in_sucess', {
                        login_success: false,
                        fail_reason: String(err),
                        login_resource: '优路教育web网站',
                    });
                    this.showErrorHandle((this.messageLogin.errorTip = err));
                })
                .finally(() => {
                    this.isBinding = false;
                });
        },
        async cluePush() {
            let clues = await this.$PromotionUtil.getOptExtension();
            return new Promise((resolve, reject) => {
                loginApi.taAppletCluePushNew({
                    params: {
                        clueExtension: clues,
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
        onBindClick() {
            if (!this.wxuserId) {
                this.showErrorHandle((this.messageLogin.errorTip = '扫码失败，请重新扫码'));
                return false;
            }
            if (!this.messageLogin.mobile.trim().match(/^1[3|4|5|8|7|6|9][0-9]\d{8}$/)) {
                this.showErrorHandle((this.messageLogin.errorTip = '手机号不正确'));
                return false;
            }
            if (this.messageLogin.isCaptchaToken && this.messageLogin.captchaValue === '') {
                this.showErrorHandle((this.messageLogin.errorTip = '图形验证码不能为空'));
                return;
            }
            if (this.messageLogin.verifyValue === '') {
                this.showErrorHandle((this.messageLogin.errorTip = '短信验证码不能为空'));
                return;
            }
            this.bindPhone();
        },
        onCloseClick() {
            this.$emit('close');
        },
    },
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
.line {
    display: block;
}
.cbox {
    margin-right: 5px;
}
.bind_phone_bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 6;
    background: rgba(0, 0, 0, 0.7);
}
.bind_phone_wrapper {
    background: white;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 40px 56px;
}
.bind_phone_tip {
    width: 390px;
    font-size: 14px;
    margin-bottom: 20px;
}
.bind_phone_law {
    font-weight: bold;
}
.bind_phone_close {
    width: 32px;
    height: 32px;
    display: inline-block;
    background: url('./asset/images/nl_close.png') no-repeat center center;
    position: absolute;
    top: -16px;
    right: -16px;
    cursor: pointer;
    padding: 3px;
}
</style>
