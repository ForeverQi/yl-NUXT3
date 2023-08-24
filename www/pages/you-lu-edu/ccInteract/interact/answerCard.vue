<template>
    <div class="result-box">
        <i class="arrow"></i>
        <div class="status-box">
            <ul class="list">
                <li>
                    <span class="mark correct"></span>
                    正确
                </li>
                <li>
                    <span class="mark error"></span>
                    错误
                </li>
            </ul>
        </div>
        <div class="page-list">
            <ul class="list">
                <li v-for="(question, index) in questions" :key="index" :class="question.answerState == 2 ? 'correct' : 'error'">{{ index + 1 }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'answerCard',
    props: {
        questions: [],
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {},
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

@media screen and (min-width: 1000px) {
    .result-box {
        position: absolute;
        top: 55px;
        left: -120px;
        width: 425px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;

        .arrow {
            position: absolute;
            left: 50%;
            margin-left: -80px;
            top: -20px;
            width: 0;
            height: 0;
            border-width: 10px;
            border-style: solid;
            border-color: transparent transparent #ffffff transparent;
        }

        .status-box {
            border-bottom: 1px solid #f5f5f5;
            margin: 0px 15px;
            padding: 5px 0px;
            cursor: text;

            .list {
                display: flex;
                flex-direction: row;

                li {
                    border: none;
                    color: #333333;
                    font-size: 14px;
                    margin-right: 15px;
                    display: flex;
                    align-items: center;

                    .mark {
                        width: 14px;
                        height: 14px;
                        display: inline-block;
                        border-radius: 1px;
                        margin-right: 6px;

                        &.correct {
                            background: #51d55a;
                        }

                        &.error {
                            background: #ed5736;
                        }

                        &.nodone {
                            border: 1px solid rgba(221, 221, 221, 1);
                        }
                    }
                }
            }
        }

        .page-list {
            padding: 15px 10px 0px;
            min-height: 105px;
            max-height: 255px;
            overflow: auto;

            .list {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;

                li {
                    width: 30px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    border-radius: 2px;
                    border: 1px solid rgba(221, 221, 221, 1);
                    color: #999999;
                    margin: 0px 5px 10px;
                    font-size: 14px;

                    &.correct {
                        background: #51d55a;
                        color: #ffffff;
                    }

                    &.error {
                        background: #ed5736;
                        color: #ffffff;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 1000px) {
    .result-box {
        position: absolute;
        top: 55px;
        left: -120px;
        width: 265px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding-top: 5px;

        .arrow {
            position: absolute;
            left: 50%;
            margin-left: -5px;
            top: -20px;
            width: 0;
            height: 0;
            border-width: 10px;
            border-style: solid;
            border-color: transparent transparent #ffffff transparent;
        }

        .status-box {
            border-bottom: 1px solid #f5f5f5;
            margin: 0px 15px;
            padding: 10px 0px;
            cursor: text;

            .list {
                display: flex;
                flex-direction: row;

                li {
                    border: none;
                    color: #333333;
                    font-size: 14px;
                    margin-right: 15px;
                    display: flex;
                    align-items: center;

                    .mark {
                        width: 14px;
                        height: 14px;
                        display: inline-block;
                        border-radius: 1px;
                        margin-right: 6px;

                        &.correct {
                            background: #51d55a;
                        }

                        &.error {
                            background: #ed5736;
                        }

                        &.nodone {
                            border: 1px solid rgba(221, 221, 221, 1);
                        }
                    }
                }
            }
        }

        .page-list {
            padding: 15px 10px 0px;
            min-height: 225px;
            max-height: 225px;
            overflow: auto;

            .list {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;

                li {
                    width: 30px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    border-radius: 2px;
                    border: 1px solid rgba(221, 221, 221, 1);
                    color: #999999;
                    margin: 0px 5px 10px;
                    font-size: 14px;

                    &.correct {
                        background: #51d55a;
                        color: #ffffff;
                    }

                    &.error {
                        background: #ed5736;
                        color: #ffffff;
                    }
                }
            }
        }
    }
}
</style>
