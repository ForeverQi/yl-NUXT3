<template>
    <div class="bread-crumb" v-if="breadCrumbList">
        <span v-for="(item, index) in breadCrumbList" :key="index">
            <div v-if="index !== breadCrumbList.length - 1">
                <span @click="toRoute" class="bread-name">{{ item.name }}</span>
                <img src="../../asset/images/right-icon.png" class="right-icon" alt="" />
            </div>
            <span v-if="index === breadCrumbList.length - 1" class="last-bread-name">{{ item.name }}</span>
        </span>
    </div>
</template>
<script>
/**
 * 页面标签组件
 */
export default {
    name: 'ArtileListBookmark',
    props: {
        columnName: {
            type: String,
            default: '资讯',
        },
    },
    computed: {
        breadCrumbList() {
            return [{ name: '优路首页' }, { name: this.columnName }];
        },
    },
    methods: {
        toRoute() {
            this.$PageUtil.href('/');
        },
    },
};
</script>
<style lang="less" scoped>
.bread-crumb {
    width: 1200px;
    height: 56px;
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .bread-name {
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: #99a1af;
        line-height: 19px;
        cursor: pointer;
    }
    .right-icon {
        width: 6px;
        height: 11px;
        margin-right: 16px;
    }
    .last-bread-name {
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: #53586c;
        line-height: 19px;
    }
}
</style>
