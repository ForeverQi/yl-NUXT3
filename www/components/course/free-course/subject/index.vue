<template>
    <div class="subject-wrapper">
        <select-area-section :left="-20" :selece-area="areaName" @handle-click-city="changeCity" />
        <ul class="subject-list">
            <li
                v-for="item in dataList"
                :class="['subject-item', item.isChecked ? 'subject-item-checked' : '']"
                :key="item.optId"
                @click.prevent="handleTagClick(item, $event)"
            >
                {{ item.optName }}
            </li>
        </ul>
        <span class="sw-type-item">
            <input id="box1" class="sw-cb" type="checkbox" value="直播中" v-model="isDoing" @change="handleDoingChange" />
            <label for="box1" class="sw-cb-label">直播中</label>
        </span>
        <span class="sw-type-item">
            <input id="box2" class="sw-cb" type="checkbox" value="即将开始" v-model="isStart" @change="handleStartChange" />
            <label for="box2" class="sw-cb-label">即将开始</label>
        </span>
        <span class="sw-type-item sw-type-item-last">
            <input id="box3" class="sw-cb" type="checkbox" value="观看回放" v-model="isPlay" @change="handlePlayChange" />
            <label for="box3" class="sw-cb-label">观看回放</label>
        </span>

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
import { mapActions } from 'vuex';
import selectSubject from '@/www/components/components/select-subject-section';
import SelectAreaSection from '@/www/components/components/select-area-section';
import '@/api/api..query-free-course-saletag.js';
import '@/api/bd/api.BD4606.query-subject-list.js';
import '@/api/bd/api.BD4928.query-subject-ptag-list.js';

export default {
    components: {
        selectSubject,
        SelectAreaSection,
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
    /**
     * @returns {object} 默认值
     */
    data() {
        return {
            areaName: '',
            areaCode: '',

            isFirstOpt: true,

            dataList: [],
            isShowSubject: false,
            isDoing: false,
            isStart: false,
            isPlay: false,
            subject: {
                subjectName: '全部科目',
            },
            isShowSubjectList: false,
        };
    },
    /**
     * @returns {Promise} 初始化内容
     */
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
        /**
         *
         * @param {object} val 变化后的项目信息
         * @param {object} oldVal 变化前的项目信息
         */
        project(val, oldVal) {
            console.log('subject, watch');
            if (oldVal && val.projectId != oldVal.projectId) {
                this.isFirstOpt = false;
            }
            this.isShowSubject = this.project && !this.project.isAll;
            this.getDataList();
        },
    },
    /**
     *
     */
    mounted() {
        this.getCity().then(async (provinceList) => {
            if (!provinceList.length) {
                return;
            }
            await this.queryLocation();
            // 尝试匹配所在地
            const findItem = provinceList.find((i) => i.areaName === this.areaName);
            if (findItem) {
                this.areaCode = findItem.areaCode;
            } else {
                // 查到的所在地和枚举列表没对应上，默认选中第一个地区
                this.areaName = provinceList[0].areaName;
                this.areaCode = provinceList[0].areaCode;
            }
            this.$emit('handle-click-city', { areaName: this.areaName, areaCode: this.areaCode });
        });
    },
    methods: {
        ...mapActions('common/city', {
            getCity: 'getCity',
        }),
        /**
         *
         * @param {object} cityData 城市对象
         * @param {object} e 对象事件
         */
        changeCity(cityData, e) {
            this.areaName = cityData.areaName;
            this.areaCode = cityData.areaCode;
            this.$emit('handle-click-city', cityData, e);
        },
        /**
         * @returns {Promise} 获取当前IP归属地区
         */
        queryLocation() {
            return new Promise((resolve) => {
                this.$callApi('cp/get-location', {
                    onsuccess: ({ data }) => {
                        if (data && data.content && data.content.address_detail) {
                            this.areaName = (data.content.address_detail.province || data.content.address_detail.city).replace(
                                /省|市|壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区/,
                                ''
                            );
                        } else {
                            this.areaName = '北京';
                        }
                        resolve(data);
                    },
                    onerror: niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            });
        },
        /**
         * @returns {Promise} 默认数据
         */
        getDataList() {
            if (!this.project?.projectId) {
                this.dataList = [];
                return Promise.resolve();
            }
            let optId = this.optId;
            if (this.isFirstOpt === false) {
                optId = '';
            }

            return this.requestWrapper('ctc/query-free-course-saletag', {
                projectId: this.project?.projectId,
                optType: 'T',
                showClient: 'W',
                type: 'GKK',
                pageSize: 20,
            })
                .then((data) => {
                    console.log('data', data);
                    let str = '全部';
                    let tmp = [];
                    data.some((item) => {
                        if (str.length < 15) {
                            str += item.optName;
                            tmp.push(item);
                            return false;
                        }
                        return true;
                    });
                    data = tmp;
                    data.forEach((item) => {
                        item.isChecked = optId && optId === item.optId;
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
        /**
         *
         * @param {object} item 选择数据
         * @param {object} e 操作元素
         */
        handleTagClick(item, e) {
            this.dataList.forEach((element) => {
                element.isChecked = element.optId === item.optId;
            });
            console.log('@@0000', item);
            this.$emit('tag-change', item, e);
        },
        /**
         *
         * @param {object} item 选择数据
         * @param {object} $e 操作元素
         */
        handleItemClick(item, $e) {
            this.subject = item;
            this.$emit('subject-change', item, $e);
        },
        /**
         *
         * @param {object} e 操作元素
         */
        handleDoingChange(e) {
            // 直播中
            console.warn(e);
            this.$emit('doing-change', this.isDoing);
        },
        /**
         *
         * @param {object} e 操作元素
         */
        handleStartChange(e) {
            // 直播开始
            console.warn(e);
            this.$emit('start-change', this.isStart);
        },
        /**
         *
         * @param {object} e 操作元素
         */
        handlePlayChange(e) {
            // 直播回放
            console.warn(e);
            this.$emit('play-change', this.isPlay);
        },
        /**
         *
         * @param {object} item 选择数据
         */
        handleOptItemClick(item) {
            this.$emit('opt-change', item);
        },
        /**
         *
         */
        handleProjectMouseenter() {
            this.isShowSubjectList = true;
            this.$nextTick(() => {
                if (this.$refs.selectSubject.$el.offsetWidth > 800) {
                    this.$refs.selectSubject.$el.style.whiteSpace = 'normal';
                    this.$refs.selectSubject.$el.style.width = '800px';
                }
            });
        },
        /**
         *
         */
        handleProjectMouseleave() {
            this.isShowSubjectList = false;
            this.$refs.selectSubject.$el.style.whiteSpace = 'nowrap';
            this.$refs.selectSubject.$el.style.width = 'auto';
        },
        /**
         * @returns {Promise} 请求数据
         */
        getDataSubject() {
            if (this.project?.projectType === 'child') {
                return this.getPtagSubjectList();
            } else {
                return this.getSubjectList();
            }
        },
        /**
         *
         * @param {string} url 请求地址
         * @param {object} params 请求参数
         * @returns {Promise} 基本请求内容
         */
        requestWrapper(url, params = {}) {
            return this.$callApi(url, params).then((res) => res.getData());
        },
        /**
         * @returns {Promise} 科目列表
         */
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
        /**
         * @returns {Promise} 子项目
         */
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
    padding-left: 20px;
}
.subject-list {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: -30px;
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
