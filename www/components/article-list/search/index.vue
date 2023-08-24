<template>
    <div :class="['search-container', isSearchActive ? 'active' : '']" @mouseover="isSearchActive = true" @mouseout="isSearchActive = false">
        <input type="text" class="txt" placeholder="请输入您要查找的内容" v-model.trim="keywords" @keyup.enter="handleEnterClick" />
        <button :class="['search', isSearchActive ? ' active' : '']" v-if="searchType === 'trigger'" @click="$emit('search', keywords)"></button>
        <template v-else>
            <a
                :class="['search', isSearchActive ? 'active' : '']"
                :href="`/search-article-list/${project ? project.projectSeoCode || project.projectCode || '' : ''}/${
                    $route.params.channelCode
                }?keywords=${keywords}`"
                target="_blank"
                ref="searchRef"
                v-if="keywords"
            ></a>
            <a :class="['search', isSearchActive ? ' active' : '']" href="javascript:void(0)" v-else></a>
        </template>
    </div>
</template>
<script>
export default {
    props: {
        project: {
            type: Object,
            default: () => ({}),
        },
        searchType: {
            type: String,
            default: 'jump',
        },
        val: {
            type: String,
            default: '',
        },
        columnName: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            keywords: '',
            isSearchActive: false,
        };
    },
    watch: {
        val() {
            this.keywords = this.val;
        },
    },
    methods: {
        handleEnterClick() {
            if (!this.keywords) {
                return;
            }
            if (this.searchType === 'trigger') {
                this.$emit('search', this.keywords);
            } else {
                this.$refs.searchRef.click();
            }
        },
    },
};
</script>
<style lang="less" scoped>
.search-container {
    background-color: #f6f7f9;
    border: 1px solid rgba(141, 144, 170, 0.1);
    box-sizing: border-box;
    border-radius: 21px;
    width: 300px;
    padding-left: 24px;
    display: flex;
    overflow: hidden;
    align-items: center;
    height: 40px;
    &.active {
        background: #ffffff;
        border: 1px solid rgba(255, 46, 48, 0.4);
    }
    .txt {
        background-color: transparent;
        height: 40px;
        outline: none;
        flex: 1;
        font-size: 16px;
        color: #3a3d4b;
        border: none;
    }
    .txt::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #bcc2cd;
        font-size: 14px;
    }

    .txt::-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #bcc2cd;
        font-size: 14px;
    }

    .txt::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #bcc2cd;
        font-size: 14px;
    }

    .txt::-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #bcc2cd;
        font-size: 14px;
    }

    .search {
        outline: none;
        border: none;
        height: 40px;
        width: 56px;
        background: url('./asset/images/search-normal.png') center/16px 16px no-repeat, transparent;
        &.active {
            background: url('./asset/images/search-focus.png') center/16px 16px no-repeat, linear-gradient(84deg, #ff8389 5%, #ff5760 93%);
        }
    }
}
</style>
