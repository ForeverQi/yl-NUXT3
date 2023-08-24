<template>
    <div class="article-template-wrap">
        <div class="article-template-title">
            {{ titleName }}
        </div>
        <div class="article-template-wrap" v-if="articleData.adFirst || articleData.adLast">
            <div class="img-section" v-if="articleData.adFirst" @click="handleAdItemClick(articleData.adFirst, 1)">
                <a v-if="articleData.adFirst.url" :href="articleData.adFirst.url" target="_blank" class="item">
                    <image-view :src="articleData.adFirst.img" :placeholder-height="'180px'"></image-view>
                </a>
                <image-view v-else :src="articleData.adFirst && articleData.adFirst.img" :placeholder-height="'180px'"></image-view>
            </div>
            <div class="bottom-img-section" v-if="articleData.adLast" @click="handleAdItemClick(articleData.adLast, 2)">
                <a v-if="articleData.adLast.url" :href="articleData.adLast.url" target="_blank" class="item">
                    <image-view :src="articleData.adLast.img" :placeholder-height="'100%'"></image-view>
                </a>
                <image-view v-else :src="articleData.adLast.img" :placeholder-height="'100%'"></image-view>
            </div>
        </div>
        <div class="empty-container" v-else>
            <Empty :status="isError ? 'error' : 'empty'"></Empty>
        </div>
    </div>
</template>
<script>
import AdSection from '@/www/components/components/ad-section/index.vue';
import Empty from '@/www/components/components/empty/index.vue';
import '@/api/channel/api..query-config-model-info.js';
export default {
    components: {
        AdSection,
        Empty,
    },
    props: {
        columnId: {
            type: String,
            default: '',
        },
        adCode: {
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
            articleData: {},
            isError: false,
        };
    },
    fetch() {
        return this.queryList();
    },
    methods: {
        handleAdItemClick(item, index) {
            let templateIndex = 0;
            if (this.adCode.indexOf('1') > -1) {
                templateIndex = 1;
            } else if (this.adCode.indexOf('2') > -1) {
                templateIndex = 2;
            } else if (this.adCode.indexOf('3') > -1) {
                templateIndex = 3;
            }
            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: item.advertName,
                jump_type: item.url ? 'URL链接' : '无跳转',
                ad_url: item.url,
                ad_position_name: `广告模版${templateIndex}_广告位${index}`,
                page_name: document.title,
            });
            this.clickYiGuan(index);
        },
        queryList() {
            let data = {
                url: 'channel/query-config-model-info',
                params: {
                    // 频道标识
                    columnId: this.columnId,
                    // 模块编码
                    moduleCode: this.adCode,
                },
                isCustom: false,
            };
            return this.$httpClient(data)
                .then((res) => {
                    if (res.content[0]) {
                        this.articleData = res.content[0];
                    }
                })
                .catch(() => {
                    this.isError = true;
                });
        },

        // 点击获取易观所需要的信息
        clickYiGuan(index) {
            this.$emit('click-yi-guan', {
                module_type: '广告模板',
                type_formwork: this.adCode === 'ZDYGG1' ? '广告模板1' : this.adCode === 'ZDYGG2' ? '广告模板2' : '广告模板3',
                ad_number: index,
            });
        },
    },
};
</script>
<style lang="less" scoped>
.article-template-wrap {
    width: 335px;
    height: auto;
    .article-template-title {
        padding-left: 20px;
        box-sizing: border-box;
        height: 60px;
        width: 100%;
        font-size: 22px;
        font-weight: 400;
        line-height: 60px;
        text-align: left;
        color: #3a3d4b;
        margin-bottom: 12px;
    }
    .article-template-wrap {
        width: 100%;
        padding: 24px 17px 24px 18px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 8px;
    }
}

.img-section {
    width: 300px;
    height: auto;
    margin-bottom: 24px;
    border-radius: 8px;
    transition: 0.5s ease-in-out;
    .item {
        display: block;
        width: 300px;
        height: auto;
        border-radius: 8px;
    }
    /deep/ img {
        border-radius: 8px;
        width: 300px;
        height: auto;
        display: inherit;
    }
}
.img-section:hover,
.bottom-img-section:hover {
    will-change: transform;
    transform: scale(1.05) translateZ(0);
}

.bottom-img-section {
    width: 300px;
    height: auto;
    border-radius: 8px;
    transition: 0.5s ease-in-out;
    .item {
        display: block;
        width: 300px;
        height: auto;
        border-radius: 8px;
    }
    /deep/ img {
        border-radius: 8px;
        width: 300px;
        height: auto;
    }
}
.empty-container {
    width: 335px;
    height: 431px;
    background-color: #fff;
    border-radius: 8px;
}
</style>
