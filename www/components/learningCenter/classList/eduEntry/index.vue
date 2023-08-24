<!-- 家庭教育指导师 报名入口-->
<template>
    <div class="edu-entry" @mouseenter="showQR = true" @mouseleave="showQR = false">
        <div class="user-img"></div>
        <span class="hot-registration">火热报名中…</span>

        <div class="edu-qrcode" v-show="showQR">
            <img class="qrcode" src="../imgs/icon-edu-qr.png" />
            <strong class="h2">手机扫一扫</strong>
            <p class="line">家庭教育指导师</p>
            <p class="line">报名资料火热收集中</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'course-class-empty',
    data() {
        return {
            showQR: false, // 是否显示二维码
        };
    },
};
</script>
<style lang="less" scoped>
strong {
    border: 0;
    font-weight: normal;
}
.edu-entry {
    position: fixed;
    right: 102px;
    top: 240px;
    width: 28px;
    color: #ffffff;
    font-size: 12px;
    box-sizing: border-box;
    padding: 7px;
    padding-top: 30px;
    cursor: pointer;

    .user-img {
        position: absolute;
        top: 14px;
        left: 0;
        width: 40px;
        height: 49px;
        background-image: url('./asset/images/icon-buser.png');
        background-size: 100% 100%;
    }
    .hot-registration {
        display: inline-block;
        width: 100px;
        height: 28px;
        background: linear-gradient(-270deg, rgba(240, 98, 98, 0.5), #ffffff 100%, #ffffff 100%);
        font-size: 12px;
        text-align: right;
        color: #ec0202;
        line-height: 28px;
    }
}
.edu-qrcode {
    text-align: center;
    padding: 12px;
    border-radius: 6px;
    background-color: #fff;
    position: absolute;
    right: -80px;
    top: 81px;

    &::after {
        content: '';
        display: block;
        position: absolute;
        right: 62px;
        top: -10px;
        position: absolute;
        border-bottom: 10px solid #fff;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
    }

    .qrcode {
        display: block;
        margin: 0 auto;
        width: 120px;
        height: 120px;
    }

    .h2 {
        display: block;
        font-size: 13px;
        font-weight: 700;
        color: #3a3d4b;
        padding: 8px 0;
    }
    .line {
        font-size: 11px;
        font-weight: 400;
        color: #3a3d4b;
    }
}
</style>
