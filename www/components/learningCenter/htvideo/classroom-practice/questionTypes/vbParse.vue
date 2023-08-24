<template>
    <span v-html="content"></span>
</template>

<script>
export default {
    name: 'coParse',
    props: {
        article: { type: String, default: '<span></span>' },
    },
    data() {
        return {
            content: '',
            imageProp: {},
        };
    },
    watch: {
        article: {
            deep: true,
            immediate: true,
            handler(newV, oldV) {
                this.content = this.replaceAllImg(newV);
            },
        },
    },

    methods: {
        replaceAllImg(html) {
            if (!html) {
                return '';
            }
            var newContent = html.replace(/<img[^>]*>/gi, (str) => {
                var srcReg = /src=['"]?([^'"]*)['"]?/i;
                var url = str.match(srcReg);
                var mat = str.replace(/src=['"](.*)['"]/gi, 'src=' + this.$urlUtils.getViewUrl(url[1]));
                return mat;
            });
            return newContent;
        },

        preview(src, e) {
            // do something
        },
        navigate(href, e) {
            // do something
        },
    },
};
</script>
