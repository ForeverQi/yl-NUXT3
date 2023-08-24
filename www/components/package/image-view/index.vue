<script lang="jsx">
export default {
    name: 'ImageView',
    props: {
        src: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: '',
        },
        // 加载或错误时占位图片的宽度比例(css)，可以为px或百分比
        placeholderWidth: {
            type: String,
            default: '100%',
        },
        // 加载或错误时占位图片的高度比例(css)，可以为px或百分比
        placeholderHeight: {
            type: String,
            default: 'auto',
        },
    },
    data() {
        return {
            loading: true,
            show: false,
            error: false,
            isWidth: false,
            sW: 1200, // 默认宽
            sH: 0, // 默认高度
        };
    },
    fetch() {
        this.loadImage();
        return Promise.resolve();
    },
    watch: {
        src(val) {
            if (val) {
                this.loadImage();
            }
        },
    },
    methods: {
        loadImage() {
            if (process.server) {
                this.error = false;
                this.loading = false;
            } else {
                this.loading = true;
                this.error = false;
                const img = new Image();
                img.onload = (e) => this.handleLoad(e, img);
                img.onerror = this.handleError.bind(this);

                img.src = this.$urlUtils.getViewUrl(this.src);
            }
        },
        handleLoad(e, img) {
            this.loading = false;
            this.error = false;
        },
        handleError(e) {
            this.loading = false;
            this.error = true;
            this.$emit('error', e);
        },
    },
    render() {
        const defaultImg = () => {
            const typeToImgMap = new Map([
                ['banner', require('./asset/images/empty.png')],
                ['course', require('./asset/images/empty_course.png')],
                ['news', require('./asset/images/news_bac.png')],
                ['social', require('./asset/images/social_bac.png')],
                ['default', require('./asset/images/empty_course.png')],
                ['toolBg', require('./asset/images/toolBg.png')],
                ['toolErCode', require('./asset/images/toolErCode.png')],
            ]);
            let imgSrc = typeToImgMap.get('default');
            if (typeToImgMap.has(this.type)) {
                imgSrc = typeToImgMap.get(this.type);
            }
            return imgSrc;
            // return require(`${imgSrc}`);
        };
        const contentHTML = () => {
            if (this.loading === true) {
                return this.$slots.placeholder ? (
                    this.$slots.placeholder
                ) : (
                    <div class="yl-image-view">
                        <div class="yl-image-wrap-loading">
                            <img style={`width: ${this.placeholderWidth}`} src={defaultImg()} />
                        </div>
                    </div>
                );
            } else if (this.error === true) {
                return this.$slots.error ? (
                    this.$slots.error
                ) : (
                    <div class="yl-image-view">
                        <div class="yl-image-wrap-error">
                            <img style={`width: ${this.placeholderWidth}; height: ${this.placeholderHeight}`} src={defaultImg()} />
                        </div>
                    </div>
                );
            } else if (this.src) {
                return <img class="img" src={this.$urlUtils.getViewUrl(this.src)} />;
            } else {
                return <img class="img" src={defaultImg()} />;
            }
        };
        return contentHTML();
    },
};
</script>
<style lang="less" scoped>
.yl-image-view {
    display: inline-block;
    width: 100%;
    height: 100%;

    .yl-image-wrap-error,
    .yl-image-wrap-loading {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ededee;
    }
}

.img {
    transform: translate3d(0, 0, 0);
}
</style>
