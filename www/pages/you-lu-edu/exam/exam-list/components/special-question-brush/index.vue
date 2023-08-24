<template>
    <div v-loading="loading" loading-background="#fff" class="past-exam-box">
        <div class="list">
            <div class="item" v-for="(item, index) in bankList" :key="index">
                <div class="item-left">
                    <img class="bg" src="../../../assets/img/zxst.png" alt="" />
                    <div class="item-left_content">
                        <p class="item-title" @click="openPage(item)">
                            {{ item.professionBankName }}
                        </p>
                        <div class="item-info">
                            <span class="info-text">刷题进度：{{ item.answerTotal }}/{{ item.avlQuestionTotal }}道</span>
                        </div>
                    </div>
                </div>
                <div class="btn-box">
                    <div class="btn start-btn" @click="openPage(item)">开始刷题</div>
                </div>
            </div>
            <Pagination class="pagination" :page-size="page.pageSize" :current-page="page.pageIndex" :total="page.total" @current-change="pageChange" />
        </div>
        <Empty text="暂未配置专属题库，去其它栏目看看吧！" v-if="!bankList.length" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Empty from '../empty/index.vue';
// import mix from '../mixins';
// import track from '@/www/components/course/trial-course/js/track.js';
import Pagination from '@/www/components/components/pagination';
import '@/api/qb/api.QB0003.query-paper-profile-list.js';
import '@/api/qb/api..query-profession-bank-list.js';
import '@/api/qb/api..query-profession-bank-user-list-page.js';

export default {
    components: {
        Empty,
        Pagination,
    },
    // mixins: [mix, track],
    props: {
        // 面包屑导航
        crumbs: {
            type: Array,
            default: () => [],
        },
        classId: {
            type: String,
            default: '',
        },
        /**
         * 组件所在父组件环境区分
         * 1：题库首页->专项刷题
         * 2：我的题库->专项题库
         */
        questionBankNum: {
            type: Number,
            default: 1,
        },
    },
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            loading: false,
            classUniquecode: '',
            page: {
                pageSize: 8,
                pageIndex: 1,
                total: 0,
            },
            bankList: [],
        };
    },
    computed: {
        ...mapState('class-info/subject', {
            subjectId: 'currentSubjectId',
        }),
        /**
         * 数据来源类型
         *
         * @returns {string} 类型值;题库-YOULU；学习中心-YOULU.STUDY；
         */
        sourceType() {
            let type = '';
            if (this.questionBankNum === 1) {
                type = 'YOULU';
            } else if (this.questionBankNum === 2) {
                type = 'YOULU.STUDY';
            }
            return type;
        },
    },
    watch: {
        /**
         *
         */
        '$route.params.subjectId'() {
            this.$nextTick(() => {
                this.page = this.$options.data().page;
                this.init();
            });
        },
    },
    /**
     *
     */
    mounted() {
        this.classUniquecode = this.$route.params.classUniquecode;
        this.init();
    },
    methods: {
        /**
         * 页面初始化
         */
        init() {
            if (this.questionBankNum === 1) {
                this.getQuestionData();
            } else if (this.questionBankNum === 2) {
                this.getLeadingData();
            }
        },
        /**
         *  页面跳转
         *
         * @param {object} item item
         */
        openPage(item) {
            let path = '';
            // 题库首页->专项刷题
            if (this.questionBankNum === 1) {
                path = `/svip-exam/${item.professionBankId}?sourceType=${this.sourceType}&subjectId=${this.$route.params.subjectId}`;
            } else if (this.questionBankNum === 2) {
                // 学习中心-我的题库->专项题库
                path = `/svip-exam/${item.professionBankId}?classId=${this.$route.params.classId}&sourceType=YOULU.STUDY&ctapId=${this.$route.query.ctapId}&subjectId=${this.$route.query.baseSubjectId}&questionBankStatus=special`;
            }
            this.$PageUtil.href(path);
        },
        /**
         *
         * @param {number} pageIndex 索引值
         */
        pageChange(pageIndex) {
            this.page.pageIndex = pageIndex;
            this.init();
        },
        /**
         * 获取题库首页-专项题库列表
         */
        getQuestionData() {
            this.loading = true;
            niceloo.api.call('qb/query-profession-bank-list', {
                // 项目唯一编码 GUID
                classUniqueCode: this.classUniquecode,
                // 题库科目标识
                subjectId: this.$route.params.subjectId,
                // 数据来源标识 - 题库-专项题库：数据来源标识为空；
                sourceId: '',
                // 数据来源类型 - 题库-专项题库：数据来源类型-YOULU；
                sourceType: this.sourceType,
                // 题库项目标识
                classId: this.$route.params.classId,
                pageIndex: (this.page.pageIndex - 1) * this.page.pageSize,
                pageSize: this.page.pageSize,
                onsuccess: (res) => {
                    this.bankList = res.data ?? [];
                    this.page.total = res.count;
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
        /**
         * 获取学习中心-系统课-专项题库列表
         */
        getLeadingData() {
            this.loading = true;
            niceloo.api.call('qb/query-profession-bank-user-list-page', {
                // 数据来源标识
                sourceId: this.$route.params.classId,
                // 数据来源类型
                sourceType: this.sourceType,
                // 基础数据科目标识
                bdSubjectId: this.$route.query.baseSubjectId,
                pageIndex: (this.page.pageIndex - 1) * this.page.pageSize,
                pageSize: this.page.pageSize,
                onsuccess: (res) => {
                    this.bankList = res.data ?? [];
                    this.page.total = res.count;
                    // “我的题库”tab标签切换回调
                    this.$emit('apiCallBack');
                },
                onerror: (err) => {
                    let errMessage = err.getAttachedData().getMsg();
                    // 修改code对应文案(原："题库中没有对应科目!")
                    if (err.getAttachedData().getData().code === '20006') {
                        errMessage = '该科目暂未上传题库！';
                    }
                    this.$baseUI.alert(errMessage);
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
            margin-top: 28px;
            padding-bottom: 28px;
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
