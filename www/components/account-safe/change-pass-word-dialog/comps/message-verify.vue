<template>
    <div>
        <div class="input-password">
            <span class="item-class">设置新密码：</span>
            <div class="input-wrapper">
                <input class="iitem-input" placeholder="请输入新密码" maxlength="20" :type="types[0].pwdType" v-model.trim="newPassword" />
                <i class="eye" :class="types[0].pwdType == 'password' ? '' : 'open'" @click="switchPwdStatus(0)"></i>
            </div>
        </div>
        <div class="input-password">
            <span class="item-class">&emsp;确认密码：</span>
            <div class="input-wrapper">
                <input class="iitem-input" placeholder="请再次确认密码" maxlength="20" :type="types[1].pwdType" v-model.trim="confirmPassword" />
                <i class="eye" :class="types[1].pwdType == 'password' ? '' : 'open'" @click="switchPwdStatus(1)"></i>
            </div>
        </div>
        <div class="input-password">
            <span class="item-class">图形验证码：</span>
            <div class="message-wrap">
                <div class="input-wrapper">
                    <input class="message-input" v-model.trim="captchaValue" maxlength="4" placeholder="请输入验证码" />
                </div>
                <img :src="imgSrc" alt="图形校验码" class="img-captcha" @click="getCaptchaToken()" />
            </div>
        </div>
        <div class="input-password">
            <span class="item-class">手机验证码：</span>
            <div class="message-wrap">
                <div class="input-wrapper">
                    <input class="message-input" v-model.trim="messageVerifyCode" maxlength="6" placeholder="请输入验证码" />
                </div>
                <div class="get-message-button" @click="getCaptcha" :class="[isDisabled ? 'send-message-button' : '']">{{ messageTip }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/api/uc/api..cancel-bind-wx-by-sms-verify.js';
import '@/api/mc/api.MC0027.query-sms-verifycode-by-token.js'; //发送验证码

export default {
    props: {
        imgSrc: {
            type: String,
            default: '',
        },
        captchaToken: {
            //图形校验码token
            type: String,
            default: '',
        },
    },
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            newPassword: '', // 新密码
            confirmPassword: '', // 二次确认的密码
            types: [{ pwdType: 'password' }, { pwdType: 'password' }],
            messageTip: '获取验证码',
            isDisabled: false,
            isValidPhone: true,
            messageVerifyCode: '',
            seconds: 60,
            captchaValue: '', //验证码
            interval: null,
        };
    },
    /**
     * 生命周期函数 mounted
     */
    async mounted() {
        if (this.$User.getToken()) {
            this.userInfo = await this.$User.getUser();
        }
    },
    methods: {
        /**
         * @returns { boolean } 是否通过校验
         */
        verifyPassword() {
            if (this.confirmPassword != this.newPassword) {
                this.$Message.error('两次输入的新密码不一致！');
                return false;
            }
            if (this.newPassword.trim().length == 0 || this.confirmPassword.trim().length == 0) {
                this.$Message.error('密码不能为空！');
                return false;
            }
            if (this.captchaValue.trim().length == 0) {
                this.$Message.error('图形验证码不能为空！');
                return false;
            }
            if (this.messageVerifyCode.trim().length == 0) {
                this.$Message.error('短信验证码不能为空！');
                return false;
            }
            if (
                !/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/.test(this.newPassword.trim()) ||
                !/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/.test(this.confirmPassword.trim())
            ) {
                this.$Message.error('密码格式为8-20位，包含字母、数字、特殊符号的两种及以上组合！');
                return false;
            }
            return true;
        },
        /**
         *获取短信验证码凭证
         *
         * @returns {Promise} 返回值
         */
        getCaptcha() {
            if (this.isDisabled) return;
            this.isDisabled = true;
            if (this.captchaValue.trim() === '') {
                this.$Message.error('请先输入图形验证码');
                this.isDisabled = false;
                return false;
            }
            if (!this.userInfo.userMobile) {
                this.isDisabled = false;
                return false;
            }
            let params = {
                smstplNo: '010001',
                captchaData: {
                    captchaToken: this.captchaToken,
                    captchaScene: 'uc_user_pwd_reset',
                    captchaValue: this.captchaValue,
                },
                scene: 'uc_user_pwd_reset',
            };
            this.getPhoneCode(params);
        },
        /**
         *获取短信验证码
         *
         *@param { object } params 短信凭证
         */
        getPhoneCode(params) {
            this.$callRawApi({
                api: 'mc/msg/sms/verifycode/send/vx',
                params,
            })
                .then(() => {
                    this.countDown();
                })
                .catch((err) => {
                    this.isDisabled = false;
                    if (err.getCode().includes('GB2009')) {
                        this.$baseUI.alert('图形验证码有误，请重新输入');
                    } else {
                        this.$niceloo.api.handleFailure(err);
                    }
                    this.captchaValue = '';
                    this.getCaptchaToken();
                });
        },
        /**
         *倒计时
         */
        countDown() {
            this.isDisabled = true;
            this.seconds--;
            this.messageTip = this.seconds + '后重新获取';
            if (this.seconds == 0) {
                this.messageTip = '获取验证码';
                this.seconds = 60;
                this.isDisabled = false;
                this.captchaValue = '';
                this.getCaptchaToken();
                return;
            }
            this.interval = setTimeout(this.countDown, 1000);
        },
        /**
         * 切换密码显示隐藏
         *
         * @param { number } index 索引
         */
        switchPwdStatus(index) {
            if (this.types[index].pwdType == 'password') {
                this.types[index].pwdType = 'text';
            } else {
                this.types[index].pwdType = 'password';
            }
        },
        /**
         * 获取请求参数
         *
         * @returns { object } 请求参数
         */
        getParams() {
            return {
                // 验证码
                verify: {
                    verifyValue: this.messageVerifyCode,
                },
                // 用户登录密码
                userLoginpwd: this.confirmPassword,
            };
        },
        /**
         * 重新获取图形验证码
         */
        getCaptchaToken() {
            this.$parent.getCaptchaToken();
        },
        /**
         * 数据重置
         */
        init() {
            clearTimeout(this.interval);
            this.newPassword = '';
            this.confirmPassword = '';
            this.types = [{ pwdType: 'password' }, { pwdType: 'password' }];
            this.messageTip = '获取验证码';
            this.isDisabled = false;
            this.isValidPhone = true;
            this.messageVerifyCode = '';
            this.seconds = 60;
            this.captchaValue = '';
        },
    },
};
</script>
<style lang="less" scoped>
.input-password + .input-password {
    margin-top: 16px;
}
.input-password {
    position: relative;
    margin-left: 200px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: center;

    .item-class {
        text-align: right;
        font-size: 14px;
        color: #53586c;
    }

    .input-wrapper {
        background-color: #f4f5f8;
        // border: 1px solid #dcdcdc;
        border-radius: 20px;
        overflow: hidden;
        width: 233px;
    }
    .iitem-input {
        width: 166px;
        padding: 13px 16px;
        outline: none;
        font-size: 12px;
        color: #3a3d4b;
        background-color: transparent;
        border: 0;
    }
    .message-input {
        width: 118px;
        box-sizing: border-box;
        padding: 13px 16px;
        outline: none;
        font-size: 12px;
        color: #3a3d4b;
        background-color: transparent;
        border: 0;
    }
    .message-wrap {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 233px;
        box-sizing: border-box;
        .input-wrapper {
            width: 115px;
        }
        .get-message-button {
            margin-left: 10px;
            width: 108px;
            height: 40px;
            background: linear-gradient(90deg, #ff6870, #f8323c 100%);
            border-radius: 20px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            cursor: pointer;
        }
        .img-captcha {
            margin-left: 10px;
            width: 108px;
            height: 40px;
            cursor: pointer;
            margin-left: 10px;
        }
        .send-message-button {
            background: #f6f7f9;
            color: #9698a2;
            cursor: no-drop;
        }
    }
    i {
        vertical-align: middle;
        width: 16px;
        height: 16px;
        display: inline-block;
    }
    i.password {
        background: url('../../asset/images/hidden-icon.png') no-repeat;
    }
    i.eye {
        background: url('../../asset/images/hidden-icon.png') no-repeat;
        cursor: pointer;
        display: none \9;
    }
    i.eye.open {
        background-size: contain !important;
        background: url('../../asset/images/show-icon.png') no-repeat;
        cursor: pointer;
        display: none \9;
    }
}
</style>
