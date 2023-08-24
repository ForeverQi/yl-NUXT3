<template>
    <div :class="['ss-wrapper', autoPosition ? 'ss-auto-wrapper' : '']" :id="popperId" :style="wrapperStyle" ref="ssWrapperList" v-show="show">
        <ul class="ss-list" ref="ssList" :style="listStyle">
            <li
                v-for="(item, index) in dataList"
                :class="['ss-item', item.isChecked ? 'ss-item-checked' : '']"
                :key="index"
                @click.prevent="handleItemClick(item, $event)"
            >
                {{ item.subjectName }}
            </li>
        </ul>
        <input v-if="isShowMore && isExpand === false" class="ss-more ss-expand" value="展开" type="button" @click.prevent="handleExpandClick" />
        <input v-else-if="isShowMore && isExpand" class="ss-more ss-collapse" value="收起" type="button" @click.prevent="handleCollapseClick" />
    </div>
</template>
<script>
export default {
    props: {
        dataList: {
            type: Array,
            default: () => [],
        },
        rect: {
            type: Object,
            default: () => {},
        },
        autoPosition: {
            type: Boolean,
            default: false,
        },
        offset: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            scrollHeight: 32,
            listStyle: {
                height: 'auto',
            },
            isExpand: false,
            wrapperStyle: {
                transform: 'none',
            },
            show: true,
        };
    },
    fetch() {
        this.$nextTick(() => {
            this.calIsShowMore();
            if (!this.autoPosition) {
                return;
            }
            const sl = getComputedStyle(this.$refs.ssWrapperList);
            const yOffset = window.pageYOffset || window.scrollY || 0;
            const leftOffset = this.offset?.left || 0;
            const topOffset = this.offset?.top || 0;

            if (this.rect.left >= parseFloat(sl.width)) {
                this.wrapperStyle.transform = `translate(${this.rect.left - 30 - parseInt(sl.width) + this.rect.width + leftOffset}px, ${
                    this.rect.top + this.rect.height + yOffset + topOffset
                }px)`;
            } else {
                this.wrapperStyle.transform = `translate(${this.rect.left + leftOffset}px, ${this.rect.top + this.rect.height + yOffset + topOffset}px)`;
            }
            this.show = !this.autoPosition;
        });
        return Promise.resolve();
    },
    computed: {
        isShowMore() {
            return this.scrollHeight > 190;
        },
        popperId() {
            return `popperId_${Date.now()}`;
        },
    },
    methods: {
        handleItemClick(item, $e) {
            this.dataList.forEach((element) => {
                element.isChecked = element.subjectId === item.subjectId;
            });
            this.isExpand = false;
            this.$emit('subject-change', item, $e);
            this.autoPosition && (this.show = false);
        },
        calIsShowMore() {
            this.scrollHeight = this.$refs.ssList?.scrollHeight ?? 32;
            if (this.scrollHeight < 190) {
                this.listStyle.height = 'auto';
            } else {
                this.listStyle.height = '190px';
            }
        },
        handleExpandClick() {
            this.listStyle.height = 'auto';
            this.isExpand = true;
        },
        handleCollapseClick() {
            this.listStyle.height = '190px';
            this.isExpand = false;
            this.noHide = true;
            setTimeout(() => {
                this.noHide = false;
            });
        },
    },
};
</script>
<style scoped lang="less">
.ss-wrapper {
    max-width: 800px;
    background-color: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 0 12px 0 rgb(58 61 75 / 10%);
    z-index: 4;
}

.ss-wrapper::after {
    content: ' ';
    width: 0px;
    height: 0px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent white transparent;
    position: absolute;
    top: -10px;
    right: 15px;
}

.ss-auto-wrapper {
    position: absolute;
    left: 0;
    top: 0;
}

.ss-list {
    overflow: hidden;
}
.ss-item {
    display: inline-block;
    font-size: 14px;
    padding: 3.5px 15px;
    margin: 10px 0;
    cursor: pointer;
}
.ss-item:hover {
    color: #ff2e30;
    border-radius: 13px;
}
.ss-item-checked {
    color: #ff2e30;
    background-color: #ffece8;
    border-radius: 13px;
}

.ss-more {
    color: #828496;
    font-size: 12px;
    background-color: transparent;
    float: right;
    border: none;
}
.ss-expand {
    margin-top: 5px;
    background: url('./asset/images/expand.png') right top 1px / 13px 13px no-repeat;
    padding-right: 15px;
}

.ss-collapse {
    background: url('./asset/images/collapse.png') right top 1px / 13px 13px no-repeat;
    padding-right: 15px;
}
</style>
