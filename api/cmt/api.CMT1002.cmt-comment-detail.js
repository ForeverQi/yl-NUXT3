/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "cmt-comment-detail";

        var apiDefinition = {
            api: "cmt/comment/detail",
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
                    "title": "评价详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "commentId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "commentId",
                            "@name": "commentId"
                        },

                        "commentBizid": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "commentBizid",
                            "@name": "commentBizid"
                        },

                        "projectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "评价详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "commentId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentId",
                            "@name": "commentId"
                        },

                        "commentContent": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentContent",
                            "@name": "commentContent"
                        },

                        "commentKind": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentKind",
                            "@name": "commentKind",

                            "@enums": [{
                                "type": "string",
                                "name": "EU",
                                "value": "EU"
                            }, {
                                "type": "string",
                                "name": "SS",
                                "value": "SS"
                            }]
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
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentLevel",
                            "@name": "commentLevel"
                        },

                        "commentStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentStatus",
                            "@name": "commentStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "P",
                                "value": "P"
                            }, {
                                "type": "string",
                                "name": "U",
                                "value": "U"
                            }, {
                                "type": "string",
                                "name": "O",
                                "value": "O"
                            }]
                        },

                        "commentAvlstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentAvlstatus",
                            "@name": "commentAvlstatus",

                            "@enums": [{
                                "type": "string",
                                "name": "Y",
                                "value": "Y"
                            }, {
                                "type": "string",
                                "name": "N",
                                "value": "N"
                            }]
                        },

                        "commentCreator": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentCreator",
                            "@name": "commentCreator"
                        },

                        "commentCreateddate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentCreateddate",
                            "@name": "commentCreateddate"
                        },

                        "commentModifier": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentModifier",
                            "@name": "commentModifier"
                        },

                        "commentModifieddate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentModifieddate",
                            "@name": "commentModifieddate"
                        },

                        "studentName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentName",
                            "@name": "studentName"
                        },

                        "images": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "images",
                            "@name": "images"
                        },

                        "labels": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["lableId", "lableName"],

                                "properties": {
                                    "lableId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "lableId",
                                        "@name": "lableId"
                                    },

                                    "lableName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "lableName",
                                        "@name": "lableName"
                                    }
                                }
                            },

                            "@alias": "labels",
                            "@name": "labels"
                        },

                        "projectName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectName",
                            "@name": "projectName"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "subjects": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["subjectId", "subjectName"],

                                "properties": {
                                    "subjectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectId",
                                        "@name": "subjectId"
                                    },

                                    "subjectName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectName",
                                        "@name": "subjectName"
                                    }
                                }
                            },

                            "@alias": "subjects",
                            "@name": "subjects"
                        },

                        "processed": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "processedContent",
                                    "processedCreateddate",
                                    "processedCreator",
                                    "processedCreatorname"
                                ],

                                "properties": {
                                    "processedContent": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "processedContent",
                                        "@name": "processedContent"
                                    },

                                    "processedCreateddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "processedCreateddate",
                                        "@name": "processedCreateddate"
                                    },

                                    "processedCreator": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "processedCreator",
                                        "@name": "processedCreator"
                                    },

                                    "processedCreatorname": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "processedCreatorname",
                                        "@name": "processedCreatorname"
                                    }
                                }
                            },

                            "@alias": "processed",
                            "@name": "processed"
                        }
                    },

                    "required": [
                        "commentId",
                        "commentContent",
                        "commentKind",
                        "commentBiztype",
                        "commentBizid",
                        "commentBizname",
                        "commentLevel",
                        "commentStatus",
                        "commentAvlstatus",
                        "commentCreator",
                        "commentCreateddate",
                        "commentModifier",
                        "commentModifieddate",
                        "studentName",
                        "images",
                        "labels",
                        "projectName",
                        "projectId",
                        "subjects",
                        "processed"
                    ]
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
    var pluginName = "nl:cc/cmt-comment-detail";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CMT1002.cmt-comment-detail.options.js"
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
            "nl:cc/cmt-comment-detail$options=./api.CMT1002.cmt-comment-detail.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();