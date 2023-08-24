/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "selfLearn", apiAlias = "query-self-learn-apply-intro";

        var apiDefinition = {
            api: "selfLearn/setting/info",
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
                    "title": "自助续学申请设置表信息",
                    "description": "自助学习申请介绍",
                    "type": "object",

                    "properties": {
                        "settingId": {
                            "type": "string",
                            "required": true,
                            "@alias": "settingId",
                            "@name": "settingId"
                        }
                    },

                    "required": ["settingId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "自助续学申请设置表信息",
                    "description": "自助学习申请介绍",
                    "type": "object",

                    "properties": {
                        "accountShow": {
                            "type": "string",
                            "required": true,
                            "@alias": "accountShow",
                            "@name": "accountShow"
                        },

                        "accountType": {
                            "type": "string",
                            "required": true,
                            "@alias": "accountType",
                            "@name": "accountType"
                        },

                        "applyEndDate": {
                            "type": "string",
                            "required": true,
                            "@alias": "applyEndDate",
                            "@name": "applyEndDate"
                        },

                        "applyInstruction": {
                            "type": "string",
                            "required": true,
                            "@alias": "applyInstruction",
                            "@name": "applyInstruction"
                        },

                        "applyStartDate": {
                            "type": "string",
                            "required": true,
                            "@alias": "applyStartDate",
                            "@name": "applyStartDate"
                        },

                        "pwdShow": {
                            "type": "string",
                            "required": true,
                            "@alias": "pwdShow",
                            "@name": "pwdShow"
                        },

                        "pwdType": {
                            "type": "string",
                            "required": true,
                            "@alias": "pwdType",
                            "@name": "pwdType"
                        },

                        "pypId": {
                            "type": "string",
                            "required": true,
                            "@alias": "pypId",
                            "@name": "pypId"
                        },

                        "pypaAreacode": {
                            "type": "string",
                            "required": true,
                            "@alias": "pypaAreacode",
                            "@name": "pypaAreacode"
                        },

                        "pypaId": {
                            "type": "string",
                            "required": true,
                            "@alias": "pypaId",
                            "@name": "pypaId"
                        },

                        "queryUrl": {
                            "type": "string",
                            "required": true,
                            "@alias": "queryUrl",
                            "@name": "queryUrl"
                        },

                        "settingCreateddate": {
                            "type": "string",
                            "required": true,
                            "@alias": "settingCreateddate",
                            "@name": "settingCreateddate"
                        },

                        "settingCreater": {
                            "type": "string",
                            "required": true,
                            "@alias": "settingCreater",
                            "@name": "settingCreater"
                        },

                        "settingId": {
                            "type": "string",
                            "required": true,
                            "@alias": "settingId",
                            "@name": "settingId"
                        },

                        "settingModifieddate": {
                            "type": "string",
                            "required": true,
                            "@alias": "settingModifieddate",
                            "@name": "settingModifieddate"
                        },

                        "settingModifier": {
                            "type": "string",
                            "required": true,
                            "@alias": "settingModifier",
                            "@name": "settingModifier"
                        }
                    },

                    "required": [
                        "accountShow",
                        "accountType",
                        "applyEndDate",
                        "applyInstruction",
                        "applyStartDate",
                        "pwdShow",
                        "pwdType",
                        "pypId",
                        "pypaAreacode",
                        "pypaId",
                        "queryUrl",
                        "settingCreateddate",
                        "settingCreater",
                        "settingId",
                        "settingModifieddate",
                        "settingModifier"
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
    var pluginName = "nl:selfLearn/query-self-learn-apply-intro";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-self-learn-apply-intro.options.js"
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
            "nl:selfLearn/query-self-learn-apply-intro$options=./api..query-self-learn-apply-intro.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();