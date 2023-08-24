import '@/api/channel/api..query-config-model-info.js';
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
export const state = () => ({
    projectList: [],
});
export const mutations = {
    setProjectList(state, data) {
        state.projectList = data;
    },
};
let link = null;
export const actions = {
    getProjectList({ state, commit }) {
        if (link === null) {
            link = new Promise((resolve, reject) => {
                niceloo.api.call('channel/query-config-model-info', {
                    columnId: 'COLUMN20220000000000000000',
                    moduleCode: 'TJXM',
                    pageIndex: 1,
                    pageSize: 20,
                    onsuccess: (res) => {
                        const list = res.content.map((r) => {
                            r.projectCode = r.projectSeocode;
                            return r;
                        });
                        commit('setProjectList', list);
                        resolve(res.content);
                    },
                    onerror: (_failure) => {
                        niceloo.api.handleFailure(_failure);
                        // reject(_failure);
                        resolve();
                    },
                    oncomplete: () => {},
                });
            });
        }
        return link.then(() => {
            return state.projectList;
        });
    },
};

/**
 *
 *
    projectList: [
        {
            projectId: 'PROJECT20191126010000000272',
            projectCode: 'YIJIAN',
            projectSeocode: 'yijian',
            projectName: '一级建造师',
            projectLevelcode: '00000000810000000044',
            collegeId: 'PROJECT20191126010000000416',
            collegeName: '建筑工程',
        },
        {
            projectId: 'PROJECT20191126010000000163',
            projectCode: 'ERJIAN',
            projectSeocode: 'erjian',
            projectName: '二级建造师',
            projectLevelcode: '00000000810000000030',
            collegeId: 'PROJECT20191126010000000416',
            collegeName: '建筑工程',
        },
        {
            projectId: 'PROJECT20191126010000000182',
            projectCode: 'YIXIAO',
            projectSeocode: 'yixiao',
            projectName: '一级消防工程师',
            projectLevelcode: '00000000850000000001',
            collegeId: 'PROJECT20200519010000000001',
            collegeName: '消防安全',
        },
        {
            projectId: 'PROJECT20191126010000000156',
            projectCode: 'XFY',
            projectSeocode: 'xfy',
            projectName: '消防设施操作员',
            projectLevelcode: '00000000850000000006',
            collegeId: 'PROJECT20200519010000000001',
            collegeName: '安全应急',
        },
        {
            projectId: 'PROJECT20191126010000000027',
            projectCode: 'ANQUAN',
            projectSeocode: 'anquan',
            projectName: '中级安全工程师',
            projectLevelcode: '00000000850000000004',
            collegeId: 'PROJECT20200519010000000001',
            collegeName: '消防安全',
        },
        {
            projectId: 'PROJECT20191126010000000087',
            projectCode: 'ZAOJIA',
            projectSeocode: 'zaojia',
            projectName: '一级造价工程师',
            projectLevelcode: '00000000810000000017',
            collegeId: 'PROJECT20191126010000000416',
            collegeName: '建筑工程',
        },
        {
            projectId: 'PROJECT20191126010000000225',
            projectCode: 'ZYS',
            projectSeocode: 'zys',
            projectName: '执业中药师',
            projectLevelcode: '00000000670000000017',
            collegeId: 'PROJECT20191126010000000338',
            collegeName: '医卫康养',
        },
        {
            projectId: 'PROJECT20191126010000000103',
            projectCode: 'ZJKJ',
            projectSeocode: 'zjkj',
            projectName: '中级会计师',
            projectLevelcode: '00000000630000000008',
            collegeId: 'PROJECT20191126010000000324',
            collegeName: '财税金融',
        },
        {
            projectId: 'PROJECT20201207010000000002',
            projectCode: 'FAKAO',
            projectSeocode: 'fakao',
            projectName: '法律职业资格考试',
            projectLevelcode: '00000000860000000001',
            collegeId: 'PROJECT20201207010000000001',
            collegeName: '法律考试',
        },
        {
            projectId: 'PROJECT20201218010000000002',
            projectCode: 'kaoyan',
            projectSeocode: 'kaoyan',
            projectName: '考研',
            projectLevelcode: '00000000870000000003',
            collegeId: 'PROJECT20201218020000000001',
            collegeName: '四六级考研',
        },
        {
            projectId: 'PROJECT20191126010000000133',
            projectCode: 'ZJJJ',
            projectSeocode: 'zjjj',
            projectName: '中级经济师',
            projectLevelcode: '00000000630000000056',
            collegeId: 'PROJECT20191126010000000324',
            collegeName: '财税经管',
        },
        {
            projectId: 'PROJECT20200721010000000001',
            projectCode: 'XLZX',
            projectSeocode: 'zkyxinlizixun',
            projectName: '心理咨询师',
            projectLevelcode: '00000000950000000012',
            collegeId: 'PROJECT20220621220000000001',
            collegeName: '技能就业',
        },
        {
            projectId: 'PROJECT20191126010000000052',
            projectCode: 'XYS',
            projectSeocode: 'xys',
            projectName: '执业西药师',
            projectLevelcode: '00000000670000000016',
            collegeId: 'PROJECT20191126010000000338',
            collegeName: '医卫康养',
        },
    ],
*/
