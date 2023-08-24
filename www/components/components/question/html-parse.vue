<template>
    <span v-html="content" ref="dynamicContentWrapper" class="span-wrap" @change="handleChange" />
</template>

<script>
export default {
    name: 'veParse',
    props: {
        article: {
            type: String,
            default: '<span></span>',
        },
    },
    data() {
        return {
            content: '',
        };
    },
    computed: {
        /**
         * @returns {string} special: 从专项小题库进入
         */
        questionBankStatus() {
            return this.$route.query.questionBankStatus;
        },
    },
    watch: {
        article: {
            deep: true,
            immediate: true,
            handler(newV) {
                this.content = this.replaceAllImg(newV);
            },
        },
    },
    mounted() {
        if (this.questionBankStatus === 'special') {
            this.$nextTick(() => {
                // 使用事件代理监听动态生成的input标签的输入事件
                // const dynamicContentWrapper = this.$refs.dynamicContentWrapper;
                // dynamicContentWrapper.addEventListener('input', this.handleInput);
            });
        }
    },
    beforeDestroy() {
        if (this.questionBankStatus === 'special') {
            // 在组件销毁前移除事件监听，避免内存泄漏
            // const dynamicContentWrapper = this.$refs.dynamicContentWrapper;
            // dynamicContentWrapper.removeEventListener('input', this.handleInput);
        }
    },
    methods: {
        replaceAllImg(html) {
            const re = /<img (.*?)src=['"](.*?)['"]/gi;
            let string = html;
            let temp;
            while ((temp = re.exec(html))) {
                let reStr = temp[0];
                let src = temp[2];
                string = string.replace(reStr, reStr.replace(src, src.startsWith('data:image') ? src : this.$urlUtils.getViewUrl(src)));
            }
            return string;
        },
        handleChange(e) {
            this.$emit('input-change', e);
        },
        // handleInput(e) {
        //     this.$emit('input-change', e);
        // },
    },
};
</script>
<style lang="less" scoped>
.span-wrap {
    word-wrap: break-word;
    word-break: break-all;
}
/deep/img {
    max-width: 100%;
}
</style>
