<template>
    <div class="single-content">
        <div class="question-wrap">
            <div class="question_cnt">
                <div class="analy_tt">
                    <co-parse :article="showCL()" />
                </div>

                <component v-if="componentName" :is="componentName" :question-data="questionData" @chooseClick="chooseClick" @getValue="getValue" />
            </div>
            <div class="parse" v-if="questionData.showParse">
                <div class="answer-title" v-if="questionData.questionType == 'J'">
                    <div class="system_answer">
                        参考答案：
                        <span class="right">{{ questionData.questionAnswer == 1 ? '正确' : '错误' }}</span>
                    </div>
                    <div class="user_answer" v-if="questionData.hideAnswer !== true">
                        学员答案：
                        <span class="error">{{ questionData.answer == 1 ? '正确' : questionData.answer == 0 ? '错误' : '未答' }}</span>
                    </div>
                </div>
                <div class="answer-title" v-else>
                    <div class="system_answer">
                        <span class="name">参考答案：</span>
                        <span class="right"><co-parse :article="questionData.questionAnswer" /></span>
                    </div>
                    <div class="user_answer" v-if="questionData.hideAnswer !== true">
                        <span class="name">学员答案：</span>
                        <span class="error">{{ questionData.answer ? questionData.answer : '未答' }}</span>
                    </div>
                </div>
                <div class="answer-content">
                    <div class="sub-title">答案解析</div>
                    <div class="parse-content"><co-parse :article="questionData.questionAnswerparse" /></div>
                </div>
            </div>
        </div>
        <div class="show-parse" v-if="showParseBtn && (questionData.parse || questionData.answer)">
            <div class="btn" @click="parseToggle">{{ questionData.showParse ? '收起' : '查看' }}解析</div>
        </div>
    </div>
</template>
<script>
import CoParse from './vbParse.vue';

import singleChoice from './stem/singleChoiceStem.vue'; // 单选题
import multipleChoice from './stem/multipleChoiceStem.vue'; // 多选题
import shortAnswer from './stem/shortAnswerStem.vue'; // 简答题
import judge from './stem/judgeStem.vue'; // 判断题
import gapFilling from './stem/gapFillingStem.vue'; // 填空

const questionComponentMap = {
    O: 'shortAnswer',
    S: 'singleChoice',
    M: 'multipleChoice',
    J: 'judge',
    F: 'gapFilling',
    I: 'multipleChoice',
};

export default {
    components: {
        CoParse,
        singleChoice,
        multipleChoice,
        shortAnswer,
        judge,
        gapFilling,
    },
    props: {
        questionData: {
            type: Object,
            default() {
                return {};
            },
        },
        showParseBtn: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {};
    },
    computed: {
        componentName() {
            if (!this.questionData) {
                return false;
            }
            return questionComponentMap[this.questionData.questionType];
        },
    },
    methods: {
        formatOption(item) {
            //兼容配伍题option为空的问题
            let option = item.option || [];
            if (option.length == 0) {
                var optionstr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substr(0, item.optionnum);
                for (let i = 0; i < optionstr.length; i++) {
                    option.push({ type: optionstr.charAt(i) });
                }
            }
            return option;
        },
        getValue(item) {
            if (this.questionData.questionAnswer) {
                return;
            }
            let keyNum = this.questionData.title.split('#answer').length - 1;
            let i = 0;
            let arr = [];
            while (i < keyNum) {
                if (item[`value${i}`]) {
                    arr.push(item[`value${i}`]);
                } else {
                    arr.push('');
                }
                i++;
            }

            // 判断如果答案都是空则答案清空
            let noEmpty = 0;
            arr.forEach((r) => {
                if (r.replace(/\s/g, '')) {
                    noEmpty++;
                }
            });
            if (noEmpty == 0) {
                arr = [];
            }
            this.$emit('value', arr.join('※'));
        },
        chooseClick(item) {
            this.$emit('value', item);
        },
        parseToggle() {
            this.$emit('parseToggle');
        },
        showCL() {
            console.log(this.questionData.questionstemContent);
            let data = JSON.parse(this.questionData.questionstemContent);
            return data.title;
        },
    },
};
</script>
<style lang="less" scoped>
.analy_tt {
    font-size: 20px;
    padding: 0 56px;
}
.single-content {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.question-wrap {
    max-height: 100%;
    overflow-y: auto;
}
.show-parse {
    display: flex;
    justify-content: center;
    padding: 30px 0 15px 0;
    text-align: center;

    .btn {
        width: 280px;
        height: 60px;
        line-height: 60px;
        background: #161a57;
        border-radius: 30px;
        font-size: 28px;
        color: #fff;
        cursor: pointer;
    }
}

.parse {
    padding: 0 45px;
    padding-right: 10px;
    padding-top: 4px;

    .answer-title {
        line-height: 50px;
        opacity: 1;
        background: #31338d;
        border-radius: 4px 4px 0px 0px;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;

        .right {
            color: #06b588;
        }

        .error {
            color: #f8323c;
        }

        .user_answer,
        .system_answer {
            padding-left: 57px;
            font-size: 24px;
            color: #fff;
        }
    }

    .answer-content {
        padding: 40px 40px 10px 50px;
        background: #262978;
        // height: 160px;

        .sub-title {
            font-size: 24px;
            color: #fff;
            padding-left: 56px;
            background-image: url(../asset/images/answerq.png);
            background-repeat: no-repeat;
            background-size: 46px 27px;
            background-position: left center;
        }

        .parse-content {
            padding-top: 14px;
            font-size: 20px;
            color: #fff;
        }
    }
}

.question_cnt {
    padding: 45px 10px 0px 6px;
    color: #ffffff;
    line-height: 1.5;

    .question_title {
        font-size: 24px;
        padding: 0px 0px 0px 40px;
        position: relative;

        .xh {
            position: absolute;
            left: 0px;
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
            box-sizing: border-box;

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
</style>
