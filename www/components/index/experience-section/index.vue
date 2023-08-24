<script lang="jsx">
import { mapActions } from 'vuex';
import dayjs from 'dayjs';
import StatusView from './components/status-view/index.vue';
import '@/api/mcp/api..query-index-trial-list.js';
export default {
    name: 'ExperienceSection',
    components: {
        StatusView,
    },
    data() {
        return {
            projectList: [],
            showProjectList: [], // 显示项目列表
            courseList: [],
            timerIntance: null, // 创建时间句柄
            // 0：加载中，1：加载成功，2：加载成功无数据，3：接口报错
            pageStatus: 0, // 加载状态
            moreStatus: false,
        };
    },
    fetch() {
        this.pageStatus = 0;
        return this.init();
    },
    destroyed() {
        this.timerIntance && this.timerIntance.doStop();
    },
    mounted() {
        this.timerIntance = this.$countDown.createIntance();
        this.timerIntance.doStart();
        // this.init();
    },
    methods: {
        ...mapActions('common/recommend-project', {
            getRecommendProjectList: 'getProjectList',
        }),
        init() {
            return this.getRecommendProjectList().then((res) => {
                this.projectList = res;
                this.showProjectList = this.projectList.slice(0, 5);
                return this.getData().then(() => {
                    this.isLoading = false;
                });
            });
        },
        getData() {
            let ids = [];
            this.projectList.forEach((r) => {
                ids.push(r.projectId);
            });
            let params = {
                url: 'mcp/query-index-trial-list',
                params: {
                    // projectIds: ids.toString(),
                    projectIds: '',
                    findCount: 6,
                    showClient: 'W',
                },
                isCustom: false,
            };
            return this.httpClient(params)
                .then((list) => {
                    if (Array.isArray(list) && list.length > 0) {
                        this.pageStatus = 1;
                    } else {
                        list = [];
                        this.pageStatus = 2;
                    }
                    list = list.slice(0, 6);
                    this.courseList = list.map((r) => {
                        r.timeStr = '';
                        return r;
                    });
                    this.$nextTick(() => {
                        // 推荐项目内容宽度大于660，'更多'显示背景色
                        const width = this.$refs.projectListRef?.offsetWidth;
                        if (width > 660) {
                            this.moreStatus = true;
                        }
                    });
                })
                .catch((err) => {
                    console.log(err, '000');
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
        /**
         * 推荐模块埋点
         */
        trackData(item) {
            const track = {
                module_name: '体验课', // 模块名称
                course_name: item.goodsName, // 资源名称
                project_id: item.projectId, //项目ID
            };
            this.$yiguan.track('youlu_click_home_page_recommendation_module', track);
        },
        /**
         * 推荐项目埋点
         */
        trackProject(item) {
            const track = {
                recommendation_location: '体验课', // 推荐位置
                project_id: item.projectId, //项目ID
            };
            this.$yiguan.track('youlu_click_home_page_recommendation_project', track);
        },
    },
    render() {
        // 判断时间是否开始
        const checkActiveStart = (time, currentTime) => {
            let timeUnis = dayjs(time).valueOf();
            if (currentTime < timeUnis) {
                // 未开始
                return false;
            }
            // 已开始
            return true;
        };
        // 判断时间是否结束
        const checkActiveEnd = (time, currentTime) => {
            let timeUnis = dayjs(time).valueOf();
            if (currentTime < timeUnis) {
                // 未结束
                return false;
            }
            // 已结束
            return true;
        };
        const priceNum = (rs) => {
            let num = 0;

            if (rs.coursePromotionType === 'N') {
                num = rs.coursePrice;
            } else if (rs.coursePromotionType === 'S') {
                // 特价
                num = rs.coursePromotionPrice;
            } else {
                const check1 = checkActiveStart(rs.coursePromotionStartTime, rs.currentTime);
                const check2 = checkActiveEnd(rs.coursePromotionEndTime, rs.currentTime);
                if (rs.coursePromotionType === 'F') {
                    // 限时免费 限时特价
                    if (check1 === true && check2 === false) {
                        if (check2 === false && !rs.isEndReady) {
                            // 活动还没有结束
                            this.timerIntance &&
                                this.timerIntance.addHandle({
                                    currentTime: rs.currentTime * 1,
                                    endTime: dayjs(rs.coursePromotionEndTime).valueOf() * 1,
                                    onpulse: (obj) => {
                                        let dayStr = '';
                                        if (obj.day > 0) {
                                            dayStr = `${obj.day}天${obj.hour}:${obj.minutes}:${obj.seconds}`;
                                        } else {
                                            dayStr = `${obj.hour}:${obj.minutes}:${obj.seconds}`;
                                        }
                                        this.$set(rs, 'timeStr', dayStr);
                                    },
                                    onstop: () => {
                                        this.$set(rs, 'timeStr', null);
                                        rs.currentTime = dayjs(rs.coursePromotionEndTime).valueOf() * 1;
                                        this.$forceUpdate();
                                    },
                                });
                            this.$set(rs, 'isEndReady', true);
                        }
                        num = 0;
                    } else {
                        if (check1 === false && !rs.isStartReady) {
                            // 还没有开始
                            this.timerIntance &&
                                this.timerIntance.addHandle({
                                    currentTime: rs.currentTime * 1,
                                    endTime: dayjs(rs.coursePromotionStartTime).valueOf() * 1,
                                    onpulse: (obj) => {
                                        // console.log(obj);
                                    },
                                    onstop: () => {
                                        rs.currentTime = dayjs(rs.coursePromotionStartTime).valueOf() * 1;
                                        this.$forceUpdate();
                                    },
                                });
                            this.$set(rs, 'isStartReady', true);
                        }
                        num = rs.coursePrice;
                    }
                } else if (rs.coursePromotionType === 'L') {
                    if (check1 === true && check2 === false) {
                        if (check2 === false && !rs.isEndReady) {
                            // 活动还没有结束
                            this.timerIntance &&
                                this.timerIntance.addHandle({
                                    currentTime: rs.currentTime * 1,
                                    endTime: dayjs(rs.coursePromotionEndTime).valueOf() * 1,
                                    onpulse: (obj) => {
                                        // console.log(obj, '001');
                                        let dayStr = '';
                                        if (obj.day > 0) {
                                            dayStr = `${obj.day}天${obj.hour}:${obj.minutes}:${obj.seconds}`;
                                        } else {
                                            dayStr = `${obj.hour}:${obj.minutes}:${obj.seconds}`;
                                        }
                                        this.$set(rs, 'timeStr', dayStr);
                                    },
                                    onstop: () => {
                                        rs.currentTime = dayjs(rs.coursePromotionEndTime).valueOf() * 1;
                                        this.$set(rs, 'timeStr', null);
                                        this.$forceUpdate();
                                    },
                                });
                            this.$set(rs, 'isEndReady', true);
                        }
                        num = rs.coursePromotionPrice;
                    } else {
                        if (check1 === false && !rs.isStartReady) {
                            // 还没有开始
                            this.timerIntance &&
                                this.timerIntance.addHandle({
                                    currentTime: rs.currentTime * 1,
                                    endTime: dayjs(rs.coursePromotionStartTime).valueOf() * 1,
                                    onpulse: (obj) => {
                                        // console.log(obj);
                                    },
                                    onstop: () => {
                                        rs.currentTime = dayjs(rs.coursePromotionStartTime).valueOf() * 1;
                                        this.$forceUpdate();
                                    },
                                });
                            this.$set(rs, 'isStartReady', true);
                        }
                        num = rs.coursePrice;
                    }
                }
            }

            num = Number(num);
            if (isNaN(num)) {
                num = 0;
            }
            return ((num / 100).toFixed(2) + '').split('.')[0];
        };
        const priceFloat = (rs) => {
            let num = 0;

            if (rs.coursePromotionType === 'N') {
                num = rs.coursePrice;
            } else if (rs.coursePromotionType === 'S') {
                // 特价
                num = rs.coursePromotionPrice;
            } else {
                const check1 = checkActiveStart(rs.coursePromotionStartTime, rs.currentTime);
                const check2 = checkActiveEnd(rs.coursePromotionEndTime, rs.currentTime);
                if (rs.coursePromotionType === 'F') {
                    // 限时免费 限时特价
                    if (check1 === true && check2 === false) {
                        num = 0;
                    } else {
                        num = rs.coursePrice;
                    }
                } else if (rs.coursePromotionType === 'L') {
                    if (check1 === true && check2 === false) {
                        num = rs.coursePromotionPrice;
                    } else {
                        num = rs.coursePrice;
                    }
                }
            }
            num = Number(num);
            if (isNaN(num)) {
                num = 0;
            }
            if (num % 100 === 0) {
                return '';
            } else {
                let fNum = ((num / 100).toFixed(2) + '').split('.')[1];
                let arr = fNum.split('');
                if (arr[1] === '0') {
                    return '.' + arr[0];
                } else {
                    return '.' + arr.join('');
                }
            }
        };
        // 判断是否显示标签
        const checkShowTag = (rs) => {
            if (rs.coursePromotionType === 'N') {
                return { show: false };
            }
            const check1 = checkActiveStart(rs.coursePromotionStartTime, rs.currentTime);
            const check2 = checkActiveEnd(rs.coursePromotionEndTime, rs.currentTime);
            const map = {
                F: '限时免费',
                L: '限时特价',
                S: '特价',
            };
            const ret = {};
            if ((check1 === true && check2 === false) || rs.coursePromotionType === 'S') {
                ret.show = true;
                ret.txt = map[rs.coursePromotionType];
            } else {
                ret.show = false;
            }

            return ret;
        };
        const item = (rs) => {
            let obj = checkShowTag(rs);
            let md = '';
            if (Array.isArray(rs.courseBright)) {
                rs.courseBright.forEach((r) => {
                    if (r.type === '3') {
                        md = r.content;
                    }
                });
            }
            return (
                <div
                    class="item"
                    onclick={() => {
                        this.trackData(rs);
                    }}
                >
                    <a target="_blank" class="wrap" href={`/trial-course/detail/${rs.goodsId}`}>
                        <div class="img-wrap">
                            <image-view src={rs.coursePicPath} class="img" />
                            {rs.timeStr && (
                                <div class="time-str">
                                    距活动结束<span class="time">{rs.timeStr}</span>
                                </div>
                            )}
                        </div>
                        <div class="bottom">
                            <div class="name">{rs.goodsName}</div>
                            {md && (
                                <div class="tip-parent">
                                    <div class="tip">{md}</div>
                                </div>
                            )}
                            <div class="price-wrap">
                                <span class="symbol">&#65509;</span>
                                <span class="num">{priceNum(rs)}</span>
                                <span class="float">{priceFloat(rs)}</span>
                                {obj.show && <div class="tag">{obj.txt}</div>}
                            </div>
                        </div>
                    </a>
                </div>
            );
        };
        return (
            <div class="experience-wrap">
                <div class="title">
                    <div class="left">
                        <img class="experience-logo" src={require('./asset/images/courseLogo.png')} />
                        <span class="name">体验课</span>
                        <div class="project-list" ref="projectListRef">
                            {this.showProjectList.map((r, index) => {
                                return (
                                    <div
                                        class="block"
                                        onclick={() => {
                                            this.trackProject(r);
                                        }}
                                    >
                                        <a href={`/trial-course/${r.collegeCode}/${r.projectSeocode}`} target="_blank" class="project-name ">
                                            {r.projectName}
                                        </a>
                                        {index !== this.showProjectList.length - 1 && <span class="split"></span>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <nuxt-link to="/trial-course" target="_blank" class={['more', this.moreStatus ? 'more-bgc' : '']}>
                        <div class="more-text">
                            <span>更多</span>
                            <img src={require('./asset/images/more.png')} />
                        </div>
                    </nuxt-link>
                </div>
                <div class="list" v-loading={this.pageStatus === 0}>
                    {this.pageStatus === 2 && <StatusView type="empty" txt="暂无课程，敬请期待" />}
                    {this.pageStatus === 3 && <StatusView type="error" txt="内容加载失败，请刷新页面" onInit={this.init} />}
                    {this.pageStatus === 1 &&
                        this.courseList.map((r) => {
                            return item(r);
                        })}
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.item {
    width: 267px;
    height: 298px;
    display: inline-block;
    background: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    margin: 0 20px 20px 0;
    vertical-align: top;
    padding: 14px 14px 18px;
    box-sizing: border-box;

    // transition: all 10s;
    &:nth-child(n + 3) {
        margin-bottom: 0;
    }
    .wrap {
        display: flex;
        flex-direction: column;
        overflow: auto;
        height: 100%;
    }

    &:hover {
        // transform: translate3d(0, -5px, 0);
        box-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);
        .img-wrap {
            border-radius: 6px;
            .img {
                transform: translateZ(0) scale3d(1.08, 1.08, 1.08);
            }
        }
    }

    .img-wrap {
        position: relative;
        display: block;
        width: 100%;
        height: 148px;
        flex: none;
        overflow: hidden;
        border-radius: 6px;
        margin-bottom: 18px;

        .img {
            width: 100%;
            height: 100%;
            transition: all 0.3s;
            transform: translateZ(0);
        }

        .time-str {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 28px;
            line-height: 28px;
            font-size: 12px;
            padding: 0 10px;
            color: #ffffff;
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.7);
            border-radius: 21px 0px 0px 21px;

            .time {
                display: inline-block;
                margin-left: 6px;
            }
        }
    }

    .bottom {
        padding: 0 4px;
        flex: auto;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        .name {
            display: block;
            margin-bottom: 16px;
            font-weight: 700;
            text-align: justify;
            color: #3a3d4b;
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:hover {
                color: #ff2e30;
            }
        }
        .tip-parent {
            flex: auto;
            overflow: hidden;
        }
        .tip {
            width: 100%;
            height: 32px;
            line-height: 32px;
            padding: 0 12px;
            box-sizing: border-box;
            color: #77798d;
            font-size: 12px;
            background: #fafafa;
            border-radius: 4px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .price-wrap {
            // padding-top: 24px;
            font-weight: bold;
            color: #ff2e30;
            .float,
            .symbol {
                font-size: 14px;
                font-weight: bold;
            }

            .num {
                font-size: 18px;
                font-weight: bold;
            }

            .tag {
                height: 20px;
                font-size: 12px;
                line-height: 20px;
                padding: 0 6px;
                vertical-align: top;
                margin-top: 2px;
                margin-left: 6px;
                color: #a96b00;
                box-sizing: border-box;
                display: inline-block;
                background-image: url(./asset/images/tag.png);
                background-size: 100% 100%;
            }
        }
    }
}
.list {
    flex: 1;
    padding-top: 10px;
    margin-right: -20px;
    overflow: hidden;
}
.experience-wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
        height: 62px;
        width: 840px;
        overflow: hidden;
        position: relative;
        .experience-logo {
            width: 38px;
            height: 38px;
            margin-right: 10px;
            flex: none;
        }

        .left {
            display: flex;
            .name {
                font-size: 24px;
                text-align: left;
                color: #3a3d4b;
                line-height: 38px;
                font-weight: 700;
                flex: none;
            }

            .project-list {
                display: flex;
                align-items: center;
                white-space: nowrap;
                padding-left: 40px;

                .block {
                    display: flex;
                    align-items: center;
                }

                .project-name {
                    color: #53586c;
                    font-size: 14px;
                    cursor: pointer;

                    &:hover {
                        color: #ff2e30;
                    }

                    &.this {
                        color: #ff2e30;
                    }
                }
                .split {
                    margin: 0 16px;
                    width: 1px;
                    height: 10px;
                    background-color: #d5d9d9;
                }
            }
        }
        .more {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 38px;
            width: 114px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            color: #77798d;
            &:hover {
                color: #ff2e30;
            }
            .more-text {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                cursor: pointer;
                font-size: 14px;
                img {
                    margin-left: 6px;
                    width: 10px;
                    height: 11px;
                    transform: translateY(2px);
                }
            }
        }
        .more-bgc {
            background: linear-gradient(84deg, rgba(247, 248, 252, 0) 4%, #f7f8fc 40%);
        }
    }
}
</style>
