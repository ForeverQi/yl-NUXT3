<template>
    <div class="tips-wrap">
        <div v-if="auditStatus === 'PRO' || auditStatus === 'SUC'">
            <h3 class="title">您已提交注销账号申请</h3>
            <p class="tips-content">
                工作人员会在15个工作日内给您致电，与您确认
                <br />
                注销申请，在此期间请保持通信通畅。
            </p>
        </div>
        <div v-else>
            <h3 class="title">注销申请已取消</h3>
            <p class="tips-content">
                您已成功取消了注销申请，若仍需注销账号，可前往
                <br />
                【个人中心】再次提交注销申请，如有疑问请致电：
                <br />
                400-861-8800
            </p>
        </div>
        <div class="tips-painting">
            <img v-if="auditStatus === 'PRO' || auditStatus === 'SUC'" src="./asset/images/painting1.png" alt="" style="width: 223px; height: 161px" />
            <img v-else src="./asset/images/painting2.png" alt="" style="width: 223px; height: 161px" />
            <p v-if="auditStatus === 'PRO' || auditStatus === 'SUC'">我们会不断改进，期待着您的回归～</p>
            <p v-else>欢迎回来！我们将继续为您提供优质服务~</p>
        </div>
        <button type="button" @click="cancelLogout" v-if="auditStatus === 'PRO'">取消注销</button>

        <!-- <img src="./asset/images/painting2.png" alt="" style="width: 226px; height: 174px" /> -->
    </div>
</template>

<script>
export default {
    props: {
        auditStatus: {
            type: String,
            default: '',
        },
    },
    methods: {
        cancelLogout() {
            this.$emit('cancel-logout');
        },
    },
};
</script>

<style lang="less" scoped>
.tips-wrap {
    overflow: hidden;
    .title {
        margin: 48px 0 15px;
        font-weight: bold;
    }
    .tips-content {
        width: 379px;
        margin: 0 auto;
        font-size: 16px;
        text-align: left;
        color: #77798d;
    }
    .tips-painting {
        text-align: center;
        img {
            margin-top: 48px;
        }
        p {
            font-size: 14px;
            text-align: center;
            color: #77798d;
            margin-top: 20px;
        }
    }
    button {
        width: 280px;
        height: 44px;
        background: #eeeff6;
        border-radius: 22px;
        margin: 40px auto 0;
        border: none;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.2s;
        background: linear-gradient(90deg, #f8323c, #ff737a 100%);
        color: #fff;
    }
}
</style>
