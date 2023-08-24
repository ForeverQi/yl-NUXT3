import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import storage from '../common/inject/storage.js';
import yiguanSDK from './AnalysysAgent_JS_SDK.min';
const Storage = storage({});
function getYGkey() {
    return new Promise((resolve, reject) => {
        niceloo.api.callRaw({
            api: 'uc/config/find',
            params: {
                configType: 'YIGUAN',
                configCode: 'ygtongji',
                queryType: '',
                returnType: '',
                configScopetype: 'G',
            },
            onsuccess: resolve,
            onerror: reject,
        });
    }).then((res) => {
        console.log('请求返回2', res);
        return res;
    });
}

async function init() {
    if (process.client) {
        /**
         * 仿真环境不上报易观
         */
        if (window.location.host.indexOf('jiaoyu361.com') > -1) {
            return false;
        }
        var appkey = await getYGkey();
        yiguanSDK();
        AnalysysAgent.init({
            appkey: appkey.YIGUAN.ygtongji,
            uploadURL: 'https://log.niceloo.com',
            visitorConfigURL: 'https://log.niceloo.com',
            autoHeatmap: true,
            debugMode: 2,
            SDKFileDirectory: '/_nuxt/analysysSDK/',
        });
        AnalysysAgent.registerSuperProperty('projectname', 'web');
        AnalysysAgent.registerSuperProperty('platform_type', '优路教育官网');

        return Promise.resolve();
    }
}

var flag = init();

export default (context) => {
    return {
        // 用户登陆成功后调用,关联当前的登录用户
        aliasUser(userInfo) {
            if (process.client) {
                flag.then(() => {
                    AnalysysAgent.alias(userInfo.useridEncrypt);
                });
            }
        },

        track(eventId, props) {
            if (process.client) {
                // console.log('发送事件:', eventId);
                // // 注册通用属性
                // var properties = props.superProperty || {};
                // for (var p in properties) {
                //     AnalysysAgent.registerSuperProperty(p, properties[p]);
                // }
                // delete props.superProperty;
                // 用户行为统计
                flag.then(() => {
                    let user = Storage.get('loginStatus') || {};
                    let indexSelectProject = Storage.get('indexSelectProject') || {};
                    props.user_id = user.userId ? user.userId : '-';
                    props.is_login_in = !!user.userId;
                    props.user_project_id = indexSelectProject.projectId ? indexSelectProject.projectId : '-';
                    props.is_student = user.studentDeposittype === 'T';
                    console.log(eventId, props);
                    AnalysysAgent.track(eventId, props);
                });
            }
        },
        /**
     项目切换时的埋点:
     文档:
     https://docs.qq.com/sheet/DTlRva0RLb0VCT1J6?tab=bsdhvm
     参数格式:
     data = {
                    current_project:"选择的项目名称",
                    belong_college:"选择项目所属学院",
                    selected_page:"该选择/切换考试功能所在页面的标题",
                    selected_position:"首页|公开课|选课中心|题库"//切换按钮页面位置
                    department_name:"",	部门名称	字符串	综合事业部、财经事业部、医卫事业部、品牌教师部、市场法考事业部、信管公考部、竞价四六级考研部
                    college_name:"",	学院名称	字符串	建筑工程、消防安全
                    project_position:"",	项目名称	字符串	项目名称，如: 一级建造师、二级建造师
                    platform_type:"优路教育web网站",	平台名称	字符串	优路教育web网站、优路教育APP等
                }
     触发动作:
     用户点击切换考试时触发
     触发时机:
     1、一级导航——首页、公开课、选课中心、题库
     2、首页——除一级导航外，页面中包含右侧快捷入口-【直播课、选课中心、题库】
     3、首页——推荐课程中【更多公开课、更多试听课】
     */
        selectProject(data) {
            if (process.client) {
                this.track('selected_project', data);
            }
        },

        // 词点快查埋点
        dict(eventId, props) {
            this.track(eventId, props);
        },

        // 微课埋点
        mcuTrack(eventId, props) {
            let data = {
                ...props,
                // platform_type: '优路微课PC端',
                // projectName: context.store.state.mcuStore.projectName,
            };
            this.track(eventId, data);
        },
        // 智能学习埋点推送
        aiLearning(eventId, props, projectMap, projectId) {
            // eslint-disable-next-line camelcase
            let project_name = '';
            // eslint-disable-next-line camelcase
            let college_name = '';
            if (projectId) {
                // eslint-disable-next-line camelcase
                project_name = projectMap[projectId] ? projectMap[projectId].mycourse_project_name : '';
                // eslint-disable-next-line camelcase
                college_name = projectMap[projectId] ? projectMap[projectId].college_name : '';
            }
            let data = {
                department_name: '',
                college_name,
                project_position: project_name,
                // platform_type: '优路教育web网站', 自动添加
                mycourse_project_name: project_name,
                ...props,
            };

            let noProjectNames = [
                'click_coursetest_report_button',
                'click_lookcourse_coursetest',
                'click_lookcourse_coursetest_return',
                'click_testreport_button',
                'click_lookcourse_record',
                'click_record_module_switch',
            ];
            if (noProjectNames.includes(eventId)) {
                data = {
                    department_name: '',
                    college_name,
                    project_position: project_name,
                    // platform_type: '优路教育web网站', 自动添加
                    ...props,
                };
            } else {
                data = {
                    department_name: '',
                    college_name,
                    project_position: project_name,
                    // platform_type: '优路教育web网站', 自动添加
                    mycourse_project_name: project_name,
                    ...props,
                };
            }
            // 需要项目名称的
            // let projectName = [
            //     'click_courselist_switch',
            //     'click_courselist_coursetest',
            //     'click_courselist_report',
            //     'click_courselist_test',
            //     'click_courselist_analysis',
            //     'click_coursetest_return',
            //     'click_coursetest_submit',
            //     'click_subjectexam_starttest',
            //     'click_subjectexam_returen',
            //     'click_subjectexam_save',
            //     'click_subjectexam_submit',
            //     'click_subjectreport_button',
            //     '',
            // ];

            // console.log(eventId, data, 'dddd');
            this.track(eventId, data);
        },

        /**
         * 学习中心埋点
         * @param {*} eventId 埋点事件名
         * @param {*} props
         *
         * props: {
         *  page_name,
         *  project_name
         *  project_id
         * }
         */
        learningCenter(eventId, props) {
            let userInfo = Storage.getUserInfo();
            if (!userInfo) {
                userInfo = {
                    userYoulunum: '',
                };
            }
            const data = {
                ...props,
                project_position: props.project_name,
                department_name: '',
                youlu_ID: userInfo.userYoulunum,
            };

            this.track(eventId, data);
            console.log('埋点上报成功');
        },
    };
};
