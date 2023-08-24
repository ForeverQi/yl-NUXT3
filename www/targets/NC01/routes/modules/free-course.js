// 公开课
export default [
    {
        // 公开课详情
        path: '/free-course/detail/:liveId',
        component: '@/www/pages/you-lu-edu/course/free-course/detail/index.vue',
    },
    {
        // 公开课列表
        path: '/free-course/:collegeSeoCode?/:projectSeoCode?/:ptagId?/:subjectSeocode?/:optId?',
        component: '@/www/pages/you-lu-edu/course/free-course/index/index.vue',
    },
];
