<template>
    <!-- eslint-disable -->
    <div>
        <div class="tabDetails">
            <orderNull v-show="collectionList.length == 0 && loading == false" words="您还没有收藏任何公开课哦！"></orderNull>
            <ul class="payContent">
                <li class="payLi" v-for="item in collectionList" :key="item.a" @click="gotoDetails(item)" :class="{ passTime: item.courseStatus == 'N' }">
                    <courseCard :courseDetail="item" :editStatus="editShow" />
                </li>
            </ul>
            <div class="pagination" v-show="collectionList.length > 0">
                <vb-pagination :getPage="getPage" :page.sync="page" />
            </div>
        </div>
    </div>
</template>

<script>
import orderNull from '@/www/components/uc/manager/myCourse/orderNull';
import vbPagination from '@/www/components/pagination/vbPagination';
import courseCard from '@/www/components/uc/manager/openClass/courseCard';
import '@/api/cc/api.OS1006.query-collection-open-class-list.js';
import '@/api/cc/api.OS1001.query-open-class-detail.js';
import '@/api/bd/api.BD4704.query-project-detail.js';
import '@/api/cc/api.OS2003.set-open-class-collect-status.js';

export default {
    name: 'openClassCollection',
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
            collectionList: [],
            choseList: [],
            allSwitch: false,
            editShow: true,
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
        gotoDetails(item) {
            //去详情页
            if (item.courseStatus == 'N') {
                return;
            }
            if (!this.editShow) {
                //编辑状态
                this.choseClass(item);
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
                    // this.$PageUtil.href(`/${res.projectSeocode}/${item.courseType == 'L' ? 'live' : 'open'}/${this.toShort(item.courseId)}`);
                    open(`/liveBroadcast/detail?courseId=${item.courseId}`, '_blank');
                },
            });
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
        deleteAll() {
            //删除收藏的公开课
            if (this.choseList.length == 0) {
                return;
            }
            let sourceIds = [];
            this.choseList.forEach((val) => {
                sourceIds.push(val.courseId);
            });
            sourceIds = sourceIds.join(',');
            this.$niceloo.api.call('cc/set-open-class-collect-status', {
                sourceType: 'C',
                collectStatus: 'N',
                sourceIds,
                onsuccess: () => {
                    this.getPage();
                },
            });
        },
        cancel() {
            if (this.allSwitch && this.collectionList.length > 0) {
                this.collectionList.forEach((val) => {
                    val.active = false;
                });
            }
        },
        gotoPath(url) {
            // PageUtil.navigateTo(url);
        },
        getPage() {
            //获取收藏列表
            this.loading = true;
            this.$niceloo.api.call('cc/query-collection-open-class-list', {
                pageIndex: this.$PageUtil.getStartIndex(this.page),
                pageSize: this.page.pageSize,
                onsuccess: (data) => {
                    this.collectionList = data.data || [];
                    this.page.pageCount = Number(data.count || 0);
                    if (this.collectionList.length > 0) {
                        this.collectionList.forEach((val) => {
                            this.$set(val, 'active', false);
                        });
                    }
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
