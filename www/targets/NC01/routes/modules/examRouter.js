// 题库路由
const examRouters = [
    {
        path: '/exam/index',
        desc: '题库首页',
        component: '@/www/pages/you-lu-edu/exam/index.vue',
        children: [
            {
                path: 'choose/:source?',
                name: 'exam-choose',
                desc: '选择学院-项目',
                component: '@/www/pages/you-lu-edu/exam/choose-exam/index.vue',
                meta: {
                    noProject: true,
                },
            },
            {
                path: 'list',
                redirect: '/exam/index',
            },
            {
                path: 'list/:classUniquecode/:ptagId/:papertypeCode/:subjectId?',
                name: 'exam-list',
                desc: '题库列表',
                component: '@/www/pages/you-lu-edu/exam/exam-list/index.vue',
            },
            {
                path: 'collection/:memberpapertypeCode/:classUniquecode/:ptagId/:papertypeCode/:subjectId?',
                name: 'exam-collection',
                desc: '错题本/收藏夹/练习记录',
                component: '@/www/pages/you-lu-edu/exam/collection-exam/index.vue',
            },
            {
                path: 'daily/practice/:classUniquecode/:ptagId/:papertypeCode/:subjectId',
                // name: 'exam-daily-practice',
                desc: '每日一练',
                component: '@/www/pages/you-lu-edu/exam/daily-practice/index.vue',
            },
            {
                path: 'activity/doing/:classUniquecode/:ptagId/:papertypeCode/:subjectId',
                // name: 'exam-activity-doing',
                desc: '活动刷题',
                component: '@/www/pages/you-lu-edu/exam/activity-doing/index.vue',
            },
        ],
    },
];

export default examRouters;
