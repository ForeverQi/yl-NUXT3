import { liveCourseWebDetail } from '@/www/components/microClassUser/liveroomDetail/apis';

export default {
    methods: {
        timeForm(v) {
            let getH = () => {
                let h = Math.floor(v / 3600);
                return h > 9 ? h : `0${h}`;
            };
            let getM = () => {
                let m = Math.floor((v % 3600) / 60);
                return m > 9 ? m : `0${m}`;
            };
            let getS = () => {
                let s = v % 60;
                return s > 9 ? s : `0${s}`;
            };
            return `${getH()}:${getM()}:${getS()}`;
        },
        getIsOffline(goodsId) {
            //判断是否下线，是弹出下线提示；未下线，判断是否登录关注服务号，然后预约成功
            return liveCourseWebDetail(this, {
                goodsId,
            })
                .then((res) => {
                    this.isClassOnLine = true;
                })
                .catch((err) => {
                    if (err.getAttachedData().getData().code === '4999') {
                        this.isClassOnLine = false;
                        this.offlinePopup();
                    }
                });
        },
        //下线提示
        offlinePopup() {
            this.$baseUI
                .alert('该直播课已下线', '提示', { confirmText: '返回【微课首页】' })
                .then(() => {
                    this.$router.push(`/agile-course/${this.liveCourse.projectId}`);
                })
                .catch(() => {
                    this.$PageUtil.reflush();
                });
        },
    },
};
