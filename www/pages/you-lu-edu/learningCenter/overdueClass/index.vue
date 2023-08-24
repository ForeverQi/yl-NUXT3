<!-- 过期课程列表-->
<template>
    <div class="myclass-box margin-auto">
        <div class="myclass-header flex jc-between">
            <vb-breadcrumb :items="items" :options="{ changer: false }"></vb-breadcrumb>
        </div>
        <div class="myclass-cnt">
            <div v-if="haveOverdueClass">
                <div class="pastClassOne" v-for="(item, index) in expiredClass" :key="index">
                    <past-class-card :expired-class="item" :expired-class-statistics="expiredClassStatistics[index]" />
                </div>
                <div class="pt20">
                    <vb-pagination :get-page="getPage" :page.sync="page"></vb-pagination>
                </div>
            </div>
            <div class="notip-box" v-else>
                <img src="../asset/images/no-overduecourses.png" alt="" class="" />
                <p class="tip">无过期课程哦~</p>
            </div>
        </div>
    </div>
</template>

<script>
import '@/api/cc/api.CC3102.query-mycourse-past-list';
import '@/api/cc/api.CC3101.query-my-class-stat'; // 接口-我的班级统计
import VbBreadcrumb from '@/www/components/vbBreadcrumb';
import vbPagination from '@/www/components/pagination/vbPagination';
import PastClassCard from '@/www/components/learningCenter/classList/pastClassCard';
const imgUrl = require('../asset/images/default-course-pic.png');

export default {
    name: 'overdueCourses',
    components: { VbBreadcrumb, vbPagination, PastClassCard },
    data() {
        return {
            items: [
                {
                    name: '学习中心',
                    href: '/learningCenter/index/myCourse',
                },
                {
                    name: '过期课程',
                },
            ],
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
                pages: 0,
            },
            expiredClass: [],
            expiredClassStatistics: [],
            haveOverdueClass: true, //是否有过期课程
            imgUrl,
            classIds: '',
        };
    },
    head() {
        return {
            title: '过期课程-学习中心-优路教育',
        };
    },
    mounted() {
        if (typeof window !== 'undefined') {
            $(document).scrollTop(0);
        }

        //我的过期班级列表
        this.getPage();
    },
    methods: {
        //我的过期班级列表
        getPage() {
            this.$callApi('cc/query-mycourse-past-list', {
                pageSize: this.page.pageSize, //第一个参数是取几条
                pageIndex: this.$PageUtil.getStartIndex(this.page), //从第几个取其
                onsuccess: (result) => {
                    if (result) {
                        this.page.pageCount = result.total;
                        this.expiredClass = result.data;
                        this.classIds = result.classIds || '';
                        if (this.classIds) {
                            //我的过期班级统计
                            this.getClassStat();
                        }
                    }
                    this.haveOverdueClass = this.expiredClass.length != 0;
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        /**
         * 我的班级统计
         * @param
         * @param success 成功回调
         */
        getClassStat(val) {
            this.$callApi('cc/query-my-class-stat', {
                classIds: this.classIds,
                onsuccess: (result) => {
                    if (result) {
                        result.data.forEach((item) => {
                            const ucsCompulsoryRate = parseFloat(item.ucsCompulsoryRate);
                            /*+ '%'*/
                            item.ucsCompulsoryRate = isNaN(ucsCompulsoryRate) ? 0 : ucsCompulsoryRate;
                        });
                        this.expiredClassStatistics = result.data;
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import url('../css/base.less');
.myclass-box {
    margin-bottom: 50px;

    .myclass-header {
        padding-top: 10px;

        .cur-subject {
            color: #666666;
            font-size: 16px;
        }
    }

    .myclass-cnt {
        // margin-top: 15px;
        min-height: 700px;

        .pastClassOne {
            position: relative;
            /*padding: 16px 16px 13px;*/
            background: #ffffff;
            overflow: hidden;
            margin-bottom: 15px;
            border-radius: 4px;
            /deep/.past-class-item {
                padding: 0;
                background-color: #fff;
            }
        }

        .askLearnReport {
            width: 160px;
            height: 36px;
            background: linear-gradient(90deg, rgba(255, 68, 54, 1) 0%, rgba(249, 107, 84, 1) 100%);
            box-shadow: 0px 2px 11px 1px rgba(104, 20, 12, 0.08);
            border-radius: 18px 0px 0px 18px;
            position: absolute;
            right: 0;
            bottom: 20px;
            cursor: pointer;
            line-height: 36px;
        }

        .askLearnReport span {
            display: inline-block;
            color: #ffffff;
            font-size: 16px;
            background: url('../asset/images/mycourse-1.png') no-repeat center right;
            padding-left: 22px;
            width: 143px;
        }
        .notip-box {
            padding: 160px 0px 330px 0px;
            text-align: center;
            .tip {
                margin-top: 25px;
                font-size: 16px;
                color: #666666;
            }
        }
    }
}
</style>
