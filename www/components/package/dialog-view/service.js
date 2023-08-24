import Vue from 'vue';
import DialogView from './index.vue';

// const DialogConstructor = Vue.extend(DialogView);
/**
 * 来一个Modal
 * @param {*} ModalContent 内容
 * @param {*} options // Modal的设置属性
 * @return
 */
export default ({ modalHeader = null, modalContent = null, modalFooter = null }, data = {}, options = {}) => {
    return new Promise((resolve) => {
        const el = document.createElement('div');
        document.body.appendChild(el);
        const CreateModel = Vue.extend({
            components: {
                vFragment: {
                    functional: true,
                    render(h, context) {
                        const slots = context.slots();
                        return Object.keys(slots).map((k) => {
                            return slots[k];
                        });
                    },
                },
            },
            methods: {
                doClose(val) {
                    resolve({ type: 'close', ret: val });
                    this.$el.parentNode.removeChild(this.$el);
                    this.$destroy();
                },
            },
            mounted() {
                // new Vue({
                //     render(h) {
                //         const getContent = () => {
                //             return typeof modalContent === 'string' ? <vFragment>{modalContent}</vFragment> : modalContent;
                //         };
                //         const showContent = () => {
                //             return h(getContent(), {
                //                 attrs: {
                //                     ...data,
                //                 },
                //                 on: {
                //                     doClose: this.doClose,
                //                 },
                //             });
                //         };

                //         return (
                //             <DialogView onDo-close={this.doClose} attrs={options}>
                //                 {modalHeader && <vFragment slot="title">{modalHeader}</vFragment>}
                //                 {showContent()}
                //                 {modalFooter && <vFragment slot="footer">{modalFooter}</vFragment>}
                //             </DialogView>
                //         );
                //     },
                // }).$mount(this.$el);
            },
            ...global.$nuxt.context,
        });
        new CreateModel().$mount(el);
    });
};
