export default {
    methods: {
        trackUserFree() {
            return new Promise((resolve) => {
                const userInfo = this.$storage.get('loginStatus') || null;
                resolve(userInfo);
            })
                .then((user) => {
                    if (!user) {
                        return { is_login_in: false, is_student: false, user_id: '-' };
                    }
                    const { studentDeposittype, userId } = user;
                    return { is_login_in: true, is_student: studentDeposittype === 'T', user_id: userId };
                })
                .catch(() => {
                    return { is_login_in: false, is_student: false, user_id: '-' };
                });
        },
        trackUploadFree(eventID = '', params = {}) {
            let commonParams = {
                user_project_position: '',
                project_id: '',
                projectName: '',
                user_id: '',
                platform_type: '优路教育官网-Web端',
            };
            let recommendProject = localStorage.getItem('indexSelectProject');
            if (recommendProject) {
                let projectObj = JSON.parse(recommendProject);
                commonParams.user_project_position = projectObj.projectSeoCode;
                // commonParams.project_id = projectObj.projectId;
                // commonParams.projectName = projectObj.projectName;
            }

            this.trackUserFree().then((res) => {
                const track = {
                    ...commonParams,
                    ...res,
                    ...params,
                };

                console.warn('trackUpload', track);
                this.$yiguan.track(eventID, track);
            });
        },
        // 学院及项目切换
        trackWebYouluProjectSwitch(params = {}) {
            this.trackUploadFree('youlu_project_switch', params);
        },
        // 点击科目筛选
        trackWebYouluClickCourse(params = {}) {
            this.trackUploadFree('youlu_click_course', params);
        },
        // 关注服务号
        trackWebYouluFollowUpServiceNumber(params = {}) {
            this.trackUploadFree('youlu_follow_up_service_number', params);
        },
        // 课程-播放
        trackWebYouluCoursePlaying(params = {}) {
            this.trackUploadFree('web_youlu_course_playing', params);
        },
        // 提交订单
        trackWebYouluSubmitOrder(params = {}) {
            this.trackUploadFree('web_youlu_submit_order', params);
        },
        //发起支付
        trackWebYouluWkPay(params = {}) {
            this.trackUploadFree('web_youlu_wk_pay', params);
        },
        // 支付成功
        trackWebYouluPaySuccess(params = {}) {
            this.trackUploadFree('web_youlu_pay_success', params);
        },
        // 广告位点击
        trackWebYouluAdSpace(params = {}) {
            this.trackUploadFree('web_youlu_ad_space', params);
        },
        // 页面预览
        trackWebYouluClickAllPages(params = {}) {
            delete params.course_price; // 不同页面的价格数据类型不统一，不在传该字段
            this.trackUploadFree('web_youlu_click_all_pages', params);
        },
        // 领取体验课
        trackWebYouluExperienceAppointment(params = {}) {
            this.trackUploadFree('youlu_appointment_of_experience_classes', params);
        },
        // 预约公开直播课
        trackWebYouluLiveAppointment(params = {}) {
            this.trackUploadFree('youlu_appointment_of_live_classes', params);
        },
        // 点击[登录后，进入直播间]按钮
        trackWebYouluLiveLogin(params = {}) {
            this.trackUploadFree('youlu_click_the_live_button', params);
        },
        // 点击图书列表的图书
        trackWebYouluClickBook(params = {}) {
            this.trackUploadFree('web_youlu_click_on_the_book', params);
        },
        // 购买系统课
        trackWebYouluPurchaseSystemCourse(params = {}) {
            this.trackUploadFree('web_youlu_purchase_system_course', params);
        },
        // 系统课试听
        trackWebYouluClickListen(params = {}) {
            delete params.course_price;
            this.trackUploadFree('youlu_click_to_listen', params);
        },
        // 我的课程/系统课/体验课/公开课/我的课表/学习答疑
        trackWebYouluColumnSwitching(params = {}) {
            this.trackUploadFree('youlu_column_switching', params);
        },
    },
};
