<template>
    <ul class="tab-wrap">
        <li
            @click="selectItem(index)"
            v-for="(item, index) in data"
            :key="index"
            :data-value="item.value"
            :class="['tab-item', index === activeIndex ? 'tab-active' : '']"
        >
            {{ item.label }}
            <span v-if="item.dot" class="single-red-dot"></span>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'tabX',
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
        /**
         * 点击选择
         *
         * @param {number} index 索引
         */
        selectItem(index) {
            this.$emit('select', index);
        },
    },
};
</script>
<style lang="less" scoped>
.tab-wrap {
    background-color: white;
}

.tab-item {
    position: relative;
    box-sizing: border-box;
    display: inline-block;
    padding: 19.5px 38px;
    font-size: 16px;
    color: #3a3d4b;
    letter-spacing: 1px;
    cursor: pointer;
}

.tab-active {
    color: #333333;
    font-weight: bold;
}
.tab-active::before {
    content: ' ';
    width: 34px;
    height: 4px;
    background: #e73928;
    border-radius: 2px;
    display: inline-block;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
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
    height: 10px;
    width: 10px;
    background-color: #fe4848;
    border-radius: 10px;
    // font-size: 12px;
    // font-weight: 400;
    // text-align: center;
    // color: #fff !important;
    // line-height: 12px;
    // padding: 2px 6px;
}
</style>
