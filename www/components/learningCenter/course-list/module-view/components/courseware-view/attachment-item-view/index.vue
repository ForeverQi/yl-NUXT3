<script lang="jsx">
import { mapState } from 'vuex';
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import '@/api/api..query-attachment-real-path.js';
import puralPlanner from '../mixin/puralPlanner.js'; // 第三方课程跳转处理
export default {
    name: 'AttachmentItemView',
    mixins: [puralPlanner],
    props: {
        itemData: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    computed: {
        ...mapState('class-info/info', {
            classId: 'classId', // 班级ID
            classTypeId: 'classTypeId', // 班型ID
            projectId: 'projectId', // 项目ID
            projectName: 'projectName', // 项目名称
            ctapId: 'ctapId', // 期次
            pypId: 'pypId',
            electiveShowStatus: 'electiveShowStatus',
            className: 'className', // 班级名称
        }),
    },
    methods: {
        doDownloadFile() {
            // 判断登录来源 -1时不可点击
            if (!this.$baseUI.clickStop()) {
                return;
            }
            if (this.itemData.lockedStatus === 'Y') {
                this.$Message.warning(this.itemData.lockedTip);
                return;
            }
            // if (this.toRuralPlanner() !== false) {
            //     // 返回值不为false时说明是第三方课程
            //     return;
            // }
            const data = {
                url: 'cc/query-attachment-real-path',
                params: {
                    modulId: this.itemData.moduleId,
                    courseId: this.itemData.courseId,
                    catalogId: this.itemData.catalogId,
                    coursewareId: this.itemData.coursewareId,
                    classId: this.classId,
                    downloadIp: '',
                    downloadDevice: 'W',
                    downloadDeviceName: this.$platform.OS,
                    downloadDeviceSystem: '',
                    downloadDeviceVersion: this.$platform.version,
                },
                isCustom: false,
            };
            this.$httpClient(data).then((res) => {
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
        return (
            <div class="wrap">
                <div class="content">
                    <div class="title">
                        <div class="name">
                            <img src={require('./asset/images/jiangyi.png')} class="img" />
                            {this.itemData.coursewareName}
                            {this.itemData.coursewareElectiveStatus === 'Y' && <div class="tags">选修</div>}
                            <img style={{ display: this.itemData.lockedStatus === 'Y' ? '' : 'none' }} src={require('./asset/images/lock.png')} class="lock" />
                        </div>
                    </div>
                </div>
                <div class="btn-wrap">
                    <div class="btn-group">
                        <div class="btn" onClick={this.doDownloadFile}>
                            <img class="img" src={require('./asset/images/dw.png')} />
                            下载
                        </div>
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
                .lock {
                    width: 24px;
                    height: 24px;
                    vertical-align: bottom;
                    display: inline-block;
                }
                .img {
                    width: 16px;
                    height: 16px;
                    margin-right: 6px;
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
        padding-left: 22px;
        .size {
            font-size: 12px;
            color: #8d90aa;
            line-height: 16px;
        }

        .progress-wrap {
            display: flex;
            align-items: center;
            height: 4px;
            margin-left: 32px;
            .progress-pipeline {
                width: 70px;
                background: #ebedf0;
                border-radius: 4px;

                .rate {
                    width: 40%;
                    height: 4px;
                    background: #fc555e;
                    border-radius: 4px;
                }
            }

            .txt {
                margin-left: 12px;
                color: #f8323c;
                font-size: 12px;
            }
        }
    }

    .btn-wrap {
        text-align: right;
        .btn-group {
            .btn1,
            .btn {
                display: inline-block;
                padding: 7px 11px;
                line-height: 1;
                font-size: 12px;
                color: #ffffff;
                background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
                border-radius: 13px;
                margin-left: 16px;
            }

            .btn1 {
                margin-left: 0;
                color: #ff2e30;
                background: #ffece8;
            }

            .img {
                width: 16px;
                height: 16px;
                vertical-align: middle;
                margin-right: 4px;
                margin-top: -3px;
            }
        }
        .time {
            color: #8d90aa;
            font-size: 12px;
            line-height: 1;
            padding-top: 6px;
        }
    }
}
</style>
