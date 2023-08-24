<template>
    <popup-base ref="popupBase">
        <img src="./asset/images/pause-icon.png" @click="handleClosePopup" />
    </popup-base>
</template>

<script>
import PopupBase from '../popup-base/index.vue';
export default {
    components: {
        PopupBase,
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        show(val) {
            this.$refs.popupBase.show = val;
        },
    },
    methods: {
        handleClosePopup() {
            this.$refs.popupBase.show = false;
            this.$emit('update:show', false);
        },
    },
};
</script>

<style lang="less" scoped>
img {
    width: 150px;
    height: 203px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-150px) translateY(-204px);
    cursor: pointer;
}
</style>
