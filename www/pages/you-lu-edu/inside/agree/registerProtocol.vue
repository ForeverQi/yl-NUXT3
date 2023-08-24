<!--
 * @Author       : zhouqi
 * @description  : 用户注册协议
 * @Date         : 2023-07-24 21:21:41
 * @LastEditors  : zhouqi
 * @LastEditTime : 2023-07-25 11:09:55
 * @FilePath     : \nuxt\www\pages\you-lu-edu\inside\agree\registerProtocol.vue
-->

<template>
    <div class="information-agreement-box">
        <div class="information-agreement" ref="content">
            <!-- 顶部图片 -->
            <StatementHeader :statement-name="baseInfo.name" />
            <div class="agreement-content">
                <TitleModule
                    class="agreement-left-module"
                    :data-list="dataList"
                    :base-info="baseInfo"
                    :class="provinceClass"
                    @title-change="titleChange"
                    ref="province"
                />
                <registerDetailModule class="agreement-right-module" :class="detailClass" @getContentTitleId="getContentTitleId" ref="detail" />
            </div>
        </div>
    </div>
</template>

<script>
import TitleModule from './components/titleModule.vue';
import registerDetailModule from './components/registerDetailModule.vue';
import StatementHeader from './components/statementHeader.vue';
import dataMixin from './mixin/dataMixin.js';

export default {
    components: {
        TitleModule,
        registerDetailModule,
        StatementHeader,
    },
    mixins: [dataMixin],
    layout: 'new-default',
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            baseInfo: {
                name: '用户注册协议',
                updateTime: '2021年3月12日',
                assertTime: '2021年3月12日',
            },
            /**
             * 左边标题列表数据
             * isChecked :是否选中
             * serial: 标题序号
             */
            dataList: [
                { title: '一、定义', isChecked: false, serial: 1 },
                { title: '二、注册账号', isChecked: false, serial: 2 },
                { title: '三、服务内容', isChecked: false, serial: 3 },
                { title: '四、双方权利义务', isChecked: false, serial: 4 },
                { title: '五、用户行为规范', isChecked: false, serial: 5 },
                { title: '六、权利声明', isChecked: false, serial: 6 },
                { title: '七、免责声明', isChecked: false, serial: 7 },
                { title: '八、隐私政策', isChecked: false, serial: 8 },
                { title: '九、管辖与法律适用', isChecked: false, serial: 9 },
            ],
        };
    },
    methods: {},
};
</script>

<style lang="less" scoped>
@import './asset/css/public.less';
</style>
