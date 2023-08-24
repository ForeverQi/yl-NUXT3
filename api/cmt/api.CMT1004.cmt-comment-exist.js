/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cmt", apiAlias = "cmt-comment-exist";

        var apiDefinition = {
            api: "cmt/comment/exist",
            apiModuleName: moduleName,
            apiAlias: apiAlias,

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
                    "title": "判断是否已评价",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "commentBizid": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentBizid",
                            "@name": "commentBizid"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        }
                    },

                    "required": ["commentBizid", "projectId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "判断是否已评价",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "learningManagers": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["projectName", "nickname", "no", "desc", "mobile", "wechat"],

                                "properties": {
                                    "projectName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectName",
                                        "@name": "projectName"
                                    },

                                    "nickname": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "nickname",
                                        "@name": "nickname"
                                    },

                                    "no": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "no",
                                        "@name": "no"
                                    },

                                    "desc": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "desc",
                                        "@name": "desc"
                                    },

                                    "mobile": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "mobile",
                                        "@name": "mobile"
                                    },

                                    "wechat": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "wechat",
                                        "@name": "wechat"
                                    }
                                }
                            },

                            "@alias": "learningManagers",
                            "@name": "learningManagers"
                        }
                    },

                    "required": ["learningManagers"]
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

    var pluginName = "nl:cmt/cmt-comment-exist";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.CMT1004.cmt-comment-exist.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:cmt/cmt-comment-exist$options=./api.CMT1004.cmt-comment-exist.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();