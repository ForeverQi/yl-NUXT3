<template>
    <div>
        <div class="tag-box">
            <div v-for="(item, index) in tagList" :key="index" class="tag-item">
                <i class="block-ico" :style="{ 'background-color': item.backgroundColor }"></i>
                {{ item.value }}
            </div>
        </div>
        <div class="type-content" :style="scrollClass">
            <div v-for="(item1, index1) in treeList" :key="index1" class="type-box">
                <div class="type-title" :id="item1.groupType">
                    {{ item1.typeName }}
                    <span class="size">（共{{ item1.questionList.length }}道）</span>
                </div>
                <div class="seq-box">
                    <div
                        v-for="(item2, index2) in item1.questionList"
                        :key="index2"
                        class="seq-item"
                        :class="{ active: current === index2 }"
                        :style="{ color: getColor(item2.questionStatus), 'background-color': getBackgroundColor(item2.questionStatus) }"
                        @click="$emit('item-click', item2)"
                    >
                        {{ item2.seq || index2 + 1 }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { appendQuestionTitleNumber } from './js/utils';
import { specialAppendQuestionTitleNumber } from '@/www/pages/you-lu-edu/special-question-brushing/js/utils.js';
export default {
    props: {
        paperType: {
            type: String,
            default: 'default',
        }, // 所使用的试卷类型，用于展示不同答题卡样式 default做题 errorBook错题本/paperWrong错题解析 collectBook收藏夹/paperAll全部解析
        list: {
            type: Array,
            default: () => [],
        }, // 传入的小题列表
        needScroll: {
            type: Boolean,
            default: false,
        }, // 当答题卡在右边时，需要溢出隐藏滚动
        scrollHeight: {
            type: [Number, String],
            default: 0,
        }, // 可滚动区域高度，单位px
        current: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            tagObj: {
                default: [
                    {
                        value: '未作答',
                        key: 'not-done',
                        color: '#3a3d4b',
                        backgroundColor: '#f5f5f5',
                    },
                    {
                        value: '已作答',
                        key: 'done',
                        color: '#ff0705',
                        backgroundColor: '#ffece8',
                    },
                ],
                paperWrong: [
                    {
                        value: '答对',
                        key: 'right',
                        color: '#fff',
                        backgroundColor: '#09B370',
                    },
                    {
                        value: '答错',
                        key: 'wrong',
                        color: '#fff',
                        backgroundColor: '#FE3C3B',
                    },
                ],
                errorBook: [
                    {
                        value: '答对',
                        key: 'right',
                        color: '#fff',
                        backgroundColor: '#09B370',
                    },
                    {
                        value: '答错',
                        key: 'wrong',
                        color: '#fff',
                        backgroundColor: '#FE3C3B',
                    },
                    {
                        value: '未作答',
                        key: 'not-done',
                        color: '#3a3d4b',
                        backgroundColor: '#f5f5f5',
                    },
                ],
                collectBook: [
                    {
                        value: '答对',
                        key: 'right',
                        color: '#fff',
                        backgroundColor: '#09B370',
                    },
                    {
                        value: '答错',
                        key: 'wrong',
                        color: '#fff',
                        backgroundColor: '#FE3C3B',
                    },
                    {
                        value: '未作答',
                        key: 'not-done',
                        color: '#3a3d4b',
                        backgroundColor: '#f5f5f5',
                    },
                    {
                        value: '已作答',
                        key: 'done',
                        color: '#ff0705',
                        backgroundColor: '#ffece8',
                    },
                ],
            },
            init: false,
        };
    },
    computed: {
        /**
         * @returns {string} special: 从专项小题库进入
         */
        questionBankStatus() {
            return this.$route.query.questionBankStatus;
        },
        tagList() {
            let type = this.paperType;
            if (type === 'paperAll') type = 'collectBook';
            return this.tagObj[type];
        },
        scrollClass() {
            return this.needScroll ? `max-height: ${this.scrollHeight}px; overflow-y: auto;` : '';
        },

        // 将传入的paperQuestionTypeList和list转换成答题卡组件所需结构
        treeList() {
            const questionList = this.list.map((_item, index) => {
                const item = Object.assign({}, _item);
                if (this.questionBankStatus === 'special') {
                    // 专项小题库
                    return specialAppendQuestionTitleNumber(item, index === 0 ? 'refresh' : '');
                } else {
                    return appendQuestionTitleNumber(item, index === 0 ? 'refresh' : '');
                }
            });

            const treeList = [];
            const treeMap = {};

            for (let item of questionList) {
                item.questionStatus = (() => {
                    // 答题模式只有已做、未做
                    if (this.paperType === 'default') {
                        return item.userAnswer ? 'done' : 'not-done';
                    }
                    // 没有对错的题型，如：简单题
                    if (this.questionBankStatus === 'special' && item.decideStatus === 'F' && item.userAnswer) {
                        return 'done';
                    }
                    if (item.decideStatus) {
                        return item.decideStatus === 'Y' ? 'right' : item.decideStatus === 'N' ? 'wrong' : 'not-done';
                    }
                    // 错题本/错题解析，答对、答错、未作答
                    if (['errorBook', 'paperWrong'].includes(this.paperType)) {
                        if (!item.hasConfirmAnswer) {
                            return 'not-done';
                        } else {
                            return item.correctAnswer == item.userAnswer ? 'right' : 'wrong';
                        }
                    }
                    // 收藏夹/全部解析，答对、答错、未作答、已作答
                    if (['collectBook', 'paperAll'].includes(this.paperType)) {
                        if (!item.hasConfirmAnswer) {
                            return 'not-done';
                        } else if (/judge|single|multiple|indefinite|blank|cloze/i.test(item.type)) {
                            // 非主观类型题型，抛对错
                            return item.correctAnswer == item.userAnswer ? 'right' : 'wrong';
                        } else return 'done';
                    }
                })();
                // 所有复合题型，都统一改为该复合题型
                // if (['default', 'paperWrong', 'paperAll'].includes(this.paperType)) {
                if (['cloze-fill', 'listening', 'analysis', 'compatibility'].includes(item.groupType)) item.typeName = item.stemTypeName || item.typeName;
                // } else if (/single|cloze/i.test(item.type)) {
                //     item.typeName = '单项选择题';
                // }
                Array.isArray(treeMap[item.typeName]) ? treeMap[item.typeName].push(item) : (treeMap[item.typeName] = [item]);

                // 处理编号
                // if (['default', 'paperWrong', 'paperAll', 'collectBook'].includes(this.paperType))
                item.seq = item.stemNumber ? `${item.stemNumber}-${item.number}` : item.number || item.questionStemSeq;
            }

            // 转换成树结构
            for (let typeName in treeMap) {
                treeList.push({
                    typeName,
                    groupType: treeMap[typeName][0].groupType,
                    questionList: treeMap[typeName],
                });
            }
            return treeList;
        },
    },
    watch: {
        treeList: {
            handler(val) {
                if (val.length && !this.init) {
                    this.init = true;
                    this.$emit('ready');
                }
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        getColor(status) {
            return this.tagList.find((i) => i.key === status).color;
        },

        getBackgroundColor(status) {
            return this.tagList.find((i) => i.key === status).backgroundColor;
        },
    },
};
</script>

<style lang="less" scoped>
.tag-box {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 16px 0 24px;
}

.tag-item {
    margin-right: 25px;
    padding-left: 16px;
    position: relative;
    font-size: 13px;
    color: #9698a2;
    line-height: 16px;

    .block-ico {
        width: 10px;
        height: 10px;
        background: #f5f5f5;
        border-radius: 2px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
}
.type-box {
    margin-top: 22px;

    &:first-child {
        margin-top: 0;
    }
}
.type-title {
    padding-bottom: 13px;
    font-size: 14px;
    color: #333333;
    line-height: 14px;
    .size {
        color: #99a1af;
    }
}
.seq-box {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
}
.seq-item {
    box-sizing: border-box;
    height: 26px;
    padding: 0 5px;
    min-width: 38px;
    margin-right: 10px;
    margin-bottom: 10px;
    line-height: 26px;
    border-radius: 2px;
    font-size: 14px;
    text-align: center;
    background-color: #f5f5f5;
    cursor: pointer;
}
</style>
