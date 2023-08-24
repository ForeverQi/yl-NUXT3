<template>
    <ul class="tab-box flex">
        <li :class="['tab-item', item.val === tabVal ? 'active' : '']" v-for="(item, index) in tabList" :key="index" @click="handleChangeTab(item.val)">
            {{ item.name }}
        </li>
    </ul>
</template>
<script>
export default {
    name: 'navBoxModel',
    props: {
        tabVal: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            tabList: [
                { name: '课程介绍', val: 1 },
                { name: '课程目录', val: 2 },
            ],
        };
    },
    fetch() {
        return Promise.resolve();
    },
    methods: {
        handleChangeTab(val) {
            this.$emit('update:tabVal', val);
            this.$emit('item-click', val);
        },
    },
};
</script>
<style lang="less" scoped>
.tab-box {
    padding: 17px 10px 40px;
    .tab-item {
        padding: 0 10px;
        font-size: 20px;
        color: #3a3d4b;
        margin-right: 36px;
        cursor: pointer;
        position: relative;
    }
    .active {
        color: #ff2e30;
        font-weight: bold;
    }
    .active::after {
        content: '';
        width: 20px;
        height: 4px;
        border-radius: 2px;
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #ff2e30;
    }
}
</style>
