export const state = () => ({
    showType: 'class', // 当前班级显示内容，class: 班级全部内容，practice: 仅显示练习试卷
    classId: '', // 班级ID
    className: '', // 班级名称
    ctapId: '', // 班级期次
    classTypeId: '', // 班型ID
    projectId: '', // 项目ID
    projectName: '', // 项目名称
    pypId: '', // 考期
    electiveShowStatus: '', // 是否隐藏选修课
    ucsCompulsoryRate: '0%', // 必修课听课率
    showStatus: 0, // 显示状态，0：全部，1：未学完，2：已学完
    show_module_proposal: false, // 是否展示模块建议，false 不展示，true 展示

    ruralPlanner: false, // 默认优路课程不做跳转

    theTimeProblem: {}, // 专项小题库做题页本次做题，最后一次的答题数据
});

export const mutations = {
    // 设置班型 项目 考期 班级ID，班级期次
    setClassInfo(state, obj) {
        Object.keys(obj).forEach((k) => {
            state[k] = obj[k];
        });
    },
    // 设置专项小题库做题页本次做题，最后一次的答题数据
    setTimeProblem(state, obj) {
        if (obj) {
            state.theTimeProblem = obj;
        }
    },
    // 重置专项小题库做题页本次做题的数据
    clearTimeProblem(state) {
        state.theTimeProblem = {};
    },
};
