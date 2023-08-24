<template>
    <!-- 完善个人信息 确认个人信息-->
    <div>
        <vb-mask :show="show">
            <form name="improveForm">
                <div class="improveWrap">
                    <div class="improveTitle">{{ editShow ? `完善个人信息` : `确认个人信息` }}</div>
                    <div class="className" v-if="choseItem.className">{{ choseItem.className }}</div>
                    <div class="close" @click="close"></div>
                    <div class="writeNotice">
                        <p>填写须知:</p>
                        <p>1. 下述信息必须由学习优路课程的学员本人(简称“您”)如实填写；</p>
                        <p>2. 姓名和证件号码是您与优路签订协议、享有协议约定的权利及各项服务的唯一身份证明；</p>
                        <p>3. 由于信息填写错误导致的不利后果由您承担。</p>
                        <p v-if="paidDetails.classOrderSubType !== 'YAN'">4. 签署过程中有问题可联系课程老师或拨打0371-53609200</p>
                    </div>
                    <div class="inputWrap">
                        <!-- I:身份证;H:;T: -->
                        <div class="inputClass">证件类型：</div>
                        <select class="inputCont" name="" id="" v-model="userInfo.userIdcardtype" v-show="editShow">
                            <option :value="item.dictVal" v-for="item in idtypeList" :key="item.a">{{ item.dictName }}</option>
                        </select>
                        <div class="conts" v-show="!editShow">{{ userIdcardtype(userInfo.userIdcardtype) }}</div>
                    </div>
                    <div class="inputWrap">
                        <div class="inputClass">证件号码：</div>
                        <input
                            class="inputCont"
                            name="idNum"
                            type="text"
                            placeholder="请填写证件号码"
                            v-model="userInfo.userIdcard"
                            v-show="editShow"
                            @input="singleCheck({ idNum: userInfo.userIdcard })"
                        />
                        <div class="conts" v-show="!editShow">{{ userInfo.userIdcard }}</div>
                        <span class="btn-txt" @click="showDialog" v-if="!editShow && showIdCardFull === false">查看完整信息</span>
                    </div>
                    <!-- <div style="background-color: #ccc; margin: 0 auto; padding: 30px 0">
                        <id-card-check />
                    </div> -->
                    <div class="inputWrap">
                        <div class="inputClass">真实姓名：</div>
                        <input
                            class="inputCont"
                            name="name"
                            type="text"
                            placeholder="请填写身份证上姓名"
                            v-model="userInfo.userName"
                            v-show="editShow"
                            @input="singleCheck({ name: userInfo.userName })"
                        />
                        <div class="conts" v-show="!editShow">{{ userInfo.userName }}</div>
                    </div>
                    <div class="inputWrap" v-show="isShowVerify">
                        <div class="inputClass">图形验证码：</div>
                        <div class="msg-code">
                            <input
                                class="inputCont confirmation-code captcha-value"
                                name="captchaValue"
                                aotucomplete="off"
                                type="text"
                                placeholder="请输入图形验证码"
                                v-model="captchaValue"
                            />
                            <img :src="imgSrc" class="img-captcha" @click="getCaptchaToken()" />
                        </div>
                    </div>
                    <div class="inputWrap" v-show="isShowVerify">
                        <div class="inputClass">协议确认码：</div>
                        <div class="msg-code">
                            <input
                                class="inputCont confirmation-code"
                                @change="verifyMsgCode"
                                aotucomplete="off"
                                name="verifyValue"
                                type="text"
                                :placeholder="placeholder"
                                v-model="verifyValue"
                            />
                            <span v-if="seconds == 60" @click="getMsgCode" class="btn-text">{{ btnText }}</span>
                            <span v-else class="btn-text">{{ btnText }}</span>
                        </div>
                    </div>
                    <div class="msgInputWrap" v-if="isSend">
                        <p class="tip-msg">{{ tipMsg }}</p>
                    </div>
                    <div class="inputWrap">
                        <label class="inputClass">付款人：</label>
                        <select class="inputCont" name="" v-model="drawee">
                            <option :value="item.dictCode" v-for="item in draweeList" :key="item.a">{{ item.dictName }}</option>
                        </select>
                    </div>
                    <div class="inputWrap payerRelationship" v-show="drawee == 'OT' || drawee == 'OO'">
                        <div class="inputClass">付款人与本人的关系：</div>
                        <input
                            class="inputCont"
                            name="payerRelationship"
                            maxlength="20"
                            type="text"
                            placeholder="请填写付款人与本人的关系"
                            v-model="payerRelationship"
                            @input="singleCheck({ payerRelationship })"
                        />
                    </div>
                    <!-- 重读须知 -->
                    <div class="promit" v-if="stressPromit && paidDetails.classOrderSubType !== 'YAN'">
                        <div class="tit">续学须知：</div>
                        <p>1、续学课程应仅限您本人学习使用；</p>
                        <p>2、续学课程自续学班级对应批次考试结束之日下线；</p>
                        <p>3、除开通续学课程外,您无权要求优路承担其他任何责任；</p>
                        <p style="line-height: 40px" v-if="!editShow">如果此处非报考人信息，请联系课程老师或致电：0371-53609200；</p>
                    </div>

                    <div class="prot" v-if="!showInstructions">
                        <span class="name">延考续学：</span>
                        鉴于考试组织部门取消原订单班级对应的考试，您与优路协商延长原协议产品服务期，具体内容可点击查看《
                        <span class="agreement" @click="doShowArgument">延考续学补充协议</span>
                        》
                    </div>

                    <p class="prot" v-if="!stressPromit && !editShow && paidDetails.classOrderSubType !== 'YAN'">
                        如果此处非报考人信息，请联系课程老师或致电：0371-53609200
                    </p>
                    <div
                        v-if="showInstructions"
                        class="noticeConfirm"
                        @click="
                            noticed = !noticed;
                            singleCheck({ noticed: noticed });
                        "
                    >
                        <span class="read" :class="{ active: noticed }"></span>
                        <span name="noticed">我是学习课程的学员本人，我已阅读并理解《填写须知》，并如实填写以上信息。</span>
                    </div>
                    <div
                        v-if="!showInstructions"
                        class="noticeConfirm"
                        @click="
                            noticed = !noticed;
                            singleCheck({ noticed: noticed });
                        "
                    >
                        <span class="read" :class="{ active: noticed }"></span>
                        <span name="noticed">我是学习课程的学员本人，我已阅读并同意《延考续学补充协议》，已阅读并理解《填写须知》，并如实填写以上信息。</span>
                    </div>
                    <p class="prot yan-tip" v-if="paidDetails.classOrderSubType === 'YAN' && paidDetails.orderSubtype == 'REP'">
                        如果此处非报考人信息，请联系课程老师或致电：0371-53609200
                    </p>
                    <div class="submitButton" @click="allCheck()">{{ editShow ? '提交' : '确认' }}</div>
                    <!-- <div class="stressPromit" v-show='stressPromit'>重读的课程已经开通，重读的期限到本课程下线结束，到期后您不在享受其他服务！</div> -->
                    <!-- <div class="stressPromit" v-show='!editShow'>如果此处显示的并非您的个人信息，请致电：0371-53609200</div> -->
                </div>
            </form>
        </vb-mask>

        <agreement-purchase
            v-if="showArgument"
            class="agreement-purchase"
            ref="agreementPurchase"
            :show="showArgument"
            :download-show="false"
            @confirm-fn="confirmFn"
            @close-fn="closeFn"
            :deal-lists="dealLists"
            :is-show-footer="showFooter"
        />
    </div>
</template>

<script>
import '@/api/etc/api..query-readingAgr-find-man-reading'; //是否具有强制弹出协议
import '@/api/uc/api.OC2002.query-order-detail';
import '@/api/uc/api.UC0206.query-order-rank-dict';
import '@/api/uc/api.UC0018.bind-user-identify';
import '@/api/uc/api.OC2012.confirm-userInfo';
import '@/api/mc/api.MC0027.query-sms-verifycode-by-token.js'; //发送验证码
import '@/api/mc/api.MC0002.verify-sms-verifycode'; //确认验证码
import '@/api/oc/api.OC2014.query-class-signstatus.js'; // 接口-已付款班级协议签收信息
import agreementPurchase from '../agreementPurchase/index.vue'; // 协议展示
import { Validator } from '~/plugins/common/utils/validator.js';
import vbMask from '@/www/components/vbMask/index.vue';
import IdCardCheck from '@/www/components/uc/manager/order/id-card-check/index.vue';
import IdCardPhone from '@/www/components/uc/manager/order/id-card-phone/index.vue';
import '@/api/uc/api..create-captcha.js';
// import User from '@/utils/user';
const errors = {
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
    noticed: {
        required: '请阅读并勾选阅读须知',
    },
    name: {
        required: '请输入正确的姓名',
        name: '请输入正确的姓名',
    },
    verifyValue: {
        required: '请输入协议确认码',
        I: '协议确认码有误，请重新校验',
    },
    captchaValue: {
        required: '请输入图形验证码',
    },
};
const rules = {
    noticed: 'required',
    payerRelationship: 'required',
    idNum: 'required|I',
    name: 'required|name',
    verifyValue: 'required|I',
    captchaValue: 'required',
};
export default {
    name: 'order',
    components: {
        vbMask,
        agreementPurchase,
    },
    props: {},
    data() {
        return {
            showFooter: false,
            isHadRead: false,
            paidDetails: {
                orderSubtype: '',
                classOrderSubType: '',
                orderItems: [],
                orderNo: '',
                sourceSkuName: '',
                sourceAgreement: '',
                sourceSkuId: '',
                orderAgreement: {
                    agreementNeedconfirmstatus: '',
                    agreementStatus: '',
                },
            },
            orderInfo: {
                orderSubtype: '',
                classOrderSubType: '',
                orderItems: [],
                orderNo: '',
                sourceSkuName: '',
                sourceAgreement: '',
                sourceSkuId: '',
                orderAgreement: {
                    agreementNeedconfirmstatus: '',
                    agreementStatus: '',
                },
            }, // 传入组件中的订单信息
            showArgument: false,
            dealLists: [],
            show: false,
            noticed: false,
            userInfo: {},
            getInfo: {}, //从接口获取的数据
            stressPromit: false, //是否重读类型
            choseItem: {},
            editShow: true, //完善 false确认
            idtypeList: [],
            draweeList: [], //付款人信息
            drawee: 'OS', //默认本人
            payerRelationship: '', //预付款人关系
            isSend: false, //是否发送短信验证码
            verifyValue: '', //验证码
            verifyToken: '', //校验凭证
            btnText: '获取确认码',
            tipMsg: '',
            placeholder: '请获取验证码并输入',
            seconds: 60,
            isVerify: false, //校验是否通过
            isShowVerify: false,
            timer: null,
            loadingIntance: null,
            userIdcardtypeMap: {},
            showIdCardFull: false,
            captchaValue: '', //图形验证码
            captchaToken: '', //图形验证码token
            imgSrc: '', //图形验证码路径
        };
    },
    computed: {
        showInstructions() {
            // 是否显示 填写须知
            if (this.paidDetails.orderSubtype === 'REP' && this.paidDetails.classOrderSubType === 'YAN') {
                // 重读里面的延考续学
                if (this.paidDetails.orderAgreement.agreementNeedconfirmstatus === 'N') {
                    // 不需要协议确认
                    return true;
                }
                return false;
            }
            return true;
        },
    },
    watch: {
        drawee() {
            this.payerRelationship = '';
        },
        'userInfo.userIdcardtype'(type) {
            if (this.Validator) {
                if (this.editShow) {
                    this.Validator.changeRules({ idNum: 'required|' + type || 'I' }); //传入新的校验规则
                }
            }
        },
        show(val) {
            if (val === false) {
                this.getCaptchaToken();
            }
        },
    },
    async mounted() {
        this.getInfo = (await this.$User.getUser()) || {};
        this.Validator = new Validator('improveForm', rules, errors);
        this.getIdTyes();
        this.getDrawee(); //付款人信息
        this.getCaptchaToken();
    },
    methods: {
        userIdcardtype(str) {
            return this.userIdcardtypeMap[str] || str;
        },
        showDialog() {
            this.$baseUI
                .createModel(
                    {
                        modalContent: IdCardCheck,
                    },
                    {},
                    {
                        width: '360px',
                        radius: '10px',
                        padding: '0',
                        showHead: false,
                    }
                )
                .then((obj) => {
                    if (obj.ret.type === 'success') {
                        this.userInfo.userIdcard = obj.ret.idCard;
                        this.showIdCardFull = true;
                    } else if (obj.ret.type === 'change') {
                        this.showDialogPhone();
                    }
                });
        },
        showDialogPhone() {
            this.$baseUI
                .createModel(
                    {
                        modalContent: IdCardPhone,
                    },
                    {},
                    {
                        width: '360px',
                        radius: '10px',
                        padding: '0',
                        showHead: false,
                    }
                )
                .then((obj) => {
                    if (obj.ret.type === 'success') {
                        this.showIdCardFull = true;
                        this.userInfo.userIdcard = obj.ret.idCard;
                    }
                });
        },
        doShowArgument() {
            this.showArgument = true;
            this.showFooter = false;
            this.dealLists.push(this.paidDetails.orderItems[0]);
            this.$nextTick(() => {
                this.$refs.agreementPurchase.open(this.paidDetails.orderItems[0], this.paidDetails.orderNo);
            });
        },
        closeFn() {
            this.showArgument = false;
            this.dealLists = [];
        },
        confirmFn() {
            this.showArgument = false;
            this.dealLists = [];

            this.noticed = true;
            this.isHadRead = false;
            this.dealList = [];
            this.showFooter = false;
        },
        getIdTyes() {
            if (sessionStorage.getItem('idcard')) {
                this.idtypeList = JSON.parse(sessionStorage.getItem('idcard'));
                this.idtypeList.forEach((item) => {
                    this.userIdcardtypeMap[item.dictCode] = item.dictName;
                });
            } else {
                //获取证件类型
                this.$niceloo.api.call('uc/query-order-rank-dict', {
                    dicttype: 'idcard',
                    onsuccess: (data) => {
                        this.idtypeList = data.data || [];
                        if (data.data.length) {
                            sessionStorage.setItem('idcard', JSON.stringify(this.idtypeList));
                        }
                        this.idtypeList.forEach((item) => {
                            this.userIdcardtypeMap[item.dictCode] = item.dictName;
                        });
                    },
                    onerror: this.$niceloo.api.handleFailure,
                });
            }
        },
        getDrawee() {
            //获取收款人 列表
            if (sessionStorage.getItem('drawee')) {
                this.draweeList = JSON.parse(sessionStorage.getItem('drawee'));
            } else {
                //获取证件类型
                this.$niceloo.api.call('uc/query-order-rank-dict', {
                    dicttype: 'drawee',
                    onsuccess: (data) => {
                        this.draweeList = data.data || [];
                        if (data.data.length) {
                            sessionStorage.setItem('drawee', JSON.stringify(this.draweeList));
                        }
                    },
                    onerror: this.$niceloo.api.handleFailure,
                });
            }
        },
        allCheck() {
            let param = {
                noticed: this.noticed,
                verifyValue: this.verifyValue,
            };
            this.loadingIntance = this.$baseUI.loading();
            if (this.drawee == 'OT' || this.drawee == 'OO') {
                //付款人关系其他也要校验
                param = {
                    ...param,
                    payerRelationship: this.payerRelationship,
                };
            }
            if (this.editShow) {
                //完善多校验两个参数
                param = {
                    ...param,
                    name: this.userInfo.userName,
                    idNum: this.userInfo.userIdcard,
                };
                // this.perfectUnserInfo();
                // return;
            }
            //判断短信校验是否通过
            // if (!this.isVerify) {
            //     return;
            // }
            this.Validator.validate(param)
                .then(() => {
                    if (this.editShow) {
                        //完善多调个接口
                        this.bindUserInfo();
                    } else {
                        this.perfectUnserInfo();
                    }
                })
                .catch((errorCb) => {
                    this.loadingIntance.close();
                    errorCb.showError();
                });
        },
        singleCheck(param) {
            if (!this.Validator) {
                return;
            }
            this.Validator.validate(param)
                .then(() => {})
                .catch((errorCb) => {
                    //  let arr=Object.keys(param)||[];
                    //  if(arr.length>0){
                    //      errorCb.showError(arr[0]);//展示错误提示，如果只展示某个提示，传入对应的值errorCb.showError('name')
                    //  }
                });
        },
        async open(item) {
            this.loadingIntance && this.loadingIntance.close();
            this.loadingIntance = this.$baseUI.loading();
            this.orderInfo = item;
            let id = item.classId || item.orderItems[0].skuId;
            this.showIdCardFull = false;
            this.getInfo = (await this.$User.getUser()) || {};
            await this.queryConfirmStatus(id);

            this.userInfo = { ...this.getInfo };
            this.userInfo.userIdcardtype = this.userInfo.userIdcardtype || 'I';
            this.choseItem = item || {};
            this.editShow = this.userInfo.userIdcardstatus != 'S'; //未实名认证的显示修改

            this.stressPromit = item.orderSubtype == 'REP'; //班级订单子类型(GEN:正常;REP:重读;TRA:转让;CHA:转班;REF:退费DEF:顺延;GIV:赠课)
            this.show = true;
            this.$baseUI.loading.closeAll();
            // this.loadingIntance.close();
            this.noticed = false;
            this.isSend = false;
            this.tipMsg = '';
            this.btnText = '获取验证码';
            this.isVerify = false;
            this.seconds = 60;
            this.verifyValue = '';
            this.captchaValue = '';
            this.Validator.clear();
            if (this.editShow) {
                //完善信息默认清空数据（老数据带有名称）
                this.userInfo.userName = '';
                this.userInfo.userIdcard = '';
            } else {
                this.Validator.changeRules({ idNum: '' });
                this.Validator.changeRules({ name: '' });
            }
        },
        close() {
            clearTimeout(this.timer);
            this.show = false;
        },
        bindUserInfo() {
            //绑定个人信息 如果是完善，先调这个接口
            this.$niceloo.api.call('uc/bind-user-identify', {
                userIdcardtype: this.userInfo.userIdcardtype,
                userIdcard: this.userInfo.userIdcard,
                userName: this.userInfo.userName,
                onsuccess: () => {
                    this.perfectUnserInfo(() => {
                        this.$emit('bindSuccess', true); //首次认证成功
                        this.$baseUI.loading.closeAll();
                    });
                },
                onerror: (err) => {
                    this.$baseUI.loading.closeAll();
                    this.$niceloo.api.handleFailure(err);
                },
            });
        },
        perfectUnserInfo(cb) {
            //完善个人信息  确认个人信息
            let _this = this;
            let confirmedOrderitemids = [];
            this.choseItem.orderItems.forEach((val) => {
                if (val.orderitemStatus === 'GEND' || val.orderitemStatus === 'REPD' || val.orderitemStatus === 'CHAD') {
                    //正常班级
                    confirmedOrderitemids.push(val.oiId);
                }
            });
            this.$niceloo.api.call('uc/confirm-userInfo', {
                // ..._this.userInfo,
                orderNo: _this.choseItem.orderNo,
                userinfoConfirmstatus: 'Y', //学员个人信息确认状态
                confirmedOrderitemids, //订单项Id列表
                orderPayer: _this.drawee, //付款人
                payerRelationship: _this.payerRelationship, //与付款人关系
                onsuccess: () => {
                    clearTimeout(_this.timer);
                    _this.show = false;
                    this.$User.updateUserInfo().then(async () => {
                        _this.getInfo = (await this.$User.getUser()) || {};
                        _this.$emit('bindSuccess'); //true完善 false确认
                    });
                    cb && cb();
                    this.loadingIntance.close();
                },
                onerror: (err) => {
                    this.loadingIntance.close();
                    this.$niceloo.api.handleFailure(err);
                },
            });
        },
        //获取验证码
        getMsgCode() {
            if (this.isSend) return;
            this.Validator.clear();
            let param = {
                captchaValue: this.captchaValue,
            };
            this.isSend = true;
            this.Validator.validate(param)
                .then(() => {
                    let params = {
                        smstplNo: '010005',
                        scene: 'xieyiqueren',
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
                            this.isVerify = false;
                            this.countDown();
                        })
                        .catch((err) => {
                            if (err.getCode().includes('GB2009')) {
                                this.$baseUI.alert('图形验证码有误，请重新输入');
                            } else {
                                this.$niceloo.api.handleFailure(err);
                            }
                            this.isSend = false;
                            this.captchaValue = '';
                            this.getCaptchaToken();
                        });
                })
                .catch((errorCb) => {
                    this.isSend = false;
                    errorCb.showError('captchaValue');
                });
        },
        //校验验证码
        verifyMsgCode() {
            if (this.verifyValue) {
                this.$callApi('xieyiqueren/verify-sms-verifycode', {
                    verifyScene: 'xieyiqueren',
                    verifyValue: this.verifyValue,
                    onsuccess: (res) => {
                        this.verifyToken = res.verifyToken;
                        this.Validator.changeRules({ verifyValue: 'required' });
                        this.isVerify = true;
                    },
                    onerror: (err) => {
                        this.Validator.changeRules({ verifyValue: 'required|I' });
                        this.$niceloo.api.handleFailure(err);
                    },
                    oncomplete: () => {},
                });
            }
        },
        countDown() {
            this.isSend = true;
            this.placeholder = '请输入确认码';
            this.seconds--;
            this.btnText = this.seconds + '秒后重新发送';
            let regStr = this.getInfo.userMobile.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
            this.tipMsg = `确认码将发送至${regStr}，请注意查收`;
            if (this.seconds == 0) {
                this.btnText = '获取确认码';
                this.seconds = 60;
                this.captchaValue = '';
                this.isSend = false;
                this.getCaptchaToken();
                return;
            }
            this.timer = setTimeout(this.countDown, 1000);
        },
        queryConfirmStatus(id) {
            return this.getOrderInfo()
                .then(() => {
                    // 需要确认协议
                    if (this.paidDetails.orderAgreement.agreementNeedconfirmstatus === 'Y') {
                        this.isShowVerify = true;
                    } else {
                        this.isShowVerify = false;
                        this.Validator.changeRules({ verifyValue: '' });
                    }
                })
                .then(() => {
                    if (this.paidDetails.orderSubtype === 'REP' && this.paidDetails.classOrderSubType === 'YAN' && this.paidDetails.sourceAgreement === 'N') {
                        this.$baseUI.loading.closeAll();
                        this.$baseUI
                            .alert(`请先去签署${this.paidDetails.sourceSkuName}班级对应协议或联系课程顾问老师`, '提示', {
                                confirmText: '我知道了',
                            })
                            .then((r) => {
                                this.close();
                                this.$emit('learncenter-mycourse');
                            });

                        return Promise.reject();
                    }
                    if (
                        this.paidDetails.orderSubtype === 'REP' &&
                        this.paidDetails.classOrderSubType === 'YAN' &&
                        this.paidDetails.orderAgreement.agreementNeedconfirmstatus === 'Y'
                    ) {
                        this.$baseUI.loading.closeAll();
                        return this.checkforceArgument();
                    }
                    return '';
                });
        },
        getOrderInfo() {
            return new Promise((resolve) => {
                this.$callApi('uc/query-order-detail', {
                    orderNo: this.orderInfo.orderNo,
                    onsuccess: (data) => {
                        this.paidDetails = data || {};
                        resolve();
                    },
                    onerror: (err) => {
                        this.$baseUI.loading.closeAll();
                        this.$niceloo.api.handleFailure(err);
                    },
                });
            });
        },
        checkforceArgument() {
            return new Promise((resolve) => {
                const aptReadingFindDtoList = [];
                let effectClass = [];
                this.paidDetails.orderItems.forEach((element) => {
                    if (
                        element.orderValidstatus !== 'N' && //订单为有效
                        element.orderitemOperation !== 'CHAO' && //订单项操作类型不为转出
                        this.paidDetails.orderSubtype === 'REP' && //订单类型是续学
                        this.paidDetails.classOrderSubType === 'YAN' && // 订单子类型是 延考
                        this.paidDetails.orderAgreement.agreementStatus === 'N' && //协议确认状态为未确认
                        element.orderitemService &&
                        element.orderitemService.orderitemAgreementtype == 'E' && //电子协议
                        element.orderitemService.orderitemServicetype != 'B' && //协议类型不为无协议
                        element.orderitemStatus !== 'CHAD' && //订单状态不为已转班
                        element.orderitemStatus !== 'TRAD' && //不为已转让
                        element.orderitemStatus !== 'CREF' && //不为以退费
                        element.orderitemStatus !== 'DEFC' //不为已顺关
                    ) {
                        let obj = {
                            classId: this.paidDetails.sourceSkuId,
                            isOrderCenterPay: 0,
                        };
                        aptReadingFindDtoList.push(obj);
                        effectClass.push(element);
                    }
                });
                this.$callApi('xieyiqueren/query-readingAgr-find-man-reading', {
                    aptReadingFindDtoList,
                    onsuccess: (res) => {
                        //是否有强制弹出协议
                        //判断订单中是否有一个订单满足强制弹出协议 有的话全展示有效班级的协议
                        let flag = res.bdFindManReadingResponses.some((i) => i.isAptReading === '1');
                        if (flag) {
                            this.dealLists = effectClass;
                        } else {
                            effectClass = [];
                        }
                        if (this.dealLists.length) {
                            this.showFooter = true;
                            resolve();
                            this.showArgument = true;
                            let seconds = Number(res.mandatoryReadingTime);
                            let isPullDown = res.downBottomReading === '1';
                            this.$nextTick(() => {
                                this.$refs.agreementPurchase.setUp({ seconds, isPullDown });
                                this.$refs.agreementPurchase.open(this.dealLists[0], this.paidDetails.orderNo);
                            });
                        } else {
                            resolve();
                            this.isHadRead = true;
                        }
                    },
                    onerror: this.$niceloo.api.handleFailure,
                });
            });
        },
        //获取 图形验证码 凭证
        getCaptchaToken() {
            this.$niceloo.api.call('uc/create-captcha', {
                captchaType: 'P', // 验证码类型
                captchaWidth: 120, // 验证码宽度
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
    },
};
</script>

<style scoped lang="less">
/deep/ .inner-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    transform: none;
}
.btn-txt {
    margin-left: 10px;
    color: #1890ff;
    cursor: pointer;
    user-select: none;
}
.improveWrap .prot.yan-tip {
    margin-bottom: -35px;
    text-align: center;
}
.improveWrap {
    width: 640px;
    background: #fff;
    border-radius: 8px;
    position: relative;
    padding: 0px 0 10px 0;
    margin: 15vh auto;
    overflow: hidden;
    .className {
        text-align: center;
        font-size: 14px;
        padding-top: 10px;
    }
    .writeNotice {
        background: #fff7f5;
        border-radius: 2px;
        margin: 24px 29px 40px;
        color: #e73928;
        font-size: 14px;
        line-height: 20px;
        p:first-child {
            font-size: 14px;
            font-weight: bold;
            line-height: 24px;
        }
    }
    .noticeConfirm {
        margin: 56px 50px 24px 50px;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #9698a2;
        cursor: pointer;
        position: relative;
        /deep/ ._errorMessage {
            position: absolute;
            left: 30px;
            top: 22px;
        }
    }
    .read {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        display: inline-block;
        border: 1px solid #7e8c8d;
        margin-right: 10px;
        &.active {
            background: url('./asset/images/agreeIcon.png') no-repeat 0 0 / cover;
        }
    }
    .improveTitle {
        height: 75px;
        font-size: 22px;
        font-weight: 700;
        line-height: 75px;
        text-align: center;
        background-color: #fff;
        color: #3e3a39;
        box-shadow: 0px 4px 10px 0px rgba(68, 68, 68, 0.05);
    }
    .close {
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
        width: 16px;
        height: 16px;
        background: url('./asset/images/closed.png') no-repeat 0 0 / cover;
    }
    .subheading {
        color: #999999;
        font-size: 12px;
        margin: 13px 0 40px;
        text-align: center;
    }
    .inputWrap {
        display: flex;
        align-items: center;
        margin: 0px 40px 16px 10px;
        font-size: 14px;
        position: relative;
        /deep/ ._errorMessage {
            position: absolute;
            left: 138px;
            bottom: -17px;
        }
    }
    .payerRelationship {
        /deep/ ._errorMessage {
            left: 190px;
        }
        .inputClass {
            width: 150px;
        }
        .inputCont {
            width: calc(100% - 166px);
        }
    }
    .inputClass {
        height: 40px;
        line-height: 40px;
        width: 100px;
        text-align: right;
        margin-right: 16px;
        color: #333;
    }
    .inputCont {
        width: calc(100% - 116px);
        height: 40px;
        background: inherit;
        background-color: rgba(255, 255, 255, 1);
        box-sizing: border-box;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(204, 204, 204, 1);
        border-radius: 0px;
        padding-left: 16px;
    }
    .inputCont {
        &.confirmation-code {
            width: 333px;
        }
        &.captcha-value {
            vertical-align: top;
        }
    }
    .conts {
        line-height: 30px;
        padding-left: 10px;
    }
    .submitButton {
        width: 352px;
        height: 50px;
        background: linear-gradient(135deg, #ff0000, #ff4c3d 98%);
        border-radius: 4px;
        line-height: 50px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        margin: 40px auto 20px;
        color: #fff;
        cursor: pointer;
    }
    .stressPromit {
        line-height: 35px;
        text-align: center;
        font-size: 14px;
        color: #666;
    }
    .promit {
        margin: 0 auto;
        width: 502px;
        border: 1px dashed #dddddd;
        border-radius: 2px;
        padding: 0 14px;
        color: #999;
        line-height: 18px;
        font-size: 12px;
        padding-bottom: 10px;
        .tit {
            font-size: 14px;
            font-weight: bold;
            color: #666;
            line-height: 40px;
        }
    }
    .prot {
        margin: 20px 50px;
        font-size: 14px;
        color: #999;

        .name {
            font-size: 14px;
            font-weight: bold;
            color: #666;
        }

        .agreement {
            font-size: 14px;
            font-weight: bold;
            color: #ff4c3d;
            cursor: pointer;
        }
    }
    .btn-text {
        height: 40px;
        width: 120px;
        line-height: 40px;
        box-sizing: border-box;
        display: inline-block;
        margin-left: 16px;
        cursor: pointer;
        background: linear-gradient(135deg, #ff0000, #ff4c3d 98%);
        border-radius: 4px;
        color: #ffffff;
        font-size: 14px;
        // padding-left: 10px;
        text-align: center;
    }
    .img-captcha {
        height: 40px;
        width: 120px;
        margin-left: 16px;
        cursor: pointer;
    }
    .tip-msg {
        color: #e73928;
        font-size: 14px;
    }
    .msgInputWrap {
        margin-left: 126px;
        margin-bottom: 10px;
    }
    .msg-code {
        height: 40px;
    }
}
</style>
