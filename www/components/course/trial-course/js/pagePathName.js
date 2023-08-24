export default {
    /**
     * 数据模型
     *
     * @returns {object} 数据模型
     */
    data() {
        return {
            pagePathName: '',
        };
    },
    methods: {
        /**
         * 更新页码
         *
         * @returns {undefined} undefined
         */
        updateUrlPageNumber() {
            if (this.$platform.isClient() === false) {
                return (this.pagePathName = this.$route.path);
            }
            if (location) {
                this.pagePathName = location.pathname;
            } else {
                this.pagePathName = this.$route.path;
            }
            const query = { ...this.$route.query };
            query.page = this.page.pageIndex;
            const p = this.$router.resolve({
                path: this.pagePathName,
                query,
            });
            history.pushState(null, null, p.href);
        },
        /**
         * ssr页码超出范围404跳转
         */
        ssrInValidPage() {
            const pageCount = this.page.pageCount || this.page.count || 0;
            if (this.page.pageIndex === 1) {
                return;
            }
            if (this.page.pageIndex > Math.ceil(pageCount / this.page.pageSize) || this.page.pageIndex <= 0) {
                this.$nuxt.error({ statusCode: 404, message: 'Data not found' });
            }
        },
    },
};
