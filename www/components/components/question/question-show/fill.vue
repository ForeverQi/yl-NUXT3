<template>
    <div :id="newData.questionId" class="fill-box">
        <div class="title-box">
            <div class="tag" />
            <span class="number" v-if="questionBankStatus === 'special'">
                {{ newData.isCompositeQuestion ? newData.questionSeq : newData.questionStemSeq }}.
            </span>
            <span class="number" v-else>{{ stemNumber ? `${stemNumber}-${newData.number}` : newData.number }}.</span>
            <p v-if="newData.stemId" class="tag-name">填空题</p>
            <p v-if="questionBankStatus === 'special' && newData.isCompositeQuestion" class="tag-name">填空题</p>
            <HtmlParse class="html" :article="replaceBrackets(newData.title)" @input-change="handleChange" />
        </div>
        <!-- 确定按钮('自动查看解析|自动跳转下一题,开启之后显示)-->
        <div class="button-confirm" v-if="(questionBankStatus === 'special' || solvingMode) && confirmBtnStatus" @click="confirmBtnFun"><span>确定</span></div>

        <div class="question-footer" :class="{ end: !newData.parseonly && !paperSourceType }">
            <div v-if="newData.parseonly" class="parsing-btn" @click="clickParsing">
                <span>{{ openParsing ? '收起解析' : '查看解析' }}</span>
                <img class="open-bottom-img" :class="{ active: !openParsing }" src="./asset/img/open_bottom.png" alt="" />
            </div>
            <div v-if="!newData.parseonly && paperSourceType" class="save-question" @click="save">确认填写</div>
            <Collection v-show="!newData.parseonly ? true : !openParsing" :data="newData" @click-collection="clickCollection" />
        </div>
        <analysis class="analysis-box" v-bind="$attrs" v-if="newData.parseonly" :question="newData" :collapse="!openParsing" :show-knowledge="showKnowledge">
            <template #questionTool>
                <QuestionTool
                    :data="newData"
                    :paper-source-type="paperSourceType"
                    :paper-parsing="paperParsing"
                    @click-collection="clickCollection"
                    @click-remove-errquestion="clickRemoveErrquestion"
                    @click-opinion="clickOpinion"
                    @click-answer-questions="clickAnswerQuestions"
                />
            </template>
        </analysis>
    </div>
</template>

<script>
import HtmlParse from '../html-parse.vue';
import specialQuestion from '../mixins/special-question.js';
import Collection from './collection.vue';
import QuestionTool from './question-tool.vue';
import Analysis from './analysis.vue';
export default {
    components: {
        HtmlParse,
        Collection,
        QuestionTool,
        Analysis,
    },
    mixins: [specialQuestion],
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
        // 题目大题编号 1-1 1-2 1-3 这里 1 的值
        stemNumber: {
            type: Number,
            default: null,
        },
        // 当前题目相关数据
        data: {
            type: Object,
            default: () => {},
            require: true,
        },
    },
    data() {
        return {
            index: 0,
        };
    },
    computed: {
        // 设置题干
        replaceBrackets() {
            return (str) => {
                let i = 0;
                let parseonly = '';
                if (this.questionBankStatus === 'special' || this.solvingMode) {
                    parseonly = !this.newData.isCheckOnly && this.newData.parseonly;
                } else {
                    parseonly = this.newData.parseonly;
                }
                return str.replace(/{#answer}/g, () => {
                    var showCorrectAnswer = this.paperSourceType === 'collectBook' && this.paperParsingSource === 'parsing';
                    var values = this.newData.userAnswer.split('※');
                    var setValue = i > values.length - 1 ? '' : values[i];
                    var correctAnswerValues = this.newData.correctAnswer.split('※');
                    var correctAnswerValue = i > correctAnswerValues.length - 1 ? '' : correctAnswerValues[i];
                    ++i;
                    return `<input class="fill-input" type="text" ${parseonly ? 'disabled' : ''} value="${
                        showCorrectAnswer ? correctAnswerValue : setValue
                    }" placeholder="${parseonly ? '' : '请输入你的答案......'}"/>`;
                });
            };
        },
    },
    mounted() {
        this.openParsing = this.paperParsing;
    },
    methods: {
        // 意见反馈
        clickOpinion() {
            this.$emit('click-opinion', this.data);
        },
        // 用户改变答案
        handleChange() {
            const values = this.getInputValue();
            this.$emit('handle-change', 'fill', values.join('※'), this.newData.questionId);
        },
        // 错题本解析页单题删除
        clickRemoveErrquestion(questionId, errorQuestionId) {
            this.$emit('click-remove-errquestion', questionId, errorQuestionId);
        },
        // 打开/收起解析
        clickParsing() {
            if (this.questionBankStatus === 'special' || this.solvingMode) {
                const values = this.getInputValue();
                this.$emit('changeCheckOnly', {
                    openParsing: this.openParsing,
                    questionId: this.newData.questionId,
                    userAnswer: values.join('※') || this.newData.userAnswer,
                });
            } else {
                this.newPaperParsing = !this.openParsing;
            }
        },
        // 用户保存答案
        save() {
            const values = this.getInputValue();
            this.$emit('save-change', 'fill', values, this.newData.questionId);
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
        clickAnswerQuestions() {
            this.$emit('click-answer-questions', this.data);
        },
        // 获取input的内容
        getInputValue() {
            var inputs = this.$el.getElementsByClassName('html')[0].getElementsByTagName('input');
            var values = [];
            for (let i = 0; i < inputs.length; i++) {
                values.push(inputs[i].value.replace(/'/g, '').replace(/※/g, '').replace(/\|/g, ''));
            }
            return values;
        },
        /**
         * "确定"事件
         *
         * @returns {boolean} false:终止代码执行
         */
        confirmBtnFun() {
            if (this.newData.parseonly && this.openParsing) return false;
            let values = this.getInputValue();
            const valueStatus = values.every((item) => {
                return item === '';
            });
            if (!valueStatus) {
                values = values.join('※');
            } else {
                values = '';
            }

            this.$emit('changeCheckOnly', {
                openParsing: this.openParsing,
                questionId: this.newData.questionId,
                userAnswer: values || this.newData.userAnswer,
                isConfirmStatus: true,
            });
        },
    },
};
</script>

<style lang="less" scoped>
.fill-box {
    padding: 16px 32px 24px 32px;
    background: #fff;
    border-bottom: 1px solid #f5f6f9;
    .title-box {
        position: relative;
        // display: flex;
        // align-items: flex-start;
        box-sizing: border-box;
        .tag {
            position: absolute;
            top: 4px;
            left: -32px;
            width: 7px;
            height: 14px;
            background: #ff0705;
            border-radius: 0px 4px 4px 0px;
        }
        .html,
        .number {
            font-weight: bolder;
        }
        .number {
            flex-shrink: 0;
        }
        /deep/.fill-input {
            padding: 0 10px;
            height: 24px;
            line-height: 24px;
            outline: none;
            border: 1px solid rgba(0, 0, 0, 0.15);
            border-radius: 2px;
            &:focus {
                border-color: rgb(255, 46, 48);
            }
        }
        .tag-name {
            display: inline-block;
            margin-right: 7px;
            padding: 4px 10px;
            flex-shrink: 0;
            font-size: 12px;
            font-weight: 400;
            color: #848aa4;
            line-height: 16px;
            background: #f5f6f9;
            border-radius: 4px;
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
        .save-question {
            width: 88px;
            height: 30px;
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            color: #ff0705;
            line-height: 30px;
            background: #ffece8;
            border-radius: 20px;
            cursor: pointer;
            &:hover {
                color: #fff;
                background: #ff2e30;
            }
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
            .open-bottom-img {
                width: 10px;
                height: 10px;
                transform: rotate(180deg);
                &.active {
                    transform: rotate(0);
                }
            }
        }
    }
    .analysis-box {
        margin-top: 32px;
    }
    .button-confirm {
        margin: 20px 0 30px;
        span {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 120px;
            height: 36px;
            font-size: 16px;
            color: #ffffff;
            background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
            border-radius: 20px;
            cursor: pointer;
        }
    }
}
</style>
