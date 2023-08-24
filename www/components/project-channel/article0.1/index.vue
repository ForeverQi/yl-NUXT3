<template>
    <div class="article-template-wrap">
        <div class="article-template-title">
            {{ `${titleName || '报考指导'}` }}
        </div>
        <div class="article-empty-box" v-if="!articleData.facadeList.length && !articleData.textList.length">
            <Empty :status="isError ? 'error' : 'empty'"></Empty>
        </div>
        <div class="article-template-container" v-else>
            <div class="enter-link-box">
                <a
                    v-for="(item, index) in articleData.facadeList"
                    :href="item.eventType === 'C' ? item.eventValue : `/article-list/${$route.params.channelCode}/${item.projectCode}/${item.eventValue}`"
                    target="_blank"
                    :key="index"
                    @click="clickYiGuan(item)"
                >
                    <div class="enter-link-item" :class="[(index + 1) % 3 === 0 ? 'no-margin' : '']">
                        {{ item.name }}
                    </div>
                </a>
            </div>
            <div class="text-link-box" v-if="articleData.textLinkList.length">
                <a
                    :href="item.type === 'C' ? `/article-info/${$route.params.channelCode}/all/${item.id}` : item.url"
                    target="_blank"
                    v-for="(item, index) in articleData.textLinkList"
                    :key="index"
                    @click="clickYiGuan(item)"
                >
                    <div
                        class="text-link-item"
                        :class="[
                            articleData.facadeNum == 3 && articleData.editBannerObjFlag && index === 4 ? 'margin-bottom-9' : '',
                            articleData.facadeNum == 3 && !articleData.editBannerObjFlag ? 'min-margin-text-link-item' : '',
                        ]"
                    >
                        <div class="text-link-title">{{ item.content }}</div>
                        <div class="text-link-time">{{ item.publishDate | filterTime }}</div>
                    </div>
                </a>
            </div>
            <div class="text-link-empty-box" v-else>
                <Empty :status="'empty'"></Empty>
            </div>
            <div class="img-section-box" v-if="articleData.editBannerObjFlag" @click="handleAdItemClick(articleData.bannerObj)">
                <a v-if="articleData.bannerObj && articleData.bannerObj.url" :href="articleData.bannerObj.url" target="_blank">
                    <image-view class="img" :src="articleData.bannerObj && articleData.bannerObj.img"></image-view>
                </a>
                <image-view v-else class="img" :src="articleData.bannerObj && articleData.bannerObj.img"></image-view>
            </div>
        </div>
    </div>
</template>
<script>
import Empty from '@/www/components/components/empty/index.vue';
import '@/api/channel/api..query-config-model-info.js';
export default {
    components: {
        Empty,
    },
    filters: {
        filterTime(TimeString) {
            return TimeString.substring(0, 10);
        },
    },
    props: {
        columnId: {
            type: String,
            default: '',
        },
        titleName: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            articleData: {
                facadeList: [],
                textList: [],
            },
            isError: false,
        };
    },
    fetch() {
        return this.queryList();
    },
    methods: {
        handleAdItemClick(item) {
            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: item.advertName,
                jump_type: item.url ? 'URL链接' : '无跳转',
                ad_url: item.url,
                ad_position_name: `资讯模版管理（模版1）banner图`,
                page_name: document.title,
            });
        },
        queryList() {
            let data = {
                url: 'channel/query-config-model-info',
                params: {
                    // 频道标识
                    columnId: this.columnId,
                    // 模块编码
                    moduleCode: 'ZXT1',
                    pageSize: 7,
                },
                isCustom: false,
            };
            return this.$httpClient(data)
                .then((res) => {
                    if (res.content) {
                        const articleData = res.content[0];
                        this.createArticleData(articleData);
                    }
                })
                .catch(() => {
                    this.isError = true;
                });
        },
        createArticleData(articleData) {
            if (!articleData) {
                return;
            }
            if (articleData) {
                if (articleData.facadeNum == 3 && articleData.editBannerObjFlag) {
                    articleData.textLinkList = articleData.textLinkList.splice(0, 5);
                }
                if (articleData.facadeNum == 6 && articleData.editBannerObjFlag) {
                    articleData.textLinkList = articleData.textLinkList.splice(0, 4);
                }
                if (articleData.facadeNum == 3 && !articleData.editBannerObjFlag) {
                    articleData.textLinkList = articleData.textLinkList.splice(0, 7);
                }
                if (articleData.facadeNum == 6 && !articleData.editBannerObjFlag) {
                    articleData.textLinkList = articleData.textLinkList.splice(0, 6);
                }
            }

            articleData.textLinkList = articleData.textLinkList.map((r) => {
                return {
                    ...r,
                    type_formwork: '资讯模板1',
                };
            });
            this.articleData = articleData;
        },

        // 点击获取易观所需要的信息
        clickYiGuan(item) {
            let ops = {
                module_type: '资讯模板',
                type_formwork: '资讯模板1',
            };

            if (item.name || item.content) {
                ops.course_name = item.name || item.content || '广告位';
            }

            if (item.projectId) {
                ops.project_position = item.projectId;
            }

            this.$emit('click-yi-guan', ops);
        },
    },
};
</script>
<style lang="less" scoped>
.article-template-wrap {
    width: 335px;
    display: flex;
    flex-direction: column;
    height: auto;
    .article-template-title {
        padding-left: 20px;
        box-sizing: border-box;
        height: 62px;
        width: 100%;
        font-size: 22px;
        font-weight: 400;
        line-height: 62px;
        text-align: left;
        color: #3a3d4b;
        margin-bottom: 12px;
    }
    .article-template-container {
        width: 100%;
        height: 602px;
        box-sizing: border-box;
        padding: 32px 15px 20px 16px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
}

.enter-link-box {
    width: 304px \9;
    padding-bottom: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    border-bottom: 1px solid #eee;
    display: block \9;
    .enter-link-item {
        width: 96px;
        box-sizing: border-box;
        height: 32px;
        background: #f6f8fc;
        border-radius: 4px;
        text-align: center;
        line-height: 32px;
        margin-right: 8px;
        margin-bottom: 10px;
        color: #3a3d4b;
        cursor: pointer;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
    }
    .no-margin {
        margin-right: 0px;
    }
    .enter-link-item:hover {
        background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
        color: #fff;
    }
}

.text-link-box {
    padding: 12px 8px 0px 9px;
    display: flex;
    flex: 1;
    flex-direction: column;
    .text-link-item {
        margin-bottom: 28px;
        display: flex;
        flex-direction: column;
        .text-link-title {
            margin-bottom: 12px;
            width: 295px;
            height: 20px;
            font-weight: 400;
            text-align: left;
            color: #3a3d4b;
            line-height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 15px;
        }
        .text-link-time {
            height: 16px;
            font-size: 12px;
            font-weight: 400;
            text-align: left;
            color: #99a1af;
            line-height: 16px;
        }
        .text-link-title:hover {
            color: #ff2e30;
        }
    }
    .min-margin-text-link-item {
        margin-bottom: 24px;
    }
    .margin-bottom-9 {
        margin-bottom: 9px;
    }
}

.text-link-empty-box {
    height: 378px;
}
.img-section-box {
    width: 295px;
    height: 120px;
    border-radius: 8px;
    transition: 0.5s ease-in-out;
    overflow: hidden;
    cursor: pointer;
    /deep/ .img {
        width: 295px;
        height: 120px;
        border-radius: 8px;
    }
}
.article-empty-box {
    height: 602px;
    background-color: #fff;
    border-radius: 8px;
}
.img-section-box:hover {
    will-change: transform;
    transform: scale(1.05) translateZ(0);
}
</style>
