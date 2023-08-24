/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-answersheet-profile-list";

        var apiDefinition = {
            api: "qb/answersheet/profile/list",
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
                    "title": "答卷记录列表",
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

                        "paperIds": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperIds",
                            "@name": "paperIds"
                        },

                        "projectCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectCode",
                            "@name": "projectCode"
                        },

                        "orderKey": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "orderKey",
                            "@name": "orderKey"
                        },

                        "orderVal": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "orderVal",
                            "@name": "orderVal",

                            "@enums": [{
                                "type": "string",
                                "name": "preface",
                                "value": "Y"
                            }, {
                                "type": "string",
                                "name": "reverseOrder",
                                "value": "N"
                            }]
                        }
                    },

                    "required": ["sourceType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "答卷记录列表",
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
                                    "paperName",
                                    "papertypeId",
                                    "papertypeName",
                                    "subjectName",
                                    "answersheetStatus",
                                    "answersheetId",
                                    "questionTotal",
                                    "answersheetRecorddate",
                                    "answersheetDurationtime",
                                    "answerRightprob",
                                    "answersheetTotal",
                                    "answerquestionTotal",
                                    "examDuration",
                                    "answersheetEstimatestatus",
                                    "errorQuestionNum"
                                ],

                                "properties": {
                                    "paperId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperId",
                                        "@name": "paperId"
                                    },

                                    "paperName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperName",
                                        "@name": "paperName"
                                    },

                                    "papertypeId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "papertypeId",
                                        "@name": "papertypeId"
                                    },

                                    "papertypeName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "papertypeName",
                                        "@name": "papertypeName"
                                    },

                                    "subjectName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectName",
                                        "@name": "subjectName"
                                    },

                                    "answersheetStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answersheetStatus",
                                        "@name": "answersheetStatus",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "A",
                                            "value": "complete"
                                        }, {
                                            "type": "string",
                                            "name": "U",
                                            "value": "noStart"
                                        }, {
                                            "type": "string",
                                            "name": "G",
                                            "value": "padding"
                                        }]
                                    },

                                    "answersheetId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answersheetId",
                                        "@name": "answersheetId"
                                    },

                                    "questionTotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionTotal",
                                        "@name": "questionTotal"
                                    },

                                    "answersheetRecorddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answersheetRecorddate",
                                        "@name": "answersheetRecorddate"
                                    },

                                    "answersheetDurationtime": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answersheetDurationtime",
                                        "@name": "answersheetDurationtime"
                                    },

                                    "answerRightprob": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerRightprob",
                                        "@name": "answerRightprob"
                                    },

                                    "answersheetTotal": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answersheetTotal",
                                        "@name": "answersheetTotal"
                                    },

                                    "answerquestionTotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerquestionTotal",
                                        "@name": "answerquestionTotal"
                                    },

                                    "examDuration": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examDuration",
                                        "@name": "examDuration"
                                    },

                                    "answersheetEstimatestatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answersheetEstimatestatus",
                                        "@name": "answersheetEstimatestatus",

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

                                    "errorQuestionNum": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "errorQuestionNum",
                                        "@name": "errorQuestionNum"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["count", "data"]
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
    var pluginName = "nl:qb/query-answersheet-profile-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB2001.query-answersheet-profile-list.options.js"
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
            "nl:qb/query-answersheet-profile-list$options=./api.QB2001.query-answersheet-profile-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();