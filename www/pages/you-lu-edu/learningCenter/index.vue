<template>
    <div class="learning-center">
        <div class="w1200 flex dh">
            <ul class="flex ai-center dh-list">
                <li :class="{ active: active == 'myCourse' }" @click="toPage('myCourse')">系统课</li>
                <li :class="{ active: active == 'myTrialCourse' }" @click="toPage('myTrialCourse')">体验课</li>
                <li :class="{ active: active == 'myFreeCourse' }" @click="toPage('myFreeCourse')">公开课</li>
                <span class="divider"></span>
                <li class="learning-timetable" :class="{ 'other-active active': active == 'learningTimetable' }" @click="toPage('learningTimetable')">
                    我的课表
                </li>
                <li class="answer-question" :class="{ 'other-active active': active == 'answerQuestion' }" @click="toPage('answerQuestion')">学习答疑</li>
            </ul>
            <template v-if="active === 'myTrialCourse' || active === 'myFreeCourse'">
                <small-program-wk class="smallProgram-wk"></small-program-wk>
            </template>
            <template v-else>
                <small-program v-if="showSmallProgram && getBindInfo" class="smallProgram" :is-bind="bind" :is-follow="attention" />
            </template>
        </div>
        <div class="lc-main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
/*import '@/api/cc/api.CC7004.query-mycourse-list'; //接口-我的班级列表*/
import '@/api/cc/api..user-studentclass-projectId-list.js'; //接口-我的班级列表
import smallProgram from '@/www/components/learningCenter/smallProgram/index.vue';
import smallProgramWk from '@/www/components/learningCenter/smallProgram-wk/index.vue';
import track from '@/www/components/course/free-course/js/track.js';
export default {
    name: 'index',
    components: { smallProgram, smallProgramWk },
    mixins: [track],
    layout: 'new-default',
    data() {
        return {
            tabData: {
                myCourse: '系统课',
                myTrialCourse: '体验课',
                myFreeCourse: '公开课',
                learningTimetable: '我的课表',
                answerQuestion: '学习答疑',
            },
            wechatprojectsList: [],
            showSmallProgram: false,
            getProjectIdOver: false,
            getClassOver: false,
            getBindInfo: false,
            isLoad: false,
            classList: [],
            active: 'myCourse',
            attention: '',
            bind: '',
            projectIds: [], //学员项目列表
        };
    },
    watch: {
        $route(to, from) {
            this.active = to.path.substr(to.path.lastIndexOf('/') + 1);
            this.switchingTabTrack();
        },
        getProjectIdOver(val) {
            if (val && this.getClassOver) {
                !this.isLoad && this.showSP();
            }
        },
        getClassOver(val) {
            if (val && this.getProjectIdOver) {
                !this.isLoad && this.showSP();
            }
        },
    },
    mounted() {
        this.getWechatprojectsList();
        this.getStudentclassProjectIdList();
        this.active = this.$route.path.substr(this.$route.path.lastIndexOf('/') + 1);
    },
    methods: {
        //学员班级页面-学员项目列表cc/user/studentclass/projectId/list"
        async getStudentclassProjectIdList() {
            let user = await this.$User.getUser();
            let userId = '';
            if (user?.userId) {
                userId = user.userId;
            }
            this.$callApi('cc/user-studentclass-projectId-list', {
                userId,
                onsuccess: (result) => {
                    this.projectIds = result.projectIds;
                    this.getClassOver = true;
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        showSP() {
            let flag = false;
            this.isLoad = true;
            for (let i = 0; i < this.wechatprojectsList.length; i++) {
                if (this.projectIds.indexOf(this.wechatprojectsList[i]) != -1) {
                    flag = true;
                    break;
                }
            }
            this.showSmallProgram = flag;
            flag && this.getStudentBindInfo();
        },
        async getStudentBindInfo() {
            let user = await this.$User.getUser();
            this.$callRawApi({
                api: 'ss/studentmanagement/byid/info',
                params: {
                    userId: (user || {}).userId,
                },
            })
                .then((_response) => {
                    let res = _response.getData();
                    console.log('返回的数据', res);

                    this.attention = res.data[0] ? res.data[0].attention : 'N';
                    this.bind = res.data[0] ? res.data[0].bind : 'N';
                    this.getBindInfo = true;
                })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                });
        },
        getWechatprojectsList() {
            //字典-查询用户小优督学项目引流配置
            this.$callRawApi({
                api: 'ss/dict/wechatprojects/list',
                params: {},
            })
                .then((_response) => {
                    let res = _response.getData();
                    console.log('返回的数据', res);

                    this.wechatprojectsList = JSON.parse(res.data);
                    this.getProjectIdOver = true;
                })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                });
        },
        //页面跳转
        toPage(page) {
            if (this.active == page) {
                return;
            }
            this.$router.push(`/learningCenter/index/${page}`);
        },
        //切换tab埋点
        switchingTabTrack() {
            this.trackWebYouluColumnSwitching({
                channe_name: this.tabData[this.active],
            });
        },
    },
};
</script>

<style lang="less" scoped>
.w1200 {
    width: 1200px;
}
.lc-main {
    width: 1200px;
}
.smallProgram,
.smallProgram-wk {
    position: absolute;
    right: 24px;
    top: -8px;
    bottom: 10px;
    width: 346px;
}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video,
input {
    box-sizing: border-box;
}

.learning-center {
    margin-bottom: 20px;

    .dh {
        height: 60px;
        background: #ffffff;
        /*box-shadow: 0px 3px 9px 1px rgba(39, 5, 5, 0.06);*/
        margin: 20px auto 16px auto;
        position: relative;
        .dh-list {
            li {
                width: 124px;
                /*padding: 0px 50px;*/
                text-align: center;
                font-size: 16px;
                color: #3a3d4b;
                cursor: pointer;
                /*height: 30px;
                line-height: 30px;*/
                /*border-right: 1px solid rgba(0, 0, 0, 0.06);*/
                position: relative;
                z-index: 1;

                &:last-child {
                    border-right: none;
                }

                &.active {
                    color: #333333;
                    font-weight: 700;
                }

                &.active:after {
                    position: absolute;
                    display: inline-block;
                    bottom: -19px;
                    left: 50%;
                    margin-left: -17px;
                    content: '';
                    z-index: 10;
                    width: 34px;
                    height: 3px;
                    background: #e73928;
                    border-radius: 2px;
                }

                &.learning-timetable,
                &.answer-question {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 112px;
                    height: 42px;
                    font-size: 16px;
                    border-radius: 21px;
                    line-height: 1em;
                    &:after {
                        display: none;
                    }
                }
                &.other-active {
                    background: #ffeaea;
                    color: #ff2e30;
                }
            }
            .divider {
                margin-left: 40px;
                background-color: rgba(0, 0, 0, 0.1);
                /*border-right: 1px solid rgba(0, 0, 0, 0.1);*/
                margin-right: 40px;
                width: 1px;
                height: 21px;
                display: inline-block;
            }
        }
    }

    .lc-main {
        min-height: 500px;
        margin: 0 auto;
    }
}
</style>
