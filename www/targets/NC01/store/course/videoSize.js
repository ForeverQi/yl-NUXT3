export const state = () => ({
    mainWidth: 0, // 主屏幕显示宽度
    mainHeight: 0, // 主屏幕显示高度

    windowHeight: 0, // 屏幕高度
    windowWidth: 0, // 屏幕宽度
});

export const mutations = {
    setPlayerSection(state, obj) {
        Object.keys(obj).forEach((k) => {
            state[k] = obj[k];
        });
    },
};
