<template>
    <div class="present">
        <h3 class="present-title">图书赠课</h3>
        <div class="present-detail">
            <p class="present-desc">请填入学习卡号和密码，进行充值</p>
            <div class="class-input">
                <span>学习卡号（序列号）</span>
                <input type="text" placeholder="学习卡号" v-model="lcNo" />
                <span class="pad">学习卡号（序列号）</span>
            </div>
            <div class="class-input">
                <span>密码</span>
                <input type="text" placeholder="密码" v-model="lcPassword" />
                <span class="pad">密码</span>
            </div>
            <p class="promit">如果您购买的是套书，请在24小时内全部使用。</p>
            <input type="button" class="submit-btn" @click="toSubmit()" value="确认提交" />
            <img class="exampleImage" src="./asset/images/lczk_tip.jpg" />
            <p class="attention">注：在购买的图书封面获取学习卡序列号和密码</p>
        </div>
        <learning-card
            :show="classPopup"
            :lcg-classlimit="lcgClasslimit"
            :lcg-content-arry="lcgContentArry"
            @confirm="learncardActive($event)"
            @cancel="kkHide"
        ></learning-card>
    </div>
</template>

<script>
import learningCard from '@/www/components/uc/manager/learningCard';
import '@/api/uc/api.CK2001.active-learning-card.js';
import '@/api/uc/api.CK2002.verify-learning-card';
import '@/api/uc/api.CK2003.query-binding-class';
export default {
    name: 'booksGivings',
    components: {
        learningCard,
    },
    data() {
        return {
            isShow: false,
            lcNo: '',
            lcPassword: '',
            lcId: '', //学习卡唯一标识
            lcgId: '', //学习卡卡组唯一标识
            lcgClasslimit: -1,
            /*lcgContent: {},
            selectattr: [],*/
            lcgContentArry: [],
            /*新增代码*/
            classPopup: false, //选课弹窗列表
        };
    },
    head() {
        return this.$head({
            title: '个人中心_图书赠课_点亮职业人生_优路教育',
            meta: [],
        });
    },
    methods: {
        toSubmit() {
            if (!this.lcNo) {
                this.$baseUI.alert('卡号不能为空');
                return;
            }
            if (!this.lcPassword) {
                this.$baseUI.alert('密码不能为空');
                return;
            }
            this.learncardVerify();
        },
        // 学习卡开班校验
        learncardVerify() {
            this.$niceloo.api.call('uc/verify-learning-card', {
                lcNo: this.lcNo,
                lcPassword: this.lcPassword,
                onsuccess: (res) => {
                    this.lcId = res.lcId; //学习卡唯一标识
                    this.lcgId = res.lcgId; //学习卡卡组唯一标识
                    this.selectClasses();
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //学习卡开卡获取卡组绑定的班级
        /*selectClasses() {
            let params = {
                lcgId: this.lcgId,
            };
            this.$niceloo.api.call('uc/query-binding-class', {
                ...params,
                onsuccess: (res) => {
                    this.lcgClasslimit = res.lcgClasslimit; //限制可选数量
                    this.lcgContent = res.lcgContent || { content: [] }; //卡组可选开通班级
                    if (this.lcgContent.content && this.lcgContent.content.length > 0 && (this.lcgContent.type == 'B' || this.lcgContent.type == 'C')) {
                        this.isShow = true;
                        this.lcgContent.content.forEach((currentValue, index, arr) => {
                            if (this.lcgClasslimit == 0) {
                                this.$set(currentValue, 'active', true);
                            } else {
                                this.$set(currentValue, 'active', false);
                            }
                        });
                    } else {
                        this.$baseUI.alert(`该卡类型为${this.lcgContent.type}，不可开通课程`);
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },*/
        selectClasses() {
            this.$callApi('uc/query-binding-class', {
                lcgId: this.lcgId,
                onsuccess: (res) => {
                    this.lcgContentArry = [];
                    this.lcgClasslimit = res.lcgClasslimit; //限制可选数量
                    if (res.lcgContent.content && res.lcgContent.content.length > 0 && (res.lcgContent.type == 'B' || res.lcgContent.type == 'C')) {
                        res.lcgContent.content.forEach((item) => {
                            let obj = {};
                            obj.projectId = item.projectId;
                            obj.projectName = item.projectName;
                            if (this.lcgClasslimit == 0) {
                                item.active = true;
                            } else {
                                item.active = false;
                                item.disabled = false;
                            }
                            if (this.lcgContentArry.length === 0) {
                                obj.content = [];
                                obj.content.push(item);
                                this.lcgContentArry.push(obj);
                            } else {
                                let isHasProjectId = false;
                                let setIndex = -1;
                                this.lcgContentArry.forEach((value, index) => {
                                    if (value.projectId === item.projectId) {
                                        isHasProjectId = true;
                                        setIndex = index;
                                    }
                                });
                                isHasProjectId && setIndex > -1 && this.lcgContentArry[setIndex].content.push(item);
                                if (!isHasProjectId) {
                                    obj.content = [];
                                    obj.content.push(item);
                                    this.lcgContentArry.push(obj);
                                }
                            }
                        });
                        this.classPopup = true;
                    } else {
                        this.$baseUI.alert(`该卡类型为${res.lcgContent.type}，不可开通课程`);
                    }
                },
                onerror: (err) => {
                    this.$niceloo.api.handleFailure(err);
                },
                oncomplete: () => {},
            });
        },
        kkHide() {
            this.classPopup = false;
        },
        /*async confirm() {
            this.selectattr = [];
            this.lcgContent.content.forEach((val) => {
                if (val.active) {
                    this.selectattr.push(val.classId);
                }
            });
            let classesIds = this.selectattr.join();
            let opencardnum = this.selectattr.length;
            if (this.lcgClasslimit == 0 || (this.lcgClasslimit != 0 && opencardnum > 0 && opencardnum < this.lcgClasslimit + 1)) {
                let params = {
                    lcNo: this.lcNo,
                    lcPassword: this.lcPassword,
                    classesIds,
                    extension: {
                        ...(await this.$PromotionUtil.getClueExtension()),
                        projectId: '',
                        projectCode: '',
                        projectSeocode: '',
                    },
                };
                this.$niceloo.api.call('uc/active-learning-card', {
                    ...params,
                    onsuccess: (res) => {
                        this.show = false;
                        this.$baseUI.confirm({
                            title: '成功',
                            content: '课程已经发放到你的账户中，点击确定即可前往“我的课程”进行学习',
                            showCancel: false,
                            confirm: () => {
                                this.$PageUtil.href('/learningCenter/index/myCourse');
                            },
                        });
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            } else if (opencardnum > this.lcgClasslimit) {
                this.$baseUI.alert(`您的学习卡最多可以开通以下${this.lcgClasslimit}项课程,请勿多选！`);
            } else {
                this.$baseUI.alert('未选择开课的班级，请选择班级！');
            }
        },*/
        // 学习卡激活
        async learncardActive(selectattr) {
            this.$callApi('uc/active-learning-card', {
                lcNo: this.lcNo,
                lcPassword: this.lcPassword,
                classesIds: selectattr.join(),
                extension: {
                    ...(await this.$PromotionUtil.getClueExtension()),
                    projectId: '',
                    projectCode: '',
                    projectSeocode: '',
                    clueLearncardid: this.lcNo,
                },
                onsuccess: (res) => {
                    this.classPopup = false;
                    this.$baseUI.confirm({
                        title: '成功',
                        content: '课程已经发放到你的账户中，点击确定即可前往“我的课程”进行学习!（备注：课程的展示可能会有5分钟延迟，请耐心等待）',
                        showCancel: false,
                        confirm: () => {
                            this.$PageUtil.href('/learningCenter/index/myCourse');
                        },
                    });
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        cancel() {
            this.isShow = false;
        },
    },
};
</script>

<style scoped lang="less">
.present {
    background-color: white;
    .present-title {
        padding: 19px 30px 28px;
        font-size: 16px;
        color: #333;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        font-weight: bold;
    }
    .present-detail {
        padding: 10px 38px 30px;
        font-size: 16px;
        color: #333;
        .class-input {
            margin-top: 16px;
            text-align: center;
            font-size: 14px;
            span {
                color: #53586c;
            }
            input {
                width: 320px;
                padding-left: 30px;
                outline: none;
                border-radius: 8px;
                background-color: #f4f5f8;
                padding-bottom: 16px;
                padding-top: 16px;
                margin-left: 12px;
                margin-right: 12px;
                border: 0;
            }
            .pad {
                visibility: hidden;
            }
        }
        .class-input:first-of-type {
            margin-top: 40px;
        }
        .submit-btn {
            width: 128px;
            height: 40px;
            font-size: 14px;
            color: white;
            background-image: url('./asset/images/bg.png');
            cursor: pointer;
            border-radius: 8px;
            background-size: contain;
            display: block;
            margin-left: auto;
            margin-right: auto;
            margin-top: 40px;
            border: none;
        }
        .promit {
            font-size: 14px;
            color: rgb(255, 70, 70);
            margin: 16px 0 0;
            text-align: center;
        }
        .exampleImage {
            margin-top: 151px;
            height: 294px;
        }
        .attention {
            color: #f8323c;
            padding: 24px 0 90px;
            font-size: 14px;
            text-align: center;
        }
    }
}
.present-desc {
    color: #3a3d4b;
    font-weight: bold;
    margin-top: 64px;
    text-align: center;
}
</style>
