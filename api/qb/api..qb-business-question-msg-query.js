/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "qb-business-question-msg-query";

        var apiDefinition = {
            api: "qb/business/question_msg/query",
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
                    "title": "更新通知查询",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "classCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "classCode",
                            "@name": "classCode"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "更新通知查询",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "status": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "status",
                            "@name": "status"
                        },

                        "validStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "validStatus",
                            "@name": "validStatus"
                        },

                        "allOn": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "allOn",
                            "@name": "allOn"
                        },

                        "subjectIds": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectIds",
                            "@name": "subjectIds"
                        },

                        "praciticeStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "praciticeStatus",
                            "@name": "praciticeStatus"
                        },

                        "updateAppMsg": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "updateAppMsg",
                            "@name": "updateAppMsg"
                        },

                        "updatePcMsg": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "updatePcMsg",
                            "@name": "updatePcMsg"
                        }
                    },

                    "required": [
                        "status",
                        "validStatus",
                        "allOn",
                        "subjectIds",
                        "praciticeStatus",
                        "updateAppMsg",
                        "updatePcMsg"
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

    var pluginName = "nl:qb/qb-business-question-msg-query";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api..qb-business-question-msg-query.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:qb/qb-business-question-msg-query$options=./api..qb-business-question-msg-query.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();