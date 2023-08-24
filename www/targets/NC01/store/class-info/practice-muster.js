import functions from '@/plugins/common/utils/util.js';
export const state = () => {
    return {
        // 科目相关
        subjectList: [],

        // 模块课程map
        moduleMap: {},
        // 课程map
        courseMap: {},
        // 篇章列表
        chapterMap: {},
    };
};

export const mutations = {
    // 初始化科目列表
    setSubjectList(state, list) {
        const params = functions.getQueryString() ?? {};
        state.subjectList = list.map((r, index) => {
            r.studyStatus = '';
            // 专项小题库的课内测试页，需要通过url的subjectId来选中对应的科目
            if (params.questionBankStatus === 'special') {
                if (params.baseSubjectId === r.subjectId) {
                    r.studyStatus = 'Y';
                }
            }
            if (index === 0 && params.questionBankStatus !== 'special') {
                r.studyStatus = 'Y';
            }
            return r;
        });
    },
    // 设置科目列表
    changeSubjectList(state, list) {
        state.subjectList = list;
    },
    setCourseTree(state, { list = [], moduleId = '' }) {
        let courseList = [];
        list.forEach((r, i1) => {
            let studyStatus1 = 'N';
            if (i1 === 0) {
                studyStatus1 = 'Y';
            }
            courseList.push({
                courseName: r.courseName,
                courseId: r.courseId,
                courseElectiveStatus: r.courseElectiveStatus,
                catalogShowStatus: r.catalogShowStatus,
                moduleId,
                studyStatus: studyStatus1,
            });
            let chapterList = [];
            r.catalogInfos.forEach((r2, i2) => {
                let studyStatus2 = 'N';
                if (i2 === 0) {
                    studyStatus2 = 'Y';
                }
                chapterList.push({
                    catalogId: r2.catalogId,
                    catalogName: r2.catalogName,
                    courseId: r.courseId,
                    catalogElectiveStatus: r2.catalogElectiveStatus,
                    catalogShowStatus: r.catalogShowStatus,
                    studyStatus: studyStatus2,
                    moduleId,
                });

                let coursewareList = [];
                r2.coursewareInfos.forEach((r3, i3) => {
                    // let studyStatus3 = 'N';
                    // if (i3 === 0) {
                    //     studyStatus3 = 'Y';
                    // }
                    coursewareList.push({
                        ...r3,
                        coursewareType: 'P',
                        moduleId,
                        courseId: r.courseId,
                        catalogId: r2.catalogId,
                        // studyStatus: studyStatus3,
                        coursewarePaper: {
                            questionTotal: r3.questionTotal,
                            answerQuestionTotal: r3.answerQuestionTotal,
                            answerStyle: r3.answerStyle,
                        },
                    });
                });
                state.chapterMap[`${moduleId}${r.courseId}${r2.catalogId}`] = coursewareList;
            });
            state.courseMap[`${moduleId}${r.courseId}`] = chapterList;
        });
        state.moduleMap[moduleId] = courseList;
    },
};

export const actions = {
    getCourse({ state, dispatch }, { moduleId = '', showType = 0 }) {
        return new Promise((resolve) => {
            let list = state.moduleMap[moduleId];
            if (!Array.isArray(list)) {
                list = [];
            }
            let check = false;
            return Promise.all(
                list.map((rs) => {
                    return dispatch('getChapter', { moduleId, courseId: rs.courseId, showType }).then((ret) => {
                        if (ret.length > 0) {
                            check = true;
                        }
                    });
                })
            ).then(() => {
                console.log('@@@@#', showType, '====');
                if (check === false) {
                    return resolve([]);
                } else {
                    return resolve(list);
                }
            });
        });
    },
    getChapter({ state, dispatch }, { moduleId = '', courseId = '', showType = 0 }) {
        return new Promise((resolve) => {
            let list = state.courseMap[`${moduleId}${courseId}`];
            let check = false;
            if (!Array.isArray(list)) {
                list = [];
            }
            return Promise.all(
                list.map((rs) => {
                    return dispatch('getCourseware', { moduleId, courseId, catalogId: rs.catalogId, showType }).then((ret) => {
                        if (ret.length > 0) {
                            check = true;
                        }
                    });
                })
            ).then(() => {
                if (check === false) {
                    return resolve([]);
                } else {
                    return resolve(list);
                }
            });
        });
    },
    getCourseware({ state }, { moduleId = '', courseId = '', catalogId = '', showType = 0 }) {
        let list = state.chapterMap[`${moduleId}${courseId}${catalogId}`];
        if (!Array.isArray(list)) {
            list = [];
        }
        if (showType === 1) {
            // 未学完
            list = list.filter((r) => r.studyStatus !== 'Y');
        } else if (showType === 2) {
            // 已学完
            list = list.filter((r) => r.studyStatus === 'Y');
        }
        return list;
    },
};
