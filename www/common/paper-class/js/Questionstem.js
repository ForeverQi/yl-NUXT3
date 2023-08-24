//题干题
function Questionstem(pager, subject) {
    this.pager = pager;
    this.subject = subject;
    this.title = null; //题目类型
    this.type = 'AA'; //题目类型
    this.questions = null; //题干题的下属小题
    this.subIndex = null; //题干题在试卷中的索引
}
Questionstem.prototype.setSubIndex = function (index) {
    this.subIndex = index;
};
Questionstem.prototype.setQuestions = function (questions) {
    this.questions = questions;
};
Questionstem.prototype.init = function () {
    //初始化题干信息
    let title;
    try {
        title = JSON.parse(this.questions[0].data.questionstemContent.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>')).title;
    } catch (e) {
        title = '内容解析出错';
        console.log(this.questions[0].data.questionstemContent);
    }
    this.title = title;
};

export default Questionstem;
