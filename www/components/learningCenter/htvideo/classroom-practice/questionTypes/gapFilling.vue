<template>
    <div class="single-content">
        <div class="question-wrap">
            <div class="question_cnt">
                <gap-filling-stem :question-data="questionData" :back-value="questionData.answer" @getValue="getValue" />
            </div>
            <div class="parse" v-if="questionData.showParse">
                <div class="answer-title">
                    <div class="system_answer">
                        参考答案：
                        <span class="right"><co-parse :article="questionData.questionAnswer" /></span>
                    </div>
                    <div class="user_answer" v-if="questionData.hideAnswer !== true">
                        学员答案：
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
import gapFillingStem from './stem/gapFillingStem.vue';

export default {
    components: {
        CoParse,
        gapFillingStem,
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
        parseToggle() {
            this.$emit('parseToggle');
        },
    },
};
</script>
<style lang="less" scoped>
.single-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
        min-height: 80px;
        line-height: 80px;
        opacity: 1;
        background: #31338d;
        border-radius: 4px 4px 0px 0px;
        display: flex;
        flex-wrap: wrap;

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

    .question_answers {
        padding: 30px 0px 0px 40px;
        display: flex;

        .question_answers_box {
            width: 90%;
            height: 260px;
            overflow: hidden;
            border-radius: 8px;
            position: relative;

            textarea {
                width: 100%;
                height: 100%;
                padding: 10px;
                font-size: 18px;
                box-sizing: border-box;
                border-radius: 8px;
                outline: none;
                border: none;
                resize: none;
            }
        }
    }
}
</style>
