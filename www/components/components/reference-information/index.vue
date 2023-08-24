<template>
    <div class="exam-template-wrap">
        <div class="exam-template-wrap" v-if="articleData.length">
            <div class="top-exam-title-container">
                <img class="left-font" src="./asset/images/left-font.png" alt="" />
                <a :href="`/ziliao/all/all/all/${projectSeoCode}`" target="_blank" rel="noopener noreferrer">
                    <div class="more-exam-box">
                        <span>更多</span>
                        <img src="./asset/images/right-arrow.png" alt="" />
                    </div>
                </a>
            </div>
            <div class="text-link-box">
                <a
                    :href="item.docPackstatus === 'Y' ? `/all/ziliao_all_all/pack/${item.docCode}` : `/all/ziliao_all_all/${item.docCode}`"
                    target="_blank"
                    v-for="(item, index) in articleData"
                    :key="index"
                >
                    <div class="text-link-item" :class="[index === articleData.length - 1 ? 'no-border-bottom' : '']">
                        <div class="exam-title">
                            {{ item.docName }}
                        </div>
                        <div class="exam-info-box">
                            <div class="info-tag">{{ item.catalogName | showTag }}</div>
                            <div class="info-num">{{ `共${item.docPackstatus === 'Y' ? item.docPacknum : item.docPagenum}条` }}</div>
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
import '@/api/dc/api..query-doc-list-by-project-channel-id.js';
import Empty from '@/www/components/components/empty/index.vue';
import '@/api/ctc/api..query-project-detail.js';
export default {
    components: {
        Empty,
    },
    filters: {
        showTag(tagString) {
            return tagString.split(',')[0];
        },
    },
    data() {
        return {
            projectSeoCode: 'all',
            isError: false,
            isLoading: true,
            articleData: {
                textList: [],
            },
            projectInfo: {},
        };
    },
    fetch() {
        const { projectCode } = this.$route.params;
        this.projectSeoCode = projectCode;
        return this.queryProjectInfo();
    },
    methods: {
        queryList() {
            return new Promise((resolve, reject) => {
                this.$callApi('dc/query-doc-list-by-project-channel-id', {
                    // 项目id
                    projectIds: this.projectInfo.projectId,
                    // 获取数量
                    pageSize: 5,
                    // 展示客户端
                    clientType: 'W',
                    onsuccess: (res) => {
                        if (res.length) {
                            this.articleData = res;
                        }
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
        // 查询项目信息
        queryProjectInfo() {
            return new Promise((resolve, reject) => {
                niceloo.api.call('ctc/query-project-detail', {
                    // 项目seo编码
                    projectSeoCode: this.projectSeoCode,
                    onsuccess: (data) => {
                        this.projectInfo = data;
                        this.projectSeoCode = data.projectSeoCode || 'all';
                        resolve();
                    },
                    onerror: () => {
                        this.isError = true;
                        reject();
                    },
                    oncomplete: () => {},
                });
            }).then(() => {
                this.queryList();
            });
        },
    },
};
</script>
<style lang="less" scoped>
.exam-template-wrap {
    margin-top: 8px;
    width: 324px;
    height: auto;
    .exam-template-wrap {
        width: 100%;
        padding: 26px 24px 16px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 8px;
    }
}

.top-exam-title-container {
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-font {
        width: 72px;
        height: auto;
    }
    .more-exam-box {
        display: flex;
        align-items: center;
        font-size: 12px;
        font-weight: 400;
        color: #99a1af;
        line-height: 16px;
        cursor: pointer;
        img {
            margin-left: 2px;
            width: 10px;
            height: 10px;
        }
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
            width: 276px;
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
            margin-top: 12px;
            height: 22px;
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
