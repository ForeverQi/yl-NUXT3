export default {
    methods: {
        /**
         * 获取用户登录后的信息
         *
         * @returns {object} 个人基本信息
         */
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

        /**
         * 调用易观通用方法
         *
         * @param {string} eventID 事件id
         * @param {object} params 入参
         */
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
                commonParams.project_id = projectObj.projectId;
                commonParams.projectName = projectObj.projectName;
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

        /**
         * 点击我的优惠券
         *
         * @param {object} params 入参
         */
        trackWebYouluClickWodeyhjliebiao(params = {}) {
            this.trackUploadFree('web_youlu_click_wodeyhjliebiao', params);
        },
    },
};
