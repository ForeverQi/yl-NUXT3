<template>
    <div class="recommend-course_box">
        <div class="recommend-course" v-if="list.length">
            <div class="recommend-course_header">
                <div class="header-title">
                    <img src="./asset/images/recommend-logo.png" alt="为您推荐" />
                </div>
                <div class="project-name" v-if="projectInfo.projectName">{{ projectInfo.projectName }}</div>
                <div class="recommend-handle" @click="showProjectDialog('点击[修改考试]')">修改考试</div>
                <img src="./asset/images/recommend-label.png" class="header-label_img" />
            </div>
            <img src="./asset/images/recommend-animation.gif" class="animation-img" />
            <div class="recommend-course_content">
                <div class="recommend-child" v-for="(item, index) in list" :key="index">
                    <CourseItem :item="item" :city-info="cityInfo" />
                </div>
                <div class="recommend-child" v-for="i in 6 - list.length" :key="i"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import CourseLiveItem from './components/course-live-item/index.vue';
import CourseTrialItem from './components/course-trial-item/index.vue';
import CourseClassItem from './components/course-class-item/index.vue';
import CourseItem from './components/course-item/index.vue';
import SelectProject from '@/www/components/index/select-project/index.vue';
import '@/api/api..query-show-module.js';
import '@/api/api..query-recommend-course.js';
export default {
    name: 'RecommendCourseSection',
    components: {
        CourseLiveItem,
        CourseTrialItem,
        CourseClassItem,
        CourseItem,
    },
    data() {
        return {
            list: [],
            cityInfo: {},
            isShow: false,
            projectInfo: {},
        };
    },
    mounted() {
        this.selectProject();
    },
    methods: {
        ...mapActions('common/city', {
            getArea: 'getArea',
        }),
        selectProject() {
            let isSelectProject = this.$storage.get('isSelectProject') || '';
            if (isSelectProject) {
                this.getRecommendCourse();
                this.$emit('select-proejct');
                return;
            }
            this.showProjectDialog('首次弹出').then(() => {
                this.$emit('select-proejct');
            });
        },
        showTrack(type) {
            // 显示选择项目弹窗
            const data = {
                open_timing: type, // 学院名称
            };
            this.$yiguan.track('youlu_exam_pop_up_appear', data);
        },
        showProjectDialog(type) {
            this.showTrack(type);
            return this.$baseUI
                .createModel(
                    {
                        modalContent: SelectProject,
                    },
                    {},
                    {
                        width: '1095px',
                        radius: '16px',
                        showHead: false,
                        padding: '0',
                    }
                )
                .then(({ ret }) => {
                    if (ret.check === true) {
                        console.log('选择项目');
                        this.$storage.set('indexSelectProject', ret.selectProject);
                        this.$Promotion.setCLueInfo({
                            originCode: 'guanwangzhuc',
                            clueWaycode: 'zhuce',
                            projectCode: ret.selectProject.projectCode ? ret.selectProject.projectCode : '',
                            pageName: '优路教育-点亮职业人生',
                        });
                        this.getRecommendCourse();
                    }
                    this.$storage.set('isSelectProject', true);
                });
        },
        getRecommendCourse() {
            const projectInfo = this.$storage.get('indexSelectProject');
            if (!projectInfo) {
                return;
            }
            this.projectInfo = projectInfo;
            this.isShow = true;
            this.getArea().then((res) => {
                this.cityInfo = res;
                const data = {
                    url: 'public/query-recommend-course',
                    params: {
                        projectId: projectInfo.ptagId ? projectInfo.ptagId : projectInfo.projectId,
                        pageIndex: 0,
                        pageSize: 5,
                        areacode: res.cityCode,
                        projectType: projectInfo.ptagId ? 'T' : 'P',
                        showClient: 'W',
                    },
                    isCustom: false,
                };
                this.httpClient(data).then((res) => {
                    this.list = res;
                });
            });
        },
        httpClient({ url, params = {}, isCustom = false }) {
            return this.$callApi(url, {
                ...params,
            }).then(
                (res) => {
                    return res.getData();
                },
                (err) => {
                    if (!isCustom) this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                }
            );
        },
    },
};
</script>
<style lang="less" scoped>
.recommend-course_box {
    .recommend-course {
        width: 1200px;
        height: 614px;
        background: url('./asset/images/recommend-bgc.png') 100% 100% no-repeat;
        margin: 110px 0 64px 0;
        padding: 0 24px 24px;
        box-sizing: border-box;
        position: relative;
        .recommend-course_header {
            width: 100%;
            height: 94px;
            display: flex;
            align-items: center;
            position: relative;
        }
        .header-title {
            margin-right: 56px;
            img {
                width: 116px;
                height: 28px;
            }
        }
        .recommend-course_content {
            width: 100%;
            height: 496px;
            background: #ffffff;
            border-radius: 16px;
            display: flex;
            flex-wrap: wrap;
            padding: 32px;
            box-sizing: border-box;
            position: relative;
            z-index: 6;
            .recommend-child {
                width: 540px;
                height: 125px;
            }
        }
        .project-name {
            margin-right: 16px;
            font-size: 14px;
            color: #3a3d4b;
        }
        .recommend-handle {
            font-size: 12px;
            color: #99a1af;
            padding-left: 20px;
            background-image: url(./asset/images/change.png);
            background-repeat: no-repeat;
            background-size: 16px 16px;
            background-position: left center;
            cursor: pointer;
        }
        .header-label_img {
            width: 72px;
            height: 38px;
            position: absolute;
            right: 321px;
            top: 56px;
            z-index: 6;
        }
        .animation-img {
            width: 318px;
            height: 180px;
            position: absolute;
            right: 64px;
            top: -62px;
            z-index: 5;
        }
    }
}
</style>
