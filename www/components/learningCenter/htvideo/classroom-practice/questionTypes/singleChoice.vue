<template>
    <div class="single-content">
        <div class="question-wrap">
            <div class="question_cnt">
                <div class="analy_tt" v-if="false">
                    <co-parse :article="tt" />
                </div>
                <single-choice-stem :question-data="questionData" @chooseClick="chooseClick" />
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
        <div class="show-parse" v-if="showParseBtn && questionData.answer">
            <div class="btn" @click="parseToggle">{{ questionData.showParse ? '收起' : '查看' }}解析</div>
        </div>
    </div>
</template>
<script>
import CoParse from './vbParse.vue';
import singleChoiceStem from './stem/singleChoiceStem.vue';
export default {
    components: {
        CoParse,
        singleChoiceStem,
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
        chooseClick(item) {
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
}
</style>
