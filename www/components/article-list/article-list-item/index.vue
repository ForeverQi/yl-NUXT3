<template>
    <div class="article-item">
        <div class="article-content" :class="[isLastArticle ? 'no-bottom-border' : '']">
            <a :href="articleLink" target="_blank" @click="handlerClick(articleData)">
                <div class="article-title">
                    <span v-if="articleData.isTop" class="article-status top-status">置顶</span>
                    <span v-if="articleData.isHot" class="hot-status"></span>
                    <span v-if="articleData.artProvinceName" class="article-status area-status">{{ articleData.artProvinceName }}</span>
                    <span class="txt" v-html="articleData.caTitle"></span>
                </div>
                <div v-if="articleData.caIntro" class="article-desc">{{ articleData.caIntro | formatIntro }}</div>
            </a>
            <div class="article-time">{{ articleData.caEffectTime | formatDate }}</div>
        </div>
    </div>
</template>
<script>
import dayjs from 'dayjs';
export default {
    filters: {
        formatDate(val) {
            return val ? dayjs(val).format('YYYY-MM-DD HH:mm') : '';
        },
        formatIntro(val) {
            return val.trim();
        },
    },
    props: {
        columnName: {
            type: String,
            default: '',
        },
        projectId: {
            type: String,
            default: '',
        },
        toRouterPath: {
            type: String,
            default: '',
        },
        articleData: {
            type: Object,
            default: () => {
                return {};
            },
        },
        isLastArticle: {
            type: Boolean,
            default: false,
        },
    },
    fetch() {
        return Promise.resolve();
    },
    computed: {
        articleLink() {
            // 先默认为toRouterPath 传进来的调换地址（不满足特例条件直接跳转传进来的）
            let link = this.toRouterPath;
            // 如果跳转地址为链接  则直接采用当前文章的跳转地址
            if (this.articleData.caType === 'T') {
                link = this.articleData.caTurnUrl;
            }
            if (this.articleData.caType !== 'T' && this.toRouterPath === '/article-info') {
                // 如果跳转地址不为链接  则根据跳转地址拼接
                link = `/article-info/${this.$route.params.channelCode}/${this.$route.params.projectCode}/${this.articleData.caId}`;
            }
            if (this.articleData.caType !== 'T' && this.toRouterPath === '/article-detail') {
                // 如果跳转地址不为链接  则根据跳转地址拼接
                link = `/article-detail/${this.articleData.caId}`;
            }
            return link;
        },
    },
    methods: {
        handlerClick(item) {
            this.$yiguan.track('youlu_click_list_course', {
                course_name: item.caTitle,
                project_id: this.projectId ? this.projectId : '-',
                subject_id: '-',
                course_type: '资讯',
                page_type: '资源列表页',
                page_name: document.title,
                sort_name: '-',
                channel_name: this.columnName || '-',
            });
        },
    },
};
</script>
<style lang="less" scoped>
.article-item {
    box-sizing: border-box;
    padding: 30px 40px 0px;
    .article-content {
        padding-bottom: 20px;
        border-bottom: 1px solid #ecedf1;
        a {
            height: 22px;
        }
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
    vertical-align: middle;
    display: flex;
    align-items: center;
    .article-status {
        display: inline-block;
        padding: 0px 9px;
        height: 22px;
        line-height: 22px;
        box-sizing: border-box;
        text-align: center;
        vertical-align: middle;
    }
    .top-status {
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 4px;
        font-size: 13px;
        color: #ffffff;
        margin-right: 6px;
    }
    .hot-status {
        display: inline-block;
        width: 48px;
        height: 22px;
        background-image: url('./asset/image/hot-icon.png');
        background-size: 100% 100%;
        background-position: center;
        vertical-align: middle;
        margin-right: 6px;
    }
    .area-status {
        background: #eeeff6;
        border-radius: 4px;
        font-size: 13px;
        color: #53586c;
        margin-right: 8px;
    }
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
.article-item:hover {
    background: #f5f6fa;
    .article-title {
        color: #ff2e30;
    }
}
</style>
