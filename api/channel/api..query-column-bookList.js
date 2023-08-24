/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "channel", apiAlias = "query-column-bookList";

        var apiDefinition = {
            api: "mcp/booksWeb/web/column/bookList",
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
                    "title": "频道页-图书列表",
                    "description": "频道页-图书列表",
                    "type": "object",

                    "properties": {
                        "columnId": {
                            "type": "string",
                            "required": true,
                            "@alias": "columnId",
                            "@name": "columnId"
                        },

                        "findCount": {
                            "type": "number",
                            "required": true,
                            "@alias": "findCount",
                            "@name": "findCount"
                        },

                        "showClient": {
                            "type": "string",
                            "required": true,
                            "@alias": "showClient",
                            "@name": "showClient"
                        }
                    },

                    "required": ["columnId", "findCount", "showClient"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "频道页-图书列表",
                    "description": "频道页-图书列表",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "goodsId",
                            "bookId",
                            "projectId",
                            "bookName",
                            "bookPicpath",
                            "bookLights",
                            "bookUrl",
                            "bookSeq",
                            "recommendStatus"
                        ],

                        "properties": {
                            "goodsId": {
                                "type": "string",
                                "required": true,
                                "@alias": "goodsId",
                                "@name": "goodsId"
                            },

                            "bookId": {
                                "type": "string",
                                "required": true,
                                "@alias": "bookId",
                                "@name": "bookId"
                            },

                            "projectId": {
                                "type": "string",
                                "required": true,
                                "@alias": "projectId",
                                "@name": "projectId"
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

                            "bookLights": {
                                "type": "array",
                                "required": true,

                                "items": {
                                    "type": "object",
                                    "required": ["content", "type"],

                                    "properties": {
                                        "title": {
                                            "type": "string",
                                            "required": false,
                                            "@alias": "title",
                                            "@name": "title"
                                        },

                                        "content": {
                                            "type": "string",
                                            "required": true,
                                            "@alias": "content",
                                            "@name": "content"
                                        },

                                        "type": {
                                            "type": "string",
                                            "required": true,
                                            "@alias": "type",
                                            "@name": "type"
                                        }
                                    }
                                },

                                "@alias": "bookLights",
                                "@name": "bookLights"
                            },

                            "bookUrl": {
                                "type": "string",
                                "required": true,
                                "@alias": "bookUrl",
                                "@name": "bookUrl"
                            },

                            "bookSeq": {
                                "type": "number",
                                "required": true,
                                "@alias": "bookSeq",
                                "@name": "bookSeq"
                            },

                            "recommendStatus": {
                                "type": "string",
                                "required": true,
                                "@alias": "recommendStatus",
                                "@name": "recommendStatus"
                            },

                            "recommendExpireddate": {
                                "type": "string",
                                "required": false,
                                "@alias": "recommendExpireddate",
                                "@name": "recommendExpireddate"
                            }
                        }
                    }
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
    var pluginName = "nl:channel/query-column-bookList";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-column-bookList.options.js"
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
            "nl:channel/query-column-bookList$options=./api..query-column-bookList.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();