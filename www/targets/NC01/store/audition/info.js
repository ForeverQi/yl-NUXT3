export const state = () => ({
    classtypeId: '',

    coverimgurl: '', // 封面图
    courseName: '', // 课程名称

    selectModuleId: '', // 当前选择的模块
    playModuleId: '', // 当前播放模块
    playModuleName: '', // 当前播放模块名称

    coursewareId: '',
    coursewareName: '',
    coursewareOnlineurl: '',
    coursewareType: '',

    isLogin: false, // 是否已登录
    userName: '', // 用户优路号
    userAvatar: '',

    showBuyDialog: false, // 显示购买弹窗

    division: 2, // 1: 目录

    mainWidth: 0, // 主屏幕显示宽度
    mainHeight: 0, // 主屏幕显示高度

    isLoading: true, // 是否在加载
    undercarriage: false, // 是否下架

    projectId: '', // 项目ID

    prev: 0, // 上一节
    next: 0, // 下一节
    fistCourseId: '',
    lastCourseId: '',

    moduleList: [],
    isPlaying: false,

    ifShowPlayer: false,

    resumeStatus: 0, // 继续播放状态
    pauseStatus: 0, // 暂停播放状态
});

export const mutations = {
    /**
     *
     * @param {object} state vuex对象
     * @param {object} obj 存储数据
     */
    setCourseInfo(state, obj) {
        Object.keys(obj).forEach((k) => {
            if (['moduleList'].includes(k)) {
                return;
            }
            state[k] = obj[k];
        });
    },
    /**
     *
     * @param {object} state vuex对象
     * @param {Array} moduleList 模块列表
     */
    setModuleList(state, moduleList) {
        state.moduleList = moduleList;
    },
    /**
     *
     * @param {object} state vuex对象
     * @param {string} classtypeId 课程ID
     */
    setClasstypeId(state, classtypeId) {
        state.classtypeId = classtypeId;
    },

    /**
     *
     * @param {object} state vuex对象
     */
    doPrev(state) {
        state.prev += 1;
    },
    /**
     *
     * @param {object} state vuex对象
     */
    doNext(state) {
        state.next += 1;
    },
    /**
     * 继续播放
     *
     * @param {object} state vuex对象
     */
    doVideoResume(state) {
        state.resumeStatus += 1;
    },
    /**
     * 暂停播放
     *
     * @param {object} state vuex对象
     */
    doVideoPause(state) {
        state.pauseStatus += 1;
    },
};
