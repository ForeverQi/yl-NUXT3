import Vue from 'vue';
import Loading from './index.vue';

/**
 * 局部loading自定义指令
 * Vue.extend 接受参数并返回一个构造器，new 该构造器可以返回一个组件实例
 * 当我们 new Mask() 的时候，把该组件实例挂载到一个 div 上
 **/
const Mask = Vue.extend(Loading);

// 更新是否显示
const toggleLoading = (el, binding) => {
    const isLoading = binding.value;
    if (isLoading) {
        Vue.nextTick(() => {
            // 控制loading组件显示
            el.instance.visible = true;
            // 插入到目标元素
            insertDom(el, el, binding);
        });
    } else {
        el.instance.visible = false;
    }
};

const insertDom = (parent, el) => {
    parent.style.position = 'relative';
    parent.appendChild(el.mask);
    // 获取loadingMask dom元素
    const loadingMask = el.children[el.children.length - 1];
    // 获取设置的背景颜色
    const backgroundColor = el.getAttribute('loading-background');
    // 获取设置的loading颜色
    const loadingColor = el.getAttribute('loading-color') || '#FF0705';
    //设置背景颜色
    loadingMask.style.backgroundColor = backgroundColor;
    // 设置loading颜色
    const svg = loadingMask.children[loadingMask.children.length - 1];
    svg.firstChild.style.stroke = loadingColor;
    svg.firstChild.style.fill = 'transparent';
};

const loading = {
    //第一次绑定到元素时调用
    bind(el, binding) {
        const mask = new Mask({
            el: document.createElement('div'),
        });
        //用一个变量接住mask实例
        el.instance = mask;
        el.mask = mask.$el;
        el.maskStyle = {};
        el.createTime = binding.value ? new Date().getTime() : 0;
        el.endTime = 0;
        binding.value && toggleLoading(el, binding);
    },
    //所在组件的 VNode 更新时调用--比较更新前后的值
    update(el, binding) {
        if (binding.value === binding.oldValue) {
            return;
        }
        if (el.createTime) {
            el.endTime = new Date().getTime();
        } else {
            el.createTime = new Date().getTime();
            return toggleLoading(el, binding);
        }
        const loadingDelay = el.getAttribute('loading-delay');
        const loadingDelayTime = parseInt(el.getAttribute('loading-delay-time')) || 500;
        if (loadingDelay) {
            if (el.endTime && el.createTime) {
                let cha = el.endTime - el.createTime;
                el.createTime = 0;
                el.endTime = 0;
                if (cha < 500) {
                    return setTimeout(() => {
                        return toggleLoading(el, binding);
                    }, loadingDelayTime);
                } else if (binding.oldValue !== binding.value) {
                    toggleLoading(el, binding);
                }
            }
        }
        if (binding.oldValue !== binding.value) {
            toggleLoading(el, binding);
        }
    },
    //指令与元素解绑时调用
    unbind(el) {
        el.instance && el.instance.$destroy();
    },
};
export { loading };
