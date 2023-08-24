<template>
    <div class="tabDetails">
        <orderNull v-show="purchasedList.length == 0 && loading == false" words="您还没有购买任何公开课哦！"></orderNull>
        <ul class="payContent">
            <li class="payLi" v-for="item in purchasedList" :key="item.a" @click="gotoDetails(item)" :class="{ passTime: item.courseStatus == 'N' }">
                <courseCard :course-detail="item" />
            </li>
        </ul>
        <div class="pagination" v-show="purchasedList.length > 0">
            <vb-pagination :get-page="getPage" :page.sync="page" />
        </div>
    </div>
</template>

<script>
import orderNull from '@/www/components/uc/manager/myCourse/orderNull';
import vbPagination from '@/www/components/pagination/vbPagination';
import courseCard from '@/www/components/uc/manager/openClass/courseCard';
import '@/api/cc/api.OS1005.query-open-class-list.js';
import '@/api/cc/api.OS1001.query-open-class-detail.js';
import '@/api/bd/api.BD4704.query-project-detail.js';
import '@/api/cc/api.OS2003.set-open-class-collect-status.js';
export default {
    name: 'openClassPurchased',
    components: {
        orderNull,
        vbPagination,
        courseCard,
    },
    data() {
        return {
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
                pages: 10,
            },
            purchasedList: [],
            loading: true,
            k: [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                'a',
                'b',
                'c',
                'd',
                'e',
                'f',
                'g',
                'h',
                'i',
                'j',
                'k',
                'l',
                'm',
                'n',
                'o',
                'p',
                'q',
                'r',
                's',
                't',
                'u',
                'v',
                'w',
                'x',
                'y',
                'z',
                'A',
                'B',
                'C',
                'D',
                'E',
                'F',
                'G',
                'H',
                'I',
                'J',
                'K',
                'L',
                'M',
                'N',
                'O',
                'P',
                'Q',
                'R',
                'S',
                'T',
                'U',
                'V',
                'W',
                'X',
                'Y',
                'Z',
            ],
        };
    },
    mounted() {
        this.getPage();
    },
    methods: {
        gotoDetails(item) {
            if (item.courseStatus == 'N') {
                return;
            }
            this.getProgectId(item.courseId) //获取projectId
                .then((projectId) => {
                    this.getProjectInfo(item, projectId); //获取projectSeocode
                });
        },
        getProgectId(courseId) {
            //获取projectId
            return new Promise((resolve) => {
                this.$niceloo.api.call('cc/query-open-class-detail', {
                    courseId,
                    clientType: 'P',
                    onsuccess: (res) => {
                        resolve(res.projectId);
                    },
                });
            });
        },
        getProjectInfo(item, projectId) {
            //获取projectSeocode
            this.$niceloo.api.call('bd/query-project-detail', {
                projectId,
                onsuccess: (res) => {
                    // this.$router.push(`/${res.projectSeocode}/${item.courseType == 'L' ? 'live' : 'open'}/${this.toShort(item.courseId)}`);
                    // https://wwwtest.youlu.com/liveBroadcast/detail?courseId=COURSE20220601000000000004
                    open(`/liveBroadcast/detail?courseId=${item.courseId}`, '_blank');
                },
            });
        },

        cancelOrder() {},

        gotoPath(url) {
            this.$PageUtil.href(url);
        },
        getPage() {
            this.loading = true;
            this.$niceloo.api.call('cc/query-open-class-list', {
                pageIndex: this.$PageUtil.getStartIndex(this.page),
                pageSize: this.page.pageSize,
                usersourceType: 'B', //用户课程获取方式]B:购买;S:分享;[说明]不传查询用户获取所有课程，已购课程列表传B
                onsuccess: (data) => {
                    this.page.pageCount = data.count;
                    this.purchasedList = data.data || [];
                    this.loading = false;
                },
                onerror: () => {
                    this.loading = false;
                },
            });
        },
        toShort(values) {
            var k = this.k;
            values = /(\d{10})(\d+)/.exec(values);
            var values1 = parseInt([...values[1]].join(''));
            var values2 = parseInt([...values[2]].join(''));
            function short(value, i = 0, j = 0) {
                var result = '';
                if (value == 0) {
                    return '0';
                }
                if ((value = /\d+/.exec(value)[0])) {
                    if (i == 0) {
                        while (true) {
                            if (Math.pow(k.length, i) > value) {
                                i--;
                                break;
                            }
                            i++;
                        }
                    }
                    while (true) {
                        if (Math.pow(k.length, i) * j > value) {
                            j--;
                            break;
                        }
                        j++;
                    }
                    if (i > 0) {
                        result += k[j] + short(value - Math.pow(k.length, i) * j, i - 1);
                    } else {
                        result += k[value];
                    }
                }
                return result;
            }
            var r1 = short(values1);
            var r2 = short(values2);
            return r1 + r2;
        },
    },
};
</script>

<style scoped lang="less">
.tabDetails {
    background: #fff;
    min-height: 662px;
}
.payContent {
    padding: 20px 60px 20px;
    font-size: 16px;
    color: #333;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .payLi {
        position: relative;
        height: 240px;
        width: 392px;
        margin-bottom: 16px;

        cursor: pointer;
        &.passTime {
            opacity: 0.7;
        }
    }
}
</style>
