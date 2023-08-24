<template>
    <span ref="sSubject">
        <slot v-if="autoPosition" name="reference"></slot>
        <data-comps v-else :data-list="dataList" @subject-change="handleItemClick" :auto-position="autoPosition" :subject-id="subjectId"></data-comps>
    </span>
</template>
<script>
import '@/api/bd/api.BD4606.query-subject-list.js';
import '@/api/bd/api.BD4928.query-subject-ptag-list.js';
import Vue from 'vue';
import DataComps from './subject/index.vue';

export default {
    components: {
        DataComps,
    },
    props: {
        project: {
            type: Object,
            default: () => {},
        },
        autoPosition: {
            type: Boolean,
            default: false,
        },
        offset: {
            type: Object,
            default: () => {},
        },
        subjectId: {
            type: String,
            default: '',
        },
        subjectSeocode: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isFirst: true,
            dataList: [],
        };
    },
    fetch() {
        this.autoPosition &&
            this.$slots.reference &&
            this.$slots.reference.forEach((el) => {
                el.elm.addEventListener('click', this.mountToBody);
            });
        if (this.$platform.isClient()) {
            return Promise.resolve();
        } else {
            return this.getDataList();
        }
    },
    watch: {
        project: {
            handler(val, oldVal) {
                console.log('subject---, watch');
                if (oldVal && val.projectId != oldVal.projectId) {
                    this.isFirst = false;
                }
                this.getDataList();
            },
            deep: true,
            immediate: true,
        },
    },
    beforeDestroy() {
        this.autoPosition &&
            this.$slots.reference &&
            this.$slots.reference.forEach((el) => {
                el.elm.removeEventListener('click', this.mountToBody);
            });
        this.destroyFromBody();
    },
    methods: {
        mountToBody() {
            if (!this.$slots.reference) {
                return console.warn('没有插槽内容');
            }
            if (this.instance) {
                return (this.instance.$children[0].show = !this.instance.$children[0].show);
            }
            const el = this.$slots.reference.find((el) => {
                return el.elm;
            });
            const domRect = el.elm.getBoundingClientRect();
            const rect = {};
            for (const k in domRect) {
                rect[k] = domRect[k];
            }
            this.instance = new Vue({
                el: document.createElement('div'),
                render: (h) =>
                    h(DataComps, {
                        props: {
                            dataList: this.dataList,
                            rect,
                            autoPosition: true,
                            offset: this.offset,
                        },
                        on: {
                            'subject-change': this.handleItemClick,
                        },
                    }),
            });
            document.body.appendChild(this.instance.$el);
        },
        destroyFromBody() {
            if (!this.instance) {
                return;
            }
            // this.instance.$beforeDestroy();
            // this.instance.$destroyed();
            document.body.removeChild(this.instance.$el);
            this.instance = null;
        },
        getDataList() {
            // 项目类型【X:项目,Z:项目子集】
            this.destroyFromBody();
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
                    data.forEach((item) => {
                        item.isChecked = this.isFirst === true && (item.subjectId === this.subjectId || item.subjectSeocode === this.subjectSeocode);
                    });
                    this.dataList.splice(
                        0,
                        this.dataList.length,
                        {
                            subjectId: '',
                            subjectName: '全部',
                            isChecked: data.findIndex((item) => item.isChecked) < 0,
                            isAll: true,
                        },
                        ...data
                    );
                    this.mountToBody();
                    this.handleItemClick(this.dataList.find((item) => item.isChecked));
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
                    data.forEach((item) => {
                        item.isChecked = this.isFirst === true && (item.subjectId === this.subjectId || item.subjectSeocode === this.subjectSeocode);
                    });
                    this.dataList.splice(
                        0,
                        this.dataList.length,
                        {
                            subjectId: '',
                            subjectName: '全部',
                            isChecked: data.findIndex((item) => item.isChecked) < 0,
                            isAll: true,
                        },
                        ...data
                    );
                    this.mountToBody();
                    this.handleItemClick(this.dataList.find((item) => item.isChecked));
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        handleItemClick(item, $e) {
            this.$emit('subject-change', item, $e);
        },
    },
};
</script>
<style scoped lang="less"></style>
