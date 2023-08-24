/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "order", apiAlias = "query-other-order-unpaid-list";

        var apiDefinition = {
            api: "ordering/studentorder/traffic/unpaid/post",
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
                    "title": "其他订单未付款列表",
                    "description": "其他订单未付款列表",
                    "type": "object",

                    "properties": {
                        "pageIndex": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "brandId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "brandId",
                            "@name": "brandId"
                        }
                    },

                    "required": ["pageIndex", "pageSize", "brandId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "其他订单未付款列表",
                    "description": "其他订单未付款列表",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "orderId",
                                    "aiId",
                                    "orderNo",
                                    "orderType",
                                    "orderSubtype",
                                    "orderSource",
                                    "orderSourcename",
                                    "orderCreateddate",
                                    "orderTotalamount",
                                    "orderPayamount",
                                    "intoAmount",
                                    "orderTotalSkuAmount",
                                    "orderDiscountamount",
                                    "orderPaystatus",
                                    "orderValidstatus",
                                    "orderEntryterminal",
                                    "orderItems",
                                    "productTagName",
                                    "productTag",
                                    "approvalstatus",
                                    "approvalstatusdes",
                                    "orderTimeexpire"
                                ],

                                "properties": {
                                    "orderId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderId",
                                        "@name": "orderId"
                                    },

                                    "aiId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "aiId",
                                        "@name": "aiId"
                                    },

                                    "orderNo": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderNo",
                                        "@name": "orderNo"
                                    },

                                    "orderType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderType",
                                        "@name": "orderType"
                                    },

                                    "orderSubtype": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderSubtype",
                                        "@name": "orderSubtype"
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

                                    "orderPayamount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderPayamount",
                                        "@name": "orderPayamount"
                                    },

                                    "intoAmount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "intoAmount",
                                        "@name": "intoAmount"
                                    },

                                    "orderTotalSkuAmount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderTotalSkuAmount",
                                        "@name": "orderTotalSkuAmount"
                                    },

                                    "orderDiscountamount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderDiscountamount",
                                        "@name": "orderDiscountamount"
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

                                    "orderEntryterminal": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderEntryterminal",
                                        "@name": "orderEntryterminal"
                                    },

                                    "orderItems": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",

                                            "required": [
                                                "giftItems",
                                                "serviceCount",
                                                "studentClassOpenStatus",
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
                                                "orderitemPictureurl",
                                                "projectId",
                                                "projectName",
                                                "specs",
                                                "coupons"
                                            ],

                                            "properties": {
                                                "giftItems": {
                                                    "type": "array",
                                                    "required": true,
                                                    "default": "",

                                                    "items": {
                                                        "type": "object",
                                                        "required": ["oiId", "productId", "productName", "skuId", "skuName", "skuAmount"],

                                                        "properties": {
                                                            "oiId": {
                                                                "type": "string",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "oiId",
                                                                "@name": "oiId"
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
                                                            }
                                                        }
                                                    },

                                                    "@alias": "giftItems",
                                                    "@name": "giftItems"
                                                },

                                                "serviceCount": {
                                                    "type": "number",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "serviceCount",
                                                    "@name": "serviceCount"
                                                },

                                                "studentClassOpenStatus": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "studentClassOpenStatus",
                                                    "@name": "studentClassOpenStatus"
                                                },

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
                                                    "type": "string",
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
                                                    "type": "number",
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

                                                "orderitemPictureurl": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "orderitemPictureurl",
                                                    "@name": "orderitemPictureurl"
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

                                                "coupons": {
                                                    "type": "array",
                                                    "required": true,
                                                    "default": "",
                                                    "items": {},
                                                    "@alias": "coupons",
                                                    "@name": "coupons"
                                                }
                                            }
                                        },

                                        "@alias": "orderItems",
                                        "@name": "orderItems"
                                    },

                                    "productTagName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "productTagName",
                                        "@name": "productTagName"
                                    },

                                    "productTag": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "productTag",
                                        "@name": "productTag"
                                    },

                                    "approvalstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "approvalstatus",
                                        "@name": "approvalstatus"
                                    },

                                    "approvalstatusdes": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "approvalstatusdes",
                                        "@name": "approvalstatusdes"
                                    },

                                    "orderTimeexpire": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderTimeexpire",
                                        "@name": "orderTimeexpire"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        },

                        "total": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "total",
                            "@name": "total"
                        }
                    },

                    "required": ["data", "total"]
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
    var pluginName = "nl:order/query-other-order-unpaid-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-other-order-unpaid-list.options.js"
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
            "nl:order/query-other-order-unpaid-list$options=./api..query-other-order-unpaid-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();