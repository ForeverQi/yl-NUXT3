<template>
    <div class="message-panel">
        <!-- 消息体 -->
        <message-item
            :msg-id="content.msgId"
            :date="content.msgRecvdate || content.msgSenddate"
            :key="content.msgId"
            :tag="content.msgContent.tag"
            :content="content.msgContent.info"
            :title="content.msgTitle"
            :status="showMarkReadBtn"
        ></message-item>
        <!-- 操作按钮 -->
        <div class="panel-footer">
            <vb-button @click="markMsgRead" v-if="showMarkReadBtn" type="primary" class="message-panel-button" round>我知道了</vb-button>
            <vb-button @click="confirmInfo" v-if="isNotConfirmOrder" class="message-panel-button ml10" round>确认信息</vb-button>
            <vb-button @click="viewDetails" v-if="isNotConfirmOrder === false" class="message-panel-button ml10" round>查看详情</vb-button>
            <vb-button @click="delItem" class="message-panel-button ml10 del-pad" round>删除</vb-button>
        </div>
        <pop-up
            v-if="isNotConfirmOrder"
            :show.sync="isShow"
            :title="title"
            :des="des"
            :cancel-flag="true"
            confirm="前往确认消息"
            @cancel="cancelFn"
            @close="cancelFn"
            @confirmFn="confirmFn"
        />
    </div>
</template>

<script>
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import VbButton from '@/www/components/button/button/index.vue';
import messageItem from '@/www/components/message/messageItem/message-item/index.vue';
import PopUp from '@/www/components/uc/manager/order/popUp/index.vue';
import '@/api/mc/api.MC0020.mc-my-msg-del.js';
import '@/api/mc/api.MC0022.mc-my-msg-read.js';

/**
 * 消息卡片
 */

export default {
    name: 'messagePanel',
    components: {
        messageItem,
        VbButton,
        PopUp,
    },
    props: {
        content: {
            type: Object,
            default: () => {
                return {};
            },
        },
        index: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            message: null, //message 提示实例
            isShow: false,
            title: '暂时无法查看课程！',
            des: '您还未进行信息确认，为保障您的权益和账户安全，请确认课程班级信息后再学习哦～',
            choseItem: {},
        };
    },
    computed: {
        // 是否显示我知道了按钮
        showMarkReadBtn() {
            const status = this.$Dictionary.get('MSG_OPEN_STATUS');
            const { msgOpenstatus } = this.content;
            return msgOpenstatus !== status.Y && msgOpenstatus !== status.I;
        },
        // 是否未确认订单
        isNotConfirmOrder() {
            return this.content.isNotConfirmOrder;
        },
    },
    beforeDestroy() {
        this.message && this.message.close();
    },
    methods: {
        // 删除
        delItem() {
            this.$IOSConfirm({
                content: '是否确定删除',
            }).then(() => {
                niceloo.api.call('mc/mc-my-msg-del', {
                    msgId: this.content.msgId,

                    onsuccess: (data) => {
                        data && this.$emit('delete', this.index);
                        this.$store.dispatch('message/getUnreadNum');
                    },

                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            });
        },
        // 标记此消息为一读
        markMsgRead() {
            if (this.showMarkReadBtn) {
                //如果是已读的就不调了
                niceloo.api.call('mc/mc-my-msg-read', {
                    msgId: this.content.msgId,
                    onsuccess: (data) => {
                        this.$emit('change', this.content.msgId);
                        this.$store.dispatch('message/getUnreadNum');
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            }
        },
        // 查看详情
        viewDetails() {
            //将息消息变更为已读状态
            this.markMsgRead();
            const MSG_TYPE = this.$Dictionary.get('MSG_TYPE');
            const {
                msgContent: { extClientparams = {}, jump = {} },
            } = this.content;
            const { coursewareLiveurl, questionId } = extClientparams;
            if (jump.clickType === MSG_TYPE.SUBJECT_EVALUATION_REPORT) {
                this.$PageUtil.openNewPage(jump.clickUrl);
                return;
            }
            if (jump.clickType === MSG_TYPE.ANSWER_QUESTION) {
                this.$PageUtil.href(`/learningCenter/index/answerQuestion?questionId=${questionId}`);
                return;
            }
            //班级通知：跳转H5页面
            if (jump.clickType === MSG_TYPE.CLASS_NOTICE) {
                let token = ylPlugin.login.getToken();
                this.$PageUtil.openNewPage(this.$nuxt.context.env.config.INFORM_MP_URL + jump.clickUrl + '&token=' + token);
                return;
            }
            //班级通知：跳转我的申请
            if (jump.clickType === MSG_TYPE.SELF_STUDY) {
                this.$PageUtil.openNewPage('/uc/manager/apply');
                return;
            }
            // 其他的直接跳
            this.$PageUtil.openNewPage(coursewareLiveurl);
        },
        confirmInfo() {
            this.isShow = true;
        },
        cancelFn() {
            this.isShow = false;
        },
        confirmFn() {
            this.isShow = false;
            this.$router.push('/learningCenter/index/myCourse');
        },
    },
};
</script>

<style lang="less" scoped>
.message-panel {
    background-color: white;
    border-radius: 8px;
    border: 1px solid #ecedf6;
    padding: 24px 24px 11px;
    .panel-footer {
        text-align: right;
        border-top: 1px dashed rgba(0, 0, 0, 0.05);
        margin-top: 17px;
        padding-top: 12px;
        .message-panel-button {
            cursor: pointer;
        }
        .del-pad {
            padding: 6px 18px;
        }
    }
}
.message-panel + .message-panel {
    margin-top: 16px;
}
</style>
