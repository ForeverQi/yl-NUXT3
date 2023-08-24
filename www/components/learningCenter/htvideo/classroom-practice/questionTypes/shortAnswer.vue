<template>
    <div class="single-content">
        <div class="question-wrap">
            <div class="question_cnt">
                <short-answer-stem :question-data="questionData" @chooseClick="chooseClick" />
            </div>
            <div class="parse" v-if="questionData.showParse">
                <div class="answer-title">
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
import shortAnswerStem from './stem/shortAnswerStem.vue';

export default {
    components: {
        CoParse,
        shortAnswerStem,
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
        chooseClick(item) {
            console.log(item, 'asdf');
            if (this.questionData.questionAnswer) {
                return;
            }

            this.$emit('value', item);
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
}
</style>
