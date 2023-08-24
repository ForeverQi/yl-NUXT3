<template>
    <div>
        <div v-if="tipFlag" style="position: fixed; left: 50%; color: #00adff; transform: translateX(-50%); font-size: 30px">
            正在打开支付链接，请勿关闭......
        </div>
        <div :class="{ errorTip }" v-if="tipError">
            <div class="mk_tipbox">
                <div class="mkp_top">
                    <div class="mkp_tit">提示</div>
                    <div class="mkp_con">
                        <p>{{ errorMsg }}</p>
                    </div>
                </div>
                <div class="mkp_bm" ref="mkp_bm">
                    <span class="btn mkp_confirm" @click="hideThis">确定</span>
                </div>
            </div>
        </div>
        <div v-if="tipError2" style="position: fixed; left: 50%; color: #00adff; transform: translateX(-50%); font-size: 30px">请关闭此页面</div>
    </div>
</template>

<script>
import '@/api/uc/api.PC0003.initiate-pay';
export default {
    layout: 'nullLayout',
    data() {
        return {
            // 交易凭证
            traderecordId: '', // 支付单对应订单号
            // 隐藏接口访问错误提示
            errorTip: false,
            errorMsg: '',
            tipFlag: true,
            tipError: false, //是否显示错误信息
            tipError2: false, //风控点击消失之后的提示
        };
    },
    mounted() {
        this.handlePay();
        this.setHtmlFontSize();
    },
    methods: {
        setHtmlFontSize() {
            const htmlDom = document.getElementsByTagName('html')[0];
            let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
            if (htmlWidth >= 750) {
                htmlWidth = 750;
            }
            if (htmlWidth <= 320) {
                htmlWidth = 320;
            }
            htmlDom.style.fontSize = `${htmlWidth / 7.5}px`;
        },
        createRandomCode() {
            return new Date().getTime();
        },
        hideThis() {
            this.errorTip = true;
            this.tipError = false; //风控提示消失
            this.tipError2 = true;
        },
        handlePay() {
            var str = window.location.search;
            this.traderecordId = str.substring(1, str.indexOf('code'));
            var qrCode = location.search && /code=(.*)/.exec(location.search)[1];
            this.qrCode = decodeURIComponent(qrCode);
            var data = {
                openId: '',
                traderecordId: this.traderecordId,
                paymodeCode: this.qrCode.substring(0, 3),
                sceneCode: 'PC',
                traderecordNonceno: this.createRandomCode(),
                traderecordStagenum: parseInt(this.qrCode.substr(this.qrCode.lastIndexOf('=') + 1, this.qrCode.length - this.qrCode.lastIndexOf('='))),
            };
            this.$niceloo.api.call('uc/initiate-pay', {
                ...data,
                onsuccess: (data) => {
                    setTimeout(() => {
                        //火狐浏览器需要延时一下
                        document.body.innerHTML = data.bizContent;
                        document.forms[0].acceptCharset = 'utf-8';
                        document.forms[0].submit();
                    }, 200);
                },
                onerror: (fail) => {
                    this.errorMsg = fail.getAttachedData().getMsg();
                    this.tipError = true; //出现错误提示
                    this.tipFlag = false;
                    this.errorTip = true;
                    // this.$baseUI.alert(this.errorMsg);
                },
                oncomplete: () => {},
            });
        },
    },
};
</script>
<style scoped="scoped" lang="less">
.mk_tipbox {
    position: fixed;
    top: 40%;
    left: 50%;
    z-index: 3001;
    text-align: center;
    width: 7rem;
    transform: translate(-50%, -145px);
    min-height: 245px;
    background: #ffffff;
    box-shadow: 3px 7px 27px 0px rgba(128, 128, 128, 0.33);
    border-radius: 4px;
}
.mk_tipbox .mkp_top {
    width: 100%;
    min-height: 3rem;
    max-height: 3rem;
    background: linear-gradient(90deg, #f04848 0%, #ffad81 100%);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    overflow: auto;
}
.mk_tipbox .mkp_top .mkp_tit {
    padding: 40px 39px 0;
    color: #333333;
    font-size: 0.5rem;
    color: #ffffff;
    text-shadow: 1px 2px 10px rgba(175, 0, 0, 0.7);
}
.mk_tipbox .mkp_top .mkp_con {
    margin-top: 25px;
}
.mk_tipbox .mkp_top .mkp_con p {
    width: 90%;
    font-size: 0.3rem;
    line-height: 0.5rem;
    margin: 0 auto;
    text-align: center;
    word-break: break-all;
    color: #ffffff;
}
.mk_tipbox .mkp_bm .btn {
    display: inline-block;
    font-size: 0.3rem;
    width: 2rem;
    height: 0.7rem;
    line-height: 0.7rem;
    color: #ffffff;
    background: linear-gradient(90deg, #ff4436 0%, #f96b54 100%);
    border-radius: 4px;
    cursor: pointer;
}
.mk_tipbox .mkp_bm {
    margin: 27px 0 5px;
}
</style>
