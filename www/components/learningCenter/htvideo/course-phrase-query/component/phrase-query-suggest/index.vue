<template>
    <div class="phrase-query-suggest">
        <div class="functional">
            <div class="praise control" @click="onClickLike">
                <div :class="['icon', { active: isActiveLike }]"></div>
                <p :class="isActiveLike ? 'active' : ''">我懂了</p>
                <span v-show="isGiveALike" class="animate__animated animate__slideInUp">+1</span>
            </div>
            <div class="suggest control" @click="onClickFeedBack">
                <div :class="['icon', { active: isActiveFeedBack }]"></div>
                <p :class="isActiveFeedBack ? 'active' : ''">提建议</p>
            </div>
            <!-- 上线前 临时调整 不展示收起展开 -->
            <!-- <div class="put-up" v-if="isActiveFeedBack" @click="isUpOrDown = !isUpOrDown">
                <p v-if="!isUpOrDown">收起</p>
                <img v-if="!isUpOrDown" src="./image/down.png" alt="" />
                <p v-if="isUpOrDown">展开</p>
                <img v-if="isUpOrDown" src="./image/up.png" alt="" />
            </div> -->
        </div>
        <div class="main" v-if="isActiveFeedBack && !isUpOrDown">
            <!-- 提建议 -->
            <div class="suggest-area" v-if="isSubmit === false">
                <div class="suggest-list">
                    <div
                        v-for="item in tabs"
                        :key="item.name"
                        @click="onClickCheck(item)"
                        :class="item.check ? 'active' : ''"
                        class="button"
                        size="medium"
                        round
                    >
                        {{ item.name }}
                    </div>
                </div>
                <el-input
                    type="textarea"
                    placeholder="其他建议，可以在这里反馈哦~"
                    :autosize="{ minRows: 5, maxRows: 5 }"
                    v-model="queryForm.textarea"
                    maxlength="100"
                    show-word-limit
                />
                <div class="submit">
                    <button @click="onSubmit" v-loading="submitLoading">提交</button>
                </div>
            </div>
            <p v-if="isShowTip" class="tip">请至少设置一项</p>
            <div v-if="isSubmit === true" class="success">
                <img src="./image/success.png" alt="提交成功" />
                <p>提交成功，感谢反馈！</p>
                <p>老师会根据你的建议，持续优化内容~</p>
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style scoped lang="less">
@import url('./index.less');
</style>
