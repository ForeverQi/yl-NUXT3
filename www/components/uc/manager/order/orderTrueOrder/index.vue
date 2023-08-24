<template>
    <div>
        <vb-mask :show="ifShowMe">
            <div class="orderBody">
                <div class="close" @click="close()"></div>
                <payment-tips :close-show="true" padding="0 20px" />
                <!-- <paymentTips :closeShow="true" ></paymentTips> -->
                <form name="orderForm">
                    <div class="orderHeader">
                        <span>订单信息确认</span>
                        <span>订单时间：{{ paidDetails.orderCreateddate }}</span>
                    </div>

                    <!-- 正常 重读  转让订单 -->
                    <div v-if="paidDetails.orderSubtype == 'GEN' || paidDetails.orderSubtype == 'TRA' || paidDetails.orderSubtype == 'REP'">
                        <div class="detailsWrap">
                            <div class="lassLists">
                                <div v-for="item in paidDetails.orderItems" :key="item.a">
                                    <div class="classNames">
                                        <div class="leftW">
                                            <div class="classImg">
                                                <img :src="item.orderitemPictureurl ? $urlUtils.getViewUrl(item.orderitemPictureurl) : defaultImg" alt="" />
                                            </div>
                                            <div class="classCont">
                                                <div class="className">{{ item.skuName }}</div>
                                                <div class="classPrice">
                                                    <span class="price">原价：¥{{ item.skuAmount | veMoneyCent }}</span>
                                                    <span class="price">
                                                        实付：
                                                        <span class="red">¥{{ item.oiAmount | veMoneyCent }}</span>
                                                    </span>
                                                    <span class="price" v-if="paidDetails.orderSubtype === 'TRA'">
                                                        转入：
                                                        <span class="red">¥{{ item.intoAmount | veMoneyCent }}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="contRight">
                                            <div class="payAgreementW">
                                                <span
                                                    class="payAgreement"
                                                    @click="showAgreement(item)"
                                                    v-show="
                                                        paidDetails.orderSubtype != 'REP' &&
                                                        item.orderitemService &&
                                                        item.orderitemService.orderitemAgreementtype == 'E' &&
                                                        item.orderitemService.orderitemServicetype != 'B'
                                                    "
                                                >
                                                    《产品购买协议》
                                                </span>
                                            </div>
                                            <div
                                                class="payType"
                                                v-show="
                                                    item.orderitemStatus == 'CHAD' ||
                                                    item.orderitemStatus == 'TRAD' ||
                                                    item.orderitemStatus == 'CREF' ||
                                                    item.orderitemStatus == 'DEFC' ||
                                                    item.orderitemStatus == 'DEFO'
                                                "
                                                :class="{
                                                    zhuanban: item.orderitemStatus == 'CHAD',
                                                    yanqi: item.orderitemStatus == 'DEFC' || item.orderitemStatus == 'DEFO',
                                                    zhuanrang: item.orderitemStatus == 'TRAD',
                                                }"
                                            >
                                                {{ item.orderitemStatus | orderitemStatus }}
                                            </div>
                                        </div>
                                    </div>

                                    <ul class="addGoods" v-show="item.giftItems && item.giftItems.length > 0">
                                        <li class="addTit">赠送：</li>
                                        <li class="addLi" v-for="it in item.giftItems" :key="it.a">{{ it.skuName }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="addressWrap">
                            <div class="receiveTitle">支付信息</div>
                            <div class="receiveInformation receiveInformationPay">
                                <span class="infoName">原价：¥{{ paidDetails.orderTotalamount | veMoneyCent }}</span>
                                <span class="infoName">优惠金额：¥{{ paidDetails.orderDiscountamount | veMoneyCent }}</span>
                                <span class="infoName" v-if="paidDetails.orderSubtype === 'TRA'">
                                    转入金额：
                                    <span class="red">¥{{ paidDetails.coIntoamount | veMoneyCent }}</span>
                                </span>
                                <span class="infoName">
                                    实付金额：
                                    <span class="red">¥{{ paidDetails.orderPayamount | veMoneyCent }}</span>
                                </span>
                                <span class="infoName" v-show="paidDetails.orderPayamount > 0">付款时间：{{ paidDetails.orderPaytime | dayTime }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 转班订单 -->
                    <div class="orderInfoAllCon" v-if="paidDetails.orderSubtype == 'CHA'">
                        <div class="detailsWrap">
                            <div class="classTitle">转出班级</div>
                            <div class="lassLists">
                                <div v-for="item in paidDetails.orderItems" :key="item.a" v-show="item.orderitemOperation == 'CHAO'">
                                    <div class="classNames">
                                        <div class="leftW">
                                            <div class="classImg">
                                                <img :src="item.orderitemPictureurl ? $urlUtils.getViewUrl(item.orderitemPictureurl) : defaultImg" alt="" />
                                            </div>
                                            <div class="classCont">
                                                <div class="className">{{ item.skuName }}</div>
                                                <div class="classPrice">
                                                    <span class="price">原价：¥{{ item.skuAmount | veMoneyCent }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ul class="addGoods" v-show="item.giftItems && item.giftItems.length > 0">
                                        <li class="addTit">赠送：</li>
                                        <li class="addLi" v-for="it in item.giftItems" :key="it.a">{{ it.skuName }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="classTitle">转入班级</div>
                            <div class="lassLists">
                                <div v-for="item in paidDetails.orderItems" :key="item.a" v-show="item.orderitemOperation == 'CHAI'">
                                    <div class="classNames">
                                        <div class="leftW">
                                            <div class="classImg">
                                                <img :src="item.orderitemPictureurl ? $urlUtils.getViewUrl(item.orderitemPictureurl) : defaultImg" alt="" />
                                            </div>
                                            <div class="classCont">
                                                <div class="className">{{ item.skuName }}</div>
                                                <div class="classPrice">
                                                    <span class="price">原价：¥{{ item.skuAmount | veMoneyCent }}</span>
                                                    <span class="price">
                                                        转入金额：
                                                        <span class="red">¥{{ item.intoAmount | veMoneyCent }}</span>
                                                    </span>
                                                    <span class="price">
                                                        {{ item.oiAmount >= 0 ? '实付' : '退款' }}：
                                                        <span class="red">¥{{ Math.abs(item.oiAmount) | veMoneyCent }}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="contRight">
                                            <div class="payAgreementW">
                                                <span
                                                    class="payAgreement"
                                                    @click="showAgreement(item)"
                                                    v-show="
                                                        item.orderitemService &&
                                                        item.orderitemService.orderitemAgreementtype == 'E' &&
                                                        item.orderitemService.orderitemServicetype != 'B'
                                                    "
                                                >
                                                    《产品购买协议》
                                                </span>
                                            </div>
                                            <div
                                                class="payType"
                                                v-show="
                                                    item.orderitemStatus == 'CHAD' ||
                                                    item.orderitemStatus == 'TRAD' ||
                                                    item.orderitemStatus == 'CREF' ||
                                                    item.orderitemStatus == 'DEFC' ||
                                                    item.orderitemStatus == 'DEFO'
                                                "
                                                :class="{
                                                    zhuanban: item.orderitemStatus == 'CHAD',
                                                    yanqi: item.orderitemStatus == 'DEFC' || item.orderitemStatus == 'DEFO',
                                                    zhuanrang: item.orderitemStatus == 'TRAD',
                                                }"
                                            >
                                                {{ item.orderitemStatus | orderitemStatus }}
                                            </div>
                                        </div>
                                    </div>
                                    <ul class="addGoods" v-show="item.giftItems && item.giftItems.length > 0">
                                        <li class="addTit">赠送：</li>
                                        <li class="addLi" v-for="it in item.giftItems" :key="it.a">{{ it.skuName }}</li>
                                    </ul>
                                </div>
                            </div>
                            <!-- <div class="prot">附加服务：重读下一期，重读资料费100元</div> -->
                        </div>
                        <div class="addressWrap">
                            <div class="receiveTitle">支付信息</div>
                            <div class="receiveInformation receiveInformationPay">
                                <span class="infoName">原价：¥{{ paidDetails.orderTotalamount | veMoneyCent }}</span>
                                <span class="infoName">优惠金额：¥{{ paidDetails.orderDiscountamount | veMoneyCent }}</span>
                                <span class="infoName">
                                    转入金额：
                                    <span class="red">¥{{ paidDetails.coIntoamount | veMoneyCent }}</span>
                                </span>
                                <span class="infoName">
                                    {{ paidDetails.orderPayamount >= 0 ? '实付' : '退款' }}金额：
                                    <span class="red">¥{{ Math.abs(paidDetails.orderPayamount) | veMoneyCent }}</span>
                                </span>
                                <span class="infoName" v-show="paidDetails.orderPayamount > 0">付款时间：{{ paidDetails.orderPaytime | dayTime }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="paidDetails.orderSubtype == 'DEF'">
                        <div class="detailsWrap">
                            <div class="classTitle">延期班级</div>
                            <div class="lassLists">
                                <div v-for="item in paidDetails.orderItems" :key="item.a" v-show="item.orderitemOperation == 'DEFC'">
                                    <div class="classNames">
                                        <div class="leftW">
                                            <div class="classImg">
                                                <img :src="item.orderitemPictureurl ? $urlUtils.getViewUrl(item.orderitemPictureurl) : defaultImg" alt="" />
                                            </div>
                                            <div class="classCont">
                                                <div class="className">{{ item.skuName }}</div>
                                                <div class="classPrice">
                                                    <span class="price">原价：¥{{ item.skuAmount | veMoneyCent }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ul class="addGoods" v-show="item.giftItems && item.giftItems.length > 0">
                                        <li class="addTit">赠送：</li>
                                        <li class="addLi" v-for="it in item.giftItems" :key="it.a">{{ it.skuName }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="classTitle">延期后班级</div>
                            <div class="lassLists">
                                <div v-for="item in paidDetails.orderItems" :key="item.a" class="listWrap" v-show="item.orderitemOperation == 'DEFO'">
                                    <div class="classNames">
                                        <div class="leftW">
                                            <div class="classImg">
                                                <img :src="item.orderitemPictureurl ? $urlUtils.getViewUrl(item.orderitemPictureurl) : defaultImg" alt="" />
                                            </div>
                                            <div class="classCont">
                                                <div class="className">{{ item.skuName }}</div>
                                                <div class="classPrice">
                                                    <span class="price">原价：¥{{ item.skuAmount | veMoneyCent }}</span>
                                                    <span class="price">
                                                        实付：
                                                        <span class="red">¥{{ item.oiAmount | veMoneyCent }}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="contRight">
                                            <div class="payAgreementW">
                                                <span
                                                    class="payAgreement"
                                                    @click="showAgreement(item)"
                                                    v-show="
                                                        item.orderitemService.orderitemAgreementtype == 'E' && item.orderitemService.orderitemServicetype != 'B'
                                                    "
                                                >
                                                    《产品购买协议》
                                                </span>
                                            </div>
                                            <div>
                                                <div
                                                    class="payType"
                                                    v-if="
                                                        item.orderitemStatus == 'CHAD' ||
                                                        item.orderitemStatus == 'TRAD' ||
                                                        item.orderitemStatus == 'CREF' ||
                                                        item.orderitemStatus == 'DEFC' ||
                                                        item.orderitemStatus == 'DEFO'
                                                    "
                                                    :class="{
                                                        zhuanban: item.orderitemStatus == 'CHAD',
                                                        yanqi: item.orderitemStatus == 'DEFC' || item.orderitemStatus == 'DEFO',
                                                        zhuanrang: item.orderitemStatus == 'TRAD',
                                                    }"
                                                >
                                                    {{ item.orderitemStatus | orderitemStatus }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ul class="addGoods" v-show="item.giftItems && item.giftItems.length > 0">
                                        <li class="addTit">赠送：</li>
                                        <li class="addLi" v-for="it in item.giftItems" :key="it.a">{{ it.skuName }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="addressWrap">
                            <div class="receiveTitle">支付信息</div>
                            <div class="receiveInformation receiveInformationPay">
                                <span class="infoName">原价：¥{{ paidDetails.orderTotalamount | veMoneyCent }}</span>
                                <span class="infoName">优惠金额：¥{{ paidDetails.orderDiscountamount | veMoneyCent }}</span>
                                <span class="infoName">
                                    实付金额：
                                    <span class="red">¥{{ paidDetails.orderPayamount | veMoneyCent }}</span>
                                </span>
                                <span class="infoName" v-show="paidDetails.orderPayamount > 0">付款时间：{{ paidDetails.orderPaytime | dayTime }}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="orderInfoReader"
                        v-show="
                            paidDetails.orderSubtype != 'REP' &&
                            paidDetails.orderAgreement &&
                            paidDetails.orderAgreement.agreementNeedconfirmstatus == 'Y' &&
                            paidDetails.orderAgreement.agreementStatus == 'N'
                        "
                    >
                        <div class="displayFlex">
                            <span class="read" :class="{ active: readed }" @click="readerFun"></span>
                            <span name="check">我已阅读并同意</span>
                        </div>
                        <div>
                            <ul class="">
                                <li class="argument">产品购买协议</li>
                            </ul>
                        </div>
                    </div>

                    <!-- 只有需要确认个人信息的才展示 -->
                    <div
                        class="userInfo"
                        v-show="
                            paidDetails.orderAgreement &&
                            paidDetails.orderAgreement.userinfoNeedconfirmstatus == 'Y' &&
                            paidDetails.orderAgreement.agreementUserinfoconfirmstatus == 'N'
                        "
                    >
                        <!-- <div class="userInfo" > -->

                        <div class="userInfoTitle">
                            <div>
                                <span class="userInfoTitleName">完善个人信息</span>
                                <!-- <span class="margin_right colorYealle">
                            注：以下身份信息将是您享受所有权利和义务的唯一确认标识
                        </span> -->
                            </div>
                        </div>
                        <div class="writeNotice">
                            <p>填写须知:</p>
                            <p>1. 下述信息必须由学习优路课程的学员本人(简称“您”)如实填写；</p>
                            <p>2. 姓名和证件号码是您与优路签订协议、享有协议约定的权利及各项服务的唯一身份证明；</p>
                            <p>3. 由于信息填写错误导致的不利后果由您承担。</p>
                            <p>4. 签署过程中有问题可联系课程老师或拨打0371-53609200</p>
                        </div>
                        <div class="userInfoTitleDetail">
                            <div class="">
                                <label class="labelName">证件类型：</label>
                                <select
                                    name=""
                                    class="inputAllStyle inputWidth"
                                    v-model="changeUserInfo.userIdcardtype"
                                    @change="changeRules"
                                    :disabled="userInfo.userIdcardstatus == 'S'"
                                >
                                    <option :value="item.dictVal" v-for="item in idtypeList" :key="item.a">{{ item.dictName }}</option>
                                </select>
                            </div>
                            <div class="lineWrap">
                                <label class="labelName">真实姓名：</label>
                                <input
                                    class="inputAllStyle inputWidth"
                                    type="text"
                                    placeholder="请输入真实姓名"
                                    v-model="changeUserInfo.userName"
                                    name="userName"
                                    @blur="singleCheck({ userName: changeUserInfo.userName })"
                                    :disabled="userInfo.userIdcardstatus == 'S'"
                                />
                            </div>
                            <div class="lineWrap">
                                <label class="labelName">证件号码：</label>
                                <input
                                    class="inputAllStyle inputWidth"
                                    type="text"
                                    placeholder="请输入证件号码"
                                    @blur="singleCheck({ idNum: changeUserInfo.userIdcard })"
                                    v-model="changeUserInfo.userIdcard"
                                    name="idNum"
                                    :disabled="userInfo.userIdcardstatus == 'S'"
                                />
                                <span class="btn-txt" @click="showDialog" v-if="userInfo.userIdcardstatus == 'S' && showIdCardFull === false">
                                    查看完整信息
                                </span>
                            </div>
                            <div class="lineWrap" v-show="isShowVerify">
                                <div class="labelName">图形验证码：</div>
                                <input
                                    class="inputAllStyle confirmation-code"
                                    name="captchaValue"
                                    type="text"
                                    placeholder="请输入图形验证码"
                                    v-model="captchaValue"
                                    aotucomplete="off"
                                />
                                <img :src="imgSrc" class="img-captcha" @click="getCaptchaToken()" />
                            </div>
                            <div class="lineWrap" v-show="isShowVerify">
                                <div class="labelName">协议确认码：</div>
                                <input
                                    class="inputAllStyle confirmation-code"
                                    name="verifyValue"
                                    type="text"
                                    :placeholder="placeholder"
                                    v-model="verifyValue"
                                    aotucomplete="off"
                                    @change="verifyMsgCode"
                                />
                                <span v-if="seconds == 60" @click="getMsgCode" class="btn-text">{{ btnText }}</span>
                                <span v-else class="btn-text">{{ btnText }}</span>
                            </div>
                            <div class="msgInputWrap" v-if="isSend">
                                <p class="tip-msg">{{ tipMsg }}</p>
                            </div>
                            <div class="">
                                <label class="labelName">付款人：</label>
                                <select name="" class="inputAllStyle inputWidth" v-model="drawee">
                                    <option :value="item.dictCode" v-for="item in draweeList" :key="item.a">{{ item.dictName }}</option>
                                </select>
                            </div>
                            <div class="lineWrap payerRelationship" v-show="drawee == 'OT' || drawee == 'OO'">
                                <label class="">付款人与本人的关系：</label>
                                <input
                                    name="payerRelationship"
                                    class="inputAllStyle inputWidth"
                                    style="width: 218px"
                                    maxlength="20"
                                    type="text"
                                    @blur="singleCheck({ payerRelationship })"
                                    placeholder="请填写付款人与本人的关系"
                                    v-model="payerRelationship"
                                />
                            </div>
                            <p class="prots" v-show="userInfo.userIdcardstatus == 'S'">如果此处非报考人信息，请联系课程老师或致电：0371-53609200。</p>
                        </div>
                        <div
                            class="noticeConfirm"
                            @click="
                                noticed = !noticed;
                                singleCheck({ noticed: noticed });
                            "
                        >
                            <span class="read" :class="{ active: noticed }"></span>
                            <span name="noticed">我是学习课程的学员本人，我已阅读并理解《填写须知》，并如实填写以上信息。</span>
                        </div>
                    </div>
                    <div class="orderAdressInfo" v-show="postStatus">
                        <div class="userInfoTitle">
                            <div>
                                <span class="userInfoTitleName">完善收货信息</span>
                                <span class="margin_right colorYealle">注：课程包含的资料将会邮寄至您手中，请认真填写</span>
                            </div>
                        </div>
                        <div class="userInfoTitleDetail">
                            <div class="lineWrap">
                                <label class="labelName">收货人：</label>
                                <input
                                    class="inputAllStyle inputWidthAdress"
                                    type="text"
                                    placeholder="请输入收货人姓名"
                                    @blur="singleCheck({ recvaddrName: defaultAddress.recvaddrName })"
                                    v-model="defaultAddress.recvaddrName"
                                    name="recvaddrName"
                                />
                            </div>
                            <div class="lineWrap">
                                <label class="labelName">联系电话:</label>
                                <input
                                    class="inputAllStyle inputWidthAdress"
                                    @blur="singleCheck({ mobile: defaultAddress.recvaddrPhone })"
                                    name="mobile"
                                    type="text"
                                    placeholder="请输入联系电话"
                                    v-model="defaultAddress.recvaddrPhone"
                                />
                            </div>
                            <div class="lineWrap">
                                <label class="labelName">所在地区:</label>
                                <!-- 省市区 -->
                                <div class="areaWrap" name="area">
                                    <vb-province-area @areaChange="areaChange" :default-area="defaultArea" />
                                </div>
                            </div>
                            <div class="lineWrap">
                                <label class="labelName">详细地址:</label>
                                <input
                                    class="inputAllStyle inputWidthAdress"
                                    @blur="singleCheck({ address: defaultAddress.recvaddrAddress })"
                                    type="text"
                                    placeholder="请输入您的详细地址"
                                    name="address"
                                    v-model="defaultAddress.recvaddrAddress"
                                />
                            </div>
                            <div class="check-line">
                                <label style="display: inline-block; margin-left: 13px">
                                    <input id="IsDefault" type="checkbox" data-id="IsDefault" v-model="recvaddrDefstatus" />
                                    &nbsp;设为默认地址
                                </label>
                            </div>
                            <div v-show="addressList.length > 0" class="orderAdressTitleName">
                                <span>{{ upIconTitle }}</span>
                                <img src="./asset/images/upIcon.png" alt="" :class="upIcon ? 'upIcon' : 'downIcon'" @click="upIconFun()" />
                            </div>

                            <div class="orderAdressInfoHistory" v-show="upIcon && addressList.length > 0">
                                <div class="borderTopDiv"></div>
                                <ul style="overflow-y: scroll; max-height: 150px">
                                    <li v-for="item in addressList" :key="item.a" @click="choseAddress(item)">
                                        <span>{{ item.recvaddrName }}</span>
                                        <span class="margin_right">{{ item.recvaddrPhone }}</span>
                                        <span class="margin_right">
                                            {{ item.provinceName + ' ' + item.cityName + ' ' + item.regionName + ' ' + item.recvaddrAddress }}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="fooder">
                        <span class="fooderSpanLeft" @click="close">取消</span>
                        <span class="fooderSpanRight margin_right" @click="checkAll()">确认订单与个人信息</span>
                    </div>
                </form>
            </div>
        </vb-mask>

        <agreement-purchase
            v-if="ifShowAgreementDialogue"
            class="agreement-purchase"
            ref="agreementPurchase"
            :show="ifShowAgreementDialogue"
            :download-show="false"
            :deal-lists="dealList"
            :is-show-footer="agreementDialogue_ifShowFooter"
            @confirm-fn="onAgreementConfirmed"
            @close-fn="onCloseAgreementDialogue"
        />
    </div>
</template>
<script src="./js/index.mjs" />
<style lang="less" scoped src="./css/index.less" />
