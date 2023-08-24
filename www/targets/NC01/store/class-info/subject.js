export const state = () => ({
    // 当前选中科目
    currentSubject: {
        studyStatus: '', // 上次学习的科目
        subjectId: '', // 科目ID
        subjectName: '', // 科目名称
        subjectSeq: 0, // 位置
    },
    currentSubjectId: '', // 当前科目ID
});

export const mutations = {
    // 设置当前显示科目
    setCurrentSubject(state, obj) {
        state.currentSubject.studyStatus = obj.studyStatus;
        state.currentSubject.subjectId = obj.subjectId;
        state.currentSubject.subjectName = obj.subjectName;
        state.currentSubject.subjectSeq = obj.subjectSeq;
        state.currentSubjectId = obj.subjectId;
    },
};
