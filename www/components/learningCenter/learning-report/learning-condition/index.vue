<template>
    <div class="section-one">
        <div class="class-name">{{ dataStat.className }}</div>
        <div class="learning-condition">
            学习情况
            <div class="file-entry" @click="toArchivesReport" v-if="isArchiveStatus">
                查看考后存档的听课率
                <img src="./asset/images/more.png" />
            </div>
        </div>
        <span class="learning-progress-text">班级学习进度</span>
        <div class="learning-progress">
            <ul>
                <li>
                    <span class="learning-progress-type">已学习天数</span>
                    <span class="learning-progress-num">{{ dataStat.ucarDaycount }}天</span>
                    <img src="./asset/images/r-date.png" alt="" />
                </li>
                <li>
                    <span class="learning-progress-type">听课时长</span>
                    <span class="learning-progress-num">{{ dataStat.ucarDurationcount | timeForm }}</span>
                    <img src="./asset/images/r-time.png" alt="" />
                </li>
                <li>
                    <span class="learning-progress-type">开始学习时间</span>
                    <span class="learning-progress-num">{{ dataStat.ucarFirsttime }}</span>
                    <img src="./asset/images/r-starttime.png" alt="" />
                </li>
                <li>
                    <span class="learning-progress-type">过期时间</span>
                    <span class="learning-progress-num">{{ dataStat.studentclassExpiredate }}</span>
                    <img src="./asset/images/r-pasttime.png" alt="" />
                </li>
            </ul>
            <div class="tingKeLv-chart">
                <el-popover effect="light" trigger="hover" placement="top" content="听课率=已学必修网课总数/班级必修网课总数" popper-class="el-popover2">
                    <div slot="reference"><progress-bar v-if="tingKeLvOption" :option="tingKeLvOption" :key="'tingKeLv'"></progress-bar></div>
                </el-popover>
                <div>
                    听课率：
                    <span>{{ dataStat.ucsCompulsoryLearnedNumber }}</span>
                    / {{ dataStat.ucsCompulsoryTotal }}
                </div>
            </div>
            <div class="learning-progress-chart">
                <el-popover
                    effect="light"
                    trigger="hover"
                    placement="top"
                    content="学习进度=已学网课总数（含选修和必修课）/班级网课总数"
                    popper-class="el-popover2"
                >
                    <div slot="reference">
                        <progress-bar v-if="learningProgressOption" :option="learningProgressOption" :key="'learningProgress'"></progress-bar>
                    </div>
                </el-popover>
                <div>
                    学习进度：
                    <span>{{ dataStat.ucarLearnedcount }}</span>
                    / {{ dataStat.ucarCwcount }}
                </div>
            </div>
        </div>
        <div class="subject-progress">
            <span class="subject-progress-text">科目学习进度与做题进度</span>
            <div v-swiper:mySwiper="swiperOption">
                <ul class="swiper-wrapper">
                    <li
                        class="swiper-slide"
                        :class="currentSubject.subjectId === item.subjectId ? 'active' : ''"
                        v-for="(item, index) in dataSubject.subjectList"
                        :key="item.subjectId"
                        @click="handleCurrentSubject(item)"
                    >
                        {{ item.subjectName }}
                        <div v-if="index !== dataSubject.subjectList.length - 1" class="divider" :key="index"></div>
                    </li>
                </ul>
                <span class="to-left swiper-button-prev"><img src="./asset/images/to-next.png" alt="" /></span>
                <span class="to-right swiper-button-next">
                    <img src="./asset/images/to-next.png" alt="" />
                </span>
            </div>
        </div>
        <div class="subject-progress-detail">
            <div class="subject-progress-num">
                共做题
                <span class="red-num">{{ answerTotal }}</span>
                道
                <span class="accuracy">正确率</span>
                <span class="red-num">{{ Math.round(rightRate) }}%</span>
            </div>
            <div class="open-list-load" v-if="isLoading && first != -1"><loading class="loading"></loading></div>
            <ul v-if="dataModule.length !== 0">
                <li v-for="(item, index) in dataModule" :key="index">
                    <progress-bar v-if="item.option" :option="item.option" :key="$DateUtil.getUUID()"></progress-bar>
                    <span :class="item.modulLearningRate === '0' ? 'gray' : ''">{{ item.modulName }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { popover } from 'element-ui';
import Vue from 'vue';
import ProgressBar from '../../learning-report/progress-bar/index.vue';
import '@/api/cc/api..query-class-subjects.js'; //接口-科目列表
import '@/api/igt/api..question-subject-report.js'; //接口-学习报告做题统计
import '@/api/cc/api..class-module-learning-report.js'; //接口-模块列表
import Loading from '@/plugins/loading/index.vue';
Vue.use(popover);
export default {
    name: 'index',
    components: { ProgressBar, Loading },
    filters: {
        timeForm(value) {
            if (value === 0) {
                return value;
            }
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
    props: {
        // 是否已经归档
        isArchiveStatus: {
            type: Boolean,
            default: false,
        },
        dataStat: {
            type: Object,
            default: () => {
                return null;
            },
        },
        dataSubject: {
            type: Object,
            default: () => {
                return null;
            },
        },
    },
    data() {
        return {
            swiperOption: {
                centeredSlides: false,
                slidesPerView: 'auto',
                freeMode: true,
                navigation: {
                    nextEl: '.to-right',
                    prevEl: '.to-left',
                },
            },
            classId: '',
            currentSubject: null,
            answerTotal: 0,
            rightRate: 0,
            dataModule: [],
            defOption: {
                width: 150,
                height: 120,
                strokeWidth: 10,
                percent: 0.2,
                circleColor: 'rgba(255, 236, 232, 0.5)',
                textColor: '#F8323C',
                radius: 45,
                fontSize: '16px',
                text: '',
            },
            tingKeLvOption: null,
            learningProgressOption: null,
            isLoading: false,
            first: -1,
        };
    },
    watch: {
        dataSubject: {
            handler(newVal, oldVal) {
                if (newVal && newVal.subjectList.length > 0) {
                    this.currentSubject = newVal.subjectList[0];
                }
            },
            immediate: true,
        },
        currentSubject: {
            handler(newVal, oldVal) {
                this.isLoading = true;
                if (newVal) {
                    this.getSubjectReport();
                    this.getClassModule();
                }
            },
            immediate: true,
        },
    },
    mounted() {
        this.tingKeLvOption = { ...this.defOption };
        this.tingKeLvOption.percent = this.dataStat.ucsCompulsoryRate / 100;
        this.tingKeLvOption.text = this.dataStat.ucsCompulsoryRate + '%';

        this.learningProgressOption = { ...this.defOption };
        this.learningProgressOption.percent = this.dataStat.ucarRate / 100;
        this.learningProgressOption.text = this.dataStat.ucarRate + '%';
    },
    methods: {
        toArchivesReport() {
            this.$router.push(
                `/pro-course-report/acchives/${this.$route.params.classId}?ctapId=${this.$route.query.ctapId}&projectId=${this.$route.query.projectId}`
            );
        },
        handleCurrentSubject(val) {
            this.currentSubject = val;
        },
        getSubjectReport() {
            //igt/user/question/subject/report/static
            this.$callApi('igt/question-subject-report', {
                classId: this.$route.params.classId,
                subjectId: this.currentSubject.subjectId,
                onsuccess: (result) => {
                    this.answerTotal = result.answerTotal;
                    this.rightRate = result.rightRate;
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        getClassModule() {
            this.dataModule = [];
            //cc/user/class/info/learning/report
            let ctapId = this.$route.query.ctapId;
            if (!/^ctap/i.test(ctapId)) {
                ctapId = '';
            }
            this.$callApi('cc/class-module-learning-report', {
                classId: this.$route.params.classId,
                subjectId: this.currentSubject.subjectId,
                pypId: this.dataSubject.pypId,
                classTypeId: this.dataSubject.classTypeId,
                ctapId,
                onsuccess: (result) => {
                    result.forEach((item, index) => {
                        let option = { ...this.defOption };
                        option.percent = parseFloat(item.modulLearningRate / 100);
                        if (item.modulLearningRate === '0') {
                            option.circleColor = '#F5F6F9';
                            option.textColor = '#97a1b0';
                        }
                        option.width = 134;
                        option.radius = 35;
                        option.fontSize = '14px';
                        option.text = item.modulLearningRate + '%';
                        item.option = option;
                    });
                    this.dataModule = result;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.first++;
                    this.isLoading = false;
                },
            });
        },
    },
};
</script>

<style scoped lang="less">
.section-one {
    background: #ffffff;
    border-radius: 6px;
    padding: 0 30px 30px;

    .class-name {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        color: #333333;
        line-height: 86px;
        border-bottom: 1px dashed #e1e5ee;
    }
    .learning-condition {
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        margin-top: 32px;
        margin-bottom: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .file-entry {
            display: flex;
            align-items: center;
            font-size: 12px;
            font-weight: 400;
            text-align: center;
            color: #f8323c;
            line-height: 24px;
            cursor: pointer;

            img {
                width: 16px;
                height: 16px;
            }
        }
    }
    .learning-progress-text {
        display: inline-block;
        font-size: 18px;
        color: #333333;
        margin-bottom: 20px;
    }
    .learning-progress {
        display: flex;
        position: relative;
        ul {
            flex: 1;
            li {
                width: 187px;
                height: 72px;
                background: #fbfbfc;
                border-radius: 6px;
                float: left;
                padding-left: 16px;
                box-sizing: border-box;
                position: relative;
                margin-right: 24px;

                .learning-progress-type {
                    font-size: 14px;
                    color: #333333;
                    display: block;
                    margin-top: 18px;
                    margin-bottom: 7px;
                }
                .learning-progress-num {
                    font-size: 14px;
                    color: #999999;
                    display: block;
                }
                img {
                    width: 48px;
                    height: 48px;
                    position: absolute;
                    right: 16px;
                    top: 12px;
                }
                &:last-child {
                    margin-right: 0;
                }
            }
        }
        .tingKeLv-chart,
        .learning-progress-chart {
            width: 150px;
            height: 150px;
            font-size: 14px;
            text-align: center;
            color: #333333;
            position: absolute;
            top: -40px;
            right: 150px;
            span {
                color: #f8323c;
            }
        }
        .learning-progress-chart {
            right: 0;
        }
    }
    .subject-progress {
        margin-top: 60px;
        margin-bottom: 15px;
        .subject-progress-text {
            font-size: 18px;
            color: #333333;
            margin-right: 24px;
            float: left;
        }
        div {
            flex: 1;
            height: 23px;
            ul {
                position: relative;
                li {
                    font-size: 16px;
                    color: #333333;
                    padding-left: 24px;
                    float: left;
                    cursor: pointer;
                    .divider {
                        margin-left: 24px;
                        width: 1px;
                        height: 10px;
                        background: #d5d9d9;
                        float: right;
                        position: relative;
                        top: 7px;
                    }
                    &:last-child {
                        padding-right: 24px;
                    }
                }
                .active {
                    font-size: 18px;
                    font-weight: bold;
                    color: #ff2e30;
                }
            }
            .to-right,
            .to-left {
                position: absolute;
                right: 0;
                top: 22px;
                bottom: 0;
                width: 23px;
                height: 23px;
                background: #ffffff;
                cursor: pointer;
                z-index: 10;
                img {
                    width: 16px;
                    height: 16px;
                    margin-top: 3px;
                    margin-left: 7px;
                }
            }
            .to-left {
                left: 0;
                img {
                    transform: rotate(180deg);
                    margin-top: 3px;
                    margin-left: 0;
                }
            }
        }
    }
    .subject-progress-detail {
        background: #fbfbfc;
        border-radius: 6px;
        .subject-progress-num {
            font-size: 16px;
            color: #333333;
            padding-top: 28px;
            margin-left: 30px;
        }
        .red-num {
            font-size: 20px;
            font-weight: bold;
            color: #ff002f;
        }
        .accuracy {
            margin-left: 28px;
        }
        ul {
            display: flex;
            flex-wrap: wrap;
            padding-left: 22px;
            li {
                width: 134px;
                text-align: center;
                float: left;
                margin-left: 8px;
                margin-right: 24px;
                div {
                    width: 134px;
                    height: 100px;
                }
                span,
                .gray {
                    padding-left: 10px;
                    padding-right: 10px;
                    background: linear-gradient(90deg, #f07963 0%, #e73928 100%);
                    border-radius: 16px;
                    box-shadow: 0px 4px 6px -2px rgba(231, 57, 40, 0.3);
                    font-size: 12px;
                    text-align: center;
                    color: #ffffff;
                    line-height: 22px;
                    margin: 0 auto;
                    position: relative;
                    top: -10px;
                    margin-bottom: 10px;
                    max-width: 100%;
                    box-sizing: border-box;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                .gray {
                    background: #ffffff;
                    border: 1px solid #d9d9d9;
                    box-shadow: 0px 4px 6px -2px rgba(192, 192, 192, 0.3);
                    color: #333333;
                }
            }
        }
    }
}
/deep/.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
    opacity: 0;
}
.swiper-slide {
    text-align: center;
    width: auto !important;
}
.open-list-load {
    height: 166px;
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
<style lang="less">
// .el-popover1 {
//     position: absolute;
//     background: rgba(0, 0, 0, 0.6);
//     min-width: 150px;
//     border-radius: 8px;
//     border: 1px solid #ebeef5;
//     padding: 14px 24px;
//     z-index: 2000;
//     line-height: 1.4;
//     text-align: justify;
//     font-size: 12px;
//     box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
//     word-break: break-all;
//     color: #ffffff;
// }
// .el-popper[x-placement^='top'] {
//     .popper__arrow::after {
//         border-top-color: #666666 !important;
//     }
// }
</style>
