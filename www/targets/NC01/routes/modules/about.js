export default [
    {
        path: '/about',
        redirect: '/about/youlu',
        component: '@/www/pages/you-lu-edu/public/about/index.vue',
        children: [
            {
                path: 'youlu',
                component: '@/www/pages/you-lu-edu/public/about-youlu/index.vue',
            },
            {
                path: 'culture',
                component: '@/www/pages/you-lu-edu/public/about-culture/index.vue',
            },
            {
                path: 'contact',
                component: '@/www/pages/you-lu-edu/public/about-contact/index.vue',
            },
            {
                path: 'article/:columnId?',
                component: '@/www/pages/you-lu-edu/public/about-article/index.vue',
            },
            {
                path: 'qualification/:columnId?',
                component: '@/www/pages/you-lu-edu/public/qualification/index.vue',
            },
            {
                path: 'join-us/:columnId?',
                component: '@/www/pages/you-lu-edu/public/join-us/index.vue',
            },
        ],
    },
    {
        path: '/help/:columnId?/:articleId?',
        component: '@/www/pages/you-lu-edu/public/help-center/index.vue',
    },
];
