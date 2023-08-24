<template>
    <div class="menu-box">
        <div class="menu-top flex jc-between ai-center">
            <div class="flex ai-center">
                <div class="line"></div>
                <div class="menu-title">课程目录</div>
            </div>
            <div class="class-num">共{{ count }}节</div>
        </div>
        <!-- 单节 -->
        <only-menu-list
            v-if="type === '1'"
            :list="list"
            @play="handlePlayVideo"
            @freePopupShow="handleFreePopupShow"
            @payPopupShow="handlePayPopupShow"
        ></only-menu-list>
        <!-- 多节  -->
        <more-menu-list
            v-else-if="type === '2'"
            :list="list"
            @play="handlePlayVideo"
            @freePopupShow="handleFreePopupShow"
            @payPopupShow="handlePayPopupShow"
        ></more-menu-list>
    </div>
</template>
<script>
import onlyMenuList from '../only-menu-list';
import moreMenuList from '../more-menu-list';
export default {
    name: 'menuModel',
    components: {
        onlyMenuList,
        moreMenuList,
    },
    props: {
        list: {
            type: Array,
            default: () => {
                return [];
            },
        },
        type: {
            type: String,
            default: '', //1 单节 2 多节
        },
    },
    computed: {
        count() {
            if (this.type === '2') {
                return this.list.map((item) => item.coursewareList).flat(Number.POSITIVE_INFINITY).length;
            }
            return this.list.flat(Number.POSITIVE_INFINITY).length;
        },
    },
    methods: {
        handlePlayVideo(item) {
            console.log('menuBox', item);
            this.$emit('play', item);
        },
        handleFreePopupShow(val) {
            console.info('handleFreePopupShow', val);
            this.$emit('freePopupShow', val);
        },
        handlePayPopupShow(val) {
            console.info('handlePayPopupShow', val);
            this.$emit('payPopupShow', val);
        },
    },
};
</script>
<style lang="less" scoped>
.menu-box {
    .menu-top {
        padding: 0 16px;
        height: 53px;
        .line {
            width: 3px;
            height: 16px;
            margin-right: 9px;
            background-color: #ff2e30;
            border-radius: 1px;
        }
        .menu-title {
            line-height: 21px;
            font-size: 16px;
            color: #fff;
            font-weight: bold;
        }
        .class-num {
            font-size: 14px;
            line-height: 14px;
            color: #9698a2;
        }
    }
    .menu-list {
        padding: 0 16px 0;
        .active {
            /deep/ .menu-item {
                background-color: #3f4060;
            }
        }
        .more-menu-title {
            margin-bottom: 14px;
            .list-title {
                font-size: 14px;
                line-height: 15px;
                color: #fff;
                font-weight: bold;
            }
            .menu-title-img {
                display: block;
                width: 16px;
                height: 16px;
                cursor: pointer;
            }
        }
    }
}
</style>
