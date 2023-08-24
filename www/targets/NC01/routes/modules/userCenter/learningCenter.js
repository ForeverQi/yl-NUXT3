export default [
    {
        path: '/learningCenter/index',
        component: '@/www/pages/you-lu-edu/learningCenter/index.vue',
        redirect: '/learningCenter/index/myCourse',
        children: [
            {
                path: 'myCourse',
                component: '@/www/pages/you-lu-edu/learningCenter/my-course/index.vue',
            },
            {
                path: 'learningTimetable',
                component: '@/www/pages/you-lu-edu/learningCenter/learning-timetable/index.vue',
            },
            {
                path: 'myFreeCourse',
                component: '@/www/pages/you-lu-edu/learningCenter/my-free-course/index.vue',
            },
            {
                path: 'myTrialCourse',
                component: '@/www/pages/you-lu-edu/learningCenter/my-trial-course/index.vue',
            },
            {
                path: 'answerQuestion',
                component: '@/www/pages/you-lu-edu/learningCenter/answer-question/index.vue',
            },
        ],
    },
    {
        // 班级课内练习
        path: '/learningCenter/test-paper-list',
        component: '@/www/pages/you-lu-edu/learningCenter/test-paper-list/index.vue',
        children: [
            {
                path: 'questionBank/:questionUniquecode/:classId?',
                component: '@/www/pages/you-lu-edu/learningCenter/test-paper-list/paper-list/index.vue',
            },
        ],
    },
    {
        // 班级详情
        path: '/learningCenter/allTask/:classId',
        component: '@/www/pages/you-lu-edu/learningCenter/courseList/index.vue',
    },
    {
        // 转班听课率详情页
        path: '/learningCenter/data-transfer-info/:classId',
        component: '@/www/pages/you-lu-edu/learningCenter/data-transfer-info/index.vue',
    },
    {
        // 逐步废弃
        path: '/learningCenter/ai/course/:classId',
        redirect: '/learningCenter/allTask/:classId',
    },
    {
        //过期课程
        path: '/learningCenter/overdueClass',
        component: '@/www/pages/you-lu-edu/learningCenter/overdueClass/index.vue',
    },
    {
        //隐藏课程
        path: '/learningCenter/hidden-course',
        component: '@/www/pages/you-lu-edu/learningCenter/hidden-course/index.vue',
    },
    {
        //听课记录
        path: '/learningCenter/index/attendanceRecord/:classId?',
        component: '@/www/pages/you-lu-edu/learningCenter/attendance-record/index.vue',
    },
    {
        //考点秒懂
        path: '/learningCenter/knowledge-strengthen',
        component: '@/www/pages/you-lu-edu/learningCenter/knowledge-strengthen/index.vue',
    },
    {
        //学习报告
        path: '/learningCenter/classLearningReport/:classId',
        component: '@/www/pages/you-lu-edu/learningCenter/learning-report/index.vue',
    },
    {
        path: '/learningCenter/test-question/wrongly-answered-list', //错题本
        component: '@/www/pages/you-lu-edu/learningCenter/wrongly-answered-list',
    },
    {
        path: '/learningCenter/test-question/collected-list', //收藏夹
        component: '@/www/pages/you-lu-edu/learningCenter/collected-list',
    },
    {
        path: '/learningCenter/do-question-test/:doType/:projectUniCode/:subjectId/:paperId', //错题本收藏夹做题页
        component: '@/www/pages/you-lu-edu/learningCenter/do-questions/index.vue',
    },

    {
        path: '/learningCenter/question-test-result/:doType/:projectUniCode/:subjectId/:answersheetId/:paperId', //错题本收藏夹做题解析页
        component: '@/www/pages/you-lu-edu/learningCenter/do-questions-analysis/index.vue',
    },
    {
        path: '/learningCenter/test-question/analysis/:doType/:projectUniCode/:subjectId/:questionType', //错题本收藏夹全部解析页
        component: '@/www/pages/you-lu-edu/learningCenter/error-collect-analysis/index.vue',
    },
    {
        path: '/learningCenter/do-paper-test/:subjectId/:paperId/:coursewareId/:paperTypeCode/:classId?', // 课内练习走题页(学习测验)
        component: '@/www/pages/you-lu-edu/learningCenter/do-paper-exam/index.vue',
    },
    {
        path: '/learningCenter/paper-test-result/:paperId/:answersheetId/:subjectId/:paperTypeCode/:coursewareId/:classId?', // 科目测评(学习测验报告)
        component: '@/www/pages/you-lu-edu/learningCenter/evaluation-report/index.vue',
    },
    {
        // 机考 - 消防 登录页面
        path: '/emulation/fire-exam/login',
        component: '@/www/pages/you-lu-edu/learningCenter/simulated-exam/fire-exam/exam-login.vue',
    },
    {
        // 机考 - 消防 考试纪律
        path: '/emulation/fire-exam/discipline',
        component: '@/www/pages/you-lu-edu/learningCenter/simulated-exam/fire-exam/exam-discipline.vue',
    },
    {
        // 机考 - 消防 开始考试
        path: '/emulation/fire-exam/doing',
        component: '@/www/pages/you-lu-edu/learningCenter/simulated-exam/fire-exam/exam-doing.vue',
    },
    {
        // 视频播放页面
        path: '/pro-course-learn/:classId/:coursewareId',
        component: '@/www/pages/you-lu-edu/learningCenter/htvideo/index.vue',
    },
    {
        // 学习报告-归档
        path: '/pro-course-report/acchives/:classId',
        component: '@/www/pages/you-lu-edu/learningCenter/report-archives/index.vue',
    },
];
