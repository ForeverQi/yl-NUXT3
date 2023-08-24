<template>
    <div class="classroom-practice">
        <classroom-question
            v-if="(!isInteraction && paperId && !answersheetId) || replayExam"
            :paper-id="paperId"
            :cur-course="curCourse"
            @submit="setReplayExam"
            @close="closePractice"
        />
        <classroom-report
            v-else-if="!isInteraction && paperId && answersheetId && !replayExam"
            :answersheet-id="answersheetId"
            :cur-course="curCourse"
            @close="closePractice"
            @startInteraction="setInteractionStatus"
            @replayPractice="setReplayExam"
        />
        <classroom-interaction
            v-if="isInteraction"
            :answersheet-id="answersheetId"
            :cur-course="curCourse"
            @close="closePractice"
            @replayPractice="setReplayExam"
        />
    </div>
</template>
<script>
import ClassroomQuestion from './ClassroomQuestion.vue';
import ClassroomReport from './ClassroomReport.vue';
import ClassroomInteraction from './ClassroomInteraction.vue';
export default {
    components: {
        ClassroomQuestion,
        ClassroomReport,
        ClassroomInteraction,
    },
    props: {
        curCourse: {
            // 正在播放的课件信息
            type: Object,
            default() {
                return {};
            },
        },
        paperId: {
            type: String,
            default: '',
        },
        answersheetId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            replayExam: false,
            isInteraction: false,
        };
    },
    methods: {
        setReplayExam(check) {
            // 重新练习
            this.replayExam = check;
            this.isInteraction = false;
        },
        setInteractionStatus(check) {
            // 设置交互
            this.isInteraction = check;
        },
        closePractice() {
            // 关闭随堂练习
            this.replayExam = false;
            this.isInteraction = false;
            this.$bus.$emit('CLOSR_CLASSROOM_practice');
        },
    },
};
</script>
<style lang="less" scoped>
.classroom-practice {
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    z-index: 30;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    // min-width: 1040px;
    // display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: auto;
    input[type='submit'],
    input[type='reset'],
    input[type='button'] {
        outline: none;
        filter: chroma(color=#000000);
    }

    .cwrap {
        display: flex;
        height: 100%;
        width: 100%;
        overflow: hidden;

        .rcontent {
            width: 100%;
            overflow-x: auto;
        }
        .lcontent {
            flex-shrink: 0;
            width: 380px;
        }
    }
}
</style>
