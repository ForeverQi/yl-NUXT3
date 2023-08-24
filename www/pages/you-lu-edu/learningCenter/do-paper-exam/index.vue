<template>
    <div class="wrap">
        <!-- 公共头部 -->
        <global-header :is-fixed="false" />
        <!-- 面包屑 -->
        <div class="bread">
            <yl-breadcumb :items="crumbs" />
        </div>
        <div v-loading="loading" class="test-paper-exam" id="content" :class="{ empty: !testPaper }">
            <div v-show="!loading && testPaper">
                <!-- 标题栏 -->
                <question-header
                    need-fixed
                    btn-name="返回课程列表"
                    do-type="SJ"
                    :current="current + 1"
                    :total="paperDetail.questionTotalCount"
                    :paper-name="paperDetail.paperName"
                    @back="goToPages('allTask')"
                />
                <div class="height-16" />
                <div class="content">
                    <div class="content-left" id="contentLeft">
                        <test-exam
                            ref="questions"
                            :list="questionList"
                            :show-close-all="questionList.length > 1"
                            :paper-question-type-list="paperQuestionTypeList"
                            :current.sync="current"
                            :set-type="!isAllQuestion"
                            :show-confirm-btn="showConfirmBtn"
                            :show-operating-button="showOperatingButton"
                            @onPrev="onPrev"
                            @onNext="onNext"
                            @onFavorite="debounce(onFavorite)"
                            @changeAnswerMode="changeAnswerMode"
                            @onChangeAnswer="onChangeAnswer"
                            @handle-save="onTestExamSavePaper"
                            @changeCheckOnly="changeCheckOnly"
                            @click-opinion="clickOpinion"
                            @click-answer-questions="clickAnswerQuestions"
                        />
                    </div>
                    <div class="content-right" id="toolsContent">
                        <div id="contentRight">
                            <!-- 倒计时组件 -->
                            <question-timer
                                ref="timer"
                                :reverse="!!paperDetail.examDurationTime"
                                :start-seconds="examCountdown"
                                @end="timeEnd"
                                @change-status="changeTimerStatus"
                                @change="timerChange"
                            />
                            <div class="height-16" />
                            <!-- 学习工具组件 -->
                            <question-tool
                                :show-dictionary="showDictionary"
                                @showDict="
                                    showDict = true;
                                    toolsAnalysysAgent('词点快查');
                                "
                                @goUnderstand="
                                    goToPages('examSiteSecondsUnderstand');
                                    toolsAnalysysAgent('考点秒懂');
                                "
                                @clickCalculator="toolsAnalysysAgent('计算器')"
                            />
                            <!-- 自动查看解析、自动跳转下一题(做题模式下不显示控制按钮) -->
                            <template v-if="solvingMode && solvingMode !== 'do-exam'">
                                <div class="height-16" />
                                <QuestionMode @changeAnalysis="changeAnalysis" />
                            </template>
                            <div class="height-16" />
                            <question-card
                                :list="answerList"
                                :current.sync="current"
                                @handleSave="handleSave"
                                @clickAnswersheet="clickAnswersheet"
                                @changeAutoNext="changeAutoNext"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <!-- 空页面 -->
            <empty-page v-show="!loading && !testPaper" :msg="errorMsg" @to-class="goToPages('empty')" />
        </div>
        <!-- 单词快查弹窗 -->
        <dict-box v-if="showDict" :dict-box-show="showDict" :project-id="paperDetail.projectId" @close-dict="showDict = false" />
        <!-- 暂停弹窗 -->
        <question-pause-popup :show.sync="timePause" />
        <!-- 测评报告生成中弹窗 -->
        <loading-popup :show.sync="isWaitQuery" />
        <!-- 时间到后，为阻止用户此时点击页面而设置的透明蒙层 -->
        <div class="transparent" :class="{ show: timeUp }" />
        <!-- 意见反馈弹窗 -->
        <FeedbackModel v-if="feedDialog.show" :is-show.sync="feedDialog.show" :paper-detail="feedDialog.paperDetail" :question-id="feedDialog.questionId" />
        <!-- 学习答疑 -->
        <AnswerQuestionsModel
            :is-show.sync="showAnswerQuestions"
            :subject-id="paperDetail.subjectId"
            :project-id="paperDetail.projectId"
            :questions-id="answerQuestionsId"
            :paper-id="paperId"
            :answer-questions-stem-id="answerQuestionsStemId"
            :answer-sheet-id="answersheetId"
        />
        <!-- 公共底部 -->
        <global-footer />
    </div>
</template>

<script>
import '@/api/qb/api..courseware-paper-authentication.js'; // 接口-试卷鉴权
import '@/api/qb/api..support-transcript.js'; // 接口-查询学习中心成绩单
import '@/api/bd/api.BD4605.query-bd-subject-list.js'; // 接口-查询基础数据subjectName

import { mapActions } from 'vuex';
import * as apis from '@/www/components/components/question/js/apis.js';
import createPolling from '~/plugins/common/utils/createPolling';

import GlobalHeader from '~/layouts/components/global-header';
import GlobalFooter from '~/layouts/components/global-footer';
import QuestionHeader from '@/www/components/learningCenter/do-question/header'; // 标题栏
import QuestionTimer from '@/www/components/components/question/question-timer.vue'; // 右侧计时器
import QuestionTool from '@/www/components/components/question/question-tool.vue'; // 右侧学习工具
import QuestionPausePopup from '@/www/components/components/question/question-pause-popup.vue'; // 暂停倒计时蒙层
import LoadingPopup from '@/www/components/components/question/loading.vue'; // 评测报告生成中弹窗
import DictBox from '@/www/components/dictWidget/components/DictBox'; // 单词快查弹窗
import QuestionCard from '@/www/components/learningCenter/do-paper-exam/question-card'; // 答题卡组件-其中包括答题卡和自动跳转下一题
import TestExam from '@/www/components/components/question/question-init.vue'; // 左侧试题
import EmptyPage from '@/www/components/learningCenter/do-paper-exam/empty-page'; // 空页面
import Paper from '@/www/components/components/question/js/paper.js'; // 组卷paper类
import FeedbackModel from '@/www/components/components/question/feedback-model'; //意见反馈弹窗
import AnswerQuestionsModel from '@/www/components/components/question/answer-questions-model.vue'; // 学习答疑弹窗
import QuestionMode from '@/www/pages/you-lu-edu/special-question-brushing/components/paper-exam/question-mode.vue'; //做题模式
export default {
    components: {
        GlobalHeader,
        GlobalFooter,
        QuestionHeader,
        QuestionTimer,
        QuestionTool,
        QuestionPausePopup,
        LoadingPopup,
        DictBox,
        QuestionCard,
        TestExam,
        EmptyPage,
        QuestionMode,
        FeedbackModel,
        AnswerQuestionsModel,
    },
    /**
     * @returns {object} 当前实例
     */
    provide: {
        componentContainer: this,
    },
    layout: 'nullLayout',
    data() {
        return {
            loading: true, // 页面是否刷新中
            answersheetId: '',
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
                    name: this.$route.query.className,
                    href: `/learningCenter/allTask/${this.$route.params.classId}?ctapId=${this.$route.query.ctapId ? this.$route.query.ctapId : ''}`,
                },
            ],
            feedDialog: {
                //反馈弹窗信息
                show: false, //是否显示反馈
                questionId: '',
                paperDetail: {},
            },
            paperId: '', //试卷标识
            paperTypeCode: '', // 试卷类型
            subjectId: '', // 科目标识
            subjectName: '', // 科目名称
            classId: '', // 班级标识
            testPaper: null, // 试卷实例
            questionList: [], // 所有小题列表
            answerList: [], // 用于答题卡的数据
            paperQuestionTypeList: [], // 所有大题题型列表
            paperDetail: {}, // 试卷信息
            current: 0, // 当前试题index
            isAutomaticJump: true, // 是否自动跳转下一题
            isAllQuestion: false, // 是否展开全部试题
            useTime: 0, // 答题总时间
            examCountdown: 0, // 计时器开始时间（倒计时正计时通用）
            smartReviewStatus: false, // 是否智能阅卷
            showDict: false, // 是否显示词点快查弹窗
            showPoint: false, // 是否展示考点秒懂按钮
            showDictionary: false, // 是否展示词典快查按钮
            cancelPolling: null, // 用于清除轮询
            transcript: {}, // 成绩单数据
            timePause: false, // 暂停做题
            timeUp: false, // 倒计时结束
            isWaitQuery: false, // 是否展示评测报告loading
            errorMsg: '', // 错误信息
            isFixed: false, // 是否需要置顶
            needFixed: false, // 答题卡区域是否需要fixed
            isAbsolute: false, // 右侧区域是否可开始跟随滚动
            top: 96,
            left: 0,
            eleResizeObserver: null, // content变化监听
            answerStyle: '', // 鉴权后样式，枚举值 NORMAL普通 FZJK1仿真机考1 FZJK2仿真机考2
            showAnswerQuestions: false, // 学习答疑弹窗
            answerQuestionsId: '', // 学习答疑弹窗试题id
            answerQuestionsSubjectId: '', // 答疑弹窗使用 subjectId
            answerQuestionsStemId: '', // 学习答题大题id

            showConfirmBtn: false, // 多选题是否显示确定按钮
            isAutoAnalysis: true, // 是否自动查看解析
            solvingTitle: '提示',
            solvingContent: '系统将为您保存当前做题进度和做题记录，您可以在下次继续做题',
            showOperatingButton: true, // 是否显示"上一题"、"下一题"、"全部试题"操作按钮
        };
    },
    computed: {
        toolsContentStyle() {
            if (!this.needFixed) return 'position: static; bottom:0; right:0;';
            if (!this.isFixed) {
                return `position: static;`;
            } else {
                if (!this.isAbsolute) {
                    return `position: fixed; top: ${this.top}px; left: ${this.left}px;`;
                }
                return `position: absolute; bottom:0; right:0;`;
            }
        },
        /**
         * @returns {string} 刷题模式：do-exercise: 背题模式; do-exam:做题模式
         */
        solvingMode() {
            return this.$route.query.solvingMode;
        },
    },
    watch: {
        // 计时器变化
        timePause(val) {
            val ? this.$refs.timer.api_pause() : this.$refs.timer.api_start();
            // 暂停/开始时，如是听力题，材料也要暂停
            this.setQuestionData({
                audioPause: val,
            });
        },
    },
    mounted() {
        const { subjectId, paperId, coursewareId, paperTypeCode, classId } = this.$route.params;
        this.subjectId = subjectId;
        this.paperId = paperId;
        this.coursewareId = coursewareId;
        this.paperTypeCode = paperTypeCode;
        this.classId = classId;
        this.initData();
        this.querySubjectName();
        this.attachEventListener();
    },
    destroyed() {
        this.removeEventListener();
    },
    methods: {
        ...mapActions('common/answer-questions-permissions', {
            getAnswerQuestionsPermissions: 'getAnswerQuestionsPermissions',
        }),
        /**
         * 查询当前试卷是否展示考点秒懂按钮
         */
        ...mapActions('class-info/learn-tool', {
            getLearnToolsStatus: 'getLearnToolsStatus',
        }),

        /**
         * 定义本页面所有跳转页面方法
         * @param {String} type 枚举值 examSiteSecondsUnderstand考点秒懂 空页面empty 课程详情allTask
         */
        goToPages(type) {
            // 部分班级存在没有ctapId的情况，做一下适配
            const ctapId = this.$route.query.ctapId ? this.$route.query.ctapId : '';
            if (type === 'allTask') {
                if (this.testPaper.answersheetId) {
                    let title = '确认信息';
                    let content = '确定要返回课程列表吗，会自动记录当前做题进度';
                    // 背题、做题模式
                    if (this.solvingMode) {
                        title = this.solvingTitle;
                        content = this.solvingContent;
                    }
                    this.$baseUI.confirm({
                        title,
                        content,
                        showCancel: true,
                        confirm: () => {
                            this.onSave('not-finished', '', () => {
                                this.$PageUtil.href(`/learningCenter/allTask/${this.$route.params.classId}?ctapId=${ctapId}`);
                            });
                        },
                    });
                } else {
                    this.$baseUI.confirm({
                        title: '确认信息',
                        content: '您还没有做题，确认要返回课程列表吗？',
                        showCancel: true,
                        confirm: () => {
                            this.$PageUtil.href(`/learningCenter/allTask/${this.$route.params.classId}?ctapId=${ctapId}`);
                        },
                    });
                }
            }
            if (type === 'empty') {
                // 周作业和月考，鉴权未通过去最外层，鉴权通过的都去详情页；非周作业和月考都去详情页
                if ((['ZZY', 'YK'].includes(this.paperTypeCode) && this.answerStyle) || !['ZZY', 'YK'].includes(this.paperTypeCode)) {
                    this.$PageUtil.href(`/learningCenter/allTask/${this.$route.params.classId}?ctapId=${ctapId}`);
                } else {
                    this.$PageUtil.href('/learningCenter/index/myCourse');
                }
            }
            if (type === 'examSiteSecondsUnderstand') {
                this.$baseUI.confirm({
                    title: '确认信息',
                    content: '确定跳转考点秒懂吗？会自动记录当前做题进度',
                    showCancel: true,
                    confirm: () => {
                        this.onSave('not-finished', '', () => {
                            this.timePause = true;
                            this.$PageUtil.openNewPage(`/learningCenter/knowledge-strengthen?projectId=${this.paperDetail.projectId}`);
                        });
                    },
                });
            }
        },

        /**
         * 页面变化监听
         */
        attachEventListener() {
            if (typeof window === 'undefined') {
                return;
            }
            window.addEventListener('scroll', this.scrollChange);
            window.addEventListener('resize', this.scrollChange);
            // document.addEventListener('visibilitychange', this.leavePage);
            // 监听元素高度变化（应加上防抖，但加上后效果不好，暂时注释）
            const contentResize = () => {
                // this.debounce(() => {
                this.scrollChange();
                // });
            };
            this.eleResizeObserver = new ResizeObserver(contentResize);
            this.eleResizeObserver.observe(document.getElementsByClassName('content')[0]);
        },

        /**
         * 取消页面变化监听
         */
        removeEventListener() {
            if (typeof window === 'undefined') {
                return;
            }
            window.removeEventListener('scroll', this.scrollChange);
            window.removeEventListener('resize', this.scrollChange);
            // document.removeEventListener('visibilitychange', this.leavePage);
            this.eleResizeObserver.unobserve(document.getElementsByClassName('content')[0]);
            this.eleResizeObserver = null;
        },

        /**
         * 离开页面停止计时（不太确定是否需要，写这里了暂时不用）
         */
        leavePage() {
            this.timePause = document.hidden;
        },

        /**
         * 页面偏移变动
         */
        scrollChange() {
            /**
             * 1. 左侧高度低于右侧时，正常滚动即可
             */
            const rightHight = document.getElementById('contentRight').offsetHeight;
            const leftHeight = document.getElementById('contentLeft').offsetHeight;
            this.needFixed = leftHeight > rightHight;
            /**
             * 1-1. 左侧高于右侧时，当此页面header视窗顶部时则切换fixed样式，此时偏移值为页面公共头部高度+面包屑高度：isFixedHeight
             */
            const isFixedHeight =
                document.getElementsByClassName('nav-bg')[0].clientHeight +
                document.getElementsByClassName('header-wrap')[0].clientHeight +
                document.getElementsByClassName('bread')[0].clientHeight;
            const scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop; // 页面已滚动高度
            this.isFixed = scrollTop >= isFixedHeight;
            /**
             * 2-1. 当页面header切换成isFixed时，右侧区域就需要fixed
             *      其top为页面header高度和答题卡见间距之和（固定值，不再计算）
             *      其left值，初始为（content宽度 - toolsContent宽度），随着横向滚动-滚动偏移值
             */
            const scrollLeft = window.pageXOffset; // 页面横向滚动宽度
            this.left =
                document.getElementById('content').offsetLeft +
                (document.getElementById('content').offsetWidth - document.getElementById('toolsContent').offsetWidth) -
                scrollLeft;
            /**
             * 2-2. 当页面（contentLeft高度和toolsContent的差值）与isFixedHeight的总和时，右侧区域切换为跟随滚动（style="position: absolute; bottom:0; right:0;"）
             */
            const isAbsoluteHeight = leftHeight - rightHight + isFixedHeight + 16;
            this.isAbsolute = scrollTop >= isAbsoluteHeight;
            this.$nextTick(() => {
                document.querySelector('#toolsContent').style = this.toolsContentStyle;
            });
        },

        /**
         * 针对周作业和月考类型进行鉴权
         */
        paperAuthentication() {
            this.$callApi('qb/courseware-paper-authentication', {
                coursewareId: this.coursewareId,
                paperId: this.paperId,
                classId: this.classId,
                onsuccess: (res) => {
                    this.answerStyle = res.answerStyle;
                    this.smartReviewStatus = res.subjectiveQuestionGradingMethod === 'AUTO';
                    if (res.answerStyle === 'NORMAL') {
                        // 组卷
                        this.initPaper();
                        this.getLearnToolsStatus(this.classId).then((res) => {
                            this.showPoint = res.examSite;
                            this.showDictionary = res.phraseLookup;
                        });
                    }
                    //  else if (res.answerStyle === 'FZJK1') {
                    //     //仿真机考1
                    //     this.$PageUtil.openNewPage(`/exam/examinfo/${classUniquecode}/${subjectId}/${paperId}?url=${fullPath}&enableStatus=Y`);
                    // } else if (res.answerStyle === 'FZJK2') {
                    //     //仿真机考2
                    //     this.$PageUtil.openNewPage(`/exam/examinfo/${classUniquecode}/${subjectId}/${paperId}?url=${fullPath}&enableStatus=Y`);
                    // }
                },
                onerror: (err) => {
                    this.$niceloo.api.handleFailure(err);
                    this.loading = false;
                    this.errorMsg = err.getDescription();
                },
            });
        },

        /**
         * 页面初始化
         * 1. 非周作业月考无需鉴权，可直接组卷
         * 2. 鉴权后有三种情况，留在当前页做题、模拟机考1、模拟机考2（后两种暂不做相关处理）
         */
        initData() {
            if (['ZZY', 'YK'].includes(this.paperTypeCode)) {
                this.paperAuthentication();
            } else {
                this.initPaper();
                this.getLearnToolsStatus(this.classId).then((res) => {
                    this.showPoint = res.examSite;
                    this.showDictionary = res.phraseLookup;
                });
            }
        },

        /**
         * 计时组件相关方法
         * 1. 时间变化，用于记录答题总计时（正/倒计时通用）
         * @param {Number} val 剩余秒数
         * @param {String} str 当前时间样式
         */
        timerChange(val, str) {
            this.useTime = Object.keys(this.paperDetail).length ? this.examCountdown - val + this.testPaper.useTime : val;
        },
        /**
         * 计时组件相关方法
         * 2. 计时器开始/暂停等状态变化
         * @param {String} status 计时器当前状态 pause start
         */
        changeTimerStatus(status) {
            status === 'pause' ? (this.timePause = true) : (this.timePause = false);
        },
        /**
         * 计时组件相关方法
         * 3. 倒计时结束交卷逻辑
         */
        timeEnd() {
            this.timeUp = true;
            this.onSubmit({ answerWay: 'automatic' });
        },

        /**
         * 试卷初始化
         */
        initPaper() {
            if (this.testPaper) return;
            this.loading = true;
            this.testPaper = new Paper({
                paperId: this.paperId,
                sourceType: $nuxt.context.env.config.learningCenterSourceType,
                classId: this.classId, // 学习中心课内练习组件所需参数，其他场景无需此参数
                coursewareId: this.coursewareId, // 学习中心课内练习组件所需参数，其他场景无需此参数
            });

            // 监听试卷初始化成功
            this.testPaper.onInitPaper(async () => {
                var answerQuestionsPermissions = false;
                this.paperDetail = this.testPaper.getPaperDetail();
                await this.getAnswerQuestionsPermissions({ subjectId: this.paperDetail.subjectId, projectId: this.paperDetail.projectId })
                    .then((res) => {
                        answerQuestionsPermissions = res;
                    })
                    .catch((err) => {
                        this.$baseUI.alert(err.getDescription());
                    });
                this.questionList = this.testPaper.getQuestionList((item, index) => {
                    item.showParseImmediately = true;
                    item.answerQuestionsPermissions = answerQuestionsPermissions;
                });
                // 背题做题模式
                if (this.solvingMode) {
                    this.isAutomaticJump = false;
                    // “自动查看解析”按钮默认选中(非刷题模式)
                    this.changeAnalysis(true);
                    if (this.solvingMode === 'do-exam') {
                        this.isAllQuestion = true;
                        this.showOperatingButton = false;
                    }
                }
                this.paperQuestionTypeList = this.testPaper.getPaperQuestionTypeList();
                this.crumbs.push({
                    name: this.paperDetail.paperName,
                    href: '#',
                });
                this.useTime = this.testPaper.useTime;
                this.questionTime = this.testPaper.useTime;
                this.examCountdown = Object.keys(this.paperDetail).length ? this.paperDetail.examDurationTime * 60 - this.useTime : this.useTime;
                // 页面更新后更新答题卡数据并开启计时器
                this.$nextTick(() => {
                    this.answerList = this.$refs.questions ? this.$refs.questions.getList() : this.questionList;
                    this.$refs.timer.api_start();
                });
                // 有答题卡时自动跳转到上次答题位置
                if (this.testPaper.answersheetId) {
                    this.answersheetId = this.testPaper.answersheetId;
                    this.current = this.testPaper.getLastAnswerQuestionIndex((item) => {
                        return !item.userAnswer;
                    });
                } else {
                    this.current = 0; // 设置默认索引，第一题为复合题型也能watch到
                }
                if (this.solvingMode === 'do-exam') {
                    this.scrollNotQuestion();
                }
                // 为保证显示试卷时试卷组件已渲染完成而延迟300毫秒
                if (this.solvingMode) {
                    this.loading = false;
                } else {
                    setTimeout(() => {
                        this.loading = false;
                    }, 300);
                }
            });

            // 监听试卷初始化失败
            this.testPaper.onError((errMsg) => {
                this.errorMsg = errMsg;
                this.testPaper = null;
                this.loading = false;
            });
        },
        /**
         * text-exam组件内抛出交卷方法
         */
        onTestExamSavePaper() {
            // eslint-disable-next-line no-debugger
            // debugger;
            this.handleSave('submit');
        },
        /**
         * 做题模式下自动滚动到第一道未做试题
         */
        scrollNotQuestion() {
            this.$nextTick(() => {
                const targetQuestionId = this.questionList[this.current].questionId;
                setTimeout(() => {
                    const targetOffsetTop = document.getElementById(targetQuestionId) ? document.getElementById(targetQuestionId).offsetTop : 0;
                    window.scrollTo({
                        top: targetOffsetTop,
                    });
                }, 300);
            });
        },
        /**
         * 点击交卷或保存按钮
         */
        handleSave(type) {
            if (type === 'save') {
                this.debounce(() => {
                    this.onSave('not-finished', '', (res) => {
                        if (res && res === '请勿重复交卷') return;
                        this.$refs.timer.api_pause();
                        // 暂停/开始时，如是听力题，材料也要暂停
                        this.setQuestionData({
                            audioPause: true,
                        });
                        let title = '确认信息';
                        let content = '保存成功，是否继续答题';
                        // 背题、做题模式
                        if (this.solvingMode) {
                            title = this.solvingTitle;
                            content = this.solvingContent;
                        }
                        this.$baseUI.confirm({
                            title,
                            content,
                            showCancel: true,
                            confirmText: '返回课程列表',
                            cancelText: '继续答题',
                            confirm: () => {
                                this.$PageUtil.href(
                                    `/learningCenter/allTask/${this.$route.params.classId}?ctapId=${this.$route.query.ctapId ? this.$route.query.ctapId : ''}`
                                );
                            },
                            cancel: () => {
                                this.$refs.timer.api_start();
                                // 暂停/开始时，如是听力题，材料也要暂停
                                this.setQuestionData({
                                    audioPause: false,
                                });
                            },
                        });
                    });
                });
            } else {
                this.debounce(() => {
                    this.onSubmit();
                });
            }
        },

        /**
         * 获取题目数据
         */
        getQuestionData() {
            return this.$refs.questions ? this.$refs.questions.getData() : this.questionList[this.current];
        },

        /**
         * 设置题目数据
         * @param {Object} data
         * @param {String} target 针对课内练习做题页去掉确认选择按钮添加的入参，在当前页面更改用户答案时为必传！！
         */
        setQuestionData(data, target) {
            if (target) {
                this.$refs.questions ? this.$refs.questions.setData(data, target) : Object.assign(this.questionList[Number(target)], data);
            } else {
                this.$refs.questions ? this.$refs.questions.setData(data) : Object.assign(this.questionList[this.current], data);
            }
            // 设置完题目数据之后，设置答题卡上的数据
            this.answerList = this.$refs.questions ? this.$refs.questions.getList() : this.questionList;
        },

        /**
         * 切换上一题
         */
        onPrev() {
            this.debounce(() => {
                if (this.current === 0) return;
                this.current--;
                this.changePaperParsing();
            });
        },

        /**
         * 切换下一题
         */
        onNext() {
            this.debounce(() => {
                if (this.current + 1 >= this.questionList.length) return;
                this.current++;
                this.changePaperParsing();
            });
        },
        /**
         * 显示查看解析
         */
        changePaperParsing() {
            if (this.solvingMode) {
                if (this.questionList[this.current].userAnswer) {
                    this.questionList[this.current].parseonly = true;
                    this.questionList[this.current].isCheckOnly = false;
                    this.questionList[this.current].paperParsing = true;
                }
            }
        },

        /**
         * 防抖
         * @param {Object} callback
         */
        debounce(callback) {
            clearTimeout(this.timer);
            this.timer = setTimeout(callback, 200);
        },

        /**
         * 点击收藏
         */
        onFavorite(e) {
            const question = this.getQuestionData();
            // 取消收藏
            if (question.collectId) {
                this.testPaper.cancelCollect({
                    collectId: question.collectId,
                    success: () => {
                        this.$Message.success('该试题已取消收藏，从收藏夹移除');
                        this.setQuestionData({
                            collectId: '',
                        });
                        this.questionList[this.current].collectId = '';
                    },
                });
            } else {
                // 添加收藏
                this.testPaper.addCollect({
                    questionId: question.questionId,
                    success: (res) => {
                        this.$Message.success('+1 收藏成功，可在课程列表收藏夹中查看');
                        this.setQuestionData({
                            collectId: res.collectId,
                        });
                        this.questionList[this.current].collectId = res.collectId;
                    },
                    fail: (err) => {
                        console.error(err);
                        this.$Message.error('收藏失败，请稍后再试');
                    },
                });
            }
        },

        /**
         * 切换答题模式
         */
        changeAnswerMode(type) {
            this.isAllQuestion = !type;
            const all = 'web_learning_center_all_quetions';
            const up = 'web_learning_center_paper_pack_up';
            // 点击全部试题埋点上报
            this.$yiguan.learningCenter(!type ? all : up, {
                page_name: '学习中心试卷做题页面',
                project_name: this.paperDetail.projectName,
                college_name: '',
            });
        },

        /**
         * 点击答题卡上小题按钮
         */
        clickAnswersheet(questionId) {
            this.current = (this.questionList || []).findIndex((item) => item.questionId === questionId);
            this.$nextTick(() => {
                if (this.solvingMode !== 'do-exam') {
                    this.changePaperParsing();
                }
                const targetOffsetTop = document.getElementById(questionId).offsetTop;
                window.scrollTo({
                    top: this.isAllQuestion ? targetOffsetTop : 0,
                    behavior: 'smooth',
                });
            });
        },

        /**
         * 更改自动跳转下一题状态
         */
        changeAutoNext(type) {
            this.isAutomaticJump = type;
            if (this.solvingMode !== 'do-exam') {
                this.showConfirmBtn = !!(this.isAutomaticJump || this.isAutoAnalysis);
            }
            // 点击自动跳转下一题埋点
            this.$yiguan.learningCenter('web_learning_center_paper_auto_next', {
                page_name: '学习中心试卷做题页面',
                project_name: this.paperDetail.projectName,
                subject_name: this.subjectName || this.subjectId,
                is_auto_next: type,
                college_name: '',
            });
        },

        /**
         * 改变答案
         * @param {Object} options题型类型
         * @param {String} options.typeName 题型类型
         * @param {String} options.answer   用户答案
         * @param {String} options.questionId 当前操作题目标识：去掉确认选择按钮后，失焦的其中一种方式是点击答题卡，所以必须由准确的target，使用原本的current不合理
         */
        onChangeAnswer(options) {
            const target = this.questionList.findIndex((item) => item.questionId === options.questionId);
            if (this.solvingMode) {
                // 背题刷题模式
                const collectArr = ['multiple', 'fill', 'explain', 'choose-fill'];
                // 简答题、填空题
                const subjectiveQuestions = ['fill', 'explain'];
                let list = this.questionList;
                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    if (item.questionId === options.questionId) {
                        item.userAnswer = options.answer;
                        // 背题模式自动查看解析
                        if (this.solvingMode !== 'do-exam') {
                            if (collectArr.includes(options.typeName)) {
                                // 单独对简单题、填空题做一个延迟显示查看解析按钮的判断，为了解决点击‘查看解析’按钮显示，下一题无法点击的问题
                                if (subjectiveQuestions.includes(options.typeName)) {
                                    setTimeout(() => {
                                        item.parseonly = !!item.userAnswer;
                                        item.isCheckOnly = true;
                                    }, 500);
                                } else {
                                    item.parseonly = !!item.userAnswer;
                                    item.isCheckOnly = true;
                                }
                            } else {
                                item.isCheckOnly = !this.isAutoAnalysis;
                                // 自动跳转下一题
                                if (this.isAutoAnalysis === false) {
                                    setTimeout(() => {
                                        item.parseonly = true;
                                        item.paperParsing = false;
                                    }, 500);
                                    break;
                                }
                            }

                            // 自动查看解析
                            if (collectArr.includes(options.typeName)) {
                                item.paperParsing = false;
                            } else {
                                item.parseonly = true;
                                item.paperParsing = this.isAutoAnalysis ? !item.paperParsing : false;
                            }
                        } else {
                            // 做题模式下不显示查看解析按钮
                            item.isCheckOnly = true;
                            item.parseonly = false;
                        }
                    } else {
                        item.paperParsing = false;
                    }
                }
                this.questionList = list;
            }
            this.setQuestionData(
                {
                    userAnswer: options.answer,
                    hasConfirmAnswer: !!options.answer,
                    showParseButton: false,
                },
                target.toString()
            );

            /**
             * 题型为单选的试题，如勾选了自动跳转下一题则自动跳转
             * isAutomaticJump是否自动跳转下一题
             * isAllQuestion是否展示全部试题
             */
            if (options.typeName === 'radio' && this.isAutomaticJump) {
                this.onNext();
                if (this.isAllQuestion) {
                    this.$nextTick(() => {
                        const targetOffsetTop = document.getElementById(this.questionList[this.current].questionId).offsetTop;
                        window.scrollTo({
                            top: targetOffsetTop,
                            behavior: 'smooth',
                        });
                    });
                }
            }
            // 临时保存
            this.onSave('temporary', options.questionId);
        },

        /**
         * 保存已做进度
         * @param {String} answerStatus 临时保存temporary（用于一题一保存，只保存做题情况，不进行统计计算） 未做完保存进度not-finished
         * @param {String} questionId 临时保存是一题一保存，所需保存的那道题的questionId
         * @param {Function} callback 回调
         */
        onSave(answerStatus, questionId, callback) {
            if (this.timeUp) return; // 已到考试时间，走自动交卷逻辑，不可调用接口
            const questions = this.$refs.questions.getList();
            let extension = {
                callBackStatus: true,
                classId: this.classId,
                subjectId: this.subjectId,
                callbackSource: 'intelligent',
            };
            extension =
                ['ZZY', 'YK'].includes(this.paperTypeCode) || ['ZZY', 'YK'].includes(this.paperDetail.paperTypeCode)
                    ? Object.assign(extension, { courseWareId: this.coursewareId })
                    : extension;
            this.testPaper.saveOrSubmitAnswer({
                answerStatus, // 作答状态:临时保存temporary 未做完保存进度not-finished
                answerWay: 'manual', // 交卷方式:automatic自动、manual手动
                answerScene: 'brush', // 作答场景:brush刷题
                intelligentMarking: this.smartReviewStatus, // 是否智能阅卷（本期没有智能阅卷，默认false）
                useTime: this.useTime,
                extension: JSON.stringify(extension),
                questions:
                    answerStatus === 'not-finished' ? questions.filter((item) => item.userAnswer) : questions.filter((item) => item.questionId === questionId),
                success: (res) => {
                    if (callback && typeof callback === 'function') {
                        callback(res);
                    }
                },
                fail: async (err) => {
                    if (/ANSWERSHEET/.test(err.getDescription())) {
                        // 先交第一份
                        await apis.saveOrSubmitAnswer({
                            paperId: this.paperId, // 试卷标识
                            answerSheetId: err.getDescription(), // 答卷标识
                            answerStatus: 'finished',
                            answerDurationTime: 0,
                            answerWay: 'automatic',
                            answerScene: 'brush',
                            sourceType: this.testPaper.sourceType,
                            cType: this.testPaper.cType,
                            extension: JSON.stringify({
                                callBackStatus: true,
                                callbackSource: 'intelligent',
                            }),
                        });
                        // 交完第一份之后清空原答题卡id
                        this.testPaper.answersheetId = '';
                        // 再交第二份
                        this.onSave(answerStatus, questionId, callback);
                    }
                },
            });
        },

        /**
         * 提交答案
         * @param {Object} obj 其实就是用来控制是手动还是自动交卷的
         * @param {String} obj.answerWay 交卷方式，枚举值：automatic自动、manual手动
         */
        onSubmit(obj) {
            const questions = this.$refs.questions.getList();
            let extension = {
                callBackStatus: true,
                classId: this.classId,
                subjectId: this.subjectId,
                callbackSource: 'intelligent',
            };
            extension =
                ['ZZY', 'YK'].includes(this.paperTypeCode) || ['ZZY', 'YK'].includes(this.paperDetail.paperTypeCode)
                    ? Object.assign(extension, { courseWareId: this.coursewareId })
                    : extension;

            // 计算未做题数
            let notDoneNum = 0;
            for (let item of questions) {
                if (!(item.userAnswer && item.userAnswer.length)) {
                    notDoneNum++;
                }
            }
            let answerWay = obj && obj.answerWay ? obj.answerWay : 'manual';

            // 定义提交答案
            const submitPaper = () => {
                if (this.timeUp && answerWay === 'manual') return; // 用户手动提交时如已到时间，则不提交，走自动提交

                this.loading = true;
                this.testPaper.saveOrSubmitAnswer({
                    answerStatus: 'finished', // 作答状态
                    answerWay, // 交卷方式:automatic自动、manual手动
                    answerScene: 'brush', // 作答场景
                    intelligentMarking: this.smartReviewStatus, // 是否智能阅卷，本期不做智能阅卷，默认false
                    useTime: this.useTime,
                    questions: questions.filter((item) => item.userAnswer),
                    extension: JSON.stringify(extension),
                    success: (res) => {
                        this.operateMode();
                        if (answerWay === 'automatic') {
                            // 自动交卷
                            this.$baseUI.alert('考试时间到！即将自动提交试卷！', '确认信息', {
                                success: () => {
                                    this.lazyQueryTranscript(res);
                                },
                            });
                        } else {
                            // 手动交卷在成功后停止计时器
                            this.$refs.timer.api_pause();
                            // 暂停/开始时，如是听力题，材料也要暂停
                            this.setQuestionData({
                                audioPause: true,
                            });
                            this.lazyQueryTranscript(res);
                        }
                    },
                    fail: async (err) => {
                        if (/ANSWERSHEET/.test(err.getDescription())) {
                            // 先交第一份
                            await apis.saveOrSubmitAnswer({
                                paperId: this.paperId, // 试卷标识
                                answerSheetId: err.getDescription(), // 答卷标识
                                answerStatus: 'finished',
                                answerDurationTime: 0,
                                answerWay: 'automatic',
                                answerScene: 'brush',
                                sourceType: this.testPaper.sourceType,
                                cType: this.testPaper.cType,
                                extension: JSON.stringify({
                                    callBackStatus: true,
                                    callbackSource: 'intelligent',
                                }),
                            });
                            // 交完第一份之后清空原答题卡id
                            this.testPaper.answersheetId = '';
                            // 再交第二份
                            submitPaper();
                        } else if (err.getDescription() !== '请勿重复交卷' || err.getAttachedData().getData().code !== '40011') {
                            // 40011: 重复交卷code
                            this.$niceloo.api.handleFailure(err);
                        }
                    },
                    complete: () => {
                        this.loading = false;
                    },
                });
            };

            // 时间到了自动交卷
            if (answerWay === 'automatic') {
                submitPaper();
            } else if (notDoneNum > 0) {
                this.$baseUI.confirm({
                    title: '确认信息',
                    content: `您还有${notDoneNum}道题未做，确定要提交试卷吗？`,
                    showCancel: true,
                    confirm: () => {
                        submitPaper();
                    },
                });
            } else {
                submitPaper();
            }
        },

        /**
         * 查询学习中心成绩单
         * @param {Object} options
         * @param {String} options.answerSheetId 答题卡标识
         */
        queryTranscript(options) {
            return new Promise((resolve, reject) => {
                this.$callApi('qb/support-transcript', {
                    answersheetId: options.answerSheetId,
                    onsuccess: (res) => {
                        resolve(res);
                    },
                    onerror: (err) => {
                        reject(err.getDescription());
                    },
                });
            });
        },

        /**
         * 轮询api（修改逻辑后用不到了，暂时保留）
         */
        async checkHasTranscript(options) {
            this.isWaitQuery = true;
            this.transcript = await this.queryTranscript(options);
            if (this.transcript && Object.values(this.transcript).length) {
                this.clearPoll();
                this.isWaitQuery = false;
                let query = `className=${encodeURIComponent(this.$route.query.className)}&ctapId=${this.$route.query.ctapId ? this.$route.query.ctapId : ''}`;
                this.$router.push(
                    `/learningCenter/paper-test-result/${this.paperId}/${options.answerSheetId}/${this.subjectId}/${this.paperDetail.paperTypeCode}/${this.coursewareId}/${this.classId}?${query}`
                );
            } else {
                this.cancelPolling = createPolling(this.queryTranscript(options), 1000, true);
            }
        },

        /**
         * 延迟一秒查询成绩单接口
         * @param {Object} options
         * @param {String} options.answerSheetId 答题卡标识
         */
        lazyQueryTranscript(options) {
            this.isWaitQuery = true;
            setTimeout(() => {
                this.queryTranscript(options)
                    .then((res) => {
                        let query = `className=${encodeURIComponent(this.$route.query.className)}&ctapId=${
                            this.$route.query.ctapId ? this.$route.query.ctapId : ''
                        }`;
                        // 背题、做题模式
                        if (this.$route.query.solvingMode) query += `&solvingModeParse=${this.$route.query.solvingMode}`;
                        this.$router.push(
                            `/learningCenter/paper-test-result/${this.paperId}/${options.answerSheetId}/${this.subjectId}/${this.paperDetail.paperTypeCode}/${this.coursewareId}/${this.classId}?${query}`
                        );
                    })
                    .catch(() => {
                        this.$baseUI.alert('报告生成失败，请返回课程列表稍后再试', '确认信息', {
                            success: () => {
                                this.$PageUtil.href(
                                    `/learningCenter/allTask/${this.$route.params.classId}?ctapId=${this.$route.query.ctapId ? this.$route.query.ctapId : ''}`
                                );
                            },
                        });
                    })
                    .finally(() => {
                        this.isWaitQuery = false;
                    });
            }, 1000);
        },

        /**
         * 清除轮询
         */
        clearPoll() {
            // 清除轮询
            this.cancelPolling && this.cancelPolling();
            this.cancelPolling = null;
        },

        /**
         * 查询科目名称
         */
        querySubjectName() {
            this.$callApi('bd/query-bd-subject-list', {
                subjectId: this.subjectId,

                onsuccess: (data) => {
                    this.subjectName = data.count ? data.list[0].subjectName : '';
                },
                onerror: (err) => {
                    console.error(err.getDescription());
                },
            });
        },

        /**
         * 学习工具埋点
         */
        toolsAnalysysAgent(toolsName) {
            this.$yiguan.learningCenter('web_learning_center_paper_tools', {
                page_name: '学习中心试卷做题页面',
                project_name: this.paperDetail.projectName,
                subject_name: this.subjectName || this.subjectId,
                tool_name: toolsName,
                college_name: '',
            });
        },
        /**
         * 更改自动查看解析
         *
         * @param {boolean} type true:自动查看,false: 不自动查看
         * @returns {boolean} false
         */
        changeAnalysis(type) {
            this.isAutoAnalysis = type;
            if (this.solvingMode !== 'do-exam') {
                this.showConfirmBtn = !!(this.isAutomaticJump || this.isAutoAnalysis);
            }
            // 如果是自动跳转下一题状态则return
            if (this.isAutomaticJump === true) return false;
            // 改变小题列表数据
            let list = this.questionList;
            for (let i = 0; i < list.length; i++) {
                if (list[i].userAnswer) {
                    if (type === true) {
                        list[i].parseonly = true;
                        list[i].isCheckOnly = true;
                    }
                    if (this.solvingMode === 'do-exam') {
                        list[i].parseonly = false;
                        list[i].isCheckOnly = true;
                    }
                }
            }
            this.questionList = list;
        },
        /**
         * "查看解析-收起解析"按钮切换
         *
         * @param {object} e 值集合
         * @param {boolean} e.questionId questionId
         * @param {string} e.userAnswer 用户答案
         * @param {string} e.isConfirmStatus 是否是通过点击“确定”执行的回调
         * @returns {boolean} 终止代码运行
         */
        changeCheckOnly(e) {
            // 开启自动跳转下一题
            if (this.isAutomaticJump && e.isConfirmStatus) {
                this.onNext();
                return false;
            }
            let list = this.questionList;
            for (let i = 0; i < list.length; i++) {
                if (list[i].questionId === e.questionId) {
                    list[i].userAnswer = e.userAnswer;
                    if (e.userAnswer.length === 0) {
                        list[i].paperParsing = !e.openParsing;
                        list[i].isCheckOnly = e.openParsing;
                        list[i].parseonly = true;
                    } else {
                        list[i].paperParsing = !e.openParsing;
                        list[i].isCheckOnly = e.openParsing;
                    }
                }
            }
            this.questionList = list;
        },
        /**
         * 试卷提交之后，删除本地存储的试卷的做题模式的数据
         */
        operateMode() {
            if (this.solvingMode) {
                const userInfo = this.$storage.get('loginStatus') || {};
                const modeObj = this.$storage.get('problemSolvingMode') || {};
                const str = `${userInfo.userId}-${this.paperId}`;
                if (modeObj && modeObj[str]) {
                    delete modeObj[str];
                    this.$storage.set('problemSolvingMode', modeObj);
                }
                return false;
            }
        },
        // 开启意见反馈弹窗
        clickOpinion(data) {
            this.feedDialog = {
                show: true,
                questionId: data.questionId,
                paperDetail: {
                    paperTypeCode: this.$route.params.paperTypeCode,
                    paperName: this.paperDetail.paperName,
                },
            };
        },
        // 学习答疑
        clickAnswerQuestions(questionData) {
            this.answerQuestionsStemId = questionData.stemId;
            this.answerQuestionsId = questionData.questionId;
            this.showAnswerQuestions = true;
        },
    },
};
</script>

<style lang="less" scoped>
.wrap {
    width: 100%;
    min-height: 100vh;

    .bread {
        width: 1200px;
        margin: 0 auto;
        padding-bottom: 16px;
    }
}
.test-paper-exam {
    width: 1200px;
    margin: 0 auto 30px;
    user-select: none;
    min-height: 500px;

    &.empty {
        background: #fff;
    }

    .content {
        width: 1200px;
        display: flex;
        justify-content: space-between;
        position: relative;

        .content-left {
            width: 854px;
        }

        .content-right {
            width: 330px;
        }
    }
}

.transparent {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -10;

    &.show {
        z-index: 100;
    }
}

.height-24 {
    height: 24px;
}

.height-16 {
    height: 16px;
}
</style>
