/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "order", apiAlias = "ordering_studentorder_microclass_orderdetail_post";

        var apiDefinition = {
            api: "ordering/studentorder/microclass/orderdetail/post",
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
                    "title": "微课订单详情",
                    "description": "微课订单详情",
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
                    "title": "微课订单详情",
                    "description": "微课订单详情",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "object",
                            "required": [],

                            "properties": {
                                "orderId": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "orderId",
                                    "@name": "orderId"
                                },

                                "orderNo": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "orderNo",
                                    "@name": "orderNo"
                                },

                                "orderPayamount": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "orderPayamount",
                                    "@name": "orderPayamount"
                                },

                                "orderItems": {
                                    "type": "array",
                                    "required": false,

                                    "items": {
                                        "type": "object",

                                        "required": [
                                            "specs",
                                            "orderitemPictureurl",
                                            "orderitemOperation",
                                            "orderitemStatusname",
                                            "orderitemStatus",
                                            "intoAmount",
                                            "discountAmount",
                                            "oiPromotionprice",
                                            "oiAmount",
                                            "skuAmount",
                                            "skuName",
                                            "skuId",
                                            "productName",
                                            "productId",
                                            "productTypename",
                                            "productType",
                                            "oiId",
                                            "giftItems"
                                        ],

                                        "properties": {
                                            "specs": {
                                                "type": "array",
                                                "required": true,
                                                "default": "",

                                                "items": {
                                                    "type": "object",
                                                    "required": [],

                                                    "properties": {
                                                        "specType": {
                                                            "type": "string",
                                                            "required": false,
                                                            "default": "",
                                                            "@alias": "specType",
                                                            "@name": "specType"
                                                        },

                                                        "specValue": {
                                                            "type": "string",
                                                            "required": false,
                                                            "default": "",
                                                            "@alias": "specValue",
                                                            "@name": "specValue"
                                                        },

                                                        "specName": {
                                                            "type": "string",
                                                            "required": false,
                                                            "default": "",
                                                            "@alias": "specName",
                                                            "@name": "specName"
                                                        }
                                                    }
                                                },

                                                "@alias": "specs",
                                                "@name": "specs"
                                            },

                                            "orderitemPictureurl": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemPictureurl",
                                                "@name": "orderitemPictureurl"
                                            },

                                            "orderitemOperation": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemOperation",
                                                "@name": "orderitemOperation"
                                            },

                                            "orderitemStatusname": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemStatusname",
                                                "@name": "orderitemStatusname"
                                            },

                                            "orderitemStatus": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "orderitemStatus",
                                                "@name": "orderitemStatus"
                                            },

                                            "intoAmount": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "intoAmount",
                                                "@name": "intoAmount"
                                            },

                                            "discountAmount": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "discountAmount",
                                                "@name": "discountAmount"
                                            },

                                            "oiPromotionprice": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "oiPromotionprice",
                                                "@name": "oiPromotionprice"
                                            },

                                            "oiAmount": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "oiAmount",
                                                "@name": "oiAmount"
                                            },

                                            "skuAmount": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "skuAmount",
                                                "@name": "skuAmount"
                                            },

                                            "skuName": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "skuName",
                                                "@name": "skuName"
                                            },

                                            "skuId": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "skuId",
                                                "@name": "skuId"
                                            },

                                            "productName": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "productName",
                                                "@name": "productName"
                                            },

                                            "productId": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "productId",
                                                "@name": "productId"
                                            },

                                            "productTypename": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "productTypename",
                                                "@name": "productTypename"
                                            },

                                            "productType": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "productType",
                                                "@name": "productType"
                                            },

                                            "oiId": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "oiId",
                                                "@name": "oiId"
                                            },

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
                                            }
                                        }
                                    },

                                    "@alias": "orderItems",
                                    "@name": "orderItems"
                                },

                                "orderType": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "orderType",
                                    "@name": "orderType"
                                },

                                "orderSource": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "orderSource",
                                    "@name": "orderSource"
                                },

                                "orderPaystatus": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "orderPaystatus",
                                    "@name": "orderPaystatus"
                                },

                                "orderStatus": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "orderStatus",
                                    "@name": "orderStatus"
                                },

                                "orderTimeexpire": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "orderTimeexpire",
                                    "@name": "orderTimeexpire"
                                },

                                "orderTotalamount": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "orderTotalamount",
                                    "@name": "orderTotalamount"
                                },

                                "aiId": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "aiId",
                                    "@name": "aiId"
                                },

                                "orderCreateddate": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "orderCreateddate",
                                    "@name": "orderCreateddate"
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        },

                        "msg": {
                            "type": "string",
                            "required": false,
                            "@alias": "msg",
                            "@name": "msg"
                        }
                    },

                    "required": []
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

    var pluginName = "nl:order/ordering_studentorder_microclass_orderdetail_post";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MCU5009.ordering_studentorder_microclass_orderdetail_post.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:order/ordering_studentorder_microclass_orderdetail_post$options=./api.MCU5009.ordering_studentorder_microclass_orderdetail_post.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();