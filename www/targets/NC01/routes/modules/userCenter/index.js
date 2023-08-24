import order from './uc-manager.js'; // 订单
import accountDestory from './accountDestroy.js'; // 账号注销
import questionnaire from './questionnaire.js'; // 我的评价（调查问卷）
import headmaster from './headmaster.js'; // 我的学管师评价列表路由
import learningCenter from './learningCenter.js'; // 学习中心
import learnCard from './learnCard.js'; // 学习卡
import selfLearn from './selfLearn.js'; // 自助续学
import ccInteract from './ccInteract.js'; // 视频打点
export default [...order, ...accountDestory, ...questionnaire, ...headmaster, ...learningCenter, ...learnCard, ...selfLearn, ...ccInteract];
