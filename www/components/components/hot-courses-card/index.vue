<template>
    <div class="hot-section" v-if="courseList.length">
        <div class="hot-header">
            <p class="hot-title">热推好课</p>
            <div class="hot-more" @click="goToMore">
                <span>更多好课</span>
            </div>
        </div>
        <div class="content-list">
            <template v-for="item in courseList">
                <item :item-data="item" @init="getHotTrialList" :key="item.goodsId" />
            </template>
        </div>
    </div>
</template>
<script>
import '@/api/mcp/api..query-project-hot-trial-list'; // 项目下热推好课
import '@/api/ctc/api..query-project-detail'; // 查询项目详情
import '@/api/mcp/api..query-index-trial-list.js'; // 固定首页10个体验课列表
import Item from './components/Item.vue';
export default {
    name: 'hot-courses-card',
    components: {
        Item,
    },
    props: {
        projectId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            courseList: [],
            projectSeoCode: '',
        };
    },
    fetch() {
        return this.getCourseList();
    },
    watch: {
        projectId(val, oldVal) {
            if (val !== oldVal) {
                this.getCourseList();
            }
        },
    },
    methods: {
        //获取体验课列表
        getCourseList() {
            if (this.projectId) {
                this.getHotTrialList();
                this.getQueryProjectDetail();
            } else {
                this.getIndexTrialList();
            }
        },
        //项目下热推好课
        getHotTrialList() {
            this.$callApi('mcp/query-project-hot-trial-list', {
                projectId: this.projectId,
                findCount: 4,
                showClient: 'W',
                onsuccess: (data) => {
                    data = data || [];
                    this.courseList = data.filter((course, index) => index <= 3);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //获取项目projectSeoCode
        getQueryProjectDetail() {
            if (!this.projectId) {
                return;
            }
            this.$callApi('ctc/query-project-detail', {
                projectId: this.projectId,
                onsuccess: (data) => {
                    this.projectSeoCode = data.projectSeoCode;
                },
                onerror: () => {},
                oncomplete: () => {},
            });
        },
        //跳转到体验课列表
        goToMore() {
            let url = '/trial-course';
            if (this.projectId) {
                url += `/all/${this.projectSeoCode || 'all'}`;
            }
            this.$PageUtil.openNewPage(url);
        },
        //固定首页10个体验课列表
        getIndexTrialList() {
            this.courseList = [];
            this.$callApi('mcp/query-index-trial-list', {
                projectIds: '',
                findCount: 4,
                showClient: 'W',
                onsuccess: (data) => {
                    data = data || [];
                    this.courseList = data.filter((course, index) => index <= 3);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
};
</script>
<style lang="less" scoped>
.scroll {
    max-height: 350px;
    overflow: hidden;
    overflow-y: auto;
}
.center {
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 300px;
    overflow: hidden;
}
.projectList {
    position: absolute;
    top: 18px;
    right: 0;
    z-index: 2;
    padding-top: 22px;
    .project-wrap {
        width: 840px;
        max-height: 414px;
        box-sizing: border-box;
        padding: 32px 10px;
        background: #ffffff;
        border-radius: 6px 0px 2px 0px 6px 6px 6px;
    }

    .item-block {
        display: inline-block;
        margin: 0 8px;
        margin-bottom: 13px;
        padding: 0 15px;
        font-size: 14px;
        color: #3a3d4b;
        height: 26px;
        line-height: 26px;
        cursor: pointer;

        &.this {
            color: #025eff;
            background-color: #eaeeff;
            border-radius: 14px;
        }
    }
}
.hot-section {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 32px;
    .hot-header {
        display: flex;
        align-items: center;
        height: 52px;
    }
    .hot-title {
        font-size: 24px;
        color: #3a3d4b;
        margin-right: 32px;
    }
    .hot-more {
        cursor: pointer;
        position: relative;
        top: 3px;
        width: 70px;
        font-size: 14px;
        color: #77798d;
        background: url('./asset/images/arrow.png') no-repeat;
        background-size: 10px 11px;
        background-position-x: right;
        background-position-y: 5px;
    }
    .content-list {
        box-sizing: border-box;
        padding-top: 10px;
        display: flex;
        margin: 0 -13px;
        overflow: hidden;
    }
}
</style>
