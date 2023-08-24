<template>
    <div class="article-detail-wrap">
        <div class="article-detail-container">
            <div class="book-mark-box">
                <BookMark></BookMark>
            </div>
            <div class="article-detail-box">
                <div class="left-content" v-loading="isLoading">
                    <div class="title-box" v-show="!isNoFindArticle">
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
                    </div>
                    <div class="empty-box" v-show="isNoFindArticle">
                        <img class="empty-img" src="./asset/images/empty.png" alt="" />
                        <p class="empty-text">{{ errorMessage }}</p>
                    </div>
                </div>
                <div class="right-content">
                    <div class="img-section-box" v-show="false">
                        <AdSection :ad-code="'YLWEB_ADD06'" @item-click="handleAdClick"></AdSection>
                    </div>
                    <img src="./asset/images/wx-account.png" class="wx-account-img" alt="" />
                    <HotCoursesList :search-all="true"></HotCoursesList>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import { parse } from 'html5parser';
import BookMark from './comps/bookmark';
import SharePoster from '@/www/pages/you-lu-edu/article/article-info/comps/share-poster/index.vue';
import AdSection from '@/www/components/components/ad-section';
import Appendix from '@/www/components/article-info/attachment-list';
import HotCoursesList from '@/www/components/components/hot-courses-list';
import '@/api/cp/api.CP3004.query-article-detail.js';
export default {
    components: {
        BookMark,
        AdSection,
        Appendix,
        HotCoursesList,
        SharePoster,
    },
    filters: {
        formatDate(val) {
            return dayjs(val).format('YYYY-MM-DD HH:mm');
        },
    },
    layout: 'new-default',
    data() {
        return {
            articleInfo: {},
            articleContent: '',
            isLoading: true,
            isNoFindArticle: false,
            errorMessage: '',
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
        const { articleId } = this.$route.params;
        return this.queryArticleDetail(articleId);
    },
    head() {
        this.clueInfo.pageName = `${this.articleInfo.title || ''}_优路教育`;
        this.$Promotion.setCLueInfo(this.clueInfo);
        return this.$head({
            title: `${this.articleInfo.title || '资讯详情'}_优路教育`,
            meta: [
                { hid: 'keywords', name: 'keywords', content: `${this.articleInfo.title}-优路教育` },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育，职业教育一站式学习平台，提供专业职业考试培训和职业技能提升培训服务，用知识服务助力个人职业发展。',
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
        this.clueInfo.pageName = `${this.articleInfo.title || ''}_优路教育`;
        this.$Promotion.setCLueInfo(this.clueInfo);
    },
    methods: {
        handleAdClick(item) {
            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: item.adName,
                jump_type: item.adLinkType === 1 ? 'URL链接' : item.adLinkType === 2 ? '小程序' : '无跳转',
                ad_url: item.adLinkType === 1 || item.adLinkType === 2 ? item.adLink : '',
                ad_position_name: '企业新闻详情页_右侧',
                page_name: document.title,
            });
        },
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

                    setTimeout(() => {
                        this.$yiguan.track('youlu_click_all_pages', {
                            page_name: document.title, // 页面名称
                            page_url: location.href,
                            page_type: '资源详情页',
                            course_type: '资讯',
                            sort_name: '-',
                            channel_name: this.articleInfo.ccName,
                            project_id: this.articleInfo.ccProjectId,
                            subject_id: '-',
                        });
                    }, 200);
                })
                .catch(() => {
                    this.isLoading = false;
                    this.isNoFindArticle = true;
                    this.errorMessage = data.getAttachedData().getMsg();
                });
        },
    },
};
</script>
<style lang="less" scoped>
.article-detail-wrap {
    width: 100%;
    height: 100%;
    background-color: #f5f6f9;
}
.article-detail-container {
    margin: 0px auto;
    width: 1200px;
    height: auto;
    .book-mark-box {
        margin: 20px 0px;
    }
}

.article-detail-box {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    .left-content {
        margin-bottom: 120px;
        width: 852px;
        min-height: 500px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 8px;
        .title-box {
            padding: 32px 44px 25px;
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
                line-height: 31px;
                margin-bottom: 29px;
            }
            .title-box_content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .modify-time {
                font-size: 14px;
                color: #99a1af;
            }
        }
        .content {
            padding: 20px 44px 80px;
            min-height: 500px;
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
            .appendix-box {
                margin-top: 24px;
                width: 772px;
            }
        }
    }
    .empty-box {
        padding-bottom: 42px;
        width: 852px;
        height: 540px;
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
        width: 324px;
        .img-section-box {
            width: 324px;
            height: 180px;
            margin-bottom: 16px;
            border-radius: 8px;
            overflow: hidden;
        }
        .wx-account-img {
            width: 324px;
            height: auto;
            margin-bottom: 10px;
        }
    }
}
</style>
