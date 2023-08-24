<template>
    <div class="change-password-wrap">
        <div class="table-details">
            <div class="top-title">
                修改密码
                <img @click="closeDialog" class="close-img" src="../asset/images/close.png" alt="" />
            </div>
            <p class="user-mobile">用户手机号码：{{ userInfo.userMobile }}</p>
            <div class="verify-methods-box">
                <div class="verify-methods-lable">
                    <span class="lable-icon">*</span>
                    <span>认证方式：</span>
                </div>
                <div class="verify-methods" @click="changeVerify('message')" :class="[verifyMethods === 'message' ? 'active' : '']">验证码认证</div>
                <div class="verify-methods" @click="changeVerify('password')" :class="[verifyMethods === 'password' ? 'active' : '', 'margin-left-17']">
                    原密码认证
                </div>
            </div>
            <PasswordVerify ref="vueRefPassword" v-show="verifyMethods === 'password'" />
            <MessageVerify ref="vueRefMessage" :captcha-token="captchaToken" :img-src="imgSrc" v-show="verifyMethods === 'message'" />
            <div class="set-password-tip">
                <div>请设置8-20位包含字母、数字、特殊字符中任意2种及以上</div>
                <div>组合的密码，＜'除外</div>
            </div>
            <div class="submit" @click="sure()">确 定</div>
        </div>
    </div>
</template>
<script>
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import PasswordVerify from './comps/password-verify.vue';
import MessageVerify from './comps/message-verify.vue';
import '@/api/uc/api.UC0006.edit-password.js';
import '@/api/uc/api..update-password-by-message.js';
import '@/api/uc/api..create-captcha.js';
export default {
    components: {
        PasswordVerify,
        MessageVerify,
    },
    data() {
        return {
            verifyMethods: 'message',
            userInfo: {
                userMobile: '',
            },
            captchaToken: '', //图形验证码token
            imgSrc: '', //图形验证码路径
            disabled: false,
        };
    },
    watch: {
        verifyMethods(val) {
            //在选择原始密码验证时，获取一下新的图形验证码，避免在选择手机号验证时再获取会出现短暂的图片路径还未获取到的情况。
            if (val === 'password') {
                this.getCaptchaToken();
                this.$refs.vueRefMessage.init();
            } else {
                this.$refs.vueRefPassword.init();
            }
        },
    },
    async mounted() {
        if (this.$User.getToken()) {
            this.userInfo = await this.$User.getUser();
        }
        this.init();
    },
    methods: {
        // 关闭弹窗
        closeDialog() {
            this.$emit('cancel');
        },
        /**
         *
         *切换验证方式
         *
         *@param { String } type 验证方式
         *
         */
        changeVerify(type) {
            this.verifyMethods = type;
        },
        // 确定
        sure() {
            if (this.disabled) return;
            let isValid;
            if (this.verifyMethods === 'message') {
                isValid = this.$refs.vueRefMessage && this.$refs.vueRefMessage.verifyPassword();
            } else {
                isValid = this.$refs.vueRefPassword && this.$refs.vueRefPassword.verifyPassword();
            }
            if (!isValid) return;
            this.disabled = true;
            const changePasswordMap = new Map([
                ['message', this.editByMessage],
                ['password', this.editByPassword],
            ]);
            changePasswordMap.get(this.verifyMethods)();
        },
        // 修改密码
        editByPassword() {
            let params = this.$refs.vueRefPassword && this.$refs.vueRefPassword.getParams();
            niceloo.api.call('uc/edit-password', {
                ...params,
                onsuccess: () => {
                    this.$Message.success('修改密码成功!');
                    let timer = setTimeout(() => {
                        this.$niceloo.app.visitor.tipLogin();
                        clearTimeout(timer);
                        timer = null;
                    }, 200);
                    this.$emit('cancel');
                    this.disabled = false;
                },
                onerror: (err) => {
                    this.disabled = false;
                    this.$niceloo.api.handleFailure(err);
                },
            });
        },
        // 修改密码
        editByMessage() {
            let params = this.$refs.vueRefMessage && this.$refs.vueRefMessage.getParams();
            this.$callApi('uc/update-password-by-message', {
                ...params,
                onsuccess: () => {
                    this.$Message.success('修改密码成功!');
                    let timer = setTimeout(() => {
                        this.$niceloo.app.visitor.tipLogin();
                        clearTimeout(timer);
                        timer = null;
                    }, 200);
                    this.$emit('cancel');
                    this.disabled = false;
                },
                onerror: (err) => {
                    this.disabled = false;
                    this.$niceloo.api.handleFailure(err);
                },
            });
        },
        /**
         * 获取 图形验证码 凭证
         */
        getCaptchaToken() {
            this.$niceloo.api.call('uc/create-captcha', {
                captchaType: 'P', // 验证码类型
                captchaWidth: 108, // 验证码宽度
                captchaHeight: 40, // 验证码高度
                captchaSize: 4, // 验证码长度
                onsuccess: (data) => {
                    this.captchaToken = data.captchaToken;
                    this.imgSrc = this.$urlUtils.getViewUrl(data.filePath);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        /**
         * 初始化
         */
        init() {
            this.verifyMethods = 'message';
            this.getCaptchaToken();
            this.$refs.vueRefMessage.init();
            this.$refs.vueRefPassword.init();
            this.disabled = false;
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
    background-color: rgba(0, 0, 0, 0.3);
    min-width: 1200px;
    .table-details {
        // margin-top: 200px;
        width: 441px;
        // height: 374px;
        background: #fff;
        box-sizing: border-box;
        padding: 40px 0;
        border-radius: 12px;
        z-index: 200;
        min-width: 441px;
        .top-title {
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
    }
    .submit {
        text-align: center;
        background: linear-gradient(90deg, #ff6870, #f8323c 100%);
        border-radius: 25px;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        margin: 32px auto 0px;
        display: block;
        outline: none;
        border: none;
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        width: 311px;
    }
}
.user-mobile {
    margin: 10px 0px 24px;
    text-align: center;
    height: 21px;
    font-size: 14px;
    font-weight: 400;
    color: #53586c;
    line-height: 21px;
}
.verify-methods-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    .verify-methods-lable {
        text-align: right;
        width: 82px;
        font-size: 14px;
        font-weight: 400;
        color: #53586c;
        line-height: 21px;
        .lable-icon {
            margin-right: -4px;
            color: #f93741;
        }
    }
    .verify-methods {
        width: 108px;
        height: 40px;
        background: #f4f5f8;
        border-radius: 26px;
        display: flex;
        justify-content: center;
        align-content: center;
        background: #f4f5f8;
        font-size: 14px;
        font-weight: 400;
        color: #3a3d4b;
        line-height: 21px;
        padding: 9px 19px 10px;
        box-sizing: border-box;
        cursor: pointer;
    }
    .margin-left-17 {
        margin-left: 17px;
    }
    .active {
        background: #ffeeef;
        color: #f93842;
    }
}
.set-password-tip {
    margin: 14px auto 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 316px;
    font-size: 12px;
    font-weight: 400;
    color: #53586c;
    line-height: 16px;
}
</style>
