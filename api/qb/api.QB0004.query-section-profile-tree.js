/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-section-profile-tree";

        var apiDefinition = {
            api: "qb/section/profile/tree",
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
                    "title": "试卷章节练习列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "subjectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "papertypeCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "papertypeCode",
                            "@name": "papertypeCode"
                        },

                        "classUniquecode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "classUniquecode",
                            "@name": "classUniquecode"
                        },

                        "sourceType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        },

                        "projectCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectCode",
                            "@name": "projectCode"
                        },

                        "source": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "source",
                            "@name": "source"
                        }
                    },

                    "required": ["sourceType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "试卷章节练习列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "sectionId",
                                    "sectionName",
                                    "questionTotal",
                                    "answerquestionTotal",
                                    "answerRightprob",
                                    "paperId",
                                    "papeSummary",
                                    "answersheetStatus",
                                    "answersheetId",
                                    "answersheetDurationtime",
                                    "beforeQuestionseq",
                                    "papersubjectId",
                                    "children",
                                    "unlockState",
                                    "unlockType"
                                ],

                                "properties": {
                                    "sectionId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "sectionId",
                                        "@name": "sectionId"
                                    },

                                    "sectionName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "sectionName",
                                        "@name": "sectionName"
                                    },

                                    "questionTotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionTotal",
                                        "@name": "questionTotal"
                                    },

                                    "answerquestionTotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerquestionTotal",
                                        "@name": "answerquestionTotal"
                                    },

                                    "answerRightprob": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerRightprob",
                                        "@name": "answerRightprob"
                                    },

                                    "paperId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperId",
                                        "@name": "paperId"
                                    },

                                    "papeSummary": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "papeSummary",
                                        "@name": "papeSummary"
                                    },

                                    "answersheetStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answersheetStatus",
                                        "@name": "answersheetStatus"
                                    },

                                    "answersheetId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answersheetId",
                                        "@name": "answersheetId"
                                    },

                                    "answersheetDurationtime": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answersheetDurationtime",
                                        "@name": "answersheetDurationtime"
                                    },

                                    "beforeQuestionseq": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "beforeQuestionseq",
                                        "@name": "beforeQuestionseq"
                                    },

                                    "papersubjectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "papersubjectId",
                                        "@name": "papersubjectId"
                                    },

                                    "children": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",
                                        "items": {},
                                        "@alias": "children",
                                        "@name": "children"
                                    },

                                    "unlockState": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "unlockState",
                                        "@name": "unlockState"
                                    },

                                    "unlockType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "unlockType",
                                        "@name": "unlockType"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["data"]
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
    var pluginName = "nl:qb/query-section-profile-tree";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB0004.query-section-profile-tree.options.js"
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
            "nl:qb/query-section-profile-tree$options=./api.QB0004.query-section-profile-tree.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();