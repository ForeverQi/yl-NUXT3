import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import '@/api/cc/api..query-study-tool.js';
import '@/api/bd/api.BD4704.query-project-detail.js';
import '@/api/qb/api..query-noun-project-config-project-status.js'; //小题库-项目开启状态查询(“词典快查”开启判断)

export const state = () => ({
    projectMap: {},
});
const map = {
    answerQuestion: false, // 学习答疑
    examSite: false, // 考点分析/考点秒懂
    phraseLookup: false, // 词点快查
    memoryFlash: false, // 记忆闪卡
    examSystem: false, // 机考系统
    questionBook: false, // AI错题本
    favorites: false, // 试题收藏夹
    xiaoYouInspector: false, // 小优督学
    offlineLearn: true, // 离线学习
    dayPractice: true, // 每日一练
    trainingPlatform: false, // 会计实训
};
export const mutations = {
    setProjectMap(state, data) {
        state.projectMap[data.projectId] = data.projectInfo;
    },
};
export const actions = {
    getLearnToolsStatus({ state }, classId) {
        return new Promise((resolve, reject) => {
            niceloo.api.call('cc/query-study-tool', {
                classId,
                onsuccess: (res) => {
                    Object.keys(map).forEach((k) => {
                        if (typeof res[k] !== 'undefined') {
                            map[k] = res[k] === 'Y';
                        }
                    });
                    resolve(map);
                },
                onerror: (err) => {
                    console.log('@@', err);
                    resolve(map);
                },
            });
        });
    },
    getProjectInfo({ state, commit }, projectId) {
        if (state.projectMap[projectId]) {
            return Promise.resolve(state.projectMap[projectId]);
        }
        return new Promise((resolve, reject) => {
            niceloo.api.call('bd/query-project-detail', {
                projectId,
                onsuccess: (res) => {
                    commit('setProjectMap', { projectId, projectInfo: res });
                    resolve(res);
                },
                onerror: (err) => {
                    console.log('@@', err);
                    reject(err);
                },
            });
        });
    },
    getProjectAndTools({ dispatch }, obj) {
        return dispatch('getProjectInfo', obj.projectId).then((projectInfo) => {
            return dispatch('getLearnToolsStatus', obj.classId).then((toolsMap) => {
                return {
                    projectInfo,
                    toolsMap,
                };
            });
        });
    },
    // 专项题库词典快查显示状态
    getLearnToolsSpecialStatus({ state }, projectId) {
        return new Promise((resolve, reject) => {
            niceloo.api.call('qb/query-noun-project-config-project-status', {
                projectId,
                onsuccess: (res) => {
                    resolve(res);
                },
                onerror: (err) => {
                    reject(err);
                },
            });
        });
    },
};
