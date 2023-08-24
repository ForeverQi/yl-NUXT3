import '@/api/cbn/api.CBN0002.query-cbn-noun-user-praise.js';
import '@/api/cbn/api.CBN0004.query-cbn-noun-proposal-list.js';
import '@/api/cbn/api.CBN0003.set-user-criticism.js';
export default {
    name: 'phrase-query-suggest',
    props: {
        currentSubject: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            isActiveLike: false, //点击点赞
            isActiveFeedBack: false, //点击提建议
            isGiveALike: false, //点赞成功
            isSubmit: false, //是否提交建议
            tabs: [], //建议列表
            queryForm: {
                textarea: '', //建议
            },
            isShowTip: false, //显示提示信息
            submitLoading: false,
            isUpOrDown: false,
        };
    },
    watch: {
        currentSubject: {
            handler(val) {
                if (val) {
                    this.getTabs();
                }
                this.isActiveLike = false;
                this.isActiveFeedBack = false;
                this.isSubmit = false;
                this.isGiveALike = false;
                this.queryForm = {
                    textarea: '',
                };
                this.isShowTip = false;
            },
            immediate: true,
            deep: true,
        },
        //每次点击提意见，从头开始
        isActiveFeedBack(val) {
            if (val) {
                this.isUpOrDown = false;
                this.queryForm = {
                    textarea: '',
                };
                this.isShowTip = false;
                this.submitLoading = false;
                this.isSubmit = false;
                this.tabs.forEach((item) => (item.check = false));
                this.$emit('on-scroll');
            }
        },
        //每次收起时均将提示去掉
        isUpOrDown: {
            handler(val) {
                if (val === false) {
                    this.isShowTip = false;
                    this.$emit('on-scroll');
                }
            },
            deep: true,
        },
    },
    methods: {
        //点赞
        onClickLike() {
            this.isActiveLike = !this.isActiveLike;
            niceloo.api.call('dict/query-cbn-noun-user-praise', {
                groupId: this.currentSubject.groupId,
                isPraise: this.isActiveLike ? 'Y' : 'N',
                referId: this.currentSubject.referId,
                onsuccess: () => {
                    this.isActiveLike ? (this.isGiveALike = true) : (this.isGiveALike = false);
                },

                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //提建议
        onClickFeedBack() {
            this.isActiveFeedBack = !this.isActiveFeedBack;
            if (this.activeFeedBack) {
                this.queryForm.textarea = '';
            }
        },
        //获取建议列表tabs
        getTabs() {
            niceloo.api.call('dict/query-cbn-noun-proposal-list', {
                onsuccess: (data) => {
                    data.forEach((item) => {
                        item.check = false;
                    });
                    this.tabs = data || [];
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //选中建议
        onClickCheck(item) {
            item.check = !item.check;
        },
        //提交建议
        onSubmit() {
            this.debounce(this.criticismNoun, 1000, true)();
        },
        debounce(fn, wait, immediate) {
            let timer;
            return function () {
                if (timer) clearTimeout(timer);
                if (immediate) {
                    // 如果已经执行过，不再执行
                    var callNow = !timer;
                    timer = setTimeout(() => {
                        timer = null;
                    }, wait);
                    if (callNow) {
                        fn.apply(this, arguments);
                    }
                } else {
                    timer = setTimeout(() => {
                        fn.apply(this, arguments);
                    }, wait);
                }
            };
        },
        //提交建议
        criticismNoun() {
            let arr = [];
            this.tabs.forEach((item) => {
                item.check && arr.push(item.id);
            });

            if (this.queryForm.textarea.trim() === '' && !arr.length) {
                this.isShowTip = true;
                return;
            }
            if (this.submitLoading) return false;
            this.submitLoading = true;
            niceloo.api.call('dict/set-user-criticism', {
                groupId: this.currentSubject.groupId,
                criticismType: arr.join(','),
                criticismDetail: this.queryForm.textarea,
                onsuccess: () => {
                    this.isSubmit = true;
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {
                    this.submitLoading = false;
                    this.isShowTip = false;
                },
            });
        },
    },
};
