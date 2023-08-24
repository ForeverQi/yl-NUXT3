<script lang="jsx">
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'AuditionDivisionView',
    /**
     * @returns {object} 默认数据处理
     */
    data() {
        return {};
    },
    computed: {
        ...mapState('audition/info', {
            classtypeId: 'classtypeId',
            division: 'division',
            projectId: 'projectId',
            courseName: 'courseName',
        }),
    },
    methods: {
        ...mapMutations('audition/info', {
            setCourseInfo: 'setCourseInfo',
            doVideoPause: 'doVideoPause',
        }),
        /**
         * 显示购买弹窗
         */
        doShowBuy() {
            this.doVideoPause();
            this.setCourseInfo({
                showBuyDialog: true,
            });
        },
    },
    /**
     * @returns {object} vue 虚拟dom
     */
    render() {
        return (
            <div class="division-view">
                <div
                    style={this.division === 2 ? '' : 'visibility: hidden'}
                    class="catalogue-stow"
                    onClick={() => {
                        this.setCourseInfo({
                            division: 1,
                        });
                    }}
                >
                    <div class="icon stow"></div>
                    <div class="txt">收起</div>
                </div>
                <div class="division-wrap">
                    <div
                        class={['item', this.division === 2 ? 'this' : '']}
                        onClick={() => {
                            this.setCourseInfo({
                                division: 2,
                            });
                        }}
                    >
                        <div class="icon mulu"></div>
                        <div class="txt">目录</div>
                    </div>
                    <div
                        class="item"
                        onClick={() => {
                            const track = {
                                course_name: this.courseName,
                                project_id: this.projectId,
                                button_name: '课程详情',
                                page_name: document.title,
                            };
                            this.$yiguan.track('youlu_click_shitingyeanniu', track);
                            setTimeout(() => {
                                this.$PageUtil.href(`/pro-course/detail/${this.classtypeId}`);
                            }, 300);
                        }}
                    >
                        <div class="icon info"></div>
                        <div class="txt">课程详情</div>
                    </div>
                    <div
                        class="item"
                        onClick={() => {
                            const track = {
                                course_name: this.courseName,
                                project_id: this.projectId,
                                button_name: '立即购买',
                                page_name: document.title,
                            };
                            this.$yiguan.track('youlu_click_shitingyeanniu', track);
                            this.doShowBuy();
                        }}
                    >
                        <div class="icon shop"></div>
                        <div class="txt">立即购买</div>
                    </div>
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.division-view {
    width: 60px;
    height: 100%;
    background-color: #1b212a;
    .catalogue-stow {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 90px;
        margin-top: 60px;

        &:hover {
            background-color: #364353;
            .txt {
                color: #fff;
            }
            .icon {
                &.stow {
                    background-image: url(./asset/images/icon2/stow.png);
                }
            }
        }
        .icon {
            width: 18px;
            height: 18px;
            background-size: 100% 100%;
            background-position: center center;

            &.stow {
                background-image: url(./asset/images/icon/stow.png);
            }
        }
        .txt {
            font-size: 14px;
            text-align: left;
            color: #bbbbbb;
            line-height: 16px;
            padding-top: 8px;
        }
    }
}
.division-wrap {
    .item {
        text-align: center;
        height: 70px;
        width: 100%;
        padding-top: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: default;

        &.comQues {
            display: none;
        }
        &:hover,
        &.this {
            background-color: #2a3440;

            .txt {
                color: #fff;
            }

            .icon {
                &.mulu {
                    background-image: url(./asset/images/icon2/mulu.png);
                }
                &.info {
                    background-image: url(./asset/images/icon2/info.png);
                }
                &.shop {
                    background-image: url(./asset/images/icon2/shop.png);
                }
            }
        }
        .icon {
            width: 24px;
            height: 24px;
            margin: 0 auto;
            background-size: 100% 100%;
            background-repeat: no-repeat;

            &.mulu {
                background-image: url(./asset/images/icon/mulu.png);
            }
            &.info {
                background-image: url(./asset/images/icon/info.png);
            }
            &.shop {
                background-image: url(./asset/images/icon/shop.png);
            }
        }
        .txt {
            font-size: 12px;
            color: #ddd;
            padding-top: 8px;
            line-height: 16px;
        }
    }
}
</style>
