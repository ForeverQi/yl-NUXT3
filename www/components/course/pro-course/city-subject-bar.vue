<template>
    <div class="bar-wrap">
        <select-area-section :left="-20" :selece-area="areaName" @handle-click-city="changeCity" />
        <div v-show="project.projectId" class="all-subject" @mouseenter="enterSubject" @mouseleave="leaveSubject">
            <!--{{ defaultSubjectSeoCode }}
            {{ defaultSubjectName }}-->
            <div class="subject-name">{{ subjectName || defaultSubjectName || '全部科目' }}</div>
            <select-subject-section
                ref="subjectRef"
                class="subject-section"
                :project="project"
                :subject-seocode="defaultSubjectSeoCode"
                @subject-change="changeSubject"
            />
        </div>
    </div>
</template>

<script>
import '@/api/cp/api.CP0005.get-location.js';

import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import { mapActions } from 'vuex';

import SelectAreaSection from '@/www/components/components/select-area-section';
import SelectSubjectSection from '@/www/components/components/select-subject-section/index.vue';

export default {
    components: {
        SelectAreaSection,
        SelectSubjectSection,
    },
    props: {
        // 选中的项目信息
        project: {
            type: Object,
            default: () => {},
        },
        defaultSubjectSeoCode: {
            type: String,
            default: '',
        },
        defaultSubjectName: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            areaName: '',
            areaCode: '',
            subjectId: '',
            subjectName: '',
        };
    },
    watch: {
        project() {
            this.subjectId = '';
            this.subjectName = '全部科目';
        },
    },
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
            this.$emit('change-city', { areaName: this.areaName, areaCode: this.areaCode });
        });
    },
    methods: {
        ...mapActions('common/city', {
            getCity: 'getCity',
        }),
        enterSubject() {
            if (this.$refs.subjectRef.$el.offsetWidth > 800) {
                this.$refs.subjectRef.$el.style.whiteSpace = 'normal';
                this.$refs.subjectRef.$el.style.width = '800px';
            }
        },
        leaveSubject() {
            this.$refs.subjectRef.$el.style.whiteSpace = 'nowrap';
            this.$refs.subjectRef.$el.style.width = 'auto';
        },
        // 获取当前所在地
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
        // 修改地区
        changeCity({ areaName, areaCode }, e) {
            this.areaName = areaName;
            this.areaCode = areaCode;
            this.$emit('change-city', { areaName: this.areaName, areaCode: this.areaCode }, e);
        },
        // 修改科目
        changeSubject(subject) {
            if (this.subjectId === subject.subjectId) {
                return;
            }
            this.subjectId = subject.subjectId;
            this.subjectName = subject.subjectId ? subject.subjectName : '全部科目';
            this.$emit('change-subject', subject);
        },
    },
};
</script>

<style lang="less" scoped>
.bar-wrap {
    margin: 24px 0;
    padding: 0 20px;
    height: 62px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
}
.all-subject {
    position: relative;

    .subject-name {
        border-bottom: 8px solid transparent;
        height: 62px;
        line-height: 62px;
        color: #3a3d4b;
        padding-right: 20px;
        background: url('./asset/images/switch.png') no-repeat right center;
        font-size: 14px;
    }

    &:hover {
        .subject-section {
            display: block;
        }
    }

    .subject-section {
        display: none;
        white-space: nowrap;
        position: absolute;
        right: -20px;
        top: 69px;
        z-index: 15;
    }
}
</style>
