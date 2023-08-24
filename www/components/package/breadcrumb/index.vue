<template>
    <div class="breadcumb-wrap">
        <span class="breadcumb-item" v-for="(item, index) in items" :key="index">
            <a
                :href="item.href ? item.href : 'javascript:void(0)'"
                class="link"
                :class="{
                    textColor: index == items.length - 1,
                }"
            >
                {{ item.name }}
            </a>
            <span class="division" v-show="index < items.length - 1"></span>
        </span>
    </div>
</template>
<script>
export default {
    name: 'YlBreadcumb',
    props: {
        items: {
            type: Array,
            default() {
                return [];
            },
        },
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
};
</script>
<style lang="less" scoped>
.breadcumb-wrap {
    display: flex;
    padding-left: 16px;

    .breadcumb-item {
        display: flex;
        align-items: center;
        height: 42px;
        line-height: 42px;
        font-size: 14px;
        color: #99a1af;
        overflow: hidden;

        .link {
            display: inline-block;
            max-width: 120px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #333;
        }
        .textColor {
            max-width: 100%;
            color: #53586c;
        }
        .division {
            flex-shrink: 0;
            display: inline-block;
            width: 6px;
            height: 11px;
            margin: 0 16px;
            background-image: url(./asset/images/right-allow.png);
            background-size: 100%;
        }
    }
}
</style>
