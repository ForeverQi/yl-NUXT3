export default [
    {
        // 公开课直播页
        path: '/inside/user/livePage',
        component: '@/www/pages/you-lu-edu/inside/live-page/index.vue',
    },
    {
        // 系统课直播页（PC，PC客户端）
        path: '/inside/user/dotLivePage',
        component: '@/www/pages/you-lu-edu/inside/do-live-page/index.vue',
    },
    {
        // 微课直播页面,用于体验课
        path: '/inside/user/mcpLivePage',
        component: '@/www/pages/you-lu-edu/inside/mcp-live-page/index.vue',
    },
    {
        // 24/48小时退款申请
        path: '/inside/user/uc/refund-hours',
        component: '@/www/pages/you-lu-edu/userCenter/order/refund-hours/index.vue',
    },
    {
        // 退费申请
        path: '/inside/user/uc/refund',
        component: '@/www/pages/you-lu-edu/userCenter/order/refund/index.vue',
    },
    {
        // 退费申请
        path: '/inside/user/uc/re-reading',
        component: '@/www/pages/you-lu-edu/userCenter/order/re-reading/index.vue',
    },
    {
        //不需要登录 app系统课直播页（用于app，小程序）
        path: '/inside/public/live/middle/page',
        component: '@/www/pages/you-lu-edu/inside/do-live-middle-page/index.vue',
    },
];
