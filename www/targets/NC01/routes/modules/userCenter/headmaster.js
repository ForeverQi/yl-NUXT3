export default [
    {
        path: '/uc',
        component: '@/www/pages/you-lu-edu/uc.vue',
        children: [
            {
                path: 'manager/headmaster',
                component: '@/www/pages/you-lu-edu/uc/manager/headmaster/index.vue',
            },
            {
                path: 'manager/headmaster/evaluate/:teacherId',
                component: '@/www/pages/you-lu-edu/uc/manager/headmaster/record/index.vue',
            },
        ],
    },
];
