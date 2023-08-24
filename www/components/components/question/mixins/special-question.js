export default {
    props: {
        // 是否显示确定按钮
        showConfirmBtn: {
            type: Boolean,
            default: true,
        },
    },
    /**
     *
     * @returns {object} 数据模型
     */
    data() {
        return {
            newData: {},
            confirmBtnStatus: false,
            newPaperParsing: false,
        };
    },
    /**
     * mounted生命周期
     */
    mounted() {
        this.newPaperParsing = this.paperParsing;
    },
    computed: {
        /**
         * @returns {string} special: 从专项小题库进入
         */
        questionBankStatus() {
            if (this.$attrs['show-type'] != 'origin') {
                return this.$route.query.questionBankStatus;
            } else {
                return '';
            }
        },
        /**
         * @returns {string} 刷题模式：do-exercise: 背题模式; do-exam:做题模式
         */
        solvingMode() {
            if (this.$attrs['show-type'] != 'origin') {
                return this.$route.query.solvingMode;
            } else {
                return '';
            }
        },
        /**
         * @returns {string} 打开解析
         */
        openParsing: {
            /**
             * @returns {string} getter函数
             */
            get() {
                let status = '';
                if (this.questionBankStatus === 'special' || this.solvingMode) {
                    status = this.newData.paperParsing;
                } else {
                    status = this.newPaperParsing;
                }
                return status;
            },
            /**
             * @param {boolean} newValue 新值
             */
            set(newValue) {
                this.newPaperParsing = newValue;
            },
        },
    },
    watch: {
        data: {
            /**
             *
             * @param {object} newValue 重新定义新值
             */
            handler(newValue) {
                this.newData = newValue;
            },
            deep: true,
            immediate: true,
        },
        /**
         * 是否显示确定按钮（多选题、填空题、简答题）
         */
        showConfirmBtn: {
            /**
             *
             * @param {string} newValue 新值
             */
            handler(newValue) {
                this.confirmBtnStatus = newValue;
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {},
};
