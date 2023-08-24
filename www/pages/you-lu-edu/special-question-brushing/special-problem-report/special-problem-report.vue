<!--
 * @Author       : zhouqi
 * @description  : 专项小题库做题报告
 * @Date         : 2023-06-30 19:22:23
 * @LastEditors  : zhouqi
 * @LastEditTime : 2023-08-15 15:23:07
 * @FilePath     : \nuxt\www\pages\you-lu-edu\special-question-brushing\special-problem-report\special-problem-report.vue
-->
<template>
    <div class="special-problem-report" v-loading="loading">
        <div class="special-content" v-if="reportInfo">
            <!-- 面包屑 -->
            <!-- <div class="bread">
                <yl-breadcumb :items="crumbs" />
            </div> -->
            <div class="problem-report-content">
                <!-- 做题报告头部 -->
                <div class="problem-report-header">
                    <div class="header-title">
                        <span>{{ questionInfo.professionBankName }}</span>
                    </div>
                    <!-- 只有顺序刷题显示，随机练习和章节练习不显示 -->
                    <div class="header-desc" v-if="$route.query.answerType === 'A'">
                        <span v-for="(item, index) in questionInfo.questionTypeStats" :key="index">
                            {{ item.questionTypeName }}：{{ item.questionTotal }}道
                        </span>
                    </div>
                </div>
                <div class="problem-report-box">
                    <div class="report-box-left">
                        <template v-if="reportInfo.report && reportInfo.report.length">
                            <!-- 我的成绩 -->
                            <div class="report-grades-box">
                                <div class="report-grades">
                                    <span>我的成绩：</span>
                                </div>
                                <div class="report-grades-content">
                                    <!-- 正确率 -->
                                    <div class="grades-accuracy">
                                        <ProgressBar :option="option" />
                                        <div class="grades-accuracy_text">
                                            <div class="grades-accuracy_percentage">
                                                {{ wholeReport.rightRate }}
                                                <span>%</span>
                                            </div>
                                            <span>正确率</span>
                                        </div>
                                    </div>
                                    <!-- 做题数 -->
                                    <div class="report-grades-data">
                                        <span class="grades-data-title">做题数</span>
                                        <div class="grades-data-num">
                                            <em>{{ wholeReport.answerTotal }}</em>
                                            <span>道</span>
                                        </div>
                                    </div>
                                    <!-- 做对数 -->
                                    <div class="report-grades-data">
                                        <span class="grades-data-title">做对数</span>
                                        <div class="grades-data-num">
                                            <em>{{ wholeReport.rightTotal }}</em>
                                            <span>道</span>
                                        </div>
                                    </div>
                                    <!-- 做错数 -->
                                    <div class="report-grades-data">
                                        <span class="grades-data-title">做错数</span>
                                        <div class="grades-data-num">
                                            <em>{{ wholeReport.errorTotal }}</em>
                                            <span>道</span>
                                        </div>
                                    </div>
                                    <!-- 用时 -->
                                    <div class="report-grades-data">
                                        <span class="grades-data-title">用时</span>
                                        <div class="grades-data-num">
                                            <em>{{ wholeReport.newDurationTime }}</em>
                                            <span>分钟</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 做题详情 -->
                            <div class="report-grades-box">
                                <div class="report-grades">
                                    <span>做题详情：</span>
                                </div>
                                <div class="report-grades-table">
                                    <table class="table-content">
                                        <tr class="thead-box">
                                            <th>题型</th>
                                            <th>做题数</th>
                                            <th>做对数</th>
                                            <th>做错数</th>
                                            <th>正确率</th>
                                        </tr>
                                        <tr class="tbody-tr" v-for="(item, index) in reportList" :key="index">
                                            <td width="80">{{ item.questionTypeName }}</td>
                                            <td>{{ item.answerTotal }}</td>
                                            <td>{{ item.rightTotal }}</td>
                                            <td>{{ item.errorTotal }}</td>
                                            <td>{{ item.rightRate }}%</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="report-box-right">
                        <div class="box-right-info">
                            <div class="box-right-img">
                                <!-- <img :src="userData.userAvatar" /> -->
                                <!-- 用户头像 -->
                                <image-view :src="userData.userAvatar" class="card-user-img">
                                    <template #placeholder>
                                        <img src="@/layouts/asset/images/avatar-nomal.png" />
                                    </template>
                                    <template #error>
                                        <img src="@/layouts/asset/images/avatar-nomal.png" />
                                    </template>
                                </image-view>
                            </div>
                            <span>{{ userName }}</span>
                        </div>
                        <div class="report-info-box report-analysis" @click="checkAnalysis">查看解析</div>
                        <div class="report-info-box report-back" @click="goBack">返回</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProgressBar from '@/www/components/learningCenter/learning-report/progress-bar/index.vue';
import '@/api/qb/api..query-profession-bank-report.js';
import '@/api/qb/api..query-profession-bank-info.js';
import dataMixin from '@/www/pages/you-lu-edu/special-question-brushing/mixins/dataMixin.js';

export default {
    components: {
        ProgressBar,
    },
    mixins: [dataMixin],
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            loading: false,
            questionInfo: {},
            reportInfo: null,
            reportList: [], // 作答报告数据
            userData: {},
            wholeReport: {},
            crumbs: [{ name: '题库' }],
            option: {
                width: 90,
                height: 90,
                text: '',
                strokeWidth: 10, //弧线宽度
                percent: 0.2, //占比
                circleColor: 'rgba(255, 236, 232, 0.5)', //圆的颜色
                textColor: '#F8323C', //中间文字颜色
                radius: 37, //半径
            },
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                },
            ],
        };
    },
    computed: {
        /**
         * @returns {string} 用户名称
         */
        userName() {
            return this.userData ? this.userData.userNickname || this.userData.userYoulunum || this.userData.userLoginname : '';
        },
    },
    watch: {
        '$store.state.common.userLogin.popUpLogin': {
            /**
             * handler
             */
            handler() {
                // 登录状态发生变化更新用户信息
                if (typeof ylPlugin !== 'undefined') {
                    ylPlugin.login.getUser().then((userData) => {
                        this.userData = userData;
                    });
                }
            },
            immediate: true,
        },
    },
    /**
     * mounted 生命周期
     */
    mounted() {
        this.professionBankReport();
        this.professionBankInfoFun();
    },
    methods: {
        /**
         * 专项题库作答报告
         */
        professionBankReport() {
            niceloo.api.call('qb/query-profession-bank-report', {
                // 答题标识
                bankAnswerSheetId: this.$route.query.bankAnswerSheetId || '',
                onsuccess: (data) => {
                    this.reportInfo = data;
                    // 将'整体报告'过滤
                    if (this.reportInfo.report && this.reportInfo.report.length) {
                        this.reportList = this.reportInfo.report.filter((item) => {
                            // 为"-1"时为整体报告
                            return item.questionTypeName !== '-1';
                        });
                        // 整体报告数据
                        this.wholeReport = this.reportInfo.report.find((item) => {
                            return item.questionTypeName === '-1';
                        });
                        this.option.percent = this.wholeReport.rightRate / 100;
                    }
                    // 用时秒转化为分钟
                    this.wholeReport.newDurationTime = this.timeConversion(this.reportInfo.durationTime);
                },

                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        /**
         * 获取专项题库基本信息
         */
        professionBankInfoFun() {
            this.loading = true;
            niceloo.api.call('qb/query-profession-bank-info', {
                // 专项题库标识
                professionBankId: this.$route.params.professionBankId,
                onsuccess: (data) => {
                    this.questionInfo = data;
                },

                onerror: niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
        /**
         * 查看解析
         */
        async checkAnalysis() {
            let errNum = 0;
            const sectionId = this.$route.query.sectionId;
            let url = `/svip-exam/${this.$route.params.professionBankId}/analysis?subjectId=${this.$route.query.subjectId}&projectId=${
                this.$route.query.projectId
            }&sourceType=${this.$route.query.sourceType}&questionBankStatus=special&answerType=${this.$route.query.answerType}&projectCode=${
                this.$route.query.projectCode
            }${sectionId ? '&sectionId=' + sectionId : ''}`;
            try {
                // 判断改试题是否被删除
                await this.getProfessionBankInfo().catch((error) => {
                    const errorMsg = error.getAttachedData().getMsg();
                    if (error.getAttachedData().getData().code === '40013') {
                        errNum++;
                        this.$baseUI
                            .alert(errorMsg, '提示', {
                                confirmText: '知道了',
                            })
                            .then(() => {
                                this.$PageUtil.href('/');
                            });
                    }
                });
            } catch (err) {
                console.log(err);
            }
            // 学习中心-题库鉴权
            if (this.$route.query.sourceType === 'YOULU.STUDY') {
                url += `&classId=${this.$route.query.classId}&ctapId=${this.$route.query.ctapId}&className=${this.$route.query.className}`;
                try {
                    if (errNum > 0) return false;
                    // 权限校验
                    await this.commonAuthorLearnCenter().then((data) => {
                        if (data === false) {
                            errNum++;
                            this.$baseUI
                                .alert('您没有该题库的做题权限', '提示', {
                                    confirmText: '知道了',
                                })
                                .then(() => {
                                    this.$PageUtil.href('/');
                                });
                        }
                    });
                } catch (err) {
                    console.log(err);
                }
            }
            if (errNum === 0) {
                this.$PageUtil.href(url);
            }
        },
        /**
         * 返回题库详情
         */
        goBack() {
            let url = `/svip-exam/${this.$route.params.professionBankId}?sourceType=${this.$route.query.sourceType}&subjectId=${this.$route.query.subjectId}`;
            if (this.$route.query.sourceType === 'YOULU.STUDY') {
                url += `&classId=${this.$route.query.classId}&ctapId=${this.$route.query.ctapId}`;
            }
            this.$PageUtil.href(url);
        },
        /**
         * 秒数转化为分钟
         *
         * @param {string} time 秒数
         * @returns {number} 分钟
         */
        timeConversion(time) {
            const t = {
                minutes: Math.ceil((Number(time) % 3600) / 60),
            };
            return t.minutes;
        },
    },
};
</script>

<style lang="less" scoped>
@import '../asset/css/specialProblemReport.less';
</style>
