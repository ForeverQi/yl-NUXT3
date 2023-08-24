<template>
    <div class="nod_sjfo" v-if="postStatus">
        <p class="nod_tit">
            收货信息
            <span class="nod_tip">为了确保您能收到课程配套资料，请正确填写您的收件地址。</span>
        </p>
        <div class="nod_sjbox">
            <div class="ylad_box">
                <!-- 未付款并且有收货信息的在这里展示 -->
                <div
                    v-show="orderDetail.orderAddress.oaName"
                    class="ylad_item"
                    :class="{ active: orderDetail.orderAddress.active }"
                    @click="choseAddress(orderDetail.orderAddress)"
                >
                    <i class="ylad_zst"></i>
                    <i class="ylad_zsb"></i>
                    <div class="ylad_con">
                        <div class="ylad_tt">
                            <span class="ylad_name">{{ orderDetail.orderAddress.oaName }}</span>
                            <span class="ylad_tel">{{ orderDetail.orderAddress.oaPhone }}</span>
                            <span class="editWrap">
                                <i class="edit" @click="addAddress(orderDetail.orderAddress)"></i>
                            </span>
                        </div>
                        <div class="ylad_addr">
                            <p>
                                {{ orderDetail.orderAddress.oaProvincename }} {{ orderDetail.orderAddress.oaCityname }}
                                {{ orderDetail.orderAddress.oaDistrictname }}
                            </p>
                            <p class="addrD">{{ orderDetail.orderAddress.oaAddress }}</p>
                        </div>
                    </div>
                </div>
                <!-- 下面这些地址从基础数据拿 -->
                <div class="ylad_item" :class="{ active: item.active }" @click="choseAddress(item)" v-for="(item, index) in userAddress" :key="index">
                    <i class="ylad_zst"></i>
                    <i class="ylad_zsb"></i>
                    <div class="ylad_con">
                        <div class="ylad_tt">
                            <span class="ylad_name">{{ item.recvaddrName }}</span>
                            <span class="ylad_tel">{{ item.recvaddrPhone }}</span>
                            <span class="editWrap">
                                <i class="edit" @click="addAddress(item)"></i>
                            </span>
                        </div>
                        <div class="ylad_addr">
                            <p>
                                <span class="" v-show="item.recvaddrDefstatus == 'Y'">默认</span>
                                {{ item.provinceName }} {{ item.cityName }} {{ item.regionName }}
                            </p>
                            <p class="addrD">{{ item.recvaddrAddress }}</p>
                        </div>
                    </div>
                </div>
                <div class="ylad_inpbox" @click="addAddress()">
                    <span>添加收货地址</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'class-detail',
    props: {
        // 是否展示地址信息
        postStatus: {
            type: Boolean,
            default: false,
        },
        // 用户收货地址列表
        userAddress: {
            type: Array,
            default() {
                return [];
            },
        },
        // 订单信息
        orderDetail: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    methods: {
        // 选择地址
        choseAddress(item) {
            this.$emit('chose-address', item);
        },

        // 打开收货地址弹窗
        addAddress(item) {
            this.$emit('add-address', item);
        },
    },
};
</script>

<style scoped lang="less">
.nod_tit {
    line-height: 60px;
    padding: 0 56px;
    border-bottom: 1px solid #eee;
    color: #333;
    font-size: 18px;
    display: flex;
    align-items: center;
    background: url('../asset/images/location.png') no-repeat;
    background-size: 22px 22px;
    background-position: 30px center;
    .nod_tip {
        margin-left: 30px;
        font-size: 12px;
        color: #999;
    }
}
.nod_sjbox {
    padding: 25px 25px;
    overflow: auto;
    width: 1200px;
    overflow: auto;
}
.ylad_box {
    display: flex;
    flex-wrap: wrap;
}
.ylad_item {
    width: 238px;
    height: 148px;
    background: url('../asset/images/itembg.png') no-repeat;
    background-size: 238px 148px;
    margin: 0 10px 20px;
    position: relative;
    display: inline-block;
    .ylad_zst {
        background-image: url('../asset/images/color-bg.png');
        background-repeat: no-repeat;
    }
}
.ylad_zst {
    display: inline-block;
    width: 238px;
    height: 8px;
    position: absolute;
    left: 0;
    top: 0;
    background-position: 0 -8px;
}
.ylad_item.active {
    background: url('../asset/images/itembg1.png') no-repeat;
    background-size: 238px 148px;
    .ylad_zst {
        background-position: 0 0;
    }
}
.ylad_zsb {
    display: inline-block;
    width: 21px;
    height: 24px;

    position: absolute;
    right: -1px;
    bottom: -1px;
}
.ylad_con {
    margin-top: 15px;
    padding: 0 14px;
}
.ylad_con .default {
    line-height: 18px;
    width: 40px;
    height: 16px;
    background: linear-gradient(90deg, #ff6870, #f8323c);
    color: #fff;
    font-size: 12px;
    padding: 0 5px;
    margin-right: 5px;
    float: right;
    text-align: center;
    line-height: 16px;
}
.ylad_tt {
    display: flex;
    align-items: center;
    line-height: 44px;
    justify-content: space-between;
    border-bottom: 1px dashed #eee;
    .ylad_name {
        width: 60px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .editWrap {
        display: flex;
        justify-content: flex-end;
        width: 40px;
    }
    .edit {
        width: 16px;
        height: 16px;
        background: url('../asset/images/edit@2x.png') no-repeat 0 0 / cover;
        cursor: pointer;
    }
}

.ylad_tel {
    font-size: 14px;
    color: #333;
    display: inline-block;
    line-height: 20px;
    vertical-align: middle;
}
.ylad_addr {
    padding-top: 20px;
    span {
        display: inline-block;
        width: 30px;
        height: 16px;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 2px;
        line-height: 16px;
        text-align: center;
        color: #fff;
        margin-right: 10px;
        font-size: 12px;
    }
}
.ylad_addr p {
    font-size: 14px;
    color: #333;
    line-height: 20px;
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 195px;
}
.ylad_addr p.addrD {
    font-size: 12px;
    color: #666;
}
.ylad_inpbox {
    width: 240px;
    height: 150px;
    margin: 0 10px 20px;
    display: inline-block;
    background: url('../asset/images/xy_bg1.png') no-repeat;
    text-align: center;
    cursor: pointer;
    vertical-align: bottom;
}
.ylad_inpbox span {
    color: #999999;
    font-size: 16px;
    padding-top: 88px;
    display: inline-block;
}
</style>
