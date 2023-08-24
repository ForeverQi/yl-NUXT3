export default {
    /**
     * 获取 cookie
     * @param {String} key cookie的名称
     * @returns {String|null}
     */
    get(key) {
        if (typeof document === 'undefined') {
            return null;
        }
        var cookieObj = document.cookie.split('; ').find((row) => row.startsWith(`${key}=`));
        if (cookieObj) {
            return decodeURIComponent(cookieObj.split('=')[1]);
        } else {
            return null;
        }
    },
    getDomain() {
        let href = '';
        try {
            href = window.top.location.host;
        } catch (error) {
            href = window.location.host;
        }
        href = href.split(':')[0];
        let arr = href.split('.');
        let fc = (arr, i = 0, d = 1) => {
            let ti = i + 2;
            let sp = arr.splice(-ti, ti);
            return sp.join('.');
        };

        return fc(arr.concat(), 0);
    },

    /**
     * 设置cookie
     * @param {String} key cookie的名称
     * @param {String} value cookie的值
     * @param {Number} [expiresMilliseconds] cookie的生命时长。单位：毫秒。如果为空，则只在 session 内有效，关闭浏览器后失效
     */
    set(key, value, expiresMilliseconds) {
        if (typeof document === 'undefined') {
            return;
        }
        var expires = '';
        if (expiresMilliseconds) {
            var d = new Date();
            expires = 'expires=' + new Date(d.getTime() + expiresMilliseconds).toUTCString();
        }
        // document.cookie = `${key}=${encodeURIComponent(value)};path=/;domain=${location.hostname.substr(location.hostname.indexOf('.') + 1)};${expires}`;
        document.cookie = `${key}=${encodeURIComponent(value)};path=/;domain=${this.getDomain()};${expires}`;
    },

    /**
     * 删除 cookie
     * @param {String} key cookie的名称
     */
    del(key) {
        this.set(key, '', -1);
    },

    /**
     * 判断是否存在给定名称的 cookie
     * @param {String} key cookie的名称
     * @returns {Boolean}
     */
    has(key) {
        return document.cookie.split(';').some((item) => {
            return item.trim().indexOf(`${key}=`) == 0;
        });
    },
};
