// 体验课
export default [
    {
        // 体验详情
        path: '/trial-course/detail/:id',
        component: '@/www/pages/you-lu-edu/course/trial-course/detail.vue',
    },
    {
        // 体验列表
        path: '/trial-course/:collegeSeoCode?/:projectSeoCode?/:ptagId?/:subjectSeocode?/:optId?',
        component: '@/www/pages/you-lu-edu/course/trial-course/index.vue',
    },
];
