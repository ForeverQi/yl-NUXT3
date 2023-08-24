<template>
    <div class="top">
        <div class="header-box flex jc-between ai-center">
            <span @click="toHome">
                <img class="header-left" src="./asset/images/logo.png" />
            </span>
            <div class="header-right flex ai-center">
                <div class="my-class" @click="toMyCourse">我的微课</div>
                <template v-if="!islogin">
                    <div class="login-btn pr-12" @click="doLogin">登录</div>
                    <div class="line"></div>
                    <div class="register-btn pl-12" @click="doLogin">注册</div>
                </template>
                <template v-if="islogin">
                    <div class="flex ai-center user-info">
                        <div class="user-img">
                            <img v-if="userAvatar" :src="$urlUtils.getViewUrl(userAvatar)" />
                            <img v-else src="./asset/images/tdefault.png" />
                        </div>
                        <div class="user-name text-overflow-1">{{ userName }}</div>
                        <div class="user-popup">
                            <div class="user-wrap">
                                <div class="flex jc-between ai-center">
                                    <div class="flex ai-center">
                                        <div class="user-img2">
                                            <img v-if="userAvatar" :src="$urlUtils.getViewUrl(userAvatar)" />
                                            <img v-else src="./asset/images/tdefault.png" />
                                        </div>
                                        <div class="user-name2">{{ userName }}</div>
                                    </div>
                                    <div class="login-out" @click="doLoginout">退出</div>
                                </div>
                                <div class="flex wrap pt24 jc-between">
                                    <nuxt-link
                                        :to="item.link"
                                        target="_blank"
                                        class="class-item flex jc-center ai-center"
                                        v-for="(item, index) in classItemList"
                                        :key="index"
                                    >
                                        <div class="class-icon"><img :src="item.img" /></div>
                                        <div class="class-name">
                                            {{ item.name }}
                                        </div>
                                    </nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import '@/api/mcu/api.mcu-login-010.query-user-miniprogram-info.js';
export default {
    name: 'headerModel',
    components: {},
    data() {
        return {
            classItemList: [
                { name: '我的课程', img: require('./asset/images/course.png'), link: '/agile-course/my-course' },
                { name: '我的预约', img: require('./asset/images/book.png'), link: '/agile-course/my-live-booking' },
                { name: '我的收藏', img: require('./asset/images/collect.png'), link: '/agile-course/my-collection' },
                { name: '我的订单', img: require('./asset/images/order.png'), link: '/agile-course/my-order' },
            ],
            userInfo2: {
                wxuserNickname: '',
                wxuserHeadimgurl: '',
            },
        };
    },
    computed: {
        ...mapState('logout', ['islogin', 'userInfo']),
        ...mapState('mcuStore', ['projectId', 'pageName']),
        userName() {
            return this.userInfo2.wxuserNickname || this.userInfo.userNickname || this.userInfo.userYoulunum || this.userInfo.userLoginname;
        },
        userAvatar() {
            if (this.userInfo2.wxuserHeadimgurl) {
                return this.userInfo2.wxuserHeadimgurl;
            }
            if (this.userInfo.userAvatar) {
                return this.userInfo.userAvatar;
            }
            return '';
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapActions('logout', ['getUserInfo2']),
        init() {
            this.getUserInfo2()
                .then(() => {
                    // 获取用户头像
                    this.$callApi('login/query-user-miniprogram-info', {
                        userId: this.userInfo.userId,
                        wxaccountAppid: this.$nuxt.context.env.config.MCU_APPLET_APPID,
                        onsuccess(res) {
                            if (res.wxuserNickname) {
                                this.userInfo2.wxuserNickname = res.wxuserNickname;
                            }
                            if (res.wxuserHeadimgurl) {
                                this.userInfo2.wxuserHeadimgurl = res.wxuserHeadimgurl;
                            }
                        },
                        onerror: this.$niceloo.api.handleFailure,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        toMyCourse() {
            this.$mcuLogin
                .checkLogin()
                .then(() => {
                    this.$PageUtil.openNewPage('/agile-course/my-course');
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        doLogin() {
            this.$mcuLogin.checkLogin().then((res) => {
                if (res.isFirst) {
                    this.$PageUtil.reflush();
                }
            });
        },
        doLoginout() {
            this.$User.logout();
            if (typeof window !== 'undefined') {
                if (window.location.href.indexOf('/agile-course/my') > -1) {
                    this.$PageUtil.replaceUrl('/agile-course');
                    return;
                }
            }
            this.$PageUtil.reflush();
        },
        toHome() {
            this.$PageUtil.href('/agile-course');
        },
    },
};
</script>

<style lang="less" scoped>
div {
    box-sizing: border-box;
}
.top {
    min-width: 1200px;
    background-color: #fff;
}
.header-box {
    width: 1200px;
    height: 60px;
    margin: 0 auto;
}
.header-box .header-right {
    height: 60px;
}
.header-box .header-left {
    width: auto;
    height: 32px;
    display: block;
    cursor: pointer;
}
.header-right .my-class {
    height: 32px;
    line-height: 32px;
    width: 100px;
    text-align: center;
    border-radius: 16px;
    padding: 0 8px;
    color: #fff;
    background-color: #025eff;
    font-size: 16px;
    margin-right: 16px;
    cursor: pointer;
}
.header-right .login-btn,
.header-right .register-btn {
    height: 21px;
    line-height: 21px;
    font-size: 16px;
    color: #53586c;
    cursor: pointer;
}
.header-right .pl-12 {
    padding-left: 12px;
}
.header-right .pr-12 {
    padding-right: 12px;
}
.header-right .line {
    width: 2px;
    height: 12px;
    background-color: #53586c;
}
.header-right .user-info {
    cursor: pointer;
    position: relative;
    height: 60px;
}
.header-right .user-info:hover .user-popup {
    display: block;
}
.header-right .user-img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #ddd;
    margin-right: 6px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
    }
}
.user-popup .user-img2 {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: #ddd;
    margin-right: 6px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
    }
}
.header-right .user-name {
    max-width: 120px;
}
.header-right .user-name2 {
    font-size: 16px;
    font-weight: bold;
    color: #3a3d4b;
    margin-left: 8px;
}
.header-right .login-out {
    color: #9698a2;
    font-size: 14px;
    cursor: pointer;
}
.header-right .user-popup {
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translateX(-50%);
    z-index: 999;
    padding-top: 15px;
    display: none;

    &::before {
        position: absolute;
        top: 8px;
        left: 45px;
        content: '';
        display: block;
        width: 28px;
        height: 10px;
        background-image: url(./asset/images/up.png);
        background-repeat: no-repeat;
    }

    .user-wrap {
        width: 358px;
        padding: 39px 42px 16px 42px;
        background-color: #fff;
        border-radius: 8px;
    }
}
.header-right .class-item {
    width: 114px;
    height: 32px;
    background-color: #f0f5ff;
    border-radius: 16px;
    margin-bottom: 16px;
}
.header-right .class-item:hover {
    background-color: #e1ecfe;
}
.header-right .class-item .class-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    display: flex;
    align-items: center;

    img {
        width: 100%;
        height: 100%;
    }
}
.header-right .class-item .class-name {
    font-size: 12px;
    color: #3a3d4b;
}
.pt24 {
    padding-top: 24px;
}
</style>
