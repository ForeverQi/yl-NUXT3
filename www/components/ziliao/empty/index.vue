<template>
    <div class="content-empty">
        <template v-if="listType === 'offline'">
            <img src="./asset/images/offline.png" alt="" />
            <p class="empty-text">您的网络开小差了，刷新页面再试一次～</p>
            <p class="empty-btn" @click="refresh">刷新试试</p>
        </template>
        <template v-else-if="listType === 'fail'">
            <img src="./asset/images/offline.png" alt="" />
            <p class="empty-text">内容加载失败，请刷新页面</p>
            <p class="empty-btn" @click="refresh">刷新试试</p>
        </template>
        <!-- 资料详情不支持在线预览 -->
        <template v-else-if="['single-no-preview', 'single-change-fail'].includes(listType)">
            <img src="./asset/images/no-preview.png" alt="" />
            <p class="empty-text" v-if="listType === 'single-no-preview'">本资料暂不支持在线预览哦，下载后观看吧！</p>
            <p class="empty-text" v-if="listType === 'single-change-fail'">这个资料有点羞，快去下载资料揭露它的真容吧！</p>
        </template>
        <template v-else-if="listType === 'search'">
            <img src="./asset/images/empty.png" alt="没有资料" />
            <p class="empty-text empty-text-search">
                末找到“
                <span style="color: #ff2e30">{{ tag }}</span>
                ”相关内容
            </p>
            <p class="empty-text-search-change">换个关键词，再搜索吧</p>
        </template>
        <template v-else-if="listType === 'searchLoading'">
            <img src="./asset/images/empty.png" alt="没有资料" />
            <p class="empty-text empty-text-search" style="visibility: hidden">
                末找到“
                <span style="color: #ff2e30">{{ tag }}</span>
                ”相关内容
            </p>
            <p class="empty-text-search-change" style="visibility: hidden">换个关键词，再搜索吧</p>
        </template>
        <template v-else>
            <img src="./asset/images/empty.png" alt="" />
            <!-- 资料列表 -->
            <p class="empty-text" v-if="listType === 'all'">暂无资料，去看看其他考试的资料吧</p>
            <!-- 我的资料列表 -->
            <p class="empty-text" v-if="listType === 'my'">您还未购买资料</p>
            <!-- 资料包 -->
            <p class="empty-text" v-if="listType === 'package-empty'">暂无资料，去看看其他资料吧</p>
            <p class="empty-text" v-if="listType === 'package-status-n'">该资料已下架</p>
            <p class="empty-btn" v-if="['package-empty', 'package-status-n'].includes(listType)" @click="goBackToList">返回资料</p>
            <!-- 资料详情 -->
            <p class="empty-text" v-if="listType === 'single-status-n'">该资料已下架</p>
            <p class="empty-btn" v-if="listType === 'single-status-n'" @click="goBackToList">返回资料</p>
        </template>
    </div>
</template>
<script>
export default {
    name: 'information-empty',
    props: {
        /**
         * offline 网络;
         * fail 接口调用失败;
         * all 资料列表;
         * my 我的资料列表;
         * package-empty 资料包下没有资料;
         * package-status-n 资料包失效(禁用或删除);
         * single-no-preview 资料详情-不支持预览;
         * single-change-fail 资料详情-转换失败;
         * single-status-n 资料失效(禁用或删除);
         * */
        listType: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            default: '',
        },
    },
    fetch() {
        return Promise.resolve();
    },
    methods: {
        //返回资料列表
        goBackToList() {
            this.$router.push('/ziliao');
        },
        //刷新试试
        refresh() {
            this.$PageUtil.reflush();
        },
    },
};
</script>
<style lang="less" scoped>
.content-empty {
    box-sizing: border-box;
    width: 852px;
    height: 580px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
        width: 260px;
        height: 180px;
        margin-bottom: 16px;
    }
    .empty-text {
        font-size: 14px;
        line-height: 19px;
        text-align: left;
        color: #3a3d4b;
    }
    .empty-text-search-change {
        color: #8d90aa;
        font-size: 12px;
        margin-top: 4px;
    }
    .empty-btn {
        margin-top: 40px;
        line-height: 39px;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        color: #fff;
        border-color: #ff737a;
        width: 136px;
        height: 38px;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 29px;
    }
}
</style>
