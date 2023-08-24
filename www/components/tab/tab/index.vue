<template>
    <div class="tab-wrap">
        <div
            @click="selectItem(index)"
            v-for="(item, index) in data"
            :key="index"
            :data-value="item.value"
            class="item-container"
            :class="{ 'single-red-dot': item.dot, active: index === activeIndex }"
        >
            <div class="tab-item" :class="activeIndex === index ? 'tab-active' : ''">{{ item.label }}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => {
                return [];
            },
        },
        activeIndex: {
            type: Number,
            default: 0,
        },
    },
    methods: {
        selectItem(index) {
            this.$emit('select', index);
        },
    },
};
</script>
<style lang="less" scoped>
.tab-wrap {
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px 40px 0px;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.item-container {
    .tab-item {
        height: 40px;
        font-weight: 700;
        position: relative;
        height: 54px;
        box-sizing: border-box;
        display: inline-block;
        padding: 0 25px;
        font-size: 16px;
        text-align: center;
        color: #666;
        line-height: 54px;
        letter-spacing: 1px;
        cursor: pointer;
        top: -7px;
    }

    .tab-active {
        border-bottom: 3px solid #e73928;
        color: #e73928;
    }
}
.active {
    color: #333;
}

.single-red-dot {
    position: relative;
}

.single-red-dot::after {
    background: linear-gradient(133deg, #f07963 16%, #e73928 80%);
    content: attr(data-value);
    box-sizing: border-box;
    position: absolute;
    top: 1px;
    left: 92px;
    height: 16px;
    background-color: #fe4848;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    color: #fff !important;
    line-height: 12px;
    padding: 2px 6px;
}
</style>
