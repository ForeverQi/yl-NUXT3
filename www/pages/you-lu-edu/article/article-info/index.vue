<template>
    <div class="article-detail-wrap">
        <div class="article-detail-container">
            <div class="book-mark-box">
                <BookMark :column-name="articleInfo.ccName" :column-id="articleInfo.ccId" :project-code="projectInfo.projectSeoCode"></BookMark>
            </div>
            <div class="article-detail-box">
                <div class="left-content" v-loading="isLoading">
                    <div class="article-content" v-show="!isNoFindArticle">
                        <div class="title-box">
                            <div class="title">
                                {{ articleInfo.title }}
                            </div>
                            <div class="title-box_content">
                                <div class="modify-time">
                                    {{ articleInfo.publicTime | formatDate }}
                                </div>
                                <SharePoster :article-info="articleInfo" />
                            </div>
                        </div>
                        <div v-show="articleContent" class="content">
                            <div class="rich-text" v-html="articleContent" />
                            <div class="appendix-box" v-if="articleInfo.attachmentList && articleInfo.attachmentList.length">
                                <Appendix :appendix-data="articleInfo.attachmentList"></Appendix>
                            </div>
                            <div class="img-section-box">
                                <AdSection :project-id="articleInfo.ccProjectId" :ad-code="'YLWEB_ADD08'" @item-click="handleAdClick"></AdSection>
                            </div>
                        </div>
                    </div>
                    <div class="change-chapter-button-box" v-show="!isNoFindArticle && (articleInfo.preCaId || articleInfo.nextCaId)">
                        <a v-if="articleInfo.preCaId" :href="`/article-info/${channelCode}/${projectCode}/${articleInfo.preCaId}`">
                            <div class="change-chapter-button">
                                <img class="change-chapter-icon" src="./asset/images/last-chapter-icon.png" alt="" />
                                <div>上一章</div>
                            </div>
                        </a>
                        <div v-else class="change-chapter-button disable-button">
                            <img class="change-chapter-icon" src="./asset/images/last-chapter-icon.png" alt="" />
                            <div>上一章</div>
                        </div>
                        <a v-if="articleInfo.nextCaId" :href="`/article-info/${channelCode}/${projectCode}/${articleInfo.nextCaId}`">
                            <div class="change-chapter-button">
                                <div>下一章</div>
                                <img class="change-chapter-icon" src="./asset/images/next-chapter-icon.png" alt="" />
                            </div>
                        </a>
                        <div v-else class="change-chapter-button disable-button">
                            <div>下一章</div>
                            <img class="change-chapter-icon" src="./asset/images/next-chapter-icon.png" alt="" />
                        </div>
                    </div>
                    <div class="empty-box" v-show="isNoFindArticle">
                        <img class="empty-img" src="./asset/images/empty.png" alt="" />
                        <p class="empty-text">{{ errorMessage }}</p>
                    </div>
                </div>
                <div class="right-content">
                    <div class="img-section-box" v-show="false">
                        <AdSection :project-id="articleInfo.ccProjectId" :ad-code="'YLWEB_ADD07'" @item-click="handleAdClick2"></AdSection>
                    </div>
                    <HotCoursesList :search-all="true" :project-id="articleInfo.ccProjectId"></HotCoursesList>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
import dayjs from 'dayjs';
import { parse } from 'html5parser';
import BookMark from './comps/bookmark/index.vue';
import SharePoster from './comps/share-poster/index.vue';
import AdSection from '@/www/components/components/ad-section/index.vue';
import HotCoursesList from '@/www/components/components/hot-courses-list/index.vue';
import Appendix from '@/www/components/article-info/attachment-list/index.vue';
import '@/api/cp/api.CP3004.query-article-detail.js';
import track from '@/www/components/course/trial-course/js/track.js';

export default {
    components: {
        BookMark,
        AdSection,
        HotCoursesList,
        Appendix,
        SharePoster,
    },
    filters: {
        formatDate(val) {
            return val ? dayjs(val).format('YYYY-MM-DD HH:mm') : '';
        },
    },
    mixins: [track],
    layout: 'channelLayout',
    data() {
        return {
            articleInfo: {}, // 文章信息
            articleContent: '', // 文章内容
            isLoading: true, // 是否加载中
            isNoFindArticle: false, // 是否没有此文章
            projectInfo: '',
            errorMessage: '',
            projectCode: '',
            channelCode: '',
            clueInfo: {
                url: typeof location === 'undefined' ? '' : location.href,
                pageName: `资讯详情`,
                projectCode: '',
                originCode: 'ylgwzixunxinwen',
                clueWaycode: 'zhuce',
            },
            projectChannelName: '',
        };
    },
    fetch() {
        const { articleId, channelCode, projectCode } = this.$route.params;
        this.channelCode = channelCode;
        this.projectCode = projectCode;
        this.setProjectCode(projectCode);
        return this.queryArticleDetail(articleId).catch(() => {
            this.$nuxt.context.error({ statusCode: 404, message: '文章不存在' });
        });
    },
    head() {
        return this.$head({
            title: `${this.articleInfo.title || '资讯详情'}_优路教育`,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    // eslint-disable-next-line
                    content:
                        `${this.projectInfo.projectName || ''},${this.projectInfo.projectShortname || ''},考试培训,考试辅导,报考条件,报考时间,报考资讯,备考资料,真题解析,优路,优路教育,优路教育网,在线教育,在线培训,职业教育,素质提升,技能提升`,
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
        this.clueInfo.projectCode = this.projectCode;
        this.$Promotion.setCLueInfo(this.clueInfo);
        this.queryProjectChannelInfo();
    },
    methods: {
        ...mapMutations('onlineService', { setProjectCode: 'setProjectCode' }),

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
        // 查询章节详情
        queryArticleDetail(articleId) {
            let requestData = {
                url: 'cp/query-article-detail',
                params: {
                    id: articleId,
                },
                isCustom: false,
            };
            return this.$httpClient(requestData)
                .then((data) => {
                    this.isLoading = false;
                    if (data.content) {
                        data.content = data.content.replace('text-align: ', 'text-align:');
                    }
                    this.articleInfo = data;
                    let nodeArr = parse(data.content);
                    this.articleContent = this.$html5parserUtil.rewriteHTML(nodeArr);

                    return this.queryProjectInfo();
                })
                .catch((data) => {
                    this.isLoading = false;
                    this.isNoFindArticle = true;
                    this.errorMessage = data.getAttachedData().getMsg();
                    return Promise.reject();
                });
        },
        // 查询项目信息
        queryProjectInfo() {
            return new Promise((resolve) => {
                niceloo.api.call('ctc/query-project-detail', {
                    // 项目seo编码
                    projectId: this.articleInfo.ccProjectId,
                    onsuccess: (data) => {
                        const { channelCode, articleId, projectCode } = this.$route.params;
                        if (projectCode !== 'all' && projectCode && projectCode !== data.projectSeoCode) {
                            data.projectSeoCode = projectCode;
                        }
                        this.clueInfo.projectCode = data.projectCode;
                        this.clueInfo.pageName = `${this.articleInfo.title || '资讯详情'}_优路教育`;
                        this.$Promotion.setCLueInfo(this.clueInfo);
                        if (this.$platform.isClient()) {
                            window.history.replaceState(null, null, `/article-info/${channelCode}/${data.projectSeoCode}/${articleId}`);
                        }
                        this.projectInfo = data;
                        this.projectCode = data.projectSeoCode;

                        this.$yiguan.track('youlu_click_all_pages', {
                            page_name: document.title, // 页面名称
                            page_url: location.href,
                            page_type: '资源详情页',
                            course_type: '资讯',
                            sort_name: '-',
                            channel_name: this.projectChannelName,
                            project_id: this.projectInfo.projectId,
                            subject_id: '-',
                        });
                        resolve();
                    },
                    onerror: () => {},
                    oncomplete: () => {},
                });
            });
        },
        handleAdClick(item) {
            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: item.adName,
                jump_type: item.adLinkType === 1 ? 'URL链接' : item.adLinkType === 2 ? '小程序' : '无跳转',
                ad_url: item.adLinkType === 1 || item.adLinkType === 2 ? item.adLink : '',
                ad_position_name: '项目资讯详情页_底部',
                page_name: document.title,
            });
        },
        handleAdClick2(item) {
            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: item.adName,
                jump_type: item.adLinkType === 1 ? 'URL链接' : item.adLinkType === 2 ? '小程序' : '无跳转',
                ad_url: item.adLinkType === 1 || item.adLinkType === 2 ? item.adLink : '',
                ad_position_name: '项目资讯详情页_右侧通用',
                page_name: document.title,
            });
        },
    },
};
</script>
<style lang="less" scoped>
.article-detail-wrap {
    width: 100%;
    height: 100%;
    background: #f9fafb;
}
.article-detail-container {
    margin: 0px auto;
    width: 1200px;
    height: auto;
    .book-mark-box {
        padding: 20px 0px;
    }
}

.article-detail-box {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    .left-content {
        flex: 1;
        margin-right: 24px;
        margin-bottom: 120px;
        min-width: 852px;
        min-height: 560px;
        box-sizing: border-box;
        background: #f9fafb;
        border-radius: 8px;
        .article-content {
            margin-bottom: 24px;
            background-color: #fff;
            border-radius: 4px;
            min-height: 560px;
        }
        .title-box {
            padding: 32px 40px 22px;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid #f5f6f9;
            .title {
                font-size: 24px;
                font-weight: 700;
                text-align: left;
                color: #333333;
                line-height: 1;
                margin-bottom: 29px;
            }
            .title-box_content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .modify-time {
                font-size: 12px;
                color: #99a1af;
                line-height: 14px;
            }
        }
        .content {
            padding: 20px 44px 80px;
            min-height: 560px;
            /deep/img {
                max-width: 100%;
                height: auto;
            }
            /deep/video {
                max-width: 100%;
                height: auto;
            }
            /deep/strong {
                font-weight: bold;
            }
            .rich-text {
                line-height: 2.5em;
                word-break: break-all;
            }
            .img-section-box {
                padding-top: 26px;
                border-top: 1px solid #f5f6f9;
                width: 772px;
                margin: 18px auto 0px;
            }
            .appendix-box {
                margin-top: 24px;
                width: 772px;
            }
        }
    }
    .empty-box {
        padding-bottom: 42px;
        height: 580px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .empty-img {
            width: 260px;
            height: 180px;
        }
        .empty-text {
            margin-top: 16px;
            width: 98px;
            height: 19px;
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #3a3d4b;
            line-height: 19px;
        }
    }
    .right-content {
        .img-section-box {
            width: 324px;
            height: 180px;
            margin-bottom: 16px;
            border-radius: 8px;
            overflow: hidden;
            /deep/ img {
                height: 180px;
            }
        }
    }
}
.change-chapter-button-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .change-chapter-button {
        margin-right: 24px;
        width: 160px;
        height: 48px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        background: #ffffff;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        color: #3a3d4b;
        cursor: pointer;
    }
    .change-chapter-icon {
        margin: 2px 8px 0;
        width: 14px;
        height: 14px;
    }
    .disable-button {
        color: #99a1af;
        cursor: not-allowed;
    }
}
</style>
