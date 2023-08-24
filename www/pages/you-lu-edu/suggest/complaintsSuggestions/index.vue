<template>
    <div class="complaints-suggestions">
        <div class="banner">
            <div class="top">
                <a href="/" class="logo"><img src="./asset/images/logo.png" alt="优路教育" /></a>
                <ul class="right-info">
                    <li>0371-53609200</li>
                    <li>工作日（9:00-18:00）</li>
                </ul>
            </div>
            <div class="txt-main"></div>
        </div>
        <div class="content">
            <div class="tit"></div>
            <div class="top-content">
                优路教育不断提升自己、造就学员，开通了专项投诉建议通道，您可在下方提出自己的投诉与建议，进入全国客户服务质量监督以及审查流程。
            </div>
            <!-- <div class="tag-box">
                <a href="/ss/complaintsSuggestions">对优路服务不满意？</a>
                <a href="/BottomInformation/BookComplaint.aspx">发现了图书的问题？</a>
            </div> -->
            <ul class="form-box">
                <li>
                    <div class="form-content">
                        <label>*</label>
                        内容
                        <span v-if="tip.content">{{ tip.content }}</span>
                    </div>
                    <textarea
                        v-model="form.content"
                        placeholder="请尽量详细描述您所遇到的问题，有助于快速给您精准反馈！"
                        maxlength="501"
                        @focus="eventFocus('content')"
                        @input="eventContentInput"
                        @blur="eventContentBlur"
                    />
                    <div class="uploadImgs-wrap">
                        <vb-upload-img-auto
                            :size="10 * 1024 * 1024"
                            class="uploadImgs"
                            :suffixs="['jpg', 'png']"
                            v-show="true"
                            ref="vbUpload"
                            @success="upImgSuccess"
                            @delete="deleteImgFile"
                            limit="5"
                        />
                        <div v-if="!(userInfo && userInfo.userId)" class="uploadImg-mask" @click="handleIsLogIn"></div>
                    </div>
                    <span class="tips">最多可添加五张图片，支持添加jpg或png格式，每张图片大小不超过10M。</span>
                </li>
                <li>
                    <div class="form-name">
                        <label>*</label>
                        姓名
                        <span v-if="tip.realName">{{ tip.realName }}</span>
                    </div>
                    <input
                        class="name"
                        v-model="form.realName"
                        placeholder="请输入您的姓名"
                        maxlength="16"
                        @focus="eventFocus('name')"
                        @input="eventNameInput"
                        @blur="eventNameBlur"
                    />
                </li>
                <li>
                    <div class="form-mobile">
                        <label>*</label>
                        手机号
                        <span v-if="tip.mobile">{{ tip.mobile }}</span>
                    </div>
                    <input
                        ref="mobileInput"
                        v-model="form.mobile"
                        placeholder="请输入您的手机号码"
                        type="text"
                        maxlength="11"
                        @input="mobileInput"
                        @focus="eventFocus('mobile')"
                    />
                </li>
                <li v-if="((userInfo.userMobile || form.mobile) && form.mobile !== userInfo.userMobile && isInputMobile) || isShowVerify">
                    <div class="num-check">
                        <label>*</label>
                        图形验证码
                        <span v-if="tip.captchaValue">{{ tip.captchaValue }}</span>
                    </div>
                    <input
                        type="text"
                        v-model="captchaData.captchaValue"
                        placeholder="请输入验证码"
                        maxlength="4"
                        class="input-code"
                        @focus="eventFocus('captchaValue')"
                    />
                    <img :src="imgSrc" class="img-captcha" @click="getCaptchaToken()" />
                </li>
                <li v-if="((userInfo.userMobile || form.mobile) && form.mobile !== userInfo.userMobile && isInputMobile) || isShowVerify">
                    <div class="form-code">
                        <label>*</label>
                        获取验证码
                        <span v-if="tip.code">{{ tip.code }}</span>
                    </div>
                    <input type="text" v-model="form.code" placeholder="请输入验证码" maxlength="6" class="input-code" @focus="eventFocus('code')" />
                    <button class="get-code" :disabled="codeDisabled" @click="getSmsCode" :class="codeDisabled ? 'gray' : ''">{{ messageTxt }}</button>
                </li>
            </ul>
            <div class="submit-box">
                <button @click="onSubmit" v-preventReClick :disabled="disabled" :class="disabled ? 'gray' : ''">点击提交</button>
            </div>
        </div>
        <mask-loading :scope.sync="scope.mask" />
        <mask-confirm :scope.sync="scope.confirm" />
        <!-- <loginRegisterPopup ref="loginRegisterPopup" /> -->
        <iframe src id="popup" allowfullscreen="true"></iframe>
    </div>
</template>
<script>
/* eslint-disable*/

import maskConfirm from '@/www/components/loading/maskConfirm/index.vue';
import maskLoading from '@/www/components/loading/maskLoading/index.vue';
import vbUploadImgAuto from '@/www/components/personalCenter/upLoadImageAuto/upLoadImageAuto/index.vue';
import loginRegisterTrack from '@/plugins/yiguan/login-register-track.js';
import loginApi from '@/api/login.js';
import '@/api/uc/api..create-captcha.js';
// import loginRegisterPopup from '@/pages/uc/login/loginRegisterPopup/index.vue';
export default {
    name: 'ss-complaints-suggestions',
    components: {
        maskConfirm,
        maskLoading,
        vbUploadImgAuto,
        // loginRegisterPopup,
    },
    layout: 'ucLayout',
    data() {
        return {
            form: {
                content: '',
                mobile: '',
                realName: '',
                code: '',
            },
            tip: {
                content: '',
                mobile: '',
                realName: '',
                code: '',
                captchaValue: '',
            },
            isSend: false,
            userInfo: {
                userName: '',
                userMobile: '',
            },
            mobileReg: new RegExp(/^[1][3456789][0-9]{9}$/), //手机号正则
            disabled: true, //提交按钮是否可点
            codeDisabled: false, //获取验证码按钮是否可点
            messageTxt: '获取验证码',
            count: 60, //获取验证码倒计时时间
            timer: null, //验证码倒计时定时器
            isInputMobile: false, //用来标识手机号是输入的手机号还是取登录的手机号  true-输入的手机号 false-登录状态的手机号
            scope: {
                confirm: {},
                mask: {},
            },
            captchaData: {
                captchaToken: '', //token
                captchaValue: '', //图形校验码
            }, //图验信息
            uploadImgs: [],
            isShowVerify: false,
            imgSrc: '', //图形校验码src
        };
    },
    created() {
        this.getCaptchaToken();
    },
    async mounted() {
        let _userInfo = await ylPlugin.login.getUser();
        if (_userInfo) {
            this.userInfo = Object.assign(this.userInfo, _userInfo);
        }
        if (this.userInfo.userMobile) {
            this.form.realName = this.userInfo.userName;
            //     this.form.mobile = this.hideMobile(this.userInfo.userMobile);
            //     this.disabled = false;
        }

        this.$Mask.init(this.scope.mask);
        this.$MsgBox.init(this.scope.confirm);
        window.addEventListener(
            'message',
            (event) => {
                console.log('event', event);
                if (event.data.type == 'success') {
                    // 用户验证成功后，携带图形验证返回的数据(event.data.data)继续原来的接口请求
                    // 这里可以自动请求,例如:
                    this.captchaData = event.data.data;
                    this.getSmsCode();
                    // 也可以不自动刚才的请求,可以把验证返回的数据存储起来,用户如果再次点击操作,把这个返回的数据带上再请求
                    // 关闭验证码弹框
                    document.querySelector('#popup').style.display = 'none';
                } else if (event.data.type == 'close') {
                    // 用户关闭验证码(也许用户不想后续操作了),默认什么都不处理,只是关闭验证码弹框
                    document.querySelector('#popup').src = '';
                    document.querySelector('#popup').style.display = 'none';
                } else if (event.data.type == 'error') {
                    // 调用方什么都不需要做,当验证码异常,提供验证码的页面会刷新或者给予用于提示信息
                    console.log('验证码校验异常,请重试');
                }
            },
            false
        );
    },
    methods: {
        ...loginRegisterTrack,
        async handleIsLogIn() {
            let userInfo = await ylPlugin.login.getUser();
            if (userInfo && userInfo.userId) {
                this.$refs.vbUpload.inputClick();
            } else {
                // 没登录，调起登录组件

                const extension = await this.$PromotionUtilNew.getLoginExtension();
                const clueExtension = await this.$PromotionUtil.getOptExtension_new({
                    originCode: 'guanwangzhuce',
                    clueWaycode: 'zhuce',
                    project: {},
                    pageName: '投诉建议',
                });
                const regExtension = await this.$PromotionUtilNew.getRegExtension();
                this.$ylPlugin.showLoginModal(
                    { clue: { clueExtension: regExtension } },
                    { pageName: document.title, entranceResource: '投诉建议', courseType: '', pageType: '' }
                );
                // ylPlugin.login
                //     .showLogin_verifyByWx3({
                //         clue: { extension, clueExtension, regExtension },
                //         onstatechange: (state) => {
                //             if (state.isQRCodeScanned) {
                //                 console.log(state);
                //                 this.trackScanWx3Login('登录弹窗', this.$route.query.pageName || document.title);
                //             }
                //         },
                //     }).then(() => {
                //         if (res && ['wx1', 'wx2'].includes(res.loginMethod) && res.isUserNewlyRegistered) {
                //             // 登陆方式为微信需要推送线索参数
                //             this.pushWxClue(clueExtension);
                //         }
                //         window.location.href = window.location.href;
                //     })
            }
        },
        upImgSuccess({ response, fileList }) {
            console.log(response);
            if (response && response.length > 0) {
                response.forEach((item) => {
                    let imgSrc = item.filePath;
                    if (imgSrc) {
                        this.uploadImgs.push(imgSrc);
                    }
                });
            }
            console.log(this.uploadImgs, 206);
        },
        deleteImgFile(deleteIndex) {
            if (deleteIndex === null) {
                this.uploadImgs = [];
            } else {
                this.uploadImgs.splice(deleteIndex, 1);
            }
        },
        //隐藏手机号中间四位数
        hideMobile(mobile) {
            return mobile.substr(0, 3) + '****' + mobile.substr(7);
        },
        //校验内容
        validateContent() {
            let content = this.form.content.trim();
            if (!content) {
                this.tip.content = '请填写您要反馈的问题！';
                return false;
            }
            if (content.length < 2) {
                this.tip.content = '请详细描述您要反馈的问题！';
                return false;
            }
            if (content.length > 500) {
                this.tip.content = '最多支持500字，请简单总结下您要反馈的问题！';
                return false;
            }
            this.tip.mobile = '';
            return true;
        },
        //校验姓名
        validateName() {
            let name = this.form.realName.trim();
            if (!name) {
                this.tip.realName = '请填写您的姓名！';
                return false;
            }
            if (name.length < 2) {
                this.tip.realName = '请填写您的姓名全称！';
                return false;
            }
            if (name.length > 15) {
                this.tip.realName = '姓名最多可填写15个字！';
                return false;
            }
            this.tip.realName = '';
            return true;
        },
        //校验手机号
        validateMobile() {
            let mobile = this.form.mobile.trim();
            if (!mobile) {
                this.tip.mobile = '请输入您的手机号码，方便与您取得联系！';
                return false;
            }
            if (mobile && this.isInputMobile && !this.mobileReg.test(mobile)) {
                this.tip.mobile = '您输入的手机号格式错误！';
                return false;
            }
            this.tip.mobile = '';
            return true;
        },
        //校验图形验证码
        validateCaptchaValue() {
            let captchaValue = this.captchaData.captchaValue.trim();
            if (captchaValue === '') {
                this.tip.captchaValue = '图形验证码不能为空';
                return false;
            }
            this.tip.captchaValue = '';
            return true;
        },
        //表单提交
        async onSubmit() {
            if (this.validateContent() && this.validateName() && this.validateMobile()) {
                let _mobile = this.isInputMobile ? this.form.mobile : this.userInfo.userMobile;
                let _params = {
                    content: this.form.content,
                    realName: this.form.realName,
                    mobile: _mobile,
                    picUrls: this.uploadImgs.toString(),
                };
                let submitFun = (params) => {
                    this.$callRawApi({
                        api: 'ws/cp/user/add',
                        params: params,
                    })
                        .then(() => {
                            this.$baseUI.confirm({
                                title: '提示',
                                content: '您的投诉建议提交成功！',
                                showCancel: false,
                                confirm: () => {
                                    this.form = {
                                        content: '',
                                        mobile: '',
                                        realName: '',
                                        code: '',
                                        picUrls: '',
                                    };
                                    this.uploadImgs = [];
                                    this.$refs.vbUpload.reset();
                                    this.isInputMobile = false;
                                    this.isShowVerify = false;
                                    this.disabled = true;
                                    this.countDown(0);
                                    this.getCaptchaToken();
                                    this.captchaData.captchaValue = '';
                                },
                            });
                        })
                        .catch((err) => {
                            this.$niceloo.api.handleFailure(err);
                            return Promise.reject(err);
                        })
                        .catch((data) => {
                            if (data.getAttachedData().getResultCode() === 'GB1000') {
                                this.$baseUI.confirm({
                                    title: '提示',
                                    content: data.getAttachedData().getMsg(),
                                    showCancel: false,
                                    confirm: () => {
                                        this.isShowVerify = true;
                                    },
                                });
                            }
                        });
                };
                if (this.isInputMobile || this.isShowVerify) {
                    let _code = this.form.code.trim();
                    if (!_code) {
                        this.tip.code = '请输入短信验证码！';
                        return false;
                    }
                    _params.verify = {
                        verifyPhone: _mobile,
                        verifyValue: _code,
                        verifyScene: 'suggest',
                    };
                    submitFun(_params);
                    return false;
                }
                submitFun(_params);
            }
        },
        //手机号信息输入事件
        mobileInput() {
            let _mobile = this.$refs.mobileInput.value;
            if (_mobile.length === 11) {
                this.form.mobile = _mobile;
                this.disabled = false;
                if (_mobile !== this.userInfo.userMobile) {
                    this.isInputMobile = true;
                } else {
                    this.isInputMobile = false;
                }
                return false;
            }
            return (this.disabled = true);
        },
        //输入框聚焦事件
        eventFocus(type) {
            switch (type) {
                case 'mobile':
                    if (this.form.mobile.indexOf('*') > 0) {
                        this.form.mobile = '';
                        this.disabled = true;
                    }
                    this.tip.mobile = '';
                    break;
                case 'content':
                    this.tip.content = '';
                    break;
                case 'name':
                    this.tip.realName = '';
                    break;
                case 'code':
                    this.tip.code = '';
                    break;
                case 'captchaValue':
                    this.tip.captchaValue = '';
                    break;
            }
        },
        //内容失焦事件
        eventContentBlur() {
            let content = this.form.content.trim();
            if (content.length < 2) {
                this.tip.content = '请详细描述您要反馈的问题！';
            } else {
                this.tip.content = '';
            }
        },
        //内容输入事件
        eventContentInput() {
            let content = this.form.content;
            if (content.length > 500) {
                this.tip.content = '最多支持500字，请简单总结下您要反馈的问题！';
            } else {
                this.tip.content = '';
            }
        },
        //姓名失焦事件
        eventNameBlur() {
            let name = this.form.realName.trim();
            if (name.length < 2) {
                this.tip.realName = '请填写您的姓名全称！';
            } else {
                this.tip.realName = '';
            }
        },
        //姓名输入事件
        eventNameInput() {
            let name = this.form.realName;
            if (name.length > 15) {
                this.tip.realName = '姓名最多可填写15个字！';
            } else {
                this.tip.realName = '';
            }
        },
        //获取短信验证码
        getSmsCode() {
            if (!this.validateMobile() || !this.validateCaptchaValue()) return;
            let params = {
                smsPhone: this.form.mobile.trim(),
                smstplNo: '010001',
                scene: 'suggest',
                captchaData: this.captchaData,
            };
            this.$callRawApi({
                api: 'mc/msg/sms/verifycode/send',
                params: params,
            })
                .then(() => {
                    this.tip.code = '';
                    this.tip.captchaValue = '';
                    this.countDown();
                })
                .catch((err) => {
                    if (err.getCode().includes('GB2009')) {
                        this.$baseUI.alert('图形验证码有误，请重新输入');
                    } else {
                        this.tip.code = err.getDescription();
                        this.$niceloo.api.handleFailure(err);
                    }
                    this.captchaData.captchaValue = '';
                    this.getCaptchaToken();
                    this.codeDisabled = false;
                });
        },
        //获取验证码倒计时
        countDown(t) {
            if (t < 1) {
                clearTimeout(this.timer);
                this.messageTxt = '获取验证码';
                this.codeDisabled = false;
                this.count = 60;
                return false;
            }
            this.codeDisabled = true;
            this.count = this.count - 1;
            this.messageTxt = this.count + '秒后重新发送';
            if (this.count === 0) {
                this.messageTxt = '重新发送';
                this.count = 60;
                this.codeDisabled = false;
                this.getCaptchaToken();
                this.captchaData.captchaValue = '';
                return false;
            }
            this.timer = setTimeout(this.countDown, 1000);
        },
        // 显示验证码
        handleCaptcha(result) {
            let info = encodeURIComponent(JSON.stringify(result.data));
            let popup = document.querySelector('#popup');
            popup.style.display = 'block';
            popup.src = `//umt.niceloo.com/captcha?info=${info}&t=${new Date().getTime()}`;
        },
        // 推送微信线索
        pushWxClue(clueExtension) {
            return new Promise((resolve, reject) => {
                loginApi.taAppletCluePushNew({
                    params: {
                        clueExtension,
                    },
                    success: (data) => {
                        resolve(data);
                    },
                    fail: (data, msg) => {
                        reject(msg);
                    },
                    error: (data, msg) => {
                        reject(msg);
                    },
                });
            }).catch((err) => {
                console.error(err);
            });
        },
        //获取 图形验证码 凭证
        getCaptchaToken() {
            this.$niceloo.api.call('uc/create-captcha', {
                captchaType: 'P', // 验证码类型
                captchaWidth: 96, // 验证码宽度
                captchaHeight: 40, // 验证码高度
                captchaSize: 4, // 验证码长度
                onsuccess: (data) => {
                    this.captchaData.captchaToken = data.captchaToken;
                    this.imgSrc = this.$urlUtils.getViewUrl(data.filePath);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
    directives: {
        preventReClick: (el, binding) => {
            el.addEventListener('click', () => {
                if (!el.disabled) {
                    el.disabled = true;
                    setTimeout(() => {
                        el.disabled = false;
                    }, binding.value || 2000);
                }
            });
        },
    },
};
</script>
<style lang="less" scoped>
@import './css/complaintsSuggestions.less';
/deep/.el-upload--picture-card:hover,
/deep/ .el-upload:focus {
    border-color: #f8323c;
    color: #f8323c;
}
</style>
