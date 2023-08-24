/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-exam-user-list";

        var apiDefinition = {
            api: "qb/exam/user/list",
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
                    "title": "我的模考",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "projectCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectCode",
                            "@name": "projectCode"
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
                            "required": false,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "examRestrictingplatform": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "examRestrictingplatform",
                            "@name": "examRestrictingplatform"
                        },

                        "sourceType": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        },

                        "areaCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "areaCode",
                            "@name": "areaCode"
                        },

                        "pageIndex": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        }
                    },

                    "required": ["classUniquecode", "examRestrictingplatform", "pageIndex", "pageSize"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "我的模考",
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

                        "systeTime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "systeTime",
                            "@name": "systeTime"
                        },

                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "paperId",
                                    "papertypeId",
                                    "subjectId",
                                    "subjectName",
                                    "paperName",
                                    "paperAreaname",
                                    "paperScoretotal",
                                    "participateAmount",
                                    "questionTotal",
                                    "examDuration",
                                    "examApplybegindate",
                                    "examApplyenddate",
                                    "examBegindate",
                                    "examEnddate",
                                    "examTags",
                                    "examApplystatus",
                                    "answersheetStatus",
                                    "answersheetId",
                                    "answersheetDurationtime",
                                    "answersheetTotal",
                                    "courseId",
                                    "answerRate",
                                    "examRestrictingdate",
                                    "examSign",
                                    "answersheetRecorddate"
                                ],

                                "properties": {
                                    "paperId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperId",
                                        "@name": "paperId"
                                    },

                                    "papertypeId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "papertypeId",
                                        "@name": "papertypeId"
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

                                    "paperAreaname": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperAreaname",
                                        "@name": "paperAreaname"
                                    },

                                    "paperScoretotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperScoretotal",
                                        "@name": "paperScoretotal"
                                    },

                                    "participateAmount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "participateAmount",
                                        "@name": "participateAmount"
                                    },

                                    "questionTotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionTotal",
                                        "@name": "questionTotal"
                                    },

                                    "examDuration": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examDuration",
                                        "@name": "examDuration"
                                    },

                                    "examApplybegindate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examApplybegindate",
                                        "@name": "examApplybegindate"
                                    },

                                    "examApplyenddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examApplyenddate",
                                        "@name": "examApplyenddate"
                                    },

                                    "examBegindate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examBegindate",
                                        "@name": "examBegindate"
                                    },

                                    "examEnddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examEnddate",
                                        "@name": "examEnddate"
                                    },

                                    "examTags": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examTags",
                                        "@name": "examTags"
                                    },

                                    "examApplystatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examApplystatus",
                                        "@name": "examApplystatus"
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

                                    "answersheetTotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answersheetTotal",
                                        "@name": "answersheetTotal"
                                    },

                                    "courseId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "courseId",
                                        "@name": "courseId"
                                    },

                                    "answerRate": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerRate",
                                        "@name": "answerRate"
                                    },

                                    "examRestrictingdate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examRestrictingdate",
                                        "@name": "examRestrictingdate"
                                    },

                                    "examSign": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examSign",
                                        "@name": "examSign"
                                    },

                                    "answersheetRecorddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answersheetRecorddate",
                                        "@name": "answersheetRecorddate"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["count", "systeTime", "data"]
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
    var pluginName = "nl:qb/query-exam-user-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB0027.query-exam-user-list.options.js"
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
            "nl:qb/query-exam-user-list$options=./api.QB0027.query-exam-user-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();