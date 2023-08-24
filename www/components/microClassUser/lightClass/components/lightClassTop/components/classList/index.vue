<template>
    <div class="list-box" @scroll="scroll">
        <div class="list-item flex ai-center" v-for="(item, index) in list" :key="index" @click="switchPlayback(item, index)">
            <img :src="$urlUtils.getViewUrl(item.goodsCover)" alt="" class="item-img" :onerror="errorimg" />
            <div class="item-info">
                <div class="item-title">
                    {{ item.goodsName }}
                </div>
                <div class="flex">
                    <template v-for="(item1, index1) in item.tags">
                        <div class="item-type" v-if="index1 < 1" :key="index1">{{ item1 }}</div>
                    </template>
                </div>
            </div>
            <!-- 视频时才 -->
            <div class="item-time">{{ timeForm(item.duration) }}</div>
        </div>
    </div>
</template>
<script>
import { easyStudyWebList, easyStudyWebDetail } from '../../../../apis/index.js';
export default {
    name: 'classRightListModel',
    inject: ['copyOpt'],
    data() {
        return {
            errorimg: 'this.src="' + require('./asset/images/errorimg.png') + '"',
            list: [],
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
            },
            opt: null,
            lightClassData: null,
            total: 0,
            isClassOnLine: false,
            isFirst: 0,
        };
    },
    computed: {
        computedCopyOpt() {
            return this.copyOpt();
        },
    },
    watch: {
        computedCopyOpt: {
            immediate: true,
            handler(val) {
                this.list = [];
                this.page.pageIndex = 1;
                console.log(99999999999);
                console.log(val);
                if (val.optId === this.$route.query.optId) {
                    this.getDetail();
                } else {
                    this.getlightClassData();
                }
            },
        },
    },
    created() {},
    mounted() {
        /*this.getDetail();*/
    },
    methods: {
        getDetail() {
            easyStudyWebDetail(this, {
                goodsId: this.$route.params.courseId,
                optId: this.$route.query.optId,
                showClient: 'W',
            })
                .then((res) => {
                    this.lightClassData = res;
                    this.isClassOnLine = true;
                    this.getlightClassData();
                })
                .catch((err) => {
                    if (err.getAttachedData().getData().code === '4999') {
                        this.isClassOnLine = false;
                    }
                    this.getlightClassData();
                });
        },
        getlightClassData() {
            this.opt = this.copyOpt();
            easyStudyWebList(this, {
                optId: this.opt.optId,
                projectId: this.$route.query.projectId,
                showClient: 'W',
                pageIndex: this.page.pageIndex,
                pageSize: this.page.pageSize,
            })
                .then((res) => {
                    if (this.opt.optId === this.$route.query.optId && this.lightClassData) {
                        res.data.forEach((item) => {
                            if (item.goodsId != this.$route.params.courseId) {
                                this.list.push(item);
                            }
                        });
                        if ((this.list.length === 0 || this.list[0].goodsId !== this.$route.params.courseId) && this.lightClassData) {
                            this.list.unshift(this.lightClassData);
                        }
                    } else {
                        this.list = this.list.concat(res.data);
                    }
                    this.$bus.$emit('get-play-List', this.list);
                    //切换运营标签时，默认选中第一个|| this.lightClassData) (
                    if (this.isFirst != 0 && this.page.pageIndex === 1) {
                        console.log(this.isFirst);
                        this.switchPlayback(this.list[0], 0);
                    }
                    if (this.isFirst === 0 && this.opt.optId !== this.$route.query.optId) {
                        console.log('初始化进来，该运营分类不存在的情况下');
                        this.switchPlayback(this.list[0], 0);
                    }
                    this.isFirst++;
                    this.page.pageCount = Math.max(1, Math.ceil(res.count / this.page.pageSize));
                    this.total = res.count;
                })
                .catch((err) => {
                    console.error(4444, err);
                });
        },
        // 滚动加载分页
        scroll() {
            var listBox = event.target;
            // scrollTop 滚动条滚动时，距离顶部的距离
            // windowHeight，clientHeight 可视区的高度
            // scrollHeight 滚动条的总高度
            if (
                listBox.scrollTop + listBox.clientHeight >= listBox.scrollHeight &&
                this.page.pageIndex < this.page.pageCount &&
                this.list.length != this.total
            ) {
                this.page.pageIndex = this.page.pageIndex + 1;
                this.getlightClassData();
            }
        },
        switchPlayback(item, index) {
            this.$bus.$emit('switch-play-back', item, index);
        },
        timeForm(v) {
            let getM = () => {
                let m = Math.floor(v / 60);
                return m > 9 ? m : `0${m}`;
            };
            let getS = () => {
                let s = v % 60;
                return s > 9 ? s : `0${s}`;
            };
            return `${getM()}:${getS()}`;
        },
    },
};
</script>
<style lang="less" scoped>
.list-box {
    .list-item {
        margin: 18px 0 0;
        padding: 0 16px;
        cursor: pointer;
        position: relative;
        .item-img {
            display: block;
            width: 128px;
            height: 80px;
            margin-right: 12px;
            border-radius: 6px;
        }
        .item-info {
            width: calc(100% - 140px);
            height: 80px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .item-title {
                font-size: 14px;
                line-height: 19px;
                color: #eee;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                word-wrap: break-word;
            }
            .item-type {
                font-size: 12px;
                height: 22px;
                line-height: 22px;
                color: #a5acb7;
                background-color: #373853;
                padding: 0 8px;
                border-radius: 4px;
                margin-right: 12px;
            }
        }
        .item-time {
            width: 128px;
            height: 18px;
            line-height: 18px;
            font-size: 12px;
            color: #eee;
            text-align: right;
            padding-right: 4px;
            position: absolute;
            left: 16px;
            bottom: 0;
            background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.42) 88%);
            border-radius: 6px;
        }
    }
}
.popup-footer {
    width: 120px;
    height: 38px;
    text-align: center;
    line-height: 38px;
    color: #fff;
    background-image: linear-gradient(to right, #3a85fe, #025eff);
    border-radius: 8px;
    cursor: pointer;
}
</style>
