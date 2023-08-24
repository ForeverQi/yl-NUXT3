<template>
    <div class="my-course-collection">
        <div class="tabDetails">
            <orderNull v-show="collectionList.length == 0 && loading == false" words="您还没有收藏任何课单哦！"></orderNull>
            <ul class="lessonlist">
                <li
                    v-for="item in collectionList"
                    :key="item.b"
                    @click="checkedOne(item)"
                    :class="[item.coursesheetValiditystatus == 'N' ? 'invalid' : '', !editShow ? 'editli' : '']"
                >
                    <img class="lessonlistmap" :src="$urlUtils.getViewUrl(item.coursesheetPicpath)" @error="imgErr($event, defaultImg)" />
                    <div class="checkFrame" v-show="!editShow" :class="{ active: item.active }"></div>
                    <span class="collection">
                        <img src="./asset/images/index_15.png" />
                        收藏
                    </span>
                    <span class="collection no" style="display: none">
                        <img src="./asset/images/index_14.png" />
                        收藏
                    </span>
                    <div class="livetitle">
                        {{ item.coursesheetName }}
                    </div>
                    <div class="brief">
                        {{ item.coursesheetIntroduce }}
                    </div>
                    <div class="linebottom">
                        <img class="index_16" src="./asset/images/index_16.png" />
                        <span class="allcourses">全部课程：共{{ item.courseList.length }}课</span>
                        <img class="index_16" src="./asset/images/index_16.png" />
                        主讲老师：
                        <template v-for="(teacher, index2) in item.teacherList">
                            <span :key="teacher.a" v-if="index2 < 3">
                                <img class="teachermap" :src="$urlUtils.getViewUrl(teacher.teacherImage)" @error="imgErr($event, defaultHeadImg)" />
                                {{ teacher.userName }}
                            </span>
                        </template>
                        <span class="teachermore">...</span>
                    </div>
                    <ul class="lessonlistul">
                        <template v-for="(course, index3) in item.courseList">
                            <li :key="index3" v-if="index3 < 3">
                                <span class="number">
                                    {{ index3 + 1 }}
                                </span>
                                <span :class="['lessontitle', index3 == 0 ? 'first' : '']">
                                    {{ course.courseName }}
                                </span>
                            </li>
                        </template>
                        <li>
                            <span class="lookall" @click="gotoDetails(item)">查看完整课单</span>
                        </li>
                    </ul>
                    <div v-if="item.coursesheetValiditystatus == 'Y'" class="lessonlistshadow"></div>
                    <div v-if="item.coursesheetValiditystatus == 'N'" class="invalidcover">
                        <img class="index_27" src="./asset/images/index_29.png" />
                    </div>
                </li>
            </ul>

            <div class="pagination" v-show="collectionList.length > 0">
                <vb-pagination :get-page="getPage" :page.sync="page" />
            </div>
        </div>
    </div>
</template>

<script>
import '@/api/uc/api.OS4006.os-sourcesheet-usersource-list.js';
import '@/api/uc/api.OS2003.os-source-collect-status-edit.js';
import orderNull from '@/www/components/uc/manager/myCourse/orderNull';
import vbPagination from '@/www/components/pagination/vbPagination';

export default {
    components: {
        orderNull,
        vbPagination,
    },
    data() {
        return {
            defaultImg: require('./asset/images/default-course-pic.png'),
            defaultHeadImg: require('./asset/images/os_list_img_08.png'),
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
                pages: 0,
            },
            collectionList: [],
            choseList: [],
            allSwitch: false,
            editShow: true,
            loading: true,
        };
    },
    watch: {
        collectionList: {
            deep: true,
            immediate: true,
            handler() {
                this.choseList = [];
                this.allSwitch = true;
                if (this.collectionList.length > 0) {
                    this.collectionList.forEach((val) => {
                        if (val.active) {
                            this.choseList.push(val);
                        }
                        if (!val.active) {
                            this.allSwitch = false;
                        }
                    });
                } else {
                    this.allSwitch = false;
                }
                this.$nuxt.$emit('allSwitchChange', this.allSwitch);
                this.$nuxt.$emit('choseListChange', this.choseList);
            },
        },
    },
    created() {
        this.$nuxt.$on('editShow', (data) => {
            this.editShow = data;
        });
        this.$nuxt.$on('cancel', () => {
            this.cancel();
        });
        this.$nuxt.$on('checkAll', () => {
            this.checkAll();
        });
        this.$nuxt.$on('deleteAll', () => {
            this.deleteAll();
        });
    },
    mounted() {
        this.getPage();
    },
    methods: {
        imgErr(e, img) {
            e.srcElement.src = img;
        },
        checkedOne(item) {
            // 选中与取消
            if (item.coursesheetValiditystatus == 'N') {
                return;
            }
            //编辑状态
            if (!this.editShow) {
                this.choseClass(item);
            }
        },
        //去详情页
        gotoDetails(item) {
            if (item.coursesheetValiditystatus == 'N') {
                return;
            }
            //编辑状态
            if (!this.editShow) {
                this.choseClass(item);
                return;
            }
            event.stopPropagation();
            // this.$router.push(`/${item.projectSeocode}/${item.courseType == 'L' ? 'live' : 'open'}/course/coursedetail?coursesheetId=${item.coursesheetId}`);
            open(`/${item.projectSeocode}/open/course/coursedetail?coursesheetId=${item.coursesheetId}`, '_blank');
        },
        choseClass(item) {
            event.stopPropagation();
            item.active = !item.active;
        },
        checkAll() {
            if (!this.allSwitch && this.collectionList.length > 0) {
                this.collectionList.forEach((val) => {
                    val.active = true;
                });
            } else if (this.allSwitch && this.collectionList.length > 0) {
                this.collectionList.forEach((val) => {
                    val.active = false;
                });
            }
        },
        //删除收藏的公开课
        deleteAll() {
            if (this.choseList.length == 0) {
                return;
            }
            let sourceIds = [];
            this.choseList.forEach((val) => {
                sourceIds.push(val.coursesheetId);
            });
            sourceIds = sourceIds.join(',');
            this.$niceloo.api.call('uc/os-source-collect-status-edit', {
                sourceType: 'L',
                collectStatus: 'N',
                sourceIds,
                onsuccess: () => {
                    this.getPage();
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        cancel() {
            if (this.allSwitch && this.collectionList.length > 0) {
                this.collectionList.forEach((val) => {
                    val.active = false;
                });
            }
        },
        //获取收藏列表
        getPage() {
            this.loading = true;
            this.$niceloo.api.call('uc/os-sourcesheet-usersource-list', {
                usersourceType: 'C',
                pageIndex: this.$PageUtil.getStartIndex(this.page),
                pageSize: this.page.pageSize,
                clientType: 'P',
                onsuccess: (res) => {
                    this.collectionList = res.data || [];
                    this.page.pageCount = Number(res.count || 0);
                    if (this.collectionList.length > 0) {
                        this.collectionList.forEach((val) => {
                            this.$set(val, 'active', false);
                        });
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
    },
};
</script>

<style scoped lang="less">
@import './css/connmon.less';
</style>
