/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-mycourse-past-list";

        var apiDefinition = {
            api: "cc/my/expired/class/list",
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
                    "title": "我的班级列表-已过期",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "pageSize": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "pageIndex": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        }
                    },

                    "required": ["pageSize", "pageIndex"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "我的班级列表-已过期",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "total": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "count",
                            "@name": "total"
                        },

                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "projectId",
                                    "projectName",
                                    "projectSourceid",
                                    "classId",
                                    "classSourceid",
                                    "className",
                                    "classCoverpic",
                                    "studentclassGift",
                                    "studentclassExpiredate",
                                    "studentclassCreateddate",
                                    "classAvlstatus",
                                    "classCategory",
                                    "classtypeId",
                                    "ctapId",
                                    "ctapName",
                                    "classtypePypcount",
                                    "pypSeq",
                                    "userId"
                                ],

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

                                    "projectSourceid": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectSourceid",
                                        "@name": "projectSourceid"
                                    },

                                    "classId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classId",
                                        "@name": "classId"
                                    },

                                    "classSourceid": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classSourceid",
                                        "@name": "classSourceid"
                                    },

                                    "className": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "className",
                                        "@name": "className"
                                    },

                                    "classCoverpic": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classCoverpic",
                                        "@name": "classCoverpic"
                                    },

                                    "studentclassGift": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "studentclassGift",
                                        "@name": "studentclassGift"
                                    },

                                    "studentclassExpiredate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "studentclassExpiredate",
                                        "@name": "studentclassExpiredate"
                                    },

                                    "studentclassCreateddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "studentclassCreateddate",
                                        "@name": "studentclassCreateddate"
                                    },

                                    "classAvlstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classAvlstatus",
                                        "@name": "classAvlstatus"
                                    },

                                    "classCategory": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classCategory",
                                        "@name": "classCategory"
                                    },

                                    "classtypeId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeId",
                                        "@name": "classtypeId"
                                    },

                                    "ctapId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "ctapId",
                                        "@name": "ctapId"
                                    },

                                    "ctapName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "ctapName",
                                        "@name": "ctapName"
                                    },

                                    "classtypePypcount": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypePypcount",
                                        "@name": "classtypePypcount"
                                    },

                                    "pypSeq": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "pypSeq",
                                        "@name": "pypSeq"
                                    },

                                    "userId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "userId",
                                        "@name": "userId"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        },

                        "classIds": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classIds",
                            "@name": "classIds"
                        }
                    },

                    "required": ["total", "data", "classIds"]
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
    var pluginName = "nl:cc/query-mycourse-past-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CC3102.query-mycourse-past-list.options.js"
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
            "nl:cc/query-mycourse-past-list$options=./api.CC3102.query-mycourse-past-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();