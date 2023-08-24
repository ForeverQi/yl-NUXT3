<template>
    <div class="report-container">
        <div v-if="!isLoading && dataStat">
            <yl-breadcumb :items="crumbs" class="breadcrumb"></yl-breadcumb>
            <learning-condition
                v-if="dataStat && dataSubject"
                :is-archive-status="isArchiveStatus"
                :data-stat="dataStat"
                :data-subject="dataSubject"
            ></learning-condition>
            <template v-if="currentTabComponent === 'TestAnalysis' && dataStat && dataSubject">
                <learning-advice :pyp-id="dataSubject.pypId" :ucs-compulsory-rate="dataStat.ucsCompulsoryRate"></learning-advice>
                <test-analysis :class-name="dataStat.className" :project-id="dataStat.projectId" :data-subject="dataSubject"></test-analysis>
            </template>
            <study-ranking v-if="currentTabComponent === 'StudyRanking'"></study-ranking>
        </div>
        <div class="empty-tip" v-if="!isLoading && !dataStat">
            <img src="./asset/images/empt-tip.png" alt="" />
            <div>{{ isRuralPlanner ? '乡村规划师学习报告请关注班级列表页学习时长' : '暂无权限查看，去课程中心看看吧' }}</div>
        </div>
        <div class="open-list-load" v-if="isLoading"><loading class="loading"></loading></div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import dayjs from 'dayjs';
import LearningCondition from '@/www/components/learningCenter/learning-report/learning-condition/index.vue';
import LearningAdvice from '@/www/components/learningCenter/learning-report/learning-advice/index.vue';
import TestAnalysis from '@/www/components/learningCenter/learning-report/test-analysis/index.vue';
import StudyRanking from '@/www/components/learningCenter/learning-report/study-ranking/index.vue';
import Loading from '@/plugins/loading/index.vue';
import '@/api/cc/api.CC3101.query-my-class-stat'; // 接口-我的班级统计
import '@/api/api..check-rural-planner-course.js';
import '@/api/api..query-class-archive-status.js'; //接口-是否已归档
export default {
    name: 'index',
    components: {
        LearningCondition, //学习详情
        LearningAdvice, //学习建议
        TestAnalysis, //考点分析
        StudyRanking, //排行统计
        Loading,
    },
    layout: 'new-default',
    data() {
        return {
            currentTabComponent: '',
            crumbs: [
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
                {
                    name: '',
                    href: `/learningCenter/allTask/${this.$route.params.classId}?ctapId=${this.$route.query.ctapId}`,
                },
                {
                    name: '我的学习报告',
                    href: '#',
                },
            ],
            dataStat: null, //返回的统计信息
            dataSubject: null,
            isShowEmptyTip: false,
            isLoading: true,

            isRuralPlanner: false, // 是否是乡村规划师
            isArchiveStatus: false, // 听课率是否已归档
        };
    },
    mounted() {
        this.getCheckProject().then(() => {
            this.getClassArchiveStat();
            this.getClassStat();
            this.getClassSubjects();
        });
    },
    methods: {
        ...mapActions('class-info/learn-tool', {
            getLearnToolsStatus: 'getLearnToolsStatus',
        }),
        init() {
            this.getData();
        },
        getData() {
            this.getLearnToolsStatus(this.$route.params.classId).then((res) => {
                if (res.examSite) {
                    this.currentTabComponent = 'TestAnalysis';
                } else {
                    this.currentTabComponent = 'StudyRanking';
                }
            });
        },
        getClassArchiveStat() {
            // 检查班级归档状态
            const data = {
                url: 'cc/query-class-archive-status',
                params: {
                    classId: this.$route.params.classId, // 班级ID
                },
            };
            return this.$httpClient(data)
                .then((res) => {
                    this.isArchiveStatus = res === 'Y';
                })
                .catch(() => {});
        },
        getCheckProject() {
            if (!this.$route.query.projectId) {
                return Promise.resolve();
            }
            // 检查项目状态
            const data = {
                url: 'cc/check-rural-planner-course',
                params: {
                    projectId: this.$route.query.projectId, // 项目ID
                },
            };
            return this.$httpClient(data)
                .then((res) => {
                    this.isRuralPlanner = res.isUrl;
                })
                .catch(() => {});
        },
        // 我的班级统计
        getClassStat() {
            this.$callApi('cc/query-my-class-stat', {
                classIds: this.$route.params.classId,
                onsuccess: (result) => {
                    if (result) {
                        result.data.forEach((item) => {
                            const ucsCompulsoryRate = Number(item.ucsCompulsoryRate.replace('%', ''));
                            item.ucsCompulsoryRate = isNaN(ucsCompulsoryRate) ? 0 : ucsCompulsoryRate;

                            const ucarRate = Number(item.ucarRate.replace('%', ''));
                            item.ucarRate = isNaN(ucarRate) ? 0 : ucarRate;
                            if (item.ucarFirsttime != '--') {
                                item.ucarFirsttime = dayjs(item.ucarFirsttime).format('YYYY.MM.DD');
                            }
                            if (item.studentclassExpiredate != '--') {
                                item.studentclassExpiredate = dayjs(item.studentclassExpiredate).format('YYYY.MM.DD');
                            }
                        });
                        this.dataStat = result.data[0];
                        if (this.dataStat) {
                            this.crumbs[3].name = this.dataStat.className;
                            this.init();
                        } else {
                            this.isShowEmptyTip = true;
                        }
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.isLoading = false;
                },
            });
        },
        getClassSubjects() {
            //cc/user/class/info/subjects
            this.$callApi('cc/query-class-subjects', {
                classId: this.$route.params.classId,
                onsuccess: (result) => {
                    this.dataSubject = result;
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
    },
};
</script>

<style scoped lang="less">
.report-container {
    width: 1200px;
    margin: 0 auto;
}
.breadcrumb {
    margin-top: 3px;
    margin-bottom: 23px;
}
.empty-tip {
    padding-top: 162px;
    padding-bottom: 162px;
    text-align: center;
    img {
        width: 260px;
        height: 180px;
        margin: 0 auto 16px;
    }
    div {
        font-size: 14px;
        color: #3a3d4b;
    }
}
.open-list-load {
    margin-top: 24px;
    margin-bottom: 30px;
    min-height: 400px;
    position: relative;
}
.loading {
    background: none !important;
}
.loading /deep/.circular {
    stroke: #ff0705;
    fill: transparent;
}
</style>
