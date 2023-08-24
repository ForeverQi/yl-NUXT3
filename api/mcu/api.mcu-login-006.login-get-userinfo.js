/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "login", apiAlias = "login-get-userinfo";

        var apiDefinition = {
            api: "uc/user/profile/view/vx",
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
                    "title": "获取用户信息",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "userId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userId",
                            "@name": "userId"
                        },

                        "userName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userName",
                            "@name": "userName"
                        },

                        "userFlag": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userFlag",
                            "@name": "userFlag"
                        },

                        "userLoginname": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userLoginname",
                            "@name": "userLoginname"
                        },

                        "userLoginpwdstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userLoginpwdstatus",
                            "@name": "userLoginpwdstatus"
                        },

                        "userLockstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userLockstatus",
                            "@name": "userLockstatus"
                        },

                        "userLastloginip": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userLastloginip",
                            "@name": "userLastloginip"
                        },

                        "userLastlogindate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userLastlogindate",
                            "@name": "userLastlogindate"
                        },

                        "userCreatedate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userCreatedate",
                            "@name": "userCreatedate"
                        },

                        "userCreatetype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userCreatetype",
                            "@name": "userCreatetype"
                        },

                        "userMobile": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userMobile",
                            "@name": "userMobile"
                        },

                        "userMobilestatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userMobilestatus",
                            "@name": "userMobilestatus"
                        },

                        "userEmail": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userEmail",
                            "@name": "userEmail"
                        },

                        "userEmailstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userEmailstatus",
                            "@name": "userEmailstatus"
                        },

                        "userIdcard": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userIdcard",
                            "@name": "userIdcard"
                        },

                        "userGender": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userGender",
                            "@name": "userGender"
                        },

                        "studentDeposittype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "studentDeposittype",
                            "@name": "studentDeposittype"
                        },

                        "userIdcardstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userIdcardstatus",
                            "@name": "userIdcardstatus"
                        },

                        "recvaddrStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "recvaddrStatus",
                            "@name": "recvaddrStatus"
                        },

                        "userAreacode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userAreacode",
                            "@name": "userAreacode"
                        },

                        "userAreadesc": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userAreadesc",
                            "@name": "userAreadesc"
                        },

                        "userWorkunit": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userWorkunit",
                            "@name": "userWorkunit"
                        },

                        "userWorkyear": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userWorkyear",
                            "@name": "userWorkyear"
                        },

                        "userEduschool": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userEduschool",
                            "@name": "userEduschool"
                        },

                        "userEdulevel": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userEdulevel",
                            "@name": "userEdulevel"
                        }
                    },

                    "required": [
                        "userId",
                        "userName",
                        "userFlag",
                        "userLoginname",
                        "userLoginpwdstatus",
                        "userLockstatus",
                        "userLastloginip",
                        "userLastlogindate",
                        "userCreatedate",
                        "userCreatetype",
                        "userMobile",
                        "userMobilestatus",
                        "userEmail",
                        "userEmailstatus",
                        "userIdcard",
                        "userGender",
                        "studentDeposittype",
                        "userIdcardstatus",
                        "recvaddrStatus",
                        "userAreacode",
                        "userAreadesc",
                        "userWorkunit",
                        "userWorkyear",
                        "userEduschool",
                        "userEdulevel"
                    ]
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
    var pluginName = "nl:login/login-get-userinfo";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.mcu-login-006.login-get-userinfo.options.js"
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
            "nl:login/login-get-userinfo$options=./api.mcu-login-006.login-get-userinfo.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();