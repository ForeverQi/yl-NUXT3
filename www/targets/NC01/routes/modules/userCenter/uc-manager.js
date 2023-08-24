export default [
    {
        path: '/uc/manager/order',
        redirect: '/uc/manager/order/orderClass',
    },
    {
        path: '/uc/manager',
        redirect: '/uc/manager/order/orderClass',
    },
    {
        path: '/uc/manager/personalCenter',
        redirect: '/uc/manager/personalCenter/personalInfo',
    },
    {
        path: '/uc/manager/order/check',
        component: '@/www/pages/you-lu-edu/uc/manager/order/checkOrder/index.vue',
    },
    {
        path: '/uc/manager/order/payDetail/:traderecordId',
        component: '@/www/pages/you-lu-edu/uc/manager/order/payDetail/index.vue',
    },
    {
        path: '/uc/manager/order/payMiddle',
        component: '@/www/pages/you-lu-edu/uc/manager/order/payMiddle/index.vue',
    },
    {
        path: '/uc/manager/order/payMinsheng/:traderecordId',
        component: '@/www/pages/you-lu-edu/uc/manager/order/orderPayMinsheng/index.vue',
    },
    {
        path: '/uc/manager/order/payKFQ/:traderecordId',
        component: '@/www/pages/you-lu-edu/uc/manager/order/orderPayKFQ/index.vue',
    },
    {
        path: '/uc/manager/order/paySuccess',
        component: '@/www/pages/you-lu-edu/uc/manager/order/paySuccess/index.vue',
    },
    {
        path: '/uc/manager/order/payFail',
        component: '@/www/pages/you-lu-edu/uc/manager/order/payFail/index.vue',
    },
    {
        path: '/uc/manager/order/payAbnormal',
        component: '@/www/pages/you-lu-edu/uc/manager/order/payAbnormal/index.vue',
    },
    {
        path: '/uc/manager/order/kongBai',
        component: '@/www/pages/you-lu-edu/uc/manager/order/kongBai/index.vue',
    },
    {
        path: '/uc',
        component: '@/www/pages/you-lu-edu/uc.vue',
        children: [
            {
                path: 'manager/order',
                component: '@/www/pages/you-lu-edu/uc/manager/order.vue',
                children: [
                    {
                        path: 'orderEducation',
                        component: '@/www/pages/you-lu-edu/userCenter/order/education-order-list/index.vue',
                    },
                    {
                        path: 'orderClass',
                        component: '@/www/pages/you-lu-edu/uc/manager/order/orderClass/index.vue',
                    },
                    {
                        path: 'orderCourse',
                        component: '@/www/pages/you-lu-edu/uc/manager/order/orderCourse/index.vue',
                    },
                    {
                        path: 'orderExperience',
                        component: '@/www/pages/you-lu-edu/uc/manager/order/orderExperience/index.vue',
                    },
                    {
                        path: 'orderOther',
                        component: '@/www/pages/you-lu-edu/uc/manager/order/orderOther/index.vue',
                    },
                ],
            },
            {
                path: 'manager/orderEducationDetail/:orderId',
                component: '@/www/pages/you-lu-edu/userCenter/order/education-order-detail/index.vue',
            },
            {
                path: 'manager/orderEducationConfirm/:orderId',
                component: '@/www/pages/you-lu-edu/userCenter/order/education-order-confirm/index.vue',
            },
            {
                // 申请续学
                path: 'manager/apply',
                name: 'uc-manager-apply',
                component: '@/www/pages/you-lu-edu/uc/manager/apply/index.vue',
            },
            {
                // 续学详情
                path: 'manager/apply/detail',
                name: 'uc-manager-apply-detail',
                component: '@/www/pages/you-lu-edu/uc/manager/apply/detail/index.vue',
            },
            {
                // 续学成功
                path: 'manager/apply/success',
                name: 'uc-manager-apply-success',
                component: '@/www/pages/you-lu-edu/uc/manager/apply/success.vue',
            },
            {
                // 图书赠课
                path: 'manager/booksGivings',
                component: '@/www/pages/you-lu-edu/uc/manager/booksGivings/index.vue',
            },
            {
                // 学习卡开课
                path: 'manager/classBegin',
                component: '@/www/pages/you-lu-edu/uc/manager/classBegin/index.vue',
            },
            {
                path: 'manager/course',
                component: '@/www/pages/you-lu-edu/uc/manager/course/index.vue',
                children: [
                    {
                        path: 'open',
                        component: '@/www/pages/you-lu-edu/uc/manager/course/open.vue',
                        children: [
                            {
                                path: 'collection',
                                component: '@/www/pages/you-lu-edu/uc/manager/course/open/collection/index.vue',
                            },
                            {
                                path: 'purchased',
                                component: '@/www/pages/you-lu-edu/uc/manager/course/open/purchased/index.vue',
                            },
                        ],
                    },
                    {
                        path: 'schedule',
                        component: '@/www/pages/you-lu-edu/uc/manager/course/schedule.vue',
                        children: [
                            {
                                path: 'collection',
                                component: '@/www/pages/you-lu-edu/uc/manager/course/schedule/collection/index.vue',
                            },
                            {
                                path: 'purchased',
                                component: '@/www/pages/you-lu-edu/uc/manager/course/schedule/purchased/index.vue',
                            },
                            {
                                path: 'receive',
                                component: '@/www/pages/you-lu-edu/uc/manager/course/schedule/receive/index.vue',
                            },
                        ],
                    },
                ],
            },
            {
                path: 'manager/invoice',
                component: '@/www/pages/you-lu-edu/uc/manager/invoice/index.vue',
            },
            {
                path: 'manager/message',
                component: '@/www/pages/you-lu-edu/uc/manager/message/index.vue',
            },
            {
                path: 'manager/orderPaidDetails',
                component: '@/www/pages/you-lu-edu/uc/manager/orderPaidDetails/index.vue',
            },
            {
                path: 'manager/orderPaidDetailsClass',
                component: '@/www/pages/you-lu-edu/uc/manager/orderPaidDetailsClass/index.vue',
            },
            {
                path: 'manager/orderPaidDetailsClassEarnest',
                component: '@/www/pages/you-lu-edu/uc/manager/orderPaidDetailsClassEarnest/index.vue',
            },
            {
                path: 'manager/orderPaidDetailsDelay',
                component: '@/www/pages/you-lu-edu/uc/manager/orderPaidDetailsDelay/index.vue',
            },
            {
                path: 'manager/orderPaidDetailsEarnest',
                component: '@/www/pages/you-lu-edu/uc/manager/orderPaidDetailsEarnest/index.vue',
            },
            {
                path: 'manager/orderPaidDetailsStress',
                component: '@/www/pages/you-lu-edu/uc/manager/orderPaidDetailsStress/index.vue',
            },
            {
                path: 'manager/receipt',
                component: '@/www/pages/you-lu-edu/uc/manager/receipt/index.vue',
            },
            {
                path: 'manager/personalCenter/changePassword',
                component: '@/www/pages/you-lu-edu/uc/manager/personalCenter/changePassword/index.vue',
            },
            {
                path: 'manager/personalCenter/personalInfo',
                component: '@/www/pages/you-lu-edu/uc/manager/personalCenter/personalInfo/index.vue',
            },
            {
                path: 'manager/personalCenter/accountSafe',
                component: '@/www/pages/you-lu-edu/uc/manager/personalCenter/accountSafe/index.vue',
            },
            {
                // 我的优惠券
                path: 'manager/coupon/list',
                component: '@/www/pages/you-lu-edu/userCenter/coupon-list/index.vue',
            },
        ],
    },
    {
        path: '/uc/manager/order/orderOther/confirm/:orderNo?',
        component: '@/www/pages/you-lu-edu/userCenter/order/confirm/index.vue',
    },
];
