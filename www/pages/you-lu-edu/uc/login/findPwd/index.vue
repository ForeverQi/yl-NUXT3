<template>
    <div>
        <!-- 头部 -->
        <div class="nl_header">
            <div class="nlh_box">
                <div class="nlh_title"></div>
                <div class="nlh_tel"></div>
            </div>
        </div>
        <!-- 内容区 -->
        <div class="nl_mianCon">
            <div class="nlm_tit">
                <router-link to="/uc/login" class="nlm_a">继续登录</router-link>
                <!--                <a href="javascript:void(0);" @click="goLogin" class="nlm_a">继续登录</a>-->
                <span class="nlm_sp">|</span>
                <a href="javascript:void(0);" @click="goHome" class="nlm_a">返回首页</a>
            </div>
            <!--步骤1-->
            <div class="nl_fpdform progress1" v-if="step == 'step1'">
                <div class="nlm_psdtt">
                    <ul>
                        <li class="nlp_lifo active">
                            <span class="nlp_num">1</span>
                            <p class="nlp_p">验证</p>
                        </li>
                        <li class="nlp_lifg">
                            <i class="nlp_fg"></i>
                        </li>
                        <li class="nlp_lifo">
                            <span class="nlp_num">2</span>
                            <p class="nlp_p">重置密码</p>
                        </li>
                        <li class="nlp_lifg">
                            <i class="nlp_fg"></i>
                        </li>
                        <li class="nlp_lifo">
                            <span class="nlp_num">3</span>
                            <p class="nlp_p">完成</p>
                        </li>
                    </ul>
                </div>
                <div class="nlf_con">
                    <p class="nlf_errtip" id="errMsg">{{ errorTip }}</p>
                    <div class="nlf_lab">
                        <i class="tel"></i>
                        <input
                            name="TxtMobile"
                            type="text"
                            maxlength="50"
                            id="TxtMobile"
                            class="nlf_inp"
                            placeholder="请输入手机号码"
                            v-model="findPwdForm.mobile"
                        />
                        <!--<p class="nlf_errtip"><span>手机号不存在，点击</span><a href="" class="link">【注册】</a></p>-->
                        <!--<p id="pMobile" class="nlf_errtip">{{errorTip}}</p>-->
                    </div>
                    <div class="nlf_lab" v-if="findPwdForm.isCaptchaToken">
                        <i class="picYzm"></i>
                        <input
                            name="txtSMSCode_q"
                            autocomplete="off"
                            type="text"
                            placeholder="请输入图形验证码"
                            class="nlf_yzminp input1"
                            v-model="findPwdForm.captchaValue"
                        />
                        <img :src="findPwdForm.imgSrc" class="img-captcha" @click="getCaptchaToken()" />
                    </div>
                    <div class="nlf_lab">
                        <div id="upnlBase">
                            <i class="messYzm"></i>
                            <input
                                name="TxtCode"
                                type="text"
                                maxlength="180"
                                autocomplete="off"
                                id="TxtCode"
                                class="nlf_yzminp"
                                placeholder="请输入短信验证码"
                                v-model="findPwdForm.verifyValue"
                            />
                            <input
                                type="submit"
                                name="btnMobileCode"
                                :value="messageTxt"
                                id="btnMobileCode"
                                class="yzm_btn"
                                :class="isDisabled ? 'gray' : ''"
                                :disabled="isDisabled"
                                @click="sendMessage"
                            />
                        </div>
                        <p class="nlf_errtip"></p>
                    </div>
                    <p id="CodeDiv" style="color: #ed5736; font-size: 14px; margin-top: 5px; line-height: 1.3">
                        {{ messTip }}
                    </p>
                    <div class="nlf_btnbox">
                        <input ref="step2" type="submit" name="NextBtn" value="下一步" @click="next('step2')" id="NextBtn" class="nlf_btn" />
                    </div>
                </div>
            </div>
            <!--步骤2-->
            <div class="nl_fpdform progress2" v-if="step == 'step2'">
                <div class="nlm_psdtt">
                    <ul>
                        <li class="nlp_lifo active pointer">
                            <span class="nlp_num">1</span>
                            <p class="nlp_p">验证</p>
                        </li>
                        <li class="nlp_lifg active">
                            <i class="nlp_fg"></i>
                        </li>
                        <li class="nlp_lifo active">
                            <span class="nlp_num">2</span>
                            <p class="nlp_p">重置密码</p>
                        </li>
                        <li class="nlp_lifg">
                            <i class="nlp_fg"></i>
                        </li>
                        <li class="nlp_lifo">
                            <span class="nlp_num">3</span>
                            <p class="nlp_p">完成</p>
                        </li>
                    </ul>
                </div>
                <div class="nlf_con">
                    <div class="nlf_lab">
                        <span class="psd_sp">新密码：</span>
                        <input
                            name="txtNewPass"
                            :type="types[0].pwdType"
                            maxlength="50"
                            id="txtNewPass"
                            class="fot-1 nlf_psdinp"
                            placeholder="8-20位，数字、字母、特殊字符任意两种"
                            v-model="findPwdForm.pwd"
                        />
                        <i class="eye" :class="types[0].pwdType == 'password' ? '' : 'open'" @click="switchPwdStatus(0)"></i>
                    </div>
                    <div class="nlf_lab">
                        <span class="psd_sp">确认密码：</span>
                        <input
                            name="txtReNewPass"
                            :type="types[1].pwdType"
                            maxlength="180"
                            id="txtReNewPass"
                            class="fot-1 nlf_psdinp"
                            placeholder="请输入确认密码"
                            v-model="findPwdForm.confirmPwd"
                        />
                        <i class="eye" :class="types[1].pwdType == 'password' ? '' : 'open'" @click="switchPwdStatus(1)"></i>
                    </div>
                    <p class="psd_errtip" id="SpanReNewPwd">{{ confirmPwdTip }}</p>
                    <div class="nlf_btnbox">
                        <input ref="step3" type="submit" name="NextBtnPass" value="下一步" @click="next('step3')" id="NextBtnPass" class="nlf_btn" />
                    </div>
                </div>
            </div>
            <!--步骤3-->
            <div class="nl_fpdform progress3" v-if="step == 'step3'">
                <div class="nlm_psdtt">
                    <ul>
                        <li class="nlp_lifo active">
                            <span class="nlp_num">1</span>
                            <p class="nlp_p">验证</p>
                        </li>
                        <li class="nlp_lifg active">
                            <i class="nlp_fg"></i>
                        </li>
                        <li class="nlp_lifo active">
                            <span class="nlp_num">2</span>
                            <p class="nlp_p">重置密码</p>
                        </li>
                        <li class="nlp_lifg active">
                            <i class="nlp_fg"></i>
                        </li>
                        <li class="nlp_lifo active">
                            <span class="nlp_num">3</span>
                            <p class="nlp_p">完成</p>
                        </li>
                    </ul>
                </div>
                <div class="nlf_con">
                    <div class="nlf_succes">
                        <p class="nfs_p">新密码已生效!</p>
                        <p class="nfs_p">
                            <router-link to="/uc/login">
                                <span class="nfs_time" id="jumpTo">{{ fiveCount }}</span>
                                秒后自动返回登录页。
                            </router-link>
                        </p>
                        <p class="nfs_tip">（如果长期未自动返回请手动点击返回登录页）</p>
                    </div>
                    <div class="nlf_btnbox">
                        <a href="javascript:void(0);" @click="$PageUtil.goHome()" class="nlf_btn">返回首页</a>
                    </div>
                </div>
                <input type="hidden" name="hiddPhone" id="hiddPhone" />
            </div>
        </div>
        <!-- 底部版权信息 -->
        <foot></foot>
    </div>
</template>

<script>
import foot from '@/www/components/uc/login/foot';
import '../../../../../../api/uc/api..create-captcha.js';

export default {
    name: 'findPwd',
    components: { foot },
    layout: 'nullLayout',
    data() {
        return {
            step: 'step1',
            findPwdForm: {
                mobile: '',
                verifyValue: '',
                pwd: '',
                confirmPwd: '',
                isCaptchaToken: true, //是否展示图形验证码
                captchaValue: '', //输入图形验证码
                captchaToken: {}, //图形验证码凭证
                imgSrc: '', //图形验证码地址
                verifyToken: '', //凭证
                resetToken: '',
            },
            errorTip: '', //错误提示
            messTip: '', //发送短信提示
            confirmPwdTip: '', //确认密码提示
            captcha: {}, //验证码凭证
            //倒计时
            count: 60, //60s倒计时
            messageTxt: '获取短信验证码',
            isDisabled: false, //按钮置灰
            fiveCount: 6, //5s登录倒计时
            ctime: '',
            types: [{ pwdType: 'password' }, { pwdType: 'password' }],
        };
    },
    mounted() {
        var vm = this;
        //监听回车事件 去登录
        document.onkeydown = function (e) {
            var key = window.event.keyCode;
            if (key == 13) {
                if (vm.step == 'step1') {
                    vm.next('step2');
                } else if (vm.step == 'step2') {
                    vm.next('step3');
                } else if (vm.step == 'step3') {
                    vm.$router.push('/uc/login');
                }
            }
        };
    },
    created() {
        this.getCaptchaToken();
    },
    methods: {
        goHome() {
            this.$PageUtil.href('/');
        },
        goLogin() {
            this.$PageUtil.href('/uc/login');
        },
        //切换密码显示隐藏
        switchPwdStatus(number) {
            if (this.types[number].pwdType == 'password') {
                this.types[number].pwdType = 'text';
            } else {
                this.types[number].pwdType = 'password';
            }
        },
        //发送短信
        sendMessage() {
            let vm = this;
            if (!vm.findPwdForm.mobile.match(/^1[3|4|5|8|7|6|9][0-9]\d{8}$/)) {
                vm.errorTip = '手机号不正确';
                return false;
            }
            if (vm.findPwdForm.isCaptchaToken && vm.findPwdForm.captchaValue == '') {
                vm.errorTip = '图形验证码不能为空';
                return false;
            }
            vm.errorTip = '';
            vm.isDisabled = true;

            //图形验证
            if (vm.findPwdForm.isCaptchaToken) {
                vm.captcha = {
                    captchaToken: vm.findPwdForm.captchaToken,
                    captchaValue: vm.findPwdForm.captchaValue,
                };
                //发送短信
                vm.sendMess();
            }
        },
        //发送短信
        sendMess() {
            let vm = this;
            let params = {
                smsPhone: vm.findPwdForm.mobile,
                smstplNo: '010001',
                captchaData: vm.captcha,
                scene: 'uc_user_pwd_reset',
            };
            this.$callRawApi({
                api: 'mc/msg/sms/verifycode/send',
                params,
            })
                .then((_response) => {
                    let data = _response.getData();
                    console.log('返回的数据', data);

                    //console.log("发送短信：", data);
                    vm.messTip = '短信已发送到您的手机，如果长时间不能收到短信，请联系人工客服：400-861-8800';
                    //倒计时
                    vm.countDown();
                })
                .catch((err) => {
                    if (err.getCode().includes('GB2009')) {
                        this.$baseUI.alert('图形验证码有误，请重新输入');
                    } else {
                        this.$niceloo.api.handleFailure(err);
                    }
                    vm.isDisabled = false;
                    vm.findPwdForm.captchaValue = '';
                    vm.getCaptchaToken();
                });
        },
        //获取 简单验证码 凭证
        getCaptcha(scene, callback) {
            let vm = this;
            let params = {
                scene,
            };
            this.$callRawApi({
                api: 'sc/captcha/captcha',
                params,
            })
                .then((_response) => {
                    let data = _response.getData();
                    console.log('返回的数据', data);

                    callback(null, data);
                })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .catch((data) => {
                    vm.isDisabled = false;
                    callback(data);
                });
        },
        //获取 图形验证码 凭证
        getCaptchaToken() {
            this.$niceloo.api.call('uc/create-captcha', {
                captchaType: 'P', // 验证码类型
                captchaWidth: 140, // 验证码宽度
                captchaHeight: 46, // 验证码高度
                captchaSize: 4, // 验证码长度
                onsuccess: (data) => {
                    this.findPwdForm.captchaToken = data.captchaToken;
                    this.findPwdForm.imgSrc = this.$urlUtils.getViewUrl(data.filePath);
                    this.isDisabled = false;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //倒计时
        countDown() {
            let vm = this;
            vm.isDisabled = true;
            vm.count = vm.count - 1;
            vm.messageTxt = vm.count + '秒后重新发送';
            if (vm.count == 0) {
                vm.messageTxt = '重新发送';
                vm.count = 60;
                vm.isDisabled = false;
                vm.findPwdForm.captchaValue = '';
                vm.getCaptchaToken();
                return;
            }
            vm.ctime = setTimeout(vm.countDown, 1000);
        },
        //5s倒计时
        fiveCountDown() {
            let vm = this;
            vm.fiveCount = vm.fiveCount - 1;
            if (vm.fiveCount == 0) {
                this.$router.push('/uc/login');
                return;
            }
            setTimeout(vm.fiveCountDown, 1000);
        },
        //下一步
        next(nextstep) {
            let vm = this;
            if (nextstep == 'step1') {
                vm.step = nextstep;
            }
            if (nextstep == 'step2') {
                if (!vm.findPwdForm.mobile.match(/^1[3|4|5|8|7|6|9][0-9]\d{8}$/)) {
                    vm.errorTip = '手机号不正确';
                    return false;
                }
                if (vm.findPwdForm.isCaptchaToken && vm.findPwdForm.captchaValue == '') {
                    vm.errorTip = '图形验证码不能为空';
                    return;
                }
                if (vm.findPwdForm.verifyValue == '') {
                    vm.errorTip = '短信验证码不能为空';
                    return;
                }
                vm.$refs.step2.disabled = true;
                vm.$refs.step2.value = '下一步...';

                // 清除状态
                vm.findPwdForm.pwd = '';
                vm.findPwdForm.confirmPwd = '';
                vm.types = [{ pwdType: 'password' }, { pwdType: 'password' }];

                let params = {
                    verifyPhone: vm.findPwdForm.mobile,
                    verifyScene: 'uc_user_pwd_reset',
                    verifyValue: vm.findPwdForm.verifyValue,
                };
                this.$callRawApi({
                    api: 'mc/msg/sms/verifycode/verify',
                    params,
                })
                    .then((_response) => {
                        let data = _response.getData();
                        console.log('返回的数据', data);

                        console.log(data, 440);
                        if (data) {
                            vm.findPwdForm.verifyToken = data;
                            vm.errorTip = '';
                            vm.step = nextstep;
                            vm.$refs.step2.value = '下一步';
                            vm.$refs.step2.disabled = false;
                        }
                    })
                    .catch((err) => {
                        this.$niceloo.api.handleFailure(err);
                        return Promise.reject(err);
                    })
                    .catch((data) => {
                        vm.errorTip = data.getAttachedData().getMsg();
                        // this.$baseUI.alert(data.getAttachedData().getMsg());
                        vm.$refs.step2.value = '下一步';
                        vm.$refs.step2.disabled = false;
                    });
            }
            if (nextstep == 'step3') {
                if (vm.findPwdForm.pwd == '') {
                    vm.confirmPwdTip = '请输入密码';
                    return;
                }
                if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/.test(vm.findPwdForm.pwd)) {
                    vm.confirmPwdTip = '密码格式为8-20位，包含字母、数字、特殊符号的两种及以上组合 ';
                    return;
                }
                if (vm.findPwdForm.pwd.includes("'") || vm.findPwdForm.pwd.includes('<')) {
                    vm.confirmPwdTip = '密码格式为8-20位，包含字母、数字、特殊符号的两种及以上组合 ';
                    return;
                }
                if (vm.findPwdForm.confirmPwd == '') {
                    vm.confirmPwdTip = '请输入确认密码';
                    return;
                }
                if (vm.findPwdForm.confirmPwd.length < 6 || vm.findPwdForm.confirmPwd.length > 20) {
                    vm.confirmPwdTip = '请输入确认密码';
                    return;
                }
                if (vm.findPwdForm.pwd != vm.findPwdForm.confirmPwd) {
                    vm.confirmPwdTip = '两次输入的密码不一致';
                    return;
                }
                vm.$refs.step3.disabled = true;
                vm.$refs.step3.value = '下一步...';

                let params = {
                    userMobile: vm.findPwdForm.mobile,
                    userEmail: '',
                    userFlag: 'S',
                    userLoginpwd: vm.findPwdForm.pwd,
                    verify: vm.findPwdForm.verifyToken,
                    resetToken: vm.findPwdForm.resetToken,
                };
                this.$callRawApi({
                    api: 'uc/user/pwd/reset',
                    params,
                })
                    .then((_response) => {
                        let data = _response.getData();
                        console.log('返回的数据', data);

                        console.log(data, 502);
                        vm.$refs.step3.value = '下一步';
                        vm.$refs.step3.disabled = false;
                        vm.step = nextstep;
                        //5s倒计时
                        vm.fiveCountDown();
                    })
                    .catch((data) => {
                        vm.$refs.step3.value = '下一步';
                        vm.$refs.step3.disabled = false;
                        if (data && data.getAttachedData() && data.getAttachedData().getResultCode() == '4001') {
                            vm.confirmPwdTip = data.getAttachedData().getMsg();
                            vm.findPwdForm.resetToken = data.data.resetToken;
                            // return false;
                        } else {
                            this.$baseUI.confirm({
                                title: '提示',
                                content: data.getAttachedData().getMsg(),
                                showCancel: false,
                                confirmText: '确定',
                                confirm: () => {
                                    vm.confirmPwdTip = '';
                                    clearTimeout(vm.ctime);
                                    vm.messageTxt = '获取短信验证码';
                                    vm.count = 60;
                                    vm.isDisabled = false;
                                    vm.findPwdForm.verifyValue = '';
                                    vm.findPwdForm.captchaValue = '';
                                    vm.getCaptchaToken();
                                    vm.step = 'step1';
                                },
                            });
                        }
                    });
            }
        },
    },
};
</script>
<style>
@import './css/login.css';
</style>
<style scoped lang="less">
.progress2 {
    input.nlf_psdinp {
        box-sizing: border-box;
        width: 283px;
        padding-right: 33px;
        font-size: 13px;
    }
    .psd_errtip {
        left: 356px;
        text-align: center;
        width: 391px;
    }
}
</style>
