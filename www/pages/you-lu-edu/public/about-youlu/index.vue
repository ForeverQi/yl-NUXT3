<template>
    <div class="about-wrap" v-loading="isLoading">
        <iframe
            ref="iframeVueRef"
            :src="`https://www.youlu.com/zt1/brand/2022gywm/?e_id=S-14350`"
            width="100%"
            height="10540"
            class="about-iframe"
            allow="*"
            allowfullscreen="true"
            frameborder="0"
        ></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            iframeSrc: '',
            isLoading: false,
        };
    },
    head() {
        return this.$head({
            title: '关于我们_点亮职业人生_优路教育',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '品牌,优路,优路教育,优路教育网,国家职业资格考试,在线教育,在线培训,职业培训,职业教育,素质提升,技能提升,建筑工程考试,消防考试,一级建造师,二级建造师,一级消防工程师,四级英语,六级英语,大学生,公务员,考公考编,心理咨询,初级会计师,财税金融,医卫康养,教师,法律,学历,学历提升',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育，职业教育一站式学习平台，提供专业职业考试培训和职业技能提升培训服务，用知识服务助力个人职业发展。',
                },
            ],
        });
    },
    mounted() {
        this.$nextTick(() => {
            this.resetHeight().then(() => {
                const iframeDom = window.top.document.getElementsByTagName('iframe')[0];
                iframeDom.onload = () => {
                    let linkName = this.$route.query.hashName;
                    setTimeout(() => {
                        iframeDom.contentWindow.postMessage(linkName, '*');
                        let timer = setTimeout(() => {
                            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                            document.documentElement.scrollTop = document.body.scrollTop = scrollTop - 100;
                            clearTimeout(timer);
                            timer = null;
                        }, 200);
                    }, 1000);
                };
            });
        });
    },
    methods: {
        resetHeight() {
            return new Promise((resolve) => {
                let iframe = this.$refs.iframeVueRef;
                var _wh = document.documentElement.clientHeight - 130; //浏览器中间数据展示区域高度
                var h = 0;
                try {
                    var a = iframe.contentWindow.document.body.scrollHeight;
                    var b = iframe.contentWindow.document.documentElement.scrollHeight;
                    h = a > b ? a : b;
                    h += 150; //buf
                } catch (e) {}
                //如果没有读到，那就使用默认的浏览器中间数据展示区域的高度
                if (!h || h < _wh) {
                    h = _wh;
                }
                iframe.style.height = '10540px';
                resolve();
            });
        },
    },
};
</script>

<style lang="less" scoped>
.about-wrap {
    padding-bottom: 40px;
    min-height: 700px;
}
.about-iframe {
    height: 10500px;
}
</style>
