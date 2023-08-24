<script lang="jsx">
import '@/api/mcu/api.mcu-07.home-ad-pic.js';
export default {
    data() {
        return {
            images: [],
            currentIndex: 0, // 当前显示
            prevIndex: -1, // 上一个
            nextIndex: 0, // 下一个
            timer: null,
            // 0：加载中，1：加载成功，2：加载成功无数据，3：接口报错
            pageStatus: 0, // 加载状态
        };
    },
    fetch() {
        this.pageStatus = 0;
        return this.init();
    },
    mounted() {
        this.doTimer();
    },
    destroyed() {
        clearInterval(this.timer);
    },
    methods: {
        init() {
            // 获取数据
            return this.getBannerList();
        },
        doTimer2() {
            if (this.images.length <= 1) {
                return;
            }
            this.doTimer();
        },
        doTimer() {
            if (this.pageStatus !== 0 && this.images.length <= 1) {
                clearInterval(this.timer);
            } else {
                this.changeIndex(this.currentIndex);
                this.timer = setInterval(() => {
                    this.autoChangeIndex();
                }, 3000);
            }
        },
        getBannerList() {
            return this.$callApi('home/home-ad-pic', {
                lytCode: 'YLWEB_SYB02',
            })
                .then(
                    (res) => {
                        return res.getData();
                    },
                    (err) => {
                        this.$niceloo.api.handleFailure(err);
                        return Promise.reject(err);
                    }
                )
                .then((res) => {
                    if (Array.isArray(res) && res.length > 0) {
                        this.pageStatus = 1;
                        this.images = res.slice(0, 6);
                    } else {
                        this.pageStatus = 2;
                        this.images = [];
                    }
                })
                .catch(() => {
                    this.pageStatus = 3;
                    this.images = [];
                });
        },
        autoChangeIndex() {
            let index = this.currentIndex;
            if (index === this.images.length - 1) {
                index = 0;
            } else {
                index += 1;
            }
            this.changeIndex(index);
        },
        changeIndex(index) {
            if (this.prevIndex !== -1 || this.currentIndex !== 0) {
                this.prevIndex = this.currentIndex;
            }

            this.currentIndex = index;
            this.$emit('changeImage', (this.images[index] || {}).adPicture);
        },
        stopTimer() {
            clearTimeout(this.timer);
        },
        doTrack(item, index) {
            console.log('@@@343');
            // const userInfo = this.$storage.get('loginStatus') || {};
            // let data = {
            //     college_name: '-',
            //     user_project_position: '-',
            //     user_id: userInfo.userId ?? '-', // 用户标识 （已登录的用户）
            //     platform_type: '优路教育官网-Web端', // 平台名称
            //     ad_type: '轮播广告',
            //     ad_position: '首页轮播图',
            //     page_position: '-',
            //     ad_number: index,
            //     ad_name: item.adName,
            //     ad_url: item.adLink,
            //     page_name: '优路教育-点亮职业人生',
            //     project_position: '-',
            //     is_login_in: !!userInfo.userId,
            //     is_student: userInfo.studentDeposittype === 'T',
            // };

            let data = {
                ad_name: item.adName,
                jump_type: item.adLinkType === 1 ? 'URL链接' : item.adLinkType === 2 ? '小程序' : '无跳转',
                ad_url: item.adLinkType === 1 || item.adLinkType === 2 ? item.adLink : '',
                ad_position_name: '大首页-顶部Banner',
                page_name: document.title,
            };
            this.$yiguan.track('web_youlu_ad_space', data);
        },
    },
    render() {
        return (
            <div class="section">
                {this.$slots.default}
                <div class="img-wrap" onMouseenter={this.stopTimer} onMouseleave={this.doTimer2}>
                    {this.images.map((r, index) => {
                        let link = r.adLink;
                        let target = '_blank';
                        if (r.adLinkType === 3) {
                            target = '_self';
                            link = 'javascript:void(0)';
                        }
                        return (
                            <a
                                href={link}
                                target={target}
                                onClick={() => {
                                    this.doTrack(r, index);
                                }}
                                class={['img-link', index === this.currentIndex || index === this.prevIndex ? 'show' : '']}
                            >
                                <image-view
                                    placeholderWidth={`30%`}
                                    type="banner"
                                    class={[
                                        'img',
                                        index === this.currentIndex ? 'show' : '',
                                        this.currentIndex !== this.prevIndex && index === this.prevIndex ? 'vanish' : '',
                                    ]}
                                    ref="img"
                                    src={this.$urlUtils.getViewUrl(r.adPicture)}
                                />
                            </a>
                        );
                    })}
                    {this.images.length === 0 && <image-view type="banner" placeholderWidth={`30%`} class="show show" ref="img" src={``} />}
                </div>
                {this.images.length > 0 && (
                    <div class="dot-list" onMouseenter={this.stopTimer} onMouseleave={this.doTimer}>
                        {this.images.map((r, index) => {
                            let link = r.adLink;
                            let target = '_blank';
                            if (r.adLinkType === 3) {
                                target = '_self';
                                link = 'javascript:void(0)';
                            }
                            return (
                                <a
                                    href={link}
                                    data-index={index}
                                    target={target}
                                    onMouseover={() => {
                                        this.changeIndex(Number(index));
                                    }}
                                    class={['a-link', index === this.currentIndex ? 'this' : '']}
                                >
                                    {r.adName}
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.section {
    position: relative;
    z-index: 2;
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    border-radius: 12px;
    overflow: hidden;

    .img-wrap {
        height: 100%;
        .img-link {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            z-index: 1;
            &.show {
                display: block;
            }
            .img {
                width: 100%;
                height: 100%;
                opacity: 0;
                visibility: hidden;

                &.show {
                    display: block;
                    visibility: visible;
                    animation: fadeIn 280ms ease-out forwards;
                }
                &.vanish {
                    display: block;
                    visibility: visible;
                    animation: fadeOut 280ms ease-out forwards;
                }
            }
        }
    }

    .dot-list {
        position: absolute;
        right: 32px;
        top: 63px;
        z-index: 2;
        width: 192px;
        height: 254px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        box-sizing: border-box;
        padding-top: 30px;
        &:hover {
            background: rgba(0, 0, 0, 0.5);
        }
        .a-link {
            position: relative;
            width: 125px;
            height: 19px;
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #fff;
            line-height: 19px;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 34px;
            padding-right: 12px;
            padding-bottom: 16px;

            &:hover,
            &.this {
                color: #ff2e30;
                &:before {
                    position: absolute;
                    top: 5px;
                    left: 12px;
                    content: '';
                    width: 10px;
                    height: 10px;
                    display: block;
                    background-image: url(./asset/images/allow.png);
                    background-size: 100% 100%;
                }
            }
        }
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}
</style>
