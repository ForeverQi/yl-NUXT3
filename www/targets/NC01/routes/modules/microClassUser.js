export default [
    {
        // 轻学小知识
        path: '/agile-course/knowledge/:courseId',
        component: '@/www/pages/you-lu-edu/microClassUser/lightClass/index.vue',
    },
    {
        // 体验课
        name: 'experienceClass',
        path: '/agile-course/course/:courseId',
        component: '@/www/pages/you-lu-edu/microClassUser/experienceClass/index.vue',
    },
    {
        // 直播间
        name: 'liveroomDetail',
        path: '/agile-course/live-broadcast/:liveId',
        component: '@/www/pages/you-lu-edu/microClassUser/liveroomDetail/index.vue',
    },
    {
        // 我的课程
        name: 'myCourse',
        path: '/agile-course/my-course',
        component: '@/www/pages/you-lu-edu/microClassUser/myCourse/index.vue',
    },
    {
        // 我的预约
        name: 'myAppointment',
        path: '/agile-course/my-live-booking',
        component: '@/www/pages/you-lu-edu/microClassUser/myAppointment/index.vue',
    },
    {
        // 我的收藏
        name: 'myCollection',
        path: '/agile-course/my-collection',
        component: '@/www/pages/you-lu-edu/microClassUser/myCollection/index.vue',
    },
    {
        // 我的订单
        name: 'myOrder',
        path: '/agile-course/my-order',
        component: '@/www/pages/you-lu-edu/microClassUser/myOrder/index.vue',
    },
    /* 一直再最后一个 */
    {
        // 微课首页
        name: 'mcuIndex',
        path: '/agile-course/:projectId?',
        component: '@/www/pages/you-lu-edu/microClassUser/Index/index.vue',
    },
];
