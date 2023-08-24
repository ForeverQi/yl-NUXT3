<script lang="jsx">
import { mapState } from 'vuex';
import '@/api/api..query-courseware-handout-list.js';
import '@/api/api..query-course-handout-list.js';
import '@/api/api..query-attachment-real-path.js';
export default {
    name: 'CourseHandoutDialog',
    data() {
        return { list: [], info: {}, courseList: [] };
    },
    computed: {
        ...mapState('course/info', {
            classId: 'classId',
            subjectId: 'subjectId',
            catalogId: 'catalogId',
            coursewareId: 'coursewareId',
            catalogShowStatus: 'catalogShowStatus',
            electiveShowStatus: 'electiveShowStatus',
        }),
    },
    mounted() {
        this.getData();
        this.getCourseData();
    },
    methods: {
        getData() {
            const list = [this.catalogId];
            let data = {
                url: 'cc/query-courseware-handout-list',
                params: {
                    classId: this.classId,
                    electiveStatus: this.electiveShowStatus,
                    coursewareId: this.coursewareId,
                    catalogIds: JSON.stringify(list),
                    subjectIds: JSON.stringify([this.subjectId]),
                },
                isCustom: false,
            };
            this.httpClient(data).then((res) => {
                this.list = res.catalogInfos;
                this.info = res;
            });
        },
        getCourseData() {
            const list = [this.catalogId];
            let data = {
                url: 'cc/query-course-handout-list',
                params: {
                    classId: this.classId,
                    electiveStatus: this.electiveShowStatus,
                    catalogIds: JSON.stringify(list),
                    subjectIds: JSON.stringify([this.subjectId]),
                },
                isCustom: false,
            };
            this.httpClient(data).then((res) => {
                this.courseList = res.catalogInfos;
                console.log(this.courseList);
            });
        },
        doDownload(item, item2) {
            const data = {
                url: 'cc/query-attachment-real-path',
                params: {
                    modulId: this.info.modulId,
                    courseId: this.info.courseId,
                    catalogId: item.catalogId,
                    coursewareId: item2.coursewareId,
                    classId: this.info.classId,
                    cowresourceId: item2.cowresourceId,
                    downloadIp: '',
                    downloadDevice: 'W',
                    downloadDeviceName: this.$platform.OS,
                    downloadDeviceSystem: '',
                    downloadDeviceVersion: this.$platform.version,
                },
                isCustom: false,
            };
            this.httpClient(data).then((res) => {
                const __downloadParams = res.coursewareDownloadUrl;
                let __url = __downloadParams;
                if (!(/^\/\//.test(__downloadParams) || /^http/.test(__downloadParams))) {
                    __url = niceloo.path.getServerFileDownloadPath(__downloadParams);
                }
                this.$PageUtil.openNewPage(__url);
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
        const isNoEmpty = this.list.some((item) => {
            if (!Array.isArray(item.handoutList) || item.handoutList.length === 0) {
                return false;
            } else {
                return true;
            }
        });
        const isNoEmpty2 = this.courseList.some((item) => {
            if (!Array.isArray(item.handoutList) || item.handoutList.length === 0) {
                return false;
            } else {
                return true;
            }
        });

        return (
            <div class="dialog_container">
                <div class="download_jy">
                    <span class="dialog_title">下载讲义</span>
                    <button
                        type="button"
                        class="dialog_headerbtn"
                        onClick={() => {
                            this.$emit('doClose');
                        }}
                    >
                        <img src={require('./asset/images/close.png')} />
                    </button>
                    <div class="activeLive cHandoutList" style={isNoEmpty === false ? 'display: none;' : ''}>
                        {this.list.map((item) => {
                            if (!Array.isArray(item.handoutList) || item.handoutList.length === 0) {
                                return '';
                            }
                            return (
                                <div class="w100" key={item.catalogId}>
                                    <p class="title" style={this.catalogShowStatus === 'Y' ? '' : 'display: none;'}></p>

                                    <ul>
                                        {item.handoutList.map((item2) => {
                                            return (
                                                <li>
                                                    <div class="handout-l flex ai-center">
                                                        <img class="word_icon" src={require('./asset/images/word.png')} alt="" />
                                                        <span>{item2.cowresourceName}</span>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            this.doDownload(item, item2);
                                                        }}
                                                    >
                                                        <img class="download" src={require('./asset/images/download.png')} alt="" />
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                    <div class="activeLive palyList" style={isNoEmpty2 === false ? 'display: none;' : ''}>
                        {this.courseList.map((item) => {
                            if (!Array.isArray(item.handoutList) || item.handoutList.length === 0) {
                                return '';
                            }
                            return (
                                <div class="w100" key={item.catalogId}>
                                    <p class="title" style={this.catalogShowStatus === 'Y' ? '' : 'display: none;'}>
                                        {item.catalogName}
                                    </p>
                                    <ul>
                                        {item.handoutList.map((item2) => {
                                            return (
                                                <li>
                                                    <div class="handout-l flex ai-center">
                                                        <img class="word_icon" src={require('./asset/images/word.png')} alt="" />
                                                        <span>{item2.cowresourceName}</span>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            this.doDownload(item, item2);
                                                        }}
                                                    >
                                                        <img class="download" src={require('./asset/images/download.png')} alt="" />
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                    {isNoEmpty2 === false && isNoEmpty === false && (
                        <div class="cHandoutList">
                            <div class="empty-view">
                                <img src={require('./asset/images/empty.png')} class="img" />
                                <div class="txt">此课程下暂时没有讲义~</div>
                            </div>
                        </div>
                    )}

                    {(isNoEmpty2 === true || isNoEmpty === true) && (
                        <div class="dialog_footer">
                            <button
                                type="button"
                                onClick={() => {
                                    this.$emit('doClose');
                                }}
                            >
                                <span>取 消</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.dialog_container {
    .download_jy {
        position: relative;
        padding-top: 16px;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
        background: #fff;
        height: 500px;
        margin: 0 auto 0;
        display: flex;
        flex-direction: column;

        .dialog_title {
            display: block;
            font-size: 16px;
            text-align: center;
            border-bottom: 1px solid #eee;
            padding-bottom: 17px;
        }

        .dialog_headerbtn {
            position: absolute;
            top: 12px;
            right: 12px;
            padding: 0;
            background: 0 0;
            border: none;
            outline: 0;
            cursor: pointer;
            font-size: 16px;
        }

        .activeLive {
            padding: 0px 24px 10px 24px;
            border-bottom: 12px solid #eeeeee;

            .title {
                font-size: 16px;
                color: rgba(51, 51, 51, 1);
                border-left: 4px solid #ed3f3f;
                margin-top: 25px;
                margin-bottom: 15px;
                padding-left: 12px;
            }

            ul {
                li {
                    border-bottom: 1px solid #eeeeee;
                    padding: 13px 14px 13px 14px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    color: #495983;

                    .handout-l {
                        .word_icon {
                            margin-right: 10px;
                        }

                        .name {
                            padding: 0px 10px 0px 0px;
                        }
                    }

                    .download {
                        float: right;
                        margin-right: 16px;
                        vertical-align: middle;
                        cursor: pointer;
                    }
                }
            }
        }

        .cHandoutList {
            height: 130px;
            overflow: auto;
            flex: 1;

            .empty-view {
                width: 220px;
                height: 151px;
                margin: 0 auto;
                padding-top: 80px;

                .img {
                    width: 100%;
                    max-height: 100%;
                }

                .txt {
                    padding-top: 20px;
                    height: 19px;
                    font-size: 14px;
                    font-weight: 400;
                    text-align: center;
                    color: #3a3d4b;
                    line-height: 19px;
                }
            }
        }

        .palyList {
            overflow: auto;
            border-bottom: none;
            display: flex;
            flex: 1;
            flex-direction: column;

            .w100 {
                width: 100%;
            }
        }

        .noList {
            display: flex;
            flex: 1;
            flex-direction: column;
            color: #666666;
            font-size: 16px;
            text-align: center;
            padding-top: 80px;

            img {
                width: 200px;
            }
        }

        .dialog_footer {
            padding: 30px 20px 20px;
            text-align: center;

            button {
                width: 121px;
                background: #fff;
                color: #f25c5c;
                height: 32px;
                border: 1px solid rgba(240, 66, 65, 1);
                border-radius: 16px;
                outline: none;
                cursor: pointer;

                & + button {
                    margin-left: 48px;
                }
            }

            button.download_all {
                background: #f25c5c;
                color: #fff;
            }
        }
    }
}
</style>
