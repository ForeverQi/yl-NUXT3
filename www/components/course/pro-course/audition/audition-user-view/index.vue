<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'AuditionUserView',
    /**
     * @returns {object} 默认数据处理
     */
    data() {
        return {
            userInfo: {},
        };
    },
    computed: {
        ...mapState('audition/info', {
            isLogin: 'isLogin',
            userName: 'userName',
            userAvatar: 'userAvatar',
            courseName: 'courseName',
            projectId: 'projectId',
        }),
    },
    /**
     * 初始化方法
     */
    mounted() {
        ylPlugin.login.getUser().then((userData) => {
            this.userInfo = userData;
            this.setCourseInfo({
                isLogin: !!userData,
                userName: (userData || {}).userYoulunum,
                userAvatar: (userData || {}).userAvatar,
            });
        });
    },
    methods: {
        ...mapMutations('audition/info', {
            setCourseInfo: 'setCourseInfo',
        }),
    },
    /**
     * @returns {object} jsx虚拟dom
     */
    render() {
        return (
            <div class="audition-user">
                {this.isLogin === false && (
                    <div
                        class="do-login"
                        onClick={() => {
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
                                    { pageName: document.title, entranceResource: '系统课-登录引导', courseType: '系统课', pageType: '试听专区页' }
                                )
                                .then((res) => {
                                    this.userInfo = res.userDetail;
                                    this.setCourseInfo({
                                        isLogin: true,
                                        userName: res.userDetail.userYoulunum,
                                        userAvatar: res.userDetail.userAvatar,
                                    });
                                });
                        }}
                    >
                        登录
                    </div>
                )}
                {this.isLogin === true && (
                    <div class="user-wrap">
                        <div class="user">
                            <ImageView src={this.userAvatar} placeholderHeight="100%">
                                <img src={require('./asset/images/avatar-nomal.png')} v-slot:placeholder />

                                <img src={require('./asset/images/avatar-nomal.png')} v-slot:error />
                            </ImageView>
                        </div>
                        <div class="handle">
                            <div class="wrap">
                                <a class="item" href="/learningCenter/index/myCourse">
                                    我的课程
                                </a>
                                <a class="item" href="/uc/manager/order/orderClass">
                                    我的订单
                                </a>
                                <a class="item" href="/uc/manager/personalCenter/personalInfo">
                                    个人中心
                                </a>
                                <a class="item" href="/help">
                                    帮助中心
                                </a>
                                <div
                                    class="item"
                                    onClick={() => {
                                        ylPlugin.login.logout();
                                    }}
                                >
                                    退出
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.audition-user {
    .do-login {
        font-size: 15px;
        font-weight: 400;
        text-align: left;
        color: #ffffff;
        line-height: 20px;
        cursor: pointer;
    }

    .user-wrap {
        position: relative;
        z-index: 10;
        .user {
            width: 38px;
            height: 38px;
            overflow: hidden;
            border-radius: 50%;
            cursor: pointer;

            /deep/ img {
                width: 100%;
                height: 100%;
            }
        }
        &:hover {
            .handle {
                display: block;
            }
        }
        .handle {
            display: none;
            position: absolute;
            top: 0px;
            right: -10px;
            padding-top: 50px;
            &:hover {
                display: block;
            }
            &::before {
                position: absolute;
                top: 40px;
                left: 65px;
                content: '';
                display: block;
                width: 0;
                height: 0;
                border: 12px solid rgba(0, 0, 0, 0.6);
                border-top: none;
                border-left: 12px solid transparent;
                border-right: 12px solid transparent;
            }
            .wrap {
                height: 233px;
                width: 104px;
                height: 233px;
                padding: 8px;
                box-sizing: border-box;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 8px;
                box-shadow: 0px 6px 16px 0px #202631;
                backdrop-filter: blur(7px);

                .item {
                    display: block;
                    padding: 12px 0;
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 19px;
                    text-align: center;
                    cursor: pointer;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

                    &:hover {
                        color: #fff;
                        font-weight: 700;
                    }
                    &:last-child {
                        border-bottom: none;
                    }
                }
            }
        }
    }
}
</style>
