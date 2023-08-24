/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-play-token-new";

        var apiDefinition = {
            api: "cc/user/polyv/child/token/get",
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
                    "title": "【保利威】 学员端获取保利威Token(子账号)",
                    "description": "区分班级的获取播放token",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "coursewareId": {
                            "type": "string",
                            "required": true,
                            "@alias": "coursewareId",
                            "@name": "coursewareId"
                        },

                        "videoId": {
                            "type": "string",
                            "required": true,
                            "@alias": "videoId",
                            "@name": "videoId"
                        },

                        "iswxa": {
                            "type": "string",
                            "required": false,
                            "@alias": "iswxa",
                            "@name": "iswxa"
                        }
                    },

                    "required": ["classId", "coursewareId", "videoId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "【保利威】 学员端获取保利威Token(子账号)",
                    "description": "区分班级的获取播放token",
                    "type": "object",

                    "properties": {
                        "token": {
                            "type": "string",
                            "required": true,
                            "@alias": "token",
                            "@name": "token"
                        },

                        "sign": {
                            "type": "string",
                            "required": true,
                            "@alias": "sign",
                            "@name": "sign"
                        },

                        "ts": {
                            "type": "string",
                            "required": true,
                            "@alias": "ts",
                            "@name": "ts"
                        }
                    },

                    "required": ["token", "sign", "ts"]
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
    var pluginName = "nl:cc/query-play-token-new";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-play-token-new.options.js"
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
            "nl:cc/query-play-token-new$options=./api..query-play-token-new.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();