/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "order", apiAlias = "ordering_orderapproval_apply_post";

        var apiDefinition = {
            api: "ordering/orderapproval/apply/post",
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
                    "title": "提交/暂存/线上订单申请",
                    "description": "提交/暂存/线上订单申请",
                    "type": "object",

                    "properties": {
                        "brandId": {
                            "type": "string",
                            "required": true,
                            "@alias": "brandId",
                            "@name": "brandId"
                        },

                        "approvalAction": {
                            "type": "string",
                            "required": true,
                            "@alias": "approvalAction",
                            "@name": "approvalAction"
                        },

                        "applyForm": {
                            "type": "string",
                            "required": true,
                            "@alias": "applyForm",
                            "@name": "applyForm"
                        },

                        "orderInfo": {
                            "type": "object",

                            "required": [
                                "orderSource",
                                "orderPlatformappcode",
                                "orderBusinesstype",
                                "orderTimeoutseconds",
                                "orderPlatformappcode"
                            ],

                            "properties": {
                                "orderSource": {
                                    "type": "string",
                                    "required": true,
                                    "@alias": "orderSource",
                                    "@name": "orderSource"
                                },

                                "orderPlatformappcode": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "orderPlatformappcode",
                                    "@name": "orderPlatformappcode"
                                },

                                "orderBusinesstype": {
                                    "type": "string",
                                    "required": true,
                                    "@alias": "orderBusinesstype",
                                    "@name": "orderBusinesstype"
                                },

                                "orderTimeoutseconds": {
                                    "type": "number",
                                    "required": true,
                                    "default": "",
                                    "@alias": "orderTimeoutseconds",
                                    "@name": "orderTimeoutseconds"
                                }
                            },

                            "@alias": "orderInfo",
                            "@name": "orderInfo"
                        },

                        "orderItems": {
                            "type": "array",
                            "required": false,

                            "items": {
                                "type": "object",
                                "required": ["productType", "skuId", "oiQuantity"],

                                "properties": {
                                    "productType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "productType",
                                        "@name": "productType"
                                    },

                                    "skuId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "skuId",
                                        "@name": "skuId"
                                    },

                                    "oiQuantity": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "oiQuantity",
                                        "@name": "oiQuantity"
                                    }
                                }
                            },

                            "@alias": "orderItems",
                            "@name": "orderItems"
                        }
                    },

                    "required": ["brandId", "approvalAction", "applyForm"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, undefined, {
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
    var pluginName = "nl:order/ordering_orderapproval_apply_post";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.MCU5001.ordering_orderapproval_apply_post.options.js"
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
            "nl:order/ordering_orderapproval_apply_post$options=./api.MCU5001.ordering_orderapproval_apply_post.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();