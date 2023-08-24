/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "selfLearn", apiAlias = "add-self-learn-apply";

        var apiDefinition = {
            api: "selfLearn/apply/add",
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
                    "title": "自助续学申请-新增",
                    "description": "添加自助续学申请",
                    "type": "object",

                    "properties": {
                        "applySource": {
                            "type": "string",
                            "required": false,
                            "@alias": "applySource",
                            "@name": "applySource"
                        },

                        "applyType": {
                            "type": "string",
                            "required": false,
                            "@alias": "applyType",
                            "@name": "applyType"
                        },

                        "classAddVos": {
                            "type": "array",
                            "required": false,
                            "items": {},
                            "@alias": "classAddVos",
                            "@name": "classAddVos"
                        },

                        "examAreacode": {
                            "type": "string",
                            "required": false,
                            "@alias": "examAreacode",
                            "@name": "examAreacode"
                        },

                        "examCap": {
                            "type": "string",
                            "required": false,
                            "@alias": "examCap",
                            "@name": "examCap"
                        },

                        "examYear": {
                            "type": "string",
                            "required": false,
                            "@alias": "examYear",
                            "@name": "examYear"
                        },

                        "feeTotal": {
                            "type": "string",
                            "required": false,
                            "@alias": "feeTotal",
                            "@name": "feeTotal"
                        },

                        "oriOrderId": {
                            "type": "string",
                            "required": false,
                            "@alias": "oriOrderId",
                            "@name": "oriOrderId"
                        },

                        "oriOrderNo": {
                            "type": "string",
                            "required": false,
                            "@alias": "oriOrderNo",
                            "@name": "oriOrderNo"
                        },

                        "oriOrderType": {
                            "type": "string",
                            "required": false,
                            "@alias": "oriOrderType",
                            "@name": "oriOrderType"
                        },

                        "projectId": {
                            "type": "string",
                            "required": false,
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "scoreImageUrl": {
                            "type": "string",
                            "required": false,
                            "@alias": "scoreImageUrl",
                            "@name": "scoreImageUrl"
                        },

                        "scoreQueryAccount": {
                            "type": "string",
                            "required": false,
                            "@alias": "scoreQueryAccount",
                            "@name": "scoreQueryAccount"
                        },

                        "scoreQueryPwd": {
                            "type": "string",
                            "required": false,
                            "@alias": "scoreQueryPwd",
                            "@name": "scoreQueryPwd"
                        },

                        "settingId": {
                            "type": "string",
                            "required": false,
                            "@alias": "settingId",
                            "@name": "settingId"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "自助续学申请-新增",
                    "description": "添加自助续学申请",
                    "type": "object",

                    "properties": {
                        "orderNo": {
                            "type": "string",
                            "required": true,
                            "@alias": "orderNo",
                            "@name": "orderNo"
                        }
                    },

                    "required": ["orderNo"]
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
    var pluginName = "nl:selfLearn/add-self-learn-apply";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..add-self-learn-apply.options.js"
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
            "nl:selfLearn/add-self-learn-apply$options=./api..add-self-learn-apply.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
