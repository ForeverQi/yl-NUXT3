<template>
    <div class="phrase-query-header">
        <div class="flex-between">
            <i class="el-icon-arrow-left" v-if="isShowBack" @click="back"></i>
            <el-autocomplete
                class="inline-input"
                v-model="searchText"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect"
                @keyup.enter.native="handleSearch"
                @input.native="limitWords"
                :class="{ shake: isShake, dynamic: isShowBack }"
                ref="searchComponent"
                popper-class="popper-dict-autocomplete"
                :value-key="'names'"
                :label="'names'"
                :autofocus="true"
                :popper-append-to-body="false"
                :loading="loading"
                prefix-icon="el-icon-search"
            >
                <template #default="slotProps">
                    <div class="no-data" v-if="slotProps.item.value && slotProps.item.value === 1">没有匹配到哦~</div>
                    <span v-else>{{ slotProps.item.names }}</span>
                </template>
            </el-autocomplete>
            <el-button type="danger" round size="medium" @click="handleSearch">搜索</el-button>
        </div>
        <div class="dict-tips">
            <span v-show="searchText && isShowDictList && !isAccurate">
                已显示推荐的搜索结果，仍然搜索：
                <span class="search-btn" @click="joinDict">{{ lastSearchText }}</span>
            </span>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style lang="less" scoped>
@import url('./index.less');
</style>
