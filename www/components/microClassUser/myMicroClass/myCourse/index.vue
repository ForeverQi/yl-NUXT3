<template>
    <div class="my-micro-class">
        <tab-box :tab="1"></tab-box>
        <div class="flex jc-between">
            <div class="content-left">
                <project-tab project-type="T" @changeProject="changeProject"></project-tab>
                <!-- 空列表 -->
                <empty-model :empty-text="emptyText" :tab="1" v-if="isEmpty"></empty-model>
                <!-- 我的课程 我的收藏-->
                <class-item :tab="tab" :course-list="courseList" :page="page" @page-change="pageChange" v-else></class-item>
            </div>
            <div class="content-right">
                <div class="right-top flex ai-center">
                    <img src="../components/asset/images/sameClass.png" />
                </div>
                <list-box></list-box>
            </div>
        </div>
    </div>
</template>

<script>
import tabBox from '../components/tabBox/index.vue';
import emptyModel from '../components/emptyModel/index';
import listBox from '../components/listBox/index.vue';
import projectTab from '../components/projectTab/index.vue';
import classItem from '../components/classItem/index.vue';
import { mcpMineCourse } from '../apis/index.js';
//体验课
export default {
    name: 'index',
    components: {
        tabBox,
        projectTab,
        emptyModel,
        listBox,
        classItem,
    },
    data() {
        return {
            tab: 1,
            isEmpty: false,
            emptyText: '您还没有购买/领取课程',
            currentProject: {},
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 4,
            },
            courseList: [],
        };
    },
    mounted() {
        this.isCareServiceNumber();
    },
    methods: {
        //判断是否登录，关注服务号
        isCareServiceNumber() {
            this.$mcuLogin
                .checkLogin('myMicroClass')
                .then(({ isFirst }) => {
                    isFirst && this.$PageUtil.reflush();
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        //切换项目
        changeProject(val) {
            if (typeof val === 'undefined') {
                this.isEmpty = true;
                return;
            }
            this.page.pageIndex = 1;
            this.currentProject = val;
            this.getDataList();
        },
        //翻页
        pageChange(num) {
            this.page.pageIndex = num;
            this.getDataList();
        },
        //获取数据列表
        getDataList() {
            return mcpMineCourse(this, {
                pageIndex: this.page.pageIndex,
                pageSize: this.page.pageSize,
                projectId: this.currentProject.projectId,
            })
                .then((res) => {
                    this.courseList = res.data;
                    this.courseList.forEach((item) => {
                        if (!item.courseExpiredtime || new Date(item.courseExpiredtime).getTime() > new Date().getTime()) {
                            this.$set(item, 'isInvalid', true);
                        }
                    });
                    this.page.pageCount = res.count;
                    this.page.pageCount > 0 ? (this.isEmpty = false) : (this.isEmpty = true);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.my-micro-class {
    width: 1200px;
    margin: 0 auto 40px;
    .content-left {
        width: 860px;
        background-color: #fff;
        border-radius: 6px;
        padding: 7px 0 100px;
    }
    .content-right {
        width: 324px;
        background-color: #fff;
        border-radius: 6px;
        .right-top {
            height: 60px;
            padding-left: 18px;
            background: #f8fbff;
            img {
                width: auto;
                height: 20px;
            }
        }
    }
}
</style>
