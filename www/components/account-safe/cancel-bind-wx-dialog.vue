<template>
    <div class="change-password-wrap">
        <div class="table-details">
            <div class="top-title">
                手机号验证
                <img @click="closeDialog" class="close-img" src="./asset/images/close.png" alt="" />
            </div>
            <div class="cancel-wx-tip-box">
                <p class="cancel-wx-tip-content">为了保障您的账号安全，解绑前需进行手机号安全验证</p>
                <p class="cancel-wx-tip-content phone-text">{{ `当前账号绑定手机号：${userInfo.userMobile}` }}</p>
            </div>
            <div class="enter-verify-box">
                <div class="input-box">
                    <img class="icon-message" src="./asset/images/num-check.png" />
                    <input v-model.trim="captchaValue" class="input" maxlength="4" type="text" placeholder="请输入图形验证码" />
                </div>
                <img :src="imgSrc" class="img-captcha" @click="getCaptchaToken()" />
            </div>
            <div class="enter-verify-box">
                <div class="input-box">
                    <img class="icon-message" src="./asset/images/verify-message-icon.png" alt="" />
                    <input v-model.trim="messageVerifyCode" class="input" maxlength="6" type="text" placeholder="请输入短信验证码" />
                </div>
                <div class="get-message-button" @click="getCaptcha" :class="[isDisabled ? 'send-message-button' : '']">{{ messageTip }}</div>
            </div>
            <div class="button-box">
                <div class="cancel-button" v-loading="isVerifyCancelBind" @click="cancelBindWx()">完成验证</div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/api/uc/api..cancel-bind-wx-by-sms-verify.js';
import '@/api/mc/api.MC0027.query-sms-verifycode-by-token.js'; //发送验证码
import loginRegisterTrack from '@/plugins/yiguan/login-register-track.js';
import '@/api/uc/api..create-captcha.js';
export default {
    data() {
        return {
            messageTip: '获取验证码',
            seconds: 60,
            messageVerifyCode: '',
            userInfo: {},
            isDisabled: true,
            isVerifyCancelBind: false,
            captchaValue: '', //图形验证码
            captchaToken: '', //图形验证码token
            imgSrc: '', //图形验证码路径
            interval: null,
        };
    },
    watch: {
        captchaValue(val) {
            if (val && val.trim() !== '') {
                this.isDisabled = false;
            } else {
                this.isDisabled = true;
            }
        },
    },
    async mounted() {
        if (this.$User.getToken()) {
            this.userInfo = await this.$User.getUser();
        }
        this.getCaptchaToken();
    },
    methods: {
        ...loginRegisterTrack,
        closeDialog() {
            this.seconds = 60;
            this.messageTip = '获取验证码';
            this.messageVerifyCode = '';
            this.isDisabled = true;
            this.isVerifyCancelBind = false;
            this.captchaValue = '';
            clearTimeout(this.interval);
            this.getCaptchaToken();
            this.$emit('cancel');
        },
        getCaptcha() {
            if (this.isDisabled) return;
            if (this.captchaValue.trim() === '') return;
            if (!this.userInfo.userMobile) {
                return false;
            }
            let params = {
                smstplNo: '010001',
                scene: 'unbind_wx',
                captchaData: {
                    captchaToken: this.captchaToken,
                    captchaScene: 'unbind_wx',
                    captchaValue: this.captchaValue,
                },
            };
            this.$callRawApi({
                api: 'mc/msg/sms/verifycode/send/vx',
                params,
            })
                .then(() => {
                    this.countDown();
                })
                .catch((err) => {
                    if (err.getCode().includes('GB2009')) {
                        this.$baseUI.alert('图形验证码有误，请重新输入');
                    } else {
                        this.$niceloo.api.handleFailure(err);
                    }
                    this.isDisabled = false;
                    this.captchaValue = '';
                    this.getCaptchaToken();
                });
        },
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
        cancelBindWx() {
            if (this.isVerifyCancelBind) return;
            this.isVerifyCancelBind = true;
            this.$callApi('uc/cancel-bind-wx-by-sms-verify', {
                verify: {
                    verifyValue: this.messageVerifyCode,
                    verifyScene: 'unbind_wx',
                },
                onsuccess: () => {
                    this.$Message.success('解绑成功！');
                    this.closeDialog();
                    let timer = setTimeout(() => {
                        this.$niceloo.app.visitor.tipLogin();
                        clearTimeout(timer);
                        timer = null;
                    }, 200);
                    this.trackUserCancelBindWxMiniprogrameSuccess();
                    this.isVerifyCancelBind = false;
                },
                onerror: (err) => {
                    console.log(err);
                    this.trackUserCancelBindWxMiniprogrameSuccess(false);
                    this.isVerifyCancelBind = false;
                    let errMessage = err.getAttachedData().getMsg();
                    this.$Message.error(errMessage);
                },
            });
        },
        //获取 图形验证码 凭证
        getCaptchaToken() {
            this.$niceloo.api.call('uc/create-captcha', {
                captchaType: 'P', // 验证码类型
                captchaWidth: 106, // 验证码宽度
                captchaHeight: 50, // 验证码高度
                captchaSize: 4, // 验证码长度
                onsuccess: (data) => {
                    this.captchaToken = data.captchaToken;
                    this.imgSrc = this.$urlUtils.getViewUrl(data.filePath);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
};
</script>
<style lang="less" scoped>
.change-password-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 200;
    top: 0px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 1200px;
    background-color: rgba(0, 0, 0, 0.3);
    .table-details {
        // margin-top: 200px;
        width: 441px;
        height: 374px;
        background: #fff;
        box-sizing: border-box;
        padding: 40px 0;
        border-radius: 12px;
        z-index: 200;
        min-width: 441px;
        .top-title {
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
            font-size: 22px;
            font-weight: 700;
            color: #000000;
            line-height: 30px;
            position: relative;
            .close-img {
                width: 18px;
                height: 18px;
                position: absolute;
                top: -20px;
                right: 20px;
                cursor: pointer;
            }
        }
        .cancel-wx-tip-box {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 44px;
        }
        .cancel-wx-tip-content {
            font-size: 16px;
            font-weight: 400;
            text-align: CENTER;
            color: #3a3d4b;
            line-height: 16px;
        }
        .phone-text {
            color: #9698a2;
        }
        .button-box {
            margin-top: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .cancel-button {
        width: 360px;
        height: 50px;
        box-sizing: border-box;
        text-align: center;
        background: linear-gradient(90deg, #ff6870, #f8323c 100%);
        border-radius: 25px;
        line-height: 50px;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        outline: none;
    }
    .enter-verify-box {
        margin-top: 36px;
        padding: 0px 50px;
        display: flex;
        align-items: center;
        .input-box {
            width: 225px;
            height: 50px;
            background: #f6f7f9;
            border-radius: 25px;
            position: relative;
            .icon-message {
                position: absolute;
                top: 16px;
                left: 16px;
                width: 18px;
                height: 18px;
            }
            .input {
                box-sizing: border-box;
                width: 225px;
                height: 50px;
                padding: 18px 0px 18px 42px;
                background: #f6f7f9;
                border-radius: 25px;
                outline: none;
            }
        }
        .get-message-button {
            margin-left: 10px;
            width: 125px;
            height: 50px;
            background: linear-gradient(90deg, #ff6870, #f8323c 100%);
            border-radius: 25px;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            cursor: pointer;
        }
        .img-captcha {
            margin-left: 10px;
            width: 106px;
            height: 50px;
            cursor: pointer;
        }
        .send-message-button {
            background: #f6f7f9;
            color: #9698a2;
            cursor: no-drop;
        }
    }
}
</style>
