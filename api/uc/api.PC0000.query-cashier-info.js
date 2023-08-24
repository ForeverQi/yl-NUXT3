/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "query-cashier-info";

        var apiDefinition = {
            api: "pc/cash/info",
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
                    "title": "收银台交易信息",
                    "description": "",
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
                    "description": "",
                    "type": "object",

                    "properties": {
                        "traderecordOrdertradeno": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "traderecordOrdertradeno",
                            "@name": "traderecordOrdertradeno"
                        },

                        "orderId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "orderId",
                            "@name": "orderId"
                        },

                        "paymentGoodsmemo": {
                            "type": "object",
                            "required": [],
                            "default": "",
                            "properties": {},
                            "@alias": "paymentGoodsmemo",
                            "@name": "paymentGoodsmemo"
                        },

                        "traderecordAmount": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "traderecordAmount",
                            "@name": "traderecordAmount"
                        },

                        "platformCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "platformCode",
                            "@name": "platformCode"
                        },

                        "tradeclientCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "tradeclientCode",
                            "@name": "tradeclientCode"
                        },

                        "orderUserId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "orderUserId",
                            "@name": "orderUserId"
                        },

                        "orderUserName": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "orderUserName",
                            "@name": "orderUserName"
                        },

                        "orderUserInfo": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "orderUserInfo",
                            "@name": "orderUserInfo"
                        },

                        "traderecordFronturl": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "traderecordFronturl",
                            "@name": "traderecordFronturl"
                        },

                        "traderecordStagetype": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "traderecordStagetype",
                            "@name": "traderecordStagetype"
                        },

                        "orderExpiretime": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "orderExpiretime",
                            "@name": "orderExpiretime"
                        },

                        "companyCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "companyCode",
                            "@name": "companyCode"
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

    var pluginName = "nl:uc/query-cashier-info";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.PC0000.query-cashier-info.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:uc/query-cashier-info$options=./api.PC0000.query-cashier-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();