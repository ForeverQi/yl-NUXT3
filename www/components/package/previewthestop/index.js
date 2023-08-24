const clickStop = () => {
    if (window.location.host.indexOf('jiaoyu361.com') > -1) {
        // 判断登录来源 -1时不可点击
        global.__implXlib_alert__('该功能在仿真环境下不支持预览!');
        return false;
    } else {
        return true;
    }
};

export default {
    clickStop, // 弹窗
};
