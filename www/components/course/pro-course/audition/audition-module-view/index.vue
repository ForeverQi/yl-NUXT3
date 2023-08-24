<script lang="jsx">
import { mapState, mapMutations } from 'vuex';
import '@/api/cc/api..query-class-module-list.js';
export default {
    name: 'AuditionModuleView',
    /**
     * @returns {object} 默认对象
     */
    data() {
        const _this = this;
        return {
            hiddenNavigation: true,
            list: [],
            swiperOption: {
                slidesPerView: 'auto',
                spaceBetween: 10,
                allowTouchMove: false,
                navigation: {
                    nextEl: '.button-prev',
                    prevEl: '.button-next',
                },
                on: {
                    /**
                     * swpier 初始化成功之后的回调
                     */
                    init() {
                        setTimeout(() => {
                            if (
                                this.navigation.nextEl.classList.contains('swiper-button-disabled') &&
                                this.navigation.prevEl.classList.contains('swiper-button-disabled')
                            ) {
                                _this.hiddenNavigation = true;
                            } else {
                                _this.hiddenNavigation = true;
                            }
                        }, 500);
                    },
                },
            },
        };
    },
    computed: {
        ...mapState('audition/info', {
            classtypeId: 'classtypeId',
            selectModuleId: 'selectModuleId',
        }),
    },
    watch: {
        classtypeId: {
            /**
             *
             * @param {string} val 班型ID
             */
            handler(val) {
                if (val) {
                    this.init();
                }
            },
            immediate: true,
        },
    },
    methods: {
        ...mapMutations('audition/info', {
            setCourseInfo: 'setCourseInfo',
            setModuleList: 'setModuleList',
        }),
        /**
         * 初始化方法
         */
        init() {
            this.getData().then((res) => {
                if (!Array.isArray(res)) {
                    res = [];
                }
                res = res.filter((r) => {
                    return r.modulAuditionStatus === 'Y';
                });
                let selectIndex = 0;
                res.forEach((item, index) => {
                    if (item.modulId === this.$route.query.moduleId) {
                        selectIndex = index;
                    }
                });
                this.setModuleList(res);
                this.list = res;
                if (res.length > 0) {
                    if (selectIndex > 0) {
                        this.mySwiper.slideTo(selectIndex);
                        this.setModuleId(res[selectIndex]);
                    } else {
                        this.setModuleId(res[0]);
                    }
                } else {
                    this.setCourseInfo({
                        isLoading: false,
                        ifShowPlayer: true, // 没有模块的时候直接显示播放器
                    });
                }
            });
        },
        /**
         * 初始化获取数据
         *
         * @returns {object} promise接口请求
         */
        getData() {
            return this.$callApi('cc/query-class-module-list', {
                classtypeId: this.classtypeId,
            })
                .then((APIResponse) => {
                    let res = APIResponse.getData();
                    return res;
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        /**
         *
         * @param {object} item 模块对象
         */
        setModuleId(item) {
            this.setCourseInfo({
                selectModuleId: item.modulId,
                playModuleName: item.modulName,
            });
        },
    },
    /**
     * @returns {object} vue虚拟dom
     */
    render() {
        return (
            <div class="module-view" v-swiper:mySwiper={this.swiperOption}>
                <div class="button-next" style={this.hiddenNavigation ? '' : 'display: none'}></div>
                <div class="swiper-wrapper">
                    {this.list.length > 0 &&
                        this.list.map((item) => {
                            return (
                                <div
                                    key={item.modulId}
                                    class={[this.selectModuleId === item.modulId ? 'this' : '', 'swiper-slide', 'item']}
                                    onClick={() => {
                                        this.getData().then((list) => {
                                            let isHave = false;
                                            let isTry = false;
                                            if (!Array.isArray(list)) {
                                                list = [];
                                            }
                                            list.forEach((r) => {
                                                if (r.modulId === item.modulId) {
                                                    isHave = true;
                                                    if (r.modulAuditionStatus === 'Y') {
                                                        isTry = true;
                                                    }
                                                }
                                            });

                                            this.setModuleId(item);
                                            if (isTry === true) {
                                                // this.setModuleId(item);
                                            } else if (isHave === true) {
                                                this.$baseUI
                                                    .alert('模块已取消试听！', '提示', { showClose: true })
                                                    .then((res) => {
                                                        window.location.reload();
                                                    })
                                                    .catch(() => {
                                                        window.location.reload();
                                                    });
                                            } else {
                                                this.$baseUI
                                                    .alert('模块已下架！', '提示', { showClose: true })
                                                    .then((res) => {
                                                        window.location.reload();
                                                    })
                                                    .catch(() => {
                                                        window.location.reload();
                                                    });
                                            }
                                        });
                                    }}
                                >
                                    {item.modulName}
                                </div>
                            );
                        })}
                </div>
                <div class="button-prev" style={this.hiddenNavigation ? '' : 'display: none'}></div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.module-view {
    position: relative;
    width: 100%;
    padding: 0 20px;
    padding-bottom: 16px;
    flex-shrink: 0;
    box-sizing: border-box;

    .swiper-wrapper {
        display: flex;
    }
    .button-next {
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 50px;
        background-image: url(./asset/images/left.png);
        background-size: 20px 34px;
        background-position: center 0;
        background-repeat: no-repeat;
        cursor: pointer;
        z-index: 2;

        &.swiper-button-disabled {
            display: none;
        }
    }
    .button-prev {
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 50px;
        background-image: url(./asset/images/right.png);
        background-size: 20px 34px;
        background-position: center 0;
        background-repeat: no-repeat;
        cursor: pointer;
        z-index: 2;
        &.swiper-button-disabled {
            display: none;
        }
    }
    .item {
        display: inline-block;
        width: auto;
        height: 34px;
        line-height: 34px;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.14);
        border-radius: 17px;
        color: #ffffff;
        padding: 0 16px;
        font-size: 14px;
        cursor: pointer;

        &.this {
            color: #fff;
            background: linear-gradient(90deg, #ff6870, #f8323c);
        }
    }
}
</style>
