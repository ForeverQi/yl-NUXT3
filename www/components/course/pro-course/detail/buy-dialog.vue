<template>
    <div v-show="show" class="dialog-shadow">
        <div class="dialog-content">
            <img src="./asset/images/close-btn.png" alt="关闭按钮" class="close-btn" @click="$emit('update:show', false)" />
            <div class="title-box">
                <span class="tag">{{ data.ctapName }}</span>
                <span class="title" :title="data.classtypeName">{{ data.classtypeName }}</span>
            </div>
            <div class="price-box">
                <span class="name">价格</span>
                <span class="price">
                    ¥
                    <span class="number">
                        <template v-if="classDetail.classPromotionstatus === 'Y'">{{ (classDetail.classPrice || 0) | veMoneyCent }}</template>
                        <template v-else>{{ (classDetail.classStdprice || 0) | veMoneyCent }}</template>
                    </span>
                </span>
            </div>
            <div class="check-box">
                <div class="label">科目类型：</div>
                <div class="item-box">
                    <div
                        v-if="data.generalObjects && data.generalObjects.length"
                        class="check-item"
                        :class="{ active: classType === 'all' }"
                        @click="classType = 'all'"
                    >
                        全科班
                    </div>
                    <div
                        v-if="data.singleObjects && data.singleObjects.length"
                        class="check-item"
                        :class="{ active: classType === 'single' }"
                        @click="classType = 'single'"
                    >
                        单科班
                    </div>
                </div>
            </div>
            <div class="check-box">
                <div class="label">选择科目：</div>
                <div class="item-box">
                    <div
                        v-for="item in subjectList"
                        :key="item.subjectId"
                        class="check-item"
                        :class="{ active: subjectId === item.subjectId }"
                        @click="subjectId = item.subjectId"
                    >
                        {{ item.subjectName }}
                    </div>
                </div>
            </div>
            <div class="check-box" v-if="isNoServer || data.classtypeType !== 'PEC'">
                <div class="label">服务保障：</div>
                <div class="item-box">
                    <div
                        v-for="item in classList"
                        :key="item.classId"
                        class="check-item"
                        :class="{ active: classId === item.classId }"
                        @click="clickClass(item)"
                    >
                        <template v-if="item.classAsertype === 'none'">无协议</template>
                        <template v-else-if="item.classAsertype === 'continue' || item.classAsertype === 'repetition'">续学</template>
                        <template v-else-if="item.classAsertype === 'refund'">尊享学</template>
                        <template v-else-if="item.classAsertype === 'unRepetitionRefund' || item.classAsertype === 'unContinueRefund'">简易学</template>
                    </div>
                </div>
            </div>
            <button class="buy-btn" @click="clickBuy">立即购买</button>
        </div>
    </div>
</template>

<script>
import loginApi from '@/api/login.js';
import loginRegisterTrack from '@/plugins/yiguan/login-register-track.js';
import track from '@/www/components/course/free-course/js/track.js';
export default {
    mixins: [track],
    inject: ['queryIsLose'],
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        // 课件的详情信息
        data: {
            type: Object,
            default: () => ({
                generalObjects: [],
                singleObjects: [],
            }),
        },
        project: {
            type: Object,
            default: () => ({
                projectCode: '',
                projectId: '',
                projectSeoCode: '',
            }),
        },
        clickPosition: {
            type: String,
            default: '',
        },
        pageType: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            classType: '', // 选中的班级类型 all全科班 single单科班
            subjectId: '', // 选中的科目id
            classId: '', // 选中的班级id
            classDetail: {}, // 选中的班级详情
            subjectList: [], // 科目列表
            classList: [], // 选中的科目下的班级
        };
    },
    fetch() {
        return Promise.resolve();
    },
    computed: {
        isNoServer() {
            let isHave = false;
            let isHave2 = false;
            this.data.generalObjects &&
                this.data.generalObjects.some((item) => {
                    return item.classes.some((r) => {
                        if (r.classAsertype !== 'none') {
                            isHave2 = true;
                        }
                        return isHave2;
                    });
                });
            this.data.singleObjects &&
                this.data.singleObjects.some((item) => {
                    return item.classes.some((r) => {
                        if (r.classAsertype !== 'none') {
                            isHave2 = true;
                        }
                        return isHave2;
                    });
                });
            return isHave || isHave;
        },
    },
    watch: {
        // 传来的默认数据改变时，修改默认选中的班级信息
        data: {
            handler(data) {
                if (data.generalObjects && data.generalObjects.length) {
                    // 存在全科班优先选中全科班
                    this.classType = 'all';
                } else if (data.singleObjects && data.singleObjects.length) {
                    this.classType = 'single';
                }
            },
            immediate: true,
        },
        // 选中的班级类型改变时，修改科目列表并默认选中第一个
        classType: {
            handler(val) {
                if (!val) {
                    return;
                }
                if (val === 'all') {
                    this.subjectList = this.data.generalObjects;
                } else {
                    this.subjectList = this.data.singleObjects;
                }

                if (this.subjectList.length) {
                    this.subjectId = this.subjectList[0].subjectId;
                } else {
                    this.subjectId = '';
                }
            },
            immediate: true,
        },
        // 选中的科目改变时，修改班级列表(协议)并默认选中第一个
        subjectId: {
            handler(val) {
                if (!val) {
                    return;
                }
                const findItem = this.subjectList.find((i) => i.subjectId === val);
                this.classList = findItem.classes || [];
                if (this.classList.length) {
                    // 如果在当前科目下能找到和之前一样协议类型的班级，则默认选中协议一样的班级，如果找不到就取第一个协议班级
                    const findClass = this.classList.find((i) => i.classAsertype === this.classDetail.classAsertype);
                    const checkItem = findClass || this.classList[0];
                    this.classId = checkItem.classId;
                    this.classDetail = {
                        subjectId: findItem.subjectId,
                        subjectName: findItem.subjectName,
                        classCategory: findItem.classCategory,
                        ...checkItem,
                    };
                } else {
                    this.classId = '';
                    this.classDetail = {};
                }
            },
            immediate: true,
        },
    },
    methods: {
        ...loginRegisterTrack,

        // 点击服务保障
        clickClass(item) {
            const findItem = this.subjectList.find((i) => i.subjectId === this.subjectId);
            this.classDetail = {
                subjectId: findItem.subjectId,
                subjectName: findItem.subjectName,
                classCategory: findItem.classCategory,
                ...item,
            };
            this.classId = item.classId;
        },
        // 点击购买按钮
        async clickBuy() {
            // 如果产品已下架，后续不再执行
            if (await this.queryIsLose()) {
                this.$emit('update:show', false);
                return;
            }
            if (!this.classId) {
                this.$baseUI.alert('请完善科目或保障服务类型的选择!');
                return;
            }
            this.purchaseClickTrack();
            this.trackData();
            const isLogin = await ylPlugin.login.isLogined();
            if (!isLogin) {
                // 没登录，调起登录组件
                let clueExtension = await this.$Promotion.getClueExtensionInfo({ clueWaycode: 'yindao', originCode: 'xitongke' });

                // ylPlugin.login
                //     .showLogin_verifyByWx3({
                //         clue: { clueExtension },
                //         onstatechange: (state) => {
                //             if (state.isQRCodeScanned) {
                //                 console.log(state);
                //                 this.trackScanWx3Login('登录弹窗', this.$route.query.pageName || document.title);
                //             }
                //         },
                //     })
                this.$ylPlugin.showLoginModal(
                    { clue: { clueExtension } },
                    { pageName: document.title, entranceResource: '系统课-立即购买', courseType: '系统课', pageType: '资源详情页' }
                );
                // .then(
                //     (res) => {
                //         if (res && ['wx1', 'wx2'].includes(res.loginMethod) && res.isUserNewlyRegistered) {
                //             // 登陆方式为微信需要推送线索参数
                //             /*this.pushWxClue(clueExtension);*/
                //         }

                //         // 易观上报
                //         this.trackLoginOrRegister(true, '', res.loginMethod, document.title || '系统课详情', '立即购买', '登录弹窗');
                //     },
                //     (error) => {
                //         // 易观上报
                //         this.trackLoginOrRegister(false, error.msg, error.loginMethod, document.title || '系统课详情', '立即购买', '登录弹窗');
                //     }
                // );
                return;
            }
            let courseSafeguard = '';
            switch (this.classDetail.classAsertype) {
                case 'none':
                    courseSafeguard = '无协议';
                    break;
                case 'continue':
                    courseSafeguard = '续学';
                    break;
                case 'repetition':
                    courseSafeguard = '续学';
                    break;
                case 'refund':
                    courseSafeguard = '尊享学';
                    break;
                case 'unRepetitionRefund':
                    courseSafeguard = '简易学';
                    break;
                case 'unContinueRefund':
                    courseSafeguard = '简易学';
                    break;
            }
            this.$yiguan.track('systemCourse_classDetails_payment', {
                course_ID: this.classDetail.classId, //课程id
                course_name: this.classDetail.className, //课程名称
                original_cost: this.classDetail.classStdprice, //课程原价
                current_price: this.classDetail.classPrice, //课程现价
                class_welfare: this.data.classtypeWelfare, //课程配套福利
                course_type: this.classDetail.classCategory, //科目类型
                select_course: this.classDetail.subjectName, //科目
                course_safeguard: courseSafeguard, //课程保障服务
                first_category: this.data.parentProjectName, //课程一级分类
                second_category: this.data.projectName, //课程二级分类
            });
            const userData = await ylPlugin.login.getUser();
            this.$cookieUtil.set(userData.userId + this.$nuxt.context.env.config.env + 'orderClasscom.niceloo3.0.h5', [this.classId].toString());
            let sessionArr = JSON.parse(sessionStorage.getItem('classIds')) || [];
            if (sessionArr.length) {
                let arr = sessionArr.filter((item) => {
                    return item !== this.classId;
                });
                sessionStorage.setItem('classIds', JSON.stringify(arr));
            }
            this.$emit('buy-fn', this.classDetail.className);
            this.classDetail.projectId = this.data.projectId;
            this.classDetail.classtypeName = this.data.classtypeName;
            sessionStorage.setItem(userData.userId + 'order', JSON.stringify(this.classDetail));

            if (this.data.classtypeType === 'PEC') {
                this.$router.push('/uc/manager/order/orderOther/confirm');
            } else {
                this.$router.push('/uc/manager/order/check');
            }
        },

        // 推送微信线索
        pushWxClue(clueExtension) {
            return new Promise((resolve, reject) => {
                loginApi.taAppletCluePushNew({
                    params: {
                        clueExtension,
                    },
                    success: (data) => {
                        resolve(data);
                    },
                    fail: (data, msg) => {
                        reject(msg);
                    },
                    error: (data, msg) => {
                        reject(msg);
                    },
                });
            }).catch((err) => {
                console.error(err);
            });
        },
        purchaseClickTrack() {
            let stringPrice = (this.classDetail.classPromotionstatus === 'Y' ? this.classDetail.classPrice : this.classDetail.classStdprice)
                .toString()
                .split('');
            stringPrice.splice(stringPrice.length - 2, 0, '.');
            let filterPrice = stringPrice.join('');
            this.trackWebYouluPurchaseSystemCourse({
                page_name: this.data.classtypeName,
                project_id: this.data.projectId,
                subject_name: this.classDetail.subjectName,
                subject_type: this.subjectId || '-',
                page_type: this.pageType, //页面类型
                course_type: '系统课',
                entrance_resource:
                    this.clickPosition === '1'
                        ? '宣传头图下方【免费领取/立即购买】按钮'
                        : this.clickPosition === '2'
                        ? '吸顶横条【免费领取/立即购买】按钮'
                        : '试听播放器下方【立即购买】按钮',
                order_number: '-',
                order_type: '正价课订单',
                order_price: +filterPrice,
                pay_amount: this.classDetail.classPromotionstatus === 'Y' ? this.classDetail.classPrice : this.classDetail.classStdprice,
                class_name: this.classDetail.className,
            });
        },
        /**
         * 立即购买按钮
         */
        trackData() {
            const newMap = new Map().set('all', '全科班').set('single', '单科班');
            const track = {
                course_name: this.data.classtypeName, // 课程名称
                project_id: this.data.projectId, // 项目名称
                class_name: this.classDetail.className,
                subject_name: this.classDetail.subjectName,
                subject_type: newMap.get(this.classType),
                page_type: this.pageType,
                course_type: '系统课',
                entrance_resource:
                    this.clickPosition === '1'
                        ? '宣传头图下方【免费领取/立即购买】按钮'
                        : this.clickPosition === '2'
                        ? '吸顶横条【免费领取/立即购买】按钮'
                        : '试听播放器下方【立即购买】按钮',
            };
            this.$yiguan.track('youlu_click_purchase_system_course', track);
        },
    },
};
</script>

<style lang="less" scoped>
.dialog-shadow {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
}

.dialog-content {
    box-sizing: border-box;
    width: 660px;
    padding: 0 32px 24px;
    background-color: #ffffff;
    border-radius: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.close-btn {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
}

.title-box {
    padding-top: 47px;
    line-height: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .tag {
        display: inline-block;
        height: 24px;
        padding: 0 12px;
        margin-right: 5px;
        font-size: 12px;
        color: #53586c;
        background: #f5f6fa;
        border-radius: 4px;
    }

    .title {
        font-size: 16px;
        font-weight: bold;
        color: #3a3d4b;
    }
}

.price-box {
    padding-bottom: 24px;
    margin: 15px 0 28px;
    line-height: 24px;
    border-bottom: 1px solid #dddddd;

    .name {
        font-size: 14px;
        color: #8d90aa;
        margin-right: 12px;
    }

    .price {
        font-size: 14px;
        font-weight: bold;
        color: #f8323c;
    }

    .number {
        font-size: 24px;
        font-weight: bold;
    }
}

.check-box {
    padding-bottom: 26px;
    display: flex;
    .label {
        flex-shrink: 0;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        color: #3a3d4b;
    }

    .item-box {
        display: flex;
        flex-wrap: wrap;
        max-height: 200px;
        overflow: auto;
    }

    .check-item {
        padding: 0 16px;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 4px;
        line-height: 28px;
        font-size: 14px;
        color: #3a3d4b;
        cursor: pointer;

        &:hover,
        &.active {
            background-color: #ffece8;
            color: #ff2e30;
        }
    }
}

.buy-btn {
    display: block;
    width: 224px;
    height: 46px;
    margin: 0 auto;
    line-height: 26px;
    background: linear-gradient(90deg, #ff6870, #f8323c);
    outline: none;
    border-radius: 8px;
    font-size: 16px;
    color: #ffffff;
    cursor: pointer;
}
</style>
