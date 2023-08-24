<!--
 * @Author: Li
 * @Date: 2022-03-11 17:36:52
 * @LastEditors: Li
 * @LastEditTime: 2022-03-30 17:11:38
 * @Description: 
-->
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
    methods: {
        handleChangeTab(val) {
            this.$emit('update:tabVal', val);
        },
    },
};
</script>
<style lang="less" scoped>
.tab-box {
    padding: 32px 10px 40px;
    .tab-item {
        padding: 0 10px;
        font-size: 20px;
        color: #999;
        margin-right: 36px;
        cursor: pointer;
        position: relative;
    }
    .active {
        color: #3a3d4b;
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
        background-color: #025eff;
    }
}
</style>
