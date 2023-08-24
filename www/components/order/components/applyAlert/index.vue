<template>
    <dialog-view :title="title" @do-close="doClose" :show.sync="dialogShow">
        <!-- 弹窗正文内容 -->
        <slot />
        <template #foot>
            <div class="btn" @click="doClose(true)">我知道了</div>
        </template>
    </dialog-view>
</template>
<script>
import DialogView from '../dialog';
export default {
    components: {
        DialogView,
    },
    props: {
        // 是否显示弹窗,支持.sync
        show: {
            type: Boolean,
            default: false,
        },
        // 弹窗标题
        title: {
            type: String,
            default: '提示',
        },
    },
    data() {
        return {
            dialogShow: this.show,
        };
    },
    watch: {
        show(val, oldVal) {
            if (val !== oldVal) {
                this.dialogShow = this.show;
            }
        },
    },
    methods: {
        doClose(init = false) {
            if (init === false) {
                console.log('点击右上角关闭');
                this.$emit('do-close');
            } else {
                console.log('点击按钮关闭');
                this.$emit('do-close');
            }
            this.dialogShow = false;
        },
    },
};
</script>
<style lang="less" scoped>
.btn {
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
</style>
