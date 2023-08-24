<template>
    <div v-if="isShow" class="answer-questions-box">
        <div class="answer-questions-c">
            <div class="title-box">
                <p class="title">学习答疑</p>
                <img class="close-img" src="./asset/images/close-ico.png" alt="" @click="handleClose" />
            </div>
            <div class="answer-questions-content">
                <div class="content-item flex-start">
                    <div class="label question-label">问题描述：</div>
                    <textarea class="input" placeholder="准确描述您的问题，可以更快得到解答哦。" v-model="questionDesc" maxlength="300" />
                </div>
                <div class="content-item">
                    <div class="label question-label">上传图片：</div>
                    <VbUploadImgAuto class="upload-img" limit="5" @success="inputChange" @delete="deleteFile" />
                </div>
                <p class="upload-msg" :class="{ margin: !imgList.length }">点击进行上传，最多上传5张图片，支持jpg、png、jpeg、gif格式</p>
                <div class="btn-box">
                    <div class="cancel" @click="handleClose">取消</div>
                    <div class="save" v-loading="btnLoading" @click="handleSave">提交</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import VbUploadImgAuto from '@/www/components/personalCenter/upLoadImageAuto/upLoadImageAuto/index.vue';
import '@/api/qb/api.QA0004.query-web-question-add.js';
export default {
    components: {
        VbUploadImgAuto,
    },
    // 专项小题库入口页面的实例
    inject: {
        componentContainer: { from: 'componentContainer' },
    },
    props: {
        isShow: {
            type: Boolean,
            default: false,
        },
        projectId: {
            type: String,
            require: true,
            default: '',
        },
        subjectId: {
            type: String,
            require: true,
            default: '',
        },
        questionsId: {
            type: String,
            require: true,
            default: '',
        },
        paperId: {
            type: String,
            default: '',
        },
        answerSheetId: {
            type: String,
            default: '',
        },
        answerQuestionsStemId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            btnLoading: false,
            questionTypeId: '', // 答疑类型id,取 questionTypeSourceId 为1 对应的 questionTypeId 就是要传的内容。
            questionDesc: '', // 问题描述
            imgList: [], // 错误描述
        };
    },
    computed: {
        /**
         * @returns {string} special: 从专项小题库进入
         */
        questionBankStatus() {
            return this.$route.query.questionBankStatus;
        },
    },
    watch: {
        isShow(newVal) {
            if (newVal) {
                Object.assign(this.$data, this.$options.data());
                this.getQuestionTypeId();
            }
        },
    },
    mounted() {
        this.getQuestionTypeId();
    },
    methods: {
        ...mapActions('common/quefeedbacktype', {
            getQuestiontypes: 'getQuestiontypes',
        }),
        getQuestionTypeId() {
            this.getQuestiontypes().then((res) => {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].questionTypeSourceId === '1') {
                        this.questionTypeId = res[i].questionTypeId;
                        break;
                    }
                }
            });
        },
        // 关闭弹窗
        handleClose() {
            this.$emit('update:isShow', false);
            this.$emit('close');
        },
        // 图片成功回调
        inputChange(files) {
            this.imgList.push(...files.response);
        },
        // 删除图片
        deleteFile(fileIndex) {
            this.imgList.splice(fileIndex, 1);
        },
        // 保存
        handleSave() {
            if (!this.questionDesc) {
                return this.$baseUI.alert('请填写问题描述');
            }
            this.questionAdd();
        },
        questionAdd() {
            this.btnLoading = true;
            var info = new Browser() || {};
            var qaDeviceInfoDto = {
                deviceType: info.device,
                brand: this.$platform.browser, //客户端浏览器
                phoneModel: this.$platform.version,
                systemVersion: info.os + ' ' + info.osVersion, //客户端版本
                version: this.$platform.version,
            };
            let subjectId = this.subjectId;
            // 专项小题库-学习中心-做题页 传入的是题库的科目标识
            if (this.questionBankStatus === 'special' && this.componentContainer?.questionBankInfo?.subjectId) {
                subjectId = this.componentContainer.questionBankInfo.subjectId;
            }
            niceloo.api.call('qb/query-web-question-add', {
                projectId: this.projectId,
                subjectId,
                questionTypeId: this.questionTypeId,
                questionSourceType: 'Q',
                description: this.questionDesc,
                images: this.imgList.map((item) => item.filePath),
                qaDeviceInfoDto,
                qaQcPostVo: {
                    testQuestionsId: this.questionsId,
                    testPaperId: this.paperId,
                    answerSheetId: this.answerSheetId,
                    majorQuestionsId: this.answerQuestionsStemId,
                },
                onsuccess: (res) => {
                    this.$baseUI.alert('答疑提交成功，可在学习中心-我的答疑中查看问题回复进度');
                    this.handleClose();
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {
                    this.btnLoading = false;
                },
            });
        },
    },
};
</script>

<style lang="less" scoped>
.answer-questions-box {
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
    .answer-questions-c {
        box-sizing: border-box;
        padding: 0 22px;
        padding-bottom: 32px;
        width: 590px;
        border-radius: 16px;
        background: #ffffff;
        .title-box {
            position: relative;
            .title {
                font-size: 18px;
                font-weight: 700;
                text-align: center;
                color: #333333;
                line-height: 50px;
            }
            .close-img {
                position: absolute;
                top: 14px;
                right: 8px;
                width: 22px;
                height: 22px;
                cursor: pointer;
            }
        }
        .answer-questions-content {
            margin-top: 32px;
        }
        .content-item {
            display: flex;
            align-items: center;
            &.flex-start {
                margin-bottom: 40px;
                align-items: flex-start;
            }
            .label {
                width: 70px;
                flex-shrink: 0;
                font-size: 14px;
                font-weight: 400;
                text-align: center;
                color: #3a3d4b;
                line-height: 14px;
                &.question-label {
                    margin-top: 6px;
                }
            }
            .input {
                flex-shrink: 0;
                width: 438px;
                height: 130px;
                padding: 5px 15px;
                border: 1px solid #e4e5ee;
                border-radius: 4px;
                box-sizing: border-box;
                background: none;
                outline: none;
                resize: none;
            }
            /deep/.upload-img {
                .el-upload--picture-card {
                    width: 80px;
                    height: 80px;
                    line-height: 80px;
                }
                .el-upload-list__item {
                    width: 80px;
                    height: 80px;
                }
            }
        }
        .upload-msg {
            margin-left: 70px;
            font-size: 12px;
            font-weight: 400;
            color: #ff2e30;
            line-height: 16px;
            &.margin {
                margin-top: 10px;
            }
        }
        .btn-box {
            margin-top: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            .cancel {
                width: 120px;
                font-size: 14px;
                font-weight: 400;
                text-align: center;
                color: #666666;
                line-height: 38px;
                background: #ffffff;
                border: 1px solid #d6d6d6;
                border-radius: 8px;
                cursor: pointer;
            }
            .save {
                margin-left: 24px;
                width: 120px;
                height: 38px;
                font-size: 14px;
                font-weight: 400;
                text-align: center;
                color: #ffffff;
                line-height: 38px;
                background: linear-gradient(90deg, #ff6870, #f8323c);
                border-radius: 8px;
                cursor: pointer;
            }
        }
    }
}
</style>
