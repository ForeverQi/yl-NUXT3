<!--
 * @Author       : zhouqi
 * @description  : 专项小题库试题解析页
 * @Date         : 2023-07-12 17:22:57
 * @LastEditors  : zhouqi
 * @LastEditTime : 2023-08-15 15:23:22
 * @FilePath     : \nuxt\www\pages\you-lu-edu\special-question-brushing\special-question-analysis\special-question-analysis.vue
-->
<template>
    <div class="wrap">
        <!-- 公共头部 -->
        <global-header :is-fixed="false" />
        <!-- 面包屑 -->
        <div class="bread">
            <!-- <yl-breadcumb :items="crumbs" /> -->
        </div>
        <div v-loading="loading" class="evaluation-report" id="content" :class="{ empty: !testPaper }">
            <div v-show="!loading && testPaper">
                <report-header
                    need-fixed
                    :title="questionBankInfo.professionBankName"
                    :btn-name="btnName"
                    :show-again-btn="false"
                    @goBack="goToPages('specialQuestion')"
                />
                <div class="height-16" />
                <div class="content">
                    <div class="content-left" id="contentLeft">
                        <div class="bk-white padding-16">
                            <!-- 解析 -->
                            <template v-if="['all', 'error'].includes(active)">
                                <test-exam
                                    ref="questions"
                                    paper-parsing-source="parsing"
                                    :list="proppedQuestionList"
                                    :show-close-all="proppedQuestionList.length > 1"
                                    :paper-question-type-list="proppedQuestionTypeList"
                                    :current.sync="current"
                                    :set-type="!isAllQuestion"
                                    :active-index="current"
                                    :show-confirm-btn="false"
                                    @onPrev="onPrev"
                                    @onNext="onNext"
                                    @onFavorite="debounce(onFavorite)"
                                    @changeAnswerMode="changeAnswerMode"
                                    @click-opinion="onFeedback"
                                    @click-answer-questions="clickAnswerQuestions"
                                    @changeCheckOnly="changeCheckOnly"
                                />
                            </template>
                            <!-- 测评报告 -->
                            <report-list v-else :answersheet-id="answersheetId" :project-id="projectId" />
                        </div>
                    </div>
                    <div class="content-right" id="toolsContent" :style="toolsContentStyle">
                        <div id="contentRight">
                            <!-- 学习工具组件 -->
                            <question-tool :show-dictionary="showDictionary" @showDict="showDictFun" @goUnderstand="goToPages('examSiteSecondsUnderstand')" />
                            <div class="height-16" />
                            <!-- tab选项卡 -->
                            <analysis-tab :active="active" @change="changeAnalysisType" />
                            <div class="height-16" />
                            <!-- 答题卡，只有全部解析和错题解析时展示 -->
                            <div class="card-wrap" v-if="['all', 'error'].includes(active)">
                                <div class="question-list">
                                    <question-card
                                        need-scroll
                                        scroll-height="310"
                                        :paper-type="paperType"
                                        :list="proppedQuestionList"
                                        :current="current"
                                        @item-click="clickAnswersheet"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 空页面 -->
            <empty-page v-show="!loading && !testPaper" :is-show-btn="false" :msg="errorMsg" @to-class="goToPages('empty')" />
        </div>
        <!-- 单词快查弹窗 -->
        <dict-box v-if="showDict" :dict-box-show="showDict" :project-id="projectId" @close-dict="showDict = false" />
        <!-- 反馈弹窗 -->
        <feedback-model :is-show.sync="showFeedback" :question-id="feedback.questionId" :paper-detail="feedback" />
        <AnswerQuestionsModel
            :is-show.sync="showAnswerQuestions"
            :subject-id="answerQuestionsSubjectId"
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
import '@/api/qb/api..courseware-paper-parse-authentication.js'; // 接口-周作业月考试卷解析鉴权
import '@/api/bd/api.BD4605.query-bd-subject-list.js'; // 接口-查询基础数据subjectName
import '@/api/qb/api..query-profession-bank-user-stat.js'; // 专项题库基本信息
import '@/api/bd/api..query-show-dict-status.js'; // 权限判断是否有显示词典快查

import { mapActions } from 'vuex';
import MiXins from '@/www/components/components/question/mixins';
import GlobalHeader from '~/layouts/components/global-header';
import GlobalFooter from '~/layouts/components/global-footer';
import ReportHeader from '@/www/components/learningCenter/evaluation-report/header'; // 标题栏
import ReportList from '@/www/components/learningCenter/evaluation-report/report-list'; // 左侧测评报告
import AnalysisTab from '@/www/components/components/question/analysis-tab.vue'; // 右侧tab选项卡
import TestExam from '@/www/components/components/question/question-special-init.vue'; // 左侧解析
import QuestionTool from '@/www/components/components/question/question-tool.vue'; // 右侧学习工具
import DictBox from '@/www/components/dictWidget/components/DictBox'; // 单词快查弹窗
import QuestionCard from '@/www/components/components/question/question-card.vue'; // 右侧答题卡
import FeedbackModel from '@/www/components/components/question/feedback-model.vue'; // 反馈弹窗
import AnswerQuestionsModel from '@/www/components/components/question/answer-questions-model.vue'; // 学习答疑弹窗
import EmptyPage from '@/www/components/learningCenter/do-paper-exam/empty-page'; // 空页面
import Paper from '@/www/pages/you-lu-edu/special-question-brushing/js/paper.js'; // 组卷paper类
import dataMixin from '@/www/pages/you-lu-edu/special-question-brushing/mixins/dataMixin.js';
export default {
    components: {
        GlobalHeader,
        GlobalFooter,
        ReportHeader,
        ReportList,
        AnalysisTab,
        TestExam,
        QuestionTool,
        DictBox,
        QuestionCard,
        FeedbackModel,
        AnswerQuestionsModel,
        EmptyPage,
    },
    mixins: [MiXins, dataMixin],
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
     * @returns {object} data 数据模型
     */
    data() {
        return {
            questionPageType: 'analysis', // 页面类型：解析页
            loading: true, // 页面是否刷新中
            paperId: '', //试卷标识
            subjectId: '', // 科目标识
            subjectName: '', // 科目名称
            classId: '', // 班级标识
            paperTypeCode: '', // 试卷类型
            active: '', // 右侧选项卡入参，错题解析error 全部解析all 测评报告report
            testPaper: null, // 试卷实例
            questionList: [], // 所有小题列表：全部试卷
            wrongQuestionList: [], // 错题列表：错题解析
            paperQuestionTypeList: [], // 所有大题题型列表：全部试卷
            wrongQuestionTypeList: [], // 所有错题题型列表：错题解析
            paperDetail: {}, // 试卷相关信息，其中的projectId可以用作基础数据projectId
            current: 0, // 当前试题在questionList的index
            isAllQuestion: false, // 是否展开全部试题
            answersheetId: '', // 答题卡标识
            questionType: '', // 试题类型
            showDict: false, // 是否显示词点快查弹窗
            showPoint: false, // 是否展示考点秒懂按钮
            showDictionary: true, // 是否展示词典快查按钮
            transcript: {}, // 成绩单数据
            wrongSize: 0, // 错题数量
            errorMsg: '', // 错误信息
            feedback: {}, // 组装的反馈弹窗参数
            showFeedback: false, // 是否展示反馈弹窗
            isFixed: false, // 是否需要置顶
            needFixed: false, // 答题卡区域是否需要fixed
            isAbsolute: false, // 右侧区域是否可开始跟随滚动
            top: 78, // 右侧答题卡定位top
            left: 0, // 右侧答题卡定位left
            eleResizeObserver: null, // content变化监听
            answerStyle: '', // 鉴权后样式，枚举值 NORMAL普通 FZJK1仿真机考1 FZJK2仿真机考2
            showAnswerQuestions: false, // 学习答疑弹窗
            answerQuestionsId: '', // 学习答疑弹窗试题id
            answerQuestionsSubjectId: '', // 答疑弹窗使用 subjectId
            answerQuestionsStemId: '', // 学习答题大题id

            professionBankId: '', //专项题库标识
            answerType: 'A', //答题类型(A:全部;S:章节;R:随机)
            sectionId: '', //章节标识
            sourceId: '', //数据来源标识
            sourceType: '', //数据来源类型
            questionIds: [], //试题标识列表
            questionBankInfo: {}, //专项题库基本信息
            questionsSmall: {}, //小题集合
            unansweredQuestion: {}, //第一个未答试题
            projectId: '', // 项目id
            projectCode: '',
            authority: true, //学习中心-题库权限校验，
            btnName: '返回专属题库',
        };
    },
    computed: {
        /**
         * 测评报告页解析专用，PC端全部解析和错题解析可通过切数据实现，无需再次请求数据，因此将答错试题从小题列表进行过滤
         *
         * @returns {Array} 传入试题组件的小题列表
         */
        proppedQuestionList() {
            let list = this.active === 'all' ? this.questionList : this.wrongQuestionList;
            // list[0].showParseImmediately = false;
            // this.$nextTick(() => {
            //     list[0].showParseImmediately = true;
            // });
            return list;
        },

        /**
         * 测评报告页解析专用，因PC端需要传入大题题型列表，因此也需要对其进行错题过滤
         *
         * @returns {Array} 传入试题组件的大题题型列表
         */
        proppedQuestionTypeList() {
            return this.active === 'all' ? this.paperQuestionTypeList : this.wrongQuestionTypeList;
        },

        /**
         * 答题卡所需展示类型
         *
         * @returns {string} 答题卡所需展示类型
         */
        paperType() {
            return this.active === 'all' ? 'paperAll' : 'paperWrong';
        },

        /**
         * 右侧工具栏样式切换
         *
         * @returns {string} 样式
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
        /**
         *
         * @param {string} val 新值
         */
        active(val) {
            if (val !== 'report') {
                this.$nextTick(() => {
                    this.scrollObserver();
                });
            } else {
                this.removeScrollObserver();
            }
        },
        /**
         *
         * @param {string} val 新值
         */
        isAllQuestion(val) {
            const arr = [this.current - 1, this.current, this.current + 1];
            for (let target in arr) {
                if (target >= 0) {
                    this.setQuestionData(
                        {
                            showParseImmediately: true,
                        },
                        target.toString()
                    );
                }
            }
            this.$nextTick(() => {
                if (this.active !== 'report') {
                    this.scrollObserver();
                }
            });
        },
    },
    /**
     * mounted生命周期函数
     */
    mounted() {
        const { subjectId, paperId, paperTypeCode, classId, sourceType, sectionId, sourceId, questionIds, projectId, projectCode, answerType } =
            this.$route.query;
        this.professionBankId = this.$route.params.professionBankId;
        this.sourceType = sourceType;
        this.sectionId = sectionId || '';
        this.sourceId = sourceId || '';
        this.questionIds = questionIds || [];
        this.answerType = answerType;

        this.subjectId = subjectId;
        this.paperId = paperId;
        this.paperTypeCode = paperTypeCode;
        this.classId = classId;
        this.projectId = projectId;
        this.projectCode = projectCode;
        // 学习中心-题库 权限校验
        this.authenticationFun();
        this.initData();
        // this.querySubjectName();
        this.attachEventListener();
    },
    /**
     *
     */
    destroyed() {
        this.removeEventListener();
        this.setTimer = this.setTimer ? clearTimeout(this.setTimer) : null;
    },
    methods: {
        ...mapActions('common/answer-questions-permissions', {
            getAnswerQuestionsPermissions: 'getAnswerQuestionsPermissions',
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
        // 学习答疑
        /**
         *
         * @param {object} questionData questionData
         */
        clickAnswerQuestions(questionData) {
            this.answerQuestionsStemId = questionData.stemId;
            this.answerQuestionsId = questionData.questionId;
            this.showAnswerQuestions = true;
        },
        /**
         * 查询当前试卷是否展示词典快查按钮
         */
        ...mapActions('class-info/learn-tool', {
            getLearnToolsSpecialStatus: 'getLearnToolsSpecialStatus',
        }),

        /**
         * 定义本页面所有跳转页面方法
         *
         * @param {string} type 枚举值 examSiteSecondsUnderstand考点秒懂 空页面empty doPaperExam做题页 课程详情allTask specialQuestion 专属题库
         */
        goToPages(type) {
            // 部分班级存在没有ctapId的情况，做一下适配
            const ctapId = this.$route.query.ctapId ? this.$route.query.ctapId : '';
            if (type === 'examSiteSecondsUnderstand') {
                this.$PageUtil.openNewPage(`/learningCenter/knowledge-strengthen?projectId=${this.paperDetail.projectId}`);
            }
            if (type === 'empty') {
                // 周作业和月考，鉴权未通过去最外层，鉴权通过的都去详情页；非周作业和月考都去详情页
                if ((['ZZY', 'YK'].includes(this.paperTypeCode) && this.answerStyle) || !['ZZY', 'YK'].includes(this.paperTypeCode)) {
                    this.$PageUtil.href(`/learningCenter/allTask/${this.$route.params.classId}?ctapId=${ctapId}`);
                } else {
                    this.$PageUtil.href('/learningCenter/index/myCourse');
                }
            }
            // 返回到题库详情
            if (type === 'specialQuestion') {
                let path = `/svip-exam/${this.professionBankId}?sourceType=${this.sourceType}&subjectId=${this.subjectId}`;
                if (this.sourceType === 'YOULU.STUDY') {
                    path += `&classId=${this.classId}&ctapId=${this.$route.query.ctapId}`;
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
            this.eleResizeObserver.unobserve(document.getElementsByClassName('content')[0]);
            this.eleResizeObserver = null;
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
             * 1-1. 当此页面header视窗顶部时则切换fixed样式，此时偏移值为页面公共头部高度+面包屑高度：isFixedHeight
             */
            const isFixedHeight =
                document.getElementsByClassName('nav-bg')[0].clientHeight +
                document.getElementsByClassName('header-wrap')[0].clientHeight +
                document.getElementsByClassName('bread')[0].clientHeight;
            const scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop; // 页面已滚动高度
            this.isFixed = scrollTop > isFixedHeight;
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
            const isAbsoluteHeight = leftHeight - rightHight + isFixedHeight;
            this.isAbsolute = scrollTop > isAbsoluteHeight;
        },

        /**
         * 获取错题大题题型列表
         *
         * @param {Array} questionList 大题题型列表
         * @returns {Array} 获取错题大题题型列表
         */
        getWrongQuestionTypeList(questionList) {
            const listMap = {};
            for (let item of questionList) {
                Array.isArray(listMap[item.groupType]) ? listMap[item.groupType].push(item) : (listMap[item.groupType] = [item]);
            }
            const typeList = Object.keys(listMap);
            return this.paperQuestionTypeList.filter((item) => {
                return typeList.indexOf(item.paperSubjectType) >= 0;
            });
        },

        /**
         * 试卷初始化
         */
        initPaper() {
            if (this.testPaper) return;
            this.loading = true;

            this.testPaper = new Paper({
                paperId: this.paperId,
                sourceType: this.sourceType,
                answersheetId: this.answersheetId,
                answerType: this.answerType,

                professionBankId: this.professionBankId,
                sectionId: this.sectionId,
                sourceId: this.sourceId,
                questionIds: this.questionIds,
                projectId: this.projectId,
                projectUniCode: this.projectCode,
                showType: 'parse',
                isReselect: 'N',
                classId: this.classId,
            });

            // 试卷初始化完成
            this.testPaper.onInitPaper(async () => {
                let answerQuestionsPermissions = false;
                try {
                    this.paperDetail = this.testPaper.getPaperDetail();
                    this.answerQuestionsSubjectId = this.subjectId;
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
                        item.parseonly = true;
                        item.paperParsing = true;
                        item.answerQuestionsPermissions = answerQuestionsPermissions;
                        item.hasConfirmAnswer = !!item.userAnswer;
                        item.showParseImmediately = this.isSupport ? index < 1 : true;
                        return item;
                    });
                    // 全部试题列表
                    this.paperQuestionTypeList = this.testPaper.getPaperQuestionTypeList(); // 全部试题题型列表
                    this.wrongQuestionList = this.questionList.filter((item) => {
                        const answerDetail = this.testPaper.getQuestionAnswerDetailByAnswerSheet(item.questionId);
                        return answerDetail && answerDetail.decideStatus === 'N' ? item : false;
                    });
                    // 错题试题列表
                    this.wrongQuestionTypeList = this.getWrongQuestionTypeList(this.wrongQuestionList); // 错题大题题型列表
                    this.wrongSize = this.wrongQuestionList.length;
                    this.active = 'all';
                    if (this.wrongSize > 0) {
                        this.getOneQuestion(this.wrongQuestionList[0].questionId).then(() => {
                            // 为保证显示试卷时试卷组件已渲染完成而延迟300毫秒
                            setTimeout(() => {
                                this.loading = false;
                            }, 300);
                        });
                    }
                } catch (error) {
                    this.$baseUI.alert(error);
                } finally {
                    // 为保证显示试卷时试卷组件已渲染完成而延迟300毫秒
                    setTimeout(() => {
                        this.loading = false;
                    }, 300);
                }
            });

            this.testPaper.onError((errMsg) => {
                this.testPaper = null;
                this.errorMsg = errMsg === '暂无试题' ? '暂无试题解析' : errMsg;
                this.loading = false;
            });
        },

        /**
         * 切换选项卡选项
         *
         * @param {string} key 枚举值：错题解析error 全部解析all 测评报告report
         * @returns {function()} 提示弹窗
         */
        changeAnalysisType(key) {
            if (!this.wrongSize && key === 'error') return this.$Message.error('没有错题，不可查看错题解析');
            if (key === 'report') this.removeScrollObserver();
            this.current = 0;
            this.active = key;
            window.scrollTo({
                top: 0,
            });
        },

        /**
         * 点击答题卡上小题按钮
         *
         * @param {object} question 当前被点击的小题item
         */
        clickAnswersheet(question) {
            this.current = (
                this.$refs.questions ? this.$refs.questions.getList() || [] : this.active === 'all' ? this.questionList || [] : this.wrongQuestionList || []
            ).findIndex((item) => item.questionId === question.questionId);

            let item = {};
            if (this.active === 'error') {
                item = this.wrongQuestionList[this.current];
            } else {
                item = this.questionList[this.current];
            }
            if (item.title) {
                this.$nextTick(() => {
                    const targetOffsetTop = document.getElementById(question.questionId).offsetTop;
                    window.scrollTo({
                        top: this.isAllQuestion ? targetOffsetTop : 0,
                    });
                });
                return;
            }
            this.testPaper.getSingleQuestionInfo(item.questionId).then(() => {
                let list = this.testPaper.getSpecialQuestionList((item, index) => {
                    item.showParseImmediately = true;
                });
                let tmp = {};
                list.forEach((res) => {
                    if (res.questionId === item.questionId) {
                        tmp = {
                            ...res,
                            parseonly: true,
                            paperParsing: true,
                            hasConfirmAnswer: !!item.userAnswer,
                        };
                    }
                });
                if (tmp.questionId) {
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

                this.$nextTick(() => {
                    const targetOffsetTop = document.getElementById(question.questionId).offsetTop;
                    window.scrollTo({
                        top: this.isAllQuestion ? targetOffsetTop : 0,
                    });
                });
            });
        },

        /**
         * 获取题目数据
         *
         * @returns {object} 题目数据
         */
        getQuestionData() {
            return this.$refs.questions
                ? this.$refs.questions.getData()
                : this.active === 'all'
                ? this.questionList[this.current]
                : this.wrongQuestionList[this.current];
        },

        /**
         * 设置题目数据
         *
         * @param {object} data 题目数据
         * @param {string} target 针对解析时考点列表按需加载添加的入参，非必传，可以理解为所操作数据在questionList中的index
         */
        setQuestionData(data, target) {
            if (target) {
                this.$refs.questions
                    ? this.$refs.questions.setData(data, target)
                    : this.active === 'all'
                    ? Object.assign(this.questionList[Number(target)], data)
                    : Object.assign(this.wrongQuestionList[Number(target)], data);
            } else {
                this.$refs.questions
                    ? this.$refs.questions.setData(data)
                    : this.active === 'all'
                    ? Object.assign(this.questionList[this.current], data)
                    : Object.assign(this.wrongQuestionList[this.current], data);
            }
        },

        /**
         * 切换上一题
         */
        onPrev() {
            this.debounce(() => {
                if (this.current === 0) return;
                this.$bus.$emit('knowledge-play-video-pause');

                let item = {};
                if (this.active === 'error') {
                    item = this.wrongQuestionList[this.current - 1];
                } else {
                    item = this.questionList[this.current - 1];
                }

                if (item.title) {
                    this.current--;
                    return;
                }
                this.testPaper.getSingleQuestionInfo(item.questionId).then(() => {
                    let list = this.testPaper.getSpecialQuestionList();
                    let tmp = {};
                    list.forEach((res) => {
                        if (res.questionId === item.questionId) {
                            tmp = {
                                ...res,
                                parseonly: true,
                                paperParsing: true,
                                hasConfirmAnswer: !!res.userAnswer,
                            };
                        }
                    });
                    if (tmp.questionId) {
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
                });
            });
        },
        /**
         *
         * @param {string} questionId 题目ID
         * @returns {Promise} 返回promise
         */
        getOneQuestion(questionId) {
            return this.testPaper.getSingleQuestionInfo(questionId).then(() => {
                let list = this.testPaper.getSpecialQuestionList();
                let tmp = {};
                list.forEach((res) => {
                    if (res.questionId === questionId) {
                        tmp = {
                            ...res,
                            parseonly: true,
                            paperParsing: true,
                            hasConfirmAnswer: !!res.userAnswer,
                        };
                    }
                });
                if (tmp.questionId) {
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
            });
        },
        /**
         * 切换下一题
         */
        onNext() {
            this.debounce(() => {
                if (this.current + 1 >= this.questionList.length) return;
                let item = {};
                if (this.active === 'error') {
                    item = this.wrongQuestionList[this.current + 1];
                } else {
                    item = this.questionList[this.current + 1];
                }

                if (item.title) {
                    this.current++;
                    return;
                }
                this.testPaper.getSingleQuestionInfo(item.questionId).then(() => {
                    let list = this.testPaper.getSpecialQuestionList();
                    let tmp = {};
                    list.forEach((res) => {
                        if (res.questionId === item.questionId) {
                            tmp = {
                                ...res,
                                parseonly: true,
                                paperParsing: true,
                                hasConfirmAnswer: !!res.userAnswer,
                            };
                        }
                    });
                    if (tmp.questionId) {
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
                });
            });
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
                    },
                    fail: (err) => {
                        console.error(err);
                        this.$Message.error('收藏失败，请稍后再试');
                    },
                });
            }
        },

        /**
         * 点击反馈按钮
         *
         * @param {object} question question
         */
        onFeedback(question) {
            this.feedback = {
                paperTypeCode: this.paperDetail.paperTypeCode,
                paperId: this.paperId,
                paperName: this.paperDetail.paperName,
                questionId: question.questionId,
            };
            this.showFeedback = true;
        },

        /**
         * 切换答题模式
         *
         * @param {boolean} type 做题组件抛出的当前type true单题模式 false全部展开模式
         */
        changeAnswerMode(type) {
            this.isAllQuestion = !type;
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
                    if (error.getAttachedData().getData().code === '40013') {
                        this.loading = false;
                        this.authority = false;
                        errNum++;
                        this.$baseUI
                            .alert(this.errorMsg, '提示', {
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
         * "查看解析--收起解析"按钮切换
         *
         * @param {object} e 值集合
         * @param {boolean} e.questionId questionId
         * @param {string} e.userAnswer 用户答案
         * @param {string} e.isConfirmStatus 是否是通过点击“确定”执行的回调
         */
        changeCheckOnly(e) {
            let list = this.questionList;
            for (let i = 0; i < list.length; i++) {
                if (list[i].questionId === e.questionId) {
                    list[i].userAnswer = e.userAnswer;
                    if (e.userAnswer.length === 0) {
                        list[i].paperParsing = !e.openParsing;
                        list[i].parseonly = true;
                    } else {
                        list[i].paperParsing = !e.openParsing;
                    }
                }
            }
            this.questionList = list;
        },
        /**
         * 鉴权判断词典快查权限
         * 1.开启系统课2.该项目是否开启答疑权限
         */
        showDictFun() {
            if (!this.questionList[this.current].authorStatus || !this.questionList[this.current].authStatus) {
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

.evaluation-report {
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
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
        }

        .content-right {
            width: 330px;
            z-index: 0;
        }
    }
}
</style>

<style lang="less" scoped>
.card-wrap {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 8px 0 20px;
    min-height: 240px;
    max-height: 538px;
    background: #ffffff;

    .title-box {
        width: 285px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e8e8e8;
        padding: 15px 0;

        .title {
            font-size: 16px;
            font-weight: 700;
            color: #3a3d4b;
            line-height: 16px;
        }
    }

    .question-list {
        padding-bottom: 25px;
    }
}

.bk-white {
    background: #ffffff;
}

.padding-16 {
    padding: 16px;
}

.height-12 {
    height: 12px;
}

.height-16 {
    height: 16px;
}
</style>
