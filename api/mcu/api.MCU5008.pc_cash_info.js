/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "order", apiAlias = "pc_cash_info";

        var apiDefinition = {
            api: "pc/cash/info",
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
                    "title": "收银台交易信息",
                    "description": "收银台交易信息",
                    "type": "object",

                    "properties": {
                        "traderecordId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "traderecordId",
                            "@name": "traderecordId"
                        }
                    },

                    "required": ["traderecordId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "收银台交易信息",
                    "description": "收银台交易信息",
                    "type": "object",

                    "properties": {
                        "tradeclientCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "tradeclientCode",
                            "@name": "tradeclientCode"
                        },

                        "traderecordOrdertradeno": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "traderecordOrdertradeno",
                            "@name": "traderecordOrdertradeno"
                        },

                        "orderId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderId",
                            "@name": "orderId"
                        },

                        "paymentGoodsmemo": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "paymentGoodsmemo",
                            "@name": "paymentGoodsmemo"
                        },

                        "traderecordAmount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "traderecordAmount",
                            "@name": "traderecordAmount"
                        },

                        "platformCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "platformCode",
                            "@name": "platformCode"
                        },

                        "orderUserId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderUserId",
                            "@name": "orderUserId"
                        },

                        "orderUserName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderUserName",
                            "@name": "orderUserName"
                        },

                        "orderUserInfo": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderUserInfo",
                            "@name": "orderUserInfo"
                        },

                        "traderecordFronturl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "traderecordFronturl",
                            "@name": "traderecordFronturl"
                        },

                        "traderecordStagetype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "traderecordStagetype",
                            "@name": "traderecordStagetype"
                        },

                        "orderExpiretime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "orderExpiretime",
                            "@name": "orderExpiretime"
                        },

                        "companyCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "companyCode",
                            "@name": "companyCode"
                        }
                    },

                    "required": [
                        "tradeclientCode",
                        "traderecordOrdertradeno",
                        "orderId",
                        "paymentGoodsmemo",
                        "traderecordAmount",
                        "platformCode",
                        "orderUserId",
                        "orderUserName",
                        "orderUserInfo",
                        "traderecordFronturl",
                        "traderecordStagetype",
                        "orderExpiretime",
                        "companyCode"
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

    var pluginName = "nl:order/pc_cash_info";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MCU5008.pc_cash_info.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:order/pc_cash_info$options=./api.MCU5008.pc_cash_info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();