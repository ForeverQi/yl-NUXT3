<template>
    <div class="article-list-wrap">
        <div class="book-mark-box">
            <BookMark :column-name="columnName" :project-channel-name="projectChannelName"></BookMark>
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
            <!-- // 左侧通栏 -->
            <div class="left-article-list" v-loading="isLoading">
                <div class="empty-box" v-if="!isLoading && !articleList.length">
                    <Empty :status="isError ? 'error' : 'empty'"></Empty>
                </div>
                <div class="article-box" v-else>
                    <ArticleList
                        :article-list="articleList"
                        :to-router-path="'/article-info'"
                        :column-name="columnName"
                        :project-id="projectInfo.projectId"
                    ></ArticleList>
                </div>
                <!-- 分页器 -->
                <div class="pagination-box">
                    <user-pagination
                        :page-size="page.pageSize"
                        :total="page.pageCount"
                        :current-page.sync="page.pageIndex"
                        @current-change="changePageIndex"
                        :page-path-name="pagePathName"
                    />
                </div>
            </div>
            <!-- 右侧通栏 -->
            <div class="right-ad">
                <div class="img-section-box" v-show="false">
                    <AdSection :project-id="projectInfo.projectId" :ad-code="'YLWEB_ADD07'" @item-click="handleAdClick"></AdSection>
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
import { mapActions, mapMutations } from 'vuex';
import BookMark from '@/www/components/article-list/bookmark/index.vue';
import TabBar from '@/www/components/article-list/tab-bar/index.vue';
import AdSection from '@/www/components/components/ad-section/index.vue';
import Empty from '@/www/components/components/empty/index.vue';
import ArticleList from '@/www/components/article-list/article-list/index.vue';
import ReferenceInformation from '@/www/components/components/reference-information/index.vue';
import HotCoursesList from '@/www/components/components/hot-courses-list/index.vue';
import UserPagination from '@/www/components/components/pagination/index.vue';
import '@/api/cp/api..query-column-by-project-id.js';
import '@/api/cp/api..query-article-lisy-by-column-id.js';
import '@/api/ctc/api..query-project-detail.js';
import track from '@/www/components/course/trial-course/js/track.js';
import pagePathName from '@/www/components/course/trial-course/js/pagePathName.js';

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
    mixins: [track, pagePathName],
    layout: 'channelLayout',
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
            clueInfo: {
                url: typeof location === 'undefined' ? '' : location.href,
                pageName: ``,
                projectSeoCode: '',
                originCode: 'ylgwzixunxinwen',
                clueWaycode: 'zhuce',
            },
        };
    },
    async fetch() {
        const { projectCode, columnId, channelCode, artProvinceId } = this.$route.params;
        this.clueInfo.projectSeocode = projectCode;
        this.$Promotion.setCLueInfo(this.clueInfo);
        this.channelCode = channelCode;
        this.artProvinceId = artProvinceId;
        this.projectSeoCode = projectCode;
        this.columnId = columnId;
        this.page.pageIndex = parseInt(this.$route.params.page || this.$route.query.page || 1);

        this.setProjectCode(projectCode);
        // 获取城市
        await this.getCity().then((res) => {
            this.provinceList = res;
        });
        await this.queryProjectChannelInfo();
        await this.queryProjectInfo();
        try {
            await this.queryArticleList();
        } catch (error) {
            this.$baseUI.confirm({
                title: '',
                content: '该栏目已下架！',
                showCancel: false,
                confirmText: '知道了',
            });
        }
    },
    head() {
        this.clueInfo.pageName = `${this.columnName || ''}_${this.projectChannelName || ''}_报考资讯|报考条件|备考资料_优路教育`;
        this.clueInfo.url = typeof location === 'undefined' ? '' : location.href;
        this.$Promotion.setCLueInfo(this.clueInfo);
        return this.$head({
            title: `${this.columnName || ''}_${this.projectChannelName || ''}_报考资讯|报考条件|备考资料_优路教育`,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    // eslint-disable-next-line
                    content:
                        `${this.projectInfo.projectName || ''},${this.projectChannelName || ''},考试培训,考试辅导,报考条件,报考时间,报考资讯,备考资料,真题解析,历年真题,优路,优路教育,优路教育网,建筑工程考试,国家职业资格考试,在线教育,在线培训`,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育 | 备考资讯一览无余，为您提供备考指导。',
                },
            ],
        });
    },
    methods: {
        ...mapActions('common/city', {
            getCity: 'getCity',
        }),
        ...mapMutations('onlineService', { setProjectCode: 'setProjectCode' }),
        // 查询项目信息
        queryProjectInfo() {
            return new Promise((resolve) => {
                niceloo.api.call('ctc/query-project-detail', {
                    // 项目seo编码
                    projectSeoCode: this.projectSeoCode,
                    onsuccess: (data) => {
                        this.projectInfo = data;
                        resolve();
                    },
                    onerror: () => {},
                    oncomplete: () => {},
                });
            }).then(() => {
                return this.queryTabListByProjectId();
            });
        },
        // 查询项目频道页信息
        queryProjectChannelInfo() {
            return new Promise((resolve, reject) => {
                this.$callApi('channel/query-info-by-seoCode', {
                    // 频道编码
                    columnSeoNo: this.channelCode,
                    onsuccess: (data) => {
                        if (data) {
                            this.projectChannelName = data.columnTitle || data.columnName;
                            resolve();
                        }
                    },
                    onerror: () => {
                        this.isLoading = false;
                        this.isError = true;
                        reject();
                    },
                    oncomplete: () => {},
                });
            });
        },
        // 查询tab选项
        queryTabListByProjectId() {
            return new Promise((resolve, reject) => {
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
            });
        },
        /**
         * 子组件选中tab
         * @params columnId 栏目id
         * @params artProvinceId 地址
         */
        handleSelect(columnId, artProvinceId, e) {
            if ((e && e.isTrusted) || (artProvinceId && artProvinceId.isTrusted)) {
                this.page = {
                    pageSize: 20,
                    pageIndex: 1,
                    pageCount: 0,
                };
            }
            setTimeout(() => {
                this.$yiguan.track('youlu_click_all_pages', {
                    page_name: document.title, // 页面名称
                    page_url: location.href,
                    page_type: '资源列表页',
                    course_type: '资讯',
                    sort_name: '-',
                    channel_name: this.projectChannelName,
                    project_id: this.projectInfo.projectId,
                    subject_id: '-',
                });
            }, 200);

            const { channelCode, projectCode } = this.$route.params;
            this.columnId = columnId;
            this.artProvinceId = artProvinceId;
            if (this.artProvinceId) {
                if (this.$platform.isClient()) {
                    window.history.replaceState(null, null, `/article-list/${channelCode}/${projectCode}/${columnId}/${artProvinceId}`);
                }
            } else {
                this.$platform.isClient() && window.history.replaceState(null, null, `/article-list/${channelCode}/${projectCode}/${columnId}`);
            }
            return this.queryArticleList();
        },
        // 查询文章列表
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
                    // 按地区筛选时省份标识
                    artProvinceId: this.artProvinceId,
                    onsuccess: (data) => {
                        if (data) {
                            this.articleList = data.list;
                            this.page.pageCount = Number(data.count);
                            this.isLoading = false;
                        }
                        resolve();
                    },
                    onerror: (data) => {
                        this.isError = true;
                        let errorMessage = data.getAttachedData().getMsg();
                        this.$baseUI.confirm({
                            title: '',
                            content: errorMessage,
                            showCancel: false,
                            confirmText: '知道了',
                        });
                        resolve();
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
                ad_position_name: '项目资讯列表页_右侧通用',
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
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        min-height: 500px;
        border-radius: 12px;
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
        .no-bottom-border {
            border-bottom: 1px solid transparent;
        }
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
        word-break: break-all;
        letter-spacing: 0.4px;
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
