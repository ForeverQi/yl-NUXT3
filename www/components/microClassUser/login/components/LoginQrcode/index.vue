<template>
    <div class="content">
        <!-- 正常登录 -->
        <template v-if="type === 'login'">
            <div class="qrcode">
                <div class="wrap" v-if="!qrcode">
                    <i class="el-icon-loading"></i>
                </div>
                <img :src="qrcode" v-else />
            </div>
            <template v-if="qrcode && step === 1 && online === true">
                <!-- 显示扫码登录 -->
                <div class="status">
                    <div class="txt">扫码关注公众号进行登录</div>
                </div>
            </template>
            <div class="error-status" v-if="online === false">
                <div class="status-img">
                    <!-- <img src="./asset/images/wrang.png" /> -->
                    <img src="./asset/images/network_error.png" />
                </div>
                <div class="status-txt">您的网络开小差了，唤醒网络再试一次</div>
                <div class="replay">
                    <img class="reflush" src="./asset/images/reflush.png" />
                    刷新试试
                </div>
            </div>
            <div class="error-status" v-if="isExpire">
                <div class="status-img">
                    <img src="./asset/images/wrang.png" />
                </div>
                <div class="status-txt">二维码已过期，请重新获取</div>
                <div class="replay" @click="init">
                    <img class="reflush" src="./asset/images/reflush.png" />
                    刷新试试
                </div>
            </div>
            <template v-if="false">
                <!-- 扫码成功 -->
                <div class="status">
                    <img src="./asset/images/success.png" class="status-img" />
                    <div class="txt">扫码成功</div>
                </div>
                <div class="tip">点击关注公众号完成登录</div>
            </template>
        </template>
        <!-- 用户绑定 -->
        <template v-if="type === 'userCenter'">
            <div class="qrcode">
                <div class="wrap" v-if="!qrcode">
                    <i class="el-icon-loading"></i>
                </div>
                <img :src="qrcode" v-else />
            </div>
            <!-- 断网情况 -->
            <div class="error-status" v-if="online === false">
                <div class="status-img">
                    <!-- <img src="./asset/images/wrang.png" /> -->
                    <img src="./asset/images/network_error.png" />
                </div>
                <div class="status-txt">您的网络开小差了，唤醒网络再试一次</div>
                <div class="replay">
                    <img class="reflush" src="./asset/images/reflush.png" />
                    刷新试试
                </div>
            </div>
            <!-- 过期情况 -->
            <div class="error-status" v-if="isExpire">
                <div class="status-img">
                    <img src="./asset/images/wrang.png" />
                </div>
                <div class="status-txt">二维码已过期，请重新获取</div>
                <div class="replay" @click="init">
                    <img class="reflush" src="./asset/images/reflush.png" />
                    刷新试试
                </div>
            </div>
            <template v-if="qrcode">
                <!-- 显示扫码登录 -->
                <div class="status" v-if="online">
                    <div class="txt">扫码关注公众号进行绑定</div>
                </div>
                <div class="tip-wrap">
                    <div class="txt">绑定微信，可为您提供优质学习服务</div>
                    <div class="txt">不定期超值资料可领取</div>
                </div>
            </template>
        </template>
        <!-- 预约绑定 -->
        <template v-if="type === 'qrcode'">
            <div class="qrcode-wrap">
                <div class="wrap" v-if="!qrcode">
                    <i class="el-icon-loading"></i>
                </div>
                <img class="img" :src="qrcode" v-if="qrcode" />
                <div class="footer">
                    <div class="txt1">扫码关注服务号，开启上课提醒</div>
                    <div class="txt2">上课提醒、不定期好课推送、更多专属福利</div>
                </div>

                <!-- 断网情况 -->
                <div class="error-status" v-if="online === false">
                    <div class="status-img">
                        <!-- <img src="./asset/images/wrang.png" /> -->
                        <img src="./asset/images/network_error.png" />
                    </div>
                    <div class="status-txt">您的网络异常，唤醒网络再试一次</div>
                    <div class="replay">
                        <img class="reflush" src="./asset/images/reflush.png" />
                        刷新试试
                    </div>
                </div>
                <!-- 过期情况 -->
                <div class="error-status" v-if="isExpire">
                    <div class="status-img">
                        <img src="./asset/images/wrang.png" />
                    </div>
                    <div class="status-txt">二维码已过期，请重新获取</div>
                    <div class="replay" @click="init">
                        <img class="reflush" src="./asset/images/reflush.png" />
                        刷新试试
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import '@/api/mcu/api.mcu-login-001.login-unique.js';
import '@/api/mcu/api.mcu-login-002.login-qrcode-create.js';
import '@/api/mcu/api.mcu-login-008.login-scancode-result.js';
import '@/api/mcu/api.mcu-login-007.login-check-bind-wechat.js';
import '@/api/mcu/api.mcu-001.public-extensioncenter-receive.js'; // 行为推送
import QRCode from 'qrcode';
export default {
    props: {
        type: {
            type: String,
            default: 'login',
        },
        online: {
            type: Boolean,
            default: true,
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
            uniqueStr: '',
            qrcode: '',
            step: 1,
            expireTime: 20,
            isExpire: false,
            timer: null,
            isShow: false,
        };
    },
    computed: {
        ...mapState('logout', ['userInfo']),
        ...mapState('mcuStore', ['projectId', 'pageName', 'remark', 'clueWaycode']),
    },
    mounted() {
        this.isShow = true;
        clearTimeout(this.timer);
        this.init();
    },
    destroyed() {
        this.isShow = false;
        clearTimeout(this.timer);
    },
    methods: {
        ...mapMutations('logout', ['setBindStatus']),
        init() {
            // 获取二维码唯一标识
            this.getUserUnique()
                .then(() => {
                    return this.createQrcode();
                })
                .then(() => {
                    this.isExpire = false;
                });
        },
        createQrcode() {
            let data = {
                url: 'login/login-qrcode-create',
                params: {
                    expireSeconds: this.expireTime,
                    actionName: 'QR_STR_SCENE',
                    sceneStr: this.uniqueStr,
                    appId: this.appId,
                },
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                /**
                 * 1、生成二维码
                 * 2、创建定时器获取状态
                 * 3、根据状态跳转对应的页面
                 */
                QRCode.toDataURL(res.url, {
                    margin: 0,
                }).then((res) => {
                    this.qrcode = res;
                    this.getTimerSceneStatus();
                });
            });
        },
        getTimerSceneStatus() {
            // 获取扫码状态
            let data = {
                url: 'login/login-scancode-result',
                params: {
                    qrCodeId: this.uniqueStr,
                    appId: this.appId,
                },
                isCustom: true,
            };
            this.httpClient(data).then((res) => {
                if (!this.isShow) {
                    return;
                }
                if (res.expire === 'Y') {
                    // 已过期
                    this.isExpire = true;
                    clearTimeout(this.timer);
                } else if (res.wxuserId) {
                    // debugger;
                    // 已扫码
                    if (res.bindStatus === 'Y') {
                        // 已绑定手机号
                        this.callbackObj
                            .loginSuccessCallback({
                                data: res,
                            })
                            .then(async () => {
                                let obj = {
                                    bindWechat: true,
                                };
                                this.$storage.set('login-bind-status', obj);
                                this.setBindStatus({ key: 'bindWechat', value: obj.bindWechat });

                                let clueExtension = await this.$PromotionUtil.mcuClueOrBeHavior({
                                    clueWaycode: this.clueWaycode === 'dingdan' ? 'dingdan' : 'yindao',
                                    projectId: this.projectId,
                                    pageName: this.pageName,
                                    remark: this.remark,
                                });

                                let param = JSON.parse(clueExtension);
                                let data = {
                                    url: 'public/public-extensioncenter-receive',
                                    params: {
                                        ...param,
                                    },
                                    isCustom: true,
                                };
                                if (this.type === 'login') {
                                    this.httpClient(data);
                                }

                                this.$yiguan.mcuTrack('login_in_new', {
                                    login_method: '扫码登录',
                                    is_success: true,
                                    fail_reason: '',
                                    login_resource: this.pageName, // 来源
                                });
                                this.$emit('submit');
                            });
                    } else if (res.bindStatus === 'N') {
                        // 未绑定手机号
                        this.$emit('doNext', res.wxuserId);
                    } else if (res.bindStatus === 'F') {
                        this.$baseUI
                            .alert(`该微信已绑定手机号为${res.bindPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}的用户,请用其他微信扫描！`)
                            .then(() => {
                                // 重新获取二维码
                                this.init();
                            });
                    }
                } else {
                    this.timer = setTimeout(this.getTimerSceneStatus, 1000);
                }
            });
        },
        getUserUnique() {
            let data = {
                url: 'login/login-unique',
                params: {
                    scene: 'MP',
                },
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                this.uniqueStr = res.uid;
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
.wrap {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    color: #666;
    background-color: rgba(0, 0, 0, 0.3);
}
.tip-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 20px;
    height: 32px;
    .txt {
        width: 192px;
        font-size: 12px;
        font-weight: 400;
        text-align: center;
        color: #999999;
        line-height: 1;
    }
}
.content {
    position: relative;
    padding-top: 76px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .qrcode-wrap {
        position: relative;
        height: 480px;
        width: 100%;
        margin-top: -108px;
        background-image: url(./asset/images/qw.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;

        .wrap {
            position: absolute;
            top: 195px;
            left: 105px;
            width: 184px;
            height: 184px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .error-status {
            position: absolute;
            left: 50%;
            transform: translatex(-47%);
            width: 210px;
            top: 182px;
            height: 207px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: rgba(255, 255, 255, 0.95);
        }

        .img {
            position: absolute;
            top: 195px;
            left: 105px;
            width: 184px;
            height: 184px;
        }

        .footer {
            position: absolute;
            bottom: 25px;
            left: 0;
            right: 0;
            text-align: center;
            .txt1 {
                font-size: 18px;
                font-weight: 400;
                text-align: center;
                color: #333333;
                line-height: 1;
                margin-bottom: 14px;
            }
            .txt2 {
                font-size: 12px;
                font-weight: 400;
                text-align: center;
                color: #333333;
                line-height: 1;
            }
        }
    }
    .qrcode {
        position: relative;
        width: 180px;
        height: 180px;

        img {
            width: 100%;
            height: 100%;
        }
    }
    .error-status {
        position: absolute;
        left: 0;
        right: 0;
        top: 76px;
        height: 180px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.95);

        .status-img {
            width: 28px;
            height: 28px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .status-txt {
            padding-top: 8px;
            color: #303133;
            line-height: 19px;
            font-weight: 400;
            font-size: 14px;
        }

        .replay {
            margin-top: 20px;
            padding: 0 20px;
            height: 36px;
            color: #ffffff;
            font-size: 14px;
            display: flex;
            align-items: center;
            background: linear-gradient(133deg, #82b1ff 13%, #025eff);
            border-radius: 18px;
            cursor: pointer;

            .reflush {
                width: 14px;
                height: 14px;
                margin-right: 8px;
                vertical-align: middle;
            }
        }
    }
    .status {
        padding-top: 12px;
        display: flex;
        align-items: center;
        .status-img {
            margin-right: 8px;
            width: 22px;
            height: 22px;
        }
        .txt {
            font-size: 14px;
            color: #333333;
            line-height: 16px;
        }
    }

    .tip {
        padding-top: 20px;
        font-size: 14px;
        color: #999999;
        line-height: 14px;
    }
}
</style>
