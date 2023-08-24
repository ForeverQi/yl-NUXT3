export default [
    {
        path: '/uc',
        component: '@/www/pages/you-lu-edu/uc.vue',
        children: [
            {
                path: 'manager/personalCenter/logoutConfirm',
                component: '@/www/pages/you-lu-edu/uc/manager/logout/logoutConfirm/index.vue',
            },
            {
                path: 'manager/personalCenter/logoutReason',
                component: '@/www/pages/you-lu-edu/uc/manager/logout/logoutReason/index.vue',
            },
            {
                path: 'manager/personalCenter/logoutExamine',
                component: '@/www/pages/you-lu-edu/uc/manager/logout/logoutExamine/index.vue',
            },
        ],
    },
];
