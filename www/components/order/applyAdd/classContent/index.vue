<template>
    <div class="table-section">
        <div class="info">
            <div class="item">
                <span class="label">学员姓名：</span>
                {{ userName || userInfo.userName }}
            </div>
            <div class="item">
                <span class="label">优路号：</span>
                {{ userInfo.userYoulunum }}
            </div>
            <div class="item">
                <span class="label">报班项目：</span>
                {{ projectName }}
            </div>
        </div>
        <apply-table-content :data-list="list" />
    </div>
</template>
<script>
import ApplyTableContent from '../../components/applyTableContent';
export default {
    components: {
        ApplyTableContent,
    },
    props: {
        list: {
            type: Array,
            default() {
                return [];
            },
        },
        projectName: {
            type: String,
            default: '',
        },
        userName: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            userInfo: {},
            propsList: [],
        };
    },
    watch: {
        list() {
            this.init();
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.$User.getUser().then((user) => {
                this.userInfo = user;
            });
            // this.list.forEach((r) => {
            //     r.newClassList.forEach((r1) => {
            //         this.propsList.push({
            //             pypYear: r.pypYear,
            //             pypSeq: r.pypSeq,
            //             oriServContent: r.oriServContent,
            //             gooodsStatus: r.gooodsStatus, // 是否有资料
            //             mustGooodsStatus: r.mustGooodsStatus, // 是否需要资料，false: 不需要，true: 需要
            //             subjectList: r1.subjectList,
            //             className: r.oriClassName,
            //         });
            //     });
            // });
        },
    },
};
</script>
<style lang="less" scoped>
.table-section {
    width: 100%;
    padding: 30px;
    margin-top: 16px;
    box-sizing: border-box;
    background-color: #fff;
}
.info {
    display: flex;
    padding-bottom: 24px;

    .item {
        color: #333333;
        font-size: 14px;
        margin-right: 48px;
    }
}
</style>
