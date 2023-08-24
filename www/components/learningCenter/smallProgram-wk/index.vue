<template>
    <div class="box">
        <div>
            <p class="no-attention">扫码关注「优路微课」小程序</p>
            <p class="tip">前往小程序体验更多精彩课程</p>
        </div>
        <img class="xydx_QR_code" src="./asset/images/wk_QR_code.png" alt="" @mouseenter="showCode = !showCode" @mouseleave="showCode = !showCode" />
        <div class="proper" :class="{ show: showCode }">
            <span class="close" @click="showCode = false"></span>
            <img src="./asset/images/wk_QR_code.jpg" />
            <p>打开微信扫一扫</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showCode: false,
        };
    },
};
</script>
<style scoped lang="less">
.box {
    background: url(./asset/images/box_bg_blue.png) no-repeat;
    background-size: 100%;
    height: 64px;
    display: flex;
    padding: 0 45px;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .no-attention {
        font-size: 14px;
        font-weight: bold;
        color: #3a3d4b;
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
        opacity: 1;
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
    img {
        width: 44px;
        height: 44px;
    }
    p {
        color: #555555;
        font-size: 12px;
        line-height: 20px;
        max-width: 183px;
    }
    .xydx_QR_code {
        width: 52px;
        height: 52px;
        background: #ffffff;
        border-radius: 4px;
    }
}
</style>
