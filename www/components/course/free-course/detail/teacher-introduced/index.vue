<template>
    <section class="section-teacher">
        <!--<img class="section-teacher-top" src="./asset/images/section-teacher-top.png" alt="" />-->
        <img class="section-teacher-bottom" src="./asset/images/section-teacher-bottom.png" alt="" />
        <div class="section-teacher-detail">
            <div class="section-teacher-detail-top">
                <img
                    class="teacher-head"
                    v-if="liveCourse.teacherList[0].teacherImage"
                    :src="$urlUtils.getViewUrl(liveCourse.teacherList[0].teacherImage)"
                    alt=""
                />
                <div class="teacher-info">
                    <div class="teacher-name">{{ liveCourse.teacherList[0].teacherNickname || liveCourse.teacherList[0].userName }}</div>
                    <template v-for="(item, index) in liveCourse.teacherList[0].teachProjectListVos">
                        <div v-if="item.projectId === liveCourse.projectId" class="teacher-subject" :key="index">
                            {{ item.projectName }}
                        </div>
                    </template>
                    <template v-if="liveCourse.teacherList[0].teacherBrief">
                        <span class="ledgement"></span>
                        <div class="teacher-style">
                            {{ liveCourse.teacherList[0].teacherBrief }}
                        </div>
                    </template>
                </div>
            </div>
            <div class="course-detail">
                <img class="course-description" src="./asset/images/course-description.png" alt="" />
                <ul v-if="liveCourse.lights">
                    <template v-for="(item, index) in liveCourse.lights">
                        <li v-if="item.content" :key="index">
                            <img class="bright-spots" src="./asset/images/bright-spots.png" alt="" />
                            <div>亮点{{ index + 1 }}：{{ item.content }}</div>
                        </li>
                    </template>
                </ul>
            </div>
            <image-view class="teacher-poster" type="banner" placeholder-width="70%" :src="$urlUtils.getViewUrl(liveCourse.shareSet)"></image-view>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'index',
    data() {
        return {};
    },
    fetch() {
        return Promise.resolve();
    },
    computed: {
        ...mapState('open', ['liveCourse']),
    },
};
</script>

<style scoped lang="less">
section {
    border: 0;
    font-weight: normal;
    display: block;
}
.section-teacher {
    width: 1200px;
    height: 1040px;
    border-radius: 16px;
    position: relative;
    margin: 32px auto 0;
    position: relative;
    .section-teacher-top {
        width: 1200px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
    }
    .section-teacher-bottom {
        width: 1200px;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 0;
    }
}
.section-teacher-detail {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
}
.section-teacher-detail-top {
    height: 360px;
    background: #ffffff url('./asset/images/section-teacher-top.png') no-repeat;
    background-size: 100%;
    border-radius: 16px;
    margin-bottom: 32px;
}
.teacher-head {
    max-width: 340px;
    max-height: 340px;
    float: left;
    margin-top: 20px;
}
.teacher-info {
    padding-left: 370px;
    padding-top: 86px;
    .teacher-name {
        font-size: 26px;
        font-weight: 700;
        color: #242f3e;
    }
    .ledgement {
        width: 32px;
        height: 4px;
        display: inline-block;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 3px;
        margin-top: 36px;
    }
    .teacher-subject {
        text-align: justify;
        margin-top: 13px;
        font-size: 16px;
        font-weight: 700;
        color: #3a3d4b;
    }
    .teacher-style {
        width: 554px;
        font-size: 14px;
        font-weight: 400;
        text-align: justify;
        color: #77798d;
        line-height: 22px;
        height: 110px;
        overflow: hidden;
    }
}
.course-section {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
}
.course-detail {
    width: 568px;
    margin-left: 75px;
    float: left;
    .course-description {
        width: 290px;
        height: 69px;
        margin-top: 70px;
        float: left;
        margin-right: 100px;
    }
    ul {
        margin-left: 105px;
        display: inline-block;
        margin-top: 30px;
        li {
            margin-bottom: 24px;
            font-size: 16px;
            color: #242f3e;
            .bright-spots {
                width: 20px;
                height: 20px;
                position: relative;
                top: 4px;
                margin-right: 8px;
                float: left;
            }
            div {
                padding-left: 28px;
                line-height: 26px;
            }
        }
    }
}

.teacher-poster {
    width: 400px;
    height: 518px;
    border-radius: 17px;
    float: right;
    margin-right: 75px;
    overflow: hidden;
}
</style>
