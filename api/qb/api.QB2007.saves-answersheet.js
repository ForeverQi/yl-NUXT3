/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "saves-answersheet";

        var apiDefinition = {
            api: "qb/answersheet/saves",
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
                    "title": "答卷记录批量保存",
                    "description": "答卷记录批量保存",
                    "type": "object",

                    "properties": {
                        "userAnswers": {
                            "type": "array",
                            "required": false,
                            "default": "",
                            "items": {},
                            "@alias": "userAnswers",
                            "@name": "userAnswers"
                        },

                        "answersheetId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "answersheetId",
                            "@name": "answersheetId"
                        },

                        "paperId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "paperId",
                            "@name": "paperId"
                        },

                        "answersheetStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "answersheetStatus",
                            "@name": "answersheetStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "A",
                                "value": "A"
                            }, {
                                "type": "string",
                                "name": "G",
                                "value": "G"
                            }, {
                                "type": "string",
                                "name": "S",
                                "value": "S"
                            }]
                        },

                        "answersheetDurationtime": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "answersheetDurationtime",
                            "@name": "answersheetDurationtime"
                        },

                        "classUniquecode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "classUniquecode",
                            "@name": "classUniquecode"
                        },

                        "answersheetSourcetype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "answersheetSourcetype",
                            "@name": "answersheetSourcetype"
                        },

                        "projectCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectCode",
                            "@name": "projectCode"
                        },

                        "extension": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "extension",
                            "@name": "extension"
                        },

                        "answersheetWay": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "answersheetWay",
                            "@name": "answersheetWay",

                            "@enums": [{
                                "type": "string",
                                "name": "A",
                                "value": "A"
                            }, {
                                "type": "string",
                                "name": "M",
                                "value": "M"
                            }, {
                                "type": "string",
                                "name": "E",
                                "value": "E"
                            }]
                        }
                    },

                    "required": [
                        "paperId",
                        "answersheetStatus",
                        "answersheetDurationtime",
                        "answersheetSourcetype"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "答卷记录批量保存",
                    "description": "答卷记录批量保存",
                    "type": "object",

                    "properties": {
                        "answersheetId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "answersheetId",
                            "@name": "answersheetId"
                        }
                    },

                    "required": ["answersheetId"]
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
    var pluginName = "nl:qb/saves-answersheet";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB2007.saves-answersheet.options.js"
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
            "nl:qb/saves-answersheet$options=./api.QB2007.saves-answersheet.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();