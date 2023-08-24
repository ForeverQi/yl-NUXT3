<template>
    <div class="class-right">
        <template v-if="opt && opt.courseQrcode">
            <div class="class-right-top">
                <img src="./asset/images/right-share.png" alt="" class="right-share" />
                <!--扫一扫，关注服务更多好课等你体验！-->
                <div class="share-text">{{ opt.guideLanguage }}</div>
                <img :src="$urlUtils.getViewUrl(opt.courseQrcode)" alt="" class="qr-img" />
            </div>
            <div class="line"></div>
        </template>
        <div class="tab-box flex">
            <div :class="['tab-item', item.val == tabVal ? 'active' : '']" v-for="(item, index) in tabList" :key="index" @click="handleChageTab(item)">
                {{ item.name }}
            </div>
        </div>
        <keep-alive>
            <component :is="currentTabComponent" :class="opt && (opt.guideLanguage || opt.courseQrcode) ? 'list-box' : 'list-box1'"></component>
        </keep-alive>
    </div>
</template>
<script>
import classList from '../classList/index.vue';
import experienceList from '../experienceList/index.vue';
export default {
    name: 'classRightModel',
    components: { classList, experienceList },
    inject: ['copyOpt'],
    data() {
        return {
            currentTabComponent: 'class-list',
            tabList: [
                { name: '轻课列表', val: 1, components: 'class-list' },
                { name: '热推课程', val: 2, components: 'experience-list' },
            ],
            tabVal: 1,
            opt: null,
        };
    },
    computed: {
        computedCopyOpt() {
            return this.copyOpt();
        },
    },
    watch: {
        computedCopyOpt: {
            immediate: true,
            handler(val) {
                this.opt = val;
                this.handleChageTab(this.tabList[0]);
            },
        },
    },
    created() {},
    mounted() {},
    methods: {
        handleChageTab(item) {
            this.tabVal = item.val;
            this.currentTabComponent = item.components;
        },
    },
};
</script>
<style lang="less" scoped>
.class-right {
    width: 316px;
    .class-right-top {
        display: flex;
        align-items: flex-end;
        position: relative;
        padding: 10px 16px 0;
        .right-share {
            display: block;
            width: 134px;
            height: 104px;
            margin-right: 9px;
        }
        .share-text {
            font-size: 14px;
            color: #eee;
            line-height: 19px;
            margin-bottom: 10px;
            word-break: break-all;
        }
        .qr-img {
            position: absolute;
            width: 60px;
            height: 60px;
            display: block;
            top: 49px;
            left: 82px;
        }
    }
    .line {
        height: 1px;
        background-color: #393e48;
        margin: 0 16px;
    }
    .tab-box {
        height: 65px;
        padding: 27px 0 6px;
        .tab-item {
            padding: 0px 16px 6px;
            line-height: 21px;
            font-size: 16px;
            color: #eeeeee;
            position: relative;
            margin-right: 18px;
            cursor: pointer;
        }
        .active {
            color: #025eff;
        }
        .active:after {
            content: '';
            width: 20px;
            height: 4px;
            position: absolute;
            left: 50%;
            bottom: 0px;
            transform: translateX(-50%);
            background-color: #025eff;
            border-radius: 2px;
        }
    }
    .list-box {
        width: 100%;
        height: 372px;
        overflow-y: auto;
    }
    .list-box1 {
        width: 100%;
        height: 486px;
        overflow-y: auto;
    }
}
</style>
