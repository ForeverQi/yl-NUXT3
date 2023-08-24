<template>
    <aside class="sheet-container">
        <h2 class="title">答题卡</h2>
        <ul class="sheet-list">
            <li v-for="(item, index) in questionList" :key="index" class="sheet-item">
                <h3 class="question-title">{{ item.papersubjectName }}（共{{ item.questionList.length }}题，合计{{ item.papersubjectTotalscore }}分）</h3>
                <ul class="question-list">
                    <li
                        v-for="(question, questionIndex) in item.questionList"
                        :key="question.questionId"
                        :class="['question-item', question.answer.length > 0 ? 'answered' : '']"
                        @click="handleLocation(question)"
                    >
                        {{ questionIndex + 1 }}
                    </li>
                </ul>
            </li>
        </ul>
        <div class="notice-container">
            <div class="notice"></div>
            未答
            <div class="notice active"></div>
            已答
        </div>
    </aside>
</template>

<script>
export default {
    props: {
        questionList: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        handleLocation(item) {
            this.$emit('location', item);
        },
    },
};
</script>

<style scoped lang="less">
aside {
    border: 0;
    font-weight: normal;
    display: block;
}
.sheet-container {
    width: 313px;
    background-color: white;
    box-sizing: border-box;
    overflow: auto;
    max-height: 100%;
    .title {
        font-weight: bold;
        font-size: 16px;
        position: relative;
        color: #333333;
        padding: 14px 16px;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        justify-content: space-between;
    }

    .sheet-list {
        padding: 24px 16px 0;

        .sheet-item + .sheet-item {
            margin-top: 24px;
        }
        .sheet-item {
            box-sizing: border-box;

            .question-title {
                font-size: 14px;
                color: black;
            }
            .question-list {
                display: flex;
                flex-wrap: wrap;
                margin-top: 16px;
                padding-bottom: 24px;
                border-bottom: 1px solid #e8e8e8;
                .question-item {
                    width: 44px;
                    height: 28px;
                    line-height: 28px;
                    text-align: center;
                    border-radius: 2px;
                    margin-left: 8px;
                    margin-top: 14px;
                    background-color: white;
                    border: 1px solid #d9d9d9;
                    color: #333;
                    font-size: 14px;
                    box-sizing: border-box;
                    cursor: pointer;
                    &.answered {
                        color: white;
                        background-color: #1890ff;
                        border: 1px solid #1890ff;
                    }
                }
                .question-item:nth-child(5n + 1) {
                    margin-left: 0;
                }
                .question-item:nth-child(-n + 5) {
                    margin-top: 0;
                }
            }
        }
        .sheet-item:last-child {
            .question-list {
                border-bottom: none;
            }
        }
    }

    .notice-container {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #3a3d4b;
        justify-content: flex-end;
        margin-bottom: 26px;
        margin-right: 18px;
        margin-top: 7px;

        .notice {
            width: 16px;
            height: 12px;
            background-color: rgba(215, 215, 215, 1);
            border: 1px solid #d9d9d9;
            border-radius: 2px;
            box-sizing: border-box;
            margin-right: 4px;
        }

        .active {
            background-color: #1890ff;
            margin-left: 10px;
            border: none;
        }
    }
}
</style>
