<template>
    <div class="open-similar" v-if="liveList.length > 0">
        <div class="live-calendar-title">
            <span class="live-calendar-title-text">同类好课</span>
            <span class="live-calendar-more" @click="toOpenList">更多好课</span>
        </div>
        <ul>
            <open-list-item v-for="(item, index) in liveList" :key="index" :item="item"></open-list-item>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import OpenListItem from '../../components/open-list-item/index.vue';
import '@/api/mcp/api..query-liveCourse-web-list.js';
import '@/api/mcp/api..query-liveCourse-web-liveCalendarList.js';

export default {
    name: 'SimilarGood',
    components: { OpenListItem },
    data() {
        return {
            liveList: [],
        };
    },
    fetch() {
        if (this.liveCourse) {
            return this.getList();
        } else {
            return this.getLiveList();
        }
        /*return Promise.resolve();*/
    },
    computed: {
        ...mapState('open', ['liveCourse', 'projectSeoCode']),
    },
    watch: {
        liveCourse: {
            handler(newval) {
                if (newval) {
                    this.getList();
                } else {
                    this.getLiveList();
                }
            },
            immediate: true,
        },
    },
    methods: {
        getList() {
            const { liveId } = this.$route.params;
            return new Promise((resolve, reject) => {
                this.$callApi('mcp/query-liveCourse-web-list', {
                    pageIndex: 1,
                    pageSize: 4,
                    showClient: 'W',
                    projectId: this.liveCourse ? this.liveCourse.projectId : '', // 项目唯一标识
                    projectType: 'P', //	项目类型 P项目 T子项目
                    collegeId: '',
                    liveId,
                    indexFlag: true,
                    hasAppointStatus: false,
                    onsuccess: (res) => {
                        this.liveList = res.data;
                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            });
        },
        getLiveList() {
            return new Promise((resolve, reject) => {
                this.$callApi('mcp/query-liveCourse-web-liveCalendarList', {
                    projectIds: '',
                    findCount: 4,
                    showClient: 'W',
                    onsuccess: (res) => {
                        this.liveList = res.splice(0, 4);
                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                });
            });
        },

        toOpenList() {
            this.$PageUtil.openNewPage(`/free-course/all/${this.projectSeoCode}`);
        },
    },
};
</script>

<style scoped lang="less">
.open-similar {
    width: 1200px;
    margin: 32px auto 0;
}
.live-calendar-title {
    margin-top: 30px;
    .live-calendar-title-text {
        font-size: 24px;
        color: #3a3d4b;
        line-height: 62px;
    }
    .live-calendar-more {
        background: url('./asset/images/more.png') no-repeat;
        background-size: 10px 11px;
        background-position-x: right;
        background-position-y: 5px;
        text-align: left;
        width: 70px;
        margin-left: 25px;
        display: inline-block;
        font-size: 14px;
        color: #77798d;
        position: relative;
        top: -3px;
        cursor: pointer;
    }
}
ul {
    display: inline-block;
}
</style>
