<template>
    <div class="subject-wrapper" v-if="project && project.projectId">
        <ul class="subject-list">
            <li
                v-for="(item, index) in dataList"
                :class="['subject-item', item.isChecked ? 'subject-item-checked' : '']"
                :key="index"
                @click.prevent="handleTagClick(item, $event)"
            >
                {{ item.optName }}
            </li>
        </ul>
        <template v-if="false">
            <span class="sw-type-item">
                <input id="box1" class="sw-cb" type="checkbox" value="免费" v-model="isFree" @change="handleFreeChange" />
                <label for="box1" class="sw-cb-label">免费</label>
            </span>
            <span class="sw-type-item">
                <input id="box2" class="sw-cb" type="checkbox" value="限时免费" v-model="isFreeLimit" @change="handleFreeLimitChange" />
                <label for="box2" class="sw-cb-label">限时免费</label>
            </span>
            <span class="sw-type-item sw-type-item-last">
                <input id="box3" class="sw-cb" type="checkbox" value="限时特价" v-model="isSpecialLimit" @change="handleSpecialLimitChange" />
                <label for="box3" class="sw-cb-label">限时特价</label>
            </span>
        </template>

        <span v-show="isShowSubject" @mouseenter="handleProjectMouseenter" @mouseleave="handleProjectMouseleave" class="all-subject-wrapper">
            <div class="all-subject">{{ subject.subjectName === '全部' ? '全部科目' : subject.subjectName }}</div>
            <select-subject
                v-show="isShowSubjectList"
                :project="project"
                :subject-id="subjectId"
                :subject-seocode="subjectSeocode"
                @subject-change="handleItemClick"
                class="subject-select-wrapper"
                style="width: auto; white-space: nowrap"
                ref="selectSubject"
            ></select-subject>
        </span>
    </div>
</template>
<script>
import selectSubject from '@/www/components/components/select-subject-section';
import '@/api/mcu/api.mcu-04.home-type.js';
import '@/api/bd/api.BD4606.query-subject-list.js';
import '@/api/bd/api.BD4928.query-subject-ptag-list.js';

export default {
    components: {
        selectSubject,
    },
    props: {
        project: {
            type: Object,
            default: () => {},
        },
        free: {
            type: Boolean,
            default: false,
        },
        freeLimit: {
            type: Boolean,
            default: false,
        },
        specialLimit: {
            type: Boolean,
            default: false,
        },
        subjectId: {
            type: String,
            default: '',
        },
        subjectSeocode: {
            type: String,
            default: '',
        },
        optId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            dataList: [],
            isShowSubject: false,
            isFree: false,
            isFreeLimit: false,
            isSpecialLimit: false,
            subject: {
                subjectName: '全部科目',
            },
            isShowSubjectList: false,
        };
    },
    fetch() {
        this.isFree = this.free;
        this.isFreeLimit = this.freeLimit;
        this.isSpecialLimit = this.specialLimit;
        this.isShowSubject = this.project && !this.project.isAll;
        if (this.$platform.isClient()) {
            return this.getDataList();
        }
        return this.getDataList().then(this.getDataSubject);
    },
    watch: {
        project() {
            console.log('subject, watch');
            this.isShowSubject = this.project && !this.project.isAll;
            this.getDataList();
        },
    },
    methods: {
        getDataList() {
            if (!this.project?.projectId) {
                this.dataList.splice(0, this.dataList.length);
                return Promise.resolve();
            }
            return this.requestWrapper('home/home-type', {
                projectId: this.project?.projectId,
                optType: 'T',
                showClient: 'W',
                pageSize: 20,
            })
                .then(({ data }) => {
                    let str = '全部';
                    let tmp = [];
                    data.some((item) => {
                        if (str.length < 35) {
                            str += item.optName;
                            tmp.push(item);
                            return false;
                        }
                        return true;
                    });
                    data = tmp;
                    data.forEach((item) => {
                        item.isChecked = this.optId && this.optId === item.optId;
                    });
                    const selectTag = data.find((item) => {
                        return item.isChecked;
                    });
                    const allTag = { optId: '', optName: '全部', isChecked: false, isAll: true };
                    this.dataList.splice(0, this.dataList.length);
                    data.length > 0 && this.dataList.push(allTag);
                    this.dataList.push(...data);
                    this.handleTagClick(selectTag || allTag);
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        handleTagClick(item, e) {
            this.dataList.forEach((element) => {
                element.isChecked = element.optId === item.optId;
            });
            this.$emit('tag-change', item, e);
        },
        handleItemClick(item, $e) {
            this.subject = item;
            this.$emit('subject-change', item, $e);
        },
        handleFreeChange(e) {
            console.warn(e);
            this.$emit('free-change', this.isFree);
        },
        handleFreeLimitChange(e) {
            console.warn(e);
            this.$emit('free-limit-change', this.isFreeLimit);
        },
        handleSpecialLimitChange(e) {
            console.warn(e);
            this.$emit('special-limit-change', this.isSpecialLimit);
        },
        handleOptItemClick(item) {
            this.$emit('opt-change', item);
        },
        handleProjectMouseenter() {
            this.isShowSubjectList = true;
            this.$nextTick(() => {
                if (this.$refs.selectSubject.$el.offsetWidth > 800) {
                    this.$refs.selectSubject.$el.style.whiteSpace = 'normal';
                    this.$refs.selectSubject.$el.style.width = '800px';
                }
            });
        },
        handleProjectMouseleave() {
            this.isShowSubjectList = false;
            this.$refs.selectSubject.$el.style.whiteSpace = 'nowrap';
            this.$refs.selectSubject.$el.style.width = 'auto';
        },
        getDataSubject() {
            if (this.project?.projectType === 'child') {
                return this.getPtagSubjectList();
            } else {
                return this.getSubjectList();
            }
        },
        requestWrapper(url, params = {}) {
            return this.$callApi(url, params).then((res) => res.getData());
        },
        getSubjectList() {
            if (!this.project?.projectId) {
                return Promise.resolve();
            }
            return this.requestWrapper('bd/query-subject-list', {
                projectId: this.project.projectId,
            })
                .then(({ data }) => {
                    const subject = data.find((item) => item.subjectSeocode === this.subjectSeocode);
                    Object.assign(this.subject, subject || {});
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
                    const subject = data.find((item) => item.subjectSeocode === this.subjectSeocode);
                    Object.assign(this.subject, subject || {});
                })
                .catch(this.$niceloo.api.handleFailure);
        },
    },
};
</script>
<style scoped lang="less">
.subject-wrapper {
    height: 62px;
    background-color: white;
    display: flex;
    font-size: 14px;
    align-items: center;
    position: relative;
}
.subject-list {
    flex: 1;
    display: flex;
    align-items: center;
}

.subject-item {
    display: inline-block;
    color: #53586c;
    padding-left: 25px;
    padding-right: 25px;
    cursor: pointer;
}
.subject-item + .subject-item {
    border-left: 1px solid #d5d9d9;
}

.subject-item-checked {
    color: #ff2e30;
}

.material {
    color: #3a3d4b;
}
.all-subject {
    color: #3a3d4b;
    background-color: transparent;
    padding-right: 26px;
    background-image: url('./asset/images/switch.png');
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 16px;
    outline: none;
    padding-bottom: 25px;
    padding-top: 25px;
}
.sw-cb {
    height: 16px;
    width: 16px;
    display: none;
}
.sw-type-item + .sw-type-item {
    margin-left: 23px;
}

.sw-type-item-last {
    margin-right: 23px;
}
.sw-cb-label {
    margin-left: 5px;
    color: #3a3d4b;
}

.sw-cb + .sw-cb-label:before {
    content: ' ';
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    margin-right: 8px;
    background-repeat: no-repeat;
    background-size: 16px;
    background-image: url('./asset/images/cb-normal.png');
}

.sw-cb:checked + .sw-cb-label:before {
    content: ' ';
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    margin-right: 8px;
    transition: all 0.5s;
    background-size: 16px;
    background-image: url('./asset/images/cb-checked.png');
}

.sw-cb:checked + .sw-cb-label {
    color: #ff2e30;
}

.subject-select-wrapper {
    position: absolute;
    top: 70px;
    display: inline-block;
    width: max-content;
    right: 0;
}
.all-subject-wrapper {
    position: relative;
    display: inline-block;
    z-index: 4;
}
</style>
