<template>
    <div class="dy-section">
        <CourseSideTitle title="问题答疑"></CourseSideTitle>
        <AnsweringList ref="answeringList"></AnsweringList>
        <AnsweringConsult @update-dylist="updateDyList"></AnsweringConsult>
    </div>
</template>

<script>
import CourseSideTitle from '../course-side-title/index.vue'; //title
import AnsweringList from '../course-answering/component/answering-list/index';
import AnsweringConsult from '../course-answering/component/answering-consult/index';

export default {
    name: 'index',
    components: {
        CourseSideTitle,
        AnsweringList,
        AnsweringConsult,
    },
    methods: {
        updateDyList() {
            this.$refs.answeringList.getQuestionList('N');
        },
    },
};
</script>

<style scoped lang="less">
.dy-section {
    // width: 376px;
    width: 100%;
    background: #2a3440;
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1;
    overflow: auto;
}
</style>
