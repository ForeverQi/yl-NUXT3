/**
 * 该工厂类用于管理题库控件内各种不同题型的格式化方法函数
 * 1. 将题目分为客观题（单独成题）和主观题（一材料多题）两种题型
 * 2. createObjectiveQuestion() 规范题目基础数据
 */

import { checkQuestionType } from './utils.js';
/**
 * 将接口返回的题目数据转换为题目组件所需的数据格式
 * @param {Object} question
 */
export default function (question) {
    const questionType = checkQuestionType(question.papersubjectType || question.questionStemType || question.questionType, question.questionType);
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
 * @param {Object} question
 * @param {Object} extraData
 * @return {Object}
 */
function createObjectiveQuestion(question, extraData) {
    const content = JSON.parse(question.content);

    // 题目组件所需数据
    const baseQuestion = {
        type: '', // 题目类型
        typeName: question.papersubjectName, // 题目类型名称
        title: String(content.title || ''), // 题目
        userAnswer: String(question.userAnswer || ''), // 用户的答案
        correctAnswer: String(question.answer || ''), // 参考答案
        answerParse: String(question.answerParse || ''), // 答案解析
        questionId: String(question.questionId || ''), // 题目唯一标识
        collectId: question.collectStatus === 'collect' && question.collectId ? question.collectId : '', // 收藏唯一标识（收藏后取消收藏仍会有collectId，因此要以收藏状态为准）
        hasConfirmAnswer: question.hasConfirmAnswer, // 用户是否已经做题
        parseonly: false, // 是否只显示解析状态，无法做题
        useTime: 0, // 答题计时
        questionVpath: question.questionVpath || [], // 答案解析视频vid
        answerCorrectRate: question.answerCorrectRate, // 正确率
        answerAccount: question.answerAccount, // 试题答题总次数
        papersubjectId: question.papersubjectId, // 试卷主题标识
        paperQuestionTotalCount: question.paperQuestionTotalCount, // 本类型主题试题数量
        paperSubjectAverageScore: question.paperSubjectAverageScore, // 本类型主题题目每题分值
        paperSubjectTotalScore: question.paperSubjectTotalScore, // 本类型主题总分
        papersubjectMemo: question.papersubjectMemo, // 本类型主题描述
        errorQuestionId: question.errorQuestionId || '', //错题标识
        sourceType: question.sourceType || '',
        paperParsing: false,
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
 * @param {Object} question
 * @param {Object} extraData
 * @return {Object}
 */
function createSubjectiveQuestion(question, extraData) {
    const stemContent = JSON.parse(question.stemContent);
    return createObjectiveQuestion(question, {
        stemTypeName: question.papersubjectName,
        stemId: question.stemId,
        stemTitle: stemContent.title,
        audioId: String(question.audioId || ''), // 音频标识
        audioVid: String(question.audioVid || ''), // 音频文件(VID)
        audioPause: false, // 音频是否暂停
        questionSeq: question.questionSeq ? Number(question.questionSeq) : 1,
        stem: {
            stemTypeName: question.papersubjectName,
            stemId: question.stemId,
            stemTitle: stemContent.title,
            audioId: String(question.audioId || ''), // 音频标识
            audioVid: String(question.audioVid || ''), // 音频文件(VID)
        },
        ...(extraData || {}),
    });
}

/**
 * 转换单选组件所需数据
 * @param {Object} question
 */
export function single(question) {
    return createObjectiveQuestion(question, {
        type: 'single',
        groupType: 'single',
        typeName: question.typeName || '单项选择题',
    });
}

/**
 * 转换多选组件所需数据
 */
export function multiple(question) {
    return createObjectiveQuestion(question, {
        type: 'multiple',
        groupType: 'multiple',
        typeName: question.typeName || '多项选择题',
    });
}

/**
 * 转换不定项选择题组件所需数据
 */
export function indefinite(question) {
    return createObjectiveQuestion(question, {
        type: 'indefinite',
        groupType: 'indefinite',
        typeName: question.typeName || '不定项选择',
    });
}

/**
 * 转换选词填空组件所需数据
 * blankChoose
 * @param {Object} question
 * @returns
 */
export function blankChoose(question) {
    return createObjectiveQuestion(question, {
        type: 'blank-choose',
        groupType: 'blank-choose',
        typeName: question.typeName || '选词填空',
    });
}

/**
 * 转换判断题组件所需数据
 * @param {Object} question
 */
export function judge(question) {
    return createObjectiveQuestion(question, {
        type: 'judge',
        groupType: 'judge',
        typeName: question.typeName || '判断题',
    });
}

/**
 * 转换简答题组件所需数据
 * @param {Object} question
 */
export function opinion(question) {
    return createObjectiveQuestion(question, {
        type: 'opinion',
        groupType: 'opinion',
        typeName: question.typeName || '简答题',
    });
}

/**
 * 转换填空题组件所需数据
 * @param {Object} question
 */
export function fill(question) {
    return createObjectiveQuestion(question, {
        type: 'fill',
        groupType: 'fill',
        typeName: question.typeName || '填空题',
    });
}

/**
 * 转换完形填空组件所需数据
 * @param {*} question
 * @returns
 */
export function clozeFill(question) {
    return createSubjectiveQuestion(question, {
        type: 'cloze-fill',
        groupType: 'cloze-fill',
        typeName: question.typeName || '完形填空',
    });
}

/**
 * 转换听力题-单选组件所需数据
 * @param {Object} question
 */
export function listeningSingle(question) {
    return createSubjectiveQuestion(question, {
        type: 'listening-single',
        groupType: 'listening',
        typeName: '单项选择题',
    });
}

/**
 * 转换听力题-多选组件所需数据
 * @param {Object} question
 */
export function listeningMultiple(question) {
    return createSubjectiveQuestion(question, {
        type: 'listening-multiple',
        groupType: 'listening',
        typeName: '多项选择题',
    });
}

/**
 * 转换听力题-不定项选择题组件所需数据
 * @param {Object} question
 */
export function listeningIndefinite(question) {
    return createSubjectiveQuestion(question, {
        type: 'listening-indefinite',
        groupType: 'listening',
        typeName: '不定项选择',
    });
}

/**
 * 转换听力题-判断题组件所需数据
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
 * @param {Object} question
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
 * @param {Object} question
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
 * @param {Object} question
 */
export function analysisSingle(question) {
    return createSubjectiveQuestion(question, {
        type: 'analysis-single',
        groupType: 'analysis',
        typeName: '单项选择题',
    });
}

/**
 * 转换案例分析-多选组件所需数据
 * @param {Object} question
 */
export function analysisMultiple(question) {
    return createSubjectiveQuestion(question, {
        type: 'analysis-multiple',
        groupType: 'analysis',
        typeName: '多项选择题',
    });
}

/**
 * 转换案例分析-不定项选择题组件所需数据
 * @param {Object} question
 */
export function analysisIndefinite(question) {
    return createSubjectiveQuestion(question, {
        type: 'analysis-indefinite',
        groupType: 'analysis',
        typeName: '不定项选择',
    });
}

/**
 * 转换案例分析-判断题组件所需数据
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
 * @param {Object} question
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
 * @param {Object} question
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
 * @param {Object} question
 */
export function compatibilitySingle(question) {
    return createSubjectiveQuestion(question, {
        type: 'compatibility-single',
        groupType: 'compatibility',
        typeName: '单项选择题',
    });
}

/**
 * 转换配伍题-多选组件所需数据
 * @param {Object} question
 */
export function compatibilityMultiple(question) {
    return createSubjectiveQuestion(question, {
        type: 'compatibility-multiple',
        groupType: 'compatibility',
        typeName: '多项选择题',
    });
}

/**
 * 转换配伍题-不定项选择题组件所需数据
 * @param {Object} question
 */
export function compatibilityIndefinite(question) {
    return createSubjectiveQuestion(question, {
        type: 'compatibility-indefinite',
        groupType: 'compatibility',
        typeName: '不定项选择',
    });
}

/**
 * 转换配伍题-判断题组件所需数据
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
 * @param {Object} question
 */
export function compatibilityOpinion(question) {
    return createSubjectiveQuestion(question, {
        type: 'compatibility-opinion',
        groupType: 'compatibility',
        typeName: '简答题',
    });
}
