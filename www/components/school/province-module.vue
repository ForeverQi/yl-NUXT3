<template>
    <div>
        <div class="all-title">全国分校</div>
        <ul class="item-box">
            <li v-for="item in list" :key="item.provinceId" class="item">
                <span class="name" :class="{ active: item.provinceId === activeId }" @click="$emit('province-change', item.provinceId)">
                    {{ item.provinceName }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => [],
        },
        activeId: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="less" scoped>
.all-title {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.item-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 17px 32px 8px 32px;

    .item {
        width: 50%;
        margin-bottom: 24px;

        &:nth-child(even) {
            text-align: right;
        }
    }

    .name {
        display: inline-block;
        padding: 0 16px;
        font-size: 14px;
        color: #53586c;
        line-height: 28px;
        border-radius: 4px;
        cursor: pointer;

        &:hover,
        &.active {
            background-color: #ffece8;
            color: #ff2e30;
        }
    }
}
</style>
