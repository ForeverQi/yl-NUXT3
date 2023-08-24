<template>
    <div class="change-env" v-show="isShowChangeEnv">
        <div class="list">
            <div class="container">
                <div class="description">
                    <div class="domain">
                        {{ getLocationHref }}
                    </div>
                    <div class="branch-description" v-if="branchDescription">
                        {{ branchDescription }}
                    </div>
                    <a href="https://wwwnext.youlu.com/" target="_blank">查看更多></a>
                </div>
                <div class="item" v-for="(item, index) in envList" :key="index" :class="{ active: envValue === item.value }" @click="changeEnv(item.value)">
                    {{ item.name }}
                </div>
            </div>
        </div>
        <div class="wrap">
            <div class="env-value">{{ envName }}</div>
            <img class="select-img" src="./asset/images/select_customer.png" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import cookieUtil from '@youlu/niceloo/libs/@xlib.01/lib/util/util.cookie.js';
export default {
    name: 'ChangeEnv',
    data() {
        return {
            envValue: this.$nuxt.context.env.config.env, // 选中的环境标识
            envName: '', // 选中的环境标识名称
            envList: [
                {
                    value: 'dev',
                    name: '开发环境',
                },
                {
                    value: 'test',
                    name: '测试环境',
                },
                {
                    value: 'uat',
                    name: 'UAT环境',
                },
                {
                    value: 'prod',
                    name: '正式环境',
                },
            ],
            branchDescription: '', // 版本描述
        };
    },
    computed: {
        // 是否显示切换环境按钮
        isShowChangeEnv() {
            if (process.client && this.checkDomain(window.location.hostname)) {
                let href = window.location.href; // 当前访问地址
                let secondHref = href.split('.')[0];
                let secondHrefFirst = secondHref.split('//')[1];

                // 多实例
                if (/(next)$/.test(href.split('.')[1])) {
                    return true;
                }

                // 正常配置
                if (/(dev|test|uat)$/.test(secondHrefFirst)) {
                    return true;
                }
            }
            return false;
        },
        // 获取当前域名标识
        getLocationHref() {
            if (process.client) {
                return window.location.origin;
            } else {
                return '';
            }
        },
    },
    mounted() {
        if (localStorage.getItem('webpackPresetRuntimeEnv')) {
            this.envValue = localStorage.getItem('webpackPresetRuntimeEnv');
        }

        // 检测url中是否env, 优先使用url中设置的环境
        if (this.$route.query.env) {
            this.changeEnv(this.$route.query.env);
        }
        this.getEnvName(this.envValue);
        cookieUtil.setItem('tool_dataOriginEnv', this.envValue, 30 * 24 * 60 * 60, '/');

        if (this.isShowChangeEnv) {
            this.queryReleaseHistory();
        }
    },
    methods: {
        /**
         * 切换环境
         * @param {String} envValue 对应环境标识
         */
        changeEnv(envValue) {
            if (envValue === this.envValue) return;

            this.envValue = envValue;
            localStorage.setItem('webpackPresetRuntimeEnv', this.envValue);
            cookieUtil.setItem('tool_dataOriginEnv', this.envValue, 30 * 24 * 60 * 60, '/');
            localStorage.removeItem('select_project_section');
            localStorage.removeItem('examProject');
            localStorage.removeItem('examCollege');
            localStorage.removeItem('examSubjectId');
            window.location.reload();
        },

        /**
         * 判断访问地址是否是域名形式
         * @param {String} url 访问地址
         * @returns {boolean} 是否是域名
         */
        checkDomain(url) {
            const doname =
                /^([\w-]+\.)+((com)|(net)|(org)|(gov\.cn)|(info)|(cc)|(com\.cn)|(net\.cn)|(org\.cn)|(name)|(biz)|(tv)|(cn)|(mobi)|(name)|(sh)|(ac)| {3}(io)|(tw)|(com\.tw)|(hk)|(com\.hk)|(ws)|(travel)|(us)|(tm)|(la)|(me\.uk)|(org\.uk)|(ltd\.uk)|(plc\.uk)|(in)|(eu)|(it)|(jp))$/;
            return doname.test(url);
        },

        // 获取环境名称
        getEnvName(envValue) {
            for (let i = 0; i < this.envList.length; i++) {
                if (envValue === this.envList[i].value) {
                    this.envName = this.envList[i].name.slice(0, envValue === 'uat' ? 3 : 2);
                    break;
                }
            }
        },

        /***
         * 查询发布历史数据
         * @returns {*}
         */
        queryReleaseHistory() {
            axios.get('http://wwwnext.youlu.com/release-history.json?v=' + Date.now()).then((result) => {
                if (result.data) {
                    for (let i = 0; i < result.data.length; i++) {
                        if (result.data[i].jenkinsBuildBranchDescription && window.location.origin === result.data[i].domainName) {
                            this.branchDescription = result.data[i].jenkinsBuildBranchDescription;
                            break;
                        }
                    }
                }
            });
        },
    },
};
</script>

<style scoped lang="less">
.change-env {
    position: fixed;
    right: 4px;
    top: 117px;
    z-index: 100;
    display: flex;

    .wrap {
        width: 64px;
        height: 64px;
        font-size: 14px;
        background: #ffffff;
        color: #ff2e30;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        box-shadow: 0 0 12px 0 rgb(58 61 75 / 10%);
        cursor: pointer;

        .env-value {
            font-weight: bold;
            display: block;
        }
        .select-img {
            display: none;
            width: 100%;
            height: 100%;
        }
    }

    .list {
        display: none;
        width: 280px;
        padding-right: 10px;
        box-sizing: border-box;
        position: relative;

        .description {
            color: #3a3d4b;
            font-size: 14px;
            text-align: center;
            border-bottom: 1px solid #eeeeee;
            word-break: break-all;
            margin-bottom: 10px;

            .domain {
                margin-bottom: 10px;
                font-weight: bold;
                font-size: 14px;
            }

            .branch-description {
                margin-bottom: 10px;
                font-size: 14px;
            }

            a {
                font-size: 13px;
                color: #999999;
                display: block;
                margin-bottom: 10px;
            }
        }

        .container {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            flex-direction: column;
            align-items: center;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 12px 0 rgb(58 61 75 / 10%);
        }

        .item {
            width: 100%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            color: #3a3d4b;
            font-size: 14px;
            border-radius: 8px;
            margin-bottom: 10px;
            cursor: pointer;

            &:last-child {
                margin-bottom: 0;
            }

            &.active,
            &:hover {
                background: #f6f7fa;
            }
        }

        &:after {
            content: '';
            position: absolute;
            right: -5px;
            top: 20px;
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-left-color: #ffffff;
        }
    }

    &:hover {
        .wrap {
            .env-value {
                display: none;
            }

            .select-img {
                display: block;
            }
        }

        .list {
            display: flex;
        }
    }
}
</style>
