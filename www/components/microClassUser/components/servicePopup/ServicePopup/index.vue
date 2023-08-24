<template>
    <base-popup ref="basePopup">
        <!--<div class="content">
        <img :src="shareImg" alt="" class="share-img" />
        <div class="content-footer">
            <div>微信扫一扫，进入小程序 更多好课等你体验</div>
            <div class="more-benefits">上课提醒、不定期好课推送、更多专属福利</div>
        </div>
        <img src="./asset/images/servicePopup_02.png" alt="" class="close-img" @click="handleClosePopup" />
    </div>-->
        <div class="content">
            <div class="content-title" v-if="successtip">
                <img src="./asset/images/servicePopup_03.png" alt="" class="" />
                扫码成功
            </div>
            <img :src="shareImg" alt="" class="share-img" />
            <div class="content-footer">
                <slot name="footer"></slot>
            </div>
            <img src="./asset/images/servicePopup_02.png" alt="" class="close-img" @click="handleClosePopup" />
        </div>
    </base-popup>
</template>

<script>
import basePopup from '../../basePopup/basePopup/index.vue';
export default {
    name: 'ServicePopup',
    components: {
        basePopup,
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        shareImg: {
            type: String,
            default: '',
        },
        successtip: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    watch: {
        show(val) {
            console.log(val, 123);
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
    width: 384px;
    height: 480px;
    background-image: url('./asset/images/servicePopup_01.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    .content-title {
        position: absolute;
        top: 16px;
        left: 50%;
        right: 0;
        font-size: 14px;
        color: #333333;
        line-height: 22px;
        width: 86px;
        margin-left: -43px;
        img {
            width: 22px;
            height: 22px;
            margin-right: 8px;
            float: left;
        }
    }

    .share-img {
        position: absolute;
        top: 195px;
        left: 107px;
        width: 180px;
        height: 180px;
        display: block;
    }
    .content-footer {
        position: absolute;
        top: 408px;
        left: 0;
        width: 100%;
    }
    .close-img {
        width: 16px;
        height: 16px;
        display: block;
        position: absolute;
        right: 37px;
        top: 30px;
        cursor: pointer;
    }
}
</style>
