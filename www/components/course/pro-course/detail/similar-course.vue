<template>
    <div>
        <div class="module-title">
            <span class="title-text">同类好课</span>
            <a :href="projectSeoCode ? `/pro-course/all/${projectSeoCode}` : '/pro-course'" target="_blank" class="more">更多好课</a>
        </div>
        <div class="list-wrap">
            <a v-for="item in data" :key="item.classtypeId" :href="`/pro-course/detail/${item.classtypeId}`" target="_blank" class="course-item">
                <div v-if="item.classtypeHotstatus === 'Y'" class="hot-tag">热卖</div>
                <div class="img-box">
                    <image-view :src="item.classtypeAppcoverimgurl" class="img" />
                </div>
                <div class="title-box">{{ item.classtypeName }}</div>
                <div class="tags-box">
                    <span v-if="item.currentAreaStatus === 'Y'" class="tag-txt c-yellow">{{ areaName }}</span>
                    <template v-for="(item2, index2) in item.classtypeHighlights">
                        <span :key="index2" v-if="index2 < 2" class="tag-txt c-gray">{{ item2 }}</span>
                    </template>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
import '@/api/ctc/api..query-class-recommend-list.js';
import '@/api/cp/api.CP0005.get-location.js';
import { mapActions } from 'vuex';
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';

export default {
    props: {
        classtypeId: {
            type: String,
            default: '',
        },
        projectSeoCode: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            data: [],
            areaName: '', // 当前地区名称
            projectIds: '',
        };
    },
    async fetch() {
        const [provinceList, areaName] = await Promise.all([this.getCity(), this.queryLocation()]);
        if (!provinceList.length) {
            return;
        }
        // 尝试匹配所在地
        const findItem = provinceList.find((i) => i.areaName === areaName);
        let areaCode = '';
        if (findItem) {
            areaCode = findItem.areaCode;
            this.areaName = findItem.areaName;
        } else {
            // 查到的所在地和枚举列表没对应上，默认选中第一个地区
            areaCode = provinceList[0].areaCode;
            this.areaName = provinceList[0].areaName;
        }
        return this.queryList(areaCode);
        /*return this.getRecommendProjectList().then((res) => {
            this.projectIds = res.map((project) => project.projectId).join(',');
            return this.queryList(areaCode);
        });*/
    },
    methods: {
        /*...mapActions('common/recommend-project', {
            getRecommendProjectList: 'getProjectList',
        }),*/
        ...mapActions('common/city', {
            getCity: 'getCity',
        }),
        // 获取当前所在地
        queryLocation() {
            return new Promise((resolve) => {
                this.$callApi('cp/get-location', {
                    onsuccess: ({ data }) => {
                        let areaName = '北京';
                        if (data && data.content && data.content.address_detail) {
                            areaName = (data.content.address_detail.province || data.content.address_detail.city).replace(
                                /省|市|壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区/,
                                ''
                            );
                        }
                        resolve(areaName);
                    },
                    onerror: niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            });
        },
        queryList(areacode) {
            return new Promise((resolve, reject) => {
                this.$callApi('ctc/query-class-recommend-list', {
                    pageSize: 4,
                    // 产品标识
                    classtypeId: this.classtypeId,
                    // 地区编码
                    areacode,
                    // 班型显示端
                    classtypeShowitem: 'WEB',
                    // projectIds: this.projectIds,
                    projectIds: '',
                    onsuccess: ({ data }) => {
                        this.data = data.map((i) => ({
                            ...i,
                            classtypeHighlights: i.classtypeHighlights.split(','),
                        }));
                        resolve();
                    },
                    onerror: niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            });
        },
    },
};
</script>

<style scoped lang="less">
.module-title {
    margin-top: 64px;
    line-height: 62px;
    display: flex;
    align-items: center;
    .title-text {
        font-size: 24px;
        color: #3a3d4b;
    }
    .more {
        padding-right: 12px;
        background: url('./asset/images/liveroomDetail_15.png') no-repeat right center;
        background-size: 10px 10px;
        margin-left: 32px;
        font-size: 14px;
        color: #77798d;
    }
}
.list-wrap {
    width: 1250px;
    margin-top: 10px;
    margin-left: -26px;
    display: flex;
    flex-wrap: wrap;
}

.course-item {
    box-sizing: border-box;
    width: 280px;
    height: 272px;
    padding: 175px 16px 0;
    margin-left: 26px;
    background-color: #fff;
    position: relative;
    border-radius: 8px;
    transition: all 0.2s linear;

    &:hover {
        transform: translate3d(0, -5px, 0);
        box-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);

        .img {
            transform: translateZ(0) scale3d(1.08, 1.08, 1.08);
        }
    }
}

.img-box {
    width: 100%;
    height: 175px;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;

    .img {
        width: 100%;
        height: 100%;
        transition: all 0.5s;
    }
}
.hot-tag {
    box-sizing: border-box;
    width: 65px;
    height: 26px;
    line-height: 26px;
    color: #df1a1c;
    font-size: 12px;
    background-image: url('../asset/images/hot-tag.png');
    background-size: 65px 26px;
    padding-left: 32px;
    position: absolute;
    left: 0;
    top: -12px;
    z-index: 2;
}
.title-box {
    margin: 12px 0 10px;
    height: 22px;
    line-height: 22px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: bold;
    color: #3a3d4b;
}

.tag-txt {
    float: left;
    margin-right: 6px;
    line-height: 22px;
    padding: 0 7px;
    font-size: 12px;
    color: #f8323c;
    background-color: #ffeff0;
    border-radius: 2px;

    &.c-yellow {
        color: #fa6400;
        background-color: rgba(251, 135, 21, 0.1);
    }

    &.c-gray {
        color: #53586c;
        background-color: #eeeff6;
    }
}

.tags-box {
    height: 52px;
    overflow: hidden;

    .tag-txt {
        margin-bottom: 6px;
    }
}
</style>
