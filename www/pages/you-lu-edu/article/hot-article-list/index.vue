<template>
    <div class="article-list-wrap">
        <div class="book-mark-box">
            <BookMark :column-name="columnName"></BookMark>
        </div>
        <div class="tab-wrap">
            <TabBar :tab-list="columnList" :column-name.sync="columnName" :column-id.sync="columnId" @select="handleSelect" :show-search="false"></TabBar>
        </div>
        <div class="article-list-content">
            <div class="left-article-list" v-loading="isLoading">
                <!-- 空的占位 -->
                <div class="empty-box" v-if="!isLoading && !articleList.length">
                    <Empty :status="isError ? 'error' : 'empt'"></Empty>
                </div>
                <!-- 资讯列表 -->
                <div class="article-box" v-else>
                    <ArticleList :article-list="articleList" :to-router-path="'/article-detail'" :column-name="columnName"></ArticleList>
                </div>
                <!-- 分页器 -->
                <div class="pagination-box">
                    <user-pagination :page-size="page.pageSize" :total="page.pageCount" :current-page.sync="page.pageIndex" @current-change="changePageIndex" />
                </div>
            </div>
            <div class="right-ad">
                <div class="img-section-box" v-show="false">
                    <AdSection :ad-code="'YLWEB_ADD06'" @item-click="handleAdClick"></AdSection>
                </div>
                <div class="course-section-box">
                    <HotCoursesList :search-all="true"></HotCoursesList>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BookMark from './components/bookmark/index.vue';
import TabBar from './components/tab-bar/index.vue';
import Empty from '@/www/components/components/empty/index.vue';
import AdSection from '@/www/components/components/ad-section/index.vue';
import ArticleList from '@/www/components/article-list/article-list/index.vue';
import ReferenceInformation from '@/www/components/components/reference-information/index.vue';
import HotCoursesList from '@/www/components/components/hot-courses-list/index.vue';
import UserPagination from '@/www/components/components/pagination/index.vue';
import '@/api/cp/api..query-article-lisy-by-column-id.js';
import '@/api/cp/api.CMP2015.query-column-list.js';
import '@/api/ctc/api..query-project-detail.js';
import track from '@/www/components/course/trial-course/js/track.js';
import pagePathName from '@/www/components/course/trial-course/js/pagePathName.js';

export default {
    components: {
        BookMark,
        AdSection,
        ReferenceInformation,
        HotCoursesList,
        ArticleList,
        TabBar,
        Empty,
        UserPagination,
    },
    mixins: [track, pagePathName],
    layout: 'new-default',
    data() {
        return {
            columnList: [],
            columnId: '',
            columnName: '',
            isLoading: false,
            columnCode: '',
            isError: false,
            page: {
                pageSize: 20,
                pageIndex: 1,
                pageCount: 0,
            },
            articleList: [],
            projectInfo: {},
            clueInfo: {
                url: typeof location === 'undefined' ? '' : location.href,
                pageName: `优路教育`,
                projectCode: '',
                originCode: 'ylgwzixunxinwen',
                clueWaycode: 'zhuce',
            },
        };
    },
    fetch() {
        const { columnCode, columnId } = this.$route.params;
        this.columnCode = columnCode;
        this.columnId = columnId;
        this.page.pageIndex = parseInt(this.$route.params.page || this.$route.query.page || 1);

        return this.queryTabList().then(() => {
            if (this.$platform.isClient() === false) {
                return this.queryArticleList();
            }
        });
    },
    head() {
        this.clueInfo.pageName = `${this.columnName || ''}_优路教育`;
        this.clueInfo.url = typeof location === 'undefined' ? '' : location.href;
        this.$Promotion.setCLueInfo(this.clueInfo);
        return this.$head({
            title: `${this.columnName || ''}_优路教育`,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: `职业培训,技能提升,优路,优路教育,优路教育网,建筑工程考试,国家职业资格考试,在线教育,在线培训`,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育，职业教育一站式学习平台，提供专业职业考试培训和职业技能提升培训服务，用知识服务助力个人职业发',
                },
            ],
        });
    },
    mounted() {
        const projectInfo = this.$storage.get('indexSelectProject');
        if (!projectInfo) {
            this.clueInfo.projectCode = projectInfo.projectCode;
        }
        this.clueInfo.url = typeof location === 'undefined' ? '' : location.href;
        this.clueInfo.pageName = `${this.columnName || ''}_优路教育`;
        this.$Promotion.setCLueInfo(this.clueInfo);
        // 添加滚动条事件 用来确定是否需要定位
        window.addEventListener('scroll', this.windowScroll);
    },
    methods: {
        // 查询项目信息
        queryProjectInfo() {
            niceloo.api.call('ctc/query-project-detail', {
                projectId: this.$nuxt.context.env.config.new_web_project_id,
                onsuccess: (data) => {
                    this.projectInfo = data;
                },
                onerror: () => {},
            });
        },
        // 查询栏目列表
        queryTabList() {
            this.isLoading = true;
            return new Promise((resolve) => {
                this.$callApi('cp/query-column-list', {
                    // 栏目类型编码
                    columnCode: this.columnCode,
                    projectId: this.$nuxt.context.env.config.new_web_project_id,
                    onsuccess: (data) => {
                        this.columnList = data;
                        this.isLoading = false;
                        if (this.$platform.isClient() === false) {
                            const item = this.columnList.find(({ columnId }) => {
                                return columnId === this.columnId;
                            });
                            if (item) {
                                this.columnName = item.columnName;
                            }
                        }
                        setTimeout(() => {
                            this.$yiguan.track('youlu_click_all_pages', {
                                page_name: document.title, // 页面名称
                                page_url: location.href,
                                page_type: '资源列表页',
                                course_type: '资讯',
                                sort_name: '-',
                                channel_name: this.columnName,
                                project_id: this.$nuxt.context.env.config.new_web_project_id,
                                subject_id: '-',
                            });
                        }, 200);

                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {
                        this.isLoading = false;
                    },
                });
            });
        },
        // 选择栏目
        handleSelect(columnId, e) {
            if (process.server) {
                return;
            }
            if (e && e.isTrusted) {
                this.page = {
                    pageSize: 20,
                    pageIndex: 1,
                    pageCount: 0,
                };
            }
            this.columnId = columnId;
            window.history.replaceState(null, null, `/hot-article-list/GWSYZX/${columnId}`);
            this.queryArticleList();
        },
        // 查询章节列表
        queryArticleList() {
            this.updateUrlPageNumber();
            this.isLoading = true;
            return new Promise((resolve, reject) => {
                niceloo.api.call('cp/query-article-lisy-by-column-id', {
                    // 栏目id
                    ccId: this.columnId,
                    // 每页展示多少条数据
                    pageSize: this.page.pageSize,
                    // 分页索引下标
                    pageIndex: this.page.pageIndex - 1,
                    onsuccess: (data) => {
                        if (data) {
                            this.articleList = data.list;
                            this.page.pageCount = Number(data.count);
                        }
                        resolve();
                    },
                    onerror: () => {
                        this.isError = true;
                        reject();
                    },
                    oncomplete: () => {
                        this.isLoading = false;
                    },
                });
            }).then(this.ssrInValidPage);
        },
        // 切换分页
        changePageIndex() {
            this.queryArticleList();
            window.scrollTo(0, 0);
        },
        handleAdClick(item) {
            // this.trackWebYouluAdSpace({
            //     ad_type: '单张广告',
            //     ad_position: '资讯右侧广告banner',
            //     page_position: '资讯列表页',
            //     ad_name: item.adName,
            //     ad_url: item.adLink,
            //     page_name: document.title,
            //     project_position: this.projectInfo?.projectId ?? '',
            // });
            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: item.adName,
                jump_type: item.adLinkType === 1 ? 'URL链接' : item.adLinkType === 2 ? '小程序' : '无跳转',
                ad_url: item.adLinkType === 1 || item.adLinkType === 2 ? item.adLink : '',
                ad_position_name: '企业新闻列表页_右侧',
                page_name: document.title,
            });
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
        }
        border-bottom: 1px solid #ecedf1;
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
