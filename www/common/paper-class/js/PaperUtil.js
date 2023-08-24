import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import Paper from './Paper.js';
import EventUtil from './EventUtil.js';
import '@/api/qb/api.QB0005.query-paper-profile-info.js';
import '@/api/qb/api.QB0016.query-paper-status-check.js';
import '@/api/qb/api.QB0006.query-paper-question-type-list.js';
import '@/api/qb/api.QB0019.query-answersheet-detail.js';
import '@/api/qb/api.QB9001.query-question-profile-list.js';
/*import '@/api/qb/api.QB2004.query-answersheet-record2.js';*/
import '@/api/qb/api.QB1007.query-answersheet-common-transcript.js';
import '@/api/qb/api.QB1008.query-answersheet-papers-transcript.js';
import '@/api/qb/api.QB6007.batch-query-collect-status.js';
const mask = function () {
    return window.$nuxt.$baseUI.loading();
};
const ret = {
    initPaper({ paperId, answersheetId, service, options }) {
        let { sourceType } = options;
        let paper = new Paper(paperId, answersheetId, options);
        let events = {
            info: 'info',
            loadQuestions: 'loadQuestions',
            sheetInfo: 'sheetInfo',
            loadParse: 'loadParse',
            loadCollectState: 'loadCollectState',
        };
        let pagerEvent = EventUtil.getEventCall();
        let ps = [];
        let addPromiss = function (callback) {
            let resolve_ = null;
            ps.push(
                new Promise((resolve, reject) => {
                    resolve_ = resolve;
                })
            );
            return function () {
                callback();
                resolve_();
            };
        };

        let ret = {
            end(resolve) {
                Promise.all(ps)
                    .then(() => {
                        if (resolve) resolve();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            //加载试卷基础信息
            loadBaseInfo(callback) {
                let resolve = addPromiss(callback);
                ///qb/paper/profile/info
                niceloo.api.call('qb/query-paper-profile-info', {
                    paperId: paper.paperId,
                    onsuccess: (res) => {
                        mask().close();
                        /*Mask.hideLoading();*/
                        paper.setInfo(res);
                        pagerEvent.call(events.info);
                        if (resolve) resolve();
                    },
                    onerror: () => {
                        this.$baseUI.confirm({
                            title: '温馨提示',
                            content: '页面加载失败，是否重新加载？',
                            showCancel: true,
                            cancelText: '取消',
                            confirmText: '重试',
                            confirm() {
                                this.loadBaseInfo(callback);
                            },
                            cancel() {
                                mask().close();
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
                return ret;
            },
            //检查用户答题次数
            loadStateAInfo(callback) {
                let resolve = addPromiss(callback);
                niceloo.api.call('qb/query-paper-status-check', {
                    paperId: paper.paperId,
                    sourceType,
                    action: 'A', //[枚举]G:继续考试;S:开始考试;O:启封;V:查看解析;A:检查用户答题次数
                    onsuccess: (data) => {
                        paper.stateCheck = {
                            action: 'A',
                            isTrue: data.status == 'S', //[枚举]S:正常;F:异常
                            msg: data.memo,
                        };
                        pagerEvent.call(events.info);
                        if (resolve) resolve();
                    },
                    onerror: niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
                return ret;
            },
            //加载大题下的小题
            loadSubQuestions(resolve) {
                let subjects = paper.getSubjects();

                if (subjects.length == 0) {
                    if (resolve) resolve();
                    return ret;
                }

                Promise.all(
                    subjects.map((item) => {
                        return new Promise((resolve) => {
                            niceloo.api.callRaw({
                                api: 'qb/paperquestiondetail/question/list',
                                params: {
                                    paperId: paper.paperId,
                                    papersubjectId: item.id,
                                    sourceType,
                                    classUniquecode: paper.info.classUniquecode,
                                },
                                onsuccess(data) {
                                    resolve(data);
                                },
                                onerror: niceloo.api.handleFailure,
                                oncomplete: () => {},
                            });
                        });
                    })
                )
                    .then((values) => {
                        for (let i = 0; i < values.length; i++) {
                            let data = values[i].data || [];
                            paper.getSubjectById(subjects[i].id).initQuestions(data);
                        }
                        if (resolve) resolve();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                return ret;
            },
            //获取试卷题目类型
            loadSubjects(resolve) {
                ///qb/papersubject/profile/list
                niceloo.api.call('qb/query-paper-question-type-list', {
                    paperId: paper.paperId,
                    onsuccess: (papersubjects) => {
                        paper.setSubjects(papersubjects.list);
                        if (resolve) resolve();
                    },
                    onerror: niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
                return ret;
            },
            //获取试卷的所有试题
            loadQuestions(callback) {
                let resolve = addPromiss(callback);
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
            //获取答卷信息
            loadSheetInfo(callback) {
                let resolve = addPromiss(callback);
                pagerEvent.watch(events.loadQuestions, function () {
                    //qb/paper/answersheet/info
                    niceloo.api.call('qb/query-answersheet-detail', {
                        paperId: paper.paperId,
                        answersheetId: paper.answersheetId,
                        onsuccess: (paperInfo) => {
                            paper.setSheetInfo(paperInfo);
                            /*service.CallBack.call(events.sheetInfo);*/
                            if (resolve) resolve();
                        },
                        onerror: niceloo.api.handleFailure,
                        oncomplete: () => {},
                    });
                });
                return ret;
            },
            //加载解析数据
            loadParse(callback) {
                let resolve = addPromiss(callback);
                pagerEvent.watch(events.loadQuestions, function () {
                    ///qb/question/profile/list
                    niceloo.api.call('qb/query-question-profile-list', {
                        // 题目标识，多个以逗号隔开
                        ids: ListUtil.toArray(paper.getQuestions(), 'id').join(),
                        onsuccess: (data) => {
                            for (let i = 0; i < data.length; i++) {
                                let d = data[i];
                                let question = paper.getQuestionById(d.questionId); //题目标识
                                question.setRightAnswer(d.questionAnswer); //题目答案
                                question.setAnswerParse(d.questionAnswerparse); //题目答案解析
                                question.setAnswerApath(d.questionApath);
                                question.setAnswerVpath(d.questionVpath);
                            }
                            /*service.CallBack.call(events.loadParse);*/
                            if (resolve) resolve();
                        },
                        onerror: niceloo.api.handleFailure,
                        oncomplete: () => {},
                    });
                });
                return ret;
            },
            //加载所有试题收藏状态
            loadCollectState(callback) {
                let resolve = addPromiss(callback);
                pagerEvent.watch(events.loadQuestions, function () {
                    ///qb/collect/status/batchquery
                    niceloo.api.call('qb/batch-query-collect-status', {
                        collectContenttype: 'Q',
                        collectContents: ListUtil.toArray(paper.getQuestions(), 'id').join(),
                        sourceType,
                        classUniquecode,
                        onsuccess: (data) => {
                            data = data.list;
                            for (let i = 0; i < data.length; i++) {
                                let item_ = data[i];
                                let id = item_.collectContent;
                                let question = paper.getQuestionById(id);
                                question.collectStatus = item_.collectStatus == 'Y';
                                question.collectId = item_.collectId;
                            }
                            if (resolve) resolve();
                        },
                        onerror: niceloo.api.handleFailure,
                        oncomplete: () => {},
                    });
                });
                return ret;
            },
            //加载试卷做题记录
            loadAnswerRecord(callback) {
                let resolve = addPromiss(callback);
                pagerEvent.watch(events.loadQuestions, function () {
                    ///qb/answersheet/brief
                    niceloo.api.callRaw({
                        api: 'qb/answersheet/brief',
                        params: {
                            answersheetId: paper.answersheetId,
                        },
                        onsuccess: (data) => {
                            console.log('数组', data);
                            var subjectquestions = data.data;
                            console.log('数组', subjectquestions);
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
                        onerror: niceloo.api.handleFailure,
                        oncomplete: () => {},
                    });
                });
                return ret;
            },
            //加载成绩信息
            getTranscript(callback) {
                let resolve = addPromiss(callback);
                pagerEvent.watch(events.loadQuestions, function () {
                    ///qb/answersheet/common/transcript
                    niceloo.api.call('qb/query-answersheet-common-transcript', {
                        answersheetId: paper.answersheetId,
                        onsuccess: (data) => {
                            paper.durationtime = data.answersheetDurationtime;
                            paper.answerScore = data.answersheetTotal;
                            let uasList = data.uasList;
                            let kgScore = 0; //客观题得分
                            let zgScore = 0; //主观题得分
                            let allScore = 0; //主观题得分
                            for (let i = 0; i < uasList.length; i++) {
                                let item = uasList[i];
                                let papersubject = paper.getSubjectById(item.papersubjectId);
                                if (!papersubject) continue;
                                papersubject.answerTotal = item.uasQuestiontotal;
                                papersubject.answerRightTotal = item.uasRightquestiontotal;
                                papersubject.answerRightRate = item.uasRightrate;
                                papersubject.score = {
                                    total: item.uasQuestionscore, //总分
                                    answer: item.uasAnswerscore, //答题得分
                                };
                                if (['S', 'J', 'M'].indexOf(item.uasQuestiontype) > -1) {
                                    kgScore += item.uasAnswerscore;
                                } else {
                                    zgScore += item.uasAnswerscore;
                                }
                                allScore += item.uasAnswerscore;
                            }
                            paper.score.answer = allScore;
                            paper.score.kgAnswer = kgScore;
                            paper.score.zgAnswer = zgScore;
                            if (resolve) resolve();
                        },
                        onerror: niceloo.api.handleFailure,
                        oncomplete: () => {},
                    });
                });
                return ret;
            },
            //加载成绩信息
            getPapersTranscript(callback) {
                let resolve = addPromiss(callback);
                pagerEvent.watch(events.loadQuestions, function () {
                    ///qb/answersheet/papers/transcript
                    niceloo.api.call('qb/query-answersheet-papers-transcript', {
                        paperIds: paper.paperId,
                        sourceType: 'YOULU',
                        onsuccess: (data) => {
                            paper.durationtime = data.answersheetDurationtime;
                            paper.rankingpassRate = data.rankingpassRate;
                            paper.rightquestionTotal = data.rightquestionTotal;
                            if (resolve) resolve();
                        },
                        onerror: niceloo.api.handleFailure,
                        oncomplete: () => {},
                    });
                });
                return ret;
            },
            //获取paper对象
            getInstance() {
                return paper;
            },
        };
        return ret;
    },
};
export default ret;
