<template>
    <div class="cumr_list ask">
        <div id="divShow" class="cumr_form">
            <p class="cumr_actp">请选择正确的问题类型，帮您匹配专业的答疑老师，否则将无法解答！</p>
            <div class="cm_labl">
                <span class="cm_tsp">所属类型</span>
                <span id="DropQuestionClass">
                    <P style="display: inline-block" v-for="(item, index) in questionClassList" :key="index">
                        <input
                            :value="item.questionTypeSourceId"
                            v-model="questionTypeSourceId"
                            :id="`DropQuestionClass_${index}`"
                            type="radio"
                            name="ctl00$contentMain1$DropQuestionClass"
                            @click="switchQuestionClass(index)"
                        />
                        <!--                      QueClassName questionTypeName-->
                        <label :for="`DropQuestionClass_${index}`" @click="switchQuestionClass(index)">{{ item.questionTypeName }}</label>
                    </P>
                </span>
                <div id="divMark">
                    <p id="cm_lablep" class="cm_lablep" :class="[`cm_lablep${tipIndex}`]" v-if="questionClassList.length > 0">
                        <i></i>
                        {{ questionClassList[tipIndex].questionTypeDescription }}
                        <span class="tip ml10" v-if="noAuthTip">（{{ noAuthTip }}）</span>
                    </p>
                </div>
            </div>
            <div id="UpdatePanelClassSubject">
                <div class="cm_labl">
                    <div class="labl_item">
                        <span class="cm_tsp">所属项目</span>
                        <!--                      :disabled="CatalogId?true:false"-->
                        <select
                            name="ctl00$contentMain1$DropProject"
                            id="DropProject"
                            class="cm_sel"
                            ref="project"
                            :disabled="ProjectId ? true : false"
                            v-model="ProjectId"
                        >
                            <option selected="selected" value>请选择项目</option>
                            <option :value="item.ProjectId" v-for="item in questionProject" :key="item.ProjectId" :selected="item.ProjectId == ProjectId">
                                {{ item.Picture ? '┃┗' : '┣' }}

                                {{ item.CatalogName }}
                            </option>
                        </select>
                    </div>
                    <div class="labl_item">
                        <span class="cm_tsp">所属科目</span>
                        <div @click="getSubjectList">
                            <select name="ctl00$contentMain1$DropQuestionSubject" id="DropQuestionSubject" class="cm_sel" v-model="subjectId" ref="subject">
                                <option value>请选择科目</option>
                                <option :value="item.subjectId" v-for="item in questionSubject" :key="item.subjectId">{{ item.subjectName }}</option>
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
                    maxlength="300"
                    name="ctl00$contentMain1$TxtQuestionContent"
                    rows="2"
                    cols="20"
                    id="TxtQuestionContent"
                    v-model="questionContent"
                    class="labl_area"
                    placeholder="准确的提出您的问题可以更快的得到解答哦"
                ></textarea>
                <span class="text_area_tip">{{ questionContent.length }} / 300</span>
            </div>
            <div class="cm_labl">
                <span class="cm_tsp">上传图片</span>
                <div style="line-height: 36px">最多上传{{ maxFileNumber }}张图片</div>
                <div class="fileupBox" id="file-list">
                    <div v-show="fileList.length">
                        <label class="labl_img" v-for="(item, index) in fileList" :key="index" :style="`background-image:url(${$urlUtils.getViewUrl(item)})`">
                            <div class="labl_tt">
                                <span class="labl_close" @click="delImg(index)">×</span>
                            </div>
                        </label>
                    </div>
                    <vb-upload-img-auto v-show="false" ref="vbUpload" @success="upImgSuccess" :limit="maxFileNumber" :suffixs="suffixs" />
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
                            :class="fileList.length >= maxFileNumber ? 'disabled' : ''"
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
                <input ref="submit" id="send" class="labl_tj" value="提交问题" type="button" @click="addlearnQuestion()" />
                <input class="cancel-btn" value="取消" type="button" @click="cancelSubmit" />
            </div>
        </div>
    </div>
</template>
<script>
import '@/api/cc/api.QA3001.web-questiontypes.js';
import '@/api/cc/api.SS3017.studentclass-queryuserprojects.js';
import '@/api/cc/api.QA1005.question-auth.js';
import '@/api/cc/api.QA3002.subject-list.js';
import '@/api/cc/api.QA0004.question-add.js';
import io from '@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/io.js';
import vbUploadImgAuto from '@/www/components/personalCenter/upLoadImageAuto/upLoadImageAuto';

export default {
    components: { vbUploadImgAuto },
    props: ['curProject'],
    data() {
        return {
            suffixs: ['jpg', 'png', 'jpeg', 'gif'],
            // 问题反馈类型
            questionClassList: [],
            tipIndex: 0,
            componentId: 'upload' + this.$DateUtil.getUUID(),
            promiseList: [],
            ProjectId: '',
            subjectId: '',
            qaDeviceInfoDto: {
                deviceType: '',
                brand: '',
                phoneModel: '',
                systemVersion: '',
                version: '',
            },
            classSourceprojectid: '',
            // 所属项目列表
            questionProject: [],
            // 选中的项目
            CatalogId: '',
            // 对应项目下的科目列表
            questionSubject: [],
            // 问题描述
            questionContent: '',
            // 上传文件列表
            fileList: [],
            // 上传文件个数
            maxFileNumber: '5',
            noAuthTip: '',
            questionTypeSourceId: 1,
        };
    },
    watch: {
        curProject: {
            deep: true,
            immediate: true,
            handler(val) {
                if (val) {
                    this.ProjectId = val.ProjectId;
                    this.CatalogId = val.CatalogId;
                }
            },
        },
        questionTypeSourceId: {
            deep: true,
            immediate: true,
            handler(value) {
                this.subjectId = '';
                this.getSubjectList();
            },
        },
    },
    created() {
        this.getQuestionList();
        this.getUserQuestionProject();
        this.getDeviceInfo();
    },
    mounted() {},
    methods: {
        getDeviceInfo() {
            /*ResUtil.loadJsSync(`/pch5static/js/jsFile/Browser.js`);*/
            var info = new Browser() || {};

            this.qaDeviceInfoDto = {
                deviceType: info.device,
                brand: this.$platform.browser, //客户端浏览器
                phoneModel: this.$platform.version,
                systemVersion: info.os + ' ' + info.osVersion, //客户端版本
                version: this.$platform.version,
            };
        },
        getUserQuestionProject() {
            this.$callApi('cc/studentclass-queryuserprojects', {
                onsuccess: (res) => {
                    //获取当前项目
                    let data = res.data;
                    data.forEach((item, index) => {
                        item.ProjectId = item.projectId;
                        item.CatalogName = item.projectName;
                        item.CatalogId = index;
                    });
                    console.log(data, '---data');
                    this.questionProject = data;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        getQuestionList() {
            this.$callApi('cc/web-questiontypes', {
                onsuccess: (res) => {
                    this.questionClassList = res;
                    this.switchQuestionClass(0);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        switchQuestionClass(index) {
            this.tipIndex = index;
            //答疑提问鉴权
            this.getQuestionAuth();
        },
        //答疑提问鉴权
        getQuestionAuth() {
            let vm = this;
            let queClassId = vm.questionClassList[vm.tipIndex].questionTypeSourceId;
            let questionType = ''; //P:学科专业类；C:课件类；E:教务类;S:建议类;R:其他类；
            if (queClassId == 1) {
                //学科专业类
                questionType = 'P';
            }
            if (queClassId == 4) {
                //课件类
                questionType = 'C';
            }
            if (queClassId == 5) {
                //教务类
                questionType = 'E';
            }
            if (queClassId == 3) {
                //建议类
                questionType = 'S';
            }
            if (queClassId == 6) {
                //其他类
                questionType = 'R';
            }
            this.$callApi('cc/question-auth', {
                questionType,
                projectId: vm.curProject.ProjectId,
                classId: '',
                onsuccess: (res) => {
                    //答疑权限状态 Y:有权限 N:无权限
                    if (res.authStatus == 'Y') {
                        this.noAuthTip = '';
                        this.$refs.submit.disabled = false;
                        this.$refs.submit.style.background = '';
                        this.$refs.submit.style.color = '';
                    } else {
                        this.noAuthTip = res.authMsg;
                        this.$refs.submit.disabled = true;
                        this.$refs.submit.style.background = '#E6E6E6';
                        this.$refs.submit.style.color = '#333333';
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        getSubjectList() {
            let isSubjectProfessional = this.questionTypeSourceId == 1 ? 'Y' : 'N';
            if (!this.curProject.ProjectId) {
                this.questionSubject = [];
                return;
            }
            this.$callApi('cc/subject-list', {
                projectId: this.curProject.ProjectId,
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
            } else if (this.questionContent.length < 5) {
                this.$baseUI.alert('问题字数太少了吧，至少输入5个字');
                return false;
            } else if (this.questionContent.length > 300) {
                this.$baseUI.alert('问题描述不能超过300字');
                return false;
            } else if (this.fileList.length > this.maxFileNumber) {
                this.$baseUI.alert('最多只能添加5张图片!');
                return false;
            }
            return true;
        },
        upload(formData) {
            console.log('上传图片');
            console.log(formData);
            debugger;
            var self = this;
            console.log(this);
            debugger;
            return new Promise((resolve, reject) => {
                Mask.showLoading();
                console.log(11);
                debugger;
                self.$callRawApi({
                    api: 'fs/file/upload/token',
                    onerror(_failure) {
                        reject(_failure);
                        /*reject(_failure.getDescription());*/
                        Mask.hideLoading();
                    },
                    onsuccess(data) {
                        debugger;
                        var uploadToken = data.uploadToken;
                        let xhr;
                        xhr = io.listenXMLHttpRequestStateChange({
                            apiResponseConverterId: 'file-service',
                            onsuccess(data) {
                                resolve(data);
                            },
                            onerror(_failure) {
                                reject(_failure.getDescription());
                            },
                        });
                        var uploadPath = self.$niceloo.path.getServerFileUploadPath({
                            uploadToken, // 上传凭证
                            fileTtl: 'temporary', // 文件生命周期。permanent - 永久有效；temporary - 临时有效；disposable - 一次性有效；
                            fileType: 'image', // 文件类型。image - 图片；html - HTML页面；
                            fileStoreLocation: 'niceloo', // 上传到的目标位置。niceloo - 优路服务；baidu - 百度；baidudoc - 百度文档；
                        });
                        uploadPath = self.action || uploadPath;
                        xhr.open('POST', uploadPath);
                        xhr.send(formData);
                    },
                });
                /*Http.callService({
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
                                /!*error*!/
                                Mask.hideLoading();
                                reject('服务器连接失败！');
                            });
                    })
                    .fail((error) => {
                        reject(error);
                        Mask.hideLoading();
                    });*/
            });
        },
        uploadFile(files) {
            console.log(files);
            debugger;
            /*let vm = this;*/
            let formData = new FormData();
            formData.append('file', files);
            return this.upload(formData)
                .then((data) => {
                    this.fileList.push(data.filePath);
                    if (this.fileList.length > this.maxFileNumber) {
                        this.$baseUI.alert('最多只能添加5张图片!');
                        this.fileList.splice(this.maxFileNumber);
                    }
                })
                .catch((msg) => {
                    alert('文件上传失败', msg);
                });
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
            /*let input = document.querySelector('#' + this.componentId);
            var files = input.files;
            if (this.fileList.length > this.maxFileNumber) {
                MsgBox.alert('最多只能添加5张图片!');
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

        addlearnQuestion() {
            /*let vm = this;*/
            // 判断登录来源
            if (window.location.host.indexOf('jiaoyu361.com') > -1) {
                /**
                 * 域名为：
                 * previewdev.jiaoyu361.com
                 * previewtest.jiaoyu361.com
                 * previewuat.jiaoyu361.com
                 * preview.jiaoyu361.com
                 * 判定为预览模式（预览模式不进入埋点易观系统）
                 */
                this.$baseUI.alert('该功能在仿真环境下不支持预览！');
                return;
            }
            if (this.validate()) {
                this.$refs.submit.value = '提交中...';
                this.$refs.submit.disabled = true;
                this.$callApi('cc/question-add', {
                    projectId: this.ProjectId,
                    subjectId: this.subjectId,
                    questionTypeId: this.questionClassList[this.tipIndex].questionTypeId,
                    description: this.questionContent,
                    images: this.fileList,
                    qaDeviceInfoDto: this.qaDeviceInfoDto,
                    onsuccess: (res) => {
                        this.$refs.submit.value = '提交问题';
                        this.$refs.submit.disabled = false;
                        this.$emit('update:currentTabComponent', 'myQuestionList');
                        this.$emit('loadData', true);
                    },
                    onerror: (err) => {
                        this.$baseUI
                            .alert({
                                title: '提示',
                                content: err.getAttachedData().getMsg(),
                                confirmVal: '确定',
                            })
                            .then(() => {
                                this.getQuestionList();
                                this.getUserQuestionProject();
                                this.getDeviceInfo();
                            });
                    },
                    oncomplete: () => {
                        this.$refs.submit.value = '提交问题';
                        this.$refs.submit.disabled = false;
                    },
                });
            }
        },
        cancelSubmit() {
            this.$emit('update:currentTabComponent', 'myQuestionList');
            this.$emit('loadData');
            this.$emit('update:showTop', 'true');
        },
    },
};
</script>
<style lang="less" scoped>
.cumr_list {
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
        background: linear-gradient(90deg, #ff6870, #f8323c);
        color: #fff;
        font-size: 14px;
        border: 0;
        outline: none;
        cursor: pointer;
        margin-top: 60px;
        border-radius: 8px;
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
        border-radius: 8px;
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

        .tip {
            color: #f1241a;
        }
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
    }

    .disabled {
        color: gray;
        border-color: gray;
    }
}
</style>
