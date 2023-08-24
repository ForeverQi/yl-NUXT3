<template>
    <div class="my-open">
        <div class="content-left">
            <div class="appointment-open-class">预约的公开课</div>
            <!-- 空列表 -->
            <empty-model :empty-text="emptyText" :empty-type="emptyType" v-if="isEmpty"></empty-model>
            <!-- 我的预约 -->
            <yu-yue-item :course-list="courseList" :page="page" @page-change="pageChange" v-else></yu-yue-item>
        </div>
        <list-box></list-box>
    </div>
</template>

<script>
import emptyModel from '@/www/components/learningCenter/my-open/empty-model';
import yuYueItem from '@/www/components/learningCenter/my-open/yuyue-item';
/*import listBox from '@/www/components/learningCenter/my-open/list-box/index.vue';*/
import listBox from '@/www/components/components/learning-center-similar-lesson';
import '@/api/mcu/api.MCU4003.mcp-mine-appointment.js';
export default {
    name: 'myOpen',
    components: {
        emptyModel,
        listBox,
        yuYueItem,
    },
    layout: 'new-default',
    data() {
        return {
            isEmpty: false,
            emptyText: '您还没有预约直播课',
            emptyType: 1,
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
    head() {
        return this.$head({
            title: '我的课程_公开课_用学习创造美好人生_优路教育',
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
    destroyed() {
        if (this.timerList.length > 0) {
            this.timerList.forEach((item) => {
                item.stopTime();
            });
        }
    },
    methods: {
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
        //获取数据列表
        getDataList() {
            this.$callApi('myMicroClass/mcp-mine-appointment', {
                pageIndex: this.page.pageIndex,
                pageSize: this.page.pageSize,
                projectId: '',
                onsuccess: (res) => {
                    this.courseList = res.data;
                    this.page.pageCount = res.count;
                    this.page.pageCount > 0 ? (this.isEmpty = false) : (this.isEmpty = true);
                    this.emptyType = 1;
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
                },
                onerror: (err) => {
                    this.isEmpty = true;
                    this.emptyType = 2;
                    this.emptyText = '内容加载失败，请刷新页面';
                    this.$niceloo.api.handleFailure(err);
                },
                oncomplete: () => {},
            });
        },
    },
};
</script>

<style lang="less" scoped>
.my-open {
    width: 1200px;
    margin: 0 auto 40px;
    /*justify-content: space-between;*/
    display: flex;
    .content-left {
        width: 860px;
        /*float: left;
        flex: 1;*/
        background-color: #fff;
        border-radius: 6px;
        /*padding: 7px 0 100px;*/
        .appointment-open-class {
            width: 144px;
            height: 42px;
            background: #ffeaea;
            border-radius: 8px;
            font-weight: bold;
            text-align: center;
            color: #ff2e30;
            font-size: 16px;
            line-height: 42px;
            margin: 16px auto;
        }
    }
}
</style>
