/**
 * 本文件意在实现题库模块常用的相关api接口
 */
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import { initOptions } from './utils';
import '@/api/qb/api.QB0005.query-paper-detail.js'; // 1. 查询试卷详情
import '@/api/qb/api.QB0006.query-paper-question-type-list.js'; // 2. 获取试卷题目类型列表
import '@/api/qb/api.QB0007.query-paper-question-list.js'; // 3. 查询试卷题目明细列表
import '@/api/qb/api.QB9003.query-question-parse-list.js'; // 4. 查询试题答案解析列表
import '@/api/qb/api.QB3002.query-error-questions-list.js'; // 5. 查询试题错题列表
import '@/api/qb/api.QB6005.query-collect-questions-list.js'; // 6. 查询试题收藏列表
import '@/api/qb/api.QB0003.query-paper-profile-list.js'; // 7. 查询用户的答题卡记录列表，用于恢复答题卡(非关联班级的试卷使用)
import '@/api/qb/api..query-answer-info-by-courseware.js'; // 7-1. 根据班级、课件查询答题卡记录，用于恢复答题卡（学习中心专用）
import '@/api/qb/api.QB2004.query-answersheet-record2.js'; // 8. 根据答题卡标识查询答题卡记录
import '@/api/qb/api.QB0019.query-answersheet-detail.js'; // 9. 查询答题卡详情
import '@/api/qb/api.QB-compute.save--or-submit-answer.js'; // 10. 题库2.0保存或提交答案接口
import '@/api/qb/api.QB6001.add-colllect.js'; // 11. 用户收藏
import '@/api/qb/api.QB6002.cancel-collect.js'; // 12. 用户取消收藏
import '@/api/qb/api.QB6007.batch-query-collect-status.js'; // 13. 批量查询题目收藏状态
/**
 * 封装Promise后的接口请求方法
 * @param {Object}   apiName
 * @param {Object}   options
 * @param {Function} options.success 请求成功的回调
 * @param {Function} options.fail 请求失败的回调
 * @return {Promise}
 */
function requestApi(apiName, options) {
    const { success, fail } = initOptions(options);
    const callApi = niceloo.api.call;

    return new Promise((resolve, reject) => {
        callApi(apiName, {
            ...options,
            onsuccess: (res) => {
                success(res);
                resolve(res);
            },
            onerror: (err) => {
                /**
                 * 针对交卷接口单独定义
                 * 1. 非交卷接口，正常弹窗
                 * 2.1 交卷接口，针对同一班级下同一套卷子出现请勿重复交卷报错进行单独处理
                 * 2.2 交卷接口，临时保存时不弹出错误弹窗
                 */
                if (apiName !== 'qb/save--or-submit-answer') {
                    niceloo.api.handleFailure(err);
                } else if (!/ANSWERSHEET/.test(err.getDescription()) && err.getDescription() !== '请勿重复交卷' && options.answerStatus !== 'temporary') {
                    niceloo.api.handleFailure(err);
                }
                fail(err);
                reject(err);
            },
        });
    });
}

/**
 * 1. 根据试卷id查询试卷详情
 * @param {Object}   options
 * @param {String}   options.paperId    试卷ID
 * @param {Function} options.success    成功回调
 * @param {Function} options.fail       失败回调
 * @return {Promise}
 * @returns
 */
export function queryPaperDetail(options) {
    const { paperId, success, fail } = initOptions(options);

    return requestApi('qb/query-paper-detail', {
        paperId, // 试卷标识

        success,
        fail,
    });
}

/**
 * 2. 获取试卷题目类型列表
 * @param {Object}   options
 * @param {String}   options.paperId    试卷ID
 * @param {Function} options.success    成功回调
 * @param {Function} options.fail       失败回调
 * @return {Promise}
 */
export function queryPaperQuestionTypeList(options) {
    const { paperId, success, fail } = initOptions(options);

    return requestApi('qb/query-paper-question-type-list', {
        paperId, // 试卷标识

        success: (res) => success(Array.isArray(res.list) ? res.list : []),
        fail,
    }).then((res) => {
        return Array.isArray(res.list) ? res.list : [];
    });
}

/**
 * 3. 查询试卷题目明细列表
 * @param {String}   options.paperId        试卷ID
 * @param {String}   options.sourceType     来源标识一般统一传cType
 * @param {String}   options.paperSubjectId     题目类型ID
 * @param {String}   options.classUniqueCode    项目编码如：YIJIAN
 * @param {Function} options.success    成功回调
 * @param {Function} options.fail       失败回调
 * @return {Promise}
 */
export function queryPaperQuestionDetailList(options) {
    const { paperId, sourceType, paperSubjectId, classUniqueCode, success, fail } = initOptions(options);

    return requestApi('qb/query-paper-question-list', {
        paperId, // 试卷标识
        sourceType, // 来源类型
        paperSubjectId, // 试卷主题标识
        classUniqueCode, // 项目编码

        success: (res) => success(Array.isArray(res.list) ? res.list : []),
        fail,
    }).then((res) => {
        return Array.isArray(res.list) ? res.list : [];
    });
}

/**
 * 4. 查询试题答案解析列表
 * @param {Object} options 接收的数据
 * @param {String} options.questionIds 题目标识集合 多个值以英文逗号隔开
 * @param {Function} options.success    成功回调
 * @param {Function} options.fail       失败回调
 * @return {Promise}
 */
export function queryAnswerParseList(options) {
    const { questionIds, success, fail } = initOptions(options);

    return requestApi('qb/query-question-parse-list', {
        questionIds: Array.isArray(questionIds) ? questionIds.join(',') : questionIds,

        success,
        fail,
    });
}

/**
 * 5. 查询试题错题列表
 * @param {Object}   options 接收的参数
 * @param {Number}   options.pageIndex      分页起始
 * @param {Number}   options.pageSize       分页数量
 * @param {String}   options.subjectId      科目标识
 * @param {String}   options.sectionId      章节标识
 * @param {String}   options.classUniqueCode 项目编码
 * @param {String}   options.questionType   题目类型
 * @param {String}   options.sourceType     来源类型
 * @param {Function} options.success        成功回调
 * @param {Function} options.fail           失败回调
 * @param {Function} options.complete       无论成功失败都会执行
 * @return {Promise}
 */
export function queryWrongQuestionList(options) {
    const {
        pageIndex, // 分页起始
        pageSize, // 分页数量
        subjectId, // 科目标识
        classUniqueCode, // 项目编码
        projectCode, //基础数据项目编码
        questionType, // 题目类型
        sourceType, // 来源类型
        success,
        fail,
    } = initOptions(options);

    return requestApi('qb/query-error-questions-list', {
        pageIndex, // 分页起始
        pageSize, // 分页数量
        subjectId, // 科目标识
        classUniqueCode, // 项目编码
        questionType, // 题目类型
        sourceType, // 来源类型
        projectCode,
        success,
        fail,
    }).then((res) => {
        return {
            count: res.totalCount,
            list: Array.isArray(res.list) ? res.list : [],
        };
    });
}

/**
 * 6. 查询试题收藏列表
 * @param {Object}   options 接收的参数
 * @param {String}   options.pageIndex      分页起始
 * @param {String}   options.pageSize       分页数量
 * @param {String}   options.subjectId      科目标识
 * @param {String}   options.classUniqueCode 项目编码
 * @param {String}   options.questionType   题目类型
 * @param {String}   options.sourceType     来源类型
 * @param {String}   options.projectCode     项目编码基础数据
 * @param {Function} options.success        成功回调
 * @param {Function} options.fail           失败回调
 * @param {Function} options.complete       无论成功失败都会执行
 * @return {Promise}
 */
export function queryCollectQuestionList(options) {
    const {
        pageIndex, // 分页起始
        pageSize, // 分页数量
        subjectId, // 科目标识
        classUniqueCode, // 项目编码
        questionType, // 题目类型
        sourceType, // 来源类型
        projectCode, // 项目编码基础数据
        success,
        fail,
    } = initOptions(options);

    return requestApi('qb/query-collect-questions-list', {
        pageIndex, // 分页起始
        pageSize, // 分页数量
        subjectId, // 科目标识
        classUniqueCode, // 项目编码
        questionType, // 题目类型
        sourceType, // 来源类型
        projectCode, //项目编码基础数据
        success,
        fail,
    }).then((res) => {
        return {
            count: res.totalCount,
            list: Array.isArray(res.list) ? res.list : [],
        };
    });
}

/**
 * 7. 查询用户的答题卡记录列表，用于自动恢复上次答题卡
 * @param {Object} options
 * @param {String} options.papertypeCode    试卷类型标识
 * @param {String} options.sourceType       来源类型
 * @param {String} options.paperIds         试卷标识集合
 * @param {String} options.classUniquecode 项目编码
 * @param {Function} options.success        成功回调
 * @param {Function} options.fail           失败回调
 * @param {Function} options.complete       无论成功失败都会执行
 * @return {Promise}
 */
export function queryAnswersheetProfileList(options) {
    const {
        papertypeCode, // 试卷类型标识
        sourceType, // 来源类型
        paperIds, // 试卷标识集合
        classUniquecode, // 项目编码
        success,
        fail,
    } = initOptions(options);

    return requestApi('qb/query-paper-profile-list', {
        papertypeCode,
        sourceType, // 来源类型
        paperIds, // 试卷标识集合
        classUniquecode, // 项目编码

        success,
        fail,
    }).then((res) => {
        return Array.isArray(res.data) ? res.data : [];
    });
}

/**
 * 7-1. 根据班级、课件标识查询上一次答题卡记录，用于自动恢复上次答题卡
 * @param {Object} options
 * @param {String} options.classId
 * @param {String} options.coursewareId
 * @param {String} options.paperId
 */
export function queryLastAnswersheetIdByCoursewareId(options) {
    const {
        classId, // 班级标识
        coursewareId, // 课件标识
        paperId, // 试卷标识
    } = initOptions(options);
    return requestApi('qb/query-answer-info-by-courseware', {
        classId, // 班级标识
        coursewareId, // 课件标识
        paperId, // 试卷标识
    });
}

/**
 * 8. 根据答题卡标识查询答题卡记录
 * @param {Object} options 接收的参数
 * @param {String} options.paperId        试卷ID
 * @param {String} options.answersheetId  答题卡ID
 * @param {Function} options.success    成功回调
 * @param {Function} options.fail       失败回调
 * @return {Promise}
 */
export function queryAnswerSheetRecord(options) {
    const { paperId, answersheetId, success, fail } = initOptions(options);

    return requestApi('qb/query-answersheet-record2', {
        paperId, // 试卷标识
        answersheetId, // 答卷标识

        success,
        fail,
    }).then((res) => {
        return Array.isArray(res.list) ? res.list : [];
    });
}

/**
 * 9. 查询答题卡详情
 * @param {Object}   options
 * @param {String}   options.paperId        试卷ID
 * @param {String}   options.answersheetId  答题卡ID
 * @param {Function} options.success        成功回调
 * @param {Function} options.fail           失败回调
 * @param {Function} options.complete       无论成功失败都会执行
 * @return {Promise}
 */
export function queryAnswerSheetDetail(options) {
    const {
        paperId, // 试卷标识
        answersheetId, // 答卷标识
        success,
        fail,
    } = initOptions(options);

    return requestApi('qb/query-answersheet-detail', {
        paperId, // 试卷标识
        answersheetId, // 答卷标识

        success,
        fail,
    });
}

/**
 * 10. 保存或提交答案
 * @param {Object}   options
 * @param {String}   options.paperId             试卷ID
 * @param {String}   options.answerSheetId       答题卡ID
 * @param {String}   options.answerStatus        作答状态
 * @param {String}   options.answerDurationTime  作答时长
 * @param {String}   options.answerWay           交卷方式
 * @param {String}   options.answerScene         作答场景
 * @param {String}   options.sourceType          来源类型
 * @param {String}   options.cType               客户端类型
 * @param {String}   options.intelligentMarking  智能阅卷
 * @param {String}   options.extension           扩展参数
 * @param {String}   options.userAnswers         用户答案集合
 * @param {Function} options.success             成功回调
 * @param {Function} options.fail                失败回调
 * @param {Function} options.complete            无论成功失败都会执行
 * @return {Promise}
 */
export function saveOrSubmitAnswer(options) {
    const {
        paperId, // 试卷标识
        answerSheetId, // 答卷标识
        answerStatus, // 作答状态
        answerDurationTime, // 作答时长
        answerWay, // 交卷方式
        answerScene, // 作答场景
        sourceType, // 来源类型
        cType, // 客户端类型
        intelligentMarking, // 智能阅卷
        extension, // 扩展参数
        userAnswers, // 用户答案集合
        success,
        fail,
    } = initOptions(options);
    return requestApi('qb/save--or-submit-answer', {
        paperId, // 试卷标识
        answerSheetId, // 答卷标识
        answerStatus, // 作答状态
        answerDurationTime, // 作答时长
        answerWay, // 交卷方式
        answerScene, // 作答场景
        sourceType, // 来源类型
        cType, // 客户端类型
        intelligentMarking, // 智能阅卷
        extension, // 扩展参数
        userAnswers, // 用户答案集合
        success,
        fail,
    });
}

/**
 * 11. 添加收藏
 * @param {Object}   options                  接收的参数
 * @param {String}   options.questionId       题目ID
 * @param {String}   options.classUniqueCode  项目编码
 * @param {String}   options.sourceType       项目来源
 * @param {Function} options.success          成功回调
 * @param {Function} options.fail             失败回调
 * @param {Function} options.complete         无论成功失败都会执行
 * @return {Promise}
 */
export function addCollect(options) {
    const { questionId, classUniqueCode, sourceType, success, fail } = initOptions(options);

    return requestApi('qb/add-colllect', {
        collectContenttype: 'question', // 用户收藏内容类型
        collectContent: questionId, // 用户收藏内容标识
        classUniqueCode, // 项目编码
        sourceType, // 来源类型

        success,
        fail,
    });
}

/**
 * 12. 取消收藏
 * @param {Object}   options 接收的参数
 * @param {String}   options.collectId      用户收藏标识
 * @param {Function} options.success        成功回调
 * @param {Function} options.fail           失败回调
 * @param {Function} options.complete       无论成功失败都会执行
 * @return {Promise}
 */
export function cancelCollect(options) {
    const { collectId, success, fail } = initOptions(options);

    return requestApi('qb/cancel-collect', {
        collectId, // 用户收藏标识

        success,
        fail,
    });
}

/**
 * 13. 批量查询题目收藏状态
 * @param {Object}   options 接收的参数
 * @param {String}   options.questionIds    用户收藏内容标识集合
 * @param {String}   options.projectUniCode 项目编码
 * @param {String}   options.sourceType     来源类型
 * @param {Function} options.success        成功回调
 * @param {Function} options.fail           失败回调
 * @param {Function} options.complete       无论成功失败都会执行
 * @return {Promise}
 */
export function batchQueryCollectStatus(options) {
    const { questionIds, projectUniCode, sourceType, success, fail } = initOptions(options);

    return requestApi('qb/batch-query-collect-status', {
        collectContentType: 'question', // 用户收藏内容类型，枚举值：question试题，paper试卷
        collectContents: questionIds, // 用户收藏内容标识集合
        classUniqueCode: projectUniCode, // 项目编码
        sourceType, // 来源类型

        success,
        fail,
    }).then((res) => {
        return Array.isArray(res.list) ? res.list : [];
    });
}
