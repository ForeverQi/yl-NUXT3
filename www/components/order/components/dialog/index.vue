<template>
    <div class="dialog-wrap" v-if="show">
        <div class="dialog" :style="customStyle">
            <div class="dialog-title dialog-title__modification">
                <div class="dialog-title__txt">{{ title }}</div>
                <div class="dialog-title__close" @click="doClose">
                    <img src="./assets/images/close.png" />
                </div>
            </div>
            <div class="dialog-body">
                <slot></slot>
            </div>
            <div class="dialog-footer">
                <slot name="foot"></slot>
                <div v-if="!$slots.foot" class="dialog-footer__btn" @click="doClose">我知道了</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: '提示',
        },
        show: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: '505px',
        },
    },
    computed: {
        customStyle() {
            return {
                width: this.width,
            };
        },
    },
    methods: {
        doClose() {
            this.$emit('update:show', false);
            this.$emit('do-close');
        },
    },
};
</script>
<style lang="less" scoped>
.dialog-wrap {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 52;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}
.dialog {
    margin-top: 15vh;
    margin-bottom: 30px;
    width: 505px;
    // max-height: 615px;
    border-radius: 8px;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.dialog-title {
    position: relative;
    height: 50px;

    &__modification {
        border-bottom: 1px solid #f0f0f0;
    }
    &__txt {
        color: #333333;
        font-size: 16px;
        // font-weight: bold;
        text-align: center;
        line-height: 50px;
    }
    &__close {
        position: absolute;
        width: 14px;
        height: 14px;
        right: 24px;
        top: 50%;
        margin-top: -7px;
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
.dialog-body {
    padding: 32px;
    display: inline-block;
    font-size: 14px;
    margin: 0 auto;
    padding-bottom: 0;
    text-align: left;
    line-height: 21px;
    width: 100%;
    box-sizing: border-box;
}
.dialog-footer {
    padding-top: 38px;
    padding-bottom: 38px;
    &__btn {
        width: 140px;
        height: 40px;
        margin: auto;
        background: #f02e00;
        border-radius: 4px;
        color: #fff;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
    }
}
</style>
