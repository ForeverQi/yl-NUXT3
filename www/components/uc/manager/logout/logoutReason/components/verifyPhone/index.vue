<template>
    <vb-mask :show="isShow">
        <div class="phone-wrap">
            <h3 class="title">手机号验证</h3>
            <p class="sub-title">为保障您的账号安全，现需要进行手机号验证</p>
            <p class="phone">
                当前账号绑定手机号：
                <span>{{ userInfo.userMobile | handlePhone }}</span>
            </p>
            <div class="code-inp">
                <input type="text" autocomplete="off" placeholder="请输入图形验证码" v-model="captchaValue" />
                <img :src="imgSrc" class="img-captcha" alt="图形验证码" @click="getCaptchaToken()" />
            </div>
            <div class="code-inp">
                <input type="text" placeholder="请输入短信验证码" v-model="phoneCode" />
                <input
                    type="submit"
                    :value="messageTxt"
                    class="code-btn"
                    :class="isDisabled ? 'no-click' : ''"
                    :disabled="isDisabled"
                    @click="handlePhoneCodeClick"
                />
            </div>
            <p class="tips">注销账号不可恢复，所有数据和记录将全部被清空，请谨慎操作！</p>
            <div class="btn-wrap">
                <button class="cancel" @click="noCancellation">暂不注销</button>
                <button class="continue" v-if="!phoneCode.length">继续注销</button>
                <button class="continue active" v-else @click="logoutSubmit">继续注销</button>
            </div>
        </div>
    </vb-mask>
</template>

<script>
import vbMask from '@/www/components/vbMask/index.vue';
import '@/api/mc/api.MC0027.query-sms-verifycode-by-token.js'; //发送验证码
import '@/api/uc/api..create-captcha.js';
export default {
    components: {
        vbMask,
    },
    filters: {
        handlePhone(value) {
            if (!value) return '';
            return value.substr(0, 3) + '****' + value.substr(7);
        },
    },
    props: {
        isShow: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            userInfo: {},
            phoneCode: '',
            isDisabled: true,
            messageTxt: '获取验证码',
            seconds: 60, // 秒数
            captchaValue: '',
            captchaToken: '',
            imgSrc: '',
            interval: null,
        };
    },
    watch: {
        phoneCode: {
            handler(newVal) {
                this.phoneCode = newVal.slice(0, 8).replace(/\D/g, '');
            },
        },
        captchaValue(val) {
            if (val && val.trim() !== '') {
                this.isDisabled = false;
            } else {
                this.isDisabled = true;
            }
        },
        isShow(val) {
            if (val === false) {
                this.getCaptchaToken();
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
        handlePhoneCodeClick() {
            if (this.isDisabled) return;
            if (!this.userInfo.userMobile) {
                return false;
            }
            if (this.captchaValue.trim() === '') return;
            this.isDisabled = true;
            let params = {
                smstplNo: 'CLOSE-ACCOUNT-VERIFY',
                captchaData: {
                    captchaToken: this.captchaToken,
                    captchaScene: 'uc_unsubscribe',
                    captchaValue: this.captchaValue,
                },
                scene: 'uc_unsubscribe',
            };
            this.getPhoneCode(params);
        },
        countDown() {
            this.isDisabled = true;
            this.seconds--;
            this.messageTxt = this.seconds + '秒后重新发送';
            if (this.seconds == 0) {
                this.messageTxt = '获取验证码';
                this.seconds = 60;
                this.isDisabled = false;
                this.captchaValue = '';
                this.getCaptchaToken();
                return;
            }
            this.interval = setTimeout(this.countDown, 1000);
        },
        getPhoneCode(params) {
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
                    this.captchaValue = '';
                    this.getCaptchaToken();
                    this.isDisabled = false;
                });
        },
        noCancellation() {
            this.phoneCode = '';
            this.captchaValue = '';
            this.isDisabled = true;
            this.messageTxt = '获取验证码';
            this.seconds = 60;
            clearTimeout(this.interval);
            this.interval = null;
            this.$emit('noCancellation');
        },
        logoutSubmit() {
            this.$emit('logoutSubmit', this.phoneCode);
        },
        //获取 图形验证码 凭证
        getCaptchaToken() {
            this.$niceloo.api.call('uc/create-captcha', {
                captchaType: 'P', // 验证码类型
                captchaWidth: 89, // 验证码宽度
                captchaHeight: 37, // 验证码高度
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
.phone-wrap {
    width: 336px;
    background: #ffffff;
    border-radius: 6px;
    padding: 32px 40px;
    text-align: center;
    h3 {
        font-size: 20px;
        color: #3a3d4b;
        margin-bottom: 25px;
        font-weight: bold;
    }
    .sub-title {
        font-size: 16px;
        color: #3a3d4b;
        font-weight: 400;
        text-align: left;
        margin-bottom: 15px;
    }
    .phone {
        font-size: 14px;
        color: #77798d;
        text-align: left;
        margin-bottom: 12px;
        width: 100%; // 解决浏览器兼容
        border: none; // 解决浏览器兼容
        span {
            font-size: 16px;
            font-weight: 700;
            color: #3a3d4b;
        }
    }
    .code-inp {
        width: 320px;
        height: 53px;
        border: 1px solid #ededf2;
        border-radius: 6px;
        margin-bottom: 8px;
        overflow: hidden;
        font-size: 16px;
        input {
            float: left;
            height: 53px;
            border: none;
            width: 160px;
            padding: 0 16px;
            outline: none;
        }
        .code-btn {
            width: 122px;
            float: right;
            border: none;
            margin: 16px 0;
            height: 21px;
            color: #f8323c;
            background: #fff;
            border-left: 1px solid #ededf2;
            cursor: pointer;
            outline: none;
            &.no-click {
                cursor: not-allowed;
                color: #99a1af;
            }
        }
        .img-captcha {
            width: 89px;
            height: 37px;
            cursor: pointer;
            margin: 8px 0;
        }
    }
    .tips {
        font-size: 12px;
        text-align: left;
        color: #99a1af;
    }

    .btn-wrap {
        overflow: hidden;
        margin-top: 24px;
        button {
            width: 160px;
            height: 48px;
            border: none;
            font-size: 18px;
            border-radius: 24px;
            color: #3a3d4b;
            cursor: pointer;
            &.continue {
                float: right;
                color: #99a1af;
            }
            &.cancel {
                float: left;
            }
            &.active {
                background: linear-gradient(90deg, #f8323c, #ff737a 100%);
                color: #fff;
            }
        }
    }
}
</style>
