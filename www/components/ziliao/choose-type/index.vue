<template>
    <div class="choose-type">
        <p class="type">选择类型：</p>
        <div class="type-list">
            <div class="type-item" :class="{ active: type === '' }" @click="chooseType('', $event)">全部</div>
            <div class="type-item" :class="{ active: type === 'Y' }" @click="chooseType('Y', $event)">资料包</div>
            <div class="type-item" :class="{ active: type === 'N' }" @click="chooseType('N', $event)">单条资料</div>
        </div>
    </div>
</template>
<script>
/**
 * change-pack-status 获取选中的类型
 */
export default {
    props: {
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            type: '',
        };
    },
    fetch() {
        return Promise.resolve();
    },
    watch: {
        value: {
            immediate: true,
            handler(val) {
                this.type = val;
            },
        },
    },
    methods: {
        //切换类型
        chooseType(type, e) {
            const oldType = this.type;
            if (oldType === type) {
                return;
            }
            this.type = type;
            this.$emit('input');
            this.$emit('change-pack-status', type, e);
        },
    },
};
</script>
<style lang="less" scoped>
.choose-type {
    display: flex;
    margin-bottom: 15px;
    .type {
        font-size: 16px;
        color: #3a3d4b;
        margin-right: 20px;
    }
    .type-list {
        display: flex;
        align-items: center;
    }
    .type-item {
        padding: 6px 16px;
        font-size: 14px;
        color: #3a3d4b;
        line-height: 20px;
        margin-right: 8px;
        cursor: pointer;
        text-align: center;
        &:hover {
            color: #ff2e30;
        }
        &.active {
            background: #ffece8;
            border-radius: 4px;
            color: #ff2e30;
        }
        &:last-child {
            margin-right: 0;
        }
    }
}
</style>
