<template>
    <div class="select-exam">
        <div class="top-arrow-box">
            <img class="top-arrow-img" src="../../../asset/images/top-arrow-icon.png" alt="" />
        </div>
        <div class="select-box" ref="selectBox">
            <img @click="closeSlectProjectDialog" class="close-select-project-img" src="../../../asset/images/close-select-project-icon.png" alt="" />
            <div ref="projectList" class="subject-list">
                <div v-for="item in collegeList" :key="item.columnCategoryId" class="subject-box" :ref="item.columnCategoryId">
                    <div class="subject-title">{{ item.columnCategoryName }}</div>
                    <div v-if="item.columnData" class="subject-type-item">
                        <a
                            :href="childItem.projectPageStatus === 'yes' ? `/channel/${childItem.columnSeoNo}` : childItem.jumpLinkUrl"
                            target="_blank"
                            v-for="childItem in item.columnData"
                            :key="childItem.columnId"
                            :ref="childItem.columnSeoNo"
                        >
                            <div
                                class="subject-item"
                                :class="[childItem.columnSeoNo === projectActive ? 'active' : '']"
                                @click="closeSlectProjectDialog(childItem)"
                            >
                                {{ `${childItem.columnName}` }}
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@/api/public/api..query-category-tree.js';
export default {
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
    fetch() {
        const { channelCode } = this.$route.params;
        this.projectActive = channelCode;
        return this.queryColumnTree();
    },
    methods: {
        queryColumnTree() {
            return new Promise((resolve) => {
                this.$callApi('public/query-category-tree', {
                    // "Y-启用；N-禁用 不传查全部
                    enableStatus: 'Y',
                    onsuccess: (data) => {
                        this.collegeList = data.treeData;
                        for (let index = 0; index < this.collegeList.length; index++) {
                            const element = this.collegeList[index];
                            for (let columnIndex = 0; columnIndex < element.columnData.length; columnIndex++) {
                                if (element.columnData[columnIndex].columnSeoNo === this.projectActive) {
                                    this.$emit('select', element.columnData[columnIndex]);
                                    break;
                                }
                            }
                        }
                        resolve();
                    },
                    onerror: niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            });
        },
        showSelect() {
            for (let index = 0; index < this.collegeList.length; index++) {
                const element = this.collegeList[index];
                for (let columnIndex = 0; columnIndex < element.columnData.length; columnIndex++) {
                    if (element.columnData[columnIndex].columnSeoNo === this.projectActive) {
                        this.$nextTick(() => {
                            this.$refs[element.columnCategoryId][0].scrollIntoView(false);
                        });
                        break;
                    }
                }
            }
        },
        closeSlectProjectDialog(childItem) {
            this.$yiguan.track('youlu_project_switch', {
                college_belong: '-',
                project_belong: childItem.projectIds ? childItem.projectIds : '-',
                course_type: '课程集合页',
                page_name: document.title,
            });
            this.$emit('close');
        },
    },
};
</script>

<style lang="less" scoped>
.select-exam {
    width: 880px;
    height: 500px;
    padding-bottom: 24px;
    border-radius: 8px;
}
.top-arrow-box {
    width: 100%;
    height: 17px;
    .top-arrow-img {
        width: 14px;
        height: 5px;
        margin-left: 264px;
    }
}
.close-select-project-img {
    width: 14px;
    height: 14px;
    position: absolute;
    right: 24px;
    top: 28px;
    cursor: pointer;
}

.select-box {
    position: relative;
    padding: 24px;
    padding-right: 8px;
    height: 500px;
    display: flex;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 12px 0 rgb(58 61 75 / 10%);
    box-sizing: border-box;
    .subject-list {
        overflow-y: auto;
        width: 100%;
        &::-webkit-scrollbar {
            background: rgba(0, 0, 0, 0);
        }
        &::-webkit-scrollbar-thumb {
            background: rgb(171, 171, 171);
        }
        .subject-title {
            display: block;
            margin-bottom: 20px;
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
                display: block \9;
                .subject-item {
                    margin-right: 12px;
                    margin-bottom: 16px;
                    padding: 0 24px;
                    height: 34px;
                    font-size: 14px;
                    text-align: center;
                    line-height: 36px;
                    background: #f7f8f9;
                    border: 1px solid rgba(0, 0, 0, 0.04);
                    border-radius: 23px;
                    cursor: pointer;
                    display: inline-block;
                    &.active,
                    &:hover {
                        color: #ff2e30;
                    }
                }
            }
        }
    }
    a {
        color: #3a3d4b;
    }
}
</style>
