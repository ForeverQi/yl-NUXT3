<template>
    <div class="pyHeaderWX">
        <nav class="nav">
            <div class="navImgLogo">
                <span @click="goHome">点亮职业人生</span>
            </div>
            <span class="separatorline"></span>
            <div class="navName">
                <nuxt-link to="/uc/manager">我的订单</nuxt-link>
                <!-- <a :href="`${$nuxt.context.env.config.PC_URL}/uc`">我的订单</a> -->
            </div>
            <div class="py_loginBox">
                <a class="helplink" href="/help" target="_blank">帮助中心</a>
            </div>
        </nav>
    </div>
</template>
<script>
// import PageUtil from "@/utils/PageUtil";
export default {
    name: 'pyHeaderWX',
    methods: {
        goHome() {
            window.location.href = '/';
        },
    },
};
</script>
<style scoped lang="less">
.pyHeaderWX {
    margin: auto;
    /* position: relative; */
    background: #fff;
    box-shadow: 0px 2px 8px 6px rgba(11, 42, 113, 0.03);
    /*border-bottom: 2px solid #d71209;*/
}

nav {
    width: 1200px;
    height: 95px;
    margin: auto;
    padding: 0 30px;
    border: 0;
    font-weight: normal;
    display: block;

    .navImgLogo {
        padding-top: 18px;
        width: 200px;
        float: left;

        span {
            display: inline-block;
            background: url('asset/images/logo.png') no-repeat top left;
            padding: 40px 0 0 4px;
            font-size: 14px;
            color: #999;
            letter-spacing: 16px;
            cursor: pointer;
        }
    }

    .navName {
        a {
            float: left;
            color: #444444;
            font-size: 20px;
            text-decoration: none;
            color: #000;
            line-height: 95px;
        }
    }

    .py_loginBox {
        float: right;
        padding-top: 36px;

        .dhtb {
            width: 36px;
            height: 37px;
            background: url('asset/images/dianhua.png') no-repeat center;
            float: left;
            margin-top: 6px;
            margin-right: 8px;
        }

        .dhhm {
            text-align: left;
            float: right;
            height: 37px;

            p {
                font-size: 20px;
                color: #e53930;
            }

            .qgmfdh {
                font-size: 12px;
                color: #444;
                line-height: 18px;
                font-family: Arial, Helvetica, sans-serif;
                color: #555555;
            }
        }
    }
}

.separatorline {
    display: inline-block;
    width: 1px;
    height: 12px;
    background: rgba(0, 0, 0, 0.1);
    /*margin-left: 14px;*/
    margin-right: 30px;
    float: left;
    margin-top: 27px;
    height: 40px;
}

.helplink {
    margin-right: 50px;
    color: #666666;
    font-size: 16px;
}

.username {
    font-size: 16px;
    color: #333333;
}

.separatorline {
    // display: inline-block;
    // width: 1px;
    // height: 12px;
    // background: rgba(0, 0, 0, 0.1);
    // margin-left: 14px;
    // margin-right: 14px;
}

.quitbtn {
    font-size: 16px;
    color: #333333;
    cursor: pointer;
}
</style>
