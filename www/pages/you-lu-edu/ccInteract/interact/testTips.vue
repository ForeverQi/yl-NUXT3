<template>
    <!--试题测试提示块-->
    <div class="question_test_tip" :class="model == 'P' ? 'question_test_tip_p' : ''">
        <div><img src="./asset/images/1.gif" class="tip_img" /></div>
        <div class="tip_text">
            做
            <span>{{ paper.questions.length }}</span>
            道题
        </div>
        <div class="tip_txt">检验一下刚才学习的知识点吧！</div>
        <div class="time">
            <img class="count_img" src="./asset/images/time-icon.png" />
            建议用时：{{ paper.time.all }}分钟
        </div>
        <div>
            <span class="tip_btn" @click="startTest">开始作答</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'test',
    props: {
        paper: {},
    },
    data() {
        return {
            model: '',
        };
    },
    mounted() {
        //预览模式判断
        let vm = this;
        vm.model = vm.$route.query.model ? vm.$route.query.model : '';
    },
    methods: {
        startTest() {
            this.$emit('startTest');
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

@media screen and (min-width: 1000px) {
    /*试题测试提示块*/
    .question_test_tip {
        position: absolute;
        width: 100%;
        height: 100%;
        min-width: 800px;
        /* min-height: 500px;*/
        min-height: 620px;
        background: url('./asset/images/q-bg.png');
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        text-align: center;
        justify-content: center;

        .tip_img {
            width: 325px;
            margin-top: -45px;
        }

        .tip_text {
            padding-top: 10px;
            font-size: 36px;
            color: #ffffff;

            span {
                color: #ed5736;
                font-size: 60px;
                margin: 0px 15px;
                font-weight: bold;
            }
        }

        .tip_txt {
            margin-top: 20px;
            font-size: 36px;
            color: #ffffff;
        }

        .time {
            margin-top: 72px;
            font-size: 22px;
            color: #ffffff;

            .count_img {
                width: 21px;
                height: 21px;
                margin-right: 10px;
                vertical-align: middle;
            }
        }

        .tip_btn {
            display: inline-block;
            width: 270px;
            height: 54px;
            background: linear-gradient(90deg, rgba(237, 87, 54, 1) 0%, rgba(213, 46, 38, 1) 100%);
            box-shadow: 1px 11px 27px 0px rgba(27, 35, 49, 0.2);
            border-radius: 30px;
            color: #ffffff;
            text-align: center;
            line-height: 54px;
            margin-top: 30px;
            font-size: 26px;
            cursor: pointer;
        }
    }

    .question_test_tip_p {
        min-height: 600px;
        .tip_img {
            width: 260px;
            margin-top: -35px;
        }
        .time {
            margin-top: 52px;
            font-size: 22px;
            color: #ffffff;
        }
    }
}

@media screen and (max-width: 1000px) {
    .question_test_tip {
        position: absolute;
        width: 100%;
        height: 100%;
        min-width: 800px;
        min-height: 500px;
        background: url('./asset/images/q-bg.png');
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        text-align: center;
        justify-content: center;

        .tip_img {
            width: 240px;
            margin-top: -40px;
        }

        .tip_text {
            /*font-size: 40px;*/
            font-size: 28px;
            color: #ffffff;

            span {
                color: #ed5736;
                font-size: 46px;
                margin: 0px 15px;
            }
        }

        .tip_txt {
            margin-top: 20px;
            font-size: 28px;
            color: #ffffff;
        }

        .time {
            margin-top: 50px;
            font-size: 18px;
            color: #ffffff;

            .count_img {
                width: 21px;
                height: 21px;
                margin-right: 10px;
                vertical-align: middle;
            }
        }

        .tip_btn {
            display: inline-block;
            width: 230px;
            height: 50px;
            background: linear-gradient(90deg, rgba(237, 87, 54, 1) 0%, rgba(213, 46, 38, 1) 100%);
            box-shadow: 1px 11px 27px 0px rgba(27, 35, 49, 0.2);
            border-radius: 30px;
            color: #ffffff;
            text-align: center;
            line-height: 50px;
            margin-top: 30px;
            cursor: pointer;
        }
    }
}
</style>
