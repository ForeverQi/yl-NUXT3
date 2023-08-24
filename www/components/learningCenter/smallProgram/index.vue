<template>
    <div class="box" :class="{ biger: msgType == 2 }">
        <!--        {{ msgType }}-->
        <div v-if="msgType === 0">
            <p class="no-attention">绑定【小优督学】小程序</p>
            <p class="tip">订阅学习提醒、报考信息通知～</p>
        </div>
        <div v-if="msgType === 1">
            <p class="no-attention">您还未关注【小优督学】公众号</p>
            <p class="tip">小优还不能为您推送学习提醒哦～</p>
        </div>
        <template v-if="msgType === 2">
            <img src="./asset/images/small-program.png" />
            <p>{{ msgs[msgType] }}</p>
        </template>
        <!--<div v-if="msgType === 2">
            <p class="no-attention">打造暖心服务</p>
            <p class="tip">祝您畅学无忧～</p>
        </div>-->
        <template v-if="msgType != 2">
            <img
                class="xydx_QR_code"
                v-if="msgType == 1"
                src="./asset/images/xydx_QR_code.png"
                alt=""
                @mouseenter="showCode = !showCode"
                @mouseleave="showCode = !showCode"
            />
            <img
                class="xydx_QR_code"
                v-if="msgType == 0"
                src="./asset/images/sp-code.jpg"
                alt=""
                @mouseenter="showCode = !showCode"
                @mouseleave="showCode = !showCode"
            />

            <!--<div class="round-border-btn" @click="showCode = !showCode">
                <img src="./asset/images/xydx_QR_code.png" alt="" />
                <span>{{ msgType == 0 ? '立即绑定' : '立即关注' }}</span>
            </div>-->
            <div class="proper" :class="{ show: showCode }">
                <span class="close" @click="showCode = false"></span>
                <img v-if="msgType == 0" src="./asset/images/sp-code.jpg" />
                <img v-else src="./asset/images/gzh-code.jpg" />
                <p>打开微信扫一扫</p>
            </div>
        </template>
        <template v-else>
            <div class="mouse-area" @mouseenter="showCode = true" @mouseleave="showCode = false"></div>
            <div :class="['proper', showCode ? 'show' : '']">
                <span class="close" @click="showCode = false"></span>
                <img src="./asset/images/sp-code.jpg" />
                <p>打开微信扫一扫</p>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    props: {
        isBind: { type: String, require: true },
        isFollow: { type: String, require: true },
    },
    data() {
        return {
            showCode: false,
            /*msgs: [
                '绑定【小优督学】小程序，订阅学习提醒、报考信息通知～',
                '您还未关注【小优督学】公众号，小优还不能为您推送学习提醒哦～',
                '打造暖心服务，祝您畅学无忧～',
            ],*/
            msgs: [
                '绑定【小优督学】小程序，订阅学习提醒、报考信息通知～',
                '您还未关注【小优督学】公众号，小优还不能为您推送学习提醒哦～',
                '打造暖心服务，祝您畅学无忧～',
            ],
        };
    },
    computed: {
        msgType() {
            if (this.isBind == 'Y') {
                return this.isFollow == 'Y' ? 2 : 1;
            } else {
                return 0;
            }
        },
    },
};
</script>
<style scoped lang="less">
.box {
    background: url(./asset/images/box_bg_red.png) no-repeat;
    background-size: 100%;
    /*background-color: #fff8f7;*/
    width: 346px;
    height: 64px;
    display: flex;
    padding: 0 45px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .no-attention {
        font-size: 14px;
        color: #3a3d4b;
        font-weight: bold;
    }
    .tip {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.4);
    }

    .proper {
        width: 188px;
        z-index: 10;
        background-color: #fff;
        position: absolute;
        top: 80px;
        right: 0;
        margin-top: -9px;
        border: 1px solid #f3f3f3;
        text-align: center;
        padding: 25px 0 16px 0;
        box-shadow: 0px 2px 12px 4px rgba(11, 42, 113, 0.05);
        border-radius: 8px;
        opacity: 0;
        display: none;
        transition: opacity 2s;
        -moz-transition: opacity 2s; /* Firefox 4 */
        -webkit-transition: opacity 2s; /* Safari 和 Chrome */
        -o-transition: opacity 2s; /* Opera */
        &.show {
            opacity: 1;
            display: block;
        }
        img {
            width: 116px;
            height: 116px;
            display: inline-block;
            margin: 0 auto;
        }
        p {
            color: #333;
            font-size: 12px;
            margin-top: 16px;
        }
        .close {
            position: absolute;
            top: 5px;
            right: 5px;
            width: 10px;
            height: 10px;
            padding: 5px;
            cursor: pointer;
            /*&::after,
            &::before {
                position: absolute;
                content: '';
                left: 5px;
                bottom: 5px;
                width: 10px;
                height: 1px;
                background-color: #d9d9d9;
            }
            &::after {
                transform: rotate(-45deg);
            }
            &::before {
                transform: rotate(45deg);
            }*/
        }
        &::before {
            position: absolute;
            content: '';
            width: 0;
            height: 0;
            top: 0px;
            right: 65px;
            margin-top: -5px;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid #fff;
        }
    }
    &.biger {
        justify-content: start;
        p {
            font-size: 16px;
            max-width: 100%;
            margin-left: 10px;
        }
    }
    img {
        width: 44px;
        height: 44px;
        margin-left: -12px;
    }
    p {
        color: #555555;
        font-size: 12px;
        line-height: 20px;
        max-width: 196px;
    }
    .xydx_QR_code {
        width: 52px;
        height: 52px;
        background: #ffffff;
        border-radius: 4px;
    }
    /*.round-border-btn {
        display: inline-block;
        color: #fe1e13;
        line-height: 26px;
        height: 26px;
        cursor: pointer;
        text-align: center;
        border: 1px solid #fe1e13;
        border-radius: 20px;
        font-size: 0;
        span {
            white-space: nowrap;
            font-size: 16px;
            display: inline-block;
            vertical-align: middle;
            letter-spacing: 1px;
            transform-origin: center center;
            transform: scale(0.625);
        }
    }*/
    /*&::before {
        top: 0;
        left: -7px;
        position: absolute;
        content: '';
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-bottom: 10px solid #ebcac6;
    }*/
    .mouse-area {
        width: 100%;
        height: 64px;
        position: absolute;
        left: 0;
        top: 0;
        content: '';
    }
}
</style>
