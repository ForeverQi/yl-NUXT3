/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "cmt-comment-add";

        var apiDefinition = {
            api: "cmt/comment/add",
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
                    "title": "评价-添加",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "commentContent": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "commentContent",
                            "@name": "commentContent"
                        },

                        "commentBiztype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentBiztype",
                            "@name": "commentBiztype",

                            "@enums": [{
                                "type": "string",
                                "name": "ST",
                                "value": "ST"
                            }, {
                                "type": "string",
                                "name": "SL",
                                "value": "SL"
                            }, {
                                "type": "string",
                                "name": "FF",
                                "value": "FF"
                            }, {
                                "type": "string",
                                "name": "PT",
                                "value": "PT"
                            }, {
                                "type": "string",
                                "name": "PL",
                                "value": "PL"
                            }, {
                                "type": "string",
                                "name": "EQ",
                                "value": "EQ"
                            }, {
                                "type": "string",
                                "name": "HT",
                                "value": "HT"
                            }]
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
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "commentLevel",
                            "@name": "commentLevel"
                        },

                        "commentimageSrc": {
                            "type": "string",
                            "required": false,
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
                            "required": false,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "serveruserId": {
                            "type": "string",
                            "required": false,
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
                            "required": false,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "schoolId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "schoolId",
                            "@name": "schoolId"
                        }
                    },

                    "required": [
                        "commentBiztype",
                        "commentBizid",
                        "commentBizname",
                        "commentLevel",
                        "projectId",
                        "lableId"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "评价-添加",
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

    var defineModule = new Function("return this")().defineModule;
    var pluginName = "nl:cc/cmt-comment-add";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CMT1001.cmt-comment-add.options.js"
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
            "nl:cc/cmt-comment-add$options=./api.CMT1001.cmt-comment-add.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();