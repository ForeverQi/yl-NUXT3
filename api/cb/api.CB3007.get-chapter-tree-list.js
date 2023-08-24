/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "zhinengxuexi", apiAlias = "get-chapter-tree-list";

        var apiDefinition = {
            api: "cb/client/chapter/tree/list",
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
                    "title": "源点库章节树形列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "chapterLevel": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "chapterLevel",
                            "@name": "chapterLevel"
                        },

                        "chapterIds": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "chapterIds",
                            "@name": "chapterIds"
                        },

                        "showUnAvl": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "showUnAvl",
                            "@name": "showUnAvl"
                        }
                    },

                    "required": ["subjectId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "源点库章节树形列表",
                    "description": "",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": ["chapterId", "chapterTitle", "chapterParentId", "chapterSeq", "children"],

                        "properties": {
                            "chapterId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "chapterId",
                                "@name": "chapterId"
                            },

                            "chapterTitle": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "chapterTitle",
                                "@name": "chapterTitle"
                            },

                            "chapterParentId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "chapterParentId",
                                "@name": "chapterParentId"
                            },

                            "chapterSeq": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "chapterSeq",
                                "@name": "chapterSeq"
                            },

                            "children": {
                                "type": "array",
                                "required": true,
                                "default": "",
                                "items": {},
                                "@alias": "children",
                                "@name": "children"
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
    var pluginName = "nl:zhinengxuexi/get-chapter-tree-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CB3007.get-chapter-tree-list.options.js"
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
            "nl:zhinengxuexi/get-chapter-tree-list$options=./api.CB3007.get-chapter-tree-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();