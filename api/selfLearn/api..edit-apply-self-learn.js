/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "selfLearn", apiAlias = "edit-apply-self-learn";

        var apiDefinition = {
            api: "selfLearn/apply/edit",
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
                    "title": "自助续学申请-编辑",
                    "description": "申请编辑",
                    "type": "object",

                    "properties": {
                        "applyId": {
                            "type": "string",
                            "required": false,
                            "@alias": "applyId",
                            "@name": "applyId"
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
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, undefined, {
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
    var pluginName = "nl:selfLearn/edit-apply-self-learn";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..edit-apply-self-learn.options.js"
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
            "nl:selfLearn/edit-apply-self-learn$options=./api..edit-apply-self-learn.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();