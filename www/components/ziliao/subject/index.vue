<template>
    <div class="subject-wrap">
        <div :class="['subject-container', isExpand ? 'subject-container-float' : '']" @mouseleave="handleSubjectMouseleave">
            <p class="type">选择科目：</p>
            <ul class="type-list" ref="subjectList" :style="subjectListStyle">
                <li
                    v-for="(item, index) in dataList"
                    class="type-item"
                    :class="{ active: item.isChecked }"
                    :key="index"
                    @click.prevent="handleItemClick(item, $event)"
                >
                    {{ item.subjectName }}
                </li>
            </ul>
            <img src="./asset/images/expand.png" class="more-icon" @mouseenter="handleSubjectMouseenter" v-show="isShowMore && isExpand === false" />
            <img src="./asset/images/collapse.png" class="more-icon coll-icon" v-show="isShowMore && isExpand === true" />
        </div>
    </div>
</template>
<script>
import '@/api/bd/api.BD4606.query-subject-list.js';
import '@/api/bd/api.BD4928.query-subject-ptag-list.js';

export default {
    props: {
        project: {
            type: Object,
            default: () => ({}),
        },
        subjectSeoCode: {
            type: String,
            default: '',
        },
        subjectId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            type: '',
            dataList: [],
            subjectListStyle: {
                height: 'auto',
                overflow: 'hidden',
            },
            isShowMore: false,
            isExpand: false,
        };
    },
    fetch() {
        if (!this.project) {
            return Promise.resolve();
        }
        if (this.project?.projectType === 'child') {
            return this.getPtagSubjectList();
        } else {
            return this.getSubjectList();
        }
    },
    watch: {
        project() {
            if (!this.project) {
                return;
            }
            if (this.project?.projectType === 'child') {
                return this.getPtagSubjectList();
            } else {
                return this.getSubjectList();
            }
        },
    },
    methods: {
        handleItemClick(row) {
            this.dataList.forEach((item) => {
                item.isChecked = item.subjectId === row.subjectId;
            });
            this.$emit('item-change', row);
        },
        requestWrapper(url, params = {}) {
            return this.$callApi(url, params).then((res) => res.getData());
        },
        getSubjectList() {
            return this.requestWrapper('bd/query-subject-list', {
                projectId: this.project.projectId,
            })
                .then(({ data }) => {
                    data.forEach((item) => (item.isChecked = item.subjectSeocode === this.subjectSeoCode || item.subjectId === this.subjectId));
                    this.dataList.splice(
                        0,
                        this.dataList.length,
                        {
                            subjectId: '',
                            subjectName: '全部',
                            isChecked: !data.some((item) => item.isChecked),
                            isAll: true,
                        },
                        ...data
                    );
                    this.$emit(
                        'item-change',
                        this.dataList.find((item) => item.isChecked)
                    );
                    this.$nextTick(this.calIsShowMore);
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        getPtagSubjectList() {
            if (!this.project?.ptagId) {
                return Promise.resolve();
            }
            return this.requestWrapper('bd/query-subject-ptag-list', {
                ptagId: this.project.ptagId,
            })
                .then(({ data }) => {
                    data.forEach((item) => (item.isChecked = item.subjectSeocode === this.subjectSeoCode || item.subjectId === this.subjectId));
                    this.dataList.splice(
                        0,
                        this.dataList.length,
                        {
                            subjectId: '',
                            subjectName: '全部',
                            isChecked: !data.some((item) => item.isChecked),
                            isAll: true,
                        },
                        ...data
                    );
                    this.$emit(
                        'item-change',
                        this.dataList.find((item) => item.isChecked)
                    );
                    this.$nextTick(this.calIsShowMore);
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        calIsShowMore() {
            this.isShowMore = this.$refs.subjectList.scrollHeight > 49;
            if (this.isShowMore) {
                this.subjectListStyle.height = '49px';
            } else {
                this.subjectListStyle.height = 'auto';
            }
        },
        handleSubjectMouseenter() {
            this.subjectListStyle.height = 'auto';
            this.isExpand = true;
        },
        handleSubjectMouseleave() {
            console.warn('handleSubjectMouseleave');
            this.$nextTick(this.calIsShowMore);
            this.isExpand = false;
        },
    },
};
</script>
<style lang="less" scoped>
.subject-container {
    display: flex;
    position: relative;
    .type {
        font-size: 16px;
        color: #3a3d4b;
        margin-right: 20px;
        margin-top: 15px;
    }
    .type-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        flex: 1;
    }
    .type-item {
        padding: 6px 16px;
        margin: 8px 0;
        font-size: 14px;
        color: #3a3d4b;
        line-height: 20px;
        cursor: pointer;
        text-align: center;
        &:hover {
            color: #ff2e30;
        }
        &.active {
            background: #ffece8;
            border-radius: 4px;
            color: #ff2e30;
        }
    }
    .more-icon {
        width: 30px;
        height: 20px;
        position: absolute;
        right: 10px;
        top: 25px;
    }
    .coll-icon {
        top: auto;
        bottom: 25px;
    }
}
.subject-container-float {
    width: 1240px;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.04);
    z-index: 50;
    border-radius: 12px;
    background-color: white;
    box-sizing: border-box;
    position: absolute;
    left: -40px;
    padding-left: 40px;
    padding-bottom: 5px;
    padding-right: 65px;
}
.subject-wrap {
    position: relative;
    min-height: 48px;
}
</style>
