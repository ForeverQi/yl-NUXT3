<template>
    <div class="bread-crumb">
        <span v-for="(item, index) in breadCrumbList" :key="index">
            <span v-if="index !== breadCrumbList.length - 1">
                <span @click="toRoute" class="bread-name">{{ item.name }}</span>
                <img src="../asset/images/right-icon.png" class="right-icon" alt="" />
            </span>
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
            default: '',
        },
        projectChannelName: {
            type: String,
            default: '项目频道',
        },
        isBackHome: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            firstName: '',
            breadCrumbList: [],
        };
    },
    fetch() {
        return Promise.resolve();
    },
    watch: {
        projectChannelName: {
            handler() {
                this.firstName = this.projectChannelName;
                if (this.isBackHome) {
                    this.firstName = '优路首页';
                }
                this.breadCrumbList = [{ name: this.firstName }, { name: this.columnName }];
            },
        },
        columnName: {
            handler() {
                this.firstName = this.projectChannelName;
                if (this.isBackHome) {
                    this.firstName = '优路首页';
                }
                this.breadCrumbList = [{ name: this.firstName }, { name: this.columnName }];
            },
        },
    },
    mounted() {
        this.firstName = this.projectChannelName;
        if (this.isBackHome) {
            this.firstName = '优路首页';
        }
        this.breadCrumbList = [{ name: this.firstName }, { name: this.columnName }];
    },
    methods: {
        toRoute() {
            if (this.isBackHome) {
                this.$PageUtil.goHome();
                return;
            }
            const { channelCode } = this.$route.params;
            this.$PageUtil.openNewPage(`/channel/${channelCode}`);
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
