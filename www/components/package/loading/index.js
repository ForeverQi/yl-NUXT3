import Vue from 'vue';
import loadingVue from './loading/index.vue';

const LoadingConstructor = Vue.extend(loadingVue);
const loadingInstanceArr = [];

LoadingConstructor.prototype.close = function () {
    setTimeout(() => {
        this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
        this.$destroy();
    }, 200);
};

const loading = (options = {}) => {
    let instance = new LoadingConstructor({
        el: document.createElement('div'),
        data: options,
    });

    document.body.appendChild(instance.$el);
    loadingInstanceArr.push(instance);
    return instance;
};
loading.closeAll = () => {
    loadingInstanceArr.forEach((instance) => {
        instance.close();
    });
};
export default loading;
