<template>
    <div class="main-bg">
        <div class="flex jc-between margin-auto" v-if="!noClass">
            <div class="questions-box flex">
                <div class="answerQuestion">
                    <div class="top" v-show="showTop">
                        <a class="my" href="javascript:void(0)" @click="currentTabComponent = 'myQuestionList'">我的问题</a>
                        <!-- <a class="frequently" @click="currentTabComponent='updateQuestion'">更新问题</a> -->
                        <div class="put-question-box">
                            <a class="ask" href="javascript:void(0)" @click="handleAsk" v-if="currentTabComponent == 'myQuestionList'">
                                <img src="./asset/images/wenti-2.png" />
                                提问
                            </a>
                            <div class="curproject-box" v-if="curProject && currentTabComponent == 'myQuestionList'">
                                <div class="curproject" @click="showProjectTip = !showProjectTip">
                                    {{ curProject.CatalogName }}
                                </div>
                                <div class="list" v-show="showProjectTip">
                                    <div class="tit">选择您要查看的项目</div>
                                    <ul>
                                        <li
                                            v-for="item in userQuestionProject"
                                            :key="item.CatalogId"
                                            :class="curProject.ProjectId == item.ProjectId ? 'cur' : ''"
                                            @click="switchCatalog(item)"
                                        >
                                            {{ item.CatalogName }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!--<a class="ask" href="javascript:void(0)" @click="currentTabComponent='myQuestionList'" v-if="currentTabComponent=='addQuestion'">
                            返回>>
                        </a>-->
                    </div>
                    <div>
                        <component
                            :is="currentTabComponent"
                            :current-tab-component.sync="currentTabComponent"
                            :question-id.sync="QuestionID"
                            :show-top.sync="showTop"
                            :cur-project.sync="curProject"
                            :question-list.sync="questionList"
                            @loadData="loadData"
                        ></component>
                    </div>
                </div>
            </div>
        </div>
        <div class="item noAnswer white" v-if="noClass">
            <img src="./asset/images/nocon.png" alt />
            <p>未报班，无答疑权限</p>
            <span @click="toClass" class="btn flex ai-center jc-center">
                去报班
                <!--<img src="./asset/images/mycourse-1.png" alt />-->
            </span>
        </div>

        <div class="pagination">
            <Pagination
                v-if="currentTabComponent == 'myQuestionList'"
                :total="page.pageCount"
                :page-size.sync="page.pageSize"
                :current-page.sync="page.pageIndex"
                @current-change="loadData"
            ></Pagination>
        </div>
    </div>
</template>
<script>
import myQuestionList from './components/question-list';
import myQuestionDetail from './components/question-detail';
import updateQuestion from './components/modify-question';
import addQuestion from './components/add-question';
import '@/api/cc/api.QA3003.project-teacher.js';
import '@/api/cc/api.QA0001.question-my-list.js';
import '@/api/cc/api.SS3017.studentclass-queryuserprojects.js';
import Pagination from '@/www/components/components/pagination';

export default {
    components: {
        myQuestionList,
        myQuestionDetail,
        updateQuestion,
        addQuestion,
        Pagination,
    },
    data() {
        return {
            questionList: [],
            currentTabComponent: 'myQuestionList',
            QuestionID: '',
            showTop: true,
            userQuestionProject: [],
            curProject: {},
            showProjectTip: false,
            noClass: false,
            projectkey: '',
            PageSize: 10,
            PageIndex: 1,
            page: {
                pageIndex: 0,
                pageSize: 10,
                pageCount: 0,
                pages: 0,
            },
        };
    },
    head() {
        return this.$head({
            title: '学习答疑_用学习创造美好人生_优路教育',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: '',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '',
                },
            ],
        });
    },
    watch: {
        curProject: {
            deep: true,
            immediate: true,
            handler(val) {
                if (val && val.ProjectId) {
                    console.log(val.ProjectId, '答疑projectSourceid');
                    this.loadData();
                }
            },
        },
    },
    created() {
        /*TitleUtil.setTitle('学习答疑-学习中心-优路教育');*/
    },
    mounted() {
        //根据项目id获取该项目信息
        //this.getProjectInfo();
        //获取学员已购班级项目对应的答疑项目
        // this.GetUserQuestionProject();
        let questionId = this.$urlUtils.getUrlParam('questionId');
        this.getUserQuestionProject(1);
        if (questionId) {
            this.QuestionID = questionId;
            this.currentTabComponent = 'myQuestionDetail';
            return;
        }
        this.currentTabComponent = 'myQuestionList';
    },
    destroyed() {
        if (this.curProject && this.curProject.ProjectId) {
            this.$storage.set(this.projectkey, this.curProject);
        }
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
                    this.currentTabComponent = 'addQuestion';
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        loadData(v) {
            if (v == true) {
                this.page.pageIndex = 0;
            }
            this.$callApi('cc/question-my-list', {
                projectId: this.curProject.ProjectId,
                pageSize: this.page.pageSize, //第一个参数是取几条
                pageIndex: this.$PageUtil.getStartIndex(this.page), //从第几个取其
                onsuccess: (res) => {
                    this.questionList = res.data;
                    this.page.pageCount = res.count;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        getUserQuestionProject(v) {
            // this.userQuestionProject = data;
            this.$callApi('cc/studentclass-queryuserprojects', {
                onsuccess: async (res) => {
                    //获取当前项目
                    let data = res.data;
                    data.forEach((item, index) => {
                        item.ProjectId = item.projectId;
                        item.CatalogName = item.projectName;
                        item.CatalogId = index;
                    });
                    console.log(data, '---data');
                    this.userQuestionProject = data;

                    this.userQuestionProject.length ? (this.noClass = false) : (this.noClass = true);
                    let userInfo = await ylPlugin.login.getUser();
                    this.projectkey = userInfo.userId + '.curProject';
                    if (this.$route.query.projectId) {
                        this.$storage.set(this.projectkey, { ProjectId: this.$route.query.projectId });
                    }

                    if (this.$storage.get(this.projectkey)) {
                        let storageProject = this.$storage.get(this.projectkey);
                        let hasProject = this.userQuestionProject.some((item) => {
                            return item.ProjectId == storageProject.ProjectId;
                        });
                        if (hasProject) {
                            this.userQuestionProject.forEach((item) => {
                                if (item.ProjectId == storageProject.ProjectId) {
                                    this.curProject = item;
                                    this.$storage.set(this.projectkey, this.curProject);
                                }
                            });
                        } else {
                            this.curProject = this.userQuestionProject[0];
                            this.$storage.set(this.projectkey, this.curProject);
                        }
                    } else {
                        this.curProject = this.userQuestionProject[0];
                        this.$storage.set(this.projectkey, this.curProject);
                    }
                    if (!v) {
                        this.currentTabComponent = 'myQuestionList';
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        switchCatalog(item) {
            this.showProjectTip = false;
            this.curProject = item;
            this.currentTabComponent = 'myQuestionList';
        },
        toClass() {
            this.$PageUtil.openNewPage(`/pro-course`);
        },
    },
};
</script>
<style scoped lang="less">
* {
    box-sizing: content-box;
}

.main-bg {
    background: #f5f5f5;
}

.answerQuestion {
    /*width: 760px;*/
    width: 100%;
}

.answerQuestion a {
    cursor: pointer;
}

.answerQuestion .top {
    text-align: center;
    font-size: 18px;
    color: #333;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    margin-bottom: 20px;
}
.answerQuestion .put-question-box {
    height: 40px;
    display: flex;
}

.answerQuestion .top a {
    font-size: 16px;
    color: #666;
    position: relative;
}

.answerQuestion .top a.my {
    font-size: 18px;
    font-weight: 700;
}
.answerQuestion .top a.my:before {
    content: '';
    width: 4px;
    height: 16px;
    background: #f8323c;
    display: inline-block;
    margin-right: 10px;
}

.answerQuestion .top a.frequently {
    margin-left: 90px;
}

.answerQuestion .top a.ask {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 88px;
    height: 40px;
    line-height: 1em;
    color: #fff;
    font-size: 14px;
    background: linear-gradient(90deg, #ff6870, #f8323c);
    border-radius: 8px;
}

.answerQuestion .top a.active:after {
    content: '';
    position: absolute;
    width: 40px;
    height: 4px;
    background: #eb0010;
    border-radius: 4px;
    left: 50%;
    margin-left: -20px;
    bottom: -3px;
}

.answerQuestion .top a.ask img {
    margin-right: 8px;
    vertical-align: middle;
    width: 16px;
}

.answerQuestion .top a.active {
    font-size: 18px;
    color: #333;
}

.answerQuestion .top .curproject-box {
    position: relative;
    z-index: 1;
    float: right;
    width: 167px;
    height: 60px;
    font-size: 14px;
    margin-left: 16px;

    .curproject {
        width: 140px;
        padding: 0px 10px 0 16px;
        box-shadow: 0px 6px 7px 0px rgba(51, 51, 51, 0.06);
        color: #666666;
        background: #ffffff url('./asset/images/dy-arrow-b.png') no-repeat 130px center;
        background-size: 30px 20px;
        text-align: left;
        height: 40px;
        line-height: 40px;
        border-radius: 8px;
        cursor: pointer;
    }

    .list {
        position: absolute;
        right: 0px;
        top: 41px;
        z-index: 2;
        background: #ffffff;
        min-width: 217px;
        text-align: left;
        box-shadow: 0px 3px 16px 0px rgba(157, 157, 157, 0.27);
        border-radius: 4px;
        overflow-y: auto;
        max-height: 600px;
        &:after {
            width: 0;
            height: 0;
            content: '';
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid #ffffff;
            position: absolute;
            top: -5px;
            right: 30px;
        }

        .tit {
            color: #333333;
            padding: 5px 0px 5px 26px;
            font-weight: bold;
        }
        ul {
            li {
                height: 48px;
                line-height: 48px;
                border-bottom: 1px solid #f2f2f2;
                padding-left: 26px;
                cursor: pointer;
                &.cur {
                    color: #ff4436;
                    background: #fff0ec url('./asset/images/dy-project-icon.png') no-repeat left center;
                }
                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }
}

.noAnswer {
    width: 100%;
    height: 775px;
    padding: 100px 0px;
    text-align: center;
}

.noAnswer img {
    width: 260px;
    height: 180px;
    margin-bottom: 0px;
}

.noAnswer p {
    text-align: center;
    font-size: 14px;
    color: #3a3d4b;
    margin-top: 16px;
    margin-bottom: 52px;
}

.noAnswer .btn {
    width: 136px;
    height: 38px;
    background: linear-gradient(90deg, #ff6870, #f8323c);
    border-radius: 29px;
    font-size: 14px;
    text-align: center;
    color: #ffffff;
    line-height: 38px;
    cursor: pointer;
    margin: 0 auto;
}

.questions-box {
    width: 1200px;
}

select[disabled='disabled'],
input[disabled='disabled'] {
    background: #eee !important;
}
.mnr_page {
    /deep/ .mnrIndex {
        a {
            &:nth-last-of-type(2) {
                width: 50px;
            }
        }
    }
}
</style>
