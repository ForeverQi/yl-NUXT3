<script lang="jsx">
export default {
    props: {
        classId: {
            type: String,
            default: '',
        },
        activeStatus: {
            type: Number,
            default: 1,
        },
    },
    /**
     * @returns { object } 数据模型
     */
    data() {
        return {
            newActiveStatus: 1,
        };
    },
    watch: {
        /**
         *
         * @param {number} newValue 选择状态
         */
        activeStatus(newValue) {
            this.newActiveStatus = newValue;
        },
    },
    methods: {
        /**
         *
         * @param {string} url 跳转的url，不带参数
         * @param {string} query 需要新增的参数 例："id=123&name=John"
         * @returns {string} 拼接后的url
         */
        montageQuery(url, query) {
            let urlStr = location.href.split('?')[1];
            let newUrl = '';
            if (urlStr.length) {
                newUrl += `${url}?${urlStr}`;
                if (query) {
                    newUrl += `&${query}`;
                }
            } else if (query) {
                newUrl += `?${query}`;
            }
            return newUrl;
        },
    },
    /**
     * @returns { function() } render函数
     */
    render() {
        return (
            <div>
                {/* 课内测试、专属题库、AI错题本、试题收藏夹 tab切换 */}
                <div class="question-bank-tab">
                    <div
                        class={{ 'tab-child': true, 'active-tab': this.newActiveStatus === 1 }}
                        onClick={() => {
                            this.$emit('changeLabel', 1);
                        }}
                    >
                        <span>课内测试</span>
                    </div>
                    <div
                        class={{ 'tab-child': true, 'active-tab': this.newActiveStatus === 2 }}
                        onClick={() => {
                            this.$emit('changeLabel', 2);
                        }}
                    >
                        <span>专属题库</span>
                    </div>
                    <div
                        class={{ 'tab-child': true, 'active-tab': this.newActiveStatus === 3 }}
                        onClick={() => {
                            this.$emit('changeLabel', 3);
                        }}
                    >
                        <span>AI错题本</span>
                    </div>
                    <div
                        class={{ 'tab-child': true, 'active-tab': this.newActiveStatus === 4 }}
                        onClick={() => {
                            this.$emit('changeLabel', 4);
                            const newUrl = this.montageQuery(`/learningCenter/test-paper-list/STSCJ/${this.classId}`);
                            this.$router.replace({
                                path: newUrl,
                            });
                        }}
                    >
                        <span>试题收藏夹</span>
                    </div>
                </div>
            </div>
        );
    },
};
</script>

<style lang="less" scoped>
.question-bank-tab {
    width: 100%;
    height: 60px;
    background: #ffffff;
    border-radius: 8px 8px 0 0;
    box-shadow: 0px 2px 8px 0px rgba(11, 42, 113, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    .tab-child {
        font-size: 18px;
        color: #8d90aa;
        font-weight: 500;
        margin-right: 48px;
        cursor: pointer;
        &:last-child {
            margin-right: 0;
        }
    }
    .active-tab {
        color: #ff2e30;
        position: relative;
        &::before {
            content: '';
            display: block;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -6px;
            width: 22px;
            height: 4px;
            background: #f8323c;
            border-radius: 2px;
        }
    }
}
</style>
