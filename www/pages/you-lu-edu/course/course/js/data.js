export const courseListData = [
    {
        courseName: '全部',
        isChecked: true,
        titleName: '全部课程',
        courseType: 'all',
    },
    {
        courseName: '公开课',
        isChecked: false,
        titleName: '公开课',
        courseType: 'free',
    },
    {
        courseName: '体验课',
        isChecked: false,
        titleName: '体验课',
        courseType: 'trial',
    },
    {
        courseName: '系统课',
        isChecked: false,
        titleName: '系统课',
        courseType: 'pro',
    },
];
export const courseTypeEnum = {
    all: 0,
    free: 1,
    trial: 2,
    pro: 3,
};

export const courseTypeToTitleMap = new Map([
    ['all', '_全部课程_'],
    ['free', '_公开课_免费直播_视频课程_'],
    ['trial', '_体验课_视频教程_免费试听_'],
    ['pro', '_系统课_系统学习_培训课程_'],
]);

export const prejectDefaultNameMap = new Map([
    ['jiangong', '建筑工程'],
    ['xiaoan', '安全应急'],
    ['caijing', '财税经管'],
    ['yiyang', '医卫康养'],
    ['xinli', '家庭心理'],
    ['jiaoshi', '教师培训'],
    ['falv', '法律培训'],
    ['jineng', '技能就业'],
    ['xueli', '学历提升'],
    ['gongwuyuan', '考公考编'],
]);

export const pageKeyWordEnd =
    ',公开课,直播课,体验课,免费试听,课程,视频,视频教程,培训,学习,系统学习,培训,职业培训,融合式教学,OMO,在线答疑,优路,优路教育,优路教育网,在线教育,在线培训,职业教育,素质提升,技能提升';
