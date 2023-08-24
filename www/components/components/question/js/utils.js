/**
 * 该工具类用来管理题库控件内所需所有工具类函数
 * 1. 生成css样式
 * 2. 检查题目类型：统一管理所有题目type，将不同api文件中不同的key全部统一为同一字段用于前端调用（更好的方法是维护好key:value词典，此处只是兜底适配）
 * 3. 获取大题题目类型名称：统一管理答题标题名称，根据需求进行更改可全部更改
 * 4. 将阿拉伯数字转换为简写汉字
 * 5. 题目添加题目编号：统一给大题/小题添加编号，可根据需求进行更改
 * 6. 解析JSON字符串
 * 7. 根据数组元素某个属性值，将数组转换对象
 * 8. 数组去重
 * 9. 根据数组对象中某个key进行分组
 * 10. 初始化带有回调风格参数配置
 */
/**
 * 1. 生成css样式
 * @param {Object} style
 */
export function buildCss(style) {
    let css = '';
    for (let name in style) {
        const value = style[name];
        if (value) css += `${name}: ${value};`;
    }

    return css;
}

/**
 * 2. 检查题目类型
 * @param {Object} questionType 大题类型
 * @param {Object} subQuestionType 小题类型
 * @return {String}
 */
export function checkQuestionType(questionType, subQuestionType) {
    const dictionary = {
        listening: ['L', 'listening'], // 听力题
        single: ['S', 'radio', 'single'], // 单选
        multiple: ['M', 'checkbox', 'multiple'], // 多选题
        indefinite: ['I', 'random', 'indefinite'], // 不定项选择题
        judge: ['J', 'judge'], // 判断
        fill: ['F', 'fill'], // 填空
        opinion: ['O', 'opinion'], // 简答题
        'cloze-fill': ['CF', 'cloze-fill'], // 完形填空
        'blank-choose': ['BC', 'radio-fill', 'blank-choose'], // 选词填空
        analysis: ['A', 'analysis'], // 案例分析题
        compatibility: ['C', 'pwt', 'compatibility'], // 配伍题
    };

    // 统一返回标准题型
    for (let type in dictionary) {
        for (let name of dictionary[type]) {
            if (questionType === name || questionType === type) {
                questionType = type;
            }
        }
    }
    for (let type in dictionary) {
        for (let name of dictionary[type]) {
            if (subQuestionType === name || subQuestionType === type) {
                subQuestionType = type;
            }
        }
    }

    /* 案例分析、听力题和配伍题下会有各种题型，挑出来单独组type */
    if (['analysis', 'listening', 'compatibility'].includes(questionType)) {
        return questionType + '-' + subQuestionType;
    }

    return questionType;
}

/**
 * 3. 获取大题题目类型名称
 * @param {Object} questionType    大题类型
 * @return {String}
 */
export function getQuestionNameByType(questionType) {
    const dictionary = {
        listening: '听力题',
        single: '单项选择题',
        multiple: '多项选择题',
        indefinite: '不定项选择',
        judge: '判断题',
        fill: '填空题',
        opinion: '简答题',
        'cloze-fill': '完形填空',
        'blank-choose': '选词填空',
        analysis: '案例分析题',
        compatibility: '配伍题',
    };
    return dictionary[questionType] ? dictionary[questionType] : '';
}

/**
 * 4. 将阿拉伯数字转换为简写汉字
 * @param {Object} Num
 * @return {String}
 */
export function arabiaToSimplifiedChinese(num) {
    const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const chnUnitChar = ['', '十', '百', '千'];
    const chnUnitSection = ['', '万', '亿', '万亿', '亿亿'];
    const numToChn = (num) => {
        var index = num.toString().indexOf('.');
        if (index != -1) {
            var str = num.toString().slice(index);
            var a = '点';
            for (var i = 1; i < str.length; i++) {
                a += chnNumChar[parseInt(str[i])];
            }
            return a;
        }
    };
    const sectionToChinese = (section) => {
        //定义在每个小节的内部进行转化的方法，其他部分则与小节内部转化方法相同
        var str = '';
        var chnstr = '';
        var zero = false;
        var count = 0; //zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
        while (section > 0) {
            var v = section % 10; //对数字取余10，得到的数即为个位数
            if (v == 0) {
                //如果数字为零，则对字符串进行补零
                if (zero) {
                    zero = false; //如果遇到连续多次取余都是0，那么只需补一个零即可
                    chnstr = chnNumChar[v] + chnstr;
                }
            } else {
                zero = true; //第一次取余之后，如果再次取余为零，则需要补零
                str = chnNumChar[v];
                str += chnUnitChar[count];
                chnstr = str + chnstr;
            }
            count++;
            section = Math.floor(section / 10);
        }
        return chnstr;
    };
    //定义整个数字全部转换的方法，需要依次对数字进行10000为单位的取余，然后分成小节，按小节计算，当每个小节的数不足1000时，则需要进行补零
    if (num > 9 && num < 20) {
        return '十' + (num % 10 ? chnNumChar[num % 10] : '');
    }
    var a = numToChn(num) || '';
    num = Math.floor(num);
    var unitPos = 0;
    var strIns = '';
    var chnStr = '';
    var needZero = false;

    if (num === 0) {
        return chnNumChar[0];
    }
    while (num > 0) {
        var section = num % 10000;
        if (needZero) {
            chnStr = chnNumChar[0] + chnStr;
        }
        strIns = sectionToChinese(section);
        strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0];
        chnStr = strIns + chnStr;
        needZero = section < 1000 && section > 0;
        num = Math.floor(num / 10000);
        unitPos++;
    }

    return chnStr + a;
}

/**
 * 创建一块临时状态空间，1秒后自动销毁（即遍历处理数据期间有效）
 * @param {String} id
 * @return {Object}
 */
export function createTempState(id) {
    const root = createTempState;
    const state = root.state ? root.state : (root.state = {});

    if (!state[id]) {
        state[id] = {};
        const timer = setTimeout(() => {
            clearTimeout(timer);
            state[id] = undefined;
        }, 1000);
    }

    return state[id];
}

/**
 * 5. 题目添加题目编号
 * @param {Object} question
 */
export function appendQuestionTitleNumber(question, status = 'refresh') {
    if (status === 'refresh') {
        const root = createTempState;
        const state = root.state ? root.state : (root.state = {});
        state[1] = undefined;
        state[2] = undefined;
    }
    //  处理大题，先根据groupType进行分组，再根据stemId分组
    if (question.stemId) {
        const state = createTempState(1);
        if (state[question.groupType]) {
            if (state[question.groupType][question.stemId]) {
                state[question.groupType][question.stemId].count++;
            } else {
                state[question.groupType][question.stemId] = {
                    count: 1,
                    number: Object.keys(state[question.groupType]).length + 1,
                };
            }
        } else {
            state[question.groupType] = {
                [question.stemId]: {
                    count: 1,
                    number: 1, // 此时还不存在[question.stemId]key，默认从1开始
                },
            };
        }
        const curState = state[question.groupType];
        question.number = curState[question.stemId].count;
        question.stemNumber = curState[question.stemId].number;
    } else {
        // 如果是小题，先根据题型进行分组，然后再按照小题进行递增序号
        const state = createTempState(2);
        state[question.type] ? state[question.type]++ : (state[question.type] = 1);
        if (question.questionStemSeq) {
            question.number = question.questionStemSeq;
        } else {
            question.number = state[question.type];
        }
    }

    return question;
}

/**
 * 6. 解析JSON字符串
 * @param {Object} json
 */
export function JsonParse(json) {
    if (String(json).length) {
        return JSON.parse(json);
    }

    return {};
}

/**
 * 7. 根据数组元素某个属性值，将数组转换对象
 * @param {Object} list
 * @param {Object} byKey
 */
export function convertArrayToMap(list, byKey) {
    const map = {};
    if (Array.isArray(list)) {
        for (let item of list) {
            // eslint-disable-next-line no-prototype-builtins
            if (item && typeof item === 'object' && item.hasOwnProperty(byKey)) {
                map[item[byKey]] = item;
            }
        }
    }

    return map;
}

/**
 * 8. 数组去重
 * @param {Object} arr
 */
export function arrayUnique(arr) {
    //Set数据结构，它类似于数组，其成员的值都是唯一的
    return Array.from(new Set(arr)); // 利用Array.from将Set结构转换成数组
}

/**
 * 9. 根据数组对象中某个key进行分组
 * @param {Array}  list 用于分组的arr
 * @param {String} groupId 用于分组的key名
 * @returns {Array} [[], [], []]
 */
export function arrayGroupBy(list, groupId) {
    function groupBy(array, fun) {
        const groups = {};
        array.forEach((_item) => {
            const group = JSON.stringify(fun(_item));
            groups[group] = groups[group] || [];
            groups[group].push(_item);
        });

        return Object.values(groups);
        // return groups;
    }
    return groupBy(list, (item) => {
        return item[groupId];
    });
}

/**
 * 10. 初始化带有回调风格参数配置
 * @param {Object} options
 * @param {Object} options.success  成功回调
 * @param {Object} options.fail     失败回调
 * @param {Object} options.complete 无论成功或失败都会回调
 * @param aliasOptions
 */
export function initOptions(options = {}, aliasOptions = {}) {
    const newOptions = Object.assign(Object.create(null), options);

    /* 从参数中获取给定的第一个别名值*/
    const getFirstAliasValue = (options, aliasList) => {
        const list = Array.isArray(aliasList) ? aliasList : typeof aliasList === 'string' ? aliasList.split(',') : [];
        for (const aliasName of list) {
            if (options[aliasName] !== undefined) {
                return options[aliasName];
            }
        }
    };

    /* 获取的参数名不存在时尝试从别名中获取，例如：aliasOptions = { appId : ['appletId', 'appId'] } */
    for (const name in aliasOptions) {
        if (options[name] === undefined) {
            const value = getFirstAliasValue(options, aliasOptions[name]);
            if (value !== undefined) {
                newOptions[name] = value;
            }
        }
    }

    /* 处理控制属性 */
    const undefinedFailHandle = () => {
        // 定义success回调，而没有定义fail时打印警告提示
        if (typeof options.success === 'function' && typeof options.fail !== 'function') {
            // 打印success回调便于定位代码
            console.warn('[Undefined fail handle]：', {
                success: options.success,
            });
        }
    };
    const callback = (callback, arg) => (typeof callback === 'function' ? callback(arg) : undefinedFailHandle());

    // 标记complete回调是否执行过
    newOptions.completeDone = false;

    Object.assign(newOptions, {
        success: (res) => {
            callback(options.success, res);

            // 保证执行success回调后必须执行complete回调
            newOptions.timer = setTimeout(() => {
                if (!newOptions.completeDone) callback(options.complete, res);
            });
        },
        fail: (e) => {
            const err = Object.create(null);
            if (typeof e === 'string') err.errMsg = e;
            if (e && typeof e === 'object') Object.assign(err, e);
            callback(options.fail, err);

            // 保证执行fail回调后必须执行complete回调
            newOptions.timer = setTimeout(() => {
                if (!newOptions.completeDone) callback(options.complete, err);
            });
        },
        complete: (res) => {
            newOptions.completeDone = true;
            callback(options.complete, res);
        },
    });

    return newOptions;
}
