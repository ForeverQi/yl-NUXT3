<script lang="jsx">
import '@/api/api..query-file-img-list.js';
import { mapState, mapMutations } from 'vuex';
import CourseHandoutDialog from '@/www/components/learningCenter/htvideo/course-handout-dialog/index.vue';
export default {
    name: 'CourseMinHandout',
    props: {
        coursewareHandoutPath: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            list: [],
            curDocImg: 1,

            pageStatus: 0, // 0：初始状态，1：加载成功，2：加载成功无数据，3：接口报错
        };
    },
    computed: {
        ...mapState('course/info', {
            moduleName: 'moduleName',
            courseName: 'courseName',
            isPlaying: 'isPlaying',
        }),
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
        ...mapMutations('course/info', {
            doVideoPause: 'doVideoPause',
            doVideoResume: 'doVideoResume',
        }),
        jyScroll() {
            let scrollTopH = this.$refs.dyBox.scrollTop;
            let scrollDomHeight = 0; //图片向上滚动高度
            let list = this.$refs.dyBox.children;

            for (let i = 0, len = list.length; i < len; i++) {
                let item = list[i];
                let imgHeight = item.querySelector('img').offsetHeight;
                scrollDomHeight = scrollDomHeight + imgHeight;
                if (scrollTopH == 0) {
                    this.curDocImg = 1;
                }
                if (scrollDomHeight <= scrollTopH) {
                    this.curDocImg = i + 2;
                }
            }
        },
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
        showHandoutDialog() {
            const isPlaying = this.isPlaying;
            console.log(isPlaying, '@@');
            this.doVideoPause();
            this.$baseUI
                .createModel(
                    {
                        modalContent: CourseHandoutDialog,
                    },
                    {
                        coursewareId: this.coursewareId,
                    },
                    {
                        width: '500px',
                        radius: '2px',
                        showClose: false,
                        showHead: false,
                        isShadow: false,
                        padding: '0',
                    }
                )
                .then(() => {
                    if (isPlaying === true) {
                        this.doVideoResume();
                    }
                });
        },
    },
    render() {
        return (
            <div class="min-handout">
                <div class="course-name">
                    {this.moduleName}-{this.courseName}
                </div>
                <div class="title">
                    <div class="name">课堂讲义</div>
                    {this.pageStatus === 1 && (
                        <div class="process">
                            <span class="cur">{this.curDocImg}</span>/<span class="num">{this.list.length}</span>
                        </div>
                    )}
                    <div
                        class="download"
                        onClick={() => {
                            this.showHandoutDialog();
                        }}
                    >
                        下载讲义
                    </div>
                </div>
                <div class="list" ref="dyBox" onScroll={this.jyScroll}>
                    {this.pageStatus === 1 &&
                        this.list.map((r) => {
                            return (
                                <div class="item">
                                    <img src={r.url} class="img" />
                                </div>
                            );
                        })}
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
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.min-handout {
    display: flex;
    flex-direction: column;
    height: 100%;
    .course-name {
        flex-shrink: 0;
        font-size: 15px;
        text-align: left;
        color: #ffffff;
        line-height: 30px;
        background-color: #202631;
        padding: 12px 24px;
    }

    .title {
        flex-shrink: 0;
        padding: 13px 18px 9px 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .name {
            height: 35px;
            display: flex;
            align-items: center;
            font-size: 16px;
            font-weight: 700;
            text-align: left;
            color: #ffffff;
            &:before {
                content: '';
                display: block;
                width: 4px;
                height: 14px;
                margin-right: 6px;
                background: #ff2e30;
                border-radius: 2px;
            }
        }

        .process {
            width: 64px;
            height: 22px;
            font-size: 14px;
            color: #dddddd;
            background-color: rgba(216, 216, 216, 0.1);
            border-radius: 11px;
            display: flex;
            justify-content: center;
            align-items: center;

            .cur {
                color: #ff4444;
            }
            .num {
                color: #dddddd;
            }
        }

        .download {
            height: 35px;
            font-size: 14px;
            font-weight: 500;
            text-align: left;
            color: #ffffff;
            line-height: 35px;
            background-image: url(./asset/images/d.png);
            background-size: 18px 18px;
            background-repeat: no-repeat;
            background-position: left center;
            padding-left: 20px;
            cursor: pointer;
        }
    }

    .list {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        overflow-y: auto;
        height: 100%;

        .empty {
            padding-top: 120px;
            text-align: center;

            .img {
                width: 220px;
                height: 150px;
            }

            .txt {
                display: block;
                color: #999999;
                font-size: 14px;
            }
        }
        .item {
            // width: 336px;
            // width: 100%;
            margin: 0 20px;
            // height: 189px;
            margin-top: 14px;
            border: 2px solid #4b505a;

            .img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
