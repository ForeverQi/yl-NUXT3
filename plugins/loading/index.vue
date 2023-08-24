<template>
    <div v-show="visible" class="loading-wrap">
        <svg viewBox="25 25 50 50" class="circular">
            <circle cx="50" cy="50" r="20" class="path"></circle>
        </svg>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: true,
        };
    },
};
</script>
<style lang="less" scoped>
.loading-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(#fff, 0.7);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 49;
}
.loading-image {
    width: 120px;
    height: auto;
    z-index: 100;
}
@keyframes loading-rotate {
    0% {
        transform: rotate(50deg);
        -ms-transform: rotate(50deg); /* IE 9 */
        -moz-transform: rotate(50deg); /* Firefox */
        -webkit-transform: rotate(50deg); /* Safari 和 Chrome */
        -o-transform: rotate(50deg);
    }
    50% {
        transform: rotate(250deg);
        -ms-transform: rotate(250deg); /* IE 9 */
        -moz-transform: rotate(250deg); /* Firefox */
        -webkit-transform: rotate(250deg); /* Safari 和 Chrome */
        -o-transform: rotate(250deg);
    }
    100% {
        transform: rotate(360deg);
        -ms-transform: rotate(360deg); /* IE 9 */
        -moz-transform: rotate(360deg); /* Firefox */
        -webkit-transform: rotate(360deg); /* Safari 和 Chrome */
        -o-transform: rotate(360deg);
    }
}
.circular {
    height: 42px;
    width: 42px;
    animation: loading-rotate 0.618s linear infinite;
    z-index: 100;
    .path {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        stroke-width: 3;
        stroke-linecap: round;
        z-index: 100;
    }
}
</style>
