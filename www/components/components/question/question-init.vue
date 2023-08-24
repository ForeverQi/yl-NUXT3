<template>
    <div ref="questionInit" class="question-init">
        <div v-if="!type && showCloseAll && showOperatingButton" class="close-all" :style="{ top: top + 'px' }" @click="closeAll">
            <img class="img" src="./asset/images/top.png" alt="" />
            <p class="text">收起全部试题</p>
        </div>
        <div v-for="(item, index) in treeList" :key="index" v-show="!type ? true : currentIndex === index" class="question-item" :class="{ separate: type }">
            <div class="title-box">
                <p v-if="paperSourceType !== 'questionModel'" class="type-title">
                    {{
                        `${arabiaToSimplifiedChinese(!type ? index + 1 : item.titleIndex)}、${
                            type ? (item.stemTypeName ? item.stemTypeName : item.typeName) : item.paperSubjectName || item.typeName
                        }`
                    }}
                </p>
                <div v-else class="question-tag">
                    <p class="type-title">{{ `${arabiaToSimplifiedChinese(item.titleIndex)}、` }}</p>
                    <p class="tag-name">{{ item.stemTypeName ? item.stemTypeName : item.typeName }}</p>
                </div>
                <p v-if="!['collectBook', 'errorBook', 'questionModel'].includes(paperSourceType)" class="type-text">
                    <!-- 专项小题库 -->
                    <template v-if="questionBankStatus === 'special'">
                        {{ `(共${item.paperQuestionTotalCount}道)` }}
                    </template>
                    <template v-else>
                        {{
                            `(${item.paperQuestionTotalCount ? `共${item.paperQuestionTotalCount}道, ` : ''}${
                                item.paperSubjectAverageScore ? `每题${item.paperSubjectAverageScore}分, ` : ''
                            }${item.paperSubjectTotalScore ? `共${item.paperSubjectTotalScore}分。 ` : ''}${
                                item.papersubjectMemo ? `${item.papersubjectMemo}。` : ''
                            })`
                        }}
                    </template>
                </p>
                <p v-if="paperSourceType === 'questionModel'" class="type-text">
                    {{ `(${item.paperQuestionTotalCount ? `共${item.paperQuestionTotalCount}道 ` : ''})` }}
                </p>
            </div>
            <template v-if="type">
                <component
                    :is="modelType[item.groupType]"
                    :type="type"
                    :data="item"
                    :key="item.questionId"
                    :paper-source-type="paperSourceType"
                    :paper-parsing="paperParsing"
                    :show-knowledge="showKnowledge"
                    :paper-parsing-source="paperParsingSource"
                    :show-confirm-btn="showConfirmBtn"
                    :show-index="index"
                    @handle-change="handleChange"
                    @click-collection="clickCollection"
                    @save-change="saveChange"
                    @click-remove-errquestion="clickRemoveErrquestion"
                    @click-opinion="clickOpinion"
                    @click-answer-questions="clickAnswerQuestions"
                    @changeCheckOnly="changeCheckOnly"
                    v-bind="$attrs"
                />
            </template>
            <template v-else>
                <component
                    v-for="(childItem, childIndex) in item.questionList"
                    :key="childIndex"
                    :is="modelType[item.paperSubjectType]"
                    class="question-component"
                    :type="type"
                    :data="childItem"
                    :paper-source-type="paperSourceType"
                    :paper-parsing="paperParsing"
                    :show-knowledge="showKnowledge"
                    :paper-parsing-source="paperParsingSource"
                    :show-confirm-btn="showConfirmBtn"
                    :show-index="index"
                    @handle-change="handleChange"
                    @click-collection="clickCollection"
                    @save-change="saveChange"
                    @click-remove-errquestion="clickRemoveErrquestion"
                    @click-opinion="clickOpinion"
                    @click-answer-questions="clickAnswerQuestions"
                    @changeCheckOnly="changeCheckOnly"
                    v-bind="$attrs"
                />
            </template>
        </div>
        <SeparateBtn
            v-if="type && showOperatingButton"
            :all-count="treeList.length"
            :question-index="currentIndex"
            :paper-source-type="paperSourceType"
            :paper-parsing="paperParsing"
            :paper-parsing-source="paperParsingSource"
            @click-all="clickAll"
            @click-back="clickBack"
            @click-next="clickNext"
            @click-save="clickSave"
        />
        <slot name="btn-slot" />
    </div>
</template>

<script>
import SeparateBtn from './separate-btn.vue';
import { appendQuestionTitleNumber, arrayGroupBy, arabiaToSimplifiedChinese } from '@/www/components/components/question/js/utils.js';
export default {
    components: {
        Radio: () => import('./question-show/radio.vue'),
        MultipleChoice: () => import('./question-show/multiple-choice.vue'),
        Explain: () => import('./question-show/explain.vue'),
        Fill: () => import('./question-show/fill.vue'),
        ChooseFill: () => import('./question-show/choose-fill.vue'),
        ClozeFill: () => import('./question-show/cloze-fill.vue'),
        Listening: () => import('./question-show/listening.vue'),
        CaseAnalysis: () => import('./question-show/case-analysis.vue'),
        Compatibility: () => import('./question-show/compatibility.vue'),
        SeparateBtn,
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
        // 是否展示左上角收起全部按钮
        showCloseAll: {
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
        // 外部传入 type
        setType: {
            type: Boolean,
            default: false,
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
            top: 105,
            initDomHeight: 0,
            initDomOffetTop: 0,
            timer: null,
            timerQuestionId: '',
            type: false, // 答题模式
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
    computed: {
        /**
         * @returns {string} special: 从专项小题库进入
         */
        questionBankStatus() {
            return this.$route.query.questionBankStatus;
        },
        // 将传入的questionList转换成组件可用的tree结构
        treeList() {
            const questionList = this.questionList;
            const paperQuestionTypeList = this.paperQuestionTypeList;
            const treeList = [];
            const treeMap = {};
            if (this.type) {
                return questionList;
            }

            for (let item of questionList) {
                Array.isArray(treeMap[item.groupType]) ? treeMap[item.groupType].push(item) : (treeMap[item.groupType] = [item]);
            }

            for (let groupType in treeMap) {
                treeList.push({
                    paperSubjectType: groupType,
                    questionList: treeMap[groupType],
                });
            }

            treeList.forEach((item) => {
                Object.assign(
                    item,
                    paperQuestionTypeList.filter((questionType) => {
                        return questionType.paperSubjectType === item.paperSubjectType;
                        // if(this.questionBankStatus === 'special'){
                        //     return questionType.questionType === item.paperSubjectType;
                        // }else{
                        // }
                    })[0]
                );
                if (['cloze-fill', 'listening', 'analysis', 'compatibility'].includes(item.paperSubjectType)) {
                    let newQuestion = [];
                    arrayGroupBy(item.questionList, 'stemId').forEach((_item, _index) => {
                        let obj = Object.assign(_item[0].stem, {
                            questionList: _item,
                            stemNumber: _index + 1,
                            stemUpperNumber: arabiaToSimplifiedChinese(_index + 1),
                        });
                        newQuestion.push(obj);
                        item.questionList = newQuestion;
                    });
                }
            });
            return treeList;
        },
    },
    watch: {
        list: {
            handler(val) {
                if (val.length) {
                    this.initQuestionList(val);
                }
            },
            deep: true,
            immediate: true,
        },
        current() {
            this.updateQuestionList();
        },
        setType(newValue) {
            this.type = this.paperSourceType === 'questionModel' ? true : this.setType;
        },
    },
    mounted() {
        this.type = this.setType;
        this.type = this.paperSourceType === 'questionModel' ? true : this.type;
        this.initQuestionList();
        window.addEventListener('scroll', this.scrollEvent);
    },
    destroyed() {
        // 组件销毁时要取消监听，不然会报错
        window.removeEventListener('scroll', this.scrollEvent);
    },
    methods: {
        scrollEvent() {
            if (!this.type) {
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                var initDomHeight = 0;
                if (this.$refs.questionInit && this.$refs.questionInit.getBoundingClientRect) {
                    initDomHeight = this.$refs.questionInit.getBoundingClientRect().height;
                }
                if (scrollTop + 105 > initDomHeight - 150) {
                    this.top = initDomHeight - 150;
                    return;
                }
                this.top = scrollTop + 105;
            }
        },
        // 意见反馈
        clickOpinion(data) {
            this.$emit('click-opinion', data);
        },
        // 学习答疑
        clickAnswerQuestions(data) {
            this.$emit('click-answer-questions', data);
        },
        arabiaToSimplifiedChinese, // 阿拉伯数字转汉字
        // 收起全部试题
        closeAll() {
            this.type = true;
            this.$emit('changeAnswerMode', this.type);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        },
        // 错题本解析页单题删除
        clickRemoveErrquestion(questionId, errorQuestionId) {
            this.$emit('click-remove-errquestion', {
                questionId,
                errorQuestionId,
            });
        },
        // 全部试题按钮事件
        clickAll() {
            var targetQuestionId = this.questionList[this.currentIndex].questionId;
            this.type = false;
            this.$emit('changeAnswerMode', this.type);
            this.$nextTick(() => {
                // 解决点击全部试题后跳转锚点定位偏移问题：延时并取消缓动
                setTimeout(() => {
                    var targetOffsetTop = document.getElementById(targetQuestionId) ? document.getElementById(targetQuestionId).offsetTop : 0;
                    window.scrollTo({
                        top: targetOffsetTop,
                    });
                }, 300);
            });
        },
        // 上一题按钮事件
        clickBack() {
            if (this.paperSourceType !== 'questionModel') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
            this.$emit('onPrev');
        },
        // 下一题按钮事件
        clickNext() {
            if (this.paperSourceType !== 'questionModel') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
            this.$emit('onNext');
        },
        // 提交事件(错题本/收藏夹使用)
        clickSave() {
            this.$emit('handle-save');
        },
        // 用户手动触发确认答案按钮
        saveChange(type, item, questionId) {
            this.currentIndex = (this.list || []).findIndex((item) => item.questionId === questionId);
            this.$emit('update:current', this.currentIndex);
            this.$emit('onConfirmAnswer', this.getData().userAnswer);
        },
        // 用户改变答案回调
        handleChange(type, data, questionId = null) {
            this.currentIndex = (this.list || []).findIndex((item) => item.questionId === questionId);
            this.setData({
                userAnswer: data,
            });
            this.$emit('update:current', this.currentIndex);
            var typeName = typeof type === 'string' ? type : type[1];
            if (typeName === 'radio') {
                this.$emit('onConfirmAnswer', data);
            }
            if (this.timerQuestionId !== questionId) {
                this.timerQuestionId = questionId;
                this.$emit('onChangeAnswer', { typeName, answer: data, questionId });
                return;
            }
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            /**
             * 为解决第一次请求和第二次请求之间间隔太短，两次请求入参都无answersheetId导致第二次请求接口报错的情况
             * 利用此处防抖，延长延迟时间为500毫秒，留出充分时间供第一次请求返回answersheetId
             */
            this.$emit('onChangeAnswer', { typeName, answer: data, questionId });
        },
        // 收藏事件
        clickCollection(data) {
            this.currentIndex = (this.list || []).findIndex((item) => item.questionId === data.questionId);
            this.$emit('update:current', this.currentIndex);
            this.$emit('onFavorite');
        },

        /**
         * 初始化传入列表数据
         */
        initQuestionList(list) {
            const newList = list || this.list;
            var titleIndex = 0;
            this.questionList = newList.map((_item, index) => {
                const item = Object.assign({}, _item);
                titleIndex += index === 0 ? 1 : _item.groupType === newList[index - 1].groupType ? 0 : 1;
                item.titleIndex = titleIndex;
                item._ifShow = index === this.current; // 当前题目是否展示
                item.showParseButton = !!_item.userAnswer; // 是否展示解析按钮
                return appendQuestionTitleNumber(item, index === 0 ? 'refresh' : '');
            });
            this.$emit('initEnd');
        },

        /**
         * 更新列表数据
         */
        updateQuestionList() {
            this.currentIndex = this.current;
        },

        /**
         * 设置当前/目标试题数据
         * @param {Object} obj
         * @param {String} target 针对解析时考点列表按需加载添加的入参，非必传，可以理解为所操作数据在questionList中的index
         */
        setData(obj, target) {
            return target ? Object.assign(this.questionList[Number(target)], obj) : Object.assign(this.questionList[this.currentIndex], obj);
        },

        /**
         * 获取当前试题数据
         * @return {Object}
         */
        getData() {
            return this.questionList[this.currentIndex];
        },

        /**
         * 获取全部组件题目数据
         */
        getList() {
            return this.questionList;
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
.question-init {
    position: relative;
    .close-all {
        box-sizing: border-box;
        position: absolute;
        // top: 105px;
        left: -40px;
        padding: 10px 13px;
        width: 40px;
        height: 150px;
        background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
        border-radius: 6px 0px 0px 6px;
        cursor: pointer;
        z-index: 10;
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
    &:last-child {
        margin-bottom: 0;
    }
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
        .question-tag {
            display: flex;
            align-items: center;
            .type-title {
                margin-right: 0;
                padding-right: 0;
            }
            .tag-name {
                margin-right: 7px;
                padding: 4px 10px;
                font-size: 12px;
                font-weight: 400;
                color: #848aa4;
                line-height: 16px;
                background: #f5f6f9;
                border-radius: 4px;
            }
        }
    }
}
.separate {
    margin-bottom: 0;
    // border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.5s;
    .title-box {
        margin-bottom: 0;
    }
}
</style>
