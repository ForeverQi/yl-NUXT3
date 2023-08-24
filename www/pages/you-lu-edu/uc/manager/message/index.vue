<template>
    <div class="info-wrap">
        <!-- 顶部选择按钮 -->
        <div class="message-content">
            <div class="message-content-header">
                <div class="message-tabs">
                    <tab :data="tabData" :active-index="activeIndex" @select="selectTab"></tab>
                </div>
                <div class="message-operate">
                    <div class="operate-item" @click="refresh" title="刷新">
                        <img class="operate-icon" src="./asset/images/refresh.png" />
                        <span class="operate-label">刷新</span>
                    </div>
                    <div class="operate-item" @click="markReadAll" title="一键已读">
                        <img class="operate-icon" src="./asset/images/mark-read.png" />
                        <span class="operate-label">一键已读</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 我的消息 -->
        <div class="load-more">
            <p class="message-tips">我们为您保留最近3个月的消息提醒，为避免漏掉重要消息，请及时查看哦~</p>
            <template v-if="!isEmpty">
                <vb-infinite-scroll style="height: 800px" @load="loadMoreMsg" :disabled="!hasNextPage" :immediate="false">
                    <div class="load-more-list">
                        <template v-for="(item, index) in messageList">
                            <message-panel
                                @change="changeMsgStatus"
                                :content="item"
                                :key="item.componentKey"
                                :index="index"
                                @delete="delMsg"
                                @re-query="refresh"
                            ></message-panel>
                        </template>
                    </div>
                    <div class="load-more-button">
                        <vb-button :disabled="!hasNextPage" @click="loadMoreMsg" type="text">{{ buttonText }}</vb-button>
                    </div>
                </vb-infinite-scroll>
            </template>
            <!-- 空列表 -->
            <template v-else>
                <order-null words="您还没有消息哦～" style="width: auto"></order-null>
            </template>
        </div>
    </div>
</template>
<script>
import '@/api/uc/api.UC0207.uc-dict-list-seem.js';
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import '@/api/mc/api.MC0021.mc-my-msg-list.js';
import { mapGetters } from 'vuex';
import Tab from '@/www/components/tab/tabX/index.vue';
import VbButton from '@/www/components/button/button/index.vue';
import VbInfiniteScroll from '@/www/components/message/vbInfiniteScroll/vb-infinite-scroll/index.vue';
import MessagePanel from '@/www/components/message/messagePanel/message-panel/index.vue';
import OrderNull from '@/www/components/uc/manager/myCourse/orderNull/index.vue';
import loginRegisterTrack from '@/plugins/yiguan/login-register-track.js';
import '@/api/mc/api.MC0023.mc-my-msg-read-all.js';
import '@/api/oc/api.OC2018.get-order-padiskus-status';
export default {
    name: 'message',
    components: {
        Tab,
        VbInfiniteScroll,
        VbButton,
        MessagePanel,
        OrderNull,
    },
    data() {
        return {
            tabData: [],
            pageInfo: {
                pageIndex: 0,
                pageCurrentSize: 10,
            },
            activeIndex: 0,
            messageList: [],
            firstLoadTime: undefined, //第一次加载我的消息的时间戳
            count: 0, //列表总数
            hasNextPage: true, // 有没有下一页
            isEmpty: false, //是不是空列表
            isLoading: false, //刷新中
            buttonText: '点击加载更多消息',
        };
    },
    head() {
        return this.$head({
            title: '个人中心_我的消息_点亮职业人生_优路教育',
            meta: [],
        });
    },
    computed: {
        ...mapGetters({
            getNoticeNum: 'message/getNoticeNum',
        }),
    },
    watch: {
        getNoticeNum: {
            deep: true,
            immediate: true,
            handler(val) {
                this.tabData.forEach((item, index) => {
                    this.$set(this.tabData, index, { ...item, value: 0, dot: false });
                    if (val.length) {
                        this.refreshTabs(val);
                    }
                });
            },
        },
    },
    mounted() {
        //  const getUnreadTotalNum = this.$store.getters[`message/getUnreadTotalNum`];
        // 监听store中的commit 变化  出来tab中数量的变化
        // this.listener = this.$store.subscribe(({ type, payload }) => {
        //     const code = this.dicts[type];
        //     if (!code) return;
        //     let item = this.tabData.find((item) => item.dictCode === code);
        //     if (item) {
        //         item.dot = payload !== 0; //为0时不显示
        //         item.value = this.getDisPlayValue(payload);
        //     }
        // });
        this.getMsgDictList();
        this.showWxBindDialog();
    },
    beforeDestroy() {
        // this.listener && this.listener();
        this.message && this.message.close();
    },
    methods: {
        ...loginRegisterTrack,
        refreshTabs(data) {
            this.tabData.forEach((item, index) => {
                this.$set(this.tabData, index, { ...item, value: 0, dot: false });
                data.forEach((item2) => {
                    if (item.dictCode == item2.mtBiztype) {
                        this.$set(this.tabData, index, { ...item, value: this.getDisPlayValue(item2.count), dot: item2.count !== 0 });
                    }
                });
            });
        },

        //刷新当前显示的列表
        refresh() {
            if (!this.isLoading) {
                this.isLoading = true;
                this.messageList = [];
                this.loadTime = undefined;
                this.pageInfo.pageIndex = 0;
                this.getList();
                this.$store.dispatch('message/getUnreadNum');
            }
        },
        //全部已读
        markReadAll() {
            const getUnreadTotalNum = this.$store.getters[`message/getUnreadTotalNum`];
            if (getUnreadTotalNum > 0) {
                this.$IOSConfirm({
                    content: '是否确定全部已读',
                }).then(() => {
                    niceloo.api.call('mc/mc-my-msg-read-all', {
                        onsuccess: ({ data }) => {
                            if (data) this.refresh();
                            this.$store.dispatch('message/getUnreadNum');
                        },

                        onerror: this.$niceloo.api.handleFailure,
                        oncomplete: () => {},
                    });
                });
            } else if (!this.message) {
                // 为了保证一个时间段内只有一个message
                this.message = this.$message.warning({
                    message: '您没有未读信息',
                    offset: 300,
                    onClose: () => {
                        this.message = null;
                    },
                });
            }
        },
        // 切换我得的消息
        selectTab(index) {
            if (index === this.activeIndex) return;
            this.activeIndex = index;
            this.messageList = [];
            this.pageInfo.pageIndex = 0;
            this.getList();
        },
        // 加载更多
        loadMoreMsg() {
            this.pageInfo.pageIndex++;
            this.getList();
        },
        /**
         * @description 更改消息状态
         * @msgId 消息的id
         */
        changeMsgStatus(msgId) {
            const status = this.$Dictionary.get('MSG_OPEN_STATUS');
            const item = this.messageList.find((msg) => msg.msgId === msgId);
            if (item) item.msgOpenstatus = status.Y;
            this.updateTimestamp();
        },
        // 获取展示数字得值
        getDisPlayValue(value) {
            return value <= 99 ? value : '99+';
        },
        //获取顶部tab数据
        getMsgDictList() {
            niceloo.api.call('uc/uc-dict-list-seem', {
                dictType: 'clientmtbiztype',

                onsuccess: ({ data = [] }) => {
                    this.tabData = data.map((item) => {
                        return {
                            label: item.dictName,
                            dictCode: item.dictCode,
                            dicttype: item.dicttype,
                            value: 0,
                            dot: false,
                        };
                    });
                    //    this.getUnreadBtypeCounts();

                    // this.$store.dispatch('message/getUnreadNum');
                    // this.tabData = data.map((item) => {
                    //     const key = this.dicts[item.dictCode];
                    //     const value = this.$store.getters[`message/${key}`] || 0;
                    //     return {
                    //         label: item.dictName,
                    //         dictCode: item.dictCode,
                    //         dicttype: item.dicttype,
                    //         value: this.getDisPlayValue(value),
                    //         dot: value !== 0,
                    //     };
                    // });
                    this.getList();
                },

                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        // 获取我得消息列表
        getList() {
            const { pageCurrentSize, pageIndex } = this.pageInfo;
            const dictCode = this.tabData[this.activeIndex].dictCode;
            this.buttonText = '加载中';
            niceloo.api.call('mc/mc-my-msg-list', {
                pageIndex: this.messageList.length,
                pageSize: pageCurrentSize,
                mtBiztype: dictCode,
                loadTime: this.firstLoadTime,

                onsuccess: ({ count = 0, data = [], loadTimestamp }) => {
                    this.buttonText = '点击加载更多消息';
                    this.count = count;
                    let classIds = [];
                    data.forEach((item) => {
                        item.componentKey = item.msgId + Date.now();
                        var msgContent = item.msgContent.replace(/\n/g, '\\n');
                        msgContent = msgContent.replace(/\r/g, '\\r');
                        msgContent = msgContent.replace(/\t/g, '\\t');
                        item.msgContent = JSON.parse(msgContent);
                        item.isNotConfirmOrder = false;
                        if (item.msgContent.extClientparams) {
                            if (classIds.length > 0) {
                                let activeItem = classIds.find((_item) => item.msgContent.extClientparams.classId === _item);
                                if (!activeItem) {
                                    classIds.push(item.msgContent.extClientparams.classId);
                                }
                            } else {
                                classIds.push(item.msgContent.extClientparams.classId);
                            }
                        }
                    });

                    const isFirstPage = pageIndex === 0;
                    // 第一页重置 其他追加
                    this.messageList = isFirstPage ? data : this.messageList.concat(data);

                    if (classIds.length > 0) {
                        this.$callApi('xieyiqueren/get-order-padiskus-status', {
                            classIds,
                            onsuccess: (data) => {
                                if (data.length > 0) {
                                    data.forEach((item) => {
                                        this.messageList.map((_item) => {
                                            if (_item.msgContent.extClientparams.classId === item.classId) {
                                                _item.isNotConfirmOrder = item.classSignstatus === 'N';
                                            }
                                            return _item;
                                        });
                                    });
                                }
                            },
                            onerror: niceloo.api.handleFailure,
                        });
                    }
                    this.hasNextPage = data.length >= pageCurrentSize;
                    if (!this.hasNextPage) this.buttonText = '没有更多了';
                    this.isEmpty = this.messageList.length === 0;
                    if (isFirstPage) this.firstLoadTime = loadTimestamp; //传第一页加载时的时间  为了防止信息遗漏或重复
                },

                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.isLoading = false;
                },
            });
        },
        /**
         * @description 删除消息
         * @index 删除消息的索引
         */
        delMsg(index) {
            this.messageList.splice(index, 1);
            this.refresh();
            /*this.updateTimestamp();
            this.isEmpty = !this.messageList.length;*/
        },
        /**
         * 为列表项添加id+时间戳作为组件的key
         * 主要是为了更新消息显示的时间
         */
        updateTimestamp() {
            this.messageList.forEach((item) => {
                item.componentKey = item.msgId + Date.now();
            });
        },
        async showWxBindDialog() {
            const storageDate = this.$storage.get('wx3MiniprogramBind') || {};
            let currtDate = `${new Date().getMonth()}-${new Date().getDate()}`;
            if (storageDate && storageDate === currtDate) {
                return;
            }
            let isBind = await ylPlugin.login.isWx3MiniprogramBoundByCurrentUser();
            if (!isBind) {
                this.$storage.set('wx3MiniprogramBind', currtDate);
            }
            ylPlugin.login.tipBindWx3MiniprogramIfNeeded({
                onstatechange: (state) => {
                    if (state.isBound) {
                        this.$Message.success('绑定成功');
                        this.trackWxMiniprogrameBind('个人中心-我的消息页面');
                    }
                    if (state.isBound === 'fail') {
                        this.trackWxMiniprogrameBind('个人中心-我的消息页面', false);
                    }
                    if (state.isQRCodeScanned) {
                        this.trackMiniprogrameBindScan('个人中心-我的消息页面');
                    }
                    if (state.isQRCodeExpired) {
                        this.trackMiniprogrameBindScan('个人中心-我的消息页面', false, '二维码已经失效');
                        this.trackWxMiniprogrameBind('个人中心-我的消息页面', false, '二维码已经失效');
                    }
                },
            });
        },
    },
};
</script>

<style lang="less" scoped>
.info-wrap {
    height: 100%;
    min-height: 868px;
}
.message-content {
    background-color: white;
    .message-content-header {
        display: flex;
        justify-content: space-between;
        background-color: white;
        min-height: 60px;
        padding-bottom: 8px;
        border-bottom: 1px solid #ecedf6;
    }
    .message-tabs {
        flex-grow: 1;
    }
    .message-operate {
        padding-right: 24px;
        text-align: right;
        .operate-item {
            display: inline-block;
            height: 54px;
            line-height: 50px;
            padding-right: 0;
            cursor: pointer;

            &:not(:first-child) {
                padding-left: 24px;
            }
            .operate-icon {
                margin-top: 6px;
                width: 20px;
                height: 20px;
                vertical-align: middle;
            }
            .operate-label {
                display: inline-block;
                height: 42px;
                vertical-align: middle;
                font-size: 14px;
                text-align: left;
                color: #888888;
            }
        }
    }
}

.load-more {
    height: 100%;
    .load-more-list,
    .empty-list {
        height: 100%;
        background-color: white;
    }
    .load-more-list {
        padding: 24px 20px;
        min-height: 712px;
    }
    .load-more-button {
        text-align: center;
        padding: 30px 0 10px 0;
    }

    .message-tips {
        color: #eb4343;
        font-size: 12px;
        background-color: #fff3f3;
        border-radius: 4px;
        padding: 11px 20px;
    }

    .empty-list {
        position: relative;
        .center {
            position: absolute;
            width: 222px;
            top: 30%;
            left: 50%;
            transform: translate(-50%, 0%);
        }
        .empty-img {
            display: block;
            width: 100%;
        }
        .empty-label {
            display: block;
            height: 20px;
            font-size: 14px;
            font-weight: 400;
            color: #999999;
            line-height: 20px;
            text-align: center;
            margin-top: 7px;
        }
    }
}

.load-more {
    width: 100%;
    height: calc(100% - 106px);
}
/deep/ .active-item {
    color: #e73928;
}
</style>
