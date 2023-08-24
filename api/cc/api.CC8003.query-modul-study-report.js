/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-modul-study-report";

        var apiDefinition = {
            api: "cc/modul/study/report",
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
                    "title": "查询班级下模块学习报告",
                    "description": "查询班级下模块学习报告",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "modulId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "modulId",
                            "@name": "modulId"
                        }
                    },

                    "required": ["classId", "modulId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询班级下模块学习报告",
                    "description": "查询班级下模块学习报告",
                    "type": "object",

                    "properties": {
                        "cwCount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "cwCount",
                            "@name": "cwCount"
                        },

                        "learnedcwCount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "learnedcwCount",
                            "@name": "learnedcwCount"
                        },

                        "cwPercentage": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "cwPercentage",
                            "@name": "cwPercentage"
                        },

                        "cwrecordCount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "cwrecordCount",
                            "@name": "cwrecordCount"
                        },

                        "learnedcwrecordCount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "learnedcwrecordCount",
                            "@name": "learnedcwrecordCount"
                        },

                        "cwrecordPercentage": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "cwrecordPercentage",
                            "@name": "cwrecordPercentage"
                        },

                        "playrdDuration": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "playrdDuration",
                            "@name": "playrdDuration"
                        },

                        "answerstatisticsTotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "answerstatisticsTotal",
                            "@name": "answerstatisticsTotal"
                        },

                        "answerstatisticsRighttotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "answerstatisticsRighttotal",
                            "@name": "answerstatisticsRighttotal"
                        },

                        "answerstatisticsErrottotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "answerstatisticsErrottotal",
                            "@name": "answerstatisticsErrottotal"
                        }
                    },

                    "required": [
                        "cwCount",
                        "learnedcwCount",
                        "cwPercentage",
                        "cwrecordCount",
                        "learnedcwrecordCount",
                        "cwrecordPercentage",
                        "playrdDuration",
                        "answerstatisticsTotal",
                        "answerstatisticsRighttotal",
                        "answerstatisticsErrottotal"
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

    var pluginName = "nl:cc/query-modul-study-report";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.CC8003.query-modul-study-report.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:cc/query-modul-study-report$options=./api.CC8003.query-modul-study-report.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
