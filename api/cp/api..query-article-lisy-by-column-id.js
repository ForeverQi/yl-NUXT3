/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cp", apiAlias = "query-article-lisy-by-column-id";

        var apiDefinition = {
            api: "cp/info/article/list",
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
                    "title": "资讯列表页-根据栏目id获取资讯列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "ccId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "ccId",
                            "@name": "ccId"
                        },

                        "pageSize": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "pageIndex": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "artProvinceId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "artProvinceId",
                            "@name": "artProvinceId"
                        }
                    },

                    "required": ["ccId", "pageSize", "pageIndex", "artProvinceId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "资讯列表页-根据栏目id获取资讯列表",
                    "description": "",
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
                                    "caCreateon",
                                    "caIndexPic",
                                    "caTitle",
                                    "caIntro",
                                    "caEffectTime",
                                    "caType",
                                    "caTurnUrl",
                                    "artProvinceName",
                                    "isTop",
                                    "isHot"
                                ],

                                "properties": {
                                    "caId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caId",
                                        "@name": "caId"
                                    },

                                    "caCreateon": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caCreateon",
                                        "@name": "caCreateon"
                                    },

                                    "caIndexPic": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caIndexPic",
                                        "@name": "caIndexPic"
                                    },

                                    "caTitle": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caTitle",
                                        "@name": "caTitle"
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

                                    "caType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caType",
                                        "@name": "caType"
                                    },

                                    "caTurnUrl": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caTurnUrl",
                                        "@name": "caTurnUrl"
                                    },

                                    "artProvinceName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "artProvinceName",
                                        "@name": "artProvinceName"
                                    },

                                    "isTop": {
                                        "type": "boolean",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caTop",
                                        "@name": "isTop",

                                        "@enums": [{
                                            "type": "boolean",
                                            "name": "0",
                                            "value": "false"
                                        }, {
                                            "type": "boolean",
                                            "name": "1",
                                            "value": "true"
                                        }]
                                    },

                                    "isHot": {
                                        "type": "boolean",
                                        "required": true,
                                        "default": "",
                                        "@alias": "caHot",
                                        "@name": "isHot",

                                        "@enums": [{
                                            "type": "boolean",
                                            "name": "0",
                                            "value": "false"
                                        }, {
                                            "type": "boolean",
                                            "name": "1",
                                            "value": "true"
                                        }]
                                    }
                                }
                            },

                            "@alias": "list",
                            "@name": "list"
                        },

                        "count": {
                            "type": "string",
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
    var pluginName = "nl:cp/query-article-lisy-by-column-id";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-article-lisy-by-column-id.options.js"
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
            "nl:cp/query-article-lisy-by-column-id$options=./api..query-article-lisy-by-column-id.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();