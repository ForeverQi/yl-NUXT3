/*
 * @Author       : zhouqi
 * @description  : 专项小题库相关api
 * @Date         : 2023-06-29 14:11:26
 * @LastEditors  : zhouqi
 * @LastEditTime : 2023-08-15 14:15:25
 * @FilePath     : \nuxt\www\targets\NC01\routes\modules\specialQuestionBrushing.js
 */
export default [
    {
        // 题库详情
        path: '/svip-exam/:professionBankId',
        name: 'QuestionBankDetail',
        component: '@/www/pages/you-lu-edu/special-question-brushing/question-bank-detail/index.vue',
    },
    {
        // 专项小题库做题页
        path: '/svip-exam/:professionBankId/test',
        component: '@/www/pages/you-lu-edu/special-question-brushing/query-paper-exam/index.vue',
    },
    {
        // 做题报告
        path: '/svip-exam/:professionBankId/test-report',
        component: '@/www/pages/you-lu-edu/special-question-brushing/special-problem-report/special-problem-report.vue',
    },
    {
        // 试卷解析
        path: '/svip-exam/:professionBankId/analysis',
        component: '@/www/pages/you-lu-edu/special-question-brushing/special-question-analysis/special-question-analysis.vue',
    },
];
