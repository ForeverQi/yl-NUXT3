<template>
    <div class="pages">
        <button type="button" class="btn-prev" :disabled="innerCurrentPage <= 1" @click="prev">上一页</button>
        <ul class="pager" @click="onPagerClick">
            <li :class="{ this: innerCurrentPage === 1 }" v-if="pageCount > 0" class="number">1</li>
            <li
                class="el-icon more btn-quickprev"
                :class="[quickprevIconClass]"
                v-if="showPrevMore"
                @mouseenter="onMouseenter('left')"
                @mouseleave="quickprevIconClass = 'el-icon-more'"
            ></li>
            <li class="number" v-for="pager in pagers" :key="pager" :class="{ this: innerCurrentPage === pager }">{{ pager }}</li>
            <li
                class="el-icon more btn-quicknext"
                :class="[quicknextIconClass]"
                v-if="showNextMore"
                @mouseenter="onMouseenter('right')"
                @mouseleave="quicknextIconClass = 'el-icon-more'"
            ></li>
            <li :class="{ this: innerCurrentPage === pageCount }" class="number" v-if="pageCount > 1">{{ pageCount }}</li>
        </ul>
        <button type="button" class="btn-next" :disabled="innerCurrentPage === 0 || innerCurrentPage === pageCount" @click="next">下一页</button>
    </div>
</template>
<script>
export default {
    name: 'Pagination',
    props: {
        currentPage: {
            type: Number,
            default: 1,
        },
        total: {
            // 总条数
            type: Number,
            default: 0,
        },
        pageSize: {
            // 一页显示多少条
            type: Number,
            default: 4,
        },
        pagerCount: {
            // 显示多少页码
            type: Number,
            default: 7,
        },
    },
    data() {
        return {
            innerCurrentPage: 1,
            current: null,
            showPrevMore: false,
            showNextMore: false,
            quicknextIconClass: 'el-icon-more',
            quickprevIconClass: 'el-icon-more',
        };
    },
    computed: {
        pageCount() {
            if (this.total <= 0) {
                return 1;
            }

            return Math.ceil(this.total / this.pageSize);
        },
        pagers() {
            const pagerCount = this.pagerCount;
            const halfPagerCount = (pagerCount - 1) / 2;

            const currentPage = Number(this.innerCurrentPage);
            const pageCount = Number(this.pageCount);

            let showPrevMore = false;
            let showNextMore = false;

            if (pageCount > pagerCount) {
                if (currentPage > pagerCount - halfPagerCount) {
                    showPrevMore = true;
                }

                if (currentPage < pageCount - halfPagerCount) {
                    showNextMore = true;
                }
            }

            const array = [];

            if (showPrevMore && !showNextMore) {
                const startPage = pageCount - (pagerCount - 2);
                for (let i = startPage; i < pageCount; i++) {
                    array.push(i);
                }
            } else if (!showPrevMore && showNextMore) {
                for (let i = 2; i < pagerCount; i++) {
                    array.push(i);
                }
            } else if (showPrevMore && showNextMore) {
                const offset = Math.floor(pagerCount / 2) - 1;
                for (let i = currentPage - offset; i <= currentPage + offset; i++) {
                    array.push(i);
                }
            } else {
                for (let i = 2; i < pageCount; i++) {
                    array.push(i);
                }
            }

            /**
             * 临时解决方案
             */
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.showPrevMore = showPrevMore;
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.showNextMore = showNextMore;

            return array;
        },
    },
    watch: {
        currentPage: {
            immediate: true,
            handler(val) {
                this.innerCurrentPage = Number(this.currentPage);
            },
        },
    },
    methods: {
        prev() {
            if (this.innerCurrentPage === 1) {
                return;
            }
            this.innerCurrentPage -= 1;
            this.$emit('pageChange', this.innerCurrentPage);
        },
        next() {
            if (this.innerCurrentPage === this.pageCount) {
                return;
            }
            this.innerCurrentPage += 1;
            this.$emit('pageChange', this.innerCurrentPage);
        },
        onPagerClick(event) {
            const target = event.target;
            if (target.tagName === 'UL') {
                return;
            }

            let newPage = Number(event.target.textContent);
            const pageCount = this.pageCount;
            const currentPage = this.innerCurrentPage;
            const pagerCountOffset = this.pagerCount - 2;

            if (target.className.indexOf('more') !== -1) {
                if (target.className.indexOf('quickprev') !== -1) {
                    newPage = currentPage - pagerCountOffset;
                } else if (target.className.indexOf('quicknext') !== -1) {
                    newPage = currentPage + pagerCountOffset;
                }
            }

            if (!isNaN(newPage)) {
                if (newPage < 1) {
                    newPage = 1;
                }

                if (newPage > pageCount) {
                    newPage = pageCount;
                }
            }

            if (newPage !== currentPage) {
                this.innerCurrentPage = newPage;
                this.$emit('pageChange', newPage);
            }
        },
        onMouseenter(direction) {
            if (direction === 'left') {
                this.quickprevIconClass = 'el-icon-d-arrow-left';
            } else {
                this.quicknextIconClass = 'el-icon-d-arrow-right';
            }
        },
    },
};
</script>
<style lang="less" scoped>
.pages {
    padding: 0;
    vertical-align: top;
    display: inline-block;
    margin: 0;
    user-select: none;
    list-style: none;
    font-size: 0;

    .btn-next,
    .btn-prev {
        display: inline-block;
        font-size: 13px;
        height: 28px;
        line-height: 28px;
        vertical-align: top;
        margin: 0 5px;
        background-color: #fff;
        color: #606266;
        min-width: 30px;
        border-radius: 2px;
        padding: 0 8px;
        cursor: pointer;
    }

    button:disabled {
        color: #c0c4cc;
        cursor: not-allowed;
    }

    .pager {
        user-select: none;
        list-style: none;
        display: inline-block;
        vertical-align: top;
        font-size: 0;
        padding: 0;
        margin: 0;

        li {
            padding: 0 4px;
            background: #fff;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            box-sizing: border-box;
            text-align: center;
            display: inline-block;
            cursor: pointer;

            &.number {
                margin: 0 5px;
                background-color: #fff;
                color: #606266;
                min-width: 30px;
                border-radius: 2px;
                padding: 0 4px;
                font-size: 13px;
                height: 28px;
                line-height: 28px;
                box-sizing: border-box;
                text-align: center;
            }

            &.this {
                background-color: #025eff;
                color: #fff;
                cursor: default;
            }
        }
    }
}
</style>
