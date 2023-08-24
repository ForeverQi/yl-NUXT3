/**
 * 该工厂类用于管理题库控件内各种不同题型的格式化方法函数
 * 1. 将题目分为客观题（单独成题）和主观题（一材料多题）两种题型
 * 2. createObjectiveQuestion() 规范题目基础数据
 */

import { checkQuestionType } from './utils.js';
/**
 * 将接口返回的题目数据转换为题目组件所需的数据格式
 *
 * @param {object} question question
 * @returns {string} string
 */
export default function (question) {
    let type = null;
    let groupType = null;
    if (question.type) {
        type = question.type.replace(question.groupType + '-', '');
        groupType = question.groupType;
    }
    const questionType = checkQuestionType(
        groupType || question.papersubjectType || question.questionStemType || question.questionType,
        type || question.questionType
    );
    const methods = {
        judge, // 判断题
        single, // 单选题
        multiple, // 多选题
        indefinite, // 不定项选择题
        opinion, // 简答题
        fill, // 填空题
        'blank-choose': blankChoose, // 选词填空
        'cloze-fill': clozeFill, // 完形填空
        'listening-judge': listeningJudge, // 听力题L-判断题
        'listening-single': listeningSingle, // 听力题L-单选题
        'listening-multiple': listeningMultiple, // 听力题L-多选题
        'listening-indefinite': listeningIndefinite, // 听力题L-定项选择题
        'listening-opinion': listeningOpinion, // 听力题L-简答题
        'listening-fill': listeningFill, // 听力题L-填空题
        'analysis-judge': analysisJudge, // 案例分析A-判断题
        'analysis-single': analysisSingle, // 案例分析A-单选题
        'analysis-multiple': analysisMultiple, // 案例分析A-多选题
        'analysis-indefinite': analysisIndefinite, // 案例分析A-定项选择题
        'analysis-opinion': analysisOpinion, // 案例分析A-简答题
        'analysis-fill': analysisFill, // 案例分析A-填空题
        'compatibility-judge': compatibilityJudge, // 配伍题C-判断题
        'compatibility-single': compatibilitySingle, // 配伍题C-单选题
        'compatibility-multiple': compatibilityMultiple, // 配伍题C-多选题
        'compatibility-indefinite': compatibilityIndefinite, // 配伍题C-定项选择题
        'compatibility-opinion': compatibilityOpinion, // 配伍题C-简答题
    };
    const format = methods[questionType];
    if (format) return format(question);
}

/**
 * 创建客观题题目数据
 *
 * @param {object} question question
 * @param {object} extraData extraData
 * @returns {object} object
 */
function createObjectiveQuestion(question, extraData) {
    const content = JSON.parse(question.questionContent || question.content);
    // 题目组件所需数据
    const baseQuestion = {
        type: '', // 题目类型
        typeName: question.papersubjectName, // 题目类型名称
        title: String(content.title || ''), // 题目
        userAnswer: String(question.userAnswer || ''), // 用户的答案
        correctAnswer: String(question.answer || question.questionAnswer || ''), // 参考答案
        answerParse: String(question.answerParse || ''), // 答案解析
        questionId: String(question.questionId || ''), // 题目唯一标识
        collectId: question.collectStatus === 'collect' && question.collectId ? question.collectId : '', // 收藏唯一标识（收藏后取消收藏仍会有collectId，因此要以收藏状态为准）
        hasConfirmAnswer: question.hasConfirmAnswer, // 用户是否已经做题
        parseonly: false, // 是否只显示解析状态，无法做题
        useTime: 0, // 答题计时
        questionVpath: question.mediaParses || [], // 答案解析视频vid
        answerCorrectRate: question.rightRate, // 正确率
        answerAccount: question.answerAccount, // 试题答题总次数
        papersubjectId: question.papersubjectId, // 试卷主题标识
        paperQuestionTotalCount: question.questionTotal || question.paperQuestionTotalCount, // 本类型主题试题数量
        paperSubjectAverageScore: question.paperSubjectAverageScore, // 本类型主题题目每题分值
        paperSubjectTotalScore: question.paperSubjectTotalScore, // 本类型主题总分
        papersubjectMemo: question.papersubjectMemo, // 本类型主题描述
        errorQuestionId: question.errorQuestionId || '', //错题标识
        sourceType: question.sourceType || '',
        paperSubjectName: question.paperSubjectName,
        questionStemSeq: question.questionStemSeq,
        authorStatus: question.authorStatus, // 学员非学员状态判断（true：学员）
        authStatus: question.authStatus, // 学疑答疑权限校验
        isCheckOnly: false, // 是否显示"查看解析"按钮（专项小题库）
        paperParsing: false, // 是否展开“查看解析”（专项小题库）
        confirmBtn: false, // 是否显示“确定”按钮（专项小题库：多选题）
        decideStatus: question.decideStatus, // 答题判定状态（Y:正确;N:错误;F:没有对错;W:未答）
        isCheckAnswer: question.decideStatus !== 'W', // 用户是否作答过
        changeAnswerData: question.userAnswer, // 存储上一次用户的答案，用来判断是否改变过答案
        questionStemType: question.questionStemType, // 题型(S:单选题;M:多选题;I:不定项选择题;O:简答题;J:判断题;F:填空题;BC:选词填空题;A:案例分析题;CF:完形填空题;L:听力题;C:配伍题)
        isCompositeQuestion: !!['A', 'CF', 'L', 'C'].includes(question.questionStemType), //是否是复合题型:A:案例分析题;CF:完形填空题;L:听力题;C:配伍题
        isDetermineQuestion: !!['M', 'I', 'O', 'F', 'BC'].includes(question.questionType), //是否有确定按钮的题型:多选题、不定项选择题、简答题、填空题、选词填空
    };

    // 如果题目有选项，将选项转换为数组
    if (Array.isArray(content.option)) {
        baseQuestion.options = content.option.map((item) => {
            return {
                answer: item.type,
                title: item.content,
            };
        });
    }

    return Object.assign(baseQuestion, extraData || {});
}

/**
 * 创建主观题题目数据
 *
 * @param {object} question question
 * @param {object} extraData extraData
 * @returns {object} object
 */
function createSubjectiveQuestion(question, extraData) {
    const stemContent = JSON.parse(question.stemContent || question.questionstemContent);
    return createObjectiveQuestion(question, {
        stemTypeName: question.questionTypeName || question.stemTypeName,
        stemId: question.stemId,
        stemTitle: stemContent.title || '',
        audioId: String(question.audioId || ''), // 音频标识
        audioVid: String(question.vid || ''), // 音频文件(VID)
        audioPause: false, // 音频是否暂停
        questionSeq: question.questionSeq ? Number(question.questionSeq) : 1,
        stem: {
            stemTypeName: question.questionTypeName || question.stemTypeName,
            stemId: question.stemId,
            stemTitle: stemContent.title || '',
            audioId: String(question.audioId || ''), // 音频标识
            audioVid: String(question.vid || ''), // 音频文件(VID)
        },
        ...(extraData || {}),
    });
}

/**
 * 转换单选组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function single(question) {
    return createObjectiveQuestion(question, {
        type: 'single',
        groupType: 'single',
        typeName: question.questionTypeName || '单项选择题',
    });
}

/**
 * 转换多选组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function multiple(question) {
    return createObjectiveQuestion(question, {
        type: 'multiple',
        groupType: 'multiple',
        typeName: question.questionTypeName || '多项选择题',
    });
}

/**
 * 转换不定项选择题组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function indefinite(question) {
    return createObjectiveQuestion(question, {
        type: 'indefinite',
        groupType: 'indefinite',
        typeName: question.questionTypeName || '不定项选择',
    });
}

/**
 * 转换选词填空组件所需数据
 * blankChoose
 *
 * @param {object} question question
 * @returns {object} object
 */
export function blankChoose(question) {
    return createObjectiveQuestion(question, {
        type: 'blank-choose',
        groupType: 'blank-choose',
        typeName: question.questionTypeName || '选词填空',
    });
}

/**
 * 转换判断题组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function judge(question) {
    return createObjectiveQuestion(question, {
        type: 'judge',
        groupType: 'judge',
        typeName: question.questionTypeName || '判断题',
    });
}

/**
 * 转换简答题组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function opinion(question) {
    return createObjectiveQuestion(question, {
        type: 'opinion',
        groupType: 'opinion',
        typeName: question.questionTypeName || '简答题',
    });
}

/**
 * 转换填空题组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function fill(question) {
    return createObjectiveQuestion(question, {
        type: 'fill',
        groupType: 'fill',
        typeName: question.questionTypeName || '填空题',
    });
}

/**
 * 转换完形填空组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function clozeFill(question) {
    return createSubjectiveQuestion(question, {
        type: 'cloze-fill',
        groupType: 'cloze-fill',
        typeName: question.questionTypeName || '完形填空',
    });
}

/**
 * 转换听力题-单选组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function listeningSingle(question) {
    return createSubjectiveQuestion(question, {
        type: 'listening-single',
        groupType: 'listening',
        typeName: '单选题',
    });
}

/**
 * 转换听力题-多选组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function listeningMultiple(question) {
    return createSubjectiveQuestion(question, {
        type: 'listening-multiple',
        groupType: 'listening',
        typeName: '多选题',
    });
}

/**
 * 转换听力题-不定项选择题组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function listeningIndefinite(question) {
    return createSubjectiveQuestion(question, {
        type: 'listening-indefinite',
        groupType: 'listening',
        typeName: '不定项选择题',
    });
}

/**
 * 转换听力题-判断题组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function listeningJudge(question) {
    return createSubjectiveQuestion(question, {
        type: 'listening-judge',
        groupType: 'listening',
        typeName: '判断题',
    });
}

/**
 * 转换听力题-简答题组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function listeningOpinion(question) {
    return createSubjectiveQuestion(question, {
        type: 'listening-opinion',
        groupType: 'listening',
        typeName: '简答题',
    });
}

/**
 * 转换听力题-填空题组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function listeningFill(question) {
    return createSubjectiveQuestion(question, {
        type: 'listening-fill',
        groupType: 'listening',
        typeName: '填空题',
    });
}

/**
 * 转换案例分析-单选组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function analysisSingle(question) {
    return createSubjectiveQuestion(question, {
        type: 'analysis-single',
        groupType: 'analysis',
        typeName: '单选题',
    });
}

/**
 * 转换案例分析-多选组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function analysisMultiple(question) {
    return createSubjectiveQuestion(question, {
        type: 'analysis-multiple',
        groupType: 'analysis',
        typeName: '多选题',
    });
}

/**
 * 转换案例分析-不定项选择题组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function analysisIndefinite(question) {
    return createSubjectiveQuestion(question, {
        type: 'analysis-indefinite',
        groupType: 'analysis',
        typeName: '不定项选择题',
    });
}

/**
 * 转换案例分析-判断题组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function analysisJudge(question) {
    return createSubjectiveQuestion(question, {
        type: 'analysis-judge',
        groupType: 'analysis',
        typeName: '判断题',
    });
}

/**
 * 转换案例分析-简答题组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function analysisOpinion(question) {
    return createSubjectiveQuestion(question, {
        type: 'analysis-opinion',
        groupType: 'analysis',
        typeName: '简答题',
    });
}

/**
 * 转换听力题-填空题组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function analysisFill(question) {
    return createSubjectiveQuestion(question, {
        type: 'analysis-fill',
        groupType: 'analysis',
        typeName: '填空题',
    });
}

/**
 * 转换配伍题-单选组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function compatibilitySingle(question) {
    return createSubjectiveQuestion(question, {
        type: 'compatibility-single',
        groupType: 'compatibility',
        typeName: '单选题',
    });
}

/**
 * 转换配伍题-多选组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function compatibilityMultiple(question) {
    return createSubjectiveQuestion(question, {
        type: 'compatibility-multiple',
        groupType: 'compatibility',
        typeName: '多选题',
    });
}

/**
 * 转换配伍题-不定项选择题组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function compatibilityIndefinite(question) {
    return createSubjectiveQuestion(question, {
        type: 'compatibility-indefinite',
        groupType: 'compatibility',
        typeName: '不定项选择题',
    });
}

/**
 * 转换配伍题-判断题组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function compatibilityJudge(question) {
    return createSubjectiveQuestion(question, {
        type: 'compatibility-judge',
        groupType: 'compatibility',
        typeName: '判断题',
    });
}

/**
 * 转换配伍题-简答题组件所需数据
 *
 * @param {object} question question
 * @returns {object} object
 */
export function compatibilityOpinion(question) {
    return createSubjectiveQuestion(question, {
        type: 'compatibility-opinion',
        groupType: 'compatibility',
        typeName: '简答题',
    });
}
