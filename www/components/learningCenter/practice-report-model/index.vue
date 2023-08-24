<template>
    <div v-if="isShow" class="practice-report-model">
        <div class="practice-report-box">
            <div class="title-box">
                <img class="bg" src="./asset/img/bg.png" alt="" />
                <p class="title">练习报告</p>
                <img class="close" src="./asset/img/close.png" alt="" @click="close" />
            </div>
            <div class="hover-tips">
                <img src="./asset/img/query.png" />
                <p class="hover-summary">已禁用或已删除的试题不在统计范围内</p>
            </div>
            <div class="content-box">
                <div class="echars-box">
                    <Progress name="正确率" :props-rate="`${answersheetInfo.rightRate}`" width="120" height="120" stroke-width="9" />
                </div>
                <div class="item-box">
                    <p class="title">总题数</p>
                    <p class="content">{{ answersheetInfo.questionTotal }}</p>
                </div>
                <div class="item-box">
                    <p class="title">做题数</p>
                    <p class="content">{{ answersheetInfo.answerQuestionTotal }}</p>
                </div>
                <div class="item-box">
                    <p class="title">做对</p>
                    <p class="content">{{ answersheetInfo.rightQuestionTotal }}</p>
                </div>
                <div class="item-box">
                    <p class="title">做错</p>
                    <p class="content">{{ answersheetInfo.errorQuestionTotal }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@/api/qb/api..support-transcript.js';
import Progress from '@/www/components/learningCenter/evaluation-report/progress/index.vue';
export default {
    components: {
        Progress,
    },
    props: {
        answersheetId: {
            type: String,
            default: '',
        },
        isShow: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            answersheetInfo: {
                rightRate: 0, // 正确率
                questionTotal: 0, // 总题数
                answerQuestionTotal: 0, // 做题数
                rightQuestionTotal: 0, // 客观题答对题数
                errorQuestionTotal: 0, // 客观题答错题数
            },
        };
    },
    watch: {
        isShow(newVel) {
            if (newVel) {
                this.getData();
            }
        },
    },
    methods: {
        close() {
            this.$emit('close');
            this.$emit('update:isShow', false);
        },
        getData() {
            niceloo.api.call('qb/support-transcript', {
                answersheetId: this.answersheetId,
                onsuccess: (res) => {
                    this.answersheetInfo = res;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
};
</script>

<style lang="less" scoped>
.practice-report-model {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 102;
    .practice-report-box {
        width: 560px;
        background: #ffffff;
        border-radius: 13px;
        overflow: hidden;
        position: relative;

        .hover-tips {
            position: absolute;
            top: 146px;
            right: 24px;
            margin-right: 13px;
            img {
                width: 14px;
                height: 14px;
                cursor: pointer;
            }

            .hover-summary {
                position: absolute;
                right: -21px;
                top: 30px;
                z-index: 10;
                width: 228px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 12px;
                color: #ffffff;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 6px;
                display: none;
            }
            .hover-summary::before {
                content: '';
                height: 0;
                border-style: solid;
                border-width: 7px;
                border-color: transparent transparent rgba(0, 0, 0, 0.6) transparent;
                position: absolute;
                right: 22px;
                top: -14px;
                width: 0;
                z-index: 1;
            }
            &:hover {
                .hover-summary {
                    display: block;
                }
            }
        }
    }
    .title-box {
        position: relative;
        height: 121px;
        background: linear-gradient(180deg, #ffffff, #fff8ef);
        .bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 174px;
            height: 121px;
        }
        .title {
            padding-top: 20px;
            font-size: 18px;
            font-weight: 700;
            color: #333333;
            line-height: 18px;
            text-align: center;
        }
        .close {
            position: absolute;
            top: 14.8px;
            right: 21.8px;
            width: 30px;
            height: 30px;
            cursor: pointer;
        }
    }
    .content-box {
        padding: 35px 76px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .echars-box {
            position: relative;
            .correct-box {
                position: absolute;
                width: 100%;
                top: 40px;
                // left: 30px;
                .correct-content {
                    width: 100%;
                    padding: 0 20px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: flex-end;
                    .correct-num {
                        flex: 1;
                        text-align: right;
                        font-size: 27px;
                        font-weight: 700;
                        color: #f8323c;
                        line-height: 29px;
                    }
                    .correct-symbol {
                        width: 40%;
                        text-align: left;
                        font-size: 11px;
                        font-weight: 600;
                        color: #f8323c;
                        line-height: 15px;
                    }
                }
                .correct-text {
                    margin-top: 1px;
                    text-align: center;
                    font-size: 11px;
                    font-weight: 400;
                    color: #f8323c;
                    line-height: 14px;
                }
            }
        }
        .item-box {
            .title {
                font-size: 12px;
                font-weight: 400;
                color: #916c4d;
                line-height: 12px;
            }
            .content {
                margin-top: 10px;
                font-size: 22px;
                font-weight: 700;
                color: #4f2808;
                line-height: 20px;
            }
        }
    }
}
</style>
