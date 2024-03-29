/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "lightClass", apiAlias = "operatecategory-user-list";

        var apiDefinition = {
            api: "mcp/operatecategory/user/list",
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
                    "title": "分页查询运营分类-用户端",
                    "description": "分页查询运营分类-用户端",
                    "type": "object",

                    "properties": {
                        "optName": {
                            "type": "string",
                            "required": false,
                            "@alias": "optName",
                            "@name": "optName"
                        },

                        "optType": {
                            "type": "string",
                            "required": true,
                            "@alias": "optType",
                            "@name": "optType"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "showClient": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "showClient",
                            "@name": "showClient",

                            "@enums": [{
                                "type": "string",
                                "name": "W",
                                "value": "W"
                            }, {
                                "type": "string",
                                "name": "S",
                                "value": "S"
                            }]
                        }
                    },

                    "required": ["optType", "projectId", "showClient"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "分页查询运营分类-用户端",
                    "description": "分页查询运营分类-用户端",
                    "type": "object",

                    "properties": {
                        "count": {
                            "type": "number",
                            "required": true,
                            "@alias": "count",
                            "@name": "count"
                        },

                        "data": {
                            "type": "array",
                            "required": true,

                            "items": {
                                "type": "object",
                                "required": ["optId", "optName"],

                                "properties": {
                                    "optId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "optId",
                                        "@name": "optId"
                                    },

                                    "optName": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "optName",
                                        "@name": "optName"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["count", "data"]
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

    var pluginName = "nl:lightClass/operatecategory-user-list";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MCU2001.operatecategory-user-list.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:lightClass/operatecategory-user-list$options=./api.MCU2001.operatecategory-user-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();