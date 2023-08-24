/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "batch-query-collect-status";

        var apiDefinition = {
            api: "qb/collect/status/batchquery",
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
                    "title": "批量查询用户收藏状态",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "collectContenttype": {
                            "type": "string",
                            "required": true,
                            "@alias": "collectContentType",
                            "@name": "collectContenttype",

                            "@enums": [{
                                "type": "string",
                                "name": "paper",
                                "value": "P"
                            }, {
                                "type": "string",
                                "name": "question",
                                "value": "Q"
                            }]
                        },

                        "collectContents": {
                            "type": "string",
                            "required": true,
                            "@alias": "collectContents",
                            "@name": "collectContents"
                        },

                        "classUniquecode": {
                            "type": "string",
                            "required": false,
                            "@alias": "classUniqueCode",
                            "@name": "classUniquecode"
                        },

                        "sourceType": {
                            "type": "string",
                            "required": true,
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        },

                        "projectCode": {
                            "type": "string",
                            "required": false,
                            "@alias": "projectCode",
                            "@name": "projectCode"
                        },

                        "projectId": {
                            "type": "string",
                            "required": false,
                            "@alias": "projectId",
                            "@name": "projectId"
                        }
                    },

                    "required": ["collectContenttype", "collectContents", "sourceType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "批量查询用户收藏状态",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "list": {
                            "type": "array",
                            "required": true,

                            "items": {
                                "type": "object",
                                "required": ["collectId", "collectContent", "collectStatus"],

                                "properties": {
                                    "collectId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "collectId",
                                        "@name": "collectId"
                                    },

                                    "collectContent": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "collectContent",
                                        "@name": "collectContent"
                                    },

                                    "collectStatus": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "collectStatus",
                                        "@name": "collectStatus",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "Y",
                                            "value": "collect"
                                        }, {
                                            "type": "string",
                                            "name": "N",
                                            "value": "no-collect"
                                        }]
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "list"
                        },

                        "count": {
                            "type": "number",
                            "required": true,
                            "@alias": "count",
                            "@name": "count"
                        }
                    },

                    "required": ["list", "count"]
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
    var pluginName = "nl:qb/batch-query-collect-status";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB6007.batch-query-collect-status.options.js"
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
            "nl:qb/batch-query-collect-status$options=./api.QB6007.batch-query-collect-status.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();