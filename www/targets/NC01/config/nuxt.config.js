import { merge } from 'webpack-merge';
import nuxtConfigBase from './base/nuxt.config.base.js';
import nuxtConfigSSR from './base/nuxt.config.base_ssr.js';
import configDev from './base/nuxt.config.dev1';
import configTest from './base/nuxt.config.test.js';
import configUat from './base/nuxt.config.uat.js';
import configProd from './base/nuxt.config.prod.js';
// console.log(process.env.npm_lifecycle_event);
let nuxtConfig = {};
if (process.env.npm_lifecycle_event === 'buildSsr') {
    nuxtConfig = nuxtConfigSSR;
} else {
    nuxtConfig = nuxtConfigBase;
}
let config;
switch (process.env.npm_config_env) {
    case 'dev1':
        config = merge(nuxtConfig, configDev);
        break;

    case 'test':
        config = merge(nuxtConfig, configTest);
        break;

    case 'uat':
        config = merge(nuxtConfig, configUat);
        break;

    default:
        config = merge(nuxtConfig, configProd);
        break;
}
console.log(config, '33333');
export default function () {
    return config;
}
