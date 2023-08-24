<template>
    <span v-html="content" />
</template>

<script>
export default {
    name: 'veParse',
    props: {
        article: { type: String, default: '<span></span>' },
    },
    data() {
        return {
            content: '',
        };
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
    methods: {
        replaceAllImg(html) {
            var re = /<img (.*?)src=['"](.*?)['"]/gi;
            var string = html;
            var temp;
            while ((temp = re.exec(html))) {
                let restr = temp[0];
                let src = temp[2];
                string = string.replace(
                    restr,
                    restr.replace(src, src.startsWith('data:image') ? src : this.getServerFileViewPath(src)) //返回全路径)
                );
            }
            return string;
        },
        getServerFileViewPath(src) {
            return src.startsWith('http') ? src : this.$urlUtils.getViewUrl(src);
        },
    },
};
</script>

<style lang="less" scoped>
/deep/img {
    max-width: 100% !important;
}
</style>
