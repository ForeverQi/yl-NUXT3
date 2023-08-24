/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "dict", apiAlias = "query-cbn-noun-queryByEs-v2";

        var apiDefinition = {
            api: "cbn/noun/queryByEs/v2",
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
                    "title": "学员端下拉列表查询",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "userId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userId",
                            "@name": "userId"
                        },

                        "pageIndex": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "searchContent": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "searchContent",
                            "@name": "searchContent"
                        },

                        "searchProjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "searchProjectId",
                            "@name": "searchProjectId"
                        }
                    },

                    "required": ["pageIndex", "pageSize", "searchContent", "searchProjectId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "学员端下拉列表查询",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "nounList": {
                            "type": "array",
                            "required": false,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": [],

                                "properties": {
                                    "names": {
                                        "type": "string",
                                        "required": false,
                                        "default": "",
                                        "@alias": "names",
                                        "@name": "names"
                                    }
                                }
                            },

                            "@name": "nounList"
                        }
                    },

                    "required": []
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
    var pluginName = "nl:dict/query-cbn-noun-queryByEs-v2";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-cbn-noun-queryByEs-v2.options.js"
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
            "nl:dict/query-cbn-noun-queryByEs-v2$options=./api..query-cbn-noun-queryByEs-v2.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();