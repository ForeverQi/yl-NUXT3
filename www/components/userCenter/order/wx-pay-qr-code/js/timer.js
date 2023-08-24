export default {
    /**
     * 数据模型
     *
     * @returns {object} ret 数据模型
     */
    data() {
        return {
            timerSeconds: 0,
        };
    },
    computed: {
        /**
         * 是否倒计时
         *
         * @returns {boolean} 是否可用
         */
        isTimerEnable() {
            if (this.order.orderStatus === 'CRE' && Date.parse(this.order.orderTimeexpire) > Date.now() && this.isNeedTimer) {
                return true;
            }
            return false;
        },
        /**
         * 是否需要倒计时
         *
         * @returns {boolean} 是否需要倒计时
         */
        isNeedTimer() {
            if (this.order.orderItems.length <= 0) {
                return false;
            }
            return this.timerCardType.includes(this.order.orderItems[0].productType);
        },
        /**
         * 小时
         *
         * @returns {string} 小时
         */
        hour() {
            return parseInt(this.dayRemainder / 0xe10)
                .toString()
                .padStart(2, '0');
        },
        /**
         * 小时余数
         *
         * @returns {number} 小时余数
         */
        hourRemainder() {
            return this.dayRemainder % 0xe10;
        },
        /**
         * 分钟
         *
         * @returns {string} 分钟
         */
        minute() {
            return parseInt(this.hourRemainder / 0x3c)
                .toString()
                .padStart(2, '0');
        },
        /**
         * 分钟余数
         *
         * @returns {number} 分钟余数
         */
        minuteRemainder() {
            return this.hourRemainder % 0x3c;
        },
        /**
         * 秒
         *
         * @returns {string} 秒
         */
        second() {
            return this.minuteRemainder.toString().padStart(2, '0');
        },
        /**
         * 天
         *
         * @returns {number} 天
         */
        day() {
            return parseInt(this.timerSeconds / 0x15180);
        },
        /**
         * 天余数
         *
         * @returns {number} 天余数
         */
        dayRemainder() {
            return this.timerSeconds % 0x15180;
        },
    },
    methods: {
        /**
         * 开始定时器
         */
        startTimer() {
            clearInterval(this.timerHandler);
            this.timerHandler = setInterval(() => {
                this.timerSeconds -= 1;
                if (this.timerSeconds <= 0) {
                    clearInterval(this.timerHandler);
                    this.timerStopCb?.();
                }
            }, 1000);
        },
    },
};
