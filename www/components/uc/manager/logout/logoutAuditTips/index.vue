<template>
    <transition name="bounce">
        <div class="logoutAuditTips-wrap" v-show="show">
            <img src="./asset/images/tanhao.png" alt="" />
            <span>您的账号目前还在注销审核中哦～</span>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            show: false,
        };
    },
    computed: {
        ...mapGetters('logout', ['getUserInfo']),
    },
    watch: {
        // getUserInfo: {
        //     handler(newVal) {
        //         if (JSON.stringify(newVal) !== '{}') {
        //             this.userInfo = newVal;
        //         }
        //     },
        //     deep: true,
        //     immediate: true,
        // },
    },
    mounted() {
        if (this.$cookieUtil.get('TOKEN') && JSON.stringify(this.getUserInfo) !== '{}') {
            this.userInfo = this.getUserInfo;
            this.handleLogoutAuditTips(this.userInfo.userUnsubscribeStatus);
        }
    },
    methods: {
        handleLogoutAuditTips(userUnsubscribeStatus) {
            if (userUnsubscribeStatus !== 'A') {
                localStorage.removeItem('logoutAuditTips');
                return false;
            }
            let timer = null;
            clearTimeout(timer);
            let logoutAuditTips = localStorage.getItem('logoutAuditTips');
            let currentTime = new Date();
            if (!logoutAuditTips) {
                this.show = true;
                localStorage.setItem('logoutAuditTips', +new Date() + 6 * 3600 * 1000);
            } else if (currentTime > logoutAuditTips) {
                this.show = true;
                localStorage.setItem('logoutAuditTips', +new Date() + 6 * 3600 * 1000);
            }
            timer = setTimeout(() => {
                this.show = false;
            }, 5000);
        },
    },
};
</script>

<style lang="less" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.bounce-enter-active {
    animation: bounce-in-enter 0.3s cubic-bezier(0, -0.01, 0.63, 1.61);
}
.bounce-leave-active {
    animation: bounce-in-leave 0.3s cubic-bezier(0, -0.01, 0.63, 1.61);
}
@keyframes bounce-in-enter {
    0% {
        top: 120px;
    }
    100% {
        top: 150px;
    }
}
@keyframes bounce-in-leave {
    0% {
        top: 150px;
    }
    100% {
        top: 120px;
    }
}
.logoutAuditTips-wrap {
    width: 332px;
    height: 45px;
    background-color: #f8323c;
    opacity: 0.7;
    border-radius: 6px;
    position: fixed;
    top: 150px;
    left: 50%;
    line-height: 45px;
    text-align: center;
    margin-left: -166px;
    z-index: 1;
    img {
        width: 20px;
        height: 20px;
        float: left;
        position: absolute;
        top: 13px;
        left: 30px;
    }
    span {
        margin-left: 33px;
        font-size: 16px;
        color: #ffffff;
    }
}
</style>
