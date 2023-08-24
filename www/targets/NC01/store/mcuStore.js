export const state = () => ({
    projectId: '', // 项目ID
    projectName: '', // 项目名称
    pageName: '', // 页面名称
    remark: '', // 备注
    clueWaycode: 'yindao',
    liveCalendarUpdate: false, // 直播日历是否更新
    liveUpdate: false, // 首页视频播放上课提醒
});

export const mutations = {
    setLiveCalendar(state, value) {
        state.liveCalendarUpdate = value;
    },
    setProjectId(state, value) {
        state.projectId = value;
    },
    setProjectName(state, value) {
        state.projectName = value;
    },
    setPageName(state, value) {
        state.pageName = value;
    },
    setRemark(state, value) {
        state.remark = value;
    },
    setWaycode(state, value) {
        state.clueWaycode = value;
    },
    setLiveUpdate(state, value) {
        state.liveUpdate = value;
    },
};
