<script lang="jsx">
import { mapState } from 'vuex';
import dayjs from 'dayjs';
import '@/api/qb/api..courseware-paper-authentication.js';
import '@/api/cc/api.CC3034.cc-playrd-batch-add.js';

export default {
    props: {
        list: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            answerStyle: {},
            itemData: {},
        };
    },
    computed: {
        ...mapState('class-info/info', {
            classId: 'classId',
            ctapId: 'ctapId',
        }),
        ...mapState('class-info/subject', {
            subjectId: 'currentSubjectId',
        }),
    },
    methods: {
        paperAuthentication(item) {
            const data = {
                url: 'qb/courseware-paper-authentication',
                params: {
                    paperId: this.itemData.paperId,
                    classId: this.classId,
                    coursewareId: this.itemData.coursewareId,
                },
                isCustom: false,
            };
            return this.httpClient(data)
                .then((res) => {
                    this.answerStyle = res.answerStyle;
                })
                .then(this.haveAuthority());
        },
        haveAuthority() {
            this.addPaperRecord().then(() => {
                this.getCoursewareAnswersheetInfo().then((res) => {
                    let answersheetInfo = res;
                    if (!answersheetInfo) {
                        that.$baseUI.alert('试卷不正确，请联系客服');
                        return '';
                    }
                    this.doJump(answersheetInfo);
                });
            });
        },
        getCoursewareAnswersheetInfo() {
            // 获取试卷信息
            const params = {
                url: 'zhinengxuexi/courseware-answer-info',
                params: {
                    paperId: this.itemData.paperId,
                    classId: this.classId,
                    coursewareId: this.itemData.coursewareId,
                },
                isCustom: false,
            };
            return this.httpClient(params)
                .then((res) => {
                    return res;
                })
                .catch(() => {
                    return Promise.reject();
                });
        },
        addPaperRecord() {
            // 播放记录添加
            let data = {
                playrds: [
                    {
                        classId: this.classId, //班级标识
                        coursewareId: this.itemData.coursewareId, //课件标识
                        coursewareName: this.itemData.coursewareName,
                        playRdIP: '', //播放记录IP
                        playRdStartTime: dayjs().format('YYYY-MM-DD hh:mm:ss'), //播放记录开始时间
                        playRdEndTime: dayjs().format('YYYY-MM-DD hh:mm:ss'), //播放记录开始时间
                        playRdDevice: 'W', //播放记录播放设备
                        playRdDeviceName: '', //播放记录播放设备名称
                        playRdDeviceOS: 'W', //播放记录播放设备操作系统
                        playRdDeviceVersion: this.$platform.version, //播放记录设备版本号
                        playRdMcc: '', // 有后端确定该字段是否为必传字段 模块课程目录名称
                        playRdDuration: 0, //播放记录播放时长
                        playRdOffLineStatus: 'P', //L:在线播放;O:离线播放
                        subjectId: this.subjectId, // 科目ID
                        courseId: this.itemData.courseId, // 课程IDS
                    },
                ],
            };

            return this.httpClient({
                url: 'cc/cc-playrd-batch-add',
                params: data,
            }).catch((err) => {
                this.$niceloo.api.handleFailure(err);
                return Promise.reject();
            });
        },
        doJump(answersheetInfo) {
            const fullPath = encodeURIComponent(`${location.href}&classId=${this.classId}&coursewareId=${answersheetInfo.coursewareId}`);
            let url;
            if (this.answerStyle === 'FZJK3') {
                url = `/emulation/fire-exam/login?url=${fullPath}&classUniquecode=${answersheetInfo.classUniquecode}&subjectId=${answersheetInfo.subjectId}&paperId=${answersheetInfo.paperId}&classId=${this.classId}&coursewareId=${answersheetInfo.coursewareId}&ctapId=${this.ctapId}`;
            } else {
                url = `/exam/examinfo/${answersheetInfo.classUniquecode}/${this.subjectId}/${answersheetInfo.paperId}?url=${fullPath}&ctapId=${this.ctapId}&enableStatus=Y`;
            }
            this.$PageUtil.href(url);
        },
        toExamDetail(item) {
            this.itemData = item;
            this.paperAuthentication();
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
            <div class="mock-exam">
                {this.list.map((r) => {
                    return (
                        <div class="item">
                            <div class="name">{r.coursewareName}</div>
                            <div class="btn-wrap">
                                <div
                                    class="btn"
                                    onClick={() => {
                                        this.toExamDetail(r);
                                    }}
                                >
                                    进入机考
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.mock-exam {
    padding-top: 2px;
    height: 400px;
    overflow-y: auto;
    .item {
        margin: 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 58px;
        border-bottom: 1px solid #f1f3f5;

        .name {
            font-size: 14px;
            color: #3a3d4b;
            line-height: 24px;
        }

        .btn-wrap {
            .btn {
                width: 70px;
                height: 26px;
                text-align: center;
                line-height: 26px;
                background: #ffece8;
                border-radius: 16px;
                font-size: 12px;
                color: #ff2e30;
                cursor: pointer;
            }
        }
    }
}
</style>
