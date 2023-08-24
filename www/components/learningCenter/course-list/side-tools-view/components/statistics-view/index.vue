<script lang="jsx">
import { mapState, mapActions } from 'vuex';
import ProgressView from './components/progress-view/index.vue';
import StudentManagerView from '@/www/components/components/student-manager-view/index.vue';
import '@/api/api..query-practice-show-status.js';
import '@/api/ss/api.SS3016.query-learningmanager-stu-list.js';
export default {
    name: 'StatisticsView',
    data() {
        return {
            circleLength: Math.ceil(2 * Math.PI * 30),
            classPracticeStatus: false,
            isShow: false,
            projectInfo: {},
        };
    },
    computed: {
        ...mapState('class-info/info', {
            classId: 'classId',
            projectId: 'projectId',
            projectName: 'projectName',
        }),
        ...mapState('class-info/subject', {
            subjectId: 'currentSubjectId',
        }),
        arcLength() {
            let progressLength = this.circleLength - (this.circleLength / 100) * this.rate;
            return `${progressLength}`;
        },
        rate() {
            let rate = Number(this.ucsCompulsoryRate.replace('%', ''));
            if (isNaN(rate)) {
                rate = 0;
            }
            return rate;
        },
        ...mapState('class-info/info', {
            ucsCompulsoryRate: 'ucsCompulsoryRate',
            classId: 'classId',
            ctapId: 'ctapId',
            showType: 'showType',
            projectId: 'projectId',
            projectName: 'projectName',
            pypId: 'pypId',
            ruralPlanner: 'ruralPlanner',
        }),
    },
    watch: {
        pypId: {
            handler(val, oldVal) {
                if (val && val !== oldVal) {
                    this.getData();
                }
            },
            immediate: true,
        },
        projectId: {
            /**
             *
             * @param {string} val projectId
             */
            handler(val) {
                if (val) {
                    this.init();
                }
            },
            immediate: true,
        },
    },
    methods: {
        ...mapActions('class-info/learn-tool', {
            getProjectAndTools: 'getProjectAndTools',
        }),
        /**
         *
         */
        init() {
            this.getProjectAndTools({ projectId: this.projectId, classId: this.classId }).then((res) => {
                this.projectInfo = res.projectInfo;
            });
        },
        getData() {
            const data = {
                url: 'cc/query-practice-show-status',
                params: {
                    pypId: this.pypId,
                },
            };
            this.$httpClient(data).then((res) => {
                console.log(res, '@@');
                this.classPracticeStatus = res.classPracticeStatus === 'Y';
            });
        },
        showDialog() {
            const data = {
                url: 'ss/query-learningmanager-stu-list',
                params: {
                    // 企业微信appid
                    appid: $nuxt.context.env.config.appid,
                    // 项目标识
                    projectId: this.projectId,
                },
            };
            this.$baseUI.loading();
            this.$httpClient(data)
                .then((res) => {
                    let learningManager = null;
                    this.$baseUI.loading.closeAll();
                    if (res.count) {
                        learningManager = res.learningManagers[0];
                    }
                    this.$baseUI.createModel(
                        {
                            modalContent: StudentManagerView,
                        },
                        {
                            learningManager,
                        },
                        {
                            showHead: false,
                            padding: '0',
                            isTransparent: true,
                            width: '480px',
                        }
                    );
                })
                .catch(() => {
                    this.$baseUI.loading.closeAll();
                });
        },
    },
    render() {
        return (
            <div class="statistics-view">
                <div class="top">
                    {this.ruralPlanner === false && this.classPracticeStatus === true && this.showType === 'class' && (
                        <div
                            class="item"
                            onClick={() => {
                                const data = {
                                    college_name: '',
                                    page_name: '学习中心-课程详情',
                                    project_name: this.projectName ? this.projectName : this.projectId,
                                };
                                this.$yiguan.learningCenter('web_learning_center_practice_muster', data);
                                setTimeout(() => {
                                    this.$PageUtil.href(
                                        `/learningCenter/test-paper-list/questionBank/KNCS/${this.classId}?baseSubjectId=${this.subjectId}&ctapId=${this.ctapId}&projectCode=${this.projectInfo.projectCode}&questionBankStatus=special`
                                    );
                                }, 100);
                            }}
                        >
                            <div class="icon">
                                <img class="img" src={require('./asset/images/icon4.png')} />
                            </div>
                            <div class="link">
                                SVIP精题库<span class="right">></span>
                            </div>
                            <div class="tip question-bank">进阶精题，一题会多题</div>
                        </div>
                    )}
                    {this.ruralPlanner === false && (
                        <div class="item">
                            <div class="progress" style="height: 64px;width: 64px">
                                <ProgressView rate={this.rate} />
                            </div>
                            <div class="link">听课率</div>
                            <div class="tip">只计算必修课</div>
                        </div>
                    )}

                    <div
                        style={this.ruralPlanner === true ? 'display: none' : ''}
                        class="item"
                        onClick={() => {
                            const data = {
                                college_name: '',
                                page_name: '学习中心-课程详情',
                                project_name: this.projectName ? this.projectName : this.projectId,
                            };
                            this.$yiguan.learningCenter('web_learning_center_learning_report', data);
                            setTimeout(() => {
                                this.$PageUtil.openNewPage(
                                    `/learningCenter/classLearningReport/${this.classId}?ctapId=${this.ctapId}&projectId=${this.projectId}`
                                );
                            }, 100);
                        }}
                    >
                        <div class="icon">
                            <img class="img" src={require('./asset/images/icon2.png')} />
                        </div>
                        <div class="link">
                            我的学习报告<span class="right">></span>
                        </div>
                        <div class="tip">精准诊断与分析</div>
                    </div>

                    <div
                        class="item"
                        onClick={() => {
                            this.showDialog();
                        }}
                    >
                        <div class="icon">
                            <img class="img" src={require('./asset/images/icon3.png')} />
                        </div>
                        <div class="link">
                            我的学管师<span class="right">></span>
                        </div>
                        <div class="tip">全程陪伴督学</div>
                    </div>
                </div>
                {false && this.showType === 'class' && (
                    <div class="total">
                        <div class="intro">
                            <div class="title">听课率</div>
                            <div class="txt">只计算必修课</div>
                        </div>
                        <div class="progress">
                            <ProgressView rate={this.rate} />
                        </div>
                    </div>
                )}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.progress {
    position: relative;
    margin: 0 auto;
    .num-wrap {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        align-items: center;
        transform: translate(-50%, -50%);

        .num {
            font-size: 18px;
            font-weight: bold;
            color: #333333;
        }

        .num2 {
            font-size: 12px;
            color: #333;
            transform: scale(0.8);
            display: inline-block;
            line-height: 1;
            padding-top: 8px;
            vertical-align: bottom;
        }
    }
}
.statistics-view {
    // height: 256px;
    background: #ffffff;
    border-radius: 8px;
    padding-top: 6px;
    padding-bottom: 28px;

    .top {
        padding: 0 20px;
        display: flex;
        flex-wrap: wrap;
        .item {
            text-align: center;
            cursor: pointer;
            width: 102px;
            padding: 18px 20px 0 20px;
            // margin: 0 20px;
            // padding-top: 18px;
            .icon {
                margin: 0 auto;
                width: 64px;
                height: 64px;

                .img {
                    width: 100%;
                    height: 100%;
                }
            }
            .link {
                padding-top: 6px;
                font-size: 14px;
                color: #333;
                line-height: 1;

                .right {
                    margin-left: 4px;
                }
            }
            .tip {
                padding-top: 12px;
                font-size: 12px;
                color: #8d90aa;
                line-height: 1;
            }
            .question-bank {
                white-space: nowrap;
            }
        }
    }
    .total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 15px;
        margin-top: 24px;
        padding: 0 16px;
        box-sizing: border-box;
        height: 80px;
        background: #fbfbfc;
        border-radius: 6px;

        .title {
            font-size: 14px;
            color: #333333;
            line-height: 1;
        }
        .txt {
            padding-top: 8px;
            font-size: 12px;
            color: #8d90aa;
            line-height: 1;
        }
    }
}
</style>
