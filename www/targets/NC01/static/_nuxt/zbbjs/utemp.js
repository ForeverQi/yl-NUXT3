/* eslint-disable */

;(function(){
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    function setCookie(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    function setTime() {
        //var newVal = getCookie("aa")+time;
        setCookie("xwtemp", Date.now());
    }

    if(!getCookie("xwtemp")){
        setTime();
    }
    window.addEventListener("click", function (e) {
        console.log(e.target.tagName);
        setTime();
    });

    window.addEventListener("beforeunload", function (e) {
        console.log(e.target.tagName);
        setTime();
    },true);
})();