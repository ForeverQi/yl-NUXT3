<template>
    <div>
        <popup-base ref="popupBase">
            <div class="knowledge-video" v-loading="loading">
                <div class="top">
                    <p class="top-title">
                        <span class="title">考点学习</span>
                        <span class="question-index" v-if="showType === 'question'">
                            （当前
                            <span class="red">{{ current }}</span>
                            题，共{{ questionAllCount }}题）
                        </span>
                    </p>
                    <img class="close-ico" @click="onClose" src="../asset/images/close-ico.png" alt="" />
                </div>
                <div class="knowledge-name2">{{ currentKnowledge.knowledgeTitle || '' }}</div>
                <!-- 展示视频 -->
                <knowledge
                    ref="knowledgeRef"
                    v-if="showType === 'knowledge'"
                    :knowledge="currentKnowledge"
                    :next-knowledge-title="nextKnowledge.knowledgeTitle"
                    :chapter-catalog="chapterCatalog"
                    @test-paper="onTestPaper"
                />
                <!-- 展示试题 -->
                <div class="question-content" ref="questionContent" v-if="showType === 'question'">
                    <!-- 做题内容 -->
                    <question-model
                        ref="questionModelRef"
                        :subject-id="subjectId"
                        :class-id="classId"
                        :paper-id="currentKnowledge.paperId"
                        @post-paper="postPaper"
                        @post-paper-err="postPaperErr"
                        @close-paper="closePaper"
                        @set-current="setCurrent"
                        @set-question-all-count="setQuestionAllCount"
                    />
                </div>

                <div class="bottom" v-if="showNext && nextKnowledge.knowledgeId">
                    <span class="title">学习下一个知识点：</span>
                    <span class="knowledge-name" @click="toNext">
                        {{ nextKnowledge.knowledgeTitle || '-' }}
                    </span>
                    <img class="go" src="../asset/images/arrow-right-red.png" />
                </div>
                <div class="height-33" v-if="!showNext || !nextKnowledge.knowledgeId"></div>
            </div>
        </popup-base>
        <!-- 做题报告 -->
        <practice-report-model :is-show.sync="reportDialog.isShow" :answersheet-id="reportDialog.answersheetId" @close="closeReport" />
    </div>
</template>
<script src="./js/index.js"></script>
<style lang="less" scoped>
.height-33 {
    height: 33px;
}
.knowledge-name2 {
    margin: 0 64px;
    font-size: 15px;
    font-weight: 400;
    text-align: left;
    color: #3a3d4b;
    line-height: 24px;
}
.knowledge-video {
    width: 1100px;
    // height: 614px;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    .red {
        color: #ff2e30;
    }
    .top {
        box-sizing: border-box;
        // height: 73px;
        padding-bottom: 16px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding-left: 64px;
        padding-right: 31.22px;
        padding-top: 30px;
        .top-title {
            display: flex;
            align-items: flex-start;
            justify-content: center;
        }
        .title {
            font-size: 16px;
            font-weight: 700;
            color: #3a3d4b;
            line-height: 21px;
            flex-shrink: 0;
        }
        .knowledge-name {
            font-size: 16px;
            color: #3a3d4b;
            line-height: 21px;
            word-break: break-all;
            vertical-align: bottom;
        }
        .close-ico {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
        .question-index {
            font-size: 14px;
            text-align: left;
            color: #9698a2;
            line-height: 21px;
            margin-left: 10px;
            flex-shrink: 0;
        }
    }
    .question-content {
        padding: 0 64px 40px;
        height: 439px;
        overflow-y: auto;
        margin-right: 8px;
    }
    .bottom {
        padding: 0 30px;
        height: 62px;
        line-height: 62px;
        background: #f6f7f9;
        border-radius: 0px 0px 16px 16px;
        display: flex;
        align-items: center;
        .title {
            font-size: 16px;
            color: #3a3d4b;
            line-height: 21px;
            letter-spacing: 0.67px;
            flex-shrink: 0;
        }
        .knowledge-name {
            color: #3a3d4b;
            line-height: 21px;
            font-size: 16px;
            color: #ff2e30;
            line-height: 21px;
            letter-spacing: 0.67px;
            margin-left: 10px;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .go {
            width: 10px;
            height: 10px;
            margin-left: 2px;
        }
    }
}
</style>
