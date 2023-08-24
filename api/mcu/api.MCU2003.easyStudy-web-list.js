/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "lightClass", apiAlias = "easyStudy-web-list";

        var apiDefinition = {
            api: "mcp/easyStudy/web/list",
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
                    "title": "轻学课-通过运营分类查询轻学课信息(web)",
                    "description": "轻学课-通过运营分类查询轻学课信息(web)-列表",
                    "type": "object",

                    "properties": {
                        "optId": {
                            "type": "string",
                            "required": true,
                            "@alias": "optId",
                            "@name": "optId"
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
                            "@alias": "showClient",
                            "@name": "showClient"
                        },

                        "pageIndex": {
                            "type": "number",
                            "required": true,
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "number",
                            "required": true,
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        }
                    },

                    "required": ["optId", "projectId", "showClient", "pageIndex", "pageSize"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "轻学课-通过运营分类查询轻学课信息(web)",
                    "description": "轻学课-通过运营分类查询轻学课信息(web)-列表",
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

                                "required": [
                                    "categoryName",
                                    "coursePath",
                                    "duration",
                                    "goodsCover",
                                    "goodsId",
                                    "goodsName",
                                    "projectName",
                                    "resourceId",
                                    "subjectName",
                                    "tags"
                                ],

                                "properties": {
                                    "categoryName": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "categoryName",
                                        "@name": "categoryName"
                                    },

                                    "coursePath": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "coursePath",
                                        "@name": "coursePath"
                                    },

                                    "duration": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "duration",
                                        "@name": "duration"
                                    },

                                    "goodsCover": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "goodsCover",
                                        "@name": "goodsCover"
                                    },

                                    "goodsId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "goodsId",
                                        "@name": "goodsId"
                                    },

                                    "goodsName": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "goodsName",
                                        "@name": "goodsName"
                                    },

                                    "projectName": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "projectName",
                                        "@name": "projectName"
                                    },

                                    "resourceId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "resourceId",
                                        "@name": "resourceId"
                                    },

                                    "subjectName": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "subjectName",
                                        "@name": "subjectName"
                                    },

                                    "tags": {
                                        "type": "array",
                                        "required": true,
                                        "items": {},
                                        "@alias": "tags",
                                        "@name": "tags"
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

    var pluginName = "nl:lightClass/easyStudy-web-list";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MCU2003.easyStudy-web-list.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:lightClass/easyStudy-web-list$options=./api.MCU2003.easyStudy-web-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();