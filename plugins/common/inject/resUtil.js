let load = function (url, sucess, fail) {
    let scriptEl = document.querySelector(`script[src = '${url}']`);
    let cb = function () {
        if (scriptEl.loaded) {
            sucess();
        } else if (fail) {
            fail();
        }
    };
    if (scriptEl === null) {
        let el = document.createElement('script');
        scriptEl = el;
        el.type = 'text/javascript';
        el.src = url;
        document.querySelector('head').appendChild(el);
        el.onerror = () => {
            el.loaded = false;
            cb();
        };
        el.onload = el.onreadystatechange = () => {
            if (el.readyState === 'complete' || el.readyState === undefined || el.readyState === 'loaded') {
                el.onload = el.onreadystatechange = undefined;
                el.loaded = true;
                cb();
            }
        };
    } else if (scriptEl.onload || scriptEl.onreadystatechange) {
        let interval = setInterval(() => {
            if (!(scriptEl.onload || scriptEl.onreadystatechange) && scriptEl.loaded != null) {
                clearInterval(interval);
                cb();
            }
        }, 50);
    } else {
        cb();
    }
};
const ret = {
    loadJs(url, cb, fail) {
        load(url, cb, fail);
    },
    loadJss: (urls, cb, fail) => {
        let promissList = [];
        for (let i = 0; i < urls.length; i++) {
            let url = urls[i];
            promissList.push(
                new Promise((resolve, reject) => {
                    ret.loadJs(url, resolve, reject);
                })
            );
        }
        Promise.all(promissList).then(cb).catch(fail);
    },
    getUresOrigin() {
        let res = '';
        switch (process.env.config.env) {
            case 'local':
            case 'dev':
                res = '';
                break;
            case 'test':
                res = '';
                break;
            case 'uat':
                res = '';
                break;
            default:
                res = '';
        }
        return res;
    },
};
export default ret;
