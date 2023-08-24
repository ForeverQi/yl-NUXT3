<template>
    <div class="information-page">
        <!-- 头部轮播和选择 -->
        <div class="information-header w-1200">
            <p class="search-summary">
                共找到{{ page.pageCount }}条“
                <em class="keywords">{{ keywords }}</em>
                ”相关内容
            </p>
            <div :class="['search-container', isSearchActive ? 'active' : '']" @mouseover="isSearchActive = true" @mouseout="isSearchActive = true">
                <input type="text" class="txt" placeholder="请输入您要查找的内容" v-model.trim="keywords" @keyup.enter="handleSearch" />
                <button :class="['search', isSearchActive ? 'active' : '']" @click="handleSearch"></button>
            </div>
        </div>
        <div class="w-1200 information-wrapper" :style="isShowSubject ? {} : { paddingBottom: '15px' }">
            <div class="information-search">
                <select-project-section
                    @project-change="onProjectChange"
                    @college-change="onCollegeChange"
                    :college-id="defCollegeId"
                    :project-id="defProjectId"
                    :college-seo-code="defCollegeSeoCode"
                    :project-seo-code="defProjectSeoCode"
                    :ptag-id="defPtagId"
                />
                <zi-liao-subject
                    v-if="isShowSubject"
                    @item-change="onZiLiaoSubjectChange"
                    class="subject-wrapper"
                    :project="searchProject"
                    :subject-id="defSubjectId"
                    :subject-seo-code="defSubjectSeoCode"
                />
            </div>
        </div>

        <!-- 项目筛选项 -->
        <!-- <div class="information-type w-1200">
            <button :class="['information-type-item', informationType === '' ? 'active' : '']" @click="informationType = ''">全部</button>
            <button :class="['information-type-item', informationType === 'Y' ? 'active' : '']" @click="informationType = 'Y'">资料包</button>
            <button :class="['information-type-item', informationType === 'N' ? 'active' : '']" @click="informationType = 'N'">单条资料</button>
        </div> -->
        <!-- 资料列表 -->
        <div class="information-content w-1200">
            <!-- 列表 -->
            <main class="information-list" v-loading="isLoading">
                <template v-for="item in informationList">
                    <card :my-card="listType === 'my'" :file="item" :key="item.docId" />
                </template>
                <!-- 没有查询到数据 -->
                <template v-if="!informationList.length && isFinished">
                    <information-empty :list-type="emptyType" :tag="keywords" />
                </template>

                <div class="paging" v-if="page.pageCount > page.pageSize">
                    <pagination :total="page.pageCount" :page-size="page.pageSize" @current-change="pageChange" :current-page="page.pageIndex" />
                </div>
            </main>
            <!-- 推荐广告 -->
            <aside class="information-side">
                <div class="recommended-app" v-if="projectInfo.projectId" v-show="false">
                    <ad-section :ad-code="acCode.right" :project-id="projectInfo.projectId" />
                </div>
                <div class="hot-course-box">
                    <hot-courses-list search-all />
                </div>
            </aside>
        </div>
    </div>
</template>
<script src="./js/index.js"></script>
<style lang="less" scoped src="./css/index.less"></style>
<style lang="less" scoped>
em,
aside {
    border: 0;
    font-weight: normal;
}
aside {
    display: block;
}
</style>
