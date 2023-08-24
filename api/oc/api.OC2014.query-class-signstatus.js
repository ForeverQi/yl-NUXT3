/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "oc", apiAlias = "query-class-signstatus";

        var apiDefinition = {
            api: "ordering/order/paidsku/sign",
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
                    "title": "已付款班级协议签收信息",
                    "description": "班级认证状态获取(CRM)",
                    "type": "object",

                    "properties": {
                        "skuId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "skuId",
                            "@name": "skuId"
                        }
                    },

                    "required": ["skuId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "已付款班级协议签收信息",
                    "description": "班级认证状态获取(CRM)",
                    "type": "object",

                    "properties": {
                        "orderId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderId",
                            "@name": "orderId"
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
                                    "discountAmount",
                                    "orderitemStatus",
                                    "orderitemStatusname",
                                    "orderitemOperation",
                                    "orderitemPictureurl",
                                    "specs",
                                    "giftItems"
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
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "skuAmount",
                                        "@name": "skuAmount"
                                    },

                                    "oiAmount": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "oiAmount",
                                        "@name": "oiAmount"
                                    },

                                    "discountAmount": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "discountAmount",
                                        "@name": "discountAmount"
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

                                    "orderitemPictureurl": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderitemPictureurl",
                                        "@name": "orderitemPictureurl"
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

                                    "giftItems": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "giftItems",
                                        "@name": "giftItems"
                                    }
                                }
                            },

                            "@name": "orderItems"
                        }
                    },

                    "required": [
                        "orderId",
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
                        "orderValidstatus",
                        "orderAddressneedcompletestatus",
                        "orderAddresscompletedstatus",
                        "orderAgreement",
                        "orderItems"
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

    var defineModule = new Function("return this")().defineModule;
    var pluginName = "nl:oc/query-class-signstatus";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.OC2014.query-class-signstatus.options.js"
        ], function() {
            if (typeof defineModule === "function") {
                return defineModule.wrap4amdjs(pluginName, arguments, factory);
            } else {
                return factory(Array.prototype.map.call(arguments, function(r) {
                    return function() {
                        return r;
                    };
                }));
            }
        });
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:oc/query-class-signstatus$options=./api.OC2014.query-class-signstatus.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();