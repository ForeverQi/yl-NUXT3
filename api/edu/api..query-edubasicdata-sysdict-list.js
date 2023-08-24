/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "edu", apiAlias = "query-edubasicdata-sysdict-list";

        var apiDefinition = {
            api: "edubasicdata/sysdict/list/post",
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
                    "title": "根据Type获取字典内容",
                    "description": "根据Type获取字典内容",
                    "type": "object",

                    "properties": {
                        "dictType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "dictType",
                            "@name": "dictType"
                        },

                        "dictName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "dictName",
                            "@name": "dictName"
                        },

                        "dictAvlStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "dictAvlStatus",
                            "@name": "dictAvlStatus"
                        }
                    },

                    "required": ["dictType", "dictName", "dictAvlStatus"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "根据Type获取字典内容",
                    "description": "根据Type获取字典内容",
                    "type": "object",

                    "properties": {
                        "timestamp": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "timestamp",
                            "@name": "timestamp"
                        },

                        "code": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "code",
                            "@name": "code"
                        },

                        "msg": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "msg",
                            "@name": "msg"
                        },

                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "dictId",
                                    "dictType",
                                    "dictCode",
                                    "dictName",
                                    "dictMemo",
                                    "dictLevelcode",
                                    "dictParentId",
                                    "dictAvlStatus",
                                    "dictSeq"
                                ],

                                "properties": {
                                    "dictId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "dictId",
                                        "@name": "dictId"
                                    },

                                    "dictType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "dictType",
                                        "@name": "dictType"
                                    },

                                    "dictCode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "dictCode",
                                        "@name": "dictCode"
                                    },

                                    "dictName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "dictName",
                                        "@name": "dictName"
                                    },

                                    "dictMemo": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "dictMemo",
                                        "@name": "dictMemo"
                                    },

                                    "dictLevelcode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "dictLevelcode",
                                        "@name": "dictLevelcode"
                                    },

                                    "dictParentId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "dictParentId",
                                        "@name": "dictParentId"
                                    },

                                    "dictAvlStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "dictAvlStatus",
                                        "@name": "dictAvlStatus"
                                    },

                                    "dictSeq": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "dictSeq",
                                        "@name": "dictSeq"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["timestamp", "code", "msg", "data"]
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
    var pluginName = "nl:edu/query-edubasicdata-sysdict-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-edubasicdata-sysdict-list.options.js"
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
            "nl:edu/query-edubasicdata-sysdict-list$options=./api..query-edubasicdata-sysdict-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();