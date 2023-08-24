<script lang="jsx">
import '@/api/api..query-idcard-info.js';
import '@/api/mc/api.MC0027.query-sms-verifycode-by-token.js'; //发送验证码
import '@/api/uc/api..create-captcha.js';
export default {
    /**
     * @returns {object} - 返回预定义的变量
     */
    data() {
        return {
            form: '',
            showError: true,
            error: '',
            isSend: false,
            seconds: 60,
            btnText: '获取验证码',
            captchaToken: '',
            imgSrc: '',
            captchaValue: '', //图形确认码
            timer: null,
        };
    },
    /**
     *
     */
    created() {
        this.getCaptchaToken();
    },
    methods: {
        /**
         * // 获取验证码
         */
        getSMSCode() {
            if (this.isSend) {
                return;
            }
            if (this.captchaValue.trim() === '') {
                this.$baseUI.alert('请先输入图形码');
                return;
            }
            this.isSend = true;
            const params = {
                scene: 'get_idcard',
                captchaData: {
                    captchaToken: this.captchaToken,
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
                    this.isSend = false;
                    if (err.getCode().includes('GB2009')) {
                        this.$baseUI.alert('图形验证码有误，请重新输入');
                    } else {
                        this.$niceloo.api.handleFailure(err);
                    }
                    this.$refs.captchaValue.value = '';
                    this.$refs.inp.value = '';
                    this.form = '';
                    this.captchaValue = '';
                    this.getCaptchaToken();
                });
        },

        /**
         *
         */
        countDown() {
            this.isSend = true;
            this.seconds--;
            this.btnText = this.seconds + '秒后重发';
            if (this.seconds == 0) {
                this.btnText = '获取验证码';
                this.seconds = 60;
                this.isSend = false;
                this.$refs.captchaValue.value = '';
                this.captchaValue = '';
                this.getCaptchaToken();
                return;
            }
            this.timer = setTimeout(this.countDown, 1000);
        },
        /**
         * 通过验证码获取身份证号
         */
        doVerify() {
            //
            if (this.form.length === 0) {
                // this.showError = true;
                // this.error = '请输入正确的验证码！';
                this.$Message.error('请输入正确的验证码！');
                return;
            }
            this.doGetIdCard();
        },
        /**
         * 获取学员身份证后6位
         */
        doGetIdCard() {
            const data = {
                url: 'uc/query-idcard-info',
                params: {
                    verify: {
                        verifyValue: this.form,
                    },
                },
                isCustom: true,
            };
            this.$httpClient(data)
                .then((res) => {
                    console.log(res, '===');
                    this.$emit('doClose', {
                        type: 'success',
                        idCard: res,
                    });
                })
                .catch((err) => {
                    // this.error = err.getDescription();
                    // this.showError = true;
                    this.$Message.error(err.getDescription());
                });
            // 50s后发送
        },
        //获取 图形验证码 凭证
        /**
         *
         */
        getCaptchaToken() {
            this.$niceloo.api.call('uc/create-captcha', {
                captchaType: 'P', // 验证码类型
                captchaWidth: 94, // 验证码宽度
                captchaHeight: 36, // 验证码高度
                captchaSize: 4, // 验证码长度
                onsuccess: (data) => {
                    this.captchaToken = data.captchaToken;
                    this.imgSrc = this.$urlUtils.getViewUrl(data.filePath);
                    this.$refs.imgSrc.src = this.$urlUtils.getViewUrl(data.filePath);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
    /**
     * @returns {object} - 虚拟dom树
     */
    render() {
        return (
            <div class="id-card-check">
                <div class="title">
                    请确认身份信息
                    <div
                        class="close"
                        onClick={() => {
                            this.$emit('doClose', {
                                type: 'close',
                            });
                        }}
                    >
                        <img src={require('./asset/images/close.png')} class="close-img" />
                    </div>
                </div>
                <div class="tip">
                    为保护您的隐私安全，请输入<span class="red">验证码信息</span>进行校验
                </div>
                <div class="inp-wrap">
                    <span class="label">图形码：</span>
                    <input
                        type="text"
                        ref="captchaValue"
                        onInput={() => {
                            this.captchaValue = this.$refs.captchaValue.value;
                        }}
                        class="inp"
                    />
                    <img class="img-src" ref="imgSrc" onClick={this.getCaptchaToken}></img>
                </div>
                <div class="inp-wrap pad-top-20">
                    <span class="label">验证码：</span>
                    <input
                        type="text"
                        ref="inp"
                        onInput={() => {
                            this.form = this.$refs.inp.value;
                        }}
                        class="inp"
                    />

                    <div class="verify-btn" onClick={this.getSMSCode}>
                        {this.btnText}
                    </div>
                </div>
                <div class="btn" onClick={this.doVerify}>
                    确定
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.id-card-check {
    position: relative;
    width: 360px;
    height: 315px;
    border-radius: 10px;
    background-color: #fff;
    .title {
        position: relative;
        font-size: 20px;
        font-weight: 500;
        text-align: center;
        color: #3a3d4b;
        padding-top: 30px;
        line-height: 28px;
        border-radius: 10px;

        .close {
            position: absolute;
            right: 14px;
            width: 12px;
            height: 12px;
            top: 14px;
            cursor: pointer;

            .close-img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .tip {
        padding-top: 8px;
        font-size: 12px;
        text-align: center;
        color: #99a1af;
        line-height: 17px;

        .red {
            color: #f8323c;
        }
    }

    .inp-wrap {
        display: flex;
        padding-top: 36px;
        padding-left: 30px;
        align-items: center;
        &.pad-top-20 {
            padding-top: 20px;
        }
        .label {
            width: 56px;
            height: 14px;
            font-size: 14px;
            text-align: left;
            color: #3a3d4b;
            line-height: 14px;
        }
        .inp {
            width: 142px;
            height: 36px;
            background: #ffffff;
            border: 1px solid #d8dde6;
            border-radius: 4px;
            outline: none;
            padding: 0 10px;
            box-sizing: border-box;
        }
        .verify-btn {
            width: 94px;
            height: 36px;
            margin-left: 8px;
            background: #ffffff;
            border: 1px solid #f8323c;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            text-align: center;
            color: #f8323c;
            line-height: 36px;
        }
        .img-src {
            width: 94px;
            height: 36px;
            margin-left: 8px;
            cursor: pointer;
        }
    }

    .btn {
        width: 218px;
        height: 38px;
        margin: 0 auto;
        margin-top: 35px;
        background: linear-gradient(270deg, #ff8d74, #ff2e30);
        border-radius: 21px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        color: #ffffff;
        line-height: 38px;
    }

    .error-txt {
        position: absolute;
        top: 165px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        text-align: left;
        color: #f8323c;
        line-height: 17px;
    }
}
</style>
