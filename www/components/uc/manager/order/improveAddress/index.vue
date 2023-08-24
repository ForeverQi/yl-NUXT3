<template>
    <!-- 完善地址  -->
    <div class="wrap" v-show="show">
        <div class="addWrap"></div>
        <div class="content">
            <form name="addressForm">
                <div class="improveWrap">
                    <div class="improveTitle">{{ addressList.length > 0 ? '确认收货信息' : '完善收货信息' }}</div>
                    <div class="close" @click="close"></div>
                    <div class="edit" @click="editShow = !editShow" v-show="!editShow">修改</div>
                    <div class="subheading">课程包含的资料将会邮寄至您手中，请认真填写</div>

                    <div class="inputWrap">
                        <div class="inputClass">姓名</div>
                        <input
                            class="inputCont"
                            name="name"
                            v-show="editShow"
                            type="text"
                            placeholder="请输入收货人姓名"
                            v-model="defaultAddress.recvaddrName"
                            @input="singleCheck({ name: defaultAddress.recvaddrName })"
                        />
                        <div class="divCont" v-show="!editShow">{{ defaultAddress.recvaddrName }}</div>
                    </div>
                    <div class="inputWrap">
                        <div class="inputClass">联系电话</div>
                        <input
                            class="inputCont"
                            name="mobile"
                            v-show="editShow"
                            type="text"
                            placeholder="请输入联系电话"
                            v-model="defaultAddress.recvaddrPhone"
                            @input="singleCheck({ mobile: defaultAddress.recvaddrPhone })"
                        />
                        <div class="divCont" v-show="!editShow">{{ defaultAddress.recvaddrPhone }}</div>
                    </div>
                    <div class="inputWrap">
                        <div class="inputClass">所在地区</div>
                        <div class="areaWrap" name="area">
                            <vb-province-area v-show="editShow" @areaChange="areaChange" :default-area="defaultArea" :line-show="false" />
                            <div class="divCont" style="padding-left: 0" v-show="!editShow">
                                {{ (defaultAddress.provinceName || '') + ' ' + (defaultAddress.cityName || '') + ' ' + (defaultAddress.regionName || '') }}
                            </div>
                        </div>
                    </div>
                    <div class="inputWrap">
                        <div class="inputClass">详细地址</div>
                        <input
                            class="inputCont"
                            name="address"
                            type="text"
                            v-show="editShow"
                            placeholder="请输入详细信息"
                            v-model="defaultAddress.recvaddrAddress"
                            @input="singleCheck({ address: defaultAddress.recvaddrAddress })"
                        />
                        <div class="divCont" style="width: 75%; padding-left: 0; margin-right: 10px" :title="defaultAddress.recvaddrAddress" v-show="!editShow">
                            {{ defaultAddress.recvaddrAddress }}
                        </div>
                    </div>

                    <div class="retract-wrapper">
                        <div class="retract" v-show="addressList.length > 0" @click="upIconFun()">
                            {{ upIconTitle }}
                            <span class="retIcon" :class="{ active: retIconSwitch }"></span>
                        </div>
                        <!--                    <div class="retract" v-show='addressList.length > 0' @click='retIconSwitch = !retIconSwitch'>收起地址<span class="retIcon" :class="{active:retIconSwitch}"></span></div>-->
                        <label :style="`display: inline-block; margin-left: ${addressList.length > 0 ? 10 : 50}px;   margin-top: 4px;`">
                            <input id="IsDefault" type="checkbox" data-id="IsDefault" v-model="recvaddrDefstatus" />
                            &nbsp;设为默认地址
                        </label>
                    </div>

                    <ul class="moreAddress" v-show="addressList.length > 0" :style="{ height: moreHeight + 'px' }">
                        <li
                            class="moreItem"
                            v-for="item in addressList"
                            :key="item.a"
                            @click="choseAddress(item)"
                            :title="
                                item.recvaddrName +
                                ' ' +
                                item.recvaddrPhone +
                                ' ' +
                                item.provinceName +
                                ' ' +
                                item.cityName +
                                ' ' +
                                item.regionName +
                                ' ' +
                                item.recvaddrAddress
                            "
                        >
                            {{
                                item.recvaddrName +
                                ' ' +
                                item.recvaddrPhone +
                                ' ' +
                                item.provinceName +
                                ' ' +
                                item.cityName +
                                ' ' +
                                item.regionName +
                                ' ' +
                                item.recvaddrAddress
                            }}
                        </li>
                    </ul>
                    <div
                        class="submitButton"
                        @click="allCheck()"
                        v-if="
                            userInfo.userIdcardstatus == 'S' &&
                            !(
                                choseItem.orderAgreement &&
                                choseItem.orderAgreement.userinfoNeedconfirmstatus == 'Y' &&
                                choseItem.orderAgreement.agreementUserinfoconfirmstatus == 'N'
                            )
                        "
                    >
                        确定
                    </div>
                    <div class="submitButton" @click="allCheck()" v-else>下一步</div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { Validator } from '~/plugins/common/utils/validator.js';
import '@/api/uc/api.OC2002.query-order-detail';
// import User from '@/utils/user';
import vbProvinceArea from '@/www/components/personalCenter/vbProvinceArea/vbProvinceArea/index.vue';
import '@/api/uc/api.UC0028.add-shipping-address';
import '@/api/uc/api.UC0031.quert-user-address-list';
import '@/api/uc/api.OC2008.update-address';

let errors = {
    name: {
        required: '请输入正确的姓名',
        name: '请输入正确的姓名',
    },
    mobile: {
        required: '请输入正确的手机号',
        mobile: '请输入正确的手机号',
    },
    area: {
        required: '请选择省市区',
    },
    address: {
        required: '请输入正确的地址',
        address: '长度限制范围为3到100之间',
    },
};
let rules = {
    name: 'required|name',
    mobile: 'required|mobile',
    area: 'required',
    address: 'required|address',
};
export default {
    name: 'order',
    components: {
        vbProvinceArea,
    },
    props: {},
    data() {
        return {
            upIconTitle: '收起地址',
            show: false,
            defaultArea: {},
            changeArea: {},
            editShow: false,
            defaultAddress: {},
            addressList: [],
            moreHeight: 0,
            retIconSwitch: false,
            recvaddrDefstatus: false, // 	收货地址默认状态
            choseItem: {},
            userInfo: {},

            paidDetails: {},
        };
    },
    computed: {
        areaData() {
            let area = '';
            let isNoEmpty = Number(this.changeArea.provinceCode) && Number(this.changeArea.cityCode) && Number(this.changeArea.areaCode);
            if (isNoEmpty) {
                area = this.changeArea.provinceCode + this.changeArea.cityCode + this.changeArea.areaCode;
            } else {
                area = '';
            }
            return area;
        },
    },
    watch: {
        retIconSwitch: {
            handler() {
                if (this.retIconSwitch) {
                    this.moreHeight = this.addressList.length * 38;
                } else {
                    this.moreHeight = 0;
                }
            },
            immediate: true,
        },
        // defaultAddress: {
        //     immediate: true,
        //     deep: true,
        //     handler(){
        //         this.defaultArea = {
        //             "areaCode": this.defaultAddress.recvaddrRegion,
        //             "cityCode": this.defaultAddress.recvaddrCity,
        //             "provinceCode": this.defaultAddress.recvaddrProvince
        //         }
        //     }
        // },
        'defaultAddress.recvaddrRegion'() {
            this.defaultArea = {
                areaCode: this.defaultAddress.recvaddrRegion,
                cityCode: this.defaultAddress.recvaddrCity,
                provinceCode: this.defaultAddress.recvaddrProvince,
            };
        },
        'defaultAddress.recvaddrCity'() {
            this.defaultArea = {
                areaCode: this.defaultAddress.recvaddrRegion,
                cityCode: this.defaultAddress.recvaddrCity,
                provinceCode: this.defaultAddress.recvaddrProvince,
            };
        },
        'defaultAddress.recvaddrProvince'() {
            this.defaultArea = {
                areaCode: this.defaultAddress.recvaddrRegion,
                cityCode: this.defaultAddress.recvaddrCity,
                provinceCode: this.defaultAddress.recvaddrProvince,
            };
        },
    },
    mounted() {
        this.Validator = new Validator('addressForm', rules, errors);
    },
    methods: {
        addUcRecvaddr() {
            // 个人中心添加收货地址
            this.$niceloo.api.call('uc/add-shipping-address', {
                recvaddrName: this.defaultAddress.recvaddrName, //姓名
                recvaddrPhone: this.defaultAddress.recvaddrPhone, //电话
                recvaddrProvince: this.changeArea.provinceCode, //省code
                recvaddrCity: this.changeArea.cityCode, //市code
                recvaddrRegion: this.changeArea.areaCode, //收货地址区
                recvaddrAddress: this.defaultAddress.recvaddrAddress, //详细地址
                recvaddrDefstatus: this.recvaddrDefstatus ? 'Y' : 'N', //	收货地址默认状态
                onsuccess: () => {
                    this.$emit('addAddressSuccess');
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        singleCheck(param) {
            if (!this.Validator) {
                return;
            }
            this.Validator.validate(param)
                .then(() => {})
                .catch((errorCb) => {
                    let arr = Object.keys(param) || [];
                    if (arr.length > 0) {
                        errorCb.showError(arr[0]); //展示错误提示，如果只展示某个提示，传入对应的值errorCb.showError('name')
                    }
                });
        },
        allCheck() {
            this.Validator.validate({
                name: this.defaultAddress.recvaddrName,
                mobile: this.defaultAddress.recvaddrPhone,
                area: this.areaData,
                address: this.defaultAddress.recvaddrAddress,
            })
                .then(() => {
                    this.perfectUserAddress();
                })
                .catch((errorCb) => {
                    errorCb.showError();
                });
        },
        choseAddress(item) {
            this.defaultAddress = { ...item };
            this.retIconSwitch = false;
        },
        getAddressList(fn) {
            //获取地址列表
            this.$niceloo.api.call('uc/quert-user-address-list', {
                onsuccess: (data) => {
                    this.addressList = data.data || [];
                    if (this.addressList.length >= 1) {
                        this.defaultAddress = { ...this.addressList[0] };
                        this.retIconSwitch = true;
                    }
                    fn && fn();
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        perfectUserAddress() {
            //订单中心完善地址信息
            this.$niceloo.api.call('uc/update-address', {
                orderNo: this.choseItem.orderNo,
                orderAddress: {
                    oaName: this.defaultAddress.recvaddrName,
                    oaPhone: this.defaultAddress.recvaddrPhone,
                    oaProvince: this.changeArea.provinceCode,
                    oaCity: this.changeArea.cityCode,
                    oaDistrict: this.changeArea.areaCode,
                    oaAddress: this.defaultAddress.recvaddrAddress,
                },
                onsuccess: () => {
                    this.show = false;

                    if (this.addressList.length) {
                        this.addressList.forEach((item) => {
                            //判断是否修改
                            if (
                                item.recvaddrName == this.defaultAddress.recvaddrName &&
                                item.recvaddrPhone == this.defaultAddress.recvaddrPhone &&
                                item.recvaddrAddress == this.defaultAddress.recvaddrAddress &&
                                item.recvaddrRegion == this.changeArea.areaCode &&
                                item.recvaddrCity == this.changeArea.cityCode &&
                                item.recvaddrProvince == this.changeArea.provinceCode
                            ) {
                                this.$emit('addAddressSuccess');
                            } else {
                                this.addUcRecvaddr();
                            }
                        });
                    } else {
                        this.addUcRecvaddr();
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        areaChange(area) {
            this.changeArea = area || {};
            this.singleCheck({ area: this.areaData });
        },
        async open(item) {
            this.userInfo = (await this.$User.getUser()) || {};
            this.choseItem = item || {};
            // 获取延考续学的订单获取原订单是否签订过协议
            if (item.orderSubtype === 'REP' && item.classOrderSubType === 'YAN') {
                this.getOrderInfo().then(() => {
                    if (this.paidDetails.sourceAgreement === 'N') {
                        this.$baseUI
                            .alert(`请先去签署${this.paidDetails.sourceSkuName}班级对应协议或联系课程顾问老师`, '提示', {
                                confirmText: '我知道了',
                            })
                            .then((r) => {
                                this.close();
                                this.$emit('learncenter-mycourse');
                            });
                    } else {
                        this.doAddressList();
                    }
                });
            } else {
                this.doAddressList();
            }
        },
        getOrderInfo() {
            return new Promise((resolve) => {
                this.$callApi('uc/query-order-detail', {
                    orderNo: this.choseItem.orderNo,
                    onsuccess: (data) => {
                        this.paidDetails = data || {};
                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                });
            });
        },
        doAddressList() {
            this.getAddressList(() => {
                this.Validator.clear();
                this.show = true;
                if (this.addressList.length == 0) {
                    this.editShow = true;
                } else {
                    this.editShow = false;
                }
            });
        },
        close() {
            this.show = false;
            this.defaultArea = {};
            this.changeArea = {};
            this.editShow = false;
            this.defaultAddress = {};
            this.addressList = [];
            this.moreHeight = 0;
            this.retIconSwitch = false;
            this.recvaddrDefstatus = false;
            this.choseItem = {};
            this.userInfo = {};
            this.upIconTitle = '收起地址';
        },
        upIconFun() {
            this.retIconSwitch = !this.retIconSwitch;
            if (this.retIconSwitch) {
                this.upIconTitle = '收起地址';
            } else {
                this.upIconTitle = '查看地址';
            }
        },
    },
};
</script>

<style scoped lang="less">
.improveWrap {
    width: 580px;
    background: #fff;
    border-radius: 3px;
    position: relative;
    padding: 0px 0 10px 0;
    .improveTitle {
        font-size: 16px;
        line-height: 50px;
        text-align: center;
        background: url('./asset/images/confirm-h-bg.png') no-repeat 0 0 / cover;
        color: #ffffff;
    }
    .close {
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
        width: 16px;
        height: 16px;
        background: url('./asset/images/close.png') no-repeat 0 0 / cover;
    }
    .subheading {
        color: #999999;
        font-size: 12px;
        margin: 13px 0 40px;
        text-align: center;
    }
    .inputWrap {
        display: flex;
        align-items: center;
        padding-left: 50px;
        margin-bottom: 20px;
        font-size: 14px;
        position: relative;
        /deep/ ._errorMessage {
            position: absolute;
            left: 145px;
            bottom: -17px;
        }
    }
    .inputClass {
        width: 80px;
        text-align: left;
        margin-right: 10px;
    }
    .inputCont {
        width: 325px;
        height: 30px;
        background: inherit;
        background-color: rgba(255, 255, 255, 1);
        box-sizing: border-box;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(204, 204, 204, 1);
        border-radius: 0px;
        padding-left: 10px;
    }
    .divCont {
        line-height: 30px;
        padding-left: 10px;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .submitButton {
        border-width: 0px;
        width: 118px;
        line-height: 36px;
        background: linear-gradient(90deg, rgba(255, 68, 54, 1) 0%, rgba(249, 107, 84, 1) 100%);
        border-radius: 5px;
        font-size: 14px;
        text-align: center;
        margin: 40px auto 20px;
        color: #fff;
        cursor: pointer;
    }
    .stressPromit {
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        color: #666;
        margin-bottom: 20px;
    }
}
.moreAddress {
    transition: all 0.2s linear;
    // overflow: hidden;
    overflow-y: scroll;
    max-height: 200px;
    width: 100%;
}
.moreItem {
    padding: 0 10px;
    width: 460px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 30px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.1);
    color: #666;
    border-radius: 0px;
    cursor: pointer;
    margin: 0 50px 6px;
    transform: translateX(-7px);
    &:hover {
        color: #ee5454;
    }
}
.retract {
    color: #666;
    font-size: 14px;
    margin-left: 49px;
    margin-top: 5px;
    margin-bottom: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 95px;
    float: left;
    &:hover {
        color: #ff0000;
        .retIcon {
            margin-left: 3px;
            width: 10px;
            height: 9px;
            background: url('./asset/images/upIcon.png') no-repeat 0 0 / cover;
            transform: rotate(180deg);
        }
    }
    .retIcon {
        margin-left: 3px;
        width: 10px;
        height: 9px;
        background: url('./asset/images/icon-up.png') no-repeat 0 0;
        transform: rotate(180deg);
    }
    .retIcon.active {
        transform: rotate(0);
        // background: url('./asset/images/xygssq.png') no-repeat 0 0;
    }
}
.areaWrap {
    width: 325px;
}
.edit {
    position: absolute;
    padding-left: 24px;
    background: url('./asset/images/edit.png') no-repeat 0 0;
    background-size: 16px 15px;
    line-height: 16px;
    right: 20px;
    top: 110px;
    color: #666;
    font-size: 14px;
    cursor: pointer;
    z-index: 10;
    color: #e18584;
}
.addWrap {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: #000;
    opacity: 0.3;
    z-index: 1000;
}
.content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-290px, -200px);
    z-index: 1001;
}
</style>
