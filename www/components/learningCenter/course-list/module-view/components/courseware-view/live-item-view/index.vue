<script lang="jsx">
import { mapState } from 'vuex';
import puralPlanner from '../mixin/puralPlanner.js'; // 第三方课程跳转处理
import LivePopup from './components/livePopup/index.vue';
export default {
    name: 'LiveItemView',
    mixins: [puralPlanner],
    props: {
        itemData: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            showLiveCourse: false,
            statusMap: {
                Y: '已结束',
                S: '进行中',
                N: '未开始',
            },
        };
    },
    computed: {
        ...mapState('class-info/info', {
            classId: 'classId', // 班级ID
            ctapId: 'ctapId', // 期次
        }),
    },
    methods: {
        clseLivePoup() {
            this.showLiveCourse = false;
        },
        toLiveDetail() {
            if (this.itemData.lockedStatus === 'Y') {
                this.$Message.warning(this.itemData.lockedTip);
                return;
            }
            // if (this.toRuralPlanner() !== false) {
            //     // 返回值不为false时说明是第三方课程
            //     return;
            // }
            let params = {
                classId: this.itemData.classId,
                coursewareId: this.itemData.coursewareId,
                playrdNeed: 'Y',
            };
            // 直播判断
            if (this.itemData.coursewareBeginstate == 'Y' && this.itemData.coursewareOnlineurl) {
                //	[枚举]Y:已结束S:进行中N:未开始；针对直播和面授
                if (this.itemData.coursewareVideoprividers == 'LV') {
                    this.$PageUtil.openNewPage(
                        `/pro-course-learn/${this.classId}/${this.itemData.coursewareId}?source=allTask&ctapId=${this.ctapId}&subjectId=${this.subjectId}`
                    );
                }
                // 广电圆点视频
                else if (this.itemData.coursewareVideoprividers == 'LC') {
                    params.coursewareOnlineurl = this.itemData.coursewareOnlineurl;
                    this.coursewareVideoAuth(params);
                }
                //保利威;
                else if (this.itemData.coursewareVideoprividers == 'LP') {
                    this.$PageUtil.openNewPage(
                        `/pro-course-learn/${this.classId}/${this.itemData.coursewareId}?source=allTask&ctapId=${this.ctapId}&subjectId=${this.subjectId}`
                    );
                }
            } else if (this.itemData.coursewareBeginstate == 'Y' && !this.itemData.coursewareOnlineurl) {
                if (this.itemData.coursewareVideoprividers == 'LC') {
                    params.coursewareOnlineurl = this.itemData.coursewareLiveurl;
                    this.coursewareVideoAuth(params);
                }
            } else {
                this.showLiveCourse = true;
            }
        },
        showLiveTime(t) {
            let time = t.split(' ')[1];
            let index = time.lastIndexOf(':');
            return time.substring(0, index);
        },
        coursewareVideoAuth(params) {
            // 视频鉴权
            let data = {
                url: 'cc/cc-courseware-video-auth',
                params,
                isCustom: false,
            };
            this.httpClient(data).then((res) => {
                this.$PageUtil.openNewPage(res.videoAddress);
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
            <div class="wrap" onClick={this.toLiveDetail}>
                {this.showLiveCourse && <LivePopup curTask={this.itemData} onCloseTipPoup={this.clseLivePoup} />}
                <div class="content">
                    <div class="title">
                        <div class="name">
                            <img src={require('./asset/images/live.png')} class="img" />
                            {this.itemData.coursewareName}
                            <img style={{ display: this.itemData.lockedStatus === 'Y' ? '' : 'none' }} src={require('./asset/images/lock.png')} class="lock" />
                        </div>
                    </div>
                    <div class="info">
                        {this.itemData.coursewareBeginState == 'S' && <div class="start">直播中</div>}
                        {this.itemData.coursewareBeginState == 'N' && <div class="no-start">未开始</div>}
                        {this.itemData.coursewareBeginState == 'Y' && <div class="end-live">已结束</div>}
                        {this.itemData.coursewareBeginState == 'H' && <div></div>}
                        <div class="live-time">
                            {this.showLiveTime(this.itemData.coursewareStartTime)}-{this.showLiveTime(this.itemData.coursewareEndTime)}
                        </div>
                    </div>
                </div>
                <div class="btn-wrap">
                    <div class="btn-group">
                        {this.itemData.remindStatusname == '今日直播' && <img src={require('./asset/images/tlive.png')} class="tlive" />}
                        {this.itemData.remindStatusname == '直播暂未开始' && <img src={require('./asset/images/slive.png')} class="slive" />}
                        {this.itemData.remindStatusname == '直播回放' && <img src={require('./asset/images/flive.png')} class="flive" />}
                    </div>
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 26px;
    background: #f4f5f7;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background: #fff5f5;
    }
    .content {
        .title {
            display: flex;
            .name {
                display: flex;
                align-items: center;
                width: 334px;
                font-size: 14px;
                color: #53586c;
                line-height: 18px;

                .img {
                    width: 16px;
                    height: 16px;
                    margin-right: 6px;
                }
                .lock {
                    width: 24px;
                    height: 24px;
                    vertical-align: bottom;
                    display: inline-block;
                }
                .tags {
                    width: 32px;
                    height: 16px;
                    background: #2bc049;
                    border-radius: 2px;
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                    line-height: 16px;
                    margin-left: 8px;
                    flex-shrink: 0;
                }
            }
            .star {
                padding-left: 30px;
            }

            .link-wrap {
                display: flex;

                .link {
                    margin-left: 24px;
                    color: #8d90aa;
                    font-size: 12px;
                    line-height: 16px;
                }
            }
        }
    }
    .info {
        padding-top: 9px;
        display: flex;
        align-items: center;
        .no-start {
            display: inline-block;
            width: 50px;
            height: 20px;
            background: #ffebd9;
            border-radius: 10px;
            color: #fb8715;
            font-size: 12px;
            text-align: center;
            line-height: 20px;
        }

        .end-live {
            display: inline-block;
            width: 50px;
            height: 20px;
            background: #ebedf0;
            border: 1px solid #d9dae2;
            border-radius: 11px;
            color: #53586c;
            font-size: 12px;
            text-align: center;
            line-height: 20px;
        }

        .status {
            display: inline-block;
            font-size: 12px;
            color: #8d90aa;
        }
        .start {
            display: inline-block;
            width: 50px;
            height: 20px;
            border: 1px solid #f8323c;
            border-radius: 11px;
            font-size: 12px;
            color: #f8323c;
            text-align: center;
            line-height: 20px;
        }

        .live-time {
            margin-left: 10px;
            margin-right: 10px;
            display: inline-block;
            font-size: 12px;
            color: #8d90aa;
        }
    }

    .btn-wrap {
        text-align: right;
        .btn-group {
            .tlive,
            .flive {
                width: 88px;
                height: 26px;
            }

            .slive {
                width: 100px;
                height: 26px;
            }
        }
    }
}
</style>
