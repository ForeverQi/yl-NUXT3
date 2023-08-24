<script lang="jsx">
import '@/api/ctc/api..query-ctc-project-tree.js';
export default {
    components: {
        vFragment: {
            functional: true,
            render(h, context) {
                const slots = context.slots();
                return Object.keys(slots).map((k) => {
                    return slots[k];
                });
            },
        },
    },
    data() {
        return {
            list: [],
            selectProject: {},
            collegeInfo: {},
        };
    },
    mounted() {
        this.selectProject = this.$storage.get('indexSelectProject') || {};
        this.init();
    },
    methods: {
        init() {
            this.getProjectList();
        },
        getProjectList() {
            const data = {
                url: 'ctc/query-ctc-project-tree',
                params: {
                    projectShowStatus: 'Y',
                },
                isCustom: false,
            };
            this.httpClient(data).then((res) => {
                if (!Array.isArray(res.data)) {
                    res.data = [];
                }
                this.list = res.treeData;
                console.log(res, '@@');
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
        track() {
            // 显示选择项目弹窗
            const data = {
                college_name: this.collegeInfo.collegeName, // 学院名称
                project_id: this.selectProject.projectId, // 用户已选项目ID
            };
            this.$yiguan.track('youlu_click_the_exam_pop_up', data);
        },
        closeTrack() {
            const data = {
                project_id: this.selectProject.projectId ?? '-', // 用户已选项目ID
                college_name: this.collegeInfo.collegeName ?? '-', // 学院名称
                project_name: this.selectProject.projectId ?? '-',
                is_selected_project: !!this.selectProject.projectId,
            };
            this.$yiguan.track('youlu_exam_pop_up_closed', data);
        },
    },
    render() {
        return (
            <div class="select-project_box">
                <div class="title">
                    <div class="name">
                        <div class="txt">
                            <img src={require('./asset/images/icon-left.png')} />
                            <span>请选择您感兴趣的考试</span>
                            <img src={require('./asset/images/icon-right.png')} />
                        </div>
                        <div class="tip">
                            可选择<span class="num">1</span>个考试项目，支持随时调整
                        </div>
                    </div>
                    <div
                        class="close"
                        onClick={() => {
                            this.closeTrack();
                            this.$emit('doClose', {
                                check: false,
                                selectProject: null,
                            });
                        }}
                    ></div>
                </div>
                <div class="select-project">
                    <div class="content">
                        {this.list.map((r) => {
                            return (
                                <vFragment key={r.collegeName}>
                                    <div class="item-title">{r.collegeName}</div>
                                    <div class="item-content">
                                        {r.children.map((r1) => {
                                            return (
                                                <div
                                                    class={{
                                                        item: true,
                                                        this:
                                                            (r1.ptagId === '' && this.selectProject.projectId === r1.projectId) ||
                                                            (r1.ptagId !== '' && this.selectProject.ptagId === r1.ptagId),
                                                    }}
                                                    key={r1.ptagId || r1.projectId}
                                                    onClick={() => {
                                                        this.collegeInfo = r;
                                                        this.selectProject = r1;
                                                    }}
                                                >
                                                    {r1.ptagId ? `${r1.projectName} - ${r1.ptagName}` : r1.projectName}
                                                    {((r1.ptagId === '' && this.selectProject.projectId === r1.projectId) ||
                                                        (r1.ptagId !== '' && this.selectProject.ptagId === r1.ptagId)) && (
                                                        <img src={require('./asset/images/icon-check.png')} />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </vFragment>
                            );
                        })}
                    </div>
                    <div class="btn-wrap">
                        <div
                            class={{ btn: true, this: this.selectProject.projectId }}
                            onClick={() => {
                                if (!this.selectProject?.projectId) {
                                    return;
                                }
                                this.track();
                                this.$emit('doClose', {
                                    selectProject: this.selectProject,
                                    check: true,
                                });
                            }}
                        >
                            确定（{this.selectProject.projectId ? 1 : 0}/1）
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.select-project_box {
    height: 700px;
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .select-project {
        width: 100%;
        flex: auto;
        padding: 0 12px 24px 32px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-sizing: border-box;
    }
    .title {
        width: 100%;
        height: 115px;
        flex: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: url('./asset/images/header-bgc.png') 100% 100% no-repeat;
        .name {
            display: flex;
            padding-bottom: 8px;
            flex-direction: column;
            align-items: center;
            flex: auto;
            .txt {
                display: flex;
                justify-content: center;
                align-items: center;
                flex: auto;
                margin-bottom: 12px;
                span {
                    font-size: 24px;
                    font-weight: 400;
                    text-align: left;
                    color: #3a3d4b;
                    line-height: 31px;
                }
                img {
                    width: 22px;
                    height: 9px;
                    &:first-child {
                        margin-right: 14px;
                    }
                    &:last-child {
                        margin-left: 14px;
                    }
                }
            }
            .tip {
                margin-left: 20px;
                font-size: 14px;
                font-weight: 400;
                color: #77798d;
                line-height: 19px;
                .num {
                    font-size: 14px;
                    color: #ff2e30;
                    line-height: 19px;
                }
            }
        }
        .close {
            width: 16px;
            height: 16px;
            flex: none;
            cursor: pointer;
            margin: 0 20px 20px 0;
            background-image: url(./asset/images/close.png);
            background-size: 100% 100%;
        }
    }

    .content {
        overflow: hidden;
        overflow-y: auto;
        width: 100%;

        .item-title {
            padding-top: 10px;
            padding-bottom: 20px;
            font-size: 18px;
            font-weight: 700;
            color: #3a3d4b;
            line-height: 24px;
            letter-spacing: 0.34px;
        }
        .item-content {
            padding-bottom: 8px;
            margin-right: -12px;
            overflow: hidden;
            // border-bottom: 1px solid rgba(0, 0, 0, 0.03);
            .item {
                display: inline-block;
                padding: 6px 28px;
                font-size: 14px;
                font-weight: 400;
                text-align: left;
                color: #3a3d4b;
                line-height: 22px;
                background-color: #f7f8f9;
                border: 1px solid rgba(0, 0, 0, 0.04);
                border-radius: 23px;
                margin-right: 12px;
                margin-bottom: 16px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                &:hover {
                    color: #ff2e30;
                }

                &.this {
                    border: 1px solid #f8323c;
                    background: #ffebeb;
                    color: #ff2e30;
                }
            }
            img {
                position: absolute;
                right: -1px;
                bottom: -1px;
                width: 21px;
                height: 18px;
            }
        }
    }

    .btn-wrap {
        padding: 20px 0;
        margin-bottom: -24px;
        flex: none;
        .btn {
            width: 240px;
            height: 40px;
            margin: 0 auto;
            opacity: 0.5;
            background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
            border-radius: 20px;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
            color: #ffffff;
            line-height: 40px;
            cursor: pointer;

            &.this {
                background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
                opacity: 1;
            }
        }
    }
    /* 修改滚动条的样式 */
}
::-webkit-scrollbar {
    width: 14px;
}
/* 定义滚动条滑块样式 */
::-webkit-scrollbar-thumb {
    background-color: #b5b5b5; /* 设置滑块的背景颜色 */
}
::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0.09);
    -webkit-border-radius: 7px;
}
</style>
