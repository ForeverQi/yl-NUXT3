<template>
    <div class="section-two" v-if="suggestList.length > 0">
        <div class="advice-title">总体建议</div>
        <div class="advice-section">
            <div class="advice-section-left" v-if="isShowSeeClass">
                <div class="see-class">看课</div>
                <div class="see-class-echart" ref="seeClassEchart"></div>
            </div>
            <div class="advice-section-right" v-if="isShowDoExercise">
                <div class="see-class">做题</div>
                <div class="do-exercise-echart" ref="doExerciseEchart"></div>
            </div>
        </div>
        <div class="suggest" v-if="seeClassSuggest || doExerciseSuggest">
            <p v-if="seeClassSuggest" v-html="seeClassSuggest"></p>
            <p v-if="doExerciseSuggest" v-html="doExerciseSuggest">{{ doExerciseSuggest }}</p>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import '@/api/igt/api..user-class-suggest.js';
import { parse } from 'html5parser';
export default {
    name: 'index',
    props: {
        pypId: {
            type: String,
            default: '',
        },
        ucsCompulsoryRate: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            option: {
                tooltip: {
                    trigger: 'axis',
                    show: false,
                    formatter: '{c}%',
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
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}%',
                            textStyle: {
                                color: 'rgba(0,0,0,0.65)',
                            },
                        },
                    },
                ],
            },
            suggestList: [],
            seeClassSuggest: '',
            doExerciseSuggest: '',
            isShowSeeClass: false,
            isShowDoExercise: false,
        };
    },
    mounted() {
        this.getSuggest();
    },
    methods: {
        getSuggest() {
            // igt/user/class/suggest
            this.$callApi('igt/user-class-suggest', {
                classId: this.$route.params.classId,
                pypId: this.pypId,
                ucsCompulsoryRate: this.ucsCompulsoryRate,
                onsuccess: (result) => {
                    this.suggestList = result;
                    if (result.length > 0) {
                        result.forEach((item) => {
                            if (item.type === 'C') {
                                this.isShowSeeClass = true;
                                let seeClassOption = JSON.parse(JSON.stringify(this.option));
                                seeClassOption.xAxis.data = ['我的听课率', '同期学员平均听课率'];
                                seeClassOption.series[0].data = [];
                                seeClassOption.series[0].data.push(item.selfRate);
                                seeClassOption.series[0].data.push(item.avgRate);
                                this.$nextTick(() => {
                                    let seeClassEchart = echarts.init(this.$refs.seeClassEchart);
                                    seeClassEchart.setOption(seeClassOption);
                                });

                                let nodeArr = parse(item.content);
                                this.seeClassSuggest = this.$html5parserUtil.rewriteHTML(nodeArr);
                            } else {
                                this.isShowDoExercise = true;
                                let doExerciseOption = JSON.parse(JSON.stringify(this.option));
                                doExerciseOption.xAxis.data = ['我的正确率', '同期学员平均正确率'];
                                doExerciseOption.series[0].data = [];
                                doExerciseOption.series[0].data.push(item.selfRate);
                                doExerciseOption.series[0].data.push(item.avgRate);
                                this.$nextTick(() => {
                                    let doExerciseEchart = echarts.init(this.$refs.doExerciseEchart);
                                    doExerciseEchart.setOption(doExerciseOption);
                                });
                                let nodeArr = parse(item.content);
                                this.doExerciseSuggest = this.$html5parserUtil.rewriteHTML(nodeArr);
                            }
                        });
                    }
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
    padding-bottom: 32px;
    border-radius: 6px;
}
.advice-title {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    line-height: 88px;
    padding-left: 30px;
    margin-top: 16px;
}
.advice-section {
    display: flex;
}
.advice-section-left {
    flex: 1;
}

.advice-section-right {
    flex: 1;
}
.see-class {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    padding-left: 110px;
}
.see-class-echart {
    padding-left: 80px;
    width: 506px;
    height: 400px;
    margin-top: -20px;
}

.do-exercise-echart {
    padding-left: 80px;
    width: 506px;
    height: 400px;
    margin-top: -20px;
}

.suggest {
    width: 1072px;
    background: #fbfbfc;
    border-radius: 6px;
    margin-left: 64px;
    padding: 12px 24px 20px;
    font-size: 14px;
    color: #99a1af;
    box-sizing: border-box;
    p {
        word-break: break-all;
        margin-top: 8px;
    }
}
canvas {
    right: 0 !important;
    bottom: 0 !important;
}
</style>
