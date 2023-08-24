<template>
    <main class="question-container">
        <h2 class="question-title">{{ paperInfo && paperInfo.paperName }}</h2>
        <p class="size-wrapper">
            字体
            <span class="btn-wrapper">
                <button :class="['size small', fontSize === 14 ? 'active' : '']" @click="handleFontSize(14)">小</button>
                <button :class="['size medium', fontSize === 16 ? 'active' : '']" @click="handleFontSize(16)">中</button>
                <button :class="['size big', fontSize === 18 ? 'active' : '']" @click="handleFontSize(18)">大</button>
            </span>
        </p>
        <ul :class="['question-type-list', fontSize === 18 ? 'size-big' : '', fontSize === 16 ? 'size-medium' : '', fontSize === 14 ? 'size-small' : '']">
            <li v-for="(item, index) in questionList" :key="item.questionId" class="question-type-item">
                <h3 class="title">
                    {{ transformToChinese(index + 1) }}、{{ item.papersubjectName }}（共{{ item.questionList.length }}题，合计{{
                        item.papersubjectTotalscore
                    }}分）
                </h3>
                <ul class="question-list">
                    <li
                        v-for="(question, questionIndex) in item.questionList"
                        :key="questionIndex"
                        class="question-item"
                        :data-questionId="question.questionId"
                    >
                        <p class="question-item-title">
                            <span class="number">{{ questionIndex + 1 }}、</span>
                            <vParse :article="question.title"></vParse>
                        </p>
                        <ul class="option-list" :data-questionId="question.questionId">
                            <li
                                v-for="(option, optionIndex) in question.option"
                                :key="optionIndex"
                                class="option-item"
                                :style="{ 'flex-basis': question.flexRate }"
                                :data-flex-rate="question.flexRate"
                                :data-two-column="question.isTwoColumn"
                                :data-one-column="question.isOneColumn"
                            >
                                <template v-if="item.questionType === 'S'">
                                    <input type="radio" :id="question.questionId + option.type" v-model="question.answer" class="single" :value="option.type" />
                                    <label :for="question.questionId + option.type">
                                        {{ option.type }}、
                                        <vParse :article="option.content"></vParse>
                                    </label>
                                </template>
                                <template v-else-if="item.questionType === 'M'">
                                    <input
                                        type="checkbox"
                                        :id="question.questionId + option.type"
                                        v-model="question.answer"
                                        class="multi"
                                        :value="option.type"
                                    />
                                    <label :for="question.questionId + option.type">
                                        {{ option.type }}、
                                        <vParse :article="option.content"></vParse>
                                    </label>
                                </template>
                                <template v-else-if="item.questionType === 'J'">
                                    <input type="radio" :id="question.questionId + option.type" v-model="question.answer" class="judge" :value="option.type" />
                                    <label :for="question.questionId + option.type"><vParse :article="option.content"></vParse></label>
                                </template>
                                <template v-else-if="item.questionType === 'I'">
                                    <input
                                        type="checkbox"
                                        :id="question.questionId + option.type"
                                        v-model="question.answer"
                                        class="multi"
                                        :value="option.type"
                                    />
                                    <label :for="question.questionId + option.type">
                                        {{ option.type }}、
                                        <vParse :article="option.content"></vParse>
                                    </label>
                                </template>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </main>
</template>

<script>
import vParse from '../components/fire-exam/vParse.vue';

export default {
    components: { vParse },
    props: {
        questionList: {
            type: Array,
            default: () => [],
        },
        refresh: {
            type: Boolean,
            default: false,
        },
        location: {
            type: Object,
            default: () => ({}),
        },
        paperInfo: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            chnNumChar: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
            chnUnitSection: ['', '万', '亿', '万亿', '亿亿'],
            chnUnitChar: ['', '十', '百', '千'],
            questionTypes: { S: '单选题', M: '多选题', J: '判断题' },
            fontSize: 16,
        };
    },
    watch: {
        refresh(newV) {
            console.warn('refresh', newV);
            this.$nextTick(this.calHeight);
        },
        location(newV) {
            if (!newV) {
                return;
            }
            document.querySelector(`.question-item[data-questionid='${newV.questionId}']`).scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
    },
    mounted() {
        this.calHeight();
    },
    methods: {
        calHeight() {
            const ar = this.questionList.map((item) => item.questionList).flat(Number.POSITIVE_INFINITY);
            const mp = new Map(ar.map((item) => [item.questionId, item]));
            const elements = document.querySelectorAll('.option-list');
            for (const elem of elements) {
                const item = mp.get(elem.getAttribute('data-questionId'));
                item.isTwoColumn = elem.scrollHeight > 35;
                if (elem.scrollHeight > 35) {
                    const rate = (elem.scrollWidth - 48) / elem.scrollWidth;
                    item.flexRate = `${parseInt((rate * 100) / 2)}%`;
                } else {
                    item.flexRate = 'auto';
                }
            }
            setTimeout(this.calHeightFour, 0, mp, elements);
        },
        calHeightFour(mp, elements) {
            for (const elem of elements) {
                const questionId = elem.getAttribute('data-questionId');
                const item = mp.get(questionId);
                if (item.flexRate !== 'auto') {
                    for (const child of elem.children) {
                        item.isOneColumn = parseFloat(getComputedStyle(child).height) > 35;
                        if (item.isOneColumn) {
                            item.isTwoColumn = false;
                            const rate = (elem.scrollWidth - 48) / elem.scrollWidth;
                            item.flexRate = `${parseInt(rate * 100)}%`;
                            break;
                        }
                    }
                }
            }
        },
        handleFontSize(val) {
            this.fontSize = val;
        },
        numToChn(num) {
            let index = num.toString().indexOf('.');
            if (index != -1) {
                let str = num.toString().slice(index);
                let a = '点';
                for (let i = 1; i < str.length; i++) {
                    a += this.chnNumChar[parseInt(str[i])];
                }
                return a;
            }
        },
        sectionToChinese(section) {
            //定义在每个小节的内部进行转化的方法，其他部分则与小节内部转化方法相同
            let str = '';
            let chnstr = '';
            let zero = false;
            let count = 0;
            while (section > 0) {
                let v = section % 10;
                if (v == 0) {
                    if (zero) {
                        zero = false;
                        chnstr = this.chnNumChar[v] + chnstr;
                    }
                } else {
                    zero = true;
                    str = this.chnNumChar[v];
                    str += this.chnUnitChar[count];
                    chnstr = str + chnstr;
                }
                count++;
                section = Math.floor(section / 10);
            }
            return chnstr;
        },
        transformToChinese(num) {
            if (num > 9 && num < 20) {
                return '十' + (num % 10 ? chnNumChar[num % 10] : '');
            }
            let a = this.numToChn(num) || '';
            num = Math.floor(num);
            let unitPos = 0;
            let strIns = '';
            let chnStr = '';
            let needZero = false;

            if (num === 0) {
                return this.chnNumChar[0];
            }
            while (num > 0) {
                let section = num % 10000;
                if (needZero) {
                    chnStr = this.chnNumChar[0] + chnStr;
                }
                strIns = this.sectionToChinese(section);
                strIns += section !== 0 ? this.chnUnitSection[unitPos] : this.chnUnitSection[0];
                chnStr = strIns + chnStr;
                needZero = section < 1000 && section > 0;
                num = Math.floor(num / 10000);
                unitPos++;
            }

            return chnStr + a;
        },
    },
};
</script>

<style scoped lang="less">
.question-container {
    background-color: white;
    box-sizing: border-box;
    margin-left: 12px;
    margin-right: 12px;
    padding: 30px 0;
    overflow: auto;
    height: 100%;
    .size-wrapper {
        text-align: right;
        margin-top: 8px;
        margin-bottom: 16px;
        font-size: 16px;
        .btn-wrapper {
            display: inline-block;
            padding: 4px;
            border-radius: 6px;
            margin-left: 12px;
            margin-right: 22px;
            .size {
                background-color: transparent;
                border: none;
                outline: none;
                font-size: 14px;
                width: 38px;
                height: 27px;
                &:hover {
                    background: #f4f5f9;
                    border-radius: 6px;
                }
            }
            .active {
                color: #1890ff;
                font-weight: bold;
            }

            .small {
                font-size: 14px;
            }

            .medium {
                font-size: 16px;
            }
            .big {
                font-size: 18px;
            }
        }
    }
    .question-title {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
    }
    .size-big {
        font-size: 18px;
    }
    .size-medium {
        font-size: 16px;
    }
    .size-small {
        font-size: 14px;
    }
    .question-type-list {
        list-style: none;
        .question-type-item {
            list-style: none;
            margin-top: 30px;
            .title {
                font-weight: bold;
                line-height: 37px;
                padding-left: 16px;
                font-size: inherit;
            }
            .question-list {
                list-style: none;
                margin-top: 24px;
                padding-left: 40px;
                padding-right: 40px;
                .question-item {
                    list-style: none;

                    .option-list {
                        list-style: none;
                        margin: 16px 23px 0;
                        display: flex;
                        flex-wrap: wrap;
                        .option-item {
                            list-style: none;
                            margin-right: 24px;
                            flex-basis: auto;
                            cursor: pointer;
                            .single {
                                margin-right: 8px;
                            }
                            .multi {
                                margin-right: 8px;
                            }
                            .judge {
                                margin-right: 8px;
                            }
                            &[data-two-column='true']:nth-child(n + 3) {
                                margin-top: 12px;
                            }
                            &[data-one-column='true']:nth-child(n + 2) {
                                margin-top: 12px;
                            }
                        }
                    }
                    .question-item-title {
                        .number {
                            font-weight: bold;
                        }
                    }

                    input[type='radio'] {
                        width: 12px;
                        height: 12px;
                        background-repeat: no-repeat;
                        background-image: url('./asset/images/radio_normal.png');
                        cursor: pointer;
                    }

                    input[type='radio']:checked {
                        background-image: url('./asset/images/radio_checked.png');
                    }

                    input[type='checkbox'] {
                        width: 12px;
                        height: 12px;
                        background-repeat: no-repeat;
                        background-image: url('./asset/images/checkbox_normal.png');
                        cursor: pointer;
                    }

                    input[type='checkbox']:checked {
                        background-image: url('./asset/images/checkbox_checked.png');
                    }

                    label {
                        cursor: pointer;
                    }
                }
                .question-item + .question-item {
                    margin-top: 28px;
                }
            }
        }
    }
}
</style>
