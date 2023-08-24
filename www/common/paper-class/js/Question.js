import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import '@/api/qb/api.QB2007.saves-answersheet.js';
import Vue from 'vue';
/**
 * 小题
// `questionType` varchar(20) DEFAULT NULL COMMENT
'题目类型(O:主观题Opinion;S:单选题Single;M:多选Multiple;J:判断题Judge;F:填空Fill;A:材料分析Analyze)',
// collectStatus: "N"
    // paperquestiondetailId: "PAPERQUESTIONDET20190420440000000873"
    // paperquestiondetailSeq: 0
    // questionContent: "{"title":"79.根据《劳动合同法》，劳动者有下列情形之一，用人单位可以解除劳动合同的是（）。", "option":[{"type":"A","content":"劳动者不能胜任工作"},{"type":"B","content":"劳动者在试用期内不符合录用条件"},{"type":"C","content":"劳动者严重违反用人单位的规章制度"},{"type":"D","content":"劳动者被依法追究刑事责任"},{"type":"E","content":"劳动者患病"}],"optionnum":"5"}"
    // questionId: "QUESTION20190420440000000677"
    // questionTitle: ""
    // questionType: "M"多选 S 单选 J 判断
    // questionstemId: null
 */
function Question(pager, subject, data) {
    this.data = data;
    this.pager = pager;

    this.subject = subject;
    this.id = data.questionId;
    this.detailId = data.paperquestiondetailId;
    this.sheetdetailId = null; //答卷明细标识	String
    this.oldAnswer = null; //用户上次保存答案
    this.answer = null; //用户答案
    this.answerState = 0; //答题状态 0未答 1已答 2正确 3错误
    this.collectStatus = false; //用户对题目的收藏状态
    this.collectId = null; //用户对题目的收藏ID
    this.rightAnswer = null; //解析的正确答案
    this.answerParse = null; //题目答案解析
    this.answerApath = null; //题目答案解析音频地址集合
    this.answerVpath = null; //题目答案解析视频地址集合
    //<!--S单选题 M多选题 J判断题 F填空题 O名词解释 O简答题 O论述题 A案例分析题-->
    this.type = data.questionType; //题目类型
    /**
     * {
         check:boolean,用户是否选择
         rightCheck:boolean,是否为正确答案
         type:'A',
         content
     }
     */
    this.options = null; //题目选项

    this.score = {
        total: data.paperquestiondetailScore, //总分
        estimate: 0, //答题估分
    };
    this.answercounter = {
        Amount: 0, // 1	answercounterAmount	用户答题次数	Integer
        Correct: 0, // 2	answercounterCorrect	用户答题正确数	Integer
        Rightrate: 0, // 3	answercounterRightrate	用户答题正确率	Double
        Amounttotal: 0, // 4	answercounterAmounttotal	所有用户答题次数之和	Integer
        Correcttotal: 0, // 5	answercounterCorrecttotal	所有用户答题次数正确数之和	Integer
        AverageRightrate: 0, // 6	answercounteraverageRightrate	所有用户答题平均正确率	Double
    };
    this.hasQuestionstem = data.questionstemId != null; //是否有题干信息
    this.questionstem = null; //当前小题的题干题

    this.index = null; //小题题在试卷中的索引
    this.subIndex = null; //小题题在试卷中的索引
    this.prev = null; //上一个小题
    this.next = null; //下一个小题

    let questionContent = getQuestionContent(data.questionContent);
    this.title = questionContent.title;
    if (['S', 'M', 'J', 'I'].indexOf(this.type) > -1) {
        this.options = formatOption(questionContent);
    }
}
Question.prototype.setIndex = function (index) {
    this.index = index;
};
Question.prototype.setAnswer = function (answer) {
    this.answer = answer;
    if (this.type == 'S' || this.type == 'J') {
        let options = this.options;
        for (let i = 0; i < options.length; i++) {
            let item = options[i];
            Vue.set(item, 'check', this.answer == item.type);
            // item.check = this.answer==item.type;
        }
    } else if (this.type == 'M' || this.type == 'I') {
        let options = this.options;
        for (let i = 0; i < options.length; i++) {
            let item = options[i];
            let check = (this.answer || '').indexOf(item.type) > -1;
            Vue.set(item, 'check', check);
            // item.check = (this.answer || '').indexOf(item.type) > -1;
        }
    }
};
Question.prototype.setRightAnswer = function (rightAnswer) {
    this.rightAnswer = rightAnswer;
    this.answerState = rightAnswer == this.answer ? 2 : 3;
    if (this.type == 'S' || this.type == 'J') {
        let options = this.options;
        for (let i = 0; i < options.length; i++) {
            let item = options[i];
            item.rightCheck = this.rightAnswer == item.type;
        }
    } else if (this.type == 'M' || this.type == 'I') {
        let options = this.options;
        for (let i = 0; i < options.length; i++) {
            let item = options[i];
            item.rightCheck = (this.rightAnswer || '').indexOf(item.type) > -1;
        }
    }
};
Question.prototype.setAnswerParse = function (answerParse) {
    this.answerParse = answerParse;
};
Question.prototype.setAnswerApath = function (answerApath) {
    this.answerApath = answerApath;
};
Question.prototype.setAnswerVpath = function (answerVpath) {
    this.answerVpath = answerVpath;
};
Question.prototype.setSubIndex = function (index) {
    this.subIndex = index;
};
Question.prototype.setPrev = function (prev) {
    this.prev = prev;
};
Question.prototype.setNext = function (next) {
    this.next = next;
};
/**
 * 用户答题计数器统计
 */
Question.prototype.getAnswercounter = function (callback) {
    // 该接口访问太慢,暂时太慢
    // let vm = this;
    // vm.Http.callService({
    //     url: "/qb/answercounter/stat",
    //     data: {
    //         // 1	questionId	题目标识	String	是	M:org.nobject.common.regex.ValidatorUtils#isID
    //         // 2	sourceType	来源类型	String	是	M:org.nobject.common.regex.ValidatorUtils#isSafe
    //         questionId: vm.id,
    //         sourceType: vm.paper.sourceType,
    //     },
    // }).success(function(data) {
    //     // 1	answercounterAmount	用户答题次数	Integer
    //     // 2	answercounterCorrect	用户答题正确数	Integer
    //     // 3	answercounterRightrate	用户答题正确率	Double
    //     // 4	answercounterAmounttotal	所有用户答题次数之和	Integer
    //     // 5	answercounterCorrecttotal	所有用户答题次数正确数之和	Integer
    //     // 6	answercounteraverageRightrate	所有用户答题平均正确率	Double
    //     vm.answercounter = {
    //         Amount: data.answercounterAmount, //	用户答题次数	Integer
    //         Correct: data.answercounterCorrect, //	用户答题正确数	Integer
    //         Rightrate: data.answercounterRightrate, //用户答题正确率	Double
    //         Amounttotal: data.answercounterAmounttotal, //	所有用户答题次数之和	Integer
    //         Correcttotal: data.answercounterCorrecttotal, //	所有用户答题次数正确数之和	Integer
    //         AverageRightrate: data.answercounteraverageRightrate, //	所有用户答题平均正确率	Double
    //     }
    //     if (callback) callback();
    // })
};
/**
 * 保存小题答案
 */
Question.prototype.saveAnswer = function (callback) {
    let vm = this;
    if (StringUtil.isEmpty(vm.answer) || vm.oldAnswer == vm.answer) {
        //未做题
        if (callback) callback();
        return;
    }

    ///qb/answersheet/save
    niceloo.api.call('qb/saves-answersheet', {
        answersheetId: vm.paper.answersheetId,
        paperId: vm.paper.paperId,
        answersheetStatus: 'G', //交卷状态
        answersheetDurationtime: vm.paper.time.duration, //答题时间
        paperquestiondetailId: vm.detailId, //
        paperquestiondetailSeq: vm.data.paperquestiondetailSeq,
        answersheetdetailUseranswer: vm.answer, //答案不变得时候应不保存
        papersubjectid: vm.subject.id,
        classUniquecode: vm.paper.classUniquecode,
        answersheetSourcetype: vm.paper.sourceType,
        onsuccess: (data) => {
            vm.oldAnswer = vm.answer;
            vm.pager.answersheetId = data.answersheetId;
            if (callback) callback();
        },
        onerror: niceloo.api.handleFailure,
        oncomplete: () => {},
    });
};
/**
 * 收藏操作
 */
Question.prototype.changeCollect = function (callback) {
    let vm = this;
    var action = vm.collectStatus ? 'cancel' : 'add';

    niceloo.api.callRaw({
        api: 'qb/collect/' + action,
        params: {
            collectContenttype: 'Q',
            collectContent: vm.id,
            collectId: vm.collectId,
            subjectId: vm.subject.id,
            sourceType: vm.paper.sourceType,
            classUniquecode: vm.paper.classUniquecode,
        },
        onsuccess(data) {
            vm.collectId = (data || {}).collectId;
            vm.collectStatus = !vm.collectStatus;
            if (callback) callback();
        },
        onerror: niceloo.api.handleFailure,
        oncomplete: () => {},
    });
};

function formatOption(item) {
    //兼容配伍题option为空的问题
    let option = item.option || [];
    if (option.length == 0) {
        var optionstr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substr(0, item.optionnum);
        for (let i = 0; i < optionstr.length; i++) {
            option.push({
                type: optionstr.charAt(i),
            });
        }
    }
    return option;
}

function getQuestionContent(questionContentStr) {
    var questionContent = null;
    try {
        questionContent = JSON.parse(questionContentStr);
    } catch (e) {
        questionContent = {
            option: [],
            title: '内容解析出错',
        };
    }
    for (var ii = 0; ii < questionContent.option.length; ii++) {
        var it = questionContent.option[ii];
        it.type = it.type.charAt(0);
    }
    return questionContent;
}
export default Question;
