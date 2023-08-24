import ProjectUtil from '~/plugins/common/inject/projectUtil';

export default function () {
    // department_name	部门名称	字符串	综合事业部、财经事业部、医卫事业部、品牌教师部、市场法考事业部、信管公考部、竞价四六级考研部
    // college_name	学院名称	字符串	建工学院、消安学院、经济学院、健康学院、财经学院、医卫学院、教师学院、法考学院、公考学院、四六级考研
    // project_position	项目名称	字符串	项目名称，如: 一级建造师、二级建造师
    // platform_type	平台名称	字符串	优路教育web网站、优路教育APP等
    var o = {
        department_name: '',
        college_name: '',
        project_position: ProjectUtil.getProject().projectName,
        platform_type: '优路教育web网站',
    };

    var href = global.location && global.location.href && /redirect=(.*)/.exec(global.location.href);
    if (href && href[1]) {
        var result = decodeURIComponent(href[1]);
        if (/(jg\.|jgtest\.|jgdev\.|jguat\.)/.test(result) || /\/dpt\/2698/.test(result)) {
            o.college_name = '建筑工程';
        } else if (/(xa\.|xatest\.|xadev\.|xauat\.)/.test(result) || /\/dpt\/2699/.test(result)) {
            o.college_name = '消防安全';
        } else if (/(jj\.|jjtest\.|jjdev\.|jjuat\.)/.test(result) || /\/dpt\/2959/.test(result)) {
            o.college_name = '经济管理';
        } else if (/(jk\.|jktest\.|jkdev\.|jkuat\.)/.test(result) || /\/dpt\/2960/.test(result)) {
            o.college_name = '康养技能';
        } else if (/(cj\.|cjtest\.|cjdev\.|cjuat\.)/.test(result) || /\/dpt\/2701/.test(result)) {
            o.college_name = '财会经济';
        } else if (/(yiwei\.|yiweitest\.|yiweidev\.|yiweiuat\.)/.test(result) || /\/dpt\/2700/.test(result)) {
            o.college_name = '医药卫生';
        } else if (/(js\.|jstest\.|jsdev\.|jsuat\.)/.test(result) || /\/dpt\/2702/.test(result)) {
            o.college_name = '教资招教';
        } else if (/(fk\.|fktest\.|fkdev\.|fkuat\.)/.test(result) || /\/dpt\/2961/.test(result)) {
            o.college_name = '法律考试';
        } else if (/(gongkao\.|gongkaotest\.|gongkaodev\.|gongkaouat\.)/.test(result) || /\/dpt\/2962/.test(result)) {
            o.college_name = '公考事业编';
        } else if (/(kaoyan\.|kaoyantest\.|kaoyandev\.|kaoyanuat\.)/.test(result) || /\/dpt\/2963/.test(result)) {
            o.college_name = '四六级考研';
        }
    }
    return o;
}
