<template>
    <div class="exercise-records-box" v-loading="loading" loading-background="#fff">
        <p v-if="list.length" class="title">试卷名称</p>
        <div v-if="list.length" class="list-box">
            <div v-for="(item, index) in list" :key="index" class="item">
                <div class="item-data-box">
                    <img class="bg" src="../../../assets/img/bg.png" alt="" />
                    <div class="item-info-box">
                        <p class="item-title">{{ item.papertypeCode == 'ZNLX' ? `${item.subjectName}-${item.paperName}` : item.paperName }}</p>
                        <div class="item-info">
                            <span>{{ `用时：${getTimeString(item.answersheetDurationtime)}` }}</span>
                            <span v-if="item.papertypeCode == 'LNZT' || item.papertypeCode == 'MNST' || item.papertypeCode == 'DQZL'">
                                {{ `成绩：${item.answersheetTotal}分` }}
                            </span>
                            <span>{{ `考试时间：${item.answersheetRecorddate} ` }}</span>
                        </div>
                    </div>
                </div>
                <div class="item-btn-box">
                    <div v-if="item.answersheetStatus === 'padding' && isShowBtn(item.papertypeCode)" class="continue-btn" @click="paperContinue(item)">
                        继续做题
                    </div>
                    <div v-if="item.answersheetStatus !== 'padding'" class="analysis-btn" @click="openPage(item)">查看解析</div>
                    <div v-if="item.answersheetStatus === 'complete' && isShowBtn(item.papertypeCode)" class="doing-btn" @click="paperGenerate(item)">
                        重新做题
                    </div>
                </div>
            </div>
            <Pagination class="pagination" :page-size="page.pageSize" :current-page="page.pageIndex" :total="page.total" @current-change="pageChange" />
        </div>
        <Empty v-else text="暂无练习记录" />
        <tips class="tips" @ondatechange="ondatechange" @handlebackrecord="handlebackrecord" v-show="showTips" />
    </div>
</template>

<script>
import Empty from '../../../exam-list/components/empty';
import Pagination from '@/www/components/components/pagination';
import track from '@/www/components/course/trial-course/js/track.js';
import Tips from '@/www/components/uc/member/tips/index.vue';
import '@/api/qb/api.QB2001.query-answersheet-profile-list.js';
import '@/api/qb/api.QB3300101.query-answersheet-history-list.js';

export default {
    components: {
        Empty,
        Pagination,
        Tips,
    },
    mixins: [track],
    props: {
        classUniquecode: {
            type: String,
            default: '',
        },
        subjectId: {
            type: String,
            default: '',
        },
        projectId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            page: {
                pageSize: 10,
                pageIndex: 1,
                total: 0,
            },
            loading: false,
            isData: false, // 是否有数据展示按钮
            isHistoryRecord: false, // 是否是历史数据
            guidangDate: '', // 归档日期
            list: [],
        };
    },
    computed: {
        // 判断继续答题、查看解析、重新做题按钮是否显示
        // 90天前的做题记录中每日一练、智能练习、错题本、收藏夹、课后练习类型的试卷不显示【重新做题】按钮
        isShowBtn() {
            return (papertypeCode) => {
                // 是历史记录并且是每日一练、智能练习、错题本、课后练习、收藏夹返回false
                return this.isHistoryRecord ? !['MRYL', 'ZNLX', 'CTB', 'KHLX', 'SCLX'].includes(papertypeCode) : true;
            };
        },
        // 是否显示90天前历史记录操作栏
        showTips() {
            if (this.isHistoryRecord) {
                return true;
            }
            var pageAll = Math.ceil(this.page.total / this.page.pageSize);
            return this.page.pageIndex === (pageAll === 0 ? 1 : pageAll);
        },
        // 计算用时
        getTimeString() {
            function formatNumber(n) {
                const str = n.toString();
                return str[1] ? str : `0${str}`;
            }
            return (time) => {
                var hour = formatNumber(Math.floor(time / 3600));
                var minute = formatNumber(Math.floor((time - 3600 * hour) / 60));
                var second = formatNumber(Math.floor((time - 3600 * hour - 60 * minute) % 60));
                return hour + ':' + minute + ':' + second;
            };
        },
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 继续做题
        paperContinue(item) {
            console.log(item);
            var path =
                (item.papertypeCode == 'ZJLX' ? '/member/zjlx/goon/' : '/member/ks/goon/') +
                `${this.$route.params.classUniquecode}/${this.$route.params.subjectId}/${item.paperId}/${item.answersheetId}?from=lxjl`;

            this.trackWebYouluTestPaper({
                paper_name: item.paperName,
                project_id: this.projectId,
                subject_id: this.subjectId,
            });

            setTimeout(() => {
                this.$PageUtil.href(path);
            }, 0xc8);
        },
        // 查看解析
        openPage(item) {
            var path = '';
            if (item.papertypeCode == 'LNZT' || item.papertypeCode == 'MNST') {
                path = item.answersheetEstimatestatus == 'yes' ? '/member/ks/donegy/' : '/member/ks/donegn/';
            } else {
                path = item.papertypeCode == 'ZJLX' ? '/member/zjlx/parse/' : '/member/parse/donegy/';
            }
            path += `${this.$route.params.classUniquecode}/${this.$route.params.subjectId}/${item.paperId}/${item.answersheetId}?from=lxjl${
                this.isHistoryRecord ? '&isHistoryRecord=COLD' : ''
            }`;
            this.$PageUtil.href(path);
        },
        // 重新做题
        paperGenerate(item) {
            console.warn('paperGenerate', item);
            var path =
                (item.papertypeCode == 'ZJLX' ? '/member/zjlx/new/' : '/member/ks/new/') +
                `${this.$route.params.classUniquecode}/${this.$route.params.subjectId}/${item.paperId}?from=lxjl`;

            this.trackWebYouluTestPaper({
                paper_name: item.paperName,
                project_position: this.projectId,
                project_id: this.projectId,
                subject_id: this.subjectId,
                channe_name: '练习记录',
                user_type: '流量订单用户',
            });

            setTimeout(() => {
                this.$PageUtil.href(path);
            }, 0xc8);
        },
        // 分页器事件
        pageChange(pageIndex) {
            this.page.pageIndex = pageIndex;
            this.getData();
        },
        // 历史记录选择
        ondatechange(date) {
            Object.assign(this.$data.page, this.$options.data().page);
            this.isHistoryRecord = true;
            this.guidangDate = date;
            this.getData();
        },
        // 返回最近记录
        handlebackrecord() {
            Object.assign(this.$data.page, this.$options.data().page);
            this.isHistoryRecord = false;
            this.getData();
        },
        getData() {
            this.loading = true;
            this.list = [];
            var api = this.isHistoryRecord ? 'query-answersheet-history-list' : 'query-answersheet-profile-list';
            niceloo.api.call(`qb/${api}`, {
                subjectId: this.subjectId,
                pageIndex: (this.page.pageIndex - 1) * 10,
                pageSize: this.page.pageSize,
                classUniquecode: this.classUniquecode,
                sourceType: $nuxt.context.env.config.sourceType,
                viewDate: this.isHistoryRecord ? this.guidangDate : null,
                onsuccess: (res) => {
                    console.log(res);
                    this.page.total = res.count;
                    if (res == null || res.data.length == 0) {
                        this.isData = false;
                        this.list = [];
                    } else {
                        this.isData = true;
                        this.list = res.data;
                    }
                    console.log(this.list);
                    this.$emit('show-btn', this.isData);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
    },
};
</script>

<style lang="less" scoped>
.exercise-records-box {
    margin-top: 32px;
    min-height: 500px;
    .title {
        font-size: 24px;
        font-weight: 700;
        color: #3a3d4b;
        line-height: 31px;
    }
    .list-box {
        margin-top: 40px;
        .item {
            margin-bottom: 48px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .item-data-box {
                display: flex;
                align-items: center;
                .bg {
                    margin-right: 16px;
                    width: 64px;
                    height: 64px;
                }
                .item-info-box {
                    max-width: 460px;
                    flex-shrink: 0;
                    .item-title {
                        width: 100%;
                        font-size: 17px;
                        font-weight: 700;
                        color: #3a3d4b;
                        line-height: 24px;
                        letter-spacing: 0.71px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .item-info {
                        margin-top: 12px;
                        span {
                            font-size: 14px;
                            font-weight: 400;
                            text-align: left;
                            color: #99a1af;
                            line-height: 20px;
                            letter-spacing: 0.58px;
                        }
                    }
                }
            }
            .item-btn-box {
                display: flex;
                align-items: center;
                .continue-btn {
                    width: 96px;
                    height: 39px;
                    font-size: 14px;
                    font-weight: 400;
                    text-align: center;
                    color: #ff2e30;
                    line-height: 39px;
                    background: #fff2f0;
                    border-radius: 20px;
                    cursor: pointer;
                }
                .analysis-btn {
                    margin-right: 20px;
                    width: 96px;
                    height: 39px;
                    font-size: 14px;
                    font-weight: 400;
                    text-align: center;
                    color: #3a3d4b;
                    line-height: 39px;
                    background: #ffffff;
                    border: 1px solid rgba(0, 0, 0, 0.12);
                    border-radius: 20px;
                    cursor: pointer;
                }
                .doing-btn {
                    width: 96px;
                    height: 39px;
                    font-size: 14px;
                    font-weight: 400;
                    text-align: center;
                    color: #ffffff;
                    line-height: 39px;
                    background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
                    border-radius: 20px;
                    cursor: pointer;
                }
            }
        }
        .pagination {
            margin-top: 40px;
        }
    }
    .tips {
        margin-top: 32px;
    }
}
</style>
