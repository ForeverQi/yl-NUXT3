<template>
    <div class="my-experience">
        <div class="content-left">
            <tab-box @change-tab="handleChangeTab"></tab-box>
            <!-- 空列表 -->
            <empty-model :empty-text="emptyText" :empty-type="emptyType" v-if="isEmpty"></empty-model>
            <!-- 我的课程 我的收藏-->
            <class-item :tab="tab" :course-list="courseList" :page="page" @page-change="pageChange" @update-list="upDateList" v-else></class-item>
        </div>
        <list-box></list-box>
    </div>
</template>

<script>
import emptyModel from '@/www/components/learningCenter/my-experience/empty-model';
import tabBox from '@/www/components/learningCenter/my-experience/tab-box';
import classItem from '@/www/components/learningCenter/my-experience/class-item';
import listBox from '@/www/components/components/learning-center-similar-lesson';
import '@/api/mcu/api.MCU4002.mcp-mine-course.js';
import '@/api/mcu/api.MCU4004.mcp-mine-collection.js';
//体验课
export default {
    name: 'MyExperience',
    components: {
        emptyModel,
        tabBox,
        classItem,
        listBox,
    },
    layout: 'new-default',
    data() {
        return {
            tab: 0,
            isEmpty: false,
            emptyText: '您还没有领取课程',
            emptyType: 1,
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 4,
            },
            url: ['myMicroClass/mcp-mine-course', 'myMicroClass/mcp-mine-collection'],
            courseList: [],
        };
    },
    head() {
        return this.$head({
            title: '我的课程_体验课_用学习创造美好人生_优路教育',
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
    mounted() {
        this.getDataList();
    },
    methods: {
        handleChangeTab(value) {
            this.tab = value;
            value === 0 ? (this.emptyText = '您还没有领取课程') : (this.emptyText = '您还没有收藏课程');
            this.isEmpty = false;
            console.log(value);
            this.page.pageIndex = 1;
            this.getDataList();
        },
        //翻页
        pageChange(num) {
            this.page.pageIndex = num;
            this.getDataList();
            this.$nextTick(() => {
                const dm = document.querySelector('.header-wrap');
                dm &&
                    dm.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
            });
        },

        getDataList() {
            this.$callApi(this.url[this.tab], {
                pageIndex: this.page.pageIndex,
                pageSize: this.page.pageSize,
                projectId: '',
                onsuccess: ({ data = [], count = 0 }) => {
                    data.forEach((item) => {
                        // 这种接口处理鸡肋
                        item.isInvalid = item.validStatus === 'N';
                        // 这种接口处理鸡肋
                    });
                    this.courseList = data;
                    this.page.pageCount = count;
                    this.page.pageCount > 0 ? (this.isEmpty = false) : (this.isEmpty = true);
                    this.emptyType = 1;
                },
                onerror: (err) => {
                    this.isEmpty = true;
                    this.emptyType = 2;
                    this.emptyText = '内容加载失败，请刷新页面';
                    this.$niceloo.api.handleFailure(err);
                },
            });
        },
        //取消收藏更新数据列表
        upDateList() {
            this.getDataList();
        },
    },
};
</script>

<style lang="less" scoped>
.my-experience {
    width: 1200px;
    margin: 0 auto 40px;
    display: flex;
    justify-content: space-between;
    .content-left {
        flex: 1;
        background-color: #fff;
        border-radius: 6px;
    }
}
</style>
