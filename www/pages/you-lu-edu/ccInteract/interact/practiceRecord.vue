<template>
    <div>
        <!--本节课练习记录-->
        <div class="practice_record_box" v-if="isLoad">
            <img class="closed_btn" src="./asset/images/closed.png" @click="closed" />
            <div class="record_box">
                <div class="title">练习报告</div>
                <div class="cnt">
                    <div class="result" v-if="practiceRecords.length > 0">
                        <div class="record-list" v-if="isRecord">
                            <div class="item flex flex-between" v-for="(item, index) in practiceRecords" :key="index">
                                <div class="item-l">
                                    <div class="tit">{{ index + 1 }}、{{ item.keyframeName }}</div>
                                    <div class="des">
                                        <span>
                                            <img src="./asset/images/icon-ts.png" />
                                            试题数量：{{ item.questionTotal }}
                                        </span>
                                        <span>
                                            <img src="./asset/images/icon-zqs.png" />
                                            正确率：{{ item.answerRightprob }}%
                                        </span>
                                        <span style="margin-right: 0px">
                                            <img src="./asset/images/icon-ys.png" />
                                            用时：{{ $DateUtil.getTimeString(item.answersheetDurationtime) }}
                                        </span>
                                    </div>
                                </div>
                                <div class="flex">
                                    <span class="deal all" @click="lookAnalysis('all', item)">全部解析</span>
                                    <span class="deal error" @click="lookAnalysis('error', item)">错题解析</span>
                                </div>
                            </div>
                        </div>
                        <div class="full-analysis" v-if="isAnalysis">
                            <div class="analysis-tit flex flex-between ai-center">
                                <div class="flex row ai-center tit-box">
                                    <span class="tit" v-if="analysisType == 'all'">全部解析</span>
                                    <span class="tit" v-if="analysisType == 'error'">错题解析</span>
                                    <div class="flex row ai-center tit-c" v-if="analysisType == 'all' || analysisType == 'error'">
                                        <div class="progress-txt">
                                            <span class="cur">{{ curPage }}</span>
                                            /{{ questions.length }}
                                        </div>
                                        <div class="flex progress-box">
                                            <div class="cur-progress" :style="'width:' + curprogress"></div>
                                            <div class="progress"></div>
                                        </div>
                                    </div>
                                </div>
                                <span class="return-btn" @click="returnRecord">返回</span>
                            </div>
                            <div class="question-box">
                                <template v-for="(question, index) in questions">
                                    <div class="question" :key="index" v-if="index + 1 == curPage">
                                        <div class="question_tg" v-if="question.hasQuestionstem">
                                            <co-parse :article="question.questionstem.title" />
                                        </div>
                                        <div class="tit">
                                            {{ index + 1 }}.
                                            <span v-if="question.type == 'S'">【单选题】</span>
                                            <span v-if="question.type == 'M'">【多选题】</span>
                                            <span v-if="question.type == 'I'">【不定项选择题】</span>
                                            <span v-if="question.type == 'J'">【判断题】</span>
                                            <span v-if="question.type == 'F'">【填空题】</span>
                                            <span v-if="question.type == 'O'">【主观题】</span>
                                            <span v-if="question.type == 'A'">【案例分析题】</span>
                                            <span v-if="question.type == 'C'">【配伍题】</span>
                                            <co-parse :article="question.title" />
                                        </div>
                                        <ul class="choose">
                                            <li v-for="(option, index2) in question.options" :key="index2 + 'a'">
                                                <img src="./asset/images/q-check.png" v-if="!option.rightCheck && !option.check" />
                                                <img src="./asset/images/q-true-check.png" v-if="option.rightCheck && !option.check" />
                                                <img src="./asset/images/q-mytrue-check.png" v-if="option.rightCheck && option.check" />
                                                <img src="./asset/images/q-myfalse-check.png" v-if="!option.rightCheck && option.check" />
                                                <span v-if="question.type != 'J'">{{ option.type }}.</span>
                                                <co-parse :article="option.content" />
                                            </li>
                                        </ul>
                                        <div class="answer">
                                            <div class="da">
                                                <p>
                                                    我的答案：
                                                    <span class="my-answer" v-if="question.type == 'J'">
                                                        <span v-if="question.answerState === 0">未做</span>
                                                        <span v-else-if="question.answerState === 3">错误</span>
                                                        <span v-if="question.answerState === 2">正确</span>
                                                    </span>
                                                    <span class="my-answer" v-else>{{ question.answer ? question.answer : '未做' }}</span>
                                                </p>
                                                <p>
                                                    正确答案：
                                                    <span class="right-answer" v-if="question.type == 'J'">
                                                        {{ question.rightAnswer == 1 ? '正确' : '错误' }}
                                                    </span>
                                                    <span class="right-answer" v-else>{{ question.rightAnswer }}</span>
                                                </p>
                                            </div>
                                            <div class="jx_tit">[答案解析]</div>
                                            <div class="jx">
                                                <co-parse :article="question.answerParse" />
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <!--答题卡-->
                            <div class="navigation-box" v-if="analysisType == 'all' || analysisType == 'error'">
                                <div class="navigation flex flex-between ai-center">
                                    <div class="last" @click="toCurPage(curPage - 1)">
                                        <template v-if="curPage > 1">
                                            <p class="deal"><img src="./asset/images/last.png" /></p>
                                            <p>上题</p>
                                        </template>
                                        <template v-else>
                                            <p class="deal"><img src="./asset/images/last-disable.png" /></p>
                                            <p class="txt-disable">上题</p>
                                        </template>
                                    </div>
                                    <span class="fast-find" @click="showAnswerCard">快速寻题</span>
                                    <div class="next" @click="toCurPage(curPage + 1)">
                                        <template v-if="curPage < questions.length">
                                            <p class="deal"><img src="./asset/images/next.png" /></p>
                                            <p>下题</p>
                                        </template>
                                        <template v-else>
                                            <p class="deal"><img src="./asset/images/next-disable.png" /></p>
                                            <p class="txt-disable">下题</p>
                                        </template>
                                    </div>
                                </div>
                                <div class="q-navigation" v-if="isAnswerCard">
                                    <span class="closed" @click="showAnswerCard">
                                        <img src="./asset/images/close.png" />
                                    </span>
                                    <div class="status-box flex" v-if="analysisType == 'all'">
                                        <ul class="list">
                                            <li>
                                                <span class="mark correct"></span>
                                                正确
                                            </li>
                                            <li>
                                                <span class="mark error"></span>
                                                错误
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="page-list">
                                        <ul class="list">
                                            <li
                                                v-for="(question, index) in questions"
                                                :key="index"
                                                :class="question.answerState == 2 ? 'correct' : 'error'"
                                                @click="toCurPage(index + 1)"
                                            >
                                                {{ index + 1 }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--无数据-->
                    <div class="noresult" v-else>
                        <img src="./asset/images/8.gif" class="img" />
                        <p class="txt">暂无做题记录哦～</p>
                    </div>
                </div>
            </div>
            <div class="statistics_box">
                <div class="title">练习统计</div>
                <div class="cnt">
                    <div class="cnt_t">
                        <ul class="list">
                            <li>
                                <span class="txt">
                                    <img src="./asset/images/statistics-zt.png" />
                                    总题量：
                                </span>
                                <div class="progress">
                                    <div class="curprogress-do" :style="'width: ' + answerprogress"></div>
                                    <div class="curdata">{{ statistics.answerquestionTotal || 0 }}/{{ statistics.questionTotal || 0 }}道</div>
                                </div>
                            </li>
                            <li>
                                <span class="txt">
                                    <img src="./asset/images/statistics-hs.png" />
                                    正确率：
                                </span>
                                <div class="progress">
                                    <div class="curprogress-rate" :style="'width:' + statistics.rightRate + '%'"></div>
                                    <div class="curdata">{{ statistics.rightRate || 0 }}%</div>
                                </div>
                            </li>
                            <li class="mb0">
                                <span class="txt">
                                    <img src="./asset/images/statistics-zql.png" />
                                    总用时：
                                </span>
                                <div class="progress">
                                    <div class="curprogress-time" :style="'width: ' + durationtimerogress"></div>
                                    <div class="curdata">
                                        {{ $DateUtil.getTimeString(statistics.answersheetDurationtime || 0) }}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="cnt_b">
                        <div class="norate-box" v-if="statistics.answerquestionTotal == 0">
                            <p class="norate-tip">未超越任何同学！</p>
                        </div>
                        <div class="rank-box" v-else>
                            <p class="txt">
                                超越了
                                <span>{{ statistics.rankingpassRate || 0 }}%</span>
                                的同学！
                            </p>
                            <div class="img-box"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PaperService from '~/www/common/paper-class/PaperService.js';
import CoParse from '@/www/components/vbParse';
import '@/api/cc/api.CC0002.query-keyframe-info.js';
import '@/api/qb/api.QB2001.query-answersheet-profile-list.js';
import '@/api/qb/api.QB1008.query-answersheet-papers-transcript.js';
export default {
    name: 'practiceRecord',
    components: { CoParse },
    layout: 'nullLayout',
    data() {
        return {
            isLoad: false,
            papersInfo: [],
            //paperIds: 'PAPER20190731330000000002',
            paperIds: '',
            classConvertInfo: {},

            paper: null,
            allQuestions: [],
            questions: [],
            practiceRecords: [], //练习记录
            isRecord: true,
            isAnalysis: false,
            analysisType: 'all',
            isAnswerCard: false,
            curPage: 1,
            statistics: {},
            loading: null,
        };
    },
    computed: {
        // 试卷解析 进度条
        curprogress() {
            return (this.curPage / this.questions.length).toFixed(2) * 100 + '%';
        },
        //做题 进度条
        answerprogress() {
            return (this.statistics.answerquestionTotal / this.statistics.questionTotal).toFixed(2) * 100 + '%';
        },
        //总耗时 进度条
        durationtimerogress() {
            let rate = (this.statistics.answersheetDurationtime / (this.statistics.examDurationtime * 60)).toFixed(2) * 100;
            if (rate >= 100) {
                return '100%';
            } else {
                return rate + '%';
            }
        },
    },
    mounted() {
        console.log('加载~~~111111111');
        var vm = this;
        if (typeof window.addEventListener != 'undefined') {
            //for ie9+
            window.addEventListener(
                'message',
                function (e) {
                    //console.log(e);//{func,args}
                    if (e.data.type == 'webpackOk') return;
                    if (window[e.data.func] != undefined) {
                        window[e.data.func].apply(this, e.data.args ? [e.data.args] : []);
                    }
                },
                false
            );
        } else if (typeof window.attachEvent != 'undefined') {
            window.attachEvent('onmessage', function (e) {
                if (e.data.type == 'webpackOk') return;
                if (window[e.data.func] != undefined) {
                    window[e.data.func].apply(this, e.data.args ? [e.data.args] : []);
                }
            });
        }
        vm.sendMessage('loginedo');
        /*window.loginedo = function (data) {
            vm.$User.setToken(data.token);
            vm.$User.setUser(data.UserInfo);
        };*/
        window.loadClassReport = function (coursewareId) {
            //初始化数据
            vm.init(coursewareId);
            vm.sendMessage('practiceRecord_loaded');
        };
    },
    methods: {
        //发送消息
        sendMessage(func, args) {
            console.log('发送已准备好消息');
            window.parent.postMessage(
                {
                    func,
                    args,
                },
                '*'
            );
        },
        //初始化数据
        init(coursewareId) {
            /*this.Mask.showLoading();*/
            this.loading = this.$baseUI.loading();
            console.log('上看见大富科技是');
            this.$callApi('cc/query-keyframe-info', {
                coursewareId, //课件标识
                coursewareSourceid: '', //课件来源标识
                onsuccess: (data1) => {
                    this.papersInfo = data1.data;
                    //无打点信息return
                    if (data1.data.length == 0) {
                        this.isLoad = true;
                        /*this.Mask.hideLoading();*/
                        this.loading.close();
                        return;
                    }
                    //
                    let papers = [];
                    for (var i = 0; i < this.papersInfo.length; i++) {
                        papers.push(this.papersInfo[i].paperId);
                    }
                    //关联试卷return
                    if (papers.length == 0) {
                        this.isLoad = true;
                        this.loading.close();
                        return;
                    }

                    this.paperIds = papers.join(',');

                    this.$callApi('qb/query-answersheet-profile-list', {
                        subjectId: '', //科目标识
                        papertypeCode: '', //试卷类型编码
                        pageIndex: '0', //分页起始
                        pageSize: '100', //分页数量
                        classUniquecode: '', //项目编码
                        sourceType: 'YOULU', //来源类型
                        paperIds: this.paperIds, //试卷标识集合
                        onsuccess: (data2) => {
                            this.practiceRecords = data2.data.map((paper) => {
                                data1.data.forEach((keyframe) => {
                                    if (paper.paperId == keyframe.paperId) {
                                        paper.keyframeName = keyframe.keyframeName;
                                    }
                                });
                                return paper;
                            });

                            this.$callApi('qb/query-answersheet-papers-transcript', {
                                paperIds: this.paperIds,
                                sourceType: 'YOULU',
                                onsuccess: (data3) => {
                                    this.statistics = data3;
                                    this.isLoad = true;
                                    this.loading.close();
                                },
                                onerror: niceloo.api.handleFailure,
                                oncomplete: () => {},
                            });
                        },
                        onerror: niceloo.api.handleFailure,
                        oncomplete: () => {},
                    });
                },
                onerror: () => {
                    this.isLoad = true;
                    this.$baseUI.confirm({
                        title: '温馨提示',
                        content: '页面加载失败，是否重新加载？',
                        showCancel: true,
                        cancelText: '取消',
                        confirmText: '重试',
                        confirm() {
                            this.init(coursewareId);
                        },
                        cancel() {
                            this.loading.close();
                            //关闭弹窗
                            this.closed();
                        },
                    });
                },
                oncomplete: () => {},
            });
        },
        //查看解析
        lookAnalysis(type, record) {
            /*Mask.showLoading();*/
            this.loading = this.$baseUI.loading();
            var vm = this;
            let paper; //试卷对象

            /*let paperService = PaperClass.initPaper({
                paperId,
                answersheetId,
                service: window,
                options: {
                    sourceType: 'YOULU',
                },
            });*/
            /*let paperService = PaperService.initPaper({
                paperId: record.paperId,
                answersheetId: record.answersheetId,
            });*/
            PaperService.initPaper({
                paperId: record.paperId,
                answersheetId: record.answersheetId,
            }).then((paperService) => {
                paper = paperService.getInstance();
                //---------------------paperService-----------------------//
                paperService
                    .loadBaseInfo(function () {
                        //加载试卷详情
                    })
                    .loadQuestions(function () {
                        //加载试卷所有试题
                        vm.allQuestions = paper.getQuestions();
                        vm.questions = paper.getQuestions();
                        console.log(vm.questions, 'questions');
                    })
                    .loadSheetInfo(function () {
                        //加载试卷答卷信息
                    })
                    .loadParse(function () {
                        //加载解析数据
                    })
                    .loadAnswerRecord(function () {
                        //加载试卷做题记录
                    })
                    .getTranscript(function () {
                        //加载通用成绩单
                    })
                    .end(function () {
                        vm.paper = paper;
                        /*Mask.hideLoading();*/
                        vm.loading.close();
                        if (type == 'all') {
                            vm.analysisType = 'all';
                            vm.questions = vm.allQuestions;
                            vm.isRecord = !vm.isRecord;
                            vm.isAnalysis = !vm.isAnalysis;
                        }
                        if (type == 'error') {
                            vm.analysisType = 'error';
                            vm.questions = vm.allQuestions.filter((item) => {
                                return item.answerState != 2;
                            });
                            if (vm.questions.length == 0) {
                                vm.$baseUI.alert('真棒，此知识点下暂无错题').then(function () {
                                    console.log('提示信息已经点击确认');
                                });
                            } else {
                                vm.isRecord = !vm.isRecord;
                                vm.isAnalysis = !vm.isAnalysis;
                            }
                        }
                    })
                    .catch(() => {
                        vm.$baseUI.alert('此打点下试卷异常');
                    });
            });
        },
        //返回
        returnRecord() {
            this.curPage = 1;
            this.isRecord = !this.isRecord;
            this.isAnalysis = !this.isAnalysis;
            this.isAnswerCard = false;
            this.questions = [];
        },
        //展示答题卡
        showAnswerCard() {
            this.isAnswerCard = !this.isAnswerCard;
        },
        //跳转到当前页
        toCurPage(curPage) {
            if (curPage < 1 || curPage > this.questions.length) {
                return;
            }
            this.curPage = curPage;
        },
        //关闭弹窗
        closed() {
            this.isLoad = false;
            //返回
            if (this.isAnalysis) {
                this.curPage = 1;
                this.isRecord = true;
                this.isAnalysis = false;
                this.questions = [];
            }

            this.sendMessage('closeReport');
        },
    },
};
</script>

<style lang="less" scoped>
@import url('./asset/css/practiceRecord.less');
</style>
