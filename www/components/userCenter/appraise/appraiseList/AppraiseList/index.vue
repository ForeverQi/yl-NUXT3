<template>
    <div class="questionnaire-list">
        <template v-if="list.length > 0">
            <appraise-item v-for="item in list" :item-data="item" :key="item.id" />
        </template>
        <order-null v-else words="暂无评价信息" style="width: auto"></order-null>
    </div>
</template>
<script>
import '@/api/cmt/api.CMTS1002.cmt-list.js'; // 问卷调查列表
import AppraiseItem from '../AppraiseItem/index.vue';
import OrderNull from '@/www/components/uc/manager/myCourse/orderNull/index.vue';

export default {
    components: {
        AppraiseItem,
        OrderNull,
    },
    props: {
        status: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            list: [],
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getData();
        },
        getData() {
            let params = {
                evaluateStatus: this.status,
            };
            this.$niceloo.api.call('cmt/cmt-list', {
                ...params,
                onsuccess: (res) => {
                    this.list = res;
                    // this.list.push({ evaluateStatus: 'Y', title: '测试问卷调查' });
                    // this.list.push({ evaluateStatus: 'Y', title: '测试问卷调查' });
                    // this.list.push({ evaluateStatus: 'N', title: '测试问卷调查', expireStatus: 'Y' });
                    // this.list.push({ evaluateStatus: 'N', title: '测试问卷调查', expireStatus: 'N' });
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
    },
};
</script>
<style lang="less" scoped>
.questionnaire-list {
    height: 100%;
    padding: 16px 30px;
    padding-bottom: 60px;
    background-color: #fff;

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
