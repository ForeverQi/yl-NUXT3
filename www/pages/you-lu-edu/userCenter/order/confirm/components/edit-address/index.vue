<template>
    <!-- 已付款订单 -->
    <div>
        <!-- 添加收货地址弹框 -->
        <!-- show -->
        <div class="addAddress" v-show="addressShow">
            <div class="address_zz"></div>
            <div class="address_box" style="display: block">
                <div class="wsfo_tit">
                    <span>{{ type == 'edit' ? '编辑收货信息' : '添加收货地址' }}</span>
                    <span class="close" @click="close()">
                        <img src="./asset/images/close.png" class="img" />
                    </span>
                </div>
                <div class="addr_cen">
                    <p class="tip">为确保您能收到配套学习资料，请务必准确填写您的收货地址</p>
                    <p style="padding-left: 105px; color: #ff0000; font-size: 14px; line-height: 25px; height: 25px; margin-top: -20px">
                        <span id="errMsg"></span>
                    </p>
                    <form name="addressForm">
                        <div id="ReceiveAddress">
                            <label class="addr_lab">
                                <span>收货人：</span>
                                <div>
                                    <input
                                        name="name"
                                        type="text"
                                        id="ctl00_Receiver"
                                        class="addr_inp"
                                        placeholder="请填写收货人姓名"
                                        data-id="Receiver"
                                        v-model="addressInfo.recvaddrName"
                                    />
                                </div>
                            </label>
                            <label class="addr_lab">
                                <span>联系电话：</span>
                                <div>
                                    <input
                                        name="mobile"
                                        type="text"
                                        id="ctl00_Telephone"
                                        class="addr_inp"
                                        placeholder="请填写手机号"
                                        data-id="Telephone"
                                        v-model="addressInfo.recvaddrPhone"
                                    />
                                </div>
                            </label>
                            <label id="ctl00_sanji" class="addr_lab">
                                <span>所在地区：</span>
                                <!-- 省市区 -->
                                <div class="areaWrap">
                                    <vb-province-area @areaChange="areaChange" name="area" :default-area="defaultArea" />
                                </div>
                            </label>
                            <label class="addr_lab">
                                <span>详细地址：</span>
                                <div>
                                    <input
                                        name="address"
                                        type="text"
                                        id="ctl00_Address"
                                        class="addr_inp"
                                        data-id="Address"
                                        v-model="addressInfo.recvaddrAddress"
                                    />
                                </div>
                            </label>

                            <input name="ctl00$AdreessId" type="hidden" id="ctl00_AdreessId" class="addr_inp" data-id="AdreessId" />
                        </div>
                    </form>
                    <label class="addr_chklab" v-if="!addressInfo.oaName">
                        <!-- //未付款订单列表修改地址不需要这个默认展示 -->
                        <input id="IsDefault" type="checkbox" data-id="IsDefault" v-model="addressInfo.recvaddrDefstatus" />
                        &nbsp;设为默认地址
                    </label>
                </div>
                <div class="wsfo_bm">
                    <input type="button" value="取消" class="wsfo_cancel" @click="close()" v-if="addressInfo.recvaddrId === '' || type === ''" />
                    <input type="button" value="删除" class="wsfo_cancel" @click="delAddress()" v-if="addressInfo.recvaddrId !== '' && type === 'edit'" />
                    <input type="button" value="保存" class="wsfo_submit" id="addressAdd" @click="checkAll()" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Validator } from '~/plugins/common/utils/validator.js';
import vbProvinceArea from '@/www/components/personalCenter/vbProvinceArea/vbProvinceArea/index.vue';
import '@/api/api..delete-user-address.js';
let errors = {
    name: {
        required: '请输入正确姓名',
        name: '请输入正确姓名',
    },
    mobile: {
        required: '请输入正确的手机号',
        mobile: '请输入正确的手机号',
    },
    address: {
        required: '请输入正确的地址',
        address: '长度限制范围为3到100之间',
    },
    area: {
        required: '请选择省市区',
    },
};
let rules = {
    name: 'required|name',
    mobile: 'required|mobile',
    address: 'required|address',
    area: 'required',
};

export default {
    components: {
        vbProvinceArea,
    },
    /**
     * 默认值
     *
     * @returns {object} 默认值返回
     */
    data() {
        return {
            addressShow: false,
            type: '', //edit修改 默认添加
            defaultArea: {},
            addressInfo: {
                //添加的信息
                recvaddrName: '', //姓名
                recvaddrPhone: '', //电话
                recvaddrAddress: '', //详细地址
            },
            changeArea: {},
        };
    },
    computed: {
        /**
         * @returns {string} 返回默认值
         */
        areaData() {
            let area = '';
            if (this.changeArea.provinceCode != 0 && this.changeArea.cityCode != 0) {
                area = this.changeArea.provinceCode + this.changeArea.cityCode + this.changeArea.areaCode;
            } else {
                area = '';
            }
            return area;
        },
    },
    /**
     *
     */
    mounted() {
        this.Validator = new Validator('addressForm', rules, errors);
    },
    methods: {
        /**
         * 删除地址
         */
        delAddress() {
            this.$baseUI.confirm({
                title: '提示',
                content: '确定要删除该收货地址吗？',
                showCancel: true,
                cancelText: '取消',
                confirmText: '确定',
                confirm: () => {
                    this.$niceloo.api.call('uc/delete-user-address', {
                        recvaddrId: this.addressInfo.recvaddrId,
                        onsuccess: () => {
                            // this.$refs.editAddress.close();
                            // this.getAddressList();
                            this.close();
                            this.$emit('change');
                        },
                        onerror: this.$niceloo.api.handleFailure,
                        oncomplete: () => {},
                    });
                },
                cancel: () => {},
            });
        },
        /**
         *
         */
        checkAll() {
            this.Validator.validate({
                name: this.addressInfo.recvaddrName,
                mobile: this.addressInfo.recvaddrPhone,
                address: this.addressInfo.recvaddrAddress,
                area: this.areaData,
            })
                .then(() => {
                    this.save();
                })
                .catch((errorCb) => {
                    console.log(errorCb);
                    errorCb.showError(); //展示错误提示，如果只展示某个提示，传入对应的值errorCb.showError('name')
                });
        },
        /**
         *
         * @param {object} areaData 选择的地区信息
         */
        areaChange(areaData) {
            //地址发生变化
            this.changeArea = areaData;
        },
        /**
         *
         * @param {object} editData 要编辑的地址信息
         */
        open(editData) {
            this.Validator.clear();
            this.addressShow = true;
            this.defaultArea = {};
            this.type = '';
            this.cityList = [];
            this.areaList = [];
            if (editData) {
                this.type = 'edit';
                this.defaultArea = {
                    provinceCode: editData.recvaddrProvince,
                    cityCode: editData.recvaddrCity,
                    areaCode: editData.recvaddrRegion,
                };
                editData = { ...editData };
                editData.recvaddrDefstatus = editData.recvaddrDefstatus == 'N' ? '' : 'Y';
                this.addressInfo = {
                    ...this.addressInfo,
                    recvaddrProvince: this.changeArea.provinceCode,
                    recvaddrCity: this.changeArea.cityCode,
                    recvaddrRegion: this.changeArea.areaCode,
                    ...editData,
                };
            }
        },
        /**
         *
         */
        close() {
            this.addressShow = false;
            this.addressInfo = {};
            this.changeArea = {};
        },
        /**
         *
         */
        save() {
            let option = {
                ...this.addressInfo,
                recvaddrProvince: this.changeArea.provinceCode,
                recvaddrCity: this.changeArea.cityCode,
                recvaddrRegion: this.changeArea.areaCode,
                recvaddrDefstatus: this.addressInfo.recvaddrDefstatus ? 'Y' : 'N',
            };
            if (this.type == 'edit') {
                this.$emit('editAddress', option);
                return;
            }
            this.$emit('saveAddress', option);
        },
    },
};
</script>

<style scoped lang="less">
.areaWrap {
    width: 372px;

    /deep/ select {
        width: 127px;
        background: #ffffff;
        border: 1px solid #e5e5e5;
    }

    /deep/ span {
        color: #8d90aa;
        padding: 0 5px;
    }
}
#ReceiveAddress {
    padding: 0 42px;
    padding-top: 32px;
}
.address_zz {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #000;
    filter: alpha(opacity=30);
    -moz-opacity: 0.3;
    -khtml-opacity: 0.3;
    opacity: 0.3;
    z-index: 900;
    display: none;
}
.address_box {
    position: fixed;
    top: 50%;
    left: 50%;
    background: #fff;
    z-index: 901;
    width: 574px;
    border-radius: 16px;
    margin: -215px 0 0 -330px;
    display: none;
}
.addAddress {
    // display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
}
.wsfo_tit {
    padding: 24px 0 16px 0;
    // line-height: 50px;
    // padding: 0 15px;
    // border-bottom: 1px solid #e5e5e5;
    position: relative;
    text-align: center;
    // height: 50px;

    .close {
        position: absolute;
        right: 32px;
        cursor: pointer;
    }
}
.wsfo_tit span {
    color: #333333;
    font-size: 20px;
    font-weight: bold;
}
.wsfo_tit .wsfo_close {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url('/images/order/close1.png') no-repeat center center;
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 17px;
}
.addr_cen {
    min-height: 60px;

    .tip {
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        color: #f8323c;
        padding-left: 20px;
        background: #fff3f3;
    }
}
.addr_lab {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    position: relative;
    /deep/._errorMessage {
        position: absolute;
        left: 102px;
        top: 32px;
    }
}
.addr_lab span {
    color: #666;
    font-size: 14px;
    color: #3a3d4b;
    width: 70px;
    display: inline-block;
    text-align: right;
}
.addr_sel {
    width: 113px;
    line-height: 32px;
    height: 32px;
    border: 1px solid #cccccc;
    border-radius: 2px;
    outline: none;
}
.addr_inp {
    height: 34px;
    width: 412px;
    box-sizing: border-box;
    background: #ffffff;
    padding: 0 5px;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    outline: none;
}
.addr_lab span.addr_fg {
    width: auto;
}
.addr_chklab {
    padding-left: 100px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
}
.wsfo_bm {
    text-align: center;
    padding: 5px 0 30px;
    padding-top: 60px;
}
.wsfo_bm .wsfo_submit {
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

    width: 140px;
    height: 40px;
    border-radius: 20px;
}
.wsfo_bm .wsfo_cancel {
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

    width: 140px;
    height: 40px;
    background: #ffffff;
    color: #f8323c;
    border: 1px solid #f8323c;
    border-radius: 21px;
}
</style>
