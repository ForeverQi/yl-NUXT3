<template>
    <article class="rule-container">
        <rule></rule>
        <main class="rule-content-container">
            <h2 class="content-title">考试纪律</h2>
            <ul class="rule-list">
                <li class="rule-item"><p>考生进入考场后应按指定的座位就座，并将身份证摆在桌面左上角。证件不全者不准进入考场，迟到30分钟不得入场。</p></li>
                <li class="rule-item">
                    <p>
                        考生不得携带任何与考核有关的资料进入考场（已经带入的请将其放在考场前面的非考核区域），所有通讯工具必须关闭，考核正式开始后，如在现场发现携带有关资料，或者通讯工具未关闭，一律按作弊处理，成绩作废。
                    </p>
                </li>
                <li class="rule-item"><p>考核期间不准吸烟，考生不论因何原因离开考场均不得再进入考场。</p></li>
                <li class="rule-item"><p>开考30分钟后，考生方可交卷。考生需交卷时，按系统提示提交后安静、迅速离开考场。</p></li>
                <li class="rule-item"><p>考核结束时间到，系统将自动收取试卷，考生迅速离开考场，不得在考场逗留。</p></li>
                <li class="rule-item"><p>考生在登录系统考试时，应检查身份信息报考等级是否与申报一致。</p></li>
                <li class="rule-item"><p>考生进入考场后应按指定的座位就座，并将身份证摆在桌面左上角。证件不全者不准进入考场，迟到30分钟不得入场。</p></li>
                <li class="rule-item">
                    <p>
                        考生不得要求监考人员解释试题，如遇试题乱码、设备故障等问题可举手询问。考生须保持考场安静，不许交头接耳，严禁偷看他人试题。对违犯考场纪律者，监考人员有权作出警告以至取消其考核资格的决定。
                    </p>
                </li>
                <li class="rule-item"><p>与考核无关人员一律不得进入考场。</p></li>
            </ul>
            <p class="read">
                <input type="checkbox" id="cbox1" value="我已阅读并同意遵守考场纪律" v-model="isRead" />
                <label for="cbox1">我已阅读并同意遵守考场纪律</label>
            </p>
            <button class="exam" v-if="isRead" @click="handleExam">立即考试</button>
            <button class="exam" disabled v-else>立即考试</button>
        </main>
    </article>
</template>
<script>
import Rule from '@/www/components/learningCenter/simulated-exam/components/fire-exam/top-view.vue';
export default {
    components: {
        Rule,
    },
    layout: 'nullLayout',
    data() {
        return {
            isRead: false,
        };
    },
    methods: {
        handleExam() {
            this.$router.push({
                path: '/emulation/fire-exam/doing',
                query: this.$route.query,
            });
        },
    },
};
</script>
<style scoped lang="less">
.rule-container {
    article {
        border: 0;
        font-weight: normal;
        display: block;
    }
    .rule-content-container {
        margin-left: 361px;
        margin-right: 359px;
        margin-top: 12px;
        background-color: white;
        padding-top: 40px;
        height: calc(100vh - 130px);
        .content-title {
            text-align: center;
            font-weight: bold;
            font-size: 24px;
            color: #333;
        }
        .rule-list {
            list-style: cjk-ideographic;
            padding-left: 94px;
            padding-right: 64px;
            margin-top: 40px;
            margin-bottom: 40px;
            color: #3a3d4b;
            font-size: 15px;
            .rule-item {
                list-style: cjk-ideographic;
                line-height: 28px;
            }
            .rule-item + .rule-item {
                margin-top: 20px;
            }
        }
        .read {
            color: #057aff;
            padding-left: 65px;
            font-size: 15px;
            input[type='checkbox'] {
                width: 14px;
                height: 14px;
                background-repeat: no-repeat;
                background-image: url('./asset/images/checkbox_normal.png');
                vertical-align: -2px;
                margin-right: 5px;
                cursor: pointer;
            }

            input[type='checkbox']:checked {
                background-image: url('./asset/images/checkbox_checked.png');
            }
        }
        .exam {
            font-size: 16px;
            border-radius: 5px;
            width: 360px;
            height: 50px;
            background: linear-gradient(135deg, #5c8edc, #3260a8);
            border-radius: 6px;
            color: white;
            display: block;
            margin: 80px auto 0;
            font-weight: bold;
            &:disabled {
                background: rgba(170, 170, 170, 1);
            }
        }
    }
}
</style>
