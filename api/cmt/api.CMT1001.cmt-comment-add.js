/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cmt", apiAlias = "cmt-comment-add";

        var apiDefinition = {
            api: "cmt/comment/add",
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
                    "title": "提交评价",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "commentContent": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentContent",
                            "@name": "commentContent"
                        },

                        "commentBiztype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentBiztype",
                            "@name": "commentBiztype"
                        },

                        "commentBizid": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentBizid",
                            "@name": "commentBizid"
                        },

                        "commentBizname": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentBizname",
                            "@name": "commentBizname"
                        },

                        "commentLevel": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentLevel",
                            "@name": "commentLevel"
                        },

                        "commentimageSrc": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentimageSrc",
                            "@name": "commentimageSrc"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "serveruserId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "serveruserId",
                            "@name": "serveruserId"
                        },

                        "lableId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "lableId",
                            "@name": "lableId"
                        },

                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "schoolId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "schoolId",
                            "@name": "schoolId"
                        }
                    },

                    "required": [
                        "commentContent",
                        "commentBiztype",
                        "commentBizid",
                        "commentBizname",
                        "commentLevel",
                        "commentimageSrc",
                        "projectId",
                        "subjectId",
                        "serveruserId",
                        "lableId",
                        "classId",
                        "schoolId"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "提交评价",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "commentId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentId",
                            "@name": "commentId"
                        }
                    },

                    "required": ["commentId"]
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

    var pluginName = "nl:cmt/cmt-comment-add";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.CMT1001.cmt-comment-add.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:cmt/cmt-comment-add$options=./api.CMT1001.cmt-comment-add.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();