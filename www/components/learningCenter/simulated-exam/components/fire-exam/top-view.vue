<template>
    <header class="rule-header-container">
        <img src="./asset/images/icon.png" class="logo" alt="国徽" />
        <h1 class="rule-title">全国消防行业职业技能鉴定在线考试（理论场）模拟系统</h1>
        <span class="user">{{ userInfo && userInfo.userYoulunum }}，您好！</span>
        <button class="logout"></button>
    </header>
</template>
<script>
export default {
    data() {
        return {
            userInfo: null,
        };
    },
    mounted() {
        if (this.$User.getToken()) {
            this.$User.getUser().then((res) => {
                this.userInfo = res;
            });
        }
    },
};
</script>
<style scoped lang="less">
header {
    border: 0;
    font-weight: normal;
    display: block;
}
.rule-header-container {
    background-color: #3260a8;
    color: white;
    line-height: 57px;
    display: flex;
    align-items: center;
    h1 {
        border: 0;
        font-weight: normal;
    }
    .logo {
        width: 40px;
        height: 41px;
        margin-right: 16px;
        margin-left: 80px;
    }
    .rule-title {
        flex: 1;
        font-size: 18px;
        font-weight: bold;
    }

    .user {
        font-size: 18px;
    }
    .logout {
        border: none;
        outline: none;
        background-color: transparent;
        color: inherit;
        background-image: url('./asset/images/logout.png');
        height: 21px;
        width: 21px;
        background-size: 100% 100%;
        margin-right: 40px;
        margin-left: 24px;
    }
}
</style>
