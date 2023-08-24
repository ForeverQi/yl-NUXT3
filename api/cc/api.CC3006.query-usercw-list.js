/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-usercw-list";

        var apiDefinition = {
            api: "cc/usercw/list",
            apiModuleName: moduleName,
            apiAlias: apiAlias,

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
                    "title": "全部学习任务列表",
                    "description": "获取全部学习任务列表",
                    "type": "object",

                    "properties": {
                        "modulId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "modulId",
                            "@name": "modulId"
                        },

                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "ctapId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "ctapId",
                            "@name": "ctapId"
                        }
                    },

                    "required": ["modulId", "classId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "全部学习任务列表",
                    "description": "获取全部学习任务列表",
                    "type": "object",

                    "properties": {
                        "courses": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "courses",
                            "@name": "courses"
                        },

                        "courses[n].courseId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].courseId",
                            "@name": "courses[n].courseId"
                        },

                        "courses[n].courseName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].courseName",
                            "@name": "courses[n].courseName"
                        },

                        "courses[n].courseLearnedcount": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].courseLearnedcount",
                            "@name": "courses[n].courseLearnedcount"
                        },

                        "courses[n].courseTotalcount": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].courseTotalcount",
                            "@name": "courses[n].courseTotalcount"
                        },

                        "courses[n].courseLearnedduration": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].courseLearnedduration",
                            "@name": "courses[n].courseLearnedduration"
                        },

                        "courses[n].courseLearnedstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].courseLearnedstatus",
                            "@name": "courses[n].courseLearnedstatus"
                        },

                        "courses[n].studyingCoursewareid": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].studyingCoursewareid",
                            "@name": "courses[n].studyingCoursewareid"
                        },

                        "courses[n].studyingCoursewarename": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].studyingCoursewarename",
                            "@name": "courses[n].studyingCoursewarename"
                        },

                        "courses[n].keepstudyStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].keepstudyStatus",
                            "@name": "courses[n].keepstudyStatus"
                        },

                        "courses[n].catalogs": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "courses[n].catalogs",
                            "@name": "courses[n].catalogs"
                        },

                        "courses[n].catalogs[n].catalogId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].catalogId",
                            "@name": "courses[n].catalogs[n].catalogId"
                        },

                        "courses[n].catalogs[n].catalogName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].catalogName",
                            "@name": "courses[n].catalogs[n].catalogName"
                        },

                        "courses[n].catalogs[n].catalogElectivestatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].catalogElectivestatus",
                            "@name": "courses[n].catalogs[n].catalogElectivestatus"
                        },

                        "courses[n].catalogs[n].cwCoursepreviousstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].cwCoursepreviousstatus",
                            "@name": "courses[n].catalogs[n].cwCoursepreviousstatus"
                        },

                        "courses[n].catalogs[n].coursewares": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "courses[n].catalogs[n].coursewares",
                            "@name": "courses[n].catalogs[n].coursewares"
                        },

                        "courses[n].catalogs[n].coursewares[n].studyrdDurationcount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].studyrdDurationcount",
                            "@name": "courses[n].catalogs[n].coursewares[n].studyrdDurationcount"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareStudycount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareStudycount",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareStudycount"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareType",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareType"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareId",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareId"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareStarttime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareStarttime",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareStarttime"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareEndtime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareEndtime",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareEndtime"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareBeginstate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareBeginstate",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareBeginstate"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareOnlineurl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareOnlineurl",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareOnlineurl"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareLiveurl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareLiveurl",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareLiveurl"
                        },

                        "courses[n].catalogs[n].coursewares[n].remindStatusname": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].remindStatusname",
                            "@name": "courses[n].catalogs[n].coursewares[n].remindStatusname"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareName",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareName"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareSource": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareSource",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareSource"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareDuration": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareDuration",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareDuration"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareElectivestatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareElectivestatus",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareElectivestatus"
                        },

                        "courses[n].catalogs[n].coursewares[n].teacher": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].teacher",
                            "@name": "courses[n].catalogs[n].coursewares[n].teacher"
                        },

                        "courses[n].catalogs[n].coursewares[n].address": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].address",
                            "@name": "courses[n].catalogs[n].coursewares[n].address"
                        },

                        "courses[n].catalogs[n].coursewares[n].studyStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].studyStatus",
                            "@name": "courses[n].catalogs[n].coursewares[n].studyStatus"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareGroupname": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareGroupname",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareGroupname"
                        },

                        "courses[n].catalogs[n].coursewares[n].classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].classId",
                            "@name": "courses[n].catalogs[n].coursewares[n].classId"
                        },

                        "courses[n].catalogs[n].coursewares[n].remindStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].remindStatus",
                            "@name": "courses[n].catalogs[n].coursewares[n].remindStatus"
                        },

                        "courses[n].catalogs[n].coursewares[n].paperId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].paperId",
                            "@name": "courses[n].catalogs[n].coursewares[n].paperId"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareHandoutwordurl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareHandoutwordurl",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareHandoutwordurl"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareHandoutppturl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareHandoutppturl",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareHandoutppturl"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareHandoutpdfurl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareHandoutpdfurl",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareHandoutpdfurl"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareDownloadurl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareDownloadurl",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareDownloadurl"
                        },

                        "courses[n].catalogs[n].coursewares[n].keepstudyStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].keepstudyStatus",
                            "@name": "courses[n].catalogs[n].coursewares[n].keepstudyStatus"
                        },

                        "courses[n].catalogs[n].coursewares[n].cwCoursepreviousstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].cwCoursepreviousstatus",
                            "@name": "courses[n].catalogs[n].coursewares[n].cwCoursepreviousstatus"
                        },

                        "courses[n].catalogs[n].coursewares[n].coursewareVideoprividers": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].coursewareVideoprividers",
                            "@name": "courses[n].catalogs[n].coursewares[n].coursewareVideoprividers"
                        },

                        "courses[n].catalogs[n].coursewares[n].cwId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].cwId",
                            "@name": "courses[n].catalogs[n].coursewares[n].cwId"
                        },

                        "courses[n].catalogs[n].coursewares[n].knowledgeStarLevel": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].knowledgeStarLevel",
                            "@name": "courses[n].catalogs[n].coursewares[n].knowledgeStarLevel"
                        },

                        "courses[n].catalogs[n].coursewares[n].paperStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courses[n].catalogs[n].coursewares[n].paperStatus",
                            "@name": "courses[n].catalogs[n].coursewares[n].paperStatus"
                        }
                    },

                    "required": [
                        "courses",
                        "courses[n].courseId",
                        "courses[n].courseName",
                        "courses[n].courseLearnedcount",
                        "courses[n].courseTotalcount",
                        "courses[n].courseLearnedduration",
                        "courses[n].courseLearnedstatus",
                        "courses[n].studyingCoursewareid",
                        "courses[n].studyingCoursewarename",
                        "courses[n].keepstudyStatus",
                        "courses[n].catalogs",
                        "courses[n].catalogs[n].catalogId",
                        "courses[n].catalogs[n].catalogName",
                        "courses[n].catalogs[n].catalogElectivestatus",
                        "courses[n].catalogs[n].cwCoursepreviousstatus",
                        "courses[n].catalogs[n].coursewares",
                        "courses[n].catalogs[n].coursewares[n].studyrdDurationcount",
                        "courses[n].catalogs[n].coursewares[n].coursewareStudycount",
                        "courses[n].catalogs[n].coursewares[n].coursewareType",
                        "courses[n].catalogs[n].coursewares[n].coursewareId",
                        "courses[n].catalogs[n].coursewares[n].coursewareStarttime",
                        "courses[n].catalogs[n].coursewares[n].coursewareEndtime",
                        "courses[n].catalogs[n].coursewares[n].coursewareBeginstate",
                        "courses[n].catalogs[n].coursewares[n].coursewareOnlineurl",
                        "courses[n].catalogs[n].coursewares[n].coursewareLiveurl",
                        "courses[n].catalogs[n].coursewares[n].remindStatusname",
                        "courses[n].catalogs[n].coursewares[n].coursewareName",
                        "courses[n].catalogs[n].coursewares[n].coursewareSource",
                        "courses[n].catalogs[n].coursewares[n].coursewareDuration",
                        "courses[n].catalogs[n].coursewares[n].coursewareElectivestatus",
                        "courses[n].catalogs[n].coursewares[n].teacher",
                        "courses[n].catalogs[n].coursewares[n].address",
                        "courses[n].catalogs[n].coursewares[n].studyStatus",
                        "courses[n].catalogs[n].coursewares[n].coursewareGroupname",
                        "courses[n].catalogs[n].coursewares[n].classId",
                        "courses[n].catalogs[n].coursewares[n].remindStatus",
                        "courses[n].catalogs[n].coursewares[n].paperId",
                        "courses[n].catalogs[n].coursewares[n].coursewareHandoutwordurl",
                        "courses[n].catalogs[n].coursewares[n].coursewareHandoutppturl",
                        "courses[n].catalogs[n].coursewares[n].coursewareHandoutpdfurl",
                        "courses[n].catalogs[n].coursewares[n].coursewareDownloadurl",
                        "courses[n].catalogs[n].coursewares[n].keepstudyStatus",
                        "courses[n].catalogs[n].coursewares[n].cwCoursepreviousstatus",
                        "courses[n].catalogs[n].coursewares[n].coursewareVideoprividers",
                        "courses[n].catalogs[n].coursewares[n].cwId",
                        "courses[n].catalogs[n].coursewares[n].knowledgeStarLevel",
                        "courses[n].catalogs[n].coursewares[n].paperStatus"
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

    var pluginName = "nl:cc/query-usercw-list";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.CC3006.query-usercw-list.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:cc/query-usercw-list$options=./api.CC3006.query-usercw-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
