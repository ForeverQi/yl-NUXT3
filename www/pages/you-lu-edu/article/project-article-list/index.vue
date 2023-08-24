<template>
    <div class="article-list-wrap">
        <div class="book-mark-box">
            <BookMark :column-name="columnName" :is-back-home="true"></BookMark>
        </div>
        <div class="tab-wrap" v-if="columnList.length">
            <TabBar
                :tab-list="columnList"
                :column-name.sync="columnName"
                :column-id.sync="columnId"
                :art-province-id="artProvinceId"
                @select="handleSelect"
                :project="projectInfo"
            ></TabBar>
        </div>
        <div class="article-list-content">
            <div class="left-article-list" v-loading="isLoading">
                <div class="empty-box" v-if="!isLoading && !articleList.length">
                    <Empty :status="isError ? 'error' : 'empty'"></Empty>
                </div>
                <div class="article-box" v-else>
                    <ArticleList :article-list="articleList" :to-router-path="'/article-detail'"></ArticleList>
                </div>
                <!-- 分页器 -->
                <div class="pagination-box">
                    <user-pagination :page-size="page.pageSize" :total="page.pageCount" :current-page.sync="page.pageIndex" @current-change="changePageIndex" />
                </div>
            </div>
            <div class="right-ad">
                <div class="img-section-box" v-show="false">
                    <AdSection :project-id="projectInfo.projectId" :ad-code="'YLWEB_ADD02'"></AdSection>
                </div>
                <div class="course-section-box">
                    <HotCoursesList :search-all="true" :project-id="projectInfo.projectId"></HotCoursesList>
                </div>
                <ReferenceInformation></ReferenceInformation>
            </div>
        </div>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import { mapActions } from 'vuex';
import BookMark from '@/www/components/article-list/bookmark';
import TabBar from '@/www/components/article-list/tab-bar';
import AdSection from '@/www/components/components/ad-section';
import Empty from '@/www/components/components/empty';
import ArticleList from '@/www/components/article-list/article-list';
import ReferenceInformation from '@/www/components/components/reference-information';
import HotCoursesList from '@/www/components/components/hot-courses-list';
import UserPagination from '@/www/components/components/pagination';

import '@/api/cp/api..query-column-by-project-id.js';
import '@/api/cp/api..query-article-lisy-by-column-id.js';
import '@/api/ctc/api..query-project-detail.js';
export default {
    components: {
        BookMark,
        AdSection,
        ReferenceInformation,
        UserPagination,
        HotCoursesList,
        ArticleList,
        TabBar,
        Empty,
    },
    filters: {
        formatDate(val) {
            return val ? dayjs(val).format('YYYY-MM-DD HH:mm') : '';
        },
        formatIntro(val) {
            return val.trim();
        },
    },
    layout: 'new-default',
    data() {
        return {
            columnList: [], // 栏目列表
            columnId: '', // 栏目id
            isLoading: true, // 是否加载中
            projectSeoCode: '', // 项目code
            channelCode: '', // 频道页code
            isError: false, // 是否异常
            provinceList: [], //  第域
            page: {
                pageSize: 20,
                pageIndex: 1,
                pageCount: 0,
            }, // 分页
            tabList: [], // tab列表
            articleList: [], // 文章列表
            projectInfo: {}, // 项目信息
            columnName: '', // 栏目名称
            projectChannelName: '', // 项目名称
            artProvinceId: '', // 地域信息id
        };
    },
    head() {
        return this.$head({
            title: `${this.columnName || ''}_职业培训|技能提升_优路教育`,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: `职业培训,技能提升,优路,优路教育,优路教育网,建筑工程考试,国家职业资格考试,在线教育,在线培训`,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育，职业教育一站式学习平台，提供专业职业考试培训和职业技能提升培训服务，用知识服务助力个人职业发展。',
                },
            ],
        });
    },
    async created() {
        const { projectCode, columnId, channelCode, artProvinceId } = this.$route.params;
        this.channelCode = channelCode;
        this.projectSeoCode = projectCode;
        this.artProvinceId = artProvinceId;
        this.columnId = columnId;
        await this.getCity().then((res) => {
            this.provinceList = res;
            this.queryProjectInfo();
        });
    },
    methods: {
        ...mapActions('common/city', {
            getCity: 'getCity',
        }),
        // 查询项目信息
        queryProjectInfo() {
            niceloo.api.call('ctc/query-project-detail', {
                // 项目seo编码
                projectSeoCode: this.projectSeoCode,
                onsuccess: (data) => {
                    this.projectInfo = data;
                    this.queryTabListByProjectId();
                },
                onerror: () => {
                    this.isLoading = false;
                    this.isError = true;
                },
                oncomplete: () => {},
            });
        },
        // 查询tab选项
        queryTabListByProjectId() {
            this.$callApi('cp/query-column-by-project-id', {
                ccProjectId: this.projectInfo.projectId,
                onsuccess: (data) => {
                    let columnData = data.splice(0, 8);
                    columnData.forEach((element) => {
                        // 如果是地址需要添加全部
                        if (element.ccAreaStatus === 'Y') {
                            element.subCmsColumns = [
                                {
                                    areaName: '全部',
                                    areaCode: '',
                                },
                                {
                                    areaName: '全国',
                                    areaCode: 'quanguo',
                                },
                                ...this.provinceList,
                            ];
                        } else if (element.subCmsColumns.length) {
                            element.subCmsColumns.unshift({ subCcName: '全部', subCcId: '' });
                        }
                    });
                    this.columnList = columnData;
                },
                onerror: () => {
                    this.isError = true;
                },
                oncomplete: () => {
                    this.isLoading = false;
                },
            });
        },
        /**
         * 子组件选中tab
         * @params columnId 栏目id
         * @params artProvinceId 地址
         */
        handleSelect(columnId, artProvinceId) {
            this.page = {
                pageSize: 20,
                pageIndex: 1,
                pageCount: 0,
            };
            const { projectCode } = this.$route.params;
            this.columnId = columnId;
            this.artProvinceId = artProvinceId;
            if (this.artProvinceId) {
                window.history.replaceState(null, null, `/project-article-list/${projectCode}/${columnId}/${artProvinceId}`);
            } else {
                window.history.replaceState(null, null, `/project-article-list/${projectCode}/${columnId}`);
            }
            this.queryArticleList();
        },
        // 查询文章列表
        queryArticleList() {
            this.isLoading = true;
            niceloo.api.call('cp/query-article-lisy-by-column-id', {
                // 栏目id
                ccId: this.columnId,
                // 每页展示多少条数据
                pageSize: this.page.pageSize,
                // 分页索引下标
                pageIndex: this.page.pageIndex - 1,
                // 按地区筛选时省份标识
                artProvinceId: this.artProvinceId,
                onsuccess: (data) => {
                    if (data) {
                        this.articleList = data.list;
                        this.page.pageCount = Number(data.count);
                    }
                },
                onerror: () => {
                    this.isError = true;
                },
                oncomplete: () => {
                    this.isLoading = false;
                },
            });
        },
        // 切换分页
        changePageIndex() {
            this.queryArticleList();
            window.scrollTo(0, 0);
        },
    },
};
</script>
<style lang="less" scoped>
.article-list-wrap {
    padding-bottom: 116px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f9fafb;
}
.book-mark-box {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    background-color: #fff;
}
.tab-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #fff;
}
.article-list-content {
    margin-top: 24px;
    width: 1200px;
    display: flex;
    justify-content: space-between;
    .left-article-list {
        display: flex;
        flex-direction: column;
        min-height: 500px;
        border-radius: 8px;
        overflow: hidden;
    }
}

.article-box {
    box-sizing: border-box;
    width: 852px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    .article-item {
        box-sizing: border-box;
        padding: 30px 40px 0px;
        .article-content {
            padding-bottom: 20px;
            border-bottom: 1px solid #ecedf1;
        }
    }
    .no-bottom-border {
        border-bottom: 1px solid transparent;
    }
    .article-title {
        width: 100%;
        font-size: 17px;
        font-weight: 700;
        text-align: left;
        color: #333333;
        line-height: 22px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .article-desc {
        margin-top: 8px;
        max-height: 44px;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: #77798d;
        line-height: 22px;
        letter-spacing: 0.4px;
        word-break: break-all;
        white-space: wrap;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .article-time {
        margin: 20px 0 0px;
        font-size: 12px;
        font-weight: 400;
        text-align: left;
        color: #99a1af;
        line-height: 12px;
    }
}
.article-item:hover {
    background: #f5f6fa;
    .article-title {
        color: #ff2e30;
    }
}

.empty-box {
    width: 852px;
    height: 500px;
    border-radius: 8px;
    background-color: #fff;
}

.right-ad {
    width: 324px;
    .img-section-box {
        width: 324px;
        height: 180px;
        margin-bottom: 16px;
        border-radius: 8px;
        overflow: hidden;
    }
    .course-section-box {
        width: 324px;
        height: 593px;
        margin-bottom: 16px;
        border-radius: 8px;
    }
    .wx-account-img {
        width: 324px;
        height: auto;
    }
}
.pagination-box {
    margin-top: 48px;
}
</style>
