<template>
    <div class="tab-container">
        <div class="tab-content" ref="vueRefTab">
            <div class="left-mask-box" v-if="isShowTabScroll && !isFirst"></div>
            <span class="tab" :class="[!isFirst && isShowTabScroll ? 'move-tab' : '']">
                <a
                    :href="`/article-list/${$route.params.channelCode}/${project.projectSeoCode}/${item.ccId}`"
                    class="tab-item"
                    v-for="(item, index) in tabList"
                    :key="item.ccId"
                    @click.prevent="selectColumn(item, 0, index, $event)"
                    :class="[selectColumnId === item.ccId ? 'active' : '', index === tabList.length - 1 ? 'no-margin-tab-item' : '']"
                >
                    {{ item.ccName }}
                </a>
            </span>
            <div class="right-mask-box" v-if="isShowTabScroll">
                <div class="icon-box left-icon" @click="tabMove('left')" :class="[isFirst ? 'left-icon-disable' : '']"></div>
                <div class="icon-box right-icon" @click="tabMove('right')" :class="[isFirst ? '' : 'right-icon-disable']"></div>
            </div>
            <search-bar class="search-bar" :project="project" :column-name="selectSubColumnName || selectColumnName"></search-bar>
        </div>
        <div class="tab-sub-content" v-if="selectColumnData.subCmsColumns && selectColumnData.subCmsColumns.length">
            <a
                :href="subColumnUrl(item)"
                class="sub-tab-item"
                v-for="(item, index) in selectColumnData.subCmsColumns"
                :key="index"
                @click.prevent="selectSubColumn(item, $event)"
                :class="[selectSubColumnId === item.subCcId ? 'active' : '', selectSubColumnId === item.areaCode ? 'active' : '']"
            >
                {{ item.subCcName || item.areaName }}
            </a>
        </div>
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
            default: () => ({}),
        },
        artProvinceId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isSelectArea: false,
            selectColumnId: '',
            selectSubColumnId: '',
            selectColumnData: {},
            isShowTabScroll: false,
            isFirst: true,
            selectColumnName: '',
            selectSubColumnName: '',
        };
    },
    fetch() {
        if (this.columnId) {
            for (let index = 0; index < this.tabList.length; index++) {
                const tabItem = this.tabList[index];
                if (tabItem.ccId === this.columnId && tabItem.ccAreaStatus !== 'Y') {
                    // 选中的索引小于6为第一页
                    this.isFirst = index < 6;
                    this.selectColumn(tabItem, 0, index);
                    break;
                } else if (tabItem.subCmsColumns.length && tabItem.ccAreaStatus === 'Y' && tabItem.ccId === this.columnId) {
                    // 选中的索引小于6为第一页
                    this.isFirst = index < 6;
                    const artIndex = tabItem.subCmsColumns.findIndex((item) => {
                        return item.areaCode === this.artProvinceId;
                    });
                    // console.log(this.artProvinceId, artIndex, 'wcwpcpwpc');
                    if (artIndex > 0) {
                        this.selectColumn(tabItem, artIndex, index);
                    } else {
                        this.selectColumn(tabItem, 0, index);
                    }
                    break;
                } else if (tabItem.subCmsColumns.length && tabItem.ccAreaStatus !== 'Y') {
                    for (let idx = 0; idx < tabItem.subCmsColumns.length; idx++) {
                        const subTabItem = tabItem.subCmsColumns[idx];
                        if (subTabItem.subCcId === this.columnId) {
                            // 选中的索引小于6为第一页
                            this.isFirst = index < 6;
                            this.selectColumn(tabItem, idx, index);
                            break;
                        }
                    }
                }
            }
            if (!this.selectColumnId) {
                this.selectColumn(this.tabList[0], 0, 0);
            }
        }
        if (!this.columnId) {
            this.selectColumn(this.tabList[0], 0, 0);
        }
        // 获取宽度计算是否需要栏目翻页
        this.$nextTick(() => {
            let tabContainerWidth = this.$refs.vueRefTab && this.$refs.vueRefTab.querySelector('.tab').offsetWidth;
            let tabWrapWidth = this.$refs.vueRefTab && this.$refs.vueRefTab.offsetWidth;
            console.log(tabContainerWidth, tabWrapWidth);
            if (tabContainerWidth >= tabWrapWidth) {
                this.isShowTabScroll = true;
            }
        });
        return Promise.resolve();
    },
    computed: {
        subColumnUrl() {
            return (item) => {
                let url = '';
                if (this.isSelectArea === true) {
                    url = `/article-list/${this.$route.params.channelCode}/${this.project.projectSeoCode}/${this.selectColumnId}${
                        item.areaCode ? '/' + item.areaCode : ''
                    }`;
                } else {
                    url = `/article-list/${this.$route.params.channelCode}/${this.project.projectSeoCode}/${item.subCcId ? item.subCcId : this.selectColumnId}`;
                }
                return url;
            };
        },
    },
    watch: {
        tabList() {
            this.initTab();
        },
    },
    methods: {
        initTab() {
            if (this.columnId) {
                for (let index = 0; index < this.tabList.length; index++) {
                    const tabItem = this.tabList[index];
                    if (tabItem.ccId === this.columnId && tabItem.ccAreaStatus !== 'Y') {
                        // 选中的索引小于6为第一页
                        this.isFirst = index < 6;
                        this.selectColumn(tabItem, 0, index);
                        break;
                    } else if (tabItem.subCmsColumns.length && tabItem.ccAreaStatus === 'Y' && tabItem.ccId === this.columnId) {
                        // 选中的索引小于6为第一页
                        this.isFirst = index < 6;
                        this.selectColumn(tabItem, 0, index);
                        break;
                    } else if (tabItem.subCmsColumns.length && tabItem.ccAreaStatus !== 'Y') {
                        for (let idx = 0; idx < tabItem.subCmsColumns.length; idx++) {
                            const subTabItem = tabItem.subCmsColumns[idx];
                            if (subTabItem.subCcId === this.columnId) {
                                // 选中的索引小于6为第一页
                                this.isFirst = index < 6;
                                this.selectColumn(tabItem, idx, index);
                                break;
                            }
                        }
                    }
                }
                if (!this.selectColumnId && this.tabList.length > 0) {
                    this.selectColumn(this.tabList[0], 0, 0);
                }
            }
            if (!this.columnId && this.tabList.length > 0) {
                this.selectColumn(this.tabList[0], 0, 0);
            }
            // 获取宽度计算是否需要栏目翻页
            this.$nextTick(() => {
                let tabContainerWidth = this.$refs.vueRefTab && this.$refs.vueRefTab.querySelector('.tab').offsetWidth;
                let tabWrapWidth = this.$refs.vueRefTab && this.$refs.vueRefTab.offsetWidth;
                console.log(tabContainerWidth, tabWrapWidth);
                if (tabContainerWidth >= tabWrapWidth) {
                    this.isShowTabScroll = true;
                }
            });
        },
        /**
         * 选中一级栏目
         * @param item 选中的栏目数据
         * @param selectSubindex 要选中的子栏目索引
         * @param  index 选中的栏目索引
         */
        selectColumn(item, selectSubindex = 0, index, e) {
            this.selectColumnId = item.ccId;
            this.selectColumnData = item;
            this.isSelectArea = item.ccAreaStatus === 'Y';
            // 选中的索引小于6为第一页
            this.isFirst = index < 6;
            if (item.subCmsColumns && item.subCmsColumns.length) {
                this.selectSubColumn(item.subCmsColumns[selectSubindex]);
                return;
            }
            this.selectColumnName = item.ccName;
            this.selectSubColumnName = '';
            this.$emit('update:columnName', item.ccName);
            this.$emit('select', this.selectColumnId, undefined, e);
        },
        /**
         * 选中二级栏目
         * @param item 选中的子栏目数据
         */
        selectSubColumn(item, e) {
            if (this.isSelectArea) {
                this.selectSubColumnId = item.areaCode;
                this.selectSubColumnName = item.areaName;
                this.$emit('select', this.selectColumnId, this.selectSubColumnId, e);
                this.$emit('update:columnName', item.areaName);
            }
            if (!this.isSelectArea && item.subCcId) {
                this.selectSubColumnId = item.subCcId;
                this.selectSubColumnName = item.subCcName;
                this.$emit('select', this.selectSubColumnId, undefined, e);
                this.$emit('update:columnName', item.subCcName);
            }
            if (!this.isSelectArea && !item.subCcId) {
                this.selectSubColumnId = '';
                this.selectColumnName = this.selectColumnData.ccName;
                this.selectSubColumnName = '';
                this.$emit('select', this.selectColumnId, undefined, e);
                this.$emit('update:columnName', this.selectColumnData.ccName);
            }
        },
        // 栏目翻页
        tabMove(direction) {
            if (direction === 'right') {
                this.isFirst = false;
            } else {
                this.isFirst = true;
            }
        },
    },
};
</script>
<style lang="less" scoped>
.tab-content {
    width: 1200px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    .left-mask-box {
        position: absolute;
        top: 0px;
        left: -20px;
        width: 80px;
        height: 58px;
        background-image: url('./asset/images/left-mask.png');
        background-position: center;
        background-size: 100% 100%;
        z-index: 9;
    }
    .right-mask-box {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 80px;
        height: 58px;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0), #ffffff 32%);
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .icon-box {
        width: 10px;
        height: 16px;
        background-position: center;
        background-size: 100% 100%;
        cursor: pointer;
    }
    .left-icon {
        margin-right: 20px;
        background-image: url('./asset/images/left-icon.png');
    }
    .left-icon:hover {
        background-image: url('./asset/images/left-icon-hover.png');
    }
    .left-icon-disable,
    .left-icon-disable:hover {
        background-image: url('./asset/images/left-icon-disable.png');
    }
    .right-icon {
        background-image: url('./asset/images/right-icon.png');
    }
    .right-icon:hover {
        background-image: url('./asset/images/right-icon-hover.png');
    }
    .right-icon-disable,
    .right-icon-disable:hover {
        background-image: url('./asset/images/right-icon-disable.png');
    }
    .search-bar {
        margin-bottom: 20px;
    }
}
.tab {
    width: auto;
    max-width: 1200px;
    white-space: nowrap;
    display: inline-block;
    transition: all 0.2s;
    flex: 1;
    .tab-item {
        max-width: 144px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        margin-right: 36px;
        height: 56px;
        border-bottom: 2px solid transparent;
        font-size: 18px;
        font-weight: 400;
        color: #3a3d4b;
        cursor: pointer;
        line-height: 56px;
        display: inline-block;
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
    .no-margin-tab-item {
        margin-right: 0px;
    }
}
.move-tab {
    transform: translateX(-530px);
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
    .sub-tab-item:hover {
        color: #ff2e30;
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
