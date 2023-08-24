<template>
    <div class="btn-box">
        <!-- <div class="btn-item question-box" @click="handlerClick">
            <img class="img" src="./asset/img/question.png" alt="" />
            <p class="text">学习答疑</p>
        </div> -->
        <div v-if="paperSourceType === 'errorBook' && data.parseonly" class="btn-item remove-box" @click="handleRemove">
            <img class="img" src="./asset/img/edit.png" alt="" />
            <p class="text">移除错题</p>
        </div>
        <div v-if="isShowAnsweringQuestion" ref="opinion" class="btn-item edit-box" @click="handleAnswerQuestions">
            <img class="img" src="./asset/img/answer_questions.png" alt="" />
            <p class="text">学习答疑</p>
        </div>
        <div v-if="data.parseonly" ref="opinion" class="btn-item edit-box" @click="handleOpinion">
            <img class="img" src="./asset/img/edit.png" alt="" />
            <p class="text">意见反馈</p>
        </div>
        <Collection class="collection-box" :data="data" @click-collection="clickCollection" />
    </div>
</template>

<script>
import Collection from './collection.vue';
export default {
    components: {
        Collection,
    },
    // 专项小题库入口页面的实例
    inject: ['componentContainer'],
    props: {
        // 是否直接打开解析
        paperParsing: {
            type: Boolean,
            default: true,
        },
        paperSourceType: {
            type: String,
            default: '',
        },
        data: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        /**
         * @returns {string} special: 从专项小题库进入
         */
        questionBankStatus() {
            return this.$route.query.questionBankStatus;
        },
        /**
         * 学习答疑显示状态
         */
        isShowAnsweringQuestion() {
            return this.data.parseonly && this.data.answerQuestionsPermissions;
        },
    },
    methods: {
        // 错题本解析页单题删除
        handleRemove() {
            this.$emit('click-remove-errquestion', this.data.questionId, this.data.errorQuestionId);
        },
        // 学习答疑
        handleAnswerQuestions() {
            if (this.questionBankStatus === 'special') {
                if (!this.componentContainer?.questionList[0]?.authStatus) {
                    this.checkCourses();
                    return false;
                }
            }
            this.$emit('click-answer-questions', this.data);
        },
        // 意见反馈
        handleOpinion(e) {
            this.$emit('click-opinion', this.data);
        },
        // 收藏事件
        clickCollection(data) {
            this.$emit('click-collection', {
                isCollection: data.isCollection,
                collectionId: data.collectionId,
                questionId: data.questionId,
            });
        },
        /**
         * 非学员查看系统课的提示弹窗
         */
        checkCourses() {
            this.$baseUI.confirm({
                title: '提示',
                content: '开通本项目系统课即可享受专属讲师在线答疑服务',
                confirmText: '查看系统课',
                showCancel: false,
                confirm: () => {
                    this.$PageUtil.openNewPage('/pro-course');
                },
            });
        },
    },
};
</script>

<style lang="less" scoped>
.btn-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    user-select: none;
    .btn-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        .img {
            margin-right: 8px;
            width: 16px;
            height: 16px;
            pointer-events: none;
        }
        .text {
            font-size: 14px;
            font-weight: 400;
            color: #99a1af;
            line-height: 20px;
        }
    }
    .collection-box,
    .edit-box,
    .remove-box {
        margin-left: 40px;
    }
    .edit-box {
        position: relative;
        .opinion-box {
            position: absolute;
            // top: 37px;
            // left: -336px;
            padding: 32px 42px;
            width: 672px;
            box-sizing: border-box;
            border-radius: 8px;
            box-shadow: 0px 2px 16px 2px rgba(68, 86, 126, 0.1);
            background: #fff;
            z-index: 11;
            .opinion-bg {
                position: absolute;
                top: -5px;
                left: 50%;
                width: 14px;
                height: 5px;
                box-shadow: 0px 2px 16px 2px rgb(68 86 126 / 10%);
            }
            .opinion-title {
                font-size: 18px;
                font-weight: 400;
                color: #333333;
                line-height: 18px;
            }
            .err-type {
                margin-top: 20px;
                display: flex;
                align-items: center;
            }
            .err-desc {
                margin-top: 16px;
                display: flex;
                align-items: flex-start;
                .label {
                    margin-top: 10px;
                }
                .input {
                    flex-shrink: 0;
                    width: 519px;
                    height: 180px;
                    padding: 5px 15px;
                    border: 1px solid #e4e5ee;
                    border-radius: 4px;
                    background: none;
                    outline: none;
                    resize: none;
                }
            }
            .label {
                margin-right: 6px;
                flex-shrink: 0;
                font-size: 12px;
                font-weight: 400;
                color: #99a1af;
                line-height: 16px;
                letter-spacing: 0.5px;
            }
            .err-btn-box {
                margin-top: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                .cancel-btn {
                    width: 120px;
                    height: 38px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #666666;
                    text-align: center;
                    line-height: 38px;
                    background: #ffffff;
                    border: 1px solid #d6d6d6;
                    border-radius: 8px;
                }
                .save-btn {
                    margin-left: 24px;
                    width: 120px;
                    height: 38px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #ffffff;
                    text-align: center;
                    line-height: 38px;
                    background: linear-gradient(90deg, #ff6870, #f8323c);
                    border-radius: 8px;
                }
            }
        }
    }
    .select {
        display: flex;
        align-items: center;
        .title {
            font-size: 14px;
            font-weight: 400;
            color: #3a3d4b;
            line-height: 19px;
            letter-spacing: 0.58px;
        }
        .select-box {
            margin-left: 20px;
            padding: 0 16px;
            position: relative;
            width: 202px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f6f7fb;
            border-radius: 4px;
            cursor: pointer;
            .select-text {
                height: 32px;
                font-size: 12px;
                font-weight: 400;
                color: #3a3d4b;
                line-height: 32px;
            }
            .bottom {
                width: 12px;
                height: 12px;
                transition: all 0.3s;
                transform: rotate(0);
                &.active {
                    transform: rotate(180deg);
                    transition: all 0.3s;
                }
            }
            .options {
                position: absolute;
                left: 0;
                top: 32px;
                right: 0;
                margin: 0;
                margin-top: 8px;
                padding: 0;
                height: 0;
                border-radius: 4px;
                overflow: hidden;
                background-color: #fff;
                border: 0px solid #e4e7ed;
                box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
                transition: all 0.3s;
                z-index: 10;
                .option-item {
                    font-size: 14px;
                    padding: 0 20px;
                    position: relative;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #606266;
                    height: 34px;
                    line-height: 34px;
                    box-sizing: border-box;
                    cursor: pointer;
                    &.active {
                        color: rgb(255, 46, 48);
                    }
                    &:hover {
                        background-color: #f5f7fa;
                    }
                    &.none {
                        text-align: center;
                    }
                }
                &.active {
                    padding: 5px 0px;
                    border: 1px solid #e4e7ed;
                    transition: all 0.3s;
                }
            }
        }
    }
}
</style>
