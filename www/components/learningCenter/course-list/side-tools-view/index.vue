<script lang="jsx">
import { mapState } from 'vuex';
import ExamCountdownView from './components/exam-countdown-view/index.vue';
import StatisticsdownView from './components/statistics-view/index.vue';
import StudyToolView from './components/study-tool-view/index.vue';
export default {
    name: 'SideToolsView',
    components: {
        ExamCountdownView,
        StatisticsdownView,
        StudyToolView,
    },
    computed: {
        ...mapState('class-info/info', {
            ruralPlanner: 'ruralPlanner',
        }),
    },
    render() {
        return (
            <div class="side-tools-view">
                <ExamCountdownView />
                <StatisticsdownView />
                {/* 优路内部课程显示学习工具 */}
                {this.ruralPlanner === false && <StudyToolView />}
            </div>
        );
    },
};
</script>
<style lang="less" scoped></style>
