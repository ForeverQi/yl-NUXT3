/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "order", apiAlias = "ordering_order_detail";

        var apiDefinition = {
            api: "ordering/order/detail",
            method: "POST",
            apiAlias: apiAlias,
            apiModuleName: moduleName,

            requestHeadersNameAndEnumMapMethod: function(api, headers) {
                return apiNameAndEnumConvert2(headers, undefined);
            },

            requestQueriesNameAndEnumMapMethod: function(api, queries) {
                return apiNameAndEnumConvert2(queries, undefined);
            },

            requestParamsNameAndEnumMapMethod: function(api, params) {
                return apiNameAndEnumConvert2(params, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "订单详情",
                    "description": "订单详情",
                    "type": "object",

                    "properties": {
                        "orderNo": {
                            "type": "string",
                            "required": false,
                            "@alias": "orderNo",
                            "@name": "orderNo"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "订单详情",
                    "description": "订单详情",
                    "type": "object",

                    "properties": {
                        "orderId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderId",
                            "@name": "orderId"
                        },

                        "outputOrderid": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "outputOrderid",
                            "@name": "outputOrderid"
                        },

                        "orderNo": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderNo",
                            "@name": "orderNo"
                        },

                        "orderBusinesstype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderBusinesstype",
                            "@name": "orderBusinesstype"
                        },

                        "orderBusinesstypename": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderBusinesstypename",
                            "@name": "orderBusinesstypename"
                        },

                        "orderType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderType",
                            "@name": "orderType"
                        },

                        "orderTypename": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderTypename",
                            "@name": "orderTypename"
                        },

                        "orderSubtype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderSubtype",
                            "@name": "orderSubtype"
                        },

                        "orderSubtypename": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderSubtypename",
                            "@name": "orderSubtypename"
                        },

                        "orderSource": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderSource",
                            "@name": "orderSource"
                        },

                        "orderSourcename": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderSourcename",
                            "@name": "orderSourcename"
                        },

                        "orderCreateddate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderCreateddate",
                            "@name": "orderCreateddate"
                        },

                        "orderTotalamount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "orderTotalamount",
                            "@name": "orderTotalamount"
                        },

                        "orderDiscountamount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "orderDiscountamount",
                            "@name": "orderDiscountamount"
                        },

                        "orderPayamount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "orderPayamount",
                            "@name": "orderPayamount"
                        },

                        "coIntoamount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "coIntoamount",
                            "@name": "coIntoamount"
                        },

                        "remainPayamount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "remainPayamount",
                            "@name": "remainPayamount"
                        },

                        "orderPaytime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderPaytime",
                            "@name": "orderPaytime"
                        },

                        "orderPaystatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderPaystatus",
                            "@name": "orderPaystatus"
                        },

                        "orderValidstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderValidstatus",
                            "@name": "orderValidstatus"
                        },

                        "orderAddressneedcompletestatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderAddressneedcompletestatus",
                            "@name": "orderAddressneedcompletestatus"
                        },

                        "orderAddresscompletedstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderAddresscompletedstatus",
                            "@name": "orderAddresscompletedstatus"
                        },

                        "orderInvoicecouldapplystatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderInvoicecouldapplystatus",
                            "@name": "orderInvoicecouldapplystatus"
                        },

                        "orderInvoiceapplystatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderInvoiceapplystatus",
                            "@name": "orderInvoiceapplystatus"
                        },

                        "orderInvoiceapplyinfo": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderInvoiceapplyinfo",
                            "@name": "orderInvoiceapplyinfo"
                        },

                        "orderAddress": {
                            "type": "object",

                            "required": [
                                "oaName",
                                "oaPhone",
                                "oaProvince",
                                "oaProvincename",
                                "oaCity",
                                "oaCityname",
                                "oaDistrict",
                                "oaDistrictname",
                                "oaAddress"
                            ],

                            "default": "",

                            "properties": {
                                "oaName": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "oaName",
                                    "@name": "oaName"
                                },

                                "oaPhone": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "oaPhone",
                                    "@name": "oaPhone"
                                },

                                "oaProvince": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "oaProvince",
                                    "@name": "oaProvince"
                                },

                                "oaProvincename": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "oaProvincename",
                                    "@name": "oaProvincename"
                                },

                                "oaCity": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "oaCity",
                                    "@name": "oaCity"
                                },

                                "oaCityname": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "oaCityname",
                                    "@name": "oaCityname"
                                },

                                "oaDistrict": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "oaDistrict",
                                    "@name": "oaDistrict"
                                },

                                "oaDistrictname": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "oaDistrictname",
                                    "@name": "oaDistrictname"
                                },

                                "oaAddress": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "oaAddress",
                                    "@name": "oaAddress"
                                }
                            },

                            "@alias": "orderAddress",
                            "@name": "orderAddress"
                        },

                        "orderItems": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "oiId",
                                    "productType",
                                    "productTypename",
                                    "productId",
                                    "productName",
                                    "skuId",
                                    "skuName",
                                    "skuAmount",
                                    "oiAmount",
                                    "oiPromotionprice",
                                    "discountAmount",
                                    "intoAmount",
                                    "orderitemStatus",
                                    "orderitemStatusname",
                                    "orderitemOperation",
                                    "projectId",
                                    "projectName",
                                    "subjectInfo",
                                    "classCategory",
                                    "subjectPay",
                                    "orderitemService",
                                    "specs",
                                    "giveOrderitems"
                                ],

                                "properties": {
                                    "oiId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "oiId",
                                        "@name": "oiId"
                                    },

                                    "productType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "productType",
                                        "@name": "productType"
                                    },

                                    "productTypename": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "productTypename",
                                        "@name": "productTypename"
                                    },

                                    "productId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "productId",
                                        "@name": "productId"
                                    },

                                    "productName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "productName",
                                        "@name": "productName"
                                    },

                                    "skuId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "skuId",
                                        "@name": "skuId"
                                    },

                                    "skuName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "skuName",
                                        "@name": "skuName"
                                    },

                                    "skuAmount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "skuAmount",
                                        "@name": "skuAmount"
                                    },

                                    "oiAmount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "oiAmount",
                                        "@name": "oiAmount"
                                    },

                                    "oiPromotionprice": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "oiPromotionprice",
                                        "@name": "oiPromotionprice"
                                    },

                                    "discountAmount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "discountAmount",
                                        "@name": "discountAmount"
                                    },

                                    "intoAmount": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "intoAmount",
                                        "@name": "intoAmount"
                                    },

                                    "orderitemStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderitemStatus",
                                        "@name": "orderitemStatus"
                                    },

                                    "orderitemStatusname": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderitemStatusname",
                                        "@name": "orderitemStatusname"
                                    },

                                    "orderitemOperation": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderitemOperation",
                                        "@name": "orderitemOperation"
                                    },

                                    "projectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectId",
                                        "@name": "projectId"
                                    },

                                    "projectName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectName",
                                        "@name": "projectName"
                                    },

                                    "subjectInfo": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectInfo",
                                        "@name": "subjectInfo"
                                    },

                                    "classCategory": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classCategory",
                                        "@name": "classCategory"
                                    },

                                    "subjectPay": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectPay",
                                        "@name": "subjectPay"
                                    },

                                    "orderitemService": {
                                        "type": "object",

                                        "required": [
                                            "orderitemAgreementtype",
                                            "orderitemAgreementtypename",
                                            "orderitemServicetype",
                                            "orderitemServicetypename",
                                            "orderitemRepeatcount",
                                            "orderitemRepeatbookcount",
                                            "orderitemRepeatyear",
                                            "orderitemRefundtype",
                                            "orderitemSubjectrefundtype",
                                            "orderitemRefundtypename",
                                            "orderitemRefundableamount",
                                            "orderitemRefundscale",
                                            "orderitemAgreementurl",
                                            "agreementFileToken",
                                            "orderitemAgreementtemplateid",
                                            "orderitemAgreementclause",
                                            "orderitemAgreementscheme",
                                            "orderitemAfterservices",
                                            "orderitemAfterserviceappliedinfo",
                                            "showClassAserStatus"
                                        ],

                                        "default": "",

                                        "properties": {
                                            "orderitemAgreementtype": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemAgreementtype",
                                                "@name": "orderitemAgreementtype"
                                            },

                                            "orderitemAgreementtypename": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemAgreementtypename",
                                                "@name": "orderitemAgreementtypename"
                                            },

                                            "orderitemServicetype": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemServicetype",
                                                "@name": "orderitemServicetype"
                                            },

                                            "orderitemServicetypename": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemServicetypename",
                                                "@name": "orderitemServicetypename"
                                            },

                                            "orderitemRepeatcount": {
                                                "type": "number",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemRepeatcount",
                                                "@name": "orderitemRepeatcount"
                                            },

                                            "orderitemRepeatbookcount": {
                                                "type": "number",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemRepeatbookcount",
                                                "@name": "orderitemRepeatbookcount"
                                            },

                                            "orderitemRepeatyear": {
                                                "type": "number",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemRepeatyear",
                                                "@name": "orderitemRepeatyear"
                                            },

                                            "orderitemRefundtype": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemRefundtype",
                                                "@name": "orderitemRefundtype"
                                            },

                                            "orderitemSubjectrefundtype": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemSubjectrefundtype",
                                                "@name": "orderitemSubjectrefundtype"
                                            },

                                            "orderitemRefundtypename": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemRefundtypename",
                                                "@name": "orderitemRefundtypename"
                                            },

                                            "orderitemRefundableamount": {
                                                "type": "number",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemRefundableamount",
                                                "@name": "orderitemRefundableamount"
                                            },

                                            "orderitemRefundscale": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemRefundscale",
                                                "@name": "orderitemRefundscale"
                                            },

                                            "orderitemAgreementurl": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemAgreementurl",
                                                "@name": "orderitemAgreementurl"
                                            },

                                            "agreementFileToken": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "agreementFileToken",
                                                "@name": "agreementFileToken"
                                            },

                                            "orderitemAgreementtemplateid": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemAgreementtemplateid",
                                                "@name": "orderitemAgreementtemplateid"
                                            },

                                            "orderitemAgreementclause": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemAgreementclause",
                                                "@name": "orderitemAgreementclause"
                                            },

                                            "orderitemAgreementscheme": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemAgreementscheme",
                                                "@name": "orderitemAgreementscheme"
                                            },

                                            "orderitemAfterservices": {
                                                "type": "array",
                                                "required": true,
                                                "default": "",

                                                "items": {
                                                    "type": "object",
                                                    "required": ["orderitemAfterservicename", "orderitemAfterservicetype"],

                                                    "properties": {
                                                        "orderitemAfterservicename": {
                                                            "type": "string",
                                                            "required": true,
                                                            "default": "",
                                                            "@alias": "orderitemAfterservicename",
                                                            "@name": "orderitemAfterservicename"
                                                        },

                                                        "orderitemAfterservicetype": {
                                                            "type": "string",
                                                            "required": true,
                                                            "default": "",
                                                            "@alias": "orderitemAfterservicetype",
                                                            "@name": "orderitemAfterservicetype"
                                                        }
                                                    }
                                                },

                                                "@alias": "orderitemAfterservices",
                                                "@name": "orderitemAfterservices"
                                            },

                                            "orderitemAfterserviceappliedinfo": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemAfterserviceappliedinfo",
                                                "@name": "orderitemAfterserviceappliedinfo"
                                            },

                                            "showClassAserStatus": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "showClassAserStatus",
                                                "@name": "showClassAserStatus"
                                            }
                                        },

                                        "@alias": "orderitemService",
                                        "@name": "orderitemService"
                                    },

                                    "specs": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",
                                            "required": ["specType", "specValue", "specName"],

                                            "properties": {
                                                "specType": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "specType",
                                                    "@name": "specType"
                                                },

                                                "specValue": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "specValue",
                                                    "@name": "specValue"
                                                },

                                                "specName": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "specName",
                                                    "@name": "specName"
                                                }
                                            }
                                        },

                                        "@alias": "specs",
                                        "@name": "specs"
                                    },

                                    "giveOrderitems": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",
                                            "required": [],
                                            "properties": {}
                                        },

                                        "@alias": "giveOrderitems",
                                        "@name": "giveOrderitems"
                                    }
                                }
                            },

                            "@alias": "orderItems",
                            "@name": "orderItems"
                        },

                        "orderAgreement": {
                            "type": "object",

                            "required": [
                                "agreementVersion",
                                "agreementStatus",
                                "agreementNeedconfirmstatus",
                                "agreementConfirmedtime",
                                "agreementUserinfoconfirmstatus",
                                "userinfoNeedconfirmstatus"
                            ],

                            "default": "",

                            "properties": {
                                "agreementVersion": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "agreementVersion",
                                    "@name": "agreementVersion"
                                },

                                "agreementStatus": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "agreementStatus",
                                    "@name": "agreementStatus"
                                },

                                "agreementNeedconfirmstatus": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "agreementNeedconfirmstatus",
                                    "@name": "agreementNeedconfirmstatus"
                                },

                                "agreementConfirmedtime": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "agreementConfirmedtime",
                                    "@name": "agreementConfirmedtime"
                                },

                                "agreementUserinfoconfirmstatus": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "agreementUserinfoconfirmstatus",
                                    "@name": "agreementUserinfoconfirmstatus"
                                },

                                "userinfoNeedconfirmstatus": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "userinfoNeedconfirmstatus",
                                    "@name": "userinfoNeedconfirmstatus"
                                }
                            },

                            "@alias": "orderAgreement",
                            "@name": "orderAgreement"
                        },

                        "studentInfo": {
                            "type": "object",

                            "required": [
                                "userId",
                                "userName",
                                "userLoginname",
                                "userMobile",
                                "userIdcardtype",
                                "userIdcardtypename",
                                "userIdcard"
                            ],

                            "default": "",

                            "properties": {
                                "userId": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "userId",
                                    "@name": "userId"
                                },

                                "userName": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "userName",
                                    "@name": "userName"
                                },

                                "userLoginname": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "userLoginname",
                                    "@name": "userLoginname"
                                },

                                "userMobile": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "userMobile",
                                    "@name": "userMobile"
                                },

                                "userIdcardtype": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "userIdcardtype",
                                    "@name": "userIdcardtype"
                                },

                                "userIdcardtypename": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "userIdcardtypename",
                                    "@name": "userIdcardtypename"
                                },

                                "userIdcard": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "userIdcard",
                                    "@name": "userIdcard"
                                }
                            },

                            "@alias": "studentInfo",
                            "@name": "studentInfo"
                        },

                        "allPromotionPrice": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "allPromotionPrice",
                            "@name": "allPromotionPrice"
                        }
                    },

                    "required": [
                        "orderId",
                        "outputOrderid",
                        "orderNo",
                        "orderBusinesstype",
                        "orderBusinesstypename",
                        "orderType",
                        "orderTypename",
                        "orderSubtype",
                        "orderSubtypename",
                        "orderSource",
                        "orderSourcename",
                        "orderCreateddate",
                        "orderTotalamount",
                        "orderDiscountamount",
                        "orderPayamount",
                        "coIntoamount",
                        "remainPayamount",
                        "orderPaytime",
                        "orderPaystatus",
                        "orderValidstatus",
                        "orderAddressneedcompletestatus",
                        "orderAddresscompletedstatus",
                        "orderInvoicecouldapplystatus",
                        "orderInvoiceapplystatus",
                        "orderInvoiceapplyinfo",
                        "orderAddress",
                        "orderItems",
                        "orderAgreement",
                        "studentInfo",
                        "allPromotionPrice"
                    ]
                }, {
                    "redundancy": true
                });
            }
        };

        if (null != apiOptions) {
            for (var p in apiOptions) {
                apiDefinition[p] = apiOptions[p];
            }

            api.defineApi(apiDefinition);
        }

        return function(ops) {
            APIModule.ofName(moduleName).callApi(apiAlias, ops);
        };
    };

    var pluginName = "nl:order/ordering_order_detail";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MCU5004.ordering_order_detail.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:order/ordering_order_detail$options=./api.MCU5004.ordering_order_detail.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();