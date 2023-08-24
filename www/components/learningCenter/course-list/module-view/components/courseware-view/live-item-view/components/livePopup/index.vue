<template>
    <!--提醒框-->
    <div class="tip-poup-box flex ai-center jc-center">
        <div class="tip-poup">
            <div class="title">
                <span v-if="curTask.coursewareType == 'L'">直播提醒</span>
                <span v-if="curTask.coursewareType == 'F'">面授提醒</span>
                <img src="./asset/images/guanbi.png" alt="" class="closed pointer" @click.stop="closeTipPoup" />
            </div>
            <div class="middle-box flex flex-between ai-center">
                <p class="name">{{ curTask.coursewareName }}</p>
                <p class="state wks" v-if="curTask.remindStatus == 'N'">未开始</p>
                <p class="state jr" v-if="curTask.remindStatus == 'T'">今日</p>
                <p class="state wq" v-if="curTask.remindStatus == 'Y'">
                    <img src="./asset/images/wq.png" alt="" />
                </p>
            </div>
            <div class="cnt-box">
                <p class="flex ai-center">
                    <img src="./asset/images/tip-1.png" alt="" class="mr5" />
                    <span class="day">{{ curDay(curTask.coursewareStartTime) }}</span>
                    |
                    <span class="time">{{ curStartTime(curTask.coursewareStartTime) }} - {{ curEndTime(curTask.coursewareEndTime) }}</span>
                </p>
                <p class="flex ai-center" v-if="curTask.coursewareType == 'F' && curTask.address">
                    <img src="./asset/images/tip-2.png" alt="" class="mr5" />
                    {{ curTask.address }}
                </p>
                <p class="flex ai-center" v-if="curTask.coursewareType == 'L' && curTask.teacherName">
                    <img src="./asset/images/tip-3.png" alt="" class="mr5" />
                    主讲老师：{{ curTask.teacherName }}
                </p>
                <p class="flex ai-center" v-if="curTask.coursewareType == 'F' && curTask.teacherName">
                    <img src="./asset/images/tip-3.png" alt="" class="mr5" />
                    主讲老师：{{ curTask.teacherName }}
                </p>
                <p class="flex ai-start">
                    <img src="./asset/images/tip-4.png" alt="" class="mr5 mt4" />
                    课程来源：{{ curTask.coursewareSource }}
                </p>
            </div>
            <div class="deal-box flex jc-center">
                <span class="flex btn jc-center ai-center pointer" v-if="curTask.coursewareType == 'F'" @click="toDetail(curTask)">查看课表</span>
                <span class="btn flex jc-center ai-center pointer" v-if="curTask.coursewareType == 'L'" @click="toDetail(curTask)">查看直播</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'livePopup',
    props: {
        curTask: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {};
    },
    created() {},
    methods: {
        //面授/直播 弹窗跳转
        toDetail(item) {
            if (item.coursewareType == 'L') {
                window.open(`${item.coursewareLiveUrl}&form=allTask`);
                return;
            }
            if (item.coursewareType == 'F') {
                window.open(`/learningCenter/index/learningTimetable?coursewareStarttime=${item.coursewareStartTime}`);
            }
        },
        //关闭 面授/直播 弹窗
        closeTipPoup() {
            this.$emit('closeTipPoup', false);
        },
        curDay(coursewareStarttime) {
            if (!coursewareStarttime) {
                return '';
            }
            return coursewareStarttime.split(' ')[0];
        },
        curStartTime(coursewareStarttime) {
            if (!coursewareStarttime) {
                return '';
            }
            let time = coursewareStarttime.split(' ')[1];
            let index = time.lastIndexOf(':');
            return time.substring(0, index);
        },
        curEndTime(coursewareEndtime) {
            if (!coursewareEndtime) {
                return '';
            }
            let time = coursewareEndtime.split(' ')[1];
            let index = time.lastIndexOf(':');
            return time.substring(0, index);
        },
    },
};
</script>

<style lang="less" scoped>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video,
input {
    box-sizing: border-box;
}
.deal-box {
    display: flex;
    justify-content: center;
    align-items: center;
}
.tip-poup-box {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    .tip-poup {
        width: 475px;
        min-height: 310px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 3px 7px 27px 0px rgba(128, 128, 128, 0.33);
        border-radius: 4px;
        padding: 20px 25px;

        .title {
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 15px;
            background: url('./asset/images/tip-tit.png') no-repeat left bottom;
            font-size: 16px;
            color: #333333;
            position: relative;
            line-height: normal;

            .closed {
                position: absolute;
                right: 0px;
                top: 5px;
                cursor: pointer;
            }
        }

        .middle-box {
            height: 40px;
            position: relative;
            line-height: 40px;

            .name {
                font-size: 14px;
                color: #333333;
            }

            .wks {
                position: absolute;
                right: 13px;
                top: 0px;
                background: url('./asset/images/wks.png');
                display: inline-block;
                width: 54px;
                height: 31px;
                line-height: 31px;
                color: #ffffff;
                font-size: 14px;
                text-align: center;
            }

            .wq {
                position: absolute;
                right: 13px;
                top: 8px;
            }

            .jr {
                position: absolute;
                right: 13px;
                top: 0px;
                background: url('./asset/images/jr.png');
                display: inline-block;
                width: 43px;
                height: 31px;
                line-height: 25px;
                color: #ffffff;
                font-size: 14px;
                text-align: center;
            }
        }

        .cnt-box {
            background: #f9f9f9;
            padding: 20px 15px;
            color: #666666;

            p {
                padding-bottom: 10px;
                line-height: normal;

                .day {
                    margin-right: 8px;
                }

                .time {
                    margin-left: 8px;
                    color: #e25d5b;
                }
            }
        }

        .btn {
            width: 100px;
            height: 28px;
            background: linear-gradient(90deg, rgba(231, 57, 40, 1) 0%, rgba(240, 121, 99, 1) 100%);
            border-radius: 4px;
            color: #ffffff;
            font-size: 14px;
            margin-top: 22px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            &.gray {
                background: #cccccc;
            }
        }
    }
}

.mt4 {
    margin-top: 4px;
}
</style>
