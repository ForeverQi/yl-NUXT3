<template>
    <div class="mode-selection-box">
        <div class="mode-selection">
            <span>请选择本次做题模式</span>
        </div>
        <div class="mode-content">
            <div class="mode-type" @click="$emit('doClose', 1)">背题模式（可随时看解析）</div>
            <div class="mode-type" @click="$emit('doClose', 2)">做题模式（交卷后看解析）</div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.mode-selection-box {
    padding-bottom: 30px;
    .mode-selection {
        font-size: 14px;
        color: #3a3d4b;
        text-align: center;
        margin-bottom: 24px;
    }
    .mode-type {
        width: 220px;
        height: 38px;
        cursor: pointer;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        border: 1px solid #d6d6d6;
        border-radius: 8px;
        font-size: 14px;
        color: #666666;
        box-sizing: border-box;
        margin-bottom: 12px;
        &:last-child {
            margin-bottom: 0;
        }
        &:hover {
            background: linear-gradient(90deg, #ff6870, #f8323c);
            color: #fff;
            border: 0;
        }
    }
}
</style>
