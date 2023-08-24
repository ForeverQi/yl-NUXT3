<!--
 * @Author       : zhouqi
 * @description  : 隐私政策
 * @Date         : 2023-07-24 09:10:05
 * @LastEditors  : zhouqi
 * @LastEditTime : 2023-07-25 10:52:25
 * @FilePath     : \nuxt\www\pages\you-lu-edu\inside\agree\agreement.vue
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
                <argDetailModule class="agreement-right-module" :class="detailClass" @getContentTitleId="getContentTitleId" ref="detail" />
            </div>
        </div>
    </div>
</template>

<script>
import TitleModule from './components/titleModule.vue';
import argDetailModule from './components/argDetailModule.vue';
import StatementHeader from './components/statementHeader.vue';
import dataMixin from './mixin/dataMixin.js';

export default {
    components: {
        TitleModule,
        argDetailModule,
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
                name: '隐私政策',
                updateTime: '2021年3月12日',
                assertTime: '2021年3月12日',
            },
            /**
             * 左边标题列表数据
             * isChecked :是否选中
             * serial: 标题序号
             */
            dataList: [
                { title: '一、个人信息定义及范围', isChecked: false, serial: 1 },
                { title: '二、我们可能如何收集和使用您的个人信息', isChecked: false, serial: 2 },
                { title: '三、我们可能如何使用Cookie类数据', isChecked: false, serial: 3 },
                { title: '四、我们可能如何共享、转让、公开披露您的个人信息', isChecked: false, serial: 4 },
                { title: '五、我们可能如何保护和保存您的个人信息', isChecked: false, serial: 5 },
                { title: '六、您的权利', isChecked: false, serial: 6 },
                { title: '七、我们如何处理儿童的个人信息', isChecked: false, serial: 7 },
                { title: '八、本隐私政策如何更新', isChecked: false, serial: 8 },
                { title: '九、如何联系我们', isChecked: false, serial: 9 },
            ],
        };
    },
    methods: {},
};
</script>

<style lang="less" scoped>
@import './asset/css/public.less';
</style>
