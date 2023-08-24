<template>
    <div :id="newData.questionId" class="choose-fill">
        <div class="title-box">
            <span v-if="stemNumber" class="number">{{ `${stemNumber}-${newData.number}` }}.</span>
            <p v-if="newData.stemId" class="tag-name">选词填空</p>
            <HtmlParse
                v-if="questionBankStatus === 'special'"
                class="html"
                :article="replaceBrackets(`${newData.isCompositeQuestion ? newData.questionSeq : newData.questionStemSeq}. ${newData.title}`)"
            />
            <HtmlParse v-else class="html" :article="replaceBrackets(newData.title)" />
        </div>
        <div class="answer-list">
            <p v-for="(item, index) in newData.options" :key="index" class="answer-text" @click="handleClick(item)">{{ item.title }}</p>
        </div>
        <!-- 确定按钮('自动查看解析|自动跳转下一题,开启之后显示)-->
        <div class="button-confirm" v-if="(questionBankStatus === 'special' || solvingMode) && confirmBtnStatus" @click="confirmBtnFun"><span>确定</span></div>

        <div class="question-footer" :class="{ end: !newData.parseonly && !paperSourceType }">
            <div v-if="newData.parseonly" class="parsing-btn" @click="clickParsing">
                <span>{{ openParsing ? '收起解析' : '查看解析' }}</span>
                <img class="open-bottom-img" :class="{ active: !openParsing }" src="./asset/img/open_bottom.png" alt="" />
            </div>
            <div v-if="!newData.parseonly && paperSourceType" class="save-question" @click="save">确认选择</div>
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
    inject: ['componentContainer'],
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
        // 做题模式 true 单体模式 false 多题模式
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
            inputs: [],
            chooseIndex: 0,
        };
    },
    computed: {
        replaceBrackets() {
            return (str) => {
                let i = 0;
                let parseonly = '';
                if (this.questionBankStatus === 'special' || this.solvingMode) {
                    parseonly = !this.newData.isCheckOnly && this.newData.parseonly;
                } else {
                    parseonly = this.newData.parseonly;
                }
                return str
                    .replace(/（\s*\)|\(\s*）|\(\s*\)|（\s*）/g, () => {
                        var showCorrectAnswer = this.paperSourceType === 'collectBook' && this.paperParsingSource === 'parsing';
                        var values = this.newData.userAnswer.split('※');
                        var value = i > values.length - 1 ? '' : values[i];
                        var correctAnswerValues = this.newData.correctAnswer.split('※');
                        var correctAnswerValue = i > correctAnswerValues.length - 1 ? '' : correctAnswerValues[i];
                        ++i;
                        return `<input  data-index=${i - 1} type="text" style="width: ${
                            showCorrectAnswer ? correctAnswerValue.length * 14 : value ? value.length * 14 : 2
                        }px" class="choose-fill-input ${value ? 'answer' : ''} ${
                            showCorrectAnswer ? 'success' : parseonly ? (value === correctAnswerValue ? 'success' : 'error') : ''
                        }" ${parseonly ? 'disabled' : ''} value="${showCorrectAnswer ? correctAnswerValue : value}" /> `;
                    })
                    .replaceAll(/src=['"]?([^'"]*)['"]?/g, (match, $1) => {
                        return `src=${this.$urlUtils.getViewUrl($1)}`;
                    });
            };
        },
    },
    watch: {
        data: {
            handler(newVal) {
                if (Object.keys(newVal).length !== 0) {
                    this.$nextTick(() => {
                        this.setInput();
                    });
                }
            },
            immediate: true,
            deep: true,
        },
    },
    mounted() {
        this.openParsing = this.paperParsing;
    },
    methods: {
        // 设置题干
        setInput() {
            this.inputs = this.$el.getElementsByClassName('html')[0].getElementsByTagName('input');
            for (let i = 0; i < this.inputs.length; i++) {
                this.inputs[i].addEventListener('input', (e) => {
                    this.inputs[i].value = '';
                    this.inputs[i].style.width = '2px';
                    this.inputs[i].classList.remove('answer');
                    this.emitChange();
                });
                this.inputs[i].addEventListener('focus', (e) => {
                    this.chooseIndex = i;
                });
            }
        },
        // 用户点击答案枚举
        handleClick(item, className = 'answer') {
            if (this.questionBankStatus === 'special' || this.solvingMode) {
                // analysis：解析页
                if ((this.newData.parseonly && this.openParsing) || this.componentContainer?.questionPageType === 'analysis') return;
            } else if (this.newData.parseonly) return;
            this.inputs[this.chooseIndex].style.width = `${14 * item.title.length}px`;
            this.inputs[this.chooseIndex].classList.add(className);
            this.inputs[this.chooseIndex].value = item.title;
            this.chooseIndex = this.chooseIndex === this.inputs.length - 1 ? 0 : (this.chooseIndex += 1);
            this.emitChange();
        },
        // 设置用户答案
        emitChange() {
            const values = this.getInputValue();
            // console.log('values', values.join('※'));
            this.$emit('handle-change', 'choose-fill', values.join('※'), this.newData.questionId);
            this.$nextTick(() => {
                this.setInput();
            });
        },
        // 意见反馈
        clickOpinion() {
            this.$emit('click-opinion', this.data);
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
            // console.log('values', values.join('※'));
            this.$emit('save-change', 'choose-fill', values.join('※'), this.newData.questionId);
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
            var values = [];
            for (let i = 0; i < this.inputs.length; i++) {
                values.push(this.inputs[i].value);
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
            const newVal = values.filter((item) => {
                return item.length > 0;
            });
            if (newVal.length) {
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
.choose-fill {
    box-sizing: border-box;
    padding: 32px;
    background: #fff;
    border-bottom: 1px solid #f5f6f9;
    .title-box {
        position: relative;
        display: flex;
        align-items: flex-start;
        box-sizing: border-box;
        .html {
            padding: 20px;
            width: 100%;
            background: #f5f6f9;
            border-radius: 12px;
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
    .answer-list {
        margin-top: 24px;
        display: flex;
        align-items: center;
        .answer-text {
            margin-right: 8px;
            padding: 6px 8px;
            // width: 54px;
            // height: 32px;
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            color: #ffffff;
            line-height: 32px;
            background: #3f98ff;
            border-radius: 4px;
            cursor: pointer;
        }
    }
    /deep/.choose-fill-input {
        outline: none;
        border: none;
        padding: 0 20px;
        width: 2px;
        text-align: center;
        border-bottom: 1px solid #000;
        background: #f5f6f9;
        line-height: 16px;
        &.answer {
            color: #1296db;
            border-bottom: 1px solid #1296db;
        }
        &.success {
            color: #29bd1b;
            border-bottom: 1px solid #29bd1b;
        }
        &.error {
            color: #f8323c;
            border-bottom: 1px solid #f8323c;
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
