import LoadingService from './loading/index';
import msgboxService from './msgbox/index.js';
import messageService from './message/index.js';
import paymentTips from './advertisement/paymentTips/index.vue';
import previewTheStop from './previewthestop/index';
import breadcrumb from './breadcrumb/index.vue';
import ImageView from './image-view/index.vue';
import transverseProgress from './transverseProgress/Index/index.vue';
import mcumsgService from './mcumsg/index.js';
import DialogView from './dialog-view/index.vue';
import DialogService from './dialog-view/service.js';

const install = function (Vue) {
    [DialogView, ImageView, paymentTips, breadcrumb, transverseProgress].forEach((component) => {
        Vue.component(component.name, component);
    });
    let defaultMsgboxService = msgboxService;
    if (typeof window !== 'undefined' && window.location.href.indexOf('/agile-course') > -1) {
        defaultMsgboxService = mcumsgService;
    }
    Vue.prototype.$baseUI = {
        loading: LoadingService,
        alert: defaultMsgboxService.alert,
        confirm: defaultMsgboxService.confirm,
        mcumsg: mcumsgService,
        clickStop: previewTheStop.clickStop,
        createModel: DialogService,
    };
    Vue.prototype.$Message = messageService;
};
// 临时解决方案 回头再考虑细节
if (typeof window !== 'undefined' && window.location.href.indexOf('/agile-course') > -1) {
    global.__implXlib_alert__ = function (content, hint) {
        return mcumsgService.alert(content);
    };
} else {
    global.__implXlib_alert__ = function (content, hint) {
        return msgboxService.alert({
            content,
            hint,
        });
    };
}

global.__implXlib_toast__ = function (content, hint) {
    console.error('>>>', content, hint);
    messageService.error('您的页面开小差了，刷新页面再试一次！');
};

export default {
    install,
    loading: LoadingService,
    alert: msgboxService.alert,
    confirm: msgboxService.confirm,
};
