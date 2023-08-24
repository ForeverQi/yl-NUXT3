<template>
    <div class="tabs">
        <div class="tab" :class="{ this: index === selectIndex }" v-for="(item, index) in tabList" :key="index" ref="items">
            <nuxt-link class="link" :to="item.href">{{ item.name }}</nuxt-link>
        </div>
        <div class="bar" ref="bar" :style="tabBarStyle"></div>
    </div>
</template>
<script>
export default {
    props: {
        curRouter: {
            type: String,
            default: '',
        },
        tabList: {
            type: Array,
            default() {
                return [
                    {
                        name: '全部',
                        href: '/uc/manager/cmt/allCmt',
                    },
                    {
                        name: '待评价(0)',
                        href: '/uc/manager/cmt/awaitCmt',
                    },
                    {
                        name: '已评价',
                        href: '/uc/manager/cmt/yetCmt',
                    },
                ];
            },
        },
    },
    data() {
        return {
            selectIndex: 0,
            scrollBarLeft: 0,
            barFirstTimeMove: true,
        };
    },
    computed: {
        tabBarStyle() {
            return {
                transform: `translate(${this.scrollBarLeft}px, -100%)`,
                'transition-duration': `${this.barFirstTimeMove ? 0 : this.duration}s`,
                opacity: this.barFirstTimeMove ? 0 : 1,
            };
        },
    },
    watch: {
        selectIndex: {
            immediate: true,
            handler() {
                // 视图更新后再执行移动操作
                this.$nextTick(() => {
                    this.scrollByIndex();
                });
            },
        },
        curRouter(newVal, oldVal) {
            let index = this.tabList.findIndex((r) => r.href === newVal);
            if (index < 0) {
                this.selectIndex = 0;
            } else {
                this.selectIndex = index;
            }
        },
    },
    methods: {
        scrollByIndex() {
            if (!this.$refs.items || this.$refs.items.length === 0) {
                return;
            }
            // 计算底线移动位置
            const item = this.$refs.items[this.selectIndex];
            const offsetLeft = item.offsetLeft + item.offsetWidth / 2 - this.$refs.bar.offsetWidth / 2;

            this.scrollBarLeft = offsetLeft - 30;

            if (this.barFirstTimeMove) {
                setTimeout(() => {
                    this.barFirstTimeMove = false;
                }, 100);
            }
        },
        changeIndex(index, name) {
            const data = {
                index,
                name,
            };
            this.$emit('changeIndex', data);
        },
    },
};
</script>
<style lang="less" scoped>
.tabs {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 8px;
    padding-left: 30px;
    .tab {
        height: 100%;
        &.this {
            .link {
                color: #333333;
                font-size: 16px;
                font-weight: 700;
            }
        }

        .link {
            line-height: 60px;
            display: block;
            height: 100%;
            padding: 0 30px;
            color: #666666;
            font-size: 16px;
        }
    }

    .bar {
        position: absolute;
        width: 22px;
        height: 4px;
        bottom: 4px;
        opacity: 0;
        border-radius: 2px;
        background-color: #f8323c;
        transition: all 0.3s ease-in;
    }
}
</style>
