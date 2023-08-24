<template>
    <div v-if="isShow" class="feedback-box">
        <div class="feedback-c">
            <div class="title-box">
                <p class="title">错误类型</p>
                <img class="close" src="./asset/images/close-ico.png" alt="" @click="closeModel" />
            </div>
            <div class="content-box">
                <p class="content-title">感谢您提出宝贵意见，我们收到后会及时处理</p>
                <div class="err-type">
                    <p class="label">错误类型：</p>
                    <div class="select">
                        <div class="error-select select-box" @click.stop="openOptionSelect">
                            <div class="error-select select-text">
                                <p v-if="errData.dictName" @click.stop="openOptionSelect">{{ errData.dictName }}</p>
                                <p v-else class="placeholder" @click.stop="openOptionSelect">请选择错误类型</p>
                            </div>
                            <img class="error-select bottom" :class="{ active: showSelectOption }" src="./asset/images/arrow-bottom.png" alt="" />
                            <ul class="error-select options" ref="options" :class="{ active: showSelectOption }">
                                <li
                                    v-for="(item, index) in errTypeList"
                                    :key="index"
                                    class="error-select option-item"
                                    :class="{ active: errData.dictCode === item.dictCode }"
                                    @click.stop="handleOption(item)"
                                >
                                    {{ item.dictName }}
                                </li>
                                <li v-if="!errTypeList.length" class="error-select option-item none">暂无类型</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="err-desc">
                    <p class="label">错误描述：</p>
                    <textarea class="input" v-model="errDesc" maxlength="500" />
                </div>
                <div class="err-btn-box">
                    <div class="cancel-btn" @click.stop="closeModel">关闭</div>
                    <div class="save-btn" v-loading="saveLoading" @click.stop="saveOption">提交</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@/api/qb/api.QB4002.questionfeedback-add.js';
import { mapActions } from 'vuex';
export default {
    props: {
        /**
         * 试卷详情字段
         * paperTypeCode 必备字段
         * paperId 试卷id，没有不传
         * paperName 试卷名称，没有不传
         */
        paperDetail: {
            type: Object,
            default: () => {},
        },
        // 题目标识 必传
        questionId: {
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
            showSelectOption: false, // 打开项目下拉框
            saveLoading: false, // 提交意见反馈 loading
            errTypeList: [], // 错误类型
            errData: {
                dictName: '',
                dictCode: '',
            },
            errDesc: '',
        };
    },
    watch: {
        isShow(newVal) {
            if (newVal) {
                this.errDesc = '';
                this.errData = this.$options.data().errData;
                document.addEventListener('click', (e) => {
                    var classNames = e.target.className.split(' ');
                    if (classNames.indexOf('error-select') === -1 && this.$refs.options) {
                        this.$refs.options.style.height = 0;
                        this.showSelectOption = false;
                    }
                });
            }
        },
    },
    mounted() {
        this.getQuefeedbacktypeList().then((res) => {
            this.errTypeList = res;
        });
    },
    methods: {
        ...mapActions('common/quefeedbacktype', {
            getQuefeedbacktypeList: 'getQuefeedbacktypeList',
        }),
        // 设置项目下拉框高度
        openOptionSelect() {
            this.showSelectOption = !this.showSelectOption;
            this.$refs.options.style.height = (this.showSelectOption ? (this.errTypeList.length ? this.errTypeList.length : 1) * 34 : 0) + 'px';
        },
        // 项目点击事件
        handleOption(item) {
            // console.log(item);
            if (this.errData.dictCode === item.dictCode) return;
            this.errData = item;
            this.$refs.options.style.height = 0;
            this.showSelectOption = false;
        },
        // 关闭下拉框
        closeModel() {
            this.$emit('update:isShow', false);
            this.$emit('close-feedback');
        },
        // 提交意见反馈
        saveOption() {
            if (!this.errData.dictCode) {
                return this.$baseUI.alert('请选择错误类型');
            }
            if (!this.errDesc) {
                return this.$baseUI.alert('请填写错误描述');
            }
            this.saveLoading = true;
            niceloo.api.call('qb/questionfeedback-add', {
                // 题目标识
                questionId: this.questionId,
                // 题目反馈类型
                questionfeedbackType: this.errData.dictCode,
                // 题目反馈描述
                questionfeedbackMemo: this.errDesc,
                // 试卷类型编码
                papertypeCode: this.paperDetail.paperTypeCode,
                // 试卷标识
                paperId: this.paperDetail.paperId ? this.paperDetail.paperId : null,
                // 试卷名称
                paperName: this.paperDetail.paperName ? this.paperDetail.paperName : null,
                // 题目反馈来源类型
                sourceType: this.paperDetail.sourceType || $nuxt.context.env.config.learningCenterSourceType,
                onsuccess: (res) => {
                    // console.log(res);
                    this.closeModel();
                    this.$baseUI.alert('提交成功，谢谢您的反馈我们会尽快处理！');
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.saveLoading = false;
                },
            });
        },
    },
};
</script>

<style lang="less" scoped>
.feedback-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 105;
    background: rgba(0, 0, 0, 0.5);
}
.feedback-c {
    width: 590px;
    border-radius: 16px;
    background: #ffffff;
}
.title-box {
    position: relative;
    .title {
        font-size: 18px;
        font-weight: 700;
        color: #333333;
        text-align: center;
        line-height: 50px;
    }
    .close {
        position: absolute;
        top: 14px;
        right: 30px;
        width: 22px;
        height: 22px;
        cursor: pointer;
    }
}
.content-box {
    margin-top: 24px;
    padding: 0 48px;
    .content {
        font-size: 16px;
        font-weight: 400;
        color: #3a3d4b;
        line-height: 22px;
    }
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
        width: 422px;
        height: 134px;
        padding: 5px 15px;
        border: 1px solid #e4e5ee;
        border-radius: 4px;
        box-sizing: border-box;
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
    margin-top: 48px;
    padding-bottom: 32px;
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
        cursor: pointer;
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
        cursor: pointer;
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
        padding: 0 16px;
        position: relative;
        width: 202px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        cursor: pointer;
        .select-text {
            height: 32px;
            font-size: 12px;
            font-weight: 400;
            color: #3a3d4b;
            line-height: 32px;
            .placeholder {
                font-size: 14px;
                font-weight: 400;
                color: #99a1af;
                line-height: 34px;
            }
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
                    background: #f6f7f9;
                }
                &:hover {
                    background: #f6f7f9;
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
</style>
