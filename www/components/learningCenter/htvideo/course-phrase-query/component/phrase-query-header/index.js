import '@/api/cbn/api..query-cbn-noun-queryByEs-v2.js';
export default {
    name: 'phrase-query-header',
    props: {
        //项目id
        projectId: {
            type: String,
            default: '',
        },
        // 是否精确匹配
        isAccurate: {
            type: Boolean,
            default: true,
        },

        // 是否显示词点列表
        isShowDictList: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            searchText: '', //搜索的关键字
            isShake: false, //输入框是否抖动
            searchOption: [], //下拉列表
            lastSearchText: '', //最后搜索的关键字
            loading: false, //加载
            isShowBack: false, //显示返回键
        };
    },
    methods: {
        //根据关键字模糊查询list
        querySearchAsync(queryString, cb) {
            if (queryString === undefined || queryString === '') return;
            this.loading = true;
            niceloo.api.call('dict/query-cbn-noun-queryByEs-v2', {
                pageIndex: 0,
                pageSize: 10,
                searchContent: this.searchText,
                searchProjectId: this.projectId,
                onsuccess: (data) => {
                    if (data && data.nounList.length) {
                        this.searchOption = data.nounList;
                    } else {
                        this.searchOption = [{ value: 1 }];
                    }
                    cb(this.searchOption);
                },

                onerror: niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
        //选择下拉列表
        handleSelect(item) {
            if (this.searchOption[0].value === 1) {
                return;
            }
            this.limitWords();
            this.$emit('handle-select', {
                searchText: this.searchText,
                dictDetail: item,
            });
        },
        //搜索关键字查询列表
        handleSearch() {
            if (this.searchText === '' || this.searchText === undefined || this.searchText === null) {
                this.isShake = true;
                setTimeout(() => {
                    this.isShake = false;
                }, 800);
                return;
            }
            this.limitWords();
            if (this.searchText === this.lastSearchText) {
                if (!this.isShowDictList) {
                    this.$emit('handle-search', this.searchText, true);
                }
                return;
            }

            this.lastSearchText = this.searchText;
            this.$emit('handle-search', this.searchText);
        },
        //限制输入字数
        limitWords() {
            if (this.searchText !== undefined && this.searchText.length >= 50) {
                this.searchText = this.searchText.substring(0, 50);
            }
        },
        //添加入库操作
        joinDict() {
            this.$emit('join-dict', this.lastSearchText);
        },
        //返回
        back() {
            this.$emit('go-back');
        },
    },
    mounted() {
        //首次进入词典快查自动获取焦点
        this.$refs.searchComponent.focus();
    },
};
