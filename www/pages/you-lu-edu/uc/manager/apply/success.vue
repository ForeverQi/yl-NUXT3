<template>
    <div>
        <module-title title="续学申请" />
        <div class="content-box">
            <div class="success-hint">
                <img class="ico-img" src="./images/success-ico.png" alt="成功" />
                续学申请已提交成功！
            </div>
            <p class="desc">我们会在3-7个工作日内完成审核，请您耐心等待~</p>
            <p class="desc">
                您也可以在
                <nuxt-link to="/uc/manager/apply" class="link-txt">我的申请</nuxt-link>
                中查看审核进度
            </p>
            <nuxt-link to="/uc/manager/apply" class="link-btn">查看申请</nuxt-link>
        </div>
    </div>
</template>

<script>
import ModuleTitle from './components/module-title.vue';
export default {
    components: {
        ModuleTitle,
    },
};
</script>

<style lang="less" scoped>
.content-box {
    min-height: 500px;
    padding: 90px 20px;
    text-align: center;
    background-color: #fff;

    .success-hint {
        padding-bottom: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        line-height: 36px;
        font-weight: bold;
        color: #333333;
    }

    .ico-img {
        margin-right: 12px;
    }

    .desc {
        line-height: 24px;
        font-size: 16px;
        color: #666666;
    }

    .link-txt {
        color: #1f78da;
    }

    .link-btn {
        display: inline-block;
        padding: 0 34px;
        margin-top: 70px;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        background: linear-gradient(90deg, #f07963, #e73928);
        border-radius: 4px;
        cursor: pointer;
    }
}
</style>
