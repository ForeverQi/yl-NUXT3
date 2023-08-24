/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "verify-order-coupon";

        var apiDefinition = {
            api: "ordering/promotion/couponverify",
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
                    "title": "优惠券校验",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "skuList": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "skuList",
                            "@name": "skuList"
                        },

                        "couponList": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "couponList",
                            "@name": "couponList"
                        },

                        "userId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userId",
                            "@name": "userId"
                        }
                    },

                    "required": ["skuList", "couponList", "userId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "优惠券校验",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "promotionPrice": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "promotionPrice",
                            "@name": "promotionPrice"
                        },

                        "totalAmount": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "totalAmount",
                            "@name": "totalAmount"
                        }
                    },

                    "required": ["promotionPrice", "totalAmount"]
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

    var pluginName = "nl:uc/verify-order-coupon";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.OC2023.verify-order-coupon.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:uc/verify-order-coupon$options=./api.OC2023.verify-order-coupon.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();