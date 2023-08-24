/**
 * 本文件意在实现题库模块常用的相关api接口
 */
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import { initOptions } from './utils';
import '@/api/qb/api.QB6005.query-collect-questions-list.js'; // 查询试题收藏列表
import '@/api/qb/api.QB-compute.save--or-submit-answer.js'; // 题库2.0保存或提交答案接口
import '@/api/qb/api.QB6001.add-colllect.js'; // 用户收藏
import '@/api/qb/api.QB6002.cancel-collect.js'; // 用户取消收藏
import '@/api/qb/api.QB6007.batch-query-collect-status.js'; // 批量查询题目收藏状态

import '@/api/qb/api..query-profession-bank-answer.js'; // 专项题库答题卡
import '@/api/qb/api..query-bussiness-question-info-list.js'; //试题详情集合
import '@/api/qb/api..query-bussiness-question-parse.js'; //试题解析
import '@/api/qb/api..query-profession-bank-info.js'; //题库基本信息
import '@/api/qb/api..query-compute-profession-bank-answer.js'; // 专项题库答题
import '@/api/qb/api..query-profession-bank-answer-remove.js'; //专项题库清空答题记录
import '@/api/qb/api..query-common-author.js'; //专项题库非学员做题权限鉴权
import '@/api/qa/api.QA1005.query-question-auth.js'; // 答疑权限判断
import '@/api/qb/api..query-noun-project-config-project-status.js'; //项目开启状态查询(“词典快查”开启判断)
import '@/api/qb/api..query-section-info.js'; // 获取章节刷题名称
/**
 * 封装Promise后的接口请求方法
 *
 * @param {object}   apiName apiName
 * @param {object}   options options
 * @param {Function} options.success 请求成功的回调
 * @param {Function} options.fail 请求失败的回调
 * @param {boolean} isShowModal 是否显示错误弹窗 true:显示; false:不显示
 * @returns {Promise} promise
 */
function requestApi(apiName, options, isShowModal = true) {
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
                if (isShowModal) {
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
                }
                fail(err);
                reject(err);
            },
        });
    });
}

/**
 * 专项题库答题卡
 *
 * @param {object}   options 类型集合
 * @param {string}   options.professionBankId  专项题库标识
 * @param {string} options.answerType          答题类型(A:全部;S:章节;R:随机)
 * @param {string} options.sectionId           章节标识
 * @param {string} options.sourceId            数据来源标识 -- 题库-专项题库：数据来源标识为空; 学习中心-班级-专项题库：数据来源标识-classId(班级标识)
 * @param {string} options.sourceType          题库-专项题库：数据来源类型-YOULU；学习中心-班级-专项题库：数据来源类型-YOULU.STUDY；
 * @param {Array} options.questionIds          试题标识列表
 * @param {Array} options.isReselect           是否重新抽题（Y:重新抽取，N:不重新抽取）默认为Y
 * @returns {Promise} Promise
 */
export function queryProfessionBankAnswer(options) {
    const { professionBankId, answerType, sectionId, sourceId, sourceType, questionIds, isReselect } = options;
    return requestApi('qb/query-profession-bank-answer', {
        professionBankId,
        answerType,
        sectionId,
        sourceId,
        sourceType,
        questionIds: questionIds ?? [],
        isReselect,
    });
}

/**
 * 试题详情集合
 *
 * @param {object}   options 类型集合
 * @param {Array} options.questionIds   试题标识列表
 * @returns {Promise} Promise
 */
export function queryQuestionInfoList(options) {
    const { questionIds } = options;
    return requestApi('qb/query-bussiness-question-info-list', {
        questionIds,
    });
}

/**
 * 3. 试题解析
 *
 * @param {object}   options 类型集合
 * @param {Array} options.questionIds   试题标识列表
 * @param {string} options.ctype        客户端类型
 * @returns {Promise} Promise
 */
export function queryQuestionParse(options) {
    const { questionIds, ctype } = options;
    return requestApi('qb/query-bussiness-question-parse', {
        questionIds,
        ctype,
    });
}

/**
 *题库基本信息
 *
 * @param {object}   options 类型集合
 * @param {Array} options.professionBankId   专项题库标识
 * @returns {Promise} Promise
 */
export function queryProfessionBankInfo(options) {
    const { professionBankId } = options;
    return requestApi(
        'qb/query-profession-bank-info',
        {
            professionBankId,
        },
        false
    );
}

/**
 * 专项题库答题
 *
 * @param {object}   options 类型集合
 * @param {string} options.professionBankId   专项题库标识
 * @param {string} options.bankAnswerSheetId  答题标识
 * @param {string} options.sourceType         数据来源类型（题库：YOULU 学习中心：YOULU.STUDY）
 * @param {string} options.answerStatus       作答状态 G:保存进度（执行统计）T:临时保存进度（不执行统计）
 * @param {string} options.answerDurationTime 作答持续时间
 * @param {string} options.sourceId           数据来源维度标识（学习中心做题时传入班级标识到此字段）
 * @param {Array} options.userAnswers         用户答案
 * @returns {Promise} Promise
 */
export function queryComputeProfessionBankAnswer(options) {
    const { professionBankId, bankAnswerSheetId, sourceType, answerStatus, answerDurationTime, sourceId, userAnswers, success, fail } = options;
    return requestApi('qb/query-compute-profession-bank-answer', {
        professionBankId,
        bankAnswerSheetId,
        sourceType,
        answerStatus,
        answerDurationTime,
        sourceId,
        userAnswers,
        success,
        fail,
    });
}

/**
 * 清空答题记录
 *
 * @param {object} options 接收的数据
 * @param {string} options.professionBankId 专项题库标识
 * @param {Function} options.answerType     答题类型(A:全部;S:章节;R:随机)
 * @param {Function} options.sectionId      章节标识
 * @param {Function} options.questionIds    试题标识列表 answerType为R时不能为空
 * @param {Function} options.sourceType     数据来源类型
 * @param {Function} options.sourceId       数据来源标识
 * @returns {Promise} Promise
 */
export function queryProfessionBankAnswerRemove(options) {
    const { professionBankId, answerType, sectionId, questionIds, sourceType, sourceId, success, fail } = initOptions(options);
    return requestApi('qb/query-profession-bank-answer-remove', {
        professionBankId,
        answerType,
        sectionId,
        questionIds,
        sourceType,
        sourceId,
        success,
        fail,
    });
}

/**
 * 做题权限
 *
 * @param {object} options 接收的数据
 * @param {string} options.projectId 项目标识
 * @returns {Promise} Promise
 */
export function queryCommonAuthor(options) {
    const { projectId } = initOptions(options);
    return requestApi(
        'qb/query-common-author',
        {
            projectId,
        },
        false
    );
}

/**
 * 查询试题收藏列表
 *
 * @param {object}   options 接收的参数
 * @param {string}   options.pageIndex      分页起始
 * @param {string}   options.pageSize       分页数量
 * @param {string}   options.subjectId      科目标识
 * @param {string}   options.classUniqueCode 项目编码
 * @param {string}   options.questionType   题目类型
 * @param {string}   options.sourceType     来源类型
 * @param {string}   options.projectCode     项目编码基础数据
 * @param {Function} options.success        成功回调
 * @param {Function} options.fail           失败回调
 * @param {Function} options.complete       无论成功失败都会执行
 * @returns {Promise} Promise
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
 * 保存或提交答案
 *
 * @param {object}   options options
 * @param {string}   options.paperId             试卷ID
 * @param {string}   options.answerSheetId       答题卡ID
 * @param {string}   options.answerStatus        作答状态
 * @param {string}   options.answerDurationTime  作答时长
 * @param {string}   options.answerWay           交卷方式
 * @param {string}   options.answerScene         作答场景
 * @param {string}   options.sourceType          来源类型
 * @param {string}   options.cType               客户端类型
 * @param {string}   options.intelligentMarking  智能阅卷
 * @param {string}   options.extension           扩展参数
 * @param {string}   options.userAnswers         用户答案集合
 * @param {Function} options.success             成功回调
 * @param {Function} options.fail                失败回调
 * @param {Function} options.complete            无论成功失败都会执行
 * @returns {Promise} Promise
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
 * 添加收藏
 *
 * @param {object}   options                  接收的参数
 * @param {string}   options.questionId       题目ID
 * @param {string}   options.classUniqueCode  项目编码
 * @param {string}   options.sourceType       项目来源
 * @param {Function} options.success          成功回调
 * @param {Function} options.fail             失败回调
 * @param {Function} options.complete         无论成功失败都会执行
 * @returns {Promise} Promise
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
 * 取消收藏
 *
 * @param {object}   options 接收的参数
 * @param {string}   options.collectId      用户收藏标识
 * @param {Function} options.success        成功回调
 * @param {Function} options.fail           失败回调
 * @param {Function} options.complete       无论成功失败都会执行
 * @returns {Promise} Promise
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
 * 批量查询题目收藏状态
 *
 * @param {object}   options 接收的参数
 * @param {string}   options.questionIds    用户收藏内容标识集合
 * @param {string}   options.projectUniCode 项目编码
 * @param {string}   options.sourceType     来源类型
 * @param {Function} options.success        成功回调
 * @param {Function} options.fail           失败回调
 * @param {Function} options.complete       无论成功失败都会执行
 * @returns {Promise} Promise
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

/**
 * 答疑提问鉴权
 *
 * @param {object}   options 接收的参数
 * @param {string}   options.questionType      问题类型
 * @param {Function} options.projectId        项目标识
 * @param {Function} options.classId          班级标识
 * @returns {Promise} Promise
 */
export function queryQuestionAuth(options) {
    const { questionType, projectId, classId } = initOptions(options);

    return requestApi('qa/query-question-auth', {
        questionType,
        projectId,
        classId,
    });
}

/**
 * 项目开启状态查询
 *
 * @param {object}   options 接收的参数
 * @param {Function} options.projectId        项目标识
 * @returns {Promise} Promise
 */
export function queryNounProjectConfigProject(options) {
    const { projectId } = initOptions(options);

    return requestApi('qb/query-noun-project-config-project-status', {
        projectId,
    });
}

/**
 * 章节名称查询
 *
 * @param {object}   options 接收的参数
 * @param {Function} options.sectionId        章节标识
 * @returns {Promise} Promise
 */
export function querySectionInfo(options) {
    const { sectionId } = initOptions(options);

    return requestApi('qb/query-section-info', {
        sectionId,
    });
}
