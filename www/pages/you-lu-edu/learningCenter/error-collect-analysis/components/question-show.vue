<template>
    <div class="question-init">
        <div v-for="(item, index) in questionList" :key="index" class="question-item" :class="{ separate: type }">
            <div class="title-box" v-if="index === 0">
                <p class="type-title">
                    {{ item.typeName }}
                    <span class="total">（共{{ total }}道）</span>
                </p>
            </div>
            <component
                :key="item.questionId"
                :is="modelType[item.groupType || item.type]"
                class="question-component"
                :type="type"
                :data="item"
                :paper-source-type="paperSourceType"
                :show-correct-answer="true"
                :paper-parsing="paperParsing"
                @click-collection="clickCollection"
                @click-remove-errquestion="clickRemoveErrquestion"
                @click-opinion="clickOpinion"
                @click-answer-questions="clickAnswerQuestions"
            />
        </div>
        <slot name="btn-slot" />
    </div>
</template>

<script>
import { arabiaToSimplifiedChinese } from '@/www/components/components/question/js/utils.js';
export default {
    components: {
        Radio: () => import('@/www/components/components/question/question-show/radio.vue'),
        MultipleChoice: () => import('@/www/components/components/question/question-show/multiple-choice.vue'),
        Explain: () => import('@/www/components/components/question/question-show/explain.vue'),
        Fill: () => import('@/www/components/components/question/question-show/fill.vue'),
        ChooseFill: () => import('@/www/components/components/question/question-show/choose-fill.vue'),
        ClozeFill: () => import('@/www/components/components/question/question-show/cloze-fill.vue'),
        Listening: () => import('@/www/components/components/question/question-show/listening.vue'),
        CaseAnalysis: () => import('@/www/components/components/question/question-show/case-analysis.vue'),
        Compatibility: () => import('@/www/components/components/question/question-show/compatibility.vue'),
    },
    props: {
        // 是否直接打开的是解析页
        paperParsing: {
            type: Boolean,
            default: false,
        },
        // 试卷类型: errorBook 错题本 collectBook 收藏夹
        paperSourceType: {
            type: String,
            default: '',
        },
        // 当前小题列表
        list: {
            type: Array,
            default: () => [],
        },
        // 当前卷子的题型列表，用于组装前端数据结构
        paperQuestionTypeList: {
            type: Array,
            default: () => [],
        },
        // 当前所答题目在小题集合questionList中的下标
        current: {
            type: Number,
            default: 0,
        },
        //试题总数
        total: {
            type: Number,
            default: 0,
        },
        //当前是第几页-用于拼接试题展示的序号
        pageIndex: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            type: false,
            questionList: [], // 所有小题列表
            currentIndex: parseInt(this.current), // 当前做题下标
            modelType: {
                single: 'Radio', // 单选题
                multiple: 'MultipleChoice', // 多选题
                indefinite: 'MultipleChoice', // 不定项选择题
                opinion: 'Explain', // 简答题
                judge: 'Radio', // 判断题
                fill: 'Fill', // 填空题
                'blank-choose': 'ChooseFill', // 选词填空
                'cloze-fill': 'ClozeFill', // 完型填空
                listening: 'Listening', // 听力题
                analysis: 'CaseAnalysis', // 案例分析
                compatibility: 'Compatibility', // 配伍题
            },
        };
    },
    watch: {
        list: {
            handler() {
                this.initQuestionList();
            },
            deep: true,
        },
        current() {
            this.currentIndex = this.current;
        },
    },
    mounted() {
        this.initQuestionList();
    },
    methods: {
        arabiaToSimplifiedChinese, // 阿拉伯数字转汉字
        // 意见反馈
        clickOpinion(data) {
            this.$emit('click-opinion', data);
        },
        // 学习答疑
        clickAnswerQuestions(data) {
            this.$emit('click-answer-questions', data);
        },
        // 错题本解析页单题删除
        clickRemoveErrquestion(questionId, errorQuestionId) {
            this.$emit('click-remove-errquestion', {
                questionId,
                errorQuestionId,
            });
        },
        // 收藏事件
        clickCollection(data) {
            this.currentIndex = (this.list || []).findIndex((item) => item.questionId === data.questionId);
            this.$emit('update:current', this.currentIndex);
            this.$emit('on-favorite');
        },

        /**
         * 初始化传入列表数据--展示形式 大题题干-小题 大题题干-小题
         */
        initQuestionList() {
            let questionList = [];
            let currentNumber = 0;
            this.list.forEach((_item, index) => {
                const item = Object.assign({}, _item);

                item._ifShow = index === this.current; // 当前题目是否展示
                item.showParseButton = !!_item.userAnswer; // 是否展示解析按钮
                currentNumber++;
                if (item.stemId) {
                    questionList.push({
                        ...JSON.parse(JSON.stringify(_item)),
                        questionList: [
                            {
                                ...JSON.parse(JSON.stringify(_item)),
                                number: 5 * (this.pageIndex - 1) + currentNumber,
                            },
                        ],
                    });
                } else {
                    _item.number = 5 * (this.pageIndex - 1) + currentNumber;
                    questionList.push(_item);
                }
            });
            this.questionList = questionList;
            console.log('[questionList]：', this.questionList);
        },
    },
};
</script>
<style lang="less" scoped>
.question-init {
    position: relative;
    .close-all {
        box-sizing: border-box;
        position: fixed;
        margin-top: 105px;
        margin-left: -40px;
        padding: 10px 13px;
        width: 40px;
        height: 150px;
        background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
        border-radius: 6px 0px 0px 6px;
        cursor: pointer;
        .img {
            display: block;
            // margin: 0 auto;
            width: 12px;
            // height: 10px;
        }
        .text {
            width: 14px;
            margin-top: 6px;
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;
            line-height: 19px;
        }
    }
}
.question-item {
    margin-bottom: 16px;
    .title-box {
        display: flex;
        align-items: flex-start;
        background: #fff;
        border-bottom: 1px solid #f5f5f5;
        .type-title {
            flex-shrink: 0;
            margin-right: 6px;
            padding: 0 15px;
            font-size: 14px;
            font-weight: 700;
            color: #333333;
            line-height: 54px;
        }
        .type-text {
            font-size: 14px;
            color: #53586c;
            line-height: 54px;
        }
        .total {
            font-size: 14px;
            color: #53586c;
            line-height: 14px;
        }
    }
    .question-component {
        border-bottom: 1px solid #f5f6f9;
    }
}
.separate {
    margin-bottom: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.5s;
    .title-box {
        margin-bottom: 0;
    }
}
</style>
