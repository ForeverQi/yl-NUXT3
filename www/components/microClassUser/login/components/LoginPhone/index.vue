<template>
    <div class="content">
        <div class="item">
            <div class="txt">手机号</div>
            <div class="inp">
                <input type="text" v-model="form.phone" placeholder="输入手机号码" />
            </div>
        </div>
        <div class="item">
            <div class="txt">验证码</div>
            <div class="inp">
                <input type="text" v-model="form.verifyValue" placeholder="输入验证码" />
                <div class="time" @click="doSendCode">{{ !isSendCode ? '发送验证码' : `${sendNum}s后重新发送` }}</div>
            </div>
        </div>
        <div class="btn" v-if="isDoning === false" :class="{ allow: isAllow, disabled: !isAllow }" @click="doSubmit">
            {{ phoneType === 'phone' ? '登录' : '立即绑定' }}
        </div>
        <div class="btn" v-else :class="{ allow: isAllow, is_loading: true }">
            {{ phoneType === 'phone' ? '正在登录中...' : '正在绑定中...' }}
        </div>
        <div class="power" @click="doCheckbox">
            <div class="checkbox">
                <img src="./asset/images/checkbox1.png" v-if="!isCheckbox" />
                <img src="./asset/images/checkbox2.png" v-else />
            </div>
            我已阅读并同意
            <a href="/uc/registerProtocol" target="blank" class="link">《优路用户协议》</a>
            <a href="/inside/information/agreement" target="blank" class="link">《隐私协议》</a>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import '@/api/mcu/api.mcu-login-003.login-befre-code.js';
import '@/api/mcu/api.mcu-login-004.login-get-sms-code.js';
import '@/api/mcu/api.mcu-login-005.login-phone.js';
import '@/api/mcu/api.mcu-login-007.login-check-bind-wechat.js';
import '@/api/mcu/api.mcu-login-009.login-weixin-bind-phone.js';
export default {
    props: {
        phoneType: {
            type: String,
            default: 'phone',
        },
        wxuserId: {
            type: String,
            default: '',
        },
        callbackObj: {
            type: Object,
            default() {
                return {
                    loginSuccessCallback() {},
                };
            },
        },
        appId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isCheckbox: false,
            isSendCode: false,
            isDoning: false,
            sendNum: 60,
            timer: null,

            form: {
                phone: '',
                verifyValue: '',
            },
            userInfo: {},

            beforeData: {}, // 短信接口前置数据
        };
    },
    computed: {
        isAllow() {
            if (!this.form.phone.trim().match(/^1[3|4|5|8|7|6|9][0-9]\d{8}$/)) {
                return false;
            }

            if (this.form.verifyValue == '') {
                return false;
            }

            return true;
        },
        ...mapState('mcuStore', ['projectId', 'pageName', 'remark', 'clueWaycode']),
    },
    mounted() {
        clearInterval(this.timer);
    },
    destroyed() {
        clearInterval(this.timer);
    },
    methods: {
        ...mapMutations('logout', ['setUserInfo', 'setBindStatus']),
        doSubmit() {
            /**
             * 0、验证手机号是否正常
             * 1、有图形验证码的时候验证图形验证码
             * 2、短信验证码不能为空
             * 3、是否勾选协议
             * 4、开始注册
             */
            if (!this.isAllow) {
                return;
            }
            // 3、是否勾选协议
            if (!this.isCheckbox) {
                // this.$baseUI.alert('请勾选同意后再登录');
                if (this.phoneType === 'phone') {
                    this.$Message.warning('登录前请先勾选协议');
                } else {
                    this.$Message.warning('绑定前请先勾选协议');
                }
                return;
            }
            this.isDoning = true;
            this.doLogin()
                .then(() => {
                    // 判断当前用户是否绑定过公众号
                    return this.checkBindWechat().then(() => {
                        this.$emit('submit', { msg: '登录成功，返回内容' });
                        this.isDoning = false;
                    });
                })
                .catch((err) => {
                    this.isDoning = false;
                    this.doUpData(err);
                });
        },
        checkBindWechat() {
            // 判断当前用户是否绑定过公众号
            let param = {
                wxaccountAppid: this.appId,
                userId: this.userInfo.userId,
            };
            let data = {
                url: 'login/login-check-bind-wechat',
                params: param,
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                let obj = {
                    bindWechat: false,
                };
                if (res.wxuserSubscribestatus === 'Y') {
                    obj.bindWechat = true;
                }
                this.$storage.set('login-bind-status', obj);
                this.setBindStatus({ key: 'bindWechat', value: obj.bindWechat });
            });
        },
        async doLogin() {
            let param = {
                clueExtension: null,
                userLoginname: '',
                userLoginpwd: '',
                userMobile: '',
                userEmail: '',
                verify: {},
                captcha: '',
                userFlag: 'S',
            };

            param.userMobile = this.form.phone.trim();
            param.verify = { verifyValue: this.form.verifyValue };
            param.clueExtension = await this.$PromotionUtil.mcuClueOrBeHavior({
                clueWaycode: this.clueWaycode === 'dingdan' ? 'dingdan' : 'yindao',
                projectId: this.projectId,
                pageName: this.pageName,
                remark: this.remark,
                phone: param.userMobile,
            });
            let data = {
                url: 'login/login-phone',
                params: param,
                isCustom: false,
            };
            // return Promise.reject();
            if (this.phoneType === 'bindPhone') {
                data = {
                    url: 'login/login-weixin-bind-phone',
                    params: {
                        wxuserId: this.wxuserId,
                        phone: param.userMobile,
                        verifyValue: this.form.verifyValue,
                        extension: param.clueExtension,
                    },
                    isCustom: false,
                };
            }
            return this.httpClient(data)
                .then((res) => {
                    return this.callbackObj.loginSuccessCallback({
                        data: res,
                    });
                })
                .then((userInfo) => {
                    this.userInfo = userInfo;

                    this.doUpData();
                });
        },
        doSendCode() {
            if (this.isSendCode) {
                return;
            }
            /**
             * 0、验证手机号是否正常
             * 1、获取验证码前置接口
             * 2、获取验证码
             */
            if (!this.form.phone.trim().match(/^1[3|4|5|8|7|6|9][0-9]\d{8}$/)) {
                this.$baseUI.alert('手机号不正确');
                return false;
            }
            this.sendNum = 60;
            // 1、获取验证码前置接口
            this.getBeforeSMSCode().then(() => {
                this.isSendCode = true;
                clearInterval(this.timer);
                this.timer = setInterval(() => {
                    this.sendNum--;
                    if (this.sendNum === 0) {
                        clearInterval(this.timer);
                        this.isSendCode = false;
                    }
                }, 1000);
            });
        },
        getBeforeSMSCode() {
            let data = {
                url: 'login/login-befre-code',
                params: {
                    scene: 'ms_sms_verifyCode_send',
                },
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                this.beforeData = res;
                // 2、发送验证码
                return this.doSendSMSCode();
            });
        },
        doSendSMSCode() {
            let data = {
                url: 'login/login-get-sms-code',
                params: {
                    smsPhone: this.form.phone.trim(),
                    smstplNo: '010001',
                    captcha: this.beforeData,
                    scene: 'uc_login',
                },
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                console.log(res, '===');
            });
        },
        doCheckbox(ev) {
            if (ev.target.nodeName && ev.target.nodeName === 'A') {
                return;
            }
            this.isCheckbox = !this.isCheckbox;
        },
        doUpData(err = '') {
            // 上报易观数据
            this.$yiguan.mcuTrack('login_in_new', {
                // 扫码登录：扫码后绑定手机号这一步
                login_method: this.phoneType === 'phone' ? '手机号登录' : '扫码登录',
                is_success: !err,
                fail_reason: err,
                login_resource: this.pageName, // 来源
            });
        },
        httpClient({ url, params = {}, isCustom = false }) {
            return this.$callApi(url, {
                ...params,
            }).then(
                (res) => {
                    return res.getData();
                },
                (err) => {
                    if (!isCustom) this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                }
            );
        },
    },
};
</script>
<style lang="less" scoped>
.content {
    padding: 0 32px;
    padding-top: 48px;

    .item {
        padding: 0 8px;
        margin-bottom: 24px;

        .txt {
            color: #303133;
            line-height: 16px;
            font-size: 16px;
            font-weight: 400;
        }
        .inp {
            display: flex;
            align-items: center;
            margin-top: 12px;
            height: 40px;
            background: #ffffff;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            overflow: hidden;

            input {
                height: 100%;
                width: 100%;
                outline: none;
                padding-left: 16px;
                padding-right: 16px;
                box-sizing: border-box;
                border: none;
            }

            input::placeholder {
                color: #c0c4cc;
            }

            .time {
                flex-shrink: 0;
                width: 118px;
                height: 20px;
                text-align: center;
                font-size: 14px;
                color: #025eff;
                cursor: pointer;
                border-left: 1px solid #dcdfe6;
            }
        }
    }

    .btn {
        width: 320px;
        height: 46px;
        color: #ffffff;
        line-height: 46px;
        text-align: center;
        border-radius: 23px;
        cursor: pointer;

        &.is_loading {
            opacity: 0.4;
            cursor: default;
        }

        &.disabled {
            background: linear-gradient(119deg, #dbdbdb 25%, #aeaeae);
        }

        &.allow {
            background: linear-gradient(133deg, #82b1ff 13%, #025eff);
        }
    }

    .power {
        text-align: center;
        padding-top: 26px;
        font-size: 12px;
        color: #999999;
        line-height: 14px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        .checkbox {
            display: inline-block;
            vertical-align: middle;
            width: 14px;
            height: 14px;
            margin-right: 5px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .link {
            color: #3c84ff;
        }
    }
}
</style>
