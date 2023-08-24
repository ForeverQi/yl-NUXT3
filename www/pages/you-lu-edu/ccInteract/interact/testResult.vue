<template>
    <!--测试结果-->
    <div class="question_result_box">
        <template v-if="isLoad">
            <template v-if="questions.length == 1">
                <!--一道题答对-->
                <div class="question_result" v-if="paper.rightquestionTotal == 1">
                    <div class="result_cnt">
                        <img src="./asset/images/2.gif" class="img" />
                        <div class="result_r">
                            <p class="title right">答对了！</p>
                            <p class="usetime">
                                <img class="count_img" src="./asset/images/time-icon.png" />
                                用时：{{ $DateUtil.getTimeString(paper.durationtime) }}
                            </p>
                            <div class="result_box">
                                <div class="result">
                                    <span class="true">1</span>
                                    <i class="icon icon-true"><img class="img" src="./asset/images/true.png" /></i>
                                </div>
                            </div>
                            <p class="rank_box">
                                超越了
                                <span class="rank">{{ paper.rankingpassRate }}%</span>
                                的同学！
                            </p>
                        </div>
                    </div>
                    <button class="next_btn" @click="goListenCourse">继续听课</button>
                </div>
                <!--一道题答错-->
                <div class="question_result" v-else>
                    <div class="result_cnt">
                        <img src="./asset/images/3.gif" class="img2" />
                        <div class="result_r">
                            <p class="title false">答错了o(╥﹏╥)o！</p>
                            <p class="usetime">
                                <img class="count_img" src="./asset/images/time-icon.png" />
                                用时：{{ $DateUtil.getTimeString(paper.durationtime) }}
                            </p>
                            <div class="result_box">
                                <div class="result">
                                    <span class="false">1</span>
                                    <i class="icon icon-false"><img class="img" src="./asset/images/false.png" /></i>
                                </div>
                            </div>
                            <p class="rank_box">要认真学哦！</p>
                        </div>
                    </div>
                    <button class="next_btn" @click="goListenCourse">继续听课</button>
                </div>
            </template>
            <template v-else>
                <!--多题全对-->
                <div class="question_result" v-if="paper.rightquestionTotal == questions.length">
                    <div class="result_cnt">
                        <img src="./asset/images/4.gif" class="img3" />
                        <div class="result_r">
                            <p class="title right">全对了！</p>
                            <p class="usetime">
                                <img class="count_img" src="./asset/images/time-icon.png" />
                                用时：{{ $DateUtil.getTimeString(paper.durationtime) }}
                            </p>
                            <div class="result_box">
                                <div class="result" v-for="(question, index) in questions" :key="index" v-show="index + 1 <= 20">
                                    <span class="true">{{ index + 1 }}</span>
                                    <i class="icon icon-true" v-if="question.answerState == 2"><img class="img" src="./asset/images/true.png" /></i>
                                    <i class="icon icon-false" v-else><img class="img" src="./asset/images/false.png" /></i>
                                </div>
                                <div class="result more-result" v-if="questions.length > 20">
                                    <span class="more" @click.stop.capture="toggleAnswerCard">...</span>
                                    <answer-card :questions="questions" v-if="isAnswerCard"></answer-card>
                                </div>
                            </div>
                            <p class="rank_box">
                                超越了
                                <span class="rank">{{ paper.rankingpassRate }}%</span>
                                的同学！
                            </p>
                        </div>
                    </div>
                    <button class="next_btn" @click="goListenCourse">继续听课</button>
                </div>
                <!--多题全错-->
                <div class="question_result" v-else-if="paper.rightquestionTotal == 0">
                    <div class="result_cnt">
                        <img src="./asset/images/5.gif" class="img4" />
                        <div class="result_r">
                            <p class="title false">全错了o(╥﹏╥)o！</p>
                            <p class="usetime">
                                <img class="count_img" src="./asset/images/time-icon.png" />
                                用时：{{ $DateUtil.getTimeString(paper.durationtime) }}
                            </p>
                            <div class="result_box">
                                <div class="result" v-for="(question, index) in questions" :key="index" v-show="index + 1 <= 20">
                                    <span class="false">{{ index + 1 }}</span>
                                    <i class="icon icon-true" v-if="question.answerState == 2"><img class="img" src="./asset/images/true.png" /></i>
                                    <i class="icon icon-false" v-else><img class="img" src="./asset/images/false.png" /></i>
                                </div>
                                <div class="result more-result" v-if="questions.length > 20">
                                    <span class="more" @click.stop.capture="toggleAnswerCard">...</span>
                                    <answer-card :questions="questions" v-if="isAnswerCard"></answer-card>
                                </div>
                            </div>
                            <p class="rank_box">要认真学哦！</p>
                        </div>
                    </div>
                    <button class="next_btn" @click="goListenCourse">继续听课</button>
                </div>
                <!--多题对N个-->
                <div class="question_result" v-else>
                    <div class="result_cnt">
                        <img src="./asset/images/6.gif" class="img5" />
                        <div class="result_r">
                            <p class="title right">答对{{ paper.rightquestionTotal }}道题！</p>
                            <p class="usetime">
                                <img class="count_img" src="./asset/images/time-icon.png" />
                                用时：{{ $DateUtil.getTimeString(paper.durationtime) }}
                            </p>
                            <div class="result_box">
                                <div class="result" v-for="(question, index) in questions" :key="index" v-show="index + 1 <= 20">
                                    <span :class="question.answerState == 2 ? 'true' : 'false'">{{ index + 1 }}</span>
                                    <i class="icon icon-true" v-if="question.answerState == 2">
                                        <img class="img" src="./asset/images/true.png" />
                                    </i>
                                    <i class="icon icon-false" v-else>
                                        <img class="img" src="./asset/images/false.png" />
                                    </i>
                                </div>
                                <div class="result more-result" v-if="questions.length > 20">
                                    <span class="more" @click.stop.capture="toggleAnswerCard">...</span>
                                    <answer-card :questions="questions" v-if="isAnswerCard"></answer-card>
                                </div>
                            </div>
                            <p class="rank_box">
                                超越了
                                <span class="rank">{{ paper.rankingpassRate }}%</span>
                                的同学！
                            </p>
                        </div>
                    </div>
                    <button class="next_btn" @click="goListenCourse">继续听课</button>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
import AnswerCard from './answerCard';
import PaperUtil from '~/www/common/paper-class/js/PaperUtil.js';

export default {
    name: 'testResult',
    components: { AnswerCard },
    layout: 'nullLayout',
    props: {
        paperId: {
            type: String,
            default: '',
        },
        answersheetId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isLoad: false,
            paper: null,
            questions: [],
            isAnswerCard: false,
            loading: null,
        };
    },
    mounted() {
        var vm = this;

        document.querySelector('.question_result_box').addEventListener('click', function () {
            vm.isAnswerCard && (vm.isAnswerCard = false);
        });
        //初始化
        vm.init(this.paperId);
    },
    methods: {
        //初始化
        init(paperId) {
            var vm = this;
            let paper; //试卷对象
            /*Mask.showLoading();*/
            vm.loading = vm.$baseUI.loading();
            let paperService = PaperUtil.initPaper({
                paperId,
                answersheetId: vm.answersheetId,
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
                })
                .loadAnswerRecord(function () {
                    //加载试卷做题记录
                })
                .getPapersTranscript(function () {
                    //加载通用成绩单
                })
                .end(function () {
                    vm.paper = paper;
                    /*Mask.hideLoading();*/
                    vm.loading.close();
                    vm.$baseUI.loading.closeAll();
                    vm.isLoad = true;
                });
        },
        //切换显示/隐藏 答题卡
        toggleAnswerCard() {
            this.isAnswerCard = !this.isAnswerCard;
        },
        //继续听课
        goListenCourse() {
            var paperId = this.paper.paperId;

            function sendMessage(func, args) {
                window.parent.postMessage(
                    {
                        func,
                        args,
                    },
                    '*'
                );
            }
            sendMessage('goonPaly', { paperId });
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
/*公用样式*/
.hidden {
    display: none !important;
}

.ml15 {
    margin-left: 15px;
}

.mb0 {
    margin-bottom: 0px !important;
}

@media screen and (min-width: 1000px) {
    /*测试结果*/
    .question_result_box {
        position: absolute;
        width: 100%;
        height: 100%;
        /*min-width: 800px;*/
        min-width: 900px;
        min-height: 500px;
        background: url('./asset/images/q-bg.png');
        background-size: 100% 100%;

        .question_result {
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: center;

            .result_cnt {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                color: #ffffff;

                .img {
                    width: 260px;
                    margin-right: 70px;
                }

                .img2 {
                    width: 380px;
                    margin-right: 110px;
                }

                .img3 {
                    width: 370px;
                    margin-right: 80px;
                }

                .img4 {
                    width: 350px;
                    margin-right: 50px;
                }

                .img5 {
                    width: 340px;
                    margin-right: 70px;
                }

                .result_r {
                    .title {
                        font-size: 48px;

                        &.right {
                            color: #51d55a;
                        }

                        &.false {
                            color: #ed5736;
                        }
                    }

                    .usetime {
                        margin-top: 30px;
                        display: flex;
                        align-items: center;
                        font-size: 24px;

                        .count_img {
                            width: 21px;
                            height: 21px;
                            margin-right: 10px;
                            vertical-align: middle;
                        }
                    }

                    .result_box {
                        display: flex;
                        flex-direction: row;
                        margin-top: 40px;
                        width: 390px;
                        flex-wrap: wrap;

                        .result {
                            width: 40px;
                            height: 40px;
                            background: rgba(255, 255, 255, 1);
                            border-radius: 4px;
                            position: relative;
                            display: flex;
                            font-weight: 700;
                            font-size: 18px;
                            color: #494fde;
                            align-items: center;
                            justify-content: center;
                            text-align: center;
                            line-height: 40px;
                            margin-right: 14px;
                            margin-bottom: 20px;

                            .true {
                                color: #51d55a;
                            }

                            .false {
                                color: #ed5736;
                            }

                            .icon {
                                position: absolute;

                                &.icon-false {
                                    left: 28px;
                                    top: -14px;
                                }
                                &.icon-true {
                                    left: 24px;
                                    top: -12px;
                                }

                                img {
                                    width: auto;
                                    height: 22px;
                                }
                            }
                        }

                        .more-result {
                            position: relative;

                            .more {
                                display: inline-block;
                                width: 100%;
                                color: #494fde;
                                cursor: pointer;
                            }
                        }
                    }

                    .rank_box {
                        margin-top: 15px;
                        font-size: 24px;

                        .rank {
                            font-size: 36px;
                            margin: 0px 10px;
                            color: #51d55a;
                        }
                    }
                }
            }

            .next_btn {
                width: 230px;
                height: 50px;
                background: linear-gradient(90deg, rgba(237, 87, 54, 1) 0%, rgba(213, 46, 38, 1) 100%);
                box-shadow: 1px 11px 27px 0px rgba(27, 35, 49, 0.2);
                border-radius: 30px;
                border: none;
                text-align: center;
                line-height: 50px;
                color: #ffffff;
                margin: 120px auto 0px;
                font-size: 24px;
            }
        }
    }
}

@media screen and (max-width: 1000px) {
    /*测试结果*/
    .question_result_box {
        position: absolute;
        width: 100%;
        height: 100%;
        min-width: 800px;
        min-height: 500px;
        background: url('./asset/images/q-bg.png');
        background-size: cover;

        .question_result {
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: center;

            .result_cnt {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                color: #ffffff;

                .img {
                    width: 260px;
                    margin-right: 20px;
                }

                .img2 {
                    width: 380px;
                    margin-right: 60px;
                }

                .img3 {
                    width: 370px;
                    margin-right: 30px;
                }

                .img4 {
                    width: 350px;
                    margin-right: 0px;
                }

                .img5 {
                    width: 340px;
                    margin-right: 20px;
                }

                .result_r {
                    .title {
                        font-size: 36px;

                        &.right {
                            color: #51d55a;
                        }

                        &.false {
                            color: #ed5736;
                        }
                    }

                    .usetime {
                        margin-top: 40px;
                        display: flex;
                        align-items: center;
                        font-size: 24px;

                        .count_img {
                            width: 21px;
                            height: 21px;
                            margin-right: 10px;
                            vertical-align: middle;
                        }
                    }

                    .result_box {
                        display: flex;
                        flex-direction: row;
                        margin-top: 40px;
                        width: 390px;
                        flex-wrap: wrap;

                        .result {
                            width: 40px;
                            height: 40px;
                            background: rgba(255, 255, 255, 1);
                            border-radius: 4px;
                            position: relative;
                            display: flex;
                            font-weight: 700;
                            font-size: 22px;
                            color: #494fde;
                            align-items: center;
                            justify-content: center;
                            margin-right: 14px;
                            text-align: center;
                            line-height: 40px;
                            margin-bottom: 20px;

                            .true {
                                color: #51d55a;
                            }

                            .false {
                                color: #ed5736;
                            }

                            .icon {
                                position: absolute;

                                &.icon-false {
                                    left: 28px;
                                    top: -14px;
                                }
                                &.icon-true {
                                    left: 24px;
                                    top: -12px;
                                }

                                img {
                                    width: auto;
                                    height: 22px;
                                }
                            }
                        }

                        .more-result {
                            position: relative;

                            .more {
                                display: inline-block;
                                width: 100%;
                                color: #494fde;
                                cursor: pointer;
                            }
                        }
                    }

                    .rank_box {
                        margin-top: 15px;
                        font-size: 24px;

                        .rank {
                            font-size: 32px;
                            margin: 0px 8px;
                            color: #51d55a;
                        }
                    }
                }
            }

            .next_btn {
                width: 230px;
                height: 50px;
                background: linear-gradient(90deg, rgba(237, 87, 54, 1) 0%, rgba(213, 46, 38, 1) 100%);
                box-shadow: 1px 11px 27px 0px rgba(27, 35, 49, 0.2);
                border-radius: 30px;
                border: none;
                text-align: center;
                line-height: 50px;
                color: #ffffff;
                margin: 50px auto 0px;
            }
        }
    }
}
</style>
