/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "bd", apiAlias = "bd-studentclass-profile-info";

        var apiDefinition = {
            api: "bd/studentclass/profile/info",
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
                    "title": "学员班级详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "userId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userId",
                            "@name": "userId"
                        }
                    },

                    "required": ["classId", "userId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "学员班级详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "studentclassId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentclassId",
                            "@name": "studentclassId"
                        },

                        "studentId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentId",
                            "@name": "studentId"
                        },

                        "classtypeId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeId",
                            "@name": "classtypeId"
                        },

                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "studentclassSourceid": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentclassSourceid",
                            "@name": "studentclassSourceid"
                        },

                        "studentclassCategory": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentclassCategory",
                            "@name": "studentclassCategory"
                        },

                        "studentclassStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentclassStatus",
                            "@name": "studentclassStatus"
                        },

                        "studentclassOpenstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentclassOpenstatus",
                            "@name": "studentclassOpenstatus"
                        },

                        "studentclassOpendate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentclassOpendate",
                            "@name": "studentclassOpendate"
                        },

                        "studentclassCreateddate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentclassCreateddate",
                            "@name": "studentclassCreateddate"
                        },

                        "studentclassModifieddate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentclassModifieddate",
                            "@name": "studentclassModifieddate"
                        },

                        "studentclassSourcetype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentclassSourcetype",
                            "@name": "studentclassSourcetype"
                        },

                        "studentclassGift": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentclassGift",
                            "@name": "studentclassGift"
                        },

                        "studentclassCrossproject": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentclassCrossproject",
                            "@name": "studentclassCrossproject"
                        },

                        "studentclassServicestatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentclassServicestatus",
                            "@name": "studentclassServicestatus"
                        },

                        "className": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "className",
                            "@name": "className"
                        },

                        "studentclassExpiredate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentclassExpiredate",
                            "@name": "studentclassExpiredate"
                        },

                        "ctapId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "ctapId",
                            "@name": "ctapId"
                        }
                    },

                    "required": [
                        "studentclassId",
                        "studentId",
                        "classtypeId",
                        "classId",
                        "projectId",
                        "studentclassSourceid",
                        "studentclassCategory",
                        "studentclassStatus",
                        "studentclassOpenstatus",
                        "studentclassOpendate",
                        "studentclassCreateddate",
                        "studentclassModifieddate",
                        "studentclassSourcetype",
                        "studentclassGift",
                        "studentclassCrossproject",
                        "studentclassServicestatus",
                        "className",
                        "studentclassExpiredate",
                        "ctapId"
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
    var pluginName = "nl:bd/bd-studentclass-profile-info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.BD4915.bd-studentclass-profile-info.options.js"
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
            "nl:bd/bd-studentclass-profile-info$options=./api.BD4915.bd-studentclass-profile-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
