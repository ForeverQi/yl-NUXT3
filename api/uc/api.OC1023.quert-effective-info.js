/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "quert-effective-info";

        var apiDefinition = {
            api: "oc/esign/aging/info",
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
                    "title": "易签宝相关时效信息",
                    "description": "用于易签宝相关订单发票、收据的提示信息内容的展示控制；返回值为空表示所有信息不展示，返回某字段为空表示该字段信息不展示；",
                    "type": "object",

                    "properties": {
                        "clientType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "clientType",
                            "@name": "clientType",

                            "@enums": [{
                                "type": "string",
                                "name": "A",
                                "value": "A"
                            }, {
                                "type": "string",
                                "name": "S",
                                "value": "S"
                            }, {
                                "type": "string",
                                "name": "I",
                                "value": "I"
                            }, {
                                "type": "string",
                                "name": "P",
                                "value": "P"
                            }, {
                                "type": "string",
                                "name": "C",
                                "value": "C"
                            }, {
                                "type": "string",
                                "name": "W",
                                "value": "W"
                            }, {
                                "type": "string",
                                "name": "H",
                                "value": "H"
                            }]
                        }
                    },

                    "required": ["clientType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "易签宝相关时效信息",
                    "description": "用于易签宝相关订单发票、收据的提示信息内容的展示控制；返回值为空表示所有信息不展示，返回某字段为空表示该字段信息不展示；",
                    "type": "object",

                    "properties": {
                        "receiptAging": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "receiptAging",
                            "@name": "receiptAging"
                        },

                        "billOverdue": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "billOverdue",
                            "@name": "billOverdue"
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

    var pluginName = "nl:uc/quert-effective-info";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.OC1023.quert-effective-info.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:uc/quert-effective-info$options=./api.OC1023.quert-effective-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();