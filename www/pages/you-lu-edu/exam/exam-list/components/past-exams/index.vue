<template>
    <div v-loading="loading" loading-background="#fff" class="past-exam-box">
        <div class="list">
            <div class="item" v-for="(item, index) in list" :key="index">
                <div class="item-left">
                    <img class="bg" src="../../../assets/img/lnzt.png" alt="" />
                    <div>
                        <p class="item-title" @click="openPage(`/exam/examinfo/${classUniquecode}/${item.subjectId}/${item.paperId}`)">{{ item.paperName }}</p>
                        <div class="item-info">
                            <span class="info-text">{{ `已做：${item.answerCount} 次` }}</span>
                            <span class="info-text">{{ `上次得分：${item.beforeanswersheetTotal} 分` }}</span>
                        </div>
                    </div>
                </div>
                <div class="btn-box">
                    <div
                        v-if="item.answersheetStatus === 'U'"
                        class="btn start-btn"
                        @click="openPage(`/exam/examinfo/${classUniquecode}/${item.subjectId}/${item.paperId}`, item)"
                    >
                        开始做题
                    </div>
                    <div
                        v-if="item.answersheetStatus === 'A'"
                        class="btn analysis-btn"
                        @click="openPage(`/exam/ks/donegy/${classUniquecode}/${item.subjectId}/${item.paperId}/${item.answersheetId}`, item)"
                    >
                        查看解析
                    </div>
                    <div
                        v-if="item.answersheetStatus === 'A'"
                        class="btn doing-btn"
                        @click="openPage(`/exam/examinfo/${classUniquecode}/${item.subjectId}/${item.paperId}`, item)"
                    >
                        重新做题
                    </div>
                    <div
                        v-if="item.answersheetStatus === 'G'"
                        class="btn doing-btn"
                        @click="openPage(`/exam/ks/goon/${classUniquecode}/${item.subjectId}/${item.paperId}/${item.answersheetId}`, item)"
                    >
                        继续做题
                    </div>
                </div>
            </div>
            <Pagination class="pagination" :page-size="page.pageSize" :current-page="page.pageIndex" :total="page.total" @current-change="pageChange" />
        </div>
        <Empty v-if="!list.length" />
    </div>
</template>

<script>
import Empty from '../empty';
import mix from '../mixins';
import track from '@/www/components/course/trial-course/js/track.js';
import Pagination from '@/www/components/components/pagination';
import '@/api/qb/api.QB0003.query-paper-profile-list.js';

export default {
    components: {
        Empty,
        Pagination,
    },
    mixins: [mix, track],
    data() {
        return {
            loading: false,
            classUniquecode: '',
            subjectId: '',
            page: {
                pageSize: 8,
                pageIndex: 1,
                total: 0,
            },
            list: [],
        };
    },
    watch: {
        '$route.params.subjectId'() {
            this.$nextTick(() => {
                this.page = this.$options.data().page;
                this.init();
            });
        },
    },
    mounted() {
        this.classUniquecode = this.$route.params.classUniquecode;
        this.init();
    },
    methods: {
        init() {
            this.subjectId = this.$route.params.subjectId;
            this.getData();
        },
        // 按钮事件
        openPage(path, item) {
            this.$PageUtil.href(path);
        },
        // 分页器事件
        pageChange(pageIndex) {
            this.page.pageIndex = pageIndex;
            this.getData();
        },
        getData() {
            this.list = [];
            this.loading = true;
            niceloo.api.call('qb/query-paper-profile-list', {
                classUniquecode: this.classUniquecode,
                papertypeCode: 'LNZT',
                subjectId: this.subjectId,
                pageIndex: (this.page.pageIndex - 1) * this.page.pageSize,
                pageSize: this.page.pageSize,
                examRestrictingplatform: 1,
                sourceType: $nuxt.context.env.config.sourceType,
                onsuccess: (res) => {
                    console.log(res);
                    this.list = res.data;
                    this.page.total = res.count;
                },
                onerror: (err) => {
                    console.log(err);
                },
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
    },
};
</script>

<style lang="less" scoped>
.past-exam-box {
    min-height: 500px;
    .list {
        .item {
            margin-top: 24px;
            padding-bottom: 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(0, 0, 0, 0.03);
            .item-left {
                display: flex;
                align-items: center;
                .bg {
                    margin-right: 16px;
                    width: 64px;
                    height: 64px;
                }
                .item-title {
                    max-width: 540px;
                    font-size: 17px;
                    font-weight: 700;
                    color: #3a3d4b;
                    line-height: 24px;
                    letter-spacing: 0.71px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    cursor: pointer;
                    &:hover {
                        color: #ff2e30;
                    }
                }
                .item-info {
                    margin-top: 12px;
                    display: flex;
                    align-items: center;
                    .info-text {
                        margin-right: 24px;
                        font-size: 14px;
                        font-weight: 400;
                        color: #99a1af;
                        line-height: 20px;
                        letter-spacing: 0.58px;
                    }
                }
            }
            .btn-box {
                display: flex;
                align-items: center;
                .btn {
                    width: 96px;
                    height: 39px;
                    font-size: 14px;
                    font-weight: 400;
                    text-align: center;
                    line-height: 39px;
                    border-radius: 20px;
                    cursor: pointer;
                }
                .start-btn {
                    color: #ffffff;
                    background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
                    &:hover {
                        background: #d4151e;
                    }
                }
                .analysis-btn {
                    margin-right: 20px;
                    color: #3a3d4b;
                    background: #ffffff;
                    border: 1px solid rgba(0, 0, 0, 0.12);
                }
                .doing-btn {
                    color: #ff2e30;
                    background: #fff2f0;
                }
            }
        }
        .pagination {
            margin-top: 64px;
        }
    }
}
</style>
