/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "save-user-info";

        var apiDefinition = {
            api: "uc/user/profile/edit",
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
                    "title": "修改用户信息",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "userNickname": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userNickname",
                            "@name": "userNickname"
                        },

                        "userAvatar": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userAvatar",
                            "@name": "userAvatar"
                        },

                        "userQq": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userQq",
                            "@name": "userQq"
                        },

                        "userWeixin": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userWeixin",
                            "@name": "userWeixin"
                        },

                        "userMarrystatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userMarrystatus",
                            "@name": "userMarrystatus"
                        },

                        "userPostcode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userPostcode",
                            "@name": "userPostcode"
                        },

                        "userAddress": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userAddress",
                            "@name": "userAddress"
                        },

                        "userBirthday": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userBirthday",
                            "@name": "userBirthday"
                        },

                        "userGender": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userGender",
                            "@name": "userGender"
                        },

                        "userAreacode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userAreacode",
                            "@name": "userAreacode"
                        },

                        "userSignature": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userSignature",
                            "@name": "userSignature"
                        },

                        "roleIds": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "roleIds",
                            "@name": "roleIds"
                        },

                        "userWorkunit": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userWorkunit",
                            "@name": "userWorkunit"
                        },

                        "userWorkyear": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userWorkyear",
                            "@name": "userWorkyear"
                        },

                        "userEduschool": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userEduschool",
                            "@name": "userEduschool"
                        },

                        "userEdulevel": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userEdulevel",
                            "@name": "userEdulevel"
                        },

                        "userEdumajor": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userEdumajor",
                            "@name": "userEdumajor"
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

    var pluginName = "nl:uc/save-user-info";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.UC0005.save-user-info.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:uc/save-user-info$options=./api.UC0005.save-user-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
