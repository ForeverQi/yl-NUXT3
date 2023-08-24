<script lang="jsx">
import { mapState } from 'vuex';
export default {
    name: 'AuditionCourseView',
    computed: {
        ...mapState('audition/info', {
            coverimgurl: 'coverimgurl',
            courseName: 'courseName',
        }),
    },
    /**
     * @returns {object} vue虚拟dom
     */
    render() {
        return (
            <div class="course-wrap">
                <div class="course-image">
                    <ImageView src={this.coverimgurl} />
                </div>
                <div class="course-name">{this.courseName}</div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.course-wrap {
    display: flex;
    padding: 0 8px 16px 8px;
    .course-image {
        flex-shrink: 0;
        margin-right: 12px;
        width: 128px;
        height: 80px;
        overflow: hidden;
        border-radius: 8px;

        /deep/ img {
            width: 100%;
            height: 100%;
        }
    }

    .course-name {
        font-size: 15px;
        text-align: left;
        color: #ffffff;
        line-height: 25px;
        max-height: 75px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        line-clamp: 3;
        -webkit-line-clamp: 3;
    }
}
</style>
