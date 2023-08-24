<template>
    <div class="phrase-query-status" @scroll="scrollEvent($event)" ref="main">
        <!-- 初始化时 未被搜索 -->
        <div class="default-search" v-if="!isSearched && status === 'init'">
            <img src="./images/init.png" alt="初始化" />
            <p>专业名词 一网打尽</p>
        </div>
        <!-- 查询无结果 -->
        <div class="default-search" v-if="isSearched && status === 'no-data'">
            <img src="./images/no-data.png" alt="暂无数据" />
            <p>没有找到“ {{ searchText }} ”名词</p>
            <p>可以换个关键词重试~</p>
        </div>
        <!-- 查询列表 -->
        <div class="list" v-if="isSearched && status === 'show-list'">
            <div class="item" v-for="(item, index) in list" :key="index" :class="{ active: activeIndex === index }" @click="tapActive(item, index)">
                <div class="title">
                    <span class="title-content" v-html="item.names"></span>
                    <span class="subject-name">{{ item.subjectName.substring(0, 4) }}</span>
                </div>
                <div v-if="item.context" class="content" v-html="item.context"></div>
                <div v-else class="content">点击查看详情</div>
            </div>
            <!--我是有底线的-->
            <div class="bottom-line">
                <div class="content">我是有底线的</div>
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style scoped lang="less">
@import url('./index.less');
</style>
