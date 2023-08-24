import Vue from 'vue';

import { loading } from '../../loading/loading.js';
import baseUI from '@/www/components/package';

Vue.directive('loading', loading);
Vue.use(baseUI);

export default (context, inject) => {
    inject('baseUI', baseUI);
};
