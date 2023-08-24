export default [
    {
        path: '/article-detail/:articleId',
        component: '@/www/pages/you-lu-edu/article/article-detail/index.vue',
    },
    {
        path: '/article-info/:channelCode/:projectCode/:articleId',
        component: '@/www/pages/you-lu-edu/article/article-info/index.vue',
    },
    {
        path: '/article-list/:channelCode/:projectCode/:columnId?/:artProvinceId?',
        component: '@/www/pages/you-lu-edu/article/article-list/index.vue',
    },
    {
        path: '/hot-article-list/:columnCode/:columnId?/:artProvinceId?',
        component: '@/www/pages/you-lu-edu/article/hot-article-list/index.vue',
    },
    {
        path: '/project-article-list/:projectCode/:columnId?/:artProvinceId?',
        component: '@/www/pages/you-lu-edu/article/project-article-list/index.vue',
    },
    {
        path: '/search-article-list/:projectCode/:channelCode',
        component: '@/www/pages/you-lu-edu/article/search-article-list/index.vue',
    },
];
