<template>
    <div class="bread-crumb-box">
        <div v-for="(item, index) in list" :key="index" class="bread-item" @click="handleClick(item)">
            <span :class="item.url ? 'pointer' : ''">{{ item.name }}</span>
            <span class="pr16 pl4 icon-nav">></span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'breadCrumbModel',
    components: {},
    props: {
        list: {
            type: Array,
            default: () => {
                return [
                    {
                        name: '',
                        url: '',
                    },
                ];
            },
        },
    },
    data() {
        return {
            len: -1,
        };
    },
    methods: {
        handleClick(item) {
            this.$emit('click', item);
        },
    },
};
</script>
<style lang="less" scoped>
.bread-crumb-box {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 14px;
    height: 66px;
    padding: 27px 0 20px 0;
    .pl4 {
        padding-left: 4px;
    }
    .pr16 {
        padding-right: 16px;
        color: rgba(255, 255, 255, 0.5);
    }
    .pointer {
        cursor: pointer;
        color: rgba(255, 255, 255, 0.5);
    }
    .bread-item:last-child .icon-nav {
        display: none;
    }
}
</style>
