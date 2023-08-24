<template>
    <div class="questionnaire">
        <appraise-tabs :tab-list="tabList" :cur-router="curRouter" />
        <div class="content">
            <nuxt-child />
        </div>
    </div>
</template>
<script>
import AppraiseTabs from '@/www/components/userCenter/appraise/appraiseList/AppraiseTabs';
export default {
    components: {
        AppraiseTabs,
    },
    data() {
        return {
            curRouter: '',
            tabList: [
                {
                    name: '全部',
                    href: '/uc/manager/cmt/allCmt',
                },
                {
                    name: '待评价(0)',
                    href: '/uc/manager/cmt/awaitCmt',
                },
                {
                    name: '已评价',
                    href: '/uc/manager/cmt/yetCmt',
                },
            ],
        };
    },
    head() {
        return this.$head({
            title: '个人中心_问卷调查_点亮职业人生_优路教育',
            meta: [],
        });
    },
    watch: {
        $route(newVal, oldVal) {
            this.curRouter = newVal.fullPath;
            this.getData();
        },
    },
    mounted() {
        this.curRouter = this.$route.fullPath;
        this.getData();
    },
    methods: {
        getData() {
            this.$callRawApi({
                api: 'qs/push/target/list/count',
                params: {},
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    let res = _reponse.getData();
                    this.tabList[1].name = `待评价(${res})`;
                });
        },
    },
};
</script>
<style lang="less" scoped>
.questionnaire {
    min-height: 100%;
    background-color: #fff;

    .line {
        padding-top: 10px;
        background-color: #f5f5f5;
    }
    .content {
    }
}
</style>
