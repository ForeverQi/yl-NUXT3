<template>
    <!--试题测试块-->
    <div class="question_box">
        <div class="header">
            <div class="header_l">
                <img src="./asset/images/u34.png" class="img" />
                做道题检验一下刚才学习的知识点吧：
            </div>
            <div class="header_r">
                <img class="count_img" src="./asset/images/time-icon.png" />
                计时：{{ durationTime }}
            </div>
        </div>
        <div class="question">
            <template v-for="(question, index) in questions">
                <div :key="index" v-if="index + 1 == curPage">
                    <div class="question_cnt">
                        <div class="question_tg" v-if="question.hasQuestionstem">
                            <co-parse v-if="question.questionstem" :article="question.questionstem.title" />
                        </div>
                        <div class="question_title">
                            <span class="xh">{{ index + 1 }}、</span>
                            <span class="tx" v-if="question.type == 'S'">【单选题】</span>
                            <span class="tx" v-if="question.type == 'M'">【多选题】</span>
                            <span class="tx" v-if="question.type == 'I'">【不定项选择题】</span>
                            <span class="tx" v-if="question.type == 'J'">【判断题】</span>
                            <span class="tx" v-if="question.type == 'F'">【填空题】</span>
                            <span class="tx" v-if="question.type == 'O'">【主观题】</span>
                            <span class="tx" v-if="question.type == 'A'">【案例分析题】</span>
                            <span class="tx" v-if="question.type == 'C'">【配伍题】</span>
                            <co-parse :article="question.title" />
                            <!--{{question.answer}}-->
                        </div>
                        <div class="question_answers">
                            <div v-if="question.type == 'S' || question.type == 'J'" class="question_answers_box">
                                <div
                                    class="item"
                                    v-for="option in question.options"
                                    :key="option.questionId"
                                    @click="setAnswer(question, option)"
                                    :class="option.check ? 'active' : ''"
                                >
                                    <span class="type" v-if="question.type != 'J'">{{ option.type }}.</span>
                                    <co-parse :article="option.content" />
                                </div>
                            </div>
                            <div v-if="question.type == 'M' || question.type == 'I'" class="question_answers_box">
                                <label v-for="option in question.options" :key="option.questionId">
                                    <div class="item" :class="option.check ? 'active' : ''">
                                        <span class="type">{{ option.type }}.</span>
                                        <input
                                            type="checkbox"
                                            :value="option.type"
                                            v-model="multipleChecked"
                                            @change="setAnswer(question, multipleChecked)"
                                            class="multiple-check"
                                        />
                                        <co-parse :article="option.content" />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <!--<div v-if="question.type=='O' || question.type=='A'">
                <textarea v-model="message" placeholder="请输入你的答案" @click="setAnswer(question,option)"></textarea>
                </div>-->
                </div>
            </template>
        </div>
        <!--分页-->
        <div class="pages-box">
            <div class="pages">
                <template v-for="n in pageSize">
                    <div class="page" :key="n" :class="[{ check: questions[n - 1].answer }, { active: n == curPage }]" v-if="n <= 15" @click="toCurPage(n)">
                        {{ n }}
                    </div>
                </template>
                <div v-if="pageSize > 15" class="page show-page-popup">
                    <span class="more" @click.stop.capture="togglePagePopup">...</span>
                    <div class="page-popup" v-if="isPagePopup">
                        <i class="arrow"></i>
                        <div class="status-box">
                            <ul class="list">
                                <li>
                                    <span class="mark cur"></span>
                                    当前
                                </li>
                                <li>
                                    <span class="mark done"></span>
                                    已做
                                </li>
                                <li>
                                    <span class="mark nodone"></span>
                                    未做
                                </li>
                            </ul>
                        </div>
                        <div class="page-list">
                            <ul class="list">
                                <li
                                    v-for="n in pageSize"
                                    :key="n"
                                    :class="[{ check: questions[n - 1].answer }, { active: n == curPage }]"
                                    @click="toCurPage(n)"
                                >
                                    {{ n }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <template v-if="pageSize >= 1">
                <span class="next-btn" v-if="pageSize == curPage" @click="submit">提交</span>
                <span class="next-btn" v-else @click="toCurPage(curPage + 1)">下一题</span>
            </template>
        </div>
    </div>
</template>

<script>
import PaperUtil from '~/www/common/paper-class/js/PaperUtil.js';
import timer from '~/www/common/paper-class/js/doingitem.timer.js';
import CoParse from '@/www/components/vbParse';

export default {
    name: 'singleChoice',
    components: { CoParse },
    props: {
        paperId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            paper: null,
            questions: [],
            curPage: 1,
            remainingTime: '0:00:00', //剩余时间
            durationTime: '0:00:00', //考试时间
            multipleChecked: [],
            isPagePopup: false,
            pageSize: '',
            loading: null,
        };
    },
    mounted() {
        var vm = this;
        document.querySelector('.question_box').addEventListener('click', function () {
            vm.isPagePopup && (vm.isPagePopup = false);
        });
        //清空计时器
        vm.timerpause();
        //初始化
        vm.init(this.paperId);
    },

    methods: {
        ...timer,
        //初始化
        init(paperId) {
            var vm = this;
            let paper; //试卷对象
            /*Mask.showLoading();*/
            vm.loading = vm.$baseUI.loading();
            let paperService = PaperUtil.initPaper({
                paperId,
                service: window,
                options: {
                    sourceType: 'YOULU',
                },
            });
            paper = paperService.getInstance();

            //---------------------paperService-----------------------//
            paperService
                .loadBaseInfo(function () {
                    //加载试卷详情
                })
                .loadQuestions(function () {
                    //加载试卷所有试题
                    vm.questions = paper.getQuestions();
                    vm.pageSize = vm.questions.length;
                })
                .end(function () {
                    vm.loading.close();
                    vm.paper = paper;
                    //考试计时
                    vm.startKs();
                });
        },
        //设置试题答案
        setAnswer(question, option) {
            if (question.type == 'S' || question.type == 'J') {
                question.setAnswer(option.type);
                this.$set(option, 'check', option.check);
                //自动进入下一题
                if (this.curPage != this.pageSize) {
                    this.toCurPage(this.curPage + 1);
                }
            }
            if (question.type == 'M' || question.type == 'I') {
                //console.log(option, 'option');
                var answers = this.multipleChecked.join(',');
                question.setAnswer(answers);
            }
        },
        //跳转到当前页
        toCurPage(curPage) {
            this.curPage = curPage;
            let question = this.questions[curPage - 1];
            if (question.type == 'M' || question.type == 'I') {
                this.multipleChecked = question.answer ? question.answer.split(',') : [];
            }
        },
        //提交答案
        submit() {
            var vm = this;
            //预览模式判断
            let model = vm.$route.query.model ? vm.$route.query.model : '';
            if (model == 'P') {
                vm.$baseUI
                    .alert({
                        title: '温馨提示',
                        content: '此为预览模式，不能提交',
                        confirmText: '继续听课',
                    })
                    .then(function () {
                        function sendMessage(func, args) {
                            window.parent.postMessage(
                                {
                                    func,
                                    args,
                                },
                                '*'
                            );
                        }
                        sendMessage('backToClassroomExercise');
                    });
                return;
            }
            //已做题数判断
            let doNum = 0;
            vm.paper.questions.forEach((item) => {
                if (item.answer) {
                    doNum++;
                }
            });
            if (vm.paper.questions.length == doNum) {
                /*vm.loading = vm.$baseUI.loading();*/
                //停止计时
                vm.timerpause();
                //发送提交
                vm.$emit('submit', vm.paper);
            } else {
                var leftNum = vm.paper.questions.length - doNum;
                vm.$baseUI.confirm({
                    title: '温馨提示',
                    content: '你还有' + leftNum + '道题没做，确定提交吗？',
                    showCancel: true,
                    cancelText: '取消',
                    confirmText: '确定',
                    confirm() {
                        //console.log("用户点击了确定！");
                        /*vm.loading = vm.$baseUI.loading();*/
                        //停止计时
                        vm.timerpause();
                        //发送提交
                        vm.$emit('submit', vm.paper);
                    },
                    cancel() {
                        //console.log("用户点击了取消！");
                    },
                });
            }
        },
        //考试计时
        startKs() {
            let vm = this;
            vm.timerstart();
        },
        //切换显示/隐藏 分页弹层
        togglePagePopup() {
            this.isPagePopup = !this.isPagePopup;
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

@media screen and (min-width: 1200px) {
    /*试题测试块*/
    .question_box {
        position: absolute;
        width: 100%;
        height: 100%;
        /*min-width: 800px;
            min-height: 500px;*/
        /*min-width: 1330px;*/
        /*min-width: 1500px;*/
        /*min-height: 695px;*/
        background: url('./asset/images/q-bg.png');
        background-size: 100% 100%;
        padding: 0px 30px 10px 30px;
        display: flex;
        flex-direction: column;

        .header {
            color: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);

            .header_l {
                display: flex;
                align-items: center;
                font-size: 26px;

                .img {
                    width: 60px;
                    margin-right: 15px;
                }
            }

            .header_r {
                font-size: 22px;
                .count_img {
                    width: 21px;
                    height: 21px;
                    margin-right: 10px;
                    vertical-align: middle;
                }
            }
        }

        .question {
            flex-direction: column;
            height: 75%;
            overflow-x: auto;

            .question_cnt {
                padding: 45px 230px 0px 230px;
                color: #ffffff;
                line-height: 1.5;

                .question_tg {
                    font-size: 24px;
                    margin-bottom: 40px;
                }

                .question_title {
                    font-size: 24px;
                    padding: 0px 0px 0px 40px;
                    position: relative;

                    .xh {
                        position: absolute;
                        left: -12px;
                    }

                    .tx {
                        font-size: 24px;
                        color: #ed5636;
                    }
                }

                .question_answers {
                    padding: 30px 0px 0px 40px;
                    display: flex;

                    .question_answers_box {
                        width: 100%;
                    }

                    .item {
                        border: 1px solid rgba(125, 153, 202, 1);
                        border-radius: 4px;
                        padding: 12px 20px 12px 50px;
                        margin-bottom: 24px;
                        width: 100%;
                        color: #ffffff;
                        font-size: 20px;
                        cursor: pointer;

                        &.active {
                            border: 1px solid rgba(73, 79, 222, 1);
                            background: rgba(73, 79, 222, 1);
                            color: #ffffff;
                        }

                        .type {
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
    }

    /*分页样式*/
    .pages-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 250px 0px 270px;

        .pages {
            display: flex;
            flex-direction: row;

            .page {
                border: 1px solid #8e93ff;
                width: 40px;
                height: 32px;
                text-align: center;
                line-height: 32px;
                color: #8e93ff;
                font-size: 16px;
                margin-right: 10px;
                border-radius: 4px;
                cursor: pointer;

                &.check {
                    border: 1px solid #ffffff;
                    color: #ffffff;
                }

                &.active {
                    border: 1px solid #ffffff;
                    background: #ffffff;
                    color: #494fde;
                }
            }
        }

        .next-btn {
            width: 160px;
            height: 48px;
            text-align: center;
            line-height: 48px;
            background: linear-gradient(90deg, rgba(237, 87, 54, 1) 0%, rgba(213, 46, 38, 1) 100%);
            box-shadow: 1px 11px 27px 0px rgba(27, 35, 49, 0.2);
            border-radius: 30px;
            margin-left: 20px;
            border: none;
            cursor: pointer;
            color: #ffffff;
            font-size: 22px;
        }

        /*分页弹窗*/
        .show-page-popup {
            position: relative;
            background: rgba(73, 79, 222, 1);
            color: #ffffff;

            .more {
                display: inline-block;
                width: 100%;
            }

            .page-popup {
                position: absolute;
                bottom: 45px;
                left: 0px;
                width: 425px;
                background: rgba(255, 255, 255, 1);
                border-radius: 4px;
                padding-top: 5px;

                .arrow {
                    position: absolute;
                    left: 20px;
                    bottom: -20px;
                    width: 0;
                    height: 0;
                    border-width: 10px;
                    border-style: solid;
                    border-color: #ffffff transparent transparent transparent;
                }

                .status-box {
                    border-bottom: 1px solid #f5f5f5;
                    margin: 0px 15px;
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

                                &.cur {
                                    background: #494fde;
                                }

                                &.done {
                                    border: 1px solid rgba(73, 79, 222, 1);
                                }

                                &.nodone {
                                    border: 1px solid rgba(221, 221, 221, 1);
                                }
                            }
                        }
                    }
                }

                .page-list {
                    padding: 15px 10px 5px 10px;
                    min-height: 70px;
                    max-height: 375px;
                    overflow-x: auto;

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

                            &.check {
                                border: 1px solid rgba(73, 79, 222, 1);
                                color: #333333;
                            }

                            &.active {
                                border: 1px solid rgba(73, 79, 222, 1);
                                background: rgba(73, 79, 222, 1);
                                color: #ffffff;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 1500px) and (min-width: 1200px) {
    /*分页样式*/
    .pages-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px;
        max-width: 910px;
        margin: 0 auto;
    }
}

@media screen and (max-width: 1200px) {
    .question_box {
        position: absolute;
        width: 100%;
        height: 100%;
        min-width: 1060px;
        /*min-height: 500px;*/
        background: url('./asset/images/q-bg.png');
        background-size: 100% 100%;
        padding: 10px 30px;
        display: flex;
        flex-direction: column;

        .header {
            color: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 6px;
            font-size: 18px;

            .header_l {
                display: flex;
                align-items: center;

                .img {
                    width: 40px;
                    margin-right: 15px;
                }
            }

            .header_r {
                .count_img {
                    width: 21px;
                    height: 21px;
                    margin-right: 10px;
                    vertical-align: middle;
                }
            }
        }

        .question {
            flex-direction: column;
            height: 75%;
            overflow-x: auto;

            .question_cnt {
                padding: 25px 20px 0px;
                color: #ffffff;
                line-height: 1.5;

                .question_tg {
                    margin-bottom: 40px;
                }

                .question_title {
                    font-size: 16px;
                    padding: 0px 20px 0px 35px;
                    position: relative;

                    .xh {
                        position: absolute;
                        left: -10px;
                    }

                    .tx {
                        font-size: 16px;
                        color: #ed5636;
                    }
                }

                .question_answers {
                    padding: 20px 20px 0px 35px;
                    display: flex;

                    .question_answers_box {
                        width: 100%;
                    }

                    .item {
                        border: 1px solid rgba(125, 153, 202, 1);
                        border-radius: 4px;
                        padding: 8px 20px 8px 20px;
                        margin-bottom: 20px;
                        width: 100%;
                        color: #ffffff;
                        font-size: 15px;
                        cursor: pointer;

                        &.active {
                            border: 1px solid rgba(73, 79, 222, 1);
                            background: rgba(73, 79, 222, 1);
                            color: #ffffff;
                        }
                        .type {
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
    }

    /*分页样式*/
    .pages-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 40px 0px 55px;

        .pages {
            display: flex;
            flex-direction: row;

            .page {
                border: 1px solid #8e93ff;
                width: 40px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                color: #ffffff;
                font-size: 16px;
                margin-right: 10px;
                border-radius: 4px;
                cursor: pointer;

                &.check {
                    border: 1px solid #ffffff;
                    color: #ffffff;
                }

                &.active {
                    border: 1px solid #ffffff;
                    background: #ffffff;
                    color: #494fde;
                }
            }
        }

        .next-btn {
            width: 150px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: linear-gradient(90deg, rgba(237, 87, 54, 1) 0%, rgba(213, 46, 38, 1) 100%);
            box-shadow: 1px 11px 27px 0px rgba(27, 35, 49, 0.2);
            border-radius: 30px;
            margin-left: 20px;
            border: none;
            cursor: pointer;
            color: #ffffff;
            font-size: 16px;
        }

        /*分页弹窗*/
        .show-page-popup {
            position: relative;
            background: rgba(73, 79, 222, 1);
            color: #ffffff;

            .more {
                display: inline-block;
                width: 100%;
            }

            .page-popup {
                position: absolute;
                bottom: 40px;
                left: 0px;
                width: 350px;
                background: rgba(255, 255, 255, 1);
                border-radius: 4px;
                padding-top: 5px;

                .arrow {
                    position: absolute;
                    left: 20px;
                    bottom: -20px;
                    width: 0;
                    height: 0;
                    border-width: 10px;
                    border-style: solid;
                    border-color: #ffffff transparent transparent transparent;
                }

                .status-box {
                    border-bottom: 1px solid #f5f5f5;
                    margin: 0px 15px;
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

                                &.cur {
                                    background: #494fde;
                                }

                                &.done {
                                    border: 1px solid rgba(73, 79, 222, 1);
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
                    max-height: 410px;
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

                            &.check {
                                border: 1px solid rgba(73, 79, 222, 1);
                                color: #333333;
                            }

                            &.active {
                                background: rgba(73, 79, 222, 1);
                                color: #ffffff;
                            }
                        }
                    }
                }
            }
        }
    }
}

.multiple-check {
    display: none;
}
</style>
