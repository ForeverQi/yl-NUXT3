<script lang="jsx">
import { mapState } from 'vuex';
import AuditionUserView from '../audition-user-view/index.vue';
export default {
    name: 'AuditionTopView',
    computed: {
        ...mapState('audition/info', {
            coursewareName: 'coursewareName',
            courseName: 'courseName',
            classtypeId: 'classtypeId',
            undercarriage: 'undercarriage',
            projectId: 'projectId',
        }),
    },
    /**
     * @returns {object} 虚拟dom对象
     */
    render() {
        return (
            <div class="audition-top">
                <div
                    class="course-name"
                    onClick={() => {
                        const track = {
                            course_name: this.courseName,
                            project_id: this.projectId,
                            button_name: '返回按钮',
                            page_name: document.title,
                        };
                        this.$yiguan.track('youlu_click_shitingyeanniu', track);

                        if (this.undercarriage) {
                            this.$PageUtil.href(`/pro-course`);
                            return;
                        }
                        setTimeout(() => {
                            if (history.length > 2) {
                                history.back();
                            } else {
                                this.$PageUtil.href(`/pro-course/detail/${this.classtypeId}`);
                            }
                        }, 20);
                    }}
                >
                    <div class="back"></div>
                    {this.coursewareName}
                </div>
                <div class="user">
                    <AuditionUserView />
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.audition-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    flex-shrink: 0;

    background: linear-gradient(180deg, #141920, #202631);

    .course-name {
        position: relative;
        padding-left: 60px;
        padding-right: 25px;
        font-weight: 700;
        line-height: 50px;
        font-size: 14px;
        height: 100%;
        color: #ddd;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        .back {
            position: absolute;
            left: 0;
            top: 0;
            width: 60px;
            height: 100%;
            background-image: url(./asset/images/back.png);
            background-size: 24px auto;
            cursor: pointer;
            background-repeat: no-repeat;
            background-position: 70% center;
        }
    }

    .user {
        padding-right: 31px;
    }
}
</style>
