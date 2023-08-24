<template>
    <div v-if="isShowPopup" :class="from == 'unih5' ? 'unih5' : ''">
        <div class="popDivOverlay">
            <div class="login-register-box">
                <span class="yljy_close" @click="closePopup" v-if="from != 'unih5'"></span>
                <login-popup v-if="isLoginPopup" @jumpToRegister="jumpToRegister" @loginSuccess="loginSuccess"></login-popup>
                <register-popup v-if="isRegisterPopup" @jumpToLogin="jumpToLogin"></register-popup>
            </div>
        </div>
    </div>
</template>

<script>
import loginPopup from '@/www/components/uc/login/loginPopup';
import registerPopup from '@/www/components/uc/login//registerPopup/index.vue';

export default {
    name: 'loginRegisterPopup',
    components: { loginPopup, registerPopup },
    layout: 'nullLayout',
    data() {
        return {
            from: '',
            isShowPopup: true,
            isLoginPopup: true,
            isRegisterPopup: false,
        };
    },
    created() {},
    async mounted() {
        if (await this.$User.isLogined()) {
            this.loginSuccess();
        }
        this.from = this.$urlUtils.getUrlParam('from');
    },
    methods: {
        sendMessage(func, args) {
            window.parent.postMessage(
                {
                    func,
                    args,
                },
                '*'
            );
        },
        //跳转到注册页面
        jumpToRegister() {
            this.isLoginPopup = false;
            this.isRegisterPopup = true;
        },
        //跳转到登录页面
        jumpToLogin() {
            this.isLoginPopup = true;
            this.isRegisterPopup = false;
        },
        //登录成功
        async loginSuccess() {
            let vm = this;
            let token = this.$User.getToken();
            let user = await this.$User.getUser();
            vm.sendMessage('loginedo', { token, user });
        },
        //关闭弹窗
        closePopup() {},
    },
};
</script>

<style lang="less">
@media screen and (min-device-width: 700px) {
    body {
        background: none !important;
    }

    .popDivOverlay {
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 98;
        display: flex;
        align-items: center;

        &.popDivOverlay_bg {
            background: rgba(0, 0, 0, 0.6);
        }
    }

    .yljy_close {
        width: 32px;
        height: 32px;
        display: inline-block;
        background: url('asset/images/nl_close.png') no-repeat center center;
        position: absolute;
        top: -16px;
        right: -16px;
        cursor: pointer;
        padding: 3px;
    }

    .login-register-box {
        position: relative;
        width: 390px;
        /*width: 490px;*/
        margin: 0 auto;
        background: #ffffff;
        padding: 10px 30px;
        border-radius: 10px;
        min-height: 420px;
    }

    /*@import ./css/login.css";*/

    /*登录注册内容区*/
    .nlf_tit {
        line-height: 50px;
        height: 50px;
    }

    .nlf_tit ul li {
        line-height: 50px;
        width: 50%;
        float: left;
        border-bottom: 1px solid #e7e7e7;
        color: #999;
        font-size: 20px;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
    }

    .nlf_tit ul li.active {
        border-bottom: 1px solid #ed5736;
        color: #ed5736;
    }

    .nlf_tit ul li.all {
        width: 100%;
        cursor: default;
        border-bottom: 1px solid #e7e7e7;
        color: #999;
    }

    .nlf_con {
        padding-top: 10px;
    }

    .nlf_item {
        /*display: none;*/
    }

    .nlf_item.block {
        display: block;
    }

    .nlf_lab {
        height: 48px;
        position: relative;
        margin-top: 15px;
    }

    .nlf_inp {
        height: 46px;
        line-height: 46px;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        padding: 0 10px 0 35px;
        width: 100%;
        outline: none;
        box-sizing: border-box;
    }

    .nlf_inp.nlf_pwd {
        padding: 0 35px;
        width: 100%;
    }

    .nlf_yzminp {
        height: 46px;
        line-height: 46px;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        padding: 0 10px 0 35px;
        width: 193px;
        outline: none;
    }

    .yzm_btn {
        height: 46px;
        line-height: 46px;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        background: #fff;
        position: absolute;
        left: 250px;
        top: 0;
        width: 140px;
        color: #ed5736;
        font-size: 14px;
        cursor: pointer;
        outline: none;
    }

    .yzm_btn.gray {
        background: #efefef;
        border: 1px solid #e7e7e7;
        color: #ed5736;
    }

    .yzm_img {
        position: absolute;
        left: 250px;
        top: 0;
        width: 138px;
        height: 46px;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        cursor: pointer;
    }

    .nlf_lab i {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url('asset/images/nl_icon2.png') no-repeat;
        position: absolute;
        top: 14px;
        left: 7px;
    }

    .nlf_lab i.user {
        background-position: -40px 0;
    }

    .nlf_lab i.password {
        background-position: -20px -20px;
    }

    .nlf_lab i.tel {
        background-position: -20px 0;
        margin-top: 0px;
    }

    .nlf_lab i.picYzm {
        background-position: -60px 0;
    }

    .nlf_lab i.messYzm {
        background-position: 0 -20px;
    }

    .nlf_lab i.eye {
        background-position: -40px -20px;
        right: 7px;
        left: auto;
        cursor: pointer;
        display: none \9;
    }

    .nlf_lab i.eye.open {
        background-position: -60px -20px;
        right: 7px;
        left: auto;
        cursor: pointer;
        display: none \9;
    }

    .nlf_tip {
        margin: 5px 0;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .nlf_sp {
        color: #333;
        font-size: 14px;
    }

    .nlf_p {
        color: #333;
        font-size: 14px;
        line-height: 18px;
    }

    .nlf_rt {
        color: #333;
        font-size: 14px;
    }

    .link {
        color: #ed5736;
    }

    .nlf_btnbox {
        padding: 30px 0 20px;
    }

    .nlf_btn {
        width: 390px;
        height: 48px;
        border-radius: 24px;
        border: none;
        outline: none;
        cursor: pointer;
        color: #fff;
        font-size: 24px;
        letter-spacing: 2px;
        display: inline-block;
        text-align: center;
        line-height: 46px;
        background: #d52e26;
        background: -webkit-linear-gradient(left, #d52e26, #ed5736);
        background: -o-linear-gradient(right, #d52e26, #ed5736);
        background: -moz-linear-gradient(right, #d52e26, #ed5736);
        background: linear-gradient(to right, #d52e26, #ed5736);
        -moz-box-shadow: 0 10px 10px #f8b3a4;
        -webkit-box-shadow: 0 10px 10px #f8b3a4;
        box-shadow: 0 10px 10px #f8b3a4;
    }

    .nlf_other {
        text-align: center;
        padding-top: 10px;
    }

    .nlf_other span {
        color: #333;
        font-size: 14px;
        display: inline-block;
        line-height: 32px;
        position: relative;
        padding-right: 35px;
    }

    .nlf_other i.wx {
        display: inline-block;
        width: 32px;
        height: 32px;
        background: url('asset/images/nl_wx.png') no-repeat center center;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
    }

    .nl_fpdform {
        width: 390px;
        margin: 0 auto;
        clear: both;
        padding: 0 0 20px;
    }

    .nlm_tit {
        padding: 0 30px;
        text-align: right;
        line-height: 35px;
    }

    .nlm_a {
        color: #ed5736;
        font-size: 18px;
    }

    .nlm_a span {
        color: #333;
    }

    .nlm_sp {
        color: #e7e7e7;
        font-size: 18px;
        padding: 0 5px;
    }

    .nlm_psdtt {
        padding: 10px 0;
        height: 70px;
        *padding: 10px 0 30px;
    }

    .nlm_psdtt:after {
        content: '';
        height: 0;
        display: block;
        clear: both;
    }

    .nlp_lifo {
        width: 42px;
        position: relative;
        float: left;
    }

    .nlp_num {
        display: inline-block;
        width: 42px;
        height: 42px;
        background: url('asset/images/nl_icon.png') no-repeat;
        background-position: -42px 0;
        text-align: center;
        line-height: 42px;
        color: #fff;
        font-size: 20px;
    }

    .nlp_p {
        color: #999;
        font-size: 18px;
        width: 120px;
        margin: 5px 0 0 -39px;
        text-align: center;
        font-weight: bold;
    }

    .nlp_lifg {
        width: 116px;
        float: left;
        margin: 5px 8px;
        *margin: 20px 8px;
    }

    .nlp_fg {
        width: 116px;
        height: 3px;
        display: inline-block;
        background: url('asset/images/nl_icon1.png') no-repeat;
    }

    .nlp_lifo.active .nlp_num {
        background-position: 0 0;
    }

    .nlp_lifo.active .nlp_p {
        color: #ed5736;
    }

    .nlp_lifg.active .nlp_fg {
        background-position: 0 -3px;
    }

    .nl_fpdform .nlf_lab {
        margin-top: 30px;
    }

    .nl_fpdform .nlf_btnbox {
        padding: 40px 0 20px;
    }

    .nlf_errtip {
        font-size: 12px;
        color: #ed5736;
        line-height: 20px;
        margin-bottom: -10px;
        height: 20px;
    }

    .nlf_errtip span {
        color: #333;
    }

    .psd_sp {
        color: #333;
        font-size: 20px;
        display: inline-block;
        line-height: 48px;
        width: 105px;
        float: left;
    }

    .nlf_psdinp {
        height: 46px;
        line-height: 46px;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        padding: 0 10px;
        width: 263px;
        outline: none;
    }

    .psd_errtip {
        font-size: 12px;
        color: #ed5736;
        line-height: 48px;
        position: absolute;
        left: 395px;
        top: 0;
        width: 300px;
    }

    .psd_errtip img {
        margin-top: 15px;
    }

    .nlf_succes {
        margin-top: 20px;
        padding: 60px 100px 60px 0;
        background: url('asset/images/nl_fg.png') no-repeat right center;
    }

    .nfs_p {
        color: #333;
        font-size: 18px;
        line-height: 30px;
    }

    .nfs_p a {
        color: #333;
    }

    .nfs_time {
        color: #ed5736;
    }

    .nfs_tip {
        color: #ed5736;
        font-size: 12px;
        line-height: 30px;
    }

    /*图形验证码*/
    .img-captcha {
        height: 46px;
        line-height: 46px;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        background: #fff;
        position: absolute;
        left: 250px;
        top: 0;
        width: 140px;
        /*width: 92px;*/
        color: #ed5736;
        font-size: 14px;
        cursor: pointer;
        outline: none;
    }

    .cbox {
        -webkit-appearance: checkbox;
    }
}

@media screen and (max-device-width: 700px) {
    body {
        background: none !important;
    }
    html {
        /* font-size: 625% !important; !*100 ÷ 16 × 100% = 625%   1rem=100px*!*/
        /*  font-size: 285% !important; !*100 ÷ 16 × 100% = 625%   1rem=100px*!*/
        font-size: 46px !important;
    }
    .popDivOverlay {
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 98;
        /*cursor: pointer;*/
        /*filter: alpha(opacity=60);
            -moz-opacity: 0.6;
            -khtml-opacity: 0.6;
            opacity: 0.6;*/
        display: flex;
        align-items: center;
    }
    .popDivOverlay_bg {
        background: rgba(0, 0, 0, 0.6);
    }

    .yljy_close {
        width: 0.72rem;
        height: 0.72rem;
        display: inline-block;
        background: url('asset/images/nl_close.png') no-repeat center center;
        position: absolute;
        top: -0.36rem;
        right: -0.36rem;
        cursor: pointer;
        padding: 0.03rem;
        background-size: 0.7rem 0.7rem;
    }

    .login-register-box {
        position: relative;
        width: 75%;
        /*width: 490rem;*/
        margin: 0 auto;
        background: #ffffff;
        padding: 0.3rem 0.4rem;
        border-radius: 0.2rem;
        min-height: 7.2rem;
    }

    /*@import "../../asset/css/login.css";*/

    /*登录注册内容区*/
    .nlf_tit {
        line-height: 1rem;
        height: 1rem;
    }

    .nlf_tit ul li {
        line-height: 1rem;
        width: 50%;
        float: left;
        border-bottom: 1px solid #e7e7e7;
        color: #999;
        font-size: 0.45rem;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
    }

    .nlf_tit ul li.active {
        border-bottom: 1px solid #ed5736;
        color: #ed5736;
    }

    .nlf_tit ul li.all {
        width: 100%;
        cursor: default;
        border-bottom: 1px solid #e7e7e7;
        color: #999;
    }

    .nlf_con {
        padding-top: 0.1rem;
    }

    .nlf_item {
        /*display: none;*/
    }

    .nlf_item.block {
        display: block;
    }

    .nlf_lab {
        height: 1rem;
        position: relative;
        margin-top: 0.3rem;
        line-height: 0rem;
    }

    .nlf_inp {
        height: 1rem;
        border: 1px solid #e7e7e7;
        border-radius: 0.04rem;
        padding: 0 0.1rem 0 0.1rem;
        /*width: 3.43rem;*/
        width: 100%;
        outline: none;
        box-sizing: border-box;
        font-size: 0.35rem;
    }

    .nlf_inp.nlf_pwd {
        padding: 0 0.35rem 0 0.1rem;
        width: 100%;
    }

    .nlf_yzminp {
        height: 1rem;
        border: 1px solid #e7e7e7;
        border-radius: 0.04rem;
        padding: 0 0.1rem 0 0.1rem;
        width: 4rem;
        outline: none;
        font-size: 0.35rem;
    }

    .yzm_btn {
        height: 1rem;
        line-height: 1rem;
        border: 1px solid #e7e7e7;
        border-radius: 0.04rem;
        background: #fff;
        position: relative;
        left: auto;
        right: 0rem;
        top: 0;
        width: 8.8rem;
        color: #ed5736;
        font-size: 0.3rem;
        cursor: pointer;
        outline: none;
    }

    .yzm_btn.gray {
        background: #efefef;
        border: 1px solid #e7e7e7;
        color: #ed5736;
    }

    .yzm_img {
        position: absolute;
        left: 2.5rem;
        top: 0;
        width: 1.38rem;
        height: 0.46rem;
        border: 1px solid #e7e7e7;
        border-radius: 0.04rem;
        cursor: pointer;
    }

    .nlf_lab i {
        width: 0.2rem;
        height: 0.2rem;
        display: inline-block;
        background: url('asset/images/nl_icon2.png') no-repeat;
        position: absolute;
        top: 0.14rem;
        left: 0.07rem;
        display: none;
    }

    .nlf_lab i.user {
        background-position: -0.4rem 0;
    }

    .nlf_lab i.password {
        background-position: -0.2rem -0.2rem;
    }

    .nlf_lab i.tel {
        background-position: -0.2rem 0;
        margin-top: 0px;
    }

    .nlf_lab i.picYzm {
        background-position: -0.6rem 0;
    }

    .nlf_lab i.messYzm {
        background-position: 0 -0.2rem;
    }

    .nlf_lab i.eye {
        background-position: -0.4rem -0.2rem;
        right: 0.07rem;
        left: auto;
        cursor: pointer;
        display: none \9;
    }

    .nlf_lab i.eye.open {
        background-position: -0.6rem -0.2rem;
        right: 0.07rem;
        left: auto;
        cursor: pointer;
        display: none \9;
    }

    .nlf_tip {
        margin: 0.05rem 0;
        line-height: 0.7rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .nlf_sp {
        color: #333;
        font-size: 0.3rem;
    }

    .nlf_p {
        color: #333;
        font-size: 0.3rem;
        line-height: 0.38rem;
        padding: 0.15rem 0rem;
    }

    .nlf_rt {
        color: #333;
        font-size: 0.3rem;
    }

    .link {
        color: #ed5736;
    }

    .nlf_btnbox {
        padding: 0.3rem 0 0.2rem;
    }

    .nlf_btn {
        width: 100%;
        height: 1rem;
        border-radius: 0.5rem;
        border: none;
        outline: none;
        cursor: pointer;
        color: #fff;
        font-size: 0.4rem;
        letter-spacing: 0.02rem;
        display: inline-block;
        text-align: center;
        line-height: 0.46rem;
        background: #d52e26;
        background: -webkit-linear-gradient(left, #d52e26, #ed5736);
        background: -o-linear-gradient(right, #d52e26, #ed5736);
        background: -moz-linear-gradient(right, #d52e26, #ed5736);
        background: linear-gradient(to right, #d52e26, #ed5736);
        -moz-box-shadow: 0 0.1rem 0.1rem #f8b3a4;
        -webkit-box-shadow: 0 0.1rem 0.1rem #f8b3a4;
        box-shadow: 0 0.1rem 0.1rem #f8b3a4;
    }

    .nlf_other {
        text-align: center;
        padding-top: 0.1rem;
    }

    .nlf_other span {
        color: #333;
        font-size: 0.14rem;
        display: inline-block;
        line-height: 0.32rem;
        position: relative;
        padding-right: 0.35rem;
    }

    .nlf_other i.wx {
        display: inline-block;
        width: 0.32rem;
        height: 0.32rem;
        background: url('asset/images/nl_wx.png') no-repeat center center;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
    }

    .nl_fpdform {
        width: 3.9rem;
        margin: 0 auto;
        clear: both;
        padding: 0 0 0.2rem;
    }

    .nlm_tit {
        padding: 0 0.3rem;
        text-align: right;
        line-height: 0.35rem;
    }

    .nlm_a {
        color: #ed5736;
        font-size: 0.18rem;
    }

    .nlm_a span {
        color: #333;
    }

    .nlm_sp {
        color: #e7e7e7;
        font-size: 0.18rem;
        padding: 0 0.35rem;
    }

    .nlm_psdtt {
        padding: 0.1rem 0;
        height: 0.7rem;
        *padding: 0.1rem 0 0.3rem;
    }

    .nlm_psdtt:after {
        content: '';
        height: 0;
        display: block;
        clear: both;
    }

    .nlp_lifo {
        width: 0.42rem;
        position: relative;
        float: left;
    }

    .nlp_num {
        display: inline-block;
        width: 0.42rem;
        height: 0.42rem;
        background: url('asset/images/nl_icon.png') no-repeat;
        background-position: -0.42rem 0;
        text-align: center;
        line-height: 0.42rem;
        color: #fff;
        font-size: 0.2rem;
    }

    .nlp_p {
        color: #999;
        font-size: 0.18rem;
        width: 1.2rem;
        margin: 0.05rem 0 0 -0.39rem;
        text-align: center;
        font-weight: bold;
    }

    .nlp_lifg {
        width: 1.16rem;
        float: left;
        margin: 0.05rem 0.08rem;
        *margin: 0.2rem 0.08rem;
    }

    .nlp_fg {
        width: 1.16rem;
        height: 0.03rem;
        display: inline-block;
        background: url('asset/images/nl_icon1.png') no-repeat;
    }

    .nlp_lifo.active .nlp_num {
        background-position: 0 0;
    }

    .nlp_lifo.active .nlp_p {
        color: #ed5736;
    }

    .nlp_lifg.active .nlp_fg {
        background-position: 0 -0.03rem;
    }

    .nl_fpdform .nlf_lab {
        margin-top: 0.3rem;
    }

    .nl_fpdform .nlf_btnbox {
        padding: 0.4rem 0 0.2rem;
    }

    .nlf_errtip {
        font-size: 0.3rem;
        color: #ed5736;
        line-height: 0.4rem;
        margin-bottom: -0.1rem;
        height: 0.4rem;
    }

    .nlf_errtip span {
        color: #333;
    }

    .psd_sp {
        color: #333;
        font-size: 0.2rem;
        display: inline-block;
        line-height: 0.48rem;
        width: 1.05rem;
        float: left;
    }

    .nlf_psdinp {
        height: 0.46rem;
        line-height: 0.46rem;
        border: 1px solid #e7e7e7;
        border-radius: 0.04rem;
        padding: 0 0.1rem;
        width: 2.63rem;
        outline: none;
    }

    .psd_errtip {
        font-size: 0.12rem;
        color: #ed5736;
        line-height: 0.48rem;
        position: absolute;
        left: 3.95rem;
        top: 0;
        width: 3rem;
    }

    .psd_errtip img {
        margin-top: 0.15rem;
    }

    .nlf_succes {
        margin-top: 0.2rem;
        padding: 0.6rem 1rem 0.6rem 0;
        background: url('asset/images/nl_fg.png') no-repeat right center;
    }

    .nfs_p {
        color: #333;
        font-size: 0.18rem;
        line-height: 0.3rem;
    }

    .nfs_p a {
        color: #333;
    }

    .nfs_time {
        color: #ed5736;
    }

    .nfs_tip {
        color: #ed5736;
        font-size: 0.12rem;
        line-height: 0.3rem;
    }

    .txyzm {
        display: flex;
        justify-content: space-between;

        .img-captcha {
            height: 1rem;
            height: 1rem;
            border: 1px solid #e7e7e7;
            border-radius: 0.04rem;
            background: #fff;
            position: relative;
            left: 0rem;
            top: 0;
            width: 8.8em;
            /*width: 92rem;*/
            color: #ed5736;
            font-size: 0.14rem;
            cursor: pointer;
            outline: none;
        }
    }

    .dxyzm {
        display: flex;
        justify-content: space-between;

        .yzm_btn {
            margin-left: 10px;
        }
    }

    .cbox {
        width: 0.3rem;
        height: 0.3rem;
        -webkit-appearance: checkbox;
    }
}

.unih5 {
    font-size: 14px;

    body {
        background: none !important;
    }

    .popDivOverlay {
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 98;
        /*cursor: pointer;*/
        /*filter: alpha(opacity=60);
        -moz-opacity: 0.6;
        -khtml-opacity: 0.6;
        opacity: 0.6;*/
        display: flex;
        align-items: center;
    }

    .popDivOverlay_bg {
        background: rgba(0, 0, 0, 0.6);
    }

    .yljy_close {
        width: 32px;
        height: 32px;
        display: inline-block;
        background: url('asset/images/nl_close.png') no-repeat center center;
        position: absolute;
        top: -16px;
        right: -16px;
        cursor: pointer;
        padding: 3px;
    }

    .login-register-box {
        position: relative;
        width: 75%;
        /*width: 490px;*/
        margin: 0 auto;
        background: #ffffff;
        padding: 10px 20px;
        border-radius: 10px;
        min-height: 350px;
    }

    /*@import "../../asset/css/login.css";*/

    /*登录注册内容区*/
    .nlf_tit {
        line-height: 50px;
        height: 50px;
    }

    .nlf_tit ul li {
        line-height: 50px;
        width: 50%;
        float: left;
        border-bottom: 1px solid #e7e7e7;
        color: #999;
        font-size: 20px;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
    }

    .nlf_tit ul li.active {
        border-bottom: 1px solid #ed5736;
        color: #ed5736;
    }

    .nlf_tit ul li.all {
        width: 100%;
        cursor: default;
        border-bottom: 1px solid #e7e7e7;
        color: #999;
    }

    .nlf_con {
        padding-top: 10px;
    }

    .nlf_item {
        /*display: none;*/
    }

    .nlf_item.block {
        display: block;
    }

    .nlf_lab {
        height: 48px;
        position: relative;
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
    }

    .nlf_inp {
        height: 46px;
        line-height: 46px;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        padding: 0 10px 0 35px;
        width: 100%;
        outline: none;
        box-sizing: border-box;
        font-size: 15px;
    }

    .nlf_inp.nlf_pwd {
        padding: 0 35px;
        width: 100%;
    }

    .nlf_yzminp {
        height: 46px;
        line-height: 46px;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        padding: 0 10px 0 35px;
        width: 130px;
        outline: none;
        font-size: 15px;
        flex: 1;
        width: auto;
        min-width: 50px;
    }

    .yzm_btn {
        height: 46px;
        line-height: 46px;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        background: #fff;
        /*position: absolute;*/
        position: relative;
        left: auto;
        top: 0;
        width: 105px;
        color: #ed5736;
        font-size: 13px;
        cursor: pointer;
        outline: none;
        right: 0px;
        margin-left: 10px;
    }

    .yzm_btn.gray {
        background: #efefef;
        border: 1px solid #e7e7e7;
        color: #ed5736;
    }

    .yzm_img {
        position: absolute;
        left: 250px;
        top: 0;
        width: 138px;
        height: 46px;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        cursor: pointer;
    }

    .nlf_lab i {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url('asset/images/nl_icon2.png') no-repeat;
        position: absolute;
        top: 14px;
        left: 7px;
    }

    .nlf_lab i.user {
        background-position: -40px 0;
    }

    .nlf_lab i.password {
        background-position: -20px -20px;
    }

    .nlf_lab i.tel {
        background-position: -20px 0;
        margin-top: 0px;
    }

    .nlf_lab i.picYzm {
        background-position: -60px 0;
    }

    .nlf_lab i.messYzm {
        background-position: 0 -20px;
    }

    .nlf_lab i.eye {
        background-position: -40px -20px;
        right: 7px;
        left: auto;
        cursor: pointer;
        display: none \9;
    }

    .nlf_lab i.eye.open {
        background-position: -60px -20px;
        right: 7px;
        left: auto;
        cursor: pointer;
        display: none \9;
    }

    .nlf_tip {
        margin: 5px 0;
        line-height: 25px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .nlf_sp {
        color: #333;
        font-size: 12px;
    }

    .nlf_p {
        color: #333;
        font-size: 12px;
        line-height: 18px;
        padding: 0px;
    }

    .nlf_rt {
        color: #333;
        font-size: 12px;
        position: relative;
    }

    .link {
        color: #ed5736;
    }

    .nlf_btnbox {
        padding: 30px 0 20px;
    }

    .nlf_btn {
        width: 100%;
        height: 40px;
        border-radius: 24px;
        border: none;
        outline: none;
        cursor: pointer;
        color: #fff;
        font-size: 20px;
        letter-spacing: 2px;
        display: inline-block;
        text-align: center;
        line-height: 40px;
        background: #d52e26;
        background: -webkit-linear-gradient(left, #d52e26, #ed5736);
        background: -o-linear-gradient(right, #d52e26, #ed5736);
        background: -moz-linear-gradient(right, #d52e26, #ed5736);
        background: linear-gradient(to right, #d52e26, #ed5736);
        -moz-box-shadow: 0 10px 10px #f8b3a4;
        -webkit-box-shadow: 0 10px 10px #f8b3a4;
        box-shadow: 0 10px 10px #f8b3a4;
    }

    .nlf_other {
        text-align: center;
        padding-top: 10px;
    }

    .nlf_other span {
        color: #333;
        font-size: 14px;
        display: inline-block;
        line-height: 32px;
        position: relative;
        padding-right: 35px;
    }

    .nlf_other i.wx {
        display: inline-block;
        width: 32px;
        height: 32px;
        background: url('asset/images/nl_wx.png') no-repeat center center;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
    }

    .nl_fpdform {
        width: 390px;
        margin: 0 auto;
        clear: both;
        padding: 0 0 20px;
    }

    .nlm_tit {
        padding: 0 30px;
        text-align: right;
        line-height: 35px;
    }

    .nlm_a {
        color: #ed5736;
        font-size: 18px;
    }

    .nlm_a span {
        color: #333;
    }

    .nlm_sp {
        color: #e7e7e7;
        font-size: 18px;
        padding: 0 5px;
    }

    .nlm_psdtt {
        padding: 10px 0;
        height: 70px;
        *padding: 10px 0 30px;
    }

    .nlm_psdtt:after {
        content: '';
        height: 0;
        display: block;
        clear: both;
    }

    .nlp_lifo {
        width: 42px;
        position: relative;
        float: left;
    }

    .nlp_num {
        display: inline-block;
        width: 42px;
        height: 42px;
        background: url('asset/images/nl_icon.png') no-repeat;
        background-position: -42px 0;
        text-align: center;
        line-height: 42px;
        color: #fff;
        font-size: 20px;
    }

    .nlp_p {
        color: #999;
        font-size: 18px;
        width: 120px;
        margin: 5px 0 0 -39px;
        text-align: center;
        font-weight: bold;
    }

    .nlp_lifg {
        width: 116px;
        float: left;
        margin: 5px 8px;
        *margin: 20px 8px;
    }

    .nlp_fg {
        width: 116px;
        height: 3px;
        display: inline-block;
        background: url('asset/images/nl_icon1.png') no-repeat;
    }

    .nlp_lifo.active .nlp_num {
        background-position: 0 0;
    }

    .nlp_lifo.active .nlp_p {
        color: #ed5736;
    }

    .nlp_lifg.active .nlp_fg {
        background-position: 0 -3px;
    }

    .nl_fpdform .nlf_lab {
        margin-top: 30px;
    }

    .nl_fpdform .nlf_btnbox {
        padding: 40px 0 20px;
    }

    .nlf_errtip {
        font-size: 12px;
        color: #ed5736;
        line-height: 20px;
        margin-bottom: -10px;
        height: 20px;
    }

    .nlf_errtip span {
        color: #333;
    }

    .psd_sp {
        color: #333;
        font-size: 20px;
        display: inline-block;
        line-height: 48px;
        width: 105px;
        float: left;
    }

    .nlf_psdinp {
        height: 46px;
        line-height: 46px;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        padding: 0 10px;
        width: 263px;
        outline: none;
    }

    .psd_errtip {
        font-size: 12px;
        color: #ed5736;
        line-height: 48px;
        position: absolute;
        left: 395px;
        top: 0;
        width: 300px;
    }

    .psd_errtip img {
        margin-top: 15px;
    }

    .nlf_succes {
        margin-top: 20px;
        padding: 60px 100px 60px 0;
        background: url('asset/images/nl_fg.png') no-repeat right center;
    }

    .nfs_p {
        color: #333;
        font-size: 18px;
        line-height: 30px;
    }

    .nfs_p a {
        color: #333;
    }

    .nfs_time {
        color: #ed5736;
    }

    .nfs_tip {
        color: #ed5736;
        font-size: 12px;
        line-height: 30px;
    }

    /*图形验证码*/
    .img-captcha {
        height: 46px;
        line-height: 46px;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        background: #fff;
        position: relative;
        left: 0px;
        top: 0;
        width: 105px;
        /*width: 92px;*/
        color: #ed5736;
        font-size: 14px;
        cursor: pointer;
        outline: none;
        margin-left: 10px;
    }

    .cbox {
        width: 15px;
        height: 15px;
        -webkit-appearance: checkbox;
    }
}

.mkp_bm {
    font-size: 16px;
}
</style>
