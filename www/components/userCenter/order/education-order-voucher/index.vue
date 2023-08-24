<script lang="jsx">
import 'core-js/features/array/at';
import 'core-js/actual/structured-clone';
import '@/api/uc/api.UC0206.query-order-rank-dict.js';
import '@/api/mc/api.MC0027.query-sms-verifycode-by-token.js';
import '@/api/mc/api.MC0002.verify-sms-verifycode.js';
import '@/api/uc/api.UC0018.bind-user-identify.js';
import '@/api/uc/api.OC2012.confirm-userInfo.js';
import '@/api/edu/api..query-eduordering-student-preview.js';
import '@/api/edu/api..update-student-setconfirm-get.js';

import * as PDFJS from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { Validator } from '~/plugins/common/utils/validator.js';
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// PDFJS.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.js';
export default {
    props: {
        order: {
            type: Object,
            default: () => ({}),
        },
        type: {
            type: String,
            default: 'see',
        },
        receiptUrl: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            userInfo: {
                userIdcardtype: '',
                userIdcard: '',
                userName: '',
            },
            idTypeList: [],
            verifyValue: '',
            drawee: '',
            draweeList: [],
            isRead: false,
            codeMsg: '',
            seconds: 60,
            btnText: '获取确认码',
            payerRelationship: '',
            previewUrl: '',
            currentPage: 1,
            isAudit: false,
            temp: null,
        };
    },
    watch: {
        drawee(newV) {
            if (newV === 'OT' || newV === 'OO') {
                this.validator && this.validator.changeRules({ payerRelationship: 'required' });
            } else {
                this.validator && this.validator.changeRules({ payerRelationship: 'required|I' });
            }
        },
    },
    mounted() {
        if (this.type === 'confirm') {
            this.initData();
        } else {
            this.previewUrl = this.receiptUrl;
            this.initPdf();
        }
    },
    beforeDestroy() {
        clearTimeout(this.timer);
    },
    methods: {
        getRatio(ctx) {
            const dpr = window.devicePixelRatio || 1;
            const bsr =
                ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio ||
                1;

            return dpr / bsr;
        },
        initPdf() {
            PDFJS.getDocument(this.previewUrl)
                .promise.then((pdf) => {
                    this.pdfDoc = pdf;
                    this.totalPage = pdf.numPages;
                    this.$nextTick(this.renderPage);
                })
                .catch((err) => {
                    console.warn('initPdf', err);
                });
        },
        renderPage() {
            this.pdfDoc.getPage(this.currentPage).then((page) => {
                let canvas = document.querySelector('#pdfCanvas');
                let ctx = canvas.getContext('2d');
                let ratio = this.getRatio(ctx);

                let dialogWidth = 740;
                let pageWidth = page.view[2] * ratio;
                let scale = dialogWidth / pageWidth;

                let viewport = page.getViewport({ scale });

                this.width = viewport.width * ratio;
                this.height = viewport.height * ratio;

                canvas.width = this.width;
                canvas.height = this.height;

                ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

                page.render({
                    canvasContext: ctx,
                    viewport,
                }).promise.then(() => {});
            });
        },
        initData() {
            this.rules = {
                isRead: 'required',
                payerRelationship: 'required',
                idNum: 'required|I',
                name: 'required|name',
                verifyValue: 'required|I',
            };
            this.errors = {
                idNum: {
                    required: '请输入正确的证件号码',
                    I: '请输入正确的证件号码',
                    H: '请输入正确的证件号码',
                    T: '请输入正确的证件号码',
                    O: '请输入正确的证件号码',
                },
                payerRelationship: {
                    required: '请填写付款人与本人关系',
                },
                isRead: {
                    required: '请阅读并勾选填写须知',
                },
                name: {
                    required: '请输入正确的姓名',
                    name: '请输入正确的姓名',
                },
                verifyValue: {
                    required: '请输入协议确认码',
                    I: '协议确认码有误，请重新校验',
                },
            };

            this.getIdTypes();
            this.getDrawee();
            this.getPreviewUrl();

            this.$User.getUser().then((user) => {
                this.user = user;
                this.userInfo.userName = this.user.userName;
                this.userInfo.userIdcard = '';
                // this.isAudit = this.user.userIdcardstatus === 'S';
                this.validator = new Validator('improveForm', this.rules, this.errors);
            });
        },
        getPreviewUrl() {
            this.$callApi('edu/query-eduordering-student-preview', {
                id: this.order.orderId,
            })
                .then((res) => res.getData())
                .then((data) => {
                    this.previewUrl = this.$urlUtils.getViewUrl(data);
                    this.initPdf();
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        getIdTypes() {
            this.$callApi('uc/query-order-rank-dict', {
                dicttype: 'idcard',
            })
                .then((res) => res.getData())
                .then(({ data = [] }) => {
                    this.idTypeList.splice(0, this.idTypeList.length, ...data.filter((item) => item.dictVal === 'I'));
                    this.userInfo.userIdcardtype = 'I';
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        getDrawee() {
            this.$callApi('uc/query-order-rank-dict', {
                dicttype: 'drawee',
            })
                .then((res) => res.getData())
                .then(({ data = [] }) => {
                    this.draweeList.splice(0, this.draweeList.length, ...data.filter((item) => item.dictCode === 'OS'));
                    this.drawee = 'OS';
                })
                .catch(this.$niceloo.api.handleFailure);
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
                isRead: this.isRead,
                verifyValue: this.verifyValue,
            };
            this.loadingIntance = this.$baseUI.loading();
            if (this.drawee === 'OT' || this.drawee === 'OO') {
                param.payerRelationship = this.payerRelationship;
            }
            Promise.resolve(this.user)
                .then((user) => {
                    if (!user) {
                        return this.$User.getUser().then((user) => (this.user = user));
                    }
                })
                .then(() => {
                    param.name = this.userInfo.userName;
                    param.idNum = this.userInfo.userIdcard;

                    this.validator
                        .validate(param)
                        .then(() => {
                            this.validBaseInfo()
                                .then(() => {
                                    return this.perfectUserInfo();
                                })
                                .then(() => {
                                    this.handleCloseClick('click');
                                })
                                .catch(this.$niceloo.api.handleFailure)
                                .finally(() => {
                                    this.loadingIntance.close();
                                });
                        })
                        .catch((err) => {
                            console.warn(err);
                            this.loadingIntance.close();
                            err.showError();
                        });
                });
        },
        async getMsgCode() {
            const user = await ylPlugin.login.getUser();
            this.user = user;
            return this.$callApi('public/query-sms-verifycode-by-token', {
                smstplNo: 'SIGN-AGREEMENT-VERIFY', // 010005
                scene: 'SIGN-AGREEMENT-VERIFY',
            })
                .then((res) => res.getData())
                .then(() => {
                    const regStr = this.user.userMobile.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
                    this.codeMsg = `确认码将发送至${regStr}，请注意查收`;
                    this.countDown();
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        countDown() {
            this.seconds--;
            this.btnText = this.seconds + '秒后重新发送';
            if (this.seconds <= 0) {
                this.btnText = '获取确认码';
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
                verifyScene: 'SIGN-AGREEMENT-VERIFY',
                verifyValue: this.verifyValue,
            })
                .then((res) => res.getData())
                .then(() => {
                    this.validator.changeRules({ verifyValue: 'required' });
                })
                .catch((err) => {
                    this.validator.changeRules({ verifyValue: 'required|I' });
                    this.$niceloo.api.handleFailure(err);
                })
                .finally(() => {
                    this.validator.validate({ verifyValue: this.verifyValue });
                });
        },
        perfectUserInfo() {
            return this.$callApi('edu/update-student-setconfirm-get', {
                id: this.order.orderId,
            });
        },
        validBaseInfo() {
            return this.$callApi('edu/user-idcard-identify-name-valid', {
                userIdcardtype: this.userInfo.userIdcardtype,
                userIdcard: this.userInfo.userIdcard,
                userName: this.userInfo.userName,
            })
                .then(() => {
                    this.user.userIdcardstatus = this.userInfo.userIdcardtype;
                    this.user.userIdcard = this.userInfo.userIdcard;
                    this.user.userName = this.userInfo.userName;
                    this.$User.setUser(this.user);
                })
                .catch(() => {
                    this.$baseUI.alert('您的信息有误，确认电子凭证需姓名、身份证号码、手机号码所属人实名信息一致，请重新填写或联系课程老师确认！');
                    return Promise.reject();
                });
        },
    },
    render() {
        return (
            <div class="agreement-wrap">
                <canvas id="pdfCanvas"></canvas>
                {this.type === 'confirm' && <hr class="dividing-line" />}
                {this.type === 'confirm' && (
                    <section class="info-wrapper">
                        <h4 class="title">完善个人信息</h4>
                        <section class="notice-wrapper">
                            <h5 class="notice-title">填写须知:</h5>
                            <ul>
                                <li>下述信息必须由学习优路课程的学员本人(简称“您”)如实填写；</li>
                                <li>姓名和证件号码是您与优路签订协议、享有协议约定的权利及各项服务的唯一身份证明；</li>
                                <li>由于信息填写错误导致的不利后果由您承担。</li>
                                <li>签署过程中有问题可联系课程老师或拨打0371-53609200</li>
                            </ul>
                        </section>
                        <form class="user-form" name="improveForm">
                            <div class="form-item">
                                <label for="userIdcardtype">证&nbsp;件&nbsp;类&nbsp;型：</label>
                                <select id="userIdcardtype" v-model={this.userInfo.userIdcardtype} class="item-val">
                                    {this.idTypeList.map((item) => {
                                        return <option value={item.dictVal}>{item.dictName}</option>;
                                    })}
                                </select>
                            </div>
                            <div class="form-item">
                                <label for="userName">真&nbsp;实&nbsp;姓&nbsp;名：</label>
                                <div>
                                    <input id="userName" v-model={this.userInfo.userName} placeholder="请输入证件姓名" class="item-val" name="name" />
                                </div>
                            </div>
                            <div class="form-item">
                                <label for="userIdcard">证&nbsp;件&nbsp;号&nbsp;码：</label>
                                <div>
                                    <input id="userIdcard" v-model={this.userInfo.userIdcard} placeholder="请输入证件号码" class="item-val" name="idNum" />
                                </div>
                            </div>
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
                                        <button class="btn-code" onclick={this.handleCodeClick} type="button" disabled={this.btnText !== '获取确认码'}>
                                            {this.btnText}
                                        </button>
                                    </div>
                                    {this.codeMsg && <p class="code-tip">{this.codeMsg}</p>}
                                </div>
                            </div>
                            <div class="form-item">
                                <label for="drawee">付&emsp;款&emsp;人：</label>
                                <select id="drawee" v-model={this.drawee} class="item-val">
                                    {this.draweeList.map((item) => {
                                        return <option value={item.dictCode}>{item.dictName}</option>;
                                    })}
                                </select>
                            </div>
                            <div class="form-item" style={this.drawee === 'OT' || this.drawee === 'OO' ? 'display: flex' : 'display:none'}>
                                <label for="payerRelationship">
                                    付款人与本
                                    <br />
                                    &emsp;人的关系：
                                </label>
                                <div>
                                    <input
                                        id="payerRelationship"
                                        name="payerRelationship"
                                        v-model={this.payerRelationship}
                                        placeholder="请输入付款人与本人的关系："
                                        class="item-val item-relation"
                                    />
                                </div>
                            </div>
                            <p class="read-declaration">
                                <div class="declaration-wrapper">
                                    <input id="cbox2" type="checkbox" value="" v-model={this.isRead} />
                                    <label for="cbox2" name="isRead">
                                        我是学习课程的学员本人，我已阅读并理解《填写须知》，并如实填写以上信息
                                    </label>
                                </div>
                            </p>
                        </form>
                    </section>
                )}
                {this.type === 'confirm' && (
                    <div class="agreement-footer">
                        <button class="btn cancel" onclick={this.handleCloseClick} type="button">
                            取消
                        </button>
                        <button class="btn sure" onclick={this.handleSureClick} type="button">
                            确认电子收据凭证
                        </button>
                    </div>
                )}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
h4,
h5,
canvas,
section {
    border: 0;
    font-weight: normal;
}
section {
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
        margin-top: 24px;
        .title {
            font-size: 14px;
            font-weight: bold;
            color: #3a3d4b;
        }
        .notice-wrapper {
            margin-top: 16px;
            font-size: 12px;
            color: #3a3d4b;
            ul {
                list-style: decimal;
                padding-left: 15px;
                li {
                    list-style: decimal;
                    line-height: 18px;
                    margin-top: 10px;
                }
            }
        }
        .user-form {
            margin-top: 24px;
            .form-item + .form-item {
                margin-top: 12px;
            }
            .form-item {
                display: flex;
                label {
                    align-self: center;
                }
                .item-val {
                    width: 656px;
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
                    width: 528px;
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

    .agreement-content {
        margin: 0 auto;
    }
    .read-declaration {
        margin-top: 40px;
        text-align: center;
        font-size: 14px;
        color: #9698a2;
        #cbox2 {
            margin-right: 8px;
        }
        .declaration-wrapper {
            display: inline-block;
            /deep/._errorMessage {
                text-align: left;
                padding-left: 20px;
            }
        }
    }
}
.agreement-bottom {
    margin: 0 auto;
    margin-top: 16px;
    width: 56px;
    height: 56px;
    cursor: pointer;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>
<style lang="less">
.wrap {
    z-index: 3000 !important;
}
</style>
