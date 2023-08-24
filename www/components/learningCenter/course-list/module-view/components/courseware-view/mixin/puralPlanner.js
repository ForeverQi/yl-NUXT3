import '@/api/api..check-rural-planner-course.js';
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState('class-info/info', {
            ruralPlanner: 'ruralPlanner', // 是否是第三方课程

            projectId: 'projectId',
        }),
    },
    methods: {
        toRuralPlanner() {
            if (this.ruralPlanner === false) {
                return false;
            }
            const data = {
                url: 'cc/check-rural-planner-course',
                params: {
                    projectId: this.projectId, // 项目ID
                },
            };
            return this.$httpClient(data).then((res) => {
                if (res.isUrl) {
                    this.$PageUtil.openNewPage(res.url);
                }
            });
        },
    },
};
