/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "selfLearn", apiAlias = "query-apply-list";

        var apiDefinition = {
            api: "selfLearn/apply/list",
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
                    "title": "自助续学申请-分页查询",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "applyDateBegin": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "applyDateBegin",
                            "@name": "applyDateBegin"
                        },

                        "applyDateEnd": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "applyDateEnd",
                            "@name": "applyDateEnd"
                        },

                        "orderKey": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "orderKey",
                            "@name": "orderKey"
                        },

                        "orderVal": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "orderVal",
                            "@name": "orderVal"
                        },

                        "pageIndex": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "isAuth": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "isAuth",
                            "@name": "isAuth"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "自助续学申请-分页查询",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "count": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "count",
                            "@name": "count"
                        },

                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "applyCreater",
                                    "applyDate",
                                    "applyId",
                                    "applyModifier",
                                    "applyModifyDate",
                                    "applyNo",
                                    "applySource",
                                    "applyType",
                                    "approvalNode",
                                    "approvalResult",
                                    "custId",
                                    "eeUserName",
                                    "eeUserid",
                                    "examAreacode",
                                    "examCap",
                                    "examYear",
                                    "feeTotal",
                                    "newApprovalId",
                                    "newClassOpenStatus",
                                    "newOrderId",
                                    "newOrderNo",
                                    "oriClassIds",
                                    "oriClassNames",
                                    "oriOrderId",
                                    "oriOrderNo",
                                    "oriOrderType",
                                    "payStatus",
                                    "projectId",
                                    "projectName",
                                    "queryUrl",
                                    "refundOrderNo",
                                    "refundStatus",
                                    "refundType",
                                    "refuseType",
                                    "schoolId",
                                    "schoolName",
                                    "scoreImageUrl",
                                    "scoreQueryAccount",
                                    "scoreQueryPwd",
                                    "settingId",
                                    "studentId",
                                    "studentprojectLmuserName",
                                    "studentprojectLmuserid",
                                    "userId",
                                    "userIdcard",
                                    "userName",
                                    "userYoulunum"
                                ],

                                "properties": {
                                    "applyCreater": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "applyCreater",
                                        "@name": "applyCreater"
                                    },

                                    "applyDate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "applyDate",
                                        "@name": "applyDate"
                                    },

                                    "applyId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "applyId",
                                        "@name": "applyId"
                                    },

                                    "applyModifier": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "applyModifier",
                                        "@name": "applyModifier"
                                    },

                                    "applyModifyDate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "applyModifyDate",
                                        "@name": "applyModifyDate"
                                    },

                                    "applyNo": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "applyNo",
                                        "@name": "applyNo"
                                    },

                                    "applySource": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "applySource",
                                        "@name": "applySource",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "O",
                                            "value": "order"
                                        }, {
                                            "type": "string",
                                            "name": "C",
                                            "value": "course"
                                        }]
                                    },

                                    "applyType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "applyType",
                                        "@name": "applyType",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "N",
                                            "value": "normal"
                                        }, {
                                            "type": "string",
                                            "name": "B",
                                            "value": "batch"
                                        }]
                                    },

                                    "approvalNode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "approvalNode",
                                        "@name": "approvalNode",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "P",
                                            "value": "first"
                                        }, {
                                            "type": "string",
                                            "name": "R",
                                            "value": "recheck"
                                        }]
                                    },

                                    "approvalResult": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "approvalResult",
                                        "@name": "approvalResult",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "P",
                                            "value": "success"
                                        }, {
                                            "type": "string",
                                            "name": "R",
                                            "value": "reject"
                                        }, {
                                            "type": "string",
                                            "name": "W",
                                            "value": "wait"
                                        }]
                                    },

                                    "custId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "custId",
                                        "@name": "custId"
                                    },

                                    "eeUserName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "eeUserName",
                                        "@name": "eeUserName"
                                    },

                                    "eeUserid": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "eeUserid",
                                        "@name": "eeUserid"
                                    },

                                    "examAreacode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examAreacode",
                                        "@name": "examAreacode"
                                    },

                                    "examCap": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examCap",
                                        "@name": "examCap"
                                    },

                                    "examYear": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examYear",
                                        "@name": "examYear"
                                    },

                                    "feeTotal": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "feeTotal",
                                        "@name": "feeTotal"
                                    },

                                    "newApprovalId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "newApprovalId",
                                        "@name": "newApprovalId"
                                    },

                                    "newClassOpenStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "newClassOpenStatus",
                                        "@name": "newClassOpenStatus",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "W",
                                            "value": "wait"
                                        }, {
                                            "type": "string",
                                            "name": "Y",
                                            "value": "open"
                                        }]
                                    },

                                    "newOrderId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "newOrderId",
                                        "@name": "newOrderId"
                                    },

                                    "newOrderNo": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "newOrderNo",
                                        "@name": "newOrderNo"
                                    },

                                    "oriClassIds": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "oriClassIds",
                                        "@name": "oriClassIds"
                                    },

                                    "oriClassNames": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "oriClassNames",
                                        "@name": "oriClassNames"
                                    },

                                    "oriOrderId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "oriOrderId",
                                        "@name": "oriOrderId"
                                    },

                                    "oriOrderNo": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "oriOrderNo",
                                        "@name": "oriOrderNo"
                                    },

                                    "oriOrderType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "oriOrderType",
                                        "@name": "oriOrderType"
                                    },

                                    "payStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "payStatus",
                                        "@name": "payStatus",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "S",
                                            "value": "success"
                                        }, {
                                            "type": "string",
                                            "name": "U",
                                            "value": "wait"
                                        }, {
                                            "type": "string",
                                            "name": "N",
                                            "value": "noNeed"
                                        }]
                                    },

                                    "projectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectId",
                                        "@name": "projectId"
                                    },

                                    "projectName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectName",
                                        "@name": "projectName"
                                    },

                                    "queryUrl": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "queryUrl",
                                        "@name": "queryUrl"
                                    },

                                    "refundOrderNo": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "refundOrderNo",
                                        "@name": "refundOrderNo"
                                    },

                                    "refundStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "refundStatus",
                                        "@name": "refundStatus",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "C",
                                            "value": "success"
                                        }, {
                                            "type": "string",
                                            "name": "N",
                                            "value": "noNeed"
                                        }, {
                                            "type": "string",
                                            "name": "I",
                                            "value": "wait"
                                        }]
                                    },

                                    "refundType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "refundType",
                                        "@name": "refundType"
                                    },

                                    "refuseType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "refuseType",
                                        "@name": "refuseType"
                                    },

                                    "schoolId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "schoolId",
                                        "@name": "schoolId"
                                    },

                                    "schoolName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "schoolName",
                                        "@name": "schoolName"
                                    },

                                    "scoreImageUrl": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "scoreImageUrl",
                                        "@name": "scoreImageUrl"
                                    },

                                    "scoreQueryAccount": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "scoreQueryAccount",
                                        "@name": "scoreQueryAccount"
                                    },

                                    "scoreQueryPwd": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "scoreQueryPwd",
                                        "@name": "scoreQueryPwd"
                                    },

                                    "settingId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "settingId",
                                        "@name": "settingId"
                                    },

                                    "studentId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "studentId",
                                        "@name": "studentId"
                                    },

                                    "studentprojectLmuserName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "studentprojectLmuserName",
                                        "@name": "studentprojectLmuserName"
                                    },

                                    "studentprojectLmuserid": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "studentprojectLmuserid",
                                        "@name": "studentprojectLmuserid"
                                    },

                                    "userId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "userId",
                                        "@name": "userId"
                                    },

                                    "userIdcard": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "userIdcard",
                                        "@name": "userIdcard"
                                    },

                                    "userName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "userName",
                                        "@name": "userName"
                                    },

                                    "userYoulunum": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "userYoulunum",
                                        "@name": "userYoulunum"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["count", "data"]
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
    var pluginName = "nl:selfLearn/query-apply-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-apply-list.options.js"
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
            "nl:selfLearn/query-apply-list$options=./api..query-apply-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
