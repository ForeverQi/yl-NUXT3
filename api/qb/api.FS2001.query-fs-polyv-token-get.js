/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-fs-polyv-token-get";

        var apiDefinition = {
            api: "fs/polyv/token/get",
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
                    "title": "（试题/知识点）视频解析 -保利威视加密视频播放安全令牌",
                    "description": "（试题/知识点）视频解析 -保利威视加密视频播放安全令牌",
                    "type": "object",

                    "properties": {
                        "videoId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "videoId",
                            "@name": "videoId"
                        },

                        "type": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "type",
                            "@name": "type"
                        },

                        "bizId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "bizId",
                            "@name": "bizId"
                        }
                    },

                    "required": ["videoId", "type", "bizId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "（试题/知识点）视频解析 -保利威视加密视频播放安全令牌",
                    "description": "（试题/知识点）视频解析 -保利威视加密视频播放安全令牌",
                    "type": "object",

                    "properties": {
                        "token": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "token",
                            "@name": "token"
                        },

                        "ts": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "ts",
                            "@name": "ts"
                        },

                        "sign": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sign",
                            "@name": "sign"
                        }
                    },

                    "required": ["token", "ts", "sign"]
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
    var pluginName = "nl:qb/query-fs-polyv-token-get";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.FS2001.query-fs-polyv-token-get.options.js"
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
            "nl:qb/query-fs-polyv-token-get$options=./api.FS2001.query-fs-polyv-token-get.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();