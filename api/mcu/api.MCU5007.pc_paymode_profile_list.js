/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "order", apiAlias = "pc_paymode_profile_list";

        var apiDefinition = {
            api: "pc/paymode/profile/list",
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
                    "title": "支付方式列表",
                    "description": "支付方式列表",
                    "type": "object",

                    "properties": {
                        "tradeclientCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "tradeclientCode",
                            "@name": "tradeclientCode"
                        },

                        "payScene": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "payScene",
                            "@name": "payScene"
                        },

                        "paymodeType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "paymodeType",
                            "@name": "paymodeType"
                        },

                        "traderecordId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "traderecordId",
                            "@name": "traderecordId"
                        }
                    },

                    "required": ["tradeclientCode", "payScene", "paymodeType", "traderecordId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "支付方式列表",
                    "description": "支付方式列表",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "paymodeId",
                                    "paymodeCode",
                                    "paymodeName",
                                    "paymodeSeq",
                                    "paymodeIconpath",
                                    "paymodeType",
                                    "paymodeStagetemplate",
                                    "stagePercentTypestagePercentType"
                                ],

                                "properties": {
                                    "paymodeId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paymodeId",
                                        "@name": "paymodeId"
                                    },

                                    "paymodeCode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paymodeCode",
                                        "@name": "paymodeCode"
                                    },

                                    "paymodeName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paymodeName",
                                        "@name": "paymodeName"
                                    },

                                    "paymodeSeq": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paymodeSeq",
                                        "@name": "paymodeSeq"
                                    },

                                    "paymodeIconpath": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paymodeIconpath",
                                        "@name": "paymodeIconpath"
                                    },

                                    "paymodeType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paymodeType",
                                        "@name": "paymodeType"
                                    },

                                    "paymodeStagetemplate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paymodeStagetemplate",
                                        "@name": "paymodeStagetemplate"
                                    },

                                    "stagePercentTypestagePercentType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "stagePercentTypestagePercentType",
                                        "@name": "stagePercentTypestagePercentType"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["data"]
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

    var pluginName = "nl:order/pc_paymode_profile_list";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MCU5007.pc_paymode_profile_list.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:order/pc_paymode_profile_list$options=./api.MCU5007.pc_paymode_profile_list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();