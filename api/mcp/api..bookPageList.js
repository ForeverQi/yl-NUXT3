/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "books", apiAlias = "bookPageList";

        var apiDefinition = {
            api: "mcp/booksWeb/web/bookPageList",
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
                    "title": "官网图书栏目页-图书列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "collegeId": {
                            "type": "string",
                            "required": false,
                            "@alias": "collegeId",
                            "@name": "collegeId"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "projectType": {
                            "type": "string",
                            "required": true,
                            "@alias": "projectType",
                            "@name": "projectType"
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

                    "required": ["projectId", "projectType", "showClient", "pageIndex", "pageSize"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "官网图书栏目页-图书列表",
                    "description": "",
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
                                    "bookId",
                                    "bookLights",
                                    "bookName",
                                    "bookPicpath",
                                    "bookSeq",
                                    "bookUrl",
                                    "goodsId",
                                    "projectId",
                                    "recommendStatus"
                                ],

                                "properties": {
                                    "bookId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "bookId",
                                        "@name": "bookId"
                                    },

                                    "bookLights": {
                                        "type": "array",
                                        "required": true,

                                        "items": {
                                            "type": "object",
                                            "required": ["type", "content"],

                                            "properties": {
                                                "title": {
                                                    "type": "string",
                                                    "required": false,
                                                    "@alias": "title",
                                                    "@name": "title"
                                                },

                                                "type": {
                                                    "type": "string",
                                                    "required": true,
                                                    "@alias": "type",
                                                    "@name": "type"
                                                },

                                                "content": {
                                                    "type": "string",
                                                    "required": true,
                                                    "@alias": "content",
                                                    "@name": "content"
                                                }
                                            }
                                        },

                                        "@alias": "bookLights",
                                        "@name": "bookLights"
                                    },

                                    "bookName": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "bookName",
                                        "@name": "bookName"
                                    },

                                    "bookPicpath": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "bookPicpath",
                                        "@name": "bookPicpath"
                                    },

                                    "bookSeq": {
                                        "type": "number",
                                        "required": true,
                                        "@alias": "bookSeq",
                                        "@name": "bookSeq"
                                    },

                                    "bookUrl": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "bookUrl",
                                        "@name": "bookUrl"
                                    },

                                    "goodsId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "goodsId",
                                        "@name": "goodsId"
                                    },

                                    "projectId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "projectId",
                                        "@name": "projectId"
                                    },

                                    "recommendExpireddate": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "recommendExpireddate",
                                        "@name": "recommendExpireddate"
                                    },

                                    "recommendStatus": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "recommendStatus",
                                        "@name": "recommendStatus"
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

    var defineModule = new Function("return this")().defineModule;
    var pluginName = "nl:books/bookPageList";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..bookPageList.options.js"
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
            "nl:books/bookPageList$options=./api..bookPageList.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();