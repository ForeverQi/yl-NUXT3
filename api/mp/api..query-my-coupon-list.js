/* eslint-disable */


(function() {
  var factory = function(getters) {
      var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
      var moduleName = "mp", apiAlias = "query-my-coupon-list";

      var apiDefinition = {
          api: "mp/usercoupon/web/list",
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
                  "title": "获取我的优惠券",
                  "description": "",
                  "type": "object",

                  "properties": {
                      "listType": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "listType",
                          "@name": "listType",

                          "@enums": [{
                              "type": "string",
                              "name": "not-use",
                              "value": "A"
                          }, {
                              "type": "string",
                              "name": "used",
                              "value": "U"
                          }, {
                              "type": "string",
                              "name": "expired",
                              "value": "E"
                          }]
                      },

                      "pageIndex": {
                          "type": "number",
                          "required": true,
                          "default": "",
                          "@alias": "pageIndex",
                          "@name": "pageIndex"
                      },

                      "pageSize": {
                          "type": "number",
                          "required": true,
                          "default": "",
                          "@alias": "pageSize",
                          "@name": "pageSize"
                      }
                  },

                  "required": ["listType", "pageIndex", "pageSize"]
              });
          },

          responseDataNameAndEnumMapMethod: function(api, data) {
              return apiNameAndEnumConvert2(data, {
                  "id": "http://json-schema.org/draft-04/schema#",
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "title": "获取我的优惠券",
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

                      "list": {
                          "type": "array",
                          "required": true,
                          "default": "",

                          "items": {
                              "type": "object",

                              "required": [
                                  "goodsType",
                                  "couponDelStatus",
                                  "couponAmountDetail",
                                  "couponId",
                                  "couponName",
                                  "couponScene",
                                  "couponType",
                                  "productId",
                                  "receivedTime",
                                  "superpositionStatus",
                                  "usageEndTime",
                                  "usageStartTime",
                                  "useStatus",
                                  "userCouponId",
                                  "userUsageEndTime",
                                  "userUsageStartTime",
                                  "usageTimeType",
                                  "validTime",
                                  "rules",
                                  "couponTag"
                              ],

                              "properties": {
                                  "goodsType": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "buttonStatus",
                                      "@name": "goodsType",

                                      "@enums": [{
                                          "type": "string",
                                          "name": "S",
                                          "value": "single"
                                      }, {
                                          "type": "string",
                                          "name": "M",
                                          "value": "more"
                                      }]
                                  },

                                  "couponDelStatus": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "couponDelStatus",
                                      "@name": "couponDelStatus"
                                  },

                                  "couponAmountDetail": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "couponDetail",
                                      "@name": "couponAmountDetail"
                                  },

                                  "couponId": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "couponId",
                                      "@name": "couponId"
                                  },

                                  "couponName": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "couponName",
                                      "@name": "couponName"
                                  },

                                  "couponScene": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "couponScene",
                                      "@name": "couponScene"
                                  },

                                  "couponType": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "couponType",
                                      "@name": "couponType",

                                      "@enums": [{
                                          "type": "string",
                                          "name": "M",
                                          "value": "full-discount"
                                      }, {
                                          "type": "string",
                                          "name": "L",
                                          "value": "vertical-reduction"
                                      }, {
                                          "type": "string",
                                          "name": "Z",
                                          "value": "discount"
                                      }]
                                  },

                                  "productId": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "productId",
                                      "@name": "productId"
                                  },

                                  "receivedTime": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "receivedTime",
                                      "@name": "receivedTime"
                                  },

                                  "superpositionStatus": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "superpositionStatus",
                                      "@name": "superpositionStatus"
                                  },

                                  "usageEndTime": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "usageEndTime",
                                      "@name": "usageEndTime"
                                  },

                                  "usageStartTime": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "usageStartTime",
                                      "@name": "usageStartTime"
                                  },

                                  "useStatus": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "useStatus",
                                      "@name": "useStatus",

                                      "@enums": [{
                                          "type": "string",
                                          "name": "N",
                                          "value": "not-start"
                                      }, {
                                          "type": "string",
                                          "name": "A",
                                          "value": "not-use"
                                      }, {
                                          "type": "string",
                                          "name": "C",
                                          "value": "frozen"
                                      }, {
                                          "type": "string",
                                          "name": "U",
                                          "value": "consumed"
                                      }, {
                                          "type": "string",
                                          "name": "E",
                                          "value": "expired"
                                      }]
                                  },

                                  "userCouponId": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "userCouponId",
                                      "@name": "userCouponId"
                                  },

                                  "userUsageEndTime": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "userUsageEndTime",
                                      "@name": "userUsageEndTime"
                                  },

                                  "userUsageStartTime": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "userUsageStartTime",
                                      "@name": "userUsageStartTime"
                                  },

                                  "usageTimeType": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "usageTimeType",
                                      "@name": "usageTimeType",

                                      "@enums": [{
                                          "type": "string",
                                          "name": "T",
                                          "value": "date"
                                      }, {
                                          "type": "string",
                                          "name": "D",
                                          "value": "day"
                                      }]
                                  },

                                  "validTime": {
                                      "type": "number",
                                      "required": true,
                                      "default": "",
                                      "@alias": "validTime",
                                      "@name": "validTime"
                                  },

                                  "rules": {
                                      "type": "array",
                                      "required": true,
                                      "default": "",
                                      "items": {},
                                      "@alias": "rules",
                                      "@name": "rules"
                                  },

                                  "couponTag": {
                                      "type": "string",
                                      "required": true,
                                      "default": "",
                                      "@alias": "couponTag",
                                      "@name": "couponTag"
                                  }
                              }
                          },

                          "@alias": "data",
                          "@name": "list"
                      }
                  },

                  "required": ["count", "list"]
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
  var pluginName = "nl:mp/query-my-coupon-list";

  if (typeof define === "function") {
      define([
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
          "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
          "./api..query-my-coupon-list.options.js"
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
          "nl:mp/query-my-coupon-list$options=./api..query-my-coupon-list.options.js"
      ], factory, defineModule.isEnvNode() ? {
          module: module
      } : null);
  }
})();