<script lang="jsx">
import { mapState, mapMutations } from 'vuex';
import CourseFeedback from '@/www/components/learningCenter/htvideo/course-feedback/index.vue';
export default {
    name: 'CoursePlayBottom',
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
            isShowDialog: false,
            isShowQrcode: false,
        };
    },
    computed: {
        ...mapState('course/info', {
            classId: 'classId',
            coursewareId: 'coursewareId',
            coursewareName: 'coursewareName',
            vid: 'vid',

            projectId: 'projectId',
            userName: 'userName',
        }),
    },
    methods: {
        ...mapMutations('course/info', {
            doVideoPause: 'doVideoPause',
            doVideoResume: 'doVideoResume',
        }),
        showDownloadDialog(ev) {
            this.isShowDialog = true;
            setTimeout(() => {
                window.addEventListener('click', this.eventDialog);
            }, 100);
        },
        eventDialog(ev) {
            this.hasChild(ev.target, this.$refs.downloadBtn);
            if (!(this.hasChild(ev.target, this.$refs.downloadBox) || this.hasChild(ev.target, this.$refs.downloadBtn))) {
                window.removeEventListener('click', this.eventDialog);
                this.isShowDialog = false;
            }
        },
        hasChild(ele1, ele2) {
            if (ele1 === ele2) {
                return true;
            } else {
                let parentNode = ele1.parentNode;
                if (parentNode.tagName !== 'BODY' && parentNode === ele2) {
                    return true;
                } else if (parentNode.tagName !== 'BODY') {
                    return this.hasChild(parentNode, ele2);
                } else {
                    return false;
                }
            }
        },
        showSuggestionsDialog() {
            this.doVideoPause();
            this.$baseUI
                .createModel(
                    {
                        modalContent: CourseFeedback,
                    },
                    {},
                    {
                        width: '780px',
                        radius: '8px',
                        showClose: false,
                        showHead: false,
                        isShadow: false,
                        padding: '0',
                        style: 'z-index: 499',
                        fixedStatus: true,
                    }
                )
                .then(() => {
                    this.doVideoResume();
                });
        },
    },
    render() {
        const showClientDialog = () => {
            return (
                <div class="downloadBox" ref="downloadBox">
                    <p>即将打开PC客户端进行下载</p>
                    <button
                        class="pointer"
                        onClick={() => {
                            let userInfo = this.$storage.get('loginStatus');
                            let newhref = `niceloo://${this.classId}@${this.coursewareId}@${this.coursewareName}@1@${this.vid}@@${userInfo.userId}`;
                            this.$ClientUtil.openPcClient(newhref);

                            this.$yiguan.track('web_learning_center_htvideo_click_download', {
                                college_name: '',
                                project_position: this.projectId,
                                youlu_ID: this.userName,
                                page_name: document.title,
                                project_name: this.projectId,
                            });
                        }}
                    >
                        确认打开
                    </button>
                </div>
            );
        };
        const showQrcode = () => {
            return (
                <div class="show-qrcode">
                    <div class="tip">
                        <p class="line line1">有事离开？</p>
                        <p class="line">不用担心 扫一扫继续用手机看～</p>
                    </div>
                    <div class="qrcode-box">
                        <img src={require('./asset/images/qrcode.png')} class="img" />
                    </div>
                    <div class="btn">扫码下载手机APP继续听课</div>
                </div>
            );
        };
        return (
            <div class="course-play-bottom">
                <div
                    class="item"
                    onClick={() => {
                        this.showSuggestionsDialog();

                        this.$yiguan.track('web_learning_center_htvideo_click_idea', {
                            college_name: '',
                            project_position: this.projectId,
                            youlu_ID: this.userName,
                            page_name: document.title,
                            project_name: this.projectId,
                        });
                    }}
                >
                    <div class="icon">
                        <img src={require('./asset/images/appraise.png')} class="img" />
                    </div>
                    <div class="txt">投诉建议</div>
                </div>
                <div
                    class="item phone"
                    onClick={() => {
                        this.$PageUtil.openNewPage('https://www.youlu.com/zt1/huizong/ydkt/?e_id=S-12514');
                        this.$yiguan.track('web_learning_center_htvideo_click_phone', {
                            college_name: '',
                            project_position: this.projectId,
                            youlu_ID: this.userName,
                            page_name: document.title,
                            project_name: this.projectId,
                        });
                    }}
                >
                    {showQrcode()}
                    <div class="icon">
                        <img src={require('./asset/images/phone.png')} class="img" />
                    </div>
                    <div class="txt">手机听课</div>
                </div>
                <div class="item" onClick={this.showDownloadDialog} ref="downloadBtn">
                    {this.isShowDialog && showClientDialog()}
                    <div class="icon">
                        <img src={require('./asset/images/dowload.png')} class="img" />
                    </div>
                    <div class="txt">下载视频</div>
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.downloadBox {
    position: absolute;
    z-index: 2;
    bottom: 55px;
    right: 10px;
    width: 300px;
    height: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background: #ffffff;

    &:after {
        content: '';
        display: block;
        position: absolute;
        bottom: -10px;
        right: 76px;
        width: 18px;
        height: 12px;
        background-size: 100% 100%;
        background-image: url(./asset/images/up.png);
    }

    p {
        // width: 197px;
        height: 27px;
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        color: #333333;
        line-height: 27px;
        padding-bottom: 20px;
    }
    .pointer {
        width: 200px;
        height: 40px;
        margin: 0 auto;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 21px;
        color: #ffffff;
        text-align: center;
    }
}
.show-qrcode {
    position: absolute;
    bottom: 70px;
    right: 140px;
    z-index: 6;
    width: 280px;
    height: 310px;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: #ffffff;

    &:after {
        content: '';
        display: block;
        position: absolute;
        bottom: -10px;
        right: 130px;
        width: 18px;
        height: 12px;
        background-size: 100% 100%;
        background-image: url(./asset/images/up.png);
    }

    .tip {
        .line {
            font-size: 15px;
            font-weight: 400;
            text-align: center;
            color: #333333;
            line-height: 20px;
            &.line1 {
                margin-bottom: 6px;
            }
        }
    }
    .qrcode-box {
        width: 160px;
        height: 160px;
        margin: 12px 0;

        .img {
            width: 100%;
            height: 100%;
        }
    }

    .btn {
        width: 240px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 21px;
        color: #ffffff;
    }
}
.course-play-bottom {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 20px;
    .item {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #dddddd;
        height: 36px;
        line-height: 19px;
        margin-left: 42px;
        padding: 0 22px;
        cursor: default;
        border-radius: 18px;
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        &.phone {
            color: #ffd025;
            cursor: pointer;

            &:hover {
                .show-qrcode {
                    display: flex;
                }
            }
        }

        .icon {
            width: 16px;
            height: 16px;
            margin: 0 auto;
            margin-right: 10px;

            .img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
<style lang="less">
.yl-dialog__wrap {
    z-index: 888 !important;
}
</style>
