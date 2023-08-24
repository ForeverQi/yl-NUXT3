/* eslint-disable */


(function() {
  var factory = function(getters) {
      var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
      var moduleName = "public", apiAlias = "query-project-brochure";

      var apiDefinition = {
          api: "cam/projectrule/web/list",
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
                  "title": "顶部导航-项目简章",
                  "description": "招生简章",
                  "type": "object",

                  "properties": {
                      "type": {
                          "type": "string",
                          "required": true,
                          "@alias": "type",
                          "@name": "type"
                      },

                      "hasSubSet": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "hasSubSet",
                          "@name": "hasSubSet"
                      }
                  },

                  "required": ["type", "hasSubSet"]
              });
          },

          responseDataNameAndEnumMapMethod: function(api, data) {
              return apiNameAndEnumConvert2(data, {
                  "id": "http://json-schema.org/draft-04/schema#",
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "title": "顶部导航-项目简章",
                  "description": "招生简章",
                  "type": "array",

                  "items": {
                      "type": "object",
                      "required": ["catagoryName", "url", "orderNo", "subCatagorys"],

                      "properties": {
                          "catagoryName": {
                              "type": "string",
                              "required": true,
                              "@alias": "catagoryName",
                              "@name": "catagoryName"
                          },

                          "url": {
                              "type": "string",
                              "required": true,
                              "@alias": "url",
                              "@name": "url"
                          },

                          "orderNo": {
                              "type": "number",
                              "required": true,
                              "@alias": "orderNo",
                              "@name": "orderNo"
                          },

                          "subCatagorys": {
                              "type": "array",
                              "required": true,
                              "default": "",

                              "items": {
                                  "type": "object",
                                  "required": ["catagoryName", "url", "orderNo"],

                                  "properties": {
                                      "catagoryName": {
                                          "type": "string",
                                          "required": true,
                                          "default": "",
                                          "@alias": "catagoryName",
                                          "@name": "catagoryName"
                                      },

                                      "url": {
                                          "type": "string",
                                          "required": true,
                                          "default": "",
                                          "@alias": "url",
                                          "@name": "url"
                                      },

                                      "orderNo": {
                                          "type": "string",
                                          "required": true,
                                          "default": "",
                                          "@alias": "orderNo",
                                          "@name": "orderNo"
                                      }
                                  }
                              },

                              "@alias": "subCatagorys",
                              "@name": "subCatagorys"
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
  var pluginName = "nl:public/query-project-brochure";

  if (typeof define === "function") {
      define([
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
          "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
          "./api..query-project-brochure.options.js"
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
          "nl:public/query-project-brochure$options=./api..query-project-brochure.options.js"
      ], factory, defineModule.isEnvNode() ? {
          module: module
      } : null);
  }
})();