<template>
    <div>
        <div class="article-template-wrap" v-if="articleData">
            <div class="article-template-title">
                {{ `${titleName || '在线题库'}` }}
            </div>
            <div class="article-template-wrap" v-if="articleData.columnList.length">
                <div class="text-link-box">
                    <a :href="item.eventValue" target="_blank" v-for="(item, index) in articleData.columnList" :key="index" @click="clickYiGuan(item)">
                        <div
                            class="text-link-item"
                            :class="[
                                articleData.columnNum == 4 && (index + 1) % 2 === 0 ? 'no-margin' : '',
                                articleData.columnNum == 2 ? 'long-text-link-item no-margin' : '',
                                articleData.columnNum == 3 && (index + 1) % 2 === 0 ? 'no-margin' : '',
                                articleData.columnNum == 3 && index === 2 ? 'long-text-link-item no-margin' : '',
                            ]"
                        >
                            <div class="text-link-title">{{ item.columnTitle }}</div>
                            <div class="text-link-desc">{{ item.columnSubtitle }}</div>
                            <img class="exam-right-icon" src="./asset/images/exam-right-icon.png" alt="" />
                            <div
                                class="water-mark"
                                :class="[
                                    articleData.columnNum == 4 ? `water-mark-min-${index + 1}` : '',
                                    articleData.columnNum == 2 ? `water-mark-max-${index + 1}` : '',
                                    articleData.columnNum == 3 && index !== 2 ? `water-mark-min-${index + 1}` : '',
                                    articleData.columnNum == 3 && index === 2 ? `water-mark-max-2` : '',
                                ]"
                            ></div>
                        </div>
                    </a>
                </div>
                <div class="img-section-box" v-if="articleData.adObj" @click="clickYiGuan(articleData.adObj)">
                    <a v-if="articleData.adObj.url" :href="articleData.adObj.url" target="_blank" rel="noopener noreferrer">
                        <image-view class="img" :src="articleData.adObj && articleData.adObj.img"></image-view>
                    </a>
                    <image-view v-else class="img" :src="articleData.adObj && articleData.adObj.img"></image-view>
                </div>
            </div>
            <div v-else class="empty-box">
                <Empty :status="isError ? 'error' : 'empty'"></Empty>
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
                columnList: [],
            },
            isError: false,
        };
    },
    fetch() {
        return this.queryList();
    },
    methods: {
        queryList() {
            let data = {
                url: 'channel/query-config-model-info',
                params: {
                    // 频道标识
                    columnId: this.columnId,
                    pageSize: 4,
                    // 模块编码
                    moduleCode: 'TKT2',
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
        clickYiGuan(item) {
            let ops = {
                module_type: '题库模板',
                type_formwork: '题库模板2',
                course_name: item.columnTitle || '广告位',
            };
            this.$emit('click-yi-guan', ops);
        },
    },
};
</script>
<style lang="less" scoped>
.article-template-wrap {
    width: 335px;
    height: auto;
    .article-template-title {
        margin-bottom: 12px;
        padding-left: 20px;
        box-sizing: border-box;
        height: 62px;
        width: 100%;
        font-size: 22px;
        font-weight: 400;
        line-height: 62px;
        text-align: left;
        color: #3a3d4b;
    }
    .article-template-wrap {
        width: 100%;
        padding: 24px 16px 22px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 8px;
    }
}

.text-link-box {
    display: flex;
    flex-wrap: wrap;
    .text-link-item {
        position: relative;
        margin-right: 13px;
        margin-bottom: 16px;
        box-sizing: border-box;
        width: 145px;
        height: 108px;
        padding: 16px;
        background: linear-gradient(180deg, #f8fafe, #ffffff);
        border: 0.5px solid #f1f2f7;
        border-radius: 8px;
        box-shadow: 0px 8px 12px 0px rgba(232, 234, 243, 0.1);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        transition: all 0.2s;
        cursor: pointer;
        .text-link-title {
            font-weight: 700;
            font-size: 15px;
            width: 100%;
            text-align: left;
            color: #373c4a;
            line-height: 16px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            cursor: pointer;
        }
        .text-link-desc {
            width: 100%;
            margin-top: 8px;
            font-size: 12px;
            font-weight: 400;
            color: #9fa7bc;
            line-height: 12px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .exam-right-icon {
            margin-top: 21px;
            width: 22.5px;
            height: auto;
        }
    }
    .long-text-link-item {
        width: 303px;
    }
    .text-link-item:hover .text-link-title {
        color: #ff2e30;
    }
    .no-margin {
        margin-right: 0px;
    }
    .text-link-item:hover {
        transform: translate3d(0, -5px, 0);
    }
}

.water-mark {
    position: absolute;
    bottom: 0px;
    right: 0px;
    background-position: center;
    background-size: 100% 100%;
}
.water-mark-max-1 {
    width: 76px;
    height: 76px;
    background-image: url('./asset/images/exam-max-1.png');
}
.water-mark-max-2 {
    width: 76px;
    height: 76px;
    background-image: url('./asset/images/exam-max-2.png');
}
.water-mark-min-1 {
    width: 52px;
    height: 38px;
    background-image: url('./asset/images/exam-min-1.png');
}
.water-mark-min-2 {
    width: 52px;
    height: 38px;
    background-image: url('./asset/images/exam-min-2.png');
}
.water-mark-min-3 {
    width: 52px;
    height: 38px;
    background-image: url('./asset/images/exam-min-3.png');
}
.water-mark-min-4 {
    width: 52px;
    height: 38px;
    background-image: url('./asset/images/exam-min-4.png');
}

.img-section-box:hover {
    will-change: transform;
    transform: scale(1.05) translateZ(0);
}

.img-section-box {
    width: 303px;
    height: 137px;
    border-radius: 8px;
    overflow: hidden;
    transition: 0.5s ease-in-out;
    .img {
        width: 303px;
        height: 137px;
        border-radius: 8px;
    }
}

.bottom-watch-more-box {
    margin-top: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 303px;
    height: 37px;
    background: #f5f6f9;
    color: #8890a4;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 400;
    .bottom-right-icon {
        margin-left: 8px;
        width: 12px;
        height: 12px;
    }
}
.empty-box {
    width: 100%;
    height: 431px;
    background-color: #fff;
    border-radius: 8px;
}
</style>
