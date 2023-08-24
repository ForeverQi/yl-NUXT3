import Question from './Question.js';
import Questionstem from './Questionstem.js';
/**
 * 大题
 *
    // paperId: "PAPER20190420440000000265"
    // papersubjectAveragescore: 2
    // papersubjectDeductionscore: 0.5
    // papersubjectId: "PAPERSUBJECT20190420440000000041"
    // papersubjectLackanswerscore: 0.5
    // papersubjectName: "多选题"
    // papersubjectSeq: 2
    // papersubjectSourceid: "52422"
    // papersubjectTotalscore: 38
    // papersubjectUnansweredstatus: "N"
    // questionTotal: 20
    // questionType: "M" S 单选
    //papersubjectMemo  主题描述
 */
function Subject(pager, data) {
    this.data = data;
    this.pager = pager;
    this.id = data.paperSubjectId;

    this.name = data.papersubjectName; //大题类型名称
    this.type = data.questionType; //题目类型

    this.answerTotal = 0; //题型答题总数
    this.answerRightTotal = 0; //答题正确数
    this.answerRightRate = 0; //答题正确率

    this.score = {
        total: 0, //总分
        answer: 0, //答题得分
    };

    this.index = null; //大题在试卷中的索引
    this.prev = null; //上一个大题
    this.next = null; //下一个大题
    this.questions = []; //小题
    this.questionstems = []; //有阅读材料的小题
}
Subject.prototype.setIndex = function (index) {
    this.index = index;
};
Subject.prototype.setPrev = function (prev) {
    this.prev = prev;
};
Subject.prototype.setNext = function (next) {
    this.next = next;
};
Subject.prototype.getQuestionById = function (id) {
    for (var i = 0; i < this.questions.length; i++) {
        let q = this.questions[i];
        if (q.id == id) return q;
    }
    return null;
};
Subject.prototype.getLastQuestion = function () {
    if (this.questions.length > 0) {
        return this.questions[this.questions.length - 1];
    } else if (this.prev) {
        return this.prev.getLastQuestion();
    } else {
        return null;
    }
};
Subject.prototype.getLastQuestionIndex = function () {
    let last = this.getLastQuestion();
    if (last) {
        return last.index;
    } else {
        return -1;
    }
};
Subject.prototype.initQuestions = function (questionsData_) {
    var map = {};
    var NOID = 'NOID';
    var idArr = [NOID];
    var questionsData = [];
    let i = 0;
    for (i = 0; i < questionsData_.length; i++) {
        let item = questionsData_[i];
        let questionstemId = item.questionstemId || NOID;
        if (idArr.indexOf(questionstemId) == -1) idArr.push(questionstemId);
        map[questionstemId] = map[questionstemId] || [];
        item.treeindex = map[questionstemId].length;
        item.paper_sub_seq = map[questionstemId].length;
        map[questionstemId].push(item);
    }
    for (i = 0; i < idArr.length; i++) {
        questionsData.push(...(map[idArr[i]] || []));
    }
    for (i = 0; i < questionsData.length; i++) {
        let question = new Question(this.pager, this, questionsData[i]);
        question.setSubIndex(this.index);
        question.setIndex(this.getLastQuestionIndex() + 1);
        let prev = this.getLastQuestion();
        question.setPrev(prev);
        if (prev) prev.setNext(question);
        question.setSubIndex(this.index);
        this.questions.push(question);
    }
    for (var ii = 0; ii < idArr.length; ii++) {
        let k = idArr[ii];
        let items = map[k] || [];
        if (items.length == 0) continue;
        if (k == NOID) {
            for (i = 0; i < items.length; i++) {
                this.questionstems.push(this.getQuestionById(items[i].questionId));
            }
        } else {
            let questionstem = new Questionstem(this.pager, this);
            var qsts = [];
            for (i = 0; i < items.length; i++) {
                let question = this.getQuestionById(items[i].questionId);
                question.questionstem = questionstem;
                qsts.push(question);
            }
            questionstem.setQuestions(qsts);
            questionstem.setSubIndex(this.index);
            questionstem.init();
            this.questionstems.push(questionstem);
        }
    }
};
export default Subject;
