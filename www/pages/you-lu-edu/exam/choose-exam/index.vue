<template>
    <div class="select-exam">
        <div class="title-box">
            <p class="title">选择考试</p>
            <p class="title-content">选择考试项目，进入题库刷题！</p>
        </div>
        <div class="select-box" ref="selectBox">
            <div class="project-list" ref="collegeList">
                <div
                    v-for="item in collegeList"
                    :key="item.collegeId"
                    :ref="'project_' + item.collegeId"
                    class="project-item"
                    :class="collegeActive === item.collegeId ? 'active' : ''"
                    @click="handleClickCollege(item)"
                >
                    {{ item.collegeName }}
                </div>
            </div>
            <div ref="projectList" class="subject-list">
                <div v-for="item in collegeList" :key="item.collegeId" class="subject-box" :ref="item.collegeId">
                    <div class="subject-title">{{ item.collegeName }}</div>
                    <div v-if="item.children" class="subject-type-item">
                        <div
                            v-for="childItem in item.children"
                            :key="childItem.ptagId ? childItem.ptagId : childItem.projectId"
                            class="subject-item"
                            :class="
                                childItem.ptagId ? (projectActive === childItem.ptagId ? 'active' : '') : projectActive === childItem.projectId ? 'active' : ''
                            "
                            @click="handleClickProject(item, childItem)"
                        >
                            {{ childItem.ptagId ? `${childItem.projectName} - ${childItem.ptagName}` : childItem.projectName }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import mix from '../exam-list/components/mixins/index.js';
import track from '@/www/components/course/trial-course/js/track.js';
import '@/api/qb/api.BD4912.query-studentclass-queryproject.js';

export default {
    mixins: [mix, track],
    data() {
        return {
            collegeActive: '', // 选中的学院
            projectActive: '', // 选中的项目
            subjectId: '', // 项目id
            collegeList: [], // 学院列表
            projectList: [], // 项目列表
            projectOffsetTops: [], // 右侧项目dom 距父级最顶部高度
            scollLock: false, // 动画锁
            lockTimer: null, // 动画锁定时器
        };
    },
    head() {
        return this.$head({
            title: '选择考试项目_优路教育题库',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '在线题库,题库,刷题,真题,历年真题,考试试题,试题,模拟考试,模拟试题,优路,优路教育,优路教育网,国家职业资格考试,在线教育,在线培训,职业教育,素质提升,技能提升,建筑工程考试,消防考试,一级建造师,二级建造师,一级消防工程师,四级英语,六级英语,大学生,公务员,考公考编,心理咨询,初级会计师,财税金融,医卫康养,教师,法律,学历,学历提升',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育 | 题库中心，海量题库资源选择，每日一练、随机抽题、章节训练，历年真题、模拟试卷、模拟考试。',
                },
            ],
        });
    },
    mounted() {
        var examCollege = this.$storage.get('examCollege');
        var examProject = this.$storage.get('examProject');
        this.collegeActive = examCollege ? examCollege.collegeId : '';
        this.projectActive = examProject ? (examProject.ptagId ? examProject.ptagId : examProject.projectId) : '';
        this.getProjectTree().then((res) => {
            this.collegeList = res.slice();
            this.getLoaginStatus();
            this.$nextTick(() => {
                if (!this.$refs.projectList) {
                    return;
                }
                for (let i = 0; i < this.$refs.projectList.children.length; i++) {
                    let offsetTop = this.getOffsetTop(this.$refs.projectList.children[i].offsetTop);
                    this.projectOffsetTops.push(offsetTop);
                }
                this.$refs.projectList.addEventListener('scroll', this.scrollEvent);
            });
        });
        const { source } = this.$route.params;
        this.eaSetClueInfo({
            isForce: source !== 'user',
            clueWaycode: 'zhuce',
            pageTitle: '选择考试项目_优路教育题库',
        });
        source === 'user' && history.replaceState(null, null, location.pathname.replace('/user', ''));

        const examSubject = this.$storage.get('examSubject');
        // this.t-rackWebYouluClickAllPages({
        //     page_type: '题库选择项目页',
        //     page_name: this.pageTitle,
        //     course_name: '题库',
        //     course_type: '题库',
        //     college_name: examCollege?.collegeId ?? '',
        //     project_position: examProject?.projectId ?? '',
        //     subject_name: examSubject?.subjectId ?? '',
        // });

        this.$yiguan.track('youlu_click_all_pages', {
            page_name: '选择考试项目_优路教育题库', // 页面名称
            page_url: location.href,
            page_type: '题库-项目选择页',
            course_type: '题库',
            sort_name: '-',
            channel_name: '-',
            project_id: examProject?.projectId ?? '-',
            subject_id: examSubject?.subjectId ?? '-',
        });
    },
    methods: {
        ...mapActions('common/project-tree', {
            getProjectTree: 'getProjectTree',
        }),
        scrollEvent() {
            let scrollTop = this.$refs.projectList ? this.$refs.projectList.scrollTop : 0;
            if (!this.scollLock) {
                for (let i = 0; i < this.projectOffsetTops.length; i++) {
                    if (this.projectOffsetTops[i] >= scrollTop) {
                        this.collegeActive = this.collegeList[i].collegeId;
                        let targetOffsetTop = this.getOffsetTop(this.$refs['project_' + this.collegeActive][0].offsetTop);
                        if (this.$refs.collegeList.scrollTo) {
                            this.$refs.collegeList.scrollTo({
                                top: targetOffsetTop,
                                behavior: 'smooth',
                            });
                        } else {
                            this.$refs.collegeList.scrollTop = targetOffsetTop;
                        }
                        // this.$refs.collegeList.scrollTop = targetOffsetTop;

                        break;
                    }
                }
            } else {
                if (this.lockTimer) {
                    clearTimeout(this.lockTimer);
                }
                this.lockTimer = setTimeout(() => {
                    this.scollLock = false;
                    this.lockTimer = null;
                }, 500);
            }
        },
        // 获取实际距父级元素高度
        getOffsetTop(targetOffsetTop) {
            let parentOffsetTop = this.$refs.selectBox.offsetTop + 40;
            let offsetTop = targetOffsetTop - parentOffsetTop;
            return offsetTop;
        },
        // 学院点击事件
        handleClickCollege(item) {
            this.scollLock = true;
            this.collegeActive = item.collegeId;
            var targetOffsetTop = this.getOffsetTop(this.$refs[this.collegeActive][0].offsetTop);
            this.$refs.projectList.scrollTo({
                top: targetOffsetTop,
                behavior: 'smooth',
            });
        },
        // 项目点击事件
        handleClickProject(collegeItem, projectItem) {
            this.collegeActive = collegeItem.collegeId;
            this.projectActive = projectItem.ptagId || projectItem.projectId;
            this.$storage.set('examProject', projectItem);
            this.$storage.set('examCollege', collegeItem);
            sessionStorage.setItem('firstLoagin', 1);
            var sourceParams = this.$route.params.source;
            this.$yiguan.track('youlu_project_switch', {
                college_belong: this.collegeActive ? this.collegeActive : '-',
                project_belong: this.projectActive ? this.projectActive : '-',
                course_type: '题库',
                page_name: document.title,
            });
            var path = `/exam/index/list/${projectItem.projectCode}/${projectItem.ptagId ? projectItem.ptagId : projectItem.projectCode}/ZJLX`;
            switch (sourceParams) {
                // 错题本
                case 'collection':
                    path = `/exam/index/collection/CTB/${projectItem.projectCode}/${projectItem.ptagId ? projectItem.ptagId : projectItem.projectCode}/ZJLX`;
                    break;
                default:
                    path = `/exam/index/list/${projectItem.projectCode}/${projectItem.ptagId ? projectItem.ptagId : projectItem.projectCode}/ZJLX`;
                    break;
            }
            this.$router.push(path);
        },
        // 获取已购项目
        getBuyProject() {
            niceloo.api.call('qb/query-studentclass-queryproject', {
                onsuccess: (res) => {
                    if (Array.isArray(res) && res.length > 0) {
                        this.collegeList.unshift({
                            children: [...res],
                            collegeCode: '',
                            collegeId: 'all',
                            collegeLevelCode: '',
                            collegeName: '已报班项目',
                            collegeSeoCode: null,
                        });
                    }
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        // 获取登录状态
        getLoaginStatus() {
            var promise = ylPlugin.login.isLogined();
            promise.then(
                /* 过程中没有失败 */
                (isLogined) => {
                    /* eslint-disable */
                    if (!!isLogined) {
                        this.getBuyProject();
                    }
                },
                (err) => {
                    /* 过程中有失败 */
                    console.error(err, '登录状态失败');
                }
            );
        },
    },
};
</script>

<style lang="less" scoped>
.select-exam {
    margin: 0 auto;
    width: 1200px;
    padding-bottom: 54px;
}
.title-box {
    margin: 32px 0;
    .title {
        font-size: 24px;
        font-weight: 700;
        color: #3a3d4b;
        line-height: 32px;
    }
    .title-content {
        margin-top: 12px;
        font-size: 16px;
        font-weight: 400;
        color: #77798d;
        line-height: 16px;
        letter-spacing: 0.67px;
    }
}
.select-box {
    padding: 40px;
    padding-right: 8px;
    height: 881px;
    display: flex;
    background: #fff;
    .project-list {
        margin-right: 56px;
        flex-shrink: 0;
        // height: 881px;
        overflow-y: auto;
        &::-webkit-scrollbar {
            display: none;
        }
        .project-item {
            margin-bottom: 8px;
            width: 146px;
            height: 50px;
            font-size: 16px;
            font-weight: 400;
            text-align: center;
            line-height: 50px;
            letter-spacing: 0.3px;
            border-radius: 8px;
            background: #f7f8f9;
            cursor: pointer;
            &.active,
            &:hover {
                color: #fff;
                background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
            }
        }
    }
    .subject-list {
        overflow-y: auto;
        &::-webkit-scrollbar {
            background: rgba(0, 0, 0, 0);
        }
        &::-webkit-scrollbar-thumb {
            background: rgb(171, 171, 171);
        }
        .subject-title {
            display: block;
            margin-bottom: 24px;
            font-size: 18px;
            font-weight: 700;
            color: #3a3d4b;
            line-height: 24px;
            letter-spacing: 0.34px;
        }
        .subject-box {
            .subject-type-item {
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                .subject-item {
                    margin-right: 12px;
                    margin-bottom: 20px;
                    padding: 0 24px;
                    height: 36px;
                    font-size: 14px;
                    text-align: center;
                    line-height: 36px;
                    background: #f7f8f9;
                    border: 1px solid rgba(0, 0, 0, 0.04);
                    border-radius: 23px;
                    cursor: pointer;
                    &.active,
                    &:hover {
                        color: #ff2e30;
                    }
                }
            }
        }
    }
}
</style>
