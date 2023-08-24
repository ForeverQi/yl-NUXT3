<template>
    <div class="section-two" v-if="dataRanking.length > 0 || dataWeekStudy.length > 0">
        <div class="study-ranking">学习排名情况</div>
        <div class="study-ranking-section">
            <div class="study-ranking-left" v-if="dataRanking.length">
                <div class="study-ranking-title">近一周学霸排行榜</div>
                <ul class="study-ranking-ul">
                    <template v-for="(item, index) in dataRanking">
                        <li :key="index" :class="user.userId === item.userId ? 'my-rank' : ''" v-if="item.studyDuration">
                            <div class="one">
                                <img v-if="index + 1 === 1" src="./asset/images/num1.png" alt="" />
                                <img v-else-if="index + 1 === 2" src="./asset/images/num2.png" alt="" />
                                <img v-else-if="index + 1 === 3" src="./asset/images/num3.png" alt="" />
                                <div v-else class="num">{{ index + 1 }}</div>
                                <div class="youlu-num">{{ user.userId === item.userId ? '我' : item.userYouluNum }}</div>
                                <div class="stuty-time">学习时长：{{ item.studyDuration | timeForm }}</div>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
            <div class="study-ranking-right">
                <div class="week-study">近一周学习情况</div>
                <div class="week-study-echart" ref="WeekStudyEchart"></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import dayjs from 'dayjs';
import '@/api/cc/api..query-study-duration-rank.js';
import '@/api/cc/api..query-study-duration-histogram.js';
export default {
    name: 'index',
    filters: {
        timeForm(value) {
            let h = Math.floor(value / 3600);
            let m = Math.ceil((value % 3600) / 60);
            let timeForm1 = '';
            if (h > 0) {
                timeForm1 = timeForm1 + h + '小时';
            }
            if (m > 0) {
                timeForm1 = timeForm1 + m + '分钟';
            }
            return timeForm1;
        },
    },
    data() {
        return {
            option: {
                tooltip: {
                    trigger: 'axis',
                    formatter(params) {
                        let h = Math.floor(params[0].value / 60);
                        let m = Math.ceil(params[0].value % 60);
                        let timeForm1 = '';
                        if (h > 0) {
                            timeForm1 = timeForm1 + h + '小时';
                        }
                        if (m > 0) {
                            timeForm1 = timeForm1 + m + '分钟';
                        }
                        return timeForm1;
                    },
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    axisLine: {
                        lineStyle: {
                            color: '#e9e9e9',
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: '#e9e9e9',
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(0,0,0,0.65)',
                        },
                        fontSize: 12,
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#e9e9e9',
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(0,0,0,0.65)',
                        },
                        fontSize: 12,
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#e9e9e9',
                            type: 'dashed',
                        },
                    },
                },
                series: [
                    {
                        barWidth: 20,
                        data: [],
                        type: 'bar',
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: '#3f99ff', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#057aff', // 100% 处的颜色
                                    },
                                ],
                                false
                            ),
                        },
                    },
                ],
            },
            dataRanking: [],
            dataWeekStudy: [],
            user: {},
        };
    },
    mounted() {
        this.getUser();
        this.getStudyRanking();
        this.getLatestWeekStudy();
    },
    methods: {
        getUser() {
            ylPlugin.login.getUser().then(
                (user) => {
                    /* 获取登录信息的过程中没有失败 */
                    if (null == user) {
                        return;
                    }
                    this.user = user;
                },
                (err) => {
                    /* 获取登录信息的过程中有失败 */
                    console.error(err);
                }
            );
        },
        getStudyRanking() {
            // 近一周学霸排行榜cc/user/stats/top/study-duration
            this.$callApi('cc/query-study-duration-rank', {
                classId: this.$route.params.classId,
                onsuccess: (result) => {
                    this.dataRanking = result;
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        getLatestWeekStudy() {
            // 我近一周学习情况cc/user/stats/histogram/study-duration
            this.$callApi('cc/query-study-duration-histogram', {
                classId: this.$route.params.classId,
                onsuccess: (result) => {
                    this.dataWeekStudy = result;
                    let dataXAxis = [];
                    let dataStudyDuration = [];
                    for (let i = this.dataWeekStudy.length - 1; i > -1; i--) {
                        dataXAxis.push(dayjs(this.dataWeekStudy[i].date).month() + 1 + '.' + dayjs(this.dataWeekStudy[i].date).date() + '号');
                        dataStudyDuration.push(Math.ceil(this.dataWeekStudy[i].studyDuration / 60));
                    }
                    this.option.xAxis.data = dataXAxis;
                    this.option.series[0].data = dataStudyDuration;
                    this.$nextTick(() => {
                        let chart = echarts.init(this.$refs.WeekStudyEchart);
                        chart.setOption(this.option);
                    });
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
    },
};
</script>

<style scoped lang="less">
.section-two {
    background: #ffffff;
    padding-bottom: 48px;
    border-radius: 6px;
    margin-bottom: 50px;
}
.study-ranking {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    line-height: 88px;
    padding-left: 2px;
    border-bottom: 1px dashed #e1e5ee;
    margin: 16px 30px 30px;
}
.study-ranking-section {
    display: flex;
    margin-left: 64px;
}
.study-ranking-left {
    width: 492px;
    margin-right: 56px;
    border-radius: 14px;
    overflow: hidden;

    .study-ranking-title {
        background: url('./asset/images/study-ranking-title.png') no-repeat;
        background-size: 100% 100%;
        height: 78px;
        line-height: 78px;
        font-size: 18px;
        font-weight: bold;
        color: #6a4310;
        padding-left: 20px;
        box-sizing: border-box;
    }
    .study-ranking-ul {
        background: #fdfcf9;
        li {
            line-height: 60px;
            color: #333333;
            font-size: 14px;
            padding-left: 32px;
            padding-right: 32px;
            .one {
                display: flex;
                align-items: center;
                border-bottom: 1px solid #eaebf0;
                img {
                    width: 32px;
                    height: 32px;
                    margin-left: 16px;
                }
                div {
                    flex: 1;
                }
                .num {
                    width: 32px;
                    flex: inherit;
                    text-align: center;
                    margin-left: 16px;
                }
                .youlu-num {
                    flex: 2;
                    text-align: center;
                }
                .stuty-time {
                    flex: 2;
                }
            }
            &:last-child {
                border-bottom: 0px;
                .one {
                    border-bottom: 0;
                }
            }
        }
        .my-rank {
            color: #ff2e30;
            background: #f6f7f9;
        }
    }
}

.study-ranking-right {
    .week-study {
        font-size: 18px;
        font-weight: bold;
        color: #333333;
    }
    .week-study-echart {
        width: 606px;
        height: 400px;
    }
}
</style>
