/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "dc", apiAlias = "query-download-information-path";

        var apiDefinition = {
            api: "dc/doc/download",
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
                    "title": "获取资料下载链接",
                    "description": "获取资料下载路径",
                    "type": "object",

                    "properties": {
                        "docId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docId",
                            "@name": "docId"
                        },

                        "extension": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "extension",
                            "@name": "extension"
                        },

                        "packId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "packId",
                            "@name": "packId"
                        }
                    },

                    "required": ["docId", "extension", "packId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "获取资料下载链接",
                    "description": "获取资料下载路径",
                    "type": "object",

                    "properties": {
                        "code": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "code",
                            "@name": "code",

                            "@enums": [{
                                "type": "string",
                                "name": "TRUE",
                                "value": "0000"
                            }, {
                                "type": "string",
                                "name": "NOT_EXIST",
                                "value": "NOT_EXIST"
                            }, {
                                "type": "string",
                                "name": "NOT_READY",
                                "value": "NOT_READY"
                            }, {
                                "type": "string",
                                "name": "NOT_AUTH",
                                "value": "NOT_AUTH"
                            }, {
                                "type": "string",
                                "name": "ERROR",
                                "value": "ERROR"
                            }, {
                                "type": "string",
                                "name": "MAX_COUNT",
                                "value": "MAX_COUNT"
                            }]
                        },

                        "downloadToken": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "downloadToken",
                            "@name": "downloadToken"
                        },

                        "docPath": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "docPath",
                            "@name": "docPath"
                        }
                    },

                    "required": ["code", "downloadToken", "docPath"]
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
    var pluginName = "nl:dc/query-download-information-path";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.DC2015.query-download-information-path.options.js"
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
            "nl:dc/query-download-information-path$options=./api.DC2015.query-download-information-path.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();