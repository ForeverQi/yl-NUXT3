/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-courseware-level-Info";

        var apiDefinition = {
            api: "cc/courseware/level/Info",
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
                    "title": "查询课件层级信息",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "coursewareId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursewareId",
                            "@name": "coursewareId"
                        },

                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        }
                    },

                    "required": ["coursewareId", "classId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询课件层级信息",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "modulId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "modulId",
                            "@name": "modulId"
                        },

                        "courseId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseId",
                            "@name": "courseId"
                        },

                        "catalogId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "catalogId",
                            "@name": "catalogId"
                        },

                        "modulName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "modulName",
                            "@name": "modulName"
                        },

                        "courseName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseName",
                            "@name": "courseName"
                        },

                        "catalogName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "catalogName",
                            "@name": "catalogName"
                        },

                        "classExpiredate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classExpiredate",
                            "@name": "classExpiredate"
                        },

                        "classPicurl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classPicurl",
                            "@name": "classPicurl"
                        },

                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "className": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "className",
                            "@name": "className"
                        },

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

                        "classCoursewareseq": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classCoursewareseq",
                            "@name": "classCoursewareseq"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "modulSeq": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "modulSeq",
                            "@name": "modulSeq"
                        },

                        "courseSeq": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseSeq",
                            "@name": "courseSeq"
                        },

                        "catalogSeq": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "catalogSeq",
                            "@name": "catalogSeq"
                        }
                    },

                    "required": [
                        "modulId",
                        "courseId",
                        "catalogId",
                        "modulName",
                        "courseName",
                        "catalogName",
                        "classExpiredate",
                        "classPicurl",
                        "classId",
                        "className",
                        "coursewareId",
                        "coursewareName",
                        "classCoursewareseq",
                        "projectId",
                        "modulSeq",
                        "courseSeq",
                        "catalogSeq"
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

    var pluginName = "nl:cc/query-courseware-level-Info";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.CC3037.query-courseware-level-Info.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:cc/query-courseware-level-Info$options=./api.CC3037.query-courseware-level-Info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
