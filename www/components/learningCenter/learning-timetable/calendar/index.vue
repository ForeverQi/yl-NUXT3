<template>
    <div class="schedule-box">
        <div class="flex title jc-between ai-center">
            <div class="flex title-l ai-center">
                <span class="icon-left"></span>
                课程时间
            </div>
            <div class="flex title-r ai-center">
                <div class="previous" @click="prevM()"></div>
                {{ showMonthText }}份
                <div class="next" @click="nextM()"></div>
            </div>
        </div>
        <div class="schedule">
            <div class="schedule-week">
                <ul class="flex list">
                    <li>星期一</li>
                    <li>星期二</li>
                    <li>星期三</li>
                    <li>星期四</li>
                    <li>星期五</li>
                    <li>星期六</li>
                    <li>星期日</li>
                    <li>星期一</li>
                    <li>星期二</li>
                    <li>星期三</li>
                    <li>星期四</li>
                    <li>星期五</li>
                    <li>星期六</li>
                    <li>星期日</li>
                </ul>
            </div>
            <div class="schedule-date">
                <ul class="flex list wrap">
                    <li
                        v-for="(item, i) in days"
                        :key="i"
                        :class="{ wasState: item.type !== 'cur', active: item.value === selectDate, curdaynoactive: item.value === thisDate }"
                        @click="checkDate(item)"
                    >
                        <a
                            href="javascript:void(0)"
                            :class="{
                                wasDay: item.type !== 'cur' && calendarData[item.value] && (calendarData[item.value].live || calendarData[item.value].face),
                            }"
                        >
                            {{ thisDate === item.value ? '今天' : item.showTxt }}
                        </a>
                        <p
                            class="flex ai-center tag-box jc-center"
                            :class="{ wasDay: item.type !== 'cur' }"
                            v-if="calendarData[item.value] && calendarData[item.value].live && calendarData[item.value].face"
                        >
                            <span class="tag_two face">面</span>
                            <span class="tag_two live">直</span>
                        </p>
                        <p class="flex column ai-center tag-box" :class="{ wasDay: item.type !== 'cur' }" v-else-if="calendarData[item.value]">
                            <span class="tag face" v-if="calendarData[item.value].face">面授</span>
                            <span class="tag live" v-if="calendarData[item.value].live">直播</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex jc-center">
            <div class="date_zhankai" title="展开日历" v-if="datefoldflag == true" @click="datefold"></div>
            <div class="date_shouqi" title="收起日历" v-if="datefoldflag == false" @click="datefold"></div>
        </div>
    </div>
</template>
<script>
import dayjs from 'dayjs';
export default {
    props: {
        calendarData: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            days: [],
            copyDays: [],
            showMonth: dayjs().format('YYYY-MM-01'),
            datefoldflag: false,
            showMonthText: '',
            thisDate: dayjs().format('YYYY-MM-DD'),
            startDate: '', // 日期组件的开始日期
            endDate: '', // 日期组件的结束日期
            monthStartDate: '', // 当月的开始时间，
            monthEndDate: '', // 当月的结束时间
            monthDayList: [], // 当月日期列表
            selectDate: '',
        };
    },
    mounted() {
        this.selectDate = this.thisDate;
        this.init();
        this.$emit('checkDate', this.selectDate, true);
    },
    methods: {
        init() {
            this.showMonthText = dayjs(this.showMonth).format('YYYY年MM月');
            this.getCalendar(this.showMonth);
        },
        checkDate(item) {
            this.selectDate = item.value;
            if (item.type !== 'cur') {
                // 非当前月
                if (item.type === 'prev') {
                    this.prevM(false);
                } else if (item.type === 'next') {
                    this.nextM(false);
                }
            } else {
                this.$emit('checkDate', item.value);
            }
        },
        prevM(init = true) {
            if (this.datefoldflag === true) {
                this.datefold();
            }
            this.showMonth = dayjs(this.showMonth).subtract(1, 'month').format('YYYY-MM-01');

            if (init) {
                if (dayjs(this.showMonth).format('YYYY-MM') == dayjs(this.thisDate).format('YYYY-MM')) {
                    this.selectDate = this.thisDate;
                } else {
                    this.selectDate = this.showMonth;
                }
            }
            this.init();
            this.$emit('checkDate', this.selectDate, true);
        },
        nextM(init = true) {
            if (this.datefoldflag === true) {
                this.datefold();
            }

            this.showMonth = dayjs(this.showMonth).add(1, 'month').format('YYYY-MM-01');
            if (init) {
                if (dayjs(this.showMonth).format('YYYY-MM') == dayjs(this.thisDate).format('YYYY-MM')) {
                    this.selectDate = this.thisDate;
                } else {
                    this.selectDate = this.showMonth;
                }
            }
            this.init();
            this.$emit('checkDate', this.selectDate, true);
        },
        // 日历折叠
        datefold() {
            console.log('####');
            this.datefoldflag = !this.datefoldflag;
            this.$emit('datafold', this.datefoldflag);
            if (this.datefoldflag === false) {
                this.days = this.copyDays;
                return;
            }
            for (let i = 0; i < 3; i++) {
                let arr = this.days.slice(i * 14, (i + 1) * 14);
                let check = arr.some((r) => {
                    return r.value === this.selectDate;
                });
                if (check === true) {
                    this.days = arr;
                    return;
                }
            }
        },
        getCalendar(firstDay) {
            // firstDay 格式 2021-01-01
            const oDayjs = dayjs(firstDay);
            const day = parseInt(oDayjs.format('D')); // 获取日 即一个月里的第几天
            let firstDayOfWeek = oDayjs.day(); // 当天是星期几
            const curYearMonth = oDayjs.format('YYYY-MM');
            const totalDays = oDayjs.daysInMonth(); // 这个月一共有几天
            const remainDays = totalDays - day; // 这个月还剩下几天
            const days = []; // 当前月的所有号
            this.monthDayList = [];
            console.log(firstDay, day, firstDayOfWeek, '===@');
            // 生成当月日期数组
            for (let i = 0; i <= remainDays; i++) {
                let tmp = day + i;
                tmp = tmp < 10 ? `0${tmp}` : `${tmp}`;
                if (i === 0) {
                    this.monthStartDate = `${curYearMonth}-${tmp}`;
                } else if (i === remainDays) {
                    this.monthEndDate = `${curYearMonth}-${tmp}`;
                }

                this.monthDayList.push(`${curYearMonth}-${tmp}`);
                days.push({
                    showTxt: tmp,
                    value: `${curYearMonth}-${tmp}`,
                    type: 'cur',
                });
            }

            // 填补上个月的日期
            if (firstDayOfWeek === 0) {
                firstDayOfWeek = 7;
            }
            let sliceGap = Math.max(firstDayOfWeek - 1, 0); // 月之前补上个月的天数
            if (sliceGap > 0) {
                const prevMonthDays = oDayjs.subtract(1, 'month').daysInMonth();
                const prevYearMonth = oDayjs.subtract(1, 'month').format('YYYY-MM');
                let tmp = '';
                for (let i = 0; i < sliceGap; i++) {
                    tmp = `${prevMonthDays - i}`;
                    days.unshift({
                        showTxt: tmp,
                        value: `${prevYearMonth}-${tmp}`,
                        type: 'prev',
                    });
                }
                this.startDate = `${prevYearMonth}-${tmp}`;
            } else {
                this.startDate = days[0].value;
            }

            // 填补下个月的数据
            let nextDays = 42 - days.length;
            if (nextDays > 0) {
                let nextYearMonth = oDayjs.add(1, 'month').format('YYYY-MM');
                let tmp = '';
                for (let i = 1; i <= nextDays; i++) {
                    tmp = i < 10 ? `0${i}` : `${i}`;
                    days.push({
                        showTxt: tmp,
                        value: `${nextYearMonth}-${tmp}`,
                        type: 'next',
                    });
                }

                this.endDate = `${nextYearMonth}-${tmp}`;
            } else {
                this.endDate = days[days.length - 1].value;
            }

            this.days = days;
            this.copyDays = days;
            this.$nextTick(() => {
                this.$emit('initData', firstDay);
            });
        },
        getStartDate() {
            // return this.startDate;
            return this.monthStartDate;
        },
        getEndDate() {
            // return this.endDate;
            return this.monthEndDate;
        },
        getMonthStartDate() {
            return dayjs(this.monthStartDate + ' 00:00:00');
        },
        getMonthEndDate() {
            return dayjs(this.monthEndDate + ' 23:59:59');
        },
        getMonthDayList() {
            return this.monthDayList;
        },
    },
};
</script>
<style lang="less" scoped>
.schedule-box {
    position: relative;

    .title {
        color: #333333;
        padding: 0px 0px 18px 0px;
        .title-l {
            font-size: 18px;
            font-weight: bold;
            .icon-left {
                width: 4px;
                height: 18px;
                background-color: #ff705b;
                display: inline-block;
                margin-right: 6px;
            }
        }
        .title-r {
            font-size: 14px;
            .previous,
            .next {
                float: left;
                background: none;
                width: 50%;
                height: 100%;
                text-align: center;
                line-height: 21px;
                cursor: pointer;
                width: 20px;
                height: 20px;
                background: rgba(255, 150, 134, 1);
                border-radius: 50%;
                margin-left: 8px;
                background: url(./asset/images/next.png) no-repeat;
            }
            div.previous {
                border-right: 1px solid rgba(220, 220, 220, 1);
                width: 20px;
                height: 20px;
                border-radius: 50%;
                margin-left: 0px;
                margin-right: 8px;
                background: url(./asset/images/prev.png) no-repeat;
            }
        }
    }

    .schedule {
        .schedule-week {
            height: 27px;
            background: #ff705b;
            border-radius: 2px;
            line-height: 27px;
            font-size: 14px;
            color: #ffffff;
            .list {
                display: flex;
                justify-content: space-around;
                li {
                    width: 83px;
                    text-align: center;
                }
            }
        }

        .schedule-date {
            line-height: 27px;
            font-size: 14px;
            border: 1px solid rgba(238, 238, 238, 1);
            border-radius: 2px;

            .wrap {
                width: 100%;
            }
            .list {
                position: relative;
                justify-content: space-around;
                li:nth-child(14n + 14) {
                    &::after {
                        content: '';
                        width: 1px;
                        height: 79px;
                        background-image: none;
                        position: absolute;
                        z-index: 1;
                        pointer-events: none;
                        top: 0px;
                        left: 75px;
                    }
                }
                li {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    width: 83px;
                    height: 72px;
                    text-align: center;
                    color: #ff8383;
                    position: relative;
                    border-bottom: 1px solid #eeeeee;
                    cursor: pointer;
                    &::after {
                        content: '';
                        width: 1px;
                        height: 79px;
                        position: absolute;
                        z-index: 1;
                        pointer-events: none;
                        top: 0;
                        left: 75px;
                    }
                    &:hover {
                    }
                    a {
                        color: #333;
                        position: absolute;
                        top: 24px;
                        line-height: 22px;
                        &.active {
                            color: #ff705b !important;
                            font-size: 14px;
                        }
                        &.circular {
                            width: 24px;
                            height: 24px;
                            border: 1px solid rgba(246, 110, 110, 1);
                            box-shadow: 0px 1px 6px 0px rgba(208, 9, 9, 0.52);
                            border-radius: 10px;
                            box-sizing: border-box;
                            line-height: 24px;
                        }
                    }
                    .tag-box {
                        position: absolute;
                        top: 48px;
                        left: 0px;
                        width: 100%;
                    }
                    .tag {
                        margin-bottom: 8px;
                        width: 46px;
                        height: 18px;
                        line-height: 18px;
                        border-radius: 9px;
                        font-size: 12px;
                        color: #ffffff;
                        display: block;
                    }
                    .tag_two {
                        margin: 0px 2px 8px 2px;
                        height: 18px;
                        line-height: 18px;
                        border-radius: 9px;
                        font-size: 12px;
                        color: #ffffff;
                    }
                    .face {
                        color: #ff8e4c;
                    }
                    .live {
                        color: #99acff;
                    }
                    .disc {
                        width: 30px;
                        height: 30px;
                        color: #fff;
                        background: rgba(246, 110, 110, 1);
                        box-shadow: 0px 3px 6px 0px rgba(208, 9, 9, 0.52);
                        border-radius: 10px;
                    }
                    .wasLive {
                        height: 18px;
                        line-height: 18px;
                        font-size: 12px;
                        color: #d2d2d2;
                    }
                }

                li.wasState {
                    color: #d4d4d4;

                    a {
                        color: #d4d4d4;

                        &.wasDay {
                            background: #dfdfdf;
                            border-radius: 25px;
                            color: #ffffff;
                            width: 22px;
                            height: 22px;
                            line-height: 22px;

                            span {
                                color: #999999;
                            }
                        }
                    }

                    p {
                        &.wasDay {
                            span {
                                color: #999;
                            }
                        }
                    }
                }
                li.active {
                    background: #fff0e7;
                    a,
                    .tag_two,
                    .tag {
                        color: #ff705b;
                    }
                    a.wasDay {
                        background: none;
                        width: auto;
                    }
                }
                li.curdaynoactive {
                    background: #fff0e7;
                    opacity: 0.6;
                    a,
                    .tag_two,
                    .tag {
                        color: #ff705b;
                    }
                }
            }
        }
    }

    .date_zhankai {
        width: 51px;
        height: 17px;
        background: url(./asset/images/data_more.png) no-repeat;
        cursor: pointer;
        z-index: 1;
        margin-top: -2px;
    }
    .date_shouqi {
        width: 51px;
        height: 17px;
        background: url(./asset/images/date_shouqi.png) no-repeat;
        cursor: pointer;
        z-index: 1;
        margin-top: -2px;
    }
}
</style>
