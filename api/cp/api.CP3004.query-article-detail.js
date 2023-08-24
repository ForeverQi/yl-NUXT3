/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cp", apiAlias = "query-article-detail";

        var apiDefinition = {
            api: "cp/info/article/detail",
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
                    "title": "查询文章详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "caId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "id",
                            "@name": "caId"
                        },

                        "ccProjectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "ccProjectId"
                        }
                    },

                    "required": ["caId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询文章详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "title": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "caTitle",
                            "@name": "title"
                        },

                        "createdTime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "caCreateon",
                            "@name": "createdTime"
                        },

                        "rource": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "caRource",
                            "@name": "rource"
                        },

                        "content": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "caContent",
                            "@name": "content"
                        },

                        "viewCount": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "caViewNum",
                            "@name": "viewCount"
                        },

                        "id": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "caId",
                            "@name": "id"
                        },

                        "ccId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "ccId",
                            "@name": "ccId"
                        },

                        "publicTime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "caEffectTime",
                            "@name": "publicTime"
                        },

                        "nextCaId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "nextCaId",
                            "@name": "nextCaId"
                        },

                        "preCaId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "preCaId",
                            "@name": "preCaId"
                        },

                        "ccProjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "ccProjectId",
                            "@name": "ccProjectId"
                        },

                        "ccName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "ccName",
                            "@name": "ccName"
                        }
                    },

                    "required": [
                        "title",
                        "createdTime",
                        "rource",
                        "content",
                        "viewCount",
                        "id",
                        "ccId",
                        "publicTime",
                        "nextCaId",
                        "preCaId",
                        "ccProjectId",
                        "ccName"
                    ]
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
    var pluginName = "nl:cp/query-article-detail";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CP3004.query-article-detail.options.js"
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
            "nl:cp/query-article-detail$options=./api.CP3004.query-article-detail.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();