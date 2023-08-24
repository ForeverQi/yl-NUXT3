<template>
    <div class="mask-wrap" v-show="show">
        <transition name="bounce">
            <div class="inner-mask" v-show="show">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    watch: {
        show: {
            handler(newVal) {
                if (newVal) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            },
        },
    },
};
</script>

<style lang="less">
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.bounce-enter-active {
    animation: bounce-in 0.3s cubic-bezier(0, -0.01, 0.63, 1.61);
}
.bounce-leave-active {
    animation: bounce-in 0.3s cubic-bezier(0, -0.01, 0.63, 1.61);
}
@keyframes bounce-in {
    0% {
        top: 49%;
    }
    100% {
        top: 50%;
    }
}
.mask-wrap {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .inner-mask {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
