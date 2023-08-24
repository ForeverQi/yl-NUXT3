<template>
    <div>
        <ul class="openList" v-if="page.pageCount > 0" v-loading="loading">
            <open-list-item v-for="(item, index) in liveList" :key="index" :item="item"></open-list-item>
        </ul>
        <div class="empty-tip" v-if="page.pageCount === 0 && !failLoad">
            <div>
                <img class="empty-tip-img" src="asset/images/empty_tip.png" alt="" />
                <div class="empty-tip-text">暂无课程，去看看其他考试的课程吧</div>
            </div>
        </div>
        <div class="empty-tip" v-if="failLoad">
            <div>
                <img class="empty-tip-img" src="asset/images/fail_load.png" alt="" />
                <div class="empty-tip-text">内容加载失败，请刷新页面</div>
            </div>
        </div>
        <pagination :page-size="page.pageSize" :total="page.pageCount" @current-change="handleChangePage" class="pagination"></pagination>
    </div>
</template>

<script>
import OpenListItem from '../../components/open-list-item/index.vue';

import Pagination from '@/www/components/components/pagination/index.vue';
import '@/api/mcp/api..query-liveCourse-web-list.js';
export default {
    name: 'OpenList',
    components: { OpenListItem, Pagination },
    props: {
        currentCollege: {
            type: Object,
            default: () => {
                return null;
            },
        },
        currentProject: {
            type: Object,
            default: () => {
                return null;
            },
        },
    },
    data() {
        return {
            page: {
                pageIndex: 1,
                pageSize: 20,
                pageCount: 0,
            },
            liveList: [],
            loading: true,
            failLoad: false,
        };
    },
    watch: {
        currentCollege() {
            console.log('999999');
            this.getList();
        },
        currentProject() {
            console.log('55555555');
            this.getList();
        },
    },
    mounted() {
        console.log('0000000');
        this.getList();
    },
    methods: {
        getList() {
            this.$callApi('mcp/query-liveCourse-web-list', {
                pageIndex: this.page.pageIndex,
                pageSize: this.page.pageSize,
                showClient: 'W',
                projectId: this.currentProject.projectType === 'parent' ? this.currentProject.projectId : this.currentProject.ptagId, // 项目唯一标识
                projectType: this.currentProject.projectType === 'parent' ? 'P' : 'T', //	项目类型 P项目 T子项目
                collegeId: this.currentCollege.collegeId,
                indexFlag: false,
                hasAppointStatus: false,
                onsuccess: (res) => {
                    this.liveList = res.data;
                    this.page.pageCount = res.count;
                    if (this.isPageTrigger === true) {
                        this.isPageTrigger = false;
                        this.$nextTick(() => {
                            const dm = document.querySelector('.experience-swiper');
                            dm &&
                                dm.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                });
                        });
                    }
                },
                onerror: () => {
                    this.failLoad = true;
                },
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
        handleChangePage(currentPage) {
            this.page.pageIndex = currentPage;
            this.getList();
        },
    },
};
</script>

<style scoped lang="less">
ul {
    display: inline-block;
    margin-top: 25px;
}
.pagination {
    margin-bottom: 120px;
}
.empty-tip {
    height: 500px;
    justify-content: center; //左右居中
    align-items: center; //上下居中
    display: flex;
    .empty-tip-img {
        width: 260px;
        height: 180px;
    }
    .empty-tip-text {
        color: #3a3d4b;
        text-align: center;
        margin-top: 15px;
        font-size: 14px;
    }
}
</style>
