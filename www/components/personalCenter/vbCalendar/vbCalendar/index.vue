<template>
    <!-- 日历 -->
    <div class="mycontainer">
        <input type="text" placeholder="请选择日期" class="mycontainer_input" :id="id" v-model="value" readonly />
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'vbCalendar',
    props: {
        type: {
            type: String,
            default: 'date',
        },
        defaultDate: {
            type: Number,
            default: new Date().getTime(),
        },
    },

    data() {
        return {
            defaultDateCopy: '',
            id: 'date' + new Date().getTime() + Math.floor(Math.random() * 100000),
            value: '',
        };
    },
    watch: {
        defaultDate: {
            handler(date) {
                if (this.type == 'date') {
                    if (date) {
                        this.defaultDateCopy = new Date(date).toLocaleDateString().split('/');
                        this.value = this.defaultDateCopy.join('-');
                    } else {
                        this.value = '';
                    }
                }
                if (this.type == 'datetime') {
                    let stayDate = new Date(date);
                    this.defaultDateCopy = [stayDate.getFullYear(), stayDate.getMonth() + 1, stayDate.getDate(), stayDate.getHours(), stayDate.getMinutes()];
                    this.value =
                        stayDate.getFullYear() +
                        '-' +
                        (stayDate.getMonth() + 1) +
                        '-' +
                        stayDate.getDate() +
                        ' ' +
                        stayDate.getHours() +
                        ':' +
                        (stayDate.getMinutes() < 10 ? '0' + stayDate.getMinutes() : stayDate.getMinutes());
                }
            },
            immediate: true,
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            let _this = this;
            (function (o) {
                'use strict';
                'function' == typeof define && define.amd ? define(['jquery'], o) : o(jQuery);
            })(function (o) {
                var t,
                    i = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                    e = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                    n = new Date(),
                    p = n.getFullYear(),
                    l = n.getMonth(),
                    a = n.getDate(),
                    u = n.getHours(),
                    v = n.getMinutes(),
                    s = null,
                    r = { type: 'date' },
                    c = !1;
                o.extend(o.fn, {
                    datetime: function (d) {
                        return (
                            this.each(function () {
                                function h() {
                                    var t = o(
                                        '<div class="dateTimeWrap"><div class="datePart"><div class="dateTimeHead"><span year="2019" month="7" id="dateTime"><select class="year" name="yearSelect" id="yearSelect"><option value="1920">1920年</option><option value="1921">1921年</option><option value="1922">1922年</option><option value="1923">1923年</option><option value="1924">1924年</option><option value="1925">1925年</option><option value="1926">1926年</option><option value="1927">1927年</option><option value="1928">1928年</option><option value="1929">1929年</option><option value="1930">1930年</option><option value="1931">1931年</option><option value="1932">1932年</option><option value="1933">1933年</option><option value="1934">1934年</option><option value="1935">1935年</option><option value="1936">1936年</option><option value="1937">1937年</option><option value="1938">1938年</option><option value="1939">1939年</option><option value="1940">1940年</option><option value="1941">1941年</option><option value="1942">1942年</option><option value="1943">1943年</option><option value="1944">1944年</option><option value="1945">1945年</option><option value="1946">1946年</option><option value="1947">1947年</option><option value="1948">1948年</option><option value="1949">1949年</option><option value="1950">1950年</option><option value="1951">1951年</option><option value="1952">1952年</option><option value="1953">1953年</option><option value="1954">1954年</option><option value="1955">1955年</option><option value="1956">1956年</option><option value="1957">1957年</option><option value="1958">1958年</option><option value="1959">1959年</option><option value="1960">1960年</option><option value="1961">1961年</option><option value="1962">1962年</option><option value="1963">1963年</option><option value="1964">1964年</option><option value="1965">1965年</option><option value="1966">1966年</option><option value="1967">1967年</option><option value="1968">1968年</option><option value="1969">1969年</option><option value="1970">1970年</option><option value="1971">1971年</option><option value="1972">1972年</option><option value="1973">1973年</option><option value="1974">1974年</option><option value="1975">1975年</option><option value="1976">1976年</option><option value="1977">1977年</option><option value="1978">1978年</option><option value="1979">1979年</option><option value="1980">1980年</option><option value="1981">1981年</option><option value="1982">1982年</option><option value="1983">1983年</option><option value="1984">1984年</option><option value="1985">1985年</option><option value="1986">1986年</option><option value="1987">1987年</option><option value="1988">1988年</option><option value="1989">1989年</option><option value="1990">1990年</option><option value="1991">1991年</option><option value="1992">1992年</option><option value="1993">1993年</option><option value="1994">1994年</option><option value="1995">1995年</option><option value="1996">1996年</option><option value="1997">1997年</option><option value="1998">1998年</option><option value="1999">1999年</option><option value="2000">2000年</option><option value="2001">2001年</option><option value="2002">2002年</option><option value="2003">2003年</option><option value="2004">2004年</option><option value="2005">2005年</option><option value="2006">2006年</option><option value="2007">2007年</option><option value="2008">2008年</option><option value="2009">2009年</option><option value="2010">2010年</option><option value="2011">2011年</option><option value="2012">2012年</option><option value="2013">2013年</option><option value="2014">2014年</option><option value="2015">2015年</option><option value="2016">2016年</option><option value="2017">2017年</option><option value="2018">2018年</option><option value="2019">2019年</option><option value="2020">2020年</option><option value="2021">2021年</option><option value="2022">2022年</option><option value="2023">2023年</option><option value="2024">2024年</option><option value="2025">2025年</option><option value="2026">2026年</option><option value="2027">2027年</option><option value="2028">2028年</option><option value="2029">2029年</option><option value="2030">2030年</option><option value="2031">2031年</option><option value="2032">2032年</option><option value="2033">2033年</option><option value="2034">2034年</option><option value="2035">2035年</option><option value="2036">2036年</option><option value="2037">2037年</option><option value="2038">2038年</option><option value="2039">2039年</option><option value="2040">2040年</option><option value="2041">2041年</option><option value="2042">2042年</option><option value="2043">2043年</option><option value="2044">2044年</option><option value="2045">2045年</option><option value="2046">2046年</option><option value="2047">2047年</option><option value="2048">2048年</option><option value="2049">2049年</option><option value="2050">2050年</option></select><select class="month" name="monthSelect" id="monthSelect"><option value="0">一月</option><option value="1">二月</option><option value="2">三月</option><option value="3">四月</option><option value="4">五月</option><option value="5">六月</option><option value="6">七月</option><option value="7">八月</option><option value="8">九月</option><option value="9">十月</option><option value="10">十一月</option><option value="11">十二月</option></select></span><div class="changeMonth"><span id="pre"><</span> <span id="next">></span></div></div><div><ul><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul><ul id="dayDat"></ul></div><div class="dateTimeFoot"><span class="selTime">选择时间</span><span id="close">关闭</span><span id="selcurday">今天</span></div></div><div class="timePart" style="display:none"><ul><li id="selHour"><p>时</p><ol></ol></li><li id="selMinute"><p>分</p><ol></ol></li></ul><div class="timeFooter"><span class="selTime">选择日期</span><span id="ensure">确定</span><span id="curTime">当前时间</span></div></div></div>'
                                    );
                                    o('body').append(t), (c = !0);
                                }
                                function m(o, t) {
                                    var i = new Date(t, o, 1);
                                    return i.getDay();
                                }
                                function f(o, t) {
                                    var n = t % 4,
                                        p = t % 100,
                                        l = t % 400;
                                    return (0 == n && 0 != p) || 0 == l ? i[o] : e[o];
                                }
                                function g() {
                                    var t = '',
                                        i = f(l, p);
                                    a > i && (a = i), console.log(a);
                                    for (var e, n = m(l, p), u = 0; u < n; u++) t += '<li></li>';
                                    for (u = 1; u <= i; u++) (e = u == a ? "class = 'curDay'" : ''), (t += '<li ' + e + '>' + u + '</li>');
                                    o('#dayDat').html(t);
                                }
                                function y() {
                                    for (var t = '', i = '', e = 0; e < 24; e++)
                                        e < 10 && (e = '0' + e), (t += e == u ? "<li class='cur'>" + e + '</li>' : '<li>' + e + '</li>');
                                    for (e = 0; e < 60; e++) e < 10 && (e = '0' + e), (i += e == v ? "<li class='cur'>" + e + '</li>' : '<li>' + e + '</li>');
                                    o('#selHour ol').html(t), o('#selMinute ol').html(i);
                                }
                                function T() {
                                    o('.dateTimeWrap').show();

                                    document.addEventListener('click', function () {
                                        let dateTimeWrap = document.getElementsByClassName('dateTimeWrap')[0];
                                        if (dateTimeWrap && dateTimeWrap.offsetLeft > 0) {
                                            var ta = event.target;
                                            while (ta.className != 'dateTimeWrap' && ta.className != 'mycontainer_input' && ta != document) {
                                                // debugger

                                                ta = ta.parentNode;
                                            }
                                            console.log(ta.className);
                                            if (ta.className != 'dateTimeWrap' && ta.className != 'mycontainer_input') {
                                                o('.dateTimeWrap').hide();
                                            }
                                        }
                                        if (
                                            event.target.className &&
                                            event.target.className == 'mycontainer_input' &&
                                            dateTimeWrap &&
                                            !dateTimeWrap.offsetLeft
                                        ) {
                                            T();
                                        }
                                    });

                                    var i = t.type;
                                    if ('date' != i) {
                                        y(), o('.datePart').hide().siblings('.timePart').show();
                                        var e = o('#selHour .cur');
                                        o('#selHour ol').scrollTop(
                                            e.offset().top - o('#selHour ol').offset().top + o('#selHour ol').scrollTop() - e.outerHeight()
                                        );
                                        var n = o('#selMinute .cur');
                                        o('#selMinute ol').scrollTop(
                                            n.offset().top - o('#selMinute ol').offset().top + o('#selMinute ol').scrollTop() - n.outerHeight()
                                        );
                                    }
                                    'time' != i && (g(), o('.datePart').show().siblings('.timePart').hide(), o('#yearSelect').val(p), o('#monthSelect').val(l)),
                                        'datetime' == i ? o('.selTime').show() : o('.selTime').hide();
                                }
                                function M() {
                                    var o = t.type,
                                        i = t.value,
                                        e = !0;
                                    return (
                                        i &&
                                            i.length > 0 &&
                                            ('datetime' == o &&
                                                (5 != i.length ||
                                                    i[0] > 2050 ||
                                                    i[0] < 1920 ||
                                                    i[1] > 12 ||
                                                    i[1] < 1 ||
                                                    i[2] > 31 ||
                                                    i[2] < 1 ||
                                                    i[3] > 23 ||
                                                    i[3] < 1 ||
                                                    i[4] > 59 ||
                                                    i[4] < 1) &&
                                                (e = !1),
                                            'date' == o &&
                                                (3 != i.length || i[0] > 2050 || i[0] < 1920 || i[1] > 12 || i[1] < 1 || i[2] > 31 || i[2] < 1) &&
                                                (e = !1),
                                            'time' == o && (2 != i.length || i[0] > 23 || i[0] < 1 || i[1] > 59 || i[1] < 1) && (e = !1)),
                                        e
                                    );
                                }
                                function P() {
                                    var i,
                                        e,
                                        n = t.type;
                                    ((i =
                                        'date' == n
                                            ? p + '-' + (parseInt(l) + 1) + '-' + a
                                            : 'time' == n
                                            ? u + ':' + v
                                            : p + '-' + (parseInt(l) + 1) + '-' + a + ' ' + u + ':' + v),
                                    s.val(i),
                                    o('.dateTimeWrap').hide(),
                                    t.success && 'function' == typeof t.success) &&
                                        ((e = 'date' == n ? [p, parseInt(l) + 1, parseInt(a)] : 'time' == n ? [u, v] : [p, parseInt(l) + 1, parseInt(a), u, v]),
                                        t.success(e));
                                }
                                var S = o(this);
                                (t = o.extend(!0, {}, r, d)),
                                    c || h(),
                                    o('#selcurday,#close,#dayDat,.changeMonth span,.selTime').unbind('click'),
                                    o('#yearSelect,#monthSelect').unbind('change'),
                                    o('#yearSelect,#monthSelect').change(function () {
                                        (l = o('#monthSelect').val()), (p = o('#yearSelect').val()), g();
                                    }),
                                    o('.changeMonth span').click(function () {
                                        'pre' == this.id ? ((l -= 1), -1 == l && ((l = 11), (p -= 1))) : ((l += 1), 12 == l && ((l = 0), (p += 1))),
                                            g(),
                                            o('#yearSelect').val(p),
                                            o('#monthSelect').val(l);
                                    }),
                                    o('#selcurday').click(function () {
                                        var i = new Date();
                                        (p = i.getFullYear()),
                                            (l = i.getMonth()),
                                            (a = i.getDate()),
                                            g(),
                                            o('#yearSelect').val(p),
                                            o('#monthSelect').val(l),
                                            'datetime' != t.type ? P() : o('.datePart').hide().siblings('.timePart').show();
                                    }),
                                    o('#close').click(function () {
                                        o('.dateTimeWrap').hide();
                                    }),
                                    o('#dayDat').on('click', 'li', function () {
                                        (a = o(this).html()), 'datetime' != t.type ? P() : o('.datePart').hide().siblings('.timePart').show();
                                    }),
                                    o('.selTime').click(function () {
                                        '选择时间' == o(this).html()
                                            ? o('.datePart').hide().siblings('.timePart').show()
                                            : o('.datePart').show().siblings('.timePart').hide();
                                    }),
                                    o('.timePart ol,.timeFooter #ensure,.timeFooter #curTime').unbind('click'),
                                    o('.timePart ol').on('click', 'li', function () {
                                        o(this).addClass('cur').siblings('li').removeClass('cur');
                                        var t = o(this).parent();
                                        t.animate({ scrollTop: o(this).offset().top - t.offset().top + t.scrollTop() - o(this).outerHeight() }, 100);
                                    }),
                                    o('.timeFooter #ensure').click(function () {
                                        (u = o('#selHour ol .cur').html()), (v = o('#selMinute ol .cur').html()), P(), o('.dateTimeWrap').hide();
                                    }),
                                    o('.timeFooter #curTime').click(function () {
                                        (u = n.getHours()),
                                            (v = n.getMinutes()),
                                            parseInt(u) < 10 && (u = '0' + u),
                                            parseInt(v) < 10 && (v = '0' + v),
                                            y(u, v),
                                            P();
                                    }),
                                    S.click(function () {
                                        if (((t = o.extend(!0, {}, r, d)), !M())) return alert('参数错误'), !1;
                                        var i = this.value;
                                        if (i) {
                                            i = i.replace(/-/g, '/');
                                            var e = new Date(i);
                                        }
                                        'date' == t.type
                                            ? this.value
                                                ? ((l = e.getMonth()), (p = e.getFullYear()), (a = e.getDate()))
                                                : ((l = t.value[1] - 1), (p = t.value[0]), (a = t.value[2]))
                                            : 'time' == t.type
                                            ? this.value
                                                ? ((u = this.value.split(':')[0]), (v = this.value.split(':')[1]))
                                                : ((v = t.value[1]), (u = t.value[0]))
                                            : this.value
                                            ? ((l = e.getMonth()), (p = e.getFullYear()), (a = e.getDate()), (u = e.getHours()), (v = e.getMinutes()))
                                            : ((l = t.value[1] - 1), (p = t.value[0]), (a = t.value[2]), (v = t.value[4]), (u = t.value[3])),
                                            (s = o(this)),
                                            T();
                                        var n = S.offset().left,
                                            c = S.offset().top + S.outerHeight() + 4;
                                        o('.dateTimeWrap').css({ background: t.background, top: c, left: n });
                                    });
                            }),
                            this
                        );
                    },
                });
            });

            let dateTimeWrap = document.querySelector('.dateTimeWrap');

            if (dateTimeWrap) {
                return;
            }

            $('#' + this.id).datetime({
                type: _this.type, //'date'  'datetime带时间的'
                value: new Date().toLocaleDateString().split('/'),
                success: function (res) {
                    let date;
                    if (_this.type == 'date') {
                        date = res.join('-');
                    }
                    if (_this.type == 'datetime') {
                        // date = new Date(res[0],res[1],res[2],res[3],res[4]).getTime()
                        date = res[0] + '-' + res[1] + '-' + res[2] + ' ' + res[3] + ':' + res[4];
                    }
                    _this.$emit('dateChage', date);
                },
            });
        },
    },
};
</script>
<style lang="less">
ol {
    border: 0;
    font-weight: normal;
}
.clearfix {
    clear: both;
    zoom: 1;
}
.clearfix:after {
    display: block;
    clear: both;
    content: '\0020';
    visibility: hidden;
    height: 0;
}
.dateTimeWrap {
    display: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    background: #fff;
    box-shadow: 0 0 10px 0 #ccc;
    padding: 10px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    font-size: 14px;
    color: #000;
    width: 240px;
}
.datePart li.curDay {
    color: #1ea0fa;
}
#dayDat li:hover {
    border: 2px double #fff;
    background: #1ea0fa;
    color: #fff;
}
#dateTime {
    *float: left;
}
.dateTimeHead {
    *overflow: hidden;
    padding: 8px 0px 4px;
}
.datePart li {
    border: 2px double transparent;
    float: left;
    cursor: default;
    vertical-align: middle;
    width: 30px;
    height: 26px;
    text-align: center;
    line-height: 26px;
}
.datePart ul {
    overflow: hidden;
}
.changeMonth {
    float: right;
    display: none;
}
.changeMonth #pre,
.changeMonth #next {
    display: inline-block;
    width: 20px;
    height: 20px;
    color: #333;
    background: #fff;
    text-align: center;
    line-height: 20px;
}
.changeMonth #next {
    margin-left: 10px;
}
.dateTimeFoot span,
.timeFooter span {
    cursor: pointer;
    display: inline-block;
    background: #fff;
    color: #333;
    height: 20px;
    line-height: 20px;
    width: 50px;
    text-align: center;
    margin-left: 6px;
    float: right;
}
.timePart {
    text-align: center;
    color: #333;
    line-height: 22px;
}
.timePart p,
.timePart ul {
    background: #fff;
}
.timePart > ul > li {
    float: left;
    width: 119px;
    background: #fff;
    color: #333;
    border: 1px solid #ccc;
    border-right: none;
}
.timePart ul {
    overflow: hidden;
}
.timePart > ul > li p {
    line-height: 30px;
    border-bottom: 1px solid #ccc;
}
.timePart ol {
    height: 180px;
    overflow-y: hidden;
    *overflow-y: auto;
    overflow-x: hidden;
}
.timePart ol:hover {
    overflow-y: auto;
}
.timePart ol:hover li {
    padding-left: 17px;
    *padding-left: 0;
}
.timePart ol li {
    line-height: 30px;
}
.timePart ol li.cur {
    background: #1ea0fa;
    color: #fff;
}
.dateTimeFoot,
.timeFooter {
    overflow: hidden;
    margin-top: 10px;
    height: 20px;
}
.timeFooter span {
    width: 80px;
}
.timeFooter #ensure {
    width: 50px;
}
.dateTimeFoot .selTime,
.timeFooter .selTime {
    float: left;
    margin-left: 0;
    display: none;
}
.selTime {
    width: 80px !important;
}
#yearSelect {
    margin-right: 6px;
}
.darkgrey {
    color: #d0d0d0 !important;
}
.mycontainer {
    height: 100%;
    width: 100%;
    display: flex;
    input {
        height: 100%;
        width: 100%;
        min-height: 24px;
        border: 1px solid #ccc;
        line-height: 100%;
        padding-left: 10px;
    }
}
</style>
