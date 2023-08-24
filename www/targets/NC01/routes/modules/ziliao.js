// 资料
export default [
    {
        // 资料搜索
        path: '/ziliao/search/:projectSeoCode?',
        component: '@/www/pages/you-lu-edu/ziliao/search/index.vue',
    },
    {
        // 资料包-资料详情
        path: '/ziliao/detail/pack-:packId/doc-:docId',
        component: '@/www/pages/you-lu-edu/ziliao/single-detail/index.vue',
    },
    {
        // 资料列表-单个详情页面
        path: '/ziliao/detail/doc-:docId',
        component: '@/www/pages/you-lu-edu/ziliao/single-detail/index.vue',
    },
    {
        // 资料包列表
        path: '/ziliao/detail/pack-:packId',
        component: '@/www/pages/you-lu-edu/ziliao/package-detail/index.vue',
    },
    {
        // 资料列表初始进入
        path: '/ziliao/:args*',
        component: '@/www/pages/you-lu-edu/ziliao/index.vue',
    },
];
