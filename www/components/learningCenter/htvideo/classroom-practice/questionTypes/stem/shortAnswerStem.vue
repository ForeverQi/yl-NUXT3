<template>
    <div>
        <div class="question_title">
            <span class="xh">{{ questionData.paper_sub_seq + 1 }}、</span>
            <span class="tx">【简答题】</span>
            <co-parse :article="questionData.title" />
        </div>
        <div class="question_answers">
            <div class="question_answers_box">
                <textarea class="textinp" :disabled="!!questionData.questionAnswer" @input="(e) => inputHandle(e)" :value="questionData.answer"></textarea>
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
            value: '',
        };
    },
    mounted() {
        // this.value = this.questionData.answer;
    },
    methods: {
        inputHandle(e) {
            // this.value = e.target.value;
            // this.value = this.value.replace(/'/g,'').replace(/※/g,'').replace(/\|/g,'')
            this.$emit('chooseClick', e.target.value);
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
        width: 90%;
        height: 260px;
        overflow: hidden;
        border-radius: 8px;
        position: relative;

        textarea {
            width: 100%;
            height: 100%;
            padding: 10px;
            font-size: 18px;
            box-sizing: border-box;
            border-radius: 8px;
            outline: none;
            border: none;
            resize: none;

            &:disabled {
                color: #fff;
            }
        }
    }
}
</style>
