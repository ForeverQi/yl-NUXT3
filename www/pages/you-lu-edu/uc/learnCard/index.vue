<template>
    <div>
        <div class="cardTop">
            <div class="carTopbox">
                <span class="login_msg" v-if="userInfo">
                    欢迎您
                    <span class="username">{{ userInfo.userNickname || userInfo.userYoulunum || userInfo.userLoginname }}</span>
                    登录优路教育
                    <span @click="layout" class="layout">退出</span>
                </span>
                <a href="/help" class="cd_help" target="_blank">帮助中心</a>
            </div>
        </div>
        <div class="navigation-bar">
            <div class="logoTop">
                <div class="LTLeft">
                    <a href="/">点亮职业人生</a>
                </div>
                <div class="LTRight">
                    <div class="dhtb"></div>
                    <div class="dhhm">
                        <p class="mfnum">400-861-8800</p>
                        <p class="qgmfdh">全国免费咨询电话</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="banner-img"></div>

        <div class="main-section">
            <div class="card_content">
                <div class="card_tab" :class="succeed ? 'card_tab1' : ''">
                    <ul>
                        <li class="first"></li>
                        <li class="second"></li>
                    </ul>
                </div>
                <div class="card_open" :class="succeed ? 'height405' : userInfo && !succeed ? 'height280' : ''">
                    <div class="caop_box txt-center" v-if="succeed">
                        <img src="./asset/images/success_img.png" class="success_img" alt="" />
                        <div class="success_text">开通成功，可以学习啦！</div>
                        <div class="cp_bm">
                            <input type="button" class="start_learn_btn" @click="tomyCourse()" v-model="startLearnBtn" />
                        </div>
                        <div class="welcome_text">备注：课程的展示可能会有5分钟延迟，请耐心等待</div>
                    </div>
                    <div class="caop_box" v-else>
                        <template v-if="userInfo == null">
                            <div class="cp_lab">
                                <span class="cp_sp">手机号：</span>
                                <input
                                    type="text"
                                    class="cp_inp"
                                    id="txtPhone"
                                    ref="txtPhone"
                                    v-model="messageLogin.mobile"
                                    placeholder="未注册手机号将自动开通账户"
                                />
                            </div>
                            <div class="cp_lab" v-if="messageLogin.isCaptchaToken" style="display: flex">
                                <span class="cp_sp">图形码：</span>
                                <input
                                    name="txtSMSCode_q"
                                    type="text"
                                    placeholder="请输入图形验证码"
                                    class="cp_inp yzm_inp"
                                    v-model="messageLogin.captchaValue"
                                    autocomplete="off"
                                />
                                <img :src="messageLogin.imgSrc" class="imgSrc" @click="getCaptchaToken" />
                            </div>
                            <div class="cp_lab cp_yzm">
                                <span class="cp_sp">验证码：</span>
                                <input
                                    type="text"
                                    class="cp_inp yzm_inp"
                                    id="txtCheckCode"
                                    v-model="messageLogin.verifyValue"
                                    ref="txtCheckCode"
                                    placeholder="请输入短信验证码"
                                />
                                <input type="button" class="yzm_btn" :value="messageTxt" @click="sendMessage()" id="btnSendCode" :disabled="isDisabled" />
                            </div>
                        </template>
                        <div class="cp_lab">
                            <span class="cp_sp">卡 号：</span>
                            <input type="text" class="cp_inp" id="txtCardNo" v-model="lcNo" ref="txtCardNo" placeholder="请输入学习卡号" />
                        </div>
                        <div class="cp_lab">
                            <span class="cp_sp">密 码：</span>
                            <input type="text" class="cp_inp" id="txtPassWord" v-model="lcPassword" ref="txtPassWord" placeholder="请输入密码" />
                        </div>
                        <div class="cp_bm">
                            <input type="button" v-model="btnSubmitText" class="card_btn" id="btnSubmit" @click="loginBtn()" :disabled="nextbtnIsDisabled" />
                        </div>
                    </div>
                </div>
                <div class="agree_checked_wrap" v-if="userInfo == null && !succeed">
                    <!--<input type="checkbox" v-model="isReadAgreement" />-->
                    <span :class="isReadAgreement ? 'agreement_check' : 'agreement_uncheck'" @click="isReadAgreement = !isReadAgreement"></span>
                    我已阅读并同意
                    <nuxt-link to="/inside/information/agreement" target="_blank" class="link" style="font-size: 0">
                        <span style="font-size: 12px">《隐私政策》</span>
                    </nuxt-link>
                    和
                    <nuxt-link to="/uc/registerProtocol" target="_blank" class="link" style="font-size: 0">
                        <span style="font-size: 12px">《优路用户注册协议》</span>
                    </nuxt-link>
                    （未注册优路产品的手机号，开课时将自动注册）
                </div>
                <div class="card_tips" v-if="!succeed">
                    <p class="cdtp_tit">使用说明：</p>
                    <p class="cdtp_tt">1、【什么是学习卡】</p>
                    <p style="line-height: 17px; padding-left: 30px">
                        学习卡是开通观看权限的方式之一，学习卡背面涂层内封存着开通密码，请于学习卡的最晚启用时间前开通。
                    </p>
                    <p class="cdtp_tt">2、【如何开通】</p>
                    <p style="margin-bottom: 8px; padding-left: 24px">1.输入手机号和验证码</p>
                    <p style="line-height: 17px; padding-left: 24px">
                        2.刮开学习卡背面涂层，获取卡号和密码并输入上侧对应框内，系统验证通过后，将自动跳转至您的个人中心，开始观看课程。
                    </p>
                </div>
            </div>
        </div>
        <div class="The_total zb_bottom">
            <div class="The_total1100">
                <p>总部地址：北京市海淀中关村南大街甲27号中扬大厦二层</p>
                <p>
                    <span>邮编：100081</span>
                    <span>全国统一咨询热线：400-861-8800</span>
                    <span>全国统一客服热线：0371-53609200</span>
                </p>
                <p>
                    Copyright © 2005-{{ fullYear }} niceloo.com 版权所有 北京环球优路教育科技股份有限公司 京ICP备05058880号-3 京公网安备 11010802017987号
                    京ICP证150934号
                </p>
            </div>
        </div>
        <!-- 报错提示弹框 -->
        <div class="bg" v-if="errorTipshow">
            <div class="dialogtip">
                <div class="dialogtiptitle">
                    <span>提示</span>
                    <img @click="errorTipClose" src="./asset/images/pic_06.png" alt="" />
                </div>
                <div class="tipmsg" v-if="!messageLogin.isShowAgreement">{{ messageLogin.errorTip }}</div>
                <div class="tipmsg" v-if="messageLogin.isShowAgreement">
                    请先同意
                    <a href="/inside/information/agreement" target="_blank" class="agreement">《隐私政策》</a>
                    和
                    <a href="/uc/registerProtocol" target="_blank" class="agreement">《优路用户注册协议》</a>
                </div>
                <button class="dialogtipbtn" @click="errorTipClose">{{ btnmsg }}</button>
            </div>
        </div>
        <learning-card
            :show="classPopup"
            :lcg-classlimit="lcgClasslimit"
            :lcg-content-arry="lcgContentArry"
            @confirm="learncardActive($event)"
            @cancel="kkHide"
        ></learning-card>
    </div>
</template>
<script>
import learningCard from '@/www/components/uc/manager/learningCard/index.vue';
import loginApi from '@/api/login.js';

import '@/api/uc/api.CK2001.active-learning-card.js';
import '@/api/uc/api.CK2002.verify-learning-card';
import '@/api/uc/api.CK2003.query-binding-class';
import '@/api/uc/api..create-captcha.js';
export default {
    name: 'LearnCard', //学员班级关系
    components: { learningCard },
    layout: 'nullLayout',
    data() {
        return {
            userInfo: null, //登录用户信息
            //协议错误提示弹框
            errorTipshow: false, //显示标识
            btnmsg: '知道了', //按钮提示
            loginMode: 'message', //短信登录
            messageLogin: {
                errorTip: '', //错误提示
                mobile: '', //手机号
                verifyValue: '', //短信验证码
                isCaptchaToken: true, //是否展示图形验证码
                captchaValue: '', //输入图形验证码
                captchaToken: '', //图形验证码凭证
                imgSrc: '', //图形验证码地址
                isShowAgreement: false,
            },
            captcha: {}, //验证码凭证
            count: 60, //60s倒计时
            messageTxt: '获取验证码',
            isDisabled: false,

            btnSubmitText: '激活学习卡', //激活学习卡提示
            nextbtnIsDisabled: false, //激活学习卡按钮是否可用
            lcNo: '', //卡号
            lcPassword: '', //密码
            isReadAgreement: false, //是否阅读协议

            lcId: '', //学习卡唯一标识
            lcgId: '', //学习卡卡组唯一标识
            lcgContentArry: [],
            lcgClasslimit: -1,
            // showLoading: true, //页面加载3秒及以上没有加载到的内容的再出现加载动画，刚进入时不需要有加载动画

            /*新增代码*/
            classPopup: false, //选课弹窗列表
            succeed: false, //开课成功
            startLearnBtn: '开始学习',
        };
    },
    computed: {
        // 获取当前年份
        fullYear() {
            return new Date().getFullYear();
        },
    },
    mounted() {
        this.getCaptchaToken();
        this.checkIsLogin();
    },
    methods: {
        async checkIsLogin() {
            if (this.$User.getToken()) {
                this.userInfo = await this.$User.getUser();
            }
        },
        tomyCourse() {
            this.$PageUtil.href('/learningCenter/index/myCourse');
        },
        layout() {
            this.$User.removeLoginInfo();
            location.reload();
        },
        /*原代码*/
        errorTipClose() {
            this.errorTipshow = false;
            this.messageLogin.isShowAgreement = false;
        },

        //发送短信
        sendMessage() {
            if (this.isDisabled) return;
            this.isDisabled = true;
            if (!this.messageLogin.mobile.trim().match(/^1[3|4|5|8|7|6|9][0-9]\d{8}$/)) {
                this.$baseUI.alert('手机号不正确');
                this.isDisabled = false;
                return false;
            }
            if (this.messageLogin.isCaptchaToken && this.messageLogin.captchaValue == '') {
                this.$baseUI.alert('图形验证码不能为空');
                this.isDisabled = false;
                return false;
            }
            this.messageLogin.errorTip = '';
            //图形验证
            if (this.messageLogin.isCaptchaToken) {
                this.captcha = {
                    captchaToken: this.messageLogin.captchaToken,
                    captchaValue: this.messageLogin.captchaValue,
                };
                //发送短信
                this.sendMess();
            }
        },
        //发送短信
        sendMess(callback) {
            this.$callRawApi({
                api: 'mc/msg/sms/verifycode/send',
                params: {
                    smsPhone: this.messageLogin.mobile.trim(),
                    smstplNo: '010001',
                    captchaData: this.captcha,
                    scene: 'uc_login',
                },
            })
                .then((_response) => {
                    let data = _response.getData();
                    console.log('返回的数据', data);
                    //倒计时
                    this.countDown();
                })
                .catch((err) => {
                    if (err.getCode().includes('GB2009')) {
                        this.$baseUI.alert('图形验证码有误，请重新输入');
                    } else {
                        this.$niceloo.api.handleFailure(err);
                    }
                    this.messageLogin.captchaValue = '';
                    this.getCaptchaToken();
                    this.isDisabled = false;
                });
        },
        //获取 图形验证码 凭证
        getCaptchaToken() {
            this.$niceloo.api.call('uc/create-captcha', {
                captchaType: 'P', // 验证码类型
                captchaWidth: 122, // 验证码宽度
                captchaHeight: 36, // 验证码高度
                captchaSize: 4, // 验证码长度
                onsuccess: (data) => {
                    this.messageLogin.captchaToken = data.captchaToken;
                    this.messageLogin.imgSrc = this.$urlUtils.getViewUrl(data.filePath);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },

        //倒计时
        countDown() {
            this.isDisabled = true;
            this.count = this.count - 1;
            this.messageTxt = this.count + '秒后重新发送';
            if (this.count <= 0) {
                this.messageTxt = '重新发送';
                this.count = 60;
                this.isDisabled = false;
                this.messageLogin.captchaValue = '';
                this.getCaptchaToken();
                return;
            }
            setTimeout(this.countDown, 1000);
        },
        setCount() {
            this.count = 0;
            if (this.count <= 0) {
                this.messageTxt = '重新发送';
                // vm.count = 60;
                this.isDisabled = false;
                // return;
            }
        },

        //激活学习卡
        loginBtn() {
            if (this.userInfo == null) {
                //未登录:1.登录2.开卡
                this.nextbtnIsDisabled = true;
                // this.showLoading = true;
                // setTimeout(() => {
                //     if (this.showLoading) {
                //         Mask.showLoading();
                //     }
                // }, 3000);
                let param = {
                    userLoginname: '',
                    userLoginpwd: '',
                    userMobile: '',
                    userEmail: '',
                    verify: '',
                    captcha: '',
                    userFlag: 'S',
                };
                // 验证码登录
                if (this.loginMode == 'message') {
                    if (!this.messageLogin.mobile.trim().match(/^1[3|4|5|8|7|6|9][0-9]\d{8}$/)) {
                        this.$baseUI.alert('手机号不正确');
                        this.nextbtnIsDisabled = false;
                        return false;
                    }
                    if (this.messageLogin.isCaptchaToken && this.messageLogin.captchaValue == '') {
                        this.$baseUI.alert('图形验证码不能为空');
                        this.nextbtnIsDisabled = false;
                        return;
                    }
                    if (this.messageLogin.verifyValue == '') {
                        this.$baseUI.alert('短信验证码不能为空');
                        this.nextbtnIsDisabled = false;
                        return;
                    }
                    this.messageLogin.errorTip = '';
                    param.userMobile = this.messageLogin.mobile.trim();
                    param.verify = { verifyValue: this.messageLogin.verifyValue };
                    // vm.$emit('changeMessageLogin', true);
                    //登录
                    this.login(param);
                }
            } else {
                //已登录:1.直接开卡
                if (this.lcNo == '') {
                    this.$baseUI.alert('卡号不能为空');
                    this.nextbtnIsDisabled = false;
                    return false;
                }
                if (this.lcPassword == '') {
                    this.$baseUI.alert('密码不能为空');
                    this.nextbtnIsDisabled = false;
                    return false;
                }
                this.learncardVerify();
            }
        },

        //登录
        login(infos) {
            // 验证卡号密码
            if (this.lcNo == '') {
                this.$baseUI.alert('卡号不能为空');
                this.nextbtnIsDisabled = false;
                return false;
            }
            if (this.lcPassword == '') {
                this.$baseUI.alert('密码不能为空');
                this.nextbtnIsDisabled = false;
                return false;
            }
            if (!this.isReadAgreement) {
                // this.messageLogin.errorTip = '请先同意《隐私政策》和《优路用户注册协议》';
                this.nextbtnIsDisabled = false;
                this.errorTipshow = true;
                this.messageLogin.isShowAgreement = true;
                return false;
            }
            let vm = this;
            let fail = function (data, msg) {
                vm.$User.removeLoginInfo();

                //短信登录
                if (vm.loginMode == 'message') {
                    this.$baseUI.alert(msg);
                    vm.nextbtnIsDisabled = false;
                    vm.setCount();
                }
            };
            loginApi.login({
                params: infos,
                success: (data) => {
                    vm.$User.setToken(data.token);
                    loginApi.getUserProfile({
                        params: {},
                        success: (data3) => {
                            vm.$User.setUser(data3);
                            vm.userInfo = data3;
                            // vm.$emit('loginSuccess');
                            // 学习卡开班校验
                            console.log('loginSuccess');
                            vm.nextbtnIsDisabled = false;
                            /*登录成功*/
                            vm.learncardVerify();
                        },
                        fail: (data3, msg3) => {
                            vm.nextbtnIsDisabled = false;
                            fail(data3, msg3);
                        },
                        error: (data3, msg3) => {
                            vm.nextbtnIsDisabled = false;
                            fail(data3, msg3);
                        },
                    });
                },
                fail: (data, msg) => {
                    vm.nextbtnIsDisabled = false;
                    fail(data, msg);
                },
                error: (data, msg) => {
                    vm.nextbtnIsDisabled = false;
                    fail(data, msg);
                },
            });
        },

        // 学习卡开班校验
        learncardVerify() {
            this.$callApi('uc/verify-learning-card', {
                lcNo: this.lcNo,
                lcPassword: this.lcPassword,
                onsuccess: (res) => {
                    this.lcId = res.lcId; //学习卡唯一标识
                    this.lcgId = res.lcgId; //学习卡卡组唯一标识
                    this.selectClasses();
                    this.setCount();
                },
                onerror: (err) => {
                    if (err.getAttachedData().getResultCode() === 'GB2006') {
                        this.$User.removeLoginInfo();
                        window.location.reload();
                    } else {
                        this.$niceloo.api.handleFailure(err);
                    }
                    this.nextbtnIsDisabled = false;
                    this.setCount();
                    // this.showLoading = false; //隐藏loading
                    // Mask.hideLoading();
                },
                oncomplete: () => {},
            });
        },

        //学习卡开卡获取卡组绑定的班级
        selectClasses() {
            this.$callApi('uc/query-binding-class', {
                lcgId: this.lcgId,
                onsuccess: (res) => {
                    this.lcgContentArry = [];
                    this.lcgClasslimit = res.lcgClasslimit; //限制可选数量
                    if (res.lcgContent.content && res.lcgContent.content.length > 0 && (res.lcgContent.type == 'B' || res.lcgContent.type == 'C')) {
                        res.lcgContent.content.forEach((item) => {
                            let obj = {};
                            obj.projectId = item.projectId;
                            obj.projectName = item.projectName;
                            if (this.lcgClasslimit == 0) {
                                item.active = true;
                            } else {
                                item.active = false;
                                item.disabled = false;
                            }
                            if (this.lcgContentArry.length === 0) {
                                obj.content = [];
                                obj.content.push(item);
                                this.lcgContentArry.push(obj);
                            } else {
                                let isHasProjectId = false;
                                let setIndex = -1;
                                this.lcgContentArry.forEach((value, index) => {
                                    if (value.projectId === item.projectId) {
                                        isHasProjectId = true;
                                        setIndex = index;
                                    }
                                });
                                isHasProjectId && setIndex > -1 && this.lcgContentArry[setIndex].content.push(item);
                                if (!isHasProjectId) {
                                    obj.content = [];
                                    obj.content.push(item);
                                    this.lcgContentArry.push(obj);
                                }
                            }
                        });
                        this.classPopup = true;
                    } else {
                        this.$baseUI.alert(`该卡类型为${res.lcgContent.type}，不可开通课程`);
                    }
                    this.nextbtnIsDisabled = false;
                },
                onerror: (err) => {
                    this.$niceloo.api.handleFailure(err);
                    this.nextbtnIsDisabled = false;
                    this.setCount();
                },
                oncomplete: () => {},
            });
        },
        kkHide() {
            this.classPopup = false;
        },
        // 学习卡激活
        async learncardActive(selectattr) {
            this.$callApi('uc/active-learning-card', {
                lcNo: this.lcNo,
                lcPassword: this.lcPassword,
                classesIds: selectattr.join(),
                extension: {
                    ...(await this.$PromotionUtil.getClueExtension()),
                    projectId: '',
                    projectCode: '',
                    projectSeocode: '',
                    clueLearncardid: this.lcNo,
                },
                onsuccess: (res) => {
                    this.classPopup = false;
                    this.succeed = true;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
};
</script>
<style scoped lang="less">
.link {
    color: #ff2f26;
}
.whitebg {
    background-color: #fff;
}
/*学习卡头部*/
.cardTop {
    height: 34px;
    background: #f0f0f0;
    min-width: 1100px;
    position: relative;
    z-index: 4;
}
.carTopbox {
    width: 1200px;
    margin: 0 auto;
    text-align: right;
}
.login_msg {
    float: left;
    font-size: 14px;
    display: inline-block;
    height: 34px;
    line-height: 34px;
    color: #666666;
    .username {
        color: red;
    }
    .layout {
        /*border: 1px solid #e53930;*/
        color: #e53930;
        cursor: pointer;
        font-size: 10px;
    }
}
.cd_help {
    display: inline-block;
    color: #666;
    font-size: 14px;
    line-height: 34px;
    background: url('./asset/images/cd_fg.png') no-repeat left center;
    padding-left: 22px;
}
/************************************logo以及搜索框样式************************************/
.navigation-bar {
    background-color: #fff;
    /*box-shadow: 0px 2px 18px 0px rgba(0, 0, 0, 0.13);*/
    position: relative;
}
.logoTop {
    width: 1100px;
    height: 90px;
    margin: 0 auto;
    background: #fff;
}
/***********************************logo***********************************/
.logoTop .LTLeft {
    float: left;
    width: 214px;
    height: 90px;
    margin-right: 80px;
}
.logoTop .LTLeft a {
    width: 250px;
    height: 90px;
    display: inline-block;
    background: url('./asset/images/logo1.png') no-repeat top left;
    padding: 40px 0 0 4px;
    font-size: 14px;
    color: #999;
    letter-spacing: 16px;
    margin-top: 18px;
}
/***********************************联系电话***********************************/
.logoTop .LTRight {
    float: right;
    padding-top: 30px;
    width: 175px;
}
.logoTop .dhtb {
    width: 36px;
    height: 37px;
    background: url('./asset/images/dianhua.png') no-repeat center;
    float: left;
    margin-top: 6px;
    margin-right: 8px;
}
.logoTop .dhhm {
    text-align: left;
    float: right;
    height: 37px;
}
.logoTop .dhhm p {
    font-size: 20px;
    color: #e53930;
}
.logoTop .dhhm .qgmfdh {
    font-size: 12px;
    color: #444;
    line-height: 18px;
    font-family: Arial, Helvetica, sans-serif;
    color: #555555;
}
.mfnum {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
}

/*底部*/
.zb_bottom {
    background: #e4e4e4;
    text-align: center;
}
.zb_bottom .The_total1100 {
    background: #e4e4e4;
    padding: 20px 0;
}
.zb_bottom p {
    color: #444;
    line-height: 30px;
    font-size: 14px;
}
.zb_bottom p span {
    margin-right: 40px;
}

.banner-img {
    width: 100%;
    height: 178px;
    /*    background: #f2f2f2 url('./asset/images/card_open.png') no-repeat;*/
    background: url('./asset/images/card_open.png') no-repeat;
    /*background-size: auto 440px;*/
    background-position: center center;
    background-size: cover;
}

/*学习卡正文样式*/
.main-section {
    background: #f9f9f9;
}
.card_content {
    width: 1200px;
    margin: 0 auto;
    padding: 36px 0 68px;
    background: #ffffff;
}
.card_tab {
    width: 435px;
    height: 36px;
    margin: 0 auto 36px;
    background: url('./asset/images/cd_bg1.png') no-repeat;
    background-size: 100%;
    margin-left: 406px;
}
.card_tab1 {
    background: url('./asset/images/cd_bg2.png') no-repeat;
    background-size: 100%;
    margin: 0 auto 36px;
}
.card_tab ul li {
    line-height: 36px;
    width: 50%;
    float: left;
    text-align: center;
}
/*.card_tab ul li.first {
    color: #fefefe;
}
.card_tab ul li.second {
    color: #666666;
}*/
.card_open {
    width: 550px;
    /*height: 385px;*/
    /*background: #f2f2f2 url('./asset/images/card_open.png') no-repeat;*/
    /*background-size: 100%;*/
    margin: 0 auto 16px;
    border-radius: 6px;
}
.height280 {
    height: 280px;
}
.height405 {
    height: 405px;
}
.height385 {
    height: 385px;
}
/*.caop_box {
    padding-top: 100px;
}*/
.cp_lab {
    padding: 0 0 0 25px;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
}

.agree_checked_wrap {
    width: 540px;
    margin: -14px auto 88px;
    font-size: 12px;
    color: #666666;
    /*color: rgba(0, 0, 0, 0.65);*/
    margin-top: 16px;
}
.agreement_check,
.agreement_uncheck {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url('./asset/images/agreement_check.png') no-repeat;
    background-size: 100%;
    cursor: pointer;
}
.agreement_uncheck {
    background: url('./asset/images/agreement_uncheck.png') no-repeat;
    background-size: 100%;
}
.agreement {
    color: #ff5f36;
}
.cp_sp {
    display: inline-block;
    width: 56px;
    float: left;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
}
.cp_inp {
    width: 435px;
    height: 40px;
    line-height: 40px;
    padding-left: 12px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    outline: none;
    margin-right: 5px;
    box-sizing: border-box;
    border-radius: 4px;
}
.yzm_inp {
    width: 301px;
}
.yzm_btn {
    line-height: 22px;
    color: #e73928;
    font-size: 14px;
    padding: 0 5px;
    background: none;
    outline: none;
    cursor: pointer;
    width: 122px;
    height: 32px;
    border: 1px solid #e73928;
    border-radius: 4px;
}
.cp_bm {
    text-align: center;
    padding-top: 5px;
}
.card_btn,
.start_learn_btn {
    line-height: 37px;
    font-size: 14px;
    border: none;
    outline: none;
    cursor: pointer;
    /* width: 316px;
    height: 37px;
    background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
    border-radius: 4px;*/
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    width: 240px;
    height: 40px;
    background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
    border-radius: 100px;
}
.txt-center {
    text-align: center;
}
.success_img {
    width: 100px;
    height: 100px;
    margin-top: 108px;
}
.success_text {
    font-size: 18px;
    text-align: center;
    color: #3a3d4b;
    margin-bottom: 74px;
}
.welcome_text {
    margin: 0 auto;
    margin-top: 14px;
    font-size: 12px;
    text-align: center;
    color: #e73928;
}
.card_tips {
    width: 560px;
    margin: 0 auto;
    color: #7f849a;
    font-size: 12px;
    .cdtp_tit {
        font-weight: bold;
        color: #333333;
        margin-bottom: 4px;
    }
    .cdtp_tt {
        line-height: normal;
        margin-top: 16px;
        margin-bottom: 12px;
    }
}
/*.card_tips  {
    font-size: 12px;
    line-height: 30px;
    color: #7f849a;
}*/

/*.card_tips .cdtp_tt {
    padding-top: 5px;
}*/

.imgSrc {
    display: inline-block;
    height: 36px;
    width: 122px;
    margin: 2px 0 0 5px;
    cursor: pointer;
}

.bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.4);
    // filter: alpha(opacity=70);
    // opacity: 0.3;
}

// 弹框
.dialog {
    text-align: center;
    width: 500px;
    height: 404px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 32px 0px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    margin: 0 auto;
    margin-top: calc(50vh - 202px);
    .dialogtitle {
        padding-right: 20px;
        padding-top: 40px;
        margin-bottom: 50px;
        span {
            font-size: 18px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }
        img {
            width: 16px;
            height: 16px;
            cursor: pointer;
            float: right;
            margin-top: -20px;
        }
    }
    .bigQRcode {
        width: 190px;
        height: 190px;
        display: block;
        margin: 0 auto;
        margin-bottom: 50px;
    }
    .continuebtn {
        width: 120px;
        height: 32px;
        background: rgba(255, 95, 54, 1);
        font-size: 14px;
        color: rgba(255, 255, 255, 1);
        line-height: 32px;
        border-radius: 4px;
        display: block;
        margin: 0 auto;
        cursor: pointer;
    }
}
// 错误提示弹框
.dialogtip {
    margin: 0 auto;
    width: 400px;
    height: 210px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 32px 0px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    text-align: center;
    margin-top: calc(50vh - 105px);
    .dialogtiptitle {
        display: flex;
        justify-content: space-between;
        line-height: 52px;
        border-bottom: 1px solid rgba(240, 240, 240, 1);
        padding-left: 20px;
        padding-right: 20px;
        box-sizing: border-box;
        align-items: center;
        span {
            font-size: 18px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }
        img {
            width: 16px;
            height: 16px;
            cursor: pointer;
        }
    }
    .tipmsg {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        margin-top: 36px;
        margin-bottom: 36px;
    }
    .dialogtipbtn {
        width: 120px;
        height: 32px;
        background: linear-gradient(75deg, rgba(245, 107, 81, 1) 0%, rgba(231, 57, 40, 1) 100%);
        border-radius: 4px;
        font-size: 14px;
        color: rgba(255, 255, 255, 1);
        line-height: 32px;
        text-align: center;
        cursor: pointer;
    }
}
</style>
