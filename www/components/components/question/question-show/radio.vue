<template>
    <div :id="newData.questionId" class="radio-box" :class="newData.questionId">
        <div class="title-box">
            <div class="tag" />
            <span class="number" v-if="questionBankStatus === 'special'">
                {{ newData.isCompositeQuestion ? newData.questionSeq : newData.questionStemSeq }}.
            </span>
            <span class="number" v-else>{{ stemNumber ? `${stemNumber}-${newData.number}` : newData.number }}.</span>
            <p v-if="newData.stemId" class="tag-name">{{ isjudge ? '判断题' : '单选题' }}</p>
            <p v-if="questionBankStatus === 'special' && newData.isCompositeQuestion" class="tag-name">{{ isjudge ? '判断题' : '单选题' }}</p>
            <HtmlParse class="html" :article="newData.title" />
        </div>
        <label v-for="(item, itemIndex) in newData.options" :key="itemIndex" class="radio-item" @click="handlerClick(item)">
            <!-- 专项小题库 -->
            <template v-if="questionBankStatus === 'special' || solvingMode">
                <img
                    v-if="newData.isCheckOnly && (active === item.answer || newData.userAnswer === item.answer)"
                    class="img"
                    src="./asset/img/check.png"
                    alt=""
                />
                <img
                    v-else-if="
                        newData.parseonly &&
                        (newData.correctAnswer === item.answer ||
                            (newData.parseonly && newData.correctAnswer === item.answer && paperSourceType === 'collectBook' && paperParsing)) &&
                        !newData.isCheckOnly
                    "
                    class="img"
                    src="./asset/img/answer_check.png"
                    alt=""
                />
                <img
                    v-else-if="newData.parseonly && newData.correctAnswer !== newData.userAnswer && newData.userAnswer === item.answer && !newData.isCheckOnly"
                    class="img"
                    src="./asset/img/err_answer_check.png"
                    alt=""
                />
                <img v-else class="img" src="./asset/img/uncheck.png" alt="" />
            </template>
            <template v-else>
                <img
                    v-if="!newData.parseonly && (active === item.answer || newData.userAnswer === item.answer)"
                    class="img"
                    src="./asset/img/check.png"
                    alt=""
                />
                <img
                    v-else-if="
                        newData.parseonly &&
                        (newData.correctAnswer === item.answer ||
                            (newData.parseonly && newData.correctAnswer === item.answer && paperSourceType === 'collectBook' && paperParsing))
                    "
                    class="img"
                    src="./asset/img/answer_check.png"
                    alt=""
                />
                <img
                    v-else-if="newData.parseonly && newData.correctAnswer !== newData.userAnswer && newData.userAnswer === item.answer"
                    class="img"
                    src="./asset/img/err_answer_check.png"
                    alt=""
                />
                <img v-else class="img" src="./asset/img/uncheck.png" alt="" />
            </template>
            <HtmlParse class="question-content" :article="`${!isjudge ? `${item.answer}.` : ''} ${item.title}`" />
        </label>
        <div class="question-footer" :class="{ end: !newData.parseonly }">
            <div v-if="newData.parseonly" class="parsing-btn" @click="clickParsing">
                <span>{{ openParsing ? '收起解析' : '查看解析' }}</span>
                <img class="open-bottom-img" :class="{ active: !openParsing }" src="./asset/img/open_bottom.png" alt="" />
            </div>
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
        Collection,
        QuestionTool,
        Analysis,
        HtmlParse,
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
        // 是否直接打开解析(前提是parseonly必须为true)
        paperParsing: {
            type: Boolean,
            default: true,
        },
        // 试卷类型: errorBook 错题本/解析页 collectBook 收藏夹 questionModel 弹窗做题 空 普通试卷
        paperSourceType: {
            type: String,
            default: '',
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
            active: '',
        };
    },
    computed: {
        isjudge() {
            var typeList = this.newData.type.split('-');
            return typeList.indexOf('judge') !== -1;
        },
    },
    mounted() {
        this.newData = this.data;
    },
    methods: {
        // 用户改变答案
        handlerClick(item) {
            if (this.questionBankStatus === 'special' || this.solvingMode) {
                if ((!this.newData.isCheckOnly && this.newData.parseonly) || item.answer === this.newData.userAnswer) return;
            } else if (this.newData.parseonly || item.answer === this.newData.userAnswer) return;
            this.active = item.answer;
            this.$emit('handle-change', 'radio', item.answer, this.newData.questionId);
        },
        // 错题本解析页单题删除
        clickRemoveErrquestion(questionId, errorQuestionId) {
            this.$emit('click-remove-errquestion', questionId, errorQuestionId);
        },
        // 打开/收起解析
        clickParsing() {
            if (this.questionBankStatus === 'special' || this.solvingMode) {
                this.$emit('changeCheckOnly', {
                    openParsing: this.openParsing,
                    questionId: this.newData.questionId,
                    userAnswer: this.active || this.newData.userAnswer,
                });
            } else {
                this.newPaperParsing = !this.openParsing;
            }
        },
        // 收藏事件
        clickCollection(data) {
            this.$emit('click-collection', {
                isCollection: data.isCollection,
                collectionId: data.collectionId,
                questionId: data.questionId,
            });
        },
        // 意见反馈
        clickOpinion() {
            this.$emit('click-opinion', this.newData);
        },
        // 学习答疑
        clickAnswerQuestions() {
            this.$emit('click-answer-questions', this.newData);
        },
    },
};
</script>

<style lang="less" scoped>
.radio-box {
    box-sizing: border-box;
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
    .radio-item {
        display: flex;
        align-items: center;
        line-height: 25px;
        position: relative;
        margin-top: 20px;
        cursor: pointer;
        color: #333;
        font-size: 16px;
        .img {
            margin-right: 6px;
            width: 16px;
            height: 16px;
            user-select: none;
            pointer-events: none;
        }
        .question-content {
            word-break: break-all;
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
}
</style>
