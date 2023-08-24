export const state = () => ({
    experienceClass: {
        goodsId: '',
        catalogList: [],
        collectStatus: 0,
        courseName: '',
        coursePicpath: '',
        coursePrice: 0,
        coursePromotionprice: 0,
        coursePromotionendtime: '',
        coursePromotiontype: '',
        courseintroduceDetail: '',
        coursewareCount: 0,
        coverImg: '',
        dialogContent1: '',
        dialogContent2: '',
        dialogTitle: '',
        dialogTitle: '',
        flowAvlstatus: '',
        lights: [],
        mailStatus: '',
        posterImg: '',
        projectName: '',
        qrcodeImage: '',
        qrcodeTitle: '',
        teacherList: [],
        courseLevel: 2,
        courseOpenstatus: '',
        courseType: '',
        drawStatus: '',
        courseExpiredtime: '',
        projectId: '',
        projectSeoCode: '',
        projectCode: '',
        subjectId: '',
        avlStatus: 'Y',
        currentTime: 0,
        localCurrentTime: 0,
        projectName: '',
        projectShortname: '',
    },
});

export const mutations = {
    setCourse(state, obj) {
        state.experienceClass = obj;
    },
    updateCourse(state, cou) {
        for (const k in cou) {
            state.experienceClass[k] = cou[k];
        }
    },
    updateCatalog(state, catalog) {
        const { catalogId, ...data } = catalog;
        const cata = state.experienceClass.catalogList.find((item) => item.catalogId === catalogId);
        if (!cata) {
            return;
        }
        for (const k in data) {
            cata[k] = data[k];
        }
    },
    updateCourseWare(state, courseWare) {
        const { coursewareId, ...data } = courseWare;
        for (const catalog of state.experienceClass.catalogList) {
            const ware = catalog.coursewareList.find((item) => item.coursewareId === coursewareId);
            if (!ware) {
                continue;
            }
            for (const k in data) {
                ware[k] = data[k];
            }
            break;
        }
    },
};
