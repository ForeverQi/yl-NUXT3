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
        // 点击学院及项目切换
        trackWebYouluProjectSwitch(params = {}) {
            this.trackUpload('youlu_project_switch', params);
        },
    },
};
