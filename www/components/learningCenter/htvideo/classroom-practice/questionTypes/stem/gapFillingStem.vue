<script>
export default {
    props: {
        questionData: {
            type: Object,
            default() {
                return {};
            },
        },
        backValue: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            value: {},
            calld: false,
        };
    },
    computed: {
        keyNum() {
            return this.questionContent.title.split('#answer').length - 1;
        },
    },
    created() {
        let arr = this.questionData.title.split('{#answer}');
        let answer = (this.questionData.answer || '').split('※');
        console.log(arr, answer, 'answer');
        for (let i = 0; i < arr.length; i++) {
            this.value[`value${i}`] = answer[i] ? answer[i] : '';
        }
    },
    render(createElement) {
        let self = this;
        let str = this.questionData.title;
        let arr = str.split('{#answer}');

        let childNode = [];

        for (let i = 0; i < arr.length; i++) {
            childNode.push(
                createElement(
                    'span',
                    {
                        domProps: {
                            innerHTML: arr[i],
                        },
                    },
                    ''
                )
            );

            if (i == arr.length - 1) {
                continue;
            }
            childNode.push(
                createElement('input', {
                    domProps: {
                        value: self.value[`value${i}`],
                        disabled: self.questionData.questionAnswer,
                    },
                    on: {
                        input(event) {
                            self.value[`value${i}`] = event.target.value;
                            self.value[`value${i}`] = self.value[`value${i}`].replace(/'/g, '').replace(/※/g, '').replace(/\|/g, '');

                            self.$nextTick(() => {
                                // self.$emit('chooseClick', self.value);
                                self.$emit('getValue', self.value);
                            });
                        },
                    },
                })
            );
        }

        let num = createElement('span', { class: 'xh' }, [self.questionData.paper_sub_seq + 1 + '、']);
        let tx = createElement('span', { class: 'tx' }, ['【填空题】']);
        childNode.unshift(tx);
        childNode.unshift(num);
        return createElement('div', { class: 'question_title con' }, childNode);
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
        margin-right: 10px;
    }

    &.con {
        display: inline-block;

        input {
            display: inline-block;
            vertical-align: top;
            height: 30px;
            margin: 0 6px;
            padding-left: 10px;
            padding-right: 10px;

            &:disabled {
                color: #fff;
            }
        }
    }
}
</style>
