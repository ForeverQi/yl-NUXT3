<script lang="jsx">
import { mapState, mapActions } from 'vuex';
export default {
    props: {
        activeStatus: {
            type: Number,
            default: 1,
        },
    },
    /**
     * 数据模型
     *
     * @returns {object} 数据模型
     */
    data() {
        return {
            toolMap: {
                favorites: false,
                questionBook: false,
            },
        };
    },
    computed: {
        ...mapState('class-info/info', {
            classId: 'classId', // 班型ID
        }),
    },
    watch: {
        classId: {
            immediate: true,
            /**
             *
             * @param {string} val 班级信息
             */
            handler(val) {
                if (!val) {
                    return;
                }
                this.getLearnToolsStatus(val).then((res) => {
                    console.log(res, '@@000');
                    this.toolMap = res;
                });
            },
        },
    },
    methods: {
        ...mapActions('class-info/learn-tool', {
            getLearnToolsStatus: 'getLearnToolsStatus',
        }),
        /**
         *
         * @param {string} url 跳转的url，不带参数
         * @param {string} query 需要新增的参数 例："id=123&name=John"
         * @returns {string} 拼接后的url
         */
        montageQuery(url, query) {
            let urlStr = location.href.split('?')[1];
            let newUrl = url;
            if (urlStr && urlStr.length) {
                newUrl = `${url}?${urlStr}`;
                if (query) {
                    newUrl += `&${query}`;
                }
            } else if (query) {
                newUrl += `?${query}`;
            }
            return newUrl;
        },
        /**
         * 根据不同的tab标签组装URL
         */
        changeLabelFun() {
            let newUrl = '';
            let tabType = '';
            switch (Number(this.activeStatus)) {
                case 1:
                    tabType = 'KNCS';
                    break;
                case 2:
                    tabType = 'ZXTK';
                    break;
                case 3:
                    tabType = 'AICTB';
                    break;
                case 4:
                    tabType = 'CTSCJ';
                    break;
            }
            newUrl = this.montageQuery(`/learningCenter/test-paper-list/questionBank/${tabType}/${this.classId}`);
            this.$router.replace(newUrl);
        },
    },
    /**
     * @returns {function()} render函数
     */
    render() {
        return (
            <div>
                {/* 课内测试、专属题库、AI错题本、试题收藏夹 tab切换 */}
                <div class="question-bank-tab">
                    <div
                        class={{ 'tab-child': true, 'active-tab': this.activeStatus === 1 }}
                        onClick={() => {
                            if (this.activeStatus === 1) return;
                            this.$emit('changeHeader', 1);
                            this.$nextTick(() => {
                                this.changeLabelFun();
                            });
                        }}
                    >
                        <span>课内测试</span>
                    </div>
                    <div
                        class={{ 'tab-child': true, 'active-tab': this.activeStatus === 2 }}
                        onClick={() => {
                            if (this.activeStatus === 2) return;
                            this.$emit('changeHeader', 2);
                            this.$nextTick(() => {
                                this.changeLabelFun();
                            });
                        }}
                    >
                        <span>SVIP精题库</span>
                    </div>
                    {this.toolMap.questionBook && (
                        <div
                            class={{ 'tab-child': true, 'active-tab': this.activeStatus === 3 }}
                            onClick={() => {
                                if (this.activeStatus === 3) return;
                                this.$emit('changeHeader', 3);
                                this.$nextTick(() => {
                                    this.changeLabelFun();
                                });
                            }}
                        >
                            <span>AI错题本</span>
                        </div>
                    )}
                    {this.toolMap.favorites && (
                        <div
                            class={{ 'tab-child': true, 'active-tab': this.activeStatus === 4 }}
                            onClick={() => {
                                if (this.activeStatus === 4) return;
                                this.$emit('changeHeader', 4);
                                this.$nextTick(() => {
                                    this.changeLabelFun();
                                });
                            }}
                        >
                            <span>试题收藏夹</span>
                        </div>
                    )}
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
@import '../asset/css/index.less';
</style>
