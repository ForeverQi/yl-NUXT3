/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "ss", apiAlias = "query-examserv-userExamAreacode";

        var apiDefinition = {
            api: "ss/examserv/userExamAreacode",
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
                    "title": "报考服务-查询学员报考地区",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "userId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userId",
                            "@name": "userId"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "pypYear": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pypYear",
                            "@name": "pypYear"
                        },

                        "pypSeq": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "pypSeq",
                            "@name": "pypSeq"
                        }
                    },

                    "required": ["projectId", "pypYear"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "报考服务-查询学员报考地区",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "examservId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "examservId",
                            "@name": "examservId"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "studentUserid": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentUserid",
                            "@name": "studentUserid"
                        },

                        "pypId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pypId",
                            "@name": "pypId"
                        },

                        "examservAreacode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "examservAreacode",
                            "@name": "examservAreacode"
                        },

                        "examservProvareacode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "examservProvareacode",
                            "@name": "examservProvareacode"
                        }
                    },

                    "required": [
                        "examservId",
                        "projectId",
                        "studentUserid",
                        "pypId",
                        "examservAreacode",
                        "examservProvareacode"
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
    var pluginName = "nl:ss/query-examserv-userExamAreacode";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.SS5105.query-examserv-userExamAreacode.options.js"
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
            "nl:ss/query-examserv-userExamAreacode$options=./api.SS5105.query-examserv-userExamAreacode.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();