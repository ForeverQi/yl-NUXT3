<script lang="jsx">
import { mapState } from 'vuex';
export default {
    name: 'CoursePlayTop',
    computed: {
        ...mapState('course/info', {
            coursewareName: 'coursewareName',
            classId: 'classId',
            ctapId: 'ctapId',
            source: 'source', // 来源
        }),
    },
    methods: {
        backUrl(moduleId = '') {
            let source = this.$route.query.source;
            if (source == 'myCourse') {
                this.$PageUtil.href(`/learningCenter/index/myCourse`);
            } else if (source == 'allTask') {
                let url = `/learningCenter/allTask/${this.classId}?ctapId=${this.ctapId}`;
                if (moduleId) {
                    url = `${url}&moduleId=${moduleId}`;
                }
                this.$PageUtil.href(url);
            } else if (source == 'learningTimetable') {
                this.$PageUtil.href(`/learningCenter/index/learningTimetable`);
            } else if (source == 'attendanceRecord') {
                this.$PageUtil.href(`/learningCenter/index/myCourse`);
            } else if (source == 'attendanceRecords') {
                this.$PageUtil.href(`/learningCenter/index/myCourse`);
            } else {
                this.$PageUtil.href(`/learningCenter/index/myCourse`);
            }
        },
    },
    render() {
        return (
            <div class="course-name">
                <div
                    class="back"
                    onClick={() => {
                        this.backUrl();
                    }}
                ></div>
                {this.coursewareName}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.course-name {
    position: relative;
    padding-left: 60px;
    padding-right: 25px;
    font-weight: 700;
    line-height: 26px;
    font-size: 14px;
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
</style>
