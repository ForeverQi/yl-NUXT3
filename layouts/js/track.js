export default {
    methods: {
        trackUser() {
            if (process.server) {
                return Promise.reject();
            }
            return new Promise((resolve) => {
                const userInfo = this.$storage.get('loginStatus') || null;
                resolve(userInfo);
            })
                .then((user) => {
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
        trackUpload(eventID = '', params = {}) {
            this.trackUser().then((res) => {
                const track = {
                    ...res,
                    ...params,
                };
                console.warn('trackUpload', track);
                this.$yiguan.track(eventID, track);
            });
        },
        // 点击顶部导航栏目
        trackWebYouluClickTheHoverButton(params = {}) {
            this.trackUpload('youlu_click_the_top_column', params);
        },
        // 点击查看全国分校按钮
        trackWebYouluClickCampusMore(params = {}) {
            this.trackUpload('web_youlu_click_campus_more', params);
        },
        // 点击项目简章
        trackWebYouluClickProjectIntroduction(params = {}) {
            this.trackUpload('youlu_click_project_introduction', params);
        },
        // 点击赛事峰会入口
        trackWebYouluClickEventSummit(params = {}) {
            this.trackUpload('youlu_click_event_summit', params);
        },
        // 点击底部通用栏
        trackWebYouluClickBottomColumn(params = {}) {
            this.trackUpload('youlu_click_bottom_column', params);
        },
    },
};
