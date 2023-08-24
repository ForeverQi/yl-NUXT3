<template>
    <div class="popup-box flex jc-center ai-center" v-if="show">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'basePopupModel',
    components: {},
    data() {
        return {
            show: false,
        };
    },
    fetch() {
        return Promise.resolve();
    },
    watch: {
        show(val) {
            console.log('basePopupbasePopupbasePopupbasePopup', val);
            let body = document.getElementsByTagName('body');
            if (val) {
                body[0].style.height = '100vh';
                body[0].style.overflow = 'hidden';
            } else {
                body[0].style.height = 'auto';
                body[0].style.overflow = 'visible';
            }
        },
    },
};
</script>
<style lang="less" scoped>
.popup-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.67);
    z-index: 1000;
    overflow: hidden;
}
</style>
