/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-paper-profile-list";

        var apiDefinition = {
            api: "qb/paper/profile/list",
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
                    "title": "试卷列表",
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
                            "required": false,
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

                        "areaCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "areaCode",
                            "@name": "areaCode"
                        },

                        "paperGainStatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperGainStatus",
                            "@name": "paperGainStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "yes",
                                "value": "Y"
                            }, {
                                "type": "string",
                                "name": "no",
                                "value": "N"
                            }]
                        },

                        "examRestrictingplatform": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "examRestrictingplatform",
                            "@name": "examRestrictingplatform"
                        },

                        "dailyPracticeDate": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "dailyPracticeDate",
                            "@name": "dailyPracticeDate"
                        },

                        "paperCreateddate": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperCreateddate",
                            "@name": "paperCreateddate"
                        },

                        "pageIndex": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "paperIds": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperIds",
                            "@name": "paperIds"
                        },

                        "paperPublicstatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperPublicstatus",
                            "@name": "paperPublicstatus"
                        }
                    },

                    "required": ["papertypeCode", "sourceType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "试卷列表",
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

                        "systemTime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "systemTime",
                            "@name": "systemTime"
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
                                    "classUniquecode",
                                    "subjectId",
                                    "subjectName",
                                    "paperName",
                                    "paperSummary",
                                    "paperYear",
                                    "paperAreaname",
                                    "paperScoretotal",
                                    "paperCreatedate",
                                    "examDuration",
                                    "participateAmount",
                                    "questionTotal",
                                    "answersheetId",
                                    "answersheetStatus",
                                    "answersheetDurationtime",
                                    "beforeQuestionseq",
                                    "papersubjectId",
                                    "answerquestiontotal",
                                    "answerCount",
                                    "beforeanswersheetTotal",
                                    "examApplybegindate",
                                    "examApplyenddate",
                                    "examBegindate",
                                    "examEnddate",
                                    "examBurndate",
                                    "examActivitytype",
                                    "examActivityaddress",
                                    "paperLockstatus",
                                    "beforePaperquestiondetail",
                                    "examMemo",
                                    "paperDblockstatus",
                                    "examTags",
                                    "examApplystatus",
                                    "examSign",
                                    "examRestrictingdate",
                                    "courseId",
                                    "paperUnLockstate",
                                    "questionTotalScore"
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

                                    "paperSummary": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperSummary",
                                        "@name": "paperSummary"
                                    },

                                    "paperYear": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperYear",
                                        "@name": "paperYear"
                                    },

                                    "paperAreaname": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperAreaname",
                                        "@name": "paperAreaname"
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

                                    "answerquestiontotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerquestiontotal",
                                        "@name": "answerquestiontotal"
                                    },

                                    "answerCount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerCount",
                                        "@name": "answerCount"
                                    },

                                    "beforeanswersheetTotal": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "beforeanswersheetTotal",
                                        "@name": "beforeanswersheetTotal"
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

                                    "examBurndate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examBurndate",
                                        "@name": "examBurndate"
                                    },

                                    "examActivitytype": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examActivitytype",
                                        "@name": "examActivitytype"
                                    },

                                    "examActivityaddress": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examActivityaddress",
                                        "@name": "examActivityaddress"
                                    },

                                    "paperLockstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperLockstatus",
                                        "@name": "paperLockstatus"
                                    },

                                    "beforePaperquestiondetail": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "beforePaperquestiondetail",
                                        "@name": "beforePaperquestiondetail"
                                    },

                                    "examMemo": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examMemo",
                                        "@name": "examMemo"
                                    },

                                    "paperDblockstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperDblockstatus",
                                        "@name": "paperDblockstatus"
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

                                    "examSign": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examSign",
                                        "@name": "examSign"
                                    },

                                    "examRestrictingdate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examRestrictingdate",
                                        "@name": "examRestrictingdate"
                                    },

                                    "courseId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "courseId",
                                        "@name": "courseId"
                                    },

                                    "paperUnLockstate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperUnLockstate",
                                        "@name": "paperUnLockstate"
                                    },

                                    "questionTotalScore": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionTotalScore",
                                        "@name": "questionTotalScore"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["count", "systemTime", "data"]
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
    var pluginName = "nl:qb/query-paper-profile-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB0003.query-paper-profile-list.options.js"
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
            "nl:qb/query-paper-profile-list$options=./api.QB0003.query-paper-profile-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();