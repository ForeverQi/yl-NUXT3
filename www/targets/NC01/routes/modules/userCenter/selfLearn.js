export default [
    {
        path: '/uc',
        component: '@/www/pages/you-lu-edu/uc.vue',
        children: [
            {
                // 选择续学科目
                path: 'manager/self-learn/select-subject',
                name: 'selfLearnSelectSubject',
                component: '@/www/pages/you-lu-edu/uc/selfLearn/selectSubject/Index.vue',
            },
            {
                // 填写续学资料
                path: 'manager/self-learn/apply-add',
                name: 'addSelfLearn',
                component: '@/www/pages/you-lu-edu/uc/selfLearn/applyAdd/Index.vue',
            },
            {
                // 编辑续学资料
                path: 'manager/self-learn/apply-edit',
                name: 'editSelfLearn',
                component: '@/www/pages/you-lu-edu/uc/selfLearn/applyEdit/Index.vue',
            },
        ],
    },
];
