/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-open-class-detail";

        var apiDefinition = {
            api: "os/course/info",
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
                    "title": "公开课详情信息",
                    "description": "使用此接口的页面\n1.个人中心->我的公开课->购买的公开课",
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
                            "required": false,
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
                            "type": "string",
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

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "公开课详情信息",
                    "description": "使用此接口的页面\n1.个人中心->我的公开课->购买的公开课",
                    "type": "object",

                    "properties": {
                        "projectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "projectName": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectName",
                            "@name": "projectName"
                        },

                        "courseName": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseName",
                            "@name": "courseName"
                        },

                        "coursePicpath": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursePicpath",
                            "@name": "coursePicpath"
                        },

                        "courseType": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseType",
                            "@name": "courseType",

                            "@enums": [{
                                "type": "string",
                                "name": "G",
                                "value": "G"
                            }, {
                                "type": "string",
                                "name": "L",
                                "value": "L"
                            }]
                        },

                        "courseLevel": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseLevel",
                            "@name": "courseLevel"
                        },

                        "courseOpenstatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseOpenstatus",
                            "@name": "courseOpenstatus"
                        },

                        "courseUnlocktype": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseUnlocktype",
                            "@name": "courseUnlocktype"
                        },

                        "coursePrice": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursePrice",
                            "@name": "coursePrice"
                        },

                        "coursePromotiontype": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursePromotiontype",
                            "@name": "coursePromotiontype",

                            "@enums": [{
                                "type": "string",
                                "name": "N",
                                "value": "N"
                            }, {
                                "type": "string",
                                "name": "F",
                                "value": "F"
                            }, {
                                "type": "string",
                                "name": "L",
                                "value": "L"
                            }, {
                                "type": "string",
                                "name": "S",
                                "value": "S"
                            }]
                        },

                        "coursePromotionstarttime": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursePromotionstarttime",
                            "@name": "coursePromotionstarttime"
                        },

                        "coursePromotionendtime": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursePromotionendtime",
                            "@name": "coursePromotionendtime"
                        },

                        "courseFierystatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseFierystatus",
                            "@name": "courseFierystatus"
                        },

                        "catalogList": {
                            "type": "array",
                            "required": false,
                            "default": "",
                            "items": {},
                            "@alias": "catalogList",
                            "@name": "catalogList"
                        },

                        "appointmentStatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "appointmentStatus",
                            "@name": "appointmentStatus"
                        },

                        "collectStatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "collectStatus",
                            "@name": "collectStatus"
                        },

                        "courseGetstatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseGetstatus",
                            "@name": "courseGetstatus"
                        },

                        "coursestatStudynum": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursestatStudynum",
                            "@name": "coursestatStudynum"
                        },

                        "coursestatPraisenum": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursestatPraisenum",
                            "@name": "coursestatPraisenum"
                        },

                        "coursestatChapternum": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursestatChapternum",
                            "@name": "coursestatChapternum"
                        },

                        "coursestatClassnum": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursestatClassnum",
                            "@name": "coursestatClassnum"
                        },

                        "coursestatLivestarttime": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursestatLivestarttime",
                            "@name": "coursestatLivestarttime"
                        },

                        "coursestatLiveendtime": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursestatLiveendtime",
                            "@name": "coursestatLiveendtime"
                        },

                        "coursestatLivestatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursestatLivestatus",
                            "@name": "coursestatLivestatus",

                            "@enums": [{
                                "type": "string",
                                "name": "1",
                                "value": "1"
                            }, {
                                "type": "string",
                                "name": "2",
                                "value": "2"
                            }, {
                                "type": "string",
                                "name": "3",
                                "value": "3"
                            }, {
                                "type": "string",
                                "name": "4",
                                "value": "4"
                            }]
                        },

                        "courseintroduceDetail": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseintroduceDetail",
                            "@name": "courseintroduceDetail"
                        },

                        "systemDate": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "systemDate",
                            "@name": "systemDate"
                        },

                        "courseSourceid": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseSourceid",
                            "@name": "courseSourceid"
                        },

                        "courseId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseId",
                            "@name": "courseId"
                        },

                        "courseSharepath": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseSharepath",
                            "@name": "courseSharepath"
                        },

                        "fristprojectName": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "fristprojectName",
                            "@name": "fristprojectName"
                        },

                        "coursewareId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursewareId",
                            "@name": "coursewareId"
                        },

                        "coursestatcollectnum": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursestatcollectnum",
                            "@name": "coursestatcollectnum"
                        },

                        "courseCommunitystatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseCommunitystatus",
                            "@name": "courseCommunitystatus"
                        },

                        "courseCommunitytext": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseCommunitytext",
                            "@name": "courseCommunitytext"
                        },

                        "courseCommunityqrcodepath": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseCommunityqrcodepath",
                            "@name": "courseCommunityqrcodepath"
                        },

                        "courseCommunityguidetitle": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseCommunityguidetitle",
                            "@name": "courseCommunityguidetitle"
                        },

                        "courseCommunityguidetext": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "courseCommunityguidetext",
                            "@name": "courseCommunityguidetext"
                        }
                    },

                    "required": []
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

    var pluginName = "nl:cc/query-open-class-detail";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.OS1001.query-open-class-detail.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:cc/query-open-class-detail$options=./api.OS1001.query-open-class-detail.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
