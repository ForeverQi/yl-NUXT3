/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-keyframe-info";

        var apiDefinition = {
            api: "cc/keyframe/info",
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
                    "title": "课件打点详情",
                    "description": "课件打点详情",
                    "type": "object",

                    "properties": {
                        "coursewareId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursewareId",
                            "@name": "coursewareId"
                        },

                        "coursewareSourceid": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursewareSourceid",
                            "@name": "coursewareSourceid"
                        }
                    },

                    "required": ["coursewareId", "coursewareSourceid"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "课件打点详情",
                    "description": "课件打点详情",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "keyframeId",
                                    "keyframeName",
                                    "keyframeTime",
                                    "paperId",
                                    "keyframeSeq",
                                    "coursewareId"
                                ],

                                "properties": {
                                    "keyframeId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "keyframeId",
                                        "@name": "keyframeId"
                                    },

                                    "keyframeName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "keyframeName",
                                        "@name": "keyframeName"
                                    },

                                    "keyframeTime": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "keyframeTime",
                                        "@name": "keyframeTime"
                                    },

                                    "paperId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperId",
                                        "@name": "paperId"
                                    },

                                    "keyframeSeq": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "keyframeSeq",
                                        "@name": "keyframeSeq"
                                    },

                                    "coursewareId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursewareId",
                                        "@name": "coursewareId"
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

    var defineModule = new Function("return this")().defineModule;
    var pluginName = "nl:cc/query-keyframe-info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CC0002.query-keyframe-info.options.js"
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
            "nl:cc/query-keyframe-info$options=./api.CC0002.query-keyframe-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();