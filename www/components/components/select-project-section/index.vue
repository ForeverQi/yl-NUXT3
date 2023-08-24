<template>
    <div class="sps-wrapper">
        <div class="cd-wrapper" ref="cdList">
            <h4 class="cd-title">选择方向：</h4>
            <ul class="cd-list">
                <li
                    v-for="(item, index) in dataList"
                    :class="['cd-item', item.isChecked ? 'cd-item-checked' : '']"
                    :key="index"
                    @click.prevent="handleItemClick(item, $event)"
                >
                    {{ item.collegeName }}
                </li>
            </ul>
        </div>
        <div
            :class="[
                'cd-wrapper',
                'cd-project',
                isProjectExpand ? 'cd-wrapper-expand' : '',
                isProjectExpand === false && isProjectShowMore ? 'cd-more-expand' : '',
                isProjectExpand && isProjectShowMore ? 'cd-more-collapse' : '',
                isProjectExpand && isProjectShowMoreMax ? 'cd-more-direction' : '',
            ]"
            @mouseleave="handleProjectMouseleave"
        >
            <h4 class="cd-title">选择考试：</h4>
            <ul class="cd-list" ref="ceList" :style="projectListStyle">
                <li
                    v-for="(item, index) in projectList"
                    :class="['cd-item', item.isChecked ? 'cd-item-checked' : '']"
                    :key="index"
                    @click.prevent="handleProjectItemClick(item, $event)"
                >
                    {{ item.projectType === 'child' ? `${item.projectName} - ${item.ptagName}` : item.projectName }}
                </li>
            </ul>
            <div v-if="isProjectExpand && isProjectShowMoreMax" class="cd-dire-more" @click.prevent="handleProjectMouseleave">[选择方向]查看更多考试</div>
            <img
                src="./asset/images/expand.png"
                class="more-icon"
                @mouseenter="handleProjectMouseenter"
                v-show="isProjectExpand === false && isProjectShowMore"
            />
        </div>
    </div>
</template>
<script>
import '@/api/ctc/api..query-ctc-project-tree';

export default {
    props: {
        collegeId: {
            type: String,
            default: '',
        },
        collegeSeoCode: {
            type: String,
            default: '',
        },
        projectId: {
            type: String,
            default: '',
        },
        projectSeoCode: {
            type: String,
            default: '',
        },
        ptagId: {
            type: String,
            default: '',
        },
        cacheDuration: {
            type: Number,
            default: 180,
        },
    },
    data() {
        return {
            dataList: [],
            projectList: [],
            sectionScrollHeight: 48,
            projectScrollHeight: 48,
            projectListStyle: {
                height: '48px',
                overflow: 'hidden',
                top: 'auto',
                zIndex: 5,
                left: 0,
            },
            isProjectExpand: false,
            currentCollege: null,
            currentProject: null,
            isTransiting: false,
        };
    },
    fetch() {
        return this.getDataList();
    },
    computed: {
        isProjectShowMore() {
            return this.projectScrollHeight > 50;
        },
        isProjectShowMoreMax() {
            return this.projectScrollHeight > 235;
        },
    },
    watch: {
        collegeId() {
            this.updateDefault();
        },
        collegeSeoCode() {
            this.updateDefault();
        },
        projectId() {
            this.updateProjectDefault();
        },
    },
    methods: {
        getDataList() {
            return new Promise((resolve, reject) => {
                if (process.client) {
                    const treeData = this.$storage.get('select_project_section');
                    if (treeData) {
                        return resolve({
                            treeData,
                            cache: true,
                        });
                    }
                }
                this.$callApi('ctc/query-ctc-project-tree', {
                    projectShowStatus: 'yes',
                    onsuccess: resolve,
                    onerror: reject,
                });
            })
                .then(({ treeData, cache }) => {
                    if (this.$platform.isClient() && cache !== true) {
                        this.$storage.set('select_project_section', treeData, this.cacheDuration);
                    }
                    const t = treeData.map((item) => item);
                    let i = 0;
                    while (i < t.length) {
                        t[i].isChecked = false;
                        if (t[i].children && t[i].children.length > 0) {
                            t.push(...t[i].children);
                        }
                        ++i;
                    }
                    t.splice(0, t.length);

                    this.dataList.splice(
                        0,
                        this.dataList.length,
                        {
                            collegeId: '',
                            collegeName: '全部',
                            isChecked: true,
                            children: [...treeData],
                            isAll: true,
                        },
                        ...treeData
                    );
                })
                .catch((err) => {
                    console.warn(err);
                    this.$niceloo.api.handleFailure(err);
                    this.dataList.splice(0, this.dataList.length, {
                        collegeId: '',
                        collegeName: '全部',
                        isChecked: true,
                        children: [],
                        isAll: true,
                    });
                })
                .finally(() => {
                    this.updateDefault();
                    this.$nextTick(() => {
                        this.sectionScrollHeight = this.$refs.cdList?.scrollHeight ?? 48;
                    });
                });
        },
        updateDefault() {
            console.warn('updateDefault');
            this.dataList.forEach((item) => {
                if (!this.collegeId && !this.collegeSeoCode && (this.projectId || this.projectSeoCode || this.ptagId)) {
                    const o = item.children.find((citem) => {
                        if (citem.projectType === 'child') {
                            if (this.ptagId) {
                                return citem.ptagId === this.ptagId;
                            } else {
                                return citem.projectSeoCode && citem.projectSeoCode === this.projectSeoCode;
                            }
                        } else {
                            return (
                                !item.isAll && ((citem.projectSeoCode && citem.projectSeoCode === this.projectSeoCode) || citem.projectId === this.projectId)
                            );
                        }
                    });
                    item.isChecked = !!o;
                } else {
                    item.isChecked = (!item.isAll && item.collegeId === this.collegeId) || (!item.isAll && item.collegeSeoCode === this.collegeSeoCode);
                }
            });
            this.currentCollege = this.dataList.find((item) => item.isChecked);
            if (!this.currentCollege) {
                this.dataList.forEach((item) => (item.isChecked = !!item.isAll));
                this.currentCollege = this.dataList.find((item) => item.isChecked);
            }
            if (!this.currentCollege) {
                console.warn('没有默认选中的学院', this.dataList);
                return;
            }
            this.$emit('college-change', this.currentCollege);
            this.updateProjectDefault();
            this.$nextTick(this.calIsShowMore);
        },
        updateProjectDefault() {
            if (!this.currentCollege) {
                return;
            }
            const cList =
                this.currentCollege.isAll === true
                    ? this.dataList
                          .filter((item) => item.children && item.children.length > 0 && !item.isAll)
                          .map((item) => item.children)
                          .flat(Number.position)
                    : this.currentCollege.children;

            this.projectList.splice(
                0,
                this.projectList.length,
                {
                    projectId: '',
                    projectName: '全部',
                    isChecked: true,
                    children: [...cList],
                    isAll: true,
                },
                ...cList
            );

            this.projectList.forEach((item) => (item.isChecked = false));
            const item = this.projectList.find((item) => {
                if (item.projectType === 'child') {
                    if (this.ptagId) {
                        return item.ptagId === this.ptagId;
                    } else {
                        return item.projectSeoCode && item.projectSeoCode === this.projectSeoCode;
                    }
                } else {
                    return !item.isAll && ((item.projectSeoCode && item.projectSeoCode === this.projectSeoCode) || item.projectId === this.projectId);
                }
            });
            item && (item.isChecked = true);

            this.currentProject = this.projectList.find((item) => item.isChecked);
            if (!this.currentProject) {
                this.projectList.forEach((item) => {
                    item.isChecked = !!item.isAll;
                });
                this.currentProject = this.projectList.find((item) => item.isChecked);
                if (!this.currentProject) {
                    console.warn('没有默认选中的项目', this.projectList);
                    return;
                }
            }
            this.$emit('project-change', this.currentProject, this.currentCollege);
        },
        updateProjectAll() {
            if (!this.currentCollege) {
                return;
            }
            const cList =
                this.currentCollege.isAll === true
                    ? this.dataList
                          .filter((item) => item.children && item.children.length > 0 && !item.isAll)
                          .map((item) => item.children)
                          .flat(Number.position)
                    : this.currentCollege.children;

            this.projectList.splice(
                0,
                this.projectList.length,
                {
                    projectId: '',
                    projectName: '全部',
                    isChecked: true,
                    children: [...cList],
                    isAll: true,
                },
                ...cList
            );

            this.projectList.forEach((item) => {
                item.isChecked = !!item.isAll;
            });

            this.currentProject = this.projectList.find((item) => item.isChecked);
            if (!this.currentProject) {
                console.warn('没有默认选中的项目', this.projectList);
                return;
            }
            this.$emit('project-change', this.currentProject, this.currentCollege);
        },
        handleItemClick(item, $event) {
            this.dataList.forEach((element) => {
                element.isChecked = element.collegeId === item.collegeId;
            });
            this.currentCollege = item;
            this.$emit('college-change', this.currentCollege, $event);
            this.handleProjectCollapseClick();
            this.updateProjectAll();
            this.$nextTick(this.calIsShowMore);
            this.isProjectExpand = false;
        },
        calIsShowMore() {
            this.projectScrollHeight = this.$refs.ceList?.scrollHeight ?? 48;
        },
        handleProjectItemClick(item, $event) {
            this.projectList.forEach((element) => {
                element.isChecked = item.projectType === 'child' ? element.ptagId === item.ptagId : element.projectId === item.projectId;
            });
            this.currentProject = item;
            this.$emit('project-change', this.currentProject, this.currentCollege, $event);
            this.handleProjectMouseleave();
        },
        handleProjectExpandClick() {
            this.projectListStyle.height = `${this.projectScrollHeight > 250 ? 250 : this.projectScrollHeight}px`;
            this.projectListStyle.top = `${this.sectionScrollHeight}px`;
            this.isProjectExpand = true;
            console.warn('handleProjectExpandClick', this.isProjectExpand);
        },
        handleProjectCollapseClick() {
            this.projectListStyle.height = '48px';
            this.projectListStyle.top = 'auto';
        },
        handleTransitionend() {
            this.isProjectExpand = this.projectListStyle.height !== '48px';
            this.isTransiting = false;
        },
        handleTransitionstart() {
            this.isTransiting = true;
        },
        handleProjectMouseenter(e) {
            if (this.isProjectShowMore === false) {
                return;
            }
            // else if (this.isProjectExpand) {
            //     return;
            // } else if (this.isTransiting) {
            //     return;
            // }
            this.handleProjectExpandClick();
        },
        handleProjectMouseleave() {
            if (this.isProjectShowMore === false) {
                return;
            }
            // else if (this.isProjectExpand === false) {
            //     return;
            // } else if (this.isTransiting) {
            //     return;
            // }
            this.handleProjectCollapseClick();
            this.handleTransitionend();
        },
        handleProjectItemMouseenter() {
            if (this.isTransiting) {
                return;
            }
            this.handleProjectMouseenter();
        },
        handleProjectItemMouseleave() {
            if (this.isTransiting) {
                return;
            }
            this.handleProjectMouseenter();
        },
    },
};
</script>
<style scoped lang="less">
h4 {
    border: 0;
    font-weight: normal;
}
.sps-wrapper {
    position: relative;
    padding-bottom: 48px;
}
.cd-wrapper {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    min-height: 48px;
}

.cd-project {
    padding-top: 5px;
    padding-right: 45px;
    position: absolute;
    left: 0;
    right: 0;
}

.cd-wrapper-expand {
    background-color: white;
    border-radius: 12px;
    left: -20px;
    padding-left: 20px;
    padding-bottom: 5px;
    padding-right: 65px;
    position: absolute;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.04);
    width: 1240px;
    z-index: 5;
}

.cd-title {
    color: #3a3d4b;
    font-size: 16px;
    margin-top: 13.5px;
    align-self: flex-start;
}
.cd-list {
    flex: 1;
    // transition: height 0.2s;
    font-size: 14px;
    margin-left: 20px;
}
.cd-item {
    padding: 6.5px 16px;
    display: inline-block;
    margin: 8px 0;
    cursor: pointer;
    color: #3a3d4b;
}
.cd-item + .cd-item {
    margin-left: 8px;
}

.cd-item:hover {
    color: #ff2e30;
    border-radius: 4px;
}
.cd-item-checked {
    background-color: #ffece8;
    color: #ff2e30;
    border-radius: 4px;
}

.more-icon {
    width: 30px;
    height: 20px;
    position: absolute;
    right: 10px;
    top: 20px;
}
.cd-more-expand {
    // background: url('./asset/images/expand.png') right top 23px / 30px 20px no-repeat;
}

.cd-more-collapse {
    background: url('./asset/images/collapse.png') right 23px bottom 23px / 30px 20px no-repeat white;
}

.cd-more-direction {
    padding-bottom: 30px;
}
.cd-dire-more {
    background-color: transparent;
    position: absolute;
    bottom: 24px;
    right: 45px;
    color: #8d90aa;
    overflow: hidden;
    z-index: 10;
    font-size: 12px;
}
</style>
