import Event from './event.js';
import defaultFormat from './format';
import * as apis from './apis.js';
import { convertArrayToMap, getQuestionNameByType, initOptions } from './utils.js';

// 定义paper类，其属性和方法用于支撑所有试卷所需数据
function Paper(options) {
    this.scene = 'paper'; // 场景值，paper：标准试卷、wrong：错题本、collect：题目收藏
    this.paperId = ''; // 试卷标识
    this.classId = ''; // 班级标识，学习中心课内练习专用，题库的不需要这个
    this.coursewareId = ''; // 课件标识，学习中心课内练习专用，题库的不需要这个
    this.cType = typeof window !== 'undefined' && location.href.indexOf('/agile-course') > -1 ? 'OP.WKWEB' : 'YOULU.WEB'; // 客户端类型
    this.sourceType = ''; // 试卷来源（为了保证可复用性，建议作为options传入而非在内部写死）
    this.useParse = true; // 是否同时查询题目解析
    this.supportQuestionType = Paper.supportQuestionType; // 支持题型

    this.paperDetail = {}; // 试卷详情
    this.paperQuestionTypeList = []; // 试卷大题目列表
    this.questionRawMap = {}; // 题目原始数据
    this.questionList = []; // 试卷题目列表（只有所有小题，用于批量查询题目数据和答题卡数据等）
    this.questionListCount = 0; // 试卷题目列表总数量（只有所有小题，用于批量查询题目数据和答题卡数据等）

    this.answerScene = 'brush'; // 作答场景，mock模考、brush刷题（非模考应该都是brush）
    this.answersheetId = ''; // 答题卡ID
    this.autoQueryLastAnswerSheetId = true; // 是否自动恢复答题卡ID
    this.answerSheetRecord = []; // 答题卡答案记录，可以用于恢复已做答案
    this.answerSheetDetail = {}; // 答题卡详情仅包含基本信息: 答题时长
    this.answersheetList = []; // 答题卡列表，可以查询到最后一次答题卡
    this.useTime = 0; // 试卷答题总时长

    this.event = new Event(this.paperId);
    Object.assign(this, options);

    const timer = setTimeout(() => {
        clearTimeout(timer);
        switch (this.scene) {
            case 'paper':
                this.queryPaperQuestions();
                break;

            case 'wrong':
                this.queryWrongQuestions();
                break;

            case 'collect':
                this.queryCollectQuestions();
                break;
        }
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
 * 通过试卷ID，查询题目数据
 */
Paper.prototype.queryPaperQuestions = async function () {
    if (!this.paperId) {
        return this.error('paperId不能为空');
    }
    if (!this.sourceType) {
        return this.error('sourceType不能为空');
    }

    try {
        // 请求任务集合
        let queryTasks = [];

        /* 第一步：查询试卷详情 */
        queryTasks.push(
            apis.queryPaperDetail({
                paperId: this.paperId,
            })
        );

        /* 第二步：查询试卷所有题型列表 */
        queryTasks.push(
            apis.queryPaperQuestionTypeList({
                paperId: this.paperId,
            })
        );

        /* 第三步，利用promise队列批量请求以上任务，并将其赋值给paper属性 */
        [this.paperDetail, this.paperQuestionTypeList] = await Promise.all(queryTasks);

        /* 第四步：将根据题型列表查询题目详情加入查询队列，并将返回数据组合为一套完整试卷数据 */
        queryTasks = this.paperQuestionTypeList.map((item) =>
            apis.queryPaperQuestionDetailList({
                paperId: this.paperId,
                sourceType: this.sourceType,
                classUniqueCode: this.classUniqueCode || this.paperDetail.classUniqueCode,
                paperSubjectId: item.paperSubjectId,
            })
        );
        const resList = await Promise.all(queryTasks);
        this.paperQuestionTypeList.forEach((item, index) => {
            item.queryPaperQuestionDetail = resList[index];
        });

        /* 将小题题目从大题型中全部取出用于后续批量查询及数据合并 */
        for (let item of this.paperQuestionTypeList) {
            /* 规范大题名称 */
            item.paperSubjectName = getQuestionNameByType(item.paperSubjectType);
            for (let item2 of item.queryPaperQuestionDetail) {
                this.questionRawMap[item2.questionId] = item2;
                this.questionList.push(
                    Object.assign({}, item2, {
                        paperQuestionTotalCount: item.paperQuestionTotalCount, // 本类型主题试题数量
                        paperSubjectAverageScore: item.paperSubjectAverageScore, // 本类型主题题目每题分值
                        paperSubjectTotalScore: item.paperSubjectTotalScore, // 本类型主题总分
                        papersubjectMemo: item.papersubjectMemo, // 本类型主题描述
                        sourceType: this.sourceType,
                    })
                );
            }
        }

        /* 查询全部题目解析 */
        if (this.useParse) {
            await this.queryQuestionsParse();
        }

        /* 自动恢复上次答题卡ID */
        if (!this.answersheetId && this.autoQueryLastAnswerSheetId) {
            /**
             * 根据是否有classId和coursewareId来区分不同的查询答题卡的接口
             * ！注意！这是学习中心的逻辑，题库的会因需求进行变更
             */
            if (this.classId && this.coursewareId) {
                const answersheet = await apis.queryLastAnswersheetIdByCoursewareId({
                    classId: this.classId,
                    coursewareId: this.coursewareId,
                    paperId: this.paperId,
                });
                this.answersheetList.push(answersheet);
                this.answersheetId = answersheet.answersheetStatus !== 'A' ? answersheet.answersheetId : '';
            } else {
                /**
                 * 非学习中心课内练习正常查询即可
                 */
                const answersheetList = (this.answersheetList = await apis.queryAnswersheetProfileList({
                    papertypeCode: this.paperDetail.paperTypeCode,
                    sourceType: this.sourceType, // 来源类型
                    paperIds: this.paperId, // 试卷标识集合
                    classUniquecode: this.paperDetail.classUniqueCode,
                }));
                // 排除掉已经交卷的答题卡
                if (Array.isArray(answersheetList) && answersheetList[0] && answersheetList[0].answersheetStatus !== 'A') {
                    this.answersheetId = answersheetList[0].answersheetId;
                }
            }
        }

        /* 查询答题卡数据 */
        if (this.answersheetId) {
            // 合并请求
            const queryTasks = [
                // 查询答题卡记录
                apis.queryAnswerSheetRecord({
                    answersheetId: this.answersheetId,
                }),
                // 查询答题卡详情
                apis.queryAnswerSheetDetail({
                    paperId: this.paperId,
                    answersheetId: this.answersheetId,
                }),
            ];
            [this.answerSheetRecord, this.answerSheetDetail] = await Promise.all(queryTasks);
            const answerSheetRecordMap = {};
            for (let item of this.answerSheetRecord) {
                for (let item2 of item.questionList) {
                    answerSheetRecordMap[item2.questionId] = item2;
                }
            }

            this.questionList.forEach((item) => {
                const answerSheetRecord = answerSheetRecordMap[item.questionId] || {};
                item.answerSheetRecord = answerSheetRecord;
                // 将答题卡答案还原
                Object.assign(item, {
                    hasConfirmAnswer: Boolean(answerSheetRecord && answerSheetRecord.answersheetDetailId),
                    userAnswer: answerSheetRecord ? answerSheetRecord.answersheetDetailUserAnswer : '',
                    useTime: parseInt(answerSheetRecord ? answerSheetRecord.answerQuestionTime : 0),
                });
            });

            // 答卷时长
            this.useTime = this.answerSheetDetail.answersheetDurationTime;
        }

        this.event.$emit('initPaper', this);
    } catch (err) {
        console.error('初始化试卷失败：', err);
        this.event.$emit('error', typeof err === 'string' ? err : err.getDescription());
    }
};

/**
 * 查询错题本（用于解析组卷，做题组卷也是上面的组卷逻辑）
 */
Paper.prototype.queryWrongQuestions = async function () {
    if (!this.sourceType) {
        return this.error('sourceType不能为空');
    }
    if (!this.questionType) {
        return this.error('questionType不能为空');
    }
    if (!this.classUniqueCode && !this.projectUniCode) {
        return this.error('classUniqueCode/projectUniCode不能为空');
    }
    try {
        console.log(this.pageIndex, this.pageSize);
        const res = await apis.queryWrongQuestionList({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize, // 分页数量
            subjectId: this.subjectId, // 科目标识
            questionType: this.questionType,
            classUniqueCode: this.classUniqueCode, // 题库项目唯一编码
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
        console.error('初始化试卷失败：', err);
        this.event.$emit('error', typeof err === 'string' ? '暂无试题解析' : err.getDescription());
    }
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
        console.error('初始化试卷失败：', err);
        this.event.$emit('error', typeof err === 'string' ? '暂无试题解析' : err.getDescription());
    }
};

/**
 * 查询题目解析
 */
Paper.prototype.queryQuestionsParse = async function () {
    const questionIds = this.questionList.map((item) => item.questionId);
    if (!questionIds.length) return Promise.reject('暂无试题');
    const questTask = [];
    /* 查询题目解析 */
    questTask.push(
        apis.queryAnswerParseList({
            questionIds,
        })
    );
    /* 查询试题收藏状态 */
    if (this.projectUniCode && this.sourceType) {
        questTask.push(
            apis.batchQueryCollectStatus({
                questionIds,
                projectUniCode: this.projectUniCode,
                sourceType: this.sourceType,
            })
        );
    }
    // 批量查询
    const [answerParseList, collectStatusList] = await Promise.all(questTask);
    const answerParseMap = convertArrayToMap(answerParseList.list, 'questionId');
    const collectStatusMap = convertArrayToMap(collectStatusList, 'collectContent');
    /* 将题目解析合并到题目基础数据中 */
    this.questionList.forEach((item) => {
        Object.assign(item, answerParseMap[item.questionId] || {});
        Object.assign(item, collectStatusMap[item.questionId] || {});
    });
};

/**
 * 试卷初始化完成事件
 * @param {Object} callback
 */
Paper.prototype.onInitPaper = function (callback) {
    this.event.$on('initPaper', callback);
};

/**
 * 监听错误消息
 * @param {Object} callback
 */
Paper.prototype.onError = function (callback) {
    this.event.$on('error', callback);
};

/**
 * 抛出错误消息
 * @param {Object} err
 */
Paper.prototype.error = function (err) {
    this.event.$emit('error', err);
};

/**
 * 获取试卷详情
 * @return {Object}
 */
Paper.prototype.getPaperDetail = function () {
    return this.paperDetail;
};

/**
 * 获取题目原始数据
 * @param {Object} questionId
 */
Paper.prototype.getRawQuestionById = function (questionId) {
    return this.questionRawMap[questionId];
};

/**
 * 获取试卷题目类型数组
 * @return {Array}
 */
Paper.prototype.getPaperQuestionTypeList = function () {
    return this.paperQuestionTypeList;
};

/**
 * 从试卷详情中获取逐个题目数据，然后组合组件所需数据格式
 * @param {Function} format 自定义数据格式化方法
 */
Paper.prototype.getQuestionList = function (format) {
    const questionList = [];
    this.questionList.forEach((item) => {
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
 * @return {Number}
 */
Paper.prototype.getQuestionListCount = function () {
    return this.questionListCount;
};

/**
 * 查找最后做题的题目索引
 * @return {Number}
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
 * 获取答题卡题目做题记录
 * @param {String} questionId
 */
Paper.prototype.getQuestionAnswerDetailByAnswerSheet = function (questionId) {
    if (!this._answerSheetRecord) {
        this._answerSheetRecord = {};
        for (let item of this.answerSheetRecord) {
            for (let q of item.questionList) {
                this._answerSheetRecord[q.questionId] = q;
            }
        }
    }
    return this._answerSheetRecord[questionId];
};

/**
 * 保存或提交题目答案
 * @param {Object} options
 */
Paper.prototype.saveOrSubmitAnswer = function (options) {
    const {
        answerStatus, // 作答状态
        answerWay, // 交卷方式
        answerScene, // 作答场景
        extension, // 扩展参数
        intelligentMarking, // 智能阅卷
        useTime, // 作答时长
        questions,
        success,
        fail,
    } = initOptions(options);

    // 组合用户答案集合
    const userAnswers = [];
    questions.forEach((question) => {
        const rawQuestion = this.getRawQuestionById(question.questionId);
        userAnswers.push({
            paperQuestionDetailId: rawQuestion.paperQuestionDetailId, // 试卷试题标识
            paperQuestionDetailSeq: rawQuestion.paperQuestionDetailSeq, // 试卷试题序号
            paperSubjectId: rawQuestion.paperSubjectId || rawQuestion.papersubjectId, // 试卷主题标识
            userAnswer: question.userAnswer, // 用户答案
            answerTime: question.useTime, // 作答时间
        });
    });

    apis.saveOrSubmitAnswer({
        paperId: this.paperId, // 试卷标识
        answerSheetId: this.answersheetId, // 答卷标识
        answerStatus, // 作答状态，枚举值 已完成finished 保存进度not-finished 临时保存，用于一题一保存temporary
        answerDurationTime: useTime, // 作答时长
        answerWay, // 交卷方式，枚举值automatic自动 manual手动
        answerScene, // 作答场景
        sourceType: this.sourceType, // 来源类型
        cType: this.cType, // 客户端类型
        intelligentMarking, // 智能阅卷
        extension, // 扩展参数
        userAnswers, // 用户答案集合

        success: (res) => {
            this.answersheetId = res.answerSheetId;
            success(res);
        },
        fail,
    });
};

/**
 * 添加收藏
 * @param {Object}   options 接收的参数
 * @param {Object}   options.questionId     题目ID
 * @param {Function} options.success     成功回调
 * @param {Function} options.fail           失败回调
 */
Paper.prototype.addCollect = function (options) {
    const { questionId, success, fail } = initOptions(options);

    apis.addCollect({
        questionId,
        classUniqueCode: this.projectUniCode || this.paperDetail.classUniqueCode,
        sourceType: this.sourceType,
        projectCode: this.projectUniCode,

        success,
        fail,
    });
};

/**
 * 取消收藏
 * @param {Object}   options 接收的参数
 * @param {Function} options.collectId      用户收藏标识
 * @param {Function} options.success        成功回调
 * @param {Function} options.fail           失败回调
 * @return {Promise}
 */
Paper.prototype.cancelCollect = function (options) {
    const { collectId, success, fail } = initOptions(options);

    apis.cancelCollect({
        collectId,

        success,
        fail,
    });
};

export default Paper;
