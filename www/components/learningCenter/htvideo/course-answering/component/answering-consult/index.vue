<template>
    <div class="replay-section">
        <div class="title">
            <span class="title-tag"></span>
            我的答疑
            <span class="fold" @click="isFold = !isFold">
                {{ isFold ? '收起提问' : '展开提问' }}
                <img v-if="isFold" src="./asset/images/fold-close.png" alt="" />
                <img v-else src="./asset/images/fold-open.png" alt="" />
            </span>
        </div>
        <template v-if="isFold">
            <textarea class="question" name="" id="" cols="30" rows="10" placeholder="请输入您的问题" v-model="questionContent" maxlength="300"></textarea>
            <ul class="img-list">
                <li @click="handleSelectImg" v-if="fileList.length < 5">
                    <div class="add-img">
                        <img src="./asset/images/add-img.png" alt="" />
                    </div>
                </li>
                <li v-for="(img, index) in fileList" :key="index">
                    <img class="question-img" :src="$urlUtils.getViewUrl(img)" alt="" />
                    <span class="del-img" @click="handleDelImg(index)"></span>
                </li>
            </ul>
            <input type="button" ref="submit" v-model="submitText" :disabled="isDisable" class="submit" @click="handleSubmitAnswer()" />
        </template>
        <vb-upload-img-auto v-show="false" :key="upLoadImgKey" ref="vbUpload" @success="upImgSuccess" :limit="maxFileNumber" :suffixs="suffixs" />
    </div>
</template>

<script>
import '@/api/qa/api.QA1005.query-question-auth.js';
import '@/api/qa/api.QA0004.add-question.js';
import '@/api/qa/api.QA3001.query-questiontypes.js';
import { mapState } from 'vuex';
import PreviewTheStop from '@/www/components/package/previewthestop/index';
import vbUploadImgAuto from '@/www/components/personalCenter/upLoadImageAuto/upLoadImageAuto/index.vue';
export default {
    name: 'index',
    components: { vbUploadImgAuto },
    props: {
        playList: {
            type: Object,
            default: () => {
                return {};
            },
        },
        playCourseware: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            submitText: '提交',
            isDisable: false,
            isFold: true,
            questionTypeId: '',
            maxFileNumber: '5', // 上传文件个数
            suffixs: ['jpg', 'png', 'jpeg', 'gif'],
            fileList: [], // 上传文件列表
            questionContent: '',
            upLoadImgKey: 'upLoadImg' + this.$DateUtil.getUUID(),
        };
    },
    computed: {
        ...mapState('course/info', {
            coursewareId: 'coursewareId',
            courseId: 'courseId',
            projectId: 'projectId',
            classId: 'classId',
            subjectId: 'subjectId',
            showHandoutMax: 'showHandoutMax',
        }),
    },
    watch: {
        showHandoutMax: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.isFold = false;
                } else {
                    this.isFold = true;
                }
            },
            immediate: true,
        },
    },
    mounted() {
        this.getQuestionTypeId();
    },
    methods: {
        //获取问题类型列表
        getQuestionTypeId() {
            //qa/web/questiontypes
            this.$callApi('qa/query-questiontypes', {
                onsuccess: (res) => {
                    let data = res.filter((item) => item.questionTypeSourceId == 1);
                    this.questionTypeId = data[0].questionTypeId;
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //提交
        handleSubmitAnswer() {
            // 判断登录来源
            if (!PreviewTheStop.clickStop()) {
                return;
            }
            if (this.validate()) {
                //答疑提问鉴权
                this.getQuestionAuth(() => {
                    this.submitText = '提交中...';
                    this.isDisable = true;
                    this.addlearnQuestion();
                });
            }
        },
        // 验证答疑数据格式是否正确
        validate() {
            if (!this.questionContent.length) {
                this.$baseUI.alert('问题描述不能为空');
                return false;
            } else if (this.questionContent.length > 300 || this.questionContent.length < 5) {
                this.$baseUI.alert('问题描述最大长度不能超过300个字符,最小长度不能小于5个字符');
                return false;
            } else if (this.fileList.length > this.maxFileNumber) {
                this.$baseUI.alert('最多只能添加5张图片!');
                return false;
            }
            return true;
        },
        //答疑提问鉴权
        getQuestionAuth(callback) {
            this.$callApi('qa/query-question-auth', {
                questionType: 'P', //P:学科专业类；C:课件类；E:教务类;S:建议类;R:其他类；
                projectId: this.projectId,
                classId: this.classId,
                onsuccess: (res) => {
                    //答疑权限状态 Y:有权限 N:无权限
                    if (res.authStatus == 'Y') {
                        callback();
                    } else {
                        this.$baseUI.alert(res.authMsg);
                    }
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        // 提交答疑数据
        addlearnQuestion() {
            var info = new Browser() || {};
            let qaDeviceInfoDto = {
                deviceType: info.device,
                brand: this.$platform.browser, //客户端浏览器
                phoneModel: this.$platform.version,
                systemVersion: info.os + ' ' + info.osVersion, //客户端版本
                version: this.$platform.version,
            };
            this.$callApi('qa/add-question', {
                projectId: this.projectId,
                subjectId: this.subjectId,
                questionTypeId: this.questionTypeId,
                description: this.questionContent,
                images: this.fileList,
                qaDeviceInfoDto,
                questionSourceType: 'C',
                qaQcPostVo: {
                    classId: this.classId,
                    courseId: this.courseId,
                    courseWareId: this.coursewareId,
                },
                onsuccess: (res) => {
                    this.questionContent = '';
                    this.fileList = [];
                    this.upLoadImgKey = 'upLoadImg' + this.$DateUtil.getUUID();
                    /*this.ulTabChange(2);*/
                    this.$emit('update-dylist');
                    this.$baseUI.alert({
                        title: '提示',
                        content: res.Msg || '提交成功',
                        confirmText: '确定',
                    });
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {
                    this.submitText = '提交问题';
                    this.isDisable = false;
                },
            });
        },
        // 上传图片成功回调

        handleSelectImg() {
            if (this.fileList.length < this.maxFileNumber) {
                this.$refs.vbUpload.inputClick();
            }
        },
        handleDelImg(index) {
            this.$refs.vbUpload.deleteFile1(index);
            this.fileList.splice(index, 1);
        },
        upImgSuccess({ response }) {
            //上传头像成功
            console.log(response, '--------------');
            if (response && response.length > 0) {
                response.forEach((item) => {
                    if (this.fileList.length < this.maxFileNumber) {
                        this.fileList.push(item.filePath);
                    } else {
                        this.$baseUI.alert('最多只能添加5张图片!');
                    }
                });
            }
        },
    },
};
</script>

<style scoped lang="less">
.replay-section {
    padding-left: 16px;
    padding-right: 20px;
    background: #202631;
    border-radius: 16px 16px 0px 0px;
    box-sizing: border-box;
}
.title {
    height: 35px;
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
    line-height: 35px;
    padding-top: 12px;
    padding-bottom: 12px;
    .title-tag {
        display: inline-block;
        width: 4px;
        height: 14px;
        background: #ff2e30;
        border-radius: 2px;
        margin-right: 6px;
    }
    .fold {
        width: 98px;
        height: 32px;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 17px 0px 0px 17px;
        font-size: 14px;
        font-weight: 400;
        color: #ffffff;
        line-height: 32px;
        display: inline-block;
        margin-right: -20px;
        text-align: center;
        float: right;
        margin-top: 2px;
        cursor: pointer;
        img {
            width: 16px;
            height: 17px;
            position: relative;
            top: 3px;
        }
    }
}
.question {
    height: 120px;
    background: #2a3440;
    border-radius: 4px;
    padding: 12px;
    font-size: 14px;
    color: #dddddd;
    line-height: 19px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 16px;
    float: left;
    resize: none;
    border: none;
    outline: none;
}
.img-list {
    display: inline-block;
    li {
        float: left;
        margin-right: 8px;
        position: relative;
        .add-img {
            width: 56px;
            height: 56px;
            background: #2a3440;
            border-radius: 4px;
            text-align: center;
            cursor: pointer;
            img {
                margin-top: 20px;
                width: 20px;
                height: 20px;
            }
        }
        .question-img {
            width: 56px;
            height: 56px;
            border-radius: 4px;
            float: left;
        }
        .del-img {
            top: -8px;
            right: -8px;
            position: absolute;
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url('./asset/images/del-img.png') no-repeat;
            background-size: 16px;
            cursor: pointer;
        }
        &:last-child {
            margin-right: 0;
        }
    }
}
.submit {
    width: 100%;
    height: 40px;
    background: linear-gradient(90deg, #ff6870, #f8323c);
    border-radius: 20px;
    font-size: 14px;
    text-align: center;
    color: #ffffff;
    line-height: 40px;
    margin-top: 7px;
    margin-bottom: 14px;
    cursor: pointer;
}
</style>
