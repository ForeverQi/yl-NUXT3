export default {
    data() {
        return {
            day: 0,
            hr: 0,
            min: 0,
            sec: 0,
            now: 0,
            end: 0,
            start: 0,
            time_fun: null,
            isTimeLimit: '',
        };
    },
    methods: {
        initDown() {
            if (this.file.docAccess === 'C' && (this.file.docPromotiontype === 'L' || this.file.docPromotiontype === 'F') && this.file.isOwned === 'N') {
                //定义结束时间戳
                let now = Date.parse(new Date(this.file.systemTime));
                //定义当前时间戳
                let end = Date.parse(new Date(this.file.docPromotionendtime));
                let start = Date.parse(new Date(this.file.docPromotionstarttime));
                this.beginCountDown(now, end, start);
            }
        },
        beginCountDown(now, end, start) {
            //定义结束时间戳
            this.now = now;
            //定义当前时间戳
            this.end = end;
            this.start = start;
            if (this.time_fun) {
                clearTimeout(this.time_fun);
            }
            this.countdown();
        },
        // 倒计时
        countdown() {
            if (this.now < this.start) {
                this.day = '';
                this.hr = '';
                this.min = '';
                this.sec = '';
            }
            if (this.now >= this.end) {
                this.isTimeLimit = 'N';
                return;
            }
            if (this.now < this.start) {
                this.isTimeLimit = 'N';
            }
            if (this.now <= this.end && this.now >= this.start) {
                this.isTimeLimit = 'Y';
            }
            //用结束时间戳减去当前时间获得倒计时时间戳
            this.now = this.now + 1000;
            const msec = this.end - this.now;
            let day = parseInt(msec / 1000 / 60 / 60 / 24); //天数
            let hr = parseInt((msec / 1000 / 60 / 60) % 24); //小时
            let min = parseInt((msec / 1000 / 60) % 60); //分钟
            let sec = parseInt((msec / 1000) % 60); //秒数
            //给数据赋值
            this.day = day;
            this.hr = hr > 9 ? hr : '0' + hr;
            this.min = min > 9 ? min : '0' + min;
            this.sec = sec > 9 ? sec : '0' + sec;

            this.time_fun = setTimeout(() => {
                this.countdown();
            }, 1000);
        },
    },
};
