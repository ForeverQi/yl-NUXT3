<template>
    <div class="flex tab-box ai-center">
        <div :class="['tab-btn', type == item.val ? 'active' : '']" v-for="(item, index) in tabList" :key="index" @click="handleChoseType(item.val)">
            {{ item.name }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'myMicroClassTabModel',
    components: {},
    filters: {},
    props: {
        tab: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            tabList: [
                { name: '我的课程', val: 1 },
                { name: '我的预约', val: 2 },
                { name: '我的收藏', val: 3 },
                { name: '我的订单', val: 4 },
            ],
            type: this.tab,
        };
    },
    watch: {},
    created() {},
    mounted() {},
    beforeDestroy() {},
    methods: {
        handleChoseType(val) {
            /*this.type = val;
            this.$emit('changeTab', val);*/
            switch (val) {
                case 1:
                    this.$router.push('/agile-course/my-course');
                    break;
                case 2:
                    this.$router.push('/agile-course/my-live-booking');
                    break;
                case 3:
                    this.$router.push('/agile-course/my-collection');
                    break;
                case 4:
                    this.$router.push('/agile-course/my-order');
                    break;
                default:
                    console.log(11);
            }
        },
    },
};
</script>
<style lang="less" scoped>
.tab-box {
    height: 84px;
    .tab-btn {
        padding: 0 26px;
        height: 36px;
        line-height: 36px;
        color: #3a3d4b;
        font-size: 16px;
        border-radius: 18px;
        cursor: pointer;
        margin-right: 24px;
    }
    .active {
        background-color: #025eff;
        color: #fff;
        font-weight: bold;
    }
}
</style>
