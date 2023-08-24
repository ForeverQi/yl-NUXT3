/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cp", apiAlias = "search-article";

        var apiDefinition = {
            api: "cam/article/web/search",
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
                    "title": "资讯搜索",
                    "description": "资讯搜索",
                    "type": "object",

                    "properties": {
                        "title": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "title",
                            "@name": "title"
                        },

                        "ccProjectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "ccProjectId",
                            "@name": "ccProjectId"
                        },

                        "pageIndex": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "资讯搜索",
                    "description": "资讯搜索",
                    "type": "object",

                    "properties": {
                        "list": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "caId",
                                    "caTitle",
                                    "caIndexPic",
                                    "caIntro",
                                    "caEffectTime",
                                    "caTurnUrl",
                                    "caType",
                                    "caTop",
                                    "caHot",
                                    "areaIds"
                                ],

                                "properties": {
                                    "caId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caId",
                                        "@name": "caId"
                                    },

                                    "caTitle": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caTitle",
                                        "@name": "caTitle"
                                    },

                                    "caIndexPic": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caIndexPic",
                                        "@name": "caIndexPic"
                                    },

                                    "caIntro": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caIntro",
                                        "@name": "caIntro"
                                    },

                                    "caEffectTime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caEffectTime",
                                        "@name": "caEffectTime"
                                    },

                                    "caTurnUrl": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caTurnUrl",
                                        "@name": "caTurnUrl"
                                    },

                                    "caType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caType",
                                        "@name": "caType"
                                    },

                                    "caTop": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caTop",
                                        "@name": "caTop"
                                    },

                                    "caHot": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caHot",
                                        "@name": "caHot"
                                    },

                                    "areaIds": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",
                                        "items": {},
                                        "@alias": "areaIds",
                                        "@name": "areaIds"
                                    }
                                }
                            },

                            "@alias": "list",
                            "@name": "list"
                        },

                        "count": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "count",
                            "@name": "count"
                        },

                        "nowTime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "nowTime",
                            "@name": "nowTime"
                        }
                    },

                    "required": ["list", "count", "nowTime"]
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
    var pluginName = "nl:cp/search-article";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CP3005.search-article.options.js"
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
            "nl:cp/search-article$options=./api.CP3005.search-article.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();