<template>
    <div class="select-exam">
        <div class="top-arrow-box">
            <img class="top-arrow-img" src="asset/images/top-arrow-icon.png" alt="" />
        </div>
        <div class="select-box">
            <div class="top-close-box">
                <div class="select-subject-title">请选择您关注的考试项目</div>
            </div>
            <div class="subject-list">
                <div v-for="(item, index) in collegeList" :key="index" class="subject-box" @click="selectCollege(item)">
                    <div class="college-name-box" :class="[(index + 1) % 5 === 0 ? 'no-margin' : '', collegeId === item.projectIds ? 'active-college' : '']">
                        <image-view class="college-img" :src="item.columnLogo"></image-view>
                        <div class="subject-title">{{ item.columnCategoryName }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@/api/public/api..query-category-tree.js';
export default {
    props: {
        categoryCode: {
            type: String,
            default: '',
        },
        collegeName: {
            type: String,
            default: '',
        },
        collegeId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            collegeActive: '', // 选中的学院
            projectActive: '', // 选中的项目
            subjectId: '', // 项目id
            collegeList: [], // 学院列表
        };
    },
    fetch() {
        return this.queryColumnTree().then(() => {
            let index = this.collegeList.findIndex((item) => {
                return this.categoryCode === item.columnCategorySeoNo;
            });
            if (index >= 0) {
                this.selectCollege(this.collegeList[index], false);
            }
        });
    },
    methods: {
        // 查询学院
        queryColumnTree() {
            return new Promise((resolve, reject) => {
                this.$callApi('public/query-category-tree', {
                    // "Y-启用；N-禁用 不传查全部
                    enableStatus: 'Y',
                    onsuccess: (data) => {
                        this.collegeList = data.treeData;
                        resolve();
                    },
                    onerror: () => {
                        reject();
                    },
                });
            });
        },
        /**
         * 选择学院
         * @params item 选择的学院项
         * @params isOpen 是否打开新的标签页
         */
        selectCollege(item, isOpen = true) {
            if (isOpen) {
                if (this.collegeId === item.projectIds) {
                    this.$PageUtil.reflush();
                    return;
                }
                this.$PageUtil.openNewPage(`/course/${item.columnCategorySeoNo}`);
            } else {
                this.$emit('update:collegeId', item.projectIds);
                this.$emit('update:collegeName', item.columnCategoryName);
                this.$emit('update:categoryCode', item.columnCategorySeoNo);
                if (this.$platform.isClient()) {
                    window.history.replaceState(null, null, `/course/${item.columnCategorySeoNo}`);
                }
                this.$emit('close');
            }
        },
    },
};
</script>

<style lang="less" scoped>
.select-exam {
    margin: 0 auto;
    width: 620px;
    border-radius: 8px;
}
.top-arrow-box {
    width: 100%;
    height: 17px;
    .top-arrow-img {
        width: 14px;
        height: 5px;
        margin-left: 50px;
    }
}
.top-close-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.close-select-project-img {
    width: 14px;
    height: 14px;
    cursor: pointer;
}

.select-box {
    padding: 32px 32px 18px;
    display: flex;
    background: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 12px 0 rgb(58 61 75 / 10%);
    .subject-list {
        margin-top: 24px;
        display: flex;
        flex-wrap: wrap;
    }
    .select-subject-title {
        width: 187px;
        height: 22px;
        font-size: 17px;
        font-family: MicrosoftYaHei, MicrosoftYaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #3a3d4b;
        line-height: 22px;
    }
}
.college-name-box {
    margin-bottom: 14px;
    margin-right: 14px;
    width: 100px;
    height: 100px;
    background: #f7f8f9;
    box-sizing: border-box;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .subject-title {
        font-size: 12px;
        font-weight: 400;
        color: #333333;
        line-height: 12px;
        font-weight: 400;
    }
    .college-img {
        margin-bottom: 6px;
        width: 40px;
        height: 40px;
    }
}
.college-name-box:hover {
    background: #e3e5ea;
}
.active-college {
    background: #eeeff4;
    border: 1px solid #d3d7e0;
    border-radius: 4px;
}
.no-margin {
    margin-right: 0px;
}
</style>
