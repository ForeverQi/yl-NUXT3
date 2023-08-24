import { arrayUnique } from '../js/utils';
export default {
    data() {
        return {
            intersectionObserver: null, // 用于定义IntersectionObserver实例
            observerTasks: [], // 监听元素列表，即所有id为questionId的div
            isSupport: true, // 当前浏览器是否支持IntersectionObserver
        };
    },
    created() {
        this.isSupport = typeof IntersectionObserver === 'function';
    },
    destroyed() {
        this.removeScrollObserver();
    },
    watch: {
        current() {
            this.$nextTick(() => {
                this.scrollObserver();
            });
        },
        loading(val) {
            if (!val) {
                this.$nextTick(() => {
                    this.scrollObserver();
                });
            }
        },
    },
    methods: {
        arrayUnique, // 数组去重
        /**
         * 监听元素是否进入视窗（为保证突然切换试题模式时效果还ok，只设置了下部内偏移10px）
         * 若进入，则修改该试题showParseImmediately为true，以触发解析查询知识点列表、打点视频等接口
         */
        scrollObserver() {
            if (!this.isSupport) return;
            this.removeScrollObserver();
            this.intersectionObserver = new IntersectionObserver(
                (entries) => {
                    if (entries.length < 1) {
                        return;
                    }
                    entries.forEach((item) => {
                        if (item.isIntersecting) {
                            console.log('监听当前元素进入视窗：', item.target);
                            const target = this.$refs.questions.getList().findIndex((item2) => item2.questionId === item.target.id);
                            if (target < 0) return;
                            this.setQuestionData(
                                {
                                    showParseImmediately: true,
                                },
                                target.toString()
                            );
                            // 修改后取消监听
                            this.intersectionObserver.unobserve(item.target);
                        }
                    });
                },
                {
                    rootMargin: '0px 0px -10px 0px',
                }
            );
            const boxList = this.$refs.questions ? this.$refs.questions.$children : [];
            boxList.forEach((item) => {
                if (item.$el.id) {
                    this.observerTasks.push(item.$el);
                } else {
                    item.$children.length &&
                        item.$children.forEach((_item) => {
                            if (_item.$el.id) this.observerTasks.push(_item.$el);
                        });
                }
            });
            this.arrayUnique(this.observerTasks);
            this.observerTasks.forEach((item) => {
                this.intersectionObserver.observe(item);
            });
        },
        removeScrollObserver() {
            if (this.intersectionObserver && this.isSupport) {
                this.observerTasks.forEach((item) => {
                    this.intersectionObserver.unobserve(item);
                });
                this.intersectionObserver.disconnect();
            }
        },
    },
};
