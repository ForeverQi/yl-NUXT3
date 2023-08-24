<template>
    <popup-base ref="popupBase">
        <div class="loading">
            <img src="./asset/images/loading.gif" />
            <div>测评报告生成中</div>
        </div>
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
.loading {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
        color: #fff;
        font-size: 16px;
        margin-top: 20px;
    }
}
</style>
