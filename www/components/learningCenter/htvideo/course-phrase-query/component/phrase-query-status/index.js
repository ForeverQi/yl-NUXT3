export default {
    name: 'phrase-query-status',
    props: {
        //是否被搜索
        isSearched: {
            type: Boolean,
            default: false,
        },
        //组件
        status: {
            type: String,
            default: 'init',
        },
        //查询列表
        list: {
            type: Array,
            default: () => [],
        },
        //查找的关键字
        searchText: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            activeIndex: null, //点击选中的关键词
        };
    },
    methods: {
        // 点击条目
        tapActive(item, index) {
            this.activeIndex = index;
            this.$emit('tap-active', item, index);
        },
        //滚动高度
        scrollEvent(e) {
            this.$emit('scroll-event', e.target.scrollTop);
        },
    },
};
