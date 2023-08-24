<template>
    <!-- 电子发票说明 -->
    <div :class="{ mobile: mobileType, ipod: ipod }">
        <form name="addressForm">
            <div class="contWrap">
                <div class="contTitle">电子发票说明</div>
                <div class="itemWrap">
                    <div class="itemName">发票类型：</div>
                    <div class="itemValue">电子发票</div>
                </div>
                <p class="contExplain">
                    {{ eInvoicepromptinfo }}
                </p>
                <div class="itemWrap">
                    <div class="itemName">订单金额：</div>
                    <div class="itemValue">{{ invoiveInfo.orderPayamount | veMoneyCent }}元</div>
                </div>
                <div class="itemWrap">
                    <div class="itemName">发票抬头：</div>
                    <div class="itemChecks">
                        <div class="itemCheck" :class="{ active: personalSwitch }" @click="personalSwitch = true">个人</div>
                        <div class="itemCheck" :class="{ active: !personalSwitch }" @click="personalSwitch = false">企业</div>
                    </div>
                </div>
                <div class="itemWrap" v-show="personalSwitch">
                    <div class="itemName">个人名称：</div>
                    <input
                        type="text"
                        class="itenInput"
                        name="userName"
                        placeholder="请输入个人真实姓名"
                        v-model="userName"
                        @input="singleCheck({ userName: userName })"
                    />
                </div>
                <div v-show="!personalSwitch">
                    <div class="itemWrap">
                        <div class="itemName">企业名称：</div>
                        <input
                            type="text"
                            class="itenInput"
                            name="companyName"
                            placeholder="请输入企业名称"
                            v-model="companyName"
                            @input="singleCheck({ companyName: companyName })"
                        />
                    </div>
                    <div class="itemWrap userNum">
                        <div class="itemName">纳税人识别号：</div>
                        <input
                            type="text"
                            class="itenInput"
                            name="userNum"
                            placeholder="请输入纳税人识别号"
                            v-model="userNum"
                            @input="singleCheck({ userNum: userNum })"
                        />
                    </div>
                </div>
                <div class="itemWrap">
                    <div class="itemName">发票内容：</div>
                    <div class="itemValue">培训费</div>
                </div>
                <div class="itemWrap">
                    <div class="itemName">邮箱地址：</div>
                    <input
                        type="text"
                        class="itenInput"
                        name="email"
                        placeholder="发票将发送至此邮箱"
                        v-model="email"
                        @input="
                            inputEmail();
                            singleCheck({ email: email });
                        "
                    />
                </div>
                <div class="promit">注：请准确填写个人信息和邮箱地址，如填写错误，后果本人承担！</div>
                <div class="submitButton" :class="{ disabied: invoiveInfo.orderInvoiceapplystatus != 'N' ? true : false }" @click="allCheck()">
                    {{ buttonText }}
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import '@/api/uc/api.OC2017.query-invoice-detail';
import '@/api/uc/api.FD0009.apply-invoice';
import { Validator } from '~/plugins/common/utils/validator';
let errors = {
    userName: {
        required: '请输入个人真实姓名',
    },
    companyName: {
        required: '请输入企业名称',
    },
    userNum: {
        required: '请输入纳税人识别号',
    },
    email: {
        required: '请输入邮箱地址',
        email: '请输入正确的邮箱地址',
    },
};
let rules = {
    userName: 'required',
    companyName: 'required',
    userNum: 'required',
    email: 'required|email',
};
export default {
    name: 'invoiceExplain',
    layout: 'nullLayout',
    data() {
        return {
            personalSwitch: true, //true，个人 false 企业
            orderSourceid: '',
            invoiveInfo: {},
            buttonText: '您的申请已提交，无需重复提交',
            eInvoicepromptinfo: '',

            companyName: '', //企业名称
            userName: '', //个人名称
            userNum: '', //纳税人识别号
            email: '', //邮箱
            mobileType: false,
            ipod: false,
        };
    },
    watch: {
        personalSwitch() {
            if (this.Validator) {
                //切换时候清空校验
                this.Validator.clear();
            }
        },
    },

    mounted() {
        this.orderSourceid = this.$route.query.orderId;
        this.einvoiceDetail();
        this.mobileType = /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent);
        this.ipod = /iPod|iPad/i.test(navigator.userAgent);
        this.Validator = new Validator('addressForm', rules, errors);
    },
    methods: {
        inputEmail() {
            if (this.email && this.email.match(/\s/g)) {
                this.email = this.email.replace(/\s/g, '');
            }
        },
        allCheck() {
            //全部校验
            if (this.invoiveInfo.orderInvoiceapplystatus != 'N') {
                return;
            }
            if (this.invoiveInfo.orderPayamount <= 0) {
                this.$baseUI.alert('订单金额为0，无需申请电子发票');
                return;
            }
            let param = {
                userName: this.userName,
                email: this.email,
            };
            if (!this.personalSwitch) {
                //企业
                param = {
                    companyName: this.companyName,
                    userNum: this.userNum,
                    email: this.email,
                };
            }
            this.Validator.validate(param)
                .then(() => {
                    this.applyInvoice();
                })
                .catch((errorCb) => {
                    errorCb.showError();
                });
        },
        singleCheck() {},
        einvoiceDetail(isTrue) {
            let loadingIntance = this.$baseUI.loading();
            //获取电子发票详情
            this.$niceloo.api.call('uc/query-invoice-detail', {
                orderNo: this.orderSourceid,
                onsuccess: (data) => {
                    this.invoiveInfo = data || {};
                    this.eInvoicepromptinfo = this.invoiveInfo.eInvoicepromptinfo;
                    this.buttonText = this.invoiveInfo.orderInvoiceapplystatus != 'N' ? '您的申请已提交，无需重复提交' : '提交信息';
                    loadingIntance.close();
                    if (isTrue && this.invoiveInfo.orderInvoiceapplystatus != 'N') {
                        this.$router.push('uc/manager/invoice');
                    }
                },
                onerror: (msg) => {
                    loadingIntance.close();
                    this.$baseUI.confirm({
                        title: '提示',
                        content: msg,
                        showCancel: true,
                        cancelText: '取消',
                        confirmText: '确定',
                        confirm: () => {
                            this.$router.push('uc/manager/invoice');
                        },
                    });
                },
                oncomplete: () => {},
            });
        },
        applyInvoice() {
            //申请
            this.$niceloo.api.call('uc/apply-invoice', {
                orderNo: this.invoiveInfo.orderNo, //	订单来源标识
                invoiceType: this.personalSwitch ? 'P' : 'C', //发票抬头类型 P:个人,C:企业
                invoiceTitle: this.personalSwitch ? this.userName : this.companyName, //	发票抬头
                invoiceTin: this.userNum, //纳税人识别号
                invoiceEmail: this.email,
                onsuccess: (data) => {
                    if (data.applyStatus == 'Y') {
                        this.$baseUI.confirm({
                            title: '提示',
                            content: `申请提交成功，发票会开具后会发送您的${this.email}邮箱，请留意查收！`,
                            showCancel: false,
                            confirmText: '确定',
                            confirm: () => {
                                this.einvoiceDetail(true);
                            },
                        });
                    } else {
                        this.$baseUI.alert(data.applyMessage);
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
};
</script>

<style scoped lang="less">
.contWrap {
    width: 690px;
    padding: 15px 10px;
    background: #fff;
    margin: 40px auto;
    .contTitle {
        color: #333;
        font-size: 24px;
        text-align: center;
        font-weight: bold;
        line-height: 70px;
    }
    .itemName {
        width: 128px;
        text-align: right;
    }
    .itemWrap {
        font-size: 18px;
        color: #333;
        line-height: 40px;
        margin-bottom: 20px;
        height: 40px;
        display: flex;
        align-items: center;
        position: relative;
    }
    .userNum {
        margin-top: 30px;
    }
    .itemValue {
        color: #666;
    }
    .contExplain {
        font-size: 16px;
        color: #999;
        line-height: 25px;
        margin: -15px 0 15px;
        text-indent: 2em;
    }
    .itemChecks {
        display: flex;
        border: 1px solid #f02e00;
        border-radius: 4px;
    }
    .itemCheck {
        width: 110px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #f02e00;
        cursor: pointer;
        &.active {
            background: #f02e00;
            color: #fff;
        }
    }
    .itenInput {
        line-height: 38px;
        height: 38px;
        border: 2px solid #f2f2f2;
        padding: 0 10px;
        width: 435px;
        outline: none;
        font-size: 14px;
    }
    .promit {
        font-size: 14px;
        color: #e83828;
        text-align: center;
        line-height: 25px;
        margin: 15px 0 10px;
    }
    .submitButton {
        width: 250px;
        text-align: center;
        line-height: 40px;
        height: 40px;
        margin: 30px auto;
        background: #f02e00;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        border-radius: 4px;
        &.disabied {
            background: #ccc;
            cursor: not-allowed;
        }
    }
}
.mobile {
    .contWrap {
        width: auto;
        padding: 2%;
        margin: 0;
        .contTitle {
            font-size: 1.5rem;
            text-align: center;
            font-weight: bold;
            line-height: 3.125rem;
        }
        .itemWrap {
            font-size: 0.8rem;
            color: #333;
            line-height: 2.1875rem;
            margin-bottom: 0.625rem;
            height: 2.1875rem;
            display: flex;
            align-items: center;
        }
        .userNum {
            margin-top: 1.1rem;
        }
        .itemName {
            width: 27% !important;
        }
        .itemValue {
            color: #666;
        }
        .contExplain {
            font-size: 0.875rem;
            line-height: 1.5625rem;
            margin: -0.625rem 0 0.3125rem;
            width: 93%;
        }

        .itemChecks {
            display: flex;
            border: 1px solid #f02e00;
            border-radius: 4px;
        }
        .itemCheck {
            width: 5rem;
            height: 2.1875rem;
            line-height: 2.1875rem;
        }
        .itenInput {
            line-height: 2.0625rem;
            height: 2.0625rem;
            border: 0.125rem solid #f2f2f2;
            padding: 0 0.3125rem;
            width: 65%;
            font-size: 0.875rem;
        }
        .promit {
            line-height: 1.5625rem;
            font-size: 0.875rem;
            width: 95%;
        }
        .submitButton {
            width: 90%;
            height: 2.5rem;
            line-height: 2.5rem;
            margin: 1.5625rem auto;
            font-size: 1rem;
            cursor: pointer;
            &.disabied {
                background: #ccc;
                cursor: not-allowed;
            }
        }
    }
}
.ipod {
    .contExplain {
        width: 82% !important;
        margin: -0.625rem auto 0.3125rem !important;
    }
}
</style>
<style lang="less" scoped>
/deep/._errorMessage {
    position: absolute;
    left: 128px;
    top: 33px;
}
.mobile {
    /deep/._errorMessage {
        left: 27%;
        top: 1.7rem;
        font-size: 0.6rem !important;
    }
}
</style>
