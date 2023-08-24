/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "ss", apiAlias = "query-stusc-Info";

        var apiDefinition = {
            api: "ss/stuscp/stuscInfo",
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
                    "title": "项目成绩详情",
                    "description": "项目成绩详情",
                    "type": "object",

                    "properties": {
                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "stuscpExamyear": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "stuscpExamyear",
                            "@name": "stuscpExamyear"
                        },

                        "stuscpExamcycle": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "stuscpExamcycle",
                            "@name": "stuscpExamcycle"
                        }
                    },

                    "required": ["projectId", "stuscpExamyear", "stuscpExamcycle"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "项目成绩详情",
                    "description": "项目成绩详情",
                    "type": "object",

                    "properties": {
                        "stuscpId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "stuscpId",
                            "@name": "stuscpId"
                        },

                        "studentId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentId",
                            "@name": "studentId"
                        },

                        "userId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userId",
                            "@name": "userId"
                        },

                        "areaCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "areaCode",
                            "@name": "areaCode"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "stuscpExamyear": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "stuscpExamyear",
                            "@name": "stuscpExamyear"
                        },

                        "stuscpExamcycle": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "stuscpExamcycle",
                            "@name": "stuscpExamcycle"
                        },

                        "stuscpCertificate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "stuscpCertificate",
                            "@name": "stuscpCertificate"
                        },

                        "stuscpAuthstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "stuscpAuthstatus",
                            "@name": "stuscpAuthstatus"
                        },

                        "stuscpCreater": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "stuscpCreater",
                            "@name": "stuscpCreater"
                        },

                        "stuscpCreateddate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "stuscpCreateddate",
                            "@name": "stuscpCreateddate"
                        },

                        "stuscpModifier": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "stuscpModifier",
                            "@name": "stuscpModifier"
                        },

                        "stuscpModifieddate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "stuscpModifieddate",
                            "@name": "stuscpModifieddate"
                        },

                        "account": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "account",
                            "@name": "account"
                        },

                        "password": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "password",
                            "@name": "password"
                        },

                        "ssStuscList": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "subjectId",
                                    "subjectName",
                                    "stuscExamstatus",
                                    "stuscScore",
                                    "stuscScoreline",
                                    "stuscPassstatus"
                                ],

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
                                    },

                                    "stuscExamstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "stuscExamstatus",
                                        "@name": "stuscExamstatus"
                                    },

                                    "stuscScore": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "stuscScore",
                                        "@name": "stuscScore"
                                    },

                                    "stuscScoreline": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "stuscScoreline",
                                        "@name": "stuscScoreline"
                                    },

                                    "stuscPassstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "stuscPassstatus",
                                        "@name": "stuscPassstatus"
                                    }
                                }
                            },

                            "@alias": "ssStuscList",
                            "@name": "ssStuscList"
                        }
                    },

                    "required": [
                        "stuscpId",
                        "studentId",
                        "userId",
                        "areaCode",
                        "projectId",
                        "stuscpExamyear",
                        "stuscpExamcycle",
                        "stuscpCertificate",
                        "stuscpAuthstatus",
                        "stuscpCreater",
                        "stuscpCreateddate",
                        "stuscpModifier",
                        "stuscpModifieddate",
                        "account",
                        "password",
                        "ssStuscList"
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
    var pluginName = "nl:ss/query-stusc-Info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.SS1301.query-stusc-Info.options.js"
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
            "nl:ss/query-stusc-Info$options=./api.SS1301.query-stusc-Info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();