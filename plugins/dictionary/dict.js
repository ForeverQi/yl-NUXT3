//字典数据
const dictMap = {
    IS_USE: {
        Y: '可用',
        N: '不可用',
    },
    IS_TURE: {
        0: '否',
        1: '是',
    },
    COM_IS_USE: {
        Y: '可用',
        N: '不可用',
    },
    // 消息的阅读状态
    MSG_OPEN_STATUS: {
        Y: 'Y', //已读
        N: 'N', //未读
        I: 'I', //忽略
    },
    // 消息类型
    MSG_TYPE: {
        LIVE_LESSON: 'LIVE_LESSON', //直播
        SUBJECT_EVALUATION_REPORT: 'SUBJECT_EVALUATION_REPORT', // 智能学习测评智能阅卷
        ANSWER_QUESTION: 'ANSWER_QUESTION', //我的课程学习答疑
        CLASS_NOTICE: 'CLASS_NOTICE', //班级通知
        SELF_STUDY: 'SELF-STUDY', //我的申请
    },

    // 视频提供商
    VIDEO_PRIVIDERS: {
        SP: 'SP', //保利威
        LV: 'LV', // 威吼
        SC: 'SC', //广电圆点视频
        LC: 'LC', //广电圆点直播
    },
};
export default dictMap;
