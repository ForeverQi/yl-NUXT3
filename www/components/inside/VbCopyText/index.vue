<!-- 复制文本   通过input的select方法实现，其他方法兼容不佳;-->
<template>
    <div>
        <span class="copyContent">{{ text }}</span>
        <!-- <input type="text" id='input_copy_' style="display:none" :value='text'> -->
    </div>
</template>

<script>
export default {
    name: 'vbCopyText',
    props: {
        text: {
            type: String,
            default: '',
        },
    },
    methods: {
        copyText() {
            let inputNode = document.createElement('input');
            inputNode.value = this.text;
            document.body.appendChild(inputNode);
            // 复制关键
            inputNode.select();

            let supportExec = true; //true 支持复制功能 复制成功
            if (document.execCommand && typeof document.execCommand == 'function') {
                supportExec = document.execCommand('Copy');
            } else {
                supportExec = false; //不支持  复制失败
            }

            if (supportExec) {
                this.$emit('success', this.text);
            } else {
                this.$baseUI.alert('复制失败');
            }

            document.body.removeChild(inputNode);
        },
    },
};
</script>
<style lang="less" scoped></style>
