<template>
    <div :id="newData.questionId" class="explain-box">
        <div class="title-box">
            <div class="tag" />
            <span class="number" v-if="questionBankStatus === 'special'">
                {{ newData.isCompositeQuestion ? newData.questionSeq : newData.questionStemSeq }}.
            </span>
            <span class="number" v-else>{{ stemNumber ? `${stemNumber}-${newData.number}` : newData.number }}.</span>
            <p v-if="newData.stemId" class="tag-name">简答题</p>
            <p v-if="questionBankStatus === 'special' && newData.isCompositeQuestion" class="tag-name">简答题</p>
            <HtmlParse class="html" :article="newData.title" />
        </div>
        <div>
            <div v-if="showCorrectAnswer" class="text-area">
                <HtmlParse :article="newData.correctAnswer" />
            </div>
            <textarea
                v-else
                ref="textarea"
                class="text-area"
                :placeholder="newData.parseonly ? '' : '请输入你的答案......'"
                :disabled="disabledStatus"
                maxlength="1000"
                :value="newData.userAnswer"
                @blur="handleBlur"
            />
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
        /**
         * 是否在题干显示标准答案
         * 错题本/收藏夹全部解析页面比较特殊，没有用户答案，但展示全部答案，在富文本的答案部分的处理与其他处不同
         */
        showCorrectAnswer: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            timer: null,
        };
    },
    computed: {
        /**
         * @returns {boolean} disabled配置
         */
        disabledStatus() {
            let status = '';
            if (this.questionBankStatus === 'special' || this.solvingMode) {
                status = this.newData.parseonly && !this.newData.isCheckOnly;
            } else {
                status = this.newData.parseonly;
            }
            return status;
        },
    },
    mounted() {
        this.openParsing = this.paperParsing;
    },
    methods: {
        // 打开/收起解析
        clickParsing() {
            if (this.questionBankStatus === 'special' || this.solvingMode) {
                this.$emit('changeCheckOnly', {
                    openParsing: this.openParsing,
                    questionId: this.newData.questionId,
                    userAnswer: this.$refs.textarea.value || this.newData.userAnswer,
                });
            } else {
                this.newPaperParsing = !this.openParsing;
            }
        },
        // 用户改变答案
        // handleChange() {
        //     if (this.timer) {
        //         clearTimeout(this.timer);
        //         this.timer = null;
        //     }
        //     this.timer = setTimeout(() => {
        //         this.timer = null;
        //         this.$emit('handle-change', 'explain', this.$refs.textarea.value, this.newData.questionId);
        //     }, 500);
        // },
        // 用户改变答案
        handleBlur() {
            var val = this.$refs.textarea.value;
            if (this.newData.userAnswer !== val) {
                this.$emit('handle-change', 'explain', this.$refs.textarea.value, this.newData.questionId);
            }
        },
        // 错题本解析页单题删除
        clickRemoveErrquestion(questionId, errorQuestionId) {
            this.$emit('click-remove-errquestion', questionId, errorQuestionId);
        },
        // 用户保存答案
        async save() {
            await this.$emit('handle-change', 'explain', this.$refs.textarea.value, this.newData.questionId);
            await this.$emit('save-change', 'explain', this.$refs.textarea.value, this.newData.questionId);
        },
        // 意见反馈
        clickOpinion() {
            this.$emit('click-opinion', this.data);
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
        /**
         * "确定"事件
         *
         * @returns {boolean} false:终止代码执行
         */
        confirmBtnFun() {
            if (this.newData.parseonly && this.openParsing) return false;
            this.$emit('changeCheckOnly', {
                openParsing: this.openParsing,
                questionId: this.newData.questionId,
                userAnswer: this.$refs.textarea.value || this.newData.userAnswer,
                isConfirmStatus: true,
            });
        },
    },
};
</script>

<style lang="less" scoped>
.explain-box {
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
    .text-area {
        margin-top: 16px;
        width: 100%;
        min-height: 88px;
        padding: 10px;
        outline: none;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        font-size: 16px;
        box-sizing: border-box;
        resize: vertical;
        &:focus {
            border-color: rgb(255, 46, 48);
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
