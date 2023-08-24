<template>
    <div class="feed-back-dialog-bg" v-if="show">
        <div class="feed-back-dialog">
            <img class="close" @click="handleClose" src="./asset/images/close.png" alt="" />
            <div class="title">问题反馈</div>
            <ul class="label-list" v-if="feedbackType === 'C'">
                <li v-for="(item, index) in feedbackLabelList" :class="item.check ? 'active' : ''" :key="index">
                    <div @click="item.check = !item.check">
                        <span class="checkbox"></span>
                        {{ item.lable }}
                    </div>
                </li>
            </ul>
            <div>问题描述</div>
            <textarea
                maxlength="300"
                class="problem-description"
                v-model.trim="feedbackMemo"
                placeholder="留下您宝贵的意见，以便我们为您提供更好的学习服务"
            ></textarea>
            <ul class="file-list">
                <li>
                    <input
                        type="button"
                        value=""
                        id="btnBrowser"
                        class="upload-img"
                        :class="fileList.length >= maxFileNumber ? 'disabled' : ''"
                        style="position: relative; z-index: 1"
                        @click="selectImg"
                    />
                </li>
                <li
                    v-for="(item, index) in fileList"
                    :key="index"
                    :class="currentIndex === index ? 'active' : ''"
                    @mouseenter="currentIndex = index"
                    @mouseleave="currentIndex = -1"
                >
                    <img :src="$urlUtils.getViewUrl(item)" class="file-img" alt="" />
                    <img class="del-img" @click="delImg(index)" src="./asset/images/del-img.png" alt="" />
                </li>
            </ul>
            <div class="max-img-size">最多可以上传5张图片</div>
            <vb-upload-img-auto v-show="false" ref="vbUpload" @success="upImgSuccess" :limit="'5'" :size="10 * 1024 * 1024" :suffixs="suffixs" />
            <div class="footer-btn">
                <button class="cancle" @click="handleClose">取消</button>
                <button class="submit" @click="saveFeedback">提交</button>
            </div>
        </div>
    </div>
</template>

<script>
import '@/api/igt/api..feedback-save.js';
import vbUploadImgAuto from '@/www/components/personalCenter/upLoadImageAuto/upLoadImageAuto/index.vue';
export default {
    name: 'learnCenterFeedBack',
    components: { vbUploadImgAuto },
    props: {
        feedbackType: {
            type: String,
            default: '',
        },
        classId: {
            type: String,
            default: '',
        },
        className: {
            type: String,
            default: '',
        },
        projectId: {
            type: String,
            default: '',
        },
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            currentIndex: -1, //鼠标经过
            suffixs: ['jpg', 'png', 'jpeg', 'gif'],
            // 上传文件个数
            maxFileNumber: 5,
            //反馈标签（多个英文逗号隔开）包含 考点不好找；考点听不懂；考点分析对学习没帮助；学习建议对学习没帮助
            feedbackLabelList: [
                {
                    check: false,
                    lable: '考点不好找',
                },
                {
                    check: false,
                    lable: '考点听不懂',
                },
                {
                    check: false,
                    lable: '考点分析对学习没有帮助',
                },
                {
                    check: false,
                    lable: '学习建议对学习没有帮助',
                },
            ],
            feedbackMemo: '', //反馈说明
            fileList: [], //上传图片列表
        };
    },
    watch: {
        show(newval) {
            if (newval) {
                this.init();
            }
        },
    },
    methods: {
        init() {
            this.feedbackLabelList = [
                {
                    check: false,
                    lable: '考点不好找',
                },
                {
                    check: false,
                    lable: '考点听不懂',
                },
                {
                    check: false,
                    lable: '考点分析对学习没有帮助',
                },
                {
                    check: false,
                    lable: '学习建议对学习没有帮助',
                },
            ];
            this.feedbackMemo = '';
            this.fileList = [];
        },
        selectImg() {
            if (this.fileList.length < this.maxFileNumber) {
                this.$refs.vbUpload.inputClick();
            }
        },
        delImg(index) {
            this.$refs.vbUpload.deleteFile1(index);
            this.fileList.splice(index, 1);
        },
        // 上传图片成功回调
        upImgSuccess({ response, fileList }) {
            //上传头像成功
            console.log(response, '--------------');
            if (response && response.length > 0) {
                /*let imgSrc = response[0].filePath;*/
                response.forEach((item) => {
                    if (this.fileList.length < this.maxFileNumber) {
                        this.fileList.push(item.filePath);
                    } else {
                        this.$baseUI.alert('最多只能添加5张图片!');
                    }
                });
            }
            /*this.fileList = fileList;*/
        },
        saveFeedback() {
            let feedbackLabelArry = [];
            this.feedbackLabelList.forEach((item) => {
                item.check && feedbackLabelArry.push(item.lable);
            });
            if (feedbackLabelArry.length > 0 || this.feedbackMemo || this.fileList.length) {
                //igt/feedback/save
                this.$callApi('igt/feedback-save', {
                    projectId: this.projectId,
                    classId: this.classId,
                    className: this.className,
                    feedbackType: this.feedbackType, //P:阶段测评；C:学习报告
                    feedbackStatus: 'F', //状态 Z: 点赞; N:取消赞 F: 意见反馈;
                    feedbackLabel: feedbackLabelArry.join(','), //反馈标签（多个英文逗号隔开）包含 考点不好找；考点听不懂；考点分析对学习没帮助；学习建议对学习没帮助
                    feedbackMemo: this.feedbackMemo, //反馈说明
                    picUrls: this.fileList, //图片列表
                    onsuccess: (result) => {
                        this.$Message.success('我们已经收到您的反馈，我们会一直努力，只为给您提供更好的学习服务');
                        this.handleClose();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                });
            } else {
                this.$Message.warning('请完善您的反馈信息后再提交哦');
            }
        },
        handleClose() {
            this.$emit('update:show', false);
        },
    },
};
</script>
<style scoped lang="less">
.feed-back-dialog-bg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    z-index: 105;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
}
.feed-back-dialog {
    position: relative;
    width: 510px;
    background: #ffffff;
    border-radius: 16px;
    margin-top: -108px;
    padding-left: 48px;
    padding-right: 40px;
    font-size: 14px;
    color: #3a3d4b;
    padding-bottom: 32px;

    .title {
        height: 50px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        color: #333333;
        line-height: 50px;
        margin-bottom: 36px;
    }
    .close {
        position: absolute;
        right: 20px;
        top: 15px;
        width: 32px;
        height: 32px;
        cursor: pointer;
    }

    .label-list {
        li {
            width: 50%;
            float: left;
            font-size: 14px;
            color: #3a3d4b;
            margin-bottom: 18px;
            div {
                display: inline-block;
                cursor: pointer;
                .checkbox {
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                    margin-right: 4px;
                    background: url('./asset/images/checkbox.png') no-repeat;
                    background-size: 100%;
                    position: relative;
                    top: 2px;
                }
            }
        }
        .active {
            .checkbox {
                background: url('./asset/images/checkbox-checked.png') no-repeat;
                background-size: 100%;
            }
        }
    }

    .problem-description {
        width: 100%;
        height: 134px;
        background: #ffffff;
        border: 1px solid #dbdbdb;
        border-radius: 4px;
        margin-top: 16px;
        margin-bottom: 16px;
        resize: none;
        padding: 6px 16px;
        box-sizing: border-box;
    }
    .upload-img {
        width: 100px;
        height: 100px;
        background: url('./asset/images/add-img.png') no-repeat;
        background-size: 100%;
        cursor: pointer;
        float: left;
        margin-right: 20px;
        margin-bottom: 16px;
        border: none;
    }
    .file-list {
        display: inline-block;
        li {
            width: 100px;
            height: 100px;
            margin-right: 20px;
            margin-bottom: 16px;
            float: left;
            position: relative;
            .file-img {
                width: 100%;
                height: 100%;
                float: left;
            }
            .del-img {
                width: 20px;
                height: 20px;
                position: absolute;
                right: -10px;
                top: -10px;
                display: none;
            }
        }
        .active {
            .del-img {
                display: inline-block;
                cursor: pointer;
            }
        }
    }
    .max-img-size {
        color: #999999;
        margin-bottom: 33px;
    }

    .footer-btn {
        margin-left: -48px;
        margin-right: -40px;
        text-align: center;
    }
    .cancle,
    .submit {
        width: 120px;
        height: 38px;
        background: #ffffff;
        border: 1px solid #d6d6d6;
        border-radius: 8px;
        text-align: center;
        color: #666666;
        line-height: 38px;
        cursor: pointer;
    }
    .submit {
        background: linear-gradient(90deg, #ff6870, #f8323c);
        color: #ffffff;
        margin-left: 20px;
        border: 0;
    }
}
</style>
