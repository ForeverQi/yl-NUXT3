<template>
    <div class="my-micro-class">
        <tab-box :tab="2"></tab-box>
        <div class="flex jc-between">
            <div class="content-left">
                <project-tab project-type="A" @changeProject="changeProject"></project-tab>
                <!-- 空列表 -->
                <empty-model :empty-text="emptyText" v-if="isEmpty" :tab="2"></empty-model>
                <!-- 我的预约 -->
                <yu-yue-item :course-list="courseList" :page="page" @page-change="pageChange" v-else></yu-yue-item>
            </div>
            <div class="content-right">
                <div class="right-top flex ai-center">
                    <img src="../components/asset/images/livingRoom.png" alt="" />
                </div>
                <list-box></list-box>
            </div>
        </div>
    </div>
</template>

<script>
import tabBox from '../components/tabBox/index.vue';
import emptyModel from '../components/emptyModel/index';
import projectTab from '../components/projectTab/index';
import yuYueItem from '../components/yuYueItem/index.vue';
import { mcpMineAppointment } from '../apis/index.js';
import listBox from './components/listBox/index.vue';

export default {
    name: 'index',
    components: {
        tabBox,
        projectTab,
        emptyModel,
        listBox,
        yuYueItem,
    },
    data() {
        return {
            isEmpty: false,
            emptyText: '您还没有预约直播课',
            currentProject: {},
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 4,
            },
            courseList: [],
            timerList: [],
            timer: null,
        };
    },
    mounted() {
        this.isCareServiceNumber();
    },
    destroyed() {
        if (this.timerList.length > 0) {
            this.timerList.forEach((item) => {
                item.stopTime();
            });
        }
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
            this.currentProject = val;
            this.page.pageIndex = 1;
            this.getDataList();
        },
        //翻页
        pageChange(num) {
            this.page.pageIndex = num;
            this.getDataList();
        },
        //获取数据列表
        getDataList() {
            return mcpMineAppointment(this, {
                pageIndex: this.page.pageIndex,
                pageSize: this.page.pageSize,
                projectId: this.currentProject.projectId,
            })
                .then((res) => {
                    this.courseList = res.data;
                    this.page.pageCount = res.count;
                    this.page.pageCount > 0 ? (this.isEmpty = false) : (this.isEmpty = true);
                    this.courseList.forEach((item, index) => {
                        if (item.courseStatus === 1) {
                            let vm = this;
                            this.timer = vm.$countDown.runTime(new Date(item.liveTime).getTime(), item.currentTime, (val) => {
                                if (typeof val !== 'undefined') {
                                    vm.$set(item, 'countDown', {});
                                    item.countDown = val;
                                } else {
                                    this.getDataList();
                                }
                            });
                            this.timerList.push(this.timer);
                        }
                    });
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
