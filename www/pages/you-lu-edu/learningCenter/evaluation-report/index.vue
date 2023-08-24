<template>
    <div class="wrap">
        <!-- 公共头部 -->
        <global-header :is-fixed="false" />
        <!-- 面包屑 -->
        <div class="bread">
            <yl-breadcumb :items="crumbs" />
        </div>
        <div v-loading="loading" class="evaluation-report" id="content" :class="{ empty: !testPaper }">
            <div v-show="!loading && testPaper">
                <report-header need-fixed :title="paperDetail.paperName" @doAgain="goToPages('doPaperExam')" @goBack="goToPages('allTask')" />
                <div class="height-16" />
                <div class="content">
                    <div class="content-left" id="contentLeft">
                        <div class="bk-white padding-16">
                            <!-- 成绩单 -->
                            <report-transcript show-beat-rate :transcript="transcript" :loading="loading" />
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
                                    @onPrev="onPrev"
                                    @onNext="onNext"
                                    @onFavorite="debounce(onFavorite)"
                                    @changeAnswerMode="changeAnswerMode"
                                    @click-opinion="onFeedback"
                                    @click-answer-questions="clickAnswerQuestions"
                                />
                            </template>
                            <!-- 测评报告 -->
                            <report-list v-else :answersheet-id="answersheetId" :project-id="paperDetail.projectId" :project-name="paperDetail.projectName" />
                        </div>
                    </div>
                    <div class="content-right" id="toolsContent" :style="toolsContentStyle">
                        <div id="contentRight">
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
            <empty-page v-show="!loading && !testPaper" :msg="errorMsg" @to-class="goToPages('empty')" />
        </div>
        <!-- 单词快查弹窗 -->
        <dict-box v-if="showDict" :dict-box-show="showDict" :project-id="paperDetail.projectId" @close-dict="showDict = false" />
        <!-- 反馈弹窗 -->
        <feedback-model :is-show.sync="showFeedback" :question-id="feedback.questionId" :paper-detail="feedback" />
        <AnswerQuestionsModel
            :is-show.sync="showAnswerQuestions"
            :subject-id="answerQuestionsSubjectId"
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
import '@/api/qb/api..support-transcript.js'; // 接口-查询学习中心成绩单
import '@/api/qb/api..courseware-paper-parse-authentication.js'; // 接口-周作业月考试卷解析鉴权
import '@/api/bd/api.BD4605.query-bd-subject-list.js'; // 接口-查询基础数据subjectName

import { mapActions } from 'vuex';
import MiXins from '@/www/components/components/question/mixins';
import GlobalHeader from '~/layouts/components/global-header';
import GlobalFooter from '~/layouts/components/global-footer';
import ReportHeader from '@/www/components/learningCenter/evaluation-report/header'; // 标题栏
import ReportTranscript from '@/www/components/learningCenter/evaluation-report/report-transcript'; // 成绩单
import ReportList from '@/www/components/learningCenter/evaluation-report/report-list'; // 左侧测评报告
import AnalysisTab from '@/www/components/components/question/analysis-tab.vue'; // 右侧tab选项卡
import TestExam from '@/www/components/components/question/question-init.vue'; // 左侧解析
import QuestionTool from '@/www/components/components/question/question-tool.vue'; // 右侧学习工具
import DictBox from '@/www/components/dictWidget/components/DictBox'; // 单词快查弹窗
import QuestionCard from '@/www/components/components/question/question-card.vue'; // 右侧答题卡
import FeedbackModel from '@/www/components/components/question/feedback-model.vue'; // 反馈弹窗
import AnswerQuestionsModel from '@/www/components/components/question/answer-questions-model.vue'; // 学习答疑弹窗
import EmptyPage from '@/www/components/learningCenter/do-paper-exam/empty-page'; // 空页面
import Paper from '@/www/components/components/question/js/paper.js'; // 组卷paper类
import ModeSelection from '@/www/pages/you-lu-edu/special-question-brushing/components/mode-selection/mode-selection.vue';
export default {
    components: {
        GlobalHeader,
        GlobalFooter,
        ReportHeader,
        ReportTranscript,
        ReportList,
        AnalysisTab,
        TestExam,
        QuestionTool,
        DictBox,
        QuestionCard,
        FeedbackModel,
        AnswerQuestionsModel,
        EmptyPage,
        ModeSelection,
    },
    mixins: [MiXins],
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
            ], // 面包屑导航
            paperId: '', //试卷标识
            subjectId: '', // 科目标识
            subjectName: '', // 科目名称
            classId: '', // 班级标识
            coursewareId: '', // 资源标识
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
            showDictionary: false, // 是否展示词典快查按钮
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
        };
    },
    computed: {
        /**
         * 测评报告页解析专用，PC端全部解析和错题解析可通过切数据实现，无需再次请求数据，因此将答错试题从小题列表进行过滤
         * @returns {Array} 传入试题组件的小题列表
         */
        proppedQuestionList() {
            return this.active === 'all' ? this.questionList : this.wrongQuestionList;
        },

        /**
         * 测评报告页解析专用，因PC端需要传入大题题型列表，因此也需要对其进行错题过滤
         * @returns {Array} 传入试题组件的大题题型列表
         */
        proppedQuestionTypeList() {
            return this.active === 'all' ? this.paperQuestionTypeList : this.wrongQuestionTypeList;
        },

        /**
         * 答题卡所需展示类型
         * @returns {String}
         */
        paperType() {
            return this.active === 'all' ? 'paperAll' : 'paperWrong';
        },

        /**
         * 右侧工具栏样式切换
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
        active(val) {
            if (val !== 'report') {
                this.$nextTick(() => {
                    this.scrollObserver();
                });
            } else {
                this.removeScrollObserver();
            }
        },
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
    mounted() {
        const { paperId, answersheetId, subjectId, paperTypeCode, coursewareId, classId } = this.$route.params;
        this.paperId = paperId;
        this.answersheetId = answersheetId;
        this.subjectId = subjectId;
        this.paperTypeCode = paperTypeCode;
        this.coursewareId = coursewareId;
        this.classId = classId;
        this.initData();
        this.querySubjectName();
        this.attachEventListener();
    },
    destroyed() {
        this.removeEventListener();
        this.setTimer = this.setTimer ? clearTimeout(this.setTimer) : null;
    },
    methods: {
        // 学习答疑
        clickAnswerQuestions(questionData) {
            this.answerQuestionsStemId = questionData.stemId;
            this.answerQuestionsId = questionData.questionId;
            this.showAnswerQuestions = true;
        },
        /**
         * 查询当前试卷是否展示考点秒懂按钮
         */
        ...mapActions('class-info/learn-tool', {
            getLearnToolsStatus: 'getLearnToolsStatus',
        }),
        ...mapActions('common/answer-questions-permissions', {
            getAnswerQuestionsPermissions: 'getAnswerQuestionsPermissions',
        }),

        /**
         * 定义本页面所有跳转页面方法
         * @param {String} type 枚举值 examSiteSecondsUnderstand考点秒懂 空页面empty doPaperExam做题页 课程详情allTask
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
            if (type === 'doPaperExam') {
                if (this.answerStyle === 'NORMAL') {
                    let url = `/learningCenter/do-paper-test/${this.subjectId}/${this.paperId}/${this.coursewareId}/${this.paperDetail.paperTypeCode}/${
                        this.classId
                    }?className=${encodeURIComponent(this.$route.query.className)}&ctapId=${ctapId}`;
                    // 背题、做题模式
                    if (this.$route.query.solvingModeParse) {
                        this.solvingPopup(url);
                    } else {
                        this.$PageUtil.openNewPage(url);
                    }
                } else if (this.answerStyle === 'FZJK1') {
                    // 仿真机考1
                    this.$PageUtil.openNewPage(
                        `/exam/emulation/login?classUniquecode=${this.paperDetail.classUniqueCode}&subjectId=${this.subjectId}&paperId=${this.paperId}&classId=${this.classId}&coursewareId=${this.coursewareId}&ctapId=${ctapId}`
                    );
                } else if (this.answerStyle === 'FZJK2') {
                    // 仿真机考2
                    this.$PageUtil.openNewPage(
                        `/exam/simulate?classUniquecode=${this.paperDetail.classUniqueCode}&subjectId=${this.subjectId}&paperId=${this.paperId}&classId=${this.classId}&coursewareId=${this.coursewareId}&ctapId=${ctapId}`
                    );
                } else {
                    // 仿真机考3
                    this.$PageUtil.openNewPage(
                        `/emulation/fire-exam/login?classUniquecode=${this.paperDetail.classUniqueCode}&subjectId=${this.subjectId}&paperId=${this.paperId}&classId=${this.classId}&coursewareId=${this.coursewareId}&ctapId=${ctapId}`
                    );
                }
            }
            if (type === 'allTask') {
                this.$PageUtil.href(`/learningCenter/allTask/${this.$route.params.classId}?ctapId=${ctapId}`);
            }
        },
        /**
         *背题、做题模式弹窗
         * @param {string} url 做题页的路径
         */
        solvingPopup(url) {
            this.$baseUI
                .createModel(
                    {
                        modalHeader: (
                            <div class="paper-title-wrap">
                                <div class="title">模式选择</div>
                            </div>
                        ),
                        modalContent: ModeSelection,
                    },
                    {},
                    {
                        width: '328px',
                        height: '230px',
                        radius: '16px',
                        padding: '0',
                    }
                )
                .then(({ type, ret }) => {
                    if (type === 'close') {
                        // 背题模式（可随时看解析）
                        if (ret === 1) {
                            url += `&solvingMode=do-exercise`;
                            this.problemSolvingMode('do-exercise');
                            this.$PageUtil.openNewPage(url);
                        } else if (ret === 2) {
                            // 做题模式（交卷后看解析）
                            url += `&solvingMode=do-exam`;
                            this.problemSolvingMode('do-exam');
                            this.$PageUtil.openNewPage(url);
                        }
                    }
                });
        },
        /**
         * 做题模式数据的存储
         * @param {string} solvingMode 做题模式：do-exercise：背题模式，do-exam：做题模式
         */
        problemSolvingMode(solvingMode) {
            const userInfo = this.$storage.get('loginStatus') || {};
            const modeObj = this.$storage.get('problemSolvingMode') || {};
            const str = `${userInfo.userId}-${this.paperId}`;
            modeObj[str] = solvingMode;
            this.$storage.set('problemSolvingMode', modeObj);
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
         * 针对周作业和月考类型进行鉴权
         */
        paperAuthentication() {
            this.$callApi('qb/courseware-paper-parse-authentication', {
                coursewareId: this.coursewareId, // 课件标识
                paperId: this.paperId, // 试卷标识
                classId: this.classId, // 班级标识
                sourceType: $nuxt.context.env.config.learningCenterSourceType, // 答卷来源

                onsuccess: (res) => {
                    this.answerStyle = res.answerStyle;
                    // 组卷
                    this.initPaper();
                    this.queryTranscript();
                    this.getLearnToolsStatus(this.classId).then((res) => {
                        this.showPoint = res.examSite;
                        this.showDictionary = res.phraseLookup;
                    });
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
                this.queryTranscript();
                this.getLearnToolsStatus(this.classId).then((res) => {
                    this.showPoint = res.examSite;
                    this.showDictionary = res.phraseLookup;
                });
            }
        },

        /**
         * 查询学习中心成绩单
         */
        queryTranscript() {
            this.$callApi('qb/support-transcript', {
                answersheetId: this.answersheetId,
                isRank: 'Y', // 是否查询击败率
                onsuccess: (res) => {
                    this.transcript = res;
                },
                onerror: (err) => {
                    this.$niceloo.api.handleFailure(err);
                },
            });
        },

        /**
         * 获取错题大题题型列表
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
                sourceType: $nuxt.context.env.config.learningCenterSourceType,
                answersheetId: this.answersheetId,
            });

            // 试卷初始化完成
            this.testPaper.onInitPaper(async () => {
                try {
                    this.paperDetail = this.testPaper.getPaperDetail();
                    this.answerQuestionsSubjectId = this.testPaper.getPaperDetail().subjectId;
                    this.crumbs.push({
                        name: this.paperDetail.paperName,
                        href: '#',
                    });
                    var answerQuestionsPermissions = false;
                    await this.getAnswerQuestionsPermissions({ subjectId: this.answerQuestionsSubjectId, projectId: this.paperDetail.projectId })
                        .then((res) => {
                            answerQuestionsPermissions = res;
                        })
                        .catch((err) => {
                            this.$baseUI.alert(err.getDescription());
                        });
                    this.questionList = this.testPaper.getQuestionList((item, index) => {
                        item.parseonly = true;
                        item.paperParsing = true;
                        item.answerQuestionsPermissions = answerQuestionsPermissions;
                        item.hasConfirmAnswer = !!item.userAnswer;
                        item.showParseImmediately = this.isSupport ? index < 1 : true;
                        // 埋点所需参数
                        item.analysisYiGuanData = {
                            page_name: '学习中心试卷查看解析页面',
                            project_name: this.paperDetail.projectName,
                            subject_name: this.subjectName || this.subjectId,
                            paper_name: this.paperDetail.paperName,
                        };
                        return item;
                    }); // 全部试题列表
                    this.paperQuestionTypeList = this.testPaper.getPaperQuestionTypeList(); // 全部试题题型列表
                    this.wrongQuestionList = this.questionList.filter((item) => {
                        const answerDetail = this.testPaper.getQuestionAnswerDetailByAnswerSheet(item.questionId);
                        return answerDetail && answerDetail.answersheetDetailDecideStatus === 'wrong' ? item : false;
                    }); // 错题试题列表
                    this.wrongQuestionTypeList = this.getWrongQuestionTypeList(this.wrongQuestionList); // 错题大题题型列表
                    this.wrongSize = this.wrongQuestionList.length;
                    this.active = this.wrongSize ? 'error' : 'all';
                    console.log(`########testPaper############`, this.testPaper);
                    // 为保证显示试卷时试卷组件已渲染完成而延迟300毫秒
                    setTimeout(() => {
                        this.loading = false;
                    }, 300);
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
         * @param {String} key 枚举值：错题解析error 全部解析all 测评报告report
         */
        changeAnalysisType(key) {
            // 点击查看试题解析与报告埋点上报
            const obj = {
                error: '错题解析',
                all: '全部解析',
                report: '测评报告',
            };
            this.$yiguan.learningCenter('web_learning_center_evaluation_tab', {
                page_name: '学习中心试卷查看解析页面',
                project_name: this.paperDetail.projectName,
                subject_name: this.subjectName || this.subjectId,
                button_name: obj[key],
                college_name: '',
            });
            if (!this.wrongSize && key === 'error') return this.$Message.error('没有错题，不可查看错题解析');
            if (key === 'report') this.removeScrollObserver();
            this.active = key;
            this.current = 0;
            window.scrollTo({
                top: 0,
            });
        },

        /**
         * 点击答题卡上小题按钮
         * @param {Object} question 当前被点击的小题item
         */
        clickAnswersheet(question) {
            this.current = (
                this.$refs.questions ? this.$refs.questions.getList() || [] : this.active === 'all' ? this.questionList || [] : this.wrongQuestionList || []
            ).findIndex((item) => item.questionId === question.questionId);
            this.$nextTick(() => {
                const targetOffsetTop = document.getElementById(question.questionId).offsetTop;
                window.scrollTo({
                    top: this.isAllQuestion ? targetOffsetTop : 0,
                });
            });
        },

        /**
         * 获取题目数据
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
         * @param {Object} data
         * @param {String} target 针对解析时考点列表按需加载添加的入参，非必传，可以理解为所操作数据在questionList中的index
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
                this.current--;
                this.$bus.$emit('knowledge-play-video-pause');
            });
        },

        /**
         * 切换下一题
         */
        onNext() {
            this.debounce(() => {
                if (this.current + 1 >= this.questionList.length) return;
                this.current++;
                this.$bus.$emit('knowledge-play-video-pause');
            });
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
         * @param {Boolean} type 做题组件抛出的当前type true单题模式 false全部展开模式
         */
        changeAnswerMode(type) {
            this.isAllQuestion = !type;
            // 点击全部试题埋点上报
            this.isAllQuestion &&
                this.$yiguan.learningCenter('web_learning_center_all_quetions', {
                    page_name: '学习中心试卷查看解析页面',
                    project_name: this.paperDetail.projectName,
                    college_name: '',
                });
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
                page_name: '学习中心试卷查看解析页面',
                project_name: this.paperDetail.projectName,
                subject_name: '',
                tool_name: toolsName,
                college_name: '',
            });
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
.paper-title-wrap {
    text-align: center;
    margin-bottom: 18px;
    .title {
        font-size: 18px;
        color: #333333;
        font-weight: 700;
    }
}
</style>
