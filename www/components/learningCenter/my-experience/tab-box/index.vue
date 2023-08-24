<template>
    <div class="tab-box flex ai-center">
        <div v-for="(item, index) in tabList" :key="index" :class="['tab-btn', tabVal === item.val ? 'active' : '']" @click="handleChangeTab(item.val)">
            {{ item.name }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'tabBox',
    components: {},
    filters: {},
    /*props: {
        tab: {
            type: Number,
            default: 1,
        },
    },*/
    data() {
        return {
            tabList: [
                { name: '我领取的课程', val: 0 },
                { name: '我收藏的课程', val: 1 },
            ],
            tabVal: 0,
        };
    },
    watch: {},
    created() {},
    mounted() {},
    beforeDestroy() {},
    methods: {
        handleChangeTab(val) {
            this.tabVal = val;
            console.log(' this.tabVal' + val);
            this.$emit('change-tab', val);
        },
    },
};
</script>
<style lang="less" scoped>
.tab-box {
    width: 300px;
    height: 42px;
    line-height: 42px;
    border-radius: 8px;
    background: #f5f6f9;
    display: flex;
    align-items: center;
    margin: 16px auto 20px;
    .tab-btn {
        font-size: 16px;
        color: #3a3d4b;
        position: relative;
        cursor: pointer;
        width: 144px;
        background: #f5f6f9;
        border-radius: 8px;
        text-align: center;
        color: #3a3d4b;
        &:nth-child(1) {
            margin-right: 12px;
        }
    }
    .active {
        color: #ff2e30;
        font-weight: 700;
        background: #ffeaea;
    }
    /*.active:after {
        content: '';
        width: 22px;
        height: 4px;
        background-color: #025eff;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 2px;
    }*/
}
</style>
