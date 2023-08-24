<script lang="jsx">
export default {
    name: 'CourseStar',
    props: {
        value: {
            type: Number,
            default: 0,
        },
        count: {
            type: Number,
            default: 5,
        },
    },
    render() {
        const contentHtml = () => {
            let html = [];
            for (let i = 0; i < this.count; i++) {
                html.push(<span class={['star', this.value > i ? 'bright' : '']}></span>);
            }

            return html;
        };
        return <div class="star-wrap">{contentHtml()}</div>;
    },
};
</script>
<style lang="less" scoped>
.star-wrap {
    .star {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-image: url(./asset/images/no_star.png);
        background-size: contain;
        margin-right: 4px;

        &.bright {
            background-image: url(./asset/images/star.png);
        }
    }
}
</style>
