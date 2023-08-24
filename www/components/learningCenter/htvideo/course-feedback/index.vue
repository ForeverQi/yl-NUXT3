<template>
    <div class="feed-back-section">
        <img class="close" src="./asset/images/close.png" alt="" @click="handleClose" />
        <div class="feed-title">
            <div class="feed-des">
                优路教育不断提升自己、造就学员，开通了专项投诉建议通道，您可在下方提出自己的投诉与建议，进入全国客户服务质量监督以及审查流程。
            </div>
        </div>
        <div class="form-table">
            <div class="title">
                <img src="./asset/images/content.png" alt="" />
                <span>*</span>
                内容
                <span class="error-tip" v-if="tip.content">{{ tip.content }}</span>
            </div>
            <div class="content">
                <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="请尽量详细描述您所遇到的问题，有助于快速给您精准反馈！"
                    v-model="form.content"
                    maxlength="500"
                ></textarea>
                <span class="limit-text-tip">{{ form.content.length }}/500</span>
            </div>
            <!--{{ fileList }}-->
            <ul class="img-list">
                <li v-for="(img, index) in fileList" :key="index">
                    <!--@click="handleLookImg(img.response.filePath)"-->
                    <img
                        @click="handlePreviewImg(img.response.filePath)"
                        v-if="img.status === 'success'"
                        class="question-img"
                        :src="$urlUtils.getViewUrl(img.response.filePath)"
                        alt=""
                    />
                    <!--<img v-if="img.status === 'uploading' && item.beforeLoadUrl" class="question-img" :src="item.beforeLoadUrl" alt="" />-->
                    <!--v-if="img.status === 'uploading' v-if="item.src""-->
                    <div class="uploading" v-if="img.status === 'uploading'">
                        <span class="total"><span class="now" :style="{ width: (img.percentage / 100) * 58 + 'px' }"></span></span>
                        <span class="uploading-tip">上传中 {{ parsePercentage(img.percentage) }}%</span>
                    </div>
                    <span class="del-img" @click="handleDelImg(index, img)"></span>
                </li>
                <li v-if="fileList.length < 5" @click="handleSelectImg">
                    <img class="question-img" src="./asset/images/add-img.png" alt="" />
                </li>
            </ul>
            <div class="upload-img-tip">最多可添加五张图片，支持添加jpg或jpeg或png格式，每张图片大小不超过{{ size }}M。</div>
            <div class="title">
                <img src="./asset/images/name.png" alt="" />
                <span>*</span>
                姓名
                <span class="error-tip" v-if="tip.realName">{{ tip.realName }}</span>
            </div>
            <input type="text" placeholder="请输入您的姓名" maxlength="15" v-model.trim="form.realName" />
            <div class="title">
                <img src="./asset/images/tel.png" alt="" />
                <span>*</span>
                手机号
                <span class="error-tip" v-if="tip.tel">{{ tip.tel }}</span>
            </div>
            <input type="text" placeholder="请输入您的手机号" maxlength="11" v-model.trim="form.mobile" />
            <div class="title">
                <img src="./asset/images/num-check.png" alt="" />
                <span>*</span>
                图形验证码
                <span class="error-tip" v-if="tip.captchaValue">{{ tip.captchaValue }}</span>
            </div>
            <div class="verify-code">
                <input type="text" v-model="form.captchaValue" placeholder="请输入图形验证码" maxlength="4" />
                <img :src="imgSrc" class="captcha-img" @click="getCaptchaToken()" />
            </div>
            <div class="title">
                <img src="./asset/images/code.png" alt="" />
                <span>*</span>
                手机验证码
                <span class="error-tip" v-if="tip.code">{{ tip.code }}</span>
            </div>
            <div class="verify-code">
                <!-- @focus="eventFocus('code')"-->
                <input type="text" v-model="form.code" placeholder="请输入手机验证码" maxlength="6" />
                <button class="get-code" :disabled="codeDisabled" @click="handleGetSmsVerifycode" :class="codeDisabled ? 'gray' : ''">{{ messageTxt }}</button>
            </div>
            <button class="save" type="submit" @click="handleSubmit" :disabled="isDisable">提交建议</button>
        </div>

        <!--@success="upImgSuccess" :on-start="handleOnStart"-->
        <FileUpload ref="vbUpload" :limit="maxFileNumber" :on-progress="handleOnProgress" :accept="accept" :size="size" :on-success="handleOnSuccess" />
        <CourseImagePreview :pic="currentImg" v-if="isShowPreview" @close="closePreview"></CourseImagePreview>
    </div>
</template>

<script>
import '@/api/qa/api.WS1001.add-user-cp.js';
import FileUpload from '@/www/components/components/file-upload/index.vue';
import CourseImagePreview from '@/www/components/learningCenter/htvideo/course-image-preview/index.vue';
import '@/api/uc/api..create-captcha.js';
export default {
    name: 'index',
    components: { FileUpload, CourseImagePreview },
    data() {
        return {
            isDisable: false,
            size: 10,
            maxFileNumber: '5', // 上传文件个数
            accept: '.jpg,.jpeg,.png',
            fileList: [],
            form: {
                content: '',
                realName: '',
                mobile: '',
                picUrls: '',
                code: '',
                captchaValue: '',
            },
            tip: {
                content: '',
                name: '',
                tel: '',
                code: '',
                captchaValue: '',
            },
            mobileReg: null, //手机号正则
            disabled: true, //提交按钮是否可点
            codeDisabled: false, //获取验证码按钮是否可点
            messageTxt: '获取验证码',
            count: 60, //获取验证码倒计时时间
            timer: null, //验证码倒计时定时器
            currentImg: '',
            isShowPreview: false,
            imgSrc: '',
            captchaToken: '',
        };
    },
    mounted() {
        this.getCaptchaToken();
    },
    methods: {
        //图片预览
        handlePreviewImg(val) {
            this.currentImg = this.$urlUtils.getViewUrl(val);
            this.isShowPreview = true;
        },
        closePreview() {
            this.isShowPreview = false;
        },
        /*handleLookImg(val) {
            this.$refs.vbUpload.lookImg(val);
        },*/
        handleDelImg(index, val) {
            this.$refs.vbUpload.deleteFile(val);
            this.fileList.splice(index, 1);
        },
        handleClose() {
            this.$emit('doClose');
        },
        parsePercentage(val) {
            return parseInt(val, 10);
        },
        handleSelectImg() {
            if (this.fileList.length < this.maxFileNumber) {
                this.$refs.vbUpload.inputClick();
            }
        },
        /*handleOnStart(uploadFiles) {
            this.fileList = uploadFiles;
            this.fileList.forEach((item)=>{
                if(item){

                }
                var freader = new FileReader();
                freader.readAsDataURL(file);
                freader.onload = function(e) {  myImg.setAttribute(&#39;src&#39;, e.target.result); }
            })
        },*/
        handleOnProgress(ev, file, uploadFiles) {
            /*uploadFiles.forEach((item) => {
                if (item.status === 'uploading') {
                    var freader = new FileReader();
                    freader.onload = function (e) {
                        item.beforeLoadUrl = e.target.result;
                    };
                    freader.readAsDataURL(item.raw);
                }
            });*/
            console.log('进度条~~~查看src书香');
            console.log(uploadFiles);
            this.fileList = uploadFiles;
            console.log(ev, file, uploadFiles);
        },
        handleOnSuccess(ev, file, uploadFiles) {
            this.fileList = uploadFiles;
        },
        handleGetSmsVerifycode() {
            if (!this.validateMobile() || !this.validateCaptchaValue()) {
                return false;
            }
            const params = {
                smsPhone: this.form.mobile, // 短信模板编号
                smstplNo: '010001',
                captchaData: {
                    captchaValue: this.form.captchaValue,
                    captchaToken: this.captchaToken,
                },
                // 场景
                scene: 'suggest',
            };
            this.$callRawApi({
                api: 'mc/msg/sms/verifycode/send',
                params,
            })
                .then(() => {
                    this.countDown();
                })
                .catch((err) => {
                    if (err.getCode().includes('GB2009')) {
                        this.$baseUI.alert('图形验证码有误，请重新输入');
                    } else {
                        this.$niceloo.api.handleFailure(err);
                    }
                    this.form.captchaValue = '';
                    this.getCaptchaToken();
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
                this.form.captchaValue = '';
                this.getCaptchaToken();
                return false;
            }
            this.timer = setTimeout(this.countDown, 1000);
        },
        //校验内容
        validateContent() {
            if (!this.form.content) {
                this.tip.content = '请填写您要反馈的问题！';
                return false;
            }
            if (this.form.content.length < 2) {
                this.tip.content = '请详细描述您要反馈的问题！';
                return false;
            }
            if (!this.form.realName) {
                this.tip.realName = '请填写您的姓名！';
                return false;
            }
            if (this.form.realName.length < 2) {
                this.tip.realName = '请填写您的姓名全称！';
                return false;
            }
            this.tip.content = '';
            this.tip.realName = '';
            return true;
        },
        //校验手机号
        validateMobile() {
            if (!this.form.mobile) {
                this.tip.tel = '请输入您的手机号码，方便与您取得联系！';
                return false;
            }
            /*this.mobileReg = new RegExp(/^[1][3456789][0-9]{9}$/);*/
            if (this.form.mobile && !/^[1][3456789][0-9]{9}$/.test(this.form.mobile)) {
                this.tip.tel = '您输入的手机号格式错误！';
                return false;
            }
            this.tip.tel = '';
            return true;
        },
        //校验图形验证码
        validateCaptchaValue() {
            let captchaValue = this.form.captchaValue.trim();
            if (captchaValue === '') {
                this.tip.captchaValue = '图形验证码不能为空';
                return false;
            }
            this.tip.captchaValue = '';
            return true;
        },
        validateCode() {
            if (!this.form.code) {
                this.tip.code = '请输入短信验证码！';
                return false;
            }
            this.tip.code = '';
            return true;
        },
        handleSubmit() {
            this.isDisable = true;
            if (!this.validateContent() || !this.validateMobile() || !this.validateCode()) {
                this.isDisable = false;
                return;
            }
            let arr = [];
            if (this.fileList.length > 0) {
                this.fileList.forEach((item) => {
                    arr.push(item.response.filePath);
                });
            }
            this.$callApi('qa/add-user-cp', {
                content: this.form.content,
                picUrls: arr.join(','),
                mobile: this.form.mobile,
                realName: this.form.realName,
                verify: {
                    verifyPhone: this.form.mobile,
                    verifyValue: this.form.code,
                    verifyScene: 'suggest',
                },
                onsuccess: (data) => {
                    this.$baseUI.alert('您的意见反馈提交成功！');
                    /*this.$Message.success('您的投诉建议提交成功！');*/
                    this.$emit('doClose');
                },
                onerror: (err) => {
                    niceloo.api.handleFailure(err);
                },
                oncomplete: () => {
                    this.isDisable = false;
                },
            });
        },
        //获取 图形验证码 凭证
        getCaptchaToken() {
            this.$niceloo.api.call('uc/create-captcha', {
                captchaType: 'P', // 验证码类型
                captchaWidth: 71, // 验证码宽度
                captchaHeight: 28, // 验证码高度
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
.feed-back-section {
    height: 720px;
    background: #fff;
    overflow-y: auto;
    position: relative;
}
@media screen and (max-height: 800px) {
    .feed-back-section {
        height: 550px;
    }
}
.close {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 3;
    cursor: pointer;
}
.form-table {
    padding: 0 40px;
}
.feed-title {
    height: 190px;
    box-sizing: border-box;
    padding-top: 90px;
    background: url('./asset/images/feed-back-bg.png') no-repeat;
    background-size: 100%;
    background-position: center top;
    .feed-des {
        margin: 0 auto;
        width: 647px;
        font-size: 16px;
        font-weight: 400;
        text-align: left;
        color: #3a3d4b;
        line-height: 27px;
        position: relative;
        &:before {
            display: inline-block;
            background: url('./asset/images/icon-quotes-left.png') left top no-repeat;
            background-size: 14px 13px;
            position: absolute;
            top: 0;
            left: -27px;
            width: 14px;
            height: 13px;
            content: '';
        }
        &:after {
            display: inline-block;
            background: url('./asset/images/icon-quotes-right.png') left top no-repeat;
            background-size: 14px 13px;
            position: absolute;
            top: 34px;
            width: 14px;
            height: 13px;
            content: '';
            margin-left: 14px;
        }
    }
}
.img-list {
    display: inline-block;
    li {
        width: 80px;
        height: 80px;
        float: left;
        margin-right: 14px;
        position: relative;
        .question-img {
            float: left;
            width: 80px;
            height: 80px;
            border: 1px solid #c2c3d0;
            border-radius: 6px;
            cursor: pointer;
        }
        .uploading {
            background: rgba(0, 0, 0, 0.6);
            border-radius: 6px;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            .total {
                display: block;
                width: 58px;
                height: 4px;
                background: #ffffff;
                border-radius: 2px;
                position: relative;
                margin: 20px auto 0;
            }
            .now {
                display: inline-block;
                height: 4px;
                background: linear-gradient(154deg, #f8323c 0%, #ff737a 100%);
                border-radius: 2px;
                position: absolute;
                left: 0;
            }
            .uploading-tip {
                width: 45px;
                height: 32px;
                font-size: 12px;
                text-align: center;
                color: #ffffff;
                line-height: 16px;
                letter-spacing: 0.25px;
                margin: 6px auto 0;
                display: inherit;
            }
        }
        .del-img {
            top: -8px;
            right: -8px;
            position: absolute;
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url('./asset/images/del-img.png') no-repeat;
            background-size: 16px;
            cursor: pointer;
        }
        &:last-child {
            margin-right: 0;
        }
    }
}
.upload-img-tip {
    margin-top: 7px;
    font-size: 12px;
    color: #ff2e30;
    line-height: 16px;
    letter-spacing: 0.25px;
    margin-bottom: 30px;
}
.title {
    font-size: 16px;
    color: #3a3d4b;
    line-height: 22px;
    height: 22px;
    margin-bottom: 10px;
    img {
        width: 16px;
        height: 16px;
        position: relative;
        top: 2px;
    }
    span {
        font-size: 16px;
        color: #ff2e30;
        line-height: 22px;
        margin-bottom: 10px;
    }

    .error-tip {
        display: inline-block;
        font-size: 12px;
        margin-left: 5px;
        color: #ff2e30;
        line-height: 16px;
        letter-spacing: 0.25px;
    }
}
.content {
    position: relative;
    width: 100%;
    height: 90px;
    border: 1px solid #c2c3d0;
    border-radius: 6px;
    padding-left: 21px;
    padding-bottom: 26px;
    margin-bottom: 12px;
}
textarea {
    border-top-right-radius: 6px;
    padding-top: 14px;
    padding-right: 21px;
    border: none;
    box-sizing: border-box;
    resize: none;
    outline: none;
    width: 100%;
    border: none;
    height: 100%;
}
.limit-text-tip {
    color: #9799a8;
    font-size: 14px;
    position: absolute;
    right: 20px;
    bottom: 5px;
}
.verify-code {
    position: relative;
    width: 420px;
}
input {
    width: 420px;
    height: 36px;
    line-height: 36px;
    border: 1px solid #c2c3d0;
    border-radius: 6px;
    padding: 0 20px;
    font-size: 14px;
    color: #9799a8;
    letter-spacing: 0.29px;
    margin-bottom: 30px;
    box-sizing: border-box;
    outline: none;
}
.get-code {
    display: inline-block;
    height: 36px;
    border: 0;
    background: none;
    border-radius: 6px;
    margin-left: 10px;
    cursor: pointer;
    position: absolute;
    right: 20px;
    font-size: 14px;
    color: #ff2e30;
    letter-spacing: 0.29px;
    outline: none;
}
.captcha-img {
    height: 28px;
    width: 71px;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 4px;
}
.gray {
    color: #9799a8;
    cursor: not-allowed;
}
.save {
    width: 340px;
    height: 40px;
    display: block;
    margin: 0 auto;
    background: linear-gradient(90deg, #ff6870, #f8323c);
    border-radius: 21px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
    line-height: 40px;
    cursor: pointer;
    margin-bottom: 30px;
}
</style>
