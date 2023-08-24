<template>
    <div class="card-wrap">
        <div class="card-top">
            <div class="title-box">
                <div class="title">答题卡</div>
                <!-- 专项小题库 -->
                <template v-if="questionBankStatus === 'special'">
                    <span class="clearRedo" @click="clearRedo">清空重做</span>
                </template>
                <!-- 非背题、做题模式才显示 -->
                <template v-else-if="!solvingMode">
                    <label for="autoNext" class="auto-next" @click="changeAutoNext">
                        <input type="checkbox" id="autoNext" v-model="autoNext" />
                        <span>自动跳转下一题</span>
                    </label>
                </template>
            </div>
            <div class="question-list">
                <question-card need-scroll scroll-height="310" :list="list" @item-click="itemClick" />
            </div>
        </div>
        <div class="btn-box">
            <template v-if="questionBankStatus === 'special'">
                <div class="btn submit" @click="handleSaveFn">结束作答，查看报告</div>
            </template>
            <template v-else>
                <div class="btn save" @click="submit('save')">保存进度，下次继续</div>
                <div class="btn submit" @click="submit('submit')">{{ submitText }}</div>
            </template>
        </div>
    </div>
</template>

<script>
import QuestionCard from '@/www/components/components/question/question-card.vue';
export default {
    components: {
        QuestionCard,
    },
    props: {
        // 当前小题列表
        list: {
            type: Array,
            default: () => [],
        },
        current: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            currentIndex: parseInt(this.current), // 当前做题下标
            autoNext: true,
        };
    },
    computed: {
        /**
         * @returns {string} special: 从专项小题库进入
         */
        questionBankStatus() {
            return this.$route.query.questionBankStatus;
        },
        /**
         * @returns {string} 刷题模式：do-exercise: 背题模式; do-exam:做题模式
         */
        solvingMode() {
            return this.$route.query.solvingMode;
        },
        /**
         * @returns {string} 交卷按钮文案
         */
        submitText() {
            let text = '交卷';
            // 专项小题库：背题模式和做题模式下的文案显示
            if (this.questionBankStatus === 'special' || this.solvingMode) {
                text = '结束作答，查看报告';
            }
            return text;
        },
    },
    methods: {
        submit(type) {
            this.$emit('handleSave', type);
        },
        itemClick(question) {
            this.$emit('clickAnswersheet', question.questionId);
        },
        changeAutoNext() {
            this.$emit('changeAutoNext', !this.autoNext);
        },
        // 清空重做
        clearRedo() {
            this.$emit('clearRedo');
        },
        handleSaveFn() {
            this.$emit('handleSave', 'submit', 'internal');
        },
    },
};
</script>

<style lang="less" scoped>
.card-wrap {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    min-height: 240px;
    max-height: 550px;
    background: #ffffff;

    .card-top {
        padding: 0 8px 0 20px;

        .title-box {
            width: 285px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e8e8e8;
            padding: 15px 0;

            .title {
                font-size: 16px;
                font-weight: 700;
                color: #3a3d4b;
                line-height: 16px;
            }

            .auto-next {
                font-size: 12px;
                font-weight: 400;
                color: #9698a2;
                line-height: 12px;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;

                span {
                    margin-left: 4px;
                }
            }
        }

        .question-list {
            padding-bottom: 15px;
        }
    }

    .btn-box {
        padding-bottom: 24px;

        .btn {
            width: 282px;
            height: 40px;
            line-height: 40px;
            border-radius: 4px;
            font-size: 16px;
            font-weight: 400;
            text-align: center;
            color: #3a3d4b;
            margin: 0 auto;
            cursor: pointer;

            &.save {
                background: #f4f4f5;
                margin-bottom: 17px;
            }

            &.submit {
                background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
                color: #ffffff;
            }
        }
    }
    .clearRedo {
        font-size: 14px;
        color: #ff0705;
        cursor: pointer;
    }
}
</style>
