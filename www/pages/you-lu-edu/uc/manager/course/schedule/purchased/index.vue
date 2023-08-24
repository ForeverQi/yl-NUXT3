<template>
    <div class="tabDetails">
        <orderNull v-show="receiveList.length == 0 && loading == false" words="您还没有购买任何课单哦！"></orderNull>
        <ul class="lessonlist">
            <li v-for="item in receiveList" :key="item.b" :class="item.coursesheetValiditystatus == 'N' ? 'invalid' : ''">
                <img class="lessonlistmap" :src="$urlUtils.getViewUrl(item.coursesheetPicpath)" @error="imgErr($event, defaultImg)" />
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
                            <span class="number">{{ index3 + 1 }}</span>
                            <span :class="['lessontitle', index3 == 1 ? 'first' : '']">
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
        <div class="pagination" v-show="receiveList.length > 0">
            <vb-pagination :get-page="getPage" :page.sync="page" />
        </div>
    </div>
</template>

<script>
import '@/api/uc/api.OS4006.os-sourcesheet-usersource-list.js';
import orderNull from '@/www/components/uc/manager/myCourse/orderNull';
import vbPagination from '@/www/components/pagination/vbPagination';
export default {
    name: 'myCoursePurchased',
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
            receiveList: [],
            loading: true,
        };
    },
    mounted() {
        this.getPage();
    },
    methods: {
        imgErr(e, img) {
            e.srcElement.src = img;
        },
        //去详情页
        gotoDetails(item) {
            if (item.coursesheetValiditystatus == 'N') {
                return;
            }
            // this.$router.push(`/${item.projectSeocode}/${item.courseType == 'L' ? 'live' : 'open'}/course/coursedetail?coursesheetId=${item.coursesheetId}`);
            open(`/${item.projectSeocode}/open/course/coursedetail?coursesheetId=${item.coursesheetId}`, '_blank');
        },
        //获取收藏列表
        getPage() {
            this.loading = true;
            this.$niceloo.api.call('uc/os-sourcesheet-usersource-list', {
                usersourceType: 'B',
                pageIndex: this.$PageUtil.getStartIndex(this.page),
                pageSize: this.page.pageSize,
                clientType: 'P',
                onsuccess: (res) => {
                    this.receiveList = res.data || [];
                    this.page.pageCount = res.count;
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
