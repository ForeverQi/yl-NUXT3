import '@/api/uc/api.CMTS1003.query-target-list-count.js';
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';

export const state = () => ({
    unreadTotalNum: 0, // 用户未读消息数量
    questionnaireCount: 0, // 调查问卷未评价总条数
    noticeNum: [],
});

export const getters = {
    getUnreadTotalNum(state) {
        return state.unreadTotalNum;
    },
    getQuestionnaireCount(state) {
        return state.questionnaireCount;
    },
    getNoticeNum: (state) => state.noticeNum,
};

export const mutations = {
    setUnreadTotalNum(state, value) {
        state.unreadTotalNum = value;
    },
    setQuestionnaireCount(state, value) {
        state.questionnaireCount = value;
    },
    setNoticeNum(state, value) {
        state.noticeNum = value;
    },
};

export const actions = {
    /**
     * 获取未读消息数
     * @param {} param
     */
    getUnreadNum({ commit }) {
        new Promise((resolve, reject) => {
            niceloo.api.callRaw({
                api: 'mc/my/msg/unread/btype/counts',
                params: {},
                onsuccess: resolve,
                onerror: reject,
            });
        })
            .catch((err) => {
                niceloo.api.handleFailure(err);
                return Promise.reject(err);
            })
            .then(
                (res) => {
                    console.log('===>', res);
                    commit('setUnreadTotalNum', res.totalCount || 0);
                    commit('setNoticeNum', res.data || []);
                },
                function (_failure) {
                    niceloo.api.handleFailure(_failure);
                }
            );
    },
    getAjaxQuestionnaireCount({ commit }) {
        niceloo.api.call('uc/query-target-list-count', {
            onsuccess: (res) => {
                commit('setQuestionnaireCount', res || 0);
            },
            onerror: niceloo.api.handleFailure,
            oncomplete: () => {},
        });
    },
};
