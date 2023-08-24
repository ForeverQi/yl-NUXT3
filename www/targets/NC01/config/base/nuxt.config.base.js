import path from 'path';
import NuxtBase from './nuxt.base.js';

NuxtBase.build.plugins.push(...(process.argv[2] === 'build' ? [] : require(path.resolve(__dirname, '../../../../../', 'build/scripts-integration/index.js'))));
export default {
    ...NuxtBase,
};
