import microClassUser from './modules/microClassUser.js'; // 微课
import userCenter from './modules/userCenter'; // 用户中心
import article from './modules/article.js'; // 文章资讯
import loginRegister from './modules/loginRegister.js'; // 登录注册忘记密码路由
import freeCourse from './modules/free-course.js'; // 公开课路由
import proCourse from './modules/pro-course.js'; // 系统课路由
import trialCourse from './modules/trial-course.js'; // 体验课路由
import books from './modules/books.js'; // 资料路由
import ziliao from './modules/ziliao.js'; // 资料路由
import tool from './modules/tool.js'; // 资料路由
import examRouter from './modules/examRouter.js'; // 题库路由
import schoolRouter from './modules/school.js'; // 分校路由
import liveMiddle from './modules/liveMiddle.js'; // 直播中间页路由
import about from './modules/about.js'; // 关于优路
import projectChannel from './modules/projectChannel.js'; // 项目频道
import course from './modules/course.js'; // 项目频道
import publicRoute from './modules/public.js'; // target
import suggest from './modules/suggest.js'; // 投诉建议
import index from './modules/index.js'; // 首页
import invoiceExplain from './modules/invoiceExplain.js'; // 发票
import specialQuestionBrushing from './modules/specialQuestionBrushing.js'; // 专项刷题

export default [
    ...index, //首页
    ...examRouter, // 题库路由
    ...freeCourse, // 公开课路由
    ...proCourse, // 系统课路由
    ...trialCourse, // 体验课路由
    ...books, //图书
    ...ziliao, // 资料
    ...tool, // 学习工具
    ...microClassUser, // 微课目录
    ...userCenter, // 用户中心
    ...article, // 文章资讯路由
    ...loginRegister, // 登录注册忘记密码路由
    ...schoolRouter, // 分校路由
    ...liveMiddle, // 直播中间页路由
    ...about, // 关于优路
    ...publicRoute, // 没有模块归属的路由
    ...suggest, // 投诉建议
    ...projectChannel, // 项目频道页
    ...course, // 课程集合
    ...invoiceExplain, // 发票
    ...specialQuestionBrushing, // 专项刷题
    {
        path: '/compatibility',
        component: '@/www/pages/you-lu-edu/public/compatibility/index.vue',
    },
];
