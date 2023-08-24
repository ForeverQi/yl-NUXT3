export const state = () => ({
    popUpLogin: false, // 判断用户是否触发了登录弹窗成功的动作，在登录成功的回调当中改变该值
});

export const mutations = {
    setPopUpLogin(state) {
        state.popUpLogin = !state.popUpLogin;
    },
};
