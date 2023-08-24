<template>
    <base-popup ref="basePopup">
        <div class="content">
            <div class="content-title">{{ header }}</div>
            <img :src="shareImg" alt="" class="share-img" />
            <div class="content-footer">
                <div>{{ title }}</div>
                <div>{{ description }}</div>
            </div>
            <img src="./asset/images/close.png" alt="" class="close-img" @click="handleClosePopup" />
        </div>
    </base-popup>
</template>
<script>
import basePopup from '../../basePopup/basePopup/index.vue';
export default {
    name: 'sharePopupModel',
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
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        header: {
            type: String,
            default: '领取成功',
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
    methods: {
        handleClosePopup() {
            this.$refs.basePopup.show = false;
            this.$nextTick(() => {
                this.$emit('update:show', false);
            });
        },
    },
};
</script>
<style lang="less" scoped>
.content {
    width: 384px;
    height: 480px;
    background-image: url('./asset/images/shareBg2.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    .content-title {
        width: 100%;
        height: 92px;
        line-height: 92px;
        color: #333333;
        font-size: 20px;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 16px;
        padding-left: 32px;
        font-weight: bold;
    }

    .share-img {
        position: absolute;
        top: 125px;
        left: 95px;
        width: 194px;
        height: 194px;
        display: block;
    }
    .content-footer {
        position: absolute;
        top: 350px;
        left: 0;
        width: 100%;
        div {
            text-align: center;
            color: #333333;
        }
        div:first-child {
            font-size: 18px;
            margin-bottom: 14px;
        }
        div:last-child {
            font-size: 12px;
        }
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
