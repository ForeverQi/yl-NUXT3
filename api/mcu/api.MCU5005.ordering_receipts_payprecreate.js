/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "order", apiAlias = "ordering_receipts_payprecreate";

        var apiDefinition = {
            api: "ordering/receipts/payprecreate",
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
                    "title": "支付预创建",
                    "description": "支付预创建",
                    "type": "object",

                    "properties": {
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

                        "brandId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "brandId",
                            "@name": "brandId"
                        },

                        "receiptNo": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "receiptNo",
                            "@name": "receiptNo"
                        },

                        "amount": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "amount",
                            "@name": "amount"
                        },

                        "sceneCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "sceneCode",
                            "@name": "sceneCode"
                        },

                        "tradeRecordFrontUrl": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "tradeRecordFrontUrl",
                            "@name": "tradeRecordFrontUrl"
                        }
                    },

                    "required": ["tradeClientCode", "orderNo", "brandId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "支付预创建",
                    "description": "支付预创建",
                    "type": "object",

                    "properties": {
                        "tradeRecordId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "tradeRecordId",
                            "@name": "tradeRecordId"
                        },

                        "cashUrl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "cashUrl",
                            "@name": "cashUrl"
                        }
                    },

                    "required": ["tradeRecordId", "cashUrl"]
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

    var pluginName = "nl:order/ordering_receipts_payprecreate";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MCU5005.ordering_receipts_payprecreate.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:order/ordering_receipts_payprecreate$options=./api.MCU5005.ordering_receipts_payprecreate.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();