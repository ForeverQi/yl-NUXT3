/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "order", apiAlias = "pc_trade_pay";

        var apiDefinition = {
            api: "pc/trade/pay",
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
                    "title": "发起支付",
                    "description": "发起支付",
                    "type": "object",

                    "properties": {
                        "traderecordId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "traderecordId",
                            "@name": "traderecordId"
                        },

                        "paymodeCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "paymodeCode",
                            "@name": "paymodeCode"
                        },

                        "sceneCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sceneCode",
                            "@name": "sceneCode"
                        },

                        "traderecordNonceno": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "traderecordNonceno",
                            "@name": "traderecordNonceno"
                        },

                        "openId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "openId",
                            "@name": "openId"
                        },

                        "traderecordStagenum": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "traderecordStagenum",
                            "@name": "traderecordStagenum"
                        }
                    },

                    "required": [
                        "traderecordId",
                        "paymodeCode",
                        "sceneCode",
                        "traderecordNonceno",
                        "openId",
                        "traderecordStagenum"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "发起支付",
                    "description": "发起支付",
                    "type": "object",

                    "properties": {
                        "bizType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "bizType",
                            "@name": "bizType"
                        },

                        "bizContent": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "bizContent",
                            "@name": "bizContent"
                        }
                    },

                    "required": ["bizType", "bizContent"]
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

    var pluginName = "nl:order/pc_trade_pay";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MCU5006.pc_trade_pay.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:order/pc_trade_pay$options=./api.MCU5006.pc_trade_pay.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();