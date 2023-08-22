const eslintJsdocCfg = require('./.eslintjsdoc');

const cfg = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: ['@nuxtjs', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
    // plugins: ['jsdoc'],
    // add your custom rules here
    rules: {
        'vue/attributes-order': [0],
        'vue/no-unused-components': [0],
        yoda: [0],
        'no-var': [0],
        'no-undef': [0],
        'unicorn/prefer-includes': [0],
        'spaced-comment': [0],
        eqeqeq: [0],
        'prefer-const': [0],
        'no-dupe-keys': [0],
        'prefer-promise-reject-errors': [0],
        'vue/no-v-html': [0],
        'vue/component-definition-name-casing': [0],
        'no-console': [0, 'log', 'error'],
        'vue/no-reserved-keys': [0],
        // ...eslintJsdocCfg.recommended,
    },
    overrides: [],
};

// if (eslintJsdocCfg.ignoreList.length > 0) {
//     cfg.overrides.push({
//         files: [...eslintJsdocCfg.ignoreList],
//         rules: {
//             ...eslintJsdocCfg.close,
//         },
//     });
// }
module.exports = cfg;

// {
//     "env": {
//         "browser": true,
//         "es2021": true,
//         "node": true
//     },
//     "extends": ["eslint:recommended", "plugin:vue/essential", "plugin:prettier/recommended"],
//     "parser": "vue-eslint-parser",
//     "parserOptions": {
//         "parser": "@babel/eslint-parser",
//         "ecmaVersion": 12,
//         "sourceType": "module",
//         "babelOptions": {
//             "babelrcRoots": ["../"]
//         }
//     },
//     "plugins": ["vue", "@babel"],
//     "rules": {
//         "no-debugger": [0]
//     },
//     "globals": {
//         "GlobalConfig": "writable"
//     }
// }
