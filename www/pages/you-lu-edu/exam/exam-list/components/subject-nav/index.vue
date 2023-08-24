<template>
    <div ref="subjectList" class="subject-list" :style="{ height: height === 0 ? 'auto' : height + 'px' }" :class="{ expand }">
        <div
            v-for="(item, index) in subjectList"
            :key="index"
            class="subject-item"
            :class="{ active: subjectId === item.subjectId }"
            @click="setSubjectId(item.subjectId)"
        >
            {{ item.subjectName }}
        </div>
        <img v-if="showImg" class="top-img" src="../../../assets/img/top.png" alt="" @click="clickExpand" />
    </div>
</template>

<script>
import mix from '../mixins/index.js';
import track from '@/www/components/course/trial-course/js/track.js';
import '@/api/qb/api.QB0001.subject-profile-list.js';
import '@/api/qb/api..qb-business-subject-convert.js';
import '@/api/bd/api.BD4928.query-subject-ptag-list.js';

export default {
    mixins: [mix, track],
    data() {
        return {
            height: 0,
            showImg: false,
            subjectId: '', // 科目id
            classUniquecode: '', // 项目编码
            subjectList: [],
            expand: false, // 科目是否展开
        };
    },
    mounted() {
        var examProject = this.$storage.get('examProject');
        var ptagId = examProject ? examProject.ptagId : '';
        var projectCode = examProject ? examProject.projectCode : '';
        this.classUniquecode = projectCode;
        this.subjectId = this.$route.params.subjectId || this.$storage.get('examSubjectId');
        if (ptagId) {
            this.getPtagSubjects(ptagId);
        } else {
            this.getSubjects();
        }
    },
    methods: {
        // 展开/收起项目
        clickExpand() {
            this.expand = !this.expand;
        },
        setSubjectId(subjectId, isReplace = false) {
            if (!isReplace) {
                if (this.subjectId === subjectId) {
                    return;
                }
            }
            var papertypeCode = this.$route.params.papertypeCode;
            var ptagId = this.$route.params.ptagId;
            this.subjectId = subjectId;
            this.$storage.set('examSubjectId', this.subjectId);
            this.$storage.set(
                'examSubject',
                this.subjectList.find((item) => item.subjectId === this.subjectId)
            );
            if (this.subjectId !== this.$route.params.subjectId) {
                this.$router.replace(`/exam/index/list/${this.classUniquecode}/${ptagId}/${papertypeCode}/${this.subjectId}`);
            } else {
                const { projectName } = this.$storage.get('examProject') || {};
                const { subjectName } = this.$storage.get('examSubject') || {};
                const examType = {
                    ZJLX: '章节刷题',
                    LNZT: '历年真题',
                    MNST: '模拟试卷',
                    ZNLX: '智能练习',
                    DQZL: '地区专练',
                    MKDS: '模拟考试',
                };
                const pageTitle = `${projectName}-${subjectName}_${examType[papertypeCode]}_优路教育题库`;
                this.eaSetClueInfo({
                    pageTitle,
                    originCode: papertypeCode === 'MKDS' ? this.originCodeMoKao : this.originCode,
                });
            }
            const { projectId } = this.$storage.get('examProject') || {};
            this.trackWebYouluClickCourse({
                project_id: projectId,
                subject_id: subjectId,
                page_type: '题库项目首页',
                page_name: document.title,
                course_type: '题库',
            });
        },
        // 获取科目列表
        getSubjects() {
            niceloo.api.call('qb/subject-profile-list', {
                classUniquecode: this.classUniquecode,
                onsuccess: (res) => {
                    console.log(res);
                    if (res.data && res.data.length) {
                        this.subjectList = res.data;
                        var subjectIds = res.data.map((item) => item.subjectId);
                        this.subjectId = subjectIds.includes(this.subjectId) ? this.subjectId : '';
                        this.setSubjectId(this.subjectId || subjectIds[0], true);
                        this.setSubjectListHeight();
                    }

                    if (res.data.length === 0) {
                        this.$emit('no-project');
                    }
                },
                onerror: () => {
                    this.$emit('no-project');
                },
                oncomplete: () => {},
            });
        },
        // 科目转换
        subjectConversion(subjectIds) {
            niceloo.api.call('qb/qb-business-subject-convert', {
                bdsubjectIds: subjectIds,
                onsuccess: (res) => {
                    console.log(res);
                    if (res.subjectInfos && res.subjectInfos.length) {
                        this.subjectList = res.subjectInfos;
                        var subjectIds = res.subjectInfos.map((item) => item.subjectId);
                        this.subjectId = subjectIds.includes(this.subjectId) ? this.subjectId : '';
                        this.setSubjectId(this.subjectId || subjectIds[0], true);
                        this.setSubjectListHeight();
                    }
                    if (res.subjectInfos.length === 0) {
                        this.$emit('no-project');
                    }
                },
                onerror: () => {
                    this.$emit('no-project');
                },
                oncomplete: () => {},
            });
        },
        // 获取科目列表
        getPtagSubjects(ptagId) {
            niceloo.api.call('bd/query-subject-ptag-list', {
                ptagId,
                onsuccess: (res) => {
                    console.log(res);
                    var subjectIds = res.data.map((item) => {
                        return item.subjectId;
                    });
                    this.subjectConversion(subjectIds);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        // 设置选择科目高度
        setSubjectListHeight() {
            this.$nextTick(() => {
                var offsetHeight = this.$refs.subjectList.offsetHeight;
                this.showImg = offsetHeight > 106;
                if (offsetHeight <= 53) {
                    this.height = 53;
                    return;
                }
                this.height = 106;
            });
        },
    },
};
</script>

<style lang="less" scoped>
.subject-list {
    position: relative;
    padding-right: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    // height: 106px;
    overflow: hidden;
    // background: #fff;
    .top-img {
        position: absolute;
        right: 0;
        bottom: 30px;
        width: 30px;
        height: 20px;
        cursor: pointer;
        transform: rotate(0);
        transition: all 0.3s;
    }
    .subject-item {
        margin-right: 8px;
        margin-bottom: 25px;
        padding: 0 16px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #3a3d4b;
        line-height: 28px;
        // background: rgba(255, 236, 232, 0.2);
        cursor: pointer;
        &.active {
            color: #ff2e30;
            background: #ffece8;
            border-radius: 4px;
        }
        &:hover {
            color: #ff2e30;
        }
    }
    &.expand {
        height: auto !important;
        .top-img {
            transform: rotate(180deg);
        }
    }
}
</style>
