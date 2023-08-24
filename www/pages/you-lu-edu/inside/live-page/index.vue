<template>
    <div>
        <div>{{ courseInfo }}</div>
        <div class="top">
            <div class="kc">
                <img class="logo" src="./asset/images/logo-live.png" alt="" />
                本节主讲课程：
                <span id="spCourseName">{{ title }}---本地环境</span>
            </div>
            <div class="kr">
                <span @click="handleEva">
                    <img src="./asset/images/evaluate.png" alt="" />
                    评价
                </span>
            </div>
        </div>
        <comment-pop
            ref="CommentPop"
            v-show="cmtPop"
            @click="openCommentPop"
            @closeCmtPop="closeCmtPop"
            @submitComment="submitComment"
            :lable-type="labelType"
            :comment-info="commentInfo"
            :is-show-toast="cmtSuccess"
        ></comment-pop>
        <!-- http://live.vhall.com/webinar/inituser/497275873 -->
        <iframe :src="coursewareLivepath" allowfullscreen="true" frameborder="0" scrolling="auto" class="liveiframe"></iframe>
    </div>
</template>
<script>
import commentPop from '@/www/components/learningCenter/commentModel';

import '@/api/cc/api.OS4020.course-user-live-path.js';
import '@/api/cmt/api.CMT1103.cmt-comment-allow.js';
import '@/api/cc/api.CC1005.user-courseware-liveInfo.js';
import '@/api/cc/api.CMT1004.comment-exist.js';
import '@/api/cc/api.CC3041.courseware-live-status.js';
import '@/api/cc/api.OS4010.os-course-live-path.js';
import '@/api/cc/api.CMT1001.cmt-comment-add.js';
import '@/api/cc/api.CMT1002.cmt-comment-detail.js';

export default {
    name: 'livePage',
    components: {
        commentPop,
    },
    layout: 'nullLayout',
    data() {
        /*var url = this.$route.query.coursewareLivepath || '';
        var name = this.$route.query.name || '';
         var target = `${url}&name=${name}`;*/

        return {
            /*coursewareLivepath: target.replace('http:', this.$platform.getLocation().protocol),*/
            coursewareLivepath: '',
            title: this.$route.query.title,
            // 学习中心
            source: this.$route.query.source, //来自学习中心
            classId: this.$route.query.classId,
            coursewareId: this.$route.query.coursewareId,
            playrdMcc: this.$route.query.playrdMcc,
            scheduleId: this.$route.query.scheduleId,
            coursewareBeginstate: this.$route.query.coursewareBeginstate, //直播状态
            cmtPop: false,
            comment: false,
            commentInfo: {},
            courseInfo: {},
            lastOpenTime: 0,
            lastWatchTime: -1,
            cmtSuccess: false,
            labelType: 'LC',
        };
    },
    created() {
        this.init();
    },
    mounted() {},
    methods: {
        // 初始化方法
        init() {
            // 直播栏目，公开课直播处理逻辑
            if (this.$route.query.source !== 'learningCenter') {
                this.getAuth2SetIframeSrc();
            }
        },
        handleEva() {
            this.checkAllowCommentCmt();
        },
        osliveStatus() {
            this.$callApi('cc/os-course-live-path', {
                courseId: this.$route.query.courseId,
                coursewareId: this.$route.query.coursewareId,
                onsuccess: (res) => {
                    this.courseInfo = res;
                    this.coursewareBeginstate = res.coursewareStatus > 2 ? 'Y' : 'S';
                    // 20210714 yumingming需求，url传过来的地址重新赋值
                    this.coursewareLivepath = res.coursewareLivepath;
                    if (res.coursewareStatus == 1) this.comment = true;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        checkAllowCommentCmt() {
            //校验是否可评价
            this.$callApi('cc/cmt-comment-allow', {
                commentBizid: this.scheduleId ? this.scheduleId : this.coursewareId,
                commentBiztype: !this.playrdMcc ? 'PL' : 'SL',
                onsuccess: (res) => {
                    this.openCommentPop();
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        openCommentPop() {
            if (this.$route.query.catalogName && !this.comment && this.coursewareBeginstate != 'Y') {
                this.osliveStatus();
            }
            this.getCommentDetail();
        },
        //提交评价
        submitComment(data) {
            this.cmtPop = false;
            data.commentBizid = this.scheduleId ? this.scheduleId : this.coursewareId;
            data.commentBizname = this.playrdMcc
                ? `${this.playrdMcc}/${this.title}/${this.title}/${this.title}`
                : `${this.$route.query.courseName}/${this.$route.query.catalogName}/${this.title}`;
            data.projectId = this.courseInfo.projectId;
            data.subjectId = this.courseInfo.subjectId;
            data.commentBiztype = !this.playrdMcc ? 'PL' : 'SL';
            if (this.courseInfo.teacherUserid) data.serveruserId = this.courseInfo.teacherUserid;
            data.classId = this.classId;
            console.log('提交评价信息');
            console.log(data);
            this.$callApi('cc/cmt-comment-add', {
                ...data,
                onsuccess: () => {
                    this.cmtPop = true;
                    this.$refs.CommentPop.commentSuccess();
                    this.cmtSuccess = true;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //获取评价详情
        getCommentDetail() {
            //如果评价获取评价内容
            this.$callApi('cc/cmt-comment-detail', {
                commentBizid: this.scheduleId ? this.scheduleId : this.coursewareId,
                onsuccess: (res) => {
                    this.commentInfo = res;
                    this.cmtPop = true;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //关闭评价弹窗
        closeCmtPop() {
            this.cmtPop = false;
        },
        getAuth2SetIframeSrc() {
            this.$callApi('cc/course-user-live-path', {
                courseId: this.$route.query.courseId,
                coursewareId: this.$route.query.coursewareId,
                onsuccess: (res) => {
                    if (res && res.authStatus === 'Y') {
                        this.coursewareLivepath = res.coursewareLivepath;
                        /*this.type = 2; // 兼容旧有逻辑*/
                    } else {
                        this.$baseUI.alert(res.msg).then(() => {
                            this.$router.go(-1);
                        });
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
};
</script>
<style lang="less" scoped>
.top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 55px;
    z-index: 20;
    background: rgb(21, 39, 53);
    border-bottom: 2px solid #948787;
    width: 100%;
    display: flex;

    .kc {
        flex: 1;
        height: 50px;
        line-height: 50px;
        font-size: 25px;
        color: #fff;
        padding-left: 55px;
        font-family: '微软雅黑';
        margin-left: 5px;
    }

    .logo {
        vertical-align: middle;
        margin-right: 8px;
    }

    .kr {
        position: fixed;
        top: 0;
        right: 0;
        width: 500px;
        height: 50px;
        z-index: 99;
        text-align: right;
        vertical-align: middle;
        line-height: 55px;

        .user {
            font-size: 16px;
            line-height: 50px;
            color: #fff;
            font-family: '微软雅黑';
        }

        .MyBtn {
            float: right;
            padding: 7.5px 10px 7.5px 30px;
            cursor: pointer;
        }

        span {
            font-size: 16px;
            color: #fff;
            margin: 15px 38px 0;
            cursor: pointer;

            img {
                width: 22px;
                height: 24px;
                position: relative;
                top: 7px;
            }
        }
    }
}

.liveiframe {
    position: absolute;
    top: 55px;
    left: 0px;
    width: 100%;
    height: calc(100% - 55px);
    // width：calc(100% - 10px);
}

.min-tip {
    position: fixed;
    bottom: 60px;
    left: 40px;
    z-index: 99;
}
</style>
