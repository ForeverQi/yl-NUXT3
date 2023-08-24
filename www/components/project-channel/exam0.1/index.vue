<template>
    <div class="article-template-wrap">
        <div class="article-template-title">
            {{ `${titleName || '在线题库'}` }}
        </div>
        <div class="article-template-wrap" v-if="articleData.length">
            <div class="text-link-box">
                <a
                    :href="
                        item.projectCode
                            ? `/exam/index/list/${item.projectCode}/${item.ptagId ? item.ptagId : item.projectCode}/ZJLX/${item.subjectId}`
                            : '/exam/index'
                    "
                    target="_blank"
                    v-for="(item, index) in articleData"
                    :key="index"
                    @click="clickYiGuan(item)"
                >
                    <div class="text-link-item" :class="[index === articleData.length - 1 ? 'no-border-bottom' : '']">
                        <img class="exam-title-icon" src="./asset/images/exam-title-icon.png" alt="" />
                        <div class="text-link-title">{{ item.newSubjectName }}</div>
                        <img class="exam-right-icon" src="./asset/images/exam-right-icon.png" alt="" />
                    </div>
                </a>
            </div>
            <!-- 广告图片 -->
            <a
                v-if="advertisingInfo"
                :href="advertisingInfo.newEventPath"
                :target="targetType"
                class="advertising-images"
                :class="{ noChangeImage: targetType === '_self' }"
                @click="handleAdItemClick(advertisingInfo)"
            >
                <img :src="advertisingInfo.imgUrl" />
            </a>
            <a
                :href="`/exam/index/list/${projectInfo.projectCode}/${projectInfo.ptagId ? projectInfo.ptagId : projectInfo.projectCode}/ZJLX`"
                @click="jumpAllExam"
                target="_blank"
                v-else
            >
                <div class="bottom-watch-more-box">
                    <div class="watch-more-text">查看全部题库</div>
                    <img class="bottom-right-icon" src="./asset/images/bottom-right-icon.png" alt="" />
                </div>
            </a>
        </div>
        <div v-else class="empty-box">
            <Empty :status="isError ? 'error' : 'empty'"></Empty>
        </div>
    </div>
</template>
<script>
import Empty from '@/www/components/components/empty/index.vue';
import AdSection from '@/www/components/components/ad-section/index.vue';
import '@/api/channel/api..query-config-model-info.js';
import '@/api/api..query-resource-web-content.js';
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
        projectInfo: {
            type: Object,
            default: () => {
                return {};
            },
        },
        titleName: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            articleData: [],
            isError: false,
            advertisingInfo: null,
        };
    },
    computed: {
        targetType() {
            let type = '_self';
            if (this.advertisingInfo?.eventPath) {
                type = '_blank';
            }
            return type;
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        handleAdItemClick(item) {
            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: item.advertName,
                jump_type: item.eventPath ? 'URL链接' : '无跳转',
                ad_url: item.eventPath,
                ad_position_name: `题库模块管理（模版1）广告图`,
                page_name: document.title,
            });
        },
        /**
         * 初始化
         */
        async init() {
            try {
                const data = await this.getAdvertisingInfo();
                if (data && data.imgUrl) {
                    this.advertisingInfo = data;
                    this.advertisingInfo.imgUrl = this.$urlUtils.getViewUrl(data.imgUrl);
                    this.advertisingInfo.newEventPath = data.eventPath ? data.eventPath : 'javascript:;';
                }
                await this.queryList();
            } catch (err) {
                console.log(err);
            }
        },
        queryList() {
            let data = {
                url: 'channel/query-config-model-info',
                params: {
                    // 频道标识
                    columnId: this.columnId,
                    pageSize: 6,
                    // 模块编码
                    moduleCode: 'TKT1',
                },
                isCustom: false,
            };
            return this.$httpClient(data)
                .then((res) => {
                    // 有广告图片时，最多显示4条
                    if (this.advertisingInfo) {
                        res.content = res.content.splice(0, 4);
                    } else {
                        res.content = res.content.splice(0, 6);
                    }
                    this.articleData = res.content;
                    this.articleData.forEach((item) => {
                        if (item.clientSubjectName) {
                            item.newSubjectName = item.clientSubjectName;
                        } else {
                            item.newSubjectName = `${item.subjectName}题库`;
                        }
                    });
                })
                .catch(() => {
                    this.isError = true;
                });
        },
        jumpAllExam() {
            this.$storage.set('examSubjectId', '');
        },
        // 点击获取易观所需要的信息
        clickYiGuan(item) {
            let ops = {
                module_type: '题库模板',
                type_formwork: '题库模板1',
                course_name: `${item.subjectName}题库`,
                project_position: item.projectName,
                subject_name: item.subjectName,
            };
            this.$emit('click-yi-guan', ops);
        },
        /**
         * 题库模块-广告图片
         */
        getAdvertisingInfo() {
            return new Promise((resolve, reject) => {
                niceloo.api.call('public/query-resource-web-content', {
                    // 模块编码(首页 LOGO 频道页题库模块一广告位：ADIMAGE)
                    moduleCode: 'ADIMAGE',
                    // 频率页栏目标识
                    columnId: this.columnId,
                    onsuccess: (data) => {
                        resolve(data);
                    },
                    onerror: (err) => {
                        reject(err);
                    },
                    oncomplete: () => {},
                });
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
        padding: 10px 16px 16px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 8px;
    }
}

.text-link-box {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
    .text-link-item {
        box-sizing: border-box;
        height: 60px;
        border-bottom: 1px solid #dddddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text-link-title {
            width: 263px;
            height: 20px;
            font-weight: 400;
            text-align: left;
            color: #3a3d4b;
            line-height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            cursor: pointer;
        }
        .text-link-title:hover {
            color: #ff2e30;
        }
        .exam-title-icon {
            margin-right: 6px;
            width: 22px;
            height: 22px;
        }
        .exam-right-icon {
            width: 12px;
            height: 12px;
        }
    }
    .no-border-bottom {
        border-bottom: 1px solid transparent;
    }
}
.img-section-box {
    width: 303px;
    height: 137px;
    border-radius: 8px;
    img {
        width: 303px;
        height: auto;
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
    cursor: pointer;
    .bottom-right-icon {
        margin-left: 8px;
        width: 12px;
        height: 12px;
    }
}
.bottom-watch-more-box:hover {
    color: #ff2e30;
}
.empty-box {
    width: 100%;
    height: 431px;
    background-color: #fff;
    border-radius: 8px;
}
.advertising-images {
    width: 100%;
    height: 137px;
    display: inline-block;
    background: #fffafa;
    border-radius: 7px;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
    }
}
.noChangeImage {
    cursor: inherit;
}
</style>
