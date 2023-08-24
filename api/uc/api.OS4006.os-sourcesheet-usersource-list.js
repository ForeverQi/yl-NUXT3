/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "os-sourcesheet-usersource-list";

        var apiDefinition = {
            api: "os/sourcesheet/usersource/list",
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
                    "title": "用户的课单列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "usersourceType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "usersourceType",
                            "@name": "usersourceType"
                        },

                        "pageSize": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "pageIndex": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "clientType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "clientType",
                            "@name": "clientType"
                        }
                    },

                    "required": ["usersourceType", "pageSize", "pageIndex", "clientType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "用户的课单列表",
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
                                    "coursesheetId",
                                    "coursesheetPicpath",
                                    "coursesheetName",
                                    "coursesheetIntroduce",
                                    "coursesheetOpenstatus",
                                    "coursesheetPrice",
                                    "coursesheetPromotiontype",
                                    "coursesheetPromotionstarttime",
                                    "coursesheetPromotionendtime",
                                    "coursesheetPromotionprice",
                                    "coursesheetCollectnum",
                                    "coursesheetExpiredtime",
                                    "teacherList",
                                    "courseList",
                                    "coursesheetValiditystatus",
                                    "projectId",
                                    "projectSeocode"
                                ],

                                "properties": {
                                    "coursesheetId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursesheetId",
                                        "@name": "coursesheetId"
                                    },

                                    "coursesheetPicpath": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursesheetPicpath",
                                        "@name": "coursesheetPicpath"
                                    },

                                    "coursesheetName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursesheetName",
                                        "@name": "coursesheetName"
                                    },

                                    "coursesheetIntroduce": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursesheetIntroduce",
                                        "@name": "coursesheetIntroduce"
                                    },

                                    "coursesheetOpenstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursesheetOpenstatus",
                                        "@name": "coursesheetOpenstatus"
                                    },

                                    "coursesheetPrice": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursesheetPrice",
                                        "@name": "coursesheetPrice"
                                    },

                                    "coursesheetPromotiontype": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursesheetPromotiontype",
                                        "@name": "coursesheetPromotiontype"
                                    },

                                    "coursesheetPromotionstarttime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursesheetPromotionstarttime",
                                        "@name": "coursesheetPromotionstarttime"
                                    },

                                    "coursesheetPromotionendtime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursesheetPromotionendtime",
                                        "@name": "coursesheetPromotionendtime"
                                    },

                                    "coursesheetPromotionprice": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursesheetPromotionprice",
                                        "@name": "coursesheetPromotionprice"
                                    },

                                    "coursesheetCollectnum": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursesheetCollectnum",
                                        "@name": "coursesheetCollectnum"
                                    },

                                    "coursesheetExpiredtime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursesheetExpiredtime",
                                        "@name": "coursesheetExpiredtime"
                                    },

                                    "teacherList": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",
                                            "required": ["teacherImage", "userName"],

                                            "properties": {
                                                "teacherImage": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "teacherImage",
                                                    "@name": "teacherImage"
                                                },

                                                "userName": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "userName",
                                                    "@name": "userName"
                                                }
                                            }
                                        },

                                        "@alias": "teacherList",
                                        "@name": "teacherList"
                                    },

                                    "courseList": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",
                                            "required": ["courseName"],

                                            "properties": {
                                                "courseName": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "courseName",
                                                    "@name": "courseName"
                                                }
                                            }
                                        },

                                        "@alias": "courseList",
                                        "@name": "courseList"
                                    },

                                    "coursesheetValiditystatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursesheetValiditystatus",
                                        "@name": "coursesheetValiditystatus"
                                    },

                                    "projectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectId",
                                        "@name": "projectId"
                                    },

                                    "projectSeocode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectSeocode",
                                        "@name": "projectSeocode"
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

    var pluginName = "nl:uc/os-sourcesheet-usersource-list";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.OS4006.os-sourcesheet-usersource-list.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:uc/os-sourcesheet-usersource-list$options=./api.OS4006.os-sourcesheet-usersource-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
