export default {
    initPaper({ paperId, answersheetId }) {
        return new Promise((resolve, reject) => {
            const oScript = document.createElement('script');
            oScript.src = '/_nuxt/coursePopSupport/PaperClass.js';
            oScript.defer = true;
            document.querySelector('head').appendChild(oScript);
            oScript.onload = function () {
                const paper = PaperClass.initPaper({
                    paperId,
                    answersheetId,
                    service: window,
                    options: {
                        sourceType: 'YOULU',
                    },
                });
                resolve(paper);
            };
            oScript.onError = function () {
                reject();
            };
        });
    },
};
