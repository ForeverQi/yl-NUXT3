/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-paper-activity-profile-list";

        var apiDefinition = {
            api: "qb/paper/activity/profile/list",
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
                    "title": "活动类型的试卷列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "papertypeCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "papertypeCode",
                            "@name": "papertypeCode"
                        },

                        "sourceType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        },

                        "pageIndex": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        }
                    },

                    "required": ["papertypeCode", "sourceType", "subjectId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "活动类型的试卷列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "count": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "count",
                            "@name": "count"
                        },

                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "paperId",
                                    "papertypeCode",
                                    "papertypeId",
                                    "classUniquecode",
                                    "subjectId",
                                    "subjectName",
                                    "paperName",
                                    "paperYear",
                                    "paperScoretotal",
                                    "paperCreatedate",
                                    "examDuration",
                                    "questionTotal",
                                    "answersheetId",
                                    "answersheetStatus",
                                    "answersheetDurationtime",
                                    "beforeQuestionseq",
                                    "papersubjectId",
                                    "beforePaperquestiondetail",
                                    "courseId",
                                    "paperAvlstatus",
                                    "examEffectivebegindate"
                                ],

                                "properties": {
                                    "paperId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperId",
                                        "@name": "paperId"
                                    },

                                    "papertypeCode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "papertypeCode",
                                        "@name": "papertypeCode"
                                    },

                                    "papertypeId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "papertypeId",
                                        "@name": "papertypeId"
                                    },

                                    "classUniquecode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classUniquecode",
                                        "@name": "classUniquecode"
                                    },

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
                                    },

                                    "paperName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperName",
                                        "@name": "paperName"
                                    },

                                    "paperYear": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperYear",
                                        "@name": "paperYear"
                                    },

                                    "paperScoretotal": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperScoretotal",
                                        "@name": "paperScoretotal"
                                    },

                                    "paperCreatedate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperCreatedate",
                                        "@name": "paperCreatedate"
                                    },

                                    "examDuration": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examDuration",
                                        "@name": "examDuration"
                                    },

                                    "questionTotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionTotal",
                                        "@name": "questionTotal"
                                    },

                                    "answersheetId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answersheetId",
                                        "@name": "answersheetId"
                                    },

                                    "answersheetStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answersheetStatus",
                                        "@name": "answersheetStatus"
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

                                    "beforePaperquestiondetail": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "beforePaperquestiondetail",
                                        "@name": "beforePaperquestiondetail"
                                    },

                                    "courseId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "courseId",
                                        "@name": "courseId"
                                    },

                                    "paperAvlstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperAvlstatus",
                                        "@name": "paperAvlstatus",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "Y",
                                            "value": "yes"
                                        }, {
                                            "type": "string",
                                            "name": "N",
                                            "value": "no"
                                        }]
                                    },

                                    "examEffectivebegindate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examEffectivebegindate",
                                        "@name": "examEffectivebegindate"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        },

                        "systemTime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "systemTime",
                            "@name": "systemTime"
                        }
                    },

                    "required": ["count", "data", "systemTime"]
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
    var pluginName = "nl:qb/query-paper-activity-profile-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB9014.query-paper-activity-profile-list.options.js"
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
            "nl:qb/query-paper-activity-profile-list$options=./api.QB9014.query-paper-activity-profile-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();