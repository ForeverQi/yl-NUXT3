<script lang="jsx">
export default {
    name: 'CourseMaxHandout',
    props: {
        coursewareHandoutPath: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            list: [],
            curIndex: 0,

            pageStatus: 0, // 0：初始状态，1：加载成功，2：加载成功无数据，3：接口报错
        };
    },
    watch: {
        coursewareHandoutPath: {
            handler(val, oldVal) {
                if (val && val !== oldVal) {
                    this.getData();
                } else if (!val) {
                    this.pageStatus = 2;
                }
            },
            immediate: true,
        },
    },
    methods: {
        getData() {
            const data = {
                url: 'fs/query-file-img-list',
                params: {
                    filePath: this.coursewareHandoutPath,
                },
                isCustom: true,
            };
            this.httpClient(data)
                .then((res) => {
                    this.list = res.list;
                    if (this.list.length > 0) {
                        this.pageStatus = 1;
                    } else {
                        this.pageStatus = 2;
                    }
                })
                .catch(() => {
                    this.$baseUI.alert('您购买的班级讲义更新出现异常，请联系您的班主任老师~');
                    this.pageStatus = 3;
                });
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
    },
    render() {
        return (
            <div class="course-max-handout">
                {this.pageStatus === 1 && (
                    <div class="img-wrap">
                        <img src={(this.list[this.curIndex] || {}).url} class="img" />
                    </div>
                )}
                {this.pageStatus === 1 && (
                    <div class="fixed">
                        <div
                            class={['prev', this.curIndex === 0 ? 'end' : '']}
                            onClick={() => {
                                // 上一页
                                if (this.curIndex === 0) {
                                    // 已经是第一页了
                                    return;
                                }
                                this.curIndex -= 1;
                            }}
                        >
                            上一页
                        </div>
                        <div class="num">
                            <span class="cur">{this.curIndex + 1}</span> / {this.list.length}
                        </div>
                        <div
                            class={['next', this.list.length - 1 === this.curIndex ? 'end' : '']}
                            onClick={() => {
                                // 下一页
                                if (this.curIndex === this.list.length - 1) {
                                    // 已经到了最后一夜
                                    return;
                                }
                                this.curIndex += 1;
                            }}
                        >
                            下一页
                        </div>
                    </div>
                )}
                {this.pageStatus === 2 && (
                    <div class="empty">
                        <img src={require('./asset/images/empty.png')} class="img" />
                        <p class="txt">暂无在线版讲义</p>
                    </div>
                )}
                {this.pageStatus === 3 && (
                    <div class="empty">
                        <img src={require('./asset/images/empty.png')} class="img" />
                        <p class="txt">暂无在线版讲义</p>
                    </div>
                )}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.course-max-handout {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #0c121a;
    z-index: 1;

    .img-wrap {
        height: 100%;
        width: 100%;
        text-align: center;

        .img {
            height: 100%;
            max-width: 100%;
        }
    }

    .fixed {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        right: 16px;
        top: 50%;
        margin-top: -74px;
        width: 96px;
        height: 108px;
        padding: 20px 0;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 4px;
        font-size: 18px;
        color: #fff;
        line-height: 1;
        font-weight: 400;

        .prev,
        .next {
            cursor: pointer;

            &.end {
                opacity: 0.6;
                cursor: auto;
            }
        }

        .mark {
            width: 18px;
            height: 18px;
            margin-right: 4px;
            vertical-align: middle;
        }

        .num {
            width: 76px;
            height: 24px;
            font-size: 14px;
            border-radius: 4px;
            text-align: center;
            line-height: 24px;
            background-color: rgba(0, 0, 0, 0.4);
            .cur {
                color: #ea595b;
            }
        }
    }
}
.empty {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .img {
        width: 290px;
        height: 200px;
    }
    .txt {
        font-size: 14px;
        color: #9ea3b7;
        padding-top: 24px;
    }
}
</style>
