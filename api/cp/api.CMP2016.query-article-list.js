/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cp", apiAlias = "query-article-list";

        var apiDefinition = {
            api: "cmp/article/list",
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
                    "title": "根据栏目查询资讯列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "ccId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "columnId",
                            "@name": "ccId"
                        },

                        "pageIndex": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        }
                    },

                    "required": ["ccId", "pageIndex", "pageSize"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "根据栏目查询资讯列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "count": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "count",
                            "@name": "count"
                        },

                        "list": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["id", "title", "publishTime", "imgSrc", "isHot", "isTop", "intro"],

                                "properties": {
                                    "id": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caId",
                                        "@name": "id"
                                    },

                                    "title": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caTitle",
                                        "@name": "title"
                                    },

                                    "publishTime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caEffectTime",
                                        "@name": "publishTime"
                                    },

                                    "imgSrc": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caIndexPic",
                                        "@name": "imgSrc"
                                    },

                                    "isHot": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caHot",
                                        "@name": "isHot",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "0",
                                            "value": "no"
                                        }, {
                                            "type": "string",
                                            "name": "1",
                                            "value": "yes"
                                        }]
                                    },

                                    "isTop": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caTop",
                                        "@name": "isTop",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "0",
                                            "value": "no"
                                        }, {
                                            "type": "string",
                                            "name": "1",
                                            "value": "yes"
                                        }]
                                    },

                                    "intro": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caIntro",
                                        "@name": "intro"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "list"
                        }
                    },

                    "required": ["count", "list"]
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
    var pluginName = "nl:cp/query-article-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CMP2016.query-article-list.options.js"
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
            "nl:cp/query-article-list$options=./api.CMP2016.query-article-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();