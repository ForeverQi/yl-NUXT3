<template>
    <div>
        <div class="question_title">
            <span class="xh">{{ questionData.paper_sub_seq + 1 }}、</span>
            <span class="tx">【{{ typeMap[questionData.questionType] }}】</span>
            <co-parse :article="questionData.title" />
        </div>
        <div class="question_answers">
            <div class="question_answers_box">
                <div
                    class="item"
                    :class="{ active: (questionData.answer || '').indexOf(item.type) > -1 }"
                    v-for="item in formatOption(questionData)"
                    :key="item.questionId"
                    @click="chooseClick(item)"
                >
                    <span class="type">{{ item.type }}.</span>
                    <co-parse :article="item.content" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CoParse from '../vbParse.vue';
export default {
    components: {
        CoParse,
    },
    props: {
        questionData: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            typeMap: {
                I: '不定项选择',
                M: '多选题',
            },
        };
    },
    methods: {
        formatOption(item) {
            //兼容配伍题option为空的问题
            let option = item.option || [];
            if (option.length == 0) {
                var optionstr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substr(0, item.optionnum);
                for (let i = 0; i < optionstr.length; i++) {
                    option.push({ type: optionstr.charAt(i) });
                }
            }
            return option;
        },
        chooseClick(item) {
            if (this.questionData.questionAnswer) {
                return;
            }
            let arr = [];
            if (!this.questionData.answer) {
                // this.questionData.answer = '';
                arr = [];
            } else {
                arr = this.questionData.answer.split(',');
            }

            arr.includes(item.type)
                ? arr.splice(
                      arr.findIndex(($item) => $item === item.type),
                      1
                  )
                : arr.push(item.type);
            let tmpVal = [];
            var optionstr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substr(0, item.optionnum);
            for (let i = 0; i < optionstr.length; i++) {
                if (arr.includes(optionstr.charAt(i))) {
                    tmpVal.push(optionstr.charAt(i));
                }
            }
            this.$emit('chooseClick', tmpVal.join(','));
        },
    },
};
</script>
<style lang="less" scoped>
.question_title {
    font-size: 24px;
    padding: 0px 0px 0px 40px;
    position: relative;

    .xh {
        position: absolute;
        left: 0px;
    }

    .tx {
        font-size: 24px;
        color: #ed5636;
    }
}

.question_answers {
    padding: 30px 0px 0px 40px;
    display: flex;

    .question_answers_box {
        width: 100%;
    }

    .item {
        border: 1px solid rgba(125, 153, 202, 1);
        border-radius: 4px;
        padding: 12px 20px 12px 50px;
        margin-bottom: 24px;
        width: 100%;
        color: #ffffff;
        font-size: 20px;
        cursor: pointer;
        box-sizing: border-box;

        &.active {
            border: 1px solid rgba(73, 79, 222, 1);
            background: rgba(73, 79, 222, 1);
            color: #ffffff;
        }

        .type {
            margin-right: 10px;
        }
    }
}
</style>
