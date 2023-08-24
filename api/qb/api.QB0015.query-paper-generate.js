/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-paper-generate";

        var apiDefinition = {
            api: "qb/paper/generate",
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
                    "title": "试卷生成",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "papertypeCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "papertypeCode",
                            "@name": "papertypeCode"
                        },

                        "classUniquecode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "classUniquecode",
                            "@name": "classUniquecode"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "questionType": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "questionType",
                            "@name": "questionType"
                        },

                        "projectCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectCode",
                            "@name": "projectCode"
                        },

                        "sourceType": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        },

                        "knowledgeIds": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "knowledgeIds",
                            "@name": "knowledgeIds"
                        },

                        "coursewareName": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "coursewareName",
                            "@name": "coursewareName"
                        },

                        "questionSize": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "questionSize",
                            "@name": "questionSize"
                        }
                    },

                    "required": ["papertypeCode"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "试卷生成",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "paperId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "paperId",
                            "@name": "paperId"
                        }
                    },

                    "required": ["paperId"]
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
    var pluginName = "nl:qb/query-paper-generate";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB0015.query-paper-generate.options.js"
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
            "nl:qb/query-paper-generate$options=./api.QB0015.query-paper-generate.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();