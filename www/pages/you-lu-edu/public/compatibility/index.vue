<template>
    <div class="compatibility" id="ie" ref="compatibility"></div>
</template>
<script>
export default {
    name: 'compatibility',
    layout: 'nullLayout',
    /**
     * 初始化钩子
     */
    mounted() {
        this.init();
    },
    methods: {
        /**
         * 初始化方法
         */
        init() {
            let innerHTML =
                '' +
                '<div class="m-container">' +
                '<img class="logo" src="/_nuxt/error-browser-compatibility/asset/images/logo.png"/>' +
                '<img class="content-left" src="/_nuxt/error-browser-compatibility/asset/images/tips-img.png"/>' +
                '<div class="content-right">' +
                '<div class="tips-wrap">' +
                '        <div>启禀小主：</div>' +
                '        <span class="mb12">由于您的浏览器版本过低，很多精彩课程都被拒之殿外啦~</span>' +
                '        <span>为了保证小主的更好体验 您可以</span>' +
                '    </div>' +
                '    <div class="btn-wrap">' +
                '        <div class="btn-1 mgb20"><a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank">下载谷歌浏览器</a></div>' +
                '        <div class="btn-2 mgb20"><a href="https://www.firefox.com.cn/" target="_blank">下载火狐浏览器</a></div>' +
                '        <div class="btn-2 mgr40"><a href="https://www.microsoft.com/zh-cn/edge" target="_blank">下载edge浏览器</a></div>' +
                '        <div class="btn-2"><a href="https://browser.360.cn/ee/" target="_blank">下载360极速浏览器</a></div>' +
                '    </div>' +
                '</div>' +
                '</div>' +
                '<ul class="intro-wrap">' +
                '<li>' +
                '    <img class="intro-img" src="/_nuxt/error-browser-compatibility/asset/images/intro_1.png"/>' +
                '    <div class="intro">主要从事建工、消防、招教、经济、公考、考研等领域的职业考试培训服务，服务网络遍布全国</div>' +
                '    <span class="intro-index">01</span>' +
                '</li>' +
                '<li>' +
                '    <img class="intro-img" src="/_nuxt/error-browser-compatibility/asset/images/intro_2.png"/>' +
                '   <div class="intro">自有的教学和教务团队，形成了丰富的课程产品矩阵和标准化的教学管理体系</div>' +
                '    <span class="intro-index">02</span>' +
                '</li>' +
                '<li>' +
                '    <img class="intro-img" src="/_nuxt/error-browser-compatibility/asset/images/intro_3.png"/>' +
                '    <div class="intro">线上教学为主、线上和线下结合的融合式教学，融入实景模型、智能题库、移动课堂等技术开展知识服务</div>' +
                '    <span class="intro-index">03</span>' +
                '</li>' +
                '<li>' +
                '    <img class="intro-img" src="/_nuxt/error-browser-compatibility/asset/images/intro_4.png"/>' +
                '    <div class="intro">集OMO教学、学习平台及应用研发、图书出版发行于一体的大型知识服务实体和综合性教育服务机构</div>' +
                '    <span class="intro-index">04</span>' +
                '</li>' +
                '</ul>';
            this.$nextTick(() => {
                this.$refs.compatibility.innerHTML = innerHTML;
            });
        },
    },
};
</script>
