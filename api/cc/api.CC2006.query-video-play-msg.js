/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-video-play-msg";

        var apiDefinition = {
            api: "cc/classtype/audition/play",
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
                    "title": "试听播放",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "classtypeId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeId",
                            "@name": "classtypeId"
                        },

                        "coursewareId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursewareId",
                            "@name": "coursewareId"
                        }
                    },

                    "required": ["classtypeId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "试听播放",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["courseName", "modulName", "courseAuditioncount", "catalogs"],

                                "properties": {
                                    "courseName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "courseName",
                                        "@name": "courseName"
                                    },

                                    "modulName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "modulName",
                                        "@name": "modulName"
                                    },

                                    "courseAuditioncount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "courseAuditioncount",
                                        "@name": "courseAuditioncount"
                                    },

                                    "catalogs": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",
                                            "required": ["catalogName", "catalogAuditioncount", "coursewares"],

                                            "properties": {
                                                "catalogName": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "catalogName",
                                                    "@name": "catalogName"
                                                },

                                                "catalogAuditioncount": {
                                                    "type": "number",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "catalogAuditioncount",
                                                    "@name": "catalogAuditioncount"
                                                },

                                                "coursewares": {
                                                    "type": "array",
                                                    "required": true,
                                                    "default": "",

                                                    "items": {
                                                        "type": "object",

                                                        "required": [
                                                            "coursewareId",
                                                            "coursewareName",
                                                            "coursewareOnlineurl",
                                                            "coursewareVideoprividers",
                                                            "teacherName",
                                                            "subjectIds"
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

                                                            "coursewareOnlineurl": {
                                                                "type": "string",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "coursewareOnlineurl",
                                                                "@name": "coursewareOnlineurl"
                                                            },

                                                            "coursewareVideoprividers": {
                                                                "type": "string",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "coursewareVideoprividers",
                                                                "@name": "coursewareVideoprividers"
                                                            },

                                                            "teacherName": {
                                                                "type": "string",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "teacherName",
                                                                "@name": "teacherName"
                                                            },

                                                            "subjectIds": {
                                                                "type": "array",
                                                                "required": true,
                                                                "default": "",
                                                                "items": {},
                                                                "@alias": "subjectIds",
                                                                "@name": "subjectIds"
                                                            }
                                                        }
                                                    },

                                                    "@alias": "coursewares",
                                                    "@name": "coursewares"
                                                }
                                            }
                                        },

                                        "@alias": "catalogs",
                                        "@name": "catalogs"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        },

                        "coursewareId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursewareId",
                            "@name": "coursewareId"
                        },

                        "classtypeId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeId",
                            "@name": "classtypeId"
                        },

                        "subjects": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["subjectId", "subjectName"],

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
                                    }
                                }
                            },

                            "@alias": "subjects",
                            "@name": "subjects"
                        }
                    },

                    "required": ["data", "coursewareId", "classtypeId", "subjects"]
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
    var pluginName = "nl:cc/query-video-play-msg";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CC2006.query-video-play-msg.options.js"
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
            "nl:cc/query-video-play-msg$options=./api.CC2006.query-video-play-msg.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();