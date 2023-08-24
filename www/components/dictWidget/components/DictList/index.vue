<template>
    <div class="list">
        <div class="item" v-for="(item, index) in list" :key="index" :class="{ active: activeIndex === index }" @click="tapActive(item, index)">
            <div class="title">
                <span class="title-content" v-html="item.names"></span>
                <span class="subject-name">{{ item.subjectName }}</span>
            </div>
            <div v-if="item.context" class="content" v-html="item.context"></div>
            <div v-else class="content-tips">点击查看详情</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dict-list',
    props: {
        // 词点列表
        list: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            activeIndex: null, // 点击选中的index
        };
    },
    methods: {
        // 点击条目
        tapActive(item, index) {
            this.activeIndex = index;
            this.$emit('tap-active', item);
        },
    },
};
</script>

<style scoped lang="less">
.list {
    padding: 0 4px 10px;
    box-sizing: border-box;
}

.item {
    padding: 16px;
    box-sizing: border-box;
    cursor: pointer;

    .title {
        margin-bottom: 6px;

        .title-content {
            display: inline-block;
            font-size: 18px;
            font-weight: 700;
            word-break: break-all;
            margin-top: 8px;
        }

        .subject-name {
            float: right;
            font-size: 14px;
            padding: 5px 16px;
            color: #f8323c;
            background: rgba(248, 50, 60, 0.04);
            border: 1px solid rgba(248, 50, 60, 0.5);
            border-radius: 24px;
            text-align: center;
            margin-left: 10px;
        }

        &:after {
            content: '';
            clear: both;
            display: block;
        }
    }

    .content {
        font-size: 14px;
        line-height: 20px;
    }

    .content-tips {
        color: #3a3d4b;
        font-size: 14px;
        line-height: 20px;
    }

    &:hover,
    &.active {
        background: #f5f6f9;
        border-radius: 8px;
    }
}
</style>
