// 系统课
export default [
    {
        // 系统课 - 试听
        path: '/pro-course-tryout/:classtypeId',
        component: '@/www/pages/you-lu-edu/course/pro-course/audition.vue',
    },
    {
        // 系统课详情
        path: '/pro-course/detail/:classtypeId/:checked?',
        component: '@/www/pages/you-lu-edu/course/pro-course/detail.vue',
    },
    {
        // 系统课列表
        path: '/pro-course/:collegeSeoCode?/:projectId?/:ptagId?/:subjectId?',
        component: '@/www/pages/you-lu-edu/course/pro-course/index.vue',
    },
];
