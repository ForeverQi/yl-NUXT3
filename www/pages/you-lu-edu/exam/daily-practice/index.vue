<template>
    <div class="daily-practice-box">
        <Breadcrumb title="每日一练" />
        <div class="content-box">
            <div class="content-list">
                <p class="title">每日一练</p>
                <div class="lixt-box" v-loading="loading" loading-background="#fff">
                    <div v-if="list.length">
                        <div class="list">
                            <div v-for="(item, index) in list" :key="index" class="item">
                                <div class="item-left">
                                    <img class="bg" src="../assets/img/day_bg.png" alt="" />
                                    <p class="item-title">{{ item.paperName }}</p>
                                </div>
                                <div class="btn-box">
                                    <div v-if="item.answersheetStatus === 'U'" class="btn start-btn" @click="paperGenerate(item)">开始做题</div>
                                    <div v-if="item.answersheetStatus === 'A'" class="btn analysis-btn" @click="openPage(item)">查看解析</div>
                                    <div v-if="item.answersheetStatus === 'A'" class="btn doing-btn" @click="paperGenerate(item)">重新做题</div>
                                </div>
                            </div>
                            <Pagination
                                class="pagination"
                                :page-size="page.pageSize"
                                :current-page="page.pageIndex"
                                :total="page.total"
                                @current-change="pageChange"
                            />
                        </div>
                    </div>
                    <Empty v-else text="暂无每日一练信息" :height="350" />
                </div>
            </div>
            <div>
                <div class="top-img" v-show="false">
                    <AdSection :project-id="projectId" ad-code="YLWEB_TKLTD" />
                </div>
                <HotCoursesList v-if="projectId" class="hot-coursesList" :project-id="projectId" search-all />
            </div>
        </div>
    </div>
</template>

<script>
import mix from '../exam-list/components/mixins';
import Breadcrumb from '../components/breadcrumb';
import Empty from '../exam-list/components/empty';
import AdSection from '@/www/components/components/ad-section';
import Pagination from '@/www/components/components/pagination';
import HotCoursesList from '@/www/components/components/hot-courses-list';
import '@/api/qb/api.QB0003.query-paper-profile-list.js';

export default {
    components: {
        Breadcrumb,
        Empty,
        AdSection,
        Pagination,
        HotCoursesList,
    },
    mixins: [mix],
    data() {
        return {
            projectId: '',
            classUniquecode: '', // 项目编码
            subjectId: '', // 科目id
            loading: false,
            list: [],
            page: {
                pageSize: 8,
                pageIndex: 1,
                total: 0,
            },
            examProject: {
                projectName: '',
                projectId: '',
                projectShortName: '',
            },
            examSubject: {
                subjectName: '',
                subjectId: '',
            },
        };
    },
    head() {
        return this.$head({
            title: this.pageTitle,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: `${this.examProject.projectName},${this.examProject.projectShortname},在线题库,题库,刷题,真题,历年真题,考试试题,试题,模拟考试,模拟试题,优路,优路教育,优路教育网,在线教育,在线培训,职业教育,素质提升,技能提升`,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育 | 题库中心，海量题库资源选择，每日一练、随机抽题、章节训练，历年真题、模拟试卷、模拟考试。',
                },
            ],
        });
    },
    computed: {
        pageTitle() {
            return `${this.examProject.projectName}_${this.examSubject.subjectName}_每日一练_优路教育题库`;
        },
    },
    mounted() {
        var examProject = this.$storage.get('examProject');
        this.projectId = examProject ? examProject.projectId : '';
        this.classUniquecode = this.$route.params.classUniquecode;
        this.subjectId = this.$route.params.subjectId;
        Object.assign(this.examProject, this.$storage.get('examProject') || {});
        Object.assign(this.examSubject, this.$storage.get('examSubject') || {});
        this.getData();

        this.eaSetClueInfo({
            pageTitle: examProject ? `${examProject.projectName}_每日一练_优路教育题库` : '每日一练_优路教育题库',
            url: location.href,
        });
    },
    methods: {
        // 查看解析
        openPage(item) {
            this.$PageUtil.openNewPage(`/exam/ks/donegy/${this.classUniquecode}/${item.subjectId}/${item.paperId}/${item.answersheetId}`);
        },
        // 开始/重新考试
        paperGenerate(item) {
            this.$PageUtil.href(`/exam/examinfo/${this.classUniquecode}/${item.subjectId}/${item.paperId}`);
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
                papertypeCode: 'MRYL',
                subjectId: this.subjectId,
                examRestrictingplatform: 1,
                pageIndex: (this.page.pageIndex - 1) * 8,
                pageSize: this.page.pageSize,
                sourceType: $nuxt.context.env.config.sourceType,
                onsuccess: (res) => {
                    console.log(res);
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
.daily-practice-box {
    margin: 0 auto;
    width: 1200px;
    .content-box {
        margin-top: 32px;
        display: flex;
        align-items: flex-start;
        .content-list {
            margin-right: 24px;
            padding: 40px;
            flex-shrink: 0;
            width: 852px;
            background: #ffffff;
            .title {
                font-size: 24px;
                font-weight: 700;
                color: #3a3d4b;
                line-height: 31px;
            }
            .list-box {
                min-height: 350px;
            }
            .list {
                .item {
                    margin-top: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
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
                            &:hover {
                                color: #ff2e30;
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
            }
            .pagination {
                margin-top: 64px;
            }
        }
        .top-img {
            margin-bottom: 15px;
            width: 324px;
            height: 180px;
            border-radius: 8px;
            overflow: hidden;
        }
    }
}
</style>
