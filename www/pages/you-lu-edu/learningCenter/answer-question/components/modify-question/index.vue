<template>
    <div class="cumr_list updateQuestion">
        <div id="divShow" class="cumr_form">
            <p class="cumr_actp">请选择正确的问题类型，帮您匹配专业的答疑老师，否则将无法解答！</p>
            <div class="cm_labl">
                <span class="cm_tsp">所属类型</span>
                <span id="DropQuestionClass">
                    <P style="display: inline-block" v-for="(item, index) in questionClassList" :key="index">
                        <input
                            :id="`DropQuestionClass_${index}`"
                            type="radio"
                            name="ctl00$contentMain1$DropQuestionClass"
                            disabled="disabled"
                            :checked="item.questionTypeName == questionDetail.questionTypeName"
                        />
                        <label disabled="disabled" :for="`DropQuestionClass_${index}`">{{ item.questionTypeName }}</label>
                    </P>
                </span>

                <div id="divMark">
                    <p id="cm_lablep" class="cm_lablep" :class="[`cm_lablep${tipIndex}`]" v-if="tipIndex >= 0">
                        <i></i>
                        <!--            {{ questionClassList[tipIndex].Description }}-->
                        {{ questionDetail.questionTypeDescription }}
                    </p>
                </div>
            </div>
            <div id="UpdatePanelClassSubject">
                <div class="cm_labl">
                    <div class="labl_item">
                        <span class="cm_tsp">所属项目</span>
                        <select
                            name="ctl00$contentMain1$DropProject"
                            id="DropProject"
                            class="cm_sel"
                            ref="project"
                            :disabled="projectId ? true : false"
                            v-model="projectId"
                        >
                            <option selected="selected" value>请选择项目</option>
                            <option :value="item.projectId" v-for="item in questionProject" :key="item.projectId" :selected="item.projectId == projectId">
                                {{ item.Picture ? '┃┗' : '┣' }}{{ item.projectName }}
                            </option>
                        </select>
                    </div>
                    <div class="labl_item">
                        <span class="cm_tsp">所属科目</span>
                        <div @click="getQuestionSubject(projectId)">
                            <select
                                name="ctl00$contentMain1$DropQuestionSubject"
                                id="DropQuestionSubject"
                                class="cm_sel"
                                ref="subject"
                                v-model="subjectId"
                                :disabled="questionDetail.questionSourceType === 'Q' ? true : false"
                            >
                                <option value>请选择科目</option>
                                <option
                                    :value="item.subjectId"
                                    v-for="item in questionSubject"
                                    :key="item.subjectId"
                                    :selected="item.subjectId == questionDetail.subjectId"
                                >
                                    {{ item.subjectName }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="cm_labl" style="display: none">
                <span class="cm_tsp">问题主题</span>
                <input name="ctl00$contentMain1$txtQuestionTitle" type="text" id="txtQuestionTitle" class="labl_inp" />
            </div>
            <div class="cm_labl text_area">
                <span class="cm_tsp">问题描述</span>
                <textarea
                    name="ctl00$contentMain1$TxtQuestionContent"
                    rows="2"
                    cols="20"
                    maxlength="300"
                    id="TxtQuestionContent"
                    v-model="questionContent"
                    class="labl_area"
                    placeholder="准确的提出您的问题可以更快的得到解答哦"
                ></textarea>
                <span class="text_area_tip">{{ questionContent.length }} / 300</span>
            </div>
            <div class="cm_labl">
                <span class="cm_tsp">上传图片</span>
                <div style="padding: 11px 11px 20px">最多上传{{ maxFileNumber }}张图片</div>
                <div class="fileupBox" id="file-list">
                    <template v-if="fileList.length">
                        <label class="labl_img" v-for="(item, index) in fileList" :key="index" :style="`background-image:url( ${$urlUtils.getViewUrl(item)})`">
                            <div class="labl_tt">
                                <span class="labl_close" @click="delImg(index)">×</span>
                            </div>
                        </label>
                    </template>
                    <vb-upload-img-auto v-show="false" ref="vbUpload" @success="upImgSuccess" :limit="maxFileNumber" />
                    <label class="labl_btn uploadbutton">
                        <!--<input
                            type="file"
                            :id="componentId"
                            class="labl_file"
                            ref="file"
                            multiple
                            accept="image/*"
                            style="cursor: pointer"
                            @change="selectImg"
                        />-->
                        <input
                            type="button"
                            value="点击上传"
                            id="btnBrowser"
                            class="labl_clk"
                            :disabled="fileList.length >= maxFileNumber ? true : false"
                            style="position: relative; z-index: 1"
                            @click="selectImg"
                        />
                    </label>
                </div>
                <input type="hidden" name="ctl00$contentMain1$hidImageUrl" id="hidImageUrl" />
                <input type="hidden" name="ctl00$contentMain1$hidoldquestionid" id="hidoldquestionid" />
                <input type="hidden" name="ctl00$contentMain1$hidasktype" id="hidasktype" />
                <!--  <div class="clear"></div> -->
            </div>
            <div class="cm_labl">
                <span class="cm_tsp">&nbsp;</span>
                <input ref="submit" id="send" class="labl_tj" value="提交问题" type="button" @click="updateLearnQuestion()" />
                <input class="cancel-btn" value="取消" type="button" @click="cancelSubmit" />
            </div>
        </div>
    </div>
</template>
<script>
import '@/api/cc/api.QA3001.web-questiontypes.js';
import '@/api/cc/api.QA0006.question-details-info.js';
import '@/api/cc/api.QA0005.question-update.js';
import vbUploadImgAuto from '@/www/components/personalCenter/upLoadImageAuto/upLoadImageAuto';

export default {
    components: { vbUploadImgAuto },
    props: {
        questionId: {
            type: String,
            default: '',
        },
        curProject: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            componentId: 'upload' + this.$DateUtil.getUUID(),
            promiseList: [],
            // 问题反馈类型
            questionClassList: [],
            subjectId: '',
            projectId: '',
            tipIndex: 0,
            defaultFileList5: [],
            fileInfoList: [],
            qaDeviceInfoDto: {
                deviceType: '',
                brand: '',
                phoneModel: '',
                systemVersion: '',
                version: '',
            },
            classSourceprojectid: '', //5d37bdd7-75f5-4139-8fe5-8e28a43d4d2e
            // 所属项目列表
            questionProject: [],
            // 默认选中所属项目
            CatalogId: '',
            // 对应项目下的科目列表
            questionSubject: [],
            // 问题描述
            questionContent: '',
            // 上传文件列表
            fileList: [],
            // 上传文件个数
            maxFileNumber: '5',
            // 问题详情
            questionDetail: {},
            // 原有图片列表是否有改动,这里直接传Y
            IfUpdatePicture: 'Y',
        };
    },
    watch: {
        CatalogId(value) {
            if (value) {
                this.getQuestionSubject(value);
            }
        },
    },
    created() {
        // 页面初始化，需要获取该参数
        //this.classSourceprojectid = "5d37bdd7-75f5-4139-8fe5-8e28a43d4d2e";
        this.getDeviceInfo();
        // 问题反馈类型
        this.$callApi('cc/web-questiontypes', {
            onsuccess: (data) => {
                this.questionClassList = data;
                // 显示问题详情
                this.$callApi('cc/question-details-info', {
                    questionId: this.questionId,
                    onsuccess: (res) => {
                        this.questionDetail = res;
                        // questionClassList 缺少 QueClassId  使用 questionTypeName判断
                        this.questionContent = res.questionContent;
                        this.subjectId = this.questionDetail.subjectId;
                        this.questionProject = [this.questionDetail];
                        this.projectId = this.questionDetail.projectId;
                        this.getQuestionSubject(this.questionDetail.projectId);

                        this.questionClassList.forEach((item, index) => {
                            if (item.questionTypeName == res.questionTypeName) {
                                this.tipIndex = index;
                            }
                        });
                        if (this.questionDetail.questionFilePath) {
                            this.questionDetail.questionFilePath = this.questionDetail.questionFilePath.split(',');
                            // 图片
                            this.questionDetail.questionFilePath.forEach((item) => this.fileList.push(item));
                        } else {
                            this.questionDetail.questionFilePath = [];
                        }
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            },
            onerror: this.$niceloo.api.handleFailure,
            oncomplete: () => {},
        });
    },
    methods: {
        addFile(file) {
            //统计文件 size
            file.cmputedSize = this.calculateFileSize(file.size);

            //1. 如果是图片文件
            if (file.type.indexOf('image') >= 0) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    file.src = reader.result;
                    // debugger
                    this.fileList.push(file);
                    console.log(file, 'file');
                };
            }

            //2. 如果是 pdf 文件
            // if (file.type.indexOf('pdf') >= 0) {
            //     this.pdfList.push({ file });
            // }
        },
        // file size 单位转换
        calculateFileSize(bytes) {
            if (bytes === 0) return '0 B';
            else {
                let k = 1024;
                let unit = ['B', 'KB', 'MB'];
                let i = Math.floor(Math.log(bytes) / Math.log(k));
                let result = (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + unit[i];
                return result;
            }
        },
        upload(formData) {
            return new Promise((resolve, reject) => {
                Mask.showLoading();
                Http.callService({
                    url: 'fs/file/upload/token',
                    data: {},
                })
                    .success((data) => {
                        var url =
                            this.action ||
                            this.$urlUtils.fileUpload +
                                '?params=' +
                                encodeURI(
                                    JSON.stringify({
                                        fileStatus: 'T',
                                        uploadToken: data.uploadToken,
                                    })
                                );
                        axios
                            .post(url, formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            })
                            .then((res) => {
                                Mask.hideLoading();
                                let response = res.data;
                                switch (response.code) {
                                    case '0000':
                                        resolve(response.data);
                                        break;
                                    default:
                                        reject(response.msg);
                                        break;
                                }
                            })
                            .catch(() => {
                                /*error*/
                                Mask.hideLoading();
                                reject('服务器连接失败！');
                            });
                    })
                    .fail((error) => {
                        reject(error);
                        Mask.hideLoading();
                    });
            });
        },
        uploadFile(files) {
            /*let vm = this;*/
            let formData = new FormData();
            formData.append('file', files);
            return this.upload(formData)
                .then((data) => {
                    this.fileList.push(data.filePath);
                    if (this.fileList.length > this.maxFileNumber) {
                        this.$baseUI.alert('提交图片不能超过5张');
                        this.fileList.splice(5);
                    }
                })
                .catch((msg) => {
                    alert('文件上传失败', msg);
                });
        },
        // 项目下的科目
        getQuestionSubject(ProjectId) {
            if (!ProjectId) {
                this.questionSubject = [];
                return;
            }
            let isSubjectProfessional = this.questionDetail.questionTypeName.includes('学科专业') ? 'Y' : 'N';

            this.$callApi('cc/subject-list', {
                projectId: ProjectId,
                isSubjectProfessional,
                onsuccess: (res) => {
                    this.questionSubject = res;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        validate() {
            if (this.tipIndex == -1) {
                this.$baseUI.alert('所属类型不能为空');
                return false;
            } else if (this.$refs.project.value == '') {
                this.$baseUI.alert('所属项目不能为空');
                return false;
            } else if (this.$refs.subject.value == '') {
                this.$baseUI.alert('所属科目不能为空');
                return false;
            } else if (!this.questionContent.length) {
                this.$baseUI.alert('问题描述不能为空');
                return false;
            } else if (this.questionContent.length > 1000 || this.questionContent.length < 5) {
                this.$baseUI.alert('问题描述最大长度不能超过1000个字符,最小长度不能小于5个字符');
                return false;
            } else if (this.fileList.length > this.maxFileNumber) {
                this.$baseUI.alert('最多只能添加5张图片!');
                return false;
            }
            return true;
        },
        delImg(index) {
            this.$refs.vbUpload.deleteFile1(index);
            this.fileList.splice(index, 1);
        },
        /*delImg(item) {
            var s = [];
            for (var i = 0; i < this.fileList.length; i++) {
                if (this.fileList[i] != item) {
                    s.push(this.fileList[i]);
                }
            }
            this.fileList = s;
        },*/
        selectImg() {
            if (this.fileList.length < this.maxFileNumber) {
                this.$refs.vbUpload.inputClick();
            }
            /*console.log(this.componentId, 'this.componentId');
            let input = document.querySelector('#' + this.componentId);
            var files = input.files;
            if (this.fileList.length > this.maxFileNumber) {
                this.$baseUI.alert('最多只能添加5张图片!');
                this.fileList.splice(this.maxFileNumber);
                return;
            }
            this.inputChange(files);*/
        },
        // 上传图片成功回调
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
        inputChange(files) {
            this.promiseList = [];
            if (files && files.length > 0) {
                let val = [];
                for (let i = 0; i < files.length; i++) {
                    val.push(files[i]);
                }
                for (let file of val) {
                    this.promiseList.push(this.uploadFile(file).then(() => {}));
                }
            }
            Promise.all(this.promiseList).then(() => {});
        },
        getDeviceInfo() {
            /*this.$ResUtils.loadJsSync(`/pch5static/js/jsFile/Browser.js`);*/
            var info = new Browser() || {};
            // 	qaDeviceInfoDto.Version	当前答疑系统版本
            this.qaDeviceInfoDto = {
                deviceType: info.device,
                brand: this.$platform.browser, //客户端浏览器
                phoneModel: this.$platform.version,
                systemVersion: info.os + ' ' + info.osVersion, //客户端版本
                version: this.$platform.version,
            };
        },
        updateLearnQuestion() {
            if (this.validate()) {
                this.$refs.submit.value = '提交中...';
                this.$refs.submit.disabled = true;

                let vm = this;
                this.$callApi('cc/question-update', {
                    questionId: vm.questionId,
                    subjectId: vm.subjectId,
                    description: vm.questionContent,
                    images: vm.fileList,
                    qaDeviceInfoDto: vm.qaDeviceInfoDto,
                    onsuccess: (res) => {
                        vm.$refs.submit.value = '提交问题';
                        vm.$refs.submit.disabled = false;
                        if (res == true) {
                            vm.$emit('update:currentTabComponent', 'myQuestionDetail');
                            // vm.$emit("update:currentTabComponent", "myQuestionList");
                        } else {
                            vm.$refs.submit.value = '提交问题';
                            vm.$refs.submit.disabled = false;
                            this.$baseUI.alert('提交失败').then(function () {
                                /// 显示问题详情
                                vm.$emit('update:questionId', vm.questionId);
                                vm.$emit('update:currentTabComponent', 'myQuestionDetail');
                            });
                        }
                    },
                    onerror: (err) => {
                        /*this.$niceloo.api.handleFailure();*/
                        vm.$refs.submit.value = '提交问题';
                        vm.$refs.submit.disabled = false;
                        this.$baseUI.alert(err.getAttachedData().getMsg()).then(function () {
                            /// 显示问题详情
                            vm.$emit('update:questionId', vm.questionId);
                            vm.$emit('update:currentTabComponent', 'myQuestionDetail');
                        });
                    },
                    oncomplete: () => {},
                });
            }
        },
        cancelSubmit() {
            /// 显示问题详情
            this.$emit('update:questionId', this.questionId);
            this.$emit('update:currentTabComponent', 'myQuestionDetail');
        },
    },
};
</script>
<style lang="less" scoped>
.cumr_list.updateQuestion {
    border: 1px solid #ddd;
    background: #fff;
    margin: 15px 0;
    font-size: 16px;
    color: #333;

    .cumr_form {
        padding: 10px 30px 30px;
    }

    .cumr_actp {
        font-size: 16px;
        color: #e83828;
        margin: 20px 0 0 15px;
        background: url('./asset/images/cumr_actp.png') no-repeat left center;
        padding-left: 34px;
        height: 22px;
        line-height: 22px;
    }

    .cumr_form .cm_labl {
        margin: 20px 0;
    }

    .text_area {
        position: relative;

        .text_area_tip {
            position: absolute;
            bottom: 10px;
            right: 350px;
            color: #999;
        }
    }
    .cumr_form .cm_labl .cm_tsp {
        width: 80px;
        float: left;
        line-height: 36px;
        text-align: right;
        margin-right: 10px;
    }

    .cumr_form .cm_labl label {
        line-height: 36px;
        margin-right: 15px;
    }

    .labl_item {
        width: 300px;
        float: left;
    }

    .clear {
        clear: both;
    }

    .cumr_form .cm_labl .cm_tsp {
        display: inline-block;
        width: 80px;
        float: left;
        line-height: 36px;
        text-align: right;
        margin-right: 10px;
    }

    .cm_sel {
        width: 180px;
        height: 34px;
        line-height: 34px;
        border: 1px solid #dcdcdc;
        font-size: 14px;
        outline: none;
        color: #999;
    }

    .cumr_form .cm_labl .cm_tsp {
        display: inline-block;
        width: 80px;
        float: left;
        line-height: 36px;
        text-align: right;
        margin-right: 10px;
    }

    .labl_inp {
        height: 34px;
        line-height: 34px;
        border: 1px solid #dcdcdc;
        outline: none;
        width: 650px;
        padding-left: 10px;
        font-size: 14px;
    }

    .labl_area {
        border: 1px solid #dcdcdc;
        outline: none;
        width: 585px;
        padding: 10px;
        height: 140px;
        font-size: 14px;
        resize: none;
        word-break: break-all;
    }

    .cumr_form .cm_labl .cm_tsp {
        display: inline-block;
        width: 80px;
        float: left;
        line-height: 36px;
        text-align: right;
        margin-right: 10px;
    }

    .cm_labl .fileupBox {
        padding-left: 90px;
    }

    .cm_labl label.labl_btn {
        height: 36px;
        display: inline-block;
        width: 100px;
        position: relative;
    }

    .cumr_form .cm_labl label {
        line-height: 36px;
        margin-right: 15px;
    }

    .labl_file {
        position: absolute;
        left: 0;
        top: 0px;
        width: 118px;
        height: 34px;
        filter: alpha(opacity=0);
        -moz-opacity: 0;
        -khtml-opacity: 0;
        opacity: 0;
        cursor: pointer;
        z-index: 999;
    }

    .labl_clk {
        width: 118px;
        height: 34px;
        line-height: 32px;
        text-align: center;
        background: #fff;
        color: #e83828;
        font-size: 16px;
        border: 1px solid #e83828;
        outline: none;
        border-radius: 2px;
        cursor: pointer;
    }

    .cumr_form .cm_labl {
        margin: 20px 0;
    }

    .cm_labl .labl_tj,
    .bm_labl .labl_tj {
        width: 180px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: url(./asset/images/labl_tj.png) no-repeat;
        color: #fff;
        font-size: 14px;
        border: 0;
        outline: none;
        cursor: pointer;
        margin-top: 60px;
    }

    .cancel-btn {
        width: 180px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #e6e6e6;
        color: #333333;
        font-size: 14px;
        border: 0;
        outline: none;
        cursor: pointer;
        margin-top: 60px;
        margin-left: 35px;
    }

    .cm_labl .cm_lablep {
        border-radius: 2px;
        height: 36px;
        line-height: 36px;
        color: #666;
        font-size: 14px;
        padding: 0px 0 0 90px;
        position: relative;
        background: #f2f2f2;
        margin-top: 8px;
    }

    .cm_labl .cm_lablep0 i {
        left: 135px;
    }

    .cm_labl .cm_lablep1 i {
        left: 228px;
    }

    .cm_labl .cm_lablep2 i {
        left: 303px;
    }

    .cm_labl .cm_lablep3 i {
        left: 380px;
    }

    .cm_labl .cm_lablep4 i {
        left: 455px;
    }

    .cm_labl .cm_lablep i {
        position: absolute;
        top: -8px;
        display: block;
        width: 15px;
        height: 8px;
        background: url(./asset/images/cm_tspItem.png) no-repeat;
    }

    .cm_labl label.labl_img {
        width: 188px;
        overflow: hidden;
        height: 147px;
        border: 1px solid #dcdcdc;
        display: inline-block;
        position: relative;
        margin: 0 10px 20px 0;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .labl_tt {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 27px;
        background: url(./asset/images/dy_bg1.png) repeat-x left center;
        text-align: right;
        display: none;
    }

    .cm_labl label.labl_img:hover .labl_tt {
        display: block;
    }

    .labl_close {
        float: right;
        line-height: 25px;
        height: 27px;
        width: 27px;
        cursor: pointer;
        text-align: center;
        color: #fff;
        font-size: 24px;
    }

    .uploadbutton {
        display: block !important;
        input[disabled] {
            color: gray;
            border-color: gray;
        }
    }

    .disabled {
        color: gray;
        border-color: gray;
    }
}
</style>
