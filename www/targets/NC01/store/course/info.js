export const state = () => ({
    moduleName: '', // 模块ID
    courseName: '', // 课程名称
    catalogName: '', // 篇章名称
    catalogId: '', // 篇章ID

    coursewareId: '', // 课程ID
    coursewareName: '', // 课程名称
    classId: '', // 班级ID
    ctapId: '', // 期次
    subjectId: '', // 科目ID
    source: '', // 来源
    vid: '', // 课件ID
    courseId: '', // 课程ID
    projectId: '', // 项目ID
    coursewareHandoutOnlineUrl: '', // 课件对应的讲义地址
    catalogShowStatus: 'Y', // 是否隐藏篇章 Y: 显示，N: 隐藏
    studyDuration: 0, // 已学习时长
    electiveShowStatus: 'Y', // 是否隐藏选修课 Y: 显示，N：隐藏

    fistCourseId: '', // 播放目录第一个视频课件
    lastCourseId: '', // 播放目录最后一个视频课件

    prev: 0, // 上一节
    next: 0, // 下一节

    playStartTime: '', // 播放开始时间

    userName: '', // 用户名称
    userId: '', // 用户ID

    showHandoutMax: false, // 讲义最大显示，默认在目录位置显示

    chapterList: [], // 章节列表

    enableStatus: 'N', // 智能学习
    interactionStatus: 'N', // AI随堂练

    resumeStatus: 0, // 继续播放状态
    pauseStatus: 0, // 暂停播放状态

    lockStatus: false, // 是否有模块锁，true: 有锁，false: 没有锁
    modulId: '', // 模块ID
    showMindPic: false, // 是否显示思维导图
    mindFileInfo: {
        pic: '',
        downloadFilePath: '',
    },

    paperId: '', // AI随堂练试卷ID
    answersheetId: '', // AI随堂练答卷标识

    isReady: false, // 是否加载

    isPlaying: false, // 当前播放状态

    ifShowPlayer: false, // 播放器是否已经初始化完成
    ifHandoutHave: false, // 当前课程是否有讲义

    showMaxVideo: false, // 全屏

    teacherId: '',
});

export const mutations = {
    setCourseInfo(state, obj) {
        Object.keys(obj).forEach((k) => {
            state[k] = obj[k];
        });
    },
    doPrev(state) {
        state.prev += 1;
    },
    doNext(state) {
        state.next += 1;
    },
    doVideoResume(state) {
        state.resumeStatus += 1;
    },
    doVideoPause(state) {
        state.pauseStatus += 1;
    },
    doChangeVideo(state) {
        state.showHandoutMax = !state.showHandoutMax;
    },
};
