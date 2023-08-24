<template>
    <div class="tab-container">
        <div class="tab-content">
            <a
                :href="`/hot-article-list/GWSYZX/${item.columnId}`"
                class="tab-item"
                v-for="item in tabList"
                :key="item.columnId"
                @click.prevent="selectColumn(item, $event)"
                :class="[selectColumnId === item.columnId ? 'active' : '']"
            >
                {{ item.columnName }}
            </a>
        </div>
        <search-bar v-if="showSearch" class="search-bar"></search-bar>
    </div>
</template>
<script>
import SearchBar from '@/www/components/article-list/search/index.vue';

export default {
    components: {
        SearchBar,
    },
    props: {
        tabList: {
            type: Array,
            default: () => {
                return [];
            },
        },
        columnId: {
            type: String,
            default: '',
        },
        project: {
            type: Object,
            default() {
                return {};
            },
        },
        showSearch: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            selectColumnId: '',
            selectSubColumnId: '',
            selectColumnData: {},
        };
    },
    fetch() {
        let index = this.tabList.findIndex((item) => {
            return item.columnId === this.columnId;
        });
        if (this.columnId && index >= 0) {
            this.selectColumn(this.tabList[index]);
        } else {
            this.selectColumn(this.tabList[1]);
        }
        return Promise.resolve();
    },
    watch: {
        tabList() {
            this.initData();
        },
    },
    methods: {
        initData() {
            let index = this.tabList.findIndex((item) => {
                return item.columnId === this.columnId;
            });
            if (this.columnId && index >= 0) {
                this.selectColumn(this.tabList[index]);
            } else if (this.tabList.length > 0) {
                this.selectColumn(this.tabList[1]);
            }
        },
        selectColumn(item, e) {
            if (!item) {
                return;
            }
            this.selectColumnId = item.columnId;
            this.selectColumnData = item;
            this.$emit('select', this.selectColumnId, e);
            this.$emit('update:columnName', item.columnName);
        },
    },
};
</script>
<style lang="less" scoped>
.tab-container {
    display: flex;
    width: 1200px;
}
.tab-content {
    height: auto;
    display: flex;
    flex: 1;

    .tab-item {
        display: block;
        margin-right: 36px;
        height: 56px;
        border-bottom: 2px solid transparent;
        font-size: 18px;
        font-weight: 400;
        color: #3a3d4b;
        cursor: pointer;
        line-height: 56px;
    }
    .active {
        border-bottom: 2px solid #ff2e30;
        color: #ff2e30;
        font-weight: 700;
    }
    .tab-item:hover {
        color: #ff2e30;
        font-weight: 700;
    }
}

.tab-sub-content {
    margin-top: 8px;
    padding-bottom: 20px;
    width: 1200px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    .sub-tab-item {
        margin-top: 12px;
        padding: 6px 20px;
        margin-right: 12px;
        box-sizing: border-box;
        height: 30px;
        border-radius: 15px;
        font-size: 14px;
        font-weight: 400;
        color: #3a3d4b;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f6fa;
    }
    .active {
        color: #ff2e30;
        background: #ffece8;
    }
    .tab-item:hover {
        color: #ff2e30;
    }
}
</style>
