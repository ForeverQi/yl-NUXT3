export default {
    gotoBuy() {
        this.$PageUtil.href('/pro-course');
    },
    addAddress(item) {
        //打开收货地址弹窗
        // window.event.stopPropagation();
        this.$refs.editAddress.open(item);
    },
    saveAddress(data) {
        //添加的收货地址
        this.$niceloo.api.call('bd/bd-recvaddr-add', {
            ...data,
            onsuccess: () => {
                this.$refs.editAddress.close();
                this.getUserAddress();
            },
            onerror: this.$niceloo.api.handleFailure,
            oncomplete: () => {},
        });
    },
    editAddress(data) {
        //修改地址
        if (data.oaName) {
            //订单系统系统地址
            this.editAddressOrder(data, () => {
                this.$refs.editAddress.close();
                this.getOrderPaidDetails();
            });
        } else {
            this.$niceloo.api.call('bd/bd-recvaddr-edit', {
                ...data,
                onsuccess: () => {
                    this.$refs.editAddress.close();
                    this.getUserAddress();
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        }
    },
    editAddressOrder(data, fn) {
        this.$niceloo.api.call('uc/update-address', {
            orderNo: this.paidDetails.orderNo,
            orderAddress: {
                oaName: data.recvaddrName,
                oaPhone: data.recvaddrPhone,
                oaProvince: data.recvaddrProvince,
                oaCity: data.recvaddrCity,
                oaDistrict: data.recvaddrRegion,
                oaAddress: data.recvaddrAddress,
            },
            onsuccess: () => {
                fn && fn();
            },
            onerror: this.$niceloo.api.handleFailure,
            oncomplete: () => {},
        });
    },
    //根据cookie中的班级标识获取班级信息
    async listClassids() {
        const isLogin = await ylPlugin.login.isLogined();
        if (!isLogin) {
            this.$User.toLogin();
            return;
        }
        let User = await this.$User.getUser();
        let classId = this.$cookieUtil.get(User.userId + this.Config.env + 'orderClasscom.niceloo3.0.h5');
        this.postStatus = false;
        if (!classId) {
            return;
        }
        this.$niceloo.api.call('uc/query-classids-list', {
            classId,
            onsuccess: (data) => {
                this.classList = data.classes || [];
                if (this.classList.length > 0) {
                    //只要一个班级有协议，订单就展示协议
                    for (let i = 0; i < this.classList.length; i++) {
                        if (
                            this.classList[i].classAtype == 'E' &&
                            (this.classList[i].classAsertype == 'R' ||
                                this.classList[i].classAsertype == 'F' ||
                                this.classList[i].classAsertype == 'N' ||
                                this.classList[i].classAsertype == 'U' ||
                                this.classList[i].classAsertype == 'K')
                        ) {
                            this.hasAgreement = true;
                        }
                    }
                    for (let i = 0; i < this.classList.length; i++) {
                        if (this.classList[i].postStatus) {
                            this.postStatus = true;
                            this.getUserAddress(); //有需要邮寄的班级再去查接口
                            break;
                        }
                    }
                    if (this.couponBinded) {
                        //如果绑定过优惠码了 再查一次优惠金额
                        this.bindOrderCoupon();
                    }
                    //判断订单中是否有需要强制弹出协议的 item.classId
                    let flag = this.getSession().some((i) => {
                        return this.classList.some((j) => j.classId === i);
                    });
                    if (!flag) {
                        this.judgeDeal(this.classList);
                    }
                }
            },
            onerror: this.$niceloo.api.handleFailure,
            oncomplete: () => {},
        });
    },
    // 订单中移除班级
    async removeClass(item) {
        if (this.classList.length <= 1) {
            this.showTip = true;
            this.$refs.tipTitle.innerHTML = '班级删除失败！';
            this.$refs.tipContent.innerHTML = '请至少保留一个班级';
            return;
        }
        let User = await this.$User.getUser();
        let classIds = this.$cookieUtil.get(User.userId + this.Config.env + 'orderClasscom.niceloo3.0.h5').split(',');
        classIds = classIds.filter((val) => {
            return val != item.classId;
        });
        this.$cookieUtil.set(User.userId + this.Config.env + 'orderClasscom.niceloo3.0.h5', classIds.toString());
        this.listClassids();
    },

    // 4.确认阅读订单协议
    readedProtocol() {
        this.agreed = !this.agreed;
    },
    // 5.优惠码绑定,如果绑定后,用户取消订单，则优惠码自动解绑,可以继续使用
    async bindOrderCoupon() {
        if (!this.couponCode) {
            //非售卖类型不能使用优惠码
            this.showTip = true;
            this.$refs.tipTitle.innerHTML = '温馨提示';
            this.$refs.tipContent.innerHTML = '请输入优惠码';
            return;
        }
        if (!this.classSalestatus) {
            //非售卖类型不能使用优惠码
            this.showTip = true;
            this.$refs.tipTitle.innerHTML = '温馨提示';
            this.$refs.tipContent.innerHTML = '当前产品类型为非售卖类型';
            this.couponCode = '';
            return;
        }
        let skuList = this.classList.map((val) => {
            return {
                skuId: val.classId,
                skuType: 'CLASS',
                skuPrice: val.classStdprice,
                skuNum: 1,
            };
        });
        let loading = this.$baseUI.loading();
        let User = await this.$User.getUser();
        this.$niceloo.api.call('uc/verify-order-coupon', {
            skuList,
            couponList: [
                {
                    couponId: this.couponCode, //优惠码
                    businessType: 'DC',
                },
            ],
            userId: User.userId,
            onsuccess: (result) => {
                this.couponBinded = true;
                this.$set(this.paidDetails, 'orderDiscountamount', result.promotionPrice);
                this.$set(this.paidDetails, 'remainPayamount', result.totalAmount);
            },
            onerror: this.$niceloo.api.handleFailure,
            oncomplete: () => {
                loading.close();
            },
        });
    },
    // 6.创建订单
    async orderApply() {
        if (this.agreed) {
            if (this.orderNo) {
                //未付款订单直接跳支付平台
                if (this.postStatus && !this.paidDetails.orderAddress.active) {
                    //如果选择的地址是订单自身的地址，不需要调完善地址接口
                    let data = {};
                    this.userAddress.forEach((val) => {
                        if (val.active) {
                            data = val;
                        }
                    });

                    if (!data.recvaddrPhone) {
                        this.$baseUI.alert('请选择填写收货地址！');
                        return;
                    }
                    this.editAddressOrder(data, () => {
                        this.receiptsPayprecreate(this.orderNo);
                    });
                } else {
                    this.receiptsPayprecreate(this.orderNo);
                }

                return;
            }
            let user = await this.$User.getUser();
            // 判断支付主体
            let companyCode = '';
            for (let index = 0; index < this.classList.length; index++) {
                if (companyCode && this.classList[index].companyCode != companyCode) {
                    this.zhutiWindow = true;
                    return;
                } else {
                    companyCode = this.classList[index].companyCode;
                }
            }
            //组合班级列表
            let orderItems = [];
            this.classList.forEach((val) => {
                let obj = {
                    skuId: val.classId,
                    productType: val.classtypeType === 'PEC' ? 'ECLASS' : 'CLASS',
                    // oiAmount:val.classStdprice,
                    oiQuantity: 1,
                    giftItems: [],
                };
                if (val.giveClasses && val.giveClasses.length > 0) {
                    val.giveClasses.forEach((v) => {
                        obj.giftItems.push({
                            skuId: v.classId,
                            productType: 'CLASS',
                            // oiAmount:val.classStdprice,
                            oiQuantity: 1,
                            giftType: 'B', ////B:标准赠课;Y:营销赠课;K:跨项目赠课
                        });
                    });
                }
                orderItems.push(obj);
            });
            //拼接收货地址
            let orderAddress = {};
            if (this.postStatus) {
                this.userAddress.forEach((val) => {
                    if (val.active) {
                        orderAddress = {
                            oaName: val.recvaddrName,
                            oaPhone: val.recvaddrPhone,
                            oaProvince: val.recvaddrProvince,
                            oaCity: val.recvaddrCity,
                            oaDistrict: val.recvaddrRegion,
                            oaAddress: val.recvaddrAddress,
                        };
                    }
                });
                if (!orderAddress.oaName) {
                    this.$baseUI.alert('请选择填写收货地址！');
                    return;
                }
            }
            let coupons = [];
            if (this.couponCode) {
                coupons = [
                    {
                        couponId: this.couponCode,
                        businessType: 'DC', //业务类型:DC:优惠码, 为DC类型时,couponId传优惠码
                    },
                ];
            }
            const isTrial = this.classList.some(({ classtypeType }) => classtypeType === 'PEC');
            const params = {
                brandId: 'YOULU',
                userId: user.userId,
                approvalAction: isTrial ? 'ORDCRE' : 'SUB', //审批动作	String	是				SUB:网站和app下单适用;OLO:电商下单适用
                orderInfo: {
                    orderSource: 'YP',
                    orderEntryterminal: 'PC',
                    orderBusinesstype: 'I',
                    coupons,
                    orderPlatformappcode: 'PORTAL.WEB',
                }, //订单信息	Map	是				"orderInfo":{ "orderSource":"",//OP:运营平台;OA:运营App;YP:优路平台;YA:优路App;TM:天猫;JD:京东;DA:分销联盟 "orderEntryterminal":"string",//订单表订单录入终端(Android:Android;IOS:IOS;PC:PC) "orderBusinesstype":"订单业务类型",//O:组织/企业;M:组织成员;I:个人; "orderMemo":"订单备注", "orderRelatedorderno":"关联订单标识",//关联订单标识：如子订单关联的主订单标识 }
                orderItems, //商品信息	List	是
                orderAddress, //地址	Map	否
            };
            if (isTrial) {
                params.applyForm = JSON.stringify({ coType: 'ECLASS' });
            }
            this.$niceloo.api.call('uc/apply-pay-order', {
                ...params,
                onsuccess: (res) => {
                    if (res) {
                        //有订单号就下单
                        this.receiptsPayprecreate(res);
                        this.submitOrderTrack(res);
                    }
                },
                onerror: (data) => {
                    let msg = data.getDescription();
                    if (data.getCode().split('-')[1] == '3001' && msg === '主班级必须是同一项目的') {
                        this.isShowPop = true;
                    } else if (data.getCode().split('-')[1] == '3001') {
                        this.$baseUI.confirm({
                            title: '提示',
                            content: msg,
                            showCancel: true,
                            cancelText: '取消',
                            confirmText: '我的订单',
                            success: () => {
                                this.$router.push('/uc');
                            },
                            cancel: () => {
                                //console.log("用户点击了取消！");
                            },
                        });
                    } else {
                        this.$baseUI.alert(msg);
                    }
                },
                oncomplete: () => {},
            });
        }
    },
    // 6.生成收银台 地址
    async receiptsPayprecreate(orderNo) {
        let User = await this.$User.getUser();
        this.$niceloo.api.call('uc/create-payment-address', {
            sceneCode: 'PC', //场景编码	String	否				运营中心：使用固定值MP；网站根据实际情况选择
            tradeClientCode: this.Config.tradeclientCode, //客户端编码	String	否				运营中心：使用固定值OP;网站根据实际情况选择
            orderNo, //订单编号	String	否
            tradeRecordFrontUrl: location.origin + '/learningCenter/index/myCourse',
            onsuccess: async (res) => {
                // 清除存储的订单信息
                if (this.$route.query.orderType == 'shoppingCart') {
                    await this.$shoppingCart.clear();
                }
                this.$cookieUtil.del(User.userId + this.Config.env + 'orderClass');
                if (location.href.indexOf('zywinner') > -1) {
                    res.cashUrl = res.cashUrl.replace('niceloo', 'zywinner');
                }
                if (this.paidDetails.orderSource === 'SH') {
                    if (res.cashUrl.indexOf('?') > -1) {
                        res.cashUrl += '&type=selfLearn';
                    } else {
                        res.cashUrl += '?type=selfLearn';
                    }
                }

                if (/^(https):\/\//i.test(location.href) && /^(http):\/\//i.test(res.cashUrl)) {
                    res.cashUrl = res.cashUrl.replace('http', 'https');
                }

                window.location.href = res.cashUrl.indexOf('uc/order') >= 0 ? res.cashUrl.replace('uc/order', 'uc/manager/order') : res.cashUrl;
            },
            onerror: this.$niceloo.api.handleFailure,
            oncomplete: () => {},
        });
    },

    // 获取收货地址列表
    getUserAddress() {
        this.$niceloo.api.call('bd/bd-recvaddr-list', {
            onsuccess: (result) => {
                let midAddress = {};
                if (this.userAddress.length > 0) {
                    this.userAddress.forEach((val) => {
                        if (val.active) {
                            midAddress = val;
                        }
                    });
                }
                this.userAddress = result.data || [];
                if (this.userAddress.length > 0) {
                    this.userAddress.forEach((val) => {
                        this.$set(val, 'active', false);
                    });
                    if (!this.orderNo) {
                        this.userAddress[0].active = true;
                    } else if (!this.paidDetails.orderAddress.oaName) {
                        this.userAddress[0].active = true;
                    }
                    this.userAddress.forEach((val) => {
                        if (val.recvaddrSourceid == midAddress.recvaddrSourceid) {
                            this.choseAddress(val);
                            // val.active = true;
                        }
                    });
                }
            },
            onerror: this.$niceloo.api.handleFailure,
            oncomplete: () => {},
        });
    },
    /**
     * @description 判断是否有强制阅读协议
     */
    judgeDeal(classLists) {
        let aptReadingFindDtoList = [];
        let effectClass = [];
        //直接添加到购物车购买
        if (!this.orderNo) {
            classLists.forEach((item) => {
                //判断订单是否有效 是否是转出订单 电子协议且有协议
                if (
                    item.orderValidstatus !== 'N' &&
                    item.orderitemOperation !== 'CHAO' &&
                    item.classAtype == 'E' &&
                    (item.classAsertype == 'R' ||
                        item.classAsertype == 'F' ||
                        item.classAsertype == 'U' ||
                        item.classAsertype == 'N' ||
                        item.classAsertype == 'K')
                ) {
                    let obj = {
                        classId: item.classId,
                        isOrderCenterPay: 0,
                    };
                    aptReadingFindDtoList.push(obj);
                    effectClass.push(item);
                }
            });
        } else {
            //待付款 通过订单号
            classLists.forEach((item) => {
                //判断订单是否有效 是否是转出订单 订单类型不属于退费 协议类型为电子协议 订单项服务类型编码不为无协议
                if (
                    item.orderValidstatus !== 'N' &&
                    item.orderitemOperation !== 'CHAO' &&
                    this.paidDetails.orderSubtype != 'REP' &&
                    item.orderitemService.orderitemAgreementtype == 'E' &&
                    item.orderitemService.orderitemServicetype != 'B'
                ) {
                    let obj = {
                        classId: item.skuId,
                        isOrderCenterPay: 0,
                    };
                    aptReadingFindDtoList.push(obj);
                    effectClass.push(item);
                }
            });
        }

        this.$callApi('xieyiqueren/query-readingAgr-find-man-reading', {
            aptReadingFindDtoList,
            onsuccess: (res) => {
                // this.dealList = res.bdFindManReadingResponses.filter((classItem) => {
                //     return classLists.some((i) => (i.classId === classItem.classId || i.skuId === classItem.classId) && classItem.isAptReading === '1');
                // });
                //判断订单中是否有一个订单满足强制弹出协议 有的话全展示有效班级的协议
                let flag = res.bdFindManReadingResponses.some((i) => i.isAptReading === '1');
                if (flag) {
                    this.dealList = effectClass;
                } else {
                    effectClass = [];
                }
                if (this.dealList.length) {
                    //将班级id存入session
                    let arr = [];
                    this.dealList.forEach((item) => {
                        arr.push(item.classId);
                    });
                    this.setSession(arr);
                    //是否有强制知弹出协议
                    this.showFooter = true;
                    this.hasAgreement = true;
                    this.isShow = true;
                    let seconds = Number(res.mandatoryReadingTime);
                    let isPullDown = res.downBottomReading === '1';
                    this.$refs.agreementPurchase.setUp({ seconds, isPullDown });
                    this.$nextTick(() => {
                        this.$refs.agreementPurchase.open(classLists[0]);
                    });
                }
            },
        });
    },
    confirmFn() {
        this.agreed = true;
        this.isShow = false;
        this.dealList = [];
        this.showFooter = false;
    },
    closeFn() {
        this.isShow = false;
        this.dealList = [];
        this.showFooter = false;
    },
    closePopUp() {
        this.isShowPop = false;
    },
    confirmPopUp() {
        this.isShowPop = false;
        this.$router.push('/uc');
    },
    setSession(arr) {
        let sessionArr = JSON.parse(sessionStorage.getItem('classIds')) || [];
        if (sessionArr.length) {
            let arrAry = new Set([...sessionArr, ...arr]);
            sessionStorage.setItem('classIds', JSON.stringify(Array.from(arrAry)));
        } else {
            sessionStorage.setItem('classIds', JSON.stringify(arr));
        }
    },
    getSession() {
        return JSON.parse(sessionStorage.getItem('classIds')) || [];
    },
    async submitOrderTrack(orderNo) {
        let orderPrice = (this.paidDetails.orderTotalamount || this.orderMoney).toString().split('');
        let payablePrice = (this.paidDetails.remainPayamount || this.orderMoney - this.orderDiscountamount).toString().split('');
        orderPrice.splice(orderPrice.length - 2, 0, '.');
        payablePrice.splice(payablePrice.length - 2, 0, '.');
        let User = await this.$User.getUser();
        let classDetail = JSON.parse(sessionStorage.getItem(User.userId + 'order'));
        let orderPriceNum = orderPrice.join('');
        let payablePriceNum = payablePrice.join('');
        this.trackWebYouluSubmitOrder({
            course_name: classDetail.classtypeName,
            project_position: classDetail.projectId || '-',
            subject_name: classDetail.subjectId || '-',
            course_type: '系统课',
            order_number: orderNo,
            order_type: '正价课订单',
            order_price: +orderPriceNum,
            payable_price: payablePriceNum,
        });
    },

    // 获取用户订单所使用的优惠券
    queryOrderUsedCouponList(userCouponIds) {
        this.$niceloo.api.call('mp/query-order-used-coupon-list', {
            // 用户优惠券标识,多个逗号分隔
            userCouponIds: userCouponIds.join(','),

            onsuccess: (data) => {
                this.couponList = data.list;
            },

            onerror: niceloo.api.handleFailure,
            oncomplete: () => {},
        });
    },

    /**
     * 点击使用说明
     *
     * @param {string} userCouponId 用户领取优惠券id
     */
    changeExplain(userCouponId) {
        if (this.$refs.CouponItemViewItem1 && this.$refs.CouponItemViewItem1.length > 0) {
            this.$refs.CouponItemViewItem1.forEach((item) => {
                if (userCouponId !== item.couponDetail.userCouponId) {
                    item.isShowExplain = false;
                }
            });
        }
        if (this.$refs.CouponItemViewItem2 && this.$refs.CouponItemViewItem2.length > 0) {
            this.$refs.CouponItemViewItem2.forEach((item) => {
                if (userCouponId !== item.couponDetail.userCouponId) {
                    item.isShowExplain = false;
                }
            });
        }
    },
};
