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
                this.$yiguan.track(eventID, track);
            });
        },
        // 点击项目频道页的任何地方
        trackWebYouluProjectChannelPage(params = {}) {
            this.trackUpload('web_youlu_project_channel_page', params);
        },

        // 页面预览
        trackWebYouluClickAllPages(params = {}) {
            delete params.course_price; // 不同页面的价格数据类型不统一，不在传该字段
            this.trackUpload('web_youlu_click_all_pages', params);
        },
    },
};
