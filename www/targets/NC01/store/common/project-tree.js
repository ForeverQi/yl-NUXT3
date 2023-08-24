import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import '@/api/ctc/api..query-ctc-project-tree.js';

let link = null;
export const state = () => ({
    list: [],
});

export const mutations = {
    setList(state, data) {
        state.list = data;
    },
};

export const actions = {
    getProjectTree({ state, commit }) {
        if (link === null) {
            link = new Promise((resolve, reject) => {
                niceloo.api.call('ctc/query-ctc-project-tree', {
                    projectShowStatus: 'yes',
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
                commit('setList', res.treeData);
                return state.list;
            })
            .catch((err) => {
                link = null;
                return Promise.reject(err);
            });
    },
};
