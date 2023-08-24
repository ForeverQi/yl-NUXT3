/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-virtualstudent-info";

        var apiDefinition = {
            api: "cc/virtualstudent/info",
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
                    "title": "虚拟学员详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "virtualstudentId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "virtualstudentId",
                            "@name": "virtualstudentId"
                        }
                    },

                    "required": ["virtualstudentId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "虚拟学员详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "virtualstudentStudydays": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "virtualstudentStudydays",
                            "@name": "virtualstudentStudydays"
                        },

                        "virtualstudentStudyduration": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "virtualstudentStudyduration",
                            "@name": "virtualstudentStudyduration"
                        },

                        "virtualstudentQuestioncount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "virtualstudentQuestioncount",
                            "@name": "virtualstudentQuestioncount"
                        },

                        "virtualstudentDaystudytime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "virtualstudentDaystudytime",
                            "@name": "virtualstudentDaystudytime"
                        },

                        "virtualstudentRanking": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "virtualstudentRanking",
                            "@name": "virtualstudentRanking"
                        },

                        "virtualstudentHeadurl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "virtualstudentHeadurl",
                            "@name": "virtualstudentHeadurl"
                        },

                        "virtualstudentName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "virtualstudentName",
                            "@name": "virtualstudentName"
                        },

                        "virtualstudentJob": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "virtualstudentJob",
                            "@name": "virtualstudentJob"
                        },

                        "virtualstudentTags": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "virtualstudentTags",
                            "@name": "virtualstudentTags"
                        },

                        "classtypeName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeName",
                            "@name": "classtypeName"
                        },

                        "classtypeId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeId",
                            "@name": "classtypeId"
                        },

                        "vsexperiences": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["vsexperienceDate", "vsexperienceStory"],

                                "properties": {
                                    "vsexperienceDate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "vsexperienceDate",
                                        "@name": "vsexperienceDate"
                                    },

                                    "vsexperienceStory": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "vsexperienceStory",
                                        "@name": "vsexperienceStory"
                                    }
                                }
                            },

                            "@alias": "vsexperiences",
                            "@name": "vsexperiences"
                        }
                    },

                    "required": [
                        "virtualstudentStudydays",
                        "virtualstudentStudyduration",
                        "virtualstudentQuestioncount",
                        "virtualstudentDaystudytime",
                        "virtualstudentRanking",
                        "virtualstudentHeadurl",
                        "virtualstudentName",
                        "virtualstudentJob",
                        "virtualstudentTags",
                        "classtypeName",
                        "classtypeId",
                        "vsexperiences"
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
    var pluginName = "nl:cc/query-virtualstudent-info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CC3008.query-virtualstudent-info.options.js"
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
            "nl:cc/query-virtualstudent-info$options=./api.CC3008.query-virtualstudent-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();