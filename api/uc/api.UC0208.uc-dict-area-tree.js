/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "uc-dict-area-tree";

        var apiDefinition = {
            api: "uc/dict/area/tree",
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
                    "title": "获取地区",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "areaCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "areaCode",
                            "@name": "areaCode"
                        },

                        "rank": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "rank",
                            "@name": "rank"
                        },

                        "needArea": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "needArea",
                            "@name": "needArea"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "获取地区",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["areaCode", "areaName", "existNode", "children"],

                                "properties": {
                                    "areaCode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "areaCode",
                                        "@name": "areaCode"
                                    },

                                    "areaName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "areaName",
                                        "@name": "areaName"
                                    },

                                    "existNode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "existNode",
                                        "@name": "existNode"
                                    },

                                    "children": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "children",
                                        "@name": "children"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["data"]
                }, {
                    "redundancy": undefined
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
    var pluginName = "nl:uc/uc-dict-area-tree";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.UC0208.uc-dict-area-tree.options.js"
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
            "nl:uc/uc-dict-area-tree$options=./api.UC0208.uc-dict-area-tree.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();