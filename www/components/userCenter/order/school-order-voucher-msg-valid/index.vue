<script lang="jsx">
import '@/api/mc/api.MC0001.send-sms-verifycode.js';
import '@/api/mc/api.MC0002.verify-sms-verifycode.js';
import '@/api/order/api..order-collegeconfirm-update.js';

import { Validator } from '~/plugins/common/utils/validator.js';
export default {
    props: {
        order: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            codeMsg: '',
            seconds: 60,
            btnText: '获取确认码',
        };
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            this.validator = new Validator(
                'schoolOrderMsgForm',
                {
                    verifyValue: 'required|I',
                },
                {
                    verifyValue: {
                        required: '请输入协议确认码',
                        I: '验证码错误或已失效，请重新校验',
                    },
                }
            );
        },
        handleCodeClick(e) {
            e.stopPropagation();
            this.getMsgCode();
        },
        handleCloseClick(tag) {
            this.$emit('doClose', tag);
        },
        handleSureClick() {
            const param = {
                verifyValue: this.verifyValue,
            };
            this.loadingIntance = this.$baseUI.loading();
            this.validator
                .validate(param)
                .then(() => {
                    return this.collegeConfirm();
                })
                .catch((err) => {
                    err.showError();
                })
                .finally(() => {
                    this.loadingIntance.close();
                });
        },
        getMsgCode() {
            this.$User.getUser().then((user) => {
                this.user = user;
                return this.$callApi('public/query-sms-verifycode-by-token', {
                    smstplNo: '010001', // 010005
                    scene: '010001',
                })
                    .then((res) => res.getData())
                    .then(() => {
                        const regStr = this.user.userMobile.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
                        this.codeMsg = `确认码将发送至${regStr}，请注意查收`;
                        this.countDown();
                    })
                    .catch(this.$niceloo.api.handleFailure);
            });
        },
        countDown() {
            this.seconds--;
            this.btnText = this.seconds + '秒后重新发送';
            if (this.seconds <= 0) {
                this.btnText = '重新获取确认码';
                this.seconds = 60;
                return;
            }
            this.timer = setTimeout(this.countDown, 1e3);
        },
        verifyMsgCode() {
            if (!this.verifyValue) {
                return;
            }
            this.$callApi('xieyiqueren/verify-sms-verifycode', {
                verifyScene: '010001',
                verifyValue: this.verifyValue,
            })
                .then((res) => res.getData())
                .then(() => {
                    this.validator.changeRules({ verifyValue: 'required' });
                })
                .catch(() => {
                    this.validator.changeRules({ verifyValue: 'required|I' });
                })
                .finally(() => {
                    this.validator.validate({ verifyValue: this.verifyValue }).catch((err) => {
                        err.showError();
                    });
                });
        },
        collegeConfirm() {
            return this.$callApi('order/order-collegeconfirm-update', {
                orderId: this.order.orderId,
                isAgree: 'Y',
            })
                .then(() => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            this.$Message.success('已确认');
                            this.handleCloseClick('click');
                        }, 5e3);
                    });
                })
                .catch(this.$niceloo.api.handleFailure);
        },
    },
    render() {
        return (
            <div class="agreement-wrap">
                {
                    <section class="info-wrapper">
                        <form class="user-form" name="schoolOrderMsgForm">
                            <div class="form-item">
                                <label for="verifyValue" class="code-label">
                                    协议确认码：
                                </label>
                                <div class="code-wrapper">
                                    <div class="code-container">
                                        <div>
                                            <input
                                                id="verifyValue"
                                                v-model={this.verifyValue}
                                                placeholder="请输入手机确认码"
                                                class="item-val item-code"
                                                maxlength="8"
                                                onchange={this.verifyMsgCode}
                                                name="verifyValue"
                                            />
                                        </div>
                                        <button
                                            class="btn-code"
                                            onclick={this.handleCodeClick}
                                            type="button"
                                            disabled={this.btnText.includes('获取确认码') === false}
                                        >
                                            {this.btnText}
                                        </button>
                                    </div>
                                    {this.codeMsg && <p class="code-tip">{this.codeMsg}</p>}
                                </div>
                            </div>
                        </form>
                    </section>
                }
                {
                    <div class="agreement-footer">
                        <button class="btn cancel" onclick={this.handleCloseClick} type="button">
                            取消
                        </button>
                        <button class="btn sure" onclick={this.handleSureClick} type="button">
                            确认
                        </button>
                    </div>
                }
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
section {
    border: 0;
    font-weight: normal;
    display: block;
}
.agreement-wrap {
    background-color: transparent;
    padding-left: 52px;
    padding-right: 52px;
    max-height: 70vh;
    overflow: auto;
    .dividing-line {
        border: 1px solid #ecedf6;
        border-top: none;
    }
    .info-wrapper {
        .user-form {
            .form-item {
                display: flex;
                label {
                    align-self: center;
                }
                .item-val {
                    width: 256px;
                    height: 40px;
                    background-color: white;
                    border: 1px solid rgba(0, 0, 0, 0.15);
                    border-radius: 4px;
                    outline: none;
                    padding-left: 16px;
                    padding-right: 16px;
                    box-sizing: border-box;
                }
                .item-code {
                    width: 328px;
                }
                .btn-code {
                    width: 120px;
                    height: 40px;
                    background: linear-gradient(90deg, #ff6870, #f8323c);
                    border-radius: 4px;
                    color: white;
                    margin-left: 8px;
                }
                .code-tip {
                    font-size: 14px;
                    color: #999999;
                    margin-top: 8px;
                }
                .code-wrapper {
                    display: inline-block;
                    .code-container {
                        display: flex;
                    }
                }
                .code-label {
                    vertical-align: 37px;
                }
            }
        }
    }

    .agreement-footer {
        margin-top: 20px;
        text-align: center;
        .btn {
            width: 160px;
            height: 40px;
            border-radius: 8px;
            border: none;
            outline: none;
        }
        .cancel {
            background: #fff3f3;
            color: #f8323c;
        }
        .sure {
            background: linear-gradient(90deg, #ff6870, #f8323c);
            color: white;
            font-weight: bold;
            margin-left: 40px;
            &[disabled='disabled'] {
                background: gray;
            }
        }
    }
}
</style>
<style lang="less">
.wrap {
    z-index: 3000 !important;
}
</style>
