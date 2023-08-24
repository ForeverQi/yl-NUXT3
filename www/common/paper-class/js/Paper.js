import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import Subject from './Subject.js';
import '@/api/qb/api.QB2007.saves-answersheet.js';
import '@/api/qb/api.QB0013.save-answersheet-estimate.js';

//试卷类
function Paper(paperId, answersheetId, { sourceType, classUniquecode }) {
    this.info = null; //试卷详情
    this.sheetInfo = null; //答卷详情

    this.paperId = paperId; //试卷ID
    this.answersheetId = answersheetId; //答卷ID
    this.classId = ''; //项目标识	String
    this.className = ''; //项目名称
    this.subjectName = ''; //科目名称
    this.name = ''; //试卷名称
    this.memo = ''; //试卷详细描述
    this.year = ''; //试卷年份
    this.summary = ''; //试卷摘要
    this.typeCode = ''; //试卷类型编码
    this.createDate = ''; //试卷创建时间
    this.needEstimate = false; //试卷是否需要估分
    this.participateAmount = ''; //参与人数
    this.state = {
        lock: null, //试卷锁状态
        avl: null, //试卷可用状态
        del: null, //试卷删除状态
    };
    this.score = {
        total: 0, //试卷总分
        answer: 0, //答题总得分
        kgAnswer: 0,
        zgAnswer: 0, //zg(主观的) kg(客观的)
    };
    this.time = {
        all: 0, //考试时间（分钟）
        duration: 0, //答题时长(S)
    };

    this.beforeAnswerSeq = ''; //之前答题的序号
    this.stateCheck = {
        //用户是否可以答题
        action: 'A', //[枚举]G:继续考试;S:开始考试;O:启封;V:查看解析;A:检查用户答题次数
        isTrue: true,
        msg: '',
    };
    this.subjects = []; //题目类型
    this.questions = null;
    this.sourceType = sourceType;
    this.classUniquecode = classUniquecode;
}

/**
 * @param {Object} info
 1    className    项目名称    String
 2    subjectName    科目名称    String
 3    paperName    试卷名称    String
 4    paperMemo    试卷详细描述    String
 5    paperAuth    试卷权限    String    T:游客,M:会员,S:学员; 目前统一返回M会员
 6    paperYear    试卷年份    String
 7    paperSummary    试卷摘要    String
 8    papertypeCode    试卷类型编码    String    MRYL:每日一练,ZJLX：章节练习,MNST：模拟试题,MKDS：模拟考试,YFSJ：阅焚试卷,ZZY：周作业,YK：月考,SCLX：收藏练习,SJLX：随机抽题/智能练习,CTB    ：错题练习
 9    paperScoretotal    试卷总分    Double
 10    paperCreateddate    试卷创建时间    String
 11    paperIsneedestimate    试卷是否需要估分    String    [枚举]Y:需要Yes;N:不需要
 12    questionTotal    试题数量    Integer
 13    examDuration    考试时间（分钟）    Integer
 14    participateAmount    参与人数    Integer
 15    paperLockstatus    试卷锁状态    String    试卷锁状态 (A:加锁 G:未锁 空值:未锁)
 16    paperAvlstatus    试卷可用状态    String    试卷可用状态(Y:可用;N:不可用)
 17    paperDelstatus    试卷删除状态    String    试卷删除状态(Y:已删除;N:未删除)
 */
Paper.prototype.setInfo = function (info) {
    this.info = info;
    this.state.lock = info.paperLockstatus == 'A';
    this.state.avl = info.paperAvlstatus == 'Y';
    this.state.del = info.paperDelstatus == 'Y';

    this.className = info.className; //项目名称
    this.subjectName = info.subjectName; //科目名称
    this.name = info.paperName; //试卷名称
    this.memo = info.paperMemo; //试卷详细描述
    this.year = info.paperYear; //试卷年份
    this.summary = info.paperSummary; //试卷摘要
    this.typeCode = info.papertypeCode; //试卷类型编码
    this.score.total = info.paperScoretotal; //试卷总分
    this.createDate = info.paperCreateddate; //试卷创建时间
    this.needEstimate = info.paperIsneedestimate = 'Y'; //试卷是否需要估分
    this.participateAmount = info.participateAmount; //参与人数
    this.time.all = info.examDuration; //考试时间（分钟）
    //this.time.all = 0.1; //考试时间（分钟）
    this.state = {
        lock: null, //试卷锁状态
        avl: null, //试卷可用状态
        del: null, //试卷删除状态
    };
    this.classUniquecode = info.classUniquecode;
};
Paper.prototype.getInfo = function (info) {
    return this.info;
};
/**
 * @param {Object} sheetInfo
 1    paperId    试卷标识    String
 2    classId    项目标识    String
 3    answersheetId    答卷标识    String
 4    answersheetStatus    答卷状态    String
 5    answersheetDurationtime    答卷时长（秒）    Integer
 6    answersheetEstimatestatus    答卷估分状态    String    Y:已估分；N:未估分;空值:未估分
 7    beforeQuestionseq    之前答题的序号    Integer
 8    papersubjectId    之前答题的主题标识    Integer
 9    examBurndate    试卷焚毁时间    String
 10    examDuration    考试时间（分钟）    Double
 */
Paper.prototype.setSheetInfo = function (sheetInfo) {
    this.sheetInfo = sheetInfo;
    this.classId = sheetInfo.classId;
    this.time.duration = sheetInfo.answersheetDurationtime; //答卷时长(S)
    this.needEstimate = this.needEstimate && sheetInfo.answersheetEstimatestatus != 'Y'; //试卷是否需要估分
    if (sheetInfo.papersubjectId) {
        this.beforeAnswerSeq = (this.getSubjectById(sheetInfo.papersubjectId).getLastQuestionIndex() || 0) + sheetInfo.beforeQuestionseq || 0;
    }
};
Paper.prototype.setSubjects = function (subjects) {
    debugger;
    for (var i = 0; i < subjects.length; i++) {
        let subject = new Subject(this, subjects[i]);
        subject.setIndex(i);
        let prev = i == 0 ? null : this.subjects[this.subjects.length - 1];
        if (prev) {
            subject.setPrev(prev);
            prev.setNext(subject);
        }
        this.subjects.push(subject);
    }
};
Paper.prototype.getSubjects = function () {
    return this.subjects;
};
Paper.prototype.getSubjectById = function (id) {
    for (var i = 0; i < this.subjects.length; i++) {
        let subject = this.subjects[i];
        if (subject.id == id) return subject;
    }
    return null;
};
Paper.prototype.getQuestionById = function (id) {
    for (var i = 0; i < this.questions.length; i++) {
        let question = this.questions[i];
        if (question.id == id) return question;
    }
    return null;
};
Paper.prototype.getQuestions = function () {
    if (!this.questions) {
        var questions = [];
        for (var i = 0; i < this.subjects.length; i++) {
            questions.push(...this.subjects[i].questions);
        }
        this.questions = questions;
    }
    return this.questions;
};
//保存做题记录
Paper.prototype.answerSaves = function (callback) {
    this.tjOrSaveAll('G', callback);
};
//提交试卷
Paper.prototype.submit = function (callback) {
    this.tjOrSaveAll('A', callback);
};
Paper.prototype.tjOrSaveAll = function (answersheetStatus, callback) {
    let vm = this;
    let list = [];
    var questions = vm.getQuestions();
    for (let i = 0; i < questions.length; i++) {
        let item = questions[i];
        if (item.answer) {
            let ansMap = {
                paperquestiondetailId: item.detailId,
                answersheetdetailUseranswer: item.answer,
                papersubjectId: item.subject.id,
                paperquestiondetailSeq: item.data.paperquestiondetailSeq,
            };
            list.push(ansMap);
        }
    }
    console.log('输入数据', list);
    ///qb/answersheet/saves
    niceloo.api.call('qb/saves-answersheet', {
        userAnswers: list.length == 0 ? [] : list,
        answersheetId: vm.answersheetId,
        paperId: vm.paperId,
        answersheetStatus, //A:已完成;G:待继续
        answersheetDurationtime: vm.time.duration,
        classUniquecode: vm.classUniquecode,
        answersheetSourcetype: vm.sourceType,
        onsuccess: (data) => {
            vm.answersheetId = data.answersheetId;
            if (callback) callback();
        },
        onerror: (error) => {
            console.log('系统错误，错误信息为：', error);
            vm.$baseUI.confirm({
                title: '温馨提示',
                content: '提交失败，是否继续提交？',
                showCancel: true,
                cancelText: '取消',
                confirmText: '重试',
                confirm: () => {
                    vm.tjOrSaveAll('A', callback);
                },
                cancel: () => {
                    function sendMessage(func, args) {
                        window.parent.postMessage(
                            {
                                func,
                                args,
                            },
                            '*'
                        );
                    }
                    sendMessage('goonPaly');
                },
            });
        },
        oncomplete: () => {},
    });
};
//试题估分保存
Paper.prototype.estimateSave = function (callback) {
    debugger;
    let vm = this;
    let list = [];
    var questions = vm.getQuestions();
    for (let i = 0; i < questions.length; i++) {
        let item = questions[i];
        if (item.type != 'O' && type != 'A') continue;
        let ansMap = {
            answersheetdetailId: item.sheetdetailId || '',
            paperquestiondetailId: item.detailId,
            papersubjectId: item.subject.id,
            answersheetdetailScore: item.score.estimate || 0,
        };
        list.push(ansMap);
    }

    niceloo.api.call('qb/save-answersheet-estimate', {
        paperId: vm.paperId,
        answersheetId: vm.answersheetId,
        estimateScores: list,
        onsuccess: () => {
            if (callback) callback();
        },
        onerror: niceloo.api.handleFailure,
        oncomplete: () => {},
    });
};
export default Paper;
