<template>
    <div class="right">
        <div v-show="questionList.length > 0">
            <div class="item" v-for="(item, index) in questionList" :key="index">
                <div class="ques">
                    <h5>
                        <span>科目：{{ item.subjectName }}</span>
                        <span>问题类型：{{ item.questionTypeName }}</span>
                        <span class="mgr0">提问时间：{{ item.questionCreatedDate }}</span>

                        <span class="fr waitToResolve" v-if="item.questionStatus == 'AW'">
                            <img src="./asset/images/an2.png" />
                            等待解答
                        </span>
                        <span class="fr waitToResolve" v-if="item.questionStatus == 'AG'">
                            <img src="./asset/images/an2.png" />
                            等待解答
                        </span>
                        <span class="fr waitToResolve" v-if="item.questionStatus == 'F'">
                            <img src="./asset/images/an2.png" />
                            等待解答
                        </span>
                        <span class="fr waitToResolve" v-if="item.questionStatus == 'D'">
                            <img src="./asset/images/an2.png" />
                            等待解答
                        </span>
                        <span class="fr resolved" v-else-if="item.questionStatus == 'QC'">
                            <img src="./asset/images/an6.png" />
                            问题已关闭
                        </span>
                        <span class="fr resolved" v-else-if="item.questionStatus == 'AD'">
                            <img src="./asset/images/an1.png" />
                            已解答
                        </span>
                    </h5>
                    <div class="content">
                        <a class="hasColor contentText lineheight" @click="showDetail(item.questionId)">
                            <span>
                                {{ item.questionContent }}
                                <div v-if="(item.questionStatus == 'AD' || item.questionStatus == 'QC') && item.isDissatisfaction != 'Y'" class="ans_button">
                                    查看答案
                                </div>
                            </span>
                        </a>
                        <LookQuestion
                            v-if="item.questionSourceType === 'Q'"
                            :key="item.questionId"
                            :question-id="item.questionId"
                            :is-list="true"
                        ></LookQuestion>
                    </div>
                    <div class="noansw" v-show="item.isDissatisfaction == 'Y'">
                        <div class="tip">
                            <p class="flex ai-center pointer">
                                <img src="./asset/images/ell.png" alt />
                                已分配老师重新解答
                            </p>
                            <div class="tipDetail">
                                <img src="./asset/images/topArrow.png" />
                                您的投诉已受理，已为你生成新的问题，重新分配老师解答。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="noContent" v-if="questionList.length == 0" v-cloak>
            <img src="./asset/images/nocon.png" width="227" alt="暂无数据" height="215" />
            <p>您还没有提交问题哦！</p>
            <a @click="handleAsk">提交问题</a>
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
import '@/api/cc/api.QA3003.project-teacher.js';
import LookQuestion from '../look-question';
export default {
    components: {
        LookQuestion,
    },
    props: {
        curProject: {
            type: Object,
            default: () => {
                return {};
            },
        },
        questionList: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            classSourceprojectid: '',
            CatalogId: '',
            lookQuestion: false,
        };
    },
    watch: {
        questionList(nv, ov) {
            if (nv.length) {
                this.$nextTick(() => {
                    $('.noansw .tip').hover(
                        function () {
                            $(this).addClass('active');
                        },
                        function () {
                            $(this).removeClass('active');
                        }
                    );
                });
            }
        },
    },
    mounted() {
        $('.noansw .tip').hover(
            function () {
                $(this).addClass('active');
            },
            function () {
                $(this).removeClass('active');
            }
        );
    },
    methods: {
        handleAsk() {
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
            this.$callApi('cc/project-teacher', {
                projectId: this.curProject.ProjectId,
                onsuccess: (res) => {
                    console.log('88888');
                    this.$emit('update:currentTabComponent', 'addQuestion');
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        showDetail(QuestionID) {
            console.log(QuestionID);
            /// 显示问题详情
            this.$emit('update:questionId', QuestionID);
            this.$emit('update:currentTabComponent', 'myQuestionDetail');
        },
    },
};
</script>
<style scoped lang="less">
h5 {
    border: 0;
    font-weight: normal;
}
.right {
    word-break: break-all;
    float: right;
    /*width: 760px;*/
    width: 100%;
    position: relative;
    color: #333;
    font-size: 14px;
}

.right [v-cloak] {
    display: none !important;
}

.right a {
    cursor: pointer;
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
    width: 3px;
    height: 20px;
    background: #f8323c;
    left: 0;
    top: 35px;
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

.right .item h5.bottom0 {
    border-bottom: 0px;
    padding-bottom: 0px;
    height: 16px;
    line-height: 16px;
}

.right .item h5.bottom0:before {
    content: '';
    float: left;
    width: 24px;
    height: 25px;
    background: url(./asset/images/da.png) no-repeat;
    margin-right: 7px;
}

.right .item h5.bottom0 span {
    line-height: 24px;
}

.right .item h5:after {
    content: '';
    display: block;
    clear: both;
}

.right .item h5 span {
    margin-right: 50px;
    vertical-align: middle;
    line-height: 14px;
}

.right .item h5 span.mgr0 {
    margin-right: 0px;
}

.right .item h5 span.fl {
    float: left;
    margin: 0;
}

.right .item h5 span.fr {
    float: right;
    margin: 0;
}

.right .item h5 span.time {
    font-size: 14px;
    margin-right: 10px;
}

.right p {
    font-size: 14px;
    margin-bottom: 20px;
}

.right .item .content {
    margin-top: 10px;
    word-wrap: break-word;
    word-break: normal;
}
.ans_button {
    text-align: center;
    border-radius: 16px;
    display: inline-block;
    background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
    color: #fff;
    font-size: 14px;
    width: 88px;
    height: 28px;
    line-height: 28px;
    margin-left: 5px;
}
.contentText {
    word-break: break-all;
}
.lineheight {
    height: 33px;
}
.right .item .content a.contentText.hasColor {
    color: rgba(51, 51, 51, 1);
    font-size: 16px;
    padding-left: 0;
}

.right .item .content a.contentText.hasColor span {
    float: left;
    /*width: 665px;*/
    width: 995px;
    font-size: 16px;
    line-height: 20px;
    color: #333;
}

.right .item .content a.contentText.hasColor:before {
    content: '';
    width: 24px;
    height: 25px;
    background: url(./asset/images/wen.png) no-repeat;
    float: left;
    margin-right: 7px;
}

.right .item .content a.contentText.hasColor:after {
    content: '';
    display: block;
    clear: both;
}

.right .item img {
    width: 174px;
    height: 100px;
    border-radius: 10px;
    margin-right: 20px;
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

.right .item p {
    margin-bottom: 20px;
}

.right .item .content a.contentText {
    margin-top: 15px;
    /*display: block;
     margin-bottom:20px; */
    line-height: 20px;
    color: #333;
    font-size: 16px;
    padding-left: 31px;
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

.right .item i {
    float: right;
    font-size: 12px;
    color: #999;
    font-style: normal;
}

.right .item > img {
    width: 174px;
    height: 100px;
    border-radius: 10px;
    margin-right: 20px;
}

.right .item .edit {
    border-top: 1px dashed #999;
    margin-top: 30px;
    padding-top: 30px;
    position: relative;
}

.right .item .edit > a {
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
}

.right .item .edit a img {
    width: 16px;
    height: 16px;
    vertical-align: sub;
    margin-right: 8px;
    border-radius: 0px;
}

.right .item .edit a.other {
    border: none;
    float: right;
    margin: 0;
    font-size: 14px;
    color: #666;
    width: auto;
}

.right .item .edit a.active {
    height: 40px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-color: #fff;
}

.right .item .edit div.inputContent {
    height: 185px;
    border: 1px solid #ccc;
    position: relative;
    top: -1px;
    text-align: center;
}

.right .item .edit div.inputContent textarea {
    width: 695px;
    height: 56px;
    margin-top: 30px;
    margin-bottom: 20px;
    padding: 10px 20px;
    border: 2px solid #eee;
    resize: none;
}

.right .item .edit div.inputContent a {
    height: 32px;
    width: 120px;
    background: url(./asset/images/submit_bg.png) center no-repeat;
    display: inline-block;
    line-height: 32px;
    color: #fff;
}

.right .item .edit div.inputContent span.fontNum {
    font-size: 14px;
    color: #999;
    position: absolute;
    right: 35px;
    bottom: 76px;
}

.right .item .ques h5 span.fr {
    color: #5fdb74;
    font-size: 14px;
}

.right .item .ques h5 span.fr.waitToResolve {
    color: #f55e61;
}

.right .item .ques h5 span.fr img {
    width: auto;
    height: 15px;
    border-radius: 0;
    margin-right: 5px;
    vertical-align: sub;
}

.right .item .ques .tip {
    border-top: 1px dashed #ddd;
    padding-top: 20px;
    margin-top: 30px;
    font-size: 14px;
    overflow: hidden;
    transition: all 0.5s;
    height: 25px;
}

.right .item .ques .tip.active {
    height: 90px;
}

.right .item .ques .tip p img {
    width: 16px;
    height: 16px;
    margin-left: 20px;
    vertical-align: sub;
    margin-right: 5px;
}

.right .item .ques .tip .tipDetail {
    position: relative;
    background: #f5f5f5;
    height: 54px;
    line-height: 54px;
    padding-left: 44px;
    font-size: 14px;
    transition: all 1s;
}

.right .item .ques .tip .tipDetail img {
    position: absolute;
    left: 15px;
    top: -12px;
    width: 25px;
    height: 14px;
}

.right .item .answ {
    margin-top: 45px;
}

// .right .item .answ h5 span.fr.newAnswer {
//     width: 94px;
//     height: 20px;
//     line-height: 21px;
//     font-size: 14px;
//     color: #333;
//     background: url(./asset/images/an7.png) left center no-repeat;
//     text-align: center;
// }

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
    z-index: 15;
}

div.imgZoomContent {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 30;
    text-align: center;
    transition: all 1s;
}

div.zoom img.target {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
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

.right .noContent {
    height: 315px;
    background: #fff;
    text-align: center;
    padding: 100px 25px 200px;
    margin-bottom: 10px;
    box-sizing: content-box;
}

.right .noContent img {
    width: 260px;
    height: 180px;
}
.right .noContent p {
    font-size: 14px;
    color: #3a3d4b;
    line-height: 30px;
    padding: 16px 0 40px;
    text-align: center;
    margin-bottom: 0;
}

.right .noContent a {
    display: inline-block;
    line-height: 38px;
    color: #fff;
    font-size: 14px;
    width: 136px;
    height: 38px;
    background: linear-gradient(90deg, #ff6870, #f8323c);
    border-radius: 29px;
    text-align: center;
}

.noansw .tip {
    border-top: 1px dashed #ddd;
    padding-top: 20px;
    margin-top: 30px;
    font-size: 14px;
    overflow: hidden;
    transition: all 0.5s;
    height: 25px;
}

.noansw .tip.active {
    height: 90px;
}

.noansw .tip p img {
    width: 16px;
    height: 16px;
    margin-left: 20px;
    vertical-align: sub;
    margin-right: 8px;
}

.noansw .tip .tipDetail {
    position: relative;
    background: #f5f5f5;
    height: 54px;
    line-height: 54px;
    padding-left: 44px;
    font-size: 14px;
    transition: all 1s;
}

.noansw .tipDetail img {
    position: absolute;
    left: 15px;
    top: -12px;
    width: 25px;
    height: 14px;
}
</style>
