<template>
    <div class="article-list-wrap">
        <div class="book-mark-box">
            <BookMark :column-name="keywords" :project-channel-name="projectChannelName" style="background-color: transparent"></BookMark>
        </div>
        <div class="search-wrapper">
            <p class="search-summary">
                共找到{{ page.pageCount }}条“
                <em class="keywords">{{ keywords }}</em>
                ”相关内容
            </p>
            <search-bar class="search-bar" :search-type="'trigger'" @search="handleSearch" :val="keywords"></search-bar>
        </div>
        <div class="article-list-content">
            <main class="left-article-list" v-loading="isLoading">
                <div class="empty-box" v-if="!isLoading && !articleList.length">
                    <Empty :list-type="emptyType" :tag="keywords"></Empty>
                </div>
                <div class="article-box" v-else>
                    <ArticleList :article-list="articleList" :to-router-path="'/article-info'"></ArticleList>
                </div>
                <!-- 分页器 -->
                <div class="pagination-box" v-if="!isLoading && articleList.length">
                    <user-pagination :page-size="page.pageSize" :total="page.pageCount" :current-page.sync="page.pageIndex" @current-change="changePageIndex" />
                </div>
            </main>
            <aside class="right-ad">
                <div class="img-section-box" v-show="false">
                    <AdSection :project-id="projectInfo.projectId" :ad-code="`YLWEB_ADD07`"></AdSection>
                </div>
                <div class="course-section-box">
                    <HotCoursesList :search-all="true" :project-id="projectInfo.projectId"></HotCoursesList>
                </div>
            </aside>
        </div>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import track from './js/track.js';
import BookMark from '@/www/components/article-list/bookmark';
import TabBar from '@/www/components/article-list/tab-bar';
import AdSection from '@/www/components/components/ad-section';
import Empty from '@/www/components/ziliao/empty'; //资料为空
import HotCoursesList from '@/www/components/components/hot-courses-list';
import UserPagination from '@/www/components/components/pagination';
import SearchBar from '@/www/components/article-list/search';
import ArticleList from '@/www/components/article-list/article-list';

import '@/api/cp/api..query-article-lisy-by-column-id.js';
import '@/api/cp/api.CP3005.search-article.js';
import '@/api/channel/api..query-info-by-seoCode.js';

export default {
    components: {
        AdSection,
        UserPagination,
        HotCoursesList,
        TabBar,
        Empty,
        SearchBar,
        ArticleList,
        BookMark,
    },
    filters: {
        formatDate(val) {
            return val ? dayjs(val).format('YYYY-MM-DD HH:mm') : '';
        },
        formatIntro(val) {
            return val.trim();
        },
    },
    mixins: [track],
    layout: 'channelLayout',
    data() {
        return {
            isLoading: true, // 是否加载中
            isError: false, // 是否异常
            page: {
                pageSize: 20,
                pageIndex: 1,
                pageCount: 0,
            }, // 分页
            articleList: [], // 文章列表
            projectInfo: {
                projectId: '',
                projectSeoCode: '',
            },
            keywords: '',
            projectChannelName: '',
            columnName: '',
            emptyType: 'search',
        };
    },
    head() {
        return this.$head({
            title: `${this.keywords || ''}_${this.projectChannelName || ''}_考试辅导|报考资讯_优路教育`,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    // eslint-disable-next-line
                    content: `${this.projectInfo.projectName || ''},${
                        this.projectChannelName || ''
                    },考试培训,考试辅导,报考条件,报考时间,报考资讯,备考资料,真题解析,优路,优路教育,优路教育网,在线教育,在线培训,职业教育,素质提升,技能提升`,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育，职业教育一站式学习平台，提供专业职业考试培训和职业技能提升培训服务，用知识服务助力个人职业发展。',
                },
            ],
        });
    },
    mounted() {
        const { projectCode, channelCode } = this.$route.params;
        const { keywords } = this.$route.query;
        this.projectInfo.projectSeoCode = projectCode;
        this.keywords = keywords;
        this.channelCode = channelCode;

        this.queryProjectInfo().then(this.queryArticleList);
        this.queryProjectChannelInfo();
    },
    methods: {
        queryProjectInfo() {
            if (!this.projectInfo.projectSeoCode) {
                console.warn(this.projectInfo);
                return Promise.resolve();
            }
            return this.$callApi('ctc/query-project-detail', {
                projectSeoCode: this.projectInfo.projectSeoCode,
            })
                .then(({ getData }) => {
                    Object.assign(this.projectInfo, getData());
                })
                .catch(() => {});
        },
        queryArticleList() {
            this.isLoading = true;
            this.emptyType = 'searchLoading';
            return this.$callApi('cp/search-article', {
                title: this.keywords,
                ccProjectId: this.projectInfo.projectId,
                pageIndex: this.page.pageIndex - 1,
                pageSize: this.page.pageSize,
            })
                .then(({ getData }) => getData())
                .then(({ data = [], count = 0 }) => {
                    data.forEach((item) => {
                        item.caTitle = item.caTitle.replaceAll('<em>', `<em style='color: #FF2E30;font-style: normal;'>`);
                        item.isTop = item.caTop;
                        item.isHot = item.caHot;
                        item.artProvinceName = item.areaIds.join();
                    });
                    this.articleList = data;
                    this.page.pageCount = count;

                    // 易观埋点
                    this.trackWebYouluClickTheNewsToSearch({
                        keyword_name: this.keywords,
                        search_result: this.page.pageCount,
                        project_id: this.projectInfo.projectId,
                    });
                })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    this.isError = true;
                })
                .finally(() => {
                    this.isLoading = false;
                    this.emptyType = 'search';
                });
        },
        queryProjectChannelInfo() {
            this.$callApi('channel/query-info-by-seoCode', {
                columnSeoNo: this.channelCode,
            })
                .then((res) => res.getData())
                .then((res) => {
                    console.warn(res);
                    this.projectChannelName = res.columnTitle || res.columnName;
                })
                .catch((err) => {
                    console.warn(err);
                    this.$niceloo.api.handleFailure(err);
                });
        },
        changePageIndex() {
            this.queryArticleList();
            window.scrollTo(0, 0);
        },
        handleSearch(v) {
            this.keywords = v;
            this.page.pageIndex = 1;
            this.page.pageCount = 0;
            this.queryArticleList();

            window.history.replaceState(null, null, `${location.pathname}?keywords=${this.keywords}`);
        },
    },
};
</script>
<style lang="less" scoped>
em,
aside {
    border: 0;
    font-weight: normal;
}
aside {
    display: block;
}
.article-list-wrap {
    padding-bottom: 116px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f9fafb;
}
.search-wrapper {
    width: 1200px;
    margin: 0 auto;
    padding: 10px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .search-summary {
        font-size: 16px;
        color: #3a3d4b;
        .keywords {
            color: #ff2e30;
            font-style: normal;
        }
    }
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
