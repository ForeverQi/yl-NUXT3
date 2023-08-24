import bomUtil from '@youlu/niceloo/libs/@xlib.01/lib/util/util.bom';

export default {
    data() {
        return {
            isPc: bomUtil.env.isPc,
        };
    },
    beforeMount() {
        /* 如果是移动环境，则展现为手机端样式 */
        // eslint-disable-next-line camelcase
        var viewportMetaHeader_old = document.querySelector('head meta[name=viewport]');
        // eslint-disable-next-line camelcase
        var viewportMetaHeader_new = (function () {
            var metaObj = document.createElement('meta');
            metaObj.setAttribute('name', 'viewport');
            metaObj.setAttribute('content', 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0');
            return metaObj;
        })();

        /* 如果是 手机端 或 平板浏览，则调整视口配置，使其完美展现手机端样式 */
        if (!bomUtil.env.isPc) {
            // eslint-disable-next-line camelcase
            viewportMetaHeader_old && viewportMetaHeader_old.parentNode.removeChild(viewportMetaHeader_old);
            document.head.appendChild(viewportMetaHeader_new);
        }
    },
    mounted() {
        /* 确定展现环境，以启用不同的展现样式 */
        this.$el.setAttribute('data-env', !bomUtil.env.isPc ? 'not-pc' : 'pc');
    },
};
