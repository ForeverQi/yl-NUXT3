<template>
    <div class="article-list-container">
        <div v-for="(item, index) in articleList" :key="index">
            <ArticleListItem
                :article-data="item"
                :is-last-article="index === articleList.length - 1"
                :to-router-path="toRouterPath"
                v-bind="$attrs"
            ></ArticleListItem>
        </div>
    </div>
</template>
<script>
import ArticleListItem from '@/www/components/article-list/article-list-item/index.vue';
export default {
    components: {
        ArticleListItem,
    },
    props: {
        articleList: {
            type: Array,
            default: () => {
                return [];
            },
        },
        toRouterPath: {
            type: String,
            default: '',
        },
    },
    fetch() {
        return Promise.resolve();
    },
};
</script>
<style lang="less" scoped>
.article-list-container {
    width: 100%;
}
</style>
