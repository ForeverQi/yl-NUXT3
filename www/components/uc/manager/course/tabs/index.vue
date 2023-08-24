<template>
    <ul class="tab-wrapper">
        <li v-for="(item, index) in tabs" :key="index" @click="switchTab(index)" :class="index === activeIndex ? 'active' : ''" class="tabItem">
            {{ item.name }}
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        tabs: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            activeIndex: 0,
            urlArr: ['/uc/manager/course/open', '/uc/manager/course/schedule'],
        };
    },
    watch: {
        $route: {
            handler(route) {
                this.activeIndex = this.urlArr.findIndex((item) => route.path.startsWith(item));
            },
            immediate: true,
        },
    },
    methods: {
        switchTab(index) {
            this.activeIndex = index;
            this.$router.push({ path: this.urlArr[index] });
        },
    },
};
</script>

<style scoped lang="less">
.tab-wrapper {
    background-color: white;
    font-size: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .tabItem {
        padding: 19px 30px 20px;
        font-weight: 400;
        color: #3a3d4b;
        cursor: pointer;
        display: inline-block;
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
            background: #e73928;
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
