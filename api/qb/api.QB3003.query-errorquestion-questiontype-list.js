/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-errorquestion-questiontype-list";

        var apiDefinition = {
            api: "qb/errorquestion/questiontype/list",
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
                    "title": "错题记录题型列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "subjectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "sectionId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "sectionId",
                            "@name": "sectionId"
                        },

                        "classUniquecode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "classUniquecode",
                            "@name": "classUniquecode"
                        },

                        "sourceType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        },

                        "projectCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectCode",
                            "@name": "projectCode"
                        }
                    },

                    "required": ["sourceType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "错题记录题型列表",
                    "description": "",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": ["questionType", "questionTypeAmount"],

                        "properties": {
                            "questionType": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "questionType",
                                "@name": "questionType",

                                "@enums": [{
                                    "type": "string",
                                    "name": "O",
                                    "value": "Opinion"
                                }, {
                                    "type": "string",
                                    "name": "S",
                                    "value": "Single"
                                }, {
                                    "type": "string",
                                    "name": "M",
                                    "value": "Multiple"
                                }, {
                                    "type": "string",
                                    "name": "J",
                                    "value": "Judge"
                                }, {
                                    "type": "string",
                                    "name": "F",
                                    "value": "Fill"
                                }, {
                                    "type": "string",
                                    "name": "A",
                                    "value": "Analyze"
                                }, {
                                    "type": "string",
                                    "name": "CF",
                                    "value": "GestaltFill"
                                }, {
                                    "type": "string",
                                    "name": "BC",
                                    "value": "SelectionFill"
                                }, {
                                    "type": "string",
                                    "name": "L",
                                    "value": "Listening"
                                }]
                            },

                            "questionTypeAmount": {
                                "type": "number",
                                "required": true,
                                "default": "",
                                "@alias": "questionTypeAmount",
                                "@name": "questionTypeAmount"
                            }
                        }
                    }
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
    var pluginName = "nl:qb/query-errorquestion-questiontype-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB3003.query-errorquestion-questiontype-list.options.js"
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
            "nl:qb/query-errorquestion-questiontype-list$options=./api.QB3003.query-errorquestion-questiontype-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();