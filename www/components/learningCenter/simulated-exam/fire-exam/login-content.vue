<template>
    <div class="fire-login-container">
        <div class="title-wrapper">
            <img src="./asset/images/logo.png" class="logo" alt="国徽" />
            <h1 class="fire-title">全国消防行业职业技能鉴定在线考试（理论场）模拟系统</h1>
        </div>
        <div class="login-container">
            <img src="./asset/images/logo2.png" class="logo2" alt="消防" />
            <div class="form-container">
                <h2 class="form-title">欢迎登录</h2>
                <form action="/learningCenter/simulated-exam/fire-exam/exam-discipline" class="login-form" @submit="handLoginClick">
                    <div class="item">
                        <img src="./asset/images/account.png" class="icon" alt="账号" />
                        <input class="content" value="15988888888" />
                    </div>
                    <div class="item">
                        <img src="./asset/images/pwd.png" class="icon" alt="密码" />
                        <input class="content" :type="isShowPwd ? 'text' : 'password'" value="123456" />
                        <img v-if="isShowPwd" src="./asset/images/eye_open.png" class="icon-suffix" alt="密码" @click="isShowPwd = false" />
                        <img v-else src="./asset/images/eye.png" class="icon-suffix" alt="密码" @click="isShowPwd = true" />
                    </div>
                    <div class="code-container">
                        <div class="item code">
                            <img src="./asset/images/code.png" class="icon" alt="验证码" />
                            <input class="content" value="APZK5M" />
                        </div>
                        <img src="./asset/images/capta.png" class="capta" alt="验证码" />
                    </div>
                    <button type="submit" class="login">登录</button>
                </form>
                <a class="exam-camera">考场监控</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {},
    data() {
        return {
            showCode: false,
            isShowPwd: false,
        };
    },
    methods: {
        handLoginClick(e) {
            e.preventDefault();
            this.$message.info('登录成功！');
            setTimeout(() => {
                this.$router.push({
                    path: '/emulation/fire-exam/discipline',
                    query: this.$route.query,
                });
            }, 1000);
        },
    },
};
</script>
<style scoped lang="less">
.fire-login-container {
    background-color: #5b91e4;
    height: 100vh;
    h1 {
        border: 0;
        font-weight: normal;
    }
    .title-wrapper {
        padding-top: 77px;
        display: flex;
        justify-content: center;
        align-items: center;
        .logo {
            width: 100px;
            height: 102.95px;
            margin-right: 32px;
        }

        .fire-title {
            color: white;
            font-size: 40px;
        }
    }

    .login-container {
        display: flex;
        justify-content: center;
        margin-top: 56px;

        .form-container {
            width: 600px;
            height: 640px;
            background-color: rgba(242, 242, 242, 1);
            padding: 61px 80px 0;
            border-radius: 0px 20px 20px 0px;
            box-sizing: border-box;

            .login-form {
                .item {
                    background-color: #f6f7f9;
                    box-sizing: border-box;
                    border: none;
                    border-radius: 25px;
                    height: 50px;
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                    width: 400px;
                    .icon {
                        width: 18px;
                        height: 18px;
                        margin-left: 16px;
                        margin-right: 8px;
                    }
                    .content {
                        flex: 1;
                        border: none;
                        outline: none;
                        height: 100%;
                        background-color: transparent;
                    }
                    .icon-suffix {
                        width: 18px;
                        height: 18px;
                        margin-left: 5px;
                        margin-right: 32px;
                    }
                }
                .item:first-child {
                    margin-top: 64px;
                }
                .item:nth-child(2) {
                    margin-top: 24px;
                }
                .code {
                    width: 260px;
                    margin-top: 0 !important;
                }
                .code-container {
                    margin-top: 24px;
                    display: flex;
                    .capta {
                        margin-left: 12px;
                        width: 128px;
                        height: 50px;
                    }
                }
                .login {
                    display: block;
                    border: none;
                    color: white;
                    margin: 80px auto 0;
                    font-size: 16px;
                    font-weight: bold;
                    width: 360px;
                    height: 50px;
                    background: linear-gradient(135deg, #48acfa, #2e7df5);
                    border-radius: 6px;
                    cursor: pointer;
                }
            }
            .form-title {
                color: black;
                font-weight: bold;
            }
            .exam-camera {
                font-size: 14px;
                color: #ff2f26;
                margin-top: 24px;
                float: right;
                margin-right: 38px;
                width: 60px;
            }
        }
        .logo2 {
            width: 600px;
            height: 640px;
        }
    }
}
</style>
