<template>
    <div class="do-question-bread">
        <div class="bread-list">
            <div class="bread-list-content">
                <span class="bread-list-content-item" v-for="(item, index) in breadList" :key="index">
                    <a
                        :href="item.href && item.isRedirect ? item.href : 'javascript:void(0)'"
                        :class="{
                            last: index == breadList.length - 1,
                        }"
                    >
                        {{ item.name }}
                    </a>
                    <img class="arrow-right" v-show="index < breadList.length - 1" src="./asset/images/arrow.png" alt="" />
                </span>
            </div>
            <div class="topTime">
                <slot name="right"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    props: {
        breadList: {
            type: Array,
            default: () => [],
        },
    },
};
</script>
<style lang="less" scoped>
.do-question-bread {
    width: 100%;
    height: 43px;

    .bread-list {
        width: 1200px;
        margin: 0 auto;
    }
    .bread-list-content {
        display: flex;
        align-items: center;
        height: 43px;
        .arrow-right {
            width: 6px;
            height: 11px;
            color: #99a1af;
            margin-left: 7px;
            margin-right: 16px;
        }
        .bread-list-content-item {
            height: 19px;
            opacity: 0.8;
            a {
                font-size: 14px;
                color: #99a1af;
                line-height: 19px;
                &.last {
                    color: #53586c;
                    cursor: default;
                }
            }
        }
    }
}
</style>
