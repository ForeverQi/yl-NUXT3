<template>
    <div class="listening-box">
        <div class="title-box">
            <Audio ref="audio" :url="getAudioUrl" :item-data="{ filePath: type ? data.stem.audioVid : data.audioVid }" />
            <HtmlParse class="html" :article="data.stemTitle" />
        </div>
        <template v-if="type">
            <component
                :is="modelType[data.type]"
                :type="type"
                :data="data"
                v-bind="$attrs"
                :paper-source-type="paperSourceType"
                :paper-parsing="paperParsing"
                :show-knowledge="showKnowledge"
                :paper-parsing-source="paperParsingSource"
                :show-confirm-btn="showConfirmBtn"
                @handle-change="handleChange"
                @click-collection="clickCollection"
                @save-change="saveChange"
                @click-remove-errquestion="clickRemoveErrquestion"
                @click-opinion="clickOpinion"
                @click-answer-questions="clickAnswerQuestions"
                @changeCheckOnly="changeCheckOnly"
            />
        </template>
        <template v-else>
            <component
                v-for="(item, childIndex) in data.questionList"
                :key="childIndex"
                class="question-component"
                :is="modelType[item.type]"
                v-bind="$attrs"
                :stem-number="data.stemNumber"
                :data="item"
                :paper-source-type="paperSourceType"
                :paper-parsing="paperParsing"
                :show-knowledge="showKnowledge"
                :paper-parsing-source="paperParsingSource"
                :show-confirm-btn="showConfirmBtn"
                @handle-change="handleChange"
                @click-collection="clickCollection"
                @save-change="saveChange"
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
import MultipleChoice from './multiple-choice.vue';
import Explain from './explain.vue';
import Fill from './fill.vue';
import ChooseFill from './choose-fill.vue';
import Audio from './audio.vue';
export default {
    components: {
        Radio,
        MultipleChoice,
        Explain,
        Fill,
        ChooseFill,
        Audio,
        HtmlParse,
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
    data() {
        return {
            modelType: {
                'listening-single': 'Radio', // 单选题
                'listening-multiple': 'MultipleChoice', // 多选题
                'listening-indefinite': 'MultipleChoice', // 不定项选择题
                'listening-opinion': 'Explain', // 简答题
                'listening-judge': 'Radio', // 判断题
                'listening-fill': 'Fill', // 填空题
                'listening-blank-choose': 'ChooseFill', // 选词填空
            },
        };
    },
    computed: {
        getAudioUrl() {
            return this.$urlUtils.getViewUrl(this.data.audioVid);
        },
    },
    watch: {
        'data.audioPause'(newVal) {
            if (newVal) {
                this.$refs.audio.pausePlay();
            } else {
                this.$refs.audio.startPlay();
            }
        },
    },
    methods: {
        // 意见反馈
        clickOpinion(data) {
            this.$emit('click-opinion', data);
        },
        // 用户改变答案
        handleChange(type, item, index) {
            this.$emit('handle-change', ['listening', type], item, index);
        },
        // 用户保存答案
        saveChange(type, item, questionId) {
            this.$emit('save-change', ['listening', type], item, questionId);
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
.listening-box {
    box-sizing: border-box;
    background: #fff;
    padding-top: 32px;
    .title-box {
        margin: 0 32px 67px 32px;
        padding: 20px;
        box-sizing: border-box;
        background: #f5f6f9;
        border-radius: 12px;
        .html {
            margin-top: 8px;
            display: block;
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
