/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "course-user-live-path";

        var apiDefinition = {
            api: "os/course/user/live/path",
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
                    "title": "查询用户直播地址(鉴权后查询)",
                    "description": "查询用户直播地址(鉴权后查询)",
                    "type": "object",

                    "properties": {
                        "courseId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseId",
                            "@name": "courseId"
                        },

                        "coursewareId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursewareId",
                            "@name": "coursewareId"
                        }
                    },

                    "required": ["courseId", "coursewareId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询用户直播地址(鉴权后查询)",
                    "description": "查询用户直播地址(鉴权后查询)",
                    "type": "object",

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

                        "coursewareLivepath": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursewareLivepath",
                            "@name": "coursewareLivepath"
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
                            "@name": "coursewareStatus",

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

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "authStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "authStatus",
                            "@name": "authStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "Y",
                                "value": "Y"
                            }, {
                                "type": "string",
                                "name": "N",
                                "value": "N"
                            }]
                        },

                        "livePlatform": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "livePlatform",
                            "@name": "livePlatform",

                            "@enums": [{
                                "type": "string",
                                "name": "V",
                                "value": "V"
                            }, {
                                "type": "string",
                                "name": "N",
                                "value": "N"
                            }, {
                                "type": "string",
                                "name": "P",
                                "value": "P"
                            }]
                        },

                        "authMsg": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "authMsg",
                            "@name": "authMsg"
                        },

                        "courseId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseId",
                            "@name": "courseId"
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
                        }
                    },

                    "required": [
                        "coursewareId",
                        "coursewareName",
                        "coursewareLivepath",
                        "coursewareStarttime",
                        "coursewareEndtime",
                        "coursewareStatus",
                        "projectId",
                        "subjectId",
                        "authStatus",
                        "livePlatform",
                        "authMsg",
                        "courseId",
                        "courseName",
                        "coursePicpath"
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
    var pluginName = "nl:cc/course-user-live-path";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.OS4020.course-user-live-path.options.js"
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
            "nl:cc/course-user-live-path$options=./api.OS4020.course-user-live-path.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();