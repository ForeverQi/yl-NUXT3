<template>
    <div :class="classList"></div>
</template>

<script>
/*页面遮罩*/
export default {
    name: 'Loader',
    props: {},
    data() {
        return {
            isMask: false,
            className: 'loader',
            classList: ['loader'],
        };
    },
    mounted() {
        this.classList = [this.className];
        if (window.location.href.indexOf('/agile-course') > -1) {
            this.isMask = true;
            this.classList.push('mask');
        }
    },
};
</script>

<style lang="less" scoped>
.loader {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: url('./asset/images/loading1.gif') 50% 50% no-repeat;
}
.loader6 {
    position: fixed;
    width: 12px;
    height: 12px;
    top: 46%;
    top: calc(50% - 6px);
    left: 46%;
    left: calc(50% - 6px);
    border-radius: 12px;
    background-color: #fff;
    transform-origin: 50% 50%;
    animation: loader6 1s ease-in-out infinite;

    &:before {
        content: '';
        position: absolute;
        background-color: rgba(255, 255, 255, 0.5);
        top: 0px;
        left: -25px;
        height: 12px;
        width: 12px;
        border-radius: 12px;
        text-align: center;
    }
    &:after {
        content: '';
        position: absolute;
        background-color: rgba(255, 255, 255, 0.5);
        top: 0px;
        left: 25px;
        height: 12px;
        width: 12px;
        border-radius: 12px;
        text-align: center;
    }
}

@keyframes loader6 {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(180deg);
    }
}
.mask {
    background-color: rgba(0, 0, 0, 0.6);
}
</style>
