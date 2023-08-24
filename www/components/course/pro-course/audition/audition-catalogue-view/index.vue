<script lang="jsx">
import { mapState, mapMutations } from 'vuex';
import AuditionStationMapView from '../audition-station-map-view/index.vue';
import '@/api/cc/api..query-course-catalog-courseware-tree.js';
export default {
    name: 'AuditionCatalogueView',
    props: {
        item: {
            type: Object,
            /**
             * @returns {object} 默认值
             */
            default() {
                return {};
            },
        },
    },
    /**
     * @returns {object} 默认数据处理
     */
    data() {
        return {
            list: [],
            playList: [],
            playIndex: 0,
            curCourseInfo: null,
        };
    },
    computed: {
        ...mapState('audition/info', {
            classtypeId: 'classtypeId',
            selectModuleId: 'selectModuleId',
            isLoading: 'isLoading',
            isLogin: 'isLogin',
            courseName: 'courseName',
            prev: 'prev', // 上一节
            next: 'next', // 下一节
            playModuleId: 'playModuleId',
            isPlaying: 'isPlaying',
            projectId: 'projectId',
        }),
    },
    watch: {
        /**
         *
         * @param {number} val 变更后的数据
         * @param {number} oldVal 变更前的数据
         */
        prev(val, oldVal) {
            if (val !== oldVal && this.playModuleId === this.item.modulId) {
                this.doPrev();
            }
        },
        /**
         *
         * @param {number} val 变更后的数据
         * @param {number} oldVal 变更前的数据
         */
        next(val, oldVal) {
            if (val !== oldVal && this.playModuleId === this.item.modulId) {
                this.doNext();
            }
        },
        playModuleId: {
            /**
             *
             * @param {string} val 模块ID
             */
            handler(val) {
                if (val && this.playModuleId !== this.item.modulId) {
                    this.clearExtend();
                }
            },
            immediate: true,
        },
        /**
         *
         * @param {string} val 当前选择的模块id
         */
        selectModuleId(val) {
            if (val) {
                this.init();
            }
        },
    },
    /**
     *
     */
    mounted() {
        this.init();
    },
    methods: {
        ...mapMutations('audition/info', {
            setCourseInfo: 'setCourseInfo',
        }),
        /**
         * 初始化方法
         */
        init() {
            this.getData().then((res) => {
                let list = res.courseList;
                if (!Array.isArray(list)) {
                    list = [];
                }
                this.courseDataHandle(list);
            });
        },
        /**
         * 获取数据方法
         *
         * @returns {object} promise接口请求
         */
        getData() {
            return this.$callApi('cc/query-course-catalog-courseware-tree', {
                // 班型标识
                classtypeId: this.classtypeId,
                // 模块标识
                modulId: this.item.modulId,
            })
                .then((APIResponse) => {
                    let res = APIResponse.getData();

                    // this.list = res.courseList;
                    return res;
                })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                });
        },
        /**
         *
         * @param {object} info 课件对象
         */
        setCoursewareInfo(info) {
            if (!info) {
                return;
            }
            this.playList.forEach((item, index) => {
                if (item.coursewareId === info.coursewareId) {
                    this.playIndex = index;
                }
            });
            this.setCourseInfo({
                coursewareId: info.coursewareId,
                coursewareName: info.coursewareName,
                coursewareOnlineurl: info.coursewareOnlineurl,
                coursewareType: info.coursewareType,
                isLoading: false,
            });
            this.$nextTick(() => {
                /**
                 *
                 * @param {object} e 查询对象
                 * @returns {number} 元素距离顶部的高度
                 */
                // function getTop(e) {
                //     var offset = e.offsetTop;
                //     if (e.offsetParent != null) offset += getTop(e.offsetParent);
                //     return offset;
                // }
                setTimeout(() => {
                    const oCoursewrap = document.querySelector('.coursewrap-item.this');
                    const iH = oCoursewrap.offsetTop + oCoursewrap.parentNode.offsetTop + oCoursewrap.parentNode.parentNode.parentNode.offsetTop;
                    const oWrap = this.$refs.catalogueView;
                    // const iScrollHeight = oWrap.offsetHeight - getTop(oCoursewrap) + getTop(oWrap);
                    oWrap.scrollTo({
                        top: iH,
                        behavior: 'smooth',
                    });
                }, 10);
            });
        },
        /**
         *
         */
        doNext() {
            // 下一个视频
            if (this.playIndex === this.playList.length - 1) {
                return;
            }
            const tmp = this.playList[this.playIndex + 1];

            this.checkStatus(null, tmp).then((check) => {
                if (check === true) {
                    this.$set(tmp, 'isExtend', !tmp.isExtend);
                    this.setCoursewareInfo(tmp);
                    this.positionCourseware(tmp);
                }
            });
        },
        /**
         *
         */
        doPrev() {
            // 上一个视频
            if (this.playIndex === 0) {
                return;
            }
            const tmp = this.playList[this.playIndex - 1];
            this.checkStatus(null, tmp).then((check) => {
                if (check === true) {
                    this.$set(tmp, 'isExtend', !tmp.isExtend);
                    this.setCoursewareInfo(tmp);
                    this.positionCourseware(tmp);
                }
            });
        },
        /**
         *
         * @param {object} tmp 当前播放的课件
         */
        positionCourseware(tmp) {
            // 取消当前的默认值
            this.list.forEach((item) => {
                let check1 = false;
                item.catalogList.forEach((item2) => {
                    let check2 = false;
                    item2.coursewareList.forEach((item3) => {
                        if (item3.coursewareId === tmp.coursewareId) {
                            this.$set(item3, 'isExtend', true);
                            check2 = true;
                        } else {
                            this.$set(item3, 'isExtend', false);
                        }
                    });

                    if (check2 === true) {
                        check1 = true;
                        this.$set(item2, 'isExtend', true);
                    } else {
                        this.$set(item2, 'isExtend', false);
                    }
                });
                if (check1 === true) {
                    this.$set(item, 'isExtend', true);
                } else {
                    this.$set(item, 'isExtend', false);
                }
            });
        },
        /**
         *
         */
        clearExtend() {
            this.list.forEach((item) => {
                item.catalogList.forEach((item2) => {
                    item2.coursewareList.forEach((item3) => {
                        this.$set(item3, 'isExtend', false);
                    });

                    this.$set(item2, 'isExtend', false);
                });
                this.$set(item, 'isExtend', false);
            });
        },
        /**
         * 课程数据处理
         *
         * @param {Array} orgCourseList 课程列表
         */
        courseDataHandle(orgCourseList) {
            let tmpCourseList = [];
            if (orgCourseList.length === 0) {
                this.setCourseInfo({
                    isLoading: false,
                    ifShowPlayer: true, // 没有课件的时候直接显示播放器
                });
            }
            let queryCoursewareIdHave = false;
            orgCourseList.forEach((item) => {
                let catalogList = [];
                item.catalogList.forEach((item2) => {
                    let coursewareList = item2.coursewareList.filter((item3) => {
                        let check = item3.ctwAuditionstatus === 'Y';
                        if (item3.coursewareId === this.$route.query.coursewareId) {
                            queryCoursewareIdHave = true;
                        }
                        return check;
                    });

                    if (coursewareList.length > 0) {
                        catalogList.push({
                            catalogId: item2.catalogId,
                            catalogName: item2.catalogName,
                            coursewareList,
                        });
                    }
                });

                if (catalogList.length > 0) {
                    tmpCourseList.push({
                        courseId: item.courseId,
                        courseName: item.courseName,
                        courseUpdateTimeDesc: item.courseUpdateTimeDesc,
                        catalogList,
                    });
                }
            });
            orgCourseList = tmpCourseList;
            let tmpItem = null;
            this.list = orgCourseList.map((item1, index1) => {
                let check0 = false;
                item1.catalogList = item1.catalogList.map((item2, index2) => {
                    let check1 = false;
                    item2.coursewareList = item2.coursewareList.map((item3, index3) => {
                        if (index1 === 0 && index2 === 0 && index3 === 0) {
                            tmpItem = item3;
                        }
                        if (queryCoursewareIdHave && item3.coursewareId === this.$route.query.coursewareId) {
                            check1 = true;
                            tmpItem = item3;
                        }
                        if (queryCoursewareIdHave && item3.coursewareId === this.$route.query.coursewareId) {
                            check0 = true;
                            return {
                                ...item3,
                                isExtend: true,
                            };
                        } else {
                            return {
                                ...item3,
                                isExtend:
                                    queryCoursewareIdHave === false &&
                                    index1 === 0 &&
                                    index2 === 0 &&
                                    index3 === 0 &&
                                    (this.item.modulId === this.playModuleId || (!this.playModuleId && this.item.modulId === this.selectModuleId)),
                            };
                        }
                    });
                    if (check1) {
                        return {
                            ...item2,
                            isExtend: true,
                        };
                    } else {
                        return {
                            ...item2,
                            isExtend: queryCoursewareIdHave === false && index1 === 0 && index2 === 0,
                        };
                    }
                });
                if (check0 === true) {
                    return {
                        ...item1,
                        isExtend: true,
                    };
                } else {
                    return {
                        ...item1,
                        isExtend: index1 === 0,
                    };
                }
            });

            let playList = [];
            this.list.forEach((item) => {
                item.catalogList.forEach((item2) => {
                    item2.coursewareList.filter((item3) => {
                        let check = item3.ctwAuditionstatus === 'Y';
                        if (check === true) {
                            playList.push(item3);
                        }
                        return check;
                    });
                });
            });
            this.playList = playList;
            if (playList.length > 0) {
                let fistCourseId = playList[0].coursewareId;
                let lastCourseId = playList[playList.length - 1].coursewareId;

                this.setCourseInfo({
                    fistCourseId,
                    lastCourseId,
                });
            }

            if (this.item.modulId === this.selectModuleId && !this.playModuleId) {
                this.setCourseInfo({
                    playModuleId: this.item.modulId,
                });
                this.setCoursewareInfo(tmpItem);
            }
        },
        /**
         *
         * @param {object} curCourseInfo 当前播放课程
         * @param {object} item3 当前播放课程
         */
        doLogin(curCourseInfo, item3) {
            this.$Promotion.setCLueInfo({
                url: location.href,
                pageName: document.title,
                projectId: this.projectId,
                originCode: 'xitongke',
                clueWaycode: 'yindao',
            });
            const regExtension = this.$Promotion.getClueExtensionInfo({
                clueWaycode: 'yindao',
                originCode: 'xitongke',
                pageName: this.courseName,
            });

            regExtension.clueFormdata = [
                {
                    key: 'clueRemarks',
                    value: '进入官网',
                    desc: '该用户通过【系统课试听】',
                },
            ];
            this.$ylPlugin
                .showLoginModal(
                    { clue: { regExtension, clueExtension: regExtension } },
                    { pageName: document.title, entranceResource: '系统课-试听目录', courseType: '系统课', pageType: '试听专区页' }
                )
                .then((res) => {
                    this.setCourseInfo({
                        isLogin: true,
                        userName: res.userDetail.userYoulunum,
                        userAvatar: res.userDetail.userAvatar,
                    });
                    this.trackData(true);
                    this.checkStatus(curCourseInfo, item3);
                });
        },
        /**
         *
         * @param {boolean}isLoginIn 是否登录
         */
        trackData(isLoginIn) {
            const track = {
                course_name: this.courseName, // 课程名称
                project_id: this.projectId, // 项目名称
                page_type: '试听专区', // 页面类型
                page_name: document.title, // 页面名称
                channel_name: '-', // 频道页名称
                entrance_resource: '试听专区-试听课件', // 点击位置
            };
            this.$yiguan.track('youlu_click_to_listen', track);
        },
        /**
         *
         * @param {object} curCourseInfo 当前播放课程
         * @param {object} item3 当前播放课程
         */
        changeCourse(curCourseInfo, item3) {
            if (curCourseInfo) {
                this.$set(curCourseInfo, 'isExtend', !curCourseInfo.isExtend);
            }
            this.$set(item3, 'isExtend', !item3.isExtend);
            this.setCoursewareInfo(item3);
        },
        /**
         *
         * @param {object} item 当前展开的课程
         */
        openFirst(item) {
            item.catalogList.forEach((item2, index) => {
                if (index === 0) {
                    this.$set(item2, 'isExtend', true);
                }
                let check = item2.coursewareList.some((item3) => {
                    return !!item3.isExtend;
                });

                if (check === true) {
                    this.$set(item2, 'isExtend', true);
                }
            });
        },
        /**
         *
         * @param {object} curCourseInfo 当前播放的课件
         * @param {object} item4 需要切换的课件
         * @returns {object} promise对象
         */
        checkStatus(curCourseInfo, item4) {
            return this.getData().then((list) => {
                let isHave = false;
                let isTry = false;
                list.courseList.forEach((item) => {
                    item.catalogList.forEach((item2) => {
                        item2.coursewareList.forEach((item3, index) => {
                            if (item3.coursewareId === item4.coursewareId) {
                                isHave = true;
                                if (item3.ctwAuditionstatus === 'Y') {
                                    isTry = true;
                                }
                            }
                        });
                    });
                });

                if (isTry === true) {
                    this.setCourseInfo({
                        playModuleId: this.item.modulId,
                        fistCourseId: this.playList[0].coursewareId,
                        lastCourseId: this.playList[this.playList.length - 1].coursewareId,
                    });
                    this.changeCourse(curCourseInfo, item4);
                    window.history.replaceState(null, null, `?moduleId=${this.item.modulId}&coursewareId=${item4.coursewareId}`);
                    // this.$router.replace(`?moduleId=${this.item.modulId}&coursewareId=${item4.coursewareId}`);
                    return true;
                } else if (isHave === true) {
                    this.$baseUI
                        .alert('课件已取消试听！', '提示', { showClose: true })
                        .then(() => {
                            this.init();
                        })
                        .catch(() => {
                            this.init();
                        });
                } else {
                    this.$baseUI
                        .alert('课件已下架！', '提示', { showClose: true })
                        .then(() => {
                            this.init();
                        })
                        .catch(() => {
                            this.init();
                        });
                }

                return false;
            });
        },
    },
    /**
     * @returns {object} vue 虚拟dom
     */
    render() {
        const showTime = (num) => {
            if (isNaN(num)) {
                num = 0;
            }
            num = Number(num);
            let arr = [];
            if (num >= 3600) {
                let _num = Math.floor(num / 3600);
                arr.push(_num > 9 ? _num : `0${_num}`);
                num -= _num * 3600;
            } else {
                arr.push('00');
            }
            if (num >= 60) {
                const _num = Math.floor(num / 60);
                arr.push(_num > 9 ? _num : `0${_num}`);
                num -= _num * 60;
            } else {
                arr.push('00');
            }
            arr.push(num > 9 ? num : `0${num}`);

            return arr.join(':');
        };
        let curCourseInfo = null;
        return (
            <div class="catalogue-view" ref="catalogueView">
                {this.isLoading === true && <AuditionStationMapView type="catalogue-play" />}
                {this.isLoading === false && this.list.length === 0 && <AuditionStationMapView type="no-course" />}
                {this.isLoading === false &&
                    this.list.length > 0 &&
                    this.list.map((item) => {
                        let catalogList = item.catalogList;
                        return (
                            <div class="course-wrap">
                                <div
                                    class="course-name"
                                    onClick={() => {
                                        this.$set(item, 'isExtend', !item.isExtend);
                                        this.openFirst(item);
                                    }}
                                >
                                    {item.courseName}
                                    <div class={['label', item.isExtend === true ? 'up' : 'down']}>{item.isExtend === true ? '收起' : '展开'}</div>
                                </div>
                                {catalogList.length > 0 &&
                                    item.isExtend === true &&
                                    catalogList.map((item2) => {
                                        let coursewareList = item2.coursewareList;
                                        return (
                                            <div class="chapter-wrap">
                                                <div
                                                    class="chapter-name"
                                                    onClick={() => {
                                                        this.$set(item2, 'isExtend', !item2.isExtend);
                                                    }}
                                                >
                                                    {item2.catalogName}
                                                    <div class={['label', item2.isExtend === true ? 'up' : 'down']}>
                                                        {item2.isExtend === true ? '收起' : '展开'}
                                                    </div>
                                                </div>
                                                <div class={['courseware-wrap', item2.isExtend === true ? 'this' : '']}>
                                                    {coursewareList.length > 0 &&
                                                        item2.isExtend === true &&
                                                        coursewareList.map((item3) => {
                                                            if (item3.isExtend === true) {
                                                                curCourseInfo = item3;
                                                                this.curCourseInfo = item3;
                                                            }
                                                            return (
                                                                <div
                                                                    class={[item3.isExtend === true ? 'this' : '', 'coursewrap-item']}
                                                                    onClick={() => {
                                                                        if (this.isLogin === true) {
                                                                            this.setCourseInfo({
                                                                                isPlaying: false,
                                                                            });
                                                                            curCourseInfo = this.curCourseInfo;
                                                                            this.checkStatus(curCourseInfo, item3);
                                                                        } else {
                                                                            this.doLogin(curCourseInfo, item3);
                                                                        }
                                                                    }}
                                                                >
                                                                    <div class="type">
                                                                        {!item3.isExtend && <img src={require('./asset/images/no.png')} class="img" />}
                                                                        {item3.isExtend === true && (
                                                                            <img src={require('./asset/images/noing.png')} class="img" />
                                                                        )}
                                                                    </div>
                                                                    <div class="name">
                                                                        <div class="top">
                                                                            <div class="icon">
                                                                                <img
                                                                                    src={require('./asset/images/video.png')}
                                                                                    class="img"
                                                                                    style={!item3.isExtend ? '' : 'display: none;'}
                                                                                />
                                                                                <img
                                                                                    src={require('./asset/images/play.png')}
                                                                                    class="img"
                                                                                    style={
                                                                                        item3.isExtend === true &&
                                                                                        (this.isLogin === false || this.isPlaying === false)
                                                                                            ? ''
                                                                                            : 'display: none;'
                                                                                    }
                                                                                />
                                                                                <img
                                                                                    src={require('./asset/images/playing.gif')}
                                                                                    style={
                                                                                        item3.isExtend === true &&
                                                                                        this.isLogin === true &&
                                                                                        this.isPlaying === true
                                                                                            ? ''
                                                                                            : 'display: none;'
                                                                                    }
                                                                                    class="img"
                                                                                />
                                                                            </div>
                                                                            {item3.coursewareName}
                                                                        </div>
                                                                        <div class="bottm">
                                                                            <div class="time">{showTime(item3.coursewareDuration)}</div>
                                                                            <div class="mask">试听</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        );
                    })}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.catalogue-view {
    position: relative;
    height: 100%;
    overflow: auto;
    user-select: none;
    .course-wrap {
        position: relative;
        padding-bottom: 8px;

        .course-name {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            text-align: left;
            color: #ffffff;
            line-height: 19px;
            padding: 16px 0;
            padding-right: 12px;
            padding-left: 24px;
            cursor: pointer;

            .label {
                width: 45px;
                height: 19px;
                font-size: 14px;
                text-align: justify;
                color: #dddddd;
                line-height: 19px;
                letter-spacing: 0px;
                margin-left: 23px;
                flex-shrink: 0;
                background-repeat: no-repeat;
                background-size: 16px 16px;
                background-position: right 2px;

                &.up {
                    background-image: url(./asset/images/up.png);
                }
                &.down {
                    background-image: url(./asset/images/down.png);
                }
            }
        }
        .chapter-wrap {
            .chapter-name {
                display: flex;
                justify-content: space-between;
                padding: 20px 6px 20px 12px;
                margin-right: 12px;
                margin-left: 20px;
                font-size: 14px;
                text-align: left;
                color: #ffffff;
                line-height: 16px;
                border-radius: 4px;
                background: rgba(255, 255, 255, 0.06);
                cursor: pointer;
                .label {
                    width: 45px;
                    height: 19px;
                    font-size: 14px;
                    text-align: justify;
                    color: #dddddd;
                    line-height: 19px;
                    letter-spacing: 0px;
                    margin-left: 23px;
                    flex-shrink: 0;
                    background-repeat: no-repeat;
                    background-size: 16px 16px;
                    background-position: right 2px;

                    &.up {
                        background-image: url(./asset/images/up.png);
                    }
                    &.down {
                        background-image: url(./asset/images/down.png);
                    }
                }
            }
            .courseware-wrap {
                position: relative;
                &.this {
                    &:after {
                        content: '';
                        display: block;
                        height: 1px;
                        position: absolute;
                        left: 14px;
                        right: 14px;
                        background-color: #39414b;
                    }
                }

                .coursewrap-item {
                    position: relative;
                    padding-top: 18px;
                    padding-bottom: 13px;
                    padding-right: 12px;
                    padding-left: 24px;
                    display: flex;
                    align-items: flex-start;
                    cursor: pointer;

                    &.this {
                        background-color: #202631;

                        .name {
                            color: #ff2e30;
                            .bottm {
                                .time {
                                    color: #ff2e30;
                                }
                            }
                        }
                    }
                    &::before {
                        content: '';
                        display: block;
                        width: 1px;
                        top: 20px;
                        bottom: -20px;
                        left: 30px;
                        position: absolute;
                        z-index: 1;
                        border-right: 1px dashed #979797;
                    }
                    &:last-child {
                        &::before {
                            display: none;
                        }
                    }

                    .type {
                        width: 16px;
                        height: 16px;
                        flex-shrink: 0;
                        position: relative;
                        z-index: 2;

                        .img {
                            width: 100%;
                            height: 100%;
                            background-color: #202631;
                        }
                    }

                    .name {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        font-size: 13px;
                        text-align: left;
                        color: #dddddd;
                        line-height: 17px;
                        padding-left: 8px;

                        .top {
                            width: 100%;
                            display: flex;
                            align-items: flex-start;
                            word-break: break-all;
                            .icon {
                                width: 20px;
                                text-indent: 0;
                                height: 14px;
                                margin-right: 10px;
                                flex-shrink: 0;
                                padding-top: 2px;
                                display: inline-block;

                                .img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }

                        .bottm {
                            width: 100%;
                            display: flex;
                            padding-top: 10px;
                            align-items: center;
                            justify-content: space-between;
                            .time {
                                font-size: 12px;
                                font-weight: 400;
                                text-align: left;
                                color: #dddddd;
                                line-height: 16px;
                                padding-left: 30px;
                            }
                            .mask {
                                padding: 2px 5px;
                                padding-left: 18px;
                                background: #ffeaeb;
                                border-radius: 3px;
                                font-size: 12px;
                                text-align: left;
                                font-weight: bold;
                                color: rgba(248, 50, 60, 0.9);
                                line-height: 16px;
                                background-image: url(./asset/images/play-ico.png);
                                background-size: 10px 10px;
                                background-repeat: no-repeat;
                                background-position: 4px center;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
