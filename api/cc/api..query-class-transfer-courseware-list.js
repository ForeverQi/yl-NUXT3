/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-class-transfer-courseware-list";

        var apiDefinition = {
            api: "cc/user/class/transfer/courseware/list",
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
                    "title": "【转班听课率平移】课件列表",
                    "description": "【转班听课率平移】课件列表",
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
                        },

                        "sourceClassId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sourceClassId",
                            "@name": "sourceClassId"
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
                        }
                    },

                    "required": ["classId", "modulId", "sourceClassId", "courseId", "catalogId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "【转班听课率平移】课件列表",
                    "description": "【转班听课率平移】课件列表",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "coursewareId",
                            "coursewareName",
                            "studyStatus",
                            "coursewareDuration",
                            "studyDuration"
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

                            "studyStatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "studyStatus",
                                "@name": "studyStatus",

                                "@enums": [{
                                    "type": "string",
                                    "name": "Y",
                                    "value": "Y"
                                }, {
                                    "type": "string",
                                    "name": "N",
                                    "value": "N"
                                }, {
                                    "type": "string",
                                    "name": "S",
                                    "value": "S"
                                }]
                            },

                            "coursewareDuration": {
                                "type": "number",
                                "required": true,
                                "default": "",
                                "@alias": "coursewareDuration",
                                "@name": "coursewareDuration"
                            },

                            "studyDuration": {
                                "type": "number",
                                "required": true,
                                "default": "",
                                "@alias": "studyDuration",
                                "@name": "studyDuration"
                            },

                            "questionTotal": {
                                "type": "number",
                                "required": false,
                                "default": "",
                                "@alias": "questionTotal",
                                "@name": "questionTotal"
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
    var pluginName = "nl:cc/query-class-transfer-courseware-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-class-transfer-courseware-list.options.js"
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
            "nl:cc/query-class-transfer-courseware-list$options=./api..query-class-transfer-courseware-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();