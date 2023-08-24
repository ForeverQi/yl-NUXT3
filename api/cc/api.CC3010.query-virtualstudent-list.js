/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-virtualstudent-list";

        var apiDefinition = {
            api: "cc/virtualstudent/list",
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
                    "title": "虚拟学员列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        }
                    },

                    "required": ["projectId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "虚拟学员列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "virtualstudentId",
                                    "virtualstudentName",
                                    "virtualstudentPasseddate",
                                    "virtualstudentHeadpath",
                                    "virtualstudentBasestatus",
                                    "virtualstudentJob",
                                    "virtualstudentEducation",
                                    "virtualstudentStory",
                                    "virtualstudentStorytitle",
                                    "classtypeId",
                                    "classtypeName"
                                ],

                                "properties": {
                                    "virtualstudentId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "virtualstudentId",
                                        "@name": "virtualstudentId"
                                    },

                                    "virtualstudentName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "virtualstudentName",
                                        "@name": "virtualstudentName"
                                    },

                                    "virtualstudentPasseddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "virtualstudentPasseddate",
                                        "@name": "virtualstudentPasseddate"
                                    },

                                    "virtualstudentHeadpath": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "virtualstudentHeadpath",
                                        "@name": "virtualstudentHeadpath"
                                    },

                                    "virtualstudentBasestatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "virtualstudentBasestatus",
                                        "@name": "virtualstudentBasestatus"
                                    },

                                    "virtualstudentJob": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "virtualstudentJob",
                                        "@name": "virtualstudentJob"
                                    },

                                    "virtualstudentEducation": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "virtualstudentEducation",
                                        "@name": "virtualstudentEducation"
                                    },

                                    "virtualstudentStory": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "virtualstudentStory",
                                        "@name": "virtualstudentStory"
                                    },

                                    "virtualstudentStorytitle": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "virtualstudentStorytitle",
                                        "@name": "virtualstudentStorytitle"
                                    },

                                    "classtypeId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeId",
                                        "@name": "classtypeId"
                                    },

                                    "classtypeName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeName",
                                        "@name": "classtypeName"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["data"]
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
    var pluginName = "nl:cc/query-virtualstudent-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CC3010.query-virtualstudent-list.options.js"
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
            "nl:cc/query-virtualstudent-list$options=./api.CC3010.query-virtualstudent-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();