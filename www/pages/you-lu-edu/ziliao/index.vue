<template>
    <div class="information-list-page">
        <!-- 头部轮播和选择 -->
        <div class="information-list-header">
            <div class="w-1200">
                <div class="information-list-header-carousel">
                    <banner-carousel-section :lyt-code="acCode.banner" @item-click="handleAdClick" class="information-list-carousel" />
                </div>
                <div class="information-list-header-type">
                    <div class="title-container">
                        <p class="title">全部资料</p>
                        <div
                            :class="['search-container', isSearchActive ? 'active' : '']"
                            @mouseover="isSearchActive = true"
                            @mouseout="isSearchActive = false"
                        >
                            <input type="text" class="txt" placeholder="请输入您要查找的内容" v-model.trim="keywords" @keyup.enter="handleEnterClick" />
                            <a
                                :class="['search', isSearchActive ? 'active' : '']"
                                :href="`/ziliao/search/${search.projectSeoCode}?keywords=${keywords}&collegeId=${search.collegeId}&projectId=${search.projectId}&ptagId=${search.ptagId}&subjectId=${search.subjectId}`"
                                target="_blank"
                                ref="searchRef"
                                v-if="keywords"
                                @click="handleSearchClick"
                            ></a>
                            <a :class="['search', isSearchActive ? 'active' : '']" href="javascript:void(0)" v-else></a>
                        </div>
                    </div>
                    <select-project-section
                        class="sps-wrapper-comp"
                        :college-seo-code="params.collegeSeoCode"
                        :project-seo-code="params.projectSeoCode"
                        :ptag-id="params.ptagId"
                        @project-change="onProjectChange"
                        @college-change="onCollegeChange"
                    />
                    <choose-type v-model="search.docPackstatus" @change-pack-status="onPackStatusChange" class="choose-type-comp" />
                </div>
            </div>
        </div>
        <!-- 项目筛选项 -->
        <div class="project-search-box" v-show="isShowSearchBar">
            <div class="project-search" :class="{ end: !catalogList.length }">
                <div class="information-type" v-if="catalogList.length">
                    <p class="information-type-item" :class="{ active: search.catalogCode === '' || isCatalogCheck === false }" @click="onChangeCatalog">
                        <span>全部</span>
                    </p>
                    <p
                        class="information-type-list-item"
                        :class="{ active: search.catalogCode === catalog.catalogCode }"
                        v-for="catalog in catalogList"
                        :key="catalog.catalogId"
                        @click="onChangeCatalog(catalog, $event)"
                    >
                        <span>{{ catalog.catalogName }}</span>
                    </p>
                </div>
                <div class="my-information">
                    <p class="information-my" v-if="isLogin && listType === 'all'" @click="onChangeListType('my')">
                        我的资料
                        <img class="arrow-right" src="./asset/images/arrow-right.png" />
                    </p>
                    <p class="information-my" v-if="isLogin && listType === 'my' && isCheckedMy" @click="onChangeListType('all', $event)">
                        <img class="arrow-left" src="./asset/images/arrow-left.png" />
                        返回资料列表
                    </p>
                    <div class="information-subject" v-show="search.projectId" @mouseenter="enterSubject" @mousemove="enterSubject" @mouseout="leaveSubject">
                        <p class="subject-name">{{ search.subjectName || '' }}</p>
                        <select-subject-section
                            ref="subjectRef"
                            class="subject-section"
                            :subject-seocode="params.subjectSeoCode || ''"
                            :project="projectInfo"
                            @subject-change="onChangeSubject"
                            @mouseenter.native="enterSection"
                            @mousemove.native="enterSection"
                            @mouseleave.native="leaveSection"
                        />
                    </div>
                </div>
            </div>
        </div>
        <!-- 资料列表 -->
        <div class="information-list-content w-1200">
            <!-- 列表 -->
            <div class="information-list" v-loading="isLoading">
                <card
                    :my-card="listType === 'my'"
                    :file="item"
                    :key="item.id"
                    :catalog-id="search.catalogId"
                    @update-login="updateLogin"
                    v-for="item in informationList"
                    class="information-card-item"
                />
                <!-- 没有查询到数据 -->
                <template v-if="!informationList.length && isFinished">
                    <information-empty :list-type="emptyType || listType" class="information-content-empty" />
                </template>

                <div class="paging" v-if="page.pageCount > page.pageSize">
                    <pagination :total="page.pageCount" :page-size="page.pageSize" @current-change="pageChange" :current-page="page.pageIndex" />
                </div>
            </div>
            <!-- 推荐广告 -->
            <div class="information-list-side">
                <div class="recommended-app" v-if="search.projectId" v-show="false">
                    <ad-section :ad-code="acCode.right" :project-id="search.projectId" @item-click="handleAdItemClick" />
                </div>
                <div class="hot-course-box" v-if="isInitFinished">
                    <hot-courses-list search-all :project-id="search.projectId || ''" />
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./js/index.js"></script>
<style lang="less" scoped src="./css/index.less"></style>
