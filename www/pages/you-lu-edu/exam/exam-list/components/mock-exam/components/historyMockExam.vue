<template>
    <div v-loading="loading" loading-background="#fff" class="history-mock-exam-box">
        <div v-if="list.length">
            <div v-for="(item, index) in list" :key="index" class="item">
                <div class="item-data-box">
                    <img class="bg" src="../../../../assets/img/mkjl.png" alt="" />
                    <div class="item-info-box">
                        <p class="item-title">{{ item.paperName }}</p>
                        <div v-if="item.answersheetStatus === 'A'" class="item-info">
                            <span>{{ `用时：${computeTime(item.answersheetDurationtime)}` }}</span>
                            <span>{{ `成绩：${item.answersheetTotal}分` }}</span>
                            <span>{{ `考试时间：${item.answersheetRecorddate} ` }}</span>
                        </div>
                        <div v-else class="item-info">
                            <span>{{ `考试时间：${formatExamTime(item)} ` }}</span>
                        </div>
                    </div>
                </div>
                <div class="item-btn-box">
                    <div v-if="item.courseId" class="analysis-btn" @click="goToLive(item)">直播解析</div>
                    <div
                        v-if="item.answersheetStatus === 'G'"
                        class="continue-btn"
                        @click="openPage(`/exam/mockexam/on/${classUniquecode}/${item.subjectId}/${item.paperId}`, true, item)"
                    >
                        继续做题
                    </div>
                    <div
                        v-if="item.answersheetStatus === 'A'"
                        class="analysis-btn"
                        @click="openPage(`/exam/mockexam/resolve/${classUniquecode}/${item.subjectId}/${item.paperId}`, false, item)"
                    >
                        查看解析
                    </div>
                    <div
                        v-if="item.answersheetStatus === 'U'"
                        class="doing-btn"
                        @click="openPage(`/exam/mockexam/on/${classUniquecode}/${item.subjectId}/${item.paperId}`, true, item)"
                    >
                        开始考试
                    </div>
                </div>
            </div>
            <Pagination class="pagination" :page-size="page.pageSize" :current-page="page.pageIndex" :total="page.total" @current-change="pageChange" />
        </div>
        <Empty v-else />
    </div>
</template>

<script>
import '@/api/qb/api.QB0027.query-exam-user-list.js';
import '@/api/os/api.OS1001.query-course-info.js';
import Empty from '../../empty';
import Pagination from '@/www/components/components/pagination';

export default {
    components: {
        Empty,
        Pagination,
    },
    props: {
        weekMap: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            loading: false,
            classUniquecode: '',
            subjectId: '',
            list: [],
            page: {
                pageSize: 8,
                pageIndex: 1,
                total: 0,
            },
        };
    },
    computed: {
        formatExamTime() {
            return (item) =>
                `${item.examBegindate.slice(0, -8)} ${this.weekMap[new Date(item.examBegindate).getDay()]} ${item.examBegindate.slice(
                    -8,
                    -3
                )}- ${item.examEnddate.slice(11, -3)}`;
        },
        computeTime() {
            return (time) => {
                let hour = parseInt(time / 3600 + '') + '';
                let minute = parseInt((time % 3600) / 60 + '') + '';
                let second = parseInt(((time % 3600) % 60) + '') + '';
                return `${hour.padStart(2, '0')}: ${minute.padStart(2, '0')} : ${second.padStart(2, '0')} `;
            };
        },
    },
    watch: {
        '$route.params.subjectId'() {
            this.$nextTick(() => {
                this.subjectId = this.$route.params.subjectId;
                this.page = this.$options.data().page;
                this.getData();
            });
        },
    },
    mounted() {
        this.classUniquecode = this.$route.params.classUniquecode;
        this.subjectId = this.$route.params.subjectId;
        this.getData();
    },
    methods: {
        // 分页器事件
        pageChange(pageIndex) {
            this.page.pageIndex = pageIndex;
            this.getData();
        },
        // 列表操作按钮
        openPage(path, openAlert, item) {
            if (openAlert && new Date(item.examBegindate) - new Date() > 0) {
                this.$baseUI.alert(`考试时间：${this.formatExamTime(exam).slice(0, -7)}，请准时参加考试`, '考试未开始');
                return;
            }
            if (item.answersheetStatus === 'A' && +new Date() < +new Date(item.examEnddate)) {
                this.$baseUI.alert('该科考试暂未结束，考试结束才能查看解析哦。', '温馨提示', { confirmText: '我知道了' });
                return;
            }
            this.$PageUtil.openNewPage(path);
        },
        // 直播解析
        goToLive(item) {
            niceloo.api.call('os/query-course-info', {
                courseId: item.courseId,
                clientType: 'P',
                onsuccess: (res) => {
                    console.log(res);
                    this.$PageUtil.openNewPage(data.courseSharepath);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        getData() {
            this.list = [];
            this.loading = true;
            niceloo.api.call('qb/query-exam-user-list', {
                examRestrictingplatform: '1',
                classUniquecode: this.classUniquecode,
                subjectId: this.subjectId,
                sourceType: $nuxt.context.env.config.sourceType,
                pageIndex: (this.page.pageIndex - 1) * this.page.pageSize,
                pageSize: this.page.pageSize,
                onsuccess: (res) => {
                    console.log(res);
                    this.systemTime = res.systemTime;
                    this.page.total = res.count;
                    this.list = res.data;
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
.history-mock-exam-box {
    min-height: 500px;
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
</style>
