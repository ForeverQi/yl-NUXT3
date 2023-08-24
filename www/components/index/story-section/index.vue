<script lang="jsx">
import VbVideo from '@/www/components/business/vbVideo/index.vue';
import Empty from '@/www/components/components/empty/index.vue';
export default {
    name: 'StorySection',
    components: {
        VideoWrap: {
            props: {
                playVid: {
                    type: String,
                    default: '',
                },
            },
            data() {
                return {};
            },
            methods: {
                courseReady() {
                    // 点播课组件初始化成功
                    let param = {
                        videoId: this.playVid,
                        type: 'P',
                        autoplay: true,
                        volume: 0.5,
                        noToken: true,
                    };
                    let options = {
                        watchEndTime: null,
                        df: 2,
                    };
                    this.$refs.vbVideo.playVid(param, options);
                },
                doClose() {
                    this.$emit('close', false);
                },
            },
            render() {
                return (
                    <div class="dialog">
                        <div class="wrap">
                            <div class="close" onClick={this.doClose}>
                                ×
                            </div>
                            <VbVideo ref="vbVideo" onReady={this.courseReady} />
                        </div>
                    </div>
                );
            },
        },
    },
    data() {
        return {
            isShow: false,
            list: [],

            // 0：加载中，1：加载成功，2：加载成功无数据，3：接口报错
            pageStatus: 0, // 加载状态
        };
    },
    fetch() {
        return this.init();
    },
    methods: {
        init() {
            console.log('@@@###');
            return this.getData();
        },
        getData() {
            const data = {
                url: 'channel/query-config-model-info',
                params: {
                    // 频道标识
                    columnId: this.$nuxt.context.env.config.indexColumnId,
                    // 模块编码
                    moduleCode: 'YLGS',
                    // 页码
                    pageIndex: 1,
                    // 记录数
                    pageSize: 1,
                },
                isCustom: true,
            };
            return this.httpClient(data)
                .then((res) => {
                    if (res.content.length === 0) {
                        this.pageStatus = 2;
                    } else {
                        const tmp = res.content[0];
                        this.list = [
                            {
                                ...tmp.vidFirst,
                            },
                            {
                                ...tmp.vidLast,
                            },
                        ];
                        this.pageStatus = 1;
                    }
                })
                .catch(() => {
                    this.pageStatus = 3;
                });
        },
        doHandle(vid) {
            this.playVid = vid;
            this.isShow = true;
        },
        httpClient({ url, params = {}, isCustom = false }) {
            return this.$callApi(url, {
                ...params,
            }).then(
                (res) => {
                    return res.getData();
                },
                (err) => {
                    if (!isCustom) this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                }
            );
        },
        /**
         * 优路故事模块埋点
         */
        trackData(index) {
            const track = {
                module_name: '优路故事', // 模块名称
                course_name: String(index + 1), // 资源名称（序号）
                project_id: '-', //项目ID
            };
            this.$yiguan.track('youlu_click_home_page_recommendation_module', track);
        },
    },
    render() {
        return (
            <div class="story-section">
                {this.pageStatus > 0 && this.pageStatus !== 1 && (
                    <div class="empty">
                        <Empty />
                    </div>
                )}
                {this.pageStatus === 1 &&
                    this.list.map((r, index) => {
                        return (
                            <div
                                class="item"
                                onClick={() => {
                                    this.doHandle(r.url);
                                    this.trackData(index);
                                }}
                                style={`background-image: url(${this.$urlUtils.getViewUrl(r.coverPath)}`}
                            >
                                <div class="bg"></div>
                                <img class="play" src={require('./asset/images/play.png')} />
                            </div>
                        );
                    })}
                {this.isShow && <VideoWrap playVid={this.playVid} onClose={() => (this.isShow = false)} />}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
/deep/ .dialog {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 200;
    background-color: rgba(0, 0, 0, 0.5);

    .wrap {
        position: relative;
        width: 1120px;
        height: 589px;
        background: #ffffff;
        border-radius: 16px;
        box-sizing: border-box;
        padding: 20px;
        .close {
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 28px;
            width: 32px;
            height: 32px;
            line-height: 28px;
            text-align: center;
            border-radius: 50%;
            color: #fff;
            cursor: pointer;
            border: 1px solid #fff;
        }
    }
}
.story-section {
    padding: 24px;
    .item {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 169px;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 18px;
        background-size: 100% 100%;

        .bg {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.3);
        }
        &.it1 {
            background-image: url(./asset/images/1.jpg);
        }

        &.it2 {
            background-image: url(./asset/images/2.jpg);
        }

        .play {
            position: relative;
            width: 50px;
            height: 50px;
            z-index: 1;
            cursor: pointer;
        }
    }
}
</style>
