/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "ks", apiAlias = "chapter-level-tree";

        var apiDefinition = {
            api: "ks/chapter/level/tree/list",
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
                    "title": "获取章节列表(针对一二级章节和全级展示)接口",
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

                        "chapterId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "chapterId",
                            "@name": "chapterId"
                        },

                        "level": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "level",
                            "@name": "level"
                        }
                    },

                    "required": ["subjectId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "获取章节列表(针对一二级章节和全级展示)接口",
                    "description": "",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "chapterId",
                            "chapterTitle",
                            "chapterParentId",
                            "chapteruniqueSeq",
                            "chapterSeq",
                            "childChapterList"
                        ],

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

                            "chapteruniqueSeq": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "chapteruniqueSeq",
                                "@name": "chapteruniqueSeq"
                            },

                            "chapterSeq": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "chapterSeq",
                                "@name": "chapterSeq"
                            },

                            "childChapterList": {
                                "type": "array",
                                "required": true,
                                "default": "",

                                "items": {
                                    "type": "object",

                                    "required": [
                                        "chapterId",
                                        "chapterTitle",
                                        "chapterParentId",
                                        "chapteruniqueSeq",
                                        "chapterSeq",
                                        "childChapterList"
                                    ],

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

                                        "chapteruniqueSeq": {
                                            "type": "string",
                                            "required": true,
                                            "default": "",
                                            "@alias": "chapteruniqueSeq",
                                            "@name": "chapteruniqueSeq"
                                        },

                                        "chapterSeq": {
                                            "type": "string",
                                            "required": true,
                                            "default": "",
                                            "@alias": "chapterSeq",
                                            "@name": "chapterSeq"
                                        },

                                        "childChapterList": {
                                            "type": "array",
                                            "required": true,
                                            "default": "",
                                            "items": {},
                                            "@alias": "childChapterList",
                                            "@name": "childChapterList"
                                        }
                                    }
                                },

                                "@name": "childChapterList"
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
    var pluginName = "nl:ks/chapter-level-tree";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..chapter-level-tree.options.js"
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
            "nl:ks/chapter-level-tree$options=./api..chapter-level-tree.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();