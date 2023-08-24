/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "order", apiAlias = "microclass-unpaid";

        var apiDefinition = {
            api: "ordering/studentorder/microclass/unpaid/post",
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
                    "title": "微课未支付订单列表",
                    "description": "微课未支付订单列表",
                    "type": "object",

                    "properties": {
                        "userId": {
                            "type": "string",
                            "required": false,
                            "@alias": "userId",
                            "@name": "userId"
                        },

                        "brandId": {
                            "type": "string",
                            "required": false,
                            "@alias": "brandId",
                            "@name": "brandId"
                        },

                        "pageIndex": {
                            "type": "string",
                            "required": false,
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "string",
                            "required": false,
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "微课未支付订单列表",
                    "description": "微课未支付订单列表",
                    "type": "object",

                    "properties": {
                        "total": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "total",
                            "@name": "total"
                        },

                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "orderId",
                                    "orderNo",
                                    "approvalstatus",
                                    "approvalstatusdes",
                                    "orderPayamount",
                                    "orderItems",
                                    "orderType",
                                    "orderSource",
                                    "orderPaystatus",
                                    "orderCreateddate",
                                    "orderStatus",
                                    "orderTimeexprice"
                                ],

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

                                    "orderPayamount": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderPayamount",
                                        "@name": "orderPayamount"
                                    },

                                    "orderItems": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",

                                            "required": [
                                                "giftItems",
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
                                                "specs",
                                                "orderitemStatus",
                                                "orderitemStatusname"
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

                                                "oiPromotionprice": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "oiPromotionprice",
                                                    "@name": "oiPromotionprice"
                                                },

                                                "discountAmount": {
                                                    "type": "string",
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
                                                }
                                            }
                                        },

                                        "@alias": "orderItems",
                                        "@name": "orderItems"
                                    },

                                    "orderType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderType",
                                        "@name": "orderType"
                                    },

                                    "orderSource": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderSource",
                                        "@name": "orderSource"
                                    },

                                    "orderPaystatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderPaystatus",
                                        "@name": "orderPaystatus"
                                    },

                                    "orderCreateddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderCreateddate",
                                        "@name": "orderCreateddate"
                                    },

                                    "orderStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderStatus",
                                        "@name": "orderStatus",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "CRE",
                                            "value": "CRE"
                                        }, {
                                            "type": "string",
                                            "name": "PAI",
                                            "value": "PAI"
                                        }, {
                                            "type": "string",
                                            "name": "EXP",
                                            "value": "EXP"
                                        }, {
                                            "type": "string",
                                            "name": "CAN",
                                            "value": "CAN"
                                        }]
                                    },

                                    "orderTimeexprice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderTimeexprice",
                                        "@name": "orderTimeexprice"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        },

                        "msg": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "msg",
                            "@name": "msg"
                        }
                    },

                    "required": ["total", "data", "msg"]
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
    var pluginName = "nl:order/microclass-unpaid";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.MCU4008.microclass-unpaid.options.js"
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
            "nl:order/microclass-unpaid$options=./api.MCU4008.microclass-unpaid.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();