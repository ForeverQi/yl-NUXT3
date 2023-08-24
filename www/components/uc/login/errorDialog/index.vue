<template>
    <div class="bg">
        <div class="dialogtip">
            <div class="dialogtiptitle">
                <span>提示</span>
                <img @click="errorTipClose" src="./asset/images/pic_06.png" alt="" />
            </div>
            <div class="tipmsg" v-html="message"></div>
            <button class="dialogtipbtn" @click="errorTipClose">知道了</button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        message: {
            type: String,
            default: '',
        },
    },
    methods: {
        errorTipClose() {
            this.$emit('errorTipClose');
        },
    },
};
</script>
<style lang="less" scoped>
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
        padding: 0 20px;
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
        border: none;
        outline: none;
    }
}
</style>
