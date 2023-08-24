// import userLoginApi from '@/api/login.js';
import User from '~/plugins/common/inject/user';
import storage from '~/plugins/common/inject/storage';
export const state = () => ({
    userInfo: null,
    islogin: false, // 是否登录
    bindStatus: {
        // 绑定状态
        bindWechat: false,
    },
});

export const getters = {
    getUserInfo: async (state) => {
        if (process.server) {
            return state.userInfo;
        } else {
            return state.userInfo || (await User($nuxt.context.env.config).getUser());
        }
    },
};

export const mutations = {
    setUserInfo(state, value) {
        if (typeof value === 'string') {
            state.userInfo = JSON.parse(value);
        } else {
            state.userInfo = value;
        }
        if (value) {
            state.islogin = true;
        } else {
            state.islogin = false;
        }
    },
    setInLogin(state, value) {
        state.islogin = value;
    },
    setBindStatus(state, obj) {
        state.bindStatus[obj.key] = obj.value;
    },
};

export const actions = {
    // 用户注销 经和后台老师沟通 获取用户信息和注销接口不在同服务器上，走用户接口获取注销状态会有延迟 固通过此接口不能拿到实时的用户状态
    setUserInfoActions({ commit }) {
        ylPlugin.login.getUser().then((data) => {
            if (data) {
                commit('setUserInfo', data || {});
            }
        });
    },
    checkInLogin: ({ commit }) => {
        // 检查用户是否已登录
        ylPlugin.login.isLogined().then((res) => {
            commit('setInLogin', res);
        });
    },
    getUserInfo2({ commit }) {
        const user = User($nuxt.context.env.config);
        return ylPlugin.login.isLogined().then((res) => {
            if (res) {
                commit('setUserInfo', res);
                let obj = storage($nuxt.context.env.config).get('login-bind-status');
                commit('setBindStatus', { key: 'bindWechat', value: !!obj.bindWechat });
            } else {
                user.removeLoginInfo();
                commit('setUserInfo', null);
                commit('setBindStatus', { bindWechat: false });
                commit('setInLogin', false);
                return Promise.reject();
            }
        });
    },
};
