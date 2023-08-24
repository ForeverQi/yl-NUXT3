<template>
    <div class="coupon-list">
        <div class="tabs-wrap">
            <TabX :active-index="activeIndex" :data="tabs" @select="select" />
        </div>
        <div class="coupon-wrapper" v-loading="loading">
            <coupon-item-combination-view
                v-for="item in combinationList"
                ref="CouponItemViewItem2"
                :coupon-detail="item"
                :key="item.userCouponId"
                @handle-button="handleCoupon"
                @change-explain="changeExplain"
            />
            <div class="station-view" v-if="combinationList.length % 2 === 1"></div>
            <template v-for="item in ordinaryList">
                <CouponItemViewItem
                    ref="CouponItemViewItem"
                    :key="item.userCouponId"
                    :coupon-detail="item"
                    @handle-button="handleCoupon"
                    @change-explain="changeExplain"
                />
            </template>
            <div class="empty-view" v-if="page.pageCount === 0">
                <img src="./asset/images/empty.png" alt="" />
                <span>暂无优惠券</span>
            </div>
        </div>
        <div class="pagination" v-show="page.pageCount > 10">
            <Pagination :total="page.pageCount" :page-size="page.pageSize" @current-change="queryMyCouponList" :current-page.sync="page.pageIndex" />
        </div>
        <CouponQrcode v-if="isShow" :is-show.sync="isShow" :coupon-detail="activeCouponDetail" @copy-coupon="copyCoupon" />
    </div>
</template>

<script>
import track from './js/track.js';
import TabX from '@/www/components/tab/tabX/index.vue';
import CouponItemViewItem from '@/www/components/userCenter/coupon/coupon-item-view/index.vue';
import CouponItemCombinationView from '@/www/components/userCenter/coupon/coupon-item-combination-view/index.vue';
import CouponQrcode from '@/www/components/userCenter/coupon/coupon-qrcode/index.vue';
import Pagination from '@/www/components/components/pagination';
import '@/api/mp/api..query-my-coupon-list.js';
export default {
    name: 'coupon-list',
    components: {
        TabX,
        CouponItemViewItem,
        CouponItemCombinationView,
        CouponQrcode,
        Pagination,
    },
    mixins: [track],
    /**
     * @returns {object} 默认数据设置;
     */
    data() {
        return {
            // tab切换数组
            tabs: [
                {
                    value: 'not-use',
                    label: '未使用',
                },
                {
                    value: 'used',
                    label: '已使用',
                },
                {
                    value: 'expired',
                    label: '已过期',
                },
            ],
            activeIndex: 0, // tab切换选中的索引
            isShow: false, // 是否显示优惠券商品二维码弹框
            couponList: [], // 优惠券列表
            activeCouponDetail: {}, // 用户点击选择的优惠券信息
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: null,
            },
            loading: false, // loading加载
        };
    },
    computed: {
        /**
         * 组合券列表
         *
         * @returns {Array} 组合券列表
         */
        combinationList() {
            return this.couponList.filter((r) => {
                return r.couponType === 'G';
            });
        },
        /**
         * 普通券列表
         *
         * @returns {Array} 普通券列表
         */
        ordinaryList() {
            return this.couponList.filter((r) => {
                return r.couponType !== 'G';
            });
        },
    },
    /**
     * 初始化加载
     */
    created() {
        this.queryMyCouponList(1);
    },
    methods: {
        /**
         * 点击选择
         *
         * @param {number} index 索引
         */
        select(index) {
            this.activeIndex = index;
            this.queryMyCouponList(1);

            // 添加易观埋点
            if (this.tabs[index].value === 'not-use') {
                this.trackWebYouluClickWeishiyongyhjliebiao();
            } else if (this.tabs[index].value === 'used') {
                this.trackWebYouluClickYishiyongyhjliebiao();
            } else {
                this.trackWebYouluClickYiguoqiyhjliebiao();
            }
        },

        /**
         * 点击立即使用按钮
         *
         * @param {object} item 优惠券详细数据
         */
        handleCoupon(item) {
            this.isShow = true;
            this.activeCouponDetail = item;

            // 添加易观埋点
            this.trackWebYouluClickShiyonganniu({
                coupon_name: item.couponName,
                push_button: item.goodsType === 'single' ? '立即使用' : '可用商品',
                coupon_type: item.couponType === 'G' ? '组合优惠券' : '商品优惠券',
            });
        },

        /**
         *
         * 获取已付款订单列表
         *
         * @param {number} currentPage 分页索引
         */
        queryMyCouponList(currentPage) {
            if (currentPage) {
                this.page.pageIndex = currentPage;
            }

            this.loading = true;
            this.$niceloo.api.call('mp/query-my-coupon-list', {
                // 优惠券类型：A：未使用，U-已使用，E：已过期
                listType: this.tabs[this.activeIndex].value,
                pageIndex: this.page.pageIndex,
                pageSize: this.page.pageSize,
                onsuccess: (data) => {
                    this.couponList = data.list;
                    this.page.pageCount = data.count;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },

        /**
         * 点击使用说明
         *
         * @param {string} userCouponId 用户领取优惠券id
         */
        changeExplain(userCouponId) {
            const track = {
                page_name: '我的优惠券', // 页面名称
                coupon_name: '', // 优惠券名称
            };
            if (this.$refs.CouponItemViewItem?.length > 0) {
                this.$refs.CouponItemViewItem.forEach((item) => {
                    if (userCouponId !== item.couponDetail.userCouponId) {
                        item.isShowExplain = false;
                    } else {
                        track.coupon_name = item.couponDetail.couponName;
                        track.coupon_type = '商品优惠券';
                        // this.$yiguan.track('web_youlu_click_shiyongshuoming', track);
                    }
                });
            }
            if (this.$refs.CouponItemViewItem2?.length > 0) {
                this.$refs.CouponItemViewItem2.forEach((item) => {
                    if (userCouponId !== item.couponDetail.userCouponId) {
                        item.isShowExplain = false;
                    } else {
                        track.coupon_name = item.couponDetail.couponName;
                        track.coupon_type = '组合优惠券';
                    }
                });
            }
            this.$yiguan.track('web_youlu_click_shiyongshuoming', track);
        },
        /**
         * 点击复制链接
         *
         * @param {object} item 优惠券信息
         */
        copyCoupon(item) {
            // 添加易观埋点
            this.trackWebYouluCopyLianjiedizhi({
                coupon_name: item.couponName,
                push_button: item.goodsType === 'single' ? '立即使用' : '可用商品',
                coupon_type: item.couponType === 'G' ? '组合优惠券' : '商品优惠券',
            });
        },
    },
};
</script>

<style scoped lang="less">
.tabs-wrap {
    padding-bottom: 8px;
    border-bottom: 1px solid #eeeeee;
}
.station-view {
    width: 432px;
    margin-bottom: 24px;
}
.coupon-wrapper {
    padding: 32px 32px 0;
    min-height: 200px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    /deep/ .coupon-item {
        margin-bottom: 24px;
    }
}
.empty-view {
    width: 100%;
    margin-top: 106px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #3a3d4b;
    img {
        width: 260px;
        height: 180px;
        margin-bottom: 16px;
    }
}
.pagination {
    padding: 8px 0 32px;
}
</style>
