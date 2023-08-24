<script lang="jsx">
import '@/api/cc/api.CC3101.query-my-class-stat.js'; // 接口-我的班级统计
import '@/api/api..check-rural-planner-course.js';
import '@/api/api..query-class-archive-report.js';
import CircleProgress from '@/www/components/learningCenter/report-archives/progress-view/index.vue';
export default {
    components: {
        CircleProgress,
    },
    /**
     * @returns {object} 默认值
     */
    data() {
        return {
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
                    name: '我的学习报告(已存档)',
                    href: '#',
                },
            ],
            reportInfo: {
                className: '', // 班级名称
                ucarRate: '0%',
                ucsCompulsoryRate: '0%',
            },
            isRuralPlanner: false, // 是否是乡村规划师
        };
    },
    /**
     *
     */
    mounted() {
        this.getCheckProject().then(() => {
            this.getArchiveReport();
        });
    },
    methods: {
        /**
         * @returns {Promise} 是否是乡村规划师
         */
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
        /**
         * 班级归档统计
         */
        getArchiveReport() {
            this.$httpClient({
                url: 'cc/query-class-archive-report',
                params: {
                    classId: this.$route.params.classId,
                },
            })
                .then((res) => {
                    this.crumbs[3].name = res.className;
                    this.reportInfo = res;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        /**
         *
         * @param {number} value 学习时长单位秒
         * @returns {string} 格式化后的时间
         */
        timeForm(value) {
            value = parseInt(value);
            if (value === 0) {
                return value;
            }
            let h = Math.floor(value / 3600);
            let m = Math.ceil((value % 3600) / 60);
            let timeForm1 = '';
            if (h > 0) {
                timeForm1 = timeForm1 + h + '<span>小时</span>';
            }
            if (m > 0) {
                timeForm1 = timeForm1 + m + '<span>分钟</span>';
            }
            return timeForm1;
        },
    },
    /**
     * @returns {object} 虚拟dom
     */
    render() {
        return (
            <div class="report-archives">
                <yl-breadcumb items={this.crumbs} class="breadcrumb"></yl-breadcumb>
                <div class="report-content">
                    <div class="title">听课率存档</div>
                    <div class="main">
                        <div class="left">
                            <div class="course-name">{this.reportInfo.className}</div>
                            <div class="data">
                                <div class="item">
                                    <div class="icon-img">
                                        <img src={require('./asset/images/date.png')} />
                                    </div>
                                    <div class="content">
                                        <div class="num">{this.reportInfo.ucarDaycount ? this.reportInfo.ucarDaycount : 0}</div>
                                        <div class="tip">已学习天数</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="icon-img">
                                        <img src={require('./asset/images/time.png')} />
                                    </div>
                                    <div class="content">
                                        <div class="num" domPropsInnerHTML={this.timeForm(this.reportInfo.ucarDurationcount)}></div>
                                        <div class="tip">听课时长</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="icon-img">
                                        <img src={require('./asset/images/start.png')} />
                                    </div>
                                    <div class="content">
                                        <div class="num">{this.reportInfo.ucarFirsttime ? this.reportInfo.ucarFirsttime : '--'}</div>
                                        <div class="tip">开始学习时间</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="item">
                                <el-popover trigger="hover" placement="top" content="听课率=已学必修网课总数/班级必修网课总数" popper-class="el-popover1">
                                    <div slot="reference">
                                        <CircleProgress
                                            circleType="rate"
                                            sRate={!this.reportInfo.ucsCompulsoryRate ? 0 : parseFloat(this.reportInfo.ucsCompulsoryRate)}
                                        />
                                    </div>
                                </el-popover>
                                <div class="name">
                                    听课率：<span class="num">{this.reportInfo.ucsCompulsoryLearnedNumber}</span>/
                                    <span class="num2">{this.reportInfo.ucsCompulsoryTotal}</span>
                                </div>
                            </div>
                            <div class="item">
                                <el-popover
                                    trigger="hover"
                                    placement="top"
                                    content="学习进度=已学网课总数（含选修和必修课）/班级网课总数"
                                    popper-class="el-popover1"
                                >
                                    <div slot="reference">
                                        <CircleProgress sRate={!this.reportInfo.ucarRate ? 0 : parseFloat(this.reportInfo.ucarRate)} />
                                    </div>
                                </el-popover>
                                <div class="name">
                                    学习进度：<span class="num">{this.reportInfo.ucarLearnedcount}</span>/
                                    <span class="num2">{this.reportInfo.ucarCwcount}</span>
                                </div>
                            </div>
                        </div>
                        <div class="mask"></div>
                    </div>
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.report-archives {
    .report-content {
        width: 1200px;
        height: 556px;
        background: #ffffff;
        border-radius: 6px;
        margin-bottom: 20px;

        .title {
            padding-top: 24px;
            padding-bottom: 32px;
            font-size: 24px;
            font-weight: 500;
            text-align: center;
            color: #001c48;
            line-height: 36px;
            font-weight: bold;
        }
        .main {
            position: relative;
            display: flex;
            width: 1114px;
            height: 327px;
            margin: 0 auto;
            background-image: url(./asset/images/bg.png);
            background-size: 100% 100%;

            .left {
                padding-left: 60px;
                padding-top: 77px;
                .course-name {
                    font-size: 20px;
                    font-weight: 700;
                    text-align: left;
                    color: #333333;
                    line-height: 30px;
                    padding-bottom: 32px;
                    width: 510px;
                }
                .data {
                    width: 510px;
                    height: 72px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 26px;
                    background-color: rgba(255, 255, 255, 0.73);
                    border-radius: 6px;
                    .item {
                        display: flex;
                        box-sizing: border-box;
                        .icon-img {
                            width: 40px;
                            height: 40px;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .content {
                            padding-left: 12px;
                            .num {
                                font-size: 18px;
                                font-weight: 700;
                                text-align: left;
                                color: #3a3d4b;
                                line-height: 20px;

                                /deep/ span {
                                    font-size: 12px;
                                }
                            }
                            .tip {
                                padding-top: 4px;
                                font-size: 12px;
                                font-weight: 400;
                                color: #99a1af;
                                line-height: 12px;
                            }
                        }
                    }
                }
            }
            .mask {
                position: absolute;
                width: 114px;
                height: 90px;
                top: 0;
                right: 64px;
                background-image: url(./asset/images/mask.png);
                background-size: 100% 100%;

                .time {
                    font-size: 12px;
                    font-weight: 400;
                    text-align: center;
                    color: #f8323c;
                    line-height: 17px;
                    padding-top: 40px;
                    display: block;
                }
            }
            .right {
                display: flex;
                padding-top: 100px;
                padding-left: 36px;

                .item {
                    width: 90px;
                    height: 90px;
                    margin-left: 32px;

                    .name {
                        // width: 116px;
                        white-space: nowrap;
                        font-size: 14px;
                        font-weight: 400;
                        text-align: left;
                        color: #333333;
                        line-height: 21px;
                        .num {
                            color: #057aff;
                        }
                    }
                }
            }
        }
    }
}
</style>
