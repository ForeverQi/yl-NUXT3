export const state = () => ({
    liveCourse: null,
    projectSeoCode: '',
    projectCode: '',
});

export const mutations = {
    setliveCourse(state, value) {
        // console.log('更新状态');
        // console.log(value);
        state.liveCourse = value;
    },
    setAppointmentStatus(state, value) {
        // console.log('更新状态');
        // console.log(value);
        state.liveCourse.appointmentStatus = value;
    },
    //公开课设置projectSeoCode
    setProjectSeoCode(state, value) {
        state.projectSeoCode = value;
    },
    setProjectCode(state, value) {
        state.projectCode = value;
    },
};
