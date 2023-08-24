export default {
    methods: {
        trackUserYG() {
            if (process.server) {
                return Promise.reject();
            }
            return new Promise((resolve) => {
                const userInfo = this.$storage.get('loginStatus') || null;
                resolve(userInfo);
            })
                .then((user) => {
                    console.warn('trackUser', user);
                    if (!user) {
                        return { is_login_in: false, is_student: false };
                    }
                    const { studentDeposittype } = user;
                    return { is_login_in: true, is_student: studentDeposittype === 'T' };
                })
                .catch(() => {
                    return { is_login_in: false, is_student: false };
                });
        },
        trackUploadYG(eventID = '', params = {}) {
            this.trackUserYG().then((res) => {
                const track = {
                    ...res,
                    ...params,
                };
                console.warn('trackUpload', eventID, track);
                this.$yiguan.track(eventID, track);
            });
        },
        // 学院及项目切换
        trackWebYouluProjectSwitch(params = {}) {
            this.trackUploadYG('youlu_project_switch', params);
        },
        // 点击科目筛选
        trackWebYouluClickCourse(params = {}) {
            this.trackUploadYG('youlu_click_course', params);
        },
        // 关注服务号
        trackWebYouluFollowUpServiceNumber(params = {}) {
            this.trackUploadYG('youlu_follow_up_service_number', params);
        },
        // 课程-播放
        trackWebYouluCoursePlaying(params = {}) {
            this.trackUploadYG('web_youlu_course_playing', params);
        },
        // 提交订单
        trackWebYouluSubmitOrder(params = {}) {
            this.trackUploadYG('web_youlu_submit_order', params);
        },
        //发起支付
        trackWebYouluWkPay(params = {}) {
            this.trackUploadYG('web_youlu_wk_pay', params);
        },
        // 支付成功
        trackWebYouluPaySuccess(params = {}) {
            this.trackUploadYG('web_youlu_pay_success', params);
        },
        // 广告位点击
        trackWebYouluAdSpace(params = {}) {
            this.trackUploadYG('web_youlu_ad_space', params);
        },
        // 页面预览
        trackWebYouluClickAllPages(params = {}) {
            delete params.course_price; // 不同页面的价格数据类型不统一，不在传该字段
            this.trackUploadYG('web_youlu_click_all_pages', params);
        },
        // 领取体验课
        trackWebYouluExperienceAppointment(params = {}) {
            this.trackUploadYG('youlu_appointment_of_experience_classes', params);
        },
        // 资料下载
        trackWebYouluDownload(params = {}) {
            this.trackUploadYG('youlu_download', params);
        },
        // 点击资料搜索
        trackWebYouluInformationToSearch(params = {}) {
            this.trackUploadYG('youlu_click_the_information_to_search', params);
        },
        // 点击题库栏目
        trackWebYouluQuestionChanne(params = {}) {
            this.trackUploadYG('youlu_click_the_question_channe', params);
        },
        // 点击试卷
        trackWebYouluTestPaper(params = {}) {
            this.trackUploadYG('youlu_click_the_test_paper', params);
        },
    },
};
