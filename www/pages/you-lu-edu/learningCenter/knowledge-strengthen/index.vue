<template>
    <div class="container">
        <template v-if="!isLoading && currentProject">
            <yl-breadcumb :items="crumbs" class="breadcrumb"></yl-breadcumb>
            <div class="test-analysis">
                <img class="title-img" src="./asset/images/title-img.png" alt="" />
                <div class="title">
                    <img src="./asset/images/title.png" alt="" />
                    <span class="title-desc">哪里不会学哪里</span>
                </div>
                <span class="cut-subject" @mouseenter="isShowProjectList = !isShowProjectList" @mouseleave="isShowProjectList = false">
                    {{ currentProject.projectName }}
                    <transition name="fade">
                        <div class="project-select-wrapper" v-show="isShowProjectList">
                            <ul>
                                <li
                                    :class="item.projectId === currentProject.projectId ? 'active' : ''"
                                    v-for="(item, index) in dataProject"
                                    :key="index"
                                    @click="handleProject(item)"
                                >
                                    {{ item.projectName }}
                                </li>
                            </ul>
                        </div>
                    </transition>
                </span>
            </div>
            <!--.projectId-->
            <seconds-understand :current-project="currentProject"></seconds-understand>
        </template>

        <div class="empty-tip" v-if="!isLoading && !currentProject">
            <img src="./asset/images/empt-tip.png" alt="" />
            <div>暂无权限查看，去课程中心看看吧</div>
        </div>
        <div class="open-list-load" v-if="isLoading"><loading class="loading"></loading></div>
    </div>
</template>

<script>
import '@/api/cc/api..study-tool-project-list.js';
import SecondsUnderstand from '@/www/components/learningCenter/knowledge-strengthen/seconds-understand-list';
import Loading from '~/plugins/loading';
export default {
    name: 'index',
    components: {
        SecondsUnderstand,
        Loading,
    },
    layout: 'new-default',
    data() {
        return {
            crumbs: [
                {
                    name: '学习中心',
                    href: '/learningCenter/index/myCourse',
                },
                {
                    name: '考点秒懂',
                    href: '#',
                },
            ],
            dataProject: [],
            currentProject: null,
            isShowProjectList: false,
            isLoading: true,
        };
    },
    mounted() {
        this.getProjectList();
    },
    methods: {
        getProjectList() {
            //用户班级学习工具所属项目列表cc/user/study-tool/project/list
            this.$callApi('cc/study-tool-project-list', {
                studyTool: 'examSite',
                onsuccess: (result) => {
                    console.log(result);
                    if (result.length > 0) {
                        this.dataProject = result;
                        result.forEach((item) => {
                            if (item.projectId === this.$route.query.projectId) {
                                this.currentProject = item;
                            }
                        });
                        if (!this.currentProject) {
                            this.currentProject = result[0];
                        }
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.isLoading = false;
                },
            });
        },
        handleProject(val) {
            this.currentProject = val;
        },
    },
};
</script>

<style scoped lang="less">
.container {
    width: 1200px;
    margin: 0 auto;
}
.breadcrumb {
    margin-top: 3px;
    margin-bottom: 23px;
}
.test-analysis {
    height: 62px;
    border-radius: 6px;
    margin: 0 auto;
    background: url('./asset/images/title-bg.png') no-repeat;
    background-size: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 40px;
    padding-right: 33px;
    .title-img {
        width: 62px;
        height: 44px;
        margin-right: 15px;
    }
    .title {
        width: 88px;
        flex: 1;
        img {
            width: 78px;
            height: 19px;
            margin-right: 15px;
        }
        .title-desc {
            font-size: 12px;
            color: #8898b6;
            display: inherit;
        }
    }
    .cut-subject {
        font-size: 16px;
        color: #3a3d4b;
        padding-right: 12px;
        height: 32px;
        line-height: 32px;
        background: rgba(255, 255, 255, 0.5) url('./asset/images/cut.png') no-repeat;
        background-size: 20px 20px;
        background-position: 6px;
        border: 0.5px solid #ced5e2;
        border-radius: 16.5px;
        backdrop-filter: blur(6px);
        padding-left: 34px;
        box-sizing: border-box;
        cursor: pointer;
        position: relative;
        z-index: 8;
        .project-select-wrapper {
            width: 840px;
            height: 199px;
            background: #ffffff;
            border-radius: 6px;
            box-shadow: 0px 6px 16px 0px rgba(233, 233, 233, 0.5);
            position: absolute;
            top: 42px;
            right: 33px;
            padding: 15px;
            z-index: 99;
            transition: all 0.3s;
            ul {
                li {
                    font-size: 14px;
                    color: #3a3d4b;
                    padding: 4px 15px;
                    display: inline-block;
                    line-height: normal;
                    &:hover {
                        color: #ff2e30;
                        border-radius: 13px;
                        cursor: pointer;
                    }
                }
                .active {
                    color: #ff2e30;
                    background-color: #ffece8;
                    border-radius: 13px;
                }
            }
            &:after {
                content: ' ';
                width: 0px;
                height: 0px;
                border-width: 5px;
                border-style: solid;
                border-color: transparent transparent white transparent;
                position: absolute;
                top: -10px;
                right: 15px;
            }
        }
    }
}
.empty-tip {
    padding-top: 162px;
    padding-bottom: 162px;
    text-align: center;
    img {
        width: 260px;
        height: 180px;
        margin: 0 auto 16px;
    }
    div {
        font-size: 14px;
        color: #3a3d4b;
    }
}

.open-list-load {
    margin-top: 24px;
    margin-bottom: 30px;
    min-height: 400px;
    position: relative;
}
.loading {
    background: none !important;
}
.loading /deep/.circular {
    stroke: #ff0705;
    fill: transparent;
}
</style>
