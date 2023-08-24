/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "create-payment-address";

        var apiDefinition = {
            api: "ordering/receipts/payprecreate",
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
                    "title": "生成收银台地址（支付预创建）",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "sceneCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sceneCode",
                            "@name": "sceneCode"
                        },

                        "receiptNo": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "receiptNo",
                            "@name": "receiptNo"
                        },

                        "amount": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "amount",
                            "@name": "amount"
                        },

                        "tradeClientCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "tradeClientCode",
                            "@name": "tradeClientCode"
                        },

                        "orderNo": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderNo",
                            "@name": "orderNo"
                        },

                        "tradeRecordFrontUrl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "tradeRecordFrontUrl",
                            "@name": "tradeRecordFrontUrl"
                        }
                    },

                    "required": [
                        "sceneCode",
                        "receiptNo",
                        "amount",
                        "tradeClientCode",
                        "orderNo",
                        "tradeRecordFrontUrl"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "生成收银台地址（支付预创建）",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "traderecordId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "traderecordId",
                            "@name": "traderecordId"
                        },

                        "cashUrl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "cashUrl",
                            "@name": "cashUrl"
                        }
                    },

                    "required": ["traderecordId", "cashUrl"]
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

    var pluginName = "nl:uc/create-payment-address";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.OC2006.create-payment-address.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:uc/create-payment-address$options=./api.OC2006.create-payment-address.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();