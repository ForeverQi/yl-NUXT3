<template>
    <div :id="newData.questionId" class="multiple-choice-box">
        <div class="title-box">
            <div class="tag" />
            <span class="number" v-if="questionBankStatus === 'special'">
                {{ newData.isCompositeQuestion ? newData.questionSeq : newData.questionStemSeq }}.
            </span>
            <span class="number" v-else>{{ stemNumber ? `${stemNumber}-${newData.number}` : newData.number }}.</span>
            <p v-if="newData.stemId" class="tag-name">{{ isIndefinite ? '不定项选择题' : '多选题' }}</p>
            <p v-if="questionBankStatus === 'special' && newData.isCompositeQuestion" class="tag-name">{{ isIndefinite ? '不定项选择题' : '多选题' }}</p>
            <HtmlParse class="html" :article="newData.title" />
        </div>
        <label v-for="(item, itemIndex) in newData.options" :key="itemIndex" class="multiple-item" @click="handlerClick(item)">
            <!-- 专项小题库 -->
            <template v-if="questionBankStatus === 'special' || solvingMode">
                <img
                    v-if="newData.isCheckOnly && (active.indexOf(item.answer) !== -1 || newData.userAnswer.indexOf(item.answer) !== -1)"
                    class="img"
                    src="./asset/img/chbox.png"
                    alt=""
                />
                <img
                    v-else-if="
                        newData.parseonly &&
                        (newData.correctAnswer.indexOf(item.answer) !== -1 ||
                            (newData.correctAnswer.indexOf(item.answer) !== -1 && paperSourceType === 'collectBook' && paperParsing)) &&
                        !newData.isCheckOnly
                    "
                    class="img"
                    src="./asset/img/answer_chbox.png"
                    alt=""
                />
                <img
                    v-else-if="
                        newData.parseonly &&
                        newData.correctAnswer.indexOf(item.answer) === -1 &&
                        newData.userAnswer.indexOf(item.answer) !== -1 &&
                        !newData.isCheckOnly
                    "
                    class="img"
                    src="./asset/img/err_answer_chbox.png"
                    alt=""
                />
                <img v-else class="img" src="./asset/img/unchbox.png" alt="" />
            </template>
            <template v-else>
                <img
                    v-if="!newData.parseonly && (active.indexOf(item.answer) !== -1 || newData.userAnswer.indexOf(item.answer) !== -1)"
                    class="img"
                    src="./asset/img/chbox.png"
                    alt=""
                />
                <img
                    v-else-if="
                        newData.parseonly &&
                        (newData.correctAnswer.indexOf(item.answer) !== -1 ||
                            (newData.correctAnswer.indexOf(item.answer) !== -1 && paperSourceType === 'collectBook' && paperParsing))
                    "
                    class="img"
                    src="./asset/img/answer_chbox.png"
                    alt=""
                />
                <img
                    v-else-if="newData.parseonly && newData.correctAnswer.indexOf(item.answer) === -1 && newData.userAnswer.indexOf(item.answer) !== -1"
                    class="img"
                    src="./asset/img/err_answer_chbox.png"
                    alt=""
                />
                <img v-else class="img" src="./asset/img/unchbox.png" alt="" />
            </template>
            <HtmlParse class="question-content" :article="`${item.answer}.${item.title}`" />
        </label>
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
        Collection,
        QuestionTool,
        Analysis,
        HtmlParse,
    },
    mixins: [specialQuestion],
    props: {
        // 试卷解析解析来源: parsing
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
        paperSourceType: {
            type: String,
            default: '',
        },
        type: {
            type: Boolean,
            default: false,
        },
        stemNumber: {
            type: Number,
            default: null,
        },
        data: {
            type: Object,
            default: () => {},
            require: true,
        },
    },
    data() {
        return {
            active: [],
        };
    },
    computed: {
        isIndefinite() {
            var typeList = this.newData.type.split('-');
            return typeList.indexOf('indefinite') !== -1;
        },
    },
    mounted() {
        var userAnswer = this.newData.userAnswer ? this.newData.userAnswer.split(',') : [];
        this.active = Array.from(new Set(userAnswer));
    },
    methods: {
        // 用户改变答案
        handlerClick(item) {
            if (this.questionBankStatus === 'special' || this.solvingMode) {
                if (!this.newData.isCheckOnly && this.newData.parseonly) return;
            } else if (this.newData.parseonly) return;
            var index = this.active.indexOf(item.answer);
            if (index !== -1) {
                this.active.splice(index, 1);
            } else {
                this.active.push(item.answer);
            }
            this.$emit('handle-change', 'multiple', this.active.sort().join(), this.newData.questionId);
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
                    userAnswer: this.active.join(',') || this.newData.userAnswer,
                });
            } else {
                this.newPaperParsing = !this.openParsing;
            }
        },
        // 用户保存答案
        save() {
            var values = this.active.sort().join(',');
            this.$emit('save-change', 'multiple', values, this.newData.questionId);
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
            this.$emit('click-opinion', this.data);
        },
        // 学习答疑
        clickAnswerQuestions() {
            this.$emit('click-answer-questions', this.data);
        },
        /**
         * "确定"事件
         *
         * @returns {boolean} false:终止代码执行
         */
        confirmBtnFun() {
            if (this.newData.parseonly && !this.newData.isCheckOnly) return false;
            let openParsing = this.openParsing;
            if (!(this.active.length || this.newData.userAnswer.length)) {
                openParsing = false;
            }
            this.$emit('changeCheckOnly', {
                openParsing,
                questionId: this.newData.questionId,
                userAnswer: this.active.join(',') || this.newData.userAnswer,
                isConfirmStatus: true,
            });
        },
    },
};
</script>

<style lang="less" scoped>
.multiple-choice-box {
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

    .multiple-item {
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
