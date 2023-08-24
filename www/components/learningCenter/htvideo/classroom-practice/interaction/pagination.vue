<template>
    <div class="pages" @click="onPagerClick">
        <div class="page pageItem prevMore" v-if="dataCnt > pagerCount">&lt;</div>
        <div
            class="page pageItem"
            :class="[currentPage + 1 == item ? 'cur' : '', pageData[index] && pageData[index].styleClass ? pageData[index].styleClass : '']"
            v-for="(item, index) in pagers"
            :key="item"
        >
            {{ item }}
        </div>
        <div class="page pageItem nextMore" v-if="dataCnt > pagerCount">&gt;</div>
    </div>
</template>
<script>
export default {
    props: {
        currentPage: {
            type: Number,
            default: 0,
        },
        pageData: {
            type: Array,
            default() {
                return [];
            },
        },
        pagerCount: {
            // 每页显示页码数量
            type: Number,
            default: 8,
        },
    },
    data() {
        return {
            leftArrowClass: 'el-icon-more',
            rightArrowClass: 'el-icon-more',
            dataCnt: this.pageData.length, // 总页码数
            // startNum: 0,
            // endNum: 8,
            showPrevMore: false,
            showNextMore: false,
        };
    },
    computed: {
        startNum() {
            return Math.floor(this.currentPage / this.pagerCount) * this.pagerCount;
        },
        endNum() {
            let endNum = this.startNum + this.pagerCount;
            return Math.min(endNum, this.dataCnt);
        },
        pagers() {
            let array = [];
            // let endNum = this.startNum + this.pagerCount;
            // this.endNum = Math.min(endNum, this.dataCnt);

            for (let i = this.startNum; i < this.endNum; i++) {
                array.push(i + 1);
            }

            return array;
        },
    },
    methods: {
        onPagerClick(event) {
            const target = event.target;
            if (target.className.indexOf('pageItem') === -1) {
                return;
            }

            let newPage = Number(target.textContent);
            let pageCount = this.dataCnt;
            let currentPage = this.currentPage + 1;
            // let pagerCountOffset = this.pagerCount - 2;

            if (target.className.indexOf('prevMore') !== -1) {
                if (currentPage !== 8 && currentPage % this.pagerCount == 0) {
                    currentPage -= 1;
                }
                newPage = Math.floor(currentPage / this.pagerCount) * this.pagerCount;
                if (currentPage == 8) {
                    newPage = 1;
                }
            } else if (target.className.indexOf('nextMore') !== -1) {
                newPage = Math.ceil(currentPage / this.pagerCount) * this.pagerCount + 1;
            }

            if (!isNaN(newPage)) {
                if (newPage < 1) {
                    newPage = 1;
                }

                if (newPage > pageCount) {
                    newPage = pageCount;
                }
            }

            this.$emit('change', newPage - 1);
        },
    },
};
</script>
<style lang="less" scoped>
.pages {
    display: flex;
    flex-direction: row;

    .ellipsis {
        color: #8e93ff;
        margin-right: 10px;
    }
    .page {
        border: 1px solid #8e93ff;
        width: 40px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        color: #8e93ff;
        font-size: 16px;
        margin-right: 10px;
        border-radius: 4px;
        cursor: pointer;
        box-sizing: border-box;

        &.right {
            border: none;
            padding: 1px;
            background: linear-gradient(123deg, #11d7cc 0%, #06b588 94%);
            color: #ffffff;
        }

        &.wrong {
            border: none;
            padding: 1px;
            background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
            color: #ffffff;
        }

        &.cur {
            padding: 0;
            border: 1px solid #f8323c;
        }
    }
}
</style>
