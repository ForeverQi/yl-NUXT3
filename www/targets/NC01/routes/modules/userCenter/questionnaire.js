export default [
    {
        path: '/uc',
        component: '@/www/pages/you-lu-edu/uc.vue',
        children: [
            {
                path: 'manager/cmt',
                component: '@/www/pages/you-lu-edu/uc/manager/appraise/QuestionnaireLayout/index.vue',
                children: [
                    {
                        path: 'allCmt',
                        component: '@/www/pages/you-lu-edu/uc/manager/appraise/AllCmt/index.vue',
                    },
                    {
                        path: 'awaitCmt',
                        component: '@/www/pages/you-lu-edu/uc/manager/appraise/AwaitCmt/index.vue',
                    },
                    {
                        path: 'yetCmt',
                        component: '@/www/pages/you-lu-edu/uc/manager/appraise/YetCmt/index.vue',
                    },
                ],
            },
            {
                path: 'manager/cmt/answerCmt/:id',
                component: '@/www/pages/you-lu-edu/uc/manager/appraise/AnswerCmt/index.vue',
            },
            {
                path: 'manager/cmt/answerInfo/:id',
                component: '@/www/pages/you-lu-edu/uc/manager/appraise/InfoCmt/index.vue',
            },
        ],
    },
];
