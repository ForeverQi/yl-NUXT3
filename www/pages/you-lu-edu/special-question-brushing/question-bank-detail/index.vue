<!--
 * @Author       : zhouqi
 * @description  : 题库详情页
 * @Date         : 2023-06-21 10:22:57
 * @LastEditors  : zhouqi
 * @LastEditTime : 2023-08-12 11:03:47
 * @FilePath     : \nuxt\www\pages\you-lu-edu\special-question-brushing\svip-exam/BANK001\index.vue
-->
<template>
    <div class="special-question_brushing">
        <!-- 空页面 -->
        <EmptyPage v-if="loadingNum != 3 && !loadingStatus" :is-show-btn="false" :msg="errorMsg" />
        <div class="brush-box" v-loading="loadingStatus" v-else>
            <template v-if="!loadingStatus">
                <!-- 面包屑导航 -->
                <yl-breadcumb :items="crumbs" class="breadcrumb"></yl-breadcumb>
                <!-- 题库标题 -->
                <BrushingInfo :question-info="questionInfo" />
                <div class="brush-content">
                    <div class="brush-content_left">
                        <!-- 快速刷题 -->
                        <QuickAnswerQuestions :question-info="questionInfo" :brush-data="brushData" />
                        <!-- 章节刷题 -->
                        <ChapterBrushQuestions :tree-data="treeData" />
                    </div>
                    <!-- 刷题统计 -->
                    <div class="brush-content_right">
                        <BrushQuestionStatistics :brush-data="brushData" />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import BrushingInfo from '../components/brushing-info.vue';
import QuickAnswerQuestions from '../components/quick-answer-questions.vue';
import BrushQuestionStatistics from '../components/brush-question-statistics.vue';
import ChapterBrushQuestions from '../components/chapter-brush-questions.vue';
import EmptyPage from '@/www/components/learningCenter/do-paper-exam/empty-page'; // 空页面
import '@/api/qb/api..query-profession-bank-user-stat.js';
import '@/api/qb/api..query-profession-bank-info.js';
import '@/api/cc/api.CC3101.query-my-class-stat.js';
export default {
    name: 'QuestionBankDetail',
    components: {
        BrushingInfo,
        QuickAnswerQuestions,
        BrushQuestionStatistics,
        ChapterBrushQuestions,
        EmptyPage,
    },
    /**
     * @returns {object} 抛出的当前页面的vue实例
     */
    provide() {
        return {
            questionCompile: this,
        };
    },
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            loadingStatus: true,
            crumbs: [],
            remainingObj: {},
            brushData: {}, //刷题统计数据
            questionInfo: null, //题库基本信息
            treeData: [],
            errorMsg: '',
            loadingNum: 0,
        };
    },
    watch: {
        /**
         * 加载状态
         *
         * @param {number} newValue 新值
         */
        loadingNum(newValue) {
            if (newValue === 3) {
                this.loadingStatus = false;
            }
        },
    },
    /**
     * 页面挂载生命周期
     */
    mounted() {
        this.getQuestionStatistics();
        this.getProfessionBankInfo();
        this.getBrushQuestions();
    },
    methods: {
        /**
         * 专项题库用户统计
         */
        getQuestionStatistics() {
            const sourceType = this.$route.query.sourceType;
            niceloo.api.call('qb/query-profession-bank-user-stat', {
                // 专项题库标识; 题库-专项题库：数据来源标识为空；学习中心-班级-专项题库：数据来源标识-classId(班级标识)；
                professionBankId: this.$route.params.professionBankId,
                // sourceType; 题库-YOULU 系统课-YOULU.STUDY
                sourceType,
                // 数据来源标识
                sourceId: this.$route.query.classId ?? '',

                onsuccess: (data) => {
                    this.brushData = data;
                    this.loadingNum++;
                },
                onerror: () => {
                    this.loadingStatus = false;
                },
            });
        },
        /**
         * 获取专项题库基本信息
         */
        getProfessionBankInfo() {
            const sourceType = this.$route.query.sourceType;
            niceloo.api.call('qb/query-profession-bank-info', {
                // 专项题库标识
                professionBankId: this.$route.params.professionBankId,
                onsuccess: async (data) => {
                    this.questionInfo = data;
                    this.loadingNum++;
                    let crumbs = [];
                    if (sourceType === 'YOULU') {
                        crumbs = [
                            {
                                name: '题库',
                                href: `/exam/index/list/${this.questionInfo.classUniqueCode}/${this.questionInfo.classUniqueCode}/ZXTK/${this.$route.query.subjectId}`,
                            },
                            {
                                name: this.questionInfo.professionBankName,
                                href: '#',
                            },
                        ];
                    } else if (sourceType === 'YOULU.STUDY') {
                        crumbs = [
                            {
                                name: '学习中心',
                                href: '/learningCenter/index/myCourse',
                            },
                            {
                                name: '我的课程',
                                href: '/learningCenter/index/myCourse',
                            },
                            {
                                name: '系统课',
                                href: '/learningCenter/index/myCourse',
                            },
                        ];
                        const params = {
                            url: 'cc/query-my-class-stat',
                            params: {
                                classIds: this.$route.query.classId,
                            },
                            isCustom: false,
                        };
                        const res = await this.getClassName(params);
                        if (Array.isArray(res.data) && res.data.length > 0) {
                            const classInfo = res.data[0];
                            this.questionInfo.className = classInfo.className;
                            const newCrumbs = [
                                {
                                    name: classInfo.className,
                                    href: `/learningCenter/allTask/${this.$route.query.classId}?ctapId=${this.$route.query.ctapId}`,
                                },
                                {
                                    name: 'SVIP精题库',
                                    href: `/learningCenter/test-paper-list/questionBank/KNCS/${this.$route.query.classId}?baseSubjectId=${this.$route.query.subjectId}&ctapId=${this.$route.query.ctapId}&projectCode=${this.questionInfo.classUniqueCode}&questionBankStatus=special`,
                                },
                                {
                                    name: this.questionInfo.professionBankName,
                                    href: '#',
                                },
                            ];
                            crumbs = crumbs.concat(newCrumbs);
                        }
                    }
                    this.crumbs = crumbs;
                },
                onerror: (error) => {
                    this.loadingStatus = false;
                    this.errorMsg = error.getAttachedData().getMsg();
                    if (error.getAttachedData().getData()?.code === '40013') {
                        this.$baseUI
                            .alert(this.errorMsg, '提示', {
                                confirmText: '知道了',
                            })
                            .then(() => {
                                this.$PageUtil.href('/');
                            });
                        return false;
                    }
                    this.$niceloo.api.handleFailure(error);
                },
            });
        },
        /**
         * 章节刷题树形数据
         */
        getBrushQuestions() {
            niceloo.api.call('qb/query-profession-bank-section-tree', {
                // 专项题库标识
                professionBankId: this.$route.params.professionBankId,
                // 数据来源标识
                sourceId: this.$route.query.classId ?? '',
                // 数据来源类型
                sourceType: this.$route.query.sourceType,

                onsuccess: (data) => {
                    this.treeData = data;
                    this.loadingNum++;
                },

                onerror: () => {
                    this.loadingStatus = false;
                },
                oncomplete: () => {},
            });
        },
        /**
         * 获取课程名称
         *
         * @param {object} params 数据集合
         * @param {string} params.url 接口地址
         * @param {object} params.params 参数
         * @param {boolean} params.isCustom isCustom
         * @returns {Promise} promise
         */
        getClassName(params) {
            return this.httpClient(params);
        },
        /**
         *
         * @param {object} root0 参数
         * @param {string} root0.url url
         * @param {object} root0.params params
         * @param {boolean} root0.isCustom isCustom
         * @returns {Promise} promise
         */
        httpClient({ url, params = {}, isCustom = false }) {
            return new Promise((resolve, reject) => {
                this.$callApi(url, {
                    ...params,
                    /**
                     *
                     * @param {object} data data
                     */
                    onsuccess(data) {
                        resolve(data);
                    },
                    onerror: (err) => {
                        if (!isCustom) {
                            this.$niceloo.api.handleFailure(err);
                        }

                        return reject(err);
                    },
                });
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import '../asset/css/questionBankDetail.less';
</style>
