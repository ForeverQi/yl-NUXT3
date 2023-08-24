/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "order", apiAlias = "query-delay-study-argument";

        var apiDefinition = {
            api: "ctc/atplnew/delayexam/order/snapshot",
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
                    "title": "延考续学协议订单快照生成",
                    "description": "获取延考续学协议",
                    "type": "object",

                    "properties": {
                        "atplId": {
                            "type": "string",
                            "required": true,
                            "@alias": "atplId",
                            "@name": "atplId"
                        },

                        "oldOrderNo": {
                            "type": "string",
                            "required": false,
                            "@alias": "oldOrderNo",
                            "@name": "oldOrderNo"
                        },

                        "oldClassNames": {
                            "type": "string",
                            "required": false,
                            "@alias": "oldClassNames",
                            "@name": "oldClassNames"
                        },

                        "newOrderNo": {
                            "type": "string",
                            "required": false,
                            "@alias": "newOrderNo",
                            "@name": "newOrderNo"
                        },

                        "newClassNames": {
                            "type": "string",
                            "required": false,
                            "@alias": "newClassNames",
                            "@name": "newClassNames"
                        },

                        "userName": {
                            "type": "string",
                            "required": false,
                            "@alias": "userName",
                            "@name": "userName"
                        },

                        "userIdcardtype": {
                            "type": "string",
                            "required": false,
                            "@alias": "userIdcardtype",
                            "@name": "userIdcardtype"
                        },

                        "userIdcardno": {
                            "type": "string",
                            "required": false,
                            "@alias": "userIdcardno",
                            "@name": "userIdcardno"
                        },

                        "userMobile": {
                            "type": "string",
                            "required": false,
                            "@alias": "userMobile",
                            "@name": "userMobile"
                        },

                        "signTime": {
                            "type": "string",
                            "required": false,
                            "@alias": "signTime",
                            "@name": "signTime"
                        },

                        "prewStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "prewStatus",
                            "@name": "prewStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "preview",
                                "value": "Y"
                            }, {
                                "type": "string",
                                "name": "official",
                                "value": "N"
                            }]
                        }
                    },

                    "required": ["atplId", "prewStatus"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "延考续学协议订单快照生成",
                    "description": "获取延考续学协议",
                    "type": "object",

                    "properties": {
                        "fileId": {
                            "type": "string",
                            "required": false,
                            "@alias": "fileId",
                            "@name": "fileId"
                        },

                        "filePath": {
                            "type": "string",
                            "required": false,
                            "@alias": "filePath",
                            "@name": "filePath"
                        },

                        "fileKey": {
                            "type": "string",
                            "required": false,
                            "@alias": "fileKey",
                            "@name": "fileKey"
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

    var defineModule = new Function("return this")().defineModule;
    var pluginName = "nl:order/query-delay-study-argument";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-delay-study-argument.options.js"
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
            "nl:order/query-delay-study-argument$options=./api..query-delay-study-argument.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
