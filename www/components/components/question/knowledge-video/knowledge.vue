<template>
    <!-- 展示视频 -->
    <div class="video-content">
        <div class="video">
            <polyv-video ref="polyvVideoRef" :resource-id="knowledge.resourceId">
                <div class="agin-box" slot="mask" v-if="isFinished">
                    <img src="./asset/images/finished.png" alt="" />
                    <span class="text-1">恭喜你，完成该知识内容</span>
                    <span v-if="nextKnowledgeTitle" class="text-2">下一个知识点： {{ nextKnowledgeTitle }}</span>
                    <div class="test" @click="playAgin">重学一遍</div>
                </div>
            </polyv-video>
        </div>
        <div class="knowledge-name-list">
            <div class="title">知识点目录</div>
            <div class="name-content">
                <div class="name-list">
                    <p class="first" v-if="chapterCatalog.length">{{ chapterCatalog[0] || '' }}</p>
                    <p class="current" v-if="chapterCatalog.length">{{ chapterCatalog[1] || '' }}</p>
                </div>
                <!-- 没有试题不展示精准练习按钮 -->
                <div class="test" v-if="knowledge.paperId" @click="onTestPaper">精准练习</div>
            </div>
        </div>
    </div>
</template>
<script>
import PolyvVideo from '@/www/components/components/question/polyv-video.vue';
export default {
    components: { PolyvVideo },
    props: {
        knowledge: {
            type: Object,
            default: () => {},
        },
        nextKnowledgeTitle: {
            type: String,
            default: '',
        },
        //knowledge 展示知识讲解 question 展示做题
        chapterCatalog: {
            type: Array,
            default: () => {},
        },
    },
    data() {
        return {
            PlayReturn: null,
            isFinished: false,
        };
    },
    watch: {
        'knowledge.option': {
            immediate: true,
            deep: true,
            handler(val) {
                if (val) {
                    this.$nextTick(() => {
                        this.playVid(val, {
                            start: val.start,
                            end: val.end,
                        });
                    });
                }
            },
        },
    },
    methods: {
        playAgin() {
            this.isFinished = false;
            this.playVid(this.knowledge.option, {
                autoplay: true,
                start: this.knowledge.option.start,
                end: this.knowledge.option.end,
            });
        },
        playVid(val = {}, option = {}) {
            this.$refs.polyvVideoRef
                .playVid(val, option)
                .then((instance) => {
                    this.PlayReturn = instance;
                    this.PlayReturn.over(() => {
                        this.isFinished = true;
                    });
                })
                .catch((err) => {
                    this.$baseUI.alert(err?.getDescription?.() || err || '请刷新重试');
                });
        },
        onTestPaper() {
            this.$emit('test-paper');
        },
    },
};
</script>
<style lang="less" scoped>
.video-content {
    padding: 0 64px 40px;
    display: flex;
    align-items: center;
    height: 439px;
    overflow-y: auto;
    .video {
        width: 745px;
        height: 419px;
        position: relative;
        overflow: hidden;
    }
    .test {
        width: 128px;
        height: 32px;
        background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
        border-radius: 16px;
        text-align: center;
        line-height: 32px;
        color: #fff;
        margin: 0 auto;
        cursor: pointer;
    }
    .knowledge-name-list {
        width: 228px;
        height: 419px;
        background: #1c1d30;
        .title {
            position: relative;
            height: 53px;
            line-height: 53px;
            margin: 0 16px;
            padding-left: 11px;
            font-size: 16px;
            font-weight: 700;
            color: #ffffff;
            border-bottom: 1px solid #3c3d56;
            &::before {
                content: '';
                display: block;
                position: absolute;
                left: 0;
                top: 19px;
                width: 3px;
                height: 16px;
                background: #ff2e30;
                border-radius: 1px;
            }
        }
        .name-content {
            height: 356px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .name-list {
                padding: 0 16px;
                .first {
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 14px;
                    padding: 16px 0;
                    color: #fff;
                    text-align: left;
                    word-break: break-all;
                }
                .current {
                    background: #282943;
                    line-height: 14px;
                    font-size: 12px;
                    color: #bbbbbb;
                    text-align: left;
                    padding-left: 10px;
                    padding: 7px 10px;
                    word-break: break-all;
                }
            }
        }
    }
    .agin-box {
        position: absolute;
        color: #ffffff;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        font-size: 13px;
        z-index: 20;
        top: 0;
        left: 0;
        background: #060a16;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-top: 6%;
        img {
            width: 200px;
            height: 138px;
            margin-bottom: 12px;
        }
        .text-1 {
            margin-bottom: 10px;
            font-size: 16px;
            color: #ffffff;
        }
        .text-2 {
            font-size: 14px;
            color: #bbbbbb;
        }
        .test {
            margin-top: 20px;
        }
    }
}
</style>
