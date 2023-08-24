<template>
    <div class="hot-courses" v-if="courseList.length">
        <div class="header">
            <div class="header-title">
                <img class="icon-title" src="./asset/images/hot-title.png" />
            </div>
            <div class="header-more" @click="goToMore">
                <span>更多</span>
                <img src="./asset/images/arrow.png" alt="" />
            </div>
        </div>
        <div class="courses">
            <a class="courses-item" v-for="(course, index) in courseList" :key="index" :href="`/trial-course/detail/${course.goodsId}`" target="_blank">
                <image-view class="courses-pic" :src="$urlUtils.getViewUrl(course.coursePicPath)" />
                <div class="courses-info">
                    <p class="main">{{ course.goodsName }}</p>
                    <p class="num">共{{ course.coursewareCount || 0 }}节</p>
                </div>
            </a>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import '@/api/mcp/api..query-project-hot-trial-list'; // 项目下热推好课
import '@/api/mcp/api..query-index-trial-list.js'; // 固定首页10个体验课列表
import '@/api/ctc/api..query-project-detail'; // 查询项目详情
export default {
    name: 'hot-courses-list',
    props: {
        //不传查询所有项目
        projectId: {
            type: String,
            default: '',
        },
        //没有传递项目时，查询匹配的10个项目，否则不进行查询
        searchAll: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            courseList: [],
            projectIds: '',
        };
    },
    fetch() {
        return this.getRecommendProjectList().then((res) => {
            this.projectIds = res.map((project) => project.projectId).join(',');
            return this.getCourseList();
        });
    },
    watch: {
        projectId(val, oldVal) {
            if (val !== oldVal) {
                this.getCourseList();
            }
        },
    },
    methods: {
        ...mapActions('common/recommend-project', {
            getRecommendProjectList: 'getProjectList',
        }),
        //获取体验课列表
        getCourseList() {
            if (this.projectId) {
                return this.getHotTrialList();
            } else {
                return this.searchAll && this.getIndexTrialList();
            }
        },
        //固定首页10个体验课列表
        getIndexTrialList() {
            this.courseList = [];
            return new Promise((resolve) => {
                this.$callApi('mcp/query-index-trial-list', {
                    projectIds: this.projectIds,
                    findCount: 5,
                    showClient: 'W',
                    onsuccess: (data) => {
                        data = data || [];
                        this.courseList = data.filter((course, index) => index <= 4);
                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            });
        },
        //项目下热推好课
        getHotTrialList() {
            this.courseList = [];
            return new Promise((resolve) => {
                this.$callApi('mcp/query-project-hot-trial-list', {
                    projectId: this.projectId,
                    findCount: 5,
                    showClient: 'W',
                    onsuccess: (data) => {
                        data = data || [];
                        this.courseList = data.filter((course, index) => index <= 4);
                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            });
        },
        //跳转到体验课列表
        goToMore() {
            let url = '/trial-course';
            if (this.projectId) {
                url += ``;
                this.$callApi('ctc/query-project-detail', {
                    projectId: this.projectId,
                    onsuccess: (data) => {
                        url += `/all/${data.projectSeoCode || 'all'}`;
                        this.$PageUtil.openNewPage(url);
                    },
                    onerror: () => {},
                    oncomplete: () => {},
                });
            } else {
                this.$PageUtil.openNewPage(url);
            }
        },
        //跳转到体验课详情页面
        goToExperienceList(course) {
            this.$PageUtil.openNewPage(`/trial-course/detail/${course.goodsId}`);
        },
    },
};
</script>
<style lang="less" scoped>
.hot-courses {
    position: relative;
    width: 324px;
    background: #ffffff;
    border-radius: 8px;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        padding: 0 21px;
    }
    .header-title {
        display: flex;
        align-items: center;
        .icon-title {
            width: 78px;
            height: 19px;
        }
    }
    .header-more {
        cursor: pointer;
        font-size: 12px;
        color: #99a1af;
        img {
            width: 10px;
            height: 10px;
        }
        &:hover {
            opacity: 0.7;
        }
    }
    .courses {
        box-sizing: border-box;
        padding: 10px 16px;
        display: flex;
        flex-direction: column;
        .courses-item {
            display: flex;
            padding: 10px 0;
            cursor: pointer;

            .courses-pic {
                flex-shrink: 0;
                width: 128px;
                height: 80px;
                border-radius: 5px;
                overflow: hidden;
            }
            .courses-info {
                margin-left: 12px;
                height: 80px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .courses-info .main {
                font-size: 14px;
                text-align: left;
                color: #3a3d4b;
                max-width: 152px;
                max-height: 40px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .courses-info .num {
                font-size: 12px;
                text-align: left;
                color: #99a1af;
            }
            &:hover {
                .main {
                    color: #ff2e30;
                }
            }
        }
    }
}
</style>
