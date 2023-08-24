<template>
    <div class="js_dialog" role="dialog" aria-hidden="true" aria-modal="true" aria-labelledby="js_title1" id="iosDialog1">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__hd">
                <strong class="weui-dialog__title" id="js_title1">{{ title }}</strong>
            </div>
            <div class="weui-dialog__bd">
                {{ content }}
                <slot></slot>
            </div>
            <div class="weui-dialog__ft">
                <a role="button" href="javascript:" class="weui-dialog__btn weui-dialog__btn_default" @click="handle">我知道了</a>
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
        content: {
            type: String,
            default: '',
        },
    },
    methods: {
        handle() {
            this.$emit('success');
        },
    },
};
</script>
<style lang="less" scoped>
strong {
    border: 0;
    font-weight: normal;
}
.weui-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
}
.weui-dialog {
    position: fixed;
    z-index: 5000;
    top: 50%;
    left: 16px;
    right: 16px;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    background-color: #fff;
    background-color: #fff;
    text-align: center;
    border-radius: 12px;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    max-height: 90%;
}
.weui-dialog__hd {
    padding: 32px 24px 16px;
}
.weui-dialog__title {
    font-weight: 700;
    font-size: 17px;
    line-height: 1.4;
}
.weui-dialog__bd {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0 24px;
    margin-bottom: 32px;
    font-size: 17px;
    line-height: 1.4;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    hyphens: auto;
    color: rgba(0, 0, 0, 0.5);
}
.weui-dialog__ft {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}
.weui-dialog__btn {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    display: block;
    line-height: 1.41176471;
    padding: 16px 0;
    font-size: 17px;
    color: #576b95;
    color: rgba(0, 0, 0, 0.9);
    font-weight: 700;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    position: relative;
    overflow: hidden;
}
.weui-dialog__ft:after {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.1);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
</style>
