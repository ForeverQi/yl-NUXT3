(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : (global.PaperClass = factory());
})(this, function () {
    'use strict';
    /**
     *
     * @param params
     */
    var httpClient = function (params) {
        if (window.$nuxt.$callRawApi) {
            return window.$nuxt.$callRawApi(params);
        } else {
            return window.niceloo.api.callRaw(params);
        }
    };
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
     *
     * @param pager
     * @param subject
     * @param data
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

        var questionContent = getQuestionContent(data.questionContent);
        this.title = questionContent.title;
        if (['S', 'M', 'J'].indexOf(this.type) > -1) {
            this.options = formatOption(questionContent);
        }
    }
    /**
     *
     * @param index
     */
    Question.prototype.setIndex = function (index) {
        this.index = index;
    };
    /**
     *
     * @param answer
     */
    Question.prototype.setAnswer = function (answer) {
        this.answer = answer;
        if (this.type == 'S' || this.type == 'J') {
            var options = this.options;
            for (var i = 0; i < options.length; i++) {
                var item = options[i];
                item.check = this.answer == item.type;
            }
        } else if (this.type == 'M') {
            var _options = this.options;
            for (var _i = 0; _i < _options.length; _i++) {
                var _item = _options[_i];
                _item.check = (this.answer || '').indexOf(_item.type) > -1;
            }
        }
    };
    /**
     *
     * @param questionstem
     */
    Question.prototype.setQuestionstem = function (questionstem) {
        this.questionstem = questionstem;
    };
    /**
     *
     * @param rightAnswer
     */
    Question.prototype.setRightAnswer = function (rightAnswer) {
        this.rightAnswer = rightAnswer;
        this.answerState = rightAnswer == this.answer ? 2 : 3;
        if (this.type == 'S' || this.type == 'J') {
            var options = this.options;
            for (var i = 0; i < options.length; i++) {
                var item = options[i];
                item.rightCheck = this.rightAnswer == item.type;
            }
        } else if (this.type == 'M') {
            var _options2 = this.options;
            for (var _i2 = 0; _i2 < _options2.length; _i2++) {
                var _item2 = _options2[_i2];
                _item2.rightCheck = (this.rightAnswer || '').indexOf(_item2.type) > -1;
            }
        }
    };
    /**
     *
     * @param answerParse
     */
    Question.prototype.setAnswerParse = function (answerParse) {
        this.answerParse = answerParse;
    };
    /**
     *
     * @param answerApath
     */
    Question.prototype.setAnswerApath = function (answerApath) {
        this.answerApath = answerApath;
    };
    /**
     *
     * @param answerVpath
     */
    Question.prototype.setAnswerVpath = function (answerVpath) {
        this.answerVpath = answerVpath;
    };
    /**
     *
     * @param index
     */
    Question.prototype.setSubIndex = function (index) {
        this.subIndex = index;
    };
    /**
     *
     * @param prev
     */
    Question.prototype.setPrev = function (prev) {
        this.prev = prev;
    };
    /**
     *
     * @param next
     */
    Question.prototype.setNext = function (next) {
        this.next = next;
    };
    /**
     * 用户答题计数器统计
     *
     * @param callback
     */
    Question.prototype.getAnswercounter = function (callback) {
        var vm = this;
        httpClient({
            api: 'qb/answercounter/stat',
            params: {
                // 1	questionId	题目标识	String	是	M:org.nobject.common.regex.ValidatorUtils#isID
                // 2	sourceType	来源类型	String	是	M:org.nobject.common.regex.ValidatorUtils#isSafe
                questionId: vm.id,
                sourceType: vm.paper.sourceType,
            },
            /**
             *
             * @param data
             */
            onsuccess(data) {
                // 1	answercounterAmount	用户答题次数	Integer
                // 2	answercounterCorrect	用户答题正确数	Integer
                // 3	answercounterRightrate	用户答题正确率	Double
                // 4	answercounterAmounttotal	所有用户答题次数之和	Integer
                // 5	answercounterCorrecttotal	所有用户答题次数正确数之和	Integer
                // 6	answercounteraverageRightrate	所有用户答题平均正确率	Double
                vm.answercounter = {
                    Amount: data.answercounterAmount, //	用户答题次数	Integer
                    Correct: data.answercounterCorrect, //	用户答题正确数	Integer
                    Rightrate: data.answercounterRightrate, //用户答题正确率	Double
                    Amounttotal: data.answercounterAmounttotal, //	所有用户答题次数之和	Integer
                    Correcttotal: data.answercounterCorrecttotal, //	所有用户答题次数正确数之和	Integer
                    AverageRightrate: data.answercounteraverageRightrate, //	所有用户答题平均正确率	Double
                };
                if (callback) callback();
            },
            onerror: niceloo.api.handleFailure,
            oncomplete: () => {},
        });
    };
    /**
     * 保存小题答案
     *
     * @param callback
     */
    Question.prototype.saveAnswer = function (callback) {
        var vm = this;
        if (StringUtil.isEmpty(vm.answer) || vm.oldAnswer == vm.answer) {
            //未做题
            if (callback) callback();
            return;
        }

        httpClient({
            api: 'qb/answersheet/save',
            params: {
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
            },
            /**
             *
             * @param data
             */
            onsuccess(data) {
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
     *
     * @param callback
     */
    Question.prototype.changeCollect = function (callback) {
        var vm = this;
        var action = vm.collectStatus ? 'cancel' : 'add';
        httpClient({
            api: 'qb/collect/' + action,
            params: {
                collectContenttype: 'Q',
                collectContent: vm.id,
                collectId: vm.collectId,
                subjectId: vm.subject.id,
                sourceType: vm.paper.sourceType,
                classUniquecode: vm.paper.classUniquecode,
            },
            /**
             *
             * @param data
             */
            onsuccess(data) {
                vm.collectId = (data || {}).collectId;
                vm.collectStatus = !vm.collectStatus;
                if (callback) callback();
            },
            onerror: niceloo.api.handleFailure,
            oncomplete: () => {},
        });
    };

    /**
     *
     * @param item
     */
    function formatOption(item) {
        //兼容配伍题option为空的问题
        var option = item.option || [];
        if (option.length == 0) {
            var optionstr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substr(0, item.optionnum);
            for (var i = 0; i < optionstr.length; i++) {
                option.push({
                    type: optionstr.charAt(i),
                });
            }
        }
        return option;
    }

    /**
     *
     * @param questionContentStr
     */
    function getQuestionContent(questionContentStr) {
        var questionContent = null;
        try {
            questionContent = JSON.parse(questionContentStr);
        } catch (e) {
            console.error(e);
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

    /**
     * 题干题
     *
     * @param pager
     * @param subject
     */
    function Questionstem(pager, subject) {
        this.pager = pager;
        this.subject = subject;
        this.title = null; //题目类型
        this.type = 'AA'; //题目类型
        this.questions = null; //题干题的下属小题
        this.subIndex = null; //题干题在试卷中的索引
    }
    /**
     *
     * @param index
     */
    Questionstem.prototype.setSubIndex = function (index) {
        this.subIndex = index;
    };
    /**
     *
     * @param questions
     */
    Questionstem.prototype.setQuestions = function (questions) {
        this.questions = questions;
    };
    /**
     *
     */
    Questionstem.prototype.init = function () {
        //初始化题干信息
        var title = void 0;
        try {
            title = JSON.parse(this.questions[0].data.questionstemContent.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>')).title;
        } catch (e) {
            title = '内容解析出错';
            console.log(this.questions[0].data.questionstemContent);
        }
        this.title = title;
    };

    /**
     *
     * @param arr
     */
    var toConsumableArray = function (arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

            return arr2;
        } else {
            return Array.from(arr);
        }
    };

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
     *
     * @param pager
     * @param data
     */
    function Subject(pager, data) {
        this.data = data;
        this.pager = pager;
        this.id = data.papersubjectId;
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
    /**
     *
     * @param index
     */
    Subject.prototype.setIndex = function (index) {
        this.index = index;
    };
    /**
     *
     * @param prev
     */
    Subject.prototype.setPrev = function (prev) {
        this.prev = prev;
    };
    /**
     *
     * @param next
     */
    Subject.prototype.setNext = function (next) {
        this.next = next;
    };
    /**
     *
     * @param id
     */
    Subject.prototype.getQuestionById = function (id) {
        for (var i = 0; i < this.questions.length; i++) {
            var q = this.questions[i];
            if (q.id == id) return q;
        }
        return null;
    };
    /**
     *
     */
    Subject.prototype.getLastQuestion = function () {
        if (this.questions.length > 0) {
            return this.questions[this.questions.length - 1];
        } else if (this.prev) {
            return this.prev.getLastQuestion();
        } else {
            return null;
        }
    };
    /**
     *
     */
    Subject.prototype.getLastQuestionIndex = function () {
        var last = this.getLastQuestion();
        if (last) {
            return last.index;
        } else {
            return -1;
        }
    };
    /**
     *
     * @param questionsData_
     */
    Subject.prototype.initQuestions = function (questionsData_) {
        var map = {};
        var NOID = 'NOID';
        var idArr = [NOID];
        var questionsData = [];
        for (var _i = 0; _i < questionsData_.length; _i++) {
            var item = questionsData_[_i];
            var questionstemId = item.questionstemId || NOID;
            if (idArr.indexOf(questionstemId) == -1) idArr.push(questionstemId);
            map[questionstemId] = map[questionstemId] || [];
            item.treeindex = map[questionstemId].length;
            item.paper_sub_seq = map[questionstemId].length;
            map[questionstemId].push(item);
        }
        for (var i = 0; i < idArr.length; i++) {
            questionsData.push.apply(questionsData, toConsumableArray(map[idArr[i]] || []));
        }
        for (var i = 0; i < questionsData.length; i++) {
            var question = new Question(this.pager, this, questionsData[i]);
            question.setSubIndex(this.index);
            question.setIndex(this.getLastQuestionIndex() + 1);
            var prev = this.getLastQuestion();
            question.setPrev(prev);
            if (prev) prev.setNext(question);
            question.setSubIndex(this.index);
            this.questions.push(question);
        }
        for (var ii = 0; ii < idArr.length; ii++) {
            var k = idArr[ii];
            var items = map[k] || [];
            if (items.length == 0) continue;
            if (k == NOID) {
                for (var i = 0; i < items.length; i++) {
                    this.questionstems.push(this.getQuestionById(items[i].questionId));
                }
            } else {
                var questionstem = new Questionstem(this.pager, this);
                var qsts = [];
                for (var i = 0; i < items.length; i++) {
                    var _question = this.getQuestionById(items[i].questionId);
                    _question.setQuestionstem(questionstem);
                    qsts.push(_question);
                }
                questionstem.setQuestions(qsts);
                questionstem.setSubIndex(this.index);
                questionstem.init();
                this.questionstems.push(questionstem);
            }
        }
    };

    /**
     * 试卷类
     *
     * @param paperId
     * @param answersheetId
     * @param _ref
     */
    function Paper(paperId, answersheetId, _ref) {
        var sourceType = _ref.sourceType;
        var classUniquecode = _ref.classUniquecode;

        this.info = null; //试卷详情
        this.sheetInfo = null; //答卷详情

        this.paperId = paperId; //试卷ID
        this.answersheetId = answersheetId; //答卷ID
        this.classId; //项目标识	String
        this.className; //项目名称
        this.subjectName; //科目名称
        this.name; //试卷名称
        this.memo; //试卷详细描述
        this.year; //试卷年份
        this.summary; //试卷摘要
        this.typeCode; //试卷类型编码
        this.createDate; //试卷创建时间
        this.needEstimate = false; //试卷是否需要估分
        this.participateAmount; //参与人数
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

        this.beforeAnswerSeq; //之前答题的序号
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
     * @param {object} info
1	className	项目名称	String
2	subjectName	科目名称	String
3	paperName	试卷名称	String
4	paperMemo	试卷详细描述	String
5	paperAuth	试卷权限	String	T:游客,M:会员,S:学员; 目前统一返回M会员
6	paperYear	试卷年份	String
7	paperSummary	试卷摘要	String
8	papertypeCode	试卷类型编码	String	MRYL:每日一练,ZJLX：章节练习,MNST：模拟试题,MKDS：模拟考试,YFSJ：阅焚试卷,ZZY：周作业,YK：月考,SCLX：收藏练习,SJLX：随机抽题/智能练习,CTB	：错题练习
9	paperScoretotal	试卷总分	Double
10	paperCreateddate	试卷创建时间	String
11	paperIsneedestimate	试卷是否需要估分	String	[枚举]Y:需要Yes;N:不需要
12	questionTotal	试题数量	Integer
13	examDuration	考试时间（分钟）	Integer
14	participateAmount	参与人数	Integer
15	paperLockstatus	试卷锁状态	String	试卷锁状态 (A:加锁 G:未锁 空值:未锁)
16	paperAvlstatus	试卷可用状态	String	试卷可用状态(Y:可用;N:不可用)
17	paperDelstatus	试卷删除状态	String	试卷删除状态(Y:已删除;N:未删除)
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
        this.state = {
            lock: null, //试卷锁状态
            avl: null, //试卷可用状态
            del: null, //试卷删除状态
        };
    };
    /**
     *
     * @param info
     */
    Paper.prototype.getInfo = function (info) {
        return this.info;
    };
    /**
     * @param {object} sheetInfo
1	paperId	试卷标识	String
2	classId	项目标识	String
3	answersheetId	答卷标识	String
4	answersheetStatus	答卷状态	String
5	answersheetDurationtime	答卷时长（秒）	Integer
6	answersheetEstimatestatus	答卷估分状态	String	Y:已估分；N:未估分;空值:未估分
7	beforeQuestionseq	之前答题的序号	Integer
8	papersubjectId	之前答题的主题标识	Integer
9	examBurndate	试卷焚毁时间	String
10	examDuration	考试时间（分钟）	Double
     */
    Paper.prototype.setSheetInfo = function (sheetInfo) {
        this.sheetInfo = sheetInfo;
        this.classId = sheetInfo.classId;
        this.time.duration = sheetInfo.answersheetDurationtime; //答卷时长(S)
        this.needEstimate = this.needEstimate && sheetInfo.answersheetEstimatestatus != 'Y'; //试卷是否需要估分
        // if(sheetInfo.papersubjectId){
        //     this.beforeAnswerSeq = (this.getSubjectById(sheetInfo.papersubjectId).getLastQuestionIndex() || 0) + sheetInfo.beforeQuestionseq ||
        //         0;
        // }
        if (sheetInfo.papersubjectId) {
            var subject = this.getSubjectById(sheetInfo.papersubjectId);
            this.beforeAnswerSeq = (subject ? subject.getLastQuestionIndex() : 0) + sheetInfo.beforeQuestionseq || 0;
        }
    };
    /**
     *
     * @param subjects
     */
    Paper.prototype.setSubjects = function (subjects) {
        for (var i = 0; i < subjects.length; i++) {
            var subject = new Subject(this, subjects[i]);
            subject.setIndex(i);
            var prev = i == 0 ? null : this.subjects[this.subjects.length - 1];
            if (prev) {
                subject.setPrev(prev);
                prev.setNext(subject);
            }
            this.subjects.push(subject);
        }
    };
    /**
     *
     */
    Paper.prototype.getSubjects = function () {
        return this.subjects;
    };
    /**
     *
     * @param id
     */
    Paper.prototype.getSubjectById = function (id) {
        for (var i = 0; i < this.subjects.length; i++) {
            var subject = this.subjects[i];
            if (subject.id == id) return subject;
        }
        return null;
    };
    /**
     *
     * @param id
     */
    Paper.prototype.getQuestionById = function (id) {
        for (var i = 0; i < this.questions.length; i++) {
            var question = this.questions[i];
            if (question.id == id) return question;
        }
        return null;
    };
    /**
     *
     */
    Paper.prototype.getQuestions = function () {
        if (!this.questions) {
            var questions = [];
            for (var i = 0; i < this.subjects.length; i++) {
                questions.push.apply(questions, toConsumableArray(this.subjects[i].questions));
            }
            this.questions = questions;
        }
        return this.questions;
    };
    /**
     * 保存做题记录
     *
     * @param callback
     */
    Paper.prototype.answerSaves = function (callback) {
        this.tjOrSaveAll('G', callback);
    };
    /**
     * 提交试卷
     *
     * @param callback
     */
    Paper.prototype.submit = function (callback) {
        this.tjOrSaveAll('A', callback);
    };
    /**
     *
     * @param answersheetStatus
     * @param callback
     */
    Paper.prototype.tjOrSaveAll = function (answersheetStatus, callback) {
        var vm = this;
        //[{"paperquestiondetailId":"1","answersheetdetailUseranswer":"A","papersubjectid":"papersubjectid","paperquestiondetailSeq":"paperquestiondetailSeq"}]
        var list = [];
        var questions = vm.getQuestions();
        for (var i = 0; i < questions.length; i++) {
            var item = questions[i];
            if (item.rightAnswer || StringUtil.isEmpty(item.answer)) continue;
            var ansMap = {
                paperquestiondetailId: item.detailId,
                answersheetdetailUseranswer: item.answer,
                papersubjectId: item.subject.id,
                paperquestiondetailSeq: item.data.paperquestiondetailSeq,
            };
            list.push(ansMap);
        }

        httpClient({
            api: 'qb/answersheet/saves',
            params: {
                userAnswers: list.length == 0 ? '' : list,
                answersheetId: vm.answersheetId,
                paperId: vm.paperId,
                answersheetStatus, //A:已完成;G:待继续
                answersheetDurationtime: vm.time.duration,
                classUniquecode: vm.classUniquecode,
                answersheetSourcetype: vm.sourceType,
            },
            /**
             *
             * @param data
             */
            onsuccess(data) {
                vm.answersheetId = data.answersheetId;
                if (callback) callback();
            },
            onerror: niceloo.api.handleFailure,
            oncomplete: () => {},
        });
    };
    /**
     * 试题估分保存
     *
     * @param callback
     */
    Paper.prototype.estimateSave = function (callback) {
        var vm = this;
        //[{"answersheetdetailId":"1","paperquestiondetailId":"2","papersubjectId":"3","answersheetdetailScore":"10"}]
        var list = [];
        var questions = vm.getQuestions();
        for (var i = 0; i < questions.length; i++) {
            var item = questions[i];
            if (item.type != 'O' && type != 'A') continue;
            // if(item.sheetdetailId==null)continue;
            var ansMap = {
                answersheetdetailId: item.sheetdetailId || '',
                paperquestiondetailId: item.detailId,
                papersubjectId: item.subject.id,
                answersheetdetailScore: item.score.estimate || 0,
            };
            list.push(ansMap);
        }

        httpClient({
            api: 'qb/answersheet/estimate/save',
            params: {
                paperId: vm.paperId,
                answersheetId: vm.answersheetId,
                estimateScores: list,
            },
            /**
             *
             * @param data
             */
            onsuccess(data) {
                if (callback) callback();
            },
            onerror: niceloo.api.handleFailure,
            oncomplete: () => {},
        });
    };

    /**
     *
     */
    function EventCall() {
        this.EventCallMap = {};
    }
    /**
     *
     * @param k
     * @param callback
     */
    EventCall.prototype.watch = function (k, callback) {
        this.EventCallMap[k] = this.EventCallMap[k] || [];
        this.EventCallMap[k].push(callback);
    };
    /**
     *
     * @param k
     */
    EventCall.prototype.call = function (k) {
        this.EventCallMap[k] = this.EventCallMap[k] || [];
        for (var i = 0; i < this.EventCallMap[k].length; i++) {
            var callback = this.EventCallMap[k][i];
            callback();
        }
    };
    var EventUtil = {
        /**
         *
         */
        getEventCall: function getEventCall() {
            return new EventCall();
        },
    };

    var ret$1 = {
        /**
         * @param {string} paperId
         * @param {string} answersheetId
         * @param {object} service 所有服务
         * @param {object} options
         * @param _ref
         */
        initPaper: function initPaper(_ref) {
            var paperId = _ref.paperId;
            var answersheetId = _ref.answersheetId;
            var service = _ref.service;
            var options = _ref.options;
            var sourceType = options.sourceType;

            var paper = new Paper(paperId, answersheetId, options);
            var events = {
                info: 'info',
                loadQuestions: 'loadQuestions',
                sheetInfo: 'sheetInfo',
                loadParse: 'loadParse',
                loadCollectState: 'loadCollectState',
            };
            var pagerEvent = EventUtil.getEventCall();

            var ps = [];
            var psResolves = [];
            /**
             *
             */
            var Error2AllResolve = function Error2AllResolve() {
                for (var i = 0; i < psResolves.length; i++) {
                    var ResolveMap = psResolves[i];
                    if (!ResolveMap.doon) ResolveMap.resolve();
                }
            };
            /**
             *
             * @param callback
             */
            var addPromiss = function addPromiss(callback) {
                callback = callback || function () {};
                var ResolveMap = {
                    doon: false,
                    callback,
                    resolve: null,
                    reject: null,
                };
                ps.push(
                    new Promise(function (resolve, reject) {
                        ResolveMap.resolve = resolve;
                        ResolveMap.reject = reject;
                    })
                );
                psResolves.push(ResolveMap);
                return {
                    /**
                     *
                     */
                    resolve: function resolve() {
                        ResolveMap.doon = true;
                        ResolveMap.callback();
                        ResolveMap.resolve();
                    },
                    /**
                     *
                     * @param data
                     * @param msg
                     */
                    fail: function fail(data, msg) {
                        console.error(data);
                        ResolveMap.doon = true;
                        ResolveMap.reject({ msg });
                        Error2AllResolve();
                    },
                    /**
                     *
                     * @param data
                     * @param msg
                     */
                    error: function error(data, msg) {
                        console.error(data);
                        ResolveMap.doon = true;
                        ResolveMap.reject({ msg });
                        Error2AllResolve();
                    },
                };
            };

            var ret = {
                /**
                 *
                 * @param resolve
                 */
                end: function end(resolve) {
                    return Promise.all(ps).then(function () {
                        if (resolve) resolve();
                    });
                },

                /**
                 * 加载试卷基础信息
                 *
                 * @param callback
                 */
                loadBaseInfo: function loadBaseInfo(callback) {
                    // var vm = this;

                    var _addPromiss = addPromiss(callback);
                    var resolve = _addPromiss.resolve;
                    /*var fail = _addPromiss.fail;*/
                    var error = _addPromiss.error;

                    httpClient({
                        api: 'qb/paper/profile/info',
                        params: {
                            paperId: paper.paperId,
                        },
                        /**
                         *
                         * @param paperInfo
                         */
                        onsuccess(paperInfo) {
                            window.$nuxt.$baseUI.loading().close();
                            paper.setInfo(paperInfo);
                            pagerEvent.call(events.info);
                            if (resolve) resolve();
                        },
                        onerror: error,
                        oncomplete: () => {},
                    });
                    return ret;
                },

                /**
                 * 检查用户答题次数
                 *
                 * @param callback
                 */
                loadStateAInfo: function loadStateAInfo(callback) {
                    var vm = this;

                    var _addPromiss2 = addPromiss(callback);
                    var resolve = _addPromiss2.resolve;
                    /*var fail = _addPromiss2.fail;*/
                    var error = _addPromiss2.error;

                    httpClient({
                        api: 'qb/paper/status/check',
                        params: {
                            paperId: paper.paperId,
                            sourceType,
                            action: 'A', //[枚举]G:继续考试;S:开始考试;O:启封;V:查看解析;A:检查用户答题次数
                        },
                        /**
                         *
                         * @param data
                         */
                        onsuccess(data) {
                            paper.stateCheck = {
                                action: 'A',
                                isTrue: data.status == 'S', //[枚举]S:正常;F:异常
                                msg: data.memo,
                            };
                            pagerEvent.call(events.info);
                            if (resolve) resolve();
                        },
                        onerror: error,
                        oncomplete: () => {},
                    });
                    return ret;
                },

                /**
                 * 加载大题下的小题
                 *
                 * @param callback
                 */
                loadSubQuestions: function loadSubQuestions(callback) {
                    var subjects = paper.getSubjects();

                    var _addPromiss3 = addPromiss(callback);
                    var resolve = _addPromiss3.resolve;
                    // var fail = _addPromiss3.fail;
                    // var error = _addPromiss3.error;

                    if (subjects.length == 0) {
                        if (resolve) resolve();
                        return ret;
                    }
                    Promise.all(
                        subjects.map((item) => {
                            return new Promise(function (resolve) {
                                httpClient({
                                    api: 'qb/paperquestiondetail/question/list',
                                    params: {
                                        paperId: paper.paperId,
                                        papersubjectId: item.id,
                                        sourceType,
                                        classUniquecode: paper.info.classUniquecode,
                                    },
                                    /**
                                     *
                                     * @param data
                                     */
                                    onsuccess(data) {
                                        resolve(data);
                                    },
                                });
                            });
                        })
                    ).then((list) => {
                        formatData(list);
                    });

                    /**
                     *
                     * @param more
                     */
                    function formatData(more) {
                        for (var _i2 = 0; _i2 < more.length; _i2++) {
                            var data = more[_i2].data || [];
                            paper.getSubjectById(subjects[_i2].id).initQuestions(data);
                        }
                        if (resolve) resolve();
                    }
                    return ret;
                },

                /**
                 * 获取试卷题目类型
                 *
                 * @param callback
                 */
                loadSubjects: function loadSubjects(callback) {
                    var _addPromiss4 = addPromiss(callback);
                    var resolve = _addPromiss4.resolve;
                    /*var fail = _addPromiss4.fail;*/
                    var error = _addPromiss4.error;
                    httpClient({
                        api: 'qb/papersubject/profile/list',
                        params: {
                            paperId: paper.paperId,
                        },
                        /**
                         *
                         * @param papersubjects
                         */
                        onsuccess(papersubjects) {
                            paper.setSubjects(papersubjects.data);
                            if (resolve) resolve();
                        },
                        onerror: error,
                        oncomplete: () => {},
                    });
                    return ret;
                },

                /**
                 * 获取试卷的所有试题
                 *
                 * @param callback
                 */
                loadQuestions: function loadQuestions(callback) {
                    var _addPromiss5 = addPromiss(callback);
                    var resolve = _addPromiss5.resolve;
                    var fail = _addPromiss5.fail;
                    var error = _addPromiss5.error;

                    pagerEvent.watch(events.info, function () {
                        ret.loadSubjects(function () {
                            ret.loadSubQuestions(function () {
                                pagerEvent.call(events.loadQuestions);
                                if (resolve) resolve();
                            });
                        });
                    });
                    return ret;
                },

                /**
                 * 获取答卷信息
                 *
                 * @param callback
                 */
                loadSheetInfo: function loadSheetInfo(callback) {
                    var _addPromiss6 = addPromiss(callback);
                    var resolve = _addPromiss6.resolve;
                    var fail = _addPromiss6.fail;
                    var error = _addPromiss6.error;

                    pagerEvent.watch(events.loadQuestions, function () {
                        console.log('调用@@@@@@@@@@@@');
                        httpClient({
                            api: 'qb/paper/answersheet/info',
                            params: {
                                paperId: paper.paperId,
                                answersheetId: paper.answersheetId,
                            },
                            /**
                             *
                             * @param paperInfo
                             */
                            onsuccess(paperInfo) {
                                paper.setSheetInfo(paperInfo);
                                console.log(service);
                                console.log(service.CallBack);
                                /*service.CallBack.call(events.sheetInfo);*/
                                if (resolve) resolve();
                            },
                            onerror: error,
                            oncomplete: () => {},
                        });
                    });
                    return ret;
                },

                /**
                 * 加载解析数据
                 * data[n].questionId    题目标识    String
                 * data[n].questionAnswer    题目答案    String
                 * data[n].questionAnswerparse    题目答案解析
                 *
                 * @param callback
                 */
                loadParse: function loadParse(callback) {
                    var _addPromiss7 = addPromiss(callback);
                    var resolve = _addPromiss7.resolve;
                    var fail = _addPromiss7.fail;
                    var error = _addPromiss7.error;

                    pagerEvent.watch(events.loadQuestions, function () {
                        let arr = [];
                        for (let i = 0; i < paper.getQuestions().length; i++) {
                            arr.push(paper.getQuestions()[i].id);
                        }
                        httpClient({
                            api: 'qb/question/profile/parselist',
                            params: {
                                questionIds: arr.join(),
                            },
                            /**
                             *
                             * @param data
                             */
                            onsuccess(data) {
                                data = data.data || [];
                                for (var i = 0; i < data.length; i++) {
                                    var d = data[i];
                                    var question = paper.getQuestionById(d.questionId);
                                    question.setRightAnswer(d.questionAnswer);
                                    question.setAnswerParse(d.questionAnswerparse);
                                    question.setAnswerApath(d.questionApath);
                                    question.setAnswerVpath(d.questionVpath);
                                }
                                /*service.CallBack.call(events.loadParse);*/
                                if (resolve) resolve();
                            },
                            onerror: error,
                            oncomplete: () => {},
                        });
                    });
                    return ret;
                },

                /**
                 * 加载所有试题收藏状态
                 *
                 * @param callback
                 */
                loadCollectState: function loadCollectState(callback) {
                    var _addPromiss8 = addPromiss(callback);
                    var resolve = _addPromiss8.resolve;
                    var fail = _addPromiss8.fail;
                    var error = _addPromiss8.error;

                    pagerEvent.watch(events.loadQuestions, function () {
                        let arr = [];
                        for (let i = 0; i < paper.getQuestions().length; i++) {
                            arr.push(paper.getQuestions()[i].id);
                        }
                        httpClient({
                            api: 'qb/collect/status/batchquery',
                            params: {
                                collectContenttype: 'Q',
                                collectContents: arr.join(),
                                sourceType,
                                classUniquecode,
                            },
                            /**
                             *
                             * @param data
                             */
                            onsuccess(data) {
                                data = data.data;
                                for (var i = 0; i < data.length; i++) {
                                    var item_ = data[i];
                                    var id = item_.collectContent;
                                    var question = paper.getQuestionById(id);
                                    question.collectStatus = item_.collectStatus == 'Y';
                                    question.collectId = item_.collectId;
                                }
                                if (resolve) resolve();
                            },
                            onerror: error,
                            oncomplete: () => {},
                        });
                    });
                    return ret;
                },

                /**
                 * 加载试卷做题记录
                 *
                 * @param callback
                 */
                loadAnswerRecord: function loadAnswerRecord(callback) {
                    var _addPromiss9 = addPromiss(callback);
                    var resolve = _addPromiss9.resolve;
                    var fail = _addPromiss9.fail;
                    var error = _addPromiss9.error;

                    pagerEvent.watch(events.loadQuestions, function () {
                        httpClient({
                            api: 'qb/answersheet/brief',
                            params: {
                                answersheetId: paper.answersheetId,
                            },
                            /**
                             *
                             * @param data
                             */
                            onsuccess(data) {
                                var subjectquestions = data.data;
                                for (var i = 0; i < subjectquestions.length; i++) {
                                    var sq = subjectquestions[i];
                                    var qus = sq.questionList;
                                    for (var j = 0; j < qus.length; j++) {
                                        var ite = qus[j];
                                        var qu = paper.getQuestionById(ite.questionId);
                                        if (!qu) continue;
                                        switch (ite.answersheetdetailDecidestatus) {
                                            case 'Y':
                                                qu.answerState = 2;
                                                break;
                                            case 'N':
                                                qu.answerState = 3;
                                                break;
                                            default:
                                                qu.answerState = 0;
                                                break;
                                        }
                                        qu.setAnswer(ite.answersheetdetailUseranswer);
                                        qu.sheetdetailId = ite.answersheetdetailId;
                                    }
                                }
                                if (resolve) resolve();
                            },
                            onerror: error,
                            oncomplete: () => {},
                        });
                    });
                    return ret;
                },

                /**
                 * 加载成绩信息
                 *
                 * @param callback
                 */
                getTranscript: function getTranscript(callback) {
                    var _addPromiss10 = addPromiss(callback);
                    var resolve = _addPromiss10.resolve;
                    var fail = _addPromiss10.fail;
                    var error = _addPromiss10.error;

                    pagerEvent.watch(events.loadQuestions, function () {
                        httpClient({
                            api: 'qb/answersheet/common/transcript',
                            params: {
                                answersheetId: paper.answersheetId,
                            },
                            /**
                             *
                             * @param data
                             */
                            onsuccess(data) {
                                paper.durationtime = data.answersheetDurationtime;
                                paper.answerScore = data.answersheetTotal;

                                var uasList = data.uasList;
                                var kgScore = 0; //客观题得分
                                var zgScore = 0; //主观题得分
                                var allScore = 0; //主观题得分
                                for (var i = 0; i < uasList.length; i++) {
                                    var item = uasList[i];
                                    var papersubject = paper.getSubjectById(item.papersubjectId);
                                    if (!papersubject) continue;
                                    papersubject.answerTotal = item.uasQuestiontotal;
                                    papersubject.answerRightTotal = item.uasRightquestiontotal;
                                    papersubject.answerRightRate = item.uasRightrate;
                                    papersubject.score = {
                                        total: item.uasQuestionscore, //总分
                                        answer: item.uasAnswerscore, //答题得分

                                        // if (["S", "J", "M"].indexOf(item.uasQuestiontype) > -1) {
                                        //     kgScore += item.uasAnswerscore;
                                        // } else {
                                        //     zgScore += item.uasAnswerscore;
                                        // }
                                        // allScore += item.uasAnswerscore;
                                    };
                                    kgScore += item.uasObjanswerscore;
                                    allScore += item.uasAnswerscore;
                                }
                                paper.score.answer = allScore;
                                paper.score.kgAnswer = kgScore;
                                paper.score.zgAnswer = zgScore;
                                if (resolve) resolve();
                            },
                            onerror: error,
                            oncomplete: () => {},
                        });
                    });
                    return ret;
                },

                /**
                 * 加载成绩信息
                 *
                 * @param callback
                 */
                getPapersTranscript: function getPapersTranscript(callback) {
                    var _addPromiss11 = addPromiss(callback);
                    var resolve = _addPromiss11.resolve;
                    var fail = _addPromiss11.fail;
                    var error = _addPromiss11.error;

                    pagerEvent.watch(events.loadQuestions, function () {
                        httpClient({
                            api: 'qb/answersheet/papers/transcript',
                            params: {
                                paperIds: paper.paperId,
                                sourceType: 'YOULU',
                            },
                            /**
                             *
                             * @param data
                             */
                            onsuccess(data) {
                                paper.durationtime = data.answersheetDurationtime;
                                paper.rankingpassRate = data.rankingpassRate;
                                paper.rightquestionTotal = data.rightquestionTotal;
                                if (resolve) resolve();
                            },
                            onerror: error,
                            oncomplete: () => {},
                        });
                    });
                    return ret;
                },

                /**
                 * 获取paper对象
                 */
                getInstance: function getInstance() {
                    return paper;
                },
            };
            return ret;
        },
    };

    return ret$1;
});
//# sourceMappingURL=PaperClass.js.map
