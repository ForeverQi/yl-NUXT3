<template>
    <div class="right-popup">
        <div class="ad-wrap">
            <slot></slot>
        </div>
        <div class="div-item" @click="openQIYU">
            <img src="./asset/images/chose.png" alt="" class="div-img" />
            <div class="div-text">
                如何
                <br />
                选课
            </div>
        </div>
        <div class="div-item" @click="openQIYU">
            <img src="./asset/images/yijian.png" alt="" class="div-img" />
            <div class="div-text">
                意见
                <br />
                反馈
            </div>
        </div>
        <div class="div-item">
            <img src="./asset/images/guanzhu.png" alt="" class="div-img" />
            <div class="div-text">
                关注
                <br />
                有礼
            </div>
            <div class="guanzhu-popup">
                <img src="./asset/images/public_service.jpg" alt="" class="guanzhu-qr-img" />
                <div class="guanzhu-text">
                    关注公众号
                    <br />
                    领取备考资料
                </div>
            </div>
        </div>
        <div class="div-item" v-if="showTop" @click="handleToTop">
            <img src="./asset/images/top.png" alt="" class="div-img" />
            <div class="div-text flex column jc-center ai-center">
                <img src="./asset/images/top-hover.png" alt="" class="top-hover-img" />
                <div>TOP</div>
            </div>
        </div>
        <div class="empty" v-else></div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import fish from './js/7fish.js';
export default {
    name: 'fixedRightModel',
    components: {},
    data() {
        return {
            showTop: false,
            qififsh: null,
        };
    },
    computed: {
        ...mapState('logout', ['islogin']),
    },
    watch: {
        islogin(val, oldVal) {
            if (val === true && oldVal === false) {
                fish.setUser(this.$User);
            }
        },
    },
    mounted() {
        this.qififsh = fish.init('96723');
        window.addEventListener('scroll', this.onscroll, true);
    },
    methods: {
        openQIYU() {
            this.qififsh.then(() => {
                ysf.open();
            });
        },
        onscroll() {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (scrollTop >= 100) {
                this.showTop = true;
            } else {
                this.showTop = false;
            }
        },
        handleToTop() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
    },
};
</script>
<style lang="less" scoped>
.ad-wrap {
    margin-bottom: 16px;
}
.right-popup {
    position: fixed;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .div-item2 {
        width: 64px;
        height: 64px;
    }
    .empty,
    .div-item {
        width: 64px;
        height: 64px;
        background: #ffffff;
        border: 1px solid #e7e9f2;
        border-radius: 50%;
        box-shadow: 0px 4px 10px 2px rgba(11, 42, 113, 0.03);
        margin-bottom: 14px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .div-img {
            display: block;
            width: 24px;
            height: 24px;
        }
        .div-text {
            display: none;
            font-size: 12px;
            line-height: 16px;
            color: #fff;
        }
        .top-hover-img {
            width: 24px;
            height: 24px;
        }
    }
    .empty {
        cursor: default;
        border-color: transparent;
        background-color: transparent;
    }
    .div-item:hover {
        background: #025eff;
        border-color: #025eff;
        box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.03);
        .div-img {
            display: none;
        }
        .div-text,
        .guanzhu-popup,
        .chose-popup {
            display: block;
        }
    }
    .guanzhu-popup {
        display: none;
        position: absolute;
        top: 0;
        left: -156px;
        width: 144px;
        padding: 12px;
        border-radius: 4px;
        background-color: #fff;
        .guanzhu-qr-img {
            width: 120px;
            height: 120px;
            display: block;
        }
        .guanzhu-text {
            font-size: 14px;
            line-height: 19px;
            color: #3a3d4b;
            text-align: center;
        }
    }
    .chose-popup {
        display: none;
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 165px;
        .img-box {
            width: 165px;
            height: 102px;
            background-image: url('./asset/images/chose-hover.png');
            background-repeat: no-repeat;
            background-size: 100%;
            position: relative;
            img {
                position: absolute;
                top: 6px;
                left: 43px;
                width: 88px;
                height: 88px;
            }
        }
        .chose-text {
            width: 158px;
            height: 32px;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
            color: #fff;
            background-image: linear-gradient(to right, #025eff, #3a85fe);
            border-radius: 16px;
        }
    }
}
</style>
