const ret = (type = 'single') => {
    const res = {
        type,
        _startTime: null, // 程序执行开始时间
        _count: 0,
        _interval: 1000,
        _handleList: [],
        _deviation: 0, // 偏移量
        startTimeNum: 0,
        endTimeNum: 0,
        timer: null,
        callFun: () => {},
        isPause: false, // 是否暂停
        stopTime() {
            clearTimeout(this.timer);
        },
        visibilitychange() {
            const change = () => {
                if (document.hidden) {
                    this._startTime = Date.now();
                    this.stopTime();
                } else {
                    this._deviation = Date.now() - this._startTime;
                    this.endTimeNum += this._deviation;
                    this._startTime = Date.now();
                    this._count = 0;
                    if (this.type === 'more') {
                        this.doHandle();
                    } else {
                        this.runTime(this.startTimeNum, this.endTimeNum, this.callFun);
                    }
                }
            };
            window.addEventListener('visibilitychange', change);
        },
        addHandle(opt) {
            /**
             * opt: {
             *  currentTime: 当前时间
             *  endTime: 活动的开始时间
             *  onpulse: 执行中的回调
             *  onstop: 结束时的回调
             * }
             */
            this._handleList.push({
                ...opt,
                _count: 0,
            });
        },
        doHandle() {
            for (var i = 0; i < this._handleList.length; i++) {
                let item = this._handleList[i];
                if (item._count > 0) {
                    item._count = 0;
                    item.currentTime += this._deviation;
                    if (i === this._handleList.length - 1) {
                        this._deviation = 0;
                    }
                }

                let obj = this.doRunTime(item.currentTime * 1, item.endTime * 1);
                let ret = {
                    currentTime: item.currentTime,
                    endTime: item.endTime,
                };
                if (obj.check === true) {
                    item._count += 1;
                    item.onpulse && item.onpulse(obj.msTime, ret);
                    if (item.currentTime.toString().length > 10) {
                        item.currentTime += 1000;
                    } else {
                        item.currentTime += 1;
                    }
                } else {
                    item.onpulse && item.onpulse(obj.msTime, ret);
                    item.onstop && item.onstop(obj.msTime, ret);
                    this._handleList.splice(i, 1);
                    i--;
                }
            }
            let offset = Date.now() - this._startTime - this._count * this._interval;
            let nextTime = this._interval - offset;
            if (nextTime < 0) {
                nextTime = 0;
            }

            this._count++;
            this.timer = setTimeout(() => {
                this.doHandle();
            }, nextTime);
        },
        doStop(index) {
            if (typeof index !== 'number') {
                this._handleList = [];
            } else {
                this._handleList.splice(index, 1);
            }
            if (this._handleList.length === 0) {
                this.stopTime();
            }
        },
        doRunTime(currentTime, endTime) {
            let msTime = {
                //倒计时数值
                show: true, //倒计时状态
                day: '', //天
                hour: '', //小时
                minutes: '', //分钟
                seconds: '', //秒
            };
            let check = false;
            if (currentTime.toString().length == 10) {
                currentTime = currentTime * 1000;
            }
            if (endTime.toString().length == 10) {
                endTime = endTime * 1000;
            }
            let timeDistance = endTime - currentTime;
            if (timeDistance > 0) {
                check = true;
            }
            /*this.msTime.show = true;*/
            msTime.day = Math.floor(timeDistance / 86400000);
            timeDistance -= msTime.day * 86400000;
            msTime.hour = Math.floor(timeDistance / 3600000);
            timeDistance -= msTime.hour * 3600000;
            msTime.minutes = Math.floor(timeDistance / 60000);
            timeDistance -= msTime.minutes * 60000;

            msTime.seconds = Math.floor(timeDistance / 1000).toFixed(0);
            timeDistance -= msTime.seconds * 1000;

            if (msTime.hour < 10) {
                msTime.hour = '0' + msTime.hour;
            }
            if (msTime.minutes < 10) {
                msTime.minutes = '0' + msTime.minutes;
            }
            if (msTime.seconds < 10) {
                msTime.seconds = '0' + msTime.seconds;
            }

            return {
                msTime,
                check,
            };
        },
        runTime(startTime, endTime, callFun) {
            let msTime = {
                //倒计时数值
                show: true, //倒计时状态
                day: '', //天
                hour: '', //小时
                minutes: '', //分钟
                seconds: '', //秒
            };
            if (typeof callFun === 'undefined') {
                callFun = () => {};
            }
            let check = false;
            if (startTime.toString().length == 10) {
                startTime = startTime * 1000;
            }
            if (endTime.toString().length == 10) {
                endTime = endTime * 1000;
            }
            let timeDistance = startTime - endTime;
            if (timeDistance > 0) {
                check = true;
            } else if (timeDistance < 0) {
                callFun();
                return;
            }

            this.startTimeNum = startTime;
            this.endTimeNum = endTime;
            this.callFun = callFun;

            /*this.msTime.show = true;*/
            msTime.day = Math.floor(timeDistance / 86400000);
            timeDistance -= msTime.day * 86400000;
            msTime.hour = Math.floor(timeDistance / 3600000);
            timeDistance -= msTime.hour * 3600000;
            msTime.minutes = Math.floor(timeDistance / 60000);
            timeDistance -= msTime.minutes * 60000;
            //是否开启秒表倒计,未完成
            //                    this.secondsFixed ? msTime.seconds = new Number(timeDistance / 1000).toFixed(2) : msTime.seconds = Math.floor( timeDistance / 1000 ).toFixed(0);
            msTime.seconds = Math.floor(timeDistance / 1000).toFixed(0);
            timeDistance -= msTime.seconds * 1000;

            if (msTime.hour < 10) {
                msTime.hour = '0' + msTime.hour;
            }
            if (msTime.minutes < 10) {
                msTime.minutes = '0' + msTime.minutes;
            }
            if (msTime.seconds < 10) {
                msTime.seconds = '0' + msTime.seconds;
            }

            if (check) {
                callFun(msTime);
            } else {
                callFun();
            }
            let offset = Date.now() - this._startTime - this._count * this._interval;
            let nextTime = this._interval - offset;
            if (nextTime < 0) {
                nextTime = 0;
            }
            this._count++;
            this.timer = setTimeout(() => {
                if (check) {
                    this.runTime(startTime, (endTime += 1000), callFun);
                } else {
                    clearTimeout(this.timer);
                }
            }, nextTime);
        },
    };
    res.visibilitychange();
    res._startTime = Date.now();
    return res;
};

/**
 * 单定时器，多任务调用示例
 * let instance = this.$countDown.createIntance();
 * instance.doStart();
 * instance.addHandle({
 *      currentTime: dayjs().unix(),
 *      endTime: startTime + 1000,
 *      onpulse: (res) => {
 *          // 倒计时过程中执行
 *          console.log(res, '====');
 *      },
 *      onstop: () => {
 *          // 倒计时结束时执行
 *      }
 *   });
 * instance.doStop(1); // 倒计时方法添加结束倒计时方法，传值为数字的时候时删除某一个倒计时任务，传空或者非数组的时候清空全部倒计时任务
 */
export default {
    runTime() {
        const instance = ret();
        instance.runTime.apply(instance, arguments);
        return instance;
    },
    createIntance() {
        const instance = ret('more');
        return {
            addHandle: instance.addHandle.bind(instance),
            doStart: () => {
                instance.doHandle();
            },
            doStop: (index) => {
                instance.doStop(index);
            },
        };
    },
};
