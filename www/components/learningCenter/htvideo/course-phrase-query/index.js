import CourseSideTitle from '../course-side-title/index.vue'; //title
import PhraseQueryHeader from './component/phrase-query-header/index.vue'; //搜索框
import PhraseQueryStatus from './component/phrase-query-status/index.vue'; //不同组件状态
import PhraseQueryContent from './component/phrase-query-content/index.vue'; //关键字查询详情
import '@/api/cbn/api..query-cbn-noun-es-list-v2.js';
import '@/api/cbn/api..set-cbn-noun-confirm.js';
import '@/api/cbn/api..query-cbn-noun-user-search-v2.js';
export default {
    name: 'course-phrase-query',
    components: { PhraseQueryHeader, PhraseQueryStatus, CourseSideTitle, PhraseQueryContent },
    props: {
        //项目id
        projectId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isShowToast: false, // 是否显示轻提示
            isAccurate: true, //是否精确匹配
            isShowDictList: true, //是否显示词典列表
            isSearched: false, //用户是否进行搜索
            isLoading: false, //加载
            status: 'init', //组件状态 init初始化 no-data查询无数据 show-list 查询列表
            keywordList: [], //搜索关键词列表
            searchText: '', //查询的关键字
            subjectId: '', //科目id
            contentStyle: {}, //内容区高度
            scrollTop: 0, //查询列表滚动高度
            dictDetailList: [], //关键字详情
            currentSubject: {}, // 当前选中的词点详情数据
            isShowStatus: true, //显示初始化、无数据、查询列表
            activeIndex: null, //选中的关键字索引
        };
    },
    destroyed() {
        window.removeEventListener('resize', this.setContentStyle, true);
    },
    mounted() {
        window.addEventListener(
            'resize',
            () => {
                this.$nextTick(() => {
                    this.setContentStyle();
                });
            },
            true
        );
        this.setContentStyle();
    },
    methods: {
        /**
         * @description 选择下拉列表的关键字
         * @param {Object} option 选中的数据
         * @param {String} option.searchText 搜索框内容
         * @param {Object} option.dictDetail 选中的数据
         */
        handleSelect(option) {
            let name = option.dictDetail.names;
            if (name.length >= 50) {
                name = name.substr(0, 50);
            }
            this.isSearched = true;
            this.isShowDictList = false;
            this.status = '';
            this.$refs.dictSearch.isShowBack = false;
            this.searchText = name;
            this.subjectId = '';
            this.queryDictDetail(option.dictDetail.names);
        },
        /**
         * 获取搜索框内容
         * @param {String} searchText 搜索框内容
         * @param {boolean} isRepetition 输入框内容是否重复
         */
        handleSearch(searchText, isRepetition = false) {
            if (isRepetition) {
                this.searchText = searchText;
                this.goBack();
                return;
            }
            this.isSearched = true;
            this.isShowDictList = true;
            this.searchText = searchText;
            this.subjectId = '';
            this.$refs.dictSearch.isShowBack = false;
            this.scrollTop = 0;
            this.keywordList = [];
            this.loading = true;
            this.activeIndex = null;
            if (this.$refs.queryStatus) {
                this.$refs.queryStatus.activeIndex = null;
            }
            niceloo.api.call('dict/query-cbn-noun-es-list-v2', {
                pageIndex: 0,
                pageSize: 20,
                searchContent: this.searchText,
                searchProjectId: this.projectId,
                onsuccess: (data) => {
                    if (data && data.nounList && data.nounList.length > 0) {
                        this.keywordList = data.nounList;
                        this.isAccurate = data.accurate;
                        this.status = 'show-list';
                    } else {
                        this.status = 'no-data';
                        this.isAccurate = true;
                    }
                    this.$nextTick(() => {
                        this.setContentStyle();
                    });
                    this.isShowStatus = true;
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
        /**
         * @description 添加入库
         * @param {String} searchText 添加入库的搜索关键字
         */
        joinDict(searchText) {
            niceloo.api.call('dict/set-cbn-noun-confirm', {
                name: searchText,
                projectId: this.projectId,
                onsuccess: () => {
                    this.isShowToast = true;
                    setTimeout(() => {
                        this.isShowToast = false;
                    }, 2500);
                },
                onerror: niceloo.api.handleFailure,
            });
        },
        //动态设置内容区高度
        setContentStyle() {
            let contentHeight = this.$refs.main.offsetHeight - 60 - this.$refs.dictSearch.$el.offsetHeight;
            this.contentStyle = {
                height: contentHeight + 'px',
            };
        },
        //返回
        goBack() {
            this.isSearched = true;
            this.isShowDictList = true;
            this.status = this.keywordList.length > 0 ? 'show-list' : 'no-data';
            this.$refs.dictSearch.isShowBack = false;
            this.$refs.dictSearch.searchText = this.$refs.dictSearch.lastSearchText;
            this.subjectId = '';
            this.isShowStatus = true;
            this.currentSubject = {};
            // 滚动到指定位置
            this.$nextTick(() => {
                this.$refs.queryStatus.activeIndex = this.activeIndex;
                this.$refs.queryStatus.$refs.main.scrollTop = this.scrollTop;
            });
        },
        /**
         * @description 查询详情
         * @param {String} name 关键字名称
         */
        queryDictDetail(name) {
            this.dictDetailList = [];
            this.loading = true;
            niceloo.api.call('dict/query-cbn-noun-user-search-v2', {
                names: name,
                projectId: this.projectId,
                onsuccess: (data) => {
                    if (data.length === 0) {
                        this.status = 'no-data';
                    } else {
                        this.isShowStatus = false;
                    }
                    this.dictDetailList = data;
                },

                onerror: niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
        /**
         * @description 点击关键词列表、查看详情
         * @param {object} item 关键词对象
         */
        tapActive(item, index) {
            let pureNames = item.pureNames;
            if (pureNames && pureNames.length >= 50) {
                pureNames = pureNames.substr(0, 50);
            }
            this.isSearched = true;
            this.isShowDictList = false;
            this.status = '';
            this.subjectId = item.subjectId;
            this.searchText = pureNames;
            this.activeIndex = index;
            this.$refs.dictSearch.searchText = pureNames;
            this.$refs.dictSearch.isShowBack = true;
            this.queryDictDetail(item.pureNames);
        },
        /**
         * @description 监听内容区滚动
         * @param {number} data 接受滚动的高度
         */
        scrollEvent(data) {
            if (this.isShowDictList) {
                this.scrollTop = data;
            }
        },
    },
};
