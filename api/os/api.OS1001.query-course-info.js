/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "os", apiAlias = "query-course-info";

        var apiDefinition = {
            api: "os/course/info",
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
                    "title": "公开课详情信息",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "courseId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseId",
                            "@name": "courseId"
                        },

                        "clientType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "clientType",
                            "@name": "clientType"
                        },

                        "courseSourceid": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseSourceid",
                            "@name": "courseSourceid"
                        },

                        "courseSourcecode": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "courseSourcecode",
                            "@name": "courseSourcecode"
                        },

                        "extension": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "extension",
                            "@name": "extension"
                        },

                        "userId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userId",
                            "@name": "userId"
                        },

                        "newExtension": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "newExtension",
                            "@name": "newExtension"
                        }
                    },

                    "required": ["clientType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "公开课详情信息",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "projectName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectName",
                            "@name": "projectName"
                        },

                        "courseName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseName",
                            "@name": "courseName"
                        },

                        "coursePicpath": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursePicpath",
                            "@name": "coursePicpath"
                        },

                        "courseType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseType",
                            "@name": "courseType"
                        },

                        "courseLevel": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseLevel",
                            "@name": "courseLevel"
                        },

                        "courseOpenstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseOpenstatus",
                            "@name": "courseOpenstatus"
                        },

                        "courseUnlocktype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseUnlocktype",
                            "@name": "courseUnlocktype"
                        },

                        "coursePrice": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "coursePrice",
                            "@name": "coursePrice"
                        },

                        "coursePromotiontype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursePromotiontype",
                            "@name": "coursePromotiontype"
                        },

                        "coursePromotionstarttime": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "coursePromotionstarttime",
                            "@name": "coursePromotionstarttime"
                        },

                        "coursePromotionendtime": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "coursePromotionendtime",
                            "@name": "coursePromotionendtime"
                        },

                        "coursePromotionprice": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "coursePromotionprice",
                            "@name": "coursePromotionprice"
                        },

                        "courseFierystatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseFierystatus",
                            "@name": "courseFierystatus"
                        },

                        "appointmentStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "appointmentStatus",
                            "@name": "appointmentStatus"
                        },

                        "catalogList": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "catalogName",
                                    "catalogId",
                                    "catalogSeq",
                                    "catalogShowstatus",
                                    "coursewareList"
                                ],

                                "properties": {
                                    "catalogName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "catalogName",
                                        "@name": "catalogName"
                                    },

                                    "catalogId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "catalogId",
                                        "@name": "catalogId"
                                    },

                                    "catalogSeq": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "catalogSeq",
                                        "@name": "catalogSeq"
                                    },

                                    "catalogShowstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "catalogShowstatus",
                                        "@name": "catalogShowstatus"
                                    },

                                    "coursewareList": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",

                                            "required": [
                                                "coursewareId",
                                                "coursewareName",
                                                "coursewareType",
                                                "coursewareStarttime",
                                                "coursewareEndtime",
                                                "coursewareStatus",
                                                "coursewareLivepath",
                                                "coursewareOnlineplaypath",
                                                "coursewareDownloadpath",
                                                "coursewareShowstatus",
                                                "coursewareOpenstatus",
                                                "coursewareUnlocktype",
                                                "coursewarePrice",
                                                "coursewareAuditionstatus",
                                                "coursewareAuditiontime",
                                                "coursewareSeq",
                                                "coursewareGetstatus",
                                                "livePlatform",
                                                "coursewareLoginstatus",
                                                "coursewareSourceid"
                                            ],

                                            "properties": {
                                                "coursewareId": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareId",
                                                    "@name": "coursewareId"
                                                },

                                                "coursewareName": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareName",
                                                    "@name": "coursewareName"
                                                },

                                                "coursewareType": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareType",
                                                    "@name": "coursewareType"
                                                },

                                                "coursewareStarttime": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareStarttime",
                                                    "@name": "coursewareStarttime"
                                                },

                                                "coursewareEndtime": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareEndtime",
                                                    "@name": "coursewareEndtime"
                                                },

                                                "coursewareStatus": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareStatus",
                                                    "@name": "coursewareStatus"
                                                },

                                                "coursewareLivepath": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareLivepath",
                                                    "@name": "coursewareLivepath"
                                                },

                                                "coursewareOnlineplaypath": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareOnlineplaypath",
                                                    "@name": "coursewareOnlineplaypath"
                                                },

                                                "coursewareDownloadpath": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareDownloadpath",
                                                    "@name": "coursewareDownloadpath"
                                                },

                                                "coursewareShowstatus": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareShowstatus",
                                                    "@name": "coursewareShowstatus"
                                                },

                                                "coursewareOpenstatus": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareOpenstatus",
                                                    "@name": "coursewareOpenstatus"
                                                },

                                                "coursewareUnlocktype": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareUnlocktype",
                                                    "@name": "coursewareUnlocktype"
                                                },

                                                "coursewarePrice": {
                                                    "type": "number",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewarePrice",
                                                    "@name": "coursewarePrice"
                                                },

                                                "coursewareAuditionstatus": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareAuditionstatus",
                                                    "@name": "coursewareAuditionstatus"
                                                },

                                                "coursewareAuditiontime": {
                                                    "type": "number",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareAuditiontime",
                                                    "@name": "coursewareAuditiontime"
                                                },

                                                "coursewareSeq": {
                                                    "type": "number",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareSeq",
                                                    "@name": "coursewareSeq"
                                                },

                                                "coursewareGetstatus": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareGetstatus",
                                                    "@name": "coursewareGetstatus"
                                                },

                                                "livePlatform": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "livePlatform",
                                                    "@name": "livePlatform"
                                                },

                                                "coursewareLoginstatus": {
                                                    "type": "number",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareLoginstatus",
                                                    "@name": "coursewareLoginstatus"
                                                },

                                                "coursewareSourceid": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "coursewareSourceid",
                                                    "@name": "coursewareSourceid"
                                                }
                                            }
                                        },

                                        "@alias": "coursewareList",
                                        "@name": "coursewareList"
                                    }
                                }
                            },

                            "@alias": "catalogList",
                            "@name": "catalogList"
                        },

                        "collectStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "collectStatus",
                            "@name": "collectStatus"
                        },

                        "courseGetstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseGetstatus",
                            "@name": "courseGetstatus"
                        },

                        "coursestatStudynum": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "coursestatStudynum",
                            "@name": "coursestatStudynum"
                        },

                        "coursestatPraisenum": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "coursestatPraisenum",
                            "@name": "coursestatPraisenum"
                        },

                        "coursestatChapternum": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "coursestatChapternum",
                            "@name": "coursestatChapternum"
                        },

                        "coursestatClassnum": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "coursestatClassnum",
                            "@name": "coursestatClassnum"
                        },

                        "coursestatLivestarttime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursestatLivestarttime",
                            "@name": "coursestatLivestarttime"
                        },

                        "coursestatLivestatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursestatLivestatus",
                            "@name": "coursestatLivestatus"
                        },

                        "courseintroduceDetail": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseintroduceDetail",
                            "@name": "courseintroduceDetail"
                        },

                        "systemDate": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "systemDate",
                            "@name": "systemDate"
                        },

                        "coursestatLiveendtime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursestatLiveendtime",
                            "@name": "coursestatLiveendtime"
                        },

                        "courseSourceid": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseSourceid",
                            "@name": "courseSourceid"
                        },

                        "courseId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseId",
                            "@name": "courseId"
                        },

                        "courseSharepath": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseSharepath",
                            "@name": "courseSharepath"
                        },

                        "fristprojectName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "fristprojectName",
                            "@name": "fristprojectName"
                        },

                        "coursewareId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursewareId",
                            "@name": "coursewareId"
                        },

                        "coursestatcollectnum": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "coursestatcollectnum",
                            "@name": "coursestatcollectnum"
                        },

                        "courseCommunitystatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseCommunitystatus",
                            "@name": "courseCommunitystatus"
                        },

                        "courseCommunitytext": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseCommunitytext",
                            "@name": "courseCommunitytext"
                        },

                        "courseCommunityqrcodepath": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseCommunityqrcodepath",
                            "@name": "courseCommunityqrcodepath"
                        },

                        "courseCommunityguidetitle": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseCommunityguidetitle",
                            "@name": "courseCommunityguidetitle"
                        },

                        "courseCommunityguidetext": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseCommunityguidetext",
                            "@name": "courseCommunityguidetext"
                        }
                    },

                    "required": [
                        "projectId",
                        "projectName",
                        "courseName",
                        "coursePicpath",
                        "courseType",
                        "courseLevel",
                        "courseOpenstatus",
                        "courseUnlocktype",
                        "coursePrice",
                        "coursePromotiontype",
                        "coursePromotionstarttime",
                        "coursePromotionendtime",
                        "coursePromotionprice",
                        "courseFierystatus",
                        "appointmentStatus",
                        "catalogList",
                        "collectStatus",
                        "courseGetstatus",
                        "coursestatStudynum",
                        "coursestatPraisenum",
                        "coursestatChapternum",
                        "coursestatClassnum",
                        "coursestatLivestarttime",
                        "coursestatLivestatus",
                        "courseintroduceDetail",
                        "systemDate",
                        "coursestatLiveendtime",
                        "courseSourceid",
                        "courseId",
                        "courseSharepath",
                        "fristprojectName",
                        "coursewareId",
                        "coursestatcollectnum",
                        "courseCommunitystatus",
                        "courseCommunitytext",
                        "courseCommunityqrcodepath",
                        "courseCommunityguidetitle",
                        "courseCommunityguidetext"
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
    var pluginName = "nl:os/query-course-info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.OS1001.query-course-info.options.js"
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
            "nl:os/query-course-info$options=./api.OS1001.query-course-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();