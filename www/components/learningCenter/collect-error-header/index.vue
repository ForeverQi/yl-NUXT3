<template>
    <div class="collect-error-header-box">
        <!-- 小题库-我的题库页面内不显示 -->
        <div class="collect-error-header" v-if="questionBankStatus !== 'special'">
            <div class="project">
                <img v-if="isError" class="img" src="./asset/errorbook.png" alt="" />
                <img v-else class="img" src="./asset/favorites.png" alt="" />
                <p class="title">{{ isError ? '错题本' : '收藏夹' }}</p>
                <div class="collect-error-select select-box" @click="openOption">
                    <div class="collect-error-select select-text">{{ project.projectName }}</div>
                    <img class="collect-error-select bottom" :class="{ active: showOption }" src="./asset/bottom.png" alt="" />
                    <ul class="collect-error-select options" ref="options" :class="{ active: showOption }">
                        <li
                            v-for="(item, index) in projectList"
                            :key="index"
                            class="collect-error-select option-item"
                            :class="{ active: project.projectCode === item.projectCode }"
                            @click.stop="handleOption(item)"
                        >
                            {{ item.projectName }}
                        </li>
                        <li v-if="!projectList.length" class="collect-error-select option-item none">暂无项目</li>
                    </ul>
                </div>
            </div>
            <div class="subject">
                <div v-for="(item, index) in topSubjectList" :key="index" class="subject-item" @click="handleSubject(item)">
                    <img v-if="item.subjectId === subjectId" class="img" src="./asset/subject_icon.png" alt="" />
                    <img v-else class="img" src="./asset/subject_icon2.png" alt="" />
                    <p class="subject-title" :class="{ active: item.subjectId === subjectId }" :title="item.subjectName">{{ item.subjectName }}</p>
                    <div v-if="index !== topSubjectList.length - 1" class="border" />
                </div>
                <div v-if="subjectList.length > 5" class="subject-all btn" @click="openSubject">
                    <p class="subject-all text">{{ showSubject ? '收起' : '展开' }}</p>
                    <img class="subject-all bottom" :class="{ active: showSubject }" src="./asset/top.png" alt="" />
                </div>
                <div class="subject-all-box" :class="{ active: showSubject }">
                    <img class="img" src="./asset/all_top.png" alt="" />
                    <div
                        v-for="(item, index) in subjectList"
                        :key="index"
                        class="subject-all-item"
                        :class="{ active: item.subjectId === subjectId }"
                        @click="handleSubject(item, index >= 4 ? index : -1)"
                    >
                        {{ item.subjectName }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@/api/cc/api..study-tool-project-list.js';
import '@/api/cc/api..study-tool-subject-list.js';
import '@/api/qb/api..qb-business-subject-convert.js';
export default {
    props: {
        isError: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showOption: false, // 打开项目下拉框
            showSubject: false, // 打开科目选择弹窗
            project: {
                projectId: '', // 选择的项目id
                projectCode: '',
                projectName: '', // 选择的项目名称
            },
            subjectName: '', // 选择科目名称
            subjectId: '', // 选择的科目id
            projectList: [], // 项目列表
            topSubjectList: [], // 前五条科目列表
            subjectList: [], // 科目列表
        };
    },
    computed: {
        /**
         * @returns {string} special: 从专项小题库进入
         */
        questionBankStatus() {
            return this.$route.query.questionBankStatus;
        },
    },
    async mounted() {
        document.addEventListener('click', (e) => {
            var classNames = e.target.className.split(' ');
            if (classNames.indexOf('collect-error-select') === -1 && this.$refs.options) {
                this.$refs.options.style.height = 0;
                this.showOption = false;
            }
            if (classNames.indexOf('subject-all') === -1) {
                this.showSubject = false;
            }
        });
        this.project.projectCode = this.$route.query.projectCode || '';
        this.subjectId = this.$route.query.subjectId || '';
        var baseSubjectId = this.$route.query.baseSubjectId || '';
        if (baseSubjectId) {
            await this.subjectConversion([baseSubjectId], true);
        }
        await this.getProjectList();
    },
    methods: {
        // 设置项目下拉框高度
        openOption() {
            this.showOption = !this.showOption;
            this.$refs.options.style.height = (this.showOption ? (this.projectList.length ? this.projectList.length : 1) * 34 : 0) + 'px';
        },
        // 项目点击事件
        handleOption(item) {
            // console.log(item);
            if (this.project.projectId === item.projectId) return;
            this.project = item;
            this.$refs.options.style.height = 0;
            this.showOption = false;
            this.subjectId = '';
            this.getSubject();
            this.$emit('handle-project', this.project);
        },
        // 展开全部科目选择弹窗
        openSubject() {
            this.showSubject = !this.showSubject;
        },
        // 科目点击事件
        handleSubject(item, index = -1) {
            if (this.subjectId === item.subjectId) return;
            if (index !== -1) {
                this.topSubjectList.splice(4, 1, item);
            }
            this.subjectId = item.subjectId;
            this.subjectName = item.subjectName;
            this.$emit('handle-subject', {
                classUniquecode: this.project.projectCode,
                projectId: this.project.projectId,
                projectName: this.project.projectName,
                subjectId: this.subjectId,
                subjectName: this.subjectName,
            });
        },
        //  获取项目列表
        getProjectList() {
            niceloo.api.call('cc/study-tool-project-list', {
                studyTool: this.isError ? 'questionBook' : 'favorites',
                onsuccess: (res) => {
                    // console.log(res);
                    var isBreak = false;
                    this.projectList = res;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].projectCode && res[i].projectCode === this.project.projectCode) {
                            this.project = res[i];
                            isBreak = true;
                            this.getSubject();
                        }
                    }
                    if (!isBreak && res.length) {
                        this.project = res[0];
                        this.getSubject();
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        // 获取科目列表
        getSubject() {
            this.subjectList = [];
            this.topSubjectList = [];
            niceloo.api.call('cc/study-tool-subject-list', {
                studyTool: this.isError ? 'questionBook' : 'favorites',
                projectId: this.project.projectId,
                onsuccess: (res) => {
                    // console.log(res);
                    var subjectIds = res.map((item) => {
                        return item.subjectId;
                    });
                    if (subjectIds.length) {
                        this.subjectConversion(subjectIds);
                    } else {
                        this.$emit('reset-data');
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        // 科目转换
        subjectConversion(subjectIds, isOne = false) {
            this.subjectList = [];
            this.topSubjectList = [];
            niceloo.api.call('qb/qb-business-subject-convert', {
                bdsubjectIds: subjectIds,
                onsuccess: (res) => {
                    // console.log(res);
                    if (!res.subjectInfos.length) {
                        this.$emit('reset-data');
                        return;
                    }
                    if (!isOne) {
                        this.subjectList = res.subjectInfos;
                        this.topSubjectList = res.subjectInfos.slice(0, 5);
                    }
                    if (res.subjectInfos.length && !this.subjectId) {
                        this.handleSubject(res.subjectInfos[0]);
                        return;
                    }
                    if (this.subjectId && this.project.projectCode) {
                        var index = -1;
                        for (let i = 0; i < this.subjectList.length; i++) {
                            if (this.subjectId === this.subjectList[i].subjectId) {
                                index = i;
                            }
                        }
                        if (index !== -1 && index > 5) {
                            this.topSubjectList.splice(4, 1, this.subjectList[index]);
                        }
                        // 设置科目名称
                        const subjectName = index !== -1 ? this.subjectList[index].subjectName : '';
                        this.$emit('handle-subject', {
                            subjectId: this.subjectId,
                            classUniquecode: this.project.projectCode,
                            projectId: this.project.projectId,
                            projectName: this.project.projectName,
                            subjectName,
                        });
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
};
</script>

<style lang="less" scoped>
.collect-error-header-box {
    .collect-error-header {
        padding: 15px 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 8px;
        background: #fff;
    }
    .project {
        display: flex;
        align-items: center;
        .img {
            margin-right: 8px;
            width: 32px;
            height: 32px;
        }
        .title {
            flex-shrink: 0;
            font-size: 14px;
            font-weight: 400;
            color: #3a3d4b;
            line-height: 19px;
            letter-spacing: 0.58px;
        }
        .select-box {
            margin-left: 20px;
            padding: 0 16px;
            position: relative;
            width: 202px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f6f7fb;
            border-radius: 4px;
            cursor: pointer;
            .select-text {
                height: 32px;
                font-size: 12px;
                font-weight: 400;
                color: #3a3d4b;
                line-height: 32px;
            }
            .bottom {
                width: 12px;
                height: 12px;
                transition: all 0.3s;
                transform: rotate(0);
                &.active {
                    transform: rotate(180deg);
                    transition: all 0.3s;
                }
            }
            .options {
                position: absolute;
                left: 0;
                top: 32px;
                right: 0;
                margin: 0;
                margin-top: 8px;
                padding: 0;
                height: 0;
                border-radius: 4px;
                overflow: hidden;
                background-color: #fff;
                border: 0px solid #e4e7ed;
                box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
                transition: all 0.3s;
                z-index: 10;
                .option-item {
                    font-size: 14px;
                    padding: 0 20px;
                    position: relative;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #606266;
                    height: 34px;
                    line-height: 34px;
                    box-sizing: border-box;
                    cursor: pointer;
                    &.active {
                        color: rgb(255, 46, 48);
                    }
                    &:hover {
                        background-color: #f5f7fa;
                    }
                    &.none {
                        text-align: center;
                    }
                }
                &.active {
                    padding: 5px 0px;
                    border: 1px solid #e4e7ed;
                    transition: all 0.3s;
                }
            }
        }
    }
    .subject {
        position: relative;
        display: flex;
        align-items: center;
        .subject-item {
            margin-left: 26px;
            display: flex;
            align-items: center;
            cursor: pointer;
            .img {
                margin-right: 2px;
                width: 16px;
                height: 16px;
            }
            .subject-title {
                max-width: 85px;
                font-size: 14px;
                font-weight: 400;
                color: #53586c;
                line-height: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &.active {
                    color: rgb(255, 46, 48);
                }
            }
            .border {
                margin-left: 24px;
                width: 1px;
                height: 10px;
                background: #d5d9d9;
            }
        }
        .btn {
            flex-shrink: 0;
            margin-left: 42px;
            display: flex;
            align-items: center;
            cursor: pointer;
            .text {
                font-size: 14px;
                font-weight: 400;
                text-align: left;
                color: #99a1af;
                line-height: 19px;
                opacity: 0.8;
            }
            .bottom {
                margin-left: 9.5px;
                width: 12px;
                height: 12px;
                transform: rotate(180deg);
                transition: all 0.3s;
                &.active {
                    transform: rotate(0);
                    transition: all 0.3s;
                }
            }
        }
        .subject-all-box {
            position: absolute;
            top: 54px;
            right: -32px;
            padding: 27px 16px 12px 16px;
            display: none;
            align-items: center;
            flex-wrap: wrap;
            background: #fff;
            border-radius: 6px;
            z-index: 10;
            box-shadow: 0px 6px 16px 0px rgba(233, 233, 233, 0.5);
            .img {
                position: absolute;
                right: 37px;
                top: -5px;
                width: 14px;
                height: 5px;
            }
            .subject-all-item {
                margin-bottom: 20px;
                padding: 4px 15px;
                font-size: 14px;
                font-weight: 400;
                color: #3a3d4b;
                line-height: 19px;
                border-radius: 6px;
                cursor: pointer;
                &.active {
                    color: #ff2e30;
                    background: rgb(255, 236, 232);
                    box-shadow: 0px 6px 16px 0px rgba(233, 233, 233, 0.5);
                }
            }
            &.active {
                display: flex;
            }
        }
    }
}
</style>
