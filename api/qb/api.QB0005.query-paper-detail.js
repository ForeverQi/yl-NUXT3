/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-paper-detail";

        var apiDefinition = {
            api: "qb/paper/profile/info",
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
                    "title": "查询试卷详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "paperId": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperId",
                            "@name": "paperId"
                        },

                        "paperGainStatus": {
                            "type": "string",
                            "required": false,
                            "@alias": "isLogin",
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

                        "corpExamId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "corpExamId",
                            "@name": "corpExamId"
                        }
                    },

                    "required": ["paperId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询试卷详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "projectName": {
                            "type": "string",
                            "required": true,
                            "@alias": "className",
                            "@name": "projectName"
                        },

                        "subjectName": {
                            "type": "string",
                            "required": true,
                            "@alias": "subjectName",
                            "@name": "subjectName"
                        },

                        "paperName": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperName",
                            "@name": "paperName"
                        },

                        "paperDescribe": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperMemo",
                            "@name": "paperDescribe"
                        },

                        "paperAuth": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperAuth",
                            "@name": "paperAuth",

                            "@enums": [{
                                "type": "string",
                                "name": "M",
                                "value": "member"
                            }]
                        },

                        "paperYear": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperYear",
                            "@name": "paperYear"
                        },

                        "paperSummary": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperSummary",
                            "@name": "paperSummary"
                        },

                        "paperTypeCode": {
                            "type": "string",
                            "required": true,
                            "@alias": "papertypeCode",
                            "@name": "paperTypeCode"
                        },

                        "paperTotalScore": {
                            "type": "number",
                            "required": true,
                            "@alias": "paperScoretotal",
                            "@name": "paperTotalScore"
                        },

                        "paperCreatedTime": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperCreateddate",
                            "@name": "paperCreatedTime"
                        },

                        "isPaperNeedEvaluateScore": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperIsneedestimate",
                            "@name": "isPaperNeedEvaluateScore",

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

                        "isPaperUnlocked": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperUnLockstate",
                            "@name": "isPaperUnlocked",

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

                        "questionTotalCount": {
                            "type": "number",
                            "required": true,
                            "@alias": "questionTotal",
                            "@name": "questionTotalCount"
                        },

                        "examDurationTime": {
                            "type": "number",
                            "required": true,
                            "@alias": "examDuration",
                            "@name": "examDurationTime"
                        },

                        "participateAmount": {
                            "type": "number",
                            "required": true,
                            "@alias": "participateAmount",
                            "@name": "participateAmount"
                        },

                        "paperLockStatus": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperLockstatus",
                            "@name": "paperLockStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "A",
                                "value": "lock"
                            }, {
                                "type": "string",
                                "name": "G",
                                "value": "unlock"
                            }]
                        },

                        "isUsablePaper": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperAvlstatus",
                            "@name": "isUsablePaper",

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

                        "isDeletedPaper": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperDelstatus",
                            "@name": "isDeletedPaper",

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

                        "paperPublicStatus": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperPublicstatus",
                            "@name": "paperPublicStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "S",
                                "value": "show"
                            }, {
                                "type": "string",
                                "name": "H",
                                "value": "hide"
                            }]
                        },

                        "classUniqueCode": {
                            "type": "string",
                            "required": true,
                            "@alias": "classUniquecode",
                            "@name": "classUniqueCode"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "projectCode": {
                            "type": "string",
                            "required": true,
                            "@alias": "projectCode",
                            "@name": "projectCode"
                        },

                        "papertypeName": {
                            "type": "string",
                            "required": true,
                            "@alias": "papertypeName",
                            "@name": "papertypeName"
                        },

                        "examIntelligent": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "examIntelligent",
                            "@name": "examIntelligent",

                            "@enums": [{
                                "type": "string",
                                "name": "N",
                                "value": "no"
                            }, {
                                "type": "string",
                                "name": "A",
                                "value": "all"
                            }, {
                                "type": "string",
                                "name": "P",
                                "value": "activity"
                            }]
                        }
                    },

                    "required": [
                        "projectName",
                        "subjectName",
                        "paperName",
                        "paperDescribe",
                        "paperAuth",
                        "paperYear",
                        "paperSummary",
                        "paperTypeCode",
                        "paperTotalScore",
                        "paperCreatedTime",
                        "isPaperNeedEvaluateScore",
                        "isPaperUnlocked",
                        "questionTotalCount",
                        "examDurationTime",
                        "participateAmount",
                        "paperLockStatus",
                        "isUsablePaper",
                        "isDeletedPaper",
                        "paperPublicStatus",
                        "classUniqueCode",
                        "projectId",
                        "projectCode",
                        "papertypeName",
                        "examIntelligent"
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
    var pluginName = "nl:qb/query-paper-detail";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB0005.query-paper-detail.options.js"
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
            "nl:qb/query-paper-detail$options=./api.QB0005.query-paper-detail.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();