export default {
    data() {
        return {
            current: 1,
            questionAllCount: 0,
        };
    },
    methods: {
        // 设置当前题号
        setCurrent(current) {
            console.log(current);
            this.current = current + 1;
            this.$refs.questionContent.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        },
        // 获取试卷全部题目数量
        setQuestionAllCount(allCount) {
            this.questionAllCount = allCount;
        },
    },
};
