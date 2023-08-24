function dateFtt(fmt, date = new Date()) {
    //author: meizz
    let o = {
        'M+': date.getMonth() + 1, //月份
        'D+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S+': date.getMilliseconds(), //毫秒
    };
    if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    return fmt;
}

function formatNumber(n) {
    const str = n.toString();
    return str[1] ? str : `0${str}`;
}

let flowNum = 0;
const ret = {
    //复制时间对象
    clone(date) {
        return new Date(date.valueOf());
    },
    /**
     * 获取基于当前时间的流水号，无前缀21位，YYYYMMDDhhmmssSSS0001
     * @param pre UUID前缀,默认""
     * @returns {string}
     */
    getUUID(pre = '') {
        flowNum++;
        if (flowNum > 9999) flowNum = 1;
        let uuid = pre + dateFtt('YYYYMMDDhhmmssSSS') + (flowNum + 10000 + '').substr(1);
        return uuid;
    },
    /**
     * 基于fmt时间格式，格式化时间对象为字符串
     * @param fmt 时间格式 YYYYMMDDhhmmssSSS
     * @param date Date对象，默认为当前时间
     * @returns {string}
     */
    dateFmt: (fmt, date = new Date()) => {
        let str = dateFtt(fmt, date);
        return str;
    },
    /**
     * 根据毫秒数计时0：01：25
     * @param time 秒数
     * @returns {string}
     */
    getTimeString(time) {
        let hour = formatNumber(Math.floor(time / 3600));
        let minute = formatNumber(Math.floor((time - 3600 * hour) / 60));
        let second = formatNumber(Math.floor((time - 3600 * hour - 60 * minute) % 60));
        return hour + ':' + minute + ':' + second;
    },
    /**
     * 获取这周的周一
     * @param date Date对象，默认为当前时间
     * @returns {Date}
     */
    getFirstDayOfWeek(date = new Date()) {
        date = ret.clone(date);
        let weekday = date.getDay() || 7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
        date.setDate(date.getDate() - weekday + 1); //往前算（weekday-1）天，年份、月份会自动变化
        return date;
    },
    /**
     * 获取当月第一天
     * @param date Date对象，默认为当前时间
     * @returns {Date}
     */
    getFirstDayOfMonth(date = new Date()) {
        date = ret.clone(date);
        date.setDate(1);
        return date;
    },
    /**
     * 获取当月最后一天
     * @param date Date对象，默认为当前时间
     * @returns {Date}
     */
    getLastDayOfMonth(date = new Date()) {
        date = ret.clone(date);
        date.setMonth(date.getMonth() + 1);
        //日期设置为0号, 0表示1号的前一天
        date.setDate(0);
        return date;
    },
    /**
     * 获取上个月第一天
     * @param date Date对象，默认为当前时间
     * @returns {Date}
     */
    getFirstDayOfPrvMonth(date = new Date()) {
        date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        return date;
    },
    /**
     * 获取当季第一天
     * @param date Date对象，默认为当前时间
     * @returns {Date}
     */
    getFirstDayOfSeason(date = new Date()) {
        date = ret.clone(date);
        let month = date.getMonth();
        if (month < 3) {
            date.setMonth(0);
        } else if (2 < month && month < 6) {
            date.setMonth(3);
        } else if (5 < month && month < 9) {
            date.setMonth(6);
        } else if (8 < month && month < 11) {
            date.setMonth(9);
        }
        date.setDate(1);
        return date;
    },
    /**
     * 获取当年第一天
     * @param date Date对象，默认为当前时间
     * @returns {Date}
     */
    getFirstDayOfYear(date = new Date()) {
        date = ret.clone(date);
        date.setDate(1);
        date.setMonth(0);
        return date;
    },
    /**
     * @desc 计算两个时间的时间差
     * @dateBegin  new Date()
     * @dateEnd  new Date()
     * return {day : '日',min: '分钟', sec: '秒'}
     */
    getDifferDate(dateBegin, dateEnd) {
        //di作为一个变量传进来
        let dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
        let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
        let leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
        //计算相差秒数
        let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3 / 1000);
        return {
            day: dayDiff,
            hour: hours,
            min: minutes,
            sec: seconds,
        };
        // console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
        // console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数"
        //     ,hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");
    },
    /**
     * @description 修剪Date对象的hour,minute,second,millisecond为0
     * @param {Object} date new Date
     * @return {Object} new Date
     */
    trimDate(date) {
        date = ret.clone(date);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    },
    /**
     * @description 获得时间的上一天
     * @param {Object} date new Date
     * @return {Object} new Date
     */
    getLastDay(date = new Date()) {
        date = ret.clone(date);
        return ret.getPrevDay(date);
    },
    getPrevDay(date = new Date()) {
        date = ret.clone(date);
        return new Date(date.setDate(date.getDate() - 1));
    },
    /**
     * @description 获得时间的下一天
     */
    getNextDay(date = new Date()) {
        date = ret.clone(date);
        return new Date(date.setDate(date.getDate() + 1));
    },
    /**
     *获取时间所在月份日历 周日开始
     */
    getCalendarDates(date = new Date()) {
        let lastDay = ret.getLastDayOfMonth(date);
        // let myddy=mydate.getDay();//获取存储当前日期
        // let weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        date = ret.getFirstDayOfMonth(date);
        while (date.getDay() > 0) {
            date = ret.getPrevDay(date);
        }
        let arr = [];
        while (!(date.getDay() == 0 && date >= lastDay)) {
            arr.push(date);
            date = ret.getNextDay(date);
        }
        return arr;
    },
    /**
     *获取时间所在月份日历 周一开始
     */
    getCalendarDatesFromMon(date = new Date()) {
        let lastDay = ret.getLastDayOfMonth(date);
        // let myddy=mydate.getDay();//获取存储当前日期
        // let weekday=["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
        date = ret.getFirstDayOfMonth(date);
        while (date.getDay() !== 1) {
            date = ret.getPrevDay(date);
        }
        let arr = [];
        while (!(date.getDay() == 1 && date >= lastDay)) {
            arr.push(date);
            date = ret.getNextDay(date);
        }
        return arr;
    },
    /**
     * 当前时间 是否在start end 之间
     *
     */
    nowIsInStartToEnd(start, now, end) {
        if (start && now && end) {
            let startTime = new Date(start.replace(/-/g, '/')).getTime();
            let nowTime = new Date(now.replace(/-/g, '/')).getTime();
            let endTime = new Date(end.replace(/-/g, '/')).getTime();
            if (nowTime < startTime || nowTime > endTime) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    /**
     * 当前时间 是否在end 之前
     *
     */
    nowIsBeforeEnd(now, end) {
        if (now && end) {
            let nowTime = new Date(now.replace(/-/g, '/')).getTime();
            let endTime = new Date(end.replace(/-/g, '/')).getTime();
            if (nowTime > endTime) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
};

export default ret;
