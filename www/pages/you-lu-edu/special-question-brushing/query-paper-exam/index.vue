<!--
 * @Author       : zhouqi
 * @description  : 专项小题库做题页
 * @Date         : 2023-06-28 14:30:23
 * @LastEditors  : zhouqi
 * @LastEditTime : 2023-08-15 15:22:56
 * @FilePath     : \nuxt\www\pages\you-lu-edu\special-question-brushing\query-paper-exam\index.vue
-->
<template>
    <div class="wrap">
        <!-- 公共头部 -->
        <global-header :is-fixed="false" />
        <!-- 面包屑 -->
        <div class="bread">
            <!-- <yl-breadcumb :items="crumbs" /> -->
        </div>
        <div v-loading="loading" class="test-paper-exam" id="content" :class="{ empty: !testPaper }">
            <div v-show="!loading && testPaper && authority">
                <!-- 标题栏 -->
                <question-header
                    need-fixed
                    :btn-name="btnName"
                    do-type="SJ"
                    :current="current + 1"
                    :total="questionBankInfo.sumQuestionTotal"
                    :paper-name="questionBankInfo.professionBankName"
                    @handleSave="handleSave"
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
                            :paper-parsing="paperParsing"
                            :show-operating-button="showOperatingButton"
                            :show-confirm-btn="showConfirmBtn"
                            @onPrev="onPrev"
                            @onNext="onNext"
                            @onFavorite="debounce(onFavorite)"
                            @changeAnswerMode="changeAnswerMode"
                            @onChangeAnswer="onChangeAnswer"
                            @handle-save="onTestExamSavePaper"
                            @changeCheckOnly="changeCheckOnly"
                            @click-opinion="onFeedback"
                            @click-answer-questions="clickAnswerQuestions"
                        />
                    </div>
                    <div class="content-right" id="toolsContent">
                        <div id="contentRight">
                            <!-- 倒计时组件 -->
                            <question-timer
                                ref="timer"
                                :reverse="!!questionBankInfo.examDurationTime"
                                :start-seconds="examCountdown"
                                @change-status="changeTimerStatus"
                                @change="timerChange"
                            />
                            <div class="height-16" />
                            <!-- 学习工具组件 -->
                            <question-tool :show-dictionary="showDictionary" @showDict="showDictFun" @goUnderstand="goToPages('examSiteSecondsUnderstand')" />
                            <div class="height-16" />
                            <!-- 自动查看解析、自动跳转下一题(做题模式下不显示控制按钮) -->
                            <QuestionMode @changeAnalysis="changeAnalysis" @changeAutoNext="changeAutoNext" />
                            <div class="height-16" />
                            <question-card
                                :list="answerList"
                                :current.sync="current"
                                @handleSave="handleSave"
                                @clickAnswersheet="clickAnswersheet"
                                @clearRedo="clearRedo"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <!-- 空页面 -->
            <empty-page v-show="!loading && (!testPaper || !authority)" :is-show-btn="false" :msg="errorMsg" @to-class="goToPages('empty')" />
        </div>
        <!-- 单词快查弹窗 -->
        <dict-box v-if="showDict" :dict-box-show="showDict" :project-id="projectId" @close-dict="showDict = false" />
        <!-- 暂停弹窗 -->
        <question-pause-popup :show.sync="timePause" />
        <!-- 测评报告生成中弹窗 -->
        <loading-popup :show.sync="isWaitQuery" />
        <!-- 意见反馈弹窗 -->
        <feedback-model :is-show.sync="showFeedback" :question-id="feedback.questionId" :paper-detail="feedback" />
        <AnswerQuestionsModel
            :is-show.sync="showAnswerQuestions"
            :subject-id="subjectId"
            :project-id="projectId"
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
import '@/api/bd/api..query-show-dict-status.js'; // 权限判断是否有显示词典快查

import { mapState, mapMutations, mapActions } from 'vuex';
import * as apis from '@/www/pages/you-lu-edu/special-question-brushing/js/apis.js';

import GlobalHeader from '~/layouts/components/global-header';
import GlobalFooter from '~/layouts/components/global-footer';
import QuestionHeader from '@/www/components/learningCenter/do-question/header'; // 标题栏
import QuestionTimer from '@/www/components/components/question/question-timer.vue'; // 右侧计时器
import QuestionTool from '@/www/components/components/question/question-tool.vue'; // 右侧学习工具
import QuestionPausePopup from '@/www/components/components/question/question-pause-popup.vue'; // 暂停倒计时蒙层
import LoadingPopup from '@/www/components/components/question/loading.vue'; // 评测报告生成中弹窗
import DictBox from '@/www/components/dictWidget/components/DictBox'; // 单词快查弹窗
import FeedbackModel from '@/www/components/components/question/feedback-model.vue'; // 反馈弹窗
import AnswerQuestionsModel from '@/www/components/components/question/answer-questions-model.vue'; // 学习答疑弹窗
import QuestionCard from '@/www/components/learningCenter/do-paper-exam/question-card'; // 答题卡组件-其中包括答题卡和自动跳转下一题
import TestExam from '@/www/components/components/question/question-special-init.vue'; // 左侧试题
import EmptyPage from '@/www/components/learningCenter/do-paper-exam/empty-page'; // 空页面
import Paper from '@/www/pages/you-lu-edu/special-question-brushing/js/paper.js'; // 组卷paper类
import QuestionMode from '@/www/pages/you-lu-edu/special-question-brushing/components/paper-exam/question-mode.vue';
import dataMixin from '@/www/pages/you-lu-edu/special-question-brushing/mixins/dataMixin.js';
// [多选题(不定项选择题)、填空题、简答题、选词填空]
const collectArr = ['multiple', 'fill', 'explain', 'choose-fill'];
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
    mixins: [dataMixin],
    /**
     * @returns {object} 当前实例
     */
    provide() {
        return {
            componentContainer: this,
        };
    },
    layout: 'nullLayout',
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            questionPageType: 'question', // 页面类型：做题页
            loading: true, // 页面是否刷新中
            paperId: '', //试题标识
            paperTypeCode: '', // 试题类型
            subjectId: '', // 科目标识
            classId: '', // 班级标识
            testPaper: null, // 试题实例
            questionList: [], // 所有小题列表
            answerList: [], // 用于答题卡的数据
            paperQuestionTypeList: [], // 所有大题题型列表
            current: 0, // 当前试题index
            isAutomaticJump: false, // 是否自动跳转下一题
            isAutoAnalysis: true, // 是否自动查看解析
            isAllQuestion: false, // 是否展开全部试题
            useTime: 0, // 答题总时间
            examCountdown: 0, // 计时器开始时间（倒计时正计时通用）
            smartReviewStatus: false, // 是否智能阅卷
            showDict: false, // 是否显示词点快查弹窗
            showPoint: false, // 是否展示考点秒懂按钮
            showDictionary: true, // 是否展示词典快查按钮
            transcript: {}, // 成绩单数据
            timePause: false, // 暂停做题
            isWaitQuery: false, // 是否展示评测报告loading
            errorMsg: '', // 错误信息
            isFixed: false, // 是否需要置顶
            needFixed: false, // 答题卡区域是否需要fixed
            isAbsolute: false, // 右侧区域是否可开始跟随滚动
            top: 96,
            left: 0,
            eleResizeObserver: null, // content变化监听
            answerStyle: '', // 鉴权后样式，枚举值 NORMAL普通 FZJK1仿真机考1 FZJK2仿真机考2
            paperParsing: false, // 是否直接打开查看解析，true：是，false：否
            answersheetId: '',

            showOperatingButton: true, // 是否显示"上一题"、"下一题"、"全部试题"操作按钮
            showConfirmBtn: false, // 多选题是否显示确定按钮
            professionBankId: '', //专项题库标识
            answerType: '', //答题类型(A:全部;S:章节;R:随机)
            sectionId: '', //章节标识
            sourceType: '', //数据来源类型
            questionIds: [], //试题标识列表
            questionBankInfo: {}, //专项题库基本信息
            questionsSmall: {}, //小题集合
            unansweredQuestion: {}, //第一个未答试题
            projectId: '', // 项目id
            projectCode: '',
            authority: true, //学习中心-题库权限校验，
            feedback: {}, // 组装的反馈弹窗参数
            showFeedback: false, // 是否展示反馈弹窗
            paperDetail: {}, // 试题相关信息
            showAnswerQuestions: false, // 学习答疑弹窗
            answerQuestionsId: '', // 学习答疑弹窗试题id
            answerQuestionsSubjectId: '', // 答疑弹窗使用 subjectId
            answerQuestionsStemId: '', // 学习答题大题id
            btnName: '返回题库',
            isReselect: 'Y', //是否重新抽题（Y:重新抽取，N:不重新抽取）
        };
    },
    computed: {
        ...mapState('class-info/info', {
            theTimeProblem: 'theTimeProblem',
        }),
        /**
         * @returns {string} 自定义样式
         */
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
    },
    watch: {
        // 计时器变化
        /**
         *
         * @param {boolean} val 监听器的新值
         */
        timePause(val) {
            val ? this.$refs.timer.api_pause() : this.$refs.timer.api_start();
            // 暂停/开始时，如是听力题，材料也要暂停
            this.setQuestionData({
                audioPause: val,
            });
        },
    },
    /**
     *
     */
    mounted() {
        // 学习中心-题库 权限校验
        const { subjectId, classId, answerType, sourceType, sectionId, questionIds, projectId, projectCode, isReselect } = this.$route.query;
        this.professionBankId = this.$route.params.professionBankId;
        this.answerType = answerType;
        this.sourceType = sourceType;
        this.sectionId = sectionId || '';
        this.questionIds = questionIds || [];

        this.subjectId = subjectId;
        this.classId = classId;
        this.projectId = projectId;
        this.projectCode = projectCode;
        this.isReselect = isReselect ?? 'Y';
        this.authenticationFun();
        this.clearTimeProblem();
        this.initData();
        this.attachEventListener();
    },
    /**
     *
     */
    destroyed() {
        this.removeEventListener();
    },
    methods: {
        ...mapActions('common/answer-questions-permissions', {
            getAnswerQuestionsPermissions: 'getAnswerQuestionsPermissions',
        }),
        /**
         * 查询当前试题是否展示词典快查
         */
        ...mapActions('class-info/learn-tool', {
            getLearnToolsSpecialStatus: 'getLearnToolsSpecialStatus',
        }),
        /**
         * 清空本次最后一次答题数据
         */
        ...mapMutations('class-info/info', {
            clearTimeProblem: 'clearTimeProblem',
        }),
        /**
         * 设置本次最后一次答题数据
         */
        ...mapMutations('class-info/info', {
            setTimeProblem: 'setTimeProblem',
        }),

        /**
         * 页面初始化
         */
        initData() {
            this.initPaper();
            // 是否显示‘词典快查’
            this.getLearnToolsSpecialStatus(this.projectId).then((res) => {
                this.showDictionary = res;
            });
        },
        /**
         * 试题初始化
         *
         * @returns {boolean} false 终端程序进程
         */
        initPaper() {
            if (this.testPaper) return false;
            this.loading = true;
            this.testPaper = new Paper({
                sourceType: this.sourceType,
                classId: this.classId, // 学习中心课内练习组件所需参数，其他场景无需此参数

                professionBankId: this.professionBankId,
                answerType: this.answerType,
                sectionId: this.sectionId,
                questionIds: this.questionIds,
                projectId: this.projectId,
                projectUniCode: this.projectCode,
                isReselect: this.isReselect,
            });

            // 监听试题初始化成功
            this.testPaper.onInitPaper(async () => {
                let answerQuestionsPermissions = false;
                // 专项题库基本信息
                this.questionBankInfo = this.testPaper.getQuestionInfo();
                // 新校验项目科目下是否有答疑老师,如果有则显示“学习答疑”
                try {
                    await this.getAnswerQuestionsPermissions({ subjectId: this.questionBankInfo.subjectId, projectId: this.projectId }).then((res) => {
                        answerQuestionsPermissions = res;
                    });
                } catch (err) {
                    console.log(err);
                }
                this.questionList = this.testPaper.getSpecialQuestionList((item, index) => {
                    item.answerQuestionsPermissions = answerQuestionsPermissions;
                });
                // “自动查看解析”按钮默认选中(非刷题模式)
                this.paperQuestionTypeList = this.testPaper.getPaperQuestionTypeList();
                this.changeAnalysis(true);
                // 设置试题标题名称
                if (this.answerType === 'S') {
                    // 章节名称
                    const sectionName = this.testPaper.getSectionName();
                    this.questionBankInfo.professionBankName = this.setTitle(this.questionBankInfo.professionBankName, sectionName);
                } else {
                    this.questionBankInfo.professionBankName = this.setTitle(this.questionBankInfo.professionBankName);
                }
                this.useTime = 0;
                this.questionTime = 0;
                this.examCountdown = 0;
                // 页面更新后更新答题卡数据并开启计时器
                this.$nextTick(() => {
                    this.answerList = this.questionList;
                    this.$refs.timer.api_start();
                });
                // 有答题卡时自动跳转到上次答题位置
                if (this.testPaper.unansweredQuestion.decideStatus === 'W') {
                    this.current = this.testPaper.getLastAnswerQuestionIndex((item) => {
                        return !item.userAnswer;
                    });
                } else {
                    this.current = 0; // 设置默认索引，第一题为复合题型也能watch到
                }
                // 为保证显示试题时试题组件已渲染完成而延迟300毫秒
                setTimeout(() => {
                    this.loading = false;
                }, 300);
            });

            // 监听试题初始化失败
            this.testPaper.onError((errMsg) => {
                this.errorMsg = errMsg;
                this.testPaper = null;
                this.loading = false;
            });
        },
        /**
         * 设置标题
         *
         * @param {string} name 题库名称
         * @param {string} chapterName 章节名称
         * @returns {string} title 标题名称
         */
        setTitle(name, chapterName) {
            if (this.answerType) {
                let title = '';
                switch (this.answerType) {
                    case 'R':
                        title = `${name}-随机刷题`;
                        break;
                    case 'A':
                        title = `${name}-顺序刷题`;
                        break;
                    case 'S':
                        title = `${name}-${chapterName}`;
                        break;
                }
                return title;
            }
        },

        /**
         * 定义本页面所有跳转页面方法
         *
         * @param {string} type 枚举值 examSiteSecondsUnderstand考点秒懂 空页面empty 题库详情courseDetail 做题报告 questionReport
         */
        goToPages(type) {
            if (type === 'empty') {
                this.$PageUtil.href('/learningCenter/index/myCourse');
            }
            if (type === 'examSiteSecondsUnderstand') {
                this.$baseUI.confirm({
                    title: '确认信息',
                    content: '确定跳转考点秒懂吗？会自动记录当前做题进度',
                    showCancel: true,
                    confirm: () => {
                        this.onSave('not-finished', '', () => {
                            this.timePause = true;
                            this.$PageUtil.openNewPage(`/learningCenter/knowledge-strengthen?projectId=${this.projectId}`);
                        });
                    },
                });
            }
            if (type === 'courseDetail') {
                let path = `/svip-exam/${this.professionBankId}?sourceType=${this.sourceType}&subjectId=${this.subjectId}`;
                if (this.sourceType === 'YOULU.STUDY') {
                    path += `&classId=${this.classId}&ctapId=${this.$route.query.ctapId}`;
                }
                this.$PageUtil.href(path);
            }
            if (type === 'questionReport') {
                let path = `/svip-exam/${this.professionBankId}/test-report?bankAnswerSheetId=${this.answersheetId}&sourceType=${this.sourceType}&projectId=${
                    this.projectId
                }&answerType=${this.$route.query.answerType}&subjectId=${this.$route.query.subjectId}&projectCode=${
                    this.projectCode
                }&questionBankStatus=special${this.sectionId ? '&sectionId=' + this.sectionId : ''}`;
                if (this.sourceType === 'YOULU.STUDY') {
                    path += `&classId=${this.classId}&className=${this.$route.query.className}&ctapId=${this.$route.query.ctapId}`;
                }
                this.$PageUtil.href(path);
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
         * 计时组件相关方法
         * 1. 时间变化，用于记录答题总计时（正/倒计时通用）
         *
         * @param {number} val 剩余秒数
         * @param {string} str 当前时间样式
         */
        timerChange(val, str) {
            this.useTime = val;
        },
        /**
         * 计时组件相关方法
         * 2. 计时器开始/暂停等状态变化
         *
         * @param {string} status 计时器当前状态 pause start
         */
        changeTimerStatus(status) {
            status === 'pause' ? (this.timePause = true) : (this.timePause = false);
        },

        /**
         * text-exam组件内抛出交卷方法
         */
        onTestExamSavePaper() {
            this.handleSave('submit', 'internal');
        },
        /**
         * 保存做题进度
         *
         * @param {string} type submit: 保存做题进度
         * @param {string} name internal: 提交按钮
         */
        handleSave(type, name) {
            if (type === 'submit') {
                this.debounce(() => {
                    // 如果用户没有答题，则弹出弹窗
                    if (Object.keys(this.theTimeProblem).length === 0) {
                        this.noAnswerAlert();
                        return false;
                    }
                    if (name === 'internal') {
                        this.specialSubmit();
                    } else {
                        this.onSubmit();
                    }
                });
            }
        },

        /**
         * @returns {object} 获取题目数据
         */
        getQuestionData() {
            return this.$refs.questions ? this.$refs.questions.getData() : this.questionList[this.current];
        },

        /**
         * 设置题目数据
         *
         * @param {object} data 数据
         * @param {string} target 针对课内练习做题页去掉确认选择按钮添加的入参，在当前页面更改用户答案时为必传！！
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
                this.operateQuestionBank();
                let item = this.questionList[this.current - 1];
                if (item.title) {
                    this.current--;
                    this.setConfiguration();
                    return;
                }

                this.testPaper.getSingleQuestionInfo(item.questionId).then(() => {
                    let list = this.testPaper.getSpecialQuestionList();
                    let tmp = {};
                    list.forEach((res) => {
                        if (res.questionId === item.questionId) {
                            tmp = res;
                        }
                    });
                    if (tmp.questionId) {
                        if (collectArr.includes(item.typeName)) {
                            tmp.showParseImmediately = false;
                            tmp.parseonly = !!tmp.userAnswer;
                            tmp.isCheckOnly = true;
                            tmp.paperParsing = false;
                        } else {
                            if (!tmp.showParseImmediately) {
                                tmp.showParseImmediately = true;
                            }
                            // 自动查看解析
                            tmp.isCheckOnly = !this.isAutoAnalysis;
                            tmp.parseonly = true;
                            tmp.paperParsing = this.isAutoAnalysis ? !tmp.paperParsing : false;
                        }
                        this.questionList.some((res) => {
                            if (res.questionId === tmp.questionId) {
                                Object.keys(tmp).forEach((k) => {
                                    if (k === 'typeName') {
                                        return;
                                    }
                                    res[k] = tmp[k];
                                });
                                return true;
                            }
                            return false;
                        });
                    }

                    this.current--;
                    this.setConfiguration();
                });
            });
        },

        /**
         * 切换下一题
         */
        onNext() {
            this.debounce(() => {
                if (this.current + 1 >= this.questionList.length) return;
                this.operateQuestionBank();
                let item = this.questionList[this.current + 1];

                if (item.title) {
                    this.current++;
                    this.setConfiguration();
                    return;
                }
                this.testPaper.getSingleQuestionInfo(item.questionId).then(() => {
                    let list = this.testPaper.getSpecialQuestionList();
                    let tmp = {};
                    list.forEach((res) => {
                        if (res.questionId === item.questionId) {
                            tmp = res;
                        }
                    });
                    if (tmp.questionId) {
                        if (collectArr.includes(item.typeName)) {
                            tmp.showParseImmediately = false;
                            tmp.parseonly = !!tmp.userAnswer;
                            tmp.isCheckOnly = true;
                            tmp.paperParsing = false;
                        } else {
                            if (!tmp.showParseImmediately) {
                                tmp.showParseImmediately = true;
                            }
                            // 自动查看解析
                            tmp.isCheckOnly = !this.isAutoAnalysis;
                            tmp.parseonly = true;
                            tmp.paperParsing = this.isAutoAnalysis ? !tmp.paperParsing : false;
                        }
                        this.questionList.some((res) => {
                            if (res.questionId === tmp.questionId) {
                                Object.keys(tmp).forEach((k) => {
                                    if (k === 'typeName') {
                                        return;
                                    }
                                    res[k] = tmp[k];
                                });
                                return true;
                            }
                            return false;
                        });
                    }

                    this.current++;
                    this.setConfiguration();
                });
            });
        },
        /**
         * 重置试题初始状态
         */
        setConfiguration() {
            this.questionList[this.current].isCheckOnly = true;
            this.questionList[this.current].paperParsing = false;
            if (this.questionList[this.current].userAnswer === '') {
                this.questionList[this.current].parseonly = false;
            }
        },
        /**
         * 防抖
         *
         * @param {object} callback 回调函数
         */
        debounce(callback) {
            clearTimeout(this.timer);
            this.timer = setTimeout(callback, 200);
        },

        /**
         * 点击收藏
         *
         */
        onFavorite() {
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
                        let text = '+1 收藏成功，可在课程列表收藏夹中查看';
                        // 题库的收藏夹提示语
                        if (this.sourceType === 'YOULU') {
                            text = '+1 收藏成功，可在收藏夹中查看';
                        }
                        this.$Message.success(text);
                        this.setQuestionData({
                            collectId: res.collectId,
                        });
                        this.questionList[this.current].collectId = res.collectId;
                    },
                    fail: () => {
                        this.$Message.error('收藏失败，请稍后再试');
                    },
                });
            }
        },

        /**
         * 切换答题模式
         *
         * @param {boolean} type true: 试题收起，false：试题展开
         */
        changeAnswerMode(type) {
            for (let i = 0; i < this.questionList.length; i++) {
                if (this.questionList[i].parseonly || this.questionList[i].userAnswer) {
                    this.questionList[i].isCheckOnly = true;
                    this.questionList[i].paperParsing = false;
                }
            }
            this.isAllQuestion = !type;
            this.setConfiguration();
        },

        /**
         * 点击答题卡上小题按钮
         *
         * @param {string} questionId id标识
         */
        clickAnswersheet(questionId) {
            this.operateQuestionBank();
            this.current = (this.questionList || []).findIndex((item) => item.questionId === questionId);

            let item = this.questionList[this.current];
            if (item.title) {
                this.setConfiguration();
                this.$nextTick(() => {
                    const targetOffsetTop = document.getElementById(questionId) && document.getElementById(questionId).offsetTop;
                    window.scrollTo({
                        top: this.isAllQuestion ? targetOffsetTop : 0,
                        behavior: 'smooth',
                    });
                });
                return;
            }
            this.testPaper
                .getSingleQuestionInfo(item.questionId)
                .then(() => {
                    let list = this.testPaper.getSpecialQuestionList((item, index) => {
                        item.showParseImmediately = true;
                    });
                    let tmp = {};
                    list.forEach((res) => {
                        if (res.questionId === item.questionId) {
                            tmp = res;
                        }
                    });
                    if (tmp.questionId) {
                        if (tmp.userAnswer) {
                            if (item.isDetermineQuestion) {
                                tmp.showParseImmediately = false;
                                tmp.parseonly = !!tmp.userAnswer;
                                tmp.isCheckOnly = true;
                                tmp.paperParsing = false;
                            } else {
                                if (!tmp.showParseImmediately) {
                                    tmp.showParseImmediately = true;
                                }
                                // 自动查看解析
                                tmp.isCheckOnly = !this.isAutoAnalysis;
                                tmp.parseonly = true;
                                tmp.paperParsing = this.isAutoAnalysis ? !tmp.paperParsing : false;
                            }
                        }

                        this.questionList.some((res) => {
                            if (res.questionId === tmp.questionId) {
                                Object.keys(tmp).forEach((k) => {
                                    if (k === 'typeName') {
                                        return;
                                    }
                                    res[k] = tmp[k];
                                });
                                return true;
                            }
                            return false;
                        });
                    }
                })
                .then(() => {
                    this.setConfiguration();
                    this.$nextTick(() => {
                        const targetOffsetTop = document.getElementById(questionId) && document.getElementById(questionId).offsetTop;
                        window.scrollTo({
                            top: this.isAllQuestion ? targetOffsetTop : 0,
                            behavior: 'smooth',
                        });
                    });
                });
        },

        /**
         * 更改自动跳转下一题状态
         *
         * @param {boolean} type true:自动跳转下一题,false: 不自动跳转下一题
         */
        changeAutoNext(type) {
            this.isAutomaticJump = type;
            this.showConfirmBtn = !!(this.isAutomaticJump || this.isAutoAnalysis);
        },
        /**
         * 更改自动查看解析
         *
         * @param {boolean} type true:自动查看,false: 不自动查看
         * @returns {boolean} false
         */
        changeAnalysis(type) {
            this.isAutoAnalysis = type;
            this.showConfirmBtn = !!(this.isAutomaticJump || this.isAutoAnalysis);
            // 如果是自动跳转下一题状态则return
            if (this.isAutomaticJump === true) return false;
            // 改变小题列表数据
            if (Array.isArray(this.questionList) && this.questionList.length) {
                for (let i = 0; i < this.questionList.length; i++) {
                    if (this.questionList[i].userAnswer) {
                        if (type === true) {
                            this.questionList[i].parseonly = true;
                            this.questionList[i].isCheckOnly = true;
                        }
                    }
                }
            }
        },

        /**
         * 改变答案
         *
         * @param {object} options 题型类型
         * @param {string} options.typeName 题型类型
         * @param {string} options.answer   用户答案
         * @param {string} options.questionId 当前操作题目标识：去掉确认选择按钮后，失焦的其中一种方式是点击答题卡，所以必须由准确的target，使用原本的current不合理
         */
        onChangeAnswer(options) {
            const target = this.questionList.findIndex((item) => item.questionId === options.questionId);
            // 专项小题库
            let list = JSON.parse(JSON.stringify(this.questionList));
            // 简答题、填空题
            const subjectiveQuestions = ['fill', 'explain'];
            for (let i = 0; i < list.length; i++) {
                const item = list[i];
                if (item.questionId === options.questionId) {
                    item.userAnswer = options.answer;
                    if (collectArr.includes(options.typeName)) {
                        // 单独对简单题、填空题做一个延迟显示查看解析按钮的判断，为了解决点击‘查看解析’按钮显示，下一题无法点击的问题
                        if (subjectiveQuestions.includes(options.typeName)) {
                            // 记录是否做过题
                            item.isCheckAnswer = true;
                            setTimeout(() => {
                                item.showParseImmediately = false;
                                item.parseonly = !!options.answer;
                                item.isCheckOnly = true;
                                item.paperParsing = false;
                            }, 500);
                        } else {
                            item.showParseImmediately = false;
                            item.parseonly = !!options.answer;
                            item.isCheckOnly = true;
                            item.paperParsing = false;
                            // 记录是否做过题
                            item.isCheckAnswer = true;
                        }
                    } else {
                        if (!item.showParseImmediately) {
                            item.showParseImmediately = true;
                        }
                        // 自动查看解析
                        item.isCheckOnly = !this.isAutoAnalysis;
                        item.parseonly = true;
                        item.paperParsing = this.isAutoAnalysis ? !item.paperParsing : false;
                        // 自动跳转下一题
                        if (this.isAutoAnalysis === false) {
                            setTimeout(() => {
                                item.parseonly = true;
                                item.paperParsing = false;
                            }, 500);
                        }
                    }
                    // 记录最后一次答题的答案
                    const newOptions = {
                        userAnswer: options.answer,
                        questionId: options.questionId,
                    };
                    this.setTimeProblem(newOptions);
                }
            }
            this.questionList = list;

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
            // 有“确定”按钮的题型，只有点击了确定、下一题、提交、返回、切换答题卡时才调用保存接口
            if (!collectArr.includes(options.typeName)) {
                // 临时保存
                this.onSave('temporary', options.questionId);
            }
        },

        /**
         * 保存已做进度
         *
         * @param {string} answerStatus 临时保存temporary（用于一题一保存，只保存做题情况，不进行统计计算） 未做完保存进度not-finished
         * @param {string} questionId 临时保存是一题一保存，所需保存的那道题的questionId
         * @param {Function} callback 回调
         */
        onSave(answerStatus, questionId, callback) {
            const questions = this.$refs.questions.getList();
            this.testPaper.saveOrSubmitAnswer({
                answerStatus, // 作答状态:临时保存temporary 未做完保存进度not-finished
                answerWay: 'manual', // 交卷方式:automatic自动、manual手动
                answerScene: 'brush', // 作答场景:brush刷题
                intelligentMarking: this.smartReviewStatus, // 是否智能阅卷（本期没有智能阅卷，默认false）
                useTime: this.useTime,
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
                            answerSheetId: err.getDescription(), // 答题标识
                            answerStatus: 'finished',
                            answerDurationTime: 0,
                            answerWay: 'automatic',
                            answerScene: 'brush',
                            sourceType: this.sourceType,
                            cType: this.testPaper.cType,
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
         *
         */
        onSubmit() {
            const questions = this.$refs.questions.getList();
            this.loading = true;
            let extension = {
                callBackStatus: true,
                classId: this.classId,
                subjectId: this.subjectId,
                callbackSource: 'intelligent',
            };
            this.testPaper.saveOrSubmitAnswer({
                answerStatus: 'finished', // 作答状态
                answerWay: 'manual', // 交卷方式:automatic自动、manual手动
                answerScene: 'brush', // 作答场景
                intelligentMarking: this.smartReviewStatus, // 是否智能阅卷，本期不做智能阅卷，默认false
                useTime: this.useTime,
                questions: questions.filter((item) => item.userAnswer),
                extension: JSON.stringify(extension),
                theTimeProblem: this.theTimeProblem,
                success: (res) => {
                    this.answersheetId = res.bankAnswerSheetId;
                    // 手动交卷在成功后停止计时器
                    this.$refs.timer.api_pause();
                    // 暂停/开始时，如是听力题，材料也要暂停
                    this.setQuestionData({
                        audioPause: true,
                    });
                    this.goToPages('questionReport');
                },
                fail: async (err) => {
                    if (/ANSWERSHEET/.test(err.getDescription())) {
                        // 先交第一份
                        await apis.saveOrSubmitAnswer({
                            paperId: this.paperId, // 试题标识
                            answerSheetId: err.getDescription(), // 答题标识
                            answerStatus: 'finished',
                            answerDurationTime: 0,
                            answerWay: 'automatic',
                            answerScene: 'brush',
                            sourceType: this.sourceType,
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
                    } else if (err.getDescription() !== '请勿重复交卷') {
                        this.$niceloo.api.handleFailure(err);
                    }
                },
                complete: () => {
                    setTimeout(() => {
                        this.loading = false;
                    }, 500);
                },
            });
        },

        /**
         * 未作答弹窗
         */
        noAnswerAlert() {
            this.$baseUI.confirm({
                title: '提示',
                content: '您还未作答，确定要退出吗？',
                showCancel: true,
                cancelText: '取消',
                confirmText: '确定',
                /**
                 * 跳转至题库详情页
                 */
                confirm: () => {
                    this.goToPages('courseDetail');
                },
                /**
                 * 关闭弹窗
                 */
                cancel: () => {},
            });
        },
        /**
         * "查看解析--收起解析"按钮切换
         *
         * @param {object} e 值集合
         * @param {boolean} e.questionId questionId
         * @param {string} e.userAnswer 用户答案
         * @param {string} e.isConfirmStatus 是否是通过点击“确定”执行的回调
         * @returns {boolean} 终止代码运行
         */
        changeCheckOnly(e) {
            // 判断带有“确定”按钮的试题，点击了确定才请求保存接口，并且是已经作答过的状态
            if (e.isConfirmStatus && (this.questionList[this.current].isCheckAnswer || e.userAnswer)) {
                this.questionList[this.current].userAnswer = e.userAnswer;
                this.questionList[this.current].isCheckAnswer = true;
                // 两次答案不一样才调用保存接口
                if (this.questionList[this.current].changeAnswerData !== e.userAnswer) {
                    this.questionList[this.current].changeAnswerData = e.userAnswer;
                    // 临时保存
                    this.onSave('temporary', e.questionId);
                }
            }
            // 开启自动跳转下一题
            if (this.isAutomaticJump && e.isConfirmStatus) {
                this.onNext();
                return false;
            }
            let list = JSON.parse(JSON.stringify(this.questionList));
            for (let i = 0; i < list.length; i++) {
                if (list[i].questionId === e.questionId) {
                    list[i].userAnswer = e.userAnswer;
                    if (e.userAnswer.length === 0 || !list[i].parseonly) {
                        list[i].paperParsing = !e.openParsing;
                        list[i].isCheckOnly = e.openParsing;
                        list[i].parseonly = true;
                    } else {
                        list[i].paperParsing = !e.openParsing;
                        list[i].isCheckOnly = e.openParsing;
                    }
                    if (list[i].paperParsing) {
                        if (!list[i].showParseImmediately) {
                            list[i].showParseImmediately = true;
                        }
                    } else {
                        list[i].showParseImmediately = false;
                    }
                }
            }
            this.questionList = list;
        },
        /**
         * 清空重做
         *
         */
        clearRedo() {
            this.$baseUI.confirm({
                title: '提示',
                content: '是否要清除当前做题页下所有试题的做题记录，并返回第1题重新练习？',
                showCancel: true,
                cancelText: '取消',
                confirmText: '确定',
                /**
                 * “确定”回调
                 */
                confirm: () => {
                    this.testPaper.professionBankAnswerRemove();
                },
            });
        },
        /**
         * 专项小题库保存进度、返回列表提示弹窗（顺序刷题和章节练习）
         */
        specialSubmit() {
            let promptCopy = '';
            // 顺序刷题-A/章节刷题-S
            let str = ['A', 'S'];
            if (str.includes(this.answerType)) {
                promptCopy = '系统将为您保存当前做题进度和做题记录，您可以在下次继续做题';
            } else if (this.answerType === 'R') {
                // 随机练习-R
                promptCopy = '确定要退出本次练习吗？退出后您可以在下次重新抽题练习';
            }
            this.$baseUI.confirm({
                title: '提示',
                content: promptCopy,
                showCancel: true,
                cancelText: '继续做题',
                confirmText: '结束作答',
                /**
                 * “退出”回调函数
                 */
                confirm: () => {
                    this.onSubmit('submit');
                },
            });
        },
        /**
         * 题库权限校验
         */
        async authenticationFun() {
            let errNum = 0;
            // 先判断试题是否删除
            try {
                await this.getProfessionBankInfo().catch((error) => {
                    this.errorMsg = error.getAttachedData().getMsg();
                    this.loading = false;
                    this.authority = false;
                    errNum++;
                    this.$baseUI
                        .alert(error.getAttachedData().getMsg(), '提示', {
                            confirmText: '知道了',
                        })
                        .then(() => {
                            this.$PageUtil.href('/');
                        });
                });
            } catch (err) {
                console.log(err);
            }
            if (errNum > 0) return false;
            if (this.sourceType === 'YOULU.STUDY') {
                try {
                    // 鉴权接口
                    await this.commonAuthorLearnCenter().then((data) => {
                        if (data === false) {
                            this.loading = false;
                            this.authority = false;
                            this.errorMsg = '您没有该题库的做题权限';
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
        },
        /**
         * 意见反馈
         *
         * @param {object} question 试题数据
         */
        onFeedback(question) {
            this.feedback = {
                paperTypeCode: '',
                paperId: '',
                paperName: this.questionBankInfo.professionBankName,
                questionId: question.questionId,
                sourceType: this.sourceType,
            };
            this.showFeedback = true;
        },
        /**
         * 学习答疑
         *
         * @param {object} questionData 试题数据
         */
        clickAnswerQuestions(questionData) {
            this.answerQuestionsStemId = '';
            this.answerQuestionsId = questionData.questionId;
            this.showAnswerQuestions = true;
        },
        /**
         * 判断是否作答
         */
        operateQuestionBank() {
            let operateItem = this.questionList[this.current];
            console.log(operateItem.isDetermineQuestion);
            console.log(operateItem.isCheckAnswer);
            console.log(operateItem.changeAnswerData !== operateItem.userAnswer);
            // 已经作答过并且改变过答案，才会请求保存接口
            if (operateItem.isDetermineQuestion && operateItem.isCheckAnswer && operateItem.changeAnswerData !== operateItem.userAnswer) {
                this.questionList[this.current].changeAnswerData = operateItem.userAnswer;
                // 临时保存
                this.onSave('temporary', operateItem.questionId);
            }
        },
        /**
         * 鉴权判断词典快查权限
         * 1.开启系统课
         */
        showDictFun() {
            if (!this.questionList[this.current].authorStatus) {
                this.$baseUI.confirm({
                    title: '提示',
                    content: '开通本项目系统课即可使用词点快查功能，核心词组，一查即懂',
                    confirmText: '查看系统课',
                    showCancel: false,
                    confirm: () => {
                        this.$PageUtil.openNewPage('/pro-course');
                    },
                });
            } else {
                this.showDict = true;
            }
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
    margin: 23px auto 30px;
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
