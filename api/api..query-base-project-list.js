/* eslint-disable */


(function() {
  var factory = function(getters) {
      var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
      var moduleName = "public", apiAlias = "query-base-project-list";

      var apiDefinition = {
          api: "bd/project/tree",
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
                  "title": "基础数据-项目列表",
                  "description": "基础数据项目列表",
                  "type": "object",

                  "properties": {
                      "brandId": {
                          "type": "string",
                          "required": false,
                          "default": "",
                          "@alias": "brandId",
                          "@name": "brandId"
                      },

                      "projectAvlstatus": {
                          "type": "string",
                          "required": false,
                          "default": "",
                          "@alias": "projectAvlstatus",
                          "@name": "projectAvlstatus"
                      },

                      "projectShowstatus": {
                          "type": "string",
                          "required": false,
                          "default": "",
                          "@alias": "projectShowstatus",
                          "@name": "projectShowstatus"
                      }
                  },

                  "required": []
              });
          },

          responseDataNameAndEnumMapMethod: function(api, data) {
              return apiNameAndEnumConvert2(data, {
                  "id": "http://json-schema.org/draft-04/schema#",
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "title": "基础数据-项目列表",
                  "description": "基础数据项目列表",
                  "type": "object",

                  "properties": {
                      "data": {
                          "type": "array",
                          "required": true,
                          "default": "",

                          "items": {
                              "type": "object",
                              "required": ["projectId", "projectName", "children"],

                              "properties": {
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

                                  "children": {
                                      "type": "array",
                                      "required": true,
                                      "default": "",

                                      "items": {
                                          "type": "object",
                                          "required": ["projectId", "projectName"],

                                          "properties": {
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
                                              }
                                          }
                                      },

                                      "@alias": "children",
                                      "@name": "children"
                                  }
                              }
                          },

                          "@alias": "data",
                          "@name": "data"
                      }
                  },

                  "required": ["data"]
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
  var pluginName = "nl:public/query-base-project-list";

  if (typeof define === "function") {
      define([
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
          "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
          "./api..query-base-project-list.options.js"
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
          "nl:public/query-base-project-list$options=./api..query-base-project-list.options.js"
      ], factory, defineModule.isEnvNode() ? {
          module: module
      } : null);
  }
})();