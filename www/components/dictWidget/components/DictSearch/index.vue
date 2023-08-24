<template>
    <div class="dict-search">
        <el-autocomplete
            class="inline-input"
            ref="searchSelect"
            v-model="searchText"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入关键字"
            @select="handleSelect"
            :class="isShake ? 'shake' : ''"
            @keyup.enter.native="handleSearch"
            popper-class="popper-dict-autocomplete"
            :value-key="'names'"
            :label="'names'"
            @input.native="filterData"
            :trigger-on-focus="false"
        >
            <template #default="slotProps">
                <div class="no-data" v-if="slotProps.item.value && slotProps.item.value === 1">没有匹配到哦~</div>

                <span v-else>{{ slotProps.item.names }}</span>
            </template>
        </el-autocomplete>
        <i @click="handleSearch" class="icon-dict-search" :class="iconSearchActive ? 'active' : ''"></i>
        <div class="dict-tips">
            <span v-show="searchText && isShowDictList && !isAccurate">
                已显示推荐的搜索结果，仍然搜索：
                <span class="search-btn" @click="joinDict">{{ lastSearchText }}</span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dict-search',
    props: {
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

        projectId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isShake: '', // 是否显示抖动效果
            searchText: '', // 输入框内容的值
            searchOption: [], // 下拉搜索选择列表
            iconSearchActive: false, // 搜索按钮是否被点击
            lastSearchText: '', // 记录最后一次搜索框的内容
        };
    },
    mounted() {
        // 首次进入搜索框直接focus
        this.$refs.searchSelect.focus();
    },
    methods: {
        // 格式化搜索框的内容，最长不超过50个字
        filterData() {
            if (this.searchText.length >= 50) {
                this.searchText = this.searchText.substr(0, 50);
            }
        },

        // 查询下拉选择列表
        querySearchAsync(queryString, cb) {
            if (!queryString) {
                return;
            }

            let params = {
                pageIndex: 0,
                pageSize: 10,
                searchContent: this.searchText,
                searchProjectId: this.projectId,
            };
            this.$callRawApi({
                api: 'cbn/noun/queryByEs/v2',
                params,
            })
                .catch((err) => {
                    cb();
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    let data = _reponse.getData();
                    if (data.nounList.length) {
                        this.searchOption = data.nounList;
                    } else {
                        this.searchOption = [{ value: 1 }];
                    }

                    cb(this.searchOption);
                });
        },

        // 点击选择下拉框内容
        handleSelect(item) {
            if (this.searchOption[0].value === 1) {
                return;
            }

            this.filterData();
            this.$emit('handle-select', {
                searchText: this.$refs.searchSelect.value,
                dictDetail: item,
            });
        },

        // 点击enter建或者点击放大镜图标按钮
        handleSearch() {
            if (!this.searchText) {
                this.isShake = true;
                setTimeout(() => {
                    this.isShake = false;
                }, 800);
                return;
            }

            // 格式输入内容，只保留50个字
            this.filterData();

            if (this.searchText === this.lastSearchText) {
                if (!this.isShowDictList) {
                    this.$emit('handle-search', this.searchText, true);
                }
                return;
            }

            this.lastSearchText = this.searchText;
            this.$emit('handle-search', this.searchText);
        },

        // 添加入库操作
        joinDict() {
            this.$emit('join-dict', this.lastSearchText);
        },
    },
};
</script>

<style lang="less" scoped>
.dict-search {
    padding: 0 12px;
    width: 100%;
}
.no-data {
    margin-left: -30px;
    position: relative;
    background: #ffffff;
    border-radius: 7px;
    font-size: 14px;
    font-weight: 400;
    color: #8d90aa;
    width: 111%;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.el-select {
    width: 100%;
}
.el-autocomplete {
    width: 100%;
}
.el-input,
/deep/ .el-input__inner {
    width: 100%;
    height: 60px;
    border-radius: 8px;
    padding-right: 35px;
    box-sizing: border-box;
}
.dict-tips {
    padding: 12px 0 12px 8px;
    font-size: 14px;
    color: #8d90aa;
    box-sizing: border-box;
    word-break: break-all;
    line-height: 1.5em;
    .search-btn {
        color: #f8323c;
        cursor: pointer;
    }
}
.shake {
    animation: shake 800ms ease-in-out;
}
@keyframes shake {
    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
        transform: translate3d(+2px, 0, 0);
    }
    30%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
        transform: translate3d(+4px, 0, 0);
    }
    50% {
        transform: translate3d(-4px, 0, 0);
    }
}
.dict-search {
    position: relative;
    .icon-dict-search {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('./asset/images/icon-search.png') no-repeat center center;
        top: 20px;
        right: 20px;
        position: absolute;
        background-size: 20px 20px;
        &.active,
        &:active {
            background: url('./asset/images/icon-search-active.png') no-repeat center center;
            background-size: 20px 20px;
        }
    }
}
</style>
<style lang="less">
.popper-dict-autocomplete {
    z-index: 10000 !important;
}
</style>
