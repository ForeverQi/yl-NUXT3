import Event from './event.js';
import defaultFormat from './format';
import * as apis from './apis.js';
// import { convertArrayToMap, getQuestionNameByType, initOptions } from './utils.js';
import { convertArrayToMap, initOptions } from './utils.js';

// 定义paper类，其属性和方法用于支撑所有试题所需数据
/**
 *
 * @param {object} options 类型集合
 */
function Paper(options) {
    // this.professionBankId = '';
    this.answerType = '';
    this.sectionId = '';
    this.classId = '';
    this.sourceType = '';
    this.questionIds = [];
    this.questionBankInfo = {}; //专项题库基本信息
    this.questionSmall = {}; //小题集合
    this.unansweredQuestion = {}; //第一个未答试题
    this.questionDetail = []; //试题详情
    this.projectId = ''; //项目标识

    this.showType = options.showType ? options.showType : '';
    this.cType = typeof window !== 'undefined' && location.href.indexOf('/agile-course') > -1 ? 'OP.WKWEB' : 'YOULU.WEB'; // 客户端类型
    this.useParse = true; // 是否同时查询题目解析
    this.supportQuestionType = Paper.supportQuestionType; // 支持题型

    this.paperDetail = {}; // 试题详情
    this.paperQuestionTypeList = []; // 试题大题目列表
    this.questionRawMap = {}; // 题目原始数据
    this.questionList = []; // 试题题目列表（只有所有小题，用于批量查询题目数据和答题卡数据等）
    this.questionListCount = 0; // 试题题目列表总数量（只有所有小题，用于批量查询题目数据和答题卡数据等）

    this.answersheetId = ''; // 答题卡ID
    this.autoQueryLastAnswerSheetId = true; // 是否自动恢复答题卡ID
    this.answerSheetRecord = []; // 答题卡答案记录，可以用于恢复已做答案
    this.answerSheetDetail = {}; // 答题卡详情仅包含基本信息: 答题时长
    this.answersheetList = []; // 答题卡列表，可以查询到最后一次答题卡
    this.useTime = 0; // 试题答题总时长

    this.currentQuestionId = ''; // 当前显示试题ID
    this.projectUniCode = '';
    this.sectionName = '未关联章节试题'; // 章节名称
    this.isReselect = 'Y'; //是否重新抽题（Y:重新抽取，N:不重新抽取）

    this.event = new Event('');
    Object.assign(this, options);

    const timer = setTimeout(() => {
        clearTimeout(timer);
        this.queryPaperQuestions();
    });
}

/**
 * 支持的题型
 */
Paper.supportQuestionType = [
    // 七种基本题型
    'judge', // 判断题J
    'single', // 单选题S
    'multiple', // 多选题M
    'fill', // 填空题F
    'indefinite', // 不定项选择题I
    'blank-choose', // 选词填空BC
    'opinion', // 简答题O
    // 四种复合题型
    'cloze-fill', // 完形填空CF
    'analysis-judge', // 案例分析A-判断题
    'analysis-single', // 案例分析A-单选题
    'analysis-multiple', // 案例分析A-多选题
    'analysis-indefinite', // 案例分析A-定项选择题
    'analysis-opinion', // 案例分析A-简答题
    'analysis-fill', // 案例分析A-填空题
    'listening-judge', // 听力题L-判断题
    'listening-single', // 听力题L-单选题
    'listening-multiple', // 听力题L-多选题
    'listening-indefinite', // 听力题L-定项选择题
    'listening-opinion', // 听力题L-简答题
    'listening-fill', // 听力题L-填空题
    'compatibility-judge', // 配伍题C-判断题
    'compatibility-single', // 配伍题C-单选题
    'compatibility-multiple', // 配伍题C-多选题
    'compatibility-indefinite', // 配伍题C-定项选择题
    'compatibility-opinion', // 配伍题C-简答题
];

/**
 * 查询题目数据
 */
Paper.prototype.queryPaperQuestions = async function () {
    try {
        const questionIds = [];
        // 试题详情集合
        let questionDetail = [];
        // 专属题库基本信息
        let questionBankInfo = [];
        // 非学员查看系统课权限状态
        let authorStatus = false;
        // 答疑权限校验
        let authStatus = false;
        const queryTasksAll = [];
        // 所有大题类型
        const questionsBrief = [];
        // 专项题库答题卡
        const answerObj = await apis.queryProfessionBankAnswer({
            professionBankId: this.professionBankId,
            answerType: this.answerType,
            sourceType: this.sourceType,
            sectionId: this.sectionId,
            sourceId: this.classId,
            isReselect: this.isReselect,
        });
        if (answerObj) {
            this.unansweredQuestion = answerObj.unansweredQuestion;
            this.answerSheetRecord = answerObj.questionTypes;
            this.currentQuestionId = this.unansweredQuestion ? this.unansweredQuestion.questionId : null;
            if (this.showType === 'parse') {
                this.currentQuestionId = null;
            }
            for (let i = 0; i < answerObj.questionTypes.length; i++) {
                for (let j = 0; j < answerObj.questionTypes[i].questionAnswers.length; j++) {
                    let item = answerObj.questionTypes[i].questionAnswers[j];
                    if (i === 0 && j === 0 && !this.currentQuestionId) {
                        this.currentQuestionId = item.questionId;
                    }
                    const obj = {
                        questionTotal: answerObj.questionTypes[i].questionTotal, // 试题数量
                        questionType: answerObj.questionTypes[i].questionType, //试题类型(S:单选题;M:多选题;I:不定项选择题;O:简答题;J:判断题;F:填空题;BC:选词填空题;A:案例分析题;CF:完形填空题;L:听力题;C:配伍题)
                        questionTypeName: answerObj.questionTypes[i].questionTypeName, //试题类型名称
                    };
                    const newObj = Object.assign(obj, item);
                    this.questionList.push(newObj);
                    questionsBrief.push(answerObj.questionTypes[i]);
                    questionIds.push(item.questionId);
                }
            }
        }
        this.questionIds = questionIds;
        // 试题详情集合
        queryTasksAll.push(apis.queryQuestionInfoList({ questionIds: [this.currentQuestionId] }));
        // 专属题库基本信息
        queryTasksAll.push(apis.queryProfessionBankInfo({ professionBankId: this.professionBankId }));
        [questionDetail, questionBankInfo] = await Promise.all(queryTasksAll);
        // 试题总数量
        questionBankInfo.sumQuestionTotal = answerObj.questionTotal;
        this.questionBankInfo = questionBankInfo;
        // 答题卡数据、试题详情数据合并
        if (questionDetail && questionDetail.length) {
            for (let i = 0; i < this.questionList.length; i++) {
                for (let j = 0; j < questionDetail.length; j++) {
                    if (this.questionList[i].questionId === questionDetail[j].questionId) {
                        this.questionList[i] = Object.assign(this.questionList[i], questionDetail[j]);
                        break;
                    }
                }
            }
        }
        this.questionDetail = questionDetail;
        // 非学员查看系统课权限状态
        try {
            await apis.queryCommonAuthor({ projectId: this.projectId }).then((res) => {
                if (res.authorStatus === true) authorStatus = res.authorStatus;
            });
        } catch (error) {
            console.log(error);
        }
        // 答疑权限校验
        try {
            await apis.queryQuestionAuth({ projectId: this.projectId, classId: this.classId, questionType: 'P' }).then((res) => {
                if (res.authStatus === 'Y') authStatus = res.authStatus;
            });
        } catch (error) {
            console.log(error);
        }
        for (let i = 0; i < this.questionList.length; i++) {
            this.questionList[i].authorStatus = authorStatus;
            this.questionList[i].authStatus = authStatus;
        }
        // 查询题目解析
        await this.queryQuestionsParse();
        this.paperQuestionTypeList = questionsBrief;
        // 章节刷题获取章节名称（非未关联章节试题）
        if (this.answerType === 'S' && this.sectionId !== 'NO_ASSOCIATION_CHAPTER') {
            const sectionObj = await apis.querySectionInfo({
                sectionId: this.sectionId,
            });
            this.sectionName = sectionObj.sectionName;
        }

        this.event.$emit('initPaper', this);
    } catch (err) {
        console.error('初始化试题失败：', err);
        this.event.$emit('error', typeof err === 'string' ? err : err.getDescription());
    }
};

/**
 *  获取试题详情
 *
 * @param {string} questionId 试题ID
 */
Paper.prototype.getSingleQuestionInfo = async function (questionId) {
    this.currentQuestionId = questionId;
    let questionDetail = await apis.queryQuestionInfoList({ questionIds: [this.currentQuestionId] });

    // 答题卡数据、试题详情数据合并
    if (questionDetail && questionDetail.length) {
        for (let i = 0; i < this.questionList.length; i++) {
            for (let j = 0; j < questionDetail.length; j++) {
                if (this.questionList[i].questionId === questionDetail[j].questionId) {
                    this.questionList[i] = Object.assign(this.questionList[i], questionDetail[j]);
                    break;
                }
            }
        }
    }

    // 查询题目解析
    await this.queryQuestionsParse();
};

/**
 * 查询收藏（用于解析组卷，做题组卷也是上面的组卷逻辑）
 */
Paper.prototype.queryCollectQuestions = async function () {
    if (!this.sourceType) {
        return this.error('sourceType不能为空');
    }
    if (!this.questionType) {
        return this.error('questionType不能为空');
    }
    if (!this.classUniqueCode && !this.projectUniCode) {
        return this.error('classUniqueCode不能为空');
    }
    try {
        const res = await apis.queryCollectQuestionList({
            pageSize: this.pageSize, // 分页数量
            pageIndex: this.pageIndex, // 分页数量
            subjectId: this.subjectId, // 科目标识
            questionType: this.questionType,
            classUniqueCode: this.classUniqueCode, // 项目唯一编码
            sourceType: this.sourceType, // 来源类型
            projectCode: this.projectUniCode,
        });
        const questionList = res.list;
        this.questionListCount = res.count;
        questionList.forEach((item) => {
            this.questionRawMap[item.questionId] = item;
            this.questionList.push(
                Object.assign(
                    {
                        sourceType: this.sourceType,
                    },
                    item
                )
            );
        });

        /* 查询题目解析 */
        if (this.useParse) {
            await this.queryQuestionsParse();
        }

        this.event.$emit('initPaper', this);
    } catch (err) {
        console.error('初始化试题失败：', err);
        this.event.$emit('error', typeof err === 'string' ? '暂无试题解析' : err.getDescription());
    }
};

/**
 * 试题初始化完成事件
 *
 * @param {object} callback 回调函数
 */
Paper.prototype.onInitPaper = function (callback) {
    this.event.$on('initPaper', callback);
};

/**
 * 监听错误消息
 *
 * @param {object} callback 回调函数
 */
Paper.prototype.onError = function (callback) {
    this.event.$on('error', callback);
};

/**
 * 抛出错误消息
 *
 * @param {object} err 错误描述
 */
Paper.prototype.error = function (err) {
    this.event.$emit('error', err);
};

/**
 * 获取试题详情
 *
 * @returns {object} 试题详情数据
 */
Paper.prototype.getPaperDetail = function () {
    return this.questionDetail;
};

/**
 * 获取题目原始数据
 *
 * @param {object} questionId id标识
 * @returns {object} {}
 */
Paper.prototype.getRawQuestionById = function (questionId) {
    return this.questionRawMap[questionId];
};

/**
 * 获取试题题目类型数组
 *
 * @returns {Array} 题目类型数组
 */
Paper.prototype.getPaperQuestionTypeList = function () {
    return this.paperQuestionTypeList;
};

/**
 * 从试题详情中获取逐个题目数据，然后组合组件所需数据格式
 *
 * @param {Function} format 自定义数据格式化方法
 * @returns {Array} 自定义组件所需数据格式
 */
Paper.prototype.getQuestionList = function (format) {
    const questionList = [];
    this.questionList.forEach((item, index) => {
        const question = defaultFormat(Object.assign({}, item)) || item;

        // 过滤题型
        if (!this.supportQuestionType.includes(question.type)) {
            return console.warn(`[不支持的题型：${question.type}]`, item);
        }
        // 处理好的题目数据放到列表中
        questionList.push(question);
    });

    // 再次使用自定义格式化方法过滤
    if (typeof format === 'function') {
        questionList.forEach((item, index) => format(item, index, this.getRawQuestionById(item.questionId)));
    }

    this.questionList = JSON.parse(JSON.stringify(questionList));
    return questionList;
};

/**
 * 获取错题本或收藏夹-试题列表总长度
 *
 * @returns {number} 试题列表总长度
 */
Paper.prototype.getQuestionListCount = function () {
    return this.questionListCount;
};
/**
 * 获取章节名称
 *
 * @returns {string} 章节名称
 */
Paper.prototype.getSectionName = function () {
    return this.sectionName;
};

/**
 * 获取答题卡题目做题记录
 *
 * @param {string} questionId id标识
 * @returns {object} {}
 */
Paper.prototype.getQuestionAnswerDetailByAnswerSheet = function (questionId) {
    if (!this._answerSheetRecord) {
        this._answerSheetRecord = {};
        for (let item of this.answerSheetRecord) {
            for (let q of item.questionAnswers) {
                this._answerSheetRecord[q.questionId] = q;
            }
        }
    }
    return this._answerSheetRecord[questionId];
};

/**
 * 添加收藏
 *
 * @param {object}   options 接收的参数
 * @param {object}   options.questionId     题目ID
 * @param {Function} options.success     成功回调
 * @param {Function} options.fail           失败回调
 */
Paper.prototype.addCollect = function (options) {
    const { questionId, success, fail } = initOptions(options);

    apis.addCollect({
        questionId,
        classUniqueCode: this.projectUniCode,
        sourceType: this.sourceType,
        projectCode: this.projectUniCode,

        success,
        fail,
    });
};

/**
 * 取消收藏
 *
 * @param {object}   options 接收的参数
 * @param {Function} options.collectId      用户收藏标识
 * @param {Function} options.success        成功回调
 * @param {Function} options.fail           失败回调
 */
Paper.prototype.cancelCollect = function (options) {
    const { collectId, success, fail } = initOptions(options);

    apis.cancelCollect({
        collectId,

        success,
        fail,
    });
};

/**
 * 获取专项题库基本信息
 *
 * @returns {object} 专项题库基本数据
 */
Paper.prototype.getQuestionInfo = function () {
    return this.questionBankInfo;
};
/**
 * 从试题详情中获取逐个题目数据，然后组合组件所需数据格式
 *
 * @param {Function} format 自定义数据格式化方法
 * @returns {Array} 自定义组件所需数据格式
 */
Paper.prototype.getSpecialQuestionList = function (format) {
    const questionsSmall = [];

    this.questionList.forEach((item, index) => {
        if (
            ['CF', 'cloze-fill', 'A', 'analysis', 'L', 'listening', 'C', 'pwt', 'compatibility'].includes(
                item.questionStemType || item.questionType || item.groupType
            )
        ) {
            if (!item.stemContent && !item.questionstemContent) {
                item.stemContent = '{}';
            }
        }
        if (!item.questionContent && !item.content) {
            item.questionContent = '{}';
        }
        const question = defaultFormat(Object.assign({}, item)) || item;

        // 过滤题型
        if (!this.supportQuestionType.includes(question.type)) {
            return console.warn(`[不支持的题型：${question.type}]`, item);
        }
        // 处理好的题目数据放到列表中
        questionsSmall.push(question);
    });

    // 再次使用自定义格式化方法过滤
    if (typeof format === 'function') {
        questionsSmall.forEach((item, index) => format(item, index, this.getRawQuestionById(item.questionId)));
    }
    this.questionList = JSON.parse(JSON.stringify(questionsSmall));
    return questionsSmall;
};

/**
 * 保存或提交题目答案
 *
 * @param {object} options 类型聚合
 */
Paper.prototype.saveOrSubmitAnswer = function (options) {
    // 专项小题库的交卷接口
    const {
        answerStatus, // 作答状态
        questions,
        useTime,
        success,
        fail,
        theTimeProblem, //本次做题的最后一题的答案
    } = initOptions(options);
    // 组合用户答案集合
    const userAnswers = [];
    // "结束作答"时，userAnswers传入一道题的答案，因为每做一题已经做了临时保存,不能传入空数组
    if (answerStatus === 'finished') {
        if (theTimeProblem) userAnswers.push(theTimeProblem);
    } else {
        questions.forEach((question) => {
            userAnswers.push({
                questionId: question.questionId, // 试题试题序号
                userAnswer: question.userAnswer, // 用户答案
            });
        });
    }
    apis.queryComputeProfessionBankAnswer({
        professionBankId: this.professionBankId,
        bankAnswerSheetId: this.answersheetId,
        sourceType: this.sourceType,
        // 已完成finished 保存进度not-finished 临时保存，用于一题一保存temporary
        answerStatus: answerStatus === 'finished' ? 'G' : 'T',
        answerDurationTime: useTime,
        sourceId: this.classId,
        userAnswers,

        success: (res) => {
            // 保存成功过一次，就把bankAnswerSheetId传入下一次的保存接口
            this.answersheetId = res.bankAnswerSheetId;
            success(res);
        },
        fail,
    });
};

/**
 * 获取答题卡列表
 *
 * @returns {Array} 答题卡列表
 */
Paper.prototype.getQuestionCardData = function () {
    return this.questionList;
};

/**
 * 清空答题卡记录
 */
Paper.prototype.professionBankAnswerRemove = function () {
    let questionIds = [];
    // 只有随机刷题的时候，需要传questionIds，章节刷题和顺序练习的时候不需要传
    if (this.answerType === 'R') {
        questionIds = this.questionList.map((item) => item.questionId);
    }
    apis.queryProfessionBankAnswerRemove({
        professionBankId: this.professionBankId,
        answerType: this.answerType,
        sectionId: this.sectionId,
        questionIds,
        sourceType: this.sourceType,
        sourceId: this.classId,
        success: () => {
            // 刷新页面
            let url = location.href;
            // 随机刷题，清空重做不重新抽取试题
            if (this.answerType === 'R' && !url.includes('isReselect=N')) {
                url = location.href + '&isReselect=N';
                location.replace(url);
            } else {
                location.reload();
            }
        },
        fail: (err) => {
            console.log(err);
        },
    });
};

/**
 * 查找最后做题的题目索引
 *
 * @param {function()} checkFun 题库数据
 * @returns {number} 题目索引
 */
Paper.prototype.getLastAnswerQuestionIndex = function (checkFun) {
    if (typeof checkFun !== 'function') {
        checkFun = (item) => !item.userAnswer.length;
    }

    for (let i in this.questionList) {
        const item = this.questionList[i];

        // 自定义验证方法
        if (checkFun(item)) {
            return parseInt(i);
        }

        // 最后一题
        if (parseInt(i) === this.questionList.length - 1) {
            return parseInt(i);
        }
    }

    return 0;
};

/**
 * 查询试题解析、收藏状态
 */
Paper.prototype.queryQuestionsParse = async function () {
    const questionIds = this.questionList.map((item) => item.questionId);
    if (!questionIds.length) return Promise.reject('暂无试题');
    const questTask = [];
    /* 查询题目解析 */
    questTask.push(apis.queryQuestionParse({ questionIds: [this.currentQuestionId], ctype: this.cType }));
    /* 查询试题收藏状态 */
    if (this.sourceType) {
        questTask.push(
            apis.batchQueryCollectStatus({
                questionIds: [this.currentQuestionId],
                projectUniCode: this.projectUniCode,
                sourceType: this.sourceType,
            })
        );
    }
    // 批量查询
    const [answerParseList, collectStatusList] = await Promise.all(questTask);
    const answerParseMap = convertArrayToMap(answerParseList.questionParses, 'questionId');
    const collectStatusMap = convertArrayToMap(collectStatusList, 'collectContent');
    /* 将题目解析合并到题目基础数据中 */
    this.questionList.forEach((item) => {
        Object.assign(item, answerParseMap[item.questionId] || {});
        Object.assign(item, collectStatusMap[item.questionId] || {});
    });
};
export default Paper;
