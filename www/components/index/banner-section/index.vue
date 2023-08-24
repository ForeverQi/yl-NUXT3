<script lang="jsx">
import ProjectSection from './components/project-section/index.vue';
import BannerWrap from './components/banner-wrap/index.vue';
export default {
    name: 'BannerSection',
    data() {
        return {
            currentSrc: '', // 当前背景图
        };
    },
    fetch() {
        return Promise.resolve();
    },
    computed: {
        bgStyle() {
            if (this.$platform.isIE) {
                return '';
            }
            return {
                backgroundImage: `url(${this.$urlUtils.getViewUrl(this.currentSrc)})`,
            };
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 获取项目
        },
    },
    render() {
        return (
            <div class="banner-wrap">
                <div class="bg" style={this.bgStyle}></div>
                <BannerWrap
                    onChangeImage={(path) => {
                        this.currentSrc = path;
                    }}
                >
                    <div class="project">
                        <ProjectSection />
                    </div>
                </BannerWrap>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.banner-wrap {
    padding: 32px 0;
    height: 100%;
    box-sizing: border-box;
}
.bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 180px;
    opacity: 0.3;
    filter: blur(100px);
    background-size: cover;
    transition: all 0.3s;
}
.project {
    position: absolute;
    top: 0;
    left: 0;
    height: 370px;
}
</style>
