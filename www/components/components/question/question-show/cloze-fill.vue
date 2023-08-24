<template>
    <div class="multiple-choice-box">
        <div class="title-box">
            <HtmlParse class="html" :article="replaceBrackets(data.stemTitle)" />
        </div>
        <template v-if="type">
            <Radio
                :data="data"
                v-bind="$attrs"
                :paper-source-type="paperSourceType"
                :paper-parsing="paperParsing"
                :show-knowledge="showKnowledge"
                :paper-parsing-source="paperParsingSource"
                :show-confirm-btn="showConfirmBtn"
                @handle-change="handleChange"
                @click-collection="clickCollection"
                @click-remove-errquestion="clickRemoveErrquestion"
                @click-opinion="clickOpinion"
                @click-answer-questions="clickAnswerQuestions"
                @changeCheckOnly="changeCheckOnly"
            />
        </template>
        <template v-else>
            <Radio
                v-for="(item, childIndex) in data.questionList"
                :key="childIndex"
                :data="item"
                v-bind="$attrs"
                :stem-number="data.stemNumber"
                :paper-source-type="paperSourceType"
                :paper-parsing="paperParsing"
                :show-knowledge="showKnowledge"
                :paper-parsing-source="paperParsingSource"
                :show-confirm-btn="showConfirmBtn"
                @handle-change="handleChange"
                @click-collection="clickCollection"
                @click-remove-errquestion="clickRemoveErrquestion"
                @click-opinion="clickOpinion"
                @click-answer-questions="clickAnswerQuestions"
                @changeCheckOnly="changeCheckOnly"
            />
        </template>
    </div>
</template>

<script>
import HtmlParse from '../html-parse.vue';
import Radio from './radio.vue';
export default {
    components: {
        HtmlParse,
        Radio,
    },
    props: {
        // 试卷是答题还是解析 parsing: 解析
        paperParsingSource: {
            type: String,
            default: '',
        },
        // 是否展示解析当中的考察考点
        showKnowledge: {
            type: Boolean,
            default: true,
        },
        // 是否直接打开解析
        paperParsing: {
            type: Boolean,
            default: true,
        },
        /**
         * 是否在题干显示标准答案，并设置答题状态为 success
         * 错题本/收藏夹全部解析页面比较特殊，没有用户答案，但展示全部答案，在富文本的题干部分的处理与其他处不同
         * 因此增加一个额外参数，用以处理题干的问题
         */
        showCorrectAnswer: {
            type: Boolean,
            default: false,
        },
        // 试卷类型: errorBook 错题本/解析页 collectBook 收藏夹 questionModel 弹窗做题 空 普通试卷
        paperSourceType: {
            type: String,
            default: '',
        },
        // 做题模式 true 单体模式 false 多题模式
        type: {
            type: Boolean,
            default: false,
        },
        // 当前题目相关数据
        data: {
            type: Object,
            default: () => {},
            require: true,
        },
        // 是否显示"上一题"、"下一题"、"全部试题"操作按钮
        showOperatingButton: {
            type: Boolean,
            default: true,
        },
        // 是否显示确定按钮
        showConfirmBtn: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        /**
         * @returns {string} special: 从专项小题库进入
         */
        questionBankStatus() {
            return this.$route.query.questionBankStatus;
        },
        // 设置题干
        replaceBrackets() {
            return (str) => {
                let i = 0;
                return str
                    .replace(/（\s*\)|\(\s*）|\(\s*\)|（\s*）/g, () => {
                        /**
                         * 先判断当前是否处于单体模式 this.type
                         * 处于单体模式下时，判断当前循环的i值是否和当前数据的number字段一致
                         * 如果下标一致，那么可以认为在单体模式下的input 为目标 input
                         * 多题模式下，直接用i值对标当前大题下所有小题 list 的下标即可
                         * 如果来自于错题本/收藏夹全部解析页面，没有用户答案，通过 showCorrectAnswer 字段直接设置标准答案,并把当前输入框状态设置为 success
                         */
                        // var targetNumber = this.data.number - 1;
                        var targetNumber = this.data.number - 1;
                        if (this.questionBankStatus === 'special') {
                            targetNumber = this.data.questionSeq - 1;
                        }
                        var questionId = this.showCorrectAnswer
                            ? this.data.questionId
                            : this.type
                            ? i === targetNumber
                                ? this.data.questionId
                                : i
                            : i > this.getQuestionIds.length - 1
                            ? i
                            : this.getQuestionIds[i];
                        var correctAnswer = this.showCorrectAnswer
                            ? this.data.correctAnswer
                            : this.type
                            ? i === targetNumber
                                ? this.data.correctAnswer
                                : ''
                            : i > this.getCorrectAnswer.length - 1
                            ? ''
                            : this.getCorrectAnswer[i];
                        var userAnswer = this.showCorrectAnswer
                            ? ''
                            : this.type
                            ? i === targetNumber
                                ? this.data.userAnswer
                                : ''
                            : i > this.getUserAnswer.length - 1
                            ? ''
                            : this.getUserAnswer[i];
                        var parseonly = this.showCorrectAnswer
                            ? true
                            : this.type
                            ? i === targetNumber
                                ? this.data.parseonly
                                : true
                            : i > this.getParseonly.length - 1
                            ? true
                            : this.getParseonly[i];
                        var options = this.showCorrectAnswer
                            ? this.data.options
                            : this.type
                            ? i === targetNumber
                                ? this.data.options
                                : '[]'
                            : i > this.getOptions.length - 1
                            ? '[]'
                            : this.getOptions[i];
                        var answerText = '';
                        for (let j = 0; j < options.length; j++) {
                            if (options[j].answer === userAnswer) {
                                answerText = options[j].answer;
                            }
                        }
                        ++i;
                        var inputVal = '';
                        let number = this.data.number;
                        if (this.questionBankStatus === 'special') {
                            number = this.data.questionSeq;
                        }
                        // 如果是单体模式
                        if (this.type) {
                            // 判断当前输入框是否是单体模式下小题目标输入框
                            if (i === number) {
                                // 当前题目已解析
                                if (parseonly) {
                                    inputVal = `(${i}) ${answerText}`;
                                    // 当前题目未解析
                                } else {
                                    inputVal = answerText ? `(${i}) ${answerText}` : '';
                                }
                            }
                            // 如果是纯展示标准答案
                        } else if (this.showCorrectAnswer) {
                            if (i === this.data.questionSeq) {
                                inputVal = `(${i}) ${correctAnswer}`;
                            }
                            // 如果是平铺试题模式且已解析
                        } else if (parseonly) {
                            inputVal = `(${i}) ${answerText}`;
                            // 如果是平铺模式但没解析
                        } else {
                            inputVal = answerText ? `(${i}) ${answerText}` : '';
                        }
                        return `<input data-questionid="${questionId}" data-options="${encodeURIComponent(
                            JSON.stringify(options)
                        )}" type="text" class="cloze-fill-input ${
                            this.type
                                ? i === number
                                    ? parseonly
                                        ? correctAnswer === userAnswer
                                            ? 'success'
                                            : 'error'
                                        : ''
                                    : ''
                                : this.showCorrectAnswer
                                ? i === this.data.questionSeq
                                    ? 'success'
                                    : ''
                                : parseonly
                                ? correctAnswer === userAnswer
                                    ? 'success'
                                    : 'error'
                                : ''
                        }" ${parseonly ? 'disabled' : ''} style="width: ${inputVal.length ? 14 * inputVal.length + 'px' : '2px'}" value="${inputVal}" /> `;
                    })
                    .replaceAll(/src=['"]?([^'"]*)['"]?/g, function (match, $1) {
                        return `src=${this.$urlUtils.getViewUrl($1)}`;
                    });
            };
        },
        // 获取题目id
        getQuestionIds() {
            var questionIds = this.type ? [this.data.questionId] : this.data.questionList.map((item) => item.questionId);
            return questionIds;
        },
        // 获取题目options
        getOptions() {
            var options = this.type ? this.data.options : this.data.questionList.map((item) => item.options);
            return options;
        },
        // 获取标准答案
        getCorrectAnswer() {
            var correctAnswers = this.type ? [this.data.correctAnswer] : this.data.questionList.map((item) => item.correctAnswer);
            return correctAnswers;
        },
        // 获取用户回答答案
        getUserAnswer() {
            var userAnswers = this.type ? [this.data.userAnswer] : this.data.questionList.map((item) => item.userAnswer);
            return userAnswers;
        },
        // 获取禁用状态
        getParseonly() {
            var parseonlys = this.type ? [this.data.parseonly] : this.data.questionList.map((item) => item.parseonly);
            return parseonlys;
        },
    },
    methods: {
        // 意见反馈
        clickOpinion(data) {
            this.$emit('click-opinion', data);
        },
        // 用户改变答案
        handleChange(type, item, questionid) {
            // var inputs = this.$el.getElementsByClassName('html')[0].getElementsByTagName('input');
            // for (let i = 0; i < inputs.length; i++) {
            //     if (questionid === inputs[i].dataList.questionid('data-questionid')) {
            //         var options = JSON.parse(decodeURIComponent(inputs[i].getAttribute('data-options')));
            //         var title = '';
            //         // eslint-disable-next-line array-callback-return
            //         options.filter((filterItem) => {
            //             console.log(filterItem);
            //             if (filterItem.answer === item) {
            //                 title = filterItem.answer;
            //             }
            //         });
            //         var value = `(${this.data.number}) ${title}`;
            //         inputs[i].value = value;
            //         inputs[i].style.width = `${14 * value.length}px`;
            //         inputs[i].classList.add('answer');
            //     }
            // }
            this.$emit('handle-change', ['cloze-fill', type], item, questionid);
        },
        // 错题本解析页单题删除
        clickRemoveErrquestion(questionId, errorQuestionId) {
            this.$emit('click-remove-errquestion', questionId, errorQuestionId);
        },
        // 收藏事件
        clickCollection(data) {
            this.$emit('click-collection', {
                isCollection: data.isCollection,
                collectionId: data.collectionId,
                questionId: data.questionId,
            });
        },
        // 学习答疑
        clickAnswerQuestions(data) {
            this.$emit('click-answer-questions', data);
        },
        /**
         * 专项小题库：改变做题页"查看解析"按钮是否显示
         *
         * @param {boolean} e questionId
         */
        changeCheckOnly(e) {
            this.$emit('changeCheckOnly', e);
        },
    },
};
</script>

<style lang="less" scoped>
.multiple-choice-box {
    box-sizing: border-box;
    padding: 32px;
    background: #fff;
    .title-box {
        position: relative;
        display: flex;
        align-items: flex-start;
        box-sizing: border-box;
        .html {
            padding: 20px;
            margin-bottom: 21px;
            width: 100%;
            background: #f5f6f9;
            border-radius: 12px;
        }
        /deep/.cloze-fill-input {
            outline: none;
            border: none;
            padding: 0 20px;
            width: 2px;
            text-align: center;
            border-bottom: 1px solid #000;
            background: #f5f6f9;
            &:focus {
                color: #1296db;
                border-bottom: 1px solid #1296db;
            }
            &.success {
                color: #189b67;
                border-bottom: 1px solid #189b67;
            }
            &.error {
                color: #ff0705;
                border-bottom: 1px solid #ff0705;
            }
        }
    }
    .question-footer {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &.end {
            justify-content: flex-end;
        }
        .parsing-btn {
            margin-left: -32px;
            width: 100px;
            height: 28px;
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            color: #ff2e30;
            line-height: 28px;
            background: #ffece8;
            border-radius: 0px 14px 14px 0px;
            cursor: pointer;
        }
    }
}
</style>
