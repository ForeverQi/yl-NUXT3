<template>
    <div class="login-wrap" v-if="isShow">
        <div class="login-section">
            <div class="title">
                <div class="name">{{ titleTxt }}</div>
                <div class="close" @click="doClose(true)">
                    <img src="./asset/images/close.png" />
                </div>
            </div>
            <login-qrcode
                :app-id="appId"
                v-if="loginType === 'qrcode'"
                :type="type"
                :online="online"
                :callback-obj="callbackObj"
                @doNext="bindPhone"
                @submit="doSubmit"
            />
            <login-phone
                :app-id="appId"
                v-if="loginType === 'phone'"
                @submit="doSubmit"
                :callback-obj="callbackObj"
                :phone-type="phoneType"
                :wxuser-id="wxuserId"
            />
            <div class="change" @click="changeLoginType(loginType)" v-if="phoneType === 'phone' && type !== 'userCenter' && type !== 'qrcode'">
                <img src="./asset/images/phone.png" v-if="loginType === 'qrcode'" />
                <img src="./asset/images/qrcode.png" v-if="loginType === 'phone'" />
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import LoginQrcode from '../components/LoginQrcode/index.vue';
import LoginPhone from '../components/LoginPhone/index.vue';
import '@/api/mcu/api.mcu-login-006.login-get-userinfo.js';
import '@/api/mcu/api.mcu-login-007.login-check-bind-wechat.js';
export default {
    components: {
        LoginQrcode,
        LoginPhone,
    },
    data() {
        return {
            type: 'login',
            phoneType: 'phone',
            isShow: false,
            loginType: 'qrcode',
            wxuserId: '', // 微信绑定ID
            doSuccess: null, // 成功时的回调
            doError: null, // 失败时的回调
            callbackObj: {
                loginSuccessCallback: null,
            },
            online: true, // 默认联网
            context: null, // 上下文
            appId: null, // APPID
        };
    },
    computed: {
        ...mapState('logout', ['islogin', 'userInfo', 'bindStatus']),
        ...mapState('mcuStore', ['pageName']),
        titleTxt() {
            let txt = '';
            if (this.loginType === 'qrcode') {
                if (this.type === 'login') {
                    txt = '微信扫码登录';
                } else if (this.type === 'userCenter') {
                    // 用户中心
                    txt = '微信绑定';
                } else {
                    // 预约时的弹窗
                    txt = '';
                }
            } else if (this.phoneType === 'phone') {
                // 手机号登录
                txt = '手机号登录';
            } else {
                txt = '手机号绑定';
            }
            return txt;
        },
    },
    destroyed() {
        window.removeEventListener('online', this.watchOnlineStatus);
        window.removeEventListener('offline', this.watchOnlineStatus);
    },
    mounted() {
        if (window.navigator.onLine == true) {
            this.online = true;
        } else {
            this.online = false;
        }

        window.addEventListener('online', this.watchOnlineStatus);
        window.addEventListener('offline', this.watchOnlineStatus);
    },
    methods: {
        ...mapActions('logout', ['getUserInfo2', 'setUserInfo']),
        ...mapMutations('logout', ['setUserInfo']),
        watchOnlineStatus(ev) {
            this.online = ev.type === 'online';
            // if (this.online) {
            //     this.isShow = true;
            //     this.getTimerSceneStatus();
            // } else {
            //     // 来网之后重新生成二维码
            //     this.init();
            // }
        },
        doShow() {
            this.callbackObj.loginSuccessCallback = this.loginSuccessCallback;
            if (this.context) {
                this.appId = this.context.env.config.MCU_WX_APPID;
            }
            this.isShow = true;
        },
        doSubmit(res) {
            this.doClose();
            this.doSuccess(res);
        },
        doClose(doHandle = false) {
            this.isShow = false;
            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);
            if (doHandle) {
                let type = {
                    type: 'close',
                };
                this.$yiguan.mcuTrack('login_in_new', {
                    login_method: this.loginType === 'qrcode' ? '扫码登录' : '手机号登录',
                    is_success: false,
                    fail_reason: '中途退出',
                    login_resource: this.pageName, // 来源
                });
                // 如果在个人中心关闭了记录为已绑定公众号，实际状态以接口返回的为准
                if (this.loginType === 'qrcode' && this.type === 'userCenter') {
                    this.$storage.set('login-bind-status', { bindWechat: true });
                }
                this.doError(type);
            }
        },
        bindPhone(wxuserId) {
            // 绑定手机号
            this.phoneType = 'bindPhone';
            this.loginType = 'phone';
            this.wxuserId = wxuserId;
        },
        changeLoginType(type) {
            // 切换登录方式
            if (type === 'qrcode') {
                this.loginType = 'phone';
            } else {
                this.loginType = 'qrcode';
            }
        },
        loginSuccessCallback({ data }) {
            this.$User.setToken(data.token);
            return ylPlugin.login.getUser().then((data3) => {
                if (data) {
                    this.setUserInfo(data3);
                    this.$nextTick(() => {
                        // 用户信息注册易观别名
                        this.$yiguan.aliasUser(data3);
                    });
                    return data3;
                } else {
                    this.$User.removeLoginInfo();
                    this.$baseUI.alert('系统开小差啦，待会再试试！');
                }
            });
        },
        checkLogin() {
            // 检查用户是否登录
            return this.getUserInfo2()
                .then(() => {
                    return this.islogin;
                })
                .catch(() => {
                    return this.islogin;
                });
        },
        getUserInfo() {
            // 获取用户信息
            return this.userInfo;
        },
        getBindStatus() {
            this.appId = this.context ? this.context.env.config.MCU_WX_APPID : '';
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

                return obj;
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
.login-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    z-index: 30;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
}
.login-section {
    position: relative;
    width: 384px;
    height: 480px;
    background: #ffffff;
    border-radius: 16px;

    .title {
        position: relative;
        padding-top: 32px;
        padding-left: 32px;
        padding-right: 32px;
        z-index: 1;
        .name {
            font-size: 20px;
            font-weight: 700;
            color: #333333;
            line-height: 24px;
        }

        .close {
            position: absolute;
            right: 27px;
            top: 26px;
            width: 37px;
            height: 37px;
            cursor: pointer;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .change {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 80px;
        height: 77px;
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
