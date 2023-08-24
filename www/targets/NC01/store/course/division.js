export const state = () => ({
    /**
     * 0：收起目录
     * 1：目录
     * 2：讲义
     * 3：答疑
     * 4：词点快查
     * 5：AI随堂练
     * 6：练习记录
     * 7：课程评价
     */
    type: 1,

    aiParctice: false,
});

export const mutations = {
    setType(state, type) {
        state.type = type;
    },
    doShowAIParctice(state, check) {
        state.aiParctice = check;
    },
};
