<template>
    <div class="exam-template-wrap">
        <div class="exam-template-title">
            {{ `${titleName || '备考资料'}` }}
        </div>
        <div class="exam-template-wrap" v-if="articleData.length">
            <div class="text-link-box">
                <a
                    :href="item.docPackstatus === 'Y' ? `/all/ziliao_all_all/pack/${item.docCode}` : `/all/ziliao_all_all/${item.docCode}`"
                    target="_blank"
                    v-for="(item, index) in articleData"
                    :key="index"
                    @click="clickYiGuan(item)"
                >
                    <div class="text-link-item" :class="[index === articleData.length - 1 ? 'no-border-bottom' : '']">
                        <div class="exam-title">
                            {{ item.docName }}
                        </div>
                        <div class="exam-info-box">
                            <div class="info-tag">{{ item.catalogName | showTag }}</div>
                            <div class="info-num">{{ `共${item.docPackstatus === 'Y' ? item.docPacknum + '条' : item.docPagenum + '页'}` }}</div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div v-else class="empty-box">
            <Empty :status="isError ? 'error' : 'empty'"></Empty>
        </div>
    </div>
</template>
<script>
import Empty from '@/www/components/components/empty/index.vue';
import AdSection from '@/www/components/components/ad-section/index.vue';
import '@/api/ctc/api..query-project-detail.js';
import '@/api/dc/api..query-doc-list-by-project-channel-id.js';
export default {
    components: {
        AdSection,
        Empty,
    },
    filters: {
        showTag(tagString) {
            return tagString.split(',')[0];
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
        projectInfo: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            articleData: {
                textList: [],
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
                url: 'dc/query-doc-list-by-project-channel-id',
                params: {
                    // 频道标识
                    columnId: this.columnId,
                    // 获取数量
                    pageSize: 5,
                    // 展示客户端
                    clientType: 'W',
                },
                isCustom: false,
            };
            return this.$httpClient(data)
                .then((res) => {
                    if (res.length) {
                        this.articleData = res.slice(0, 5);
                    }
                })
                .catch(() => {
                    this.isError = true;
                });
        },
        // 点击获取易观所需要的信息
        clickYiGuan(item) {
            let ops = {
                module_type: '资料模板',
                course_name: item.docName,
            };
            this.$emit('click-yi-guan', ops);
        },
    },
};
</script>
<style lang="less" scoped>
.exam-template-wrap {
    width: 335px;
    height: auto;
    .exam-template-title {
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
    .exam-template-wrap {
        width: 100%;
        height: 431px;
        padding: 24px 20px 16px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 8px;
    }
}

.text-link-box {
    display: flex;
    flex-direction: column;
    .text-link-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 24px;
        .exam-title {
            width: 295px;
            font-weight: 400;
            text-align: left;
            font-size: 15px;
            color: #3a3d4b;
            line-height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            cursor: pointer;
        }
        .exam-title:hover {
            color: #ff2e30;
        }
        .exam-info-box {
            height: 22px;
            margin-top: 12px;
            display: flex;
            align-items: center;
            .info-tag {
                height: 22px;
                box-sizing: border-box;
                padding: 4px 10px;
                background: #eeeff6;
                color: #53586c;
                border-radius: 2px;
                font-size: 12px;
                font-weight: 400;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 10px;
            }
            .info-num {
                font-size: 12px;
                font-weight: 400;
                text-align: left;
                color: #99a1af;
                line-height: 16px;
            }
        }
    }
    .no-border-bottom {
        border-bottom: 1px solid transparent;
    }
}

.empty-box {
    width: 100%;
    height: 431px;
    background-color: #fff;
    border-radius: 8px;
}
</style>
