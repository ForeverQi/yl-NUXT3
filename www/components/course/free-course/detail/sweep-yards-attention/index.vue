<!-- 预约绑定 -->
<template>
    <div class="attention-dialog" v-if="show">
        <div class="qrcode-wrap">
            <img class="close" @click="handleClose" src="./asset/images/close.png" alt="" />

            <div class="wrap" v-if="!qrcode">
                <i class="el-icon-loading"></i>
            </div>
            <img class="img" :src="qrcode" v-if="qrcode" />
            <div class="footer">
                <div class="txt1">扫码关注服务号，进行直播预约</div>
                <div class="txt2">直播开课提醒、不定期好课推送、更多专属福利</div>
            </div>

            <!-- 断网情况
            <div class="error-status" v-if="online === false">
                <div class="status-img">
                    &lt;!&ndash; <img src="./asset/images/wrang.png" /> &ndash;&gt;
                    <img src="./asset/images/network_error.png" />
                </div>
                <div class="status-txt">您的网络异常，唤醒网络再试一次</div>
                <div class="replay">
                    <img class="reflush" src="./asset/images/reflush.png" />
                    刷新试试
                </div>
            </div>-->
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
    </div>
</template>

<script>
import { mapState } from 'vuex';
import '@/api/mcu/api.mcu-login-001.login-unique.js';
import '@/api/mcu/api.mcu-login-002.login-qrcode-create.js';
import '@/api/mcu/api.mcu-login-008.login-scancode-result.js';
import '@/api/mcu/api.mcu-login-007.login-check-bind-wechat.js';
import '@/api/mcu/api.mcu-001.public-extensioncenter-receive.js'; // 行为推送
import QRCode from 'qrcode';

export default {
    name: 'index',
    props: {
        positionType: {
            type: String,
            default: '',
        },
        show: { type: Boolean, default: false },
        user: {
            type: Object,
            default: () => {
                return null;
            },
        },
    },
    data() {
        return {
            uniqueStr: '',
            qrcode: '',
            expires: '', //二维码过期时间
            isExpire: false,
            timer: null,
            caseId: '',
        };
    },
    computed: {
        ...mapState('open', ['liveCourse']),
    },
    watch: {
        show(newval) {
            if (newval) {
                this.init();
            }
        },
    },
    methods: {
        init() {
            ylPlugin.login.clearWaitForWx1PublicAccuntSubscriptionTimer();
            let promiseCaseId = ylPlugin.login.getWx1LoginCaseId();
            promiseCaseId.then(
                (caseId) => {
                    this.caseId = caseId;
                    let promise = ylPlugin.login.getWx1PublicAccountQRCode({ caseId: this.caseId });
                    promise.then(
                        (qrcode) => {
                            this.expires = qrcode.expires;
                            console.log('二维码地址');
                            console.log(qrcode);
                            /* 调用接口过程中没有失败 */
                            console.log(qrcode.content); /* 'http://weixin.qq.com/r/MXWxqTjE-WWCrXzK9yAj' */
                            /**
                             * 1、生成二维码
                             * 2、创建定时器获取状态
                             * 3、根据状态跳转对应的页面
                             */
                            if (qrcode.content) {
                                console.log('diaoyonge二位吗');
                                QRCode.toDataURL(qrcode.content, {
                                    margin: 0,
                                }).then((res) => {
                                    this.qrcode = res;
                                    console.log('返回二维码');
                                    this.getTimerSceneStatus1();
                                });
                            }
                        },
                        (err) => {
                            /* 调用接口过程中有失败 */
                            console.error(err);
                        }
                    );
                },
                (err) => {
                    this.isExpire = false;
                    /* 实例ID获取失败 */
                    console.error('实例ID获取失败：' + err);
                }
            );
        },
        //轮询调用
        getTimerSceneStatus1() {
            ylPlugin.login.waitForWx1PublicAccountSubscription({ caseId: this.caseId }).then(
                (res) => {
                    console.log(res);
                    if (res.userWechatId) {
                        ylPlugin.login.clearWaitForWx1PublicAccuntSubscriptionTimer();
                        this.$emit('change-attention-status', true);
                        this.$emit('update:show', false);
                    }
                },
                (err) => {
                    /* 过程中有失败 */
                    console.log('验证码已过期');
                    console.log(err);
                    if (err.code === 'C1002') {
                        this.isExpire = true;
                        ylPlugin.login.clearWaitForWx1PublicAccuntSubscriptionTimer();
                        this.init();
                    }
                }
            );
        },
        handleClose() {
            ylPlugin.login.clearWaitForWx1PublicAccuntSubscriptionTimer();
            this.$emit('update:show', false);
            this.$emit('change-attention-status', false);
        },
    },
};
</script>

<style scoped lang="less">
.attention-dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    z-index: 99;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
}
.qrcode-wrap {
    position: relative;
    width: 384px;
    height: 480px;
    background: #ffffff;
    border-radius: 16px;
    position: relative;
    margin-top: -108px;
    background-image: url(./asset/images/qw.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .close {
        position: absolute;
        right: 27px;
        top: 26px;
        width: 37px;
        height: 37px;
        cursor: pointer;
    }

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
        z-index: 999;
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
</style>
