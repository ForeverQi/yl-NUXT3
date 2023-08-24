/* eslint-disable */


(function() {
    var factory = function(getters) {
        return {
            ifSimulateRequest: false,
            ifSimulateSuccessfulResponse: 'randomly',
            simulateResponseData: {
                count: 1,
                data: [
                    {
                        liveCover: 'https://www.niceloo.com/UploadFiles/3132901618617487.png',
                        type: '一建',
                        liveId: '112',
                        liveStatus: 2,
                        liveStartTime: '2021-01-03 12:33',
                        liveEndTime: '2022-04-03 12:33',
                    },
                    {
                        liveCover: 'https://www.niceloo.com/UploadFiles/3132901618617487.png',
                        type: '一建',
                        liveId: '113',
                        liveStatus: 1,
                        liveStartTime: '2021-01-03 12:33',
                        liveEndTime: '2022-04-03 12:33',
                    },
                    {
                        liveCover: 'https://www.niceloo.com/UploadFiles/3132901618617487.png',
                        type: '一建',
                        liveId: '114',
                        liveStatus: 2,
                        liveStartTime: '2021-01-03 12:33',
                        liveEndTime: '2024-04-03 12:33',
                    },
                    {
                        liveCover: 'https://www.niceloo.com/UploadFiles/3132901618617487.png',
                        type: '一建',
                        liveId: '115',
                        liveStatus: 2,
                        liveStartTime: '2021-01-03 12:33',
                        liveEndTime: '2022-04-03 12:33',
                    },
                    {
                        liveCover: 'https://www.niceloo.com/UploadFiles/3132901618617487.png',
                        type: '一建',
                        liveId: '116',
                        liveStatus: 2,
                        liveStartTime: '2021-01-03 12:33',
                        liveEndTime: '2024-04-03 12:33',
                    },
                ],
            }
        };
    };

    var pluginName = "nl:topLive/mcp-home-top-live-list$options";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js"], function(defineModule) {
            return defineModule.wrap4amdjs(pluginName, arguments, factory);
        });
    } else if (typeof defineModule === "function") defineModule(pluginName, [], factory, defineModule.isEnvNode() ? {
        module: module
    } : null);
})();
