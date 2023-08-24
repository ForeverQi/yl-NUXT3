<template>
    <div class="tab-list">
        <div v-for="(item, index) in tabs" :key="index" class="tab-item" :class="index === activeIndex ? 'active' : ''">
            <span>{{ item.name }}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'order-tabs',
    props: {
        tabs: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            activeIndex: 0,
        };
    },
};
</script>
<style lang="less" scoped>
.tab-list {
    line-height: 60px;
    height: 60px;
    background: #fff;
    padding-right: 20px;
    box-shadow: 0 0 10px 0 #eee;
    .tab-item {
        min-width: 140px;
        padding: 0;
        font-size: 16px;
        font-weight: 400;
        color: #666;
        text-align: center;
        cursor: pointer;
        float: left;
        &.active {
            color: #333;
            font-weight: bold;
            position: relative;
        }
        &.active:after {
            content: '';
            position: absolute;
            width: 34px;
            height: 4px;
            background: linear-gradient(90deg, rgba(255, 68, 54, 1) 0%, rgba(249, 107, 84, 1) 100%);
            border-radius: 2px;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
        }
        &:hover {
            color: #333;
            font-weight: bold;
        }
    }
}
</style>
