<template>
    <base-popup ref="basePopup">
        <div class="content">
            <div class="content-title">{{ title }}</div>
            <div class="content-text">
                <slot name="body"></slot>
            </div>
            <div class="content-footer">
                <slot name="footer"></slot>
            </div>
            <img src="./asset/images/close.png" alt="" class="close-img" @click="handleClosePopup" />
        </div>
    </base-popup>
</template>
<script>
import basePopup from '../../basePopup/basePopup/index.vue';
export default {
    name: 'twicePopupModel',
    components: {
        basePopup,
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
    },
    data() {
        return {};
    },
    watch: {
        show(val) {
            this.$refs.basePopup.show = val;
        },
    },
    created() {},
    mounted() {},
    methods: {
        handleClosePopup() {
            this.$refs.basePopup.show = false;
            this.$emit('update:show', false);
        },
    },
};
</script>
<style lang="less" scoped>
.content {
    width: 328px;
    height: 210px;
    background-color: #fff;
    border-radius: 16px;
    position: relative;
    .content-title {
        height: 50px;
        line-height: 50px;
        color: #333333;
        font-size: 18px;
        text-align: center;
    }
    .content-text {
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333333;
        font-size: 14px;
    }
    .content-footer {
        height: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .close-img {
        width: 16px;
        height: 16px;
        display: block;
        position: absolute;
        right: 17px;
        top: 17px;
        cursor: pointer;
    }
}
</style>
