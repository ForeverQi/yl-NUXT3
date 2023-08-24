<template>
    <div class="record-list">
        <template v-if="list.length > 0">
            <record-item v-for="item in list" :item-data="item" :key="item.commentId" />
            <div class="pages" v-if="total > pageSize">
                <el-pagination background :page-size="pageSize" layout="prev, pager, next" :total="total" @current-change="pageChange"></el-pagination>
            </div>
        </template>
        <div class="empty" v-else>
            <img class="img" src="./asset/images/empty.png" />
            <span class="txt">暂无评价信息</span>
        </div>
    </div>
</template>
<script>
import '@/api/cmt/api.CMTS1001.headmaster-evaluate-record.js'; // 获取学管师评价列表
import RecordItem from '../RecordItem/index.vue';
export default {
    components: {
        RecordItem,
    },
    props: {
        teacherId: {
            type: String,
            // default: 'USER20200409010000005776',
            default: '',
        },
        selectMouth: {
            type: String,
            default: '2021-09',
        },
    },
    data() {
        return {
            pageIndex: 1,
            pageSize: 10, // 一页显示条数
            list: [], // 列表数据
            total: 0, // 总数
        };
    },
    watch: {
        selectMouth(newVal, oldVal) {
            if (oldVal && oldVal !== newVal) {
                this.pageIndex = 1;
                this.getData();
            }
        },
        teacherId(newVal, oldVal) {
            if (oldVal !== newVal) {
                this.pageIndex = 1;
                this.getData();
            }
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (!this.teacherId) {
                return;
            }
            this.getData();
        },
        getData() {
            let params = {
                teacherUserId: this.teacherId, // 学管师 教师标识
                commentCreatedDate: this.selectMouth, // 查询数据的月份
                pageIndex: this.getPageIndex(),
                pageSize: this.pageSize,
            };
            let vm = this;
            this.$niceloo.api.call('cmt/headmaster-evaluate-record', {
                ...params,
                onsuccess: (res) => {
                    if (!res.data) {
                        res.data = [];
                    }
                    vm.total = res.count;
                    vm.list = res.data;

                    this.$emit('onScroll');
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        pageChange(ev) {
            this.pageIndex = ev;
            this.getData();
        },
        getPageIndex() {
            return (this.pageIndex - 1) * this.pageSize;
        },
    },
};
</script>
<style lang="less" scoped>
.record-list {
    padding: 0 18px;

    .pages {
        text-align: center;
        padding-bottom: 20px;
    }

    .empty {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 400px;

        .img {
            width: 344px;
            height: 194px;
        }

        .txt {
            font-size: 16px;
            color: #53586c;
        }
    }
}
</style>
