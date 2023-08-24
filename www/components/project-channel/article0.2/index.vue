<template>
    <div class="article-template-wrap">
        <div class="article-template-title">
            {{ `${titleName || '报考指导'}` }}
        </div>
        <div class="empty-box" v-if="!articleData.facadeList.length && !articleData.timeAxisList.length">
            <Empty :status="isError ? 'error' : 'empty'"></Empty>
        </div>
        <div class="article-template-container" v-else>
            <div class="enter-link-box">
                <a
                    :href="item.eventType === 'C' ? item.eventValue : `/article-list/${$route.params.channelCode}/${item.projectCode}/${item.eventValue}`"
                    class="enter-link-item"
                    target="_blank"
                    v-for="(item, index) in articleData.facadeList"
                    :key="index"
                    :class="[(index + 1) % 3 === 0 ? 'no-margin' : '']"
                    @click="clickYiGuan(item)"
                >
                    {{ item.name }}
                </a>
            </div>
            <div class="setup-box">
                <div class="setup-title-box">
                    <img class="title-before-icon" src="./asset/images/title-before-icon.png" alt="" />
                    <div class="setup-title-text">{{ articleData.timeAxisName }}</div>
                    <div class="day-item" v-for="(item, index) in day" :key="index">
                        {{ item }}
                    </div>
                    <div>天</div>
                </div>
                <div class="setup-content-box">
                    <div class="text-link-item" :class="[index === 0 ? 'no-margin-item' : '']" v-for="(item, index) in articleData.timeAxisList" :key="index">
                        <div class="setup-item-content">
                            <div class="left-content">
                                <div class="setup-icon"></div>
                                <div class="setup-item-title">
                                    {{ item.leftContent }}
                                </div>
                            </div>
                            <div class="setup-item-desc">
                                {{ item.rightContent }}
                            </div>
                        </div>
                        <div class="line-box">
                            <div
                                class="line"
                                :class="[item.linkList && item.linkList.length > 0 ? '' : 'no-link-line']"
                                v-if="index !== articleData.timeAxisList.length - 1"
                            ></div>
                            <div class="setup-link-box" v-if="item.linkList && item.linkList.length">
                                <a
                                    class="setup-link-item"
                                    target="_blank"
                                    :href="linkItem.linkUrl"
                                    v-for="(linkItem, linkIndex) in item.linkList"
                                    :key="linkIndex"
                                    @click="clickYiGuan(linkItem)"
                                >
                                    {{ linkItem.linkName }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
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
                facadeList: [],
                setupTitle: '距离二建2022年考试还有',
                timeStamp: '',
                timeAxisList: [],
            },
            isError: false,
        };
    },
    fetch() {
        return this.queryList();
    },
    computed: {
        day() {
            let examDateDistance = this.articleData.examDateDistance || '000';
            return examDateDistance.split('');
        },
    },
    methods: {
        queryList() {
            let data = {
                url: 'channel/query-config-model-info',
                params: {
                    // 频道标识
                    columnId: this.columnId,
                    // 模块编码
                    moduleCode: 'ZXT2',
                },
                isCustom: false,
            };
            return this.$httpClient(data)
                .then((res) => {
                    if (res.content[0]) {
                        this.articleData = res.content[0];
                        this.createArticleData();
                    }
                })
                .catch(() => {
                    this.isError = true;
                });
        },
        createArticleData() {
            // 如果顶部的入口文件大于3 需要根据内容截取
            if (this.articleData && this.articleData.facadeNum > 3 && this.articleData.timeAxisNum >= 6) {
                // 入口文件大于3 是否存在有一个时间轴没有文字链
                let isExistNotHaveLinkList = this.articleData.timeAxisList.filter((item) => {
                    return !item.linkList || item.linkList.length < 1;
                });
                // 存在最大6个  不存在 5个
                if (isExistNotHaveLinkList.length === 0) {
                    this.articleData.timeAxisList[this.articleData.timeAxisList.length - 1].linkList = [];
                }
                this.articleData.timeAxisList = this.articleData.timeAxisList.slice(0, 6);
            }
        },

        // 点击获取易观所需要的信息
        clickYiGuan(item) {
            let ops = {
                module_type: '资讯模板',
                type_formwork: '资讯模板2',
            };

            if (item.name || item.linkName) {
                ops.course_name = item.name || item.linkName;
            }

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
    .article-template-container {
        width: 100%;
        height: 602px;
        box-sizing: border-box;
        padding: 24px 8px 0px 8px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
    }
}

.enter-link-box {
    width: 304px \9;
    display: flex;
    padding: 0px 7px 0px 8px;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
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

.setup-box {
    margin-top: 4px;
    padding: 0px 12px 0px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 434px;
    border-radius: 8px;
}
.setup-title-box {
    font-size: 13px;
    font-weight: 400;
    color: #3a3d4b;
    line-height: 16px;
    background-image: url('./asset/images/setup-title-bac.png');
    background-position: center;
    background-size: 100% 100%;
    width: 304px;
    height: 59px;
    display: flex;
    align-items: center;
    justify-content: center;
    .title-before-icon {
        width: 30px;
        height: 43px;
    }
    .setup-title-text {
        letter-spacing: 1px;
    }
    .day-item {
        background-image: url('./asset/images/day-bac.png');
        width: 25px;
        height: 32px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 21px;
        font-weight: 700;
        color: #f8323c;
        line-height: 32px;
    }
}

.setup-content-box {
    margin-top: 10px;
    box-sizing: border-box;
    width: 295px;
    background: #ffffff;
    border-radius: 8px;
    .text-link-item {
        display: flex;
        flex-direction: column;
        margin-top: -2px;
        .line-box {
            display: flex;
            align-items: flex-start;
        }
        .line {
            margin-left: 3px;
            width: 0px;
            height: 56px;
            border: 0.5px dashed #e6eaf2;
        }
        .no-link-line {
            height: 36px;
        }
        .setup-item-content {
            margin-top: -2px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left-content {
                display: flex;
                align-items: center;
                .setup-icon {
                    width: 9px;
                    height: 9px;
                    background-image: url('./asset/images/setup-icon.png');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    background-position: center;
                }
            }
            .setup-item-title {
                margin-left: 8px;
                height: 19px;
                font-size: 14px;
                text-align: left;
                color: #3a3d4b;
                font-weight: 600;
                line-height: 19px;
                width: 100px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                text-align: left;
            }
            .setup-item-desc {
                width: 110px;
                padding-right: 3px;
                box-sizing: border-box;
                font-size: 12px;
                font-weight: 400;
                line-height: 16px;
                text-align: left;
                color: #3a3d4b;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                text-align: right;
            }
        }
    }
    .text-link-item:hover {
        .setup-item-content {
            .left-content {
                .setup-icon {
                    background-image: url('./asset/images/active-setup.png');
                }
            }
        }
    }
    .setup-link-box {
        margin-top: 8px;
        margin-left: 12px;
        width: 278px;
        height: 28px;
        display: flex;
        flex-wrap: wrap;
        line-height: 28px;
        padding: 0px 0px 0px 10px;
        box-sizing: border-box;
        overflow: hidden;
        background: #f7f7fa;
        border-radius: 4px;
        .setup-link-item {
            margin-right: 16px;
            display: inline-block;
            white-space: nowrap;
            font-size: 12px;
            font-weight: 400;
            color: #77798d;
            line-height: 16px;
            cursor: pointer;
            height: 28px;
            line-height: 28px;
        }
        .setup-link-item:hover {
            color: #ff2e30;
        }
    }
    .no-margin-item {
        margin-top: 0px;
    }
}
.empty-box {
    height: 602px;
    background-color: #fff;
    border-radius: 8px;
}
</style>
