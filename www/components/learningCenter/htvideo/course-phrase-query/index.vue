<template>
    <div class="main" ref="main">
        <!-- title -->
        <course-side-title title="词点快查"></course-side-title>
        <!-- 搜索框 -->
        <phrase-query-header
            ref="dictSearch"
            @handle-select="handleSelect"
            @handle-search="handleSearch"
            @join-dict="joinDict"
            :is-accurate="isAccurate"
            :is-show-dict-list="isShowDictList"
            :project-id="projectId"
            @go-back="goBack"
        />
        <!-- 内容区 -->
        <div class="dict-box-content" ref="dictBoxContent" v-loading="isLoading">
            <!-- 搜索查询状态 -->
            <phrase-query-status
                :status="status"
                :is-searched="isSearched"
                :list="keywordList"
                :search-text="searchText"
                ref="queryStatus"
                @tap-active="tapActive"
                v-if="isShowStatus"
                @scroll-event="scrollEvent"
            />
            <!-- 关键字查询详情 -->
            <phrase-query-content v-if="!isShowDictList && dictDetailList.length > 0" :list="dictDetailList" />
        </div>

        <!-- 添加入库 轻提示 -->
        <div v-if="isShowToast" class="toast">啊哦，没搜到，老师后续会添加该名词的~</div>
    </div>
</template>

<script src="./index.js"></script>

<style lang="less" scoped>
@import url('./index.less');
</style>
