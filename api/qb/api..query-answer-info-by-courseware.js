/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-answer-info-by-courseware";

        var apiDefinition = {
            api: "igt/courseware/answer/info",
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
                    "title": "班级课件上次答卷信息",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "coursewareId": {
                            "type": "string",
                            "required": true,
                            "@alias": "coursewareId",
                            "@name": "coursewareId"
                        },

                        "paperId": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperId",
                            "@name": "paperId"
                        }
                    },

                    "required": ["classId", "coursewareId", "paperId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "班级课件上次答卷信息",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "paperId": {
                            "type": "string",
                            "required": false,
                            "@alias": "paperId",
                            "@name": "paperId"
                        },

                        "answersheetId": {
                            "type": "string",
                            "required": false,
                            "@alias": "answerSheetId",
                            "@name": "answersheetId"
                        },

                        "answersheetStatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "answerSheetStatus",
                            "@name": "answersheetStatus"
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

    var defineModule = new Function("return this")().defineModule;
    var pluginName = "nl:qb/query-answer-info-by-courseware";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-answer-info-by-courseware.options.js"
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
            "nl:qb/query-answer-info-by-courseware$options=./api..query-answer-info-by-courseware.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();