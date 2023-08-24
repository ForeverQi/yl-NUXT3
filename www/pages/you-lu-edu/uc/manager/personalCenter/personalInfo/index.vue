<template>
    <div class="info-wrap">
        <div class="top-tab-container">
            <tab :data="tabArray" :active-index="activeIndex" @select="selectTab"></tab>
        </div>
        <div class="personal-information-wrap">
            <div class="head-portrait-wrap">
                <div class="portrait-container" @click="isShowAvatarPicker = true">
                    <img class="portrait" v-if="userInfo.userAvatar" :src="portrait" />
                    <img class="portrait" v-else :src="defaultAvatar" />
                    <img class="portrait-edit" src="./asset/images/edit.png" />
                </div>
                <div class="edit-button-container" v-if="isEditInfo">
                    <input type="button" class="button save-info" @click="savePersonalInfo()" value="保存" />
                    <!-- <input type="button" class="button change-portrait" @click="changeHead()" :value="uploadLabel" /> -->
                    <vb-upload-img-auto v-show="false" ref="vbUpload" @success="upImgSuccess" limit="1" @uploading="upImgUploading" @error="upImgError" />
                </div>
                <input v-else type="button" class="edit-icon" @click="editPersonalInfo" value="编辑" />
            </div>
            <div class="info-container">
                <div class="info-item">
                    <div class="info-name">&emsp;昵称：</div>
                    <div class="info-value" v-show="!isEditInfo">{{ userInfo.userNickname }}</div>
                    <input
                        class="change-input"
                        placeholder="请输入昵称（最多输入10个字符）"
                        type="text"
                        v-model="userInfoCopy.userNickname"
                        v-show="isEditInfo"
                        maxlength="10"
                    />
                </div>
                <div class="info-item">
                    <div class="info-name">个性签名：</div>
                    <div class="info-value" v-show="!isEditInfo">{{ userInfo.userSignature }}</div>
                    <input
                        class="change-input"
                        type="text"
                        v-model="userInfoCopy.userSignature"
                        v-show="isEditInfo"
                        placeholder="请输入个性签名（最多输入200个字符）"
                        maxlength="200"
                    />
                </div>
                <div class="info-item">
                    <div class="info-name">优路号：</div>
                    <div class="info-value">{{ userInfo.userYoulunum }}</div>
                    <!-- <input class="change-input" type="text" v-model="userInfoCopy.userSignature" v-show="isEditInfo" /> -->
                </div>
                <div class="info-item">
                    <div class="info-name">出生年月：</div>
                    <div class="info-value" v-show="!isEditInfo">{{ userInfo.userBirthday }}</div>
                    <div class="gender-wrap" v-show="isEditInfo">
                        <vb-calendar
                            type="date"
                            @dateChage="dateChage"
                            :default-date="userInfoCopy.userBirthday ? new Date(userInfoCopy.userBirthday).getTime() : 0"
                            class="birthdayDate"
                        />
                    </div>
                </div>
                <div class="info-item">
                    <div class="info-name">&emsp;性别：</div>
                    <div class="info-value" v-show="!isEditInfo">{{ userInfo.userGender | gender }}</div>
                    <div class="radio-wrap" v-show="isEditInfo">
                        <label>
                            <input class="input-radio" type="radio" name="gender" value="M" v-model="userInfoCopy.userGender" />
                            男
                        </label>
                        <label>
                            <input class="input-radio" type="radio" name="gender" value="F" v-model="userInfoCopy.userGender" />
                            女
                        </label>
                    </div>
                </div>
                <div class="info-item">
                    <div class="info-name">毕业院校：</div>
                    <div class="info-value" v-show="!isEditInfo">{{ userInfo.userEduschool }}</div>
                    <input
                        class="change-input"
                        type="text"
                        v-model="userInfoCopy.userEduschool"
                        v-show="isEditInfo"
                        placeholder="请输入毕业院校（最多输入50个字符）"
                        maxlength="50"
                    />
                </div>
                <div class="info-item">
                    <div class="info-name">&emsp;专业：</div>
                    <div class="info-value" v-show="!isEditInfo">{{ userInfo.userEdumajor }}</div>
                    <input
                        class="change-input"
                        type="text"
                        v-model="userInfoCopy.userEdumajor"
                        v-show="isEditInfo"
                        placeholder="请输入专业（最多输入50个字符）"
                        maxlength="50"
                    />
                </div>
                <div class="info-item">
                    <div class="info-name">工作单位：</div>
                    <div class="info-value" v-show="!isEditInfo">{{ userInfo.userWorkunit }}</div>
                    <input
                        class="change-input"
                        type="text"
                        v-model="userInfoCopy.userWorkunit"
                        v-show="isEditInfo"
                        placeholder="请输入工作单位（最多输入50个字符）"
                        maxlength="50"
                    />
                </div>
                <div class="info-item">
                    <div class="info-name">&emsp;城市：</div>
                    <div class="info-value" v-show="!isEditInfo">{{ userInfo.cityNames }}</div>
                    <div class="city-list" v-show="isEditInfo">
                        <vb-province-area @areaChange="areaChange" :area-show="false" :default-area="defaultArea" />
                    </div>
                </div>
            </div>
        </div>
        <div class="personal-information-title">收货地址</div>
        <ul class="nod-sjbox">
            <li
                class="ylad-item ylad-item-c"
                :class="{ 'ylad-item-active': item.active }"
                @click="choseAddress(item)"
                v-for="item in addressInfo"
                :key="item.a"
            >
                <div class="ylad-tt">
                    <span class="yylad-name" :title="item.recvaddrName">{{ item.recvaddrName }}</span>
                    <span class="ylad-tel">{{ item.recvaddrPhone }}</span>
                    <span class="default" v-show="item.recvaddrDefstatus == 'Y'">默认</span>
                </div>
                <div class="ylad-addr">
                    <p class="area">{{ item.provinceName + ' ' + item.cityName + ' ' + item.regionName }}</p>
                    <p class="addrD" :title="item.recvaddrAddress">{{ item.recvaddrAddress }}</p>
                </div>
                <div class="ylad-edit">
                    <input type="button" class="addr-btn delete" @click="deleteAddress(item)" value="删除" />
                    <input type="button" class="addr-btn edit" @click="addAddress(item)" value="修改" />
                </div>
                <img v-show="item.active" src="./asset/images/check.png" alt="" class="check-icon" />
            </li>
            <li class="ylad-inpbox ylad-item-c" @click="addAddress()">
                <img src="./asset/images/add.png" alt="" class="icon" />
                <span>添加收货地址</span>
            </li>
        </ul>

        <!-- <div class="personal-information-title">
            账号注销
            <span class="res-text" v-if="auditStatus === 'REJ'">注意：亲爱的用户您好，您之前提交的注销申请未通过系统审核，如有疑问请致电：400-861-8800</span>
        </div>
        <div class="cancellation-wrap">
            <p class="cancellation-wrap-tip">温馨提示：账号注销后，您的账号将会永久失效且不可恢复，视为自动放弃部分权限和服务。请谨慎操作！</p>
            <input type="button" class="span-btn" v-if="userInfo.userUnsubscribeStatus === 'A'" @click="jumpLogoutExamine" value="查看注销流程" />
            <input type="button" class="span-btn" v-else @click="jumpLogoutConfirm" value="注销账号" />
        </div> -->
        <div>
            <edit-address ref="editAddress" @saveAddress="saveAddress" @editAddress="editAddress"></edit-address>
        </div>
        <maskConfirm
            v-if="isShowDeleteDialog"
            :show-cancel="true"
            :content="'确定要删除收货地址吗？'"
            :cancel-text="'取消'"
            :confirm-text="'确定'"
            @ok="sureDeleteAddress"
            @cancel="cancelDeleteAddress"
        ></maskConfirm>
        <!-- <logoutAuditTips /> -->

        <!-- <maskConfirm v-if="isShowDialog" :title="'提示'" :content="tipMessage" :confirm-text="'确定'" @ok="closeDialog"></maskConfirm> -->

        <avatar-picker v-if="isShowAvatarPicker" :show.sync="isShowAvatarPicker"></avatar-picker>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import '@/api/uc/api.UC0005.save-user-info.js';
import '@/api/uc/api.BD1003.bd-recvaddr-edit.js';
import '@/api/uc/api.BD1004.bd-recvaddr-delete.js';
import '@/api/uc/api.BD1005.bd-recvaddr-list.js';
import '@/api/uc/api.UC0028.uc-recvaddr-add.js';
import '@/api/uc/api.BD1002.bd-recvaddr-add.js';
import { tabData } from './js/data.js';
import Tab from '@/www/components/tab/tabX/index.vue';
import vbCalendar from '@/www/components/personalCenter/vbCalendar/vbCalendar/index.vue';
import vbProvinceArea from '@/www/components/personalCenter/vbProvinceArea/vbProvinceArea/index.vue';
import editAddress from '@/www/components/personalCenter/editAddress/edit-address/index.vue';
import vbUploadImgAuto from '@/www/components/personalCenter/upLoadImageAuto/upLoadImageAuto/index.vue';
import maskConfirm from '@/www/components/personalCenter/maskConfirm/maskConfirm/index.vue';
import loginRegisterTrack from '@/plugins/yiguan/login-register-track.js';
import AvatarPicker from '@/www/components/personalCenter/avatar-picker/index.vue';
// import logoutAuditTips from '@/www/components/uc/manager/logout/logoutAuditTips/index.vue';

// import User from '~/utils/user.js';
export default {
    components: {
        Tab,
        editAddress,
        vbCalendar,
        vbProvinceArea,
        vbUploadImgAuto,
        maskConfirm,
        // logoutAuditTips,
        AvatarPicker,
    },
    filters: {
        gender(str) {
            if (!str) {
                return str;
            }
            return str == 'M' ? '男' : '女';
        },
    },
    data() {
        return {
            tabArray: tabData, // tab按钮
            activeIndex: 0, // 选中的tab
            isEditInfo: false, // 是否为修改我的信息状态
            userInfo: {}, // 我的信息
            userInfoCopy: {}, // 我的信息备份数据,
            addressInfo: [], // 我的信息地址信息
            defaultArea: {}, // 我的信息地址的默认值用户工作单位名称格式不正确
            isEditing: false, // 是否为信息修改中
            message: null, // message
            isShowDeleteDialog: false, // 是否展示删除弹窗
            deleteAddressData: {}, // 删除的地址数据
            auditStatus: '',
            isUploading: false,
            defaultAvatar: require('./asset/images/avatar.png'),
            isShowAvatarPicker: false,
        };
    },
    head() {
        return this.$head({
            title: '个人中心_个人信息_点亮职业人生_优路教育',
            meta: [],
        });
    },
    computed: {
        portrait() {
            if (this.userInfo && this.userInfo.userAvatar) {
                return this.$urlUtils.getViewUrl(this.userInfo.userAvatar);
            }
            return '';
        },
        uploadLabel() {
            return this.isUploading ? '上传中...' : '更换头像';
        },
    },
    watch: {
        '$store.state.common.userLogin.popUpLogin': {
            handler() {
                // 登录状态发生变化更新用户信息
                if (typeof ylPlugin !== 'undefined') {
                    ylPlugin.login.getUser().then((userData) => {
                        if (userData) {
                            userData.cityNames = this.userInfo?.cityNames ?? '';
                            this.userInfo = userData;
                        }
                    });
                }
            },
            immediate: true,
        },
    },
    async mounted() {
        if (this.$User.getToken()) {
            this.userInfo = await this.$User.getUser();
            this.getLogoutStatus(this.userInfo.userId);
            this.isLoginFlag = true;
        }
        this.showWxBindDialog();
        this.initArea();
        this.getUserAddress();
    },

    methods: {
        ...mapMutations('logout', ['setUserInfo']),
        ...loginRegisterTrack,
        getLogoutStatus(userId) {
            this.$callRawApi({
                api: 'ws/cancel/auditStatus/userId',
                params: { userId },
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    let res = _reponse.getData();
                    this.auditStatus = res.auditStatus;
                    if (res.auditStatus === 'REJ') {
                        this.userInfo.userUnsubscribeStatus = 'N';
                        this.setUserInfo(JSON.stringify(this.userInfo));
                    }
                });
        },
        handleUserNicknameInp() {
            if (this.userInfo.userNickname && this.userInfo.userNickname.length > 10) {
                this.userInfo.userNickname = this.userInfo.userNickname.slice(0, 10);
            }
        },
        jumpLogoutConfirm() {
            this.$router.push({
                path: '/uc/manager/personalCenter/logoutConfirm',
            });
        },
        jumpLogoutExamine() {
            this.$router.push({
                path: '/uc/manager/personalCenter/logoutExamine',
            });
        },
        //tab切换
        selectTab(index) {
            if (index === 0) {
                return false;
            } else if (index === 1) {
                this.$router.replace({
                    path: `/uc/manager/personalCenter/accountSafe`,
                });
            }
        },
        //初始化地址数据
        initArea() {
            //重置默认地址
            let cityCode = '0';
            if (this.userInfo.userAreacode && this.userInfo.userAreacode.indexOf('0000') == -1) {
                cityCode = this.userInfo.userAreacode;
            }
            this.defaultArea = {
                provinceCode: this.userInfo.userAreacode ? this.userInfo.userAreacode.replace(/^(.{2}).*/, '$1') + '0000' : '',
                cityCode,
            };
        },
        //保存用户个人信息
        savePersonalInfo() {
            if (this.isUploading) {
                return this.$baseUI.alert('头像上传中...');
            }
            niceloo.api.call('uc/save-user-info', {
                ...this.userInfoCopy,
                onsuccess: async () => {
                    try {
                        await this.$User.updateUserInfo();
                        this.userInfo = await this.$User.getUser();
                        this.initArea();
                        this.setUserInfo(JSON.stringify(this.userInfo));
                        this.userInfo = { ...this.userInfoCopy };
                        // this.$bus.$emit('updateUserInfo');
                        this.$store.commit('common/userLogin/setPopUpLogin');
                    } catch (error) {
                        this.userInfo = {};
                    }
                },
                onerror: (fail) => {
                    this.$baseUI.alert(fail.getAttachedData().getMsg());
                },
                oncomplete: () => {
                    this.isEditInfo = false;
                },
            });
        },
        //修改用户个人信息
        editPersonalInfo() {
            this.userInfoCopy = { ...this.userInfo };
            this.isEditInfo = true;
            this.isUploading = false;
        },
        //添加收货地址
        addAddress(item) {
            //打开收货地址弹窗
            this.$refs.editAddress.open(item);
        },
        //删除收货地址，展示二次确认删除弹窗
        deleteAddress(data) {
            this.deleteAddressData = data;
            this.isShowDeleteDialog = true;
        },
        //确认删除收货地址
        sureDeleteAddress() {
            niceloo.api.call('bd/bd-recvaddr-delete', {
                ...this.deleteAddressData,
                onsuccess: () => {
                    this.getUserAddress();
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.isShowDeleteDialog = false;
                    this.deleteAddressData = {};
                },
            });
        },
        //取消删除收货地址
        cancelDeleteAddress() {
            this.deleteAddressData = {};
            this.isShowDeleteDialog = false;
        },
        //用户年龄发生改变
        dateChage(date) {
            //年龄变化
            this.userInfoCopy.userBirthday = date;
        },
        //修改用户头像
        changeHead() {
            //点击修改头像
            this.$refs.vbUpload.inputClick();
        },
        /**
         * @description 修改用户收货地址
         * @data 地址数据
         */
        editAddress(data) {
            if (this.isEditing) {
                return;
            }
            this.isEditing = true;
            niceloo.api.call('bd/bd-recvaddr-edit', {
                ...data,
                clientType: 'P',
                onsuccess: () => {
                    this.$refs.editAddress.close();
                    this.getUserAddress();
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.isEditing = false;
                },
            });
        },
        //获取用户收获地址
        getUserAddress() {
            niceloo.api.call('bd/bd-recvaddr-list', {
                onsuccess: ({ data }) => {
                    this.addressInfo = data || [];
                    if (this.addressInfo.length > 0) {
                        for (let i = 0; i < this.addressInfo.length; i++) {
                            if (this.addressInfo[i].recvaddrDefstatus == 'Y') {
                                this.choseAddress(this.addressInfo[i]);
                                return;
                            }
                        }
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        /**
         * @description 选择收货地址
         * @item 地址数据
         */
        choseAddress(item) {
            this.addressInfo.forEach((val) => {
                this.$set(val, 'active', false);
            });
            item.active = true;
        },
        /**
         * @description 保存收货地址
         * @data 地址数据
         */
        saveAddress(data) {
            if (this.isEditing) {
                return;
            }
            const isRepeatAddress = this.verifitRepeatAddress(data);
            if (isRepeatAddress) {
                this.tooltip('warning', '该地址已存在，请勿重复提交', 300);
                return;
            }
            this.isEditing = true;
            niceloo.api.call('uc/uc-recvaddr-add', {
                ...data,
                onsuccess: () => {
                    niceloo.api.call('bd/bd-recvaddr-add', {
                        ...data,
                        onsuccess: () => {
                            this.$refs.editAddress.close();
                            this.getUserAddress();
                        },
                        onerror: this.$niceloo.api.handleFailure,
                        oncomplete: () => {
                            this.isEditing = false;
                        },
                    });
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.isEditing = false;
                },
            });
        },
        /**
         * @description 文字提示
         * @type 文字提示的类型
         * @message 文字提示的内容
         * @time 展示的时间
         */
        tooltip(type, message = '', time = 300) {
            // 为了保证一个时间段内只有一个message
            const messageMap = new Map([
                ['warning', this.$message.warning],
                ['success', this.$message.success],
                ['info', this.$message.info],
                ['error', this.$message.error],
            ]);
            this.message = messageMap.get(type)({
                message,
                offset: time,
                onClose: () => {
                    this.message = null;
                },
            });
        },
        /**
         * @description 校验地址是否重复
         * @data 需要校验的地址数据
         */
        verifitRepeatAddress(data) {
            let isRepeatAddress = false;
            this.addressInfo.forEach((item) => {
                if (
                    data.recvaddrName == item.recvaddrName &&
                    data.recvaddrPhone == item.recvaddrPhone &&
                    data.recvaddrAddress == item.recvaddrAddress &&
                    data.recvaddrProvince == item.recvaddrProvince &&
                    data.recvaddrCity == item.recvaddrCity &&
                    data.recvaddrRegion == item.recvaddrRegion
                ) {
                    isRepeatAddress = true;
                }
            });
            return isRepeatAddress;
        },
        /**
         * @description 改变地址
         * @areaData 地址数据
         */
        areaChange(areaData) {
            this.userInfoCopy.userAreacode = areaData.cityCode != 0 ? areaData.cityCode : areaData.provinceCode;
            this.$set(this.userInfo, 'cityNames', areaData.provinceName + ' ' + areaData.cityName);
        },
        /**
         * @description 成功上传图片
         */
        upImgSuccess({ response, fileList }) {
            //上传头像成功
            if (response && response.length > 0) {
                let imgSrc = response[0].filePath;
                this.userInfoCopy.userAvatar = imgSrc;
            }
            this.isUploading = false;
        },
        upImgUploading() {
            this.isUploading = true;
        },
        upImgError() {
            this.isUploading = false;
        },
        async showWxBindDialog() {
            const storageDate = this.$storage.get('wx3MiniprogramBind') || {};
            let currtDate = `${new Date().getMonth()}-${new Date().getDate()}`;
            if (storageDate && storageDate === currtDate) {
                return;
            }
            let isBind = await ylPlugin.login.isWx3MiniprogramBoundByCurrentUser();
            if (!isBind) {
                this.$storage.set('wx3MiniprogramBind', currtDate);
            }
            ylPlugin.login.tipBindWx3MiniprogramIfNeeded({
                onstatechange: (state) => {
                    if (state.isBound) {
                        this.$Message.success('绑定成功');
                        this.trackWxMiniprogrameBind('个人中心-个人中心页面');
                    }
                    if (state.isQRCodeScanned) {
                        this.trackMiniprogrameBindScan('个人中心-个人中心页面');
                    }
                    if (state.isBound === 'fail') {
                        this.trackWxMiniprogrameBind('个人中心-个人中心页面', false);
                    }
                },
            });
        },
    },
};
</script>
<style lang="less" scoped>
.info-wrap {
    width: 100%;
}
.cancellation-wrap {
    background-color: white;
    padding: 20px 40px 40px 54px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #77798d;

    .span-btn {
        color: #3a3d4b;
        background-color: #f5f6fa;
        padding: 9px 38px 9px 22px;
        border-radius: 8px;
        background-image: url('./asset/images/right.png');
        background-repeat: no-repeat;
        background-size: 10px 11px;
        background-position: right 13px top 13px;
        cursor: pointer;
    }
}

.personal-information-title {
    padding: 20px 38px 0;
    background-color: white;
    font-size: 16px;
    color: #333;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: bold;
    .res-text {
        font-size: 12px;
        color: #f8323c;
        font-weight: normal;
        margin-left: 20px;
    }
}
.personal-information-wrap {
    padding: 0px 38px;
    box-sizing: border-box;
    background-color: #fff;
    height: 412px;
    .head-portrait-wrap {
        height: 147px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .portrait-container {
            display: inline-block;
            cursor: pointer;
            position: relative;
            .portrait-edit {
                width: 18px;
                height: 18px;
                position: absolute;
                bottom: 10px;
                right: 0;
            }
        }

        .portrait {
            width: 78px;
            height: 78px;
            border-radius: 39px;
        }
        .edit-button-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .button {
                width: 120px;
                height: 32px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                border-radius: 8px;
            }
            .save-info {
                background: linear-gradient(90deg, #ff4436, #f96b54);
                color: #fff;
                margin-bottom: 10px;
            }
            .change-portrait {
                border: 1px solid #de2e26;
                color: #de2e26;
                background-color: white;
            }
        }
        .edit-icon {
            color: #3a3d4b;
            background-color: #f5f6fa;
            padding: 9px 38px 9px 22px;
            border-radius: 8px;
            background-image: url('./asset/images/right.png');
            background-repeat: no-repeat;
            background-size: 10px 11px;
            background-position: right 13px top 13px;
            cursor: pointer;
        }
    }
    .info-container {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        color: #3a3d4b;
        .info-item {
            color: #77798d;
            font-size: 14px;
            display: flex;
            align-items: center;
            padding: 8.5px 14px;
        }
        .info-name {
            padding-top: 5.5px;
            padding-bottom: 5.5px;
        }
        .info-value {
            width: 254px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #3a3d4b;
        }
    }
}
.changeBtns {
    .change-save,
    .change-head {
        width: 118px;
        height: 30px;
        border: 1px solid #de2e26;
        height: 32px;
        color: #de2e26;
        line-height: 30px;
        text-align: center;
        position: relative;
        cursor: pointer;
        border-radius: 2px;
    }
    .change-save {
        width: 120px;
        height: 32px;
        background: linear-gradient(90deg, #ff4436 0%, #f96b54 100%);
        color: #fff;
        border: none;
        margin-bottom: 10px;
    }
}
.change-input {
    width: 232px;
    border: 1px solid #eef0f6;
    border-radius: 4px;
    outline: none;
    padding: 10px 10px;
}
.radio-wrap {
    width: 232px;
    display: flex;
    align-items: center;
    label {
        display: flex;
        align-items: center;
        margin-right: 15px;
        cursor: pointer;
    }
}
.input-radio {
    -webkit-appearance: radio;
    margin-right: 5px;
}
.personal-top {
    padding: 34px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
    .person-Img {
        height: 78px;
        width: 78px;
        &.active {
            border-radius: 50%;
        }
    }
    .edit-icon {
        width: 16px;
        height: 16px;
        background: url('./asset/images/xy_icon2.png') no-repeat;
        background-position: -16px 0;
        cursor: pointer;
    }
}
.city-list {
    display: flex;
    width: 254px;
    justify-content: space-between;
    align-items: center;
    .city-select {
        border: 1px solid #d8d8d8;
        min-height: 30px;
        border-radius: 2px;
        outline: none;
        width: 118px;
    }
}
.nod-sjbox {
    background-color: #fff;
    padding: 24px 0px 0px 38px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
}
.ylad-box {
    width: 264px;
    display: inline-block;
}
.ylad-item {
    width: 250px;
    height: 196px;
    background-size: 238px 148px;
    position: relative;
    border: 1px solid #eef0f6;
    border-radius: 4px;
    display: inline-block;
}
.ylad-item-active {
    background-color: #fffdfd;
    border: 1px #ff2e30 solid;
}

.ylad-item-c + .ylad-item-c {
    margin: 0 15px 20px;
}
.ylad-edit {
    text-align: center;
}
.ylad-item .addr-btn {
    font-size: 14px;
    border-radius: 8px;
    padding: 6.5px 16px 6.5px 40px;
    cursor: pointer;
}

.ylad-item .edit {
    color: #ff2e30;
    background: url('./asset/images/myeditor.png') no-repeat;
    border: 0.5px solid #ff2e30;
    background-size: 12px 12px;
    background-position: left 16px center;
    margin-left: 15px;
}
.ylad-item .delete {
    color: #77798d;
    background: url('./asset/images/delete@2x.png') no-repeat;
    border: 0.5px solid #d0d4df;
    background-size: 12px 12px;
    background-position: left 16px center;
}
.ylad-item .default {
    background: rgba(255, 46, 48, 0.1);
    color: #ff2e30;
    font-size: 12px;
    border-radius: 4px;
    padding: 3px 12px;
    margin-left: 12px;
}

.check-icon {
    width: 16px;
    height: 16px;
    position: absolute;
    top: -1px;
    right: 0;
}
.ylad-tt {
    border-bottom: 1px solid #f5f6f9;
    position: relative;
    display: flex;
    align-items: center;
    padding: 16px 20px;
}
.ylad-tt .edit {
    width: 16px;
    height: 16px;
    background-position: -16px 0;
    position: absolute;
    right: 0;
    top: 15px;
    cursor: pointer;
    display: none;
}
.ylad-item.active .ylad-tt .edit {
    display: inline-block;
}
.yylad-name {
    font-size: 14px;
    color: #3a3d4b;
    margin-right: 5px;
    width: 50px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.ylad-tel {
    font-size: 14px;
    color: #77798d;
    flex-grow: 1;
}
.ylad-addr {
    padding: 24px 20px;
}
.ylad-addr .area {
    font-size: 16px;
    color: #3a3d4b;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 195px;
    font-weight: bold;
    white-space: nowrap;
}
.ylad-addr .addrD {
    font-size: 14px;
    color: #77798d;
    width: 195px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 6px;
}

.ylad-inpbox {
    width: 240px;
    height: 196px;
    margin: 0 0px 20px 0px;
    cursor: pointer;
    border: 1px solid #eef0f6;
    border-radius: 4px;
    color: #77798d;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    .icon {
        width: 32px;
        height: 32px;
        margin-bottom: 12px;
    }
}

.wsfo-tit {
    line-height: 50px;
    padding: 0 15px;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
    text-align: center;
    height: 50px;
}
.wsfo-tit {
    span {
        color: #333333;
        font-size: 18px;
    }
}
.wsfo-tit {
    .wsfo_close {
        display: inline-block;
        width: 15px;
        height: 15px;
        background: url('./asset/images/close1.png') no-repeat center center;
        cursor: pointer;
        position: absolute;
        right: 15px;
        top: 17px;
    }
}

.wsfo-bm {
    text-align: center;
    padding: 5px 0 30px;
}
.wsfo-bm {
    .wsfo-submit {
        display: inline-block;
        line-height: 35px;
        min-width: 120px;
        padding: 0 10px;
        background: #f34e40;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        border-radius: 2px;
        margin: 0 10px;
        border: none;
        outline: none;
    }
}
.wsfo-bm {
    .wsfo-cancel {
        display: inline-block;
        line-height: 35px;
        min-width: 120px;
        padding: 0 10px;
        background: #cccccc;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        border-radius: 2px;
        margin: 0 10px;
        border: none;
        outline: none;
    }
}
.gender-wrap {
    width: 254px;
    height: 28px;
}

.birthdayDate /deep/ .mycontainer_input {
    min-height: 35px;
    border: 1px solid #eef0f6;
    border-radius: 4px;
}

.areaWrap /deep/ select {
    min-height: 35px;
    border: 1px solid #eef0f6;
    border-radius: 4px;
    padding-left: 10px;
    padding-right: 10px;
}
</style>
