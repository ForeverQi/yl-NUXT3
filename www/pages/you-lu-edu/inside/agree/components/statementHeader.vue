<template>
    <div class="statement-header-box">
        <div class="header-top_img">
            <span>{{ statementName }}</span>
            <!-- logo图 -->
            <img class="logo-img1" src="../asset/images/agreement-log1.png" />
            <img class="logo-img2" src="../asset/images/agreement-log2.png" />
            <img class="logo-img3" src="../asset/images/agreement-log3.png" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        /**
         * 隐私协议 | 用户注册协议 文案
         */
        statementName: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="less" scoped>
.statement-header-box {
    width: 100%;
    height: 100%;
    background: url('../asset/images/agreement-bgc.png') no-repeat;
    background-size: 100% 100%;
    .header-top_img {
        width: 1200px;
        height: 170px;
        position: relative;
        margin: 0 auto;

        span {
            position: absolute;
            top: 50%;
            left: 88px;
            transform: translateY(-50%);
            font-size: 28px;
            color: #333333;
            font-weight: 700;
        }
        .logo-img1 {
            position: absolute;
            right: 346px;
            bottom: 0;
            width: 180px;
            height: 102px;
        }

        .logo-img2 {
            position: absolute;
            right: 90px;
            top: 16px;
            width: 197px;
        }

        .logo-img3 {
            position: absolute;
            right: 90px;
            top: 15px;
            width: 197px;
        }
    }
}
</style>
