import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import '@/api/qb/api.QB4001.dict-quefeedbacktype-list.js';
import '@/api/cc/api.QA3001.web-questiontypes.js';

let link = null;
let questionTypesPromise = null;
export const state = () => ({
    list: [],
    questionTypes: [],
});

export const mutations = {
    setList(state, data) {
        state.list = data;
    },
    setQuestionTypes(state, data) {
        state.questionTypes = data;
    },
};

export const actions = {
    getQuefeedbacktypeList({ state, commit }) {
        if (link === null) {
            link = new Promise((resolve, reject) => {
                niceloo.api.call('qb/dict-quefeedbacktype-list', {
                    onsuccess: (res) => {
                        resolve(res);
                    },
                    onerror: (err) => {
                        reject(err);
                    },
                    oncomplete: () => {},
                });
            });
        }
        return link
            .then((res) => {
                commit('setList', res.data);
                return state.list;
            })
            .catch((err) => {
                link = null;
                return Promise.reject(err);
            });
    },
    getQuestiontypes({ state, commit }) {
        if (!questionTypesPromise) {
            questionTypesPromise = new Promise((resolve, reject) => {
                niceloo.api.call('cc/web-questiontypes', {
                    onsuccess: (res) => {
                        resolve(res);
                    },
                    onerror: (err) => {
                        reject(err);
                    },
                    oncomplete: () => {},
                });
            });
        }
        return questionTypesPromise
            .then((res) => {
                commit('setQuestionTypes', res);
                return state.questionTypes;
            })
            .catch((err) => {
                link = null;
                return Promise.reject(err);
            });
    },
};
