<template>
    <div class="right" v-if="questionDetail">
        <div class="top">
            <a @click="getBack">返回</a>
            问题详情
        </div>
        <div class="item">
            <!--问题-->
            <div class="ques">
                <h5>
                    <span>科目：{{ questionDetail.subjectName }}</span>
                    <span>问题类型：{{ questionDetail.questionTypeName }}</span>
                    <span>提问时间：{{ questionDetail.questionCreatedDate }}</span>
                </h5>
                <div class="content">
                    <div class="contentBox clearfix">
                        <div class="hasColor contentText fn-left"></div>
                        <div class="boxText fn-left">{{ questionDetail.questionContent }}</div>
                    </div>
                    <span class="img" v-for="(qImg, qImgIndex) in questionDetail.questionFilePath" :url="$urlUtils.getViewUrl(qImg)" :key="qImgIndex"></span>
                    <!--{{ questionDetail }}-->
                    <LookQuestion v-if="questionDetail.questionSourceType === 'Q'" :question-id="questionDetail.questionId"></LookQuestion>
                </div>
            </div>
            <div class="answ" v-for="(answer, answerIndex) in itemList" :key="answerIndex">
                <div class="content" :class="answerTip && editQuestionAnswer.answerCommentId == answer.id ? 'edit2' : ''">
                    <a class="contentText" :class="answer.type == 'question' ? 'hasColor' : 'ans'">
                        <div class="contentTag">
                            {{ answer.time }}
                            <div class="text" v-if="answer.type == 'question'">追问</div>
                            <div class="text" v-if="answer.type == 'answer'">解答</div>
                        </div>
                        <template v-if="answerIndex + 1 < itemList.length">
                            <span>{{ answer.con }}</span>
                        </template>
                        <template v-else>
                            <span v-show="!answerTip">{{ answer.con }}</span>
                        </template>

                        <div v-if="editQuestionAnswer.answerCommentId != answer.id">
                            <span
                                style="width: 96px; height: 78px; margin-right: 20px"
                                class="img"
                                :url="$urlUtils.getViewUrl(qImg)"
                                v-for="(qImg, qImgIndex) in answer.pic"
                                :key="qImgIndex"
                            />
                        </div>

                        <div v-if="editQuestionAnswer.answerCommentId == answer.id && !answerTip">
                            <span
                                style="width: 96px; height: 78px; margin-right: 20px"
                                class="img"
                                :url="$urlUtils.getViewUrl(qImg)"
                                v-for="(qImg, qImgIndex) in answer.pic"
                                :key="qImgIndex"
                            />
                        </div>
                    </a>
                </div>
            </div>

            <div class="unHandle" v-if="questionDetail.unHandleTypeName">
                不处理原因:
                {{ questionDetail.unHandleTypeName }}
            </div>
            <!-- 等待解答的时候显示 -->
            <div class="edit" v-if="questionDetail.questionStatus == 'AW'">
                <div class="handleAnswer">
                    <a class="hovers" @click="getQuestionIsCanUpdate(1)">
                        <img src="./asset/images/bianji.png" />
                        编辑问题
                    </a>
                    <a class="hovers del" @click="deleteQuestion">
                        <img src="./asset/images/shanchu.png" />
                        删除问题
                    </a>
                </div>
            </div>

            <div class="edit" v-if="questionDetail.questionStatus == 'AG' && questionDetail.answerList && questionDetail.answerList.length > 0 && !answerTip">
                <div class="handleAnswer">
                    <a class="hovers goEditAnswer" @click="updateQuestionAgin()">
                        <img src="./asset/images/bianji.png" />
                        编辑问题
                    </a>
                    <a class="hovers del" @click="deleteQuestionAgin">
                        <img src="./asset/images/shanchu.png" />
                        删除问题
                    </a>
                </div>
            </div>

            <!--编辑追问-->

            <div class="edit edit2" v-if="answerTip">
                <div class="inputContent form inputContent2">
                    <textarea maxlength="100" name="moreQues" placeholder="请输入您要问的问题" v-model="editAnswerContent"></textarea>
                    <span class="fontNum">
                        <em>{{ editAnswerContent.length }}</em>
                        /100
                    </span>

                    <div class="cm_labl">
                        <div class="text-row">
                            <!-- <span class="cm_tsp">上传图片</span> -->
                            <div class="cm_tsp_text">最多上传{{ maxFileNumber }}张图片</div>
                        </div>
                        <!--id="file-list"-->
                        <div class="fileupBox">
                            <div v-if="fileList2.length" class="labl_img_list">
                                <label
                                    class="labl_img"
                                    v-for="(item, index) in fileList2"
                                    :key="index"
                                    :style="`background-image:url(${$urlUtils.getViewUrl(item)})`"
                                >
                                    <div class="labl_tt">
                                        <span class="labl_close" @click="delImg2(index)">×</span>
                                    </div>
                                </label>
                            </div>
                            <vb-upload-img-auto v-show="false" ref="vbUpload2" @success="upImgSuccess2" :limit="maxFileNumber" :key="componentId2" />
                            <label class="labl_btn uploadbutton">
                                <!--<input
                                    type="file"
                                    :id="componentId2"
                                    class="labl_file"
                                    ref="file"
                                    multiple
                                    accept="image/*"
                                    :disabled="fileList2.length >= maxFileNumber ? true : false"
                                    style="cursor: pointer"
                                    @change="selectImg2"
                                />-->
                                <input
                                    type="button"
                                    value="点击上传"
                                    class="upload-btn"
                                    :class="fileList2.length >= maxFileNumber ? 'disabled' : ''"
                                    style="position: relative; z-index: 1"
                                    @click="selectImg2"
                                />
                            </label>
                        </div>
                        <input type="hidden" name="ctl00$contentMain1$hidImageUrl" id="hidImageUrl" />
                        <input type="hidden" name="ctl00$contentMain1$hidoldquestionid" id="hidoldquestionid" />
                        <input type="hidden" name="ctl00$contentMain1$hidasktype" id="hidasktype" />
                    </div>

                    <div class="bottom-btn">
                        <input ref="submit" type="button" class="sub" value="提交" @click="updateAnswer" />
                        <input type="button" value="取消" class="cel" @click="cancelAnswer" />
                    </div>
                </div>
            </div>

            <!-- 已评价   -->

            <div class="edit pingjia" v-if="questionDetail.questionEvaluateStatus && questionDetail.questionEvaluateStatus !== 'NE'">
                <div class="pingjia-top">
                    <div class="badanswer" v-if="questionDetail.questionEvaluateStatus == 'NS'" style="display: inline-block"></div>
                    <div
                        class="goodanswer"
                        v-if="questionDetail.questionEvaluateStatus == 'VS' || questionDetail.questionEvaluateStatus == 'S'"
                        style="display: inline-block"
                    ></div>
                    <div
                        style="display: inline-block"
                        v-if="
                            questionDetail.questionEvaluateStatus == 'NS' ||
                            questionDetail.questionEvaluateStatus == 'VS' ||
                            questionDetail.questionEvaluateStatus == 'S'
                        "
                    >
                        您的评价: {{ questionDetail.questionEvaluateStatusName }}
                        <span v-if="questionDetail.questionEvaluateStatus == 'NS'">( {{ questionDetail.evaluationStatusName }} )</span>
                        <span v-else>！</span>
                    </div>
                </div>

                <div class="noansw" v-if="questionDetail.isDissatisfaction == 'N' && questionDetail.evaluationCheckStatus == 'UE'">
                    <span>{{ questionDetail.checkDescription }}</span>
                    <div class="tip">
                        <div class="tipDetail" :title="questionDetail.evaluationCheckExplain">
                            <img src="./asset/images/topArrow.png" />
                            {{ questionDetail.evaluationCheckExplain }}
                        </div>
                    </div>
                </div>
                <div
                    class="pingjia-bottom"
                    v-if="
                        // questionDetail.questionEvaluateStatus == 'NS' &&
                        questionDetail.evaluationCheckStatus == 'RE' && questionDetail.isDissatisfaction == 'Y'
                    "
                >
                    <!-- 非常抱歉，已为您屏蔽该答疑老师！ -->
                    {{ questionDetail.checkDescription }}
                </div>
            </div>

            <div v-else>
                <div class="edit" v-if="questionDetail.questionStatus == 'AD'">
                    <div class="handleAnswer">
                        <a href="javascript:" class="know" :class="knowTip ? 'active' : ''" @click="openKnowTip">
                            <img src="./asset/images/zancopy.png" />
                            已经懂了
                        </a>
                        <a href="javascript:" class="unknow" :class="unknowTip ? 'active' : ''" @click="openUnKnowTip">
                            <img src="./asset/images/wen.png" />
                            还不明白
                        </a>
                        <a href="javascript:" class="other" :class="unsatisfactoryTip ? 'active' : ''" @click="openUnsatisfactoryTip">对解答不满意，点这里</a>
                        <!--已经懂了-->
                        <div class="understand" v-if="knowTip">
                            <p>问题关闭，请评价服务</p>
                            <a
                                href="javascript:"
                                class="hovers"
                                :class="{ cool: type.code == 'VS', ok: type.code == 'S' }"
                                v-for="(type, index) in understandType"
                                :key="index"
                                @click="submitUnderstandType(type)"
                            >
                                <img src="./asset/images/flower2.png" v-if="type.code == 'VS'" />
                                <img src="./asset/images/smile.png" v-if="type.code == 'S'" />
                                {{ type.label }}
                            </a>
                        </div>
                        <!--还不明白-->
                        <div class="inputContent form" v-if="unknowTip">
                            <textarea maxlength="100" name="moreQues" placeholder="请输入您要问的问题" v-model="questionContentAgain"></textarea>
                            <span class="fontNum">
                                <em>{{ questionContentAgain.length }}</em>
                                /100
                            </span>
                            <!--                        上传图片 最多上传 {{ maxFileNumber }} 张图片-->

                            <div class="cm_labl">
                                <div class="text-row">
                                    <!-- <span class="cm_tsp">上传图片</span> -->
                                    <div class="cm_tsp_text" style="margin-left: 53px">最多上传{{ maxFileNumber }}张图片</div>
                                </div>
                                <!--id="file-list"-->
                                <div class="fileupBox">
                                    <div v-if="fileList.length" class="labl_img_list">
                                        <label
                                            class="labl_img"
                                            v-for="(item, index) in fileList"
                                            :key="index"
                                            :style="`background-image:url(${$urlUtils.getViewUrl(item)})`"
                                        >
                                            <div class="labl_tt">
                                                <span class="labl_close" @click="delImg(index)">×</span>
                                            </div>
                                        </label>
                                    </div>
                                    <vb-upload-img-auto v-show="false" ref="vbUpload" @success="upImgSuccess" :limit="maxFileNumber" :key="componentId" />
                                    <label class="labl_btn uploadbutton">
                                        <!--<input
                                            type="file"
                                            :id="componentId"
                                            class="labl_file"
                                            ref="file"
                                            multiple
                                            accept="image/*"
                                            :disabled="fileList.length >= maxFileNumber ? true : false"
                                            style="cursor: pointer"
                                            @change="selectImg"
                                        />-->
                                        <input
                                            type="button"
                                            value="点击上传"
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

                            <input ref="addition" type="button" value="提交" class="sub" @click="additionQuestion" />
                        </div>
                        <!--不满意-->
                        <div class="angry" v-if="unsatisfactoryTip">
                            <p>选择不满意的原因</p>
                            <a
                                href="javascript:"
                                class="hovers"
                                :class="{
                                    angry1: type.code == 'AW',
                                    angry2: type.code == 'AWQ',
                                    angry3: type.code == 'BA',
                                }"
                                v-for="(type, index) in disagreeType"
                                :key="index"
                                @click="submitDisagreeType(type)"
                            >
                                <img src="./asset/images/angry1.png" v-if="type.code == 'AW'" />
                                <img src="./asset/images/angry2.png" v-if="type.code == 'AWQ'" />
                                <img src="./asset/images/angry3.png" v-if="type.code == 'BA'" />
                                {{ type.label }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="edit" v-if="questionDetail.questionStatus == 'QC'">
                <template v-if="questionDetail.QuestionEvaluate">
                    <div :class="questionDetail.QuestionEvaluateDesc ? 'badanswer' : 'goodanswer'">
                        {{ questionDetail.QuestionEvaluate }}
                    </div>
                </template>
                <div class="evaluatedes" v-if="questionDetail.QuestionEvaluateDesc">
                    <p :class="{ red: questionDetail.BottomButton == 3 }">
                        {{ questionDetail.QuestionEvaluateDesc }}
                    </p>
                </div>
                <div class="handle" v-if="questionDetail.AuditEvaluationDesc">
                    <img src="./asset/images/topArrow.png" />
                    <p class="detail">{{ questionDetail.AuditEvaluationDesc }}</p>
                </div>
                <div class="noAnswerTip mb15" v-if="questionDetail.QuestionRemark">
                    {{ questionDetail.QuestionRemark }}
                </div>

                <template v-if="questionDetail.questionCloseStatus == 'QCS'">答疑已经超过2天, 问题自动关闭</template>
            </div>
        </div>

        <!-- 等待解答的时候显示 -->

        <div
            class="item noAnswer"
            v-if="questionDetail.questionStatus == 'AW' || (questionDetail.questionStatus == 'AG' && questionDetail.answerList.length < 1)"
        >
            <img src="./asset/images/answerDetailBg.png" alt />
            <p>
                大家提的问题有点多,
                <br />
                答疑老师正在解决，请再等一等。
            </p>
        </div>

        <div class="zoom">
            <div class="imgZoomBg"></div>
            <div class="imgZoomContent">
                <img src="./asset/images/dy_close2.png" alt class="close" />
                <div class="control">
                    <div class="rotateLeft">
                        <img src="./asset/images/xz_left.png" alt />
                        左旋转90度
                    </div>
                    <div class="rotateRight">
                        <img src="./asset/images/xz_right.png" alt />
                        右旋转90度
                    </div>
                </div>
            </div>
            <img src alt class="target" />
        </div>
    </div>
</template>
<script>
import '@/api/cc/api.QA0008.question-can-update.js';
import '@/api/cc/api.QA0002.question-info.js';
import '@/api/cc/api.QA0003.question-delete.js';
import '@/api/cc/api.QA1003.answercomment-delete.js';
import '@/api/cc/api.QA2001.evaluation-add.js';
import '@/api/cc/api.QA1001.answercomment-add.js';
import '@/api/cc/api.QA1002.answercomment-update.js';
/*import '@/api/cc/api.QA2002.satisfied-evaluation-types.js;*/
import LookQuestion from '../look-question';
import vbUploadImgAuto from '@/www/components/personalCenter/upLoadImageAuto/upLoadImageAuto';
export default {
    components: { vbUploadImgAuto, LookQuestion },
    props: {
        questionId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            componentId: 'upload' + this.$DateUtil.getUUID(),
            componentId2: 'upload' + this.$DateUtil.getUUID(),
            questionDetail: {},
            questionContentAgain: '',
            editQuestionAnswer: {},
            editAnswerContent: '',
            disagreeType: [],
            understandType: [],
            evaluateType: [],
            subEvaluateType: [],
            knowTip: false,
            unknowTip: false,
            unsatisfactoryTip: false,
            answerTip: false,
            evaluateTypeTip: false,
            subEvaluateTypeTip: false,
            // 上传文件列表
            fileList: [],
            fileList2: [],
            itemList: [],
            // 上传文件个数
            maxFileNumber: '5',
        };
    },
    computed: {},
    watch: {
        questionContentAgain(nv) {
            if (nv.length > 100) {
                this.questionContentAgain = this.questionContentAgain.substr(0, 100);
            }
        },
        questionDetail: {
            deep: true,
            immediate: true,
            handler(newV) {
                this.itemList = [];

                // 如果回答存在
                if (this.questionDetail.answerList && this.questionDetail.answerList.length) {
                    this.questionDetail.answerList.forEach((item) => {
                        console.log(item, '--item--');
                        this.itemList.push({
                            type: 'answer',
                            time: item.answerCreatedDate,
                            // teacher: true,
                            con: item.answerContent,
                            pic: item.answerFilePath,
                            id: item.answerId,
                        });
                        // 如果追问和回答存在
                        if (item.answerCommentList && item.answerCommentList.length) {
                            item.answerCommentList.forEach((replyItem, replyIndex) => {
                                console.log(replyItem, '--replyItem--');
                                if (replyIndex % 2 == 0) {
                                    this.itemList.push({
                                        time: replyItem.answerCommentCreatedDate,
                                        con: replyItem.answerCommentContent,
                                        type: 'question',
                                        pic: replyItem.answerCommentFilePath,
                                        id: replyItem.answerCommentId,
                                    });
                                } else {
                                    this.itemList.push({
                                        time: replyItem.answerCommentCreatedDate,
                                        con: replyItem.answerCommentContent,
                                        type: 'answer',
                                        pic: replyItem.answerCommentFilePath,
                                        id: replyItem.answerCommentId,
                                    });
                                }
                            });
                        }
                    });
                }
                console.log(this.itemList);
            },
        },
    },
    created() {
        this.$emit('update:showTop', false);
    },
    mounted() {
        //初始化数据
        this.loadData();
    },
    methods: {
        getQuestionIsCanUpdate(type) {
            let vm = this;
            this.$callApi('cc/question-can-update', {
                questionId: this.questionId,
                onsuccess: (res) => {
                    if (res) {
                        type == 1 ? this.updateQuestion() : this.updateQuestionAgin();
                    }
                },
                onerror: (err) => {
                    /*this.$niceloo.api.handleFailure,*/
                    /*content: data.msg,*/
                    this.$baseUI
                        .alert({
                            title: '提示',
                            content: err.getAttachedData().getMsg(),
                            confirmText: '确定',
                        })
                        .then(function () {
                            vm.loadData();
                        });
                },
                oncomplete: () => {},
            });
            /*lcApi.getQuestionIsCanUpdate({
                params: {
                    questionId: this.QuestionID,
                },
                success: (res) => {
                    if (res) {
                        type == 1 ? this.updateQuestion() : this.updateQuestionAgin();
                    }
                },
                fail: (data, msg) => {
                    MsgBox.alert({
                        title: '提示',
                        content: data.msg,
                        confirmText: '确定',
                    }).then(function () {
                        vm.loadData();
                    });
                },
                error: (data, msg) => {
                    MsgBox.alert({
                        title: '提示',
                        content: data.msg,
                        confirmText: '确定',
                    }).then(function () {
                        vm.loadData();
                    });
                },
            });*/
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
        uploadFile(files, type) {
            let fileList = type == 1 ? this.fileList : this.fileList2;
            let formData = new FormData();
            formData.append('file', files);
            return this.upload(formData)
                .then((data) => {
                    fileList.push(data.filePath);
                    if (fileList.length > this.maxFileNumber) {
                        this.$baseUI.alert('最多只能添加5张图片!');
                        fileList.splice(this.maxFileNumber);
                    }
                })
                .catch((msg) => {
                    alert('文件上传失败', msg);
                });
        },
        inputChange(files, type) {
            this.promiseList = [];
            if (files && files.length > 0) {
                let val = [];
                for (let i = 0; i < files.length; i++) {
                    val.push(files[i]);
                }
                for (let file of val) {
                    this.promiseList.push(this.uploadFile(file, type).then(() => {}));
                }
            }
            Promise.all(this.promiseList).then(() => {});
        },
        /*delImg(item) {
            var s = [];
            for (var i = 0; i < this.fileList.length; i++) {
                if (this.fileList[i] != item) {
                    s.push(this.fileList[i]);
                }
            }
            this.fileList = s;
        },
        delImg2(item) {
            var s = [];
            for (var i = 0; i < this.fileList2.length; i++) {
                if (this.fileList2[i] != item) {
                    s.push(this.fileList2[i]);
                }
            }
            this.fileList2 = s;
        },*/
        delImg(index) {
            this.$refs.vbUpload.deleteFile1(index);
            this.fileList.splice(index, 1);
        },

        delImg2(index) {
            this.$refs.vbUpload2.deleteFile1(index);
            this.fileList2.splice(index, 1);
        },
        selectImg() {
            if (this.fileList.length < this.maxFileNumber) {
                this.$refs.vbUpload.inputClick();
            }
            /*let input = document.querySelector('#' + this.componentId);
            var files = input.files;
            if (this.fileList.length > this.maxFileNumber) {
                this.$baseUI.alert('最多只能添加5张图片!');
                this.fileList.splice(this.maxFileNumber);
                return;
            }
            this.inputChange(files, 1);*/
        },
        selectImg2() {
            if (this.fileList2.length < this.maxFileNumber) {
                this.$refs.vbUpload2.inputClick();
            }
            /*let input = document.querySelector('#' + this.componentId2);
            var files = input.files;
            if (this.fileList2.length > this.maxFileNumber) {
                this.$baseUI.alert('最多只能添加5张图片!');
                this.fileList2.splice(this.maxFileNumber);
                return;
            }
            this.inputChange(files);*/
        },
        // 上传图片成功回调
        upImgSuccess({ response }) {
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
        },

        // 上传图片成功回调
        upImgSuccess2({ response }) {
            //上传头像成功
            console.log(response, '--------------');
            if (response && response.length > 0) {
                /*let imgSrc = response[0].filePath;*/
                response.forEach((item) => {
                    if (this.fileList2.length < this.maxFileNumber) {
                        this.fileList2.push(item.filePath);
                    } else {
                        this.$baseUI.alert('最多只能添加5张图片!');
                    }
                });
            }
        },
        loadData() {
            this.$callApi('cc/question-info', {
                questionId: this.questionId,
                onsuccess: (res) => {
                    this.questionDetail = res;
                    if (this.questionDetail.questionFilePath) {
                        this.questionDetail.questionFilePath = this.questionDetail.questionFilePath.length
                            ? this.questionDetail.questionFilePath.split(',')
                            : [];
                    } else {
                        this.questionDetail.questionFilePath = [];
                    }
                    if (this.questionDetail.answerList.length) {
                        this.questionDetail.answerList.forEach((item) => {
                            if (item.answerFilePath) {
                                item.answerFilePath = item.answerFilePath && item.answerFilePath.length ? item.answerFilePath.split(',') : [];
                            }
                            if (item.answerCommentList.length) {
                                item.answerCommentList.forEach((subItem) => {
                                    if (!Array.isArray(subItem.answerCommentFilePath)) {
                                        subItem.answerCommentFilePath =
                                            subItem.answerCommentFilePath && subItem.answerCommentFilePath.length
                                                ? subItem.answerCommentFilePath.split(',')
                                                : [];
                                    }
                                });
                            }
                        });
                    }
                    // 1：展示评价答案按钮 2：展示请重新提问 3：问题评论描述显示红色 ） ,
                    this.evaluateTypeTip = this.questionDetail.BottomButton == 1;
                    this.$nextTick(() => {
                        this.animate();
                    });
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        getBack() {
            this.$emit('update:currentTabComponent', 'myQuestionList');
            this.$emit('loadData');
            this.$emit('update:showTop', 'true');
        },
        //编辑问题
        updateQuestion() {
            this.$emit('update:currentTabComponent', 'updateQuestion');
            this.$emit('update:showTop', 'true');
        },
        //删除问题
        deleteQuestion() {
            let vm = this;
            this.$baseUI.confirm({
                title: '提示',
                content: '确认删除?',
                showCancel: true,
                cancelText: '取消',
                confirmText: '确定',
                confirm() {
                    vm.$callApi('cc/question-delete', {
                        questionId: vm.questionId,
                        onsuccess: (res) => {
                            vm.fileList = [];
                            vm.getBack();
                        },
                        onerror: (err) => {
                            vm.$baseUI
                                .alert({
                                    title: '提示',
                                    content: err.getAttachedData().getMsg(),
                                    confirmText: '确定',
                                })
                                .then(function () {
                                    vm.loadData();
                                });
                        },
                        oncomplete: () => {},
                    });
                },
                cancel() {},
            });
        },
        //追问
        deleteQuestionAgin() {
            let vm = this;

            let len = this.questionDetail.answerList[0].answerCommentList.length;

            this.$baseUI.confirm({
                title: '提示',
                content: '确认删除?',
                showCancel: true,
                cancelText: '取消',
                confirmText: '确定',
                confirm() {
                    vm.$callApi('cc/answercomment-delete', {
                        questionId: vm.questionDetail.questionId,
                        answerId: vm.questionDetail.answerList[0].answerId,
                        answerCommentId: vm.questionDetail.answerList[0].answerCommentList[len - 1].answerCommentId,
                        onsuccess: (res) => {
                            vm.loadData();
                            vm.fileList2 = [];
                        },
                        onerror: (err) => {
                            vm.$baseUI
                                .alert({
                                    title: '提示',
                                    content: err.getAttachedData().getMsg(),
                                    confirmText: '确定',
                                })
                                .then(function () {
                                    vm.loadData();
                                });
                        },
                        oncomplete: () => {},
                    });
                },
                cancel() {},
            });
        },
        //打开 已经懂了 弹层
        async openKnowTip() {
            this.unknowTip = false;
            this.unsatisfactoryTip = false;
            if (this.knowTip) {
                this.knowTip = false;
                return;
            }
            await this.getSatisfiedEvaluationTypes();
        },

        getSatisfiedEvaluationTypes() {
            return new Promise((resolve) => {
                this.$callRawApi({
                    api: 'qa/web/satisfied/evaluation/types',
                    onsuccess: (res) => {
                        this.understandType = res;
                        this.knowTip = true;
                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            });
        },
        //提交 已经懂了
        submitUnderstandType(type) {
            let vm = this;
            let evaluationStatus = '';

            if (type && type.code) {
                evaluationStatus = type.code;
            }
            this.$callApi('cc/evaluation-add', {
                questionId: vm.questionId,
                evaluationStatus,
                onsuccess: (res) => {
                    vm.$baseUI.alert('提交评价成功');
                    // vm.getBack()
                    this.knowTip = false;
                    vm.loadData();
                },
                onerror: (err) => {
                    vm.$baseUI
                        .alert({
                            title: '提示',
                            content: err.getAttachedData().getMsg(),
                            confirmText: '确定',
                        })
                        .then(function () {
                            vm.loadData();
                        });
                },
                oncomplete: () => {},
            });
        },
        //打开 还不明白 弹层
        openUnKnowTip() {
            this.knowTip = false;
            this.unsatisfactoryTip = false;
            this.unknowTip = !this.unknowTip;
            this.questionContentAgain = '';
            this.fileList = [];
        },
        //提交追问
        additionQuestion() {
            let vm = this;
            if (this.questionContentAgain.length > 100) {
                this.$baseUI.alert('请重点描述问题，最多能输入100个字');
                return false;
            } else if (this.questionContentAgain.length < 5) {
                this.$baseUI.alert('问题字数太少了吧，至少输入5个字');
                return false;
            } else if (this.fileList.length > this.maxFileNumber) {
                this.$baseUI.alert('最多只能添加5张图片!');
                return false;
            }

            this.$refs.addition.value = '提交中...';
            this.$refs.addition.disabled = true;
            this.$callApi('cc/answercomment-add', {
                answerId: this.questionDetail.answerList[0].answerId,
                questionId: this.questionId,
                description: this.questionContentAgain,
                images: this.fileList,
                onsuccess: (res) => {
                    this.unknowTip = false;
                    this.$refs.addition.value = '提交';
                    this.$refs.addition.disabled = false;
                    this.loadData();
                    this.fileList = [];
                },
                onerror: (err) => {
                    this.$baseUI
                        .alert({
                            title: '提示',
                            content: err.getAttachedData().getMsg(),
                            confirmText: '确定',
                        })
                        .then(function () {
                            vm.loadData();
                        });
                    this.$refs.addition.value = '提交';
                    this.$refs.addition.disabled = false;
                },
                oncomplete: () => {},
            });
        },
        //打开修改追问弹框
        updateQuestionAgin() {
            if (this.questionDetail.answerList[0].answerCommentList) {
                let len = this.questionDetail.answerList[0].answerCommentList.length;
                this.editQuestionAnswer = this.questionDetail.answerList[0].answerCommentList[len - 1];
                this.editAnswerContent = this.editQuestionAnswer.answerCommentContent;
                if (this.editQuestionAnswer.answerCommentFilePath) {
                    this.fileList2 = this.editQuestionAnswer.answerCommentFilePath;
                } else {
                    this.fileList2 = [];
                }
            }
            this.answerTip = true;
        },
        //修改追问
        updateAnswer() {
            let vm = this;
            if (this.editAnswerContent.length > 100) {
                this.$baseUI.alert('请重点描述问题，最多能输入100个字');
                return false;
            } else if (this.editAnswerContent.length < 5) {
                this.$baseUI.alert('问题字数太少了吧，至少输入5个字');
                return false;
            } else if (this.fileList2.length > this.maxFileNumber) {
                this.$baseUI.alert('最多只能添加5张图片!');
                return false;
            }
            this.$refs.submit.disabled = true;

            let len = this.questionDetail.answerList[0].answerCommentList.length;
            this.$callApi('cc/answercomment-update', {
                answerCommentId: this.questionDetail.answerList[0].answerCommentList[len - 1].answerCommentId,
                questionId: this.questionId,
                description: this.editAnswerContent,
                images: this.fileList2,
                answerId: this.questionDetail.answerList[0].answerId,
                onsuccess: (res) => {
                    this.answerTip = false;
                    this.loadData();
                    this.fileList2 = [];
                },
                onerror: (err) => {
                    console.log(err);
                    this.$baseUI
                        .alert({
                            title: '提示',
                            content: err.getAttachedData().getMsg(),
                            confirmText: '确定',
                        })
                        .then(() => {
                            vm.answerTip = false;
                            vm.loadData();
                        });
                },
                oncomplete: () => {
                    this.$refs.submit.disabled = false;
                    this.$emit('update:showTop', false);
                },
            });
        },
        //取消修改追问
        cancelAnswer() {
            this.answerTip = false;
            this.$nextTick(() => {
                this.fileList2.splice(0);
                this.animate();
                this.loadData();
            });
        },
        //打开 答案不满意  弹层
        async openUnsatisfactoryTip() {
            this.knowTip = false;
            this.unknowTip = false;
            if (this.unsatisfactoryTip) {
                this.unsatisfactoryTip = false;
                return;
            }
            //获取 答案不满意 选项
            await this.getNotsatisfiedEvaluationTypes();
        },
        getNotsatisfiedEvaluationTypes() {
            return new Promise((resolve) => {
                this.$callRawApi({
                    api: 'qa/web/notsatisfied/evaluation/types',
                    onsuccess: (res) => {
                        this.disagreeType = res;
                        this.unsatisfactoryTip = true;
                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    /*niceloo.api.handleFailure*/
                    oncomplete: () => {},
                });
            });
        },
        //提交不满意
        submitDisagreeType(type) {
            let vm = this;
            // evaluationStatus 评价类型(VS:非常满意,S:满意,AWQ:答非所问,AW:解答有误,BA:态度不好,AS:回复很慢)
            let evaluationStatus = '';

            if (type && type.code) {
                evaluationStatus = type.code;
            }
            this.$callApi('cc/evaluation-add', {
                questionId: vm.questionId,
                evaluationStatus,
                onsuccess: (res) => {
                    //刷新列表
                    this.$baseUI.alert('提交成功');
                    vm.unsatisfactoryTip = false;
                    vm.loadData();
                },
                onerror: (err) => {
                    console.log(err);
                    this.$baseUI
                        .alert({
                            title: '提示',
                            content: err.getAttachedData().getMsg(),
                            confirmText: '确定',
                        })
                        .then(function () {
                            vm.unsatisfactoryTip = false;
                            vm.loadData();
                        });
                },
                oncomplete: () => {},
            });
        },
        animate() {
            $(function () {
                $('.item .content span.img').each(function () {
                    console.log('666666666666');
                    console.log($(this).attr('url'));
                    $(this).css({
                        'background-image': 'url(' + $(this).attr('url') + ')',
                    });
                });
                var targetImg = $('.zoom img.target');
                var container = $('.zoom .imgZoomContent');
                var width = 0;
                var height = 0;
                var deg = 0;
                var transitionend = true;
                targetImg.on('load', function () {
                    width = targetImg.width();
                    height = targetImg.height();
                    container.css({ width, height });
                });
                targetImg.on('transitionend', function () {
                    transitionend = true;
                });
                $('.item .content span.img').click(function (e) {
                    var img = $(e.target);
                    targetImg.attr('src', img.attr('url'));
                    $('.zoom').show();
                });
                $('.zoom img.close').click(function () {
                    $('.zoom').hide();
                    transitionend = true;
                    deg = 0;
                    targetImg.css('transform', 'translate(-50%,-50%) rotate(0deg)');
                    container.css({ width: 'auto', height: 'auto' });
                });
                $('.zoom .rotateLeft').click(function () {
                    if (!transitionend) return;
                    transitionend = false;
                    deg = deg - 90;
                    translate(deg);
                });
                $('.zoom .rotateRight').click(function () {
                    if (!transitionend) return;
                    transitionend = false;
                    deg = deg + 90;
                    translate(deg);
                });

                function translate(deg) {
                    var flag = (Math.abs(deg) % 360) / 90;
                    var o = {};
                    if (flag == 1 || flag == 3) {
                        o = { width: height, height: width };
                    } else if (flag == 2 || flag == 0) {
                        o = { width, height };
                    }
                    container.css(o);
                    targetImg.css('transform', 'translate(-50%,-50%)  rotate(' + deg + 'deg)');
                }
            });
        },
    },
};
</script>
<style scoped lang="less">
* {
    box-sizing: content-box;
}

h5 {
    border: 0;
    font-weight: normal;
}
.clearfix:after {
    content: '';
    height: 0;
    display: block;
    clear: both;
}

.fn-left {
    float: left;
}
.noansw .tip {
    padding-top: 20px;
    font-size: 14px;
    overflow: hidden;
    transition: all 0.5s;
    height: 70px;
}
.noansw {
    span {
        margin-left: 39px;
        margin-top: 13px;
        display: block;
    }
}

.noansw .tip .tipDetail {
    position: relative;
    background: #f5f5f5;
    height: 54px;
    line-height: 54px;
    padding-left: 44px;
    font-size: 14px;
    transition: all 1s;
    padding-right: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.noansw .tipDetail img {
    position: absolute;
    left: 15px;
    top: -12px;
    width: 25px;
    height: 14px;
}

.right {
    word-break: break-all;
    float: right;
    width: 100%;
    position: relative;
    color: #333;
    font-size: 14px;
}

.right input {
    -webkit-appearance: button;
}

.right .top {
    line-height: 34px;
    text-align: center;
    font-size: 18px;
    color: #333;
    background: #fff;
    padding: 15px 30px;
    margin-bottom: 10px;
}

.right .top a {
    color: #fff;
    width: 70px;
    height: 34px;
    line-height: 34px;
    font-size: 16px;
    // padding-left: 18px;
    background: linear-gradient(90deg, #ff6870, #f8323c);
    border-radius: 8px;
    position: absolute;
    left: 30px;
    cursor: pointer;
}

.right .top a.detail {
    color: #f45d60;
}

div.le_content div.right div.item {
    padding: 30px;
    margin-bottom: 10px;
}

.right .item {
    position: relative;
}

.right .item:before {
    content: '';
    position: absolute;
    width: 4px;
    height: 16px;
    background: #fa654f;
    left: 0;
    top: 35px;
}

.right .item.noAnswer:before {
    content: '';
    background: none;
    width: 0;
    height: 0;
}

.right .item h5 {
    color: #999;
    height: 20px;
    line-height: 20px;
    padding-bottom: 10px;
    font-weight: normal;
    box-sizing: content-box;
    border-bottom: 1px solid #dcdcdc;
}

.right .item h5:after {
    content: '';
    display: block;
    clear: both;
}

.right .item h5 span {
    margin-right: 60px;
}

.right .item h5 span.fl {
    float: left;
    margin: 0;
}

.right .item h5 span.fr {
    float: right;
    margin: 0;
}

.right p {
    font-size: 14px;
    margin-bottom: 20px;
}

.right p.hasColor {
    color: #ef5c20;
}

.right .item span.img {
    width: 174px;
    height: 100px;
    border-radius: 10px;
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    vertical-align: middle;
    display: inline-block;
}

.right .item span.img:nth-of-type(3n + 1) {
    margin-left: 31px;
}

.right .item .add span.img:first-of-type {
    margin-left: 0px;
}

.right .item {
    background: #fff;
    padding: 35px 30px;
    margin-bottom: 10px;
}

.right .item .ques span {
    display: inline-block;
    font-size: 14px;
    color: #999;
    margin-bottom: 5px;
}

.right .item span.picCut {
    margin: 0;
}

.right .item p {
    margin-bottom: 20px;
}
.answ_img {
    display: inline-block;
    width: 96px;
    height: 78px;
    margin-right: 20px;
}
.right .item .content {
    margin-top: 10px;
    margin-bottom: 50px;
    word-wrap: break-word;
    word-break: normal;
    &.edit2 {
        margin-bottom: 0 !important;
    }
}

.right .item .content a.contentText {
    margin-top: 15px;
    display: block;
    line-height: 20px;
    color: #333;
    font-size: 16px;
    padding-left: 25px;
    div {
        word-break: break-all;
        margin-left: 20px;
    }
    span {
        margin: 15px;
    }
}

.contentTag {
    color: #999999;
    font-size: 14px;
    .text {
        display: inline-block;
    }
}

.right .item .content a.contentText.hasColor {
    padding-left: 0;
}

.right .item .content a.contentText.hasColor:after {
    content: '';
    display: block;
    clear: both;
}

.right .item .content a.contentText.hasColor span {
    float: left;
    width: 995px;
    font-size: 16px;
    line-height: 20px;
    color: #333;
    white-space: pre-wrap;
}
.contentBox span {
    float: left;
    width: 995px;
    font-size: 16px;
    line-height: 20px;
    color: #333;
    white-space: pre-wrap;
}
.contentBox .boxText {
    white-space: pre-wrap;
    width: calc(100% - 31px);
    word-break: break-all;
    font-size: 16px;
}

.contentText {
    word-break: break-all;
}
.right .item .content a.contentText.ans {
    padding-left: 0;
}

.right .item .content a.contentText.ans:after {
    content: '';
    display: block;
    clear: both;
}

.right .item .content a.contentText.ans span {
    float: left;
    /*width: 665px;*/
    width: 995px;
    font-size: 16px;
    line-height: 20px;
    color: #333;
    white-space: pre-wrap;
}

.right .item .content a.contentText.ans:before {
    content: '';
    width: 24px;
    height: 25px;
    background: url(./asset/images/da.png) no-repeat;
    float: left;
    margin-right: 7px;
}

.right .item .content a.contentText.hasColor:before {
    content: '';
    width: 24px;
    height: 25px;
    background: url(./asset/images/wen.png) no-repeat;
    float: left;
    margin-right: 7px;
}

.contentBox .contentText {
    width: 24px;
    height: 25px;
    background: url(./asset/images/wen.png) no-repeat;
    margin-right: 7px;
}
.right .item i {
    float: right;
    font-size: 14px;
    color: #999;
    font-style: normal;
}

.right .item > img {
    width: 174px;
    height: 100px;
    border-radius: 10px;
    margin-right: 20px;
}

.edit {
    &.pingjia {
        .pingjia-top {
            display: flex;
            align-items: center;
        }
        .pingjia-bottom {
            padding-left: 40px;
        }
    }
}
.right .item .edit {
    border-top: 1px dashed #999;
    margin-top: 30px;
    padding-top: 30px;
    position: relative;
    &.edit2 {
        border-top: none !important;
        margin-top: 0 !important;
        padding-top: 0 !important;
        .sub {
            cursor: pointer !important;
            float: left !important;
            width: 100px !important;
            height: 36px !important;
            background: #2485fd !important;
            //background: #4285f5;
            border: none !important;
            border-radius: 4px !important;
            margin-right: 30px !important;
            margin-left: 50px;
            margin-top: 10px !important;
        }
        .cel {
            background: #fff !important;
            float: left !important;
            cursor: pointer !important;
            width: 100px !important;
            height: 36px !important;
            margin-top: 10px !important;
            border: 1px solid #ccc !important;
            color: #333 !important;
            border-radius: 4px !important;
        }
        .upload-btn,
        .labl_file {
            height: 32px;
            width: 100px;
            background: #fff !important;
            display: inline-block;
            line-height: 32px;
            color: #2485fd;
            border-radius: 4px !important;
            cursor: pointer !important;
            border: 1px solid #2485fd;
        }
    }
}
.right .item .edit .handleAnswer > a {
    display: inline-block;
    width: 130px;
    height: 34px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 34px;
    border-radius: 5px;
    font-size: 14px;
    color: #333;
    margin-right: 30px;
    position: relative;
    z-index: 10;
    cursor: pointer;
}

.right .item .edit a img {
    margin-top: 0px;
    width: 16px;
    height: 16px;
    vertical-align: sub;
    margin-right: 8px;
    border-radius: 0px;
}

.right .item .edit a.other {
    background: url(./asset/images/flower.png) left center no-repeat;
    border: none;
    float: right;
    margin: 0;
    font-size: 14px;
    color: #666;
    width: auto;
    background-size: 16px;
    padding-left: 22px;
}

.right .item .edit a.other.active {
    background: url(./asset/images/fuwushangpinglun_chaping2.png) left center no-repeat;
    height: 34px;
}

.right .item .edit a.active {
    height: 45px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-color: #fff;
}

.right .item .edit a.active.know {
    color: #4285f5;
}

.right .item .edit a.active.unknow {
    color: #e73928;
}
.inputContent,
.answ {
    .cm_labl label.labl_img {
        width: 96px;
        overflow: hidden;
        height: 78px;
        border: 1px solid #dcdcdc;
        display: inline-block;
        position: relative;
        margin: 0 10px 20px 0;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .text-row {
        width: 300px;
        height: 20px;
        text-align: center;
        .cm_tsp {
            float: left;
            margin-left: 20px;
            display: inline-block;
            width: 80px;
            text-align: right;
            margin-right: 20px;
        }
        .cm_tsp_text {
            float: left;
        }
    }

    .disabled {
        color: gray !important;
        border: 1px solid gray !important;
        background: none !important;
    }
    .fileupBox {
        padding-left: 50px;
        height: 140px;
        padding-top: 5px;
        .labl_img_list {
            display: flex;
        }
    }
    .labl_btn {
        height: 36px;
        display: inline-block;
        width: 100px;
        position: relative;
    }
    .cm_labl label.labl_img:hover .labl_tt {
        display: block;
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
}
.right .item .edit .inputContent {
    height: 355px;
    border: 1px solid #ccc;
    position: relative;
    top: -1px;
    text-align: center;
    &.inputContent2 {
        text-align: left;
        .fileupBox {
            padding-left: 0 !important;
        }
        .bottom-btn {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        textarea {
            width: 1070px !important;
        }
    }
}
.inputContent2 {
    border: none !important;
}

.right .item .edit .inputContent textarea {
    /*width: 615px;*/
    width: 1050px;
    height: 60px;
    margin-top: 30px;
    margin-bottom: 20px;
    padding: 10px 20px;
    border: 2px solid #eee;
    resize: none;
}

.right .item .edit .inputContent input {
    height: 32px;
    width: 120px;
    background: url(./asset/images/submit_bg.png) center no-repeat;
    display: inline-block;
    line-height: 32px;
    color: #fff;
    border: none;
}

.right .item .edit .inputContent span.fontNum {
    font-size: 14px;
    color: #999;
    position: absolute;
    right: 35px;
    bottom: 246px;
}

.right .item .edit .inputContent span.fontNum em {
    font-style: normal;
}

.right .item .edit .understand {
    height: 145px;
    border: 1px solid #ccc;
    position: relative;
    top: -1px;
    text-align: center;
}

.right .item .edit .understand.active {
    display: block;
}

.right .item .edit .understand p {
    margin: 28px 23px;
}

.right .item .edit .understand a {
    font-size: 14px;
    float: left;
    border: 1px solid #ef5c20;
    color: #ef5c20;
    border-radius: 3px;
    width: 218px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    margin-left: 23px;
    margin-right: 7px;
    box-sizing: content-box;
}

.right .item .edit .understand a:hover {
    background: #ffece4;
    border: none;
    height: 40px;
    line-height: 40px;
    width: 220px;
}

.right .item .edit .understand a img {
    height: 16px;
    width: auto;
}

.right .item .edit .understand a.ok {
    border: 1px solid #4285f5;
    color: #4285f5;
}

.right .item .edit .understand a.ok:hover {
    border: none;
    background: #e5efff;
}

.right .item .edit .angry {
    height: 145px;
    border: 1px solid #ccc;
    position: relative;
    top: 15px;
    text-align: center;
}

.right .item .edit .angry.active {
    display: block;
}

.right .item .edit .angry p {
    margin: 30px 20px;
    font-size: 14px;
}

.right .item .edit .angry a {
    width: 138px;
    height: 38px;
    border: 1px solid #ef5c20;
    line-height: 38px;
    text-align: center;
    color: #ef5c20;
    border-radius: 5px;
    font-size: 14px;
    float: left;
    margin: 0 7px 0 23px;
    box-sizing: content-box;
}

.right .item .edit .angry a img {
    margin-right: 6px;
}

.right .item .edit .angry a:hover {
    background: #ffece4;
    border: none;
    width: 140px;
    height: 40px;
    line-height: 40px;
}

.right .item .edit .angry a.angry2 {
    color: #4285f5;
    border: 1px solid #4285f5;
}

.right .item .edit .angry a.angry2:hover {
    background: #e5efff;
    border: none;
}

.right .item .edit .angry a.angry3 {
    color: #f17700;
    border: 1px solid #f17700;
}

.right .item .edit .angry a.angry3:hover {
    background: #fff1e3;
    border: none;
}

.right .item .edit .angry a.angry4 {
    color: #999;
    border: 1px solid #999;
}

.right .item .edit .angry a.angry4:hover {
    background: #e0e0e0;
    border: none;
}

.evaluate {
    padding-top: 30px;
}

.evaluatedes {
    padding-left: 40px;
}

.right .item .goodanswer {
    background: url(./asset/images/haopingshou.png) left center no-repeat;
    height: 30px;
    line-height: 40px;
    background-size: 30px;
    padding-left: 40px;
    font-size: 14px;
}

.right .item .badanswer {
    background: url(./asset/images/haopingshou2.png) left 5px no-repeat;
    background-size: 28px auto;
    padding-left: 40px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
}

.right .item .edit .badanswer a {
    color: #eb0010;
    font-size: 14px;
    text-decoration: underline;
}

.right .item .edit .handle {
    margin-top: 25px;
    padding: 20px 40px;
    font-size: 14px;
    background: #f5f5f5;
    position: relative;
}

.right .item .edit .handle img {
    position: absolute;
    left: 39px;
    top: -12px;
    width: 24px;
    height: 14px;
}

.right .item .edit .handle p {
    margin: 10px 0 0;
    line-height: 16px;
}

.right .item.noAnswer {
    text-align: center;
}

.right .item.noAnswer img {
    width: auto;
    height: auto;
    margin-bottom: 20px;
}

.right .item.noAnswer p {
    text-align: center;
    font-size: 14px;
    color: #666;
    line-height: 20px;
}

.right .item .content img {
    cursor: pointer;
}

div.imgZoomBg {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 60;
}

div.imgZoomContent {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 65;
    text-align: center;
    transition: all 1s;
}

div.zoom img.target {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 63;
    transition: all 1s;
    max-width: 800px;
    max-height: 600px;
}

div.imgZoomContent img.close {
    position: absolute;
    left: 100%;
    top: 0;
    z-index: 13;
    margin-left: -15px;
    margin-top: -15px;
    cursor: pointer;
}

div.imgZoomContent .control {
    height: 40px;
    position: absolute;
    bottom: -54px;
    left: 50%;
    width: 380px;
    margin-left: -190px;
    text-align: center;
}

div.imgZoomContent .control .rotateLeft {
    cursor: pointer;
    width: 140px;
    height: 40px;
    background: url(./asset/images/xz_bg.png) center no-repeat;
    float: left;
    line-height: 40px;
}

div.imgZoomContent .control .rotateLeft img {
    vertical-align: middle;
    margin-right: 8px;
}

div.imgZoomContent .control .rotateRight {
    vertical-align: middle;
    line-height: 40px;
    float: right;
    cursor: pointer;
    width: 140px;
    height: 40px;
    background: url(./asset/images/xz_bg.png) center no-repeat;
}

div.imgZoomContent .control .rotateRight img {
    vertical-align: middle;
    margin-right: 8px;
}

div.zoom {
    display: none;
}

.item .edit .inputContent.active {
    display: block;
}

.item .edit .timeoutTip {
    font-size: 16px;
    color: #999;
}

.item .edit .assess {
    font-size: 16px;
}

.right .item .edit .handleAnswer a.other {
    height: 34px;
    line-height: 34px;
}

.right .item .edit .assessDetail {
    display: inline-block;
}

.right .item .edit .assessDetail:after {
    display: block;
    content: '';
    clear: both;
}

.right .item .edit .assessDetail a {
    width: 138px;
    height: 38px;
    border: 1px solid #ef5c20;
    line-height: 38px;
    text-align: center;
    color: #ef5c20;
    border-radius: 5px;
    font-size: 14px;
    float: left;
    margin-right: 30px;
    box-sizing: content-box;
}

.right .item .edit .assessDetail a.ok {
    border: 1px solid #4285f5;
    color: #4285f5;
}

.right .item .edit .assessDetail a.sht {
    border: 1px solid #f17700;
    color: #f17700;
}

.right .item .edit .assessDetail a.selected {
    background: #ffece4;
    border: none;
    height: 40px;
    line-height: 40px;
    width: 140px;
}

.right .item .edit .assessDetail a.ok.selected {
    background: #e5efff;
    height: 40px;
    line-height: 40px;
}

.right .item .edit .assessDetail a.sht.selected {
    background: #fff1e3;
    height: 40px;
    line-height: 40px;
}

.right .item .edit .hidden {
    display: none;
}

.dialog {
    display: none;
}

.right .item .editAnswer {
    position: relative;
}

.right .item .editAnswer textarea {
    /*width: 654px;*/
    width: 995px;
    height: 60px;
    margin-top: 25px;
    margin-bottom: 30px;
    padding: 10px 20px;
    border: 2px solid #eee;
    resize: none;
    font-size: 14px;
}

.right .item .editAnswer .fontNum {
    display: inline-block;
    font-size: 14px;
    color: #999;
    position: absolute;
    right: 13px;
    bottom: 104px;
    padding-top: 0px !important;
    border-top: none !important;
}

.right .item .editAnswer .form div {
    padding-top: 30px;
    border-top: 1px dashed #999;
}

.right .item .editAnswer .form:after {
    content: '';
    display: block;
    clear: both;
}

.right .item .editAnswer .form input {
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

.right .item .editAnswer .form input.cel {
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

em {
    font-style: normal;
    font-weight: normal;
}

.right .item .handleAnswer .noAnswerTip {
    margin: 0;
    font-size: 16px;
    color: #333;
    line-height: 20px;
}

//评价
.right .item .edit .evaluate-box2 {
    padding-top: 10px;
    a.cool {
        border: 1px solid #ef5c20;
        color: #ef5c20;
    }
    a.ok {
        border: 1px solid #4285f5;
        color: #4285f5;
    }
    a.bad {
        color: #999;
        border: 1px solid #999;
    }
    .cool:hover {
        background: #ffece4;
        border: none;
        width: 132px;
        height: 34px;
        line-height: 34px;
    }
    .ok:hover {
        border: none;
        background: #e5efff;
        width: 132px;
        height: 34px;
        line-height: 34px;
    }
    .bad:hover {
        border: none;
        background: #efefef;
        width: 132px;
        height: 34px;
        line-height: 34px;
    }
}
.evaluate-box {
    height: 145px;
    border: 1px solid #ccc;
    position: relative;
    top: -1px;
    text-align: center;
    &.active {
        display: block;
    }
    p {
        margin: 28px 23px;
    }
    a {
        font-size: 14px;
        float: left;
        border-radius: 3px;
        width: 150px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        margin-left: 23px;
        margin-right: 7px;
        box-sizing: content-box;
        img {
            height: 16px;
            width: auto;
        }
    }
    a.cool {
        border: 1px solid #ef5c20;
        color: #ef5c20;
    }
    a.ok {
        border: 1px solid #4285f5;
        color: #4285f5;
    }
    a.bad {
        color: #999;
        border: 1px solid #999;
    }
    .cool:hover {
        background: #ffece4;
        border: none;
        width: 152px;
        height: 40px;
        line-height: 40px;
    }
    .ok:hover {
        border: none;
        background: #e5efff;
        width: 152px;
        height: 40px;
        line-height: 40px;
    }
    .bad:hover {
        border: none;
        background: #efefef;
        width: 152px;
        height: 40px;
        line-height: 40px;
    }
}

.angrys {
    height: 145px;
    border: 1px solid #ccc;
    position: relative;
    top: 15px;
    text-align: center;
    &.active {
        display: block;
    }
    p {
        margin: 30px 20px;
        font-size: 14px;
    }
    a {
        width: 138px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        border-radius: 5px;
        font-size: 14px;
        float: left;
        margin: 0 7px 0 23px;
        box-sizing: content-box;
        img {
            margin-right: 6px;
        }
    }
    a.angry1 {
        color: #ef5c20;
        border: 1px solid #ef5c20;
    }
    a.angry2 {
        color: #4285f5;
        border: 1px solid #4285f5;
    }
    a.angry3 {
        color: #f17700;
        border: 1px solid #f17700;
    }
    a.angry4 {
        color: #999;
        border: 1px solid #999;
    }
    .angry1:hover {
        background: #ffece4;
        border: none;
        width: 140px;
        height: 40px;
        line-height: 40px;
    }
    .angry2:hover {
        background: #e5efff;
        border: none;
        width: 140px;
        height: 40px;
        line-height: 40px;
    }
    .angry3:hover {
        background: #fff1e3;
        border: none;
        width: 140px;
        height: 40px;
        line-height: 40px;
    }
    .angry4:hover {
        background: #efefef;
        border: none;
        width: 140px;
        height: 40px;
        line-height: 40px;
    }
}

.requestion {
    margin-left: 40px;
    a {
        color: #ff0000;
    }
}
</style>
