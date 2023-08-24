<template>
    <div class="hot-section" v-if="checkShow">
        <div class="hot-title">
            热推好课
            <div class="wrap">
                <div class="menu">
                    <div class="item" :class="{ this: opId === '' }" @click="changeItem('')">全部</div>
                    <div class="item" :class="{ this: opId === item.optId }" v-for="item in typeList" :key="item.optId" @click="changeItem(item.optId)">
                        {{ item.optName }}
                    </div>
                </div>
                <div class="options">
                    <div class="item" :class="{ this: filter.courseOpenstatus }" @click="changeCourse">
                        <img src="./asset/images/checkbox2.png" class="checkbox" v-if="filter.courseOpenstatus" />
                        <img src="./asset/images/checkbox1.png" class="checkbox" v-else />
                        免费
                    </div>
                    <div class="item" :class="{ this: filter.discountType.includes('F') }" @click="checkBox('F')">
                        <img src="./asset/images/checkbox2.png" class="checkbox" v-if="filter.discountType.includes('F')" />
                        <img src="./asset/images/checkbox1.png" class="checkbox" v-else />
                        限时免费
                    </div>
                    <div class="item" :class="{ this: filter.discountType.includes('L') }" @click="checkBox('L')">
                        <img src="./asset/images/checkbox2.png" class="checkbox" v-if="filter.discountType.includes('L')" />
                        <img src="./asset/images/checkbox1.png" class="checkbox" v-else />
                        限时特价
                    </div>
                    <div class="item subject" @mouseenter="showSubject = true" @mouseleave="showSubject = false">
                        {{ curSubjectName }}
                        <img src="./asset/images/change.png" class="change" />

                        <div class="projectList" v-if="showSubject" @mouseenter="showSubject = true" @mouseleave="showSubject = false">
                            <div class="project-wrap">
                                <div class="scroll">
                                    <div class="item-block" :class="{ this: subjectId === '' }" @click="changeSubjectId('')">全部</div>
                                    <div
                                        class="item-block"
                                        :class="{ this: subjectId === item.subjectId }"
                                        v-for="item in subjectList"
                                        :key="item.subjectId"
                                        @click="changeSubjectId(item)"
                                    >
                                        {{ item.subjectName }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-list">
            <template v-if="total > 0">
                <item :item-data="item" v-for="item in courseList" @init="getCourseList" :key="item.goodsId" />
            </template>
            <template v-else>
                <div class="center">
                    <empty-index />
                </div>
            </template>
        </div>
        <div class="pagewrap" v-if="total > 8">
            <pagination :total="total" :page-size="pageSize" :current-page="currentPage" @pageChange="pageChange" />
        </div>
    </div>
</template>
<script>
import '@/api/mcu/api.mcu-04.home-type.js'; // 获取首页运营分类
import '@/api/mcu/api.mcu-05.home-hot-course.js'; // 获取首页热推好课列表
import '@/api/mcu/api.mcu-08.home-subject-all.js'; // 全部科目
import EmptyIndex from '../Empty/Index.vue';
import Item from './components/Item.vue';
import Pagination from '@/www/components/microClassUser/components/pagination/Index.vue';
export default {
    components: {
        Pagination,
        EmptyIndex,
        Item,
    },
    props: {
        projectId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            typeList: [],
            courseList: [],
            total: 0,
            pageSize: 8,
            currentPage: 1,
            opId: '',
            filter: {
                courseOpenstatus: false,
                discountType: [],
            },
            showSubject: false,
            subjectList: [],
            subjectId: '',
            curSubjectName: '全部科目',
        };
    },
    computed: {
        checkShow() {
            /**
             * 显示的情况
             * 1、分类存在
             * 2、课程数量大于0（有全部的情况）
             * 3、分页页码大于1时，分类不存在课件数等于0显示
             * 4、选择科目后，分类不存在课件数等于0显示
             * 5、营销属性存在，分类不存在课件数等于0显示
             */
            return (
                this.typeList.length > 0 || this.courseList.length > 0 || this.subjectId || this.filter.discountType.length > 0 || this.filter.courseOpenstatus
            );
        },
    },
    watch: {
        projectId(val, oldVal) {
            if (val !== oldVal) {
                this.init();
            }
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.subjectId = '';
            this.opId = '';
            this.filter = {
                courseOpenstatus: false,
                discountType: [],
            };
            this.getCategory();
            this.getCourseList(true);
            this.getSubjectAll();
        },
        getSubjectAll() {
            // 获取课程列表
            let data = {
                url: 'home/home-subject-all',
                params: {
                    projectId: this.projectId,
                },
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                this.subjectList = res.data;
            });
        },
        changeSubjectId(item) {
            if (!item) {
                this.subjectId = '';
                this.curSubjectName = '全部科目';
            } else {
                this.subjectId = item.subjectId;
                this.curSubjectName = item.subjectName;
            }
            this.showSubject = false;
            let loading = this.$baseUI.loading();
            this.getCourseList(true)
                .then(() => {
                    loading.close();
                })
                .catch(() => {
                    loading.close();
                });
        },
        changeItem(opId) {
            this.opId = opId;
            this.getCourseList(true);
        },
        changeCourse() {
            this.filter.courseOpenstatus = !this.filter.courseOpenstatus;
            this.getCourseList(true);
        },
        checkBox(type) {
            let index = -1;
            if ((index = this.filter.discountType.indexOf(type)) > -1) {
                this.filter.discountType.splice(index, 1);
            } else {
                this.filter.discountType.push(type);
            }
            this.getCourseList(true);
        },
        getCourseList(init = false) {
            if (init) {
                this.currentPage = 1;
            }
            // 获取课程列表
            let data = {
                url: 'home/home-hot-course',
                params: {
                    clientType: 'W',
                    projectId: this.projectId,
                    pageIndex: this.currentPage,
                    pageSize: this.pageSize,
                    saleTagId: this.opId,
                    subjectId: this.subjectId,
                    discountType: this.filter.discountType.join(','),
                    courseOpenstatus: this.filter.courseOpenstatus ? 2 : null,
                },
                isCustom: false,
            };
            return this.httpClient(data)
                .then((res) => {
                    this.total = res.count;
                    this.courseList = res.data;
                })
                .then(() => {
                    if (!this.checkShow) {
                        // 获取全部的时候还没有数据就隐藏该模块
                        this.$emit('empty-handle', 'hotGoodCourse');
                    }
                });
        },
        getCategory() {
            let data = {
                url: 'home/home-type',
                params: {
                    projectId: this.projectId,
                    optType: 'T',
                    showClient: 'W',
                },
                isCustom: false,
            };
            this.httpClient(data).then((res) => {
                this.typeList = res.data;
            });
        },
        pageChange(num) {
            this.currentPage = num;
            this.getCourseList();
        },
        httpClient({ url, params = {}, isCustom = false }) {
            return this.$callApi(url, {
                ...params,
            }).then(
                (res) => {
                    return res.getData();
                },
                (err) => {
                    if (!isCustom) this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                }
            );
        },
    },
};
</script>
<style lang="less" scoped>
.scroll {
    max-height: 350px;
    overflow: hidden;
    overflow-y: auto;
}
.center {
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 300px;
    overflow: hidden;
}
.projectList {
    position: absolute;
    top: 18px;
    right: 0;
    z-index: 2;
    padding-top: 22px;
    .project-wrap {
        width: 840px;
        max-height: 414px;
        box-sizing: border-box;
        padding: 32px 10px;
        background: #ffffff;
        border-radius: 6px 0px 2px 0px 6px 6px 6px;
    }

    .item-block {
        display: inline-block;
        margin: 0 8px;
        margin-bottom: 13px;
        padding: 0 15px;
        font-size: 14px;
        color: #3a3d4b;
        height: 26px;
        line-height: 26px;
        cursor: pointer;

        &.this {
            color: #025eff;
            background-color: #eaeeff;
            border-radius: 14px;
        }
    }
}
.pagewrap {
    width: 100%;
    text-align: center;
}
.hot-section {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 32px;

    .hot-title {
        font-size: 20px;
        font-weight: 700;
        // height: 62px;
        // line-height: 62px;
        line-height: 1;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        display: flex;
        .wrap {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .menu {
            display: flex;
            padding-left: 24px;
            .item {
                padding: 0 24px;
                color: #53586c;
                line-height: 14px;
                font-size: 14px;
                cursor: pointer;

                &.this {
                    color: #025eff;
                }
            }
        }

        .options {
            display: flex;
            color: #3a3d4b;
            font-size: 14px;
            .item {
                display: flex;
                align-items: center;
                padding-left: 20px;
                cursor: pointer;

                &.subject {
                    padding-left: 32px;
                }

                &.this {
                    color: #025eff;
                }
                .checkbox {
                    width: 16px;
                    height: 16px;
                    margin-right: 8px;
                }

                .change {
                    width: 16px;
                    height: 16px;
                }
            }
        }
    }

    .content-list {
        // padding: 12px 0;
        padding-top: 10px;
        display: flex;
        margin: 0 -13px;
        overflow: hidden;
        flex-wrap: wrap;
    }
}
</style>
