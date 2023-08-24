/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "apply-pay-order";

        var apiDefinition = {
            api: "ordering/order/apply",
            apiModuleName: moduleName,
            apiAlias: apiAlias,

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
                    "title": "订单支付创建订单（统一下单申请）",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "brandId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "brandId",
                            "@name": "brandId"
                        },

                        "userId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userId",
                            "@name": "userId"
                        },

                        "approvalAction": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "approvalAction",
                            "@name": "approvalAction"
                        },

                        "applyForm": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "applyForm",
                            "@name": "applyForm"
                        },

                        "orderInfo": {
                            "type": "object",
                            "required": [],
                            "default": "",
                            "properties": {},
                            "@alias": "orderInfo",
                            "@name": "orderInfo"
                        },

                        "orderItems": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "orderItems",
                            "@name": "orderItems"
                        },

                        "orderAddress": {
                            "type": "object",
                            "required": [],
                            "default": "",
                            "properties": {},
                            "@alias": "orderAddress",
                            "@name": "orderAddress"
                        },

                        "receipts": {
                            "type": "array",
                            "required": false,
                            "default": "",
                            "items": {},
                            "@alias": "receipts",
                            "@name": "receipts"
                        }
                    },

                    "required": ["userId", "approvalAction", "orderInfo", "orderItems"]
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

    var pluginName = "nl:uc/apply-pay-order";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.OC2007.apply-pay-order.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:uc/apply-pay-order$options=./api.OC2007.apply-pay-order.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();