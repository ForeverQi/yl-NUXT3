<template>
    <div class="article-tabs" :class="{ over: isOver }">
        <div class="left" @click="next" v-if="isOver">
            <img src="./asset/images/left.png" v-if="isAllowLeft" />
            <img src="./asset/images/left1.png" v-else />
        </div>
        <div class="tab-wrap" ref="tabWrap">
            <div class="tab" :class="{ this: item.ccId === selectId }" v-for="item in tabList" :key="item.ccId" ref="items">
                <nuxt-link :to="`/article/detail/${item.ccId}`" class="link">
                    {{ item.ccName }}
                </nuxt-link>
            </div>
            <div class="bar" ref="bar" :style="tabBarStyle"></div>
        </div>
        <div class="right" @click="prev" v-if="isOver">
            <img src="./asset/images/right.png" v-if="isAllowRight" />
            <img src="./asset/images/right1.png" v-else />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        selectIndex: {
            type: Number,
            default: 0,
        },
        selectId: {
            type: String,
            default: '',
        },
        tabList: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            scrollBarLeft: 0,
            barFirstTimeMove: true,
            duration: 0.2,
            scrollLeft: 0,
            showTip: false,
            innerIndex: 0,
            rightIndex: 0,
            initLeft: 0,
            isOver: false,
            isAllowRight: true,
            isAllowLeft: true,
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
                this.innerIndex = this.selectIndex;
                // 视图更新后再执行移动操作
                this.$nextTick(() => {
                    this.scrollByIndex();
                });
            },
        },
    },
    methods: {
        scrollByIndex() {
            if (!this.$refs.items || this.$refs.items.length === 0) {
                return;
            }
            // 判断是否超出显示区域
            if (this.$refs.tabWrap.scrollWidth > this.$refs.tabWrap.offsetWidth) {
                this.isOver = true;
            } else {
                this.isOver = false;
            }
            // 计算底线移动位置
            const item = this.$refs.items[this.selectIndex];
            const offsetLeft = item.offsetLeft + item.offsetWidth / 2 - this.$refs.bar.offsetWidth / 2;
            this.scrollBarLeft = offsetLeft;
            this.computedLeftStyle();
            // this.computedRightStyle();
            if (this.barFirstTimeMove) {
                setTimeout(() => {
                    this.barFirstTimeMove = false;
                }, 100);
            }
        },
        computedLeftStyle() {
            let offsetLeft = this.$refs.items[this.selectIndex].offsetLeft + this.$refs.items[this.selectIndex].offsetWidth - this.$refs.tabWrap.offsetWidth;
            // offsetLeft = offsetLeft > 0 ? offsetLeft : this.$refs.items[this.selectIndex].offsetLeft;
            // let iW = this.$refs.tabWrap.offsetWidth / 2;
            // let iW = this.$refs.tabWrap.offsetWidth;
            this.$refs.items.some((item, index) => {
                let w = item.offsetLeft - item.offsetWidth;
                console.log(offsetLeft, w, '==');
                if (w > offsetLeft) {
                    // 左边第几个开始
                    this.innerIndex = index;
                    return true;
                }
                return false;
            });
            this.$nextTick(() => {
                this.scrollLeft = this.$refs.tabWrap.scrollLeft = this.$refs.items[this.innerIndex].offsetLeft;
                if (this.$refs.items[this.selectIndex].offsetLeft + this.$refs.items[this.selectIndex].offsetWidth < this.$refs.tabWrap.offsetWidth) {
                    this.isAllowLeft = false;
                }
                if (this.selectIndex === this.$refs.items.length - 1) {
                    this.isAllowRight = false;
                }
            });
        },
        computedLeftStyle2() {
            let iScrollLeft = this.$refs.tabWrap.scrollLeft;
            this.$refs.items.some((item, index) => {
                let w = item.offsetLeft + item.offsetWidth;
                if (w > iScrollLeft) {
                    this.innerIndex = index;
                    return true;
                }
                return false;
            });
            console.log(this.innerIndex, '===');
            if (this.innerIndex === 0) {
                this.isAllowLeft = false;
            }
        },
        computedRightStyle() {
            // 右边第几个开始
            let offsetRight = this.$refs.tabWrap.scrollLeft + this.$refs.tabWrap.offsetWidth;
            this.$refs.items.some((item, index) => {
                let w = item.offsetLeft + item.offsetWidth;
                if (w > offsetRight) {
                    this.rightIndex = index;
                    return true;
                }
                return false;
            });
            if (this.innerIndex === 0) {
                this.isAllowLeft = false;
            }
        },
        prev() {
            // 上一个
            let tabList = this.$refs.tabWrap.children;
            // 当前元素显示位置
            let sL = tabList[this.innerIndex].offsetLeft + this.$refs.tabWrap.offsetWidth;
            let iSL = this.$refs.tabWrap.scrollWidth;
            console.log(sL, iSL, '++++');
            if (sL >= iSL) {
                this.isAllowRight = false;
                return;
            } else {
                this.innerIndex += 1;
            }

            if (tabList[this.innerIndex].offsetLeft + this.$refs.tabWrap.offsetWidth >= iSL) {
                this.isAllowRight = false;
            }

            this.isAllowLeft = true;
            this.$refs.tabWrap.scrollLeft = tabList[this.innerIndex].offsetLeft;

            this.$nextTick(() => {
                this.computedRightStyle();
            });
        },
        next() {
            // 下一个
            if (this.innerIndex === 0) {
                return;
            }

            this.innerIndex -= 1;
            if (this.innerIndex === 0) {
                this.isAllowLeft = false;
            }
            this.isAllowRight = true;
            this.$refs.tabWrap.scrollLeft = this.$refs.items[this.innerIndex].offsetLeft;
        },
        changeSelect(ccId, index) {
            this.$emit('changeSelect', index, ccId);
        },
    },
};
</script>
<style lang="less" scoped>
.article-tabs {
    position: relative;
    height: 64px;
    padding: 0 20px;
    line-height: 64px;
    overflow: hidden;
    background-color: #fff;

    &.over {
        padding: 0 64px;
    }

    .left,
    .right {
        position: absolute;
        width: 64px;
        height: 64px;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        img {
            width: 24px;
            height: 24px;
        }
    }

    .left {
        top: 0;
        left: 0;
        // background: linear-gradient(90deg, #ffffff 64%, rgba(255, 255, 255, 0.8) 36%);
        background-color: #fff;
    }

    .right {
        top: 0;
        right: 0;
        // background-image: linear-gradient(to left, #ffffff 64%, rgba(255, 255, 255, 0.8) 36%);
        background-color: #fff;
    }

    .tab-wrap {
        position: relative;
        display: flex;
        width: 100%;
        overflow: auto;
    }

    .tab {
        font-size: 16px;
        color: #333;
        cursor: pointer;
        flex-shrink: 0;

        .link {
            padding: 0 20px;
            font-size: 16px;
            color: #333;
            display: block;
            height: 100%;
        }
        &.this {
            color: #f8323c;
            font-weight: 700;

            .link {
                color: #f8323c;
                font-weight: 700;
            }
        }
    }
}
.bar {
    position: absolute;
    width: 22px;
    height: 4px;
    left: 0;
    bottom: 8px;
    opacity: 0;
    background-color: #f8323c;
    transition: all 0.3s ease-in;
}
</style>
